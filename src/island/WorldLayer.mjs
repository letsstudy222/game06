/** True tile renderer. Semantic cells select reusable atlas tiles; no world image. */
export class WorldLayer {
  constructor(image, island, metadata) {
    this.image = image;
    this.map = island.tilemap;
    this.meta = metadata;
    this.tileSize = this.map.tileSize;
    this.drawCount = 0;
    this.sample = metadata.profile === "sample";
  }
  cell(x, y) {
    return this.map.ground[y]?.[x] || "deep";
  }
  isLand(x, y) {
    return !["deep", "shallow"].includes(this.cell(x, y));
  }
  mask(x, y, predicate) {
    return [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ].reduce(
      (m, [dx, dy], i) =>
        m | (predicate(this.cell(x + dx, y + dy)) ? 1 << i : 0),
      0,
    );
  }
  visibleTiles(camera, w, h) {
    const s = this.tileSize,
      result = [];
    for (
      let y = Math.max(0, Math.floor(camera.y / s));
      y < Math.min(this.map.rows, Math.ceil((camera.y + h) / s));
      y++
    )
      for (
        let x = Math.max(0, Math.floor(camera.x / s));
        x < Math.min(this.map.columns, Math.ceil((camera.x + w) / s));
        x++
      )
        result.push({
          x: x * s,
          y: y * s,
          width: s,
          height: s,
          column: x,
          row: y,
        });
    return result;
  }
  tile(ctx, id, x, y) {
    const def = this.meta.tileDefinitions[id];
    if (!def) throw Error("Missing tile " + id);
    const s = this.tileSize;
    ctx.drawImage(
      this.image,
      (def.frame % this.meta.columns) * s,
      Math.floor(def.frame / this.meta.columns) * s,
      s,
      s,
      x * s,
      y * s,
      s,
      s,
    );
    this.drawCount++;
  }
  draw(ctx, camera, w, h, time = 0) {
    this.drawCount = 0;
    const frame = Math.floor(time * 2) % 4;
    for (const { column: x, row: y } of this.visibleTiles(camera, w, h)) {
      const kind = this.cell(x, y),
        v = (x * 7 + y * 11) % 4;
      if (["deep", "shallow"].includes(kind)) {
        this.tile(ctx, kind + "_" + ((frame + ((x + y) % 2)) % 4), x, y);
        continue;
      }
      if (kind === "sand") {
        this.tile(ctx, "shallow_" + frame, x, y);
        const mask = this.mask(x, y, (k) => !["deep", "shallow"].includes(k));
        this.tile(
          ctx,
          mask === 15
            ? "sand_" + (v % 3)
            : "shore_" + mask + (this.sample ? "_" + frame : ""),
          x,
          y,
        );
        if (this.sample) {
          const water = (a, b) => ["deep", "shallow"].includes(this.cell(a, b));
          for (const [id, dx, dy] of [
            ["NW", -1, -1],
            ["NE", 1, -1],
            ["SE", 1, 1],
            ["SW", -1, 1],
          ])
            if (!water(x + dx, y) && !water(x, y + dy) && water(x + dx, y + dy))
              this.tile(ctx, "shoreCorner" + id, x, y);
        }
        continue;
      }
      if (kind === "grass" || kind === "path") {
        this.tile(ctx, "sand_" + (v % 3), x, y);
        const mask = this.mask(
          x,
          y,
          (k) => !["sand", "deep", "shallow"].includes(k),
        );
        const mood = this.sample ? this.map.mood?.[y]?.[x] : null,
          prefix =
            mood === "forest"
              ? "grassCool"
              : mood === "forestEdge"
                ? "grassMid"
                : "grass";
        this.tile(
          ctx,
          mask === 15 ? prefix + "_" + v : prefix + "Edge_" + mask,
          x,
          y,
        );
        if (this.sample && this.cell(x, y + 1) === "cliff")
          this.tile(ctx, "topRim", x, y);
        if (kind === "path")
          this.tile(
            ctx,
            "path_" +
              this.mask(x, y, (k) =>
                ["path", "stairs", "floor", "moss", "stonePath"].includes(k),
              ),
            x,
            y,
          );
        continue;
      }
      this.tile(
        ctx,
        this.sample && kind === "rim"
          ? (this.map.elevation?.[y - 1]?.[x] ?? 0) <
            (this.map.elevation?.[y]?.[x] ?? 1)
            ? "rimBack"
            : (this.map.elevation?.[y]?.[x - 1] ?? 0) < this.map.elevation[y][x]
              ? "rimLeft"
              : "rimRight"
          : kind === "stonePath"
            ? "stonePath_" + v
            : this.sample && ["cliff", "cliffFoot"].includes(kind)
              ? kind + "_" + v
              : this.sample && kind === "stairs"
                ? this.cell(x, y - 1) !== "stairs"
                  ? "stairsTop"
                  : this.cell(x, y + 1) !== "stairs"
                    ? "stairsBottom"
                    : "stairs"
                : kind === "floor"
                  ? "floor_" + (v % 3)
                  : kind === "moss"
                    ? "moss_" + (v % 2)
                    : kind,
        x,
        y,
      );
      if (this.sample && kind === "cliff") {
        if (this.cell(x - 1, y) === "stairs")
          this.tile(ctx, "cliffEndLeft", x, y);
        if (this.cell(x + 1, y) === "stairs")
          this.tile(ctx, "cliffEndRight", x, y);
      }
    }
  }
}
