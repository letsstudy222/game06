const fs = require("node:fs"),
  zlib = require("node:zlib");
exports.decode = (file) => {
  const b = fs.readFileSync(file);
  if (
    b.subarray(1, 4).toString() !== "PNG" ||
    b[24] !== 8 ||
    b[25] !== 6 ||
    b[28] !== 0
  )
    throw new Error("Expected non-interlaced RGBA8 PNG");
  const width = b.readUInt32BE(16),
    height = b.readUInt32BE(20);
  let pos = 8,
    parts = [];
  while (pos < b.length) {
    const n = b.readUInt32BE(pos),
      t = b.subarray(pos + 4, pos + 8).toString();
    if (t === "IDAT") parts.push(b.subarray(pos + 8, pos + 8 + n));
    pos += n + 12;
  }
  const raw = zlib.inflateSync(Buffer.concat(parts)),
    data = Buffer.alloc(width * height * 4),
    stride = width * 4;
  let at = 0;
  const paeth = (a, b, c) => {
    const p = a + b - c,
      pa = Math.abs(p - a),
      pb = Math.abs(p - b),
      pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = raw[at++];
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x,
        a = x >= 4 ? data[i - 4] : 0,
        b = y ? data[i - stride] : 0,
        c = y && x >= 4 ? data[i - stride - 4] : 0;
      const predict =
        filter === 0
          ? 0
          : filter === 1
            ? a
            : filter === 2
              ? b
              : filter === 3
                ? Math.floor((a + b) / 2)
                : filter === 4
                  ? paeth(a, b, c)
                  : NaN;
      if (!Number.isFinite(predict)) throw new Error("Bad PNG filter");
      data[i] = (raw[at++] + predict) & 255;
    }
  }
  return { width, height, data };
};
