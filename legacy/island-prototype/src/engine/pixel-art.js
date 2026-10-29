/* Original raster primitives: every edge is an integer pixel, never antialiased. */
(function (root) {
  "use strict";
  class Surface {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.data = new Uint8ClampedArray(width * height * 4);
    }
    pixel(x, y, color) {
      x = Math.round(x);
      y = Math.round(y);
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
      if (
        this.clip &&
        (x < this.clip.x ||
          y < this.clip.y ||
          x >= this.clip.x + this.clip.width ||
          y >= this.clip.y + this.clip.height)
      )
        return;
      const n = (y * this.width + x) * 4,
        v = parseInt(color.slice(1), 16);
      this.data[n] = (v >> 16) & 255;
      this.data[n + 1] = (v >> 8) & 255;
      this.data[n + 2] = v & 255;
      this.data[n + 3] = 255;
    }
    rect(x, y, w, h, color) {
      for (let j = Math.round(y); j < Math.round(y + h); j++)
        for (let i = Math.round(x); i < Math.round(x + w); i++)
          this.pixel(i, j, color);
    }
    line(x0, y0, x1, y1, color) {
      x0 = Math.round(x0);
      y0 = Math.round(y0);
      x1 = Math.round(x1);
      y1 = Math.round(y1);
      let dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1,
        dy = -Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1,
        err = dx + dy;
      while (true) {
        this.pixel(x0, y0, color);
        if (x0 === x1 && y0 === y1) break;
        const e = 2 * err;
        if (e >= dy) {
          err += dy;
          x0 += sx;
        }
        if (e <= dx) {
          err += dx;
          y0 += sy;
        }
      }
    }
    poly(points, color) {
      const top = Math.floor(Math.min(...points.map((p) => p[1]))),
        bottom = Math.ceil(Math.max(...points.map((p) => p[1])));
      for (let y = top; y <= bottom; y++) {
        const xs = [];
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
          const a = points[j],
            b = points[i];
          if (a[1] > y + 0.5 !== b[1] > y + 0.5)
            xs.push(a[0] + ((y + 0.5 - a[1]) * (b[0] - a[0])) / (b[1] - a[1]));
        }
        xs.sort((a, b) => a - b);
        for (let i = 0; i < xs.length; i += 2)
          for (let x = Math.ceil(xs[i] - 0.5); x < xs[i + 1] - 0.5; x++)
            this.pixel(x, y, color);
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i],
          b = points[(i + 1) % points.length];
        this.line(...a, ...b, color);
      }
    }
  }
  if (typeof module !== "undefined" && module.exports) module.exports = Surface;
  (root.TinyFarm = root.TinyFarm || {}).PixelSurface = Surface;
})(typeof globalThis !== "undefined" ? globalThis : this);
