import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";
import { createRequire } from "node:module";
import { GameState } from "../src/island/GameState.mjs";
import { PlayerPhoenix } from "../src/island/PlayerPhoenix.mjs";
import { SkillSystem, SKILLS } from "../src/island/SkillSystem.mjs";
import {
  AnimationController,
  PHOENIX_ANIMATIONS,
} from "../src/island/AnimationController.mjs";
import { getIsland, ISLANDS } from "../src/island/islands.mjs";
import {
  canOccupy,
  moveWithCollision,
  landContains,
} from "../src/island/geometry.mjs";
const require = createRequire(import.meta.url),
  { buildPlayerAtlas } = require("../scripts/generate-player-atlas.cjs"),
  { buildAtlas } = require("../src/pets/phoenix-art.js");
const map = getIsland("dawn"),
  idle = { x: 0, y: 0, hover: false };
function tick(g, seconds, input = idle) {
  for (let t = 0; t < seconds; t += 1 / 60) g.update(1 / 60, input);
}
test("island data is valid and the player spawns on unobstructed land", () => {
  assert.throws(() => getIsland("missing"));
  for (const m of Object.values(ISLANDS)) {
    assert(canOccupy(m, m.spawn));
    for (const t of m.targets) assert(landContains(m, t, 5));
    for (const h of m.hazards) assert(canOccupy(m, h));
  }
});
test("movement has normalized diagonal speed and changes idle/move state", () => {
  const a = new GameState(),
    b = new GameState();
  tick(a, 0.8, { x: 1, y: 0, hover: false });
  tick(b, 0.8, { x: 1, y: 1, hover: false });
  const d = (p) => Math.hypot(p.x - map.spawn.x, p.y - map.spawn.y);
  assert(Math.abs(d(a.player) - d(b.player)) < 0.01);
  assert.equal(a.player.animation.name, "move");
  tick(a, 0.1);
  assert.equal(a.player.animation.name, "idle");
});
test("water and rocks block movement, including long steps", () => {
  let p = { ...map.spawn };
  for (let i = 0; i < 150; i++) p = moveWithCollision(map, p, 4, 0);
  assert(landContains(map, p, 8));
  assert(p.x < 560);
  const rock = map.rocks[0];
  p = moveWithCollision(map, { x: rock.x - 25, y: rock.y }, 70, 0);
  assert(p.x < rock.x);
  assert(canOccupy(map, p));
});
test("hover is faster, selects fly animation and still respects land collision", () => {
  const a = new GameState(),
    b = new GameState();
  tick(a, 0.4, { x: 1, y: 0, hover: false });
  tick(b, 0.4, { x: 1, y: 0, hover: true });
  assert(b.player.x > a.player.x);
  assert.equal(b.player.animation.name, "fly");
  for (let i = 0; i < 600; i++) b.update(1 / 60, { x: 1, y: 0, hover: true });
  assert(landContains(map, b.player, 8));
});
test("animation controller loops movement and completes one-shot attacks", () => {
  const a = new AnimationController();
  a.set("move");
  a.update(1);
  assert.equal(a.frame, 0);
  a.set("attack");
  a.update(1);
  assert.equal(a.frame, 3);
  assert.equal(a.complete, true);
  assert.throws(() => a.set("missing"));
});
test("basic attack only hits targets in range and in front; cooldown blocks spam", () => {
  const skills = new SkillSystem(),
    p = new PlayerPhoenix({ x: 300, y: 200 }),
    targets = [
      { x: 327, y: 200, hp: 3, maxHp: 3 },
      { x: 275, y: 200, hp: 3, maxHp: 3 },
      { x: 350, y: 200, hp: 3, maxHp: 3 },
    ];
  assert(skills.use("attack", p, targets));
  assert.equal(targets[0].hp, 2);
  assert.equal(targets[1].hp, 3);
  assert.equal(targets[2].hp, 3);
  assert.equal(skills.use("attack", p, targets), false);
  skills.update(0.4, map, targets);
  assert(skills.use("attack", p, targets));
  assert.equal(targets[0].hp, 1);
});
test("fire projectile hits once without tunneling through a target", () => {
  const skills = new SkillSystem(),
    p = new PlayerPhoenix({ x: 305, y: 208 }),
    target = { x: 367, y: 208, hp: 3, maxHp: 3, flash: 0 };
  assert(skills.use("fire", p, [target]));
  assert.equal(skills.use("fire", p, [target]), false);
  skills.update(0.5, map, [target]);
  assert.equal(target.hp, 0);
  assert.equal(skills.projectiles.length, 0);
  skills.update(0.1, map, [target]);
  assert.equal(target.hp, 0);
  skills.update(9, map, [target]);
  assert.equal(target.hp, 3);
});
test("projectiles expire at their range and collide with terrain", () => {
  const skills = new SkillSystem(),
    p = new PlayerPhoenix({ x: 305, y: 208 });
  skills.use("fire", p, []);
  skills.update(2, map, []);
  assert.equal(skills.projectiles.length, 0);
  p.x = map.rocks[0].x - 25;
  p.y = map.rocks[0].y;
  skills.cooldowns.fire = 0;
  skills.use("fire", p, []);
  skills.update(0.2, map, []);
  assert.equal(skills.projectiles.length, 0);
  assert(skills.effects.length > 0);
});
test("thorn damage has invulnerability, hover avoids it, HP regenerates", () => {
  const g = new GameState(),
    h = map.hazards[0];
  Object.assign(g.player, { x: h.x, y: h.y });
  g.update(0.01, idle);
  assert.equal(g.player.hp, 88);
  g.update(0.01, idle);
  assert.equal(g.player.hp, 88);
  tick(g, 0.5, { x: 0, y: 0, hover: true });
  assert.equal(g.player.hp, 88);
  Object.assign(g.player, map.spawn);
  tick(g, 5);
  assert(g.player.hp > 88);
  assert(g.player.hp <= 100);
});
test("zero HP respawns safely; pause freezes movement, cooldown and time", () => {
  const g = new GameState();
  g.player.hp = 1;
  Object.assign(g.player, map.hazards[0]);
  g.update(0.01, idle);
  assert.equal(g.player.hp, 100);
  assert.equal(g.player.x, map.spawn.x);
  assert(g.player.recovery > 0);
  g.paused = true;
  const before = g.snapshot();
  g.update(0.05, { x: 1, y: 0, hover: true });
  assert.deepEqual(g.snapshot(), before);
  assert.equal(g.use("fire"), false);
});
test("long or negative frame deltas are bounded", () => {
  const g = new GameState();
  g.update(100, { x: 1, y: 0, hover: false });
  assert(g.time <= 0.05);
  assert(g.player.x - map.spawn.x <= 64 * 0.05 + 0.01);
  const before = g.time;
  g.update(-1, idle);
  assert.equal(g.time, before);
});
test("new islands can be selected through the registry without changing player/skills", () => {
  ISLANDS.test = {
    ...map,
    id: "test",
    name: "Island 2",
    spawn: { x: 310, y: 230 },
  };
  const g = new GameState("test");
  assert.equal(g.island.name, "Island 2");
  assert.equal(g.player.x, 310);
  g.setIsland("dawn");
  assert.equal(g.player.x, map.spawn.x);
  assert.equal(g.skills.projectiles.length, 0);
  delete ISLANDS.test;
});
test("the five-state atlas has real alpha, matches metadata, and preserves the established idle art", () => {
  const meta = JSON.parse(
    fs.readFileSync(
      new URL("../assets/sprites/phoenix-player.json", import.meta.url),
    ),
  );
  assert.deepEqual(meta.animations, PHOENIX_ANIMATIONS);
  assert.equal(meta.rows, 5);
  const s = buildPlayerAtlas(),
    old = buildAtlas(3);
  assert.equal(s.width, 128);
  assert.equal(s.height, 160);
  for (let i = 0; i < 128 * 32 * 4; i++)
    assert.equal(
      s.data[i],
      old.data[i],
      "idle art must be the existing Phoenix",
    );
  const alpha = new Set();
  for (let i = 3; i < s.data.length; i += 4) alpha.add(s.data[i]);
  assert.deepEqual(
    [...alpha].sort((a, b) => a - b),
    [0, 255],
  );
  const png = fs.readFileSync(
    new URL("../assets/sprites/phoenix-player.png", import.meta.url),
  );
  assert.equal(png.readUInt32BE(16), 128);
  assert.equal(png.readUInt32BE(20), 160);
  let at = 8,
    chunks = [];
  while (at < png.length) {
    const n = png.readUInt32BE(at),
      type = png.subarray(at + 4, at + 8).toString();
    if (type === "IDAT") chunks.push(png.subarray(at + 8, at + 8 + n));
    at += n + 12;
  }
  const raw = zlib.inflateSync(Buffer.concat(chunks));
  for (let y = 0; y < 160; y++)
    assert.deepEqual(
      raw.subarray(y * 513 + 1, y * 513 + 513),
      Buffer.from(s.data.subarray(y * 512, (y + 1) * 512)),
    );
});
