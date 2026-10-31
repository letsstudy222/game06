# Save và persistence — có gì thật, thiếu gì

Nguồn: [UISettings](../../src/island/UISettings.mjs), [GameState.snapshot](../../src/island/GameState.mjs), [GameMenu.sync](../../src/island/GameMenu.mjs), [legacy World](../../legacy/tiny-farm/world.js), [legacy farm](../../legacy/tiny-farm/farm.js). Đối chiếu [W07](PERSISTENT_WORLD_DATA_SPEC.md), [opening boundary](OPENING_STATE_AND_SAVE_CONTRACT.md), [reward consistency](../economy/REWARD_CONSISTENCY.md).

| Dữ liệu | Chủ thực tế / key | Bền vững? / giới hạn |
| --- | --- | --- |
| UI settings Dawn | UISettings, nhat-diem.ui.v1 | localStorage: joystick/action size, opacity, scale, zoom, normalized positions; sanitize/bounds/catch lỗi, fallback trong phiên |
| Runtime snapshot | GameState.snapshot, IslandGame.snapshot/view/settings | Object cho quan sát, không serialize progression, không load/reconcile; không durable game save |
| Player/HP/skill/shrine/position | GameState/PlayerPhoenix/SkillSystem trong bộ nhớ | Refresh tạo mới; message menu “Tự động lưu” nói về UI, không hành trình |
| Farm legacy | legacy/tiny-farm/world.js KEY nhat-diem.farm.v1; save/load JSON, farm.js export/import/reset | Có save thật cho game legacy, không import vào entry Dawn và không nằm trong `_site`; không đạt contract R03/W07 của RPG |
| Settings legacy | tiny-farm.settings.v1 trong legacy UI | Namespace khác; không sửa/xóa/chuyển ngầm |
| Progression/claims/events/world-state | Không có active runtime owner/writer tương ứng | Chưa triển khai XP/quest/RewardGrantLedger/E01–E06/content save versions |

Active src không dùng sessionStorage/IndexedDB hoặc backend save. `version:1` trong asset manifest là metadata asset, không chứng minh save schema/versioning. Browser tests dùng context mới, kiểm settings reload và farm sentinel; không đọc/ghi save người chơi thật. Legacy save không có atomic multi-owner RPG receipts, migration/recovery đủ yêu cầu; không bê nguyên JSON loader thành chuẩn mới.

## Gate bắt buộc trước Task31 — UNRESOLVED, không chọn thay

| Quyết định | Lựa chọn hiện có / khuyến nghị PROPOSED | Điều phải chứng minh |
| --- | --- | --- |
| Phạm vi durability | S0 movement-only dùng phiên tạm; D40 cần progress bền vững. Khuyến nghị adapter nhỏ theo scope, không server đa thiết bị mặc định | UI nói rõ dữ liệu nào lưu; không gọi restart là save an toàn |
| Atomic hoặc recoverable unit | Versioned snapshot/generations hoặc journal tương đương W07; backend cụ thể chưa chọn | Completion/owned patch/placement/recipient updates/receipt cùng một kết quả; quota không half grant |
| Memory trước form | O17-U04 map mem_quy_first_sense tới nguồn/receipt hiện hữu trước form_committed | Không claim parent sớm, không tạo ledger ký ức riêng hoặc đẩy ký ức sau thân |
| Identity và ledger | Một RewardGrantLedger; source claim trước recipient allocations; content/schema version không mở reward identity mới | Retry/ack mất/đổi active form không grant lại hoặc chọn recipient mới |
| Last-good/integrity | Validate schema/ref/generation/receipt rồi promote; giữ bản tốt trước | Corrupt/quota/unknown newer version không xóa save, không fabricate completion |
| Namespace/migration | Key/schema/alias map mới phải duyệt; giữ UI/farm keys nguyên | Backup→map IDs/outcomes→validate→promote; không reset progression vì đổi tên |
| Clock/HP/attempt recovery | Gate E, C14/E09/L16 chọn harmful status/HP0/abort/resume policy | Không reload free heal/cleanse, không giữ boss damage với team mới |
| Export/import và loss budget | UI/export/import/retention/device scope Q16 chưa duyệt | Validate import, backup trước thay; export không lộ credentials, chỉ data được phép; không hứa cloud sync |

Đề xuất luồng kỹ thuật: command/evidence→validate source/owners/revisions→candidate snapshot hoặc journal→ghi/kiểm integrity→promote durable→receipt lookup→publish read models. Đây là hợp đồng triển khai tương lai, không production writer. Cosmetic callback không quyền hoàn event. Alias/UI cache thiếu được dựng lại; authoritative source thiếu cần recovery, không mint phần thưởng để vá.

Có thể chuẩn bị interface/fixtures lỗi trong Task26/32 theo gate đã chọn; movement S0 không bị buộc đợi toàn save RPG. Task31 implementation và mở đầu E01 bền vững phải đợi gate F; test tương lai gồm crash trước/sau promote, duplicate callbacks, lost ack, denied/quota, corrupt generation, unknown IDs, migration backup và old-save compatibility. Tất cả ca RPG này NOT RUN.
