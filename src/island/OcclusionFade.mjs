import { overlaps } from './MapDefinition.mjs';
/** Chỉ sở hữu alpha tạm thời. Bounds/eligible do render adapter cung cấp. */
export class OcclusionFade {
  constructor() { this.states = new Map(); }
  update(objects, actorBounds, deltaTime) {
    if (!Number.isFinite(deltaTime) || deltaTime < 0) throw Error('OCCLUSION_DT: deltaTime không hợp lệ');
    if (actorBounds && (![actorBounds.x, actorBounds.y, actorBounds.width, actorBounds.height].every(Number.isFinite) || actorBounds.width <= 0 || actorBounds.height <= 0)) throw Error('OCCLUSION_ACTOR: bounds không hợp lệ');
    const active = new Set();
    for (const object of objects) {
      const config = object.occlusion;
      if (!config) continue;
      active.add(object.objectId);
      const previous = this.states.get(object.objectId) || { alpha: 1, hidden: false };
      const hidden = !!(config.enabled && object.eligible && actorBounds && overlaps(object.bounds, actorBounds, previous.hidden ? config.margin : 0));
      const target = hidden ? config.alpha : 1;
      const step = config.duration ? (1 - config.alpha) * Math.min(deltaTime, 0.1) / config.duration : 1;
      const alpha = previous.alpha < target ? Math.min(target, previous.alpha + step) : Math.max(target, previous.alpha - step);
      this.states.set(object.objectId, { alpha, hidden });
    }
    for (const key of this.states.keys()) if (!active.has(key)) this.states.delete(key);
  }
  alpha(objectId) { return this.states.get(objectId)?.alpha ?? 1; }
  reset() { this.states.clear(); }
}
