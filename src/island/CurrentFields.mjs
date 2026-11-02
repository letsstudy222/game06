/** Dữ liệu dòng chảy độc lập FX; không tích phân chuyển động hoặc ghi world state. */
const finite = (...values) => values.every(Number.isFinite);
export function prepareCurrentFields(fields, map) {
  if (!Array.isArray(fields)) throw Error('CURRENT_FIELDS: cần danh sách');
  const ids = new Set();
  return Object.freeze(fields.map((field) => {
    const fail = (message) => { throw Error(`CURRENT_FIELD ${field?.currentId ?? '?'}: ${message}`); };
    if (!field || typeof field.currentId !== 'string' || !/^[a-zA-Z][\w.-]*$/.test(field.currentId) || ids.has(field.currentId)) fail('ID thiếu hoặc trùng');
    ids.add(field.currentId);
    if (field.mapId !== map.mapId) fail('mapId không khớp');
    const b = field.bounds, d = field.direction;
    if (!b || !finite(b.x, b.y, b.width, b.height) || b.x < 0 || b.y < 0 || b.width <= 0 || b.height <= 0 || b.x + b.width > map.width || b.y + b.height > map.height) fail('bounds ngoài map');
    if (!d || !finite(d.x, d.y, field.strength) || field.strength < 0) fail('vector/strength không hợp lệ');
    const length = Math.hypot(d.x, d.y);
    if (!Number.isFinite(length) || (!length && field.strength > 0)) fail('vector zero không có hướng cho strength dương');
    if (field.enabled !== undefined && typeof field.enabled !== 'boolean') fail('enabled phải boolean');
    for (const key of ['stateBinding', 'visualEffectRef']) if (field[key] !== undefined && (typeof field[key] !== 'string' || !field[key].trim())) fail(`${key} phải là reference`);
    return Object.freeze({ ...field, enabled: field.enabled ?? true, bounds: Object.freeze({ ...b }), direction: Object.freeze(length ? { x: d.x / length, y: d.y / length } : { x: 0, y: 0 }) });
  }));
}
export function getCurrentAt(position, fields, mapState = {}) {
  if (!finite(position.x, position.y)) throw Error('CURRENT_QUERY: vị trí không hợp lệ');
  return fields.filter((field) => {
    const b = field.bounds;
    if (!field.enabled || position.x < b.x || position.y < b.y || position.x >= b.x + b.width || position.y >= b.y + b.height) return false;
    if (field.stateBinding === undefined) return true;
    const enabled = mapState.resolveBinding?.(field.stateBinding);
    if (typeof enabled !== 'boolean') throw Error(`CURRENT_BINDING: chưa resolve ${field.stateBinding}`);
    return enabled;
  }).sort((a, b) => a.currentId < b.currentId ? -1 : a.currentId > b.currentId ? 1 : 0);
}
