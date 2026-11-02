export const TILE = 32;
export const PLAYER_RADIUS = 10;
export const MAP_FILES = ["A1", "B1", "LAB", "ARENA"].map(
  (n) => `VS_${n}_FLOORPLAN_AUDITED.json`,
);
export const center = (e) => ({ x: (e.x + 0.5) * TILE, y: (e.y + 0.5) * TILE });
export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function adaptMaps(raw) {
  const maps = Object.fromEntries(
    raw.map((d) => [
      d.id,
      { ...d, width: d.size_tiles[0] * TILE, height: d.size_tiles[1] * TILE },
    ]),
  );
  if (Object.keys(maps).length !== 4 || raw.length !== 4)
    throw Error("Expected four unique rooms");
  const sizes = {
    "VS-A1": [36, 32],
    "VS-B1": [64, 48],
    "VS-LAB": [48, 40],
    "VS-ARENA": [48, 48],
  };
  for (const m of Object.values(maps)) {
    if (
      !sizes[m.id] ||
      m.schema !== "prototype_tilemap.v0.1" ||
      m.tile_px !== TILE ||
      m.size_tiles.some((v, i) => v !== sizes[m.id][i])
    )
      throw Error(`Invalid dimensions/schema: ${m.id}`);
    if (
      m.collision_rows.length !== m.size_tiles[1] ||
      m.collision_rows.some(
        (r) => r.length !== m.size_tiles[0] || /[^.#]/.test(r),
      )
    )
      throw Error(`Invalid grid: ${m.id}`);
    const ids = new Set();
    for (const e of m.entities) {
      if (ids.has(e.id)) throw Error(`Duplicate entity: ${e.id}`);
      ids.add(e.id);
      if (
        e.x !== undefined &&
        (!Number.isInteger(e.x) ||
          !Number.isInteger(e.y) ||
          !m.collision_rows[e.y]?.[e.x])
      )
        throw Error(`Invalid entity position: ${e.id}`);
      if (
        e.type === "dynamic_gate" &&
        e.affected_cells.some(([x, y]) => m.collision_rows[y]?.[x] !== ".")
      )
        throw Error(`Invalid gate cells: ${e.id}`);
      if (e.type === "transition") {
        const target = maps[e.target],
          a = target?.entities.find((a) => a.id === e.entry_anchor),
          exit = m.exits.find((x) => x.id === e.id);
        if (
          !target ||
          !a ||
          a.type !== "entry_anchor" ||
          !exit ||
          exit.target !== e.target ||
          exit.target_anchor !== e.entry_anchor
        )
          throw Error(`Unresolved transition: ${e.id}`);
        if (!canOccupy(target, center(a), {}, PLAYER_RADIUS))
          throw Error(`Unsafe anchor: ${a.id}`);
        if (
          target.entities.some(
            (t) => t.type === "transition" && inTrigger(center(a), t),
          )
        )
          throw Error(`Anchor inside portal: ${a.id}`);
      }
    }
    for (const exit of m.exits)
      if (!ids.has(exit.id) || (!exit.disabled && !exit.target))
        throw Error(`Invalid exit: ${exit.id}`);
  }
  return maps;
}
export function cellSolid(map, x, y, flags = {}) {
  if (map.collision_rows[y]?.[x] !== ".") return true;
  return map.entities.some(
    (e) =>
      e.type === "dynamic_gate" &&
      !flags[e.open_when] &&
      e.affected_cells.some(([a, b]) => a === x && b === y),
  );
}
export function canOccupy(map, p, flags = {}, radius = PLAYER_RADIUS) {
  if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return false;
  for (
    let y = Math.floor((p.y - radius) / TILE);
    y <= Math.floor((p.y + radius) / TILE);
    y++
  )
    for (
      let x = Math.floor((p.x - radius) / TILE);
      x <= Math.floor((p.x + radius) / TILE);
      x++
    ) {
      if (!cellSolid(map, x, y, flags)) continue;
      const nx = Math.max(x * TILE, Math.min(p.x, (x + 1) * TILE)),
        ny = Math.max(y * TILE, Math.min(p.y, (y + 1) * TILE));
      if (
        (nx - p.x) ** 2 + (ny - p.y) ** 2 < radius ** 2 ||
        (radius === 0 && map.collision_rows[y]?.[x] !== ".")
      )
        return false;
    }
  return true;
}
export function move(map, p, dx, dy, flags, radius = PLAYER_RADIUS) {
  const n = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 2));
  let q = { x: p.x, y: p.y };
  for (let i = 0; i < n; i++) {
    if (canOccupy(map, { x: q.x + dx / n, y: q.y }, flags, radius))
      q.x += dx / n;
    if (canOccupy(map, { x: q.x, y: q.y + dy / n }, flags, radius))
      q.y += dy / n;
  }
  return q;
}
export function inTrigger(p, e) {
  const c = center(e);
  return (
    Math.abs(p.x - c.x) <= (TILE * (e.width_tiles || 1)) / 2 &&
    Math.abs(p.y - c.y) <= TILE
  );
}
export function reachable(map, start, flags = {}, radius = PLAYER_RADIUS) {
  const key = (x, y) => `${x},${y}`,
    seen = new Set(),
    queue = [];
  const sx = Math.floor(start.x / TILE),
    sy = Math.floor(start.y / TILE);
  if (!canOccupy(map, center({ x: sx, y: sy }), flags, radius)) return seen;
  seen.add(key(sx, sy));
  queue.push([sx, sy]);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    for (const [a, b] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (
        seen.has(key(a, b)) ||
        !canOccupy(map, center({ x: a, y: b }), flags, radius)
      )
        continue;
      seen.add(key(a, b));
      queue.push([a, b]);
    }
  }
  return seen;
}
// Cached per actor/goal cell and gate state; movement still sweeps the real collider.
export function navigation(map, goal, flags, radius) {
  const queue = [],
    field = new Map(),
    gx = Math.floor(goal.x / TILE),
    gy = Math.floor(goal.y / TILE);
  if (!canOccupy(map, center({ x: gx, y: gy }), flags, radius)) return field;
  queue.push([gx, gy]);
  field.set(`${gx},${gy}`, null);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    for (const [a, b] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      const key = `${a},${b}`;
      if (
        field.has(key) ||
        !canOccupy(map, center({ x: a, y: b }), flags, radius)
      )
        continue;
      field.set(key, center({ x, y }));
      queue.push([a, b]);
    }
  }
  return field;
}
