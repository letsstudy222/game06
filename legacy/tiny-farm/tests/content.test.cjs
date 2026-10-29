const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  zlib = require("node:zlib");
const content = require("../src/config/content.js");
const { buildAtlas } = require("../src/pets/phoenix-art.js");
const root = path.join(__dirname, "..");
function png(file) {
  const b = fs.readFileSync(file);
  assert.equal(b.subarray(1, 4).toString(), "PNG");
  const width = b.readUInt32BE(16),
    height = b.readUInt32BE(20);
  assert.equal(b[25], 6, "real RGBA");
  let p = 8,
    parts = [];
  while (p < b.length) {
    const len = b.readUInt32BE(p),
      type = b.subarray(p + 4, p + 8).toString();
    if (type === "IDAT") parts.push(b.subarray(p + 8, p + 8 + len));
    p += len + 12;
  }
  const decoded = zlib.inflateSync(Buffer.concat(parts)),
    rgba = [];
  for (let y = 0; y < height; y++) {
    const at = y * (width * 4 + 1);
    assert.equal(decoded[at], 0);
    rgba.push(decoded.subarray(at + 1, at + 1 + width * 4));
  }
  return { width, height, data: Buffer.concat(rgba) };
}
test("production Phoenix atlas has correct grid, true alpha and sharp authored colors", () => {
  const meta = JSON.parse(
      fs.readFileSync(path.join(root, "assets/sprites/phoenix-legend.json")),
    ),
    image = png(path.join(root, "assets/sprites/phoenix-legend.png"));
  assert.equal(image.width, meta.frameWidth * meta.columns);
  assert.equal(image.height, meta.frameHeight * meta.rows);
  assert.equal(meta.frameWidth, 32);
  const alphas = new Set();
  let empty = 0,
    opaque = 0;
  for (let i = 3; i < image.data.length; i += 4) {
    alphas.add(image.data[i]);
    image.data[i] === 0 ? empty++ : opaque++;
  }
  assert.deepEqual(
    [...alphas].sort((a, b) => a - b),
    [0, 255],
  );
  assert(empty > opaque * 0.2);
  for (const a of Object.values(meta.animations)) {
    assert(a.row < meta.rows);
    assert(a.frames <= meta.columns);
    assert(a.fps > 0);
  }
  assert.deepEqual(
    image.data,
    Buffer.from(buildAtlas().data),
    "PNG must match the authored source; regenerate when source changes",
  );
  assert.equal(content.pets.phoenix.frameWidth, meta.frameWidth);
  assert.equal(content.pets.phoenix.frameHeight, meta.frameHeight);
});
test("all registered content assets and local pixel font license are shipped", () => {
  for (const map of Object.values(content.maps)) {
    assert(fs.existsSync(path.join(root, map.art)));
    assert.equal(map.width, 480);
    assert.equal(map.height, 320);
    assert.equal(map.plots.length, 12);
    for (const p of [...map.plots, ...map.gathers, ...map.places]) {
      assert(p.x >= 0 && p.x < map.width);
      assert(p.y >= 0 && p.y < map.height);
    }
  }
  for (const c of Object.values(content.characters))
    assert(fs.existsSync(path.join(root, c.art)));
  for (const p of Object.values(content.pets))
    assert(fs.existsSync(path.join(root, p.atlas)));
  assert(
    fs.statSync(path.join(root, "assets/fonts/VT323-Regular.ttf")).size > 10000,
  );
  assert.match(
    fs.readFileSync(path.join(root, "assets/fonts/VT323-OFL.txt"), "utf8"),
    /SIL OPEN FONT LICENSE/,
  );
});
test("the supplied concept images are never runtime backgrounds or animation sheets", () => {
  for (const file of [
    "index.html",
    "style.css",
    "game.js",
    "farm.js",
    "src/config/content.js",
    "src/pets/phoenix.js",
    "src/ui/title-screen.js",
  ])
    assert.doesNotMatch(
      fs.readFileSync(path.join(root, file), "utf8"),
      /reference_(?:gameplay|title|full|phoenix).*\.png/,
    );
});
