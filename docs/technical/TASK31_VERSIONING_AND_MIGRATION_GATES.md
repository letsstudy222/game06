# Version detection và gate migration

Implementation [schemaCompatibility/validateSnapshot](../../src/island/SaveSchema.mjs) chỉ hỗ trợ snapshot schema 1. Same-version load còn phải đạt digest, content whitelist, registered contract và reference validation. schemaCompatibility trả migration=APPROVAL_REQUIRED cho version khác; không có transformation tự chạy hoặc handler migration production được đăng ký.

| Khái niệm | Mục đích |
| --- | --- |
| IndexedDB version 1 | Cấu trúc object store; không là gameplay content version |
| Snapshot schemaVersion 1 | Cấu trúc envelope đang hiểu |
| contentVersion | Bộ định nghĩa nội dung do caller whitelist; không tạo reward identity |
| contractId | Validator payload/checkpoint được đăng ký theo scope |
| revision | Thứ tự commit của một slot, tăng đơn điệu kể cả delete |
| requestId | Retry của yêu cầu lưu vật lý, không canonical claim/receipt ID |

Unsupported schema cũ/mới, content hoặc contract không được tự rewrite/downgrade/load backup để bỏ qua incompatibility. Giữ row gốc và báo status; export raw khi có thể. Cả content/schema thay đổi không tự mở unique reward mới hoặc sửa recipients cũ. Fixture kiểm hai supported content versions với payload ledger/receipts nguyên vẹn, không chứng nhận compatibility mọi production catalog.

## Khuyến nghị riêng để phê duyệt — PROPOSED

1. Duyệt từng cặp schema/contract/content và stable alias map; không heuristic rename event/species/anchor.
2. Export/giữ nguyên bản gốc trước; chạy pure migration trên bản sao, không side effect hoặc reward callback.
3. Giữ canonical source identities, receipt payload/recipient allocations và saveIdentity; additive fields cần defaults theo authority, không tự grant thiếu record.
4. Validate topology/ref/domain invariants và integrity trước khi tạo generation mới bằng CAS; preserve recovery generation phù hợp schema trước.
5. Duyệt rollback/import/retention và mất dữ liệu chấp nhận được; app cũ phải từ chối schema mới, không ghi xuống format cũ.
6. Tests bắt buộc: golden old saves, unknown IDs, duplicate receipt, partial migration, quota/abort, interrupted acknowledgement, imports, forward/backward compatibility và không award do version.

Đây là đề xuất review, **chưa approval migration policy**. Writer hiện tại chủ động chặn unsupported records; triển khai migration cần port/transaction riêng được giao sau, không bỏ guard hiện hữu. Raw archive không tự là portable restore tương thích.
