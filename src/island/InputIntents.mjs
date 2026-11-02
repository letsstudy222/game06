import { boundedVector } from './SemanticInput.mjs';
/** Chỉ kiểm một target proposal từ authority tương lai; không quét/tự khóa mục tiêu. */
export function assistedAim({ origin, fallbackAim, target = null, range }) {
  if (![origin.x, origin.y, range].every(Number.isFinite) || range < 0) throw Error('ASSIST_REQUEST: origin/range không hợp lệ');
  const fallback = boundedVector(fallbackAim), length = Math.hypot(fallback.x, fallback.y);
  const direction = length ? { x: fallback.x / length, y: fallback.y / length } : { x: 0, y: 1 };
  if (target && typeof target.targetId === 'string' && target.targetId && target.hostile === true && target.attackable === true && target.invulnerable === false && target.occluded === false && target.lineOfSight === true && Number.isFinite(target.position?.x) && Number.isFinite(target.position?.y)) {
    const dx = target.position.x - origin.x, dy = target.position.y - origin.y, distance = Math.hypot(dx, dy);
    if (distance > 0.000001 && distance <= range) return Object.freeze({ direction: Object.freeze({ x: dx / distance, y: dy / distance }), targetId: target.targetId, assisted: true });
  }
  return Object.freeze({ direction: Object.freeze(direction), targetId: null, assisted: false });
}
/** Read-only guard từ loadout projection. Không thực hiện transition hoặc sửa membership. */
export function formSwitchIntent(slot, view) {
  if (!Number.isInteger(slot) || slot < 1 || slot > 3 || !Array.isArray(view.slots) || view.slots.length > 3) throw Error('SWITCH_REQUEST: slot/loadout không hợp lệ');
  const formId = view.slots[slot - 1];
  if (typeof formId !== 'string' || !formId) return Object.freeze({ accepted: false, reason: 'empty_slot' });
  if (view.canSwitch !== true || !Array.isArray(view.eligibleSlots) || !view.eligibleSlots.includes(slot)) return Object.freeze({ accepted: false, reason: 'authority_blocked' });
  return Object.freeze({ accepted: true, type: 'switch_form', slot, formId });
}
