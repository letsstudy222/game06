const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { World, KEY } = require("../world.js");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const errors = [],
    base = process.env.GAME_URL || "http://127.0.0.1:8000";
  async function fixture(state) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 920 },
    });
    await context.addInitScript(
      ({ key, state }) => localStorage.setItem(key, JSON.stringify(state)),
      { key: KEY, state },
    );
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.locator("#start-game").click();
    await page.waitForFunction(
      () => gardenArt.complete && gardenArt.naturalWidth > 0,
    );
    return page;
  }
  const rainState = new World().s;
  rainState.day = 4;
  rainState.minute = 1190;
  rainState.energy = 20;
  rainState.started = true;
  rainState.plots[0] = {
    tilled: true,
    crop: "pumpkin",
    growth: 1,
    watered: true,
  };
  const rain = await fixture(rainState);
  assert.match(await rain.locator("#weather-label").textContent(), /Mưa/);
  await rain.screenshot({ path: "/tmp/nhatdiem-rain-night.png" });
  await rain.locator("#home").click();
  await rain.locator("#sleep").click();
  await rain.waitForSelector("[data-close]");
  assert.equal(
    await rain.evaluate(() => FarmGame.snapshot().plots[0].growth),
    2,
  );
  assert.equal(await rain.evaluate(() => FarmGame.snapshot().energy), 100);
  await rain.locator("[data-close]").click();
  console.log(
    "PASS rainy night rendering, hydrated pumpkin growth and morning recovery",
  );
  const restoreState = new World().s;
  restoreState.started = true;
  restoreState.day = 85;
  restoreState.coins = 400;
  restoreState.bag.wood = 8;
  restoreState.player = { x: 321, y: 266, facing: "down" };
  const end = await fixture(restoreState);
  assert.match(await end.locator("#calendar").textContent(), /Đông/);
  await end.locator('[data-travel="shrine"]').click();
  await end.waitForSelector("#restore", { timeout: 10000 });
  await end.locator("#restore").click();
  assert.equal(await end.evaluate(() => FarmGame.snapshot().restored), true);
  assert.equal(await end.evaluate(() => FarmGame.snapshot().coins), 50);
  assert.equal(await end.evaluate(() => FarmGame.snapshot().bag.wood), 0);
  await end.locator("#close-modal").click();
  await end.locator('[data-claim="village"]').click();
  assert.equal(await end.evaluate(() => FarmGame.snapshot().coins), 250);
  await end.screenshot({
    path: "/tmp/nhatdiem-restored-winter.png",
    fullPage: true,
  });
  console.log(
    "PASS winter calendar, altar restoration, exact material spending and final quest reward",
  );
  // A canceled cast consumes only its initial energy cost and never grants a fish.
  const fishState = new World().s;
  fishState.started = true;
  fishState.energy = 50;
  fishState.player = { x: 316, y: 213, facing: "right" };
  const fish = await fixture(fishState);
  await fish.locator('[data-travel="pond"]').click();
  await fish.waitForSelector("#reel");
  await fish.locator("#close-modal").click();
  await fish.waitForTimeout(2200);
  assert.equal(await fish.evaluate(() => FarmGame.snapshot().bag.fish), 0);
  assert.equal(await fish.evaluate(() => FarmGame.snapshot().energy), 47);
  console.log("PASS fishing cancel does not award duplicate items");
  // Actual JSON export/import, invalid imports, and confirmation before replacement.
  await fish.locator("#help").click();
  const [download] = await Promise.all([
    fish.waitForEvent("download"),
    fish.locator("#export-save").click(),
  ]);
  const fs = require("node:fs");
  const exported = JSON.parse(fs.readFileSync(await download.path(), "utf8"));
  assert.equal(exported.version, 1);
  assert.equal(exported.energy, 47);
  await fish.locator("#save-file").setInputFiles({
    name: "broken.json",
    mimeType: "application/json",
    buffer: Buffer.from("{bad"),
  });
  await fish.waitForFunction(() =>
    document.querySelector("#import-notice").textContent.includes("Không thể"),
  );
  assert.equal(await fish.evaluate(() => FarmGame.snapshot().energy), 47);
  // No confirm event means parse failures never trigger a destructive save replacement.
  assert.deepEqual(errors, []);
  console.log(
    "PASS JSON export is readable and malformed import preserves game state",
  );
  const cleanContext = await browser.newContext({
    viewport: { width: 1366, height: 768 },
  });
  const imported = await cleanContext.newPage();
  imported.on("pageerror", (e) => errors.push(e.message));
  await imported.goto(base);
  await imported.locator("#start-game").click();
  await imported.locator("#help").click();
  const importState = new World().s;
  importState.started = true;
  importState.day = 12;
  importState.coins = 777;
  importState.bag.wood = 9;
  imported.once("dialog", (d) => d.accept());
  await imported.locator("#save-file").setInputFiles({
    name: "valid.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(importState)),
  });
  await imported.waitForFunction(() => window.FarmGame?.snapshot().day === 12);
  await imported.locator("#start-game").click();
  assert.equal(await imported.evaluate(() => FarmGame.snapshot().coins), 777);
  assert.equal(await imported.evaluate(() => FarmGame.snapshot().bag.wood), 9);
  const belt = await imported.locator(".toolbelt").boundingBox();
  assert(belt.y + belt.height <= 768, "Laptop tools stay within viewport");
  await imported.locator("#tab-quests").focus();
  await imported.keyboard.press("ArrowRight");
  assert.equal(
    await imported.locator("#tab-bag").getAttribute("aria-selected"),
    "true",
  );
  assert.equal(
    await imported.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  console.log(
    "PASS valid save import, accessible tabs and laptop controls remain visible",
  );
  assert.deepEqual(errors, []);
  await imported.locator("#help").click();
  await imported.locator("#reset-game").click();
  await imported.locator("#confirm-reset").click();
  await imported.waitForFunction(
    () =>
      window.FarmGame?.snapshot().day === 1 &&
      FarmGame.snapshot().coins === 100 &&
      !FarmGame.snapshot().started,
  );
  assert.equal(await imported.locator("#welcome").isVisible(), true);
  console.log("PASS explicit new-game reset survives pagehide autosave");
  for (const width of [320, 360, 390, 768]) {
    await imported.setViewportSize({ width, height: 844 });
    assert.equal(
      await imported.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "No overflow at " + width,
    );
  }
  const blockedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  await blockedContext.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  const blocked = await blockedContext.newPage();
  blocked.on("pageerror", (e) => errors.push(e.message));
  await blocked.goto(base);
  await blocked.locator("#start-game").click();
  await blocked.waitForFunction(
    () =>
      document.querySelector("#save-status").textContent === "Chưa lưu được",
  );
  assert.equal(await blocked.evaluate(() => FarmGame.snapshot().started), true);
  await blocked.locator("#help").click();
  const [backup] = await Promise.all([
    blocked.waitForEvent("download"),
    blocked.locator("#export-save").click(),
  ]);
  assert.equal(
    JSON.parse(fs.readFileSync(await backup.path(), "utf8")).version,
    1,
  );
  console.log(
    "PASS 320–768px layouts and export fallback when browser storage is blocked",
  );
  assert.deepEqual(errors, []);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
