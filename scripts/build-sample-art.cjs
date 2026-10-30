/** Native 32px sample terrain, explicit pixel clusters and shared 64-color palette. */
const fs = require("node:fs"),
  path = require("node:path"),
  { Pixel, png } = require("./pixel-kit.cjs"),
  { decode } = require("../tests/png.cjs");
const out = path.resolve(__dirname, "../assets/samples/dawn"),
  palette = require("../assets/samples/dawn/palette.json");
const C = {
  grass: "#7ca653",
  light: "#9fba5e",
  gold: "#bdd174",
  shade: "#5c914e",
  dark: "#346b4c",
  forest: "#467e4e",
  forestLight: "#5c914e",
  forestShade: "#315f5a",
  sand: "#e4d29b",
  sandLight: "#f3e1b3",
  sandShade: "#d2be87",
  wet: "#baa56a",
  dirt: "#baa56a",
  dirtLight: "#d2be87",
  dirtShade: "#a08550",
  stone: "#8d9d93",
  stoneLight: "#afbaa6",
  stoneBright: "#ced0b3",
  stoneShade: "#6b8280",
  stoneDark: "#3b535b",
  moss: "#467e4e",
};
const materials = decode(path.join(out, "materials.png")),
  materialNames = ["grass", "sand", "dirt", "cliff", "floor", "shallow"];
function materialColor(name, x, y) {
  const i = materialNames.indexOf(name),
    at =
      ((Math.floor(i / 3) * 32 + (y % 32)) * materials.width +
        (i % 3) * 32 +
        (x % 32)) *
      4;
  return "#" + materials.data.subarray(at, at + 3).toString("hex");
}
function material(p, name, cool = false, variant = 0) {
  for (let y = 0; y < 32; y++)
    for (let x = 0; x < 32; x++) {
      let c = materialColor(
        name,
        name === "cliff" ? (x + variant * 7) % 32 : x,
        y,
      );
      if (name === "sand" && c === "#baa56a") c = "#d2be87";
      if (cool) {
        const map =
          cool === "edge"
            ? {
                "#467e4e": "#346b4c",
                "#5c914e": "#467e4e",
                "#7ca653": "#5c914e",
                "#9fba5e": "#7ca653",
              }
            : {
                "#467e4e": "#25584a",
                "#5c914e": "#346b4c",
                "#7ca653": "#467e4e",
                "#9fba5e": "#5c914e",
              };
        c = map[c] || c;
      }
      p.p(x, y, c);
    }
}
const tiles = [],
  defs = {};
function add(name, fn) {
  const p = new Pixel(32, 32, C);
  fn(p);
  defs[name] = { frame: tiles.length };
  tiles.push(p);
}
function noise(x, y, v) {
  return ((x * 37 + y * 73 + v * 19) ^ (x * y * 7)) >>> 0;
}
function grass(p, v, cool = false) {
  const base = cool === "edge" ? "forestLight" : cool ? "forest" : "grass",
    light = cool === "edge" ? "grass" : cool ? "forestLight" : "light",
    shade = cool === "edge" ? "forest" : cool ? "forestShade" : "shade";
  p.rect(0, 0, 32, 32, base);
  const materialPatch = new Pixel(32, 32, C);
  material(materialPatch, "grass", cool);
  for (const [a, b] of [
    [3 + v * 2, 5],
    [16 - v, 15],
    [7 + v, 25],
  ])
    for (let yy = Math.max(1, b - 2); yy < Math.min(31, b + 3); yy++)
      for (let xx = a; xx < Math.min(30, a + 7); xx++)
        if (!((xx === a || xx === a + 6) && (yy === b - 2 || yy === b + 2))) {
          const at = (yy * 32 + xx) * 4;
          materialPatch.data.copy(p.data, at, at, at + 4);
        }
  for (let j = 0; j < 3; j++) {
    const x = 3 + ((j * 11 + v * 7) % 25),
      y = 3 + ((j * 7 + v * 11) % 25);
    p.rect(x, y, 3 + (j % 3), 2, shade);
    p.p(x - 1, y + 1, shade);
    p.rect(x + 1, y - 1, 3, 1, light);
    if (j % 3 === 0) {
      p.line(x + 1, y, x, y - 3, shade);
      p.line(x + 2, y, x + 3, y - 3, light);
      p.p(x + 4, y - 1, light);
    }
  }
}
function sand(p, v) {
  material(p, "sand");
  for (let j = 0; j < 3; j++) {
    const x = (j * 13 + v * 5) % 31,
      y = (j * 7 + v * 11) % 31;
    p.rect(x, y, j % 3 ? 1 : 3, 1, j % 2 ? "sandShade" : "sandLight");
    if (j % 4 === 0) p.p(x + 1, y + 1, "sandShade");
  }
}
function shape(mask, x, y, inset = 3) {
  const n = mask & 1,
    e = mask & 2,
    s = mask & 4,
    w = mask & 8;
  if (x < 0) return !!w;
  if (x >= 32) return !!e;
  if (y < 0) return !!n;
  if (y >= 32) return !!s;
  if (
    x < (w ? 0 : inset) ||
    x >= (e ? 32 : 32 - inset) ||
    y < (n ? 0 : inset) ||
    y >= (s ? 32 : 32 - inset)
  )
    return false;
  return !(
    (!n && !w && x + y < 8) ||
    (!n && !e && 31 - x + y < 8) ||
    (!s && !w && x + 31 - y < 8) ||
    (!s && !e && 62 - x - y < 8)
  );
}
for (const kind of ["deep", "shallow"])
  for (let f = 0; f < 4; f++)
    add(kind + "_" + f, (p) => {
      if (kind === "shallow") material(p, "shallow");
      else p.rect(0, 0, 32, 32, "#246c7a");
      for (const [y, start, len] of [
        [6, 2, 12],
        [22, 15, 9],
      ])
        for (let k = 0; k < len; k++) {
          const x = (start + k + f * 2) % 32,
            dy = Math.round(Math.sin(k * 0.45 + f * 0.7));
          p.p(x, y + dy, kind === "deep" ? "#2f8490" : "#86c9bb");
          if (k > 2 && k < 8)
            p.p(x, y + dy + 2, kind === "deep" ? "#1d5268" : "#399a9c");
        }
      if (kind === "shallow") {
        p.rect((7 + f * 2) % 30, 14, 3, 1, "#b8dfcf");
        p.p(22, 10, "#86c9bb");
      }
    });
for (let v = 0; v < 4; v++) {
  add("grass_" + v, (p) => grass(p, v));
  add("grassCool_" + v, (p) => grass(p, v, true));
  add("grassMid_" + v, (p) => grass(p, v, "edge"));
  add("sand_" + v, (p) => sand(p, v));
}
for (let mask = 0; mask < 16; mask++) {
  for (let f = 0; f < 4; f++)
    add("shore_" + mask + "_" + f, (p) => {
      const base = new Pixel(32, 32, C);
      sand(base, mask % 4);
      for (let y = 0; y < 32; y++)
        for (let x = 0; x < 32; x++) {
          const a = (y * 32 + x) * 4;
          if (shape(mask, x, y)) {
            base.data.copy(p.data, a, a, a + 4);
            if (
              !shape(mask, x - 1, y) ||
              !shape(mask, x + 1, y) ||
              !shape(mask, x, y + 1) ||
              !shape(mask, x, y - 1)
            )
              p.p(x, y, "wet");
          } else if (shape(mask, x, y, 1))
            p.p(x, y, (x + y + f) % 7 < 5 ? "#dcf0d8" : "#86c9bb");
        }
      for (let k = 0; k < 32; k++)
        if ((k + f * 3) % 11 < 4) {
          if (!(mask & 1)) p.p(k, 1 + (f % 2), "#dcf0d8");
          if (!(mask & 4)) p.p(k, 30 - (f % 2), "#dcf0d8");
        }
    });
  for (const cool of [false, true, "edge"])
    add(
      (cool === "edge"
        ? "grassMidEdge_"
        : cool
          ? "grassCoolEdge_"
          : "grassEdge_") + mask,
      (p) => {
        const base = new Pixel(32, 32, C);
        grass(base, mask % 4, cool);
        for (let y = 0; y < 32; y++)
          for (let x = 0; x < 32; x++)
            if (shape(mask, x, y, 2)) {
              const a = (y * 32 + x) * 4;
              base.data.copy(p.data, a, a, a + 4);
              if (!shape(mask, x, y + 1, 2))
                p.p(x, y, cool ? "forestShade" : "dark");
              if (!shape(mask, x, y - 1, 2))
                p.p(x, y, cool ? "forestLight" : "gold");
            }
      },
    );
  add("path_" + mask, (p) => {
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        const n = mask & 1,
          e = mask & 2,
          s = mask & 4,
          w = mask & 8,
          hit =
            (x >= 5 && x < 27 && y >= 5 && y < 27) ||
            (n && x >= 5 && x < 27 && y < 16) ||
            (e && y >= 5 && y < 27 && x >= 16) ||
            (s && x >= 5 && x < 27 && y >= 16) ||
            (w && y >= 5 && y < 27 && x < 16) ||
            (n && e && x >= 16 && y < 16) ||
            (e && s && x >= 16 && y >= 16) ||
            (s && w && x < 16 && y >= 16) ||
            (w && n && x < 16 && y < 16);
        if (hit) {
          const grain = noise(x, y, mask) % 113;
          p.p(
            x,
            y,
            grain < 3
              ? "dirtLight"
              : grain < 7
                ? materialColor("dirt", x, y)
                : "dirt",
          );
          if ((x === 5 || y === 5) && (x + y) % 3 === 0) p.p(x, y, "wet");
        }
      }
  });
}
function stoneFloor(p, v, moss = false) {
  material(p, "floor");
  for (const [x, y] of [
    [6 + v * 3, 4],
    [21, 18 - v * 2],
  ]) {
    p.line(x, y, x + 2, y + 3, "stoneDark");
    p.line(x + 2, y + 3, x, y + 6, "stoneShade");
    p.p(x - 1, y, "stoneLight");
  }
  if (moss)
    for (const [x, y] of [
      [0, 9],
      [12, 23],
      [23, 0],
      [25, 29],
    ]) {
      p.rect(x, y, 5, 2, "dark");
      p.rect(x + 1, y - 1, 3, 2, "forest");
      p.p(x + 4, y, "light");
    }
}
for (let v = 0; v < 3; v++) add("floor_" + v, (p) => stoneFloor(p, v));
for (let v = 0; v < 2; v++) add("moss_" + v, (p) => stoneFloor(p, v, true));
for (let v = 0; v < 4; v++)
  add("stonePath_" + v, (p) => {
    grass(p, v);
    for (const [j, [x, y, w, h]] of [
      [1, 2, 13, 13],
      [18, 0, 13, 12],
      [3, 19, 12, 12],
      [18, 16, 13, 13],
    ].entries()) {
      p.rect(x + 1, y + 2, w - 1, h - 1, "dark");
      p.rect(x, y, w, h - 2, "stoneShade");
      p.line(x + 1, y, x + w - 2, y, "stoneLight");
      p.line(x, y + 1, x, y + h - 3, "stone");
      p.line(x + 4, y + 3, x + 6, y + 5, "stoneDark");
      if ((j + v) % 2) p.rect(x + w - 5, y + h - 4, 4, 2, "moss");
    }
  });
for (const kind of ["rim", "cliff", "cliffFoot"])
  for (let v = 0; v < (kind === "rim" ? 1 : 4); v++)
    add(kind + (kind === "rim" ? "" : "_" + v), (p) => {
      material(p, "cliff", false, v);
      for (const [x, y] of [
        [7 + v, 12],
        [23 - v, 19],
      ]) {
        p.line(x, y, x - 2, y + 5, "stoneDark");
        p.p(x + 1, y, "stoneLight");
      }
      if (kind !== "cliffFoot") {
        p.rect(0, 0, 32, 3, "dark");
        p.line(0, 0, 31, 0, "gold");
        for (let x = 2; x < 32; x += 7) {
          p.rect(x, 2, 3, 3, "forest");
          p.rect(x + 1, 5, 2, 4 + v, "moss");
          p.p(x + 2, 7 + v, "shade");
        }
      } else {
        for (let y = 0; y < 28; y++)
          for (let x = 0; x < 32; x++) {
            let c = materialColor("cliff", (x + v * 7) % 32, y);
            const darken = {
              "#d2c49c": "#afbaa6",
              "#b8ad86": "#8d9d93",
              "#afbaa6": "#8d9d93",
              "#999577": "#6b8280",
              "#8d9d93": "#6b8280",
              "#6b8280": "#526b6b",
              "#526b6b": "#3b535b",
            };
            p.p(x, y, darken[c] || c);
          }
        for (let x = 0; x < 32; x++)
          p.rect(x, 29 - ((x + v) % 3), 1, 4, "grass");
        p.rect(0, 25, 32, 3, "dark");
        for (let x = 2; x < 30; x += 9) {
          p.rect(x, 25, 5, 2, "forest");
          p.p(x + 2, 24, "light");
        }
      }
    });
// Explicit ramp caps and landings, sharing the stone material of the ruin.
for (const kind of ["stairs", "stairsTop", "stairsBottom"])
  add(kind, (p) => {
    p.rect(0, 0, 32, 32, "stoneDark");
    for (let y = 0; y < 32; y += 8) {
      p.rect(0, y, 32, 5, "stoneShade");
      p.line(0, y, 31, y, "stoneBright");
      p.rect(0, y + 1, 32, 2, "stone");
      p.line(0, y + 5, 31, y + 5, "stoneDark");
      p.p(11, y + 2, "stoneLight");
    }
    if (kind === "stairsTop") p.rect(0, 0, 32, 5, "stoneLight");
    if (kind === "stairsBottom") {
      p.rect(0, 28, 32, 4, "dirt");
      p.line(0, 28, 31, 28, "dirtShade");
    }
    p.p(3, 6, "moss");
    p.p(27, 22, "moss");
  });
add("topRim", (p) => {
  p.rect(0, 29, 32, 3, "dark");
  for (let x = 0; x < 32; x++) {
    p.p(x, 28 - (x % 7 === 0 ? 1 : 0), "light");
    if (x % 5 < 2) p.p(x, 30, "shade");
  }
});
for (const side of ["Left", "Right", "Back"])
  add("rim" + side, (p) => {
    material(p, "cliff");
    if (side === "Back") {
      p.rect(0, 28, 32, 4, "dark");
      p.line(0, 28, 31, 28, "light");
    } else {
      const x = side === "Left" ? 28 : 0;
      p.rect(x, 0, 4, 32, "dark");
      p.line(
        side === "Left" ? 28 : 3,
        0,
        side === "Left" ? 28 : 3,
        31,
        "light",
      );
    }
  });
for (const side of ["NW", "NE", "SE", "SW"])
  add("shoreCorner" + side, (p) => {
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 7 - y; x++) {
        const px = side.includes("W") ? x : 31 - x,
          py = side.includes("N") ? y : 31 - y;
        p.p(px, py, x + y < 2 ? "#dcf0d8" : "wet");
      }
  });
for (const side of ["Left", "Right"])
  add("cliffEnd" + side, (p) => {
    const x = side === "Left" ? 0 : 30;
    p.rect(x, 3, 2, 29, "stoneDark");
    p.line(x, 4, x, 30, "stoneLight");
    p.p(x, 2, "stoneBright");
  });
const terrain = new Pixel(256, Math.ceil(tiles.length / 8) * 32);
tiles.forEach((p, i) => terrain.blit(p, (i % 8) * 32, Math.floor(i / 8) * 32));
png(terrain, path.join(out, "terrain.png"));
const objects = decode(path.join(out, "objects.png")),
  definitions = JSON.parse(fs.readFileSync(path.join(out, "objects.json"))),
  shadows = new Pixel(512, Math.ceil(definitions.length / 4) * 128);
for (const def of definitions) {
  const [sx, sy] = def.rect,
    frame = def.frame,
    shadow = new Pixel(128, 128);
  for (let y = 0; y < 96; y++)
    for (let x = 0; x < 96; x++) {
      if (objects.data[((sy + y) * objects.width + sx + x) * 4 + 3] < 200)
        continue;
      const height = 90 - y,
        px = Math.round(48 + (x - 48) * 0.6 + height * 0.42),
        py = Math.round(64 + height * 0.23);
      for (let dy = 0; dy < 2; dy++)
        for (let dx = 0; dx < 2; dx++) {
          const i = ((py + dy) * 128 + px + dx) * 4;
          if (i < 0 || i + 3 >= shadow.data.length) continue;
          shadow.data.set([23, 62, 88, 48], i);
        }
    }
  for (let y = 63; y <= 66; y++)
    for (let x = 40; x <= 56; x++) {
      const i = (y * 128 + x) * 4;
      shadow.data.set([20, 47, 54, 90], i);
    }
  shadows.blit(shadow, (frame % 4) * 128, Math.floor(frame / 4) * 128);
  def.shadow = {
    rect: [(frame % 4) * 128, Math.floor(frame / 4) * 128, 128, 128],
    origin: [48, 64],
  };
}
png(shadows, path.join(out, "shadows.png"));
const phoenix = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../assets/production/manifest.json"),
  ),
).phoenix;
fs.writeFileSync(
  path.join(out, "manifest.json"),
  JSON.stringify(
    {
      version: 3,
      environment: {
        kind: "tilemap",
        profile: "sample",
        tileSize: 32,
        columns: 8,
        tiles: "assets/samples/dawn/terrain.png",
        tilesSize: [terrain.w, terrain.h],
        props: "assets/samples/dawn/objects.png",
        shadows: "assets/samples/dawn/shadows.png",
        palette,
        tileDefinitions: defs,
        definitions,
      },
      phoenix,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Built sample terrain:",
  tiles.length,
  "frames;",
  definitions.length,
  "objects; pixel cast shadows.",
);
