# Database và snapshot envelope

Code: [IndexedSaveStore](../../src/island/IndexedSaveStore.mjs), [SaveSchema](../../src/island/SaveSchema.mjs). Database mặc định `tu-linh-khoi-nguyen.gameplay`, IndexedDB version **1**. Chỉ mở khi caller chủ động tạo SaveCoordinator; default Dawn không mở. Tests dùng tên `task31.fixture.*` trong browser context mới, không đọc save người chơi.

Một object store `slots`, keyPath `slotId`, không index phụ vì chỉ có ba khóa `slot-1`, `slot-2`, `slot-3`. Một row gồm slotId, revision, deleted, active và backup. Generation nằm inline trong row, không pointer multi-store rời rạc. Active-generation authority là row đã commit; active.revision phải bằng row.revision. Backup có revision nhỏ hơn, cùng slotId. Không có ledger/quest store phụ.

Generation gồm slotId, revision, requestId vật lý, committedAt, snapshot và digest SHA-256. Digest bao phủ metadata và toàn snapshot bằng canonical JSON. Timestamp không làm reward identity hoặc source occurrence. requestId nhận diện yêu cầu ghi vật lý, không thay canonical source/receipt IDs.

Snapshot version 1 có đúng schemaVersion, contentVersion, contractId, checkpoint, payload. Checkpoint chứa sceneId/mapId/anchorId, zoneId tùy chọn; không có tọa độ boss, HP, camera hoặc physics state ngầm. Payload là JSON do validator của contract được đăng ký sở hữu, không phải clone mọi runtime object. Không có production contract/checkpoint catalog mặc định.

## Giới hạn và ownership

Snapshot tối đa 1 MiB; import text/file tối đa 2 MiB. JSON caller bị giới hạn 20.000 nodes, depth 24, array 4.096 phần tử, object 1.024 keys, string 65.536 ký tự; wrapper generation/row có budget kỹ thuật cao hơn để chứa hai snapshot và metadata. Các giới hạn có thể làm request bị từ chối trước khi ghi, không tự truncate dữ liệu. ID dài tối đa 128, không phải path/URL.

Chỉ JSON thuần và số hữu hạn; từ chối function, DOM/runtime class, cycle, getter/setter, Symbol, array trống lỗ và keys __proto__/prototype/constructor. Envelope/checkpoint fields lạ bị từ chối. References phải được contract.validateCheckpoint và contract.validatePayload xác nhận; validator fixture không phê duyệt Chapter I IDs.

Mỗi commit giữ active mới và một backup là active tốt trước đó. Sau thế hệ tiếp theo, backup cũ hơn hết retention, không lịch sử vô hạn. Xóa slot cần xác nhận và lưu tombstone tăng revision, active/backup=null; không xóa row khiến stale revision 0 ghi lại theo ABA. Ba slot không chia progression, claims hoặc active-form state; import sao chép snapshot vào slot được chọn, không liên kết hai bản để cập nhật chung.

Database version, snapshot schema version, content version và revision vật lý là bốn khái niệm khác nhau. Open database version không hỗ trợ thì báo lỗi, không ép downgrade. Chưa có migration tự động hoặc cloud backend. UISettings và legacy farm namespace giữ nguyên.

Checksum dùng WebCrypto nên cần secure context như HTTPS hoặc localhost; không có integrity fallback yếu hoặc backend khác tự bật. Tests đã chạy tại localhost, không chứng nhận mọi browser/private-mode storage policy.
