/** Regression trong bản sao tạm; không deploy, không bind public interface. */
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), http = require('node:http');
const { spawn, execFileSync } = require('node:child_process');
function runCommand(command, args, { cwd, env = process.env, timeout = 180000 } = {}) {
  return new Promise(resolve => {
    const start = performance.now(), group = process.platform !== 'win32'; let output = '', timedOut = false, hardTimer;
    const child = spawn(command, args, { cwd, env, detached: group, stdio: ['ignore', 'pipe', 'pipe'] });
    const kill = signal => { try { if (group && child.pid) process.kill(-child.pid, signal); else child.kill(signal); } catch {} };
    const timer = setTimeout(() => { timedOut = true; kill('SIGTERM'); hardTimer = setTimeout(() => kill('SIGKILL'), 2000); }, timeout);
    const collect = chunk => { output = (output + chunk.toString()).slice(-2 * 1024 * 1024); };
    child.stdout.on('data', collect); child.stderr.on('data', collect);
    child.on('error', error => collect(error.message));
    child.on('close', (code, signal) => { clearTimeout(timer); clearTimeout(hardTimer); resolve({ command: [command, ...args].join(' '), exit: timedOut ? 124 : code ?? 1, signal, timedOut, seconds: Number(((performance.now() - start) / 1000).toFixed(3)), output }); });
  });
}
function copyWorkingTree(root) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'game06-qa-'));
  const listed = execFileSync('git', ['ls-files', '--cached', '-z'], { cwd: root }).toString().split('\0').filter(Boolean);
  const untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], { cwd: root }).toString().split('\0').filter(name => /^(src|scripts|tests)\//.test(name));
  for (const name of new Set([...listed, ...untracked])) {
    const source = path.resolve(root, name), target = path.resolve(temporary, name);
    if (!source.startsWith(root + path.sep) || !target.startsWith(temporary + path.sep)) throw Error('QA_PATH_OUTSIDE_ROOT');
    if (!fs.existsSync(source)) continue;
    if (fs.lstatSync(source).isSymbolicLink()) throw Error(`QA_SYMLINK_UNSUPPORTED: ${name}`);
    fs.mkdirSync(path.dirname(target), { recursive: true }); fs.copyFileSync(source, target);
  }
  if (fs.existsSync(path.join(root, 'node_modules'))) fs.symlinkSync(path.join(root, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  return temporary;
}
async function serveBuild(site) {
  const mime = { '.html': 'text/html', '.css': 'text/css', '.mjs': 'text/javascript', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };
  const server = http.createServer((request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
      const url = new URL(request.url, 'http://127.0.0.1');
      if (!url.pathname.startsWith('/game06/')) { response.writeHead(404); response.end(); return; }
      const file = path.resolve(site, decodeURIComponent(url.pathname.slice('/game06/'.length)) || 'index.html');
      if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
      response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      if (request.method === 'HEAD') response.end(); else fs.createReadStream(file).on('error', () => response.destroy()).pipe(response);
    } catch { response.writeHead(400); response.end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { url: `http://127.0.0.1:${server.address().port}/game06/`, close: () => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }) };
}
async function main() {
  const root = path.resolve(__dirname, '..'), temporary = copyWorkingTree(root), reportPath = path.join(temporary, 'qa-results.json');
  const report = { root: temporary, sourceHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root }).toString().trim(), results: [] };
  let server;
  const saveReport = () => fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const run = async (command, args, environment) => {
    const result = await runCommand(command, args, { cwd: temporary, env: environment || process.env });
    report.results.push(result); saveReport(); console.log(`${result.exit === 0 ? 'PASS' : 'FAIL'} ${result.command} (${result.seconds}s), exit=${result.exit}`);
    if (result.exit !== 0) { process.stderr.write(result.output.slice(-4000)); throw Object.assign(Error(`QA_CHILD_FAILED: ${result.command}`), { exitCode: result.exit }); }
  };
  try {
    await run(process.execPath, ['scripts/check-syntax.cjs']);
    await run('npm', ['test']);
    await run('npm', ['run', 'validate:assets']);
    await run('npm', ['run', 'build']);
    server = await serveBuild(path.join(temporary, '_site')); report.gameURL = server.url;
    const environment = { ...process.env, GAME_URL: server.url, CHROMIUM_PATH: process.env.CHROMIUM_PATH || '/usr/bin/chromium' };
    for (const suite of ['test:browser', 'test:ui', 'test:sample', 'test:renderer:browser', 'test:map:browser', 'test:input:browser', 'test:persistence:browser', 'test:debug:browser']) await run('npm', ['run', suite], environment);
    report.status = 'PASS';
  } catch (error) { report.status = 'FAIL'; report.failure = error.message; process.exitCode = error.exitCode || 1; }
  finally { if (server) await server.close(); saveReport(); console.log(`QA_REPORT=${reportPath}`); }
}
module.exports = { runCommand, copyWorkingTree, serveBuild };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
