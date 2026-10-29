/** Original hand-authored pixel tiles/objects. No painted source image or resampling. */
const fs = require("node:fs"),
  path = require("node:path"),
  zlib = require("node:zlib");
const root = path.resolve(__dirname, ".."),
  dir = path.join(root, "assets/tiles/dawn");
fs.mkdirSync(dir, { recursive: true });
const C = {
  ink: "#253f46",
  shadow: "#355851",
  greenDark: "#3c6750",
  green: "#638e52",
  grass: "#709b55",
  grassLight: "#8dab5e",
  leaf: "#4b8954",
  leafLight: "#80b65d",
  leafGold: "#a1c570",
  sand: "#dec68e",
  sandShade: "#c6ad77",
  sandLight: "#eed8a4",
  dirt: "#bca676",
  dirtDark: "#9c8c65",
  stoneDark: "#455f63",
  stone: "#7e9590",
  stoneLight: "#a8b7a6",
  stoneTop: "#c3cbb0",
  moss: "#597c60",
  deep: "#23667b",
  deepLight: "#2b7589",
  shallow: "#3a9ea5",
  waterLight: "#70c1b5",
  foam: "#c0dcd0",
  barkDark: "#594e43",
  bark: "#8b714d",
  barkLight: "#b29560",
  gold: "#e2bb73",
  white: "#f8e4b3",
  orange: "#d9834c",
  purple: "#b4a4cb",
  red: "#c77f82",
};
function rgba(hex) {
  return [
    ...hex
      .slice(1)
      .match(/../g)
      .map((v) => parseInt(v, 16)),
    255,
  ];
}
class Pixel {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.data = Buffer.alloc(w * h * 4);
  }
  p(x, y, color) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || !color) return;
    const v = rgba(C[color] || color);
    for (let i = 0; i < 4; i++) this.data[(y * this.w + x) * 4 + i] = v[i];
  }
  rect(x, y, w, h, c) {
    for (let j = y; j < y + h; j++)
      for (let i = x; i < x + w; i++) this.p(i, j, c);
  }
  line(x, y, x2, y2, c) {
    const n = Math.max(Math.abs(x2 - x), Math.abs(y2 - y));
    for (let i = 0; i <= n; i++)
      this.p(
        Math.round(x + ((x2 - x) * i) / Math.max(1, n)),
        Math.round(y + ((y2 - y) * i) / Math.max(1, n)),
        c,
      );
  }
  poly(points, c) {
    for (
      let y = Math.min(...points.map((p) => p[1]));
      y <= Math.max(...points.map((p) => p[1]));
      y++
    )
      for (
        let x = Math.min(...points.map((p) => p[0]));
        x <= Math.max(...points.map((p) => p[0]));
        x++
      ) {
        let hit = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++)
          if (
            points[i][1] > y !== points[j][1] > y &&
            x <
              ((points[j][0] - points[i][0]) * (y - points[i][1])) /
                (points[j][1] - points[i][1]) +
                points[i][0]
          )
            hit = !hit;
        if (hit) this.p(x, y, c);
      }
  }
  blit(src, x, y) {
    for (let j = 0; j < src.h; j++)
      for (let i = 0; i < src.w; i++) {
        const a = (j * src.w + i) * 4,
          b = ((j + y) * this.w + i + x) * 4;
        if (src.data[a + 3]) src.data.copy(this.data, b, a, a + 4);
      }
  }
}
let table;
function crc(buf) {
  table ??= Array.from({ length: 256 }, (_, n) => {
    for (let i = 0; i < 8; i++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
    return n >>> 0;
  });
  let n = 0xffffffff;
  for (const b of buf) n = table[(n ^ b) & 255] ^ (n >>> 8);
  return (n ^ 0xffffffff) >>> 0;
}
function png(image, file) {
  const chunk = (type, data) => {
    const t = Buffer.from(type),
      len = Buffer.alloc(4),
      c = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    c.writeUInt32BE(crc(Buffer.concat([t, data])));
    return Buffer.concat([len, t, data, c]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(image.w);
  header.writeUInt32BE(image.h, 4);
  header[8] = 8;
  header[9] = 6;
  const rows = [];
  for (let y = 0; y < image.h; y++)
    rows.push(
      Buffer.from([0]),
      image.data.subarray(y * image.w * 4, (y + 1) * image.w * 4),
    );
  fs.writeFileSync(
    file,
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("IDAT", zlib.deflateSync(Buffer.concat(rows))),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
}
const tiles = [],
  tilesMeta = {};
function tile(name, paint) {
  const p = new Pixel(32, 32);
  paint(p);
  tilesMeta[name] = { frame: tiles.length };
  tiles.push(p);
}
function flecks(p, c, v = 0) {
  for (const [i, [x, y]] of [
    [5, 6],
    [22, 17],
    [12, 25],
    [28, 5],
  ].entries()) {
    const a = (x + v * 7) % 30,
      b = (y + v * 3) % 30;
    p.rect(a, b, 2, 1, c);
    if (i % 2) p.p(a + 1, b - 1, c);
  }
}
function grass(p, v = 0) {
  p.rect(0, 0, 32, 32, "grass");
  for (const [x, y] of [
    [4, 7],
    [22, 19],
    [13, 28],
  ]) {
    const a = (x + v * 5) % 29,
      b = (y + v * 3) % 29;
    p.p(a, b, "green");
    p.p(a + 2, b + 1, "green");
    p.line(a + 1, b, a + 1, b - 2, "grassLight");
  }
  flecks(p, "green", v);
}
function sand(p, v = 0) {
  p.rect(0, 0, 32, 32, "sand");
  flecks(p, "sandShade", v);
  p.p((18 + v * 4) % 30, 10, "sandLight");
  p.rect(7, 23, 2, 1, "sandLight");
}
for (const kind of ["deep", "shallow"])
  for (let frame = 0; frame < 4; frame++)
    tile(kind + "_" + frame, (p) => {
      p.rect(0, 0, 32, 32, kind);
      for (const [x, y, len] of [
        [3, 7, 5],
        [19, 22, 4],
      ]) {
        const a = (x + frame * 2) % 26;
        p.rect(a, y, len, 1, kind === "deep" ? "deepLight" : "waterLight");
        p.p(a + len, y + 1, kind === "deep" ? "deepLight" : "waterLight");
      }
      if (kind === "shallow" && frame % 2 === 0)
        p.rect(12, 15, 2, 1, "shallow");
    });
for (let v = 0; v < 4; v++) tile("grass_" + v, (p) => grass(p, v));
for (let v = 0; v < 3; v++) tile("sand_" + v, (p) => sand(p, v));
// N/E/S/W bitmask: connected edge extends to cell boundary, open edge has 3px inset.
function shape(mask, x, y, inset) {
  const n = mask & 1,
    e = mask & 2,
    s = mask & 4,
    w = mask & 8;
  if (
    x < (w ? 0 : inset) ||
    x >= (e ? 32 : 32 - inset) ||
    y < (n ? 0 : inset) ||
    y >= (s ? 32 : 32 - inset)
  )
    return false;
  if (!n && !w && x + y < inset * 2 + 2) return false;
  if (!n && !e && 31 - x + y < inset * 2 + 2) return false;
  if (!s && !w && x + 31 - y < inset * 2 + 2) return false;
  if (!s && !e && 62 - x - y < inset * 2 + 2) return false;
  return true;
}
for (let mask = 0; mask < 16; mask++) {
  tile("shore_" + mask, (p) => {
    const texture = new Pixel(32, 32);
    sand(texture, mask % 3);
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        if (shape(mask, x, y, 3)) {
          const a = (y * 32 + x) * 4;
          texture.data.copy(p.data, a, a, a + 4);
          if (!shape(mask, x, y - 1, 3) || !shape(mask, x - 1, y, 3))
            p.p(x, y, "sandLight");
        } else if (shape(mask, x, y, 1))
          p.p(x, y, (x + y) % 5 ? "foam" : "waterLight");
      }
  });
  tile("grassEdge_" + mask, (p) => {
    const texture = new Pixel(32, 32);
    grass(texture, mask % 4);
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++)
        if (shape(mask, x, y, 2)) {
          const a = (y * 32 + x) * 4;
          texture.data.copy(p.data, a, a, a + 4);
          if (!shape(mask, x, y + 1, 2)) p.p(x, y, "greenDark");
        }
  });
  tile("path_" + mask, (p) => {
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        const core = x >= 6 && x < 26 && y >= 6 && y < 26,
          connected =
            (mask & 1 && x >= 6 && x < 26 && y < 16) ||
            (mask & 2 && y >= 6 && y < 26 && x >= 16) ||
            (mask & 4 && x >= 6 && x < 26 && y >= 16) ||
            (mask & 8 && y >= 6 && y < 26 && x < 16);
        const corners =
          (mask & 1 && mask & 2 && x >= 16 && y < 16) ||
          (mask & 2 && mask & 4 && x >= 16 && y >= 16) ||
          (mask & 4 && mask & 8 && x < 16 && y >= 16) ||
          (mask & 8 && mask & 1 && x < 16 && y < 16);
        if (core || connected || corners)
          p.p(x, y, (x * 7 + y * 11 + mask) % 137 === 0 ? "dirtDark" : "dirt");
      }
    p.rect(12, 18, 2, 1, "sandLight");
  });
}
for (let v = 0; v < 3; v++)
  tile("floor_" + v, (p) => {
    p.rect(0, 0, 32, 32, "stoneDark");
    for (const [i, [x, y, w, h]] of [
      [0, 0, 16, 12],
      [17, 0, 15, 12],
      [0, 13, 10, 19],
      [11, 13, 21, 10],
      [11, 24, 21, 8],
    ].entries()) {
      p.rect(x, y, w, h, "stone");
      p.line(x, y, x + w - 1, y, "stoneLight");
      p.line(x, y, x, y + h - 1, "stoneLight");
      p.line(x + w - 1, y + 1, x + w - 1, y + h - 1, "shadow");
      if ((i + v) % 3 === 0) {
        p.line(x + 4, y + 2, x + 7, y + 4, "stoneDark");
        p.line(x + 7, y + 4, x + 6, y + 7, "stoneDark");
      }
    }
  });
for (let v = 0; v < 2; v++)
  tile("moss_" + v, (p) => {
    p.blit(tiles[tilesMeta["floor_" + v].frame], 0, 0);
    for (const [x, y] of [
      [1, 9],
      [14, 23],
      [25, 0],
      [27, 29],
    ]) {
      p.rect(x, y, 5, 2, "moss");
      p.rect(x + 1, y - 1, 2, 4, "greenDark");
      p.p(x + 4, y - 1, "green");
    }
  });
for (const kind of ["rim", "cliff", "cliffFoot"])
  tile(kind, (p) => {
    p.rect(0, 0, 32, 32, "#5a604f");
    p.poly(
      [
        [0, 3],
        [9, 1],
        [15, 7],
        [13, 26],
        [7, 31],
        [0, 29],
      ],
      kind === "cliffFoot" ? "#73745a" : "#9b8e69",
    );
    p.poly(
      [
        [15, 7],
        [23, 3],
        [32, 5],
        [32, 29],
        [24, 32],
        [16, 27],
      ],
      kind === "cliffFoot" ? "#656b53" : "#837f60",
    );
    p.line(1, 4, 8, 3, "#b4a274");
    p.line(17, 8, 23, 5, "#a99c73");
    p.line(9, 12, 6, 19, "#5a604f");
    p.line(6, 19, 9, 23, "#5a604f");
    p.line(25, 14, 27, 23, "#555e4f");
    if (kind !== "cliffFoot") {
      p.rect(0, 0, 32, 3, "greenDark");
      p.rect(0, 0, 32, 1, "grassLight");
      for (const x of [3, 13, 26]) {
        p.line(x, 2, x, 9, "moss");
        p.p(x + 1, 10, "green");
      }
    } else {
      p.rect(0, 29, 32, 3, "grass");
      p.rect(4, 26, 6, 3, "moss");
      p.rect(22, 28, 8, 2, "moss");
    }
  });
tile("stairs", (p) => {
  p.rect(0, 0, 32, 32, "stoneDark");
  for (let y = 0; y < 32; y += 8) {
    p.rect(0, y, 32, 5, "stone");
    p.line(0, y, 31, y, "stoneTop");
    p.line(0, y + 5, 31, y + 5, "stoneDark");
    p.rect(2, y + 1, 2, 3, "stoneLight");
  }
  p.p(5, 6, "moss");
  p.p(27, 22, "moss");
});
const terrain = new Pixel(256, Math.ceil(tiles.length / 8) * 32);
tiles.forEach((p, i) => terrain.blit(p, (i % 8) * 32, Math.floor(i / 8) * 32));
png(terrain, path.join(dir, "terrain.png"));
// Every prop is independently drawn at native pixel resolution in a safe 96px cell.
const objects = [],
  definitions = [];
function prop(id, paint, origin = [48, 88]) {
  const p = new Pixel(96, 96);
  paint(p);
  definitions.push({
    id,
    frame: objects.length,
    rect: [
      (objects.length % 4) * 96,
      Math.floor(objects.length / 4) * 96,
      96,
      96,
    ],
    origin,
  });
  objects.push(p);
}
function leaf(p, x, y, s = 1) {
  const outline = [
    [0, 7],
    [3, 3],
    [7, 3],
    [9, 0],
    [15, 1],
    [17, 4],
    [21, 5],
    [23, 10],
    [20, 15],
    [15, 17],
    [7, 16],
    [2, 13],
  ];
  const points = outline.map(([a, b]) => [x + a * s, y + b * s]);
  p.poly(points, "greenDark");
  p.poly(
    [
      [3, 7],
      [7, 4],
      [11, 2],
      [16, 4],
      [20, 7],
      [20, 11],
      [15, 14],
      [8, 13],
      [4, 11],
    ].map(([a, b]) => [x + a * s, y + b * s]),
    "leaf",
  );
  p.poly(
    [
      [5, 7],
      [9, 4],
      [14, 4],
      [17, 7],
      [13, 8],
      [10, 7],
      [7, 9],
    ].map(([a, b]) => [x + a * s, y + b * s]),
    "leafLight",
  );
  p.rect(x + 10 * s, y + 4 * s, 3 * s, 1 * s, "leafGold");
  for (const [a, b] of [
    [6, 10],
    [13, 11],
    [17, 8],
  ]) {
    p.rect(x + a * s, y + b * s, 2, 1, "leafLight");
    p.p(x + (a + 1) * s, y + (b + 1) * s, "greenDark");
  }
}
function trunk(p, x, y, h) {
  p.poly(
    [
      [x - 5, y],
      [x + 3, y],
      [x + 5, y + h - 3],
      [x + 9, y + h],
      [x - 9, y + h],
      [x - 4, y + h - 5],
    ],
    "barkDark",
  );
  p.rect(x - 2, y, 4, h, "bark");
  for (let a = 3; a < h; a += 7) {
    p.line(x - 3, y + a, x + 2, y + a + 1, "barkLight");
    p.p(x + 3, y + a + 2, "barkDark");
  }
}
prop("palm", (p) => {
  trunk(p, 48, 44, 43);
  p.poly(
    [
      [46, 49],
      [38, 35],
      [22, 32],
      [10, 36],
      [5, 43],
      [20, 38],
      [34, 40],
      [43, 51],
    ],
    "greenDark",
  );
  p.poly(
    [
      [47, 48],
      [38, 34],
      [19, 32],
      [8, 39],
      [22, 36],
      [36, 39],
    ],
    "leaf",
  );
  p.line(44, 45, 16, 35, "leafLight");
  for (let a = 0; a < 4; a++)
    p.line(19 + a * 5, 36 + a, 17 + a * 5, 40 + a, "leafLight");
  p.poly(
    [
      [45, 46],
      [28, 46],
      [16, 54],
      [10, 70],
      [20, 60],
      [35, 54],
      [47, 53],
    ],
    "greenDark",
  );
  p.poly(
    [
      [45, 47],
      [29, 46],
      [18, 55],
      [13, 65],
      [27, 55],
      [42, 51],
    ],
    "leaf",
  );
  p.line(43, 49, 19, 58, "leafLight");
  p.poly(
    [
      [48, 44],
      [56, 27],
      [73, 25],
      [88, 35],
      [92, 43],
      [78, 34],
      [63, 35],
      [52, 48],
    ],
    "greenDark",
  );
  p.poly(
    [
      [50, 44],
      [59, 30],
      [74, 29],
      [86, 36],
      [72, 32],
      [61, 35],
    ],
    "leafLight",
  );
  p.poly(
    [
      [49, 47],
      [65, 45],
      [79, 53],
      [86, 69],
      [77, 61],
      [64, 55],
      [51, 53],
    ],
    "greenDark",
  );
  p.poly(
    [
      [51, 48],
      [65, 47],
      [77, 55],
      [83, 64],
      [69, 55],
      [56, 52],
    ],
    "leaf",
  );
  p.line(55, 49, 76, 56, "leafLight");
  p.poly(
    [
      [46, 45],
      [39, 26],
      [44, 15],
      [51, 11],
      [54, 26],
      [51, 44],
    ],
    "greenDark",
  );
  p.poly(
    [
      [47, 39],
      [44, 25],
      [49, 16],
      [51, 27],
      [49, 41],
    ],
    "leafLight",
  );
  p.rect(43, 46, 6, 5, "barkDark");
  p.rect(50, 45, 5, 6, "bark");
  p.p(50, 45, "barkLight");
});
prop("broadleaf", (p) => {
  trunk(p, 48, 57, 30);
  for (const [x, y, s] of [
    [20, 44, 1.5],
    [39, 42, 1.5],
    [53, 40, 1.3],
    [12, 29, 1.5],
    [36, 25, 1.6],
    [56, 27, 1.3],
    [25, 14, 1.5],
    [44, 12, 1.4],
  ])
    leaf(p, x, y, s);
  p.line(45, 76, 41, 69, "barkLight");
});
function rock(p, x, y, w, h) {
  p.poly(
    [
      [x, y + h],
      [x - 3, y + 7],
      [x + 3, y],
      [x + w - 8, y - 3],
      [x + w, y + 4],
      [x + w + 2, y + h - 4],
      [x + w - 5, y + h + 2],
    ],
    "stoneDark",
  );
  p.poly(
    [
      [x, y + 6],
      [x + 5, y + 1],
      [x + w - 9, y - 1],
      [x + w - 2, y + 5],
      [x + w - 5, y + h - 3],
      [x + 3, y + h - 2],
    ],
    "stone",
  );
  p.poly(
    [
      [x + 2, y + 6],
      [x + 7, y + 1],
      [x + w - 10, y],
      [x + w - 4, y + 5],
      [x + w - 9, y + 8],
      [x + 8, y + 9],
    ],
    "stoneLight",
  );
  p.line(x + 10, y + 9, x + 13, y + h - 3, "stoneDark");
  p.rect(x + 2, y + h - 2, 7, 2, "moss");
}
prop("boulder", (p) => {
  rock(p, 31, 67, 30, 18);
  rock(p, 55, 79, 10, 7);
});
prop("bush", (p) => {
  leaf(p, 28, 66, 1.2);
  leaf(p, 44, 62, 1.4);
});
prop("flowers", (p) => {
  for (const [x, y, c] of [
    [36, 82, "red"],
    [48, 76, "white"],
    [58, 83, "purple"],
  ]) {
    p.line(x, y, x, y - 8, "greenDark");
    p.p(x - 2, y - 3, "leaf");
    p.rect(x - 2, y - 9, 5, 3, c);
    p.rect(x - 1, y - 10, 3, 5, c);
    p.p(x, y - 8, "gold");
  }
});
function column(p, broken = false) {
  p.rect(33, 80, 30, 7, "stoneDark");
  p.rect(35, 78, 26, 6, "stoneLight");
  p.rect(39, broken ? 58 : 35, 18, 43 - (broken ? 23 : 0), "stone");
  p.rect(40, broken ? 59 : 36, 3, 40 - (broken ? 23 : 0), "stoneLight");
  p.rect(53, broken ? 59 : 36, 3, 40 - (broken ? 23 : 0), "stoneDark");
  p.line(47, broken ? 60 : 41, 44, broken ? 66 : 50, "stoneDark");
  p.line(44, broken ? 66 : 50, 49, broken ? 70 : 55, "stoneDark");
  p.rect(37, broken ? 55 : 30, 22, 6, "stoneDark");
  p.rect(35, broken ? 52 : 27, 26, 5, "stoneLight");
  p.rect(39, 75, 8, 3, "moss");
  if (broken) {
    p.rect(38, 50, 6, 3, "stone");
    p.rect(48, 48, 7, 5, "stone");
    rock(p, 61, 81, 9, 5);
  } else {
    p.rect(40, 31, 3, 2, "moss");
    p.rect(49, 29, 7, 3, "moss");
    p.line(49, 35, 49, 41, "moss");
  }
}
prop("pillar", (p) => column(p));
prop("brokenPillar", (p) => column(p, true));
prop("fragment", (p) => {
  rock(p, 33, 77, 24, 10);
  p.line(40, 78, 48, 82, "stoneTop");
  p.line(48, 82, 52, 77, "stoneTop");
});
prop("altar", (p) => {
  p.rect(13, 78, 70, 10, "stoneDark");
  p.rect(16, 75, 64, 10, "stone");
  p.line(17, 75, 78, 75, "stoneTop");
  p.rect(22, 68, 52, 8, "stoneDark");
  p.rect(25, 64, 46, 8, "stoneLight");
  p.rect(30, 50, 36, 15, "stone");
  p.line(30, 50, 65, 50, "stoneTop");
  p.rect(34, 45, 28, 8, "stoneDark");
  p.rect(36, 43, 24, 5, "stoneTop");
  p.line(36, 56, 47, 64, "gold");
  p.line(59, 56, 48, 64, "gold");
  p.line(47, 54, 47, 65, "gold");
  p.rect(37, 70, 8, 2, "moss");
  p.rect(65, 77, 11, 2, "moss");
  p.poly(
    [
      [41, 42],
      [37, 35],
      [42, 30],
      [43, 20],
      [49, 27],
      [51, 16],
      [57, 29],
      [57, 35],
      [53, 42],
    ],
    "orange",
  );
  p.poly(
    [
      [44, 40],
      [43, 33],
      [48, 28],
      [50, 23],
      [53, 34],
      [51, 41],
    ],
    "gold",
  );
  p.rect(47, 33, 3, 8, "white");
});
prop("brazier", (p) => {
  p.rect(42, 75, 12, 12, "stoneDark");
  p.rect(43, 73, 10, 11, "stone");
  p.rect(37, 68, 22, 6, "stoneDark");
  p.rect(39, 67, 18, 4, "gold");
  p.poly(
    [
      [42, 66],
      [40, 59],
      [44, 55],
      [47, 44],
      [50, 53],
      [55, 57],
      [54, 64],
    ],
    "orange",
  );
  p.poly(
    [
      [45, 65],
      [44, 59],
      [48, 53],
      [51, 59],
      [50, 65],
    ],
    "gold",
  );
  p.rect(47, 59, 2, 6, "white");
});
prop("shell", (p) => {
  p.poly(
    [
      [40, 84],
      [39, 80],
      [42, 76],
      [48, 74],
      [54, 77],
      [56, 82],
      [52, 86],
      [43, 86],
    ],
    "sandShade",
  );
  p.poly(
    [
      [41, 81],
      [44, 77],
      [48, 76],
      [52, 78],
      [54, 82],
      [49, 84],
      [43, 84],
    ],
    "white",
  );
  p.line(43, 79, 47, 83, "orange");
  p.line(49, 78, 49, 82, "sandShade");
});
prop("log", (p) => {
  p.poly(
    [
      [25, 76],
      [30, 67],
      [66, 73],
      [71, 84],
      [65, 88],
      [28, 84],
    ],
    "barkDark",
  );
  p.rect(30, 72, 34, 9, "bark");
  p.line(33, 74, 61, 78, "barkLight");
  p.line(33, 80, 62, 82, "barkDark");
  p.poly(
    [
      [64, 73],
      [70, 77],
      [71, 83],
      [65, 86],
      [61, 81],
    ],
    "barkLight",
  );
  p.line(65, 77, 67, 82, "barkDark");
  p.rect(35, 72, 10, 2, "moss");
});
prop("bramble", (p) => {
  leaf(p, 29, 69, 1.1);
  leaf(p, 45, 67, 1.2);
  for (const [x, y] of [
    [35, 75],
    [48, 70],
    [60, 76],
  ]) {
    p.line(x, y + 7, x + 2, y - 4, "purple");
    p.line(x + 1, y + 1, x - 3, y - 3, "purple");
    p.p(x + 2, y - 5, "white");
  }
});
const props = new Pixel(384, Math.ceil(objects.length / 4) * 96);
objects.forEach((p, i) => props.blit(p, (i % 4) * 96, Math.floor(i / 4) * 96));
png(props, path.join(dir, "objects.png"));
const old = JSON.parse(
  fs.readFileSync(path.join(root, "assets/production/manifest.json")),
);
const manifest = {
  version: 2,
  environment: {
    kind: "tilemap",
    tileSize: 32,
    tiles: "assets/tiles/dawn/terrain.png",
    props: "assets/tiles/dawn/objects.png",
    columns: 8,
    tilesSize: [terrain.w, terrain.h],
    tileDefinitions: tilesMeta,
    definitions,
    origin: [48, 88],
    palette: [
      ...new Set(
        [terrain, props].flatMap((image) => {
          const colors = new Set();
          for (let i = 0; i < image.data.length; i += 4)
            if (image.data[i + 3])
              colors.add("#" + image.data.subarray(i, i + 3).toString("hex"));
          return [...colors];
        }),
      ),
    ],
  },
  phoenix: old.phoenix,
};
manifest.environment.tiles = "assets/tiles/dawn/terrain.png";
fs.writeFileSync(
  path.join(dir, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Built ${tiles.length} original 32px tiles and ${objects.length} native pixel props.`,
);
