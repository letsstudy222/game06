import { PersistenceError, fail, jsonData } from './SaveSchema.mjs';
export const SAVE_DATABASE = 'tu-linh-khoi-nguyen.gameplay';
export const SAVE_DATABASE_VERSION = 1;
function storageError(error) {
  if (error instanceof PersistenceError) return error;
  const codes = { QuotaExceededError: 'QUOTA_EXCEEDED', SecurityError: 'PERSISTENCE_UNAVAILABLE', AbortError: 'TRANSACTION_ABORTED', InvalidStateError: 'DATABASE_CLOSED', VersionError: 'UNSUPPORTED_DATABASE' };
  return new PersistenceError(codes[error?.name] || 'STORAGE_ERROR', `Lỗi lưu trữ: ${error?.name || 'UnknownError'}`);
}
/** Backend nội bộ của SaveCoordinator; không được domain/UI gọi ghi trực tiếp. */
export class IndexedSaveStore {
  static open({ indexedDB = globalThis.indexedDB, databaseName = SAVE_DATABASE } = {}) {
    if (!indexedDB) return Promise.reject(new PersistenceError('PERSISTENCE_UNAVAILABLE', 'IndexedDB không khả dụng'));
    return new Promise((resolve, reject) => {
      let request, settled = false;
      const rejectOnce = error => { if (!settled) { settled = true; reject(storageError(error)); } };
      try { request = indexedDB.open(databaseName, SAVE_DATABASE_VERSION); } catch (error) { rejectOnce(error); return; }
      request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('slots')) request.result.createObjectStore('slots', { keyPath: 'slotId' }); };
      request.onblocked = () => rejectOnce(new PersistenceError('DATABASE_BLOCKED', 'Tab khác đang giữ database; đóng tab đó rồi thử lại'));
      request.onerror = () => rejectOnce(request.error);
      request.onsuccess = () => {
        if (settled) { request.result.close(); return; }
        if (!request.result.objectStoreNames.contains('slots')) { request.result.close(); rejectOnce(new PersistenceError('UNSUPPORTED_DATABASE', 'Database thiếu store slots; không tự sửa cấu trúc')); return; }
        settled = true; const store = new IndexedSaveStore(request.result); resolve(store);
      };
    });
  }
  constructor(database) { this.database = database; database.onversionchange = () => this.close(); }
  read(slot) {
    return new Promise((resolve, reject) => {
      let transaction, value, problem;
      try {
        transaction = this.database.transaction('slots', 'readonly');
        const request = transaction.objectStore('slots').get(slot);
        request.onsuccess = () => { value = request.result; };
        transaction.oncomplete = () => resolve(value);
        transaction.onabort = () => reject(problem || storageError(transaction.error || new DOMException('Aborted', 'AbortError')));
        transaction.onerror = event => { problem = storageError(event.target.error || transaction.error); event.preventDefault(); try { transaction.abort(); } catch { /* Có thể transaction đã abort. */ } };
      } catch (error) { reject(storageError(error)); }
    });
  }
  compareAndSwap(slot, expectedRevision, expectedRow, replacement) {
    return new Promise((resolve, reject) => {
      let transaction, problem;
      try {
        transaction = this.database.transaction('slots', 'readwrite');
        const store = transaction.objectStore('slots'), request = store.get(slot);
        transaction.oncomplete = () => resolve();
        transaction.onabort = () => reject(problem || storageError(transaction.error || new DOMException('Aborted', 'AbortError')));
        transaction.onerror = event => { problem = storageError(event.target.error || transaction.error); event.preventDefault(); try { transaction.abort(); } catch { /* Có thể transaction đã abort. */ } };
        request.onsuccess = () => {
          try {
            const current = request.result;
            if ((current?.revision ?? 0) !== expectedRevision || (current === undefined ? null : jsonData(current, 4 * 1024 * 1024, { maxNodes: 50000, maxDepth: 32 })) !== (expectedRow === undefined ? null : jsonData(expectedRow, 4 * 1024 * 1024, { maxNodes: 50000, maxDepth: 32 }))) fail('REVISION_CONFLICT', 'Slot đã thay đổi ở tab/request khác; tải lại trước khi ghi');
            store.put(replacement);
          } catch (error) { problem = storageError(error); transaction.abort(); }
        };
      } catch (error) { if (transaction) { problem = storageError(error); transaction.abort(); } else reject(storageError(error)); }
    });
  }
  close() { this.database.close(); }
}
