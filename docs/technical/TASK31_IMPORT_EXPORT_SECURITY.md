# Export/import có kiểm tra và xác nhận

Code [SaveCoordinator](../../src/island/SaveCoordinator.mjs), [SaveSchema](../../src/island/SaveSchema.mjs). Không có server, account, cloud sync hoặc network request trong pipeline.

Portable export gồm format=tu-linh-save, exportVersion=1, sourceSlotId, exportedAt, snapshot và digest. Chỉ export từ active generation hợp lệ; không UI/farm settings hoặc runtime resources. Harness tải file tu-linh-save-slot-1.json bằng Blob/download do người dùng click, không lấy tên nhân vật hoặc dữ liệu cá nhân làm filename.

Checksum SHA-256 phát hiện thay đổi ngẫu nhiên, **không phải xác thực chống sửa ác ý**. Người sửa có thể tính lại digest; payload/checkpoint validators vẫn bắt buộc, và domain authority tương lai phải kiểm invariants gameplay. Không coi checksum là chống gian lận.

`previewImportFile` kiểm file.size trước file.text; `previewImport` giới hạn UTF-8 2 MiB trước JSON.parse, kiểm JSON limits/keys/format/exportVersion/sourceSlot/timestamp/digest/schema/content/contract/checkpoint/payload. Không eval, execute script hoặc merge unrestricted objects từ file. File chỉ được đọc như data; module Blob trong browser tests là fixture JS do repository sở hữu, không luồng import save của người chơi.

Preview trả token, destinationSlot, expectedRevision, overwrite impact và checkpoint; **không ghi database**. Token ràng buộc snapshot và slot đích, tối đa 20 preview trong bộ nhớ, hết hạn sau 5 phút. sourceSlotId trong file không được quyền chọn destination. Confirm cần action confirmed=true và eligibility an toàn; expectedRevision chặn slot đã thay đổi từ sau preview. Slot đích đang corrupt/unsupported phải được giải quyết trước, không lén overwrite để bỏ lỗi.

Import tạo commit snapshot nguyên khối; giữ active cũ của destination làm backup tới khi transaction mới commit và không sửa slot khác. Không reset saveIdentity, canonical claims hoặc receipts vì đổi slot/schema/content metadata. Không cấp reward hoặc hợp nhất hai progression. Harness đổi destination thì hủy preview và checkbox, buộc chọn lại file; chọn file chưa thay slot, thiếu xác nhận không ghi.

`exportRawSlot` là bản chẩn đoán giữ row gốc khi portable export không thể validate; format tu-linh-save-raw không được import như portable save. Đây là đường lưu bản gốc nơi có thể đọc JSON, không công cụ tự sửa corrupt/unknown schema. Nếu cả IndexedDB không thể mở thì không hứa export được. File và profile kiểm thử chỉ ở /tmp, không commit player saves/database.
