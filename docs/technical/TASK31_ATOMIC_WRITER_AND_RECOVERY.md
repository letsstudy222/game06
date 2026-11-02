# Writer, atomic commit và recovery

API công khai: [SaveCoordinator](../../src/island/SaveCoordinator.mjs). IndexedSaveStore là backend nội bộ, không để renderer/UI/domain ghi trực tiếp. Mỗi app scope tạo một coordinator; các tab độc lập được bảo vệ thêm bằng CAS trong IndexedDB, không dựa riêng vào mutex JavaScript.

## Commit vật lý

1. Request phải chỉ rõ slotId, expectedRevision, requestId, trigger, eligibility và snapshot. Validate/capture bản sao trước khi xếp hàng; caller đổi object về sau không làm đổi candidate.
2. FIFO trong coordinator, không coalesce mất milestone; log tối đa 50 request chỉ giữ metadata trạng thái, không payload.
3. Read/validate active, backup và schema ngoài write transaction. Chuẩn bị generation/checksum bằng WebCrypto trước transaction; không await crypto hoặc network trong transaction đang mở.
4. Một transaction readwrite trên slots: đọc lại row, so expectedRevision và nội dung row đã đọc; khác thì REVISION_CONFLICT, không last-write-wins. Put cả row active+backup+revision một lần.
5. Chỉ sau transaction.oncomplete mới coi commit vật lý hoàn tất. Request success riêng lẻ không phải save success. Request/transaction error chủ động abort, không nuốt lỗi rồi acknowledge.
6. Readback, kiểm digest và contract của generation vừa ghi. Trả COMMITTED/verified=true khi xác minh được. Nếu transaction đã commit nhưng readback không thể xác minh, trả COMMITTED_UNVERIFIED/verified=false; consumer phải reconcile, không báo “đã lưu an toàn” hoặc retry bằng payload delta mù.

Retry cùng requestId đang active và cùng snapshot trả alreadyCommitted, không tạo generation mới. Cùng requestId khác payload là REQUEST_CONFLICT. Request cũ sau generation khác bị revision guard chặn; đây không là canonical gameplay receipt protocol. Slot luôn nằm trong captured request, không lấy biến “slot đang chọn” từ UI khi queue được chạy.

## Recovery

| Trạng thái | Hành vi |
| --- | --- |
| READY | Load active đã validate; checkpoint là điểm tiếp tục an toàn do caller đã author |
| READY, backupStatus=INVALID/UNSUPPORTED | Active vẫn hợp lệ; cảnh báo redundancy suy giảm, không thay active bằng backup lỗi |
| RECOVERY_REQUIRED | Active thiếu/lỗi, backup cùng slot hợp lệ; trả candidate, chưa tự promote hoặc áp vào gameplay |
| CORRUPT / CORRUPT_SLOT | Không có candidate đáng tin hoặc metadata lỗi; không bịa state mới |
| UNSUPPORTED_SCHEMA/CONTENT/CONTRACT | Giữ dữ liệu gốc; không tự lùi về backup để bỏ qua tiến trình của phiên bản khác |
| EMPTY | Slot chưa có hoặc đã xóa có tombstone; không giả có playable form/reward |

`recover` cần confirmed=true, expectedRevision và requestId; tạo generation mới từ backup đã validate, giữ backup tốt thay vì xoay corrupt active thành backup. Recovery có thể mất thay đổi mới hơn không đọc được nên cần xác nhận, nên export raw trước nếu muốn giữ bằng chứng. Resume bình thường từ active safe checkpoint không cần rollback/confirmation; recovery về generation cũ là trường hợp khác.

Quota/abort/security/read errors không quảng bá save success. Nhiều tab cùng revision chỉ một commit thắng; tab thua phải reload/resolve trước khi gửi candidate mới. Không tự merge progression. Application-level atomicity dựa semantics IndexedDB, không bảo đảm fsync/hardware crash, chống eviction hoặc private mode xóa dữ liệu. Internal backup cùng origin/database mất khi xóa toàn bộ site data; export file bên ngoài mới là bản người chơi tự giữ.
