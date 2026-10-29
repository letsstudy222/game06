import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { GameState } from "../src/island/GameState.mjs";
import { PlayerPhoenix } from "../src/island/PlayerPhoenix.mjs";
import { SkillSystem } from "../src/island/SkillSystem.mjs";
import { AnimationController } from "../src/island/AnimationController.mjs";
import { Camera } from "../src/island/Camera.mjs";
import { WorldLayer } from "../src/island/WorldLayer.mjs";
import { getIsland, ISLANDS } from "../src/island/islands.mjs";
import { canOccupy, moveWithCollision } from "../src/island/geometry.mjs";
import { route } from "./route-helper.mjs";
const require = createRequire(import.meta.url),
  { decode } = require("./png.cjs"),
  map = getIsland("dawn"),
  idle = { x: 0, y: 0, hover: false };
const read = (n) => JSON.parse(fs.readFileSync(new URL(n, import.meta.url)));
function tick(g, seconds, input = idle) {
  for (let t = 0; t < seconds; t += 1 / 60) g.update(1 / 60, input);
}
test("all four authored zones are connected by traversable corridors", () => {
  assert.throws(() => getIsland("missing"));
  assert(canOccupy(map, map.spawn, 7));
  for (const goal of [{ x: 500, y: 460 }, { x: 383, y: 130 }, map.shrine])
    assert(route(map, map.spawn, goal).length > 0, JSON.stringify(goal));
});
test("movement is normalized and idle/move transitions preserve facing", () => {
  const a = new GameState(),
    b = new GameState();
  tick(a, 0.5, { x: 1, y: 0, hover: false });
  tick(b, 0.5, { x: 1, y: 1, hover: false });
  const d = (p) => Math.hypot(p.x - map.spawn.x, p.y - map.spawn.y);
  assert(Math.abs(d(a.player) - d(b.player)) < 0.01);
  assert.equal(a.player.animation.name, "move");
  tick(a, 0.1);
  assert.equal(a.player.animation.name, "idle");
  assert.equal(a.player.facing.x, 1);
});
test("cliffs, water, rocks and trunks block even a long movement step", () => {
  let p = moveWithCollision(map, map.spawn, 1000, 0, 7);
  assert(canOccupy(map, p, 7));
  assert(p.x < 900);
  const rock = map.rocks[0];
  p = moveWithCollision(map, { x: rock.x - 30, y: rock.y }, 70, 0, 7);
  assert(p.x < rock.x);
  assert(canOccupy(map, p, 7));
});
test("hover is faster but cannot bypass terrain collision", () => {
  const a = new GameState(),
    b = new GameState();
  tick(a, 0.4, { x: 1, y: 0, hover: false });
  tick(b, 0.4, { x: 1, y: 0, hover: true });
  assert(b.player.x > a.player.x);
  assert.equal(b.player.animation.name, "fly");
  tick(b, 10, { x: 1, y: 0, hover: true });
  assert(canOccupy(map, b.player, 7));
});
test("six animation states include a one-shot hurt reaction", () => {
  const a = new AnimationController();
  a.set("move");
  a.update(1);
  assert.equal(a.frame, 0);
  a.set("hurt");
  a.update(0.1);
  assert.equal(a.name, "hurt");
  a.update(1);
  assert(a.complete);
  assert.throws(() => a.set("missing"));
});
test("basic attack respects direction, range and cooldown", () => {
  const s = new SkillSystem(),
    p = new PlayerPhoenix(map.spawn),
    targets = [
      { x: p.x + 27, y: p.y, hp: 3, maxHp: 3 },
      { x: p.x - 25, y: p.y, hp: 3, maxHp: 3 },
      { x: p.x + 50, y: p.y, hp: 3, maxHp: 3 },
    ];
  s.use("attack", p, targets);
  assert.deepEqual(
    targets.map((t) => t.hp),
    [2, 3, 3],
  );
  assert(!s.use("attack", p, targets));
  s.update(0.4, map, targets);
  assert(s.use("attack", p, targets));
  assert.equal(targets[0].hp, 1);
});
test("fire charges before launch, hits once and does not tunnel", () => {
  const s = new SkillSystem(),
    p = new PlayerPhoenix(map.spawn),
    t = { x: p.x + 65, y: p.y, hp: 3, maxHp: 3, flash: 0 };
  assert(s.use("fire", p, [t]));
  assert(!s.use("fire", p, [t]));
  s.update(0.1, map, [t]);
  assert.equal(t.hp, 3);
  assert(s.projectiles[0].charge > 0);
  s.update(0.5, map, [t]);
  assert.equal(t.hp, 0);
  assert.equal(s.projectiles.length, 0);
  s.update(9, map, [t]);
  assert.equal(t.hp, 3);
});
test("projectiles expire at terrain or range", () => {
  const s = new SkillSystem(),
    p = new PlayerPhoenix(map.spawn);
  s.use("fire", p, []);
  s.update(2, map, []);
  assert.equal(s.projectiles.length, 0);
});
test("damage triggers hurt, invulnerability and hover immunity; HP recovers", () => {
  const g = new GameState();
  Object.assign(g.player, map.hazards[0]);
  g.update(0.01, idle);
  assert.equal(g.player.hp, 88);
  assert.equal(g.player.animation.name, "hurt");
  g.update(0.01, idle);
  assert.equal(g.player.hp, 88);
  tick(g, 0.5, { x: 0, y: 0, hover: true });
  assert.equal(g.player.hp, 88);
  Object.assign(g.player, map.spawn);
  tick(g, 5);
  assert(g.player.hp > 88 && g.player.hp <= 100);
});
test("death respawns safely and pause freezes the complete simulation", () => {
  const g = new GameState();
  g.player.hp = 1;
  Object.assign(g.player, map.hazards[0]);
  g.update(0.01, idle);
  assert.equal(g.player.hp, 100);
  assert.equal(g.player.x, map.spawn.x);
  g.paused = true;
  const before = g.snapshot();
  g.update(0.05, { x: 1, y: 0, hover: true });
  assert.deepEqual(g.snapshot(), before);
  assert(!g.use("fire"));
});
test("the altar only interacts at close range and its state toggles", () => {
  const g = new GameState();
  assert(!g.interact());
  assert(!g.shrineActivated);
  Object.assign(g.player, map.shrine);
  assert(g.interact());
  assert(g.shrineActivated);
  assert.equal(g.region(), "Tàn tích Nhật Diệm");
  assert(g.interact());
  assert(!g.shrineActivated);
  g.paused = true;
  assert(!g.interact());
});
test("camera interpolates, clamps, and rounds only at render boundaries", () => {
  const c = new Camera(map, 640, 360);
  c.follow(map.spawn, 0, true);
  const x = c.x;
  c.follow({ x: 900, y: 600 }, 0.016);
  assert(c.x > x && c.x < 320);
  assert(Number.isInteger(c.renderX));
  for (let i = 0; i < 1000; i++) c.follow({ x: 2000, y: 2000 }, 0.05);
  assert(c.x <= 320 && c.y <= 280);
  c.resize(390, 844, map.spawn);
  assert.equal(c.y, 0);
});
test("chunk culling covers the camera and never reads beyond production ground art", () => {
  const l = new WorldLayer(null, 960, 640, 160),
    chunks = l.chunks({ x: 300, y: 250 }, 640, 360);
  assert(chunks.length > 0 && chunks.length < 24);
  for (const r of chunks) {
    assert(r.x >= 0 && r.y >= 0);
    assert(r.x + r.width <= 960 && r.y + r.height <= 640);
  }
});
test("frame delta is bounded and another island can use the same controller", () => {
  const g = new GameState();
  g.update(100, { x: 1, y: 0, hover: false });
  assert(g.time <= 0.05);
  const before = g.time;
  g.update(-1, idle);
  assert.equal(g.time, before);
  ISLANDS.test = { ...map, id: "test", spawn: { x: 460, y: 320 } };
  const n = new GameState("test");
  assert.equal(n.player.x, 460);
  assert(n.camera);
  delete ISLANDS.test;
});
test("production hero frames have real alpha and safe gutters, no clipped concept extraction", () => {
  const meta = read("../assets/production/manifest.json"),
    image = decode(
      new URL("../assets/production/phoenix/atlas.png", import.meta.url),
    );
  assert.equal(image.width, 192);
  assert.equal(image.height, 288);
  assert.equal(meta.phoenix.frameSize, 96);
  for (const [l, t, r, b] of meta.phoenix.bounds) {
    assert(l >= 2 && t >= 2 && r <= 94 && b <= 94);
    assert(r - l > 40 && b - t > 40);
  }
  const alpha = new Set(),
    colors = new Set();
  for (let i = 0; i < image.data.length; i += 4) {
    alpha.add(image.data[i + 3]);
    if (image.data[i + 3])
      colors.add(
        (image.data[i] << 16) | (image.data[i + 1] << 8) | image.data[i + 2],
      );
  }
  assert.deepEqual(
    [...alpha].sort((a, b) => a - b),
    [0, 255],
  );
  assert(colors.size <= 48);
  assert(meta.phoenix.directions.up);
  assert(meta.phoenix.directions.right.mirror);
});
test("environment uses a shared 128-color production palette with clean prop alpha", () => {
  for (const file of ["dawn/world.png", "dawn/props.png"]) {
    const image = decode(
        new URL("../assets/production/" + file, import.meta.url),
      ),
      colors = new Set();
    for (let i = 0; i < image.data.length; i += 4) {
      assert([0, 255].includes(image.data[i + 3]));
      if (image.data[i + 3])
        colors.add(
          (image.data[i] << 16) | (image.data[i + 1] << 8) | image.data[i + 2],
        );
    }
    assert(colors.size <= 128);
  }
  const source = fs.readFileSync(
    new URL("../src/island/IslandScene.mjs", import.meta.url),
    "utf8",
  );
  assert(!/PixelSurface|function tree|function rock|ellipse\(/.test(source));
});
