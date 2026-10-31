# Local consistency audit Task21

Các chi tiết mới vẫn **PROPOSED**; validation thiết kế không phê duyệt gameplay hoặc chứng minh runtime hoạt động.

## Baseline thực tế và bảo toàn công việc

Repository `https://github.com/letsstudy222/game06.git`, branch `work`, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, ngày31/10/2026 (Asia/Saigon). Năm PhaseII handoff commits bcdfe73, 936f74f, 28fed70, 518f5d5, 387b29d được kiểm là ancestors. Trước Task21 có sáu tracked files modified và68docs untracked Tasks17–20, không staged. Các task prerequisite có docs thật trong working tree, không claim đã commit/GitHub synchronized cho phần uncommitted đó.

Task21 tạo16docs và append bốn chỉ mục, giữ source files/Task17–20 contents và graph/roster/event contracts. Không reset/discard/merge/stage/commit/push. Hash/prefix comparison kiểm pre-existing files; không gameplay/quest scripts/map/scenes/sprite/animation/UI/save/production JSON/config changes. Đây là local Task21 check, không PhaseIII-wide audit.

## Sources đối chiếu

| Nhóm | File paths thực |
| --- | --- |
| Canon/master/story | [GDD](../GAME_DESIGN_DOCUMENT.md), [decisions](../PROJECT_DECISIONS.md), [questions](../OPEN_QUESTIONS.md), [Chapter I](../story/CHAPTER_01_QUY.md), [quest IDs](../story/QUEST_DESIGN_OUTLINE.md), [event authority](../story/STORY_IMPLEMENTATION_HANDOFF.md) |
| Task17 | [Opening](CHAPTER1_OPENING_OVERVIEW.md), [resonance](FIRST_QUY_RESONANCE.md), [beats](OPENING_BEAT_SHEET.md), [quest/evidence](OPENING_QUEST_AND_EVENTS.md), [save contract](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md), [dialogue](OPENING_DIALOGUE.md) |
| Task18 | [Quy overview](QUY_DESIGN_OVERVIEW.md), [movement](QUY_UNDERWATER_MOVEMENT.md), [environment](QUY_ENVIRONMENTAL_ABILITIES.md), [scope](QUY_FIRST_PLAYABLE_SCOPE.md), [combat](QUY_COMBAT_DESIGN.md) |
| Task19 | [Graph](CHAPTER1_WORLD_GRAPH.md), [zones](CHAPTER1_ZONE_DESIGNS.md), [main route](CHAPTER1_MAIN_ROUTE.md), [gates](CHAPTER1_GATES_AND_SHORTCUTS.md), [persistence](CHAPTER1_PERSISTENT_ENVIRONMENT.md), [boss area](CHAPTER1_BOSS_AREA_HANDOFF.md), [exit/return](CHAPTER1_EXIT_AND_RETURN.md) |
| Task20 | [Ecology](CHAPTER1_ECOLOGY_OVERVIEW.md), [species register](CHAPTER1_SPECIES_REGISTER.md), [noncombat](CHAPTER1_NONCOMBAT_INTERACTIONS.md), [world ecology](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), [first ecology slice](CHAPTER1_FIRST_PLAYABLE_ECOLOGY.md) |
| System owners | [R03 rules](../lore/RESONANCE_RULES.md), [ancestral memory](../lore/ANCESTRAL_MEMORY.md), [S05 revelations](../story/NARRATIVE_REVELATION_MATRIX.md), [W07 quest rules](../world/QUEST_WORLD_STATE_RULES.md), [world transitions](../world/WORLD_STATE_TRANSITIONS.md), [persistent data](../technical/PERSISTENT_WORLD_DATA_SPEC.md), [P15 ledger](../economy/REWARD_CONSISTENCY.md), [C14](../combat/COMBAT_SYSTEM_OVERVIEW.md), [L16 lock](../loadout/BOSS_LOADOUT_LOCK.md) |

Không có main quest runtime implementation được suy từ các documents. Existing prototype Phượng/geometry nước bị chặn/settings localStorage vẫn gaps Q18/H19; Task21 không sửa chúng hoặc claim quest tests đã chạy.

## 17 validation checks

| # | Kết luận ở tài liệu | Evidence / giới hạn |
| --- | --- | --- |
| 1 | Đạt: theo source Chapter I arc | Six acts map six S05 quests, III/IV cùng mq_03, no new quest count/canonical boss name |
| 2 | Đạt: Task17 reuse | opening_b01–10/opening_* và E01 source→memory→form→practice, no duplicate event IDs |
| 3 | Đạt: Quy capabilities | Main I/context receiver/basic/read flow, no S2/III/threshold mandatory |
| 4 | Đạt conceptual: H19 graph giữ | Zone matrix đúng IDs/13connector semantics, E03 proofs ở E trước eg, E05 không cần I trước |
| 5 | Đạt: E20 scope/status | Wildlife references chưa approved, passive không kill gate, generic knowledge không fake species journal |
| 6 | Đạt ở dependency/capability contract | Main Quy I route có source/return, actual geometry/assets/caps còn gates |
| 7 | Đạt: no optional collection requirement | D/F/secondary forms/memories optional, no unapproved named species unlock gate |
| 8 | Đạt: main DAG một chiều | E01→E02→E03→E04→E05→E06, subproof groups không own-form/own-gate cycle |
| 9 | Đạt: single authority | Source events/owned patches/proof ở W07/domain owners, status/completion records views |
| 10 | Đạt ở spec: idempotency | Same RewardGrantLedger source claim trước recipients, _form khác parent, version không regrant |
| 11 | Đạt: lock khác switch | Boss handoff giữ membership frozen nhưng eligible frozen members switch allowed |
| 12 | Đạt: no mandatory3 | D41 và intended Quy I route, Task23 author one-form counterplay còn required |
| 13 | Đạt ở contract: optional/revisit access | E05 coverage/refuge/secondary source và E06 return; physical content chưa production |
| 14 | Đạt: mysteries giữ | Memory/clue provenance và limited POV, Q01–Q05 không tự resolve, foreign không evil |
| 15 | Đạt: proposals explicit | Q21 register/acts/objectives/dialogue/lifecycle/new refs PROPOSED, no D approval mới |
| 16 | Đạt: reload/interrupt/recovery | State model/prior proofs/missing source/storage/alias/attempt boundaries và40future QA |
| 17 | Đạt trong edit scope | Hash/prefix/diff chỉ new16docs + four navigation appends, code/assets/maps/UI/save không đổi |

## Các điểm cần reconciliation đã ghi rõ

S05 quest outline/event contracts vẫn authority, register Task21 là decomposition view. Six-act structure không tách mq_03 thành hai event hoặc đưa main proof vào F optional. Form E01 khác parent practice; UI alias thiếu không được grant lại hay derive parent từ form alone. Memory E01 trước form giữ O17-U04 unresolved; mem_quy_current E03 source payload khác optional xem presentation/all extra fragments, không must-collect lore mới.

E04 boss_or_alternative vẫn proposal; Task23 phải chốt qualifying threat/permission/refuge outcome và one-Quy kit; DEFEAT_BOSS không universal kill condition. E04 completion khác E05 restoration, khác E06 arrival/return. Boss reward có mà E05 fail không đấu lại boss hoặc suy water_stable; giữ committed facts/last-good và retry E05.

QUEST partial/failed/suspended là overlays/read model, không second permanent enum. QuestCompletionRecord là existing source ref/view, không store hoặc grant writer mới. Early proofs được eligible/revalidate, không tự bỏ source/predecessor gating. Slice E01+partial E02 không fake complete E02 bằng generic feeder; approved species/source scope/encounter/CL03 còn content gates.

## Readiness

**CONDITIONAL PASS cho design handoff Task22 sau yêu cầu riêng; chưa implementation/production-ready.** Q21-U01–U07 chặn source predicates/fixtures, physical route/caps, Task23 encounter/HP/retry policies, W07 save/memory receipt/migration, approved species/actors/assets, reward payload và narrative/localization/Task24 staging. Completion semantics rõ ở mức contract; thiếu approved physical predicates/kit/assets không được gọi là runtime-ready.

Đủ16deliverables linked từ [overview](CHAPTER1_MAIN_QUEST_OVERVIEW.md), six quest dossiers19fields, objective taxonomy/source contracts, dialogue,12entities và40future QA. Static validation kiểm files/links/tables/IDs/graph/ownership-preservation, không gameplay execution. Không bắt đầu Task22/23/24 hoặc PhaseIII audit.

Kết quả validation tĩnh đã thực hiện: đủ16docs mới,131relative links hợp lệ; Markdown tables/code fences và whitespace đạt. Kiểm6quest dossiers×19fields,10objective types,30unique c1q_dialogue IDs không trùng nguồn cũ,12entities/40future QA và source event/zone refs hợp lệ. Conceptual DAG topological sort/main reachability không có optional branches đạt; không gameplay/navmesh tests. Hash/prefix comparison giữ toàn bộ pre-existing content, chỉ bốn navigation files append. Cuối bàn giao work/387b29d, không staged/commit/push mới; tổng Tasks17–21 còn sáu tracked files modified và84docs untracked.
