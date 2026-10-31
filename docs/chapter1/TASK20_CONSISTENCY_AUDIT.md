# Local consistency audit Task20

Các chi tiết ecology mới vẫn **PROPOSED**; kiểm tra tài liệu không phê duyệt cơ chế hoặc chứng minh gameplay đã hoạt động.

## Baseline và prerequisite evidence

Repository `https://github.com/letsstudy222/game06.git`, branch `work`, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, kiểm ngày31/10/2026 (Asia/Saigon). Có năm PhaseII commits bcdfe73, 936f74f, 28fed70, 518f5d5, 387b29d và kiểm ancestor thành công. Trước Task20 có sáu tracked files modified và50 docs untracked Tasks17–19, không staged. tám hồ sơ audit cục bộ Phase II và Task17/18/19 prerequisite files accessible; Task17/18/19 docs có trong working tree, không claim đã commit/push GitHub.

Task20 thêm18docs và append bốn navigation files, không thay source map/roster/spec Task17–19, không reset/discard/stage/commit/push. Hash/prefix comparison kiểm bảo toàn toàn bộ pre-existing content trừ append được chỉ rõ. Đây chỉ audit cục bộ Task20, không PhaseIII-wide audit hoặc gameplay execution.

## Sources thực được đối chiếu

| Nhóm | Paths |
| --- | --- |
| Master/canon/story | [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định](../PROJECT_DECISIONS.md), [questions](../OPEN_QUESTIONS.md), [Chapter I arc](../story/CHAPTER_01_QUY.md), [S05 events](../story/STORY_IMPLEMENTATION_HANDOFF.md) |
| Ecology và cosmology | [F06 behaviors](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [assimilation](../ecology/ELEMENTAL_ASSIMILATION.md), [E09 elements](../elements/ELEMENT_DEFINITIONS.md), [E10 dual](../elements/DUAL_ELEMENT_OVERVIEW.md), [statuses](../elements/STATUS_EFFECTS.md) |
| Creature scopes | [Bible](../creatures/CREATURE_DESIGN_BIBLE.md), [classification matrix](../creatures/CREATURE_CLASSIFICATION_MATRIX.md), [roster](../creatures/CREATURE_ROSTER_REGISTER.md), [playability](../creatures/PLAYABILITY_CLASSIFICATION.md), [collection](../gameplay/CREATURE_COLLECTION_VALUE.md), [progression concept](../gameplay/CREATURE_PROGRESSION_CONCEPT.md), [P15 rewards](../economy/REWARD_CONSISTENCY.md) |
| Opening/Quy | [Task17](CHAPTER1_OPENING_OVERVIEW.md), [quest](OPENING_QUEST_AND_EVENTS.md), [save](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md), [Quy ecology](QUY_ECOLOGY_AND_LORE.md), [di chuyển](QUY_UNDERWATER_MOVEMENT.md), [scope](QUY_FIRST_PLAYABLE_SCOPE.md) |
| Map/world/encounter | [Task19 graph](CHAPTER1_WORLD_GRAPH.md), [zones](CHAPTER1_ZONE_DESIGNS.md), [sinh cảnh](CHAPTER1_CREATURE_HABITATS.md), [persistence bindings](CHAPTER1_PERSISTENT_ENVIRONMENT.md), [W07 ecology](../world/ECOLOGY_AND_SPAWN_STATES.md), [phase](../world/CHAPTER_01_WORLD_STATES.md), [transitions](../world/WORLD_STATE_TRANSITIONS.md), [C14](../combat/COMBAT_SYSTEM_OVERVIEW.md), [L16 boss guard](../loadout/BOSS_LOADOUT_LOCK.md) |
| Art/runtime evidence | [Asset register](../ASSET_REFERENCE_REGISTER.md), [animation standard](../art/CREATURE_ANIMATION_REQUIREMENTS.md), [Quy art](../art/QUY_ART_PRODUCTION_SPEC.md), [actual manifest](../../assets/production/manifest.json), [khoảng cách runtime](../technical/QUY_RUNTIME_GAP_ANALYSIS.md) |

Manifest/PNG header inspection xác nhận existing Phoenix atlas192×288/frame96; không fresh image/playback hoặc verified Quy/wildlife image. Sáu wildlife tên có text records ref_i_* thật, nhưng artwork/species approval không verified. Không fabricated image/source hoặc official species IDs; không production data sửa.

## 18 acceptance checks

| # | Kết luận ở design docs | Evidence / giới hạn |
| --- | --- | --- |
| 1 | Đạt: roster-grounded references | Register reuse đúng6 ref_i_* và Quy, nhãn external đầy đủ |
| 2 | Đạt: không promote canon | Species ID/element/origin/stages/playability gates rõ; new text không approval |
| 3 | Đạt: đúng graph | Habitat matrix đúng9 hy_zone_*; không cạnh/tên canonical map mới |
| 4 | Đạt: Quy identity giữ | Dossier Sacred Thủy, no apex/capture/second affinity |
| 5 | Đạt: wildlife không all hostile | Passive/filter/grazer/observer riêng, warning local/retreat, A/H prep safe |
| 6 | Đạt: scopes tách | Discovery/observation/playability/availability/unlocked/combat eligibility độc lập |
| 7 | Đạt: stable vs forced vs temporary | Adaptation matrix/F06 evidence, không diagnosis một cue |
| 8 | Đạt: foreign không evil | Stable dual coexistence, distress không taxonomy/morality |
| 9 | Đạt: không Earth confirmed | Ốc element UNRESOLVED, đá/material không affinity |
| 10 | Đạt ở proposal: distinctive ecology | Seven dossiers20fields/body movement/niche; chưa kiểm actual images |
| 11 | Đạt: overlap được flag | Sứa–polyp/carp–ray/snail–Quy/cá ngựa distinctions, art revision gate |
| 12 | Đạt: main không optional capture | Quy I main H19, F/D/opportunity optional, no full3 |
| 13 | Đạt ở contract: revisit/source coverage | E05 preserves habitats/secondary source, E06 return, undiscovered coverage; final species còn gate |
| 14 | Đạt ở scope | One generic ambient/observable recipe + receiver/proof, hostile recommended sau safe lesson, all6/boss deferred |
| 15 | Đạt: owner/reward reuse | R03/P15/W07 progression/collection/ledger, no ecology claimed store |
| 16 | Đạt ở schema handoff | Typed stable IDs + reusable definitions, future reclassification explicit, no auto grant |
| 17 | Đạt: asset honesty | Concept/approved/sprite/validated/integrated tách, Missing/Unverified disclosed |
| 18 | Đạt trong phạm vi thay đổi | Only18docs + navigation appends, code/scene/art/tilemap/UI/save/config hashes giữ |

## Rủi ro và mâu thuẫn đã làm rõ

Bản ghi có tên trong repository khác verified concept/ảnh; Chapter I native-ecology title không xác nhận origin sáu reference. Hai secondary hai-stage là planning target, ordinary một primary form là target, không thêm player stages/official IDs. Sứa/carp là optional playable candidates, ordinary discoverable/nonplayable chỉ recommendation, không phép gameplay confirmed.

Generic ambient source của minimum slice có knowledge interaction proof, không fake species discovery; exact source/reward-component binding chưa author nên chặn implementation chứ không bỏ dedupe. Food web/relations không confirmed biology/history và không yêu cầu đầy persistent population simulation. Territorial/predatory khác assimilation và all-hostile; E05 không xóa adapted habitat hoặc mọi predator.

W07 sea_* phases vẫn projections; E01 form trước practice, E04 conflict khác E05 restoration, E06 arrival/return riêng. Cùng reward ledger/source identity giữ qua version/revisit/switch; no infinite observation/assist/reinfect loot. Unique actor/outcome khác ambient respawn, no cloned NPC hoặc half-hit restore. Main graph Task19 không sửa, no optional species gate.

## Readiness

**CONDITIONAL PASS cho bước thiết kế Task21 khi có đề bài riêng; chưa gameplay/production-ready.** E20-U01–U07 theo dõi species/art approval, optional playability/route/controllers, plane/AI/current/geometry/performance, reward/health/resource, save/receipt/unique actor coverage/migration, adaptation evidence và scope/devices. Có thể tiếp tục design trung tính nhưng không claim complete runtime ecosystem hoặc full collection coverage khi roster còn drafts.

[Tổng quan](CHAPTER1_ECOLOGY_OVERVIEW.md) liên kết đủ18deliverables, bảy dossier20fields, tám archetypes, 12dataentities và35future QA. Tất cả gameplay tests **PLANNED / NOT EXECUTED**; static checks chỉ file/link/structure/status/identity/preservation. Không PhaseIII audit, không Task21 tự bắt đầu, không code/art/map/UI/save hoặc production JSON mới.

Kết quả validation tĩnh đã thực hiện: đủ18docs mới,136 relative links hợp lệ; Markdown tables/code fences/whitespace đạt. Kiểm7dossiers×20fields,6reference keys đúng roster với external label,8archetypes,9zone IDs đúng graph H19,12entities và35future QA. Hash/prefix comparison giữ mọi pre-existing file, chỉ bốn navigation files append; không đổi authoritative roster/graph hoặc application/visual assets. Cuối bàn giao vẫn work/387b29d, không staged/commit/push mới; tổng Tasks17–20 có sáu tracked files modified và68 docs untracked. Đây không phải gameplay test completion.
