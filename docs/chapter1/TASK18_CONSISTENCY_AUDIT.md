# Kiểm tra cục bộ Task18 và bàn giao

## Baseline kiểm chứng

Repository `https://github.com/letsstudy222/game06.git`, nhánh `work`, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, kiểm tra ngày 31/10/2026 (Asia/Saigon). Năm handoff commits PhaseII bcdfe73, 936f74f, 28fed70, 518f5d5, 387b29d đều được kiểm là ancestor của HEAD. Task17 thực sự có đủ 14 tài liệu trong working tree, **chưa commit**, cùng bốn navigation modifications. Không coi Task17 là commit trên GitHub hoặc merge nhánh khác; không discard/stage/commit phần việc cũ.

Scope Task18: 17 tài liệu mới, append chỉ mục ở README/GDD/PROJECT_DECISIONS/OPEN_QUESTIONS và backlinks ở C04 Quy/ability registry. Nội dung có sẵn giữ nguyên, không sửa Task17 specs; không runtime/map/art/UI/save/config. Helpers kiểm tra nằm ngoài checkout. Đây là local Task18 audit, không audit toàn PhaseIII hoặc audit lại PhaseII.

## Nguồn thực có đã đối chiếu

| Nhóm | Tài liệu / code |
| --- | --- |
| Master/canon/questions | [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định](../PROJECT_DECISIONS.md), [open questions](../OPEN_QUESTIONS.md) |
| Creature/roster | [Quy](../creatures/QUY_HAI_UYEN.md), [stage matrix](../creatures/SACRED_EVOLUTION_MATRIX.md), [bible](../creatures/CREATURE_DESIGN_BIBLE.md), [roster](../creatures/CREATURE_ROSTER_REGISTER.md), [abilities](../gameplay/SACRED_CREATURE_ABILITIES.md) |
| Resonance/story | [R03](../lore/RESONANCE_RULES.md), [memory](../lore/ANCESTRAL_MEMORY.md), [Chapter I](../story/CHAPTER_01_QUY.md), [S05 events](../story/STORY_IMPLEMENTATION_HANDOFF.md), [opening Task17](CHAPTER1_OPENING_OVERVIEW.md), [E01 objectives](OPENING_QUEST_AND_EVENTS.md), [opening save](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md) |
| Elements | [tổng quan](../elements/ELEMENTAL_SYSTEM_OVERVIEW.md), [statuses](../elements/STATUS_EFFECTS.md), [reactions](../elements/ELEMENTAL_REACTIONS.md) |
| Evolution/progression | [V13](../evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [triggers](../evolution/EVOLUTION_TRIGGER_MODELS.md), [P15](../progression/PROGRESSION_SYSTEM_OVERVIEW.md), [mastery](../progression/SKILL_MASTERY.md), [progression data](../technical/PROGRESSION_DATA_SPEC.md) |
| Combat/loadout | [C14](../combat/COMBAT_SYSTEM_OVERVIEW.md), [movement/defense](../combat/MOVEMENT_AND_DEFENSE.md), [HP/recovery](../combat/INCAPACITATION_AND_RECOVERY.md), [L16](../loadout/LOADOUT_SYSTEM_OVERVIEW.md), [ownership](../loadout/FORM_STATE_OWNERSHIP.md), [boss guard](../loadout/BOSS_LOADOUT_LOCK.md) |
| Data/reward | [R03 data](../technical/RESONANCE_DATA_MODEL.md), [V13 data](../technical/EVOLUTION_DATA_SPEC.md), [W07](../world/WORLD_STATE_TRANSITIONS.md), [P15 receipts](../economy/REWARD_CONSISTENCY.md), [pipeline](../technical/CREATURE_CONTENT_PIPELINE.md) |
| Art/runtime | [asset register](../ASSET_REFERENCE_REGISTER.md), [visual standards](../creatures/CREATURE_VISUAL_STANDARDS.md), [animation standard](../art/CREATURE_ANIMATION_REQUIREMENTS.md), [runtime evidence](../technical/QUY_RUNTIME_GAP_ANALYSIS.md) |

Không có Art Bible tên riêng được xác minh trong review; dùng standards/register thực có. PNG header atlas Phượng kiểm được192×288, metadata96cell/2poses/3rows và right mirror; không Quy asset/playback. Không dựa ảnh chưa xác minh để gọi art-ready.

## 15 yêu cầu nội bộ

| # | Đối chiếu / kết quả ở tài liệu | Bằng chứng / hạn chế |
| --- | --- | --- |
| 1 | Đạt: Quy first playable Sacred | Overview/ecology giữ E01, không đổi sang Phượng |
| 2 | Đạt: Thủy/rùa nước cổ | Forms/visual matrix; no second element/dragon head |
| 3 | Đạt: đủ ba stages | Forms có 18 field cho từng stage; names/anatomy còn proposal |
| 4 | Đạt ở design: khác anatomy rõ | Mai/rãnh/vây/đuôi/nhịp và silhouette, không scale-only; chưa kiểm ảnh thật |
| 5 | Đạt ở scope: I được ưu tiên | First playable không cần II/III production assets |
| 6 | Đạt ở contract: C14 phases/defense | Chấn Mai startup/active/recovery/dedupe, finite short brace không S2 sớm |
| 7 | Đạt ở framework: V13/P15 | Species XP owner, meaningful proof, no skill future-stage prerequisite; thresholds chưa duyệt |
| 8 | Đạt ở contract: L16 | Một species/form ba stages; ownership/snapshot/lock giữ, không reset nợ |
| 9 | Đạt: Task17 giữ nguyên | Memory trước resonance, form trước practice, b09 replay; E01/mq_01 không rename |
| 10 | Đạt: không mandatory three | One-Quy route, D41, no dual-species gate |
| 11 | Đạt: HP/resources chưa approve | Q18-U03, C14A = L16B individual recommendation, emergency transfer vẫn PROPOSED |
| 12 | Tương thích có điều kiện với camera | Prototype x–y/integer follow; production depth/envelope C14-U01/U02 còn gate, không bơi3D tự do |
| 13 | Đạt ở graph/route contract | Contextual I không env_quy_route II; safe return, old receiver compatibility; Task19 phải kiểm map thật |
| 14 | Đạt: asset readiness trung thực | Quy Missing/Unverified, Phượng atlas không thay Quy, no new art |
| 15 | Đạt trong phạm vi thay đổi | Kiểm hash bảo toàn existing content và non-document files; chỉ append navigation/backlinks |

## Các rủi ro đã làm rõ

Stage và ability cùng `quy_s1/s2/s3` không rename; typed refs loại bỏ ambiguity ở schema, không hai registry mới. Short brace I khác Mai Định Áp II. Cơ cấu E01 context I không phải năng lực chuyển nhánh II. Requirement I→II không cần S2, II→III không cần S3. S3 combat effect không tự commit restoration world facts. Species/form/stage, visual/footprint/hurt/attack bounds và source-level/recipient-level reward identities đều tách đúng owner.

Quy Thủy không auto Wet/immune, không toàn biển reaction chain; status/reaction/cast/source budgets cùng owners E09/C14. HP0 không tự defeat hoặc approve transfer; no full heal từ evolution/switch. Content version/animation rename không mở reward source mới. Các corrections PhaseII được giữ, không ledger authoritative mới.

## Kết luận và điều kiện bàn giao

**CONDITIONAL PASS cho Task19 thiết kế sau khi có yêu cầu riêng; chưa production/gameplay-ready.** Q18-U01–U06 phải giải theo thời điểm triển khai tương ứng. Task19 có thể thiết kế topology/receiver tier trung tính, nhưng không chốt production dimensions/clearance hoặc gate skill II/III chưa có đường progression bảo đảm. Reference/asset, current/input/geometry/camera, combat health/resource/guard policies, save/memory receipt/migration và progression thresholds đều còn dependencies rõ.

Đủ 17 deliverables được liên kết từ [tổng quan](QUY_DESIGN_OVERVIEW.md). 30 ca [QA](../technical/QUY_TEST_CASES.md) là **PLANNED / NOT EXECUTED**, không kết quả chạy gameplay. Validation tĩnh chỉ kiểm tệp/link/Markdown/identity và diff; không claim browser playback, performance hoặc device support. Không tự bắt đầu Task19 hay Tasks25–48, không tự commit/push docs Task17/18.

Kết quả validation tĩnh đã thực hiện: đủ 17 tài liệu mới; 173 relative links hợp lệ trong phần Task18; bảng/code fences và whitespace đạt; đủ 18 trường mô tả mỗi stage và 30 ca QA PLANNED. Hash comparison xác nhận mọi tệp trước Task18 giữ nguyên, ngoại trừ sáu tệp chỉ append phần điều hướng/backlink; 14 tài liệu Task17 không bị sửa. Git cuối vẫn HEAD 387b29d trên work, không staged changes/commit/push mới; có sáu tracked files modified và 31 tài liệu untracked tổng cộng của Task17–18.
