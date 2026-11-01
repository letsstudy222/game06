const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const out = process.env.INPUT_ARTIFACT_DIR || 'artifacts/input'; fs.mkdirSync(out, { recursive: true });
  const results = [];
  async function setup(options = {}) {
    const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, ...options });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message)); page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.goto(process.env.GAME_URL || 'http://127.0.0.1:8000/'); await page.waitForFunction(() => window.IslandGame?.ready());
    assert.equal(await page.evaluate(() => IslandGame.snapshot().island), 'dawn');
    await page.evaluate(() => {
      const iframe = document.createElement('iframe'); iframe.name = 'input-harness';
      Object.assign(iframe.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', border: '0', zIndex: '99999' }); document.body.append(iframe);
      iframe.contentDocument.open(); iframe.contentDocument.write(`<!doctype html><html lang="vi"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
      body{margin:0;background:#173644;color:white;font:14px sans-serif;overflow:hidden}canvas{display:block;margin:20px;width:calc(100vw - 40px);height:auto;image-rendering:pixelated;outline:none;max-height:55vh;object-fit:fill}
      #joystick{position:fixed;left:20px;bottom:20px;width:112px;height:112px;border-radius:50%;background:#376777;touch-action:none}button{position:fixed;right:20px;width:90px;height:80px;touch-action:none}#attack{bottom:20px}#dodge{bottom:120px}textarea{position:fixed;left:20px;bottom:160px;width:120px;height:35px}pre{margin:20px;white-space:pre-wrap;font-size:12px}</style></head><body>
      <canvas id="surface" width="320" height="180" tabindex="0" aria-label="Canvas kiểm thử input"></canvas><pre id="readout">Fixture input Task 30 — không điều khiển Phượng hoặc Quy</pre>
      <div id="joystick" role="group" aria-label="Joystick kiểm thử"></div><button id="attack">Tấn công thử</button><button id="dodge">Ý định né</button><textarea aria-label="Kiểm tra nhập chữ"></textarea></body></html>`); iframe.contentDocument.close();
    });
    const frame = page.frames().find(f => f.name() === 'input-harness');
    await frame.evaluate(async base => {
      const { SemanticInput, DEFAULT_INPUT_BINDINGS } = await import(new URL('src/island/SemanticInput.mjs', base));
      const { BrowserInput, VirtualJoystick, VirtualActionButton } = await import(new URL('src/island/InputDevices.mjs', base));
      const { screenToWorld } = await import(new URL('src/island/RenderPrimitives.mjs', base));
      const { assistedAim } = await import(new URL('src/island/InputIntents.mjs', base));
      const canvas = document.querySelector('canvas'), camera = { x: 100.4, y: 50.6 }, origin = { x: 160, y: 90 };
      const controls = () => {
        const input = new SemanticInput(), bindings = structuredClone(DEFAULT_INPUT_BINDINGS); bindings.mouse[2] = 'skill_primary';
        const adapter = new BrowserInput({ canvas, input, bindings, getCamera: () => camera, getActorOrigin: () => origin });
        const stick = new VirtualJoystick(document.querySelector('#joystick'), input);
        const attack = new VirtualActionButton(document.querySelector('#attack'), input, 'basic_attack');
        const dodge = new VirtualActionButton(document.querySelector('#dodge'), input, 'dodge');
        return { input, adapter, dispose() { stick.dispose(); attack.dispose(); dodge.dispose(); adapter.dispose(); } };
      };
      const harness = { canvas, camera, origin, current: controls(), old: [] };
      harness.sample = () => {
        const snapshot = harness.current.adapter.sample(); document.querySelector('#readout').textContent = 'Fixture input Task 30\n' + JSON.stringify(snapshot.axes) + '\n' + JSON.stringify(snapshot.actions.dodge);
        const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false; ctx.fillStyle = '#173644'; ctx.fillRect(0,0,320,180);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(56,35,8,8); ctx.strokeStyle = '#ffe487'; ctx.beginPath(); ctx.moveTo(60,39); ctx.lineTo(60+snapshot.axes.aim_x*30,39+snapshot.axes.aim_y*30); ctx.stroke(); return snapshot;
      };
      harness.clientFor = world => { const r = canvas.getBoundingClientRect(); return { x: r.left + (world.x-Math.round(camera.x))*r.width/canvas.width, y: r.top + (world.y-Math.round(camera.y))*r.height/canvas.height }; };
      harness.reenter = () => { harness.current.dispose(); harness.old.push(harness.current.input); harness.current = controls(); };
      harness.assistFallback = () => assistedAim({ origin, fallbackAim: {x:1,y:0}, target: null, range: 40 });
      window.InputHarness = harness; canvas.focus(); harness.sample();
    }, page.url());
    return { context, page, frame, errors };
  }
  try {
    for (const dpr of [1, 2]) {
      const { context, page, frame, errors } = await setup({ deviceScaleFactor: dpr });
      const sample = () => frame.evaluate(() => InputHarness.sample());
      const aimPoint = await frame.evaluate(() => InputHarness.clientFor({ x:260, y:90 }));
      await page.mouse.move(aimPoint.x, aimPoint.y); await page.keyboard.down('a');
      const independent = await sample(); assert.equal(independent.axes.move_x, -1); assert(Math.abs(independent.axes.aim_x-1)<0.01); assert(Math.abs(independent.axes.aim_y)<0.01);
      await page.keyboard.down('w'); const diagonal = await sample(); assert(Math.abs(Math.hypot(diagonal.axes.move_x, diagonal.axes.move_y)-1)<1e-10);
      await page.keyboard.up('a'); await page.keyboard.up('w');
      await page.keyboard.down('Space'); assert((await sample()).actions.dodge.justPressed); assert.equal((await sample()).actions.basic_attack.justPressed, false); await page.keyboard.up('Space');
      await frame.evaluate(() => InputHarness.current.input.endFrame());
      await page.mouse.click(aimPoint.x, aimPoint.y); assert((await sample()).actions.basic_attack.justPressed);
      await frame.evaluate(() => InputHarness.current.input.endFrame());
      await page.mouse.click(aimPoint.x, aimPoint.y, { button:'right' }); assert((await sample()).actions.skill_primary.justPressed);
      await frame.evaluate(() => InputHarness.current.input.setContext('menu')); await page.mouse.click(aimPoint.x, aimPoint.y); assert.equal((await sample()).actions.basic_attack.justPressed, false);
      await frame.locator('#attack').focus(); await page.keyboard.press('Escape'); assert((await sample()).actions.pause.justPressed);
      await frame.evaluate(() => InputHarness.current.input.setContext('gameplay')); await frame.locator('canvas').focus();
      await page.keyboard.down('w'); await frame.locator('textarea').focus(); assert.equal((await sample()).axes.move_y, 0); await page.keyboard.up('w');
      await page.keyboard.press('Space'); assert.equal((await sample()).actions.dodge.justPressed, false);
      await frame.locator('canvas').focus(); await page.keyboard.down('d'); await frame.evaluate(() => window.dispatchEvent(new Event('blur'))); assert.equal((await sample()).axes.move_x, 0); await page.keyboard.up('d');
      await page.mouse.move(aimPoint.x, aimPoint.y); await frame.evaluate(() => InputHarness.camera.y += 50); assert((await sample()).axes.aim_y > 0);
      await page.mouse.move(5, 5); const before = (await sample()).axes.aim_y; await frame.evaluate(() => InputHarness.camera.y += 50); assert.equal((await sample()).axes.aim_y, before);
      for (const viewport of [{width:844,height:390},{width:390,height:844}]) {
        await page.setViewportSize(viewport); await page.waitForTimeout(80);
        await frame.evaluate(() => InputHarness.camera.y = 50.6);
        const p = await frame.evaluate(() => InputHarness.clientFor({ x:260,y:InputHarness.origin.y })); await page.mouse.move(p.x,p.y);
        const value = await sample(); assert(Math.abs(value.axes.aim_x-1)<0.01 && Math.abs(value.axes.aim_y)<0.01);
      }
      await page.setViewportSize({width:1366,height:768}); await page.waitForTimeout(80);
      for (let i=0;i<3;i++) await frame.evaluate(() => InputHarness.reenter());
      await frame.locator('canvas').focus(); await page.keyboard.press('Space'); assert((await sample()).actions.dodge.justPressed);
      assert(await frame.evaluate(() => InputHarness.old.every(input => !input.snapshot().actions.dodge.justPressed)));
      assert.equal((await frame.evaluate(() => InputHarness.assistFallback())).targetId, null);
      await page.screenshot({path:path.join(out,`desktop-dpr${dpr}.png`)});
      await frame.evaluate(() => InputHarness.current.dispose());
      assert.equal(await page.evaluate(() => IslandGame.snapshot().island),'dawn'); assert.deepEqual(errors,[]);
      results.push({kind:'desktop',dpr,independent:independent.axes,diagonal:diagonal.axes,resizeCases:2,reentries:3,errors}); await context.close();
    }
    const {context,page,frame,errors}=await setup({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
    const rect=selector=>frame.locator(selector).boundingBox(); const stick=await rect('#joystick'),button=await rect('#attack');
    const touch={x:stick.x+stick.width/2+20,y:stick.y+stick.height/2+10,id:1},attack={x:button.x+button.width/2,y:button.y+button.height/2,id:2};
    const cdp=await context.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch]});
    const analog=await frame.evaluate(()=>InputHarness.sample()); assert(analog.axes.move_x>0&&analog.axes.move_y>0); assert(Math.abs(analog.axes.move_x/analog.axes.move_y-2)<1e-6); assert(Math.hypot(analog.axes.move_x,analog.axes.move_y)<1);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch,attack]});
    const both=await frame.evaluate(()=>InputHarness.sample()); assert(both.actions.basic_attack.justPressed); assert.deepEqual(both.axes,analog.axes);
    await page.screenshot({path:path.join(out,'mobile-multitouch.png')});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
    const cancelled=await frame.evaluate(()=>InputHarness.sample()); assert.equal(cancelled.axes.move_x,0); assert.equal(cancelled.actions.basic_attack.pressed,false);
    await frame.evaluate(()=>InputHarness.current.input.endFrame()); await frame.locator('#dodge').tap();
    assert((await frame.evaluate(()=>InputHarness.sample())).actions.dodge.justPressed);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch]}); await page.setViewportSize({width:844,height:390}); await page.waitForTimeout(100); assert.equal((await frame.evaluate(()=>InputHarness.sample())).axes.move_x,0);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
    await frame.evaluate(()=>InputHarness.current.dispose()); assert.deepEqual(errors,[]);
    results.push({kind:'mobile-emulated',analog:analog.axes,simultaneousAttack:both.actions.basic_attack,cancelled:cancelled.axes,errors}); await context.close();
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
    console.log('PASS input browser: desktop DPR1/2, independent aim, edges/contexts/focus, 4 resize cases, 6 re-entries, emulated multi-touch attack/cancel/rotation; 3 screenshots; zero page/asset errors');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
