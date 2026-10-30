# Kiến trúc trạng thái thế giới

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

## Mục tiêu và ranh giới

**CONFIRMED:** thế giới ghi nhớ thay đổi quan trọng; bốn chương có thể quay lại; ba dạng gồm một active/hai reserve, membership khóa trong boss; sinh thái thích nghi không mặc định xấu; Ly không hồi sinh tùy ý. Task07 chỉ tài liệu. **UNRESOLVED:** backend lưu, ngân sách dữ liệu, checkpoint cụ thể và boss sớm đủ ba dạng hay khóa ô trống.

Nguồn sự kiện/nội dung vẫn là [story handoff](../story/STORY_IMPLEMENTATION_HANDOFF.md). Tài liệu này sở hữu quy tắc authority; [data spec](../technical/PERSISTENT_WORLD_DATA_SPEC.md) sở hữu hợp đồng lưu; tài liệu chương sở hữu presentation/read model, không phát sinh event chính mới.

## Năm loại thay đổi

| Loại | Scope / ví dụ | Sở hữu và lưu | Reset hợp lệ |
| --- | --- | --- | --- |
| Permanent narrative | Thức tỉnh, giải quyết khủng hoảng, ký ức độc nhất | Completion/sub-completion và outcome một lần; lưu ngay boundary | Không rollback bởi gameplay thường; migration có provenance |
| Persistent environment | Biến thể vườn, setting nhánh nước đã chọn | RegionState hoặc LocalObjectState đúng một chủ; revision cùng commit | Chỉ event hợp lệ mới đổi; không reset khi rời scene |
| Temporary effect | Hơi nước chiến đấu, cháy ngắn, gió kỹ năng | Runtime effect; không lưu từng particle/trajectory | Hết hạn/thoát attempt; load dựng checkpoint an toàn |
| Repeatable local | Thử đường gió, sinh hoạt lãnh thổ | Lưu reset policy, occurrence nếu có reward/quest cần; không lưu mọi bước AI | Boundary được định nghĩa, không reset unique story reward |
| Cosmetic reaction | Ánh sáng, âm nền, cánh hoa | Suy từ projection và chất lượng render; không lưu animation frame | Dựng lại tự do, không ảnh hưởng collision/progression |

Một hiệu ứng có phần gameplay và cosmetic phải phân loại từng phần: cây cầu sống persistent; lá bay cosmetic; dây leo combat temporary. Không biến mọi cast thành cờ vĩnh viễn.

## Bốn cấp và quyền sở hữu

| Cấp / ID scope | Nguồn chuẩn | Read model / chuyển trạng thái | Lưu / phụ thuộc / validation |
| --- | --- | --- | --- |
| Global / world_origin_arc | WorldEventCompletion và resonance records theo chủ | GlobalProgressState suy arc phase, số Sacred, network, gate | Không lưu số Sacred độc lập; đếm bốn species có form_committed; gate kiểm bốn hệ |
| Chapter / chapter_01..04 | Event completion/outcome của chương | ChapterProgressState suy entryAvailable, arrived, narrativePhase, awakening và crisis | Phase không được set độc lập; entryAvailable khác đã tới, không tạo vòng gate |
| Region / hai_uyen, nhat_diem, phong_van, van_sinh | Completion cho phục hồi chính; RegionState cho lựa chọn mutable cấp vùng | Phase và RegionEcologyState là projection theo revision/catalog | Một property một owner; variant không xóa stable milestone; refuge/navigation được kiểm trước commit |
| Local / objectId, encounterId, memoryId | LocalObjectState nếu setting riêng; unique outcome/completion, MemoryRecord hoặc RewardGrantLedger theo hệ | Cửa/actor/cue dựng từ predicate của nguồn đúng | Không thêm bossDefeated boolean nếu outcome đã lưu; object ID duy nhất ổn định qua map changes |

`quy_awake`, `water_stable`, `chapter_01_complete` và các tên State changes Task05 là **predicate aliases**, không một bag boolean thứ hai. `water_stable` = completed evt_05_restore_water; `heat_stable` = evt_11_restore_heat; `wind_stable` = evt_16_restore_wind; `life_stable` = evt_22_stabilize_life; `gate_active` = evt_23_activate_gate. Các aliases cùng event dùng cùng completion trừ awakening: awake dựa sub-completion form_committed, practice dựa parent complete. Form hiện dùng được lấy ResonanceRecord, không suy rằng mọi form đã thức đều luôn usable.

Các outcome biến thể như thái độ actor được ghi trong completion outcome/relationship đúng chủ, không suy tất cả nhánh từ eventId. Memory có MemoryRecord riêng; completion chứng minh nguồn grant, không thay quyền sở hữu memory. Reward ledger bảo vệ grant, không là progression gate thay completion.

## Derived không có nghĩa chạy lại side effect

Load đọc snapshot authoritative, validate rồi dựng projection; không replay reward/cộng XP, không apply lại patch cũ làm mất variant chọn sau. Cache phase/ecology chỉ hợp lệ với sourceRevision và catalogVersion; sai thì bỏ cache. Không duy trì một event log toàn lịch sử và snapshot cùng quyền sửa: completion records là facts; recovery journal chỉ giúp commit, không là nguồn progression cạnh tranh.

RegionEcologyState Task06 được làm rõ là projection, gồm habitat availability/refuge coverage/placement kế hoạch; không tự sở hữu stable flags hay bản sao variant. Vị trí wildlife thường được tái tạo theo habitat rules; cá thể độc nhất và lựa chọn relocation có ảnh hưởng quest cần durable record riêng.

## Quy tắc mở rộng

Registry data định nghĩa region/event/object/quest/habitat và owner. Region mới thêm ID, defaults và dependency đã kiểm, không đổi enum cứng toàn game. Validation từ chối duplicate owner, ID không biết không được tự coi complete. Catalog chưa tải là unavailable/pending, không xóa unlock hay ghi đè save. Tham chiếu lạ được giữ để migration, không tự spawn reward.
