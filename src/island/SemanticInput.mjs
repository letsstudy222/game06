import { direction8 } from './RenderPrimitives.mjs';
export const INPUT_ACTIONS = Object.freeze(['basic_attack', 'skill_primary', 'skill_secondary', 'defend', 'dodge', 'interact', 'switch_form_1', 'switch_form_2', 'switch_form_3', 'pause']);
export const INPUT_CONTEXTS = Object.freeze({
  gameplay: INPUT_ACTIONS, debug: INPUT_ACTIONS,
  dialogue: Object.freeze(['interact', 'pause']), menu: Object.freeze(['pause']),
  pause: Object.freeze(['pause']), cutscene: Object.freeze(['pause']),
});
export const DEFAULT_INPUT_BINDINGS = Object.freeze({
  movement: Object.freeze({ left: Object.freeze(['KeyA', 'ArrowLeft']), right: Object.freeze(['KeyD', 'ArrowRight']), up: Object.freeze(['KeyW', 'ArrowUp']), down: Object.freeze(['KeyS', 'ArrowDown']) }),
  keys: Object.freeze({ Space: 'dodge', KeyJ: 'basic_attack', KeyK: 'skill_primary', KeyE: 'interact', Digit1: 'switch_form_1', Digit2: 'switch_form_2', Digit3: 'switch_form_3', Escape: 'pause' }),
  mouse: Object.freeze({ 0: 'basic_attack' }),
});
export function boundedVector(vector) {
  if (!vector || !Number.isFinite(vector.x) || !Number.isFinite(vector.y)) throw Error('INPUT_VECTOR: vector không hợp lệ');
  const n = Math.hypot(vector.x, vector.y);
  if (!Number.isFinite(n)) throw Error('INPUT_VECTOR: magnitude quá lớn');
  return n > 1 ? { x: vector.x / n, y: vector.y / n } : { x: vector.x, y: vector.y };
}
export function analogJoystickVector(dx, dy, radius, deadZone = 0.16) {
  if (![dx, dy, radius, deadZone].every(Number.isFinite) || radius <= 0 || deadZone < 0 || deadZone >= 1) throw Error('JOYSTICK_CONFIG: radius/dead zone không hợp lệ');
  const n = Math.hypot(dx, dy);
  if (!Number.isFinite(n)) throw Error('JOYSTICK_VECTOR: magnitude quá lớn');
  if (!n || n <= radius * deadZone) return { x: 0, y: 0 };
  const strength = Math.min(1, (n / radius - deadZone) / (1 - deadZone));
  return { x: dx / n * strength, y: dy / n * strength };
}
/** Chỉ intent; không sở hữu actor, damage, loadout hoặc persistence. */
export class SemanticInput {
  constructor() {
    this.context = 'gameplay'; this.generation = 0; this.sequence = 0;
    this.held = new Map(); this.pressed = new Set(); this.released = new Set(); this.consumed = new Set();
    this.moves = new Map(); this.aim = { x: 0, y: 1 }; this.resetters = new Set();
  }
  allows(action) { return INPUT_CONTEXTS[this.context].includes(action); }
  get movementAllowed() { return this.context === 'gameplay' || this.context === 'debug'; }
  onReset(callback) { this.resetters.add(callback); return () => this.resetters.delete(callback); }
  setContext(context) {
    if (!Object.hasOwn(INPUT_CONTEXTS, context)) throw Error('INPUT_CONTEXT: context chưa hỗ trợ');
    if (context !== this.context) { this.context = context; this.clear(); }
  }
  setAction(action, down, source = 'manual') {
    if (!INPUT_ACTIONS.includes(action) || typeof down !== 'boolean' || typeof source !== 'string' || !source) throw Error('INPUT_ACTION: action/source không hợp lệ');
    if (down && !this.allows(action)) return false;
    const sources = this.held.get(action) || new Set(), wasDown = sources.size > 0;
    if (down) sources.add(source); else sources.delete(source);
    if (sources.size) this.held.set(action, sources); else this.held.delete(action);
    if (!wasDown && sources.size) this.pressed.add(action);
    if (wasDown && !sources.size) this.released.add(action);
    return true;
  }
  setMove(source, vector, active = true) {
    if (!['keyboard', 'touch'].includes(source) || typeof active !== 'boolean') throw Error('INPUT_MOVE: source không hợp lệ');
    this.moves.set(source, { vector: boundedVector(vector), active: this.movementAllowed && active });
  }
  setAim(vector) {
    const v = boundedVector(vector), length = Math.hypot(v.x, v.y);
    if (this.movementAllowed && length > 0.000001) this.aim = { x: v.x / length, y: v.y / length };
  }
  snapshot() {
    const keyboard = this.moves.get('keyboard'), touch = this.moves.get('touch');
    const move = this.movementAllowed ? (keyboard?.active ? keyboard.vector : touch?.active ? touch.vector : { x: 0, y: 0 }) : { x: 0, y: 0 };
    const aim = this.movementAllowed ? this.aim : { x: 0, y: 0 };
    const actions = Object.fromEntries(INPUT_ACTIONS.map(action => {
      const enabled = this.allows(action) && !this.consumed.has(action);
      return [action, Object.freeze({ pressed: enabled && this.held.has(action), justPressed: enabled && this.pressed.has(action), justReleased: enabled && this.released.has(action) })];
    }));
    return Object.freeze({ context: this.context, generation: this.generation, sequence: this.sequence,
      axes: Object.freeze({ move_x: move.x, move_y: move.y, aim_x: aim.x, aim_y: aim.y }), actions: Object.freeze(actions),
      directions: Object.freeze({ move: move.x || move.y ? direction8(move) : null, aim: aim.x || aim.y ? direction8(aim) : null }),
    });
  }
  consume(action) {
    if (!INPUT_ACTIONS.includes(action)) throw Error('INPUT_CONSUME: action không hợp lệ');
    const value = this.snapshot().actions[action]; this.consumed.add(action); return value;
  }
  endFrame() { this.pressed.clear(); this.released.clear(); this.consumed.clear(); this.sequence++; }
  clear() {
    this.held.clear(); this.moves.clear(); this.pressed.clear(); this.released.clear(); this.consumed.clear(); this.generation++;
    for (const reset of this.resetters) reset();
  }
}
