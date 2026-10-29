/* Extend the existing Nhat Diem art, preserving its palette and silhouette. */
const fs = require("node:fs"),
  path = require("node:path");
const { png } = require("./png.cjs");
const { buildAtlas } = require("../src/pets/phoenix-art.js");
const Surface = require("../src/engine/pixel-art.js");
function buildPlayerAtlas() {
  const base = buildAtlas(3),
    out = new Surface(128, 160);
  for (let row = 0; row < 5; row++)
    for (let frame = 0; frame < 4; frame++) {
      const fromRow = row === 2 ? 1 : row === 4 ? 2 : 0;
      const lean = row === 3 ? [0, 1, 2, 0][frame] : 0;
      for (let y = 0; y < 32; y++)
        for (let x = 0; x < 32; x++) {
          const sx = frame * 32 + x,
            sy = fromRow * 32 + y,
            at = (sy * 128 + sx) * 4;
          if (!base.data[at + 3]) continue;
          const xx = x + lean;
          if (xx >= 32) continue;
          const n = ((row * 32 + y) * 128 + frame * 32 + xx) * 4;
          out.data.set(base.data.subarray(at, at + 4), n);
        }
      out.clip = { x: frame * 32, y: row * 32, width: 32, height: 32 };
      const rect = (x, y, w, h, c) =>
        out.rect(frame * 32 + x, row * 32 + y, w, h, c);
      if (row === 1) {
        const step = frame % 2 ? 1 : -1;
        rect(14, 26, 3, 1, "#35242b");
        rect(19, 26 + step, 3, 1, "#dba548");
      }
      if (row === 3 && frame > 0 && frame < 3) {
        out.line(
          frame * 32 + 24,
          row * 32 + 16,
          frame * 32 + 30,
          row * 32 + 19,
          "#f6cd69",
        );
        rect(29, 18, 2, 2, "#fff9df");
      }
      if (row === 4 && frame === 2) {
        rect(27, 13, 3, 2, "#f6cd69");
        rect(28, 12, 2, 1, "#d75239");
      }
    }
  delete out.clip;
  return out;
}
const animations = {
  idle: { row: 0, frames: 4, fps: 4, loop: true },
  move: { row: 1, frames: 4, fps: 8, loop: true },
  fly: { row: 2, frames: 4, fps: 8, loop: true },
  attack: { row: 3, frames: 4, fps: 14, loop: false },
  fire: { row: 4, frames: 4, fps: 10, loop: false },
};
if (require.main === module) {
  const dir = path.join(__dirname, "../assets/sprites");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "phoenix-player.png"),
    png(buildPlayerAtlas()),
  );
  fs.writeFileSync(
    path.join(dir, "phoenix-player.json"),
    JSON.stringify(
      {
        frameWidth: 32,
        frameHeight: 32,
        columns: 4,
        rows: 5,
        origin: [16, 22],
        animations,
        source:
          "Extended from the existing hand-authored Phoenix Legend art; no concept sheet extraction.",
      },
      null,
      2,
    ) + "\n",
  );
  console.log("Built Phoenix player atlas: 128x160, 20 frames, 5 states.");
}
module.exports = { buildPlayerAtlas };
