# Khung boss encounter

CONFIRMED D06/D41: selected membership khóa từ start đến end, active switch trong set được; không early full-three/three-elements/optional dual gate. **PROPOSED C14-P12**, dùng [R03 lock](../gameplay/TRANSFORMATION_DESIGN.md), [W07 transactions](../world/WORLD_STATE_TRANSITIONS.md) và [story boss roles](../story/MAJOR_CONFLICTS_AND_BOSSES.md). Không boss identity/attack roster mới.

| Encounter phase | Entry/behavior | Exit/recovery/authority |
| --- | --- | --- |
| OUTSIDE | Safe route/checkpoint và arena preview | Chuẩn bị tự nguyện; chưa khóa/load grants |
| PREPARING | Kiểm capabilities main path, viable form/placement và content ready; cho chỉnh/chốt loadout, rút trước start | Commit attemptId/entry refs/frozen member set kể cả empty; lock durable trước activate boss. Trigger/snapshot details cần approval |
| ACTIVE_LOCKED | Planner chọn admissible authored pattern từ phase, arena/LOS/source/CD/control budget; telegraph→commit→active→recover | Switch active trong set; membership mutation reject ở service lẫn menu. Không phase transition xóa debt/đạn tùy tiện |
| RESOLVING | HP/outcome proof thắng đủ điều kiện; ngừng tạo hostile events, retire remaining combat effects | Completion/outcome/quest proof/reward ledger+recipient/world patch commit cùng logical unit, route/habitat checks trước publish |
| FAILED/ABANDONED | No viable form hoặc retreat/abort explicit; không đứng ngoài với boss damage cũ | Reset toàn attempt, safe placement/recovery rồi unlock; retry là attempt mới, có thể chọn lại loadout trước entry |
| COMPLETED | Durable result đã ack, publish feedback | Unlock/reconstruct world từ committed facts; consumer notification không grant lại |

Phase combat là tactical behavior subset, **khác** biological evolution stage và story event transition. Phase predicates có proof (HP band/source/event) nhưng không giá trị số cuối; changed move cần warning, giữ committed attack finish/cancel policy và safe placement. Không boss evolve biology để lách frozen config.

Pattern selection cần route/counterplay bằng guaranteed forms, readable lock marker, recovery punish và finite concurrency; không unlimited homing, mọi attack phủ arena hoặc đổi phase thành invulnerability vĩnh viễn. Boss CC profile có family response/recovery; immunity scoped không vô hiệu mọi attack. Exact patterns, phases, attacks, names và environmental outcomes để chapter task riêng.

## Retry, reload, rewards

Khuyến nghị kế thừa R03 abort-and-reset khi reload attempt chưa completion commit; không resume half-hit/HP boss cùng loadout mới. Load thấy lock phải resolve attempt boundary trước mở collection. Nếu completion đã durable thì restore committed outcome, không abort để lấy thưởng lần hai. Pending resolution retry cùng operation/grant key, không key mới từ contentVersion/timestamp; source ledger W07/R03 là authority duy nhất.

Projectile/effect còn sau victory: freeze new combat emissions, retire attempt-scoped effects hoặc preserve cosmetic-only khi đủ result proof; không gây post-victory kill/reward/receiver mutation mới. Accepted due hit trước outcome boundary vẫn có thứ tự rõ ở damage pipeline; simultaneous final blow/defeat outcome policy C14-U07 cần duyệt, không chọn âm thầm victory ưu tiên. Retry không giữ damage/proc tokens của attempt cũ. Level/unlock gain được ledger giữ nếu hợp lệ nhưng không thêm member hoặc hot-swap stage/config giữa lock theo proposal R03/V13.

World consequences chỉ event definition/W07 writer, không boss animation callback: completion/sub-outcome/patch/quest/reward atomic và return/collection coverage. Storage denied không báo đã lưu, không unlock trong khi outcome dở; giữ pending result/last-good boundary và recovery UX theo approved storage policy. A08-05 trigger/retry/outcome/save adapter chưa được Task14 resolve.
