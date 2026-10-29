/** A hand-painted production ground layer, culled as chunks; never generated shapes. */
export class WorldLayer {
  constructor(image, width, height, tileSize = 160) {
    Object.assign(this, { image, width, height, tileSize });
  }
  chunks(camera, viewWidth, viewHeight) {
    const n = this.tileSize,
      result = [];
    const left = Math.max(0, Math.floor(camera.x / n)),
      top = Math.max(0, Math.floor(camera.y / n)),
      right = Math.min(
        Math.ceil(this.width / n),
        Math.ceil((camera.x + viewWidth) / n),
      ),
      bottom = Math.min(
        Math.ceil(this.height / n),
        Math.ceil((camera.y + viewHeight) / n),
      );
    for (let y = top; y < bottom; y++)
      for (let x = left; x < right; x++)
        result.push({
          x: x * n,
          y: y * n,
          width: Math.min(n, this.width - x * n),
          height: Math.min(n, this.height - y * n),
        });
    return result;
  }
  draw(ctx, camera, viewWidth, viewHeight) {
    for (const r of this.chunks(camera, viewWidth, viewHeight))
      ctx.drawImage(
        this.image,
        r.x,
        r.y,
        r.width,
        r.height,
        r.x,
        r.y,
        r.width,
        r.height,
      );
  }
}
