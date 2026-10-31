# Nhiệm vụ phụ Hải Uyên — tò mò có giá trị

**PROPOSED S22-P01–P10**, trừ canon được dẫn rõ. Side quests tạo hiểu biết sinh thái/điểm nhìn/đường đi/quan hệ, không kill quota/fetch/grind hoặc reward mạnh đến mức bắt buộc. Main `mq_01–06` giữ S05/Q21 và H19 graph, không dependency/reward/capture từ side quests. D29/D41/Quy-first và foreign-not-evil giữ **CONFIRMED**; artwork/species/boss/HP/manifestation/save policies còn **PROPOSED/UNRESOLVED**, historical **SUPERSEDED** không đổi.

Nguồn: [S05 optional contracts](../story/QUEST_DESIGN_OUTLINE.md), [Q21 main graph](CHAPTER1_QUEST_DEPENDENCY_GRAPH.md), [H19 world graph](CHAPTER1_WORLD_GRAPH.md), [E20 ecology](CHAPTER1_ECOLOGY_OVERVIEW.md), [W07 quest rules](../world/QUEST_WORLD_STATE_RULES.md). Task22 mở rộng definitions/consumers của cùng quest architecture, không side-quest engine, world graph hoặc reward ledger khác.

## Các scope khác nhau

| Loại | Ý nghĩa / nguồn | Không suy |
| --- | --- | --- |
| Fully optional quest | Có source/trigger/sequence/completion/first-clear riêng, main không đọc nó như prerequisite | Không mandatory stat/skill/route để thắng boss |
| Optional objective trong main | B09 replay, optional dialogue/lore trong source quest Task17/Q21 | Không clone thành quest thưởng riêng chỉ để pay lại cùng proof |
| Main-progress unlocked side | opt_01 sau E02, opt_02 sau E03; mới có prerequisite nêu rõ | Cạnh main→side một chiều, side không unlock main |
| Restoration-affected side | Objective/presentation đổi theo E05 nhưng logical source/claim giữ | Không reset environment để tái diễn hỏng hoặc reward version mới |
| Repeat ecological activity | Luyện/quan sát lại nhận feedback; reward lặp chỉ có approved occurrence policy | Không every input/flow toggle/new spawn mint EXP/mastery |
| One-time discovery | Knowledge/memory/source researched với stable identity | Replay presentation không first-clear lần hai |

## Taxonomy thực dụng

| Category | Narrative value / gameplay | Capability | Reward / replay | Production / accessibility |
| --- | --- | --- | --- | --- |
| Ecological assistance | Giữ một niche sống, đọc nguồn→chỉnh receiver→kiểm lại | Quy I context/read flow, nguồn/route viable | Knowledge/local improvement first-clear, feedback replay | Reuse weak-current/substrate kit, cue nét/chữ/pose không audio-only |
| Exploration/discovery | Landmark/ngõ có đường về, thấy không gian đã có nghĩa mới | I hoặc explicit late tier, no unavailable main cap | Route clue/local convenience, discovery unique | Reuse rooms/rock kit, no new huge zone, landmark visible màn nhỏ |
| Ruins/memory | Point-of-view cổ không trọn, khảo cứu dấu→tiếp xúc source | Quy I structure tại E accessible sau E03 | Optional memory một lần, replay/archive nguồn | Cần approved fragment/source/provenance, short/skip/caption |
| Resonance/knowledge | Phân biệt behavior/eligibility/source/unlock | Observe/context, playable route chỉ nếu approved | Knowledge fallback; form không promised nếu chưa approved | Missing reference/controller ghi gate; không mọi wildlife có capture ritual |
| Movement/environment | Đọc lane/hãm/return, áp dụng tool đã học | I baseline challenge; F advanced chỉ expansion | Mastery opportunity theo P15 nếu author, no mandatory upgrade | Reuse current/receiver, no frame-perfect/timer bắt buộc/new physics engine |
| Optional combat/defense | Giữ refuge/territory có lý do, nonlethal outcome nếu authorized | C14 basic/short brace sau lesson, approved actor profile | Source outcome/research, loot/EXP chỉ manifest approved | Later scope, warning/retreat và control-lock safe, no all-hostile/forced kill |

## Scope được khuyến nghị, chưa approved count

Bốn quest major fully specified, bốn lightweight activities, hai expansion candidates. Một major mới ở B là FIRST PLAYABLE CANDIDATE; không cần cả portfolio hoặc six wildlife production cho prototype. Reuse opt_01/02; không kéo opt_03 từ E08 về early ChapterI. Tổng scope là planning proposal, không canon quota/release commitment. Chỉ gameplay docs; không code/data/map/art/UI/save hoặc Task23 tự bắt đầu.

## Chỉ mục17deliverables

- [Register](CHAPTER1_SIDE_QUEST_REGISTER.md), [four designs](CHAPTER1_SIDE_QUEST_DESIGNS.md), [ecology](CHAPTER1_ECOLOGICAL_SIDE_QUESTS.md), [exploration](CHAPTER1_EXPLORATION_SIDE_QUESTS.md).
- [Memory](CHAPTER1_MEMORY_SIDE_QUESTS.md), [resonance](CHAPTER1_RESONANCE_SIDE_QUESTS.md), [dialogue](CHAPTER1_SIDE_QUEST_DIALOGUE.md).
- [Zone matrix](CHAPTER1_SIDE_QUEST_ZONE_MATRIX.md), [system matrix](CHAPTER1_SIDE_QUEST_SYSTEM_MATRIX.md), [world-state/reward](CHAPTER1_SIDE_QUEST_WORLD_STATES.md), [availability/lifecycle](CHAPTER1_SIDE_QUEST_AVAILABILITY.md).
- [First side slice](CHAPTER1_FIRST_SIDE_QUEST_SLICE.md), [10entity data spec](../technical/CHAPTER1_SIDE_QUEST_DATA_SPEC.md), [40future QA](../technical/CHAPTER1_SIDE_QUEST_TEST_CASES.md), [decisions](TASK22_DECISIONS.md), [audit](TASK22_CONSISTENCY_AUDIT.md).
