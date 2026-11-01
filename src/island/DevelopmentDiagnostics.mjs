export const DIAGNOSTIC_CATEGORIES = Object.freeze(['system', 'scene', 'asset', 'renderer', 'map', 'input', 'actor', 'collision', 'current', 'save', 'database', 'recovery', 'performance']);
const severities = ['info', 'warning', 'error'];
const numericContext = ['x', 'y', 'cameraX', 'cameraY', 'tileX', 'tileY', 'width', 'height', 'count', 'durationMs', 'revision', 'slotIndex'];
const ownValue = (object, key) => { try { const d = Object.getOwnPropertyDescriptor(object, key); return d && Object.hasOwn(d, 'value') ? d.value : undefined; } catch { return undefined; } };
const codeValue = code => typeof code === 'string' && /^[A-Z][A-Z0-9_]{0,63}$/.test(code) ? code : undefined;
export function safeError(error) {
  let name = 'Error', current = error;
  const names = ['Error', 'TypeError', 'RangeError', 'SyntaxError', 'ReferenceError', 'PersistenceError'];
  for (let depth = 0; current && depth < 4; depth++) {
    const candidate = ownValue(current, 'name'); if (names.includes(candidate)) { name = candidate; break; }
    try { current = Object.getPrototypeOf(current); } catch { break; }
  }
  const code = codeValue(ownValue(error, 'code'));
  return Object.freeze({ name, ...(code ? { code } : {}) });
}
function safeContext(context) {
  const result = {};
  if (!context || typeof context !== 'object') return Object.freeze(result);
  for (const key of numericContext) { const value = ownValue(context, key); if (Number.isFinite(value)) result[key] = value; }
  const sceneId = ownValue(context, 'sceneId');
  if (['dawn', 'dawn-sample', 'quy-s0-test', 'fixture.scene'].includes(sceneId)) result.sceneId = sceneId;
  return Object.freeze(result);
}
/** Ring buffer trong bộ nhớ; không console/network/storage, không raw payload/message/stack. */
export class DevelopmentDiagnostics {
  constructor({ enabled = false, capacity = 128, throttleMs = 1000, clock = () => performance.now() } = {}) {
    if (!Number.isSafeInteger(capacity) || capacity < 1 || capacity > 1000 || !Number.isFinite(throttleMs) || throttleMs < 0) throw Error('DIAGNOSTICS_CONFIG');
    Object.assign(this, { enabled, capacity, throttleMs, clock }); this.records = []; this.lastSeen = new Map(); this.suppressed = 0;
  }
  record(severity, category, code, context = {}, error) {
    if (!this.enabled || !severities.includes(severity) || !DIAGNOSTIC_CATEGORIES.includes(category) || !codeValue(code)) return false;
    const time = this.clock(); if (!Number.isFinite(time)) return false;
    const key = `${category}:${code}`, previous = this.lastSeen.get(key);
    if (previous !== undefined && time - previous < this.throttleMs) { this.suppressed++; return false; }
    this.lastSeen.delete(key); this.lastSeen.set(key, time);
    if (this.lastSeen.size > this.capacity) this.lastSeen.delete(this.lastSeen.keys().next().value);
    const record = Object.freeze({ severity, category, code, time, context: safeContext(context), ...(error ? { error: safeError(error) } : {}) });
    this.records.push(record); if (this.records.length > this.capacity) this.records.shift(); return true;
  }
  async observe(category, code, operation, context = {}) {
    if (!this.enabled) return operation();
    const start = this.clock(), safe = safeContext(context);
    this.record('info', category, `${code}_START`, safe);
    try { const result = await operation(); this.record('info', category, `${code}_OK`, { ...safe, durationMs: this.clock() - start }); return result; }
    catch (error) { this.record('error', category, `${code}_FAILED`, safe, error); throw error; }
  }
  snapshot() { return Object.freeze({ records: Object.freeze([...this.records]), suppressed: this.suppressed }); }
  clear() { this.records.length = 0; this.lastSeen.clear(); this.suppressed = 0; }
}
export function summarize(samples) {
  const values = samples.filter(v => Number.isFinite(v) && v >= 0).sort((a, b) => a - b);
  if (!values.length) return null;
  return { count: values.length, mean: values.reduce((a, b) => a + b, 0) / values.length, p50: values[Math.ceil(values.length * 0.5) - 1], p95: values[Math.ceil(values.length * 0.95) - 1], max: values.at(-1) };
}
export class FrameProfiler {
  constructor(capacity = 120) { if (!Number.isSafeInteger(capacity) || capacity < 1 || capacity > 1000) throw Error('PROFILER_CONFIG'); this.capacity = capacity; this.frames = []; }
  record(frame) {
    const keys = ['deltaMs', 'updateMs', 'renderMs', 'hudMs', 'debugMs'];
    if (!keys.every(key => Number.isFinite(frame[key]) && frame[key] >= 0)) return false;
    this.frames.push(Object.freeze(Object.fromEntries(keys.map(key => [key, frame[key]]))));
    if (this.frames.length > this.capacity) this.frames.shift(); return true;
  }
  snapshot() {
    const timings = Object.fromEntries(['deltaMs', 'updateMs', 'renderMs', 'hudMs', 'debugMs'].map(key => [key, summarize(this.frames.map(frame => frame[key]))]));
    return { samples: this.frames.length, fpsEstimate: timings.deltaMs?.mean > 0 ? 1000 / timings.deltaMs.mean : null, ...timings };
  }
}
