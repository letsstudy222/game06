const fs = require('node:fs'), path = require('node:path'), { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
function files(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => {
    const file = path.join(directory, item.name);
    return item.isDirectory() ? files(file) : /\.(?:mjs|cjs|js)$/.test(item.name) ? [file] : [];
  });
}
const sources = ['src', 'scripts', 'tests'].flatMap(dir => files(path.join(root, dir))).sort();
for (const file of sources) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8', timeout: 10000 });
  if (result.status !== 0) { process.stderr.write(result.stderr || String(result.error || 'Syntax check failed')); process.exit(result.status || 1); }
}
console.log(`PASS syntax: ${sources.length} JavaScript files`);
