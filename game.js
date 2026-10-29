"use strict";
const canvas = document.querySelector("#garden"),
  ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.scale(3, 3);
const gardenArt = new Image();
gardenArt.src = "assets/garden-detailed.png?v=3";
const W = 480,
  H = 320,
  landscape = document.createElement("canvas");
landscape.width = W;
landscape.height = H;
const g = landscape.getContext("2d");
let seed = 417;
function rand() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
function rect(c, x, y, w, h, col) {
  c.fillStyle = col;
  c.fillRect(Math.round(x), Math.round(y), w, h);
}
function poly(c, points, col) {
  c.fillStyle = col;
  c.beginPath();
  points.forEach(([x, y], i) =>
    i
      ? c.lineTo(Math.round(x), Math.round(y))
      : c.moveTo(Math.round(x), Math.round(y)),
  );
  c.closePath();
  c.fill();
}
function tree(x, y, s = 1) {
  g.save();
  g.translate(x, y);
  g.scale(s, s);
  rect(g, -3, -8, 7, 24, "#66523a");
  rect(g, 1, -5, 3, 21, "#8d6c43");
  for (const [dx, dy, r, color] of [
    [0, -26, 21, "#354d36"],
    [-12, -29, 15, "#41603c"],
    [13, -32, 16, "#496b3d"],
    [0, -43, 19, "#537843"],
    [-4, -48, 12, "#658747"],
  ]) {
    poly(
      g,
      [
        [dx - r, dy + 8],
        [dx - r, dy - 5],
        [dx - 8, dy - 5],
        [dx - 8, dy - r],
        [dx + 7, dy - r],
        [dx + 7, dy - 10],
        [dx + r, dy - 10],
        [dx + r, dy + 8],
        [dx + 9, dy + 8],
        [dx + 9, dy + 15],
        [dx - 9, dy + 15],
        [dx - 9, dy + 8],
      ],
      color,
    );
  }
  for (let i = 0; i < 13; i++)
    rect(g, -15 + rand() * 30, -55 + rand() * 28, 3, 2, "#8da15a");
  g.restore();
}
function fence(x, y, n) {
  rect(g, x, y + 3, n * 14, 3, "#765637");
  rect(g, x, y + 9, n * 14, 3, "#b28a50");
  for (let i = 0; i <= n; i++) {
    rect(g, x + i * 14, y, 4, 19, "#5d5034");
    rect(g, x + i * 14, y, 3, 15, "#c9a268");
    rect(g, x + i * 14, y, 3, 2, "#e4c38a");
  }
}
function flower(x, y, col) {
  rect(g, x, y, 1, 4, "#496b3c");
  rect(g, x - 1, y - 2, 3, 3, col);
  rect(g, x, y - 1, 1, 1, "#f5dfa0");
}
function buildGarden() {
  rect(g, 0, 0, W, H, "#8aab60");
  for (let i = 0; i < 3400; i++) {
    const x = rand() * W,
      y = rand() * H;
    rect(
      g,
      x,
      y,
      rand() > 0.8 ? 3 : 1,
      1,
      ["#799b54", "#94b66a", "#a1ba70", "#85a25a"][i % 4],
    );
  }
  // Winding sandstone paths.
  poly(
    g,
    [
      [204, 77],
      [235, 77],
      [235, 146],
      [316, 146],
      [316, 172],
      [235, 172],
      [235, 320],
      [204, 320],
      [204, 174],
      [98, 174],
      [98, 148],
      [204, 148],
    ],
    "#c6ac76",
  );
  poly(
    g,
    [
      [209, 77],
      [231, 77],
      [231, 151],
      [312, 151],
      [312, 167],
      [230, 167],
      [230, 320],
      [209, 320],
      [209, 168],
      [100, 168],
      [100, 152],
      [209, 152],
    ],
    "#d7be88",
  );
  for (let i = 0; i < 240; i++) {
    const x = rand() * W,
      y = rand() * H;
    if ((x > 210 && x < 230) || (y > 154 && y < 165 && x > 100 && x < 312))
      rect(g, x, y, 2, 1, "#bea372");
  }
  // Pond with stepped shoreline.
  poly(
    g,
    [
      [333, 188],
      [403, 188],
      [403, 198],
      [428, 198],
      [428, 212],
      [441, 212],
      [441, 255],
      [425, 255],
      [425, 268],
      [347, 268],
      [347, 258],
      [327, 258],
      [327, 241],
      [316, 241],
      [316, 211],
      [333, 211],
    ],
    "#667e4d",
  );
  poly(
    g,
    [
      [337, 192],
      [400, 192],
      [400, 202],
      [424, 202],
      [424, 215],
      [437, 215],
      [437, 251],
      [421, 251],
      [421, 264],
      [350, 264],
      [350, 254],
      [331, 254],
      [331, 237],
      [320, 237],
      [320, 215],
      [337, 215],
    ],
    "#ccb781",
  );
  poly(
    g,
    [
      [340, 197],
      [397, 197],
      [397, 207],
      [420, 207],
      [420, 219],
      [432, 219],
      [432, 247],
      [417, 247],
      [417, 259],
      [354, 259],
      [354, 249],
      [335, 249],
      [335, 233],
      [325, 233],
      [325, 220],
      [340, 220],
    ],
    "#55969a",
  );
  rect(g, 345, 210, 50, 2, "#85b9ae");
  rect(g, 365, 250, 37, 2, "#79b4ac");
  rect(g, 333, 227, 15, 1, "#a1c7b5");
  rect(g, 413, 230, 13, 1, "#a1c7b5");
  rect(g, 395, 219, 10, 4, "#6a934e");
  flower(399, 219, "#e4b3a0");
  rect(g, 348, 242, 9, 3, "#648e47");
  // Farm beds and crops.
  for (let row = 0; row < 2; row++)
    for (let col = 0; col < 4; col++) {
      let x = 91 + col * 22,
        y = 210 + row * 27;
      rect(g, x, y, 19, 22, "#6e533a");
      rect(g, x + 1, y, 17, 2, "#9c7748");
      for (let k = 0; k < 2; k++) {
        let xx = x + 5 + k * 8;
        rect(g, xx, y + 6, 2, 10, "#b28a58");
        rect(g, xx - 3, y + 7, 4, 3, "#517947");
        rect(g, xx + 1, y + 4, 4, 3, "#6d944c");
        rect(g, xx, y + 5, 2, 4, row ? "#ddab55" : "#d57553");
      }
    }
  fence(78, 197, 8);
  fence(78, 270, 8);
  fence(273, 113, 10);
  // Cottage: stone foundation, timber walls, shingled roof.
  rect(g, 101, 87, 83, 47, "#62513b");
  rect(g, 103, 84, 79, 45, "#d4b77c");
  for (let y = 89; y < 128; y += 7) rect(g, 104, y, 76, 1, "#b79560");
  rect(g, 103, 84, 5, 45, "#87603d");
  rect(g, 176, 84, 5, 45, "#87603d");
  rect(g, 99, 129, 87, 6, "#8a8b71");
  rect(g, 103, 130, 16, 2, "#acaa86");
  poly(
    g,
    [
      [88, 87],
      [99, 76],
      [104, 76],
      [104, 66],
      [115, 66],
      [115, 56],
      [169, 56],
      [169, 66],
      [180, 66],
      [180, 76],
      [189, 76],
      [196, 87],
    ],
    "#624d3a",
  );
  poly(
    g,
    [
      [94, 81],
      [108, 67],
      [119, 54],
      [165, 54],
      [177, 68],
      [190, 81],
    ],
    "#9f6347",
  );
  for (let y = 60; y < 82; y += 6) {
    let offset = (y - 54) * 1.1;
    rect(g, 119 - offset, y, 46 + offset * 2, 2, "#bb7b50");
    for (let x = 124 - offset; x < 163 + offset; x += 13)
      rect(g, x, y + 2, 1, 3, "#7d513d");
  }
  rect(g, 161, 44, 10, 22, "#8c795e");
  rect(g, 160, 43, 12, 4, "#b6a17c");
  rect(g, 135, 105, 17, 24, "#6d5038");
  rect(g, 137, 107, 13, 22, "#86603b");
  rect(g, 146, 117, 2, 2, "#e6c56e");
  for (const x of [112, 158]) {
    rect(g, x, 97, 15, 17, "#72553a");
    rect(g, x + 2, 99, 11, 13, "#8bb8b1");
    rect(g, x + 7, 99, 1, 13, "#e1ca91");
    rect(g, x + 2, 105, 11, 1, "#e1ca91");
    rect(g, x - 1, 114, 17, 3, "#aa7548");
    flower(x + 2, 114, "#e5b972");
    flower(x + 11, 114, "#e3a3a3");
  }
  rect(g, 132, 133, 23, 5, "#b4a27e");
  rect(g, 130, 138, 27, 3, "#c6b28a");
  // Sign, logs, stones, meadow flowers.
  rect(g, 253, 177, 3, 15, "#7b5d3e");
  rect(g, 242, 171, 25, 11, "#b69157");
  rect(g, 244, 173, 21, 1, "#ddbf7e");
  rect(g, 251, 176, 9, 2, "#725537");
  for (let i = 0; i < 105; i++) {
    let x = rand() * W,
      y = 50 + rand() * H;
    if ((x < 75 || x > 280) && !(x > 310 && y > 180 && y < 275))
      flower(x, y, ["#eed69b", "#e7b3a2", "#c0cc90"][i % 3]);
  }
  for (let x = 4; x < W; x += 30) tree(x, 30 + rand() * 15, 1.1);
  for (let y = 76; y < 330; y += 44) {
    tree(12 + rand() * 17, y, 1.15);
    tree(468 + rand() * 10, y, 1.15);
  }
  tree(293, 88, 0.95);
  tree(385, 100, 1.1);
  tree(64, 135, 0.8);
  tree(282, 292, 0.8);
  for (const [x, y] of [
    [63, 242],
    [304, 180],
    [422, 147],
    [179, 290],
  ]) {
    rect(g, x, y, 11, 6, "#707d67");
    rect(g, x + 2, y - 3, 7, 5, "#a5ac8c");
    rect(g, x + 3, y - 3, 4, 2, "#c1c4a0");
  }
}
buildGarden();
let form = 3,
  night = false,
  paused = false,
  time = 0,
  last = 0,
  mode = "idle",
  modeUntil = 0,
  target = { x: 248, y: 210 },
  pet = { x: 248, y: 210 },
  particles = [],
  destination = null;
const status = document.querySelector("#status"),
  palettes = {
    1: {
      body: "#eea33b",
      light: "#ffd676",
      wing: "#d96b2e",
      dark: "#713629",
      tail: "#b84028",
    },
    2: {
      body: "#bb392c",
      light: "#f6b948",
      wing: "#e16c30",
      dark: "#522c31",
      tail: "#8c2430",
    },
    3: {
      body: "#fff0bd",
      light: "#fff9df",
      wing: "#e9bd58",
      dark: "#654234",
      tail: "#ae3033",
    },
  };
function phoenix(t) {
  const p = palettes[form];
  const x = Math.round(pet.x);
  const y = Math.round(
    pet.y + Math.sin(t * 3) * 1.5 - (mode === "fly" ? 10 : 0),
  );
  const flap = Math.sin(t * (mode === "fly" ? 10 : 4.5));
  const adult = form === 3;
  ctx.fillStyle = "#1e352733";
  ctx.beginPath();
  ctx.ellipse(x, pet.y + 10, adult ? 10 : 7, 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.translate(x, y);
  const size = form === 1 ? 0.34 : form === 2 ? 0.42 : 0.5;
  ctx.scale(size, size);
  if (target.x < pet.x - 1) ctx.scale(-1, 1);

  // Five independent, tapered tail feathers with golden inner vanes.
  for (let i = 0; i < (adult ? 5 : 3); i++) {
    const spread = i - (adult ? 2 : 1);
    const sway = Math.sin(t * 3.4 + i * 0.7) * 3;
    const endX = spread * 10 + sway - 5;
    const endY = 38 - Math.abs(spread) * 3;
    poly(
      ctx,
      [
        [-3 + spread, 4],
        [spread * 5 - 7, 17],
        [endX - 5, endY - 5],
        [endX - 6, endY + 4],
        [endX + 1, endY],
        [spread * 6 + 4, 19],
        [4 + spread, 6],
      ],
      "#542a32",
    );
    poly(
      ctx,
      [
        [-2 + spread, 5],
        [spread * 5 - 5, 17],
        [endX - 3, endY - 5],
        [endX - 4, endY + 1],
        [endX, endY - 2],
        [spread * 6 + 2, 18],
        [3 + spread, 6],
      ],
      p.tail,
    );
    poly(
      ctx,
      [
        [spread, 8],
        [spread * 5 - 1, 19],
        [endX - 2, endY - 1],
        [endX + 1, endY - 8],
        [spread * 5 + 2, 18],
      ],
      p.wing,
    );
    poly(
      ctx,
      [
        [spread, 9],
        [spread * 5, 18],
        [endX - 1, endY - 6],
        [spread * 5 + 2, 17],
      ],
      p.light,
    );
  }

  // Articulated wings: each primary feather is a separate outlined shape.
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.scale(side, 1);
    ctx.translate(4, -5);
    ctx.rotate((flap * 0.11 + 0.06) * (mode === "fly" ? 1.6 : 1));
    poly(
      ctx,
      [
        [0, 0],
        [8, -10],
        [18, -15],
        [30, -26],
        [26, -7],
        [19, 4],
        [9, 10],
        [0, 6],
      ],
      p.dark,
    );
    const count = adult ? 7 : 5;
    for (let j = count - 1; j >= 0; j--) {
      const rootX = 4 + j * 1.7,
        rootY = 5 - j * 2;
      const tipX = 14 + j * 2.8;
      const tipY = 7 - j * 5.4 - flap * (j + 1) * 0.5;
      poly(
        ctx,
        [
          [rootX - 3, rootY - 3],
          [tipX - 3, tipY - 5],
          [tipX + 5, tipY - 13],
          [tipX + 3, tipY + 1],
          [tipX - 3, tipY + 7],
          [rootX - 3, rootY + 4],
        ],
        p.dark,
      );
      poly(
        ctx,
        [
          [rootX - 1, rootY - 2],
          [tipX - 1, tipY - 4],
          [tipX + 3, tipY - 10],
          [tipX + 1, tipY],
          [tipX - 3, tipY + 5],
          [rootX - 2, rootY + 2],
        ],
        p.tail,
      );
      poly(
        ctx,
        [
          [rootX, rootY - 2],
          [tipX - 1, tipY - 3],
          [tipX + 1, tipY - 6],
          [tipX - 1, tipY],
          [tipX - 4, tipY + 3],
          [rootX - 1, rootY + 2],
        ],
        p.wing,
      );
      poly(
        ctx,
        [
          [rootX, rootY - 2],
          [tipX - 2, tipY - 2],
          [tipX, tipY - 4],
          [tipX - 3, tipY + 1],
          [rootX - 1, rootY + 1],
        ],
        p.body,
      );
    }
    // Overlapping shoulder coverts catch the light.
    for (let j = 3; j >= 0; j--) {
      const dx = 2 + j * 3,
        dy = -j * 3;
      poly(
        ctx,
        [
          [dx - 3, dy - 4],
          [dx + 4, dy - 8],
          [dx + 2, dy + 2],
          [dx - 3, dy + 6],
        ],
        p.wing,
      );
      poly(
        ctx,
        [
          [dx - 2, dy - 4],
          [dx + 2, dy - 6],
          [dx, dy + 1],
          [dx - 2, dy + 3],
        ],
        p.light,
      );
    }
    ctx.restore();
  }

  // Curved breast, a ruff of layered feathers, and hooked eagle profile.
  poly(
    ctx,
    [
      [-5, -12],
      [2, -15],
      [9, -9],
      [10, 0],
      [5, 10],
      [0, 15],
      [-7, 9],
      [-10, 0],
    ],
    p.dark,
  );
  poly(
    ctx,
    [
      [-4, -12],
      [2, -13],
      [7, -8],
      [8, 0],
      [3, 9],
      [0, 12],
      [-5, 7],
      [-7, 0],
    ],
    p.wing,
  );
  poly(
    ctx,
    [
      [-3, -12],
      [2, -12],
      [5, -7],
      [5, 1],
      [1, 9],
      [-3, 7],
      [-5, 0],
    ],
    p.body,
  );
  poly(
    ctx,
    [
      [-2, -10],
      [1, -10],
      [2, -4],
      [0, 5],
      [-3, 3],
    ],
    p.light,
  );
  for (let i = 0; i < 4; i++) {
    poly(
      ctx,
      [
        [-5 + i * 2, -8 + i * 4],
        [1 + i, -6 + i * 4],
        [-3 + i, 0 + i * 4],
        [-4 + i, -3 + i * 4],
      ],
      i % 2 ? p.wing : p.light,
    );
  }
  // Swept solar crest.
  for (let i = 0; i < 4; i++) {
    poly(
      ctx,
      [
        [0, -15],
        [-9 - i * 3, -20 - i * 2],
        [-6 - i * 2, -28 - i],
        [0, -23 - i],
        [5, -21],
        [7, -15],
      ],
      p.tail,
    );
    poly(
      ctx,
      [
        [1, -16],
        [-7 - i * 3, -21 - i * 2],
        [-5 - i * 2, -25 - i],
        [1, -21 - i],
        [5, -19],
      ],
      p.wing,
    );
  }
  poly(
    ctx,
    [
      [-2, -20],
      [3, -25],
      [9, -23],
      [12, -18],
      [10, -11],
      [5, -9],
      [-2, -13],
    ],
    p.dark,
  );
  poly(
    ctx,
    [
      [-1, -20],
      [4, -23],
      [8, -21],
      [10, -17],
      [8, -12],
      [4, -11],
      [-1, -14],
    ],
    p.body,
  );
  poly(
    ctx,
    [
      [0, -20],
      [4, -22],
      [8, -20],
      [5, -18],
      [0, -16],
    ],
    p.light,
  );
  poly(
    ctx,
    [
      [5, -18],
      [10, -19],
      [9, -16],
      [6, -15],
    ],
    p.dark,
  );
  rect(ctx, 7, -18, 2, 1, "#df6934");
  rect(ctx, 8, -18, 1, 1, "#fff3aa");
  poly(
    ctx,
    [
      [10, -17],
      [16, -14],
      [16, -10],
      [13, -12],
      [9, -12],
    ],
    "#785130",
  );
  poly(
    ctx,
    [
      [10, -16],
      [14, -14],
      [15, -12],
      [12, -13],
      [10, -13],
    ],
    "#f0bf52",
  );
  for (const xx of [-3, 4]) {
    rect(ctx, xx, 10, 2, 5, "#b87935");
    poly(
      ctx,
      [
        [xx, 13],
        [xx + 3, 14],
        [xx + 5, 17],
        [xx + 2, 16],
        [xx + 1, 17],
        [xx - 2, 16],
        [xx - 3, 17],
        [xx - 3, 15],
      ],
      "#60412f",
    );
    rect(ctx, xx - 2, 14, 5, 1, "#efc76a");
  }
  ctx.restore();
}
function burst() {
  for (let i = 0; i < 60; i++)
    particles.push({
      x: pet.x,
      y: pet.y,
      vx: (Math.random() - 0.5) * 40,
      vy: -10 - Math.random() * 35,
      life: 1 + Math.random(),
      max: 2,
    });
}
function render(timestamp) {
  const dt = Math.min((timestamp - last) / 1000 || 0, 0.05);
  last = timestamp;
  const farm = window.FarmGame;
  const running = farm && farm.running() && !paused;
  if (running) {
    time += dt;
    farm.step(dt);
    if (time > modeUntil) mode = "idle";
    if (mode === "fly") {
      target.x = farm.player().x + 16 + Math.cos(time * 1.3) * 18;
      target.y = farm.player().y - 8 + Math.sin(time * 1.8) * 10;
    }
    pet.x += (target.x - pet.x) * Math.min(1, dt * 3);
    pet.y += (target.y - pet.y) * Math.min(1, dt * 3);
    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
    particles = particles.filter((p) => p.life > 0);
  }
  ctx.drawImage(
    gardenArt.complete && gardenArt.naturalWidth ? gardenArt : landscape,
    0,
    0,
    W,
    H,
  );
  farm?.drawGround(ctx, time);
  for (let i = 0; i < 6; i++) {
    ctx.globalAlpha = 0.18 + Math.sin(time * 1.5 + i) * 0.1;
    rect(
      ctx,
      351 + ((i * 17) % 64) + Math.sin(time + i) * 3,
      183 + i * 9,
      4,
      0.4,
      "#c5eee4",
    );
  }
  ctx.globalAlpha = 1;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 3; i++) {
      const phase = (time * 0.25 + i / 3) % 1;
      ctx.globalAlpha = (1 - phase) * 0.2;
      rect(
        ctx,
        175 + Math.sin(phase * 6) * 4,
        14 - phase * 20,
        3 + phase * 6,
        3 + phase * 5,
        "#f7f1da",
      );
    }
    for (let i = 0; i < 16; i++) {
      ctx.globalAlpha = 0.15 + (i % 4) * 0.07;
      rect(
        ctx,
        (i * 43 + time * (2 + (i % 3))) % W,
        75 + ((i * 37 + Math.sin(time * 0.55 + i) * 8) % 220),
        0.8,
        0.4,
        i % 3 ? "#ffe9b4" : "#f3b1bd",
      );
    }
  }
  ctx.globalAlpha = 1;
  farm?.drawActors(ctx, time);
  if (mode === "flare") {
    const glow = ctx.createRadialGradient(pet.x, pet.y, 2, pet.x, pet.y, 28);
    glow.addColorStop(0, "#fff5bd99");
    glow.addColorStop(0.4, "#ffb33b55");
    glow.addColorStop(1, "#ff6a1600");
    ctx.fillStyle = glow;
    ctx.fillRect(pet.x - 28, pet.y - 28, 56, 56);
    ctx.save();
    ctx.translate(pet.x, pet.y + 10);
    ctx.scale(1, 0.35);
    ctx.rotate(time * 0.7);
    ctx.strokeStyle = "#ffe5a0";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  phoenix(time);
  for (const p of particles) {
    ctx.globalAlpha = Math.min(1, p.life);
    rect(ctx, p.x, p.y, 1, 1, p.life > 0.7 ? "#ffdf83" : "#e88c45");
  }
  ctx.globalAlpha = 1;
  farm?.drawAtmosphere(ctx, time);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
let audio = null,
  sound = false;
function tone(f) {
  if (!sound || !audio) return;
  const o = audio.createOscillator(),
    gain = audio.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(f, audio.currentTime);
  gain.gain.setValueAtTime(0.035, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.5);
  o.connect(gain);
  gain.connect(audio.destination);
  o.start();
  o.stop(audio.currentTime + 0.5);
}
