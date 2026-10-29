import { canOccupy } from "../src/island/geometry.mjs";
/** QA only: prove the authored corridors connect; not an auto-walk gameplay feature. */
export function route(map, start, end, radius = 7) {
  const step = 4,
    w = Math.ceil(map.width / step),
    h = Math.ceil(map.height / step),
    point = (i) => ({ x: (i % w) * step + 2, y: Math.floor(i / w) * step + 2 }),
    cell = (p) => Math.floor(p.y / step) * w + Math.floor(p.x / step),
    from = cell(start),
    to = cell(end),
    q = [from],
    seen = new Set(q),
    parent = new Map();
  for (let i = 0; i < q.length; i++) {
    const p = q[i];
    if (p === to) break;
    for (const n of [
      p - w,
      p + w,
      ...(p % w ? [p - 1] : []),
      ...(p % w < w - 1 ? [p + 1] : []),
    ]) {
      if (n < 0 || n >= w * h || seen.has(n)) continue;
      const a = point(p),
        b = point(n);
      if (
        !canOccupy(map, b, radius) ||
        !canOccupy(map, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, radius)
      )
        continue;
      seen.add(n);
      parent.set(n, p);
      q.push(n);
    }
  }
  if (!seen.has(to)) return [];
  const result = [];
  let at = to;
  while (at !== from) {
    result.push(point(at));
    at = parent.get(at);
  }
  result.push(point(from));
  return result.reverse();
}
export function corners(path) {
  if (!path.length) return [];
  const out = [path[0]];
  for (let i = 1; i < path.length - 1; i++) {
    const a = path[i - 1],
      p = path[i],
      b = path[i + 1];
    if (p.x - a.x !== b.x - p.x || p.y - a.y !== b.y - p.y) out.push(p);
  }
  out.push(path.at(-1));
  return out;
}
