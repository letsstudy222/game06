(function (root) {
  "use strict";
  const app = root.TinyFarm;
  class Phoenix {
    constructor(definition = app.Content.pets.phoenix) {
      this.definition = definition;
      this.position = { x: 255, y: 162 };
      this.target = { ...this.position };
      this.form = 3;
      this.mode = "idle";
      this.until = 0;
      this.time = 0;
      this.particles = [];
      this.atlases = {};
      for (const [form, url] of Object.entries(definition.forms)) {
        const image = new Image();
        image.src = url;
        this.atlases[form] = image;
      }
      this.atlas = this.atlases[3];
    }
    setForm(form) {
      this.form = [1, 2, 3].includes(form) ? form : 3;
      this.atlas = this.atlases[this.form];
    }
    teleport(x, y) {
      Object.assign(this.position, { x, y });
      Object.assign(this.target, { x, y });
      this.mode = "idle";
      this.particles = [];
    }
    play(mode, time, duration) {
      if (!this.definition.animations[mode]) return;
      this.mode = mode;
      this.until = time + duration;
      if (mode === "flare") this.burst();
    }
    burst() {
      for (let i = 0; i < 22; i++)
        this.particles.push({
          x: this.position.x,
          y: this.position.y - 10,
          vx: (Math.random() - 0.5) * 20,
          vy: -5 - Math.random() * 18,
          life: 0.7 + Math.random(),
        });
    }
    update(dt, time, player) {
      this.time = time;
      if (time > this.until) this.mode = "idle";
      this.target.x = player.x + 24;
      this.target.y = player.y - 4;
      if (this.mode === "fly") {
        this.target.x += Math.cos(time * 2) * 10;
        this.target.y -= 8 + Math.sin(time * 2) * 5;
      }
      const follow = 1 - Math.exp(-dt * 4);
      this.position.x += (this.target.x - this.position.x) * follow;
      this.position.y += (this.target.y - this.position.y) * follow;
      for (const p of this.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }
      this.particles = this.particles.filter((p) => p.life > 0);
    }
    frame(time = this.time, mode = this.mode) {
      const a =
        this.definition.animations[mode] || this.definition.animations.idle;
      return {
        column:
          Math.floor((app.Settings.get("motion") ? time : 0) * a.fps) %
          a.frames,
        row: a.row,
      };
    }
    drawSprite(ctx, x, y, time = this.time, mode = this.mode) {
      if (!this.atlas.complete || !this.atlas.naturalWidth) return;
      const f = this.frame(time, mode),
        d = this.definition;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        this.atlas,
        f.column * d.frameWidth,
        f.row * d.frameHeight,
        d.frameWidth,
        d.frameHeight,
        Math.round(x - d.origin[0]),
        Math.round(y - d.origin[1]),
        d.frameWidth,
        d.frameHeight,
      );
    }
    render(ctx) {
      const x = Math.round(this.position.x),
        y = Math.round(this.position.y);
      ctx.fillStyle = "#24382d55";
      ctx.fillRect(x - 6, y + 5, 12, 2);
      if (this.mode === "flare") {
        ctx.strokeStyle = "#ffe6a1";
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 14, y - 4, 28, 10);
        ctx.strokeStyle = "#c88146";
        ctx.strokeRect(x - 11, y - 2, 22, 6);
      }
      this.drawSprite(ctx, x, y);
      for (const p of this.particles) {
        ctx.fillStyle = p.life > 0.7 ? "#ffe39b" : "#d78449";
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
      }
    }
    portrait(canvas, time = this.time) {
      const c = canvas.getContext("2d");
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = "#293d31";
      c.fillRect(0, 0, canvas.width, canvas.height);
      this.drawSprite(c, canvas.width / 2, canvas.height / 2 + 7, time, "idle");
    }
    ready() {
      return this.atlas.complete && this.atlas.naturalWidth > 0;
    }
  }
  app.Phoenix = Phoenix;
  app.PetTypes = { phoenix: Phoenix };
  app.createPet = (id) => {
    const definition = app.Content.pets[id];
    if (!definition || !app.PetTypes[definition.type])
      throw new Error("Unknown pet type: " + id);
    return new app.PetTypes[definition.type](definition);
  };
})(window);
