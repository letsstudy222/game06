const assert = require("node:assert/strict"),
  fs = require("node:fs");
const { chromium } = require("playwright");
(async () => {
  const { getIsland } = await import("../src/island/islands.mjs"),
    { route, corners } = await import("./route-helper.mjs");
  const map = getIsland("dawn");
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    hasTouch: true,
  });
  await context.addInitScript(() =>
    localStorage.setItem("nhat-diem.farm.v1", "legacy-save-untouched"),
  );
  const page = await context.newPage(),
    errors = [],
    bad = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push(r.url());
  });
  page.on("request", (r) => requests.push(r.url()));
  const url = process.env.GAME_URL || "http://127.0.0.1:8000";
  await page.goto(url);
  await page.waitForFunction(
    () => window.IslandGame?.ready(),
    {},
    { timeout: 30000 },
  );
  await page.evaluate(() => document.fonts.ready);
  const snap = () => page.evaluate(() => IslandGame.snapshot());
  fs.mkdirSync("artifacts", { recursive: true });
  async function shot(name) {
    await page.screenshot({ path: `artifacts/${name}.png` });
  }
  async function axis(key, goal) {
    const current = (await snap()).player[key],
      delta = goal - current;
    if (Math.abs(delta) < 1) return;
    const sign = Math.sign(delta),
      code =
        key === "x"
          ? sign > 0
            ? "ArrowRight"
            : "ArrowLeft"
          : sign > 0
            ? "ArrowDown"
            : "ArrowUp";
    await page.keyboard.down(code);
    try {
      await page.waitForFunction(
        ({ key, goal, sign }) =>
          sign * (IslandGame.snapshot().player[key] - goal) >= -1,
        { key, goal, sign },
        { timeout: 9000 },
      );
    } catch (error) {
      console.log("STUCK", key, goal, (await snap()).player);
      await shot("qa-stuck");
      throw error;
    } finally {
      await page.keyboard.up(code);
    }
  }
  async function travel(goal) {
    await page.locator("#island").focus();
    const from = (await snap()).player,
      // Follow a safe center corridor: allow margin for browser key-up latency.
      path = corners(route(map, from, goal, 12));
    assert(path.length, "connected path to " + JSON.stringify(goal));
    for (const p of path) {
      await axis("x", p.x);
      await axis("y", p.y);
    }
    await page.waitForTimeout(350);
    assert(
      Math.hypot(
        (await snap()).player.x - goal.x,
        (await snap()).player.y - goal.y,
      ) < 8,
    );
  }
  assert.equal(
    await page
      .locator(".hotbar button:not(.drag-handle):not(#interaction)")
      .count(),
    3,
  );
  assert.equal(
    await page.locator("footer,#minimap,#quests,#seed-choice").count(),
    0,
  );
  assert.equal(await page.locator("#loading").isVisible(), false);
  const r = await page.locator("#island").boundingBox();
  assert(r.width >= 1366 && r.height >= 768, "game fills the browser");
  assert.equal(
    await page
      .locator("#island")
      .evaluate((c) => getComputedStyle(c).imageRendering),
    "pixelated",
  );
  assert.equal((await snap()).player.animation, "idle");
  await shot("dawn-meadow");
  await page.keyboard.down("ArrowRight");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "move",
  );
  await page.waitForTimeout(180);
  await page.keyboard.up("ArrowRight");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "idle",
  );
  await page.keyboard.down("ShiftLeft");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "fly",
  );
  await page.keyboard.up("ShiftLeft");
  await page.keyboard.press("KeyJ");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "attack",
  );
  await page.keyboard.press("KeyK");
  await page.waitForFunction(
    () => IslandGame.snapshot().player.animation === "fire",
  );
  await page.waitForTimeout(200);
  await shot("dawn-fire");
  assert((await snap()).cooldowns.fire > 0);
  console.log(
    "PASS production world/hero, fullscreen UI and idle/move/hover/attack/fire",
  );
  await page.keyboard.press("KeyH");
  assert.equal(await page.locator("#help-dialog").isVisible(), true);
  const helpTime = (await snap()).time;
  await page.waitForTimeout(120);
  assert.equal((await snap()).time, helpTime);
  await page.keyboard.press("KeyH");
  assert.equal(await page.locator("#help-dialog").isVisible(), false);
  await page.keyboard.press("Escape");
  const frozen = await snap();
  await page.waitForTimeout(140);
  assert.deepEqual(await snap(), frozen);
  await page.keyboard.press("Escape");
  await travel(map.checkpoints.cliff);
  await page.screenshot({ path: "artifacts/tilemap/cliffs.png" });
  await travel(map.checkpoints.forest);
  assert.equal((await snap()).region, "Lối rừng ánh sớm");
  await shot("dawn-forest");
  console.log("PASS authored forest trail reached with real keyboard movement");
  await travel(map.shrine);
  assert.equal((await snap()).nearShrine, true);
  assert.equal(await page.locator("#interaction").isVisible(), true);
  await page.keyboard.press("KeyE");
  await page.waitForFunction(() => IslandGame.snapshot().shrineActivated);
  await shot("dawn-ruins");
  assert.match(await page.locator("#message").textContent(), /thức giấc/);
  await page.keyboard.press("KeyE");
  assert.equal((await snap()).shrineActivated, false);
  console.log(
    "PASS ruins reachable, proximity prompt and actual shrine interaction",
  );
  await travel(map.checkpoints.beach);
  assert.equal((await snap()).region, "Bãi biển phía Nam");
  await shot("dawn-beach");
  console.log(
    "PASS southern stairs/beach reached; all four regions have live screenshots",
  );
  for (const [label, width, height] of [
    ["portrait", 390, 844],
    ["landscape", 844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.touchscreen?.tap?.(1, 1).catch(() => {});
    await page.waitForTimeout(200);
    const v = await page.evaluate(() => IslandGame.view());
    assert(
      v.camera.x >= 0 &&
        v.camera.y >= 0 &&
        v.camera.x + v.width <= map.width &&
        v.camera.y + v.height <= map.height,
    );
    assert(
      await page.locator("#island").evaluate((c) => {
        const g = c.getContext("2d");
        return [
          [0, 0],
          [c.width - 1, 0],
          [0, c.height - 1],
          [c.width - 1, c.height - 1],
        ].every(([x, y]) => g.getImageData(x, y, 1, 1).data[3] === 255);
      }),
      "opaque authored world at all camera edges",
    );
    await page.screenshot({ path: `artifacts/ui-after/${label}-shore.png` });
  }
  await page.setViewportSize({ width: 1366, height: 768 });

  await travel(map.hazards[0]);
  await page.waitForFunction(() => IslandGame.snapshot().player.hp < 100);
  const hp = (await snap()).player.hp;
  assert.equal(
    await page.locator("#hp-value").textContent(),
    `${Math.ceil(hp)} / 100`,
  );
  await page.keyboard.down("ShiftLeft");
  await page.waitForFunction(() => IslandGame.snapshot().player.hovering);
  await page.waitForTimeout(1150);
  assert.equal((await snap()).player.hp, hp);
  await page.keyboard.up("ShiftLeft");
  await page.waitForFunction((h) => IslandGame.snapshot().player.hp < h, hp, {
    timeout: 2000,
  });
  assert.equal((await snap()).player.animation, "hurt");
  console.log("PASS real damage, hurt pose, HUD health and hover immunity");
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(100);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  const x = (await snap()).player.x;
  await page.waitForTimeout(120);
  assert.equal((await snap()).player.x, x);
  await page.keyboard.up("ArrowRight");
  assert.equal(
    await page.evaluate(() => localStorage.getItem("nhat-diem.farm.v1")),
    "legacy-save-untouched",
  );
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
      { timeout: 2500 },
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const view = await page.evaluate(() => IslandGame.view());
    assert(Number.isInteger(view.scale));
  }
  assert(
    !requests.some((u) =>
      /production\/dawn\/|production\/manifest|world-master|props-master|phoenix\/master|phoenix-player|legacy\/|garden-detailed|farmer-walk|reference_/.test(
        u,
      ),
    ),
    "only normalized production art loads",
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(bad, []);
  console.log(
    "PASS focus release, legacy save protection, integer fullscreen scaling and zero console/asset errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
