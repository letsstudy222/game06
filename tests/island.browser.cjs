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
  });
  await context.addInitScript(() =>
    localStorage.setItem("nhat-diem.farm.v1", "legacy-farm-save"),
  );
  const page = await context.newPage(),
    errors = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  const url = process.env.GAME_URL || "http://127.0.0.1:8000";
  await page.goto(url);
  await page.waitForFunction(() => window.IslandGame?.ready());
  await page.evaluate(() => document.fonts.ready);
  const snap = () => page.evaluate(() => IslandGame.snapshot());
  assert.equal(await page.locator(".hotbar button").count(), 3);
  assert.equal(
    await page
      .locator("#minimap,#quests,#seed-choice,#garden,.toolbelt")
      .count(),
    0,
  );
  assert.equal(
    await page
      .locator("#island")
      .evaluate((c) => [c.width, c.height].join("x")),
    "480x270",
  );
  assert.equal(
    await page
      .locator("#island")
      .evaluate((c) => getComputedStyle(c).imageRendering),
    "pixelated",
  );
  const initial = await snap();
  assert.equal(initial.player.animation, "idle");
  assert.equal(await page.locator("#hp-value").textContent(), "100 / 100");
  await page.screenshot({ path: "/tmp/nhatdiem-island.png", fullPage: true });
  async function axis(code, key, goal) {
    await page.keyboard.down(code);
    await page.waitForFunction(
      ({ key, goal }) =>
        Math.abs(IslandGame.snapshot().player[key] - goal) < 1.8,
      { key, goal },
      { timeout: 7000 },
    );
    await page.keyboard.up(code);
  }
  await axis("ArrowRight", "x", 333);
  assert.equal((await snap()).player.animation, "move");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "idle",
  );
  await axis("ArrowUp", "y", 208);
  await page.keyboard.down("ArrowRight");
  await page.waitForFunction(() => IslandGame.snapshot().player.facing.x > 0);
  await page.keyboard.up("ArrowRight");
  await page.keyboard.press("KeyJ");
  await page.waitForFunction(() => IslandGame.snapshot().targets[0].hp === 2);
  assert.equal((await snap()).player.animation, "attack");
  await page.keyboard.press("KeyK");
  await page.waitForFunction(() => IslandGame.snapshot().targets[0].hp === 0);
  assert((await snap()).cooldowns.fire > 0);
  await page.keyboard.press("KeyK");
  assert.equal((await snap()).targets[0].hp, 0);
  console.log(
    "PASS phoenix is the only player; movement, idle, directional attack and fire hit a target",
  );
  await axis("ArrowLeft", "x", 225);
  await axis("ArrowDown", "y", 249);
  await page.waitForFunction(() => IslandGame.snapshot().player.hp < 100);
  const hp = (await snap()).player.hp;
  assert.equal(
    await page.locator("#hp-value").textContent(),
    `${Math.ceil(hp)} / 100`,
  );
  await page.keyboard.down("ShiftLeft");
  await page.waitForFunction(() => IslandGame.snapshot().player.hovering);
  await page.waitForTimeout(1250);
  assert.equal((await snap()).player.hp, hp, "hover avoids thorn damage");
  assert.equal((await snap()).player.animation, "fly");
  await page.keyboard.up("ShiftLeft");
  await page.waitForFunction((v) => IslandGame.snapshot().player.hp < v, hp, {
    timeout: 2000,
  });
  console.log("PASS real HP damage, UI health sync and hover immunity");
  await page.keyboard.press("Escape");
  const paused = await snap();
  await page.waitForTimeout(200);
  assert.deepEqual(await snap(), paused);
  await page.keyboard.press("Escape");
  await axis("ArrowRight", "x", 306);
  await axis("ArrowUp", "y", 226);
  await page.locator("#hover").click();
  await page.waitForFunction(() => IslandGame.snapshot().player.hovering);
  await page.locator("#hover").click();
  await page.waitForFunction(() => !IslandGame.snapshot().player.hovering);
  await page.locator("#help").click();
  const menuTime = (await snap()).time;
  await page.waitForTimeout(150);
  assert.equal((await snap()).time, menuTime);
  await page.keyboard.press("Escape");
  assert.equal((await snap()).paused, false);
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(100);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  const pos = (await snap()).player.x;
  await page.waitForTimeout(150);
  assert.equal((await snap()).player.x, pos);
  await page.keyboard.up("ArrowRight");
  console.log("PASS pause, help, hotbar hover and key release on lost focus");
  for (const [width, height] of [
    [1920, 1080],
    [960, 640],
    [390, 844],
    [320, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.waitForFunction(
      () => document.documentElement.scrollWidth <= innerWidth,
      {},
      { timeout: 2000 },
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const view = await page.evaluate(() => IslandGame.view());
    if (width >= 960) assert(Number.isInteger(view.scale));
  }
  assert.equal(
    await page.evaluate(() => localStorage.getItem("nhat-diem.farm.v1")),
    "legacy-farm-save",
  );
  assert(
    !requests.some((u) =>
      /legacy\/|farm\.js|garden-detailed|farmer-walk|an-gardener|reference_/.test(
        u,
      ),
    ),
    "old farm runtime and references must not load",
  );
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForFunction(() => IslandGame.view().scale === 2);
  await page.screenshot({
    path: "/tmp/nhatdiem-island-final.png",
    fullPage: true,
  });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const m = await mobile.newPage();
  m.on("pageerror", (e) => errors.push(e.message));
  await m.goto(url);
  await m.waitForFunction(() => window.IslandGame?.ready());
  await m.locator(".stick-base").scrollIntoViewIfNeeded();
  const stick = await m.locator(".stick-base").boundingBox(),
    x = stick.x + stick.width / 2,
    y = stick.y + stick.height / 2;
  const before = await m.evaluate(() => IslandGame.snapshot().player.x);
  const client = await mobile.newCDPSession(m);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: x + 25, y, id: 7 }],
  });
  await m.waitForTimeout(350);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  assert((await m.evaluate(() => IslandGame.snapshot().player.x)) > before + 5);
  const released = await m.evaluate(() => IslandGame.snapshot().player.x);
  await m.waitForTimeout(120);
  assert.equal(
    await m.evaluate(() => IslandGame.snapshot().player.x),
    released,
  );
  await m.locator("#fire").tap();
  await m.waitForFunction(() => IslandGame.snapshot().cooldowns.fire > 0);
  await m.locator("#hover").tap();
  await m.waitForFunction(() => IslandGame.snapshot().player.hovering);
  assert.equal(
    await m.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  await m.screenshot({
    path: "/tmp/nhatdiem-island-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    "PASS 320–1920px layout, touch actions, no old farm assets/save changes, no browser errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
