/** Primitive trình bày 2D; không ghi pose, collision hoặc combat facing. */
export const DIRECTIONS_8 = Object.freeze(['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne']);
const finite = (...values) => values.every(Number.isFinite);
export function worldToScreen(position, camera) {
  if (!finite(position.x, position.y, camera.x, camera.y)) throw new Error('Tọa độ render không hợp lệ');
  return { x: Math.round(position.x) - Math.round(camera.x), y: Math.round(position.y) - Math.round(camera.y) };
}
export function direction8(facing, stationary = 's') {
  if (!finite(facing.x, facing.y) || !DIRECTIONS_8.includes(stationary)) throw new Error('Facing không hợp lệ');
  if (!facing.x && !facing.y) return stationary;
  return DIRECTIONS_8[(Math.round(Math.atan2(facing.y, facing.x) / (Math.PI / 4)) + 8) % 8];
}
export function resolveDirectionalClip(direction, directions, clips, fallbacks = {}) {
  if (!DIRECTIONS_8.includes(direction) || !directions || !Array.isArray(clips)) throw new Error('Directional metadata không hợp lệ');
  const visited = new Set();
  let visualDirection = direction;
  while (!Object.hasOwn(directions, visualDirection)) {
    if (visited.has(visualDirection)) throw new Error('Directional fallback có vòng');
    visited.add(visualDirection);
    const next = Object.hasOwn(fallbacks, visualDirection) ? fallbacks[visualDirection] : undefined;
    if (!DIRECTIONS_8.includes(next)) throw new Error(`Thiếu directional clip: ${direction}`);
    visualDirection = next;
  }
  const entry = directions[visualDirection];
  if (!entry || typeof entry.clipId !== 'string' || !clips.some(c => c?.id === entry.clipId) || (entry.mirror !== undefined && typeof entry.mirror !== 'boolean')) throw new Error('Clip reference hoặc mirror không hợp lệ');
  return { requestedDirection: direction, visualDirection, clipId: entry.clipId, mirror: entry.mirror === true, fallbackUsed: visualDirection !== direction };
}
export function prepareSpriteFrame(frame, imageSize) {
  const r = frame?.rect, a = frame?.anchor;
  if (!Array.isArray(r) || r.length !== 4 || !r.every(Number.isSafeInteger) || r[0] < 0 || r[1] < 0 || r[2] <= 0 || r[3] <= 0 || !imageSize || ![imageSize.width, imageSize.height].every(Number.isSafeInteger) || imageSize.width <= 0 || imageSize.height <= 0 || r[0] + r[2] > imageSize.width || r[1] + r[3] > imageSize.height) throw new Error('Frame rect ngoài atlas');
  if (!Array.isArray(a) || a.length !== 2 || !a.every(Number.isFinite) || a[0] < 0 || a[1] < 0 || a[0] > r[2] || a[1] > r[3]) throw new Error('Frame anchor không hợp lệ');
  const b = frame.bounds;
  if (b !== undefined && (!Array.isArray(b) || b.length !== 4 || !b.every(Number.isFinite) || b[0] < 0 || b[1] < 0 || b[2] <= b[0] || b[3] <= b[1] || b[2] > r[2] || b[3] > r[3])) throw new Error('Visual bounds không hợp lệ');
  return Object.freeze({ rect: Object.freeze([...r]), anchor: Object.freeze([...a]), ...(b === undefined ? {} : { bounds: Object.freeze([...b]) }) });
}
export function drawPreparedSprite(ctx, image, frame, position, { scale = 1, mirror = false } = {}) {
  if (!finite(position.x, position.y) || !Number.isSafeInteger(scale) || scale <= 0 || typeof mirror !== 'boolean') throw new Error('Sprite placement không hợp lệ');
  const [sx, sy, w, h] = frame.rect, [ax, ay] = frame.anchor;
  if (!mirror) {
    ctx.drawImage(image, sx, sy, w, h, Math.round(position.x - ax * scale), Math.round(position.y - ay * scale), w * scale, h * scale);
    return;
  }
  ctx.save();
  try {
    ctx.translate(Math.round(position.x), Math.round(position.y));
    ctx.scale(-1, 1);
    ctx.drawImage(image, sx, sy, w, h, Math.round(-ax * scale), Math.round(-ay * scale), w * scale, h * scale);
  } finally { ctx.restore(); }
}
/** Item order do scene gán; depthY là anchor thị giác, không collision y. */
export function compareRenderDepth(a, b) {
  const ay = a.depthY ?? a.y, by = b.depthY ?? b.y;
  const ao = a.renderOrder ?? 0, bo = b.renderOrder ?? 0;
  if (!finite(ay, by, ao, bo)) throw new Error('Depth-sort metadata không hợp lệ');
  return ay - by || ao - bo;
}
export function foregroundAlpha(object, actor, { height, halfWidth, fadedAlpha = 0.48 }) {
  if (!finite(object.x, object.y, actor.x, actor.y, height, halfWidth, fadedAlpha) || height < 0 || halfWidth < 0 || fadedAlpha < 0 || fadedAlpha > 1) throw new Error('Occlusion metadata không hợp lệ');
  return actor.y < object.y && actor.y > object.y - height && Math.abs(actor.x - object.x) < halfWidth ? fadedAlpha : 1;
}
