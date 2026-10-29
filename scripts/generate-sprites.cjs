/* Rebuild authored production PNGs with Node.js alone. */
const fs = require("node:fs"),
  zlib = require("node:zlib"),
  path = require("node:path");
const Surface = require("../src/engine/pixel-art.js");
const { buildAtlas } = require("../src/pets/phoenix-art.js");
function crc32(b) {
  let crc = 0xffffffff;
  for (const v of b) {
    crc ^= v;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type),
    body = Buffer.concat([t, data]),
    n = Buffer.alloc(4),
    crc = Buffer.alloc(4);
  n.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([n, body, crc]);
}
function png(s) {
  const head = Buffer.alloc(13);
  head.writeUInt32BE(s.width, 0);
  head.writeUInt32BE(s.height, 4);
  head[8] = 8;
  head[9] = 6;
  const rows = [];
  for (let y = 0; y < s.height; y++)
    rows.push(
      Buffer.from([0]),
      Buffer.from(s.data.slice(y * s.width * 4, (y + 1) * s.width * 4)),
    );
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", head),
    chunk("IDAT", zlib.deflateSync(Buffer.concat(rows))),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
const names = [
  "hand",
  "hoe",
  "seed",
  "water",
  "rod",
  "fruit",
  "wood",
  "home",
  "bag",
  "heart",
  "book",
  "star",
  "gear",
  "exit",
  "save",
  "sun",
  "moon",
  "rain",
  "radish",
  "carrot",
  "pumpkin",
  "fish",
  "audio",
  "expand",
  "leaf",
];
const atlas = new Surface(names.length * 16, 16);
const D = "#4b3028",
  B = "#a57847",
  C = "#e6bd77",
  L = "#fff0b7",
  G = "#638448",
  GL = "#a6b660",
  BLUE = "#719b9a",
  R = "#c36147";
for (let i = 0; i < names.length; i++) {
  const name = names[i],
    ox = i * 16;
  const r = (x, y, w, h, c) => atlas.rect(ox + x, y, w, h, c),
    p = (pts, c) =>
      atlas.poly(
        pts.map(([x, y]) => [ox + x, y]),
        c,
      ),
    l = (x, y, a, b, c) => atlas.line(ox + x, y, ox + a, b, c);
  if (name === "hoe") {
    l(3, 14, 11, 4, D);
    l(4, 14, 12, 4, B);
    p(
      [
        [6, 2],
        [10, 1],
        [15, 6],
        [13, 9],
      ],
      D,
    );
    p(
      [
        [8, 3],
        [10, 2],
        [14, 6],
        [13, 7],
      ],
      "#9b9b83",
    );
  } else if (name === "water") {
    r(3, 6, 8, 8, D);
    r(4, 7, 6, 5, BLUE);
    r(5, 8, 1, 4, "#acc5af");
    r(4, 2, 5, 1, D);
    r(3, 3, 1, 4, D);
    r(9, 3, 1, 4, D);
    p(
      [
        [10, 8],
        [14, 4],
        [15, 6],
        [11, 12],
      ],
      D,
    );
    p(
      [
        [11, 8],
        [14, 6],
        [14, 7],
        [11, 10],
      ],
      BLUE,
    );
  } else if (name === "seed" || name === "leaf") {
    l(8, 14, 8, 4, D);
    p(
      [
        [8, 8],
        [2, 7],
        [2, 3],
        [5, 3],
        [8, 6],
      ],
      D,
    );
    p(
      [
        [8, 6],
        [10, 1],
        [14, 1],
        [14, 5],
        [11, 7],
      ],
      D,
    );
    p(
      [
        [7, 7],
        [3, 5],
        [3, 4],
        [6, 5],
      ],
      GL,
    );
    p(
      [
        [9, 5],
        [11, 2],
        [13, 2],
        [12, 5],
      ],
      G,
    );
    l(3, 14, 13, 14, B);
  } else if (name === "rod") {
    l(2, 14, 11, 2, D);
    l(3, 14, 11, 3, B);
    l(11, 2, 14, 6, L);
    l(14, 6, 14, 12, L);
    r(13, 12, 2, 2, R);
  } else if (name === "hand") {
    p(
      [
        [4, 8],
        [4, 3],
        [6, 3],
        [6, 1],
        [8, 1],
        [8, 2],
        [10, 2],
        [10, 4],
        [12, 4],
        [12, 9],
        [10, 14],
        [6, 14],
        [2, 10],
        [2, 7],
      ],
      D,
    );
    p(
      [
        [5, 8],
        [5, 4],
        [6, 4],
        [7, 2],
        [7, 9],
        [9, 3],
        [9, 9],
        [11, 5],
        [11, 10],
        [9, 13],
        [6, 13],
        [3, 9],
        [3, 8],
      ],
      C,
    );
  } else if (name === "fruit" || name === "radish") {
    p(
      [
        [8, 5],
        [4, 4],
        [2, 6],
        [2, 11],
        [5, 14],
        [8, 13],
        [11, 14],
        [14, 10],
        [14, 6],
        [11, 4],
      ],
      D,
    );
    p(
      [
        [8, 6],
        [4, 5],
        [3, 7],
        [3, 10],
        [6, 13],
        [8, 12],
        [11, 13],
        [13, 10],
        [13, 7],
        [11, 5],
      ],
      name === "radish" ? "#db91a0" : R,
    );
    r(4, 6, 2, 2, L);
    l(8, 5, 9, 1, D);
    l(10, 2, 13, 2, G);
  } else if (name === "carrot") {
    p(
      [
        [4, 5],
        [12, 5],
        [7, 15],
      ],
      D,
    );
    p(
      [
        [5, 6],
        [11, 6],
        [7, 13],
      ],
      "#e49b4b",
    );
    l(7, 5, 5, 1, G);
    l(8, 5, 11, 1, GL);
    l(5, 8, 8, 8, B);
  } else if (name === "pumpkin") {
    p(
      [
        [7, 4],
        [4, 3],
        [1, 6],
        [1, 11],
        [4, 14],
        [11, 14],
        [14, 11],
        [14, 6],
        [11, 3],
      ],
      D,
    );
    r(3, 5, 9, 7, "#d88b3e");
    l(7, 4, 7, 13, B);
    r(5, 5, 1, 7, C);
    l(8, 4, 9, 1, G);
  } else if (name === "wood") {
    p(
      [
        [1, 8],
        [10, 2],
        [14, 4],
        [15, 10],
        [5, 15],
        [1, 13],
      ],
      D,
    );
    p(
      [
        [2, 8],
        [10, 3],
        [13, 5],
        [14, 9],
        [5, 13],
        [2, 12],
      ],
      B,
    );
    p(
      [
        [2, 9],
        [5, 7],
        [7, 9],
        [7, 12],
        [4, 14],
        [2, 12],
      ],
      C,
    );
    r(4, 9, 1, 3, B);
    l(8, 6, 12, 4, D);
  } else if (name === "home") {
    p(
      [
        [1, 8],
        [7, 1],
        [15, 8],
      ],
      D,
    );
    p(
      [
        [3, 7],
        [7, 3],
        [13, 7],
      ],
      R,
    );
    r(3, 8, 10, 7, D);
    r(4, 8, 8, 6, C);
    r(7, 10, 3, 5, B);
    r(4, 9, 2, 3, BLUE);
  } else if (name === "bag") {
    r(3, 5, 10, 10, D);
    r(4, 6, 8, 8, B);
    r(5, 2, 6, 1, D);
    r(4, 3, 1, 3, D);
    r(11, 3, 1, 3, D);
    r(5, 7, 6, 1, C);
    r(7, 10, 2, 2, L);
  } else if (name === "heart") {
    p(
      [
        [8, 4],
        [5, 1],
        [2, 2],
        [1, 6],
        [8, 14],
        [15, 6],
        [14, 2],
        [11, 1],
      ],
      D,
    );
    p(
      [
        [8, 6],
        [5, 3],
        [3, 3],
        [3, 6],
        [8, 12],
        [13, 6],
        [13, 3],
        [11, 3],
      ],
      R,
    );
    r(4, 4, 2, 1, "#f0af8b");
  } else if (name === "star" || name === "sun") {
    p(
      [
        [8, 0],
        [10, 5],
        [15, 7],
        [10, 10],
        [8, 15],
        [5, 10],
        [0, 7],
        [5, 5],
      ],
      D,
    );
    p(
      [
        [8, 2],
        [9, 6],
        [13, 7],
        [9, 9],
        [8, 13],
        [6, 9],
        [2, 7],
        [6, 6],
      ],
      C,
    );
    r(7, 6, 2, 3, L);
  } else if (name === "moon") {
    p(
      [
        [10, 1],
        [5, 1],
        [1, 5],
        [1, 11],
        [5, 15],
        [11, 14],
        [14, 11],
        [8, 11],
        [5, 7],
        [6, 3],
      ],
      D,
    );
    p(
      [
        [7, 2],
        [3, 5],
        [3, 10],
        [6, 13],
        [11, 12],
        [7, 11],
        [4, 7],
        [5, 3],
      ],
      C,
    );
  } else if (name === "rain") {
    r(2, 4, 12, 5, BLUE);
    r(5, 2, 5, 2, BLUE);
    l(4, 11, 2, 14, BLUE);
    l(9, 11, 7, 14, BLUE);
    l(14, 11, 12, 14, BLUE);
  } else if (name === "book") {
    r(1, 2, 14, 12, D);
    r(2, 3, 5, 10, C);
    r(9, 3, 5, 10, C);
    l(8, 2, 8, 14, B);
    l(3, 5, 5, 5, B);
    l(10, 7, 12, 7, B);
  } else if (name === "fish") {
    p(
      [
        [3, 8],
        [8, 3],
        [12, 4],
        [15, 8],
        [12, 12],
        [8, 13],
        [3, 9],
        [0, 13],
        [0, 4],
      ],
      D,
    );
    p(
      [
        [4, 8],
        [8, 5],
        [11, 5],
        [13, 8],
        [11, 10],
        [8, 11],
      ],
      BLUE,
    );
    r(11, 7, 1, 1, L);
  } else if (name === "gear") {
    r(5, 1, 5, 14, D);
    r(1, 5, 14, 5, D);
    r(3, 3, 10, 10, B);
    r(6, 6, 4, 4, D);
    r(7, 7, 2, 2, C);
  } else if (name === "save") {
    r(2, 1, 12, 14, D);
    r(3, 2, 10, 12, BLUE);
    r(5, 2, 5, 5, C);
    r(5, 10, 6, 4, L);
    r(8, 2, 1, 3, D);
  } else if (name === "exit") {
    r(2, 1, 8, 14, D);
    r(3, 2, 6, 12, B);
    l(8, 8, 15, 8, L);
    p(
      [
        [11, 4],
        [15, 8],
        [11, 12],
      ],
      L,
    );
  } else if (name === "audio") {
    p(
      [
        [1, 6],
        [5, 6],
        [10, 2],
        [10, 14],
        [5, 10],
        [1, 10],
      ],
      D,
    );
    p(
      [
        [2, 7],
        [5, 7],
        [9, 4],
        [9, 12],
        [5, 9],
        [2, 9],
      ],
      C,
    );
    l(12, 4, 14, 6, C);
    l(14, 6, 14, 10, C);
    l(14, 10, 12, 12, C);
  } else if (name === "expand") {
    for (const [x, y, sx, sy] of [
      [1, 1, 1, 1],
      [14, 1, -1, 1],
      [1, 14, 1, -1],
      [14, 14, -1, -1],
    ]) {
      l(x, y, x + sx * 4, y, D);
      l(x, y, x, y + sy * 4, D);
    }
  }
}
fs.mkdirSync(path.join(__dirname, "../assets/sprites"), { recursive: true });
fs.writeFileSync(
  path.join(__dirname, "../assets/sprites/phoenix-legend.png"),
  png(buildAtlas()),
);
for (const form of [1, 2])
  fs.writeFileSync(
    path.join(__dirname, "../assets/sprites/phoenix-" + form + ".png"),
    png(buildAtlas(form)),
  );
fs.writeFileSync(
  path.join(__dirname, "../assets/sprites/ui-icons.png"),
  png(atlas),
);
const meta = {
  frameWidth: 32,
  frameHeight: 32,
  columns: 4,
  rows: 3,
  origin: [16, 22],
  animations: {
    idle: { row: 0, frames: 4, fps: 4 },
    fly: { row: 1, frames: 4, fps: 8 },
    flare: { row: 2, frames: 4, fps: 8 },
  },
  source:
    "Hand-authored pixel polygons in src/pets/phoenix-art.js; original art, not cropped from reference.",
};
fs.writeFileSync(
  path.join(__dirname, "../assets/sprites/phoenix-legend.json"),
  JSON.stringify(meta, null, 2) + "\n",
);
console.log(
  "Built phoenix atlas 128x96 (12 frames, real alpha) and UI icon atlas " +
    atlas.width +
    "x16.",
);
