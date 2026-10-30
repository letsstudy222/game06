const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  { chromium } = require("playwright");
(async () => {
  fs.mkdirSync("artifacts/sample", { recursive: true });
  fs.rmSync("artifacts/sample/qa-results.json", { force: true });
  const { getIsland } = await import("../src/island/islands.mjs"),
    { route, corners } = await import("./route-helper.mjs"),
    map = getIsland("dawn-sample"),
    b = await chromium.launch({
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      headless: true,
      args: ["--no-sandbox"],
    }),
    p = await b.newPage({ viewport: { width: 1366, height: 768 } }),
    errors = [],
    requests = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.url());
  });
  p.on("request", (r) => requests.push(r.url()));
  const base = process.env.GAME_URL || "http://127.0.0.1:8000",
    url = new URL(base);
  url.searchParams.set("sample", "1");
  await p.goto(url.href);
  await p.waitForFunction(() => window.IslandGame?.ready());
  await p.evaluate(() => document.fonts.ready);
  const snap = () => p.evaluate(() => IslandGame.snapshot());
  assert.equal((await snap()).island, "dawn-sample");
  const shot = (name) => p.screenshot({ path: `artifacts/sample/${name}.png` });
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
    await p.keyboard.down(code);
    try {
      await p.waitForFunction(
        ({ key, goal, sign }) =>
          sign * (IslandGame.snapshot().player[key] - goal) >= -1,
        { key, goal, sign },
        { timeout: 7000 },
      );
    } catch (e) {
      console.log("STUCK", key, goal, (await snap()).player);
      await shot("qa-stuck");
      throw e;
    } finally {
      await p.keyboard.up(code);
    }
  }
  async function travel(goal) {
    await p.locator("#island").focus();
    const path = corners(route(map, (await snap()).player, goal, 12));
    assert(path.length);
    for (const v of path) {
      await axis("x", v.x);
      await axis("y", v.y);
    }
    await p.waitForTimeout(200);
    assert(
      Math.hypot(
        (await snap()).player.x - goal.x,
        (await snap()).player.y - goal.y,
      ) < 8,
    );
    const v = await p.evaluate(() => IslandGame.view());
    assert(
      v.camera.x >= 0 &&
        v.camera.y >= 0 &&
        v.camera.x + v.width <= map.width &&
        v.camera.y + v.height <= map.height,
    );
  }
  await shot("clearing");
  const start = (await snap()).player.x;
  await p.keyboard.down("KeyD");
  await p.waitForTimeout(130);
  await p.keyboard.press("KeyJ");
  assert((await snap()).cooldowns.attack > 0);
  await p.keyboard.up("KeyD");
  assert((await snap()).player.x > start);
  await p.keyboard.down("ShiftLeft");
  await p.waitForFunction(() => IslandGame.snapshot().player.hovering);
  await p.keyboard.up("ShiftLeft");
  await p.keyboard.press("KeyK");
  await p.waitForFunction(() => IslandGame.snapshot().cooldowns.fire > 0);
  await shot("fire");
  console.log("PASS sample preserves keyboard movement/attack/hover/fire");
  await travel(map.checkpoints.cliff);
  await shot("cliffs");
  await travel(map.checkpoints.forest);
  await shot("forest");
  console.log(
    "PASS first stairs and shaded forest reached with real keyboard input",
  );
  await travel(map.checkpoints.ruins);
  assert.equal((await snap()).nearShrine, true);
  await p.keyboard.press("KeyE");
  await p.waitForFunction(() => IslandGame.snapshot().shrineActivated);
  await shot("ruins");
  console.log(
    "PASS upper terrace reached through second stair run, shrine interaction works",
  );
  await travel(map.checkpoints.beach);
  await shot("beach");
  console.log("PASS coast reachable from shrine, camera stays in bounds");
  await p.setViewportSize({ width: 1664, height: 1408 });
  await p.waitForTimeout(200);
  await shot("overview");
  assert.deepEqual(errors, []);
  assert(requests.some((u) => u.includes("/samples/dawn/shadows.png")));
  assert(!requests.some((u) => u.includes("/masters/")));
  assert(
    !requests.some((u) =>
      /production\/dawn\/world|production\/dawn\/props/.test(u),
    ),
  );
  const defaultPage = await b.newPage();
  const defaultURL = new URL(base);
  defaultURL.searchParams.delete("sample");
  await defaultPage.goto(defaultURL.href);
  await defaultPage.waitForFunction(() => window.IslandGame?.ready());
  assert.equal(
    await defaultPage.evaluate(() => IslandGame.snapshot().island),
    "dawn",
  );
  await defaultPage.close();
  fs.writeFileSync(
    "artifacts/sample/qa-results.json",
    JSON.stringify(
      {
        testedAt: new Date().toISOString(),
        target: url.href,
        status: "passed",
        realDeviceTested: false,
        checks: [
          "actual keyboard tour across coast, forest and both stair runs",
          "attack/fire/hover",
          "shrine interaction",
          "camera bounds",
          "separate sample and default map",
          "no master images or painted world at runtime",
          "zero asset/page errors",
        ],
      },
      null,
      2,
    ),
  );
  await b.close();
  console.log(
    "PASS isolated sample, unchanged default island entry and no page/asset errors",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
