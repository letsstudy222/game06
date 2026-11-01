const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
(async () => {
  const { createMapFixture } = await import(pathToFileURL(path.join(__dirname, 'fixtures/layered-map.mjs')));
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const out = process.env.MAP_ARTIFACT_DIR || 'artifacts/map'; fs.mkdirSync(out, { recursive: true });
  const results = [];
  try {
    for (const dpr of [1, 2]) {
      const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: dpr });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      await page.goto(process.env.GAME_URL || 'http://127.0.0.1:8000/');
      await page.waitForFunction(() => window.IslandGame?.ready());
      assert.equal(await page.evaluate(() => IslandGame.snapshot().island), 'dawn');
      await page.evaluate(async fixture => {
        const { LayeredMapView } = await import(new URL('src/island/LayeredMapView.mjs', document.baseURI));
        const canvas = document.createElement('canvas'); canvas.id = 'map-fixture'; canvas.width = fixture.map.width; canvas.height = fixture.map.height;
        Object.assign(canvas.style, { position: 'fixed', left: '0', top: '0', zIndex: '9999', width: '320px', height: '240px', imageRendering: 'pixelated' });
        canvas.setAttribute('aria-label', 'Fixture kỹ thuật Task 29 — không phải gameplay Quy'); document.body.append(canvas);
        const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
        const view = new LayeredMapView(fixture.map, fixture.tilesets);
        const actor = { actorId: 'fixture.actor', depthY: 88, renderOrder: 0, bounds: { x: 106, y: 76, width: 12, height: 12 }, draw(c) { c.fillStyle = '#ffffff'; c.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height); } };
        // drawDepth gọi callback độc lập; closure giữ actor view do harness sở hữu.
        actor.draw = c => { c.fillStyle = '#ffffff'; c.fillRect(actor.bounds.x, actor.bounds.y, actor.bounds.width, actor.bounds.height); };
        const render = (deltaTime = 0, debugCurrents = false) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          view.draw(ctx, { camera: { x: 0, y: 0 }, width: canvas.width, height: canvas.height, actors: [actor], focusActorId: actor.actorId, deltaTime, debugCurrents });
          return { alpha: view.occlusion.alpha('fixture.coral'), pixel: [...ctx.getImageData(112, 80, 1, 1).data], water: [...ctx.getImageData(40, 40, 1, 1).data], smoothing: ctx.imageSmoothingEnabled };
        };
        window.MapFixture = { view, actor, render, canvas }; render();
      }, createMapFixture());
      const initial = await page.evaluate(() => MapFixture.render());
      assert.equal(initial.alpha, 1); assert.deepEqual(initial.pixel, [194, 105, 119, 255]); assert.deepEqual(initial.water, [23, 69, 89, 255]);
      await page.locator('#map-fixture').screenshot({ path: path.join(out, `opaque-dpr${dpr}.png`) });
      const faded = await page.evaluate(() => { MapFixture.render(0.1); return MapFixture.render(0.1); });
      assert.equal(faded.alpha, 0.4); assert(faded.pixel[0] > initial.pixel[0] && faded.pixel[1] > initial.pixel[1]);
      await page.locator('#map-fixture').screenshot({ path: path.join(out, `faded-dpr${dpr}.png`) });
      const restored = await page.evaluate(() => { MapFixture.actor.bounds.x = 240; MapFixture.render(0.1); return MapFixture.render(0.1); });
      assert.equal(restored.alpha, 1); assert.deepEqual(restored.pixel, initial.pixel);
      const currents = await page.evaluate(() => {
        const p = { x: 180, y: 50 }, before = JSON.stringify(MapFixture.view.getCurrentAt(p)), pose = JSON.stringify(MapFixture.actor);
        MapFixture.render(0, false); const disabled = JSON.stringify(MapFixture.view.getCurrentAt(p));
        MapFixture.render(0, true);
        return { before, disabled, after: JSON.stringify(MapFixture.view.getCurrentAt(p)), unchanged: pose === JSON.stringify(MapFixture.actor) };
      });
      assert.equal(currents.before, currents.disabled); assert.equal(currents.before, currents.after); assert(currents.unchanged);
      assert.deepEqual(JSON.parse(currents.before)[0].direction, { x: 0.6, y: 0.8 });
      await page.locator('#map-fixture').screenshot({ path: path.join(out, `current-debug-dpr${dpr}.png`) });
      const views = [];
      for (const [width, height] of [[390, 844], [844, 390]]) {
        await page.setViewportSize({ width, height });
        await page.waitForFunction(() => Math.round(document.querySelector('.game-frame').getBoundingClientRect().width) === Math.round(window.visualViewport?.width || innerWidth));
        const state = await page.evaluate(() => { MapFixture.render(); return { dpr: devicePixelRatio, game: IslandGame.view(), scale: getComputedStyle(MapFixture.canvas).imageRendering, pixel: [...MapFixture.canvas.getContext('2d').getImageData(112, 80, 1, 1).data] }; });
        assert.equal(state.dpr, dpr); assert(Number.isInteger(state.game.scale)); assert.equal(state.scale, 'pixelated'); assert.deepEqual(state.pixel, initial.pixel); views.push({ width, height });
      }
      await page.evaluate(() => { MapFixture.view.dispose(); MapFixture.canvas.remove(); delete window.MapFixture; });
      assert.equal(await page.evaluate(() => IslandGame.snapshot().island), 'dawn');
      assert.deepEqual(errors, []); results.push({ dpr, initial, faded, restored, views, currentPoseUnchanged: currents.unchanged, errors });
      await context.close();
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
    console.log('PASS map browser: 2 DPR contexts, 4 resize cases, layer/alpha pixels, fade/recovery, FX-independent current query, default Dawn unchanged; 6 screenshots; zero page/asset errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
