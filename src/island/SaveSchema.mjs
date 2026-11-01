export const SAVE_SLOTS = Object.freeze(['slot-1', 'slot-2', 'slot-3']);
export const SAVE_SCHEMA_VERSION = 1;
export const MAX_SAVE_BYTES = 1024 * 1024;
export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
export class PersistenceError extends Error {
  constructor(code, message) { super(message); this.name = 'PersistenceError'; this.code = code; }
}
export const fail = (code, message) => { throw new PersistenceError(code, message); };
export function slotId(value) { if (!SAVE_SLOTS.includes(value)) fail('INVALID_SLOT', 'Chỉ hỗ trợ ba slot độc lập'); return value; }
export const stableId = value => typeof value === 'string' && /^[a-zA-Z0-9][\w.-]{0,127}$/.test(value);
export function exactKeys(object, keys, required = keys) {
  if (!object || typeof object !== 'object' || Array.isArray(object) || Object.keys(object).some(k => !keys.includes(k)) || required.some(k => !Object.hasOwn(object, k))) fail('INVALID_STRUCTURE', 'Cấu trúc thiếu trường hoặc chứa trường không hỗ trợ');
}
export function jsonData(value, maxBytes = MAX_SAVE_BYTES, { maxNodes = 20000, maxDepth = 24 } = {}) {
  let nodes = 0; const ancestors = new Set();
  const visit = (item, depth) => {
    if (++nodes > maxNodes || depth > maxDepth) fail('LIMIT_EXCEEDED', 'Cấu trúc dữ liệu quá lớn hoặc quá sâu');
    if (item === null || typeof item === 'boolean') return;
    if (typeof item === 'string') { if (item.length > 65536) fail('LIMIT_EXCEEDED', 'Chuỗi dữ liệu quá dài'); return; }
    if (typeof item === 'number') { if (!Number.isFinite(item)) fail('INVALID_NUMBER', 'Không thể lưu số không hữu hạn'); return; }
    if (typeof item !== 'object' || ancestors.has(item) || (!Array.isArray(item) && ![Object.prototype, null].includes(Object.getPrototypeOf(item)))) fail('INVALID_DATA', 'Chỉ lưu dữ liệu JSON thuần, không cycle/runtime object');
    if (Object.getOwnPropertySymbols(item).length) fail('INVALID_DATA', 'Không lưu Symbol property');
    ancestors.add(item);
    if (Array.isArray(item)) {
      if (item.length > 4096 || Object.keys(item).length !== item.length) fail('LIMIT_EXCEEDED', 'Array quá lớn hoặc có phần tử trống');
      for (let index = 0; index < item.length; index++) {
        const descriptor = Object.getOwnPropertyDescriptor(item, String(index));
        if (!descriptor || !Object.hasOwn(descriptor, 'value')) fail('INVALID_DATA', 'Không lưu getter hoặc array trống');
        visit(descriptor.value, depth + 1);
      }
    } else {
      const keys = Object.keys(item); if (keys.length > 1024) fail('LIMIT_EXCEEDED', 'Object quá nhiều trường');
      for (const key of keys) {
        if (['__proto__', 'prototype', 'constructor'].includes(key) || key.length > 128) fail('UNSAFE_KEY', 'Tên trường không an toàn');
        const descriptor = Object.getOwnPropertyDescriptor(item, key);
        if (!descriptor || !Object.hasOwn(descriptor, 'value')) fail('INVALID_DATA', 'Không chấp nhận getter/setter');
        visit(descriptor.value, depth + 1);
      }
    }
    ancestors.delete(item);
  };
  visit(value, 0);
  const canonical = item => item && typeof item === 'object' ? Array.isArray(item) ? '[' + item.map(canonical).join(',') + ']' : '{' + Object.keys(item).sort().map(key => JSON.stringify(key) + ':' + canonical(item[key])).join(',') + '}' : JSON.stringify(item);
  const text = canonical(value);
  if (new TextEncoder().encode(text).byteLength > maxBytes) fail('LIMIT_EXCEEDED', 'Dữ liệu vượt giới hạn byte');
  return text;
}
export async function checksum(value, maxBytes = MAX_IMPORT_BYTES * 2) {
  const bytes = new TextEncoder().encode(jsonData(value, maxBytes, { maxNodes: 50000, maxDepth: 32 }));
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2, '0')).join('');
}
export function schemaCompatibility(version) {
  return Object.freeze({ supported: version === SAVE_SCHEMA_VERSION, migration: version === SAVE_SCHEMA_VERSION ? 'NONE' : 'APPROVAL_REQUIRED' });
}
export function validateSnapshot(snapshot, { contracts, contentVersions }) {
  jsonData(snapshot);
  if (!snapshot || !Number.isSafeInteger(snapshot.schemaVersion) || snapshot.schemaVersion < 0) fail('INVALID_SCHEMA', 'Thiếu save schema version hợp lệ');
  if (!schemaCompatibility(snapshot.schemaVersion).supported) fail('UNSUPPORTED_SCHEMA', 'Chưa hỗ trợ schema này; giữ nguyên dữ liệu gốc');
  exactKeys(snapshot, ['schemaVersion', 'contentVersion', 'contractId', 'checkpoint', 'payload']);
  if (!stableId(snapshot.contentVersion) || !contentVersions.includes(snapshot.contentVersion)) fail('UNSUPPORTED_CONTENT', 'Content version chưa được hỗ trợ');
  if (!stableId(snapshot.contractId) || !Object.hasOwn(contracts, snapshot.contractId)) fail('UNSUPPORTED_CONTRACT', 'Chưa có gameplay contract được đăng ký');
  exactKeys(snapshot.checkpoint, ['sceneId', 'mapId', 'anchorId', 'zoneId'], ['sceneId', 'mapId', 'anchorId']);
  if (!Object.values(snapshot.checkpoint).every(stableId)) fail('INVALID_CHECKPOINT', 'Checkpoint reference không hợp lệ');
  const contract = contracts[snapshot.contractId];
  if (contract.validateCheckpoint(snapshot.checkpoint) !== true) fail('UNKNOWN_CHECKPOINT', 'Checkpoint chưa được authority xác nhận');
  if (contract.validatePayload(snapshot.payload) !== true) fail('INVALID_PAYLOAD', 'Gameplay payload không đạt contract');
  return snapshot;
}
export function saveEligibility(trigger, eligibility) {
  if (!['auto', 'manual'].includes(trigger)) fail('INVALID_TRIGGER', 'Save trigger không hỗ trợ');
  if (!eligibility || eligibility.state !== 'SAFE_TO_SAVE' || eligibility.checkpointApproved !== true || (trigger === 'auto' && eligibility.milestoneApproved !== true)) fail('SAVE_BLOCKED', `Chưa được phép lưu: ${eligibility?.state ?? 'UNKNOWN'}`);
}
export async function makeGeneration(slot, revision, requestId, snapshot) {
  const body = { slotId: slot, revision, requestId, committedAt: new Date().toISOString(), snapshot };
  return { ...body, digest: await checksum(body) };
}
export async function validateGeneration(generation, slot, options) {
  exactKeys(generation, ['slotId', 'revision', 'requestId', 'committedAt', 'snapshot', 'digest']);
  const { digest, ...body } = generation;
  if (generation.slotId !== slot || !Number.isSafeInteger(generation.revision) || generation.revision < 1 || !stableId(generation.requestId) || typeof generation.committedAt !== 'string' || !Number.isFinite(Date.parse(generation.committedAt)) || typeof digest !== 'string' || !/^[a-f0-9]{64}$/.test(digest)) fail('CORRUPT_GENERATION', 'Metadata generation bị lỗi');
  if (await checksum(body) !== digest) fail('CHECKSUM_MISMATCH', 'Dữ liệu generation không khớp checksum');
  validateSnapshot(generation.snapshot, options); return generation;
}
export function validateRow(row, slot) {
  if (row === undefined) return;
  jsonData(row, 4 * 1024 * 1024, { maxNodes: 50000, maxDepth: 32 });
  exactKeys(row, ['slotId', 'revision', 'deleted', 'active', 'backup'], ['slotId', 'revision', 'deleted']);
  if (row.slotId !== slot || !Number.isSafeInteger(row.revision) || row.revision < 1 || typeof row.deleted !== 'boolean' || (row.deleted && (row.active !== null || row.backup !== null))) fail('CORRUPT_SLOT', 'Metadata slot bị lỗi; không tự ghi đè');
}
