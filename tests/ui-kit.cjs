const assert = require("node:assert/strict");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
    }),
    page = await context.newPage(),
    errors = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  await page.goto(process.env.GAME_URL || "http://127.0.0.1:8000");
  await page.waitForFunction(() => window.FarmGame && FarmGame.assetsReady());
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("#continue-game").isDisabled(), true);
  assert.equal(
    await page.locator(".game-shell").evaluate((e) => e.inert),
    true,
  );
  assert.equal(await page.evaluate(() => FarmGame.view().scale), 2);
  await page.locator("#start-game").focus();
  await page.keyboard.press("ArrowDown");
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "title-settings",
    "keyboard menu skips disabled Continue",
  );
  await page.keyboard.press("Enter");
  await page.waitForSelector('[data-setting="motion"]');
  await page.locator('[data-setting="motion"]').uncheck();
  await page.locator('[data-setting="showMinimap"]').uncheck();
  await page.locator('[data-setting="sound"]').check();
  assert.deepEqual(await page.evaluate(() => TinyFarm.Settings.snapshot()), {
    sound: true,
    motion: false,
    showMinimap: false,
  });
  const initial = await page.evaluate(() => FarmGame.snapshot().minute);
  await page.waitForTimeout(150);
  assert.equal(
    await page.evaluate(() => FarmGame.snapshot().minute),
    initial,
    "title/menu never advances the farm clock",
  );
  await page.locator("#close-modal").click();
  await page.locator("#quit-game").click();
  assert.match(
    await page.locator("#modal-body").textContent(),
    /đóng thẻ trình duyệt/,
  );
  await page.locator("[data-close]").click();
  await page.locator("#start-game").click();
  assert.equal(await page.locator("#welcome").isVisible(), false);
  assert.equal(await page.locator(".minimap-panel").isVisible(), false);
  assert.equal(
    await page.locator("#sound").getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    await page
      .locator("#garden")
      .evaluate((c) => [c.width, c.height].join("x")),
    "480x270",
  );
  assert.equal(
    await page
      .locator("#garden")
      .evaluate((c) => getComputedStyle(c).imageRendering),
    "pixelated",
  );
  assert.equal(await page.locator("#hud-energy").textContent(), "100/100");
  assert.equal(await page.locator("#skill-value").textContent(), "1 / 1");
  console.log(
    "PASS independent title menu, keyboard navigation, settings and honest web exit",
  );
  async function plot() {
    const p = await page.evaluate(() => FarmGame.toScreen(83, 177));
    await page.mouse.click(p.x, p.y);
  }
  await page.locator('[data-tool="hoe"]').click();
  await plot();
  await page.waitForFunction(() => FarmGame.snapshot().plots[0].tilled);
  assert.equal(await page.locator("#hud-energy").textContent(), "98/100");
  await page.locator('[data-tool="seed"]').click();
  await plot();
  await page.waitForFunction(
    () => FarmGame.snapshot().plots[0].crop === "radish",
  );
  assert.equal(await page.locator('[data-count="seed"]').textContent(), "5");
  await page.locator("#pet-shortcut").click();
  await page.waitForFunction(() => FarmGame.snapshot().plots[0].watered);
  assert.equal(await page.locator("#skill-value").textContent(), "0 / 1");
  const en = await page.evaluate(() => FarmGame.snapshot().energy);
  await page.locator("#pet-shortcut").click();
  assert.equal(await page.evaluate(() => FarmGame.snapshot().energy), en);
  console.log(
    "PASS HUD mirrors real crop actions, seed quantities, energy and daily phoenix skill",
  );
  await page.locator("#settings").click();
  await page.locator('[data-setting="showMinimap"]').check();
  await page.locator("#close-modal").click();
  const r = await page.locator("#minimap").boundingBox();
  await page.mouse.click(
    r.x + (230 / 480) * r.width,
    r.y + (210 / 320) * r.height,
  );
  await page.waitForFunction(
    () =>
      Math.hypot(
        FarmGame.snapshot().player.x - 230,
        FarmGame.snapshot().player.y - 210,
      ) < 7,
    {},
    { timeout: 15000 },
  );
  const screen = await page.evaluate(() => {
    const p = FarmGame.snapshot().player,
      v = TinyFarm.viewport,
      screen = v.toScreen(p.x, p.y),
      back = v.toWorld(screen.x, screen.y);
    return { point: p, back, view: FarmGame.view() };
  });
  assert(
    Math.abs(screen.point.x - screen.back.x) < 0.01 &&
      Math.abs(screen.point.y - screen.back.y) < 0.01,
  );
  assert(screen.view.camera.y > 0);
  await page.locator("#pause").click();
  await page.locator("#return-title").click();
  assert.equal(await page.locator("#continue-game").isEnabled(), true);
  const before = await page.evaluate(() => FarmGame.snapshot());
  await page.locator("#start-game").click();
  await page.waitForSelector("#confirm-reset");
  await page.locator("[data-close]").click();
  assert.deepEqual(
    await page.evaluate(() => FarmGame.snapshot()),
    before,
    "cancel new game preserves progress",
  );
  await page.locator("#continue-game").click();
  assert.equal(
    await page.locator("#pause").getAttribute("aria-pressed"),
    "false",
  );
  await page.reload();
  await page.waitForFunction(() => window.FarmGame && FarmGame.assetsReady());
  assert.equal(await page.locator("#continue-game").isEnabled(), true);
  assert.equal(
    await page.evaluate(() => TinyFarm.Settings.get("motion")),
    false,
  );
  await page.locator("#continue-game").click();
  assert.equal(await page.evaluate(() => FarmGame.snapshot().seeds.radish), 5);
  console.log(
    "PASS minimap navigation, camera coordinates, continue/reset protection and persisted settings/save",
  );
  await page.locator("#journal-toggle").click();
  await page.locator("#tab-pet").click();
  await page.locator('[data-form="1"]').click();
  await page.locator('[data-form="3"]').click();
  assert.equal(await page.evaluate(() => TinyFarm.companion.form), 3);
  await page.locator("#journal-close").click();
  for (const [width, height, scale] of [
    [1920, 1080, 3],
    [1366, 768, 2],
    [960, 640, 1],
    [390, 844, null],
    [320, 844, null],
  ]) {
    await page.setViewportSize({ width, height });
    await page.waitForFunction(
      () => document.documentElement.scrollWidth <= innerWidth,
      {},
      { timeout: 2000 },
    );
    if (scale)
      await page.waitForFunction((n) => FarmGame.view().scale === n, scale);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForFunction(() => FarmGame.view().scale === 2);
  await page.screenshot({
    path: "/tmp/tiny-farm-final-play.png",
    fullPage: true,
  });
  await page.locator("#return-title").click();
  await page.screenshot({
    path: "/tmp/tiny-farm-final-title.png",
    fullPage: true,
  });
  assert(
    !requests.some((u) => /reference_.*\.png/.test(u)),
    "Concept sheets must never be requested at runtime",
  );
  assert(
    !requests.some((u) => /fonts\.googleapis|fonts\.gstatic/.test(u)),
    "Fonts are local",
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS exact integer scales, 320–1920px layouts, local font, production atlas and no browser errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
