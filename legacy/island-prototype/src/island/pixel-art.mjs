import "../engine/pixel-art.js";
export const PixelSurface = globalThis.TinyFarm.PixelSurface;
export function rng(seed) {
  let n = seed;
  return () => {
    n = (n * 1664525 + 1013904223) >>> 0;
    return n / 4294967296;
  };
}
export function ellipse(s, x, y, rx, ry, color) {
  for (let yy = Math.floor(y - ry); yy <= y + ry; yy++)
    for (let xx = Math.floor(x - rx); xx <= x + rx; xx++)
      if (((xx - x) / rx) ** 2 + ((yy - y) / ry) ** 2 <= 1)
        s.pixel(xx, yy, color);
}
export function tree(s, x, y, size, random) {
  const R = (a, b, w, h, c) =>
    s.rect(x + a * size, y + b * size, w * size, h * size, c);
  ellipse(s, x + 3, y + 2, 19 * size, 5 * size, "#4c7543");
  R(-4, -13, 9, 16, "#4d4932");
  R(-2, -14, 5, 15, "#85623e");
  R(0, -12, 2, 12, "#ad804c");
  R(-8, 1, 6, 2, "#6a5d37");
  R(4, 0, 5, 2, "#615638");
  for (const [dx, dy, rx, ry, c] of [
    [0, -24, 24, 17, "#315737"],
    [-12, -30, 17, 14, "#3d6939"],
    [12, -32, 17, 15, "#4d793c"],
    [0, -43, 19, 15, "#618f43"],
    [-5, -45, 12, 10, "#79a64b"],
  ]) {
    ellipse(s, x + dx * size, y + dy * size, rx * size, ry * size, c);
    for (let i = 0; i < 24; i++) {
      const a = (random() - 0.5) * rx * 1.4,
        b = (random() - 0.5) * ry * 1.1;
      R(
        dx + a,
        dy + b,
        2 + random() * 2,
        1.5,
        random() > 0.5 ? "#8fb15a" : "#668d43",
      );
    }
  }
  for (let i = 0; i < 9; i++) {
    const dx = (random() - 0.5) * 29;
    R(dx, -42 + random() * 13, 3, 1, "#a3ba60");
  }
}
export function rock(s, x, y, r) {
  s.poly(
    [
      [x - r, y],
      [x - r + 2, y - r * 0.7],
      [x - 2, y - r],
      [x + r - 2, y - r * 0.6],
      [x + r, y],
      [x + r - 2, y + 4],
      [x - r + 1, y + 4],
    ],
    "#61736b",
  );
  s.poly(
    [
      [x - r + 2, y - 2],
      [x - r + 4, y - r * 0.7],
      [x, y - r + 1],
      [x + r - 3, y - r * 0.6],
      [x + r - 2, y - 2],
    ],
    "#a5afa0",
  );
  s.line(x - r + 4, y - r * 0.6, x - 1, y - r + 2, "#d3d3b4");
  s.line(x, y - r + 2, x + 2, y - 2, "#7a8b7e");
  s.rect(x - r + 2, y + 2, r * 1.6, 2, "#485e57");
}
