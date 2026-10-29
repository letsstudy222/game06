import { WorldLayer } from "./WorldLayer.mjs";
import { distance } from "./geometry.mjs";
/** Production images only for world/props/hero. Primitives below are lighting/FX. */
export class IslandScene {
  constructor(island, assets) {
    this.island = island;
    this.assets = assets;
    this.world = assets.get("world");
    this.sprite = assets.get("phoenix");
    this.props = assets.get("props");
    this.meta = assets.manifest;
    this.ground = new WorldLayer(this.world, island.width, island.height, 160);
    this.idleCache = new Map();
    this.prepareIdle();
  }
  attach(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }
  ready() {
    return (
      !!this.sprite.naturalWidth &&
      !!this.world.naturalWidth &&
      !!this.props.naturalWidth
    );
  }
  direction(player) {
    return Math.abs(player.facing.y) > Math.abs(player.facing.x)
      ? player.facing.y < 0
        ? "up"
        : "down"
      : player.facing.x < 0
        ? "left"
        : "right";
  }
  prepareIdle() {
    // Four subtle, pixel-registered feather motions from a single consistent pose.
    for (const direction of ["down", "left", "up"]) {
      const d = this.meta.phoenix.directions[direction],
        row = d.row,
        frames = [];
      for (let phase = 0; phase < 4; phase++) {
        const c = document.createElement("canvas");
        c.width = c.height = 96;
        const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        const src = document.createElement("canvas");
        src.width = src.height = 96;
        src
          .getContext("2d")
          .drawImage(this.sprite, 0, row * 96, 96, 96, 0, 0, 96, 96);
        const pixels = src.getContext("2d").getImageData(0, 0, 96, 96),
          out = ctx.createImageData(96, 96);
        for (let y = 0; y < 96; y++)
          for (let x = 0; x < 96; x++) {
            const tail = y > d.origin[1] - 7,
              wing = y < d.origin[1] - 22 && Math.abs(x - d.origin[0]) > 14;
            const dx = tail
                ? Math.round(
                    (Math.sin((phase * Math.PI) / 2) * (y - d.origin[1] + 7)) /
                      17,
                  )
                : 0,
              dy = wing && phase % 2 ? 1 : 0,
              nx = x + dx,
              ny = y + dy;
            if (nx < 0 || nx >= 96 || ny >= 96) continue;
            const a = (y * 96 + x) * 4,
              b = (ny * 96 + nx) * 4;
            if (pixels.data[a + 3])
              out.data.set(pixels.data.subarray(a, a + 4), b);
          }
        ctx.putImageData(out, 0, 0);
        frames.push(c);
      }
      this.idleCache.set(direction, frames);
    }
  }
  prop(ctx, id, x, y, alpha = 1, scale = 1) {
    const env = this.meta.environment,
      def = env.definitions.find((p) => p.id === id);
    if (!def) return;
    const i = def.frame;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(
      this.props,
      (i % 2) * 96,
      Math.floor(i / 2) * 96,
      96,
      96,
      Math.round(x - env.origin[0] * scale),
      Math.round(y - env.origin[1] * scale),
      96 * scale,
      96 * scale,
    );
    ctx.restore();
  }
  draw(state) {
    const c = this.ctx,
      cam = state.camera,
      time = state.time,
      w = this.canvas.width,
      h = this.canvas.height;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, w, h);
    // ResponsiveLayout guarantees the viewport stays inside the authored world.
    c.translate(-cam.renderX, -cam.renderY);
    this.ground.draw(c, { x: cam.renderX, y: cam.renderY }, w, h);
    this.drawAmbient(state);
    for (const r of this.island.rocks) this.prop(c, r.asset, r.x, r.y);
    for (const b of this.island.bushes) this.prop(c, b.asset, b.x, b.y);
    for (const b of this.island.hazards) this.prop(c, b.asset, b.x, b.y);
    for (const p of this.island.props) this.prop(c, p.asset, p.x, p.y);
    const layers = this.island.trees.map((t) => ({
      y: t.y,
      draw: () => {
        const p = state.player,
          behind = p.y < t.y && p.y > t.y - 80 && Math.abs(p.x - t.x) < 38;
        this.prop(c, t.asset, t.x, t.y, behind ? 0.55 : 1, t.size);
      },
    }));
    layers.push({ y: state.player.y, draw: () => this.drawPlayer(state) });
    layers.sort((a, b) => a.y - b.y);
    for (const l of layers) l.draw();
    this.drawSkills(state);
    this.drawShrine(state);
  }
  drawAmbient(state) {
    const c = this.ctx,
      t = state.time;
    // Hand-placed surf segments; no random object placement or generated terrain.
    for (const line of this.island.foam)
      for (let j = 1; j < line.length; j++) {
        const a = line[j - 1],
          b = line[j],
          n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 5);
        for (let k = 0; k < n; k++) {
          const f = k / n,
            pulse = (Math.sin(t * 1.5 + k * 0.28) + 1) / 2;
          c.globalAlpha = 0.12 + pulse * 0.18;
          c.fillStyle = "#d9f0d8";
          c.fillRect(
            Math.round(a[0] + (b[0] - a[0]) * f),
            Math.round(a[1] + (b[1] - a[1]) * f + Math.sin(t + k) * 1.5),
            3,
            1,
          );
        }
      }
    c.globalAlpha = 1;
    for (const [index, p] of this.island.ambient.entries()) {
      const x = Math.round(p.x + Math.sin(t * 0.8 + index) * 5),
        y = Math.round(p.y + Math.cos(t + index) * 3);
      if (p.type === "butterfly") {
        c.fillStyle = "#efd5a1";
        c.fillRect(x, y, 1, 1);
        c.fillRect(x - 2, y - Math.round(Math.sin(t * 8)), 2, 1);
        c.fillRect(x + 1, y - Math.round(Math.sin(t * 8)), 2, 1);
      } else {
        c.globalAlpha = 0.3 + Math.sin(t * 2 + index) * 0.25;
        c.fillStyle = "#ffd679";
        c.fillRect(x, y - ((t * 5 + index * 7) % 14), 1, 2);
      }
    }
    c.globalAlpha = 1;
  }
  drawPlayer(state) {
    const c = this.ctx,
      p = state.player,
      direction = this.direction(p),
      d = this.meta.phoenix.directions[direction],
      isIdle = p.animation.name === "idle",
      phase = Math.floor(p.animation.elapsed * 3) % 4,
      pose = ["fly", "move"].includes(p.animation.name)
        ? p.animation.frame % 2
        : p.animation.name === "attack"
          ? p.animation.frame === 1
            ? 1
            : 0
          : p.animation.name === "fire"
            ? p.animation.frame > 1
              ? 1
              : 0
            : p.animation.name === "hurt"
              ? 1
              : 0;
    const x = Math.round(p.x),
      y = Math.round(p.y),
      lift = p.hovering ? 10 + Math.round(Math.sin(state.time * 4) * 2) : 0;
    // Shadow is a pixel row mask, independent from actor height.
    c.fillStyle = "#192e253f";
    c.fillRect(x - 13, y + 3, 26, 3);
    c.fillRect(x - 17, y + 4, 34, 1);
    c.fillStyle = "#182b2529";
    c.fillRect(x - 10, y + 6, 20, 2);
    let dx = 0,
      dy = 0;
    if (p.animation.name === "hurt")
      dx = Math.round(Math.sin(p.animation.elapsed * 45) * 2);
    if (p.animation.name === "attack") {
      dx = Math.round(p.facing.x * Math.sin(p.animation.elapsed * 12) * 3);
      dy = Math.round(p.facing.y * Math.sin(p.animation.elapsed * 12) * 2);
    }
    c.save();
    c.translate(x + dx, y - lift + dy);
    if (d.mirror) c.scale(-1, 1);
    if (p.invulnerable > 0 && Math.floor(state.time * 14) % 2 === 0)
      c.globalAlpha = 0.62;
    if (isIdle)
      c.drawImage(
        this.idleCache.get(direction === "right" ? "left" : direction)[phase],
        -d.origin[0],
        -d.origin[1],
      );
    else
      c.drawImage(
        this.sprite,
        pose * 96,
        d.row * 96,
        96,
        96,
        -d.origin[0],
        -d.origin[1],
        96,
        96,
      );
    c.restore();
  }
  drawSkills(state) {
    const c = this.ctx;
    for (const p of state.skills.projectiles) {
      const charge = p.charge || 0;
      for (let i = 4; i >= 0; i--) {
        c.fillStyle = ["#fff2cb", "#fbd277", "#eaa14a", "#c45d38", "#8f3440"][
          i
        ];
        const r = charge > 0 ? Math.max(1, 4 - charge * 10) : 4 - i * 0.55;
        c.fillRect(
          Math.round(p.x - p.dx * i * 3 - r),
          Math.round(p.y - 22 - p.dy * i * 3 - r),
          Math.ceil(r * 2),
          Math.ceil(r * 2),
        );
      }
      if (charge > 0) {
        c.fillStyle = "#ffe8a5";
        c.fillRect(Math.round(p.x - 7), Math.round(p.y - 23), 2, 1);
        c.fillRect(Math.round(p.x + 6), Math.round(p.y - 24), 1, 2);
      }
    }
    for (const e of state.skills.effects) {
      const progress = 1 - e.life / e.maxLife;
      if (e.type === "slash") {
        const base = Math.atan2(e.direction.y, e.direction.x);
        for (let i = 0; i < 18; i++) {
          const a = base - 1 + i * 0.12,
            r = 25 + progress * 12;
          c.fillStyle = i % 3 ? "#ffdc8d" : "#cf773f";
          c.fillRect(
            Math.round(e.x + Math.cos(a) * r),
            Math.round(e.y - 16 + Math.sin(a) * r * 0.65),
            i % 3 ? 3 : 2,
            2,
          );
        }
      } else
        for (let i = 0; i < 13; i++) {
          const a = i * 2.4,
            r = progress * 18;
          c.fillStyle = i % 2 ? "#e6a44c" : "#fff1be";
          c.fillRect(
            Math.round(e.x + Math.cos(a) * r),
            Math.round(e.y - 17 + Math.sin(a) * r),
            2,
            2,
          );
        }
    }
  }
  drawShrine(state) {
    const c = this.ctx,
      s = this.island.shrine;
    if (state.shrineActivated) {
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8 + state.time * 0.25,
          x = s.x + Math.cos(a) * 33,
          y = s.y + Math.sin(a) * 15;
        c.fillStyle = i % 2 ? "#ffe7a5" : "#e8b757";
        c.globalAlpha = 0.5 + Math.sin(state.time * 2 + i) * 0.25;
        c.fillRect(
          Math.round(x),
          Math.round(y - 8 - Math.sin(state.time + i) * 3),
          2,
          2,
        );
      }
      c.globalAlpha = 1;
    }
  }
  portrait(canvas) {
    const c = canvas.getContext("2d");
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(
      this.sprite,
      0,
      0,
      96,
      96,
      -4,
      -4,
      canvas.width + 8,
      canvas.height + 8,
    );
  }
}
