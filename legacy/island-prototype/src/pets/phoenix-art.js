/* Hand-authored production art; no concept-image extraction. 32px cells, real alpha. */
(function (root) {
  "use strict";
  const Surface =
    typeof module !== "undefined" && module.exports
      ? require("../engine/pixel-art.js")
      : root.TinyFarm.PixelSurface;
  function buildAtlas(form = 3) {
    const out = new Surface(128, 96),
      D = "#35242b",
      R = form === 1 ? "#ab3f32" : form === 2 ? "#732c36" : "#982d3d",
      RED = "#d75239",
      G = "#dba548",
      Y = "#f6cd69",
      I = form === 1 ? "#f0ad4b" : form === 2 ? "#c7473d" : "#fff0bc",
      L = form === 1 ? "#ffda82" : form === 2 ? "#e48c56" : "#fff9df";
    for (let row = 0; row < 3; row++)
      for (let frame = 0; frame < 4; frame++) {
        const ox = frame * 32,
          oy = row * 32;
        out.clip = { x: ox, y: oy, width: 32, height: 32 };
        const P = (points, color) =>
            out.poly(
              points.map(([x, y]) => [x + ox, y + oy]),
              color,
            ),
          A = (x, y, w, h, col) => out.rect(x + ox, y + oy, w, h, col);
        const sway = [0, 1, 0, -1][frame],
          lift = row === 1 ? [0, 3, 1, -2][frame] : [0, 1, 0, -1][frame];
        // Long wine-red tail, ivory-gold vanes.
        for (let k = 0; k < 3; k++) {
          const tx = 5 + k * 5 + sway,
            ty = 29 - Math.abs(k - 1);
          P(
            [
              [14 + k, 19],
              [tx - 2, ty - 3],
              [tx - 4, ty + 1],
              [tx + 1, ty],
              [18 + k, 20],
            ],
            D,
          );
          P(
            [
              [15 + k, 20],
              [tx, ty - 3],
              [tx - 2, ty - 1],
              [tx + 1, ty - 2],
              [18 + k, 20],
            ],
            R,
          );
          out.line(15 + k + ox, 21 + oy, tx - 1 + ox, ty - 1 + oy, G);
        }
        for (const side of [-1, 1]) {
          const mirror = (p) => p.map(([x, y]) => [16 + (x - 16) * side, y]);
          for (let k = 3; k >= 0; k--) {
            const tipX = 2 + k * 2,
              tipY = 3 + k * 4 - lift;
            P(
              mirror([
                [15, 18],
                [tipX, tipY + 6],
                [tipX - 1, tipY - 2],
                [tipX + 4, tipY + 2],
                [18, 15],
              ]),
              D,
            );
            P(
              mirror([
                [15, 17],
                [tipX + 1, tipY + 5],
                [tipX, tipY],
                [tipX + 4, tipY + 4],
                [17, 15],
              ]),
              R,
            );
            P(
              mirror([
                [15, 16],
                [tipX + 3, tipY + 4],
                [tipX + 1, tipY + 1],
                [tipX + 5, tipY + 5],
                [17, 15],
              ]),
              G,
            );
            P(
              mirror([
                [16, 16],
                [tipX + 5, tipY + 6],
                [tipX + 3, tipY + 2],
                [tipX + 6, tipY + 6],
                [17, 15],
              ]),
              I,
            );
          }
          P(
            mirror([
              [15, 12],
              [11, 13],
              [8, 17],
              [14, 19],
              [18, 15],
            ]),
            G,
          );
          P(
            mirror([
              [15, 13],
              [12, 14],
              [10, 17],
              [15, 17],
            ]),
            L,
          );
        }
        P(
          [
            [15, 12],
            [20, 12],
            [22, 16],
            [20, 22],
            [16, 24],
            [12, 21],
            [12, 17],
          ],
          D,
        );
        P(
          [
            [15, 13],
            [19, 13],
            [20, 17],
            [18, 22],
            [15, 22],
            [13, 19],
          ],
          G,
        );
        P(
          [
            [16, 12],
            [19, 14],
            [18, 20],
            [15, 21],
            [14, 18],
          ],
          I,
        );
        A(15, 15, 2, 4, L);
        P(
          [
            [17, 10],
            [12, 5],
            [10, 0],
            [17, 5],
            [17, 1],
            [21, 4],
            [22, 8],
          ],
          D,
        );
        P(
          [
            [18, 10],
            [14, 5],
            [13, 3],
            [18, 6],
            [18, 3],
            [20, 5],
            [21, 8],
          ],
          RED,
        );
        P(
          [
            [18, 9],
            [16, 5],
            [18, 7],
            [20, 5],
            [20, 9],
          ],
          Y,
        );
        P(
          [
            [18, 8],
            [23, 8],
            [25, 11],
            [23, 15],
            [18, 14],
            [16, 12],
          ],
          D,
        );
        P(
          [
            [19, 9],
            [23, 9],
            [24, 11],
            [22, 14],
            [19, 13],
            [17, 12],
          ],
          I,
        );
        A(20, 9, 3, 1, L);
        A(22, 10, 2, 2, D);
        A(22, 10, 1, 1, RED);
        P(
          [
            [24, 11],
            [28, 13],
            [25, 15],
            [25, 13],
            [23, 13],
          ],
          D,
        );
        P(
          [
            [24, 12],
            [27, 13],
            [25, 13],
          ],
          Y,
        );
        A(16, 23, 1, 3, G);
        A(20, 22, 1, 3, G);
        A(15, 25, 3, 1, D);
        A(19, 24, 3, 1, D);
        if (row === 2) {
          for (let i = 0; i < 5; i++) {
            const x = (frame * 5 + i * 7) % 31,
              y = (frame * 3 + i * 5) % 27;
            A(x, y, 1, 2, Y);
            A(x - 1, y + 1, 3, 1, Y);
          }
        }
      }
    delete out.clip;
    return out;
  }
  const api = { buildAtlas };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  (root.TinyFarm = root.TinyFarm || {}).PhoenixArt = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
