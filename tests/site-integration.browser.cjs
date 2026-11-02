const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = (process.env.SITE_URL || 'http://127.0.0.1:8016/game06').replace(/\/$/, '');
const out = process.env.ARTIFACT_DIR || '/tmp/game06-site-integration';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  fs.rmSync(path.join(out, 'integration-results.json'), { force: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const results = [];
  try {
    for (const [name, width, height] of [['desktop',1366,768],['portrait',390,844],['small',320,640],['landscape',844,390]]) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: name !== 'desktop', isMobile: name !== 'desktop' });
      const page = await context.newPage(), errors = [], requests = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      page.on('request', r => { if (new URL(r.url()).origin === new URL(root).origin) requests.push(new URL(r.url()).pathname); });
      await page.goto(root + '/');
      await page.waitForFunction(() => window.IslandGame?.ready());
      await page.evaluate(() => { localStorage.setItem('nhat-diem.farm.v1', 'site-integration-legacy'); });
      const uiBefore = await page.evaluate(() => localStorage.getItem('nhat-diem.ui.v1'));
      const before = await page.evaluate(() => IslandGame.snapshot().player);
      await page.locator('#island').focus();
      await page.keyboard.down('ArrowRight'); await page.waitForTimeout(250); await page.keyboard.up('ArrowRight');
      const after = await page.evaluate(() => IslandGame.snapshot().player);
      assert(Math.hypot(after.x-before.x,after.y-before.y)>5, 'Dawn still playable');
      const link = page.getByRole('link', { name: 'Chơi thử Hải Uyên – Quy bậc I, bốn phòng', exact: true });
      assert.equal(await link.getAttribute('href'), 'hai-uyen.html');
      const box = await link.boundingBox();
      assert(box && box.width >= 44 && box.height >= 44 && box.x >= 0 && box.y >= 0 && box.x+box.width<=width+1 && box.y+box.height<=height+1);
      assert(await link.evaluate(e => { const r=e.getBoundingClientRect(); return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('a')===e; }), 'launch link not obscured');
      for (const id of ['#menu','#pause','.player-hud','#attack','#fire','#hover']) {
        const r=await page.locator(id).boundingBox();
        if(r) assert(box.x+box.width<=r.x||r.x+r.width<=box.x||box.y+box.height<=r.y||r.y+r.height<=box.y, 'launch link does not overlap '+id);
      }
      await page.screenshot({ path:path.join(out, 'home-'+name+'.png') });
      if(name==='desktop') await link.click(); else await link.tap();
      await page.waitForURL(root+'/hai-uyen.html');
      await page.waitForFunction(() => window.HaiUyen?.ready());
      assert.equal((await page.evaluate(() => HaiUyen.snapshot())).room,'VS-A1');
      await page.keyboard.press('Digit3'); await page.waitForTimeout(220); await page.keyboard.press('Digit1'); await page.waitForTimeout(100);
      const s=await page.evaluate(() => HaiUyen.snapshot()); assert(s.buff&&s.cooldowns.k3>23&&s.cooldowns.k1>2);
      await page.reload(); await page.waitForFunction(() => window.HaiUyen?.ready());
      const saved=await page.evaluate(() => HaiUyen.snapshot()); assert(saved.buff&&saved.cooldowns.k3>22&&saved.cooldowns.k1>1);
      assert.equal(await page.evaluate(() => localStorage.getItem('nhat-diem.farm.v1')), 'site-integration-legacy');
      assert.equal(await page.evaluate(() => localStorage.getItem('nhat-diem.ui.v1')),uiBefore);
      await page.screenshot({ path:path.join(out, 'hai-uyen-'+name+'.png') });
      await page.locator('#menu-button').click(); await page.locator('#menu a[href="index.html"]').click();
      await page.waitForURL(root+'/index.html'); await page.waitForFunction(() => window.IslandGame?.ready());
      assert.equal(await page.evaluate(() => localStorage.getItem('nhat-diem.farm.v1')), 'site-integration-legacy');
      assert.deepEqual(errors, []);
      const prefix=new URL(root).pathname.replace(/\/$/,'')+'/'; assert(requests.every(p=>p.startsWith(prefix)), 'all local assets stay below '+prefix);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth>innerWidth||document.documentElement.scrollHeight>innerHeight),false);
      results.push({ viewport:name,width,height,passed:true,checks:['Dawn movement','visible tap-safe launch link','navigation to Hai Uyen','K3/K1','save refresh','legacy keys preserved','return to Dawn','relative assets below prefix','no page/asset errors'] });
      console.log('PASS site integration '+name); await context.close();
    }
    fs.writeFileSync(path.join(out,'integration-results.json'),JSON.stringify({date:new Date().toISOString(),root,results},null,2));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
