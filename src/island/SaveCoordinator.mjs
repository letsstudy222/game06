import { IndexedSaveStore } from './IndexedSaveStore.mjs';
import { SAVE_SLOTS, MAX_IMPORT_BYTES, slotId, stableId, exactKeys, jsonData, checksum, validateSnapshot, validateRow, validateGeneration, makeGeneration, saveEligibility, fail } from './SaveSchema.mjs';
const unsupported = error => error?.code?.startsWith('UNSUPPORTED_');
/** Writer duy nhất; snapshot vật lý không quyết event order hoặc health policy. */
export class SaveCoordinator {
  static async open(options = {}) { const store = await IndexedSaveStore.open(options); return new SaveCoordinator({ ...options, store }); }
  constructor({ store, contracts = {}, contentVersions = [] }) {
    this.store = store; this.options = { contracts: { ...contracts }, contentVersions: [...contentVersions] };
    this.tail = Promise.resolve(); this.requests = []; this.previews = new Map(); this.closed = false;
  }
  enqueue(requestId, operation) {
    if (this.closed) return Promise.reject(Object.assign(Error('Writer đã đóng'), { code: 'DATABASE_CLOSED' }));
    const record = { requestId, state: 'QUEUED' }; this.requests.push(record); if (this.requests.length > 50) this.requests.shift();
    const result = this.tail.then(async () => {
      record.state = 'WRITING';
      try { const value = await operation(); record.state = value.status; return value; }
      catch (error) { record.state = 'FAILED'; record.code = error.code || 'UNKNOWN_ERROR'; throw error; }
    });
    this.tail = result.catch(() => {}); return result;
  }
  async listSlots() {
    return Promise.all(SAVE_SLOTS.map(async slot => {
      const row = await this.store.read(slot); validateRow(row, slot);
      return { slotId: slot, revision: row?.revision ?? 0, present: !!row && !row.deleted, hasBackup: !!row?.backup };
    }));
  }
  async inspect(slot) {
    slotId(slot); const row = await this.store.read(slot); validateRow(row, slot);
    if (!row || row.deleted) return { status: 'EMPTY', revision: row?.revision ?? 0, row };
    let activeError;
    if (row.active !== null) try {
      await validateGeneration(row.active, slot, this.options);
      if (row.active.revision !== row.revision) fail('CORRUPT_GENERATION', 'Active revision không khớp slot');
      let backupStatus = 'NONE';
      if (row.backup != null) try {
        await validateGeneration(row.backup, slot, this.options);
        if (row.backup.revision >= row.revision) fail('CORRUPT_GENERATION', 'Backup revision không hợp lệ');
        backupStatus = 'VALID';
      } catch (error) { backupStatus = unsupported(error) ? 'UNSUPPORTED' : 'INVALID'; }
      return { status: 'READY', revision: row.revision, row, generation: row.active, backupStatus };
    } catch (error) { if (unsupported(error)) return { status: error.code, revision: row.revision, row }; activeError = error.code; }
    if (row.backup !== null) try {
      await validateGeneration(row.backup, slot, this.options);
      if (row.backup.revision >= row.revision) fail('CORRUPT_GENERATION', 'Backup revision không hợp lệ');
      return { status: 'RECOVERY_REQUIRED', revision: row.revision, row, generation: row.backup, reason: activeError || 'ACTIVE_MISSING' };
    } catch (error) { if (unsupported(error)) return { status: error.code, revision: row.revision, row }; }
    return { status: 'CORRUPT', revision: row.revision, row, reason: activeError || 'NO_VALID_GENERATION' };
  }
  async load(slot) {
    const result = await this.inspect(slot);
    return { slotId: slot, status: result.status, revision: result.revision, reason: result.reason,
      ...(result.backupStatus ? { backupStatus: result.backupStatus } : {}),
      ...(result.generation ? { snapshot: structuredClone(result.generation.snapshot), requestId: result.generation.requestId } : {}) };
  }
  requestSave(request) {
    let captured;
    try {
      jsonData(request, 2 * 1024 * 1024); captured = structuredClone(request);
      slotId(captured.slotId); if (!stableId(captured.requestId)) fail('INVALID_REQUEST_ID', 'Cần requestId vật lý ổn định cho retry');
      saveEligibility(captured.trigger, captured.eligibility); validateSnapshot(captured.snapshot, this.options);
      if (!Number.isSafeInteger(captured.expectedRevision) || captured.expectedRevision < 0) fail('INVALID_REVISION', 'Cần expectedRevision hợp lệ');
    } catch (error) { return Promise.reject(error); }
    return this.enqueue(captured.requestId, () => this.commitSnapshot(captured));
  }
  async commitSnapshot({ slotId: slot, requestId, expectedRevision, snapshot, recovery = false }) {
    const current = await this.inspect(slot);
    if (!['READY', 'EMPTY', ...(recovery ? ['RECOVERY_REQUIRED'] : [])].includes(current.status)) fail(current.status, 'Slot chưa an toàn để thay; cần xử lý version hoặc recovery trước');
    if (current.status === 'READY' && current.generation.requestId === requestId) {
      if (jsonData(current.generation.snapshot) !== jsonData(snapshot)) fail('REQUEST_CONFLICT', 'Cùng requestId nhưng payload khác');
      return { status: 'COMMITTED', verified: true, alreadyCommitted: true, revision: current.revision, slotId: slot, requestId };
    }
    if (current.revision !== expectedRevision) fail('REVISION_CONFLICT', 'Revision cũ; không ghi đè tiến trình mới');
    if (expectedRevision >= Number.MAX_SAFE_INTEGER) fail('REVISION_LIMIT', 'Revision vượt giới hạn');
    const generation = await makeGeneration(slot, expectedRevision + 1, requestId, snapshot);
    const replacement = { slotId: slot, revision: generation.revision, deleted: false, active: generation, backup: current.generation ?? null };
    await this.store.compareAndSwap(slot, expectedRevision, current.row, replacement);
    let readback;
    try { readback = await this.store.read(slot); } catch { return { status: 'COMMITTED_UNVERIFIED', verified: false, revision: generation.revision, slotId: slot, requestId }; }
    const found = [readback?.active, readback?.backup].find(g => g?.requestId === requestId && g.digest === generation.digest);
    let verified = false;
    if (found) try { await validateGeneration(found, slot, this.options); verified = true; } catch { /* Commit đã hoàn tất; cần reconcile readback, không báo success giả. */ }
    return { status: verified ? 'COMMITTED' : 'COMMITTED_UNVERIFIED', verified, revision: generation.revision, slotId: slot, requestId };
  }
  recover(slot, { expectedRevision, confirmed = false, requestId }) {
    slotId(slot);
    if (!confirmed || !stableId(requestId)) return Promise.reject(Object.assign(Error('Cần xác nhận khôi phục backup cũ'), { code: 'CONFIRMATION_REQUIRED' }));
    return this.enqueue(requestId, async () => {
      const current = await this.inspect(slot);
      if (current.status !== 'RECOVERY_REQUIRED') fail('RECOVERY_UNAVAILABLE', 'Không có backup hợp lệ cần khôi phục');
      return this.commitSnapshot({ slotId: slot, expectedRevision, requestId, snapshot: current.generation.snapshot, recovery: true });
    });
  }
  deleteSlot(slot, { expectedRevision, confirmed = false }) {
    slotId(slot);
    if (!confirmed) return Promise.reject(Object.assign(Error('Cần xác nhận xóa slot đã chọn'), { code: 'CONFIRMATION_REQUIRED' }));
    return this.enqueue(`delete.${slot}`, async () => {
      const current = await this.store.read(slot); validateRow(current, slot);
      if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0 || expectedRevision >= Number.MAX_SAFE_INTEGER || (current?.revision ?? 0) !== expectedRevision) fail('REVISION_CONFLICT', 'Revision không khớp khi xóa');
      const revision = expectedRevision + 1;
      await this.store.compareAndSwap(slot, expectedRevision, current, { slotId: slot, revision, deleted: true, active: null, backup: null });
      return { status: 'DELETED', slotId: slot, revision };
    });
  }
  async exportSlot(slot) {
    const current = await this.inspect(slot);
    if (current.status !== 'READY') fail(current.status, 'Chỉ export portable từ active generation hợp lệ; có thể export raw để kiểm tra');
    const body = { format: 'tu-linh-save', exportVersion: 1, sourceSlotId: slot, exportedAt: new Date().toISOString(), snapshot: current.generation.snapshot };
    return JSON.stringify({ ...body, digest: await checksum(body) });
  }
  async exportRawSlot(slot) { slotId(slot); return JSON.stringify({ format: 'tu-linh-save-raw', slotId: slot, row: await this.store.read(slot) ?? null }); }
  async previewImportFile(file, destinationSlot) {
    if (!file || !Number.isSafeInteger(file.size) || file.size < 0 || file.size > MAX_IMPORT_BYTES || typeof file.text !== 'function') fail('IMPORT_TOO_LARGE', 'File không hợp lệ hoặc vượt 2 MiB');
    return this.previewImport(await file.text(), destinationSlot);
  }
  async previewImport(text, destinationSlot) {
    slotId(destinationSlot);
    if (typeof text !== 'string' || new TextEncoder().encode(text).byteLength > MAX_IMPORT_BYTES) fail('IMPORT_TOO_LARGE', 'File import vượt 2 MiB hoặc không phải text');
    let data; try { data = JSON.parse(text); } catch { fail('IMPORT_PARSE', 'File không phải JSON hợp lệ'); }
    jsonData(data, MAX_IMPORT_BYTES);
    exactKeys(data, ['format', 'exportVersion', 'sourceSlotId', 'exportedAt', 'snapshot', 'digest']);
    if (data.format !== 'tu-linh-save' || data.exportVersion !== 1) fail('UNSUPPORTED_EXPORT', 'Định dạng export chưa hỗ trợ');
    slotId(data.sourceSlotId);
    if (typeof data.exportedAt !== 'string' || !Number.isFinite(Date.parse(data.exportedAt))) fail('INVALID_EXPORT', 'Timestamp export không hợp lệ');
    const { digest, ...body } = data;
    if (typeof digest !== 'string' || digest !== await checksum(body)) fail('CHECKSUM_MISMATCH', 'File export không khớp checksum');
    validateSnapshot(data.snapshot, this.options);
    const current = await this.inspect(destinationSlot);
    if (!['READY', 'EMPTY'].includes(current.status)) fail(current.status, 'Cần giải quyết dữ liệu đích trước import');
    const token = globalThis.crypto.randomUUID();
    this.previews.set(token, { destinationSlot, expectedRevision: current.revision, snapshot: structuredClone(data.snapshot), expires: Date.now() + 300000 });
    if (this.previews.size > 20) this.previews.delete(this.previews.keys().next().value);
    return { token, destinationSlot, expectedRevision: current.revision, overwritesExisting: current.status === 'READY', sourceSlotId: data.sourceSlotId, checkpoint: structuredClone(data.snapshot.checkpoint) };
  }
  confirmImport(token, { confirmed = false, eligibility } = {}) {
    const preview = this.previews.get(token);
    if (!confirmed) return Promise.reject(Object.assign(Error('Xem trước không thay slot; cần xác nhận rõ đích import'), { code: 'CONFIRMATION_REQUIRED' }));
    if (!preview || preview.expires < Date.now()) return Promise.reject(Object.assign(Error('Preview hết hạn; chọn lại file và đích'), { code: 'IMPORT_PREVIEW_EXPIRED' }));
    try { saveEligibility('manual', eligibility); } catch (error) { return Promise.reject(error); }
    const request = { slotId: preview.destinationSlot, requestId: `import.${token}`, expectedRevision: preview.expectedRevision, snapshot: preview.snapshot, trigger: 'manual', eligibility };
    return this.requestSave(request).then(result => { this.previews.delete(token); return result; });
  }
  async close() { this.closed = true; await this.tail; this.previews.clear(); this.store.close(); }
}
