const assert = require("node:assert/strict"),
  fs = require("node:fs");
const { chromium } = require("playwright");
const url = process.env.GAME_URL || "http://127.0.0.1:8000";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    headless: true,
    args: ["--no-sandbox"],
  });
  fs.mkdirSync("artifacts/ui-after", { recursive: true });
  fs.rmSync("artifacts/ui-after/qa-results.json", { force: true });
  const results = [];
  for (const [name, width, height] of [
    ["portrait", 390, 844],
    ["small", 360, 800],
    ["landscape", 844, 390],
    ["desktop", 1920, 1080],
  ]) {
    const touch = name !== "desktop",
      context = await browser.newContext({
        viewport: { width, height },
        hasTouch: touch,
        isMobile: touch,
      }),
      page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(r.status() + " " + r.url());
    });
    await page.goto(url);
    await page.waitForFunction(() => window.IslandGame?.ready());
    await page.evaluate(() => document.fonts.ready);
    const snapshot = () => page.evaluate(() => IslandGame.snapshot()),
      view = () => page.evaluate(() => IslandGame.view());
    const box = (id) => page.locator(id).boundingBox(),
      center = async (id) => {
        const r = await box(id);
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      };
    async function assertLayout() {
      const v = await view();
      assert(Number.isInteger(v.scale));
      assert(v.width <= v.world.width && v.height <= v.world.height);
      assert(v.camera.x >= 0 && v.camera.y >= 0);
      assert(
        v.camera.x + v.width <= v.world.width &&
          v.camera.y + v.height <= v.world.height,
      );
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollHeight > innerHeight ||
            document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.equal(
        await page
          .locator("#island")
          .evaluate((c) => getComputedStyle(c).imageRendering),
        "pixelated",
      );
      const dims = page.viewportSize();
      for (const id of [
        "#menu",
        "#pause",
        "#attack",
        "#fire",
        "#hover",
        ...(touch ? [".stick-base"] : []),
      ]) {
        const r = await box(id);
        assert(
          r && r.width >= 44 && r.height >= 44,
          `${name}: tap target ${id}`,
        );
        assert(
          r.x >= 0 &&
            r.y >= 0 &&
            r.x + r.width <= dims.width + 1 &&
            r.y + r.height <= dims.height + 1,
          `${name}: safe target ${id}`,
        );
      }
      const p = (await snapshot()).player,
        c = v.camera,
        px = (p.x - c.x) * v.scale,
        py = (p.y - 30 - c.y) * v.scale;
      for (const id of [
        ".player-hud",
        ".scene-controls",
        "#attack",
        "#fire",
        "#hover",
        ...(touch ? [".stick-base"] : []),
      ]) {
        const r = await box(id);
        assert(
          !(
            px > r.x - 22 &&
            px < r.x + r.width + 22 &&
            py > r.y - 22 &&
            py < r.y + r.height + 22
          ),
          `${name}: actor visible outside ${id}`,
        );
      }
      if (touch) {
        const joy = await box(".stick-base"),
          attack = await box("#attack");
        assert(joy.x < dims.width / 2 && attack.x > dims.width / 2);
        assert.equal(
          await page.locator(".hotbar kbd").first().isVisible(),
          false,
        );
      } else assert.equal(await page.locator(".touch-pad").isVisible(), false);
    }
    await assertLayout();
    await page.screenshot({ path: `artifacts/ui-after/${name}.png` });
    if (touch) {
      const cdp = await context.newCDPSession(page);
      const point = (p, id) => ({ ...p, id, radiusX: 4, radiusY: 4, force: 1 });
      const joy = await center(".stick-base"),
        attack = await center("#attack"),
        fire = await center("#fire"),
        hover = await center("#hover");
      const before = (await snapshot()).player.x;
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(joy, 1)],
      });
      await page.waitForTimeout(70);
      assert(Math.abs((await snapshot()).player.x - before) < 0.5, "dead zone");
      const moving = { x: joy.x + 30, y: joy.y };
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [point(moving, 1)],
      });
      await page.waitForTimeout(140);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(moving, 1), point(attack, 2)],
      });
      await page.waitForTimeout(65);
      assert.equal((await snapshot()).player.animation, "attack");
      assert(
        (await snapshot()).player.x > before + 3,
        "move and attack together",
      );
      assert((await snapshot()).cooldowns.attack > 0);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [point(moving, 1)],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(moving, 1), point(fire, 3)],
      });
      await page.waitForTimeout(65);
      assert((await snapshot()).cooldowns.fire > 0, "fire by touch");
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [point(moving, 1)],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(moving, 1), point(hover, 4)],
      });
      await page.waitForTimeout(65);
      assert.equal((await snapshot()).player.hovering, true);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchCancel",
        touchPoints: [],
      });
      await page.waitForTimeout(90);
      const stopped = (await snapshot()).player.x;
      await page.waitForTimeout(140);
      assert.equal((await snapshot()).player.x, stopped);
      assert.equal((await snapshot()).player.hovering, false);
      assert.equal(
        await page.locator(".stick-base i").evaluate((e) => e.style.transform),
        "translate(0px, 0px)",
      );
      // Rotate while the first finger is still down; no stale movement may survive.
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(joy, 7)],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [point(moving, 7)],
      });
      // Rotate the same live session, not a second mock page.
      await page.setViewportSize({ width: height, height: width });
      await page.waitForTimeout(150);
      await assertLayout();
      const rotatedX = (await snapshot()).player.x;
      await page.waitForTimeout(120);
      assert.equal((await snapshot()).player.x, rotatedX);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchCancel",
        touchPoints: [],
      });
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(150);
      await assertLayout();
      await page.locator("#menu").tap();
      await page.locator("#open-settings").tap();
      await page.locator("[data-setting=joystickSize]").fill("140");
      await page.locator("[data-setting=actionSize]").fill("80");
      await page.locator("[data-setting=uiScale]").fill("1.2");
      await page.locator("[data-setting=opacity]").fill("0.65");
      await page.locator("[data-setting=zoom]").selectOption("1");
      assert.equal(
        (await view()).scale,
        Math.max(
          1,
          Math.ceil(width / (await view()).world.width),
          Math.ceil(height / (await view()).world.height),
        ),
      );
      await page.locator("#edit-layout").tap();
      assert.equal((await snapshot()).paused, true);
      await assertLayout();
      const handle = await center("[data-drag=joystick]");
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [point(handle, 8)],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [point({ x: handle.x + 12, y: handle.y - 50 }, 8)],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      assert(
        Object.keys(await page.evaluate(() => IslandGame.settings().positions))
          .length > 0,
        "drag position saved",
      );
      await page.locator("#finish-layout").tap();
      await page.waitForFunction(
        () =>
          document.querySelector("#game-menu").open &&
          document.querySelector("#layout-editor").hidden &&
          !document.querySelector("#settings-view").hidden,
      );
      await page.waitForTimeout(150);
      if (name === "landscape") {
        const startScroll = await page
          .locator("#game-menu")
          .evaluate((e) => e.scrollTop);
        const dialog = await box("#game-menu");
        const x = dialog.x + 12;
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [point({ x, y: height - 70 }, 9)],
        });
        for (let y = height - 90; y >= 90; y -= 20) {
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [point({ x, y }, 9)],
          });
          await page.waitForTimeout(25);
        }
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
        await page.waitForTimeout(150);
        assert(
          (await page.locator("#game-menu").evaluate((e) => e.scrollTop)) >
            startScroll,
          "landscape settings scroll by actual touch",
        );
        await page.locator("#game-menu").evaluate((e) => (e.scrollTop = 0));
      }
      await page.screenshot({
        path: `artifacts/ui-after/${name}-settings.png`,
      });
      const settings = await page.evaluate(() => IslandGame.settings());
      await page.reload();
      await page.waitForFunction(() => window.IslandGame?.ready());
      assert.deepEqual(
        await page.evaluate(() => IslandGame.settings()),
        settings,
      );
      await assertLayout();
      await page.locator("#menu").tap();
      await page.locator("#open-settings").tap();
      await page.locator("#reset-layout").tap();
      assert.equal(
        await page.evaluate(() => IslandGame.settings().joystickSize),
        112,
      );
      await page.locator("#settings-back").tap();
      await page.locator("#resume-game").tap();
      assert.equal((await snapshot()).paused, false);
      // Real keyboard on a hybrid touch device switches to desktop controls.
      await page.keyboard.down("ArrowLeft");
      await page.waitForTimeout(80);
      await page.keyboard.up("ArrowLeft");
      assert.equal((await view()).input, "keyboard");
      assert.equal(await page.locator(".touch-pad").isVisible(), false);
      await page.touchscreen.tap(10, height / 2);
      assert.equal((await view()).input, "touch");
    } else {
      await page.locator("#collapse-hud").click();
      assert.equal(
        await page.locator("#collapse-hud").getAttribute("aria-expanded"),
        "false",
      );
      const before = (await snapshot()).player.x;
      await page.keyboard.down("KeyD");
      await page.waitForTimeout(120);
      await page.keyboard.press("KeyJ");
      assert((await snapshot()).cooldowns.attack > 0);
      await page.keyboard.up("KeyD");
      assert((await snapshot()).player.x > before);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#game-menu").isVisible(), true);
      const frozen = await snapshot();
      await page.waitForTimeout(120);
      assert.deepEqual(await snapshot(), frozen);
      assert.equal(await page.locator("#menu-view button:disabled").count(), 3);
      await page.keyboard.press("Escape");
      assert.equal((await snapshot()).paused, false);
    }
    assert.deepEqual(errors, []);
    results.push({ name, width, height, touch, status: "passed" });
    console.log(
      "PASS UI",
      name,
      width,
      height,
      "camera, controls, safe bounds, settings and input",
    );
    await context.close();
  }
  fs.writeFileSync(
    "artifacts/ui-after/qa-results.json",
    JSON.stringify(
      {
        testedAt: new Date().toISOString(),
        engine: "Chromium / Playwright, emulated touch via CDP",
        realDeviceTested: false,
        results,
      },
      null,
      2,
    ),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
