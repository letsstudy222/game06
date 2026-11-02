import { TILE, cellSolid, center } from "./maps.mjs";
const TAU = Math.PI * 2;
export const facingIndex = (angle) =>
  (Math.round(angle / (Math.PI / 4)) + 8) % 8;
const poly = (c, points, fill, stroke) => {
  c.beginPath();
  points.forEach(([x, y], i) =>
    i
      ? c.lineTo(Math.round(x), Math.round(y))
      : c.moveTo(Math.round(x), Math.round(y)),
  );
  c.closePath();
  c.fillStyle = fill;
  c.fill();
  if (stroke) {
    c.strokeStyle = stroke;
    c.lineWidth = 1;
    c.stroke();
  }
};
const oval = (c, x, y, rx, ry, color) => {
  c.fillStyle = color;
  c.beginPath();
  c.ellipse(x, y, rx, ry, 0, 0, TAU);
  c.fill();
};
export function drawQuy(
  c,
  x,
  y,
  angle,
  { moving = false, guard = false, buffed = false, time = 0, scale = 1 } = {},
) {
  // Runtime placeholder only: one anatomy, eight discrete head/flipper orientations.
  const dir = (facingIndex(angle) * Math.PI) / 4,
    f = [Math.cos(dir), Math.sin(dir)],
    side = [-f[1], f[0]];
  c.save();
  c.translate(Math.round(x), Math.round(y));
  c.scale(scale, scale);
  oval(c, 0, 7, 23, 9, "#062c4277");
  const point = (a, b) => [
    f[0] * a + side[0] * b,
    (f[1] * a + side[1] * b) * 0.78,
  ];
  const gait = moving ? Math.sin(time * 12) * 3 : 0;
  for (const a of [-10, 10])
    for (const s of [-1, 1]) {
      const b = s * (guard ? 11 : 18),
        p = point(a, b),
        tip = point(a + (a > 0 ? 6 : -5) + s * gait, s * (guard ? 16 : 27));
      poly(
        c,
        [
          [p[0] - 5, p[1] - 3],
          [tip[0], tip[1]],
          [tip[0] - f[0] * 7, tip[1] - f[1] * 5],
          [p[0] + 4, p[1] + 4],
        ],
        "#44b7ac",
        "#e8ce7e",
      );
    }
  const tail = point(-23, 0),
    tail2 = point(-15, -4),
    tail3 = point(-15, 4);
  poly(c, [tail, tail2, tail3], "#7bc9b8", "#183f4c");
  const head = point(guard ? 13 : 24, 0);
  oval(c, head[0] + 1, head[1] + 2, 7, 6, "#153d4b");
  oval(c, head[0], head[1], 7, 5, "#b9dfbd");
  const eye = point(guard ? 14 : 26, 4);
  c.fillStyle = "#063449";
  c.fillRect(Math.round(eye[0]), Math.round(eye[1]) - 1, 3, 2);
  c.fillStyle = "#f7eab2";
  c.fillRect(Math.round(eye[0]), Math.round(eye[1]) - 1, 1, 1);
  oval(c, 0, 1, 21, 16, "#123d4d");
  oval(c, 0, -1, 20, 15, "#e8c87b");
  oval(c, 0, -2, 17, 13, buffed ? "#1d9eaa" : "#186c82");
  c.strokeStyle = buffed ? "#b3ffe4" : "#60d9cd";
  c.lineWidth = buffed ? 3 : 2;
  c.beginPath();
  for (let t = 0; t < Math.PI * 4.5; t += 0.15) {
    const r = 1 + t * 0.72;
    const a = dir + t;
    const px = Math.round(Math.cos(a) * r),
      py = Math.round(Math.sin(a) * r * 0.69) - 2;
    t === 0 ? c.moveTo(px, py) : c.lineTo(px, py);
  }
  c.stroke();
  c.strokeStyle = "#79cdc1";
  c.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const a = dir + (i * TAU) / 6;
    c.beginPath();
    c.moveTo(Math.round(Math.cos(a) * 11), Math.round(Math.sin(a) * 8) - 2);
    c.lineTo(Math.round(Math.cos(a) * 16), Math.round(Math.sin(a) * 12) - 2);
    c.stroke();
  }
  if (guard) {
    c.strokeStyle = "#a3f0dd";
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(0, 0, 26, 21, 0, 0, TAU);
    c.stroke();
  }
  if (buffed) {
    c.fillStyle = "#ceffde";
    for (let i = 0; i < 4; i++) {
      const p = point((i - 1.5) * 8, Math.sin(time * 4 + i) * 8);
      c.fillRect(Math.round(p[0]), Math.round(p[1]) - 4, 2, 2);
    }
  }
  c.restore();
}
export class HaiUyenView {
  constructor(canvas) {
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.camera = { x: 0, y: 0 };
    this.scale = 1;
    this.drawCalls = 0;
    this.ready = false;
    this.resize();
  }
  resize() {
    this.scale = innerWidth >= 1000 && innerHeight >= 580 ? 2 : 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.ceil(rect.width / this.scale);
    this.canvas.height = Math.ceil(rect.height / this.scale);
    this.c.imageSmoothingEnabled = false;
  }
  screenToWorld(x, y) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: ((x - r.left) / r.width) * this.canvas.width + this.camera.x,
      y: ((y - r.top) / r.height) * this.canvas.height + this.camera.y,
    };
  }
  draw(g) {
    const c = this.c,
      w = this.canvas.width,
      h = this.canvas.height,
      m = g.map;
    this.camera.x = Math.round(
      Math.max(0, Math.min(m.width - w, g.player.x - w / 2)),
    );
    this.camera.y = Math.round(
      Math.max(0, Math.min(m.height - h, g.player.y - h / 2)),
    );
    c.fillStyle = "#0b253b";
    c.fillRect(0, 0, w, h);
    c.save();
    c.translate(-this.camera.x, -this.camera.y);
    this.drawCalls = 0;
    const sx = Math.max(0, Math.floor(this.camera.x / TILE)),
      sy = Math.max(0, Math.floor(this.camera.y / TILE));
    for (
      let y = sy;
      y < Math.min(m.size_tiles[1], Math.ceil((this.camera.y + h) / TILE) + 1);
      y++
    )
      for (
        let x = sx;
        x <
        Math.min(m.size_tiles[0], Math.ceil((this.camera.x + w) / TILE) + 1);
        x++
      ) {
        this.tile(c, m, x, y, g);
        this.drawCalls++;
      }
    this.channels(c, g);
    for (const e of m.entities) this.entity(c, e, g);
    for (const f of g.effects) if (f.type === "vortex") this.effect(c, f, g);
    const actors = [
      { player: true, y: g.player.y },
      ...g.enemies.filter((e) => e.hp > 0),
    ].sort((a, b) => a.y - b.y);
    for (const a of actors)
      if (a.player)
        drawQuy(c, g.player.x, g.player.y, g.player.angle, {
          moving: g.player.moving,
          guard: g.guarding,
          buffed: g.buffed,
          time: g.time,
        });
      else this.enemy(c, a, g);
    for (const f of g.effects) if (f.type !== "vortex") this.effect(c, f, g);
    for (const p of g.projectiles) {
      c.save();
      c.translate(Math.round(p.x), Math.round(p.y));
      c.rotate(p.angle);
      if (p.enhanced) {
        c.strokeStyle = "#c3fff3";
        c.lineWidth = 3;
        c.beginPath();
        c.ellipse(0, 0, 7, 11, 0, 0, TAU);
        c.stroke();
      } else {
        poly(
          c,
          [
            [10, 0],
            [-8, -4],
            [-14, 0],
            [-8, 4],
          ],
          "#cafff1",
        );
      }
      c.strokeStyle = "#56dddf";
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(-12, -3);
      c.lineTo(-24, -3);
      c.moveTo(-14, 3);
      c.lineTo(-30, 3);
      c.stroke();
      c.restore();
    }
    // Telegraphs are always above actors and ability art, never obscured by K2/K3.
    for (const a of g.enemies)
      if (a.hp > 0 && ["windup", "strike"].includes(a.state))
        this.telegraph(c, a);
    this.ambience(c, g);
    const aim = g.aim;
    if (aim) {
      const d = Math.hypot(aim.x - g.player.x, aim.y - g.player.y),
        s = Math.min(1, 190 / Math.max(1, d)),
        x = g.player.x + (aim.x - g.player.x) * s,
        y = g.player.y + (aim.y - g.player.y) * s;
      c.strokeStyle = "#fff1b7";
      c.lineWidth = 1;
      c.beginPath();
      c.arc(x, y, 5, 0, TAU);
      c.moveTo(x - 9, y);
      c.lineTo(x - 4, y);
      c.moveTo(x + 4, y);
      c.lineTo(x + 9, y);
      c.moveTo(x, y - 9);
      c.lineTo(x, y - 4);
      c.moveTo(x, y + 4);
      c.lineTo(x, y + 9);
      c.stroke();
    }
    c.restore();
    this.ready = true;
  }
  tile(c, m, x, y, g) {
    const px = x * TILE,
      py = y * TILE,
      solid = m.collision_rows[y][x] === "#",
      seed = (x * 41 + y * 17) % 11;
    if (solid) {
      c.fillStyle = "#102e47";
      c.fillRect(px, py, 32, 32);
      c.fillStyle = seed < 4 ? "#294d65" : "#24485f";
      c.fillRect(px + 1, py + 1, 30, 24);
      c.fillStyle = "#3b697b";
      c.fillRect(px + 2, py + 1, 28, 2);
      c.fillStyle = "#183b52";
      c.fillRect(px + 3, py + 19, 25, 5);
      c.fillStyle = "#537780";
      c.fillRect(px + 5 + seed, py + 7, 5, 2);
      if (m.collision_rows[y + 1]?.[x] === ".") {
        c.fillStyle = "#0a293e88";
        c.fillRect(px, py + 27, 32, 8);
        c.fillStyle = "#82b4a0";
        c.fillRect(px + 2, py + 24, 28, 2);
      }
    } else {
      const reef = m.id === "VS-B1";
      c.fillStyle = reef
        ? ["#507f88", "#578b90", "#53858c"][seed % 3]
        : ["#608c8c", "#5c898a", "#638e8d"][seed % 3];
      c.fillRect(px, py, 32, 32);
      c.fillStyle = reef ? "#6c9c9a" : "#729e98";
      c.fillRect(px + 1, py + 1, 30, 1);
      c.fillStyle = "#28576855";
      c.fillRect(px, py + 30, 32, 2);
      if (seed < 5) {
        c.fillRect(px + 13, py + 10, 9, 1);
        c.fillRect(px + 13, py + 11, 1, 4);
      }
      if (seed === 8) {
        c.fillStyle = "#a9b99c";
        c.fillRect(px + 8, py + 21, 3, 2);
      }
      if (m.id === "VS-B1" && y >= 21 && y <= 25) {
        c.fillStyle = "#83bdaf44";
        c.fillRect(px + 2, py + 2, 28, 28);
        if (x % 3 === 0 && y === 23) this.arrow(c, px + 16, py + 16, g.time);
      }
    }
  }
  arrow(c, x, y, time) {
    c.strokeStyle = "#a5ead2";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(x - 6, y - 5);
    c.lineTo(x, y);
    c.lineTo(x - 6, y + 5);
    c.moveTo(x + 1, y - 5);
    c.lineTo(x + 7, y);
    c.lineTo(x + 1, y + 5);
    c.stroke();
  }
  channels(c, g) {
    if (g.room !== "VS-LAB") return;
    const c1 = center({ x: 15, y: 10 }),
      c2 = center({ x: 31, y: 26 }),
      stable = g.flags["vs.lab.valve_b_stable"];
    c.save();
    c.strokeStyle = stable ? "#a0ffe0" : "#214e63";
    c.lineWidth = 7;
    c.beginPath();
    c.moveTo(c1.x, c1.y);
    c.lineTo(c1.x, 20.5 * TILE);
    c.lineTo(c2.x, 20.5 * TILE);
    c.lineTo(c2.x, c2.y);
    c.stroke();
    c.strokeStyle = g.flags["vs.lab.valve_a_primed"] ? "#55d9d3" : "#b0bb89";
    c.lineWidth = 2;
    c.stroke();
    c.restore();
    for (const e of g.map.entities.filter((e) => e.type === "current_zone")) {
      const [x, y, w, h] = e.rect;
      c.fillStyle = stable ? "#a0ffe022" : "#1db9c333";
      c.fillRect(x * TILE, y * TILE, w * TILE, h * TILE);
      for (let a = 0; a < w; a += 2)
        this.arrow(c, (x + a + 0.5) * TILE, (y + h / 2) * TILE, g.time);
    }
  }
  entity(c, e, g) {
    if (e.x === undefined) return;
    const p = center(e),
      x = p.x,
      y = p.y;
    if (
      x < this.camera.x - 100 ||
      x > this.camera.x + this.canvas.width + 100 ||
      y < this.camera.y - 100 ||
      y > this.camera.y + this.canvas.height + 100
    )
      return;
    if (
      [
        "entry_anchor",
        "spawn",
        "enemy_spawn",
        "boss_spawn",
        "flow_visual",
        "current_zone",
      ].includes(e.type)
    )
      return;
    const active = e.state_flag && g.flags[e.state_flag];
    if (e.type === "dynamic_gate") {
      const open = g.flags[e.open_when];
      for (const [a, b] of e.affected_cells) {
        const px = a * TILE,
          py = b * TILE;
        c.fillStyle = open ? "#74e3cd33" : "#102d48";
        c.fillRect(px, py, 32, 32);
        c.fillStyle = open ? "#a0e3b2" : "#d9b76e";
        c.fillRect(px + 3, py, 3, 32);
        c.fillRect(px + 26, py, 3, 32);
        if (!open) {
          c.fillStyle = "#559cad";
          c.fillRect(px + 9, py + 2, 14, 28);
          c.strokeStyle = "#e8cf8d";
          c.strokeRect(px + 12, py + 10, 8, 10);
        }
      }
      return;
    }
    if (e.type === "transition") {
      c.fillStyle = "#b2e9cf22";
      c.fillRect(x - 16, y - 32, 32, 64);
      c.strokeStyle = "#e7cb83";
      c.lineWidth = 3;
      c.strokeRect(x - 15, y - 30, 30, 60);
      this.label(c, x, y - 39, e.target.replace("VS-", "") + " ↔", "#ffe6a7");
      c.strokeStyle = "#7ce9d6";
      c.lineWidth = 1;
      c.strokeRect(x - 9, y - 24, 18, 48);
      return;
    }
    if (e.type === "decor" || e.type === "landmark") {
      c.save();
      c.translate(x, y);
      c.strokeStyle = "#ed88b9";
      c.lineWidth = e.type === "landmark" ? 5 : 3;
      c.beginPath();
      c.moveTo(0, 10);
      c.lineTo(0, -14);
      c.moveTo(0, 1);
      c.lineTo(-12, -8);
      c.lineTo(-12, -18);
      c.moveTo(0, -5);
      c.lineTo(12, -15);
      c.lineTo(15, -24);
      c.moveTo(5, -10);
      c.lineTo(4, -20);
      c.stroke();
      c.restore();
      return;
    }
    if (e.type === "checkpoint" || e.type === "rest_marker") {
      oval(c, x, y + 8, 20, 9, "#284e5b");
      poly(
        c,
        [
          [x, y - 22],
          [x + 10, y - 6],
          [x, y + 7],
          [x - 10, y - 6],
        ],
        active ? "#98f0d3" : "#e7c779",
        "#f6e6b3",
      );
      c.fillStyle = "#123d4b";
      c.fillRect(x - 2, y - 11, 4, 9);
      this.label(c, x, y - 31, "◆ E · Lưu / Nghỉ", "#fff0ba");
      return;
    }
    if (e.type === "puzzle_valve") {
      oval(c, x, y, 24, 19, "#234d5c");
      c.strokeStyle = active ? "#80ffdb" : "#e7c779";
      c.lineWidth = 3;
      c.strokeRect(x - 14, y - 15, 28, 28);
      c.beginPath();
      c.arc(x, y - 2, 9, 0, TAU);
      c.moveTo(x - 8, y - 2);
      c.lineTo(x + 8, y - 2);
      c.moveTo(x, y - 10);
      c.lineTo(x, y + 6);
      c.stroke();
      this.label(
        c,
        x,
        y - 29,
        active
          ? "✓ Ổn định"
          : e.required_action.includes("k1")
            ? "A · K1"
            : "B · TÂM K2",
        "#ffe5ad",
      );
      return;
    }
    if (e.type === "secret_cache") {
      c.fillStyle = active ? "#3d696e" : "#e7c779";
      c.fillRect(x - 11, y - 8, 22, 17);
      c.fillStyle = "#234b5b";
      c.fillRect(x - 8, y - 4, 16, 4);
      c.fillStyle = "#f5e5b3";
      c.fillRect(x - 2, y - 3, 4, 6);
      this.label(
        c,
        x,
        y - 19,
        active ? "✓ Đã nhận" : "▣ E · Lưu ký",
        "#f7deaa",
      );
      return;
    }
    if (e.type === "future_portal_stub") {
      c.strokeStyle = "#687f86";
      c.lineWidth = 3;
      c.strokeRect(x - 12, y - 23, 24, 45);
      this.label(c, x, y + 34, "Chưa nối tuyến", "#b7c7bf");
      return;
    }
    if (e.type === "lore_shrine") {
      oval(c, x, y, 36, 26, "#234d5a");
      c.strokeStyle = active ? "#89f9da" : "#e7c779";
      c.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        c.beginPath();
        c.ellipse(x, y, i * 9, i * 6, 0, 0, TAU);
        c.stroke();
      }
      this.label(c, x, y - 35, "◎ E · Dư âm", "#f7deaa");
      return;
    }
    poly(
      c,
      [
        [x - 7, y - 12],
        [x + 7, y - 12],
        [x + 9, y + 9],
        [x - 9, y + 9],
      ],
      active ? "#6bc8bb" : "#e3ca91",
      "#254f5c",
    );
    this.label(
      c,
      x,
      y - 22,
      e.type === "guidance_marker" ? "E · Chỉ dẫn" : "E · Ký ức",
      "#f1e3bb",
    );
  }
  label(c, x, y, text, color) {
    c.font = "10px monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    const w = c.measureText(text).width;
    c.fillStyle = "#0b2a3bd9";
    c.fillRect(
      Math.round(x - w / 2) - 4,
      Math.round(y) - 7,
      Math.ceil(w) + 8,
      14,
    );
    c.fillStyle = color;
    c.fillText(text, Math.round(x), Math.round(y));
  }
  enemy(c, e, g) {
    const x = Math.round(e.x),
      y = Math.round(e.y);
    oval(c, x, y + 7, e.boss ? 32 : 17, 8, "#09334988");
    if (e.boss) {
      for (const s of [-1, 1]) {
        poly(
          c,
          [
            [x + s * 15, y + 5],
            [x + s * 34, y + 12],
            [x + s * 28, y + 3],
            [x + s * 37, y - 6],
            [x + s * 32, y - 9],
            [x + s * 15, y - 4],
          ],
          "#bd836d",
          "#f5c88e",
        );
        oval(c, x + s * 32, y - 14, 11, 13, "#d8a07c");
        poly(
          c,
          [
            [x + s * 30, y - 23],
            [x + s * 38, y - 20],
            [x + s * 34, y - 8],
          ],
          "#193e51",
        );
      }
      oval(c, x, y, 26, 20, "#23475a");
      oval(c, x, y - 3, 23, 18, e.phase === 2 ? "#c38373" : "#709e9b");
      poly(
        c,
        [
          [x - 17, y - 8],
          [x, y - 18],
          [x + 17, y - 8],
          [x + 11, y + 8],
          [x - 11, y + 8],
        ],
        "#326a7c",
        "#edcf94",
      );
      c.fillStyle = "#ffe9b1";
      c.fillRect(x - 12, y + 6, 5, 4);
      c.fillRect(x + 7, y + 6, 5, 4);
    } else if (e.archetype === "sua_hoi_luu") {
      oval(c, x, y - 3, 15, 12, "#c68ab3");
      oval(c, x, y - 5, 11, 8, "#f2bfcc");
      c.strokeStyle = "#f4b9d3";
      c.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        c.beginPath();
        c.moveTo(x + i * 8, y + 3);
        c.lineTo(x + i * 8 + Math.sin(g.time * 3 + i) * 4, y + 17);
        c.stroke();
      }
      c.fillStyle = "#25445e";
      c.fillRect(x - 7, y - 3, 3, 3);
      c.fillRect(x + 4, y - 3, 3, 3);
    } else {
      const a = Math.atan2(g.player.y - y, g.player.x - x);
      c.save();
      c.translate(x, y);
      c.rotate(a);
      poly(
        c,
        [
          [-13, -6],
          [-22, -13],
          [-22, 12],
          [-13, 6],
        ],
        "#e2bb7c",
      );
      oval(c, 0, 0, 17, 10, "#e6c68d");
      poly(
        c,
        [
          [12, -5],
          [25, -9],
          [21, 0],
          [25, 9],
          [12, 5],
        ],
        "#e0ab7f",
        "#234f60",
      );
      c.fillStyle = "#163a4b";
      c.fillRect(6, -5, 3, 3);
      c.restore();
    }
    if (e.hp < e.maxHp) {
      c.fillStyle = "#163849";
      c.fillRect(x - 20, y - (e.boss ? 38 : 25), 40, 4);
      c.fillStyle = "#efb08a";
      c.fillRect(x - 20, y - (e.boss ? 38 : 25), (40 * e.hp) / e.maxHp, 4);
    }
  }
  effect(c, f, g) {
    c.save();
    c.globalAlpha = Math.min(1, (f.duration - f.age) * 3);
    if (f.type === "vortex") {
      oval(c, f.x, f.y, 82, 43, "#0a3159aa");
      c.strokeStyle = f.enhanced ? "#bbffe6" : "#69e9e2";
      c.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        c.beginPath();
        c.ellipse(
          Math.round(f.x),
          Math.round(f.y),
          20 + i * 19,
          10 + i * 10,
          0,
          g.time * 3 + i,
          g.time * 3 + i + Math.PI * 1.6,
        );
        c.stroke();
      }
      oval(c, f.x, f.y, 13, 7, "#062340");
      if (f.pulse) {
        c.strokeStyle = "#f2ffe1";
        c.beginPath();
        c.ellipse(f.x, f.y, 80, 42, 0, 0, TAU);
        c.stroke();
      }
    }
    if (f.type === "radial") {
      for (const delay of [0, ...(f.enhanced ? [0.4] : [])]) {
        const a = f.age - delay;
        if (a < 0 || a > 0.8) continue;
        const r = (a / 0.8) * f.radius;
        c.strokeStyle = f.enhanced ? "#c1fff0" : "#96f6e5";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(f.x, f.y, r, 0, TAU);
        c.stroke();
        c.lineWidth = 1;
        c.beginPath();
        c.arc(f.x, f.y, Math.max(0, r - 7), 0, TAU);
        c.stroke();
      }
    }
    if (f.type === "basic") {
      c.strokeStyle = "#fff0b9";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(f.x, f.y, 47, f.angle - 1, f.angle + 1);
      c.stroke();
    }
    if (f.type === "hit") {
      c.strokeStyle = "#e7f9c7";
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(f.x - 7, f.y - 7);
      c.lineTo(f.x + 7, f.y + 7);
      c.moveTo(f.x + 7, f.y - 7);
      c.lineTo(f.x - 7, f.y + 7);
      c.stroke();
    }
    c.restore();
  }
  telegraph(c, e) {
    c.save();
    const strike = e.state === "strike";
    c.strokeStyle = strike ? "#fff2c4" : "#ffe8a0";
    c.fillStyle = strike ? "#ffcc8480" : "#b9405c60";
    c.lineWidth = strike ? 3 : 2;
    c.setLineDash(strike ? [] : [5, 3]);
    c.beginPath();
    if (e.kind === "pool") c.arc(e.target.x, e.target.y, 56, 0, TAU);
    else if (e.kind === "ring") {
      c.arc(e.x, e.y, 135, 0, TAU);
      c.arc(e.x, e.y, 72, 0, TAU, true);
    } else if (e.kind === "charge") {
      const a = e.angle,
        sx = -Math.sin(a) * 22,
        sy = Math.cos(a) * 22,
        dx = Math.cos(a) * 190,
        dy = Math.sin(a) * 190;
      c.moveTo(e.x + sx, e.y + sy);
      c.lineTo(e.x + sx + dx, e.y + sy + dy);
      c.lineTo(e.x - sx + dx, e.y - sy + dy);
      c.lineTo(e.x - sx, e.y - sy);
      c.closePath();
    } else {
      c.moveTo(e.x, e.y);
      c.arc(e.x, e.y, e.boss ? 100 : 58, e.angle - 1.05, e.angle + 1.05);
      c.closePath();
    }
    c.fill("evenodd");
    c.stroke();
    c.setLineDash([]);
    this.label(
      c,
      e.x,
      e.y - (e.boss ? 57 : 40),
      {
        charge: "↗ ĐƯỜNG LAO",
        sweep: "⌁ QUÉT CÀNG",
        ring: "◎ VÒNG ÁP",
        pool: "◉ VÙNG ÁP",
      }[e.kind] || "!",
      "#ffe5a3",
    );
    c.restore();
  }
  ambience(c, g) {
    c.save();
    if (g.environment === "underwater") {
      c.strokeStyle = "#c1fff04d";
      c.lineWidth = 1;
      for (let i = 0; i < 15; i++) {
        const x =
            this.camera.x +
            ((i * 103 + Math.sin(g.time * 0.4 + i) * 10) % this.canvas.width),
          y =
            this.camera.y +
            ((((i * 79 - g.time * 12) % this.canvas.height) +
              this.canvas.height) %
              this.canvas.height);
        c.beginPath();
        c.arc(Math.round(x), Math.round(y), (i % 3) + 1, 0, TAU);
        c.stroke();
      }
    } else {
      c.fillStyle = "#e2fff199";
      for (let i = 0; i < 8; i++)
        c.fillRect(
          Math.round(g.player.x + Math.sin(i * 5 + g.time) * 35),
          Math.round(g.player.y + Math.cos(i * 3 + g.time) * 20),
          2,
          2,
        );
    }
    c.restore();
  }
  minimap(canvas, g) {
    const c = canvas.getContext("2d"),
      m = g.map,
      s = Math.min(
        (canvas.width - 8) / m.size_tiles[0],
        (canvas.height - 8) / m.size_tiles[1],
      );
    c.fillStyle = "#0b273b";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < m.size_tiles[1]; y++)
      for (let x = 0; x < m.size_tiles[0]; x++) {
        c.fillStyle = cellSolid(m, x, y, g.flags) ? "#18394c" : "#5d8d8a";
        c.fillRect(4 + x * s, 4 + y * s, Math.ceil(s), Math.ceil(s));
      }
    for (const e of m.entities.filter((e) =>
      ["checkpoint", "rest_marker", "transition"].includes(e.type),
    )) {
      c.fillStyle = e.type === "transition" ? "#e7c779" : "#b8fce0";
      c.fillRect(3 + e.x * s, 3 + e.y * s, 3, 3);
    }
    c.fillStyle = "#fff2bd";
    c.fillRect(3 + (g.player.x / 32) * s, 3 + (g.player.y / 32) * s, 3, 3);
  }
}
