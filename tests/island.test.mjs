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
test("all four authored zones are connected by walkable tile routes and stairs", () => {
  assert.throws(() => getIsland("missing"));
  assert(canOccupy(map, map.spawn, 7));
  for (const goal of Object.values(map.checkpoints))
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
  assert(p.x < map.width);
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
  assert(c.x > x && c.x < map.width - 640);
  assert(Number.isInteger(c.renderX));
  for (let i = 0; i < 1000; i++) c.follow({ x: 2000, y: 2000 }, 0.05);
  assert(c.x <= map.width - 640 && c.y <= map.height - 360);
  c.resize(390, map.height + 100, map.spawn);
  assert.equal(c.y, 0);
});
test("tile culling covers the camera and never reads beyond the authored grid", () => {
  const l = new WorldLayer(null, map, {}),
    chunks = l.visibleTiles({ x: 300, y: 250 }, 640, 360);
  assert(chunks.length > 0 && chunks.length < 400);
  for (const r of chunks) {
    assert(r.x >= 0 && r.y >= 0);
    assert(r.x + r.width <= map.width && r.y + r.height <= map.height);
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
test("new environment atlas is a reusable 32px tile set with a shared pixel palette", () => {
  const manifest = read("../assets/tiles/dawn/manifest.json"),
    env = manifest.environment;
  assert.equal(env.kind, "tilemap");
  assert.equal(env.tileSize, 32);
  assert(Object.keys(env.tileDefinitions).length >= 70);
  for (const key of [
    "grass_0",
    "grass_1",
    "path_15",
    "shore_3",
    "deep_0",
    "shallow_3",
    "rim",
    "cliff",
    "cliffFoot",
    "stairs",
    "floor_0",
    "moss_0",
  ])
    assert(env.tileDefinitions[key], key);
  const palette = new Set(env.palette);
  assert(palette.size <= 64);
  for (const file of ["terrain.png", "objects.png"]) {
    const p = decode(new URL("../assets/tiles/dawn/" + file, import.meta.url));
    for (let i = 0; i < p.data.length; i += 4) {
      assert([0, 255].includes(p.data[i + 3]));
      if (p.data[i + 3])
        assert(palette.has("#" + p.data.subarray(i, i + 3).toString("hex")));
    }
  }
  assert(env.definitions.some((p) => p.id === "altar"));
  assert(env.definitions.some((p) => p.id === "palm"));
});
test("visible solid tiles and collision share one grid, with stairs as the only terrace passage", () => {
  const blocked = new Set(["deep", "shallow", "rim", "cliff", "cliffFoot"]);
  for (let y = 0; y < map.tilemap.rows; y++)
    for (let x = 0; x < map.tilemap.columns; x++)
      if (blocked.has(map.tilemap.ground[y][x]))
        assert(!canOccupy(map, { x: x * 32 + 16, y: y * 32 + 16 }, 0));
  for (let y = 13; y <= 16; y++)
    assert(canOccupy(map, { x: 20 * 32 + 16, y: y * 32 + 16 }, 7));
  assert(!canOccupy(map, { x: 18 * 32 + 16, y: 14 * 32 + 16 }, 7));
  assert(
    !fs
      .readFileSync(
        new URL("../src/island/WorldLayer.mjs", import.meta.url),
        "utf8",
      )
      .includes("world.png"),
  );
});

test("full Dawn uses the approved layered kit at original scale and all used assets exist", () => {
  const manifest = read('../' + map.assetManifest), env = manifest.environment;
  assert.deepEqual([map.width, map.height, map.tilemap.tileSize], [1280, 896, 32]);
  assert.equal(env.profile, 'sun-ruins');
  assert.deepEqual(manifest.phoenix, read('../assets/samples/dawn/manifest.json').phoenix);
  assert.deepEqual([...new Set(map.tilemap.elevation.flat())].sort(), [0,1,2]);
  for (const mood of ['sun','forest','forestEdge','ruins']) assert(map.tilemap.mood.flat().includes(mood));
  const ids = new Set(env.definitions.map(d => d.id));
  for (const obj of [...map.trees,...map.rocks,...map.props,...map.bushes,...map.hazards]) assert(ids.has(obj.asset), obj.asset);
  assert.equal(map.hazards.length, 2);
  for (const id of ['bramble','log','shell','palmLeaning','broadleafYoung','coastalRock']) assert(ids.has(id));
  // Exercise every renderer branch on every cell at every water/foam frame.
  const layer = new WorldLayer(null, map, env);
  for (let frame=0; frame<4; frame++) layer.draw({drawImage(){}}, {x:0,y:0}, map.width,map.height,frame/2);
  for (const x of [28,29]) for (const y of [11,12]) {
    assert.equal(map.tilemap.ground[y][x], 'stairs');
    assert(canOccupy(map,{x:x*32+16,y:y*32+16},7));
  }
  assert(route(map,map.spawn,map.shrine,12).some(p => Math.floor(p.y/32)===11 && [28,29].includes(Math.floor(p.x/32))));
});

test("expanded object atlas retains palette, clean gutters, anchors and discrete shadows", () => {
  const env = read('../'+map.assetManifest).environment;
  const palette = new Set(env.palette), p = decode(new URL('../'+env.props, import.meta.url));
  for(let i=0;i<p.data.length;i+=4) {
    assert([0,255].includes(p.data[i+3]));
    if(p.data[i+3]) assert(palette.has('#'+p.data.subarray(i,i+3).toString('hex')), p.data.subarray(i,i+3).toString('hex'));
  }
  for(const d of env.definitions) {
    const [l,t,r,b]=d.bounds;
    assert(l>=2 && t>=2 && r<=94 && b<=94, d.id);
    assert.deepEqual(d.origin,[48,90]);
    assert(d.shadow);
  }
  const sh = decode(new URL('../'+env.shadows,import.meta.url)), alpha=new Set();
  for(let i=3;i<sh.data.length;i+=4) alpha.add(sh.data[i]);
  assert.deepEqual([...alpha].sort((a,b)=>a-b),[0,48,90]);
});
