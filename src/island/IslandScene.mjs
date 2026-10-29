import { PixelSurface, rng, ellipse, tree, rock } from "./pixel-art.mjs";
import { inside } from "./geometry.mjs";
function canvasFrom(surface) {
  const c = document.createElement("canvas");
  c.width = surface.width;
  c.height = surface.height;
  c.getContext("2d").putImageData(
    new ImageData(surface.data, surface.width, surface.height),
    0,
    0,
  );
  return c;
}
export class IslandScene {
  constructor(island) {
    this.island = island;
    this.sprite = new Image();
    this.sprite.src = "assets/sprites/phoenix-player.png";
    this.terrain = this.makeTerrain();
    this.canopies = new Map();
    this.makeCanopies();
  }
  makeTerrain() {
    const map = this.island,
      s = new PixelSurface(map.width, map.height),
      random = rng(map.seed);
    s.rect(0, 0, map.width, map.height, "#3e929d");
    for (let y = 0; y < map.height; y += 8)
      for (let x = 0; x < map.width; x += 8)
        if (random() > 0.55)
          s.rect(x, y, 8, 8, random() > 0.5 ? "#429aa3" : "#43959e");
    // Shallows, stepped shore, cliff face, sand and meadow are independent layers.
    for (const [dx, dy, color] of [
      [0, 14, "#327e89"],
      [0, 8, "#70b2ad"],
      [0, 5, "#abc8ad"],
      [0, 2, "#f0d9a2"],
    ])
      s.poly(
        map.coast.map(([x, y]) => [x + dx, y + dy]),
        color,
      );
    s.poly(map.coast, "#c7aa70");
    for (let i = 0; i < 160; i++) {
      const x = 60 + random() * 520,
        y = 40 + random() * 305;
      if (inside({ x, y }, map.coast) && !inside({ x, y }, map.meadow))
        s.rect(x, y, 2, 1, random() > 0.5 ? "#e5c98b" : "#af8f5f");
    }
    s.poly(map.meadow, "#8fac5f");
    for (let i = 0; i < 4300; i++) {
      const x = random() * map.width,
        y = random() * map.height;
      if (inside({ x, y }, map.meadow))
        s.rect(
          x,
          y,
          random() > 0.8 ? 2 : 1,
          1,
          ["#91b365", "#a3bb70", "#7f9e51", "#9ab663"][i % 4],
        );
    }
    // Broad, quiet clearings keep the white-and-gold player readable.
    ellipse(s, 306, 226, 61, 36, "#9bb56a");
    ellipse(s, 344, 175, 32, 21, "#9ab36a");
    for (const path of map.paths)
      for (let i = 1; i < path.length; i++) {
        const a = path[i - 1],
          b = path[i],
          n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
        for (let j = 0; j < n; j++) {
          const x = a[0] + ((b[0] - a[0]) * j) / n,
            y = a[1] + ((b[1] - a[1]) * j) / n;
          ellipse(s, x, y, 6, 4, "#c6bc83");
          ellipse(s, x, y - 1, 4, 2, "#d6c894");
        }
      }
    for (let i = 0; i < 200; i++) {
      const x = 110 + random() * 415,
        y = 80 + random() * 220;
      if (!inside({ x, y }, map.meadow)) continue;
      const clearing = Math.hypot((x - 306) / 65, (y - 226) / 42);
      if (clearing < 1.2) continue;
      const c = ["#ebc97e", "#dcb79e", "#d8dfa0"][i % 3];
      s.rect(x, y, 1, 3, "#617f42");
      s.rect(x - 1, y - 2, 3, 2, c);
      s.pixel(x, y - 1, "#fff0bd");
    }
    for (const b of map.bushes) {
      ellipse(s, b.x, b.y + 1, 9, 3, "#708c48");
      ellipse(s, b.x - 3, b.y - 3, 7, 5, "#597e3d");
      ellipse(s, b.x + 4, b.y - 4, 7, 5, "#769748");
      s.rect(b.x - 5, b.y - 6, 3, 1, "#a6bb61");
      s.rect(b.x + 3, b.y - 7, 3, 1, "#b0bf65");
    }
    for (const r of map.rocks) rock(s, r.x, r.y, r.r);
    // A few tiny beach shells and grasses; no buildings or farm objects.
    for (const [x, y] of [
      [114, 273],
      [484, 302],
      [531, 178],
      [191, 65],
      [292, 329],
    ]) {
      s.rect(x, y, 3, 2, "#f6e2b1");
      s.pixel(x + 1, y, "#c99b76");
    }
    for (const h of map.hazards) {
      ellipse(s, h.x, h.y + 2, h.r, 3, "#7d8356");
      for (let i = 0; i < 3; i++) {
        const x = h.x - 6 + i * 6;
        s.poly(
          [
            [x - 3, h.y],
            [x, h.y - 10 + (i % 2) * 3],
            [x + 3, h.y],
            [x, h.y + 3],
          ],
          "#514653",
        );
        s.poly(
          [
            [x - 1, h.y - 1],
            [x, h.y - 7 + (i % 2) * 2],
            [x + 1, h.y],
          ],
          "#9b83a2",
        );
      }
    }
    return canvasFrom(s);
  }
  makeCanopies() {
    for (const t of this.island.trees) {
      const s = new PixelSurface(72, 80),
        random = rng(Math.round(t.x * 31 + t.y));
      tree(s, 36, 71, t.size, random);
      this.canopies.set(t, canvasFrom(s));
    }
  }
  draw(state) {
    const c = this.ctx,
      map = this.island,
      cam = state.camera,
      time = state.time;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, 480, 270);
    c.translate(-cam.x, -cam.y);
    c.drawImage(this.terrain, 0, 0);
    for (let i = 0; i < 60; i++) {
      const x = 8 + ((i * 73) % map.width),
        y = 12 + ((i * 47) % map.height);
      if (inside({ x, y }, map.coast)) continue;
      const phase = Math.sin(time * 1.4 + i);
      c.fillStyle = phase > 0.3 ? "#a3d2bf88" : "#6cb4b388";
      c.fillRect(x + Math.round(phase * 2), y, 5 + (i % 4), 1);
    }
    for (const h of map.hazards) {
      c.fillStyle = "#d2a9d377";
      c.fillRect(h.x - 1, h.y - 8 + Math.round(Math.sin(time * 2) * 2), 1, 1);
    }
    for (const target of state.targets) {
      if (target.hp <= 0) {
        c.fillStyle = "#849278";
        c.fillRect(target.x - 5, target.y, 3, 2);
        c.fillRect(target.x + 2, target.y - 1, 4, 2);
        continue;
      }
      c.fillStyle = "#55735d55";
      c.fillRect(target.x - 8, target.y + 2, 16, 3);
      c.fillStyle = target.flash ? "#fff0b5" : "#617d78";
      c.fillRect(target.x - 5, target.y - 14, 10, 17);
      c.fillStyle = target.flash ? "#fff6d8" : "#b7b998";
      c.fillRect(target.x - 4, target.y - 15, 8, 3);
      c.fillStyle = "#8eaaa1";
      c.fillRect(target.x - 4, target.y - 11, 2, 11);
      c.fillStyle = "#d8be79";
      c.fillRect(target.x - 1, target.y - 9, 2, 6);
      c.fillRect(target.x - 3, target.y - 7, 6, 2);
      if (target.hp < target.maxHp) {
        c.fillStyle = "#3c5849";
        c.fillRect(target.x - 7, target.y - 20, 14, 2);
        c.fillStyle = "#ebc474";
        c.fillRect(
          target.x - 7,
          target.y - 20,
          (14 * target.hp) / target.maxHp,
          2,
        );
      }
    }
    // Sort trees and player by their ground position so walking behind foliage works.
    const layers = this.island.trees.map((t) => ({
      y: t.y,
      draw: () =>
        c.drawImage(
          this.canopies.get(t),
          Math.round(t.x - 36),
          Math.round(t.y - 71),
        ),
    }));
    layers.push({ y: state.player.y, draw: () => this.drawPlayer(state) });
    layers.sort((a, b) => a.y - b.y);
    for (const layer of layers) layer.draw();
    this.drawSkills(state);
  }
  drawPlayer(state) {
    const c = this.ctx,
      p = state.player,
      x = Math.round(p.x),
      y = Math.round(p.y),
      lift = p.hovering ? 5 + Math.round(Math.sin(state.time * 5)) : 0;
    c.fillStyle = "#35574155";
    c.fillRect(x - 6, y + 4, 12, 3);
    c.fillRect(x - 8, y + 5, 16, 1);
    if (p.invulnerable > 0 && Math.floor(state.time * 12) % 2 === 0)
      c.globalAlpha = 0.5;
    if (this.sprite.complete && this.sprite.naturalWidth) {
      c.save();
      c.translate(x, y - lift);
      if (p.facing.x < -0.1) c.scale(-1, 1);
      c.drawImage(
        this.sprite,
        p.animation.frame * 32,
        p.animation.row * 32,
        32,
        32,
        -16,
        -22,
        32,
        32,
      );
      c.restore();
    }
    c.globalAlpha = 1;
    if (p.moving || ["attack", "fire"].includes(p.animation.name)) {
      c.fillStyle = "#f6dfa277";
      const dx = p.facing.x,
        dy = p.facing.y;
      c.fillRect(Math.round(x + dx * 12), Math.round(y + dy * 10 + 3), 2, 1);
    }
  }
  drawSkills(state) {
    const c = this.ctx;
    for (const p of state.skills.projectiles) {
      for (let i = 3; i >= 0; i--) {
        c.fillStyle = ["#fff2bd", "#f7cb65", "#e79840", "#bd633b"][i];
        const r = 3 - i * 0.5;
        c.fillRect(
          Math.round(p.x - p.dx * i * 3 - r),
          Math.round(p.y - 7 - p.dy * i * 3 - r),
          Math.ceil(r * 2),
          Math.ceil(r * 2),
        );
      }
    }
    for (const e of state.skills.effects) {
      const progress = 1 - e.life / e.maxLife;
      if (e.type === "slash") {
        const base = Math.atan2(e.direction.y, e.direction.x);
        for (let i = 0; i < 11; i++) {
          const angle = base - 0.9 + i * 0.18,
            r = 17 + progress * 12;
          c.fillStyle = i % 2 ? "#f4b450" : "#fff0b3";
          c.fillRect(
            Math.round(e.x + Math.cos(angle) * r),
            Math.round(e.y + Math.sin(angle) * r * 0.7),
            2,
            2,
          );
        }
      } else {
        for (let i = 0; i < 9; i++) {
          const a = i * 2.4,
            r = progress * 15;
          c.fillStyle = i % 2 ? "#ebad51" : "#fff0b2";
          c.fillRect(
            Math.round(e.x + Math.cos(a) * r),
            Math.round(e.y + Math.sin(a) * r),
            2,
            2,
          );
        }
      }
    }
  }
  attach(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }
  ready() {
    return this.sprite.complete && this.sprite.naturalWidth > 0;
  }
}
