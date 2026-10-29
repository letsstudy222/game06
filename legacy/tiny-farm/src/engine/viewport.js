(function (root) {
  "use strict";
  const app = (root.TinyFarm = root.TinyFarm || {});
  class Viewport {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = 480;
      this.height = 270;
      this.camera = { x: 0, y: 0 };
      this.scale = 1;
      canvas.width = this.width;
      canvas.height = this.height;
      this.onResize = () => this.fit();
      window.addEventListener("resize", this.onResize);
      this.fit();
    }
    fit() {
      const availableW = Math.max(240, window.innerWidth - 24),
        availableH = Math.max(220, window.innerHeight - 100);
      const fit = Math.min(
        availableW / this.width,
        availableH / this.height,
        3,
      );
      this.scale = fit >= 1 ? Math.floor(fit) : fit;
      const shell = document.querySelector(".game-shell");
      if (shell) {
        shell.style.width = this.width * this.scale + "px";
        shell.style.height = this.height * this.scale + "px";
        shell.style.setProperty("--game-scale", this.scale);
      }
    }
    follow(player) {
      this.camera.y = Math.round(
        Math.max(
          0,
          Math.min(
            app.Content.maps[app.Content.defaultMap].height - this.height,
            player.y - this.height / 2,
          ),
        ),
      );
    }
    begin(ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.translate(0, -this.camera.y);
    }
    toWorld(clientX, clientY) {
      const r = this.canvas.getBoundingClientRect();
      return {
        x: ((clientX - r.left) * this.width) / r.width,
        y: ((clientY - r.top) * this.height) / r.height + this.camera.y,
      };
    }
    toScreen(x, y) {
      const r = this.canvas.getBoundingClientRect();
      return {
        x: r.left + (x / this.width) * r.width,
        y: r.top + ((y - this.camera.y) / this.height) * r.height,
      };
    }
    snapshot() {
      return {
        width: this.width,
        height: this.height,
        scale: this.scale,
        camera: { ...this.camera },
      };
    }
  }
  app.Viewport = Viewport;
})(window);
