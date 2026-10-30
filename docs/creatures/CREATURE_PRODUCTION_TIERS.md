# Production tiers và kiểm soát phạm vi

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

## Five production categories — B12-P08

**Tất cả tier definitions PROPOSED**; tier là chi phí/requirements, không rarity/power/morality. Stage counts ngoài Sacred là targets.

| Tier ID | Category | Scope | Animation minimum by use | Systems / evidence | Cost / constraint |
| --- | --- | --- | --- | --- | --- |
| tier_a | Sacred Creatures | 4 confirmed identities,3 stages/species, story/env integration lớn | Idle/cách vận động/turn/basic/skills/hurt/defeat/transform/env; evolution/transitions khi approved | Independent form progression và R03 nguồn/gates, C04 clips/stages, W07 story | Rấtcao; ưu tiên Quy I subset trước, không 12 sets đồng loạt |
| tier_b | Important Playable Species | Nếu phụ được chọn playable,2 stages là target | Player core/actions usable và key abilities/vận động/required env; không forced count 3 skills | Progression/nguồn/role/animation complete theo selected kit | Cao;8 references chưa 8 approvedplayables hoặc 16 atlases |
| tier_c | Ordinary Playable Species | Subset thông thường có chơi được eligibility riêng,1 main form target | Smallercompletekit: idle/cách vận động/turn/basic, assigned skills/hurt/defeat/transform nếuused | Complete player contract không cắt telegraph/directions vì “thông thường” | Vừa nhưng vẫn tốn nav/actions/save; không 16 wildlife all chơi được |
| tier_d | Ambient / Non-Playable Wildlife | Observation/ecological/narrative scope được chọn | Idle + cách vận động nếu moving + reaction/retreat nếuinteracts; sessilepulse đủ nếu thiết kếcho | Không player XP/form/3 skills/transform/evolution bắt buộc | Thấp hơn nhưng vẫn contrast/loop/nguồn/coverage cần đánh giá |
| tier_e | Boss-Only Entities | Encounter-specific, narrative profile chưa final | Idle/approach/turn + telegraph/contact/recovery từng action, hurt response/defeat/outcome/env nếuused | Encounter outcome/ledger/safe exit, không auto player progression | Cao do patterns/arena/QA, one form target không nghĩa low cost |

## Branching theo scope thay quota animation

TierB/C chỉ áp dụng khi species designatedPlayable, không tên “important” tự chơi được. Một important non chơi được dùng requirementsD và narrative extensions, không player controller. Một thông thường dùng làm boss actor cần Eoverlay cho actor/encounter; base species có thể B/C/D nhưng không hai mutable species definitions. Same ecological species có actor boss/player form không auto boss-only=true ở species scope. Không tính boss phase thành evolution hay nhận tất cảbossmoves làm player skills.

Stages tăng workload không tuyến tính: shared grammar có thể reuse nhưng mỗi anatomy/action/turn/anchor/collision cần compatibility đánh giá, recolor không thay production stage. ApprovedexistingPhoenix không redesign theo chuẩn mới; gaps ghi riêng và migration/refactor task sau nếu được giao. First chơi được Quy I minimal nhưng đủ actualmoves/feedback/save, không allroles/all tiers/eight phụ/sixteen wildlife gate.

## Suggested production sequence

1. Chốt Quy I bản ý tưởng/physical contract/nguồn/underwater sample route và minimum clips.
2. Duyệt giải phẫu/scale/anchor/clearance/telegraph, validate frames/metadata rồi module/manifest integration task riêng.
3. Game playtest/reload/collection route proof cho vertical slice; docs ready không working feature.
4. CompleteChapterI content/encounters/progression/boss khi prerequisites đủ, chọn phụ/thông thường subset theo sinh thái/scope.
5. ChaptersII–IV/extra species sau nền đãkiểm; category requirements thay đổi qua reviewed revision, không rarityescalation.

Không hours/budget/frame quotas/guaranteed count được chốt. Artlead/content lead cần estimate sau action list/đã duyệt tham chiếu, module availability, asymmetric directions, stage transitions và real device/QA constraints.
