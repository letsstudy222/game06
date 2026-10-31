# Kiểm tra nhất quán cục bộ Task19

## Baseline và bảo toàn công việc

Repository `https://github.com/letsstudy222/game06.git`, branch `work`, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, ngày kiểm tra 31/10/2026 (Asia/Saigon). Năm PhaseII handoff commits bcdfe73, 936f74f, 28fed70, 518f5d5, 387b29d đã được kiểm là ancestors. Trước Task19 có sáu tracked files modified và 31 docs untracked của Tasks17–18; không staged changes. Task17 đủ14docs, Task18 đủ17docs, có nội dung thực tại working tree; không nhận chúng là commits GitHub.

Chỉ thêm19 tài liệu Task19 và append điều hướng ở README/GDD/PROJECT_DECISIONS/OPEN_QUESTIONS. Không ghi đè Task17/18/source world contracts; không reset/merge/discard/stage/commit/push. Source text và non-document files được kiểm hash/prefix trước/sau. Các ghi chú “Task19 chưa bắt đầu” ở handoff cũ là lịch sử, không sửa để giả baseline đã commit.

## Nguồn đối chiếu

| Nhóm | File references thực |
| --- | --- |
| Master/canon/lore | [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định](../PROJECT_DECISIONS.md), [questions](../OPEN_QUESTIONS.md), [Chương I](../story/CHAPTER_01_QUY.md), [S05 events](../story/STORY_IMPLEMENTATION_HANDOFF.md), [revelation matrix](../story/NARRATIVE_REVELATION_MATRIX.md) |
| World authority | [W07 architecture](../world/WORLD_STATE_ARCHITECTURE.md), [transitions](../world/WORLD_STATE_TRANSITIONS.md), [Chapter I states](../world/CHAPTER_01_WORLD_STATES.md), [sinh thái](../world/ECOLOGY_AND_SPAWN_STATES.md), [presentation](../world/ENVIRONMENT_STATE_PRESENTATION.md), [quest deps](../world/QUEST_WORLD_STATE_RULES.md), [persistent data](../technical/PERSISTENT_WORLD_DATA_SPEC.md) |
| Opening/Quy | [Task17 spatial](OPENING_LEVEL_HANDOFF.md), [first resonance](FIRST_QUY_RESONANCE.md), [quest](OPENING_QUEST_AND_EVENTS.md), [save](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md), [Task18 movement](QUY_UNDERWATER_MOVEMENT.md), [environment](QUY_ENVIRONMENTAL_ABILITIES.md), [first playable](QUY_FIRST_PLAYABLE_SCOPE.md), [khoảng cách runtime](../technical/QUY_RUNTIME_GAP_ANALYSIS.md) |
| Systems/roster | [Elemental environment](../elements/ENVIRONMENTAL_INTERACTIONS.md), [combat plane](../combat/COMBAT_SYSTEM_OVERVIEW.md), [P15](../progression/PROGRESSION_SYSTEM_OVERVIEW.md), [L16 boss guard](../loadout/BOSS_LOADOUT_LOCK.md), [bible](../creatures/CREATURE_DESIGN_BIBLE.md), [roster](../creatures/CREATURE_ROSTER_REGISTER.md), [asset register](../ASSET_REFERENCE_REGISTER.md) |
| Runtime đọc tĩnh | [DawnMap](../../src/island/DawnMap.mjs), [DawnSample](../../src/island/DawnSample.mjs), [islands](../../src/island/islands.mjs), [WorldLayer](../../src/island/WorldLayer.mjs), [geometry](../../src/island/geometry.mjs), [Camera](../../src/island/Camera.mjs), [GameState](../../src/island/GameState.mjs) |

Runtime evidence: DawnMap có tile32/40×28 grid, DawnSample cũng tile32; đây không final kích thước map Hải Uyên. WorldLayer render/cull semantic tile grid qua Camera; chưa loader/streaming zone graph Hải Uyên. canOccupy chặn deep/shallow/cliff, PlayerPhoenix/controller và GameState reset actor/targets/shrine không làm underwater persistence. W07/C14 design docs không bằng chứng gameplay đã hoạt động.

## 15 acceptance checks

| # | Kết luận ở tài liệu | Evidence / giới hạn |
| --- | --- | --- |
| 1 | Đạt: bắt đầu đúng Task17 | A map localAreaRefs opening_z01–06, memory trước resonance/form, practice sau form |
| 2 | Đạt: theo Quy Task18 | Accessible x–y candidate, current local, I receiver riêng II/III, no aquatic immunity |
| 3 | Đạt ở conceptual graph | Main A–B–C–E–G–H, về G/E05→I; không gate cycle |
| 4 | Đạt: optional không chặn main | D/F/optional collection bị bỏ vẫn đủ route; F không main clue |
| 5 | Đạt ở requirement graph | Main dùng guaranteed Quy I; skill unlock thực vẫn approval/implementation gate, không Phượng trước arrival |
| 6 | Đạt ở handoff | Gate cue cơ cấu/rãnh/refuge/mốc, no color-only/invisible wall |
| 7 | Đạt ở contract | Mỗi connector return policy, preflight placement/route/clearance; map thật chưa có để chứng minh physical reachability |
| 8 | Đạt: one owner W07 | Event/owned variants→projection/collision/nav/habitat; no saved phase enum/zone ledger |
| 9 | Đạt: boss approach compatible | Prep ngoài threat, E04 boundary giữ membership lock/switch eligible; D41 one-form early constraint |
| 10 | Đạt: revisit | E05 shortcuts/refuge, E06 return durable, no source regrant |
| 11 | Đạt: mystery preserved | Ruins CL01–05/point-of-view memories, không origin/catastrophe chronology mới |
| 12 | Có điều kiện: art production realistic | Shared kits, no verified underwater/Quy production art; external refs vẫn unverified |
| 13 | Đạt: minimum nhỏ hơn full chapter | A+nearB/one route/one receiver/save demo; không cần H/F hoặc all9 tilemaps |
| 14 | Đạt: runtime gaps rõ | Geometry land-only/water blocked, renderer/camera reusable primitives nhưng zone streaming/current/save mới |
| 15 | Đạt trong scope | Hash/prefix/diff kiểm bảo toàn code/map/sprites/UI/collision/save/config, chỉ docs |

## Cross-source risks và điều chỉnh

E04 chỉ conflict outcome, E05 mới water_stable, E06 mới arrived/return; graph không dùng boss reward như restoration fact. E03 proof/receiver ở E trước eg, main pressure/current lane I không yêu cầu env_quy_route II hoặc optional species. F là optional deep route có gate/retreat, không main memory. Derived sea_* phases vẫn W07, design regions con không tạo RegionState mới.

Roster `ref_i_*` chưa approved species IDs, habitat matrix chưa chứng minh full collectible coverage; spawn production chặn H19-U05. Story names/IDs và map hy_* vẫn PROPOSED; stable logical source/claim không đổi bởi content version hoặc zone rename. E01 memory receipt trước form vẫn O17-U04; Task19 không giả giải schema đó. Boss HP0 guard/emergency transfer status giữ, không moveset/HP/retry policy mới.

## Readiness

**CONDITIONAL PASS cho bàn giao thiết kế Task20 sau khi có yêu cầu riêng; chưa production/gameplay-ready.** H19-U01–U07 cần duyệt theo phase: topology/names/scope, projection/geometry/current/input, boss spatial/retry policy, save/receipt/migration, roster/coverage, art/device constraints. Không phải mọi câu hỏi lore/HP/XP phải resolve trước topology neutral, nhưng không production freeze khi map/envelope/route/asset chưa được kiểm thật.

[Tổng quan](VUC_HAI_UYEN_WORLD_OVERVIEW.md) liên kết đủ19 deliverables; 12 conceptual map entities và35 future QA scenarios không loader hoặc tests chạy thực tế. Local check chỉ Task19, không PhaseIII-wide audit, không tự bắt đầu Task20 hoặc tạo map/code/art/config/save.

Kết quả validation tĩnh đã thực hiện: đủ19 tài liệu, 149 relative links hợp lệ, Markdown tables/fences và whitespace đạt; đúng9 zones/13connectors/12entities/35future QA. Kiểm conceptual graph tại7 snapshots tiến trình đạt main reachability khi bỏ D/F, return-edge symmetry và E03/E05/E06 gate separation; không thay runtime/navmesh/playtest. Hash/prefix comparison bảo toàn mọi tệp trước Task19, chỉ bốn navigation files append. Cuối bàn giao vẫn work/387b29d, không staged/commit/push mới; working tree tổng Tasks17–19 có sáu tracked files modified và50 docs untracked.
