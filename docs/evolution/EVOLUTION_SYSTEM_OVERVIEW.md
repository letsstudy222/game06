# Hệ tiến hóa sinh vật

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Nền CONFIRMED và phạm vi

Theo D07/D30–D35 và Task13 §2/4: mỗi playable species có XP/level/skill/evolution riêng; Quy, Phượng, Long, Ly đúng ba major stages. Tiến hóa biểu đạt phát triển cùng lineage qua giải phẫu, silhouette và cách vận dụng, không chỉ scale/recolor/particle/stat. Rarity không bảo đảm mạnh hơn, sinh vật cũ không bị thay thế vĩnh viễn. Sáu nguyên tố và Life authority riêng của Ly giữ nguyên. D05/D06/D41: tối đa ba dạng theo tiến trình, membership khóa boss, vẫn switch trong bộ; đầu game không bắt đủ ba.

Chỉ tài liệu. Runtime Dawn/Phoenix hiện hữu không phải hệ evolution đã chạy; atlas Phoenix không tự stage III. First playable Quy I vẫn là subset nhỏ hơn Chapter I, không phải chờ đủ 12 bộ art. Phase I vẫn PARTIAL. Task13 chỉ kiểm nhất quán cục bộ, không full audit Tasks09–16 và không bắt đầu Task14.

## Bảy khái niệm cần tách — V13-P01

| Khái niệm | Định nghĩa / owner | Không suy ra |
| --- | --- | --- |
| Species | Lineage bền, canonical speciesId; creatureId là cùng định danh theo C04 | Không đổi ID vì stage, display name hoặc gặp cá thể khác |
| Evolution stage | Trạng thái phát triển đã commit trong lineage; stageId không phụ thuộc tên hiển thị | Không một formId/XP bar/slot mới cho mỗi stage |
| Visual variant | Appearance khác, có thể không thay khả năng hay tiến trình | Recolor không tự là evolution hoặc rarity mới |
| Elemental variant | Cấu hình affiliation khác, taxonomy/version cần quyết định E10 | Không tự thêm hệ vì thêm vàng, vảy hoặc particle |
| Temporary transformation | Thay đổi tạm bởi ability/context; switching giữa species là giao dịch R03 riêng | Không durable stage grant, không reset tiến trình |
| Assimilation state | Quá trình/độ ổn định sinh học-nguyên tố của cá thể theo F06/E10 | Không tự evolution, không luôn hai hệ hoặc không thể phục hồi |
| Boss combat phase | Nhịp/hình thái của encounter có thể dùng chung species | Không stage player, species mới hoặc quyền mở dạng |

## Bốn trục phát triển bổ trợ nhau

| Trục | Tác dụng | Ranh giới |
| --- | --- | --- |
| Numerical growth | Level phát triển thuộc tính theo curve/rule refs của loài | Không tự đổi anatomy; XP curve và thông số để Task15 |
| Skill development | Mở/tinh luyện ability theo prerequisites và skill records | minimumStage là điều kiện cần, không cấp mọi skill khi lên stage |
| Evolutionary development | Anatomy mới đi cùng thay đổi nhịp/combat/movement/environment có ý nghĩa | Không bắt mỗi stage có movement system hoàn toàn mới |
| Mastery | Hiểu và thực hiện kỹ thuật đặc trưng, có evidence theo mục tiêu | Không đồng nhất level cap, full collection hoặc tất cả lore entries |

## Stage structure và identity

Giữ các IDs hiện hữu trong [ma trận C04](../creatures/SACRED_EVOLUTION_MATRIX.md) và [data C04](../technical/CREATURE_DATA_SPEC.md). IDs/tên stage vẫn là identifiers thiết kế PROPOSED trong repo, không gọi là runtime IDs đã triển khai; Task13 không rename chúng. Tứ Linh: I→II→III. Loài phụ thường hai, wildlife một dạng đầu, boss một core form là planning targets K11/B12, không quota hoặc luật cố định cho mọi loài. Loài không playable không bị ép có XP/level/evolution bar; future stage graph có thể mở rộng sau approval, không tự thêm stage IV cho Sacred.

Một species/form record giữ committedStageId, XP, skills và các nghĩa vụ HP/cooldown hiện hữu. Eligibility, role hiện tại và tên stage là projections từ authoritative facts/catalog, không mutable copies ở từng loadout slot. Stage I được mở qua acquisition/awakening R03/S05; không cần giả định stage0 hoặc form có trước, không cấp unlock lần hai bằng evolution service.

## Khuyến nghị và nguồn duy nhất

Model D ở [trigger models](EVOLUTION_TRIGGER_MODELS.md) kết hợp yêu cầu dễ tiếp cận và điều kiện riêng; [loadout](EVOLUTION_AND_LOADOUT.md) đề xuất safe explicit transition; [state flow](../technical/EVOLUTION_STATE_MACHINE.md) tách requirement view, pending intent và completion commit. Tất cả đều V13 proposals, chưa chốt R03/C04/E10 hoặc A08-05 thay người dùng.

Requested `SACRED_CREATURE_EVOLUTION.md` dùng nguồn [SACRED_EVOLUTION_MATRIX — bổ sung Task13](../creatures/SACRED_EVOLUTION_MATRIX.md), giữ một nguồn cho 12 stage. [Visual guidelines](EVOLUTION_VISUAL_GUIDELINES.md), [gameplay changes](EVOLUTION_GAMEPLAY_CHANGES.md), [resonance](EVOLUTION_AND_RESONANCE.md), [UI requirements](EVOLUTION_UI_REQUIREMENTS.md), [asset contract](EVOLUTION_ASSET_CONTRACT.md), [data](../technical/EVOLUTION_DATA_SPEC.md), [22 cases](../technical/EVOLUTION_TEST_CASES.md) và [audit](TASK13_CONSISTENCY_AUDIT.md) dẫn phần chi tiết. Không JSON, classes, manifest hoặc runtime mới.
