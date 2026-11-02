const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require("playwright");
const BASE = process.env.GAME_URL || "http://127.0.0.1:8000/hai-uyen.html",
  OUT = process.env.ARTIFACT_DIR || "artifacts/hai-uyen";
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.rmSync(path.join(OUT, "qa-results.json"), { force: true });
  const { adaptMaps, MAP_FILES, center, canOccupy } = await import(
    "../src/hai-uyen/maps.mjs"
  );
  const maps = adaptMaps(
    MAP_FILES.map((f) =>
      JSON.parse(fs.readFileSync(path.join(__dirname, "../data/hai-uyen", f))),
    ),
  );
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await b.newContext({
      viewport: { width: 1366, height: 768 },
    }),
    page = await context.newPage(),
    errors = [],
    results = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.status() + " " + r.url());
  });
  await page.addInitScript(() => {
    if (!localStorage.getItem("hai-uyen-qa-baseline")) {
      localStorage.setItem("nhat-diem.ui.v1", "preserve-ui");
      localStorage.setItem("nhat-diem.farm.v1", "preserve-farm");
      localStorage.setItem("hai-uyen-qa-baseline", "1");
    }
  });
  const pass = (s) => {
    console.log("PASS " + s);
    results.push(s);
  };
  const snap = () => page.evaluate(() => HaiUyen.snapshot()),
    shot = (name) => page.screenshot({ path: path.join(OUT, name + ".png") });
  const ready = async () => {
    await page.waitForFunction(
      () => window.HaiUyen?.ready(),
      {},
      { timeout: 15000 },
    );
    await page.evaluate(() => document.fonts.ready);
  };
  const aim = async (p) => {
    const v = await page.evaluate(() => HaiUyen.view());
    await page.mouse.move(
      (p.x - v.camera.x) * v.scale,
      (p.y - v.camera.y) * v.scale,
    );
  };
  const press = async (key) => {
    await page.keyboard.press(key);
    await page.waitForTimeout(100);
  };
  async function pathTo(goal, flags) {
    const s = await snap(),
      m = maps[s.room],
      start = [Math.floor(s.player.x / 32), Math.floor(s.player.y / 32)],
      end = [Math.floor(goal.x / 32), Math.floor(goal.y / 32)],
      q = [start],
      prev = new Map([[start.join(","), null]]);
    for (let i = 0; i < q.length; i++) {
      const [x, y] = q[i];
      if (x === end[0] && y === end[1]) break;
      for (const [a, c] of [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]) {
        const k = [a, c].join(",");
        if (!prev.has(k) && canOccupy(m, center({ x: a, y: c }), flags)) {
          prev.set(k, [x, y]);
          q.push([a, c]);
        }
      }
    }
    assert(
      prev.has(end.join(",")),
      "reachable path " + JSON.stringify({ room: s.room, start, end }),
    );
    const route = [];
    for (let p = end; p; p = prev.get(p.join(",")))
      route.push(center({ x: p[0], y: p[1] }));
    route.reverse();
    const corners = [];
    for (let i = 1; i < route.length - 1; i++)
      if (
        route[i].x - route[i - 1].x !== route[i + 1].x - route[i].x ||
        route[i].y - route[i - 1].y !== route[i + 1].y - route[i].y
      )
        corners.push(route[i]);
    corners.push(goal);
    return corners;
  }
  async function axis(key, target, room) {
    const s = await snap(),
      d = target - s.player[key];
    if (Math.abs(d) < 1.2) return;
    const sign = Math.sign(d),
      code =
        key === "x" ? (sign > 0 ? "KeyD" : "KeyA") : sign > 0 ? "KeyS" : "KeyW";
    await page.keyboard.down(code);
    try {
      await page.waitForFunction(
        ({ key, target, sign, room }) => {
          const s = HaiUyen.snapshot();
          return s.room !== room || sign * (s.player[key] - target) >= -1;
        },
        { key, target, sign, room },
        { timeout: 20000, polling: "raf" },
      );
    } finally {
      await page.keyboard.up(code);
    }
  }
  async function walk(goal) {
    const s = await snap(),
      room = s.room,
      corners = await pathTo(goal, s.flags);
    await page.locator("#hai-uyen").focus();
    for (const p of corners) {
      if ((await snap()).room !== room) break;
      await axis("x", p.x, room);
      if ((await snap()).room !== room) break;
      await axis("y", p.y, room);
    }
    await page.waitForTimeout(80);
  }
  const entity = (id) => maps[currentRoom].entities.find((e) => e.id === id);
  let currentRoom = "VS-A1";
  async function visit(id) {
    currentRoom = (await snap()).room;
    await walk(center(entity(id)));
  }
  async function portal(id, target) {
    await visit(id);
    await page.waitForFunction(
      (target) => HaiUyen.snapshot().room === target,
      target,
      { timeout: 2000 },
    );
    const s = await snap();
    await page.waitForTimeout(450);
    assert.equal((await snap()).room, target);
    assert(canOccupy(maps[target], s.player, s.flags));
    pass(id + " → " + target + " safe arrival/no bounce");
  }
  try {
    await page.goto(BASE);
    await ready();
    assert.equal((await snap()).room, "VS-A1");
    await shot("01-a1");
    // Eight real aim orientations, captured on the same frame-consistent placeholder anatomy.
    for (let i = 0; i < 8; i++) {
      const s = await snap(),
        a = (i * Math.PI) / 4;
      await aim({
        x: s.player.x + 90 * Math.cos(a),
        y: s.player.y + 90 * Math.sin(a),
      });
      await page.waitForTimeout(100);
      const after = await snap();
      assert(
        Math.abs(
          Math.atan2(
            Math.sin(after.player.angle - a),
            Math.cos(after.player.angle - a),
          ),
        ) < 0.03,
      );
      await shot("facing-" + ["E", "SE", "S", "SW", "W", "NW", "N", "NE"][i]);
    }
    pass("8 aim facings captured, NE distinct from E");
    await visit("cp_a1");
    await press("KeyE");
    assert((await snap()).flags["vs.cp.a1"]);
    await visit("shrine_shell");
    await press("KeyE");
    assert((await snap()).flags["vs.lore.shrine_seen"]);
    await portal("gate_b1", "VS-B1");
    await shot("02-reef");
    // First opponent, real projectile/basic attacks; no actor mutation or teleport.
    let attempts = 0;
    await walk(center({ x: 17, y: 24 }));
    while ((await snap()).enemies[0].hp > 0 && attempts++ < 160) {
      const s = await snap(),
        e = s.enemies[0];
      await aim(e);
      if (s.cooldowns.k1 < 0.05) await press("Digit1");
      if (Math.hypot(e.x - s.player.x, e.y - s.player.y) < 75)
        await press("KeyJ");
      if (s.cooldowns.guard < 0.05 && e.state === "windup")
        await press("Space");
      await page.waitForTimeout(100);
    }
    assert((await snap()).enemies[0].hp <= 0);
    pass("reef fish defeated by actual input and hitboxes");
    await visit("optional_lore_north");
    await press("KeyE");
    assert((await snap()).flags["vs.b1.lore_north"]);
    await visit("secret_cache_south");
    await press("KeyE");
    assert.equal((await snap()).tokens, 1);
    await press("KeyE");
    assert.equal((await snap()).tokens, 1);
    await shot("03-reef-cache");
    await portal("b1_to_lab", "VS-LAB");
    await shot("04-lab-closed");
    await walk(center({ x: 15, y: 13 }));
    const valve = center(
      maps["VS-LAB"].entities.find((e) => e.id === "valve_pressure_a"),
    );
    await aim(valve);
    await press("Digit1");
    await page.waitForFunction(
      () => HaiUyen.snapshot().flags["vs.lab.valve_a_primed"],
    );
    await page.reload();
    await ready();
    assert((await snap()).flags["vs.lab.valve_a_primed"]);
    assert(!(await snap()).flags["vs.lab.valve_b_stable"]);
    pass("refresh between valves preserves primed A");
    await walk(center({ x: 28, y: 26 }));
    const stabilizer = center(
      maps["VS-LAB"].entities.find((e) => e.id === "control_stabilizer_b"),
    );
    await aim(stabilizer);
    await press("Digit3");
    await page.waitForTimeout(200);
    await press("Digit2");
    await page.waitForFunction(
      () => HaiUyen.snapshot().flags["vs.lab.valve_b_stable"],
    );
    await shot("05-lab-vortex");
    await visit("lab_checkpoint");
    await press("KeyE");
    assert((await snap()).flags["vs.cp.lab"]);
    await portal("lab_to_arena", "VS-ARENA");
    const arrival = await snap();
    assert(arrival.cooldowns.k2 > 0);
    pass("K2 cooldown preserved across transition");
    await shot("06-arena-entry");
    await visit("preboss_rest");
    await press("KeyE");
    await walk(center({ x: 19, y: 24 }));
    assert((await snap()).encounter);
    let loop = 0,
      phase2 = false,
      tells = new Set(),
      capturedTells = new Set(),
      keysHeld = [];
    while (!(await snap()).flags["vs.arena.boss_defeated"] && loop++ < 900) {
      const s = await snap();
      assert.equal(s.room, "VS-ARENA", "boss run must not die");
      const boss = s.enemies.find((e) => e.id === "boss_cua_giap_thuy");
      phase2 ||= boss.phase === 2;
      if (boss.state === "windup") {
        tells.add(boss.kind);
        if (!capturedTells.has(boss.kind)) {
          await shot("tell-" + boss.kind);
          capturedTells.add(boss.kind);
        }
      }
      const dx = boss.x - s.player.x,
        dy = boss.y - s.player.y,
        d = Math.hypot(dx, dy),
        a = Math.atan2(dy, dx);
      await aim(boss);
      const cast = [];
      if (s.cooldowns.k3 < 0.05) cast.push("Digit3");
      else if (s.cooldowns.k1 < 0.05 && d < 310) cast.push("Digit1");
      else if (s.cooldowns.k2 < 0.05 && d < 195) cast.push("Digit2");
      else if (s.cooldowns.k4 < 0.05 && d < 145) cast.push("Digit4");
      else if (d < 65 && s.cooldowns.basic < 0.05) cast.push("KeyJ");
      else if (s.cooldowns.guard < 0.05 && boss.state === "strike")
        cast.push("Space");
      for (const k of cast) await page.keyboard.press(k);
      // Orbit the miniboss and sidestep its locked charge lane. Stays in the open central court.
      let vx = -Math.sin(a),
        vy = Math.cos(a);
      const radial = d > 150 ? 1 : d < 125 ? -1 : 0;
      vx += Math.cos(a) * radial;
      vy += Math.sin(a) * radial;
      if (s.player.x < 16 * 32) vx = Math.max(0.5, vx);
      if (s.player.x > 32 * 32) vx = Math.min(-0.5, vx);
      if (s.player.y < 16 * 32) vy = Math.max(0.5, vy);
      if (s.player.y > 32 * 32) vy = Math.min(-0.5, vy);
      const next = [
        ...(vx > 0.35 ? ["KeyD"] : vx < -0.35 ? ["KeyA"] : []),
        ...(vy > 0.35 ? ["KeyS"] : vy < -0.35 ? ["KeyW"] : []),
      ];
      for (const k of keysHeld)
        if (!next.includes(k)) await page.keyboard.up(k);
      for (const k of next)
        if (!keysHeld.includes(k)) await page.keyboard.down(k);
      keysHeld = next;
      await page.waitForTimeout(100);
    }
    for (const k of keysHeld) await page.keyboard.up(k);
    assert(
      (await snap()).flags["vs.arena.boss_defeated"],
      "boss defeated through real combat",
    );
    assert(phase2);
    assert(tells.has("sweep") && tells.has("charge") && tells.has("ring"));
    pass("solo boss defeated, both phases and all three telegraphs observed");
    await shot("07-boss-cleared");
    await visit("one_time_reward");
    await press("KeyE");
    assert.equal((await snap()).tokens, 2);
    await shot("08-reward");
    await page.reload();
    await ready();
    assert.equal((await snap()).tokens, 2);
    assert((await snap()).flags["vs.arena.boss_defeated"]);
    assert.equal((await snap()).enemies.length, 0);
    await press("KeyE");
    assert.equal((await snap()).tokens, 2);
    pass("victory and reward persist on refresh, no duplicate");
    await portal("arena_back_lab", "VS-LAB");
    assert((await snap()).flags["vs.lab.valve_b_stable"]);
    await portal("lab_back_b1", "VS-B1");
    await portal("b1_back_a1", "VS-A1");
    pass("full reverse route preserves restoration and receipts");
    await page.keyboard.press("Escape");
    await page.locator("#slot").selectOption("2");
    await page.locator('button[value="resume"]').click();
    assert.equal((await snap()).tokens, 0);
    assert.equal((await snap()).room, "VS-A1");
    await page.keyboard.press("Escape");
    await page.locator("#slot").selectOption("3");
    await page.locator('button[value="resume"]').click();
    assert.equal((await snap()).tokens, 0);
    await page.keyboard.press("Escape");
    await page.locator("#slot").selectOption("1");
    await page.locator('button[value="resume"]').click();
    assert.equal((await snap()).tokens, 2);
    pass("three save slots isolated through menu");
    await page.keyboard.press("Escape");
    await page.locator("#environment").selectOption("land");
    await page.locator('button[value="resume"]').click();
    await press("Digit3");
    await press("Digit4");
    await shot("09-land-vfx");
    assert.equal((await snap()).environment, "land");
    assert.deepEqual(
      await page.evaluate(() => [
        localStorage.getItem("nhat-diem.ui.v1"),
        localStorage.getItem("nhat-diem.farm.v1"),
      ]),
      ["preserve-ui", "preserve-farm"],
    );
    assert.equal(errors.length, 0, errors.join("\n"));
    pass("legacy storage preserved and zero page/asset errors");
    const frameTimes = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const times = [];
          let last = 0;
          function sample(t) {
            if (last) times.push(t - last);
            last = t;
            if (times.length === 120) resolve(times);
            else requestAnimationFrame(sample);
          }
          requestAnimationFrame(sample);
        }),
    );
    frameTimes.sort((a, b) => a - b);
    const performance = {
      samples: 120,
      medianMs: frameTimes[60],
      p95Ms: frameTimes[114],
    };
    console.log("FRAME SAMPLE " + JSON.stringify(performance));
    for (const [name, width, height] of [
      ["portrait", 390, 844],
      ["small", 320, 640],
      ["landscape", 844, 390],
    ]) {
      const mobile = await b.newContext({
          viewport: { width, height },
          hasTouch: true,
          isMobile: true,
        }),
        p = await mobile.newPage();
      const mobileErrors = [];
      p.on("pageerror", (e) => mobileErrors.push(e.message));
      await p.goto(BASE);
      await p.waitForFunction(() => window.HaiUyen?.ready());
      assert.equal(
        await p.evaluate(
          () =>
            document.documentElement.scrollWidth > innerWidth ||
            document.documentElement.scrollHeight > innerHeight,
        ),
        false,
      );
      for (const selector of [
        "#joystick",
        "#interact",
        '[data-action="k1"]',
        '[data-action="guard"]',
      ]) {
        const box = await p.locator(selector).boundingBox();
        assert(
          box &&
            box.x >= 0 &&
            box.y >= 0 &&
            box.x + box.width <= width + 1 &&
            box.y + box.height <= height + 1,
          selector + " fits " + name,
        );
        assert(box.width >= 44 && box.height >= 44);
      }
      if (width <= 600) {
        const cv = await p.locator("#hai-uyen").boundingBox(),
          act = await p.locator("#actions").boundingBox();
        assert(cv.height <= height - 180);
        assert(
          act.y >= cv.height - 8,
          "portrait control deck separated from playfield",
        );
      }
      const before = await p.evaluate(() => HaiUyen.snapshot().player),
        j = await p.locator("#joystick").boundingBox();
      const cdp = await mobile.newCDPSession(p);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [
          { id: 1, x: j.x + j.width * 0.7, y: j.y + j.height * 0.5 },
        ],
      });
      await p.waitForTimeout(300);
      const skill = await p.locator('[data-action="k1"]').boundingBox();
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [
          { id: 1, x: j.x + j.width * 0.7, y: j.y + j.height * 0.5 },
          {
            id: 2,
            x: skill.x + skill.width / 2,
            y: skill.y + skill.height / 2,
          },
        ],
      });
      await p.waitForTimeout(120);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      const after = await p.evaluate(() => HaiUyen.snapshot());
      assert(after.player.x > before.x + 10);
      assert.equal(after.metrics.casts.k1, 1);
      const x = after.player.x;
      await p.waitForTimeout(200);
      assert(
        Math.abs((await p.evaluate(() => HaiUyen.snapshot().player.x)) - x) < 1,
      );
      await p.screenshot({ path: path.join(OUT, "mobile-" + name + ".png") });
      assert.equal(mobileErrors.length, 0);
      await mobile.close();
      pass("mobile " + name + " layout, multitouch movement+skill and release");
    }
    const recovery = await b.newContext(),
      rp = await recovery.newPage();
    await rp.goto(BASE);
    await rp.waitForFunction(() => window.HaiUyen?.ready());
    await rp.evaluate(() =>
      localStorage.setItem(
        "hai-uyen.vs.v1.slot.1",
        JSON.stringify({ version: 999, revision: 1 }),
      ),
    );
    await rp.reload();
    await rp.waitForFunction(() => window.HaiUyen?.ready());
    assert(
      (await rp.evaluate(() => HaiUyen.snapshot())).saveWarning.includes(
        "Phiên bản",
      ),
    );
    await rp.keyboard.press("Escape");
    await rp.locator("#slot").selectOption("2");
    await rp.locator('button[value="resume"]').click();
    assert.equal((await rp.evaluate(() => HaiUyen.view())).slot, 2);
    assert.equal(
      await rp.evaluate(
        () => JSON.parse(localStorage.getItem("hai-uyen.vs.v1.slot.1")).version,
      ),
      999,
    );
    await recovery.close();
    pass("future save remains untouched and user can switch to another slot");
    fs.writeFileSync(
      path.join(OUT, "qa-results.json"),
      JSON.stringify(
        {
          date: new Date().toISOString(),
          url: BASE,
          results,
          performance,
          errors,
        },
        null,
        2,
      ),
    );
  } catch (e) {
    await shot("failure");
    console.error(await snap().catch(() => ({})));
    throw e;
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
