import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { getIsland } from "../src/island/islands.mjs";
import { canOccupy } from "../src/island/geometry.mjs";
import { route } from "./route-helper.mjs";
import { GameState } from "../src/island/GameState.mjs";
import { WorldLayer } from "../src/island/WorldLayer.mjs";
const require = createRequire(import.meta.url),
  { decode } = require("./png.cjs"),
  sample = getIsland("dawn-sample"),
  meta = JSON.parse(
    fs.readFileSync(
      new URL("../assets/samples/dawn/manifest.json", import.meta.url),
    ),
  ),
  env = meta.environment;
test("sample is a separate 32px map with three heights and connected coast/forest/stairs/shrine", () => {
  assert.notEqual(sample, getIsland("dawn"));
  assert.equal(sample.tilemap.tileSize, 32);
  assert.deepEqual(
    [...new Set(sample.tilemap.elevation.flat())].sort(),
    [0, 1, 2],
  );
  assert(canOccupy(sample, sample.spawn, 7));
  for (const [name, p] of Object.entries(sample.checkpoints))
    assert(route(sample, sample.spawn, p, 12).length, name);
});
test("sample cliffs and perimeter rims block; both broad stair runs remain passable", () => {
  for (let y = 0; y < sample.tilemap.rows; y++)
    for (let x = 0; x < sample.tilemap.columns; x++)
      if (
        ["cliff", "cliffFoot", "rim", "deep", "shallow"].includes(
          sample.tilemap.ground[y][x],
        )
      )
        assert(!canOccupy(sample, { x: x * 32 + 16, y: y * 32 + 16 }, 0));
  for (const [x, ys] of [
    [11, [10, 11, 12]],
    [17, [7, 8]],
  ])
    for (const y of ys)
      assert(canOccupy(sample, { x: x * 32 + 16, y: y * 32 + 16 }, 7));
});
test("sample atlas covers corner/side/landing and cool forest materials without a world illustration", () => {
  assert.equal(env.profile, "sample");
  assert.equal(env.tileSize, 32);
  for (const key of [
    "rimLeft",
    "rimRight",
    "rimBack",
    "stairsTop",
    "stairsBottom",
    "cliffEndLeft",
    "cliffEndRight",
    "shoreCornerNW",
    "shoreCornerSE",
    "grassCool_0",
    "grassMid_0",
    "stonePath_0",
    "shore_15_3",
  ])
    assert(env.tileDefinitions[key], key);
  assert(!env.world);
  const tiles = decode(
    new URL("../assets/samples/dawn/terrain.png", import.meta.url),
  );
  assert.equal(tiles.width, env.tilesSize[0]);
  assert.equal(tiles.height, env.tilesSize[1]);
});
test("sample props and terrain use shared palette and clean alpha; props have safe gutters and distinct foot/shadow anchors", () => {
  const palette = new Set(env.palette);
  assert.equal(palette.size, 64);
  for (const file of ["objects.png", "terrain.png"]) {
    const image = decode(
      new URL("../assets/samples/dawn/" + file, import.meta.url),
    );
    for (let i = 0; i < image.data.length; i += 4) {
      assert([0, 255].includes(image.data[i + 3]));
      if (image.data[i + 3])
        assert(
          palette.has("#" + image.data.subarray(i, i + 3).toString("hex")),
        );
    }
  }
  for (const obj of [
    ...sample.trees,
    ...sample.rocks,
    ...sample.bushes,
    ...sample.props,
    ...sample.hazards,
  ])
    assert(
      env.definitions.some((d) => d.id === obj.asset),
      obj.asset,
    );
  for (const d of env.definitions) {
    const [l, t, r, b] = d.bounds;
    assert(l >= 2 && t >= 2 && r <= 93 && b <= 93, d.id);
    assert(d.source.rect.every(Number.isFinite));
    assert(d.shadow);
    assert.notDeepEqual(d.shadow.origin, d.origin);
  }
  assert(env.definitions.some((d) => d.id === "wall"));
  assert(env.definitions.some((d) => d.id === "altar"));
});
test("cast shadow atlas has discrete low alpha levels, not blurred opaque textures", () => {
  const image = decode(
      new URL("../assets/samples/dawn/shadows.png", import.meta.url),
    ),
    alpha = new Set();
  for (let i = 3; i < image.data.length; i += 4) alpha.add(image.data[i]);
  assert.deepEqual(
    [...alpha].sort((a, b) => a - b),
    [0, 48, 90],
  );
});
test("the existing player and shrine system work on sample data with pixel tile culling", () => {
  const g = new GameState("dawn-sample");
  g.update(0.05, { x: 1, y: 0, hover: false });
  assert(g.player.x > sample.spawn.x);
  assert(g.use("fire"));
  assert(g.skills.projectiles.length);
  Object.assign(g.player, sample.shrine);
  assert(g.interact());
  assert(g.shrineActivated);
  assert.equal(meta.phoenix.image, "assets/production/phoenix/atlas.png");
  const layer = new WorldLayer(null, sample, env),
    tiles = layer.visibleTiles({ x: 300, y: 250 }, 195, 422);
  assert(tiles.length < sample.tilemap.columns * sample.tilemap.rows);
  for (const t of tiles)
    assert(
      t.column >= 0 &&
        t.row >= 0 &&
        t.column < sample.tilemap.columns &&
        t.row < sample.tilemap.rows,
    );
});
