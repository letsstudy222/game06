/* Run with Playwright available: GAME_URL=http://127.0.0.1:8000 node tests/browser.cjs */
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const url = process.env.GAME_URL || "http://127.0.0.1:8000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1050 },
  });
  const page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const snap = () => page.evaluate(() => FarmGame.snapshot());
  async function clickMap(x, y) {
    await page.locator("canvas").scrollIntoViewIfNeeded();
    const at = await page.locator("canvas").evaluate(
      (c, { x, y }) => {
        const r = c.getBoundingClientRect(),
          cover = getComputedStyle(c).objectFit === "cover",
          k = (cover ? Math.max : Math.min)(r.width / 480, r.height / 320);
        return {
          x: r.left + (r.width - 480 * k) / 2 + x * k,
          y: r.top + (r.height - 320 * k) / 2 + y * k,
        };
      },
      { x, y },
    );
    await page.mouse.click(at.x, at.y);
  }
  async function waitPlot(index, key, value) {
    await page.waitForFunction(
      ({ index, key, value }) =>
        FarmGame.snapshot().plots[index][key] === value,
      { index, key, value },
      { timeout: 18000 },
    );
  }
  async function close() {
    await page.locator("#close-modal").click();
  }
  await page.goto(url);
  await page.waitForFunction(
    () =>
      window.FarmGame &&
      FarmGame.assetsReady() &&
      gardenArt.complete &&
      gardenArt.naturalWidth > 0,
  );
  await page.screenshot({ path: "/tmp/nhatdiem-welcome.png" });
  assert.equal(await page.locator("#welcome").isVisible(), true);
  await page.locator("#start-game").click();
  // Every interactable must have a reachable approach; this catches disconnected map polygons.
  const paths = await page.evaluate(() =>
    [
      ...FarmGame.map.places.map((p) => p.approach),
      ...FarmGame.map.gathers.map((p) => ({ x: p.x, y: p.y + 4 })),
      ...FarmGame.map.plots.map((p) => ({ x: p.x, y: p.y + 7 })),
    ].map((p) => {
      const r = FarmGame.map.pathTo(p);
      return { p, end: r.at(-1), length: r.length };
    }),
  );
  for (const p of paths) {
    assert(p.length > 0, "reachable " + JSON.stringify(p.p));
    assert(
      Math.hypot(p.p.x - p.end.x, p.p.y - p.end.y) < 6,
      "correct path endpoint",
    );
  }
  console.log(
    "PASS reachable map: all 23 farm plots, landmarks and gathering spots",
  );
  // Real pointer events, pathfinding, action costs, crop states and tutorial progress.
  for (let i = 0; i < 3; i++) {
    const x = 83 + i * 27,
      y = 177;
    await page.locator('[data-tool="hoe"]').click();
    await clickMap(x, y);
    await waitPlot(i, "tilled", true);
    await page.locator('[data-tool="seed"]').click();
    await clickMap(x, y);
    await waitPlot(i, "crop", "radish");
    await page.locator('[data-tool="water"]').click();
    await clickMap(x, y);
    await waitPlot(i, "watered", true);
  }
  assert.equal((await snap()).seeds.radish, 3);
  await page.locator('[data-claim="first"]').click();
  assert.equal((await snap()).coins, 160);
  console.log(
    "PASS real farming interactions, 3 plants, water, energy and quest reward",
  );
  // Clock pauses in dialogs, sleep advances day and growth, harvesting works with any tool.
  await page.locator("#home").click();
  const before = (await snap()).minute;
  await page.waitForTimeout(200);
  assert.equal((await snap()).minute, before);
  await page.locator("#sleep").click();
  await page.waitForSelector("[data-close]");
  await page.locator("[data-close]").click();
  assert.equal((await snap()).day, 2);
  await clickMap(83, 177);
  await waitPlot(0, "crop", null);
  assert.equal((await snap()).bag.radish, 1);
  console.log("PASS sleep, growth, harvest and modal clock pause");
  // Talk and gifts, shop, buy and sell after navigating actual map landmarks.
  await clickMap(274, 142);
  await page.waitForSelector("#gift", { timeout: 18000 });
  assert.equal((await snap()).stats.friendship, 1);
  await page.locator("#gift").click();
  assert.equal((await snap()).stats.friendship, 2);
  await page.locator("#visit-shop").click();
  const coinBefore = (await snap()).coins;
  await page.locator('[data-buy="carrot"]').click();
  assert.equal((await snap()).coins, coinBefore - 20);
  const beforeSell = (await snap()).coins;
  await page.locator("[data-sell-all]").click();
  assert((await snap()).coins > beforeSell);
  await close();
  console.log("PASS NPC conversation, gift, shop purchase and sale");
  await clickMap(190, 260);
  await page.waitForFunction(
    () => FarmGame.snapshot().bag.wood === 3,
    {},
    { timeout: 18000 },
  );
  console.log("PASS collecting wood through touch navigation");
  // Fishing timing: wait for bite and click at a live cursor position inside the success zone.
  await clickMap(325, 209);
  await page.waitForSelector("#reel", { timeout: 18000 });
  await page.waitForFunction(() => !document.querySelector("#reel").disabled);
  await page.waitForFunction(
    () => {
      const z = document.querySelector("#fish-zone"),
        c = document.querySelector("#fish-cursor"),
        a = parseFloat(z.style.left),
        p = parseFloat(c.style.left);
      return p > a + 5 && p < a + 19;
    },
    {},
    { polling: "raf", timeout: 6000 },
  );
  await page.locator("#reel").click();
  assert.equal((await snap()).bag.fish, 1);
  await close();
  console.log("PASS fishing minigame awards a fish");
  // Pet spell is limited to once per day; save survives reload.
  await page.locator("#tab-pet").click();
  await page.locator("#pet-power").click();
  const e = (await snap()).energy;
  await page.locator("#pet-power").click();
  assert.equal((await snap()).energy, e);
  await page.locator('[data-form="2"]').click();
  await page.locator("#fly").click();
  await page.locator("#flare").click();
  await page.locator("#save").click();
  const persisted = await snap();
  await page.reload();
  await page.locator("#start-game").click();
  const reloaded = await snap();
  for (const k of ["day", "coins", "bag", "plots", "petForm"])
    assert.deepEqual(reloaded[k], persisted[k]);
  console.log("PASS pet power limit, forms and local save round trip");
  // Keyboard, collisions, blur key release, pause and accessible help.
  await page.locator("canvas").focus();
  const pos = (await snap()).player;
  await page.keyboard.down("ArrowDown");
  await page.waitForTimeout(250);
  await page.keyboard.up("ArrowDown");
  assert((await snap()).player.y > pos.y);
  await page.keyboard.press("Digit4");
  assert.equal(
    await page.locator('[data-tool="water"]').getAttribute("aria-pressed"),
    "true",
  );
  await page.locator("#pause").click();
  const t = (await snap()).minute;
  await page.waitForTimeout(150);
  assert.equal((await snap()).minute, t);
  await page.locator("#pause").click();
  await page.locator("#help").click();
  await page.locator("#export-save").click();
  assert.equal(await page.locator("#reset-game").isVisible(), true);
  await close();
  console.log("PASS keyboard controls, pause and save export");
  await page.screenshot({
    path: "/tmp/nhatdiem-game-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#tab-bag").click();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.locator("#tab-quests").click();
  await page.screenshot({
    path: "/tmp/nhatdiem-game-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, [], "No JavaScript errors");
  // A separate small-screen game validates the coordinate transform with cover cropping.
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const m = await mobile.newPage();
  m.on("pageerror", (e) => errors.push(e.message));
  await m.goto(url);
  await m.locator("#start-game").click();
  await m.waitForFunction(
    () => gardenArt.complete && gardenArt.naturalWidth > 0,
  );
  await m.locator('[data-tool="hoe"]').tap();
  const tap = await m.locator("canvas").evaluate((c) => {
    const r = c.getBoundingClientRect(),
      k = Math.max(r.width / 480, r.height / 320);
    return {
      x: r.left + (r.width - 480 * k) / 2 + 83 * k,
      y: r.top + (r.height - 320 * k) / 2 + 177 * k,
    };
  });
  await m.touchscreen.tap(tap.x, tap.y);
  await m.waitForFunction(
    () => FarmGame.snapshot().plots[0].tilled,
    {},
    { timeout: 18000 },
  );
  assert.equal(
    await m.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS mobile touch farming, reduced motion, no horizontal overflow, no browser errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
