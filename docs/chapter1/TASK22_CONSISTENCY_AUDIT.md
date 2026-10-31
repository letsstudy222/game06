# Local consistency audit Task22

Nội dung side quest mới vẫn **PROPOSED**. Kiểm tài liệu không gameplay execution hoặc approval/layout/species/boss freeze.

## Actual baseline và protection

Repository `https://github.com/letsstudy222/game06.git`, branch `work`, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, kiểm ngày31/10/2026 (Asia/Saigon). Năm PhaseII handoff commits bcdfe73, 936f74f, 28fed70, 518f5d5, 387b29d ancestor checks đạt. Before Task22 có sáu tracked files modified và84docs untracked Tasks17–21, không staged. PhaseI/II và docs prerequisite Tasks17–21 thực có; không claim uncommitted docs là commits GitHub.

Task22 thêm17docs + append bốn navigation files, không sửa source S05 optional/main IDs, Q21 main DAG/register, H19 graph, E20 species/roster, old save/policies/art/code. Hash/prefix checks bảo toàn mọi nội dung có trước ngoài các appends được nêu. No reset/discard/merge/stage/commit/push, no PhaseIII-wide audit hoặc Task23 auto start.

## Authoritative sources được đối chiếu

| Nhóm | Paths thực |
| --- | --- |
| Early baseline/master/canon | [PhaseI handoff](../PHASE_I_HANDOFF.md), [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định](../PROJECT_DECISIONS.md), [questions](../OPEN_QUESTIONS.md), [Chapter I](../story/CHAPTER_01_QUY.md) |
| S05/Q21 quest authority | [S05 outline/optional register](../story/QUEST_DESIGN_OUTLINE.md), [event contracts](../story/STORY_IMPLEMENTATION_HANDOFF.md), [Q21 register](CHAPTER1_MAIN_QUEST_REGISTER.md), [main DAG](CHAPTER1_QUEST_DEPENDENCY_GRAPH.md), [quest-zone](CHAPTER1_QUEST_ZONE_MATRIX.md), [objectives](CHAPTER1_QUEST_OBJECTIVES.md), [state/reward](CHAPTER1_QUEST_WORLD_STATES.md), [technical quest data](../technical/CHAPTER1_QUEST_DATA_SPEC.md) |
| H19/E20 ecology/map | [World graph](CHAPTER1_WORLD_GRAPH.md), [zone designs](CHAPTER1_ZONE_DESIGNS.md), [sinh cảnh](CHAPTER1_HABITAT_MATRIX.md), [species register](CHAPTER1_SPECIES_REGISTER.md), [tương tác ngoài chiến đấu](CHAPTER1_NONCOMBAT_INTERACTIONS.md), [cộng hưởng](CHAPTER1_RESONANCE_OPPORTUNITIES.md), [ecology states](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), [persistent environment](CHAPTER1_PERSISTENT_ENVIRONMENT.md) |
| Resonance/memory/Quy | [R03 rules](../lore/RESONANCE_RULES.md), [ancestral memories](../lore/ANCESTRAL_MEMORY.md), [revelations](../story/NARRATIVE_REVELATION_MATRIX.md), [Q21 memory](CHAPTER1_MEMORY_DISTRIBUTION.md), [Quy environment](QUY_ENVIRONMENTAL_ABILITIES.md), [Q18 first scope](QUY_FIRST_PLAYABLE_SCOPE.md) |
| State/progression/evolution | [W07 quest rules](../world/QUEST_WORLD_STATE_RULES.md), [transitions](../world/WORLD_STATE_TRANSITIONS.md), [P15 rewards](../economy/REWARD_CONSISTENCY.md), [tiến trình phát triển](../progression/PROGRESSION_SYSTEM_OVERVIEW.md), [V13 evolution](../evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [L16 boss](../loadout/BOSS_LOADOUT_LOCK.md), [asset register](../ASSET_REFERENCE_REGISTER.md) |

S05 opt_01 E02/opt_02 E03 và opt_03 E08 được giữ. Cái mới: two early major IDs/source object instances và optional memoryId/event binding proposals, không overwrite existing source semantics. Known wildlife refs vẫn external/unverified, không claim đã xem missing concept images hoặc đủ production sprites. Những source/art/runtime gaps còn S22-U01–U07.

## 15 local checks

| # | Kết luận ở design docs | Evidence / giới hạn |
| --- | --- | --- |
| 1 | Đạt: optional | DAG chỉ main→side, source main files không chỉnh, bỏ all optional không đổi M1→M6 |
| 2 | Đạt: no optional species/power gate | Side knowledge/local convenience, no boss-essential stat/skill/unapproved species capture |
| 3 | Đạt conceptual: đúng H19 graph | Zone matrix reuse IDs/connectors, local alcove/panel không new zone edge; physical blocking chưa có |
| 4 | Đạt: E20 status | Sáu ref_i_* external unverified, no official IDs/element/playability promotion |
| 5 | Đạt ở contract: Quy I first slice | New quiet refuge after E01, context receiver/observe/return baseline, not existing opt_01 prerequisite rewrite |
| 6 | Đạt: R03 scope | Observe/eligibility/attempt/unlock/bestiary/lore tách, opt_03 E08 giữ, fallback no retro form by version |
| 7 | Đạt: non-hostile no kill | Major quests không combat, territorial/assimilation defense chỉ expansion approved contexts |
| 8 | Đạt: W07/Q21 ownership | Local patches một owner, no E03/E05/E06 facts override, five-facing status+Q21 ready/overlays read models |
| 9 | Đạt ở spec: reward framework | Same RewardGrantLedger, canonical optional sources/legacy grants và main/E20 shared component exclusion; exact schema/source mapping gate |
| 10 | Đạt: pre/post explicit | Four majors+activities+expansions variants, no damage recreation, no deliberately missable portfolio core |
| 11 | Đạt: memory boundaries | New optional fragment draft không first_sense/current reuse; no origin/cause/era reveal, afterE05 source/archival |
| 12 | Đạt: no cycle | Dependency diagram no side→main/side reward own-cap loop, advanced activity explicit cap source |
| 13 | Đạt: missing assets/code disclosed | Generic/low-scope chưa art/AI/current/geometry/save implementation, content not production-ready |
| 14 | Đạt: shared schema | Ten views/specializations Q21, no side quest engine/second completion/ledger |
| 15 | Đạt trong edit scope | Hash/prefix/diff chỉ17newdocs+four nav appends, runtime/maps/art/UI/save/config giữ |

## Những xung đột/nguy cơ đã được xử lý trong phạm vi

S05 opt_01 đã E02 nên first optional prototype dùng new opt_c1_quiet_refuge sau E01, không đổi ID/purpose/prereq legacy. opt_03 E08 là late revisit, không early ChapterI form guarantee. Proposed optional event bindings aliases/extend cùng W07 catalog, canonicalOptionalSource/legacy grants giữ, không `grant_evt_*` mới cho cùng optional result hoặc duplicate completion records.

opt_02 S05 chưa concrete optional memoryId: mem_quy_refuge_margin mới collision-check/proposed, không lấy main E01/E03 fragment làm unique reward mới; provenance/source/representation approval vẫn blocker. Optional fragmented viewpoint không reveal spirit/catastrophe/Q05 hay ending canon. Missing concept image không fabricate nguồn; no species promotion bằng tên.

PostE05 already-safe variants verify current/proof thay sửa hỏng; source claim cùng identity và reward ceiling, no reroll/extra reward hoặc main restoration overwrite. Same physical source/component main/E20/side wrapper dedupe/exclude; prior proof eligible nhận recognition không auto XP. StageI side không cần rare form/evolution/deep F; new form/envelope/route phải validator trước unsafe entry.

## Readiness

**CONDITIONAL PASS cho design handoff Task23 sau yêu cầu riêng; chưa implementation/production-ready.** Full source bindings/predicates, local room geometry/current/return, official species/asset/behavior scope, optional memory provenance, W07/Q21/P15 completion-source-alias/stacking/recipient/save mapping, R03 conditional form eligibility và cue/device limits vẫn cần duyệt. Side quests không điều kiện để Task23 guarantee one-Quy main boss route, không optional reward sole counterplay.

[Tổng quan](CHAPTER1_SIDE_QUEST_OVERVIEW.md) linked đủ17deliverables, four majors21fields, four light activities/two expansions, six category taxonomy, ten data structures,40future QA. Static checks chỉ files/links/IDs/DAG/owner-preservation, không gameplay/test execution, no Task23 hoặc PhaseIII audit tự chạy.

Kết quả validation tĩnh đã thực hiện: đủ17docs mới,127relative links hợp lệ, Markdown tables/code fences/whitespace đạt. Kiểm4major quests×21fields/10portfolio entries/24unique dialogue IDs/6proposed event bindings/10data structures/40future QA; new quest/event/dialogue/memory keys không collision baseline. DAG acyclic, không optional→main và M1→M6 reachable khi bỏ toàn optional nodes; không runtime tests. Hash/prefix comparison giữ toàn pre-existing source content, chỉ bốn navigation files append. Cuối bàn giao vẫn work/387b29d, không staged/commit/push mới; tổng Tasks17–22 có sáu tracked files modified và101docs untracked.
