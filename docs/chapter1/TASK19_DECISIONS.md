# Quyết định và approval gates Task19

## Nền kế thừa

| Trạng thái | Nguồn / phạm vi |
| --- | --- |
| CONFIRMED | Vực Hải Uyên/Quy Thủy mở đầu, ba major stages, D29 memory trước resonance/thân; thế giới ghi nhớ và quay lại; D05/D06/D07/D41 tối đa ba dạng/một active, boss membership lock, XP riêng và không mandatory full-three early |
| PROPOSED | S05 event/quest IDs và placement, R03/W07 mechanics/transactions, C04/V13/C14/P15/L16 và O17/Q18 detailed anatomy/input/save/HP/progression; dùng lại không phê duyệt thêm |
| UNRESOLVED | Q01–Q05 lịch sử/vật mang, production plane/depth/input/physics/geometry/camera, save/asset/encounter/retry/thresholds; không map tự giải |
| SUPERSEDED | H08-S01 ending cũ “phát hiện cổng” đã thay D26 tái kích hoạt; giữ historical record, không revive hoặc sửa status |

Nguồn [PROJECT_DECISIONS](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md). Không có layout/tên sub-location/zone ID mới được CONFIRMED từ Task19. `hai_uyen/chapter_01` giữ S05/W07; hy_* chỉ proposals content map, không gameplay schema/code đã có.

## Đề xuất

| ID / status | Nội dung / owner file | Cần duyệt trước |
| --- | --- | --- |
| H19-P01 PROPOSED | [Overview](VUC_HAI_UYEN_WORLD_OVERVIEW.md), x–y candidate và minimum/core/optional scope | Scope/prototype planning, không default cả9 zones production |
| H19-P02 PROPOSED | [Hierarchy](CHAPTER1_REGION_HIERARCHY.md), typed IDs/camera alternatives | Map/loader/coordinate/layer architecture |
| H19-P03 PROPOSED | [Graph](CHAPTER1_WORLD_GRAPH.md), [zones](CHAPTER1_ZONE_DESIGNS.md), 9 functional zones/13 connectors | Blocking layout/names/content IDs và main/return guarantees |
| H19-P04 PROPOSED | [Main route](CHAPTER1_MAIN_ROUTE.md), learning/pacing/refuges | Playtest/scope freeze, chưa measured durations |
| H19-P05 PROPOSED | [Biomes](CHAPTER1_BIOMES.md), [habitats](CHAPTER1_CREATURE_HABITATS.md) | Roster/habitat/art/spawn content; external refs chưa approved |
| H19-P06 PROPOSED | [Currents/hazards](CHAPTER1_CURRENTS_AND_HAZARDS.md), local bounded physics cues | Movement/current/pressure/visibility implementation |
| H19-P07 PROPOSED | [Ruins](CHAPTER1_ANCIENT_RUINS.md), [puzzles](CHAPTER1_ENVIRONMENTAL_PUZZLES.md) | Narrative/evidence/receiver/source scripts và art |
| H19-P08 PROPOSED | [Gates/shortcuts](CHAPTER1_GATES_AND_SHORTCUTS.md), accessible navigation và no-softlock | Main graph validation trước production, advanced optional route rules |
| H19-P09 PROPOSED | [Persistent bindings](CHAPTER1_PERSISTENT_ENVIRONMENT.md), one owner và W07 boundaries | Save/world/quest adapter/migration, không store thứ hai |
| H19-P10 PROPOSED | [Boss area](CHAPTER1_BOSS_AREA_HANDOFF.md), [exit/return](CHAPTER1_EXIT_AND_RETURN.md) | Boss spatial constraints/entry/retry và E06 transition implementation |
| H19-P11 PROPOSED | [Art](../art/CHAPTER1_WORLD_ART_HANDOFF.md), [12entity data spec](../technical/CHAPTER1_MAP_DATA_SPEC.md), [35future QA](../technical/CHAPTER1_MAP_TEST_CASES.md) | Asset pipeline/content validation và runtime nghiệm thu |

## Những quyết định còn thiếu

| ID / status | Câu hỏi / phụ thuộc | Chặn gì / cách bàn giao hiện tại |
| --- | --- | --- |
| H19-U01 UNRESOLVED | C14-U01/Q18-U02 production projection, depth/layer hit rules, coordinate/room/streaming/camera envelope | Chặn final map dimensions/geometry/loader; x–y chỉ prototype recommendation, graph topology neutral |
| H19-U02 UNRESOLVED | Q18-U02/U03 movement/input/current bands/caps, pressure tolerance/short brace/skill unlock availability | Chặn playable lanes/hazards/collision tuning; main design chỉ I/cơ cấu context, không force/resource số |
| H19-U03 UNRESOLVED | L16/C14 boss identity/spatial kit, entry/snapshot/abort/retry/HP/recovery | Chặn production arena/boss implementation; approach/prep/outcome boundary neutral, D41 không reopen |
| H19-U04 UNRESOLVED | Q16/W07/O17-U04 durable writer/atomicity/memory receipt/migration/anchor recovery | Chặn persistent demo/release; một ledger/source identity, không fake localStorage game save |
| H19-U05 UNRESOLVED | B12 roster approval, wildlife/species/secondary sources, biome tolerance và coverage | Chặn claim full collection-safe ecology/spawn production; ref_i_* vẫn external/unverified |
| H19-U06 UNRESOLVED | Q05 vật mang/Q18 art reference, environment tile families/provenance, min-device/performance scope | Chặn final production art/asset/readability certification; dùng neutral source và kit backlog |
| H19-U07 UNRESOLVED | Duyệt zone names/topology/room counts, optional tier graph và Q06 pacing/scope | Chặn design freeze/production layout; first playable chỉ A+nearB, không all9 mandatory |

Q01/Q02/Q04 không cần trả lời để tiếp tục thiết kế Chapter I, nhưng không được resolve bằng inscription/memory/map reveal. Evolution/XP/resource/HP alternatives vẫn proposal, không mở mandatory tier II/III main gate khi chưa guarantee progression. Các condition approved trước implementation phải có decisionRef, không dựa số lần lặp đề xuất. Task20 chỉ tiếp nhận conditional design handoff khi có đề bài riêng; không bắt đầu tự động.
