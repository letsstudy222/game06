import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  adaptMaps,
  MAP_FILES,
  center,
  reachable,
  canOccupy,
  move,
  PLAYER_RADIUS,
  inTrigger,
} from "../src/hai-uyen/maps.mjs";
const raw = MAP_FILES.map((f) =>
  JSON.parse(readFileSync(new URL(`../data/hai-uyen/${f}`, import.meta.url))),
);
export const maps = adaptMaps(raw);
test("M4 dimensions, IDs, row lengths and every reciprocal anchor validate", () => {
  assert.equal(Object.keys(maps).length, 4);
  const bad = structuredClone(raw);
  bad[0].collision_rows[0] = "#";
  assert.throws(() => adaptMaps(bad), /grid/);
  const dup = structuredClone(raw);
  dup[0].entities.push(dup[0].entities[0]);
  assert.throws(() => adaptMaps(dup), /Duplicate/);
  for (const m of Object.values(maps))
    for (const t of m.entities.filter((e) => e.type === "transition")) {
      const a = maps[t.target].entities.find((e) => e.id === t.entry_anchor);
      assert.equal(
        canOccupy(maps[t.target], center(a), {}, PLAYER_RADIUS),
        true,
      );
      assert.equal(
        maps[t.target].entities.some(
          (e) => e.type === "transition" && inTrigger(center(a), e),
        ),
        false,
      );
    }
});
test("actual Quy collider reaches all required receivers; gates block then open before BFS", () => {
  for (const m of Object.values(maps)) {
    const a = m.entities.find(
      (e) => e.type === "spawn" || e.type === "entry_anchor",
    );
    const closed = reachable(m, center(a));
    const flags = {
      "vs.lab.valve_a_primed": true,
      "vs.lab.valve_b_stable": true,
      "vs.arena.boss_defeated": true,
    };
    const open = reachable(m, center(a), flags);
    for (const e of m.entities.filter(
      (e) =>
        e.x !== undefined &&
        !["dynamic_gate", "decor", "landmark"].includes(e.type),
    )) {
      assert(
        open.has(`${e.x},${e.y}`),
        `${m.id}/${e.id} reachable with gate open`,
      );
      if (
        e.type === "checkpoint" ||
        e.type === "puzzle_valve" ||
        e.type === "boss_spawn"
      )
        assert(closed.has(`${e.x},${e.y}`), e.id);
    }
    if (m.id === "VS-LAB") assert(!closed.has("46,20") && open.has("46,20"));
    if (m.id === "VS-ARENA") assert(!closed.has("44,26") && open.has("44,26"));
  }
});
test("swept collision prevents tunnelling and diagonal corner penetration for multiple radii", () => {
  const m = maps["VS-A1"];
  for (const r of [6, 10, 14]) {
    const p = center({ x: 2, y: 4 });
    const q = move(m, p, 400, 0, {}, r);
    assert(q.x <= 96 - r + 0.001);
    assert(canOccupy(m, q, {}, r));
    const z = move(m, center({ x: 2, y: 2 }), 250, 250, {}, r);
    assert(canOccupy(m, z, {}, r));
  }
  const lab = maps["VS-LAB"];
  assert(!canOccupy(lab, center({ x: 39, y: 20 }), {}));
  assert(
    canOccupy(lab, center({ x: 39, y: 20 }), { "vs.lab.valve_b_stable": true }),
  );
});

import { HaiUyenGame } from "../src/hai-uyen/model.mjs";
import { SaveStore, SAVE_PREFIX } from "../src/hai-uyen/save.mjs";
const memory = () => {
  const m = new Map();
  return { getItem: (k) => m.get(k) || null, setItem: (k, v) => m.set(k, v) };
};
const tick = (g, seconds, input = {}) => {
  for (let t = 0; t < seconds; t += 0.05)
    g.update(Math.min(0.05, seconds - t), input);
};
const at = (g, room, id) => {
  g.room = room;
  Object.assign(g.player, center(g.map.entities.find((e) => e.id === id)));
  g.spawnEnemies();
  g.portalArmed = true;
};
test("six directed portals preserve cooldown, safe facing, no idle bounce and permit return", () => {
  for (const m of Object.values(maps))
    for (const e of m.entities.filter((e) => e.type === "transition")) {
      const g = new HaiUyenGame(maps);
      g.flags = {
        "vs.lab.valve_a_primed": true,
        "vs.lab.valve_b_stable": true,
      };
      at(g, m.id, e.id);
      g.cast("k1");
      const cd = g.cooldowns.k1;
      assert(g.transition(e));
      assert.equal(g.room, e.target);
      assert.equal(g.cooldowns.k1, cd);
      const p = { ...g.player };
      tick(g, 1);
      assert.equal(g.room, e.target);
      assert.equal(g.player.x, p.x);
      assert.equal(g.player.y, p.y);
      assert(g.portalArmed);
    }
});
test("K1 projectile primes A, K2 sequence opens LAB, refresh preserves puzzle before collision", () => {
  const storage = memory(),
    g = new HaiUyenGame(maps, new SaveStore(storage));
  at(g, "VS-LAB", "control_stabilizer_b");
  g.player.x -= 60;
  assert(
    g.cast(
      "k2",
      center(g.map.entities.find((e) => e.id === "control_stabilizer_b")),
    ),
  );
  assert(!g.flags["vs.lab.valve_b_stable"]);
  at(g, "VS-LAB", "valve_pressure_a");
  g.player.y += 100;
  const a = center(g.map.entities.find((e) => e.id === "valve_pressure_a"));
  tick(g, 0.2);
  assert(g.cast("k1", a));
  tick(g, 0.4);
  assert(g.flags["vs.lab.valve_a_primed"]);
  const mid = new HaiUyenGame(maps, new SaveStore(storage));
  assert(mid.flags["vs.lab.valve_a_primed"]);
  assert(!mid.flags["vs.lab.valve_b_stable"]);
  tick(g, 10);
  at(g, "VS-LAB", "control_stabilizer_b");
  const b = { ...g.player };
  g.player.x -= 50;
  g.cast("k2", b);
  assert(g.flags["vs.lab.valve_b_stable"]);
  const reload = new HaiUyenGame(maps, new SaveStore(storage));
  assert(canOccupy(reload.map, center({ x: 39, y: 20 }), reload.flags));
});
test("projectile hits once per enemy, wall stops K1, enhanced limited pierce; K3 self buff and radial K4", () => {
  const g = new HaiUyenGame(maps);
  at(g, "VS-B1", "enemy_reef_01");
  const e = g.enemies[0];
  g.player.x -= 90;
  g.cast("k1", { x: e.x, y: e.y });
  tick(g, 0.3);
  assert.equal(e.hp, 26);
  const wall = new HaiUyenGame(maps);
  Object.assign(wall.player, center({ x: 2, y: 4 }));
  wall.cast("k1", center({ x: 10, y: 4 }));
  tick(wall, 1);
  assert.equal(wall.projectiles.length, 0);
  const buff = new HaiUyenGame(maps);
  assert(buff.cast("k3"));
  assert(buff.buffed);
  assert.equal(buff.cooldowns.k3, 24);
  assert.equal(buff.effects.length, 0);
  tick(buff, 0.2);
  buff.cast("k4");
  const wave = buff.effects.find((f) => f.type === "radial");
  assert(wave.enhanced);
  assert.equal(wave.x, buff.player.x);
  assert.equal(wave.y, buff.player.y);
  assert.notEqual(wave.hits, wave.hits2);
  tick(buff, 8);
  assert(!buff.buffed);
  assert(buff.cooldowns.k3 > buff.time);
});
test("guard only heals capped prevented real damage; one attack source cannot multi-hit or farm", () => {
  const g = new HaiUyenGame(maps);
  g.player.hp = 50;
  g.cast("k3");
  tick(g, 0.2);
  g.cast("guard");
  const before = g.player.hp;
  tick(g, 0.1);
  assert.equal(g.player.hp, before);
  g.damage(20, "claw1");
  const hp = g.player.hp;
  assert(g.metrics.prevented > 0);
  assert(g.metrics.healed <= g.metrics.prevented * 0.4);
  assert(g.metrics.healed <= 8);
  assert(g.empowered);
  tick(g, 0.6);
  g.damage(20, "claw1");
  assert.equal(g.player.hp, hp);
  assert.equal(g.metrics.hits, 1);
  tick(g, 0.5);
  g.cast("k1");
  assert(!g.empowered);
  assert(g.projectiles[0].enhanced);
});
test("two-phase boss tells precede hit, ring has safe center, boss immune to vortex pull", () => {
  const g = new HaiUyenGame(maps);
  at(g, "VS-ARENA", "boss_start_trigger"); // rect-only trigger has no tile position
  Object.assign(g.player, center({ x: 19, y: 24 }));
  tick(g, 0.1);
  assert(g.encounter);
  assert.deepEqual(g.bossLock, { active: "quy", membership: ["quy", null] });
  const boss = g.enemies.find((e) => e.boss);
  tick(g, 1.2);
  assert.equal(boss.state, "windup");
  assert.equal(boss.kind, "sweep");
  assert.equal(g.player.hp, 100);
  boss.hp = 100;
  boss.state = "idle";
  boss.timer = 0;
  boss.cycle = 2;
  tick(g, 0.05);
  assert.equal(boss.kind, "ring");
  assert(!g.attackHits(boss, { x: boss.x, y: boss.y }));
  assert(g.attackHits(boss, { x: boss.x + 100, y: boss.y }));
  const pos = { x: boss.x, y: boss.y };
  g.effects.push({
    type: "vortex",
    x: boss.x + 20,
    y: boss.y,
    age: 0,
    duration: 3,
    radius: 82,
    enhanced: false,
    tick: 0,
  });
  g.updateEffects(0.5);
  assert.equal(boss.x, pos.x);
  assert.equal(boss.y, pos.y);
  assert(boss.hp < 100);
});
test("victory + chest receipts atomic, idempotent across reload and three isolated slots", () => {
  const storage = memory(),
    g = new HaiUyenGame(maps, new SaveStore(storage));
  at(g, "VS-ARENA", "one_time_reward");
  assert(!g.interact());
  assert.equal(g.tokens, 0);
  g.encounter = true;
  g.hurtEnemy(
    g.enemies.find((e) => e.boss),
    1000,
  );
  assert(g.flags["vs.arena.boss_defeated"]);
  assert(g.receipts.includes("vs.encounter.cua_giap_thuy.defeat.v1"));
  assert(g.interact());
  assert.equal(g.tokens, 1);
  assert(!g.interact());
  const restored = new HaiUyenGame(maps, new SaveStore(storage));
  at(restored, "VS-ARENA", "one_time_reward");
  assert(!restored.interact());
  assert.equal(restored.tokens, 1);
  assert.equal(restored.enemies.length, 0);
  for (const slot of [2, 3]) {
    const other = new HaiUyenGame(maps, new SaveStore(storage, slot));
    assert.equal(other.tokens, 0);
    other.save();
    assert(storage.getItem(SAVE_PREFIX + slot));
  }
});
test("storage errors, future schema, corrupted input and stale tab cannot silently overwrite progress", () => {
  const storage = memory(),
    a = new HaiUyenGame(maps, new SaveStore(storage)),
    b = new HaiUyenGame(maps, new SaveStore(storage));
  a.save();
  assert(!b.save());
  assert(b.saveWarning.includes("tab"));
  const broken = {
    getItem: () => null,
    setItem: () => {
      throw Error("quota");
    },
  };
  const g = new HaiUyenGame(maps, new SaveStore(broken));
  assert(!g.commit({ "vs.foo": true }, "vs.reward.foo", 1));
  assert.equal(g.tokens, 0);
  assert(!g.flags["vs.foo"]);
  for (const data of ["oops", JSON.stringify({ version: 999, revision: 1 })]) {
    const s = memory();
    s.setItem(SAVE_PREFIX + 1, data);
    const st = new SaveStore(s);
    assert.equal(st.load(maps), null);
    assert(st.readOnly);
    assert.throws(() => st.save({}));
    assert.equal(s.getItem(SAVE_PREFIX + 1), data);
  }
});
test("death resets unfinished boss at safe checkpoint, retains puzzle/rewards/CD and no partner", () => {
  const g = new HaiUyenGame(maps);
  g.flags = { "vs.lab.valve_a_primed": true, "vs.lab.valve_b_stable": true };
  at(g, "VS-LAB", "lab_checkpoint");
  g.interact();
  g.cast("k1");
  const cd = g.cooldowns.k1;
  at(g, "VS-ARENA", "arena_from_lab");
  g.encounter = true;
  g.player.hp = 1;
  g.damage(100, "death");
  assert.equal(g.room, "VS-LAB");
  assert.equal(g.cooldowns.k1, cd);
  assert(g.flags["vs.lab.valve_b_stable"]);
  assert(!g.encounter);
  assert(canOccupy(g.map, g.player, g.flags));
});
test("enhanced K1 pierces at most three distinct targets and never repeated hitboxes", () => {
  const g = new HaiUyenGame(maps);
  at(g, "VS-B1", "enemy_reef_01");
  const origin = center({ x: 16, y: 23 });
  Object.assign(g.player, origin);
  g.buffUntil = 8;
  g.roomEnemies[g.room].actors = Array.from({ length: 4 }, (_, i) => ({
    id: "probe-" + i,
    x: origin.x + 30 + i * 30,
    y: origin.y,
    hp: 100,
    radius: 10,
    maxHp: 100,
    boss: false,
  }));
  g.cast("k1", { x: origin.x + 250, y: origin.y });
  g.updateProjectiles(0.4);
  assert.deepEqual(
    g.enemies.map((e) => e.hp),
    [70, 70, 70, 100],
  );
  assert.equal(g.projectiles.length, 0);
});
test("K4 damages each target once per concentric pulse on all sides, not once per frame", () => {
  const g = new HaiUyenGame(maps);
  const p = g.player;
  g.buffUntil = 8;
  g.roomEnemies[g.room].actors = [
    [80, 0],
    [-80, 0],
    [0, 80],
    [0, -80],
  ].map(([x, y], i) => ({
    id: "radial" + i,
    x: p.x + x,
    y: p.y + y,
    hp: 100,
    radius: 10,
    maxHp: 100,
    boss: false,
  }));
  g.cast("k4");
  for (let i = 0; i < 30; i++) g.updateEffects(0.04);
  assert.deepEqual(
    g.enemies.map((e) => e.hp),
    [52, 52, 52, 52],
  );
});
test("flat vortex pulls ordinary enemies inward without wall clipping, boss takes damage only", () => {
  const g = new HaiUyenGame(maps);
  at(g, "VS-B1", "enemy_reef_01");
  const e = g.enemies[0],
    start = { x: e.x, y: e.y };
  g.effects.push({
    type: "vortex",
    x: e.x - 40,
    y: e.y,
    age: 0,
    duration: 3,
    radius: 82,
    tick: 0,
    enhanced: false,
  });
  for (let i = 0; i < 10; i++) g.updateEffects(0.05);
  assert(e.x < start.x);
  assert(canOccupy(g.map, e, g.flags, e.radius));
  assert(e.hp < e.maxHp);
});
test("jelly telegraphs a locked target pool, leashes home and cannot walk through reef walls", () => {
  const g = new HaiUyenGame(maps);
  at(g, "VS-B1", "enemy_jelly_01");
  const jelly = g.enemies.find((e) => e.archetype === "sua_hoi_luu");
  g.player.x -= 100;
  tick(g, 1.1);
  assert.equal(jelly.state, "windup");
  assert.equal(jelly.kind, "pool");
  assert.equal(g.player.hp, 100);
  assert(jelly.target);
  tick(g, 1);
  assert(g.player.hp < 100);
  Object.assign(g.player, center({ x: 3, y: 23 }));
  tick(g, 1);
  assert(!jelly.engaged);
  assert(canOccupy(g.map, jelly, g.flags, jelly.radius));
});
test("cooldown obligations and active K3 survive immediate refresh; invalid damage cannot heal", () => {
  const storage = memory(),
    g = new HaiUyenGame(maps, new SaveStore(storage));
  g.cast("k3");
  tick(g, 0.2);
  g.cast("k1");
  g.save();
  const reload = new HaiUyenGame(maps, new SaveStore(storage));
  assert(reload.cooldowns.k1 > 2.9);
  assert(reload.cooldowns.k3 > 23);
  assert(reload.buffed);
  reload.player.hp = 50;
  reload.damage(-100, "invalid");
  reload.damage(NaN, "invalid2");
  assert.equal(reload.player.hp, 50);
  assert.equal(reload.metrics.prevented, 0);
});
test("Hoi Thuy is reserved for K1/K2/K4/Space, never wasted by basic or self buff", () => {
  const g = new HaiUyenGame(maps);
  g.empowered = true;
  g.cast("basic");
  assert(g.empowered);
  tick(g, 0.2);
  g.cast("k3");
  assert(g.empowered);
  tick(g, 0.2);
  g.cast("k1");
  assert(!g.empowered);
  assert(g.projectiles[0].enhanced);
});
