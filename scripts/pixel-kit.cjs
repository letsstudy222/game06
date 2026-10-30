const fs = require("node:fs"),
  zlib = require("node:zlib");
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
  constructor(w, h, palette = {}) {
    this.palette = palette;
    this.w = w;
    this.h = h;
    this.data = Buffer.alloc(w * h * 4);
  }
  p(x, y, color) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || !color) return;
    const v = rgba(this.palette[color] || color);
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

module.exports = { Pixel, png };
