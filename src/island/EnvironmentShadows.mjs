/** Pixel masks projected from each object's silhouette; never blur the world. */
export function drawEnvironmentShadows(ctx, image, definitions, island) {
  const byId = new Map(definitions.map((d) => [d.id, d]));
  for (const obj of [
    ...island.trees,
    ...island.rocks,
    ...island.bushes,
    ...island.props,
    ...island.hazards,
  ]) {
    const def = byId.get(obj.asset),
      shadow = def?.shadow;
    if (!shadow) continue;
    const [sx, sy, w, h] = shadow.rect,
      [ax, ay] = shadow.origin,
      scale = obj.size || 1;
    ctx.drawImage(
      image,
      sx,
      sy,
      w,
      h,
      Math.round(obj.x - ax * scale),
      Math.round(obj.y - ay * scale),
      w * scale,
      h * scale,
    );
  }
}
