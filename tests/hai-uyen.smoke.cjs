const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const root = process.env.SITE_URL || "http://127.0.0.1:8001";
const out = process.env.ARTIFACT_DIR || "artifacts/hai-uyen";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1366, height: 768 },
    });
    const errors = [],
      resources = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(r.status() + " " + r.url());
      resources.push(r.url());
    });
    await page.goto(root + "/index.html");
    await page.waitForFunction(() => window.IslandGame?.ready());
    const before = await page.evaluate(() => IslandGame.snapshot().player);
    await page.locator("#island").focus();
    await page.keyboard.down("ArrowRight");
    await page.waitForTimeout(300);
    await page.keyboard.up("ArrowRight");
    const after = await page.evaluate(() => IslandGame.snapshot().player);
    assert(Math.hypot(after.x - before.x, after.y - before.y) > 5);
    console.log("PASS packaged Dawn preserved: ready, real movement, assets");
    await page.goto(root + "/hai-uyen.html");
    await page.waitForFunction(() => window.HaiUyen?.ready());
    await page.keyboard.press("Digit3");
    await page.waitForTimeout(220);
    await page.keyboard.press("Digit1");
    await page.waitForTimeout(100);
    let s = await page.evaluate(() => HaiUyen.snapshot());
    assert(s.buff && s.cooldowns.k3 > 23 && s.cooldowns.k1 > 2);
    await page.reload();
    await page.waitForFunction(() => window.HaiUyen?.ready());
    s = await page.evaluate(() => HaiUyen.snapshot());
    assert(s.cooldowns.k3 > 22 && s.cooldowns.k1 > 1 && s.buff);
    console.log(
      "PASS final Hai Uyen build: K3/K1, buff and cooldown survive refresh",
    );
    const script = await page
      .locator('script[type="module"]')
      .getAttribute("src");
    const revision = new URL(script, root).searchParams.get("v");
    assert(revision, "packaged entry revision");
    for (const url of resources.filter((url) =>
      /src\/hai-uyen\/.*\.mjs|data\/hai-uyen\/.*\.json/.test(url),
    ))
      assert.equal(new URL(url).searchParams.get("v"), revision);
    fs.mkdirSync(out, { recursive: true });
    await page.screenshot({ path: path.join(out, "10-final-build.png") });
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      path.join(out, "smoke-results.json"),
      JSON.stringify(
        {
          date: new Date().toISOString(),
          root,
          revision,
          checks: [
            "Dawn ready and movement",
            "Hai Uyen K3/K1",
            "refresh preserves buff/CD",
            "uniform revision on module/data graph",
            "zero page/asset errors",
          ],
          errors,
        },
        null,
        2,
      ),
    );
    console.log(
      "PASS uniform module/data revision " +
        revision +
        ", zero page/asset errors",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
