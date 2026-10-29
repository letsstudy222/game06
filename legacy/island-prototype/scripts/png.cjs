const zlib = require("node:zlib");
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

module.exports = { png };
