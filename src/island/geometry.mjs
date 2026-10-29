export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function inside(point, polygon) {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i],
      b = polygon[j];
    if (
      a[1] > point.y !== b[1] > point.y &&
      point.x < ((b[0] - a[0]) * (point.y - a[1])) / (b[1] - a[1]) + a[0]
    )
      hit = !hit;
  }
  return hit;
}
export function landContains(island, p, radius = 0) {
  return [
    [0, 0],
    [radius, 0],
    [-radius, 0],
    [0, radius],
    [0, -radius],
  ].every(([x, y]) => inside({ x: p.x + x, y: p.y + y }, island.coast));
}
export function canOccupy(island, p, radius = 5) {
  if (!landContains(island, p, radius + 3)) return false;
  for (const tree of island.trees)
    if (Math.hypot(p.x - tree.x, p.y - tree.y) < radius + 5 * tree.size)
      return false;
  for (const rock of island.rocks)
    if (Math.hypot(p.x - rock.x, p.y - rock.y) < radius + rock.r * 0.8)
      return false;
  return true;
}
export function moveWithCollision(island, position, dx, dy, radius = 5) {
  // Substeps prevent crossing a narrow obstacle even on a slow animation frame.
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 2));
  let x = position.x,
    y = position.y;
  for (let i = 0; i < steps; i++) {
    if (canOccupy(island, { x: x + dx / steps, y }, radius)) x += dx / steps;
    if (canOccupy(island, { x, y: y + dy / steps }, radius)) y += dy / steps;
  }
  return { x, y };
}
