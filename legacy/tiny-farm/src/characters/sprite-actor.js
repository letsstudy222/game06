(function (root) {
  "use strict";
  const app = root.TinyFarm;
  class SpriteActor {
    constructor(definition) {
      this.definition = definition;
      this.image = new Image();
      this.image.src = definition.art;
    }
    ready() {
      return this.image.complete && this.image.naturalWidth > 0;
    }
    draw(ctx, x, y, { facing = "down", frame = 1 } = {}) {
      if (!this.ready()) return;
      const d = this.definition,
        row = { down: 0, left: 1, right: 2, up: 3 }[facing] ?? 0;
      const [sx, sy, sw, sh] = d.frames
        ? d.frames[row][frame % d.frames[row].length]
        : d.bounds;
      const scale = (d.logicalHeight || 27) / (d.referenceHeight || sh);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        this.image,
        sx,
        sy,
        sw,
        sh,
        Math.round(x - (sw * scale) / 2),
        Math.round(y - sh * scale),
        sw * scale,
        sh * scale,
      );
    }
  }
  app.SpriteActor = SpriteActor;
})(window);
