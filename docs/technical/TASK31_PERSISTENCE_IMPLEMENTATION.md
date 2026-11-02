# Task 31 — Nền tảng lưu IndexedDB

Ngày 01/11/2026 (Asia/Saigon). Repository `letsstudy222/game06`, nhánh `work`, baseline sạch `0fb44fc2f1ee9f1b52474623cc8daccb333e32b6`; truy vấn GitHub xác nhận origin/work cùng SHA. Quan ngại Task 30 không có trên remote đã được kiểm chứng và không còn blocker. Tasks 25–29 có trong lịch sử. Đã đọc implementation/tests/tài liệu Task 30 và chạy lại toàn bộ baseline trước sửa: 146 Node tests, build và các browser suites đều đạt.

## Phạm vi đã triển khai

| Lớp | Kết quả |
| --- | --- |
| A — Physical durability | IndexedDB, atomic row/generation, CAS revision, ba slot, backup, readback, import/export và errors có implementation |
| B — State contract | Envelope phiên bản 1, eligibility/checkpoint refs, JSON validation và registry payload/checkpoint validator tối thiểu |
| C — Gameplay integration | DEFERRED: resonance/memory/reward timing, live quest/boss/world mutation và HP chưa tích hợp |

| Tệp | Trách nhiệm |
| --- | --- |
| [SaveSchema.mjs](../../src/island/SaveSchema.mjs) | Slot IDs, schema/JSON limits, checksum, version boundary, eligibility và generation validation |
| [IndexedSaveStore.mjs](../../src/island/IndexedSaveStore.mjs) | Backend nội bộ: open/read/CAS transaction/close, lỗi quota/abort/security/version |
| [SaveCoordinator.mjs](../../src/island/SaveCoordinator.mjs) | Writer công khai duy nhất: queue, load/save/recover/delete, export, preview và confirm import |
| [fixture](../../tests/fixtures/save.mjs) | Contract/checkpoint/ledger chỉ dành kiểm thử, không content canon |
| [persistence.test.mjs](../../tests/persistence.test.mjs) | Unit schema/protocol với backend memory có ghi rõ giới hạn |
| [persistence.browser.cjs](../../tests/persistence.browser.cjs) | IndexedDB thật, hai tab, fault injection và UI quản lý fixture opt-in |
| [package.json](../../package.json) | Thêm unit persistence vào npm test; scripts test:persistence và test:persistence:browser |

Không có production payload contract đăng ký mặc định. Muốn lưu một gameplay snapshot phải có validators và checkpoint authority được duyệt; không tự serialize GameState.snapshot. Module không được import từ main nên Dawn mặc định chưa mở database hoặc dùng save writer. UI quản lý chỉ được dựng bởi test harness; không thêm save menu production.

Nguồn đã đọc: GameState/PlayerPhoenix/UISettings, audit save Task 25, [persistence port](../architecture/PERSISTENCE_INTERFACE_BOUNDARY.md), [ownership](../architecture/STATE_OWNERSHIP_MATRIX.md), asset/version Task 27, render-only Task 28, map/current Task 29 và input lifecycle Task 30. Legacy farm save có thật nhưng không dùng làm RPG save; UI settings vẫn localStorage riêng.

**CONFIRMED theo yêu cầu Task 31:** IndexedDB làm primary gameplay storage, ba slot, auto/manual tại điều kiện hợp lệ, internal backup/export/import và hồi về checkpoint an toàn khi thoát nguy hiểm. Phê duyệt này không chốt event transaction, migration, receipt hoặc HP policy.

Tài liệu liên quan: [schema](TASK31_INDEXEDDB_SCHEMA.md), [writer/recovery](TASK31_ATOMIC_WRITER_AND_RECOVERY.md), [checkpoint](TASK31_AUTOSAVE_AND_CHECKPOINTS.md), [import/export](TASK31_IMPORT_EXPORT_SECURITY.md), [migration gates](TASK31_VERSIONING_AND_MIGRATION_GATES.md), [reward/receipts](TASK31_REWARD_RECEIPT_BOUNDARIES.md), [HP/boss](TASK31_HP_AND_BOSS_RECOVERY_BOUNDARIES.md), [tests](TASK31_BROWSER_TEST_REPORT.md), [audit](TASK31_CONSISTENCY_AUDIT.md).
