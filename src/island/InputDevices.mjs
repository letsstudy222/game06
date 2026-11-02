import { SemanticInput, DEFAULT_INPUT_BINDINGS, INPUT_ACTIONS, analogJoystickVector } from './SemanticInput.mjs';
import { screenToWorld } from './RenderPrimitives.mjs';
class ListenerScope {
  constructor() { this.removers = []; }
  on(target, type, handler, options) { target.addEventListener(type, handler, options); this.removers.push(() => target.removeEventListener(type, handler, options)); }
  dispose() { for (const remove of this.removers.splice(0)) remove(); }
}
const editing = target => !!target?.closest?.('input,textarea,select,button,a,[contenteditable]:not([contenteditable="false"]),[role="textbox"],[role="button"]');
const capture = (element, pointerId) => { try { element.setPointerCapture(pointerId); } catch { /* pointerup window vẫn dọn nếu capture không khả dụng */ } };
const release = (element, pointerId) => { if (element.hasPointerCapture?.(pointerId)) element.releasePointerCapture(pointerId); };
function bindingsCopy(bindings) {
  const result = structuredClone(bindings), used = new Set();
  if (!result.movement || !result.keys || !result.mouse) throw Error('INPUT_BINDINGS: thiếu movement/keys/mouse');
  for (const direction of ['left', 'right', 'up', 'down']) {
    const keys = result.movement[direction];
    if (!Array.isArray(keys) || !keys.length) throw Error('INPUT_BINDINGS: movement thiếu phím');
    for (const key of keys) {
      if (typeof key !== 'string' || !key || used.has(key) || Object.hasOwn(result.keys, key)) throw Error('INPUT_BINDINGS: phím trùng/xung đột');
      used.add(key);
    }
  }
  for (const [key, action] of Object.entries(result.keys)) if (!key || !INPUT_ACTIONS.includes(action)) throw Error('INPUT_BINDINGS: key/action không hợp lệ');
  if (result.keys.Escape !== 'pause') throw Error('INPUT_BINDINGS: Escape dành cho pause');
  for (const [button, action] of Object.entries(result.mouse)) if (!/^[0-4]$/.test(button) || !INPUT_ACTIONS.includes(action)) throw Error('INPUT_BINDINGS: mouse/action không hợp lệ');
  return result;
}
/** Adapter opt-in; chỉ ghi SemanticInput, không gọi GameState.use hoặc sửa facing. */
export class BrowserInput {
  constructor({ canvas, getCamera, getActorOrigin, input = new SemanticInput(), bindings = DEFAULT_INPUT_BINDINGS, documentTarget = document, windowTarget = window }) {
    Object.assign(this, { canvas, getCamera, getActorOrigin, input, documentTarget, windowTarget });
    this.bindings = bindingsCopy(bindings); this.keys = new Set(); this.pointers = new Map(); this.pointerPosition = null;
    this.scope = new ListenerScope(); this.disposed = false;
    this.unsubscribe = input.onReset(() => this.resetDevices());
    this.scope.on(documentTarget, 'keydown', event => this.keydown(event));
    this.scope.on(documentTarget, 'keyup', event => this.keyup(event));
    this.scope.on(documentTarget, 'focusin', event => { if (editing(event.target)) input.clear(); });
    this.scope.on(windowTarget, 'blur', () => input.clear());
    this.scope.on(documentTarget, 'visibilitychange', () => input.clear());
    this.scope.on(windowTarget, 'resize', () => input.clear());
    if (windowTarget.visualViewport) this.scope.on(windowTarget.visualViewport, 'resize', () => input.clear());
    this.scope.on(canvas, 'pointermove', event => this.pointermove(event));
    this.scope.on(canvas, 'pointerdown', event => this.pointerdown(event));
    this.scope.on(windowTarget, 'pointerup', event => this.pointerup(event));
    for (const type of ['pointercancel', 'lostpointercapture']) this.scope.on(canvas, type, event => this.pointerup(event, true));
    this.scope.on(canvas, 'pointerleave', () => { this.pointerPosition = null; });
    this.scope.on(canvas, 'contextmenu', event => {
      const action = this.bindings.mouse[2]; if (action && input.allows(action)) event.preventDefault();
    });
  }
  remap(bindings) { const next = bindingsCopy(bindings); this.input.clear(); this.bindings = next; }
  movementKeys() { return Object.values(this.bindings.movement).flat(); }
  updateMovement() {
    const m = this.bindings.movement, any = list => list.some(key => this.keys.has(key));
    this.input.setMove('keyboard', { x: Number(any(m.right)) - Number(any(m.left)), y: Number(any(m.down)) - Number(any(m.up)) }, this.movementKeys().some(key => this.keys.has(key)));
  }
  keydown(event) {
    const action = this.bindings.keys[event.code], movement = this.movementKeys().includes(event.code);
    if (event.ctrlKey || event.metaKey || event.altKey || (editing(event.target) && action !== 'pause') || event.repeat || this.keys.has(event.code)) return;
    if ((!movement || !this.input.movementAllowed) && (!action || !this.input.allows(action))) return;
    event.preventDefault(); this.keys.add(event.code); this.updateMovement();
    if (action) this.input.setAction(action, true, `key:${event.code}`);
  }
  keyup(event) {
    this.keys.delete(event.code); this.updateMovement();
    const action = this.bindings.keys[event.code]; if (action) this.input.setAction(action, false, `key:${event.code}`);
  }
  pointermove(event) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const r = this.canvas.getBoundingClientRect();
    this.pointerPosition = event.clientX >= r.left && event.clientY >= r.top && event.clientX < r.right && event.clientY < r.bottom ? { x: event.clientX, y: event.clientY } : null;
    this.updateAim();
  }
  pointerdown(event) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const action = this.bindings.mouse[event.button];
    if (!action || !this.input.allows(action)) return;
    event.preventDefault(); this.canvas.focus?.({ preventScroll: true }); this.pointermove(event);
    const token = `pointer:${event.pointerId}:${event.button}`;
    this.pointers.set(token, { pointerId: event.pointerId, button: event.button, action });
    this.input.setAction(action, true, token); capture(this.canvas, event.pointerId);
  }
  pointerup(event, all = false) {
    if (![...this.pointers.values()].some(value => value.pointerId === event.pointerId)) return;
    for (const [token, value] of this.pointers) if (value.pointerId === event.pointerId && (all || value.button === event.button)) {
      this.input.setAction(value.action, false, token); this.pointers.delete(token);
    }
    if (![...this.pointers.values()].some(p => p.pointerId === event.pointerId)) release(this.canvas, event.pointerId);
  }
  updateAim() {
    if (!this.pointerPosition || !this.input.movementAllowed) return;
    const position = screenToWorld(this.pointerPosition, this.canvas.getBoundingClientRect(), this.canvas, this.getCamera());
    const origin = this.getActorOrigin(); this.input.setAim({ x: position.x - origin.x, y: position.y - origin.y });
  }
  sample() { this.updateAim(); return this.input.snapshot(); }
  resetDevices() {
    this.keys.clear(); this.pointerPosition = null;
    const pointers = [...this.pointers.values()]; this.pointers.clear();
    for (const p of pointers) release(this.canvas, p.pointerId);
  }
  dispose() {
    if (this.disposed) return; this.disposed = true;
    this.scope.dispose(); this.unsubscribe(); this.resetDevices(); this.input.clear();
  }
}
/** Joystick liên tục; legacy MobileJoystick vẫn giữ profile tám hướng cũ. */
export class VirtualJoystick {
  constructor(element, input, { deadZone = 0.16, radiusFactor = 0.32, knob = null, windowTarget = window } = {}) {
    analogJoystickVector(0, 0, 1, deadZone);
    if (!Number.isFinite(radiusFactor) || radiusFactor <= 0 || radiusFactor > 0.5) throw Error('JOYSTICK_CONFIG: radiusFactor không hợp lệ');
    Object.assign(this, { element, input, deadZone, radiusFactor, knob });
    this.pointer = null; this.scope = new ListenerScope(); this.touchAction = element.style.touchAction; element.style.touchAction = 'none';
    this.unsubscribe = input.onReset(() => this.reset());
    this.scope.on(element, 'pointerdown', event => {
      if (this.pointer !== null || !input.movementAllowed || (event.pointerType === 'mouse' && event.button !== 0)) return;
      event.preventDefault(); this.pointer = event.pointerId; capture(element, event.pointerId); this.move(event);
    });
    this.scope.on(element, 'pointermove', event => { if (event.pointerId === this.pointer) { event.preventDefault(); this.move(event); } });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) this.scope.on(element, type, event => { if (event.pointerId === this.pointer) this.reset(); });
    this.scope.on(windowTarget, 'resize', () => this.reset());
    if (windowTarget.visualViewport) this.scope.on(windowTarget.visualViewport, 'resize', () => this.reset());
    this.scope.on(windowTarget, 'blur', () => this.reset());
  }
  move(event) {
    const r = this.element.getBoundingClientRect(), radius = Math.min(r.width, r.height) * this.radiusFactor;
    const dx = event.clientX - r.left - r.width / 2, dy = event.clientY - r.top - r.height / 2;
    this.input.setMove('touch', analogJoystickVector(dx, dy, radius, this.deadZone));
    if (this.knob) { const n = Math.max(1, Math.hypot(dx, dy) / radius); this.knob.style.transform = `translate(${dx / n}px,${dy / n}px)`; }
  }
  reset() {
    const pointer = this.pointer; this.pointer = null; this.input.setMove('touch', { x: 0, y: 0 }, false);
    if (this.knob) this.knob.style.transform = 'translate(0,0)';
    if (pointer !== null) release(this.element, pointer);
  }
  dispose() {
    if (this.disposed) return; this.disposed = true;
    this.scope.dispose(); this.unsubscribe(); this.reset(); this.element.style.touchAction = this.touchAction;
  }
}
export class VirtualActionButton {
  constructor(element, input, action) {
    if (!INPUT_ACTIONS.includes(action)) throw Error('INPUT_BUTTON: action không hợp lệ');
    Object.assign(this, { element, input, action }); this.pointers = new Set(); this.scope = new ListenerScope();
    this.touchAction = element.style.touchAction; element.style.touchAction = 'none';
    this.unsubscribe = input.onReset(() => this.reset());
    this.scope.on(element, 'pointerdown', event => {
      if (!input.allows(action) || (event.pointerType === 'mouse' && event.button !== 0)) return;
      event.preventDefault(); this.pointers.add(event.pointerId); input.setAction(action, true, `button:${action}:${event.pointerId}`); capture(element, event.pointerId);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) this.scope.on(element, type, event => this.up(event.pointerId));
    this.scope.on(element, 'click', event => {
      if (event.detail !== 0 || !input.allows(action)) return;
      input.setAction(action, true, `accessible:${action}`); input.setAction(action, false, `accessible:${action}`);
    });
  }
  up(pointerId) {
    if (!this.pointers.delete(pointerId)) return;
    this.input.setAction(this.action, false, `button:${this.action}:${pointerId}`); release(this.element, pointerId);
  }
  reset() { for (const pointer of [...this.pointers]) this.up(pointer); }
  dispose() {
    if (this.disposed) return; this.disposed = true;
    this.scope.dispose(); this.unsubscribe(); this.reset(); this.element.style.touchAction = this.touchAction;
  }
}
