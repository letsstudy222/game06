# Phase I handoff — hướng dẫn cho nhiệm vụ tiếp theo

Task08/96, baseline `7125160`. **Audit hoàn tất; Phase I PARTIAL, không full production freeze.** Không tự bắt đầu Task09 hoặc implementation. Đây là hướng đọc/authority và gates, không GDD thứ hai.

## Đọc theo thứ tự

1. [Master GDD](GAME_DESIGN_DOCUMENT.md): overview14 sections, baseline vs proposals vs runtime.
2. [PROJECT_DECISIONS](PROJECT_DECISIONS.md): D01–D40, metadata A08-01–15, inherited proposal index, source priority và approved supersession history. [OPEN_QUESTIONS](OPEN_QUESTIONS.md) chỉ queue/gates, không nguồn câu trả lời khác.
3. [Completion audit](PHASE_I_COMPLETION_AUDIT.md) và [consistency log](DESIGN_CONSISTENCY_REPORT.md): inventory actual/mapping equivalents, C08-01 blocker và evidence limits.
4. [Implementation readiness](IMPLEMENTATION_READINESS.md) + [dependency map](DESIGN_DEPENDENCY_MAP.md): target task READY/CONDITIONAL/BLOCKED và dữ liệu phụ thuộc.
5. [Asset register](ASSET_REFERENCE_REGISTER.md): Task08 readiness section, actual files/dimensions/classification/missing; đừng tìm file ASSET_READINESS_REGISTER không tồn tại.
6. Chỉ sau đó đọc chi tiết theo work package dưới và kiểm actual source/status/HEAD trước sửa.

## Source-of-truth map

| Work package | Authoritative detailed sources | Không được suy ngầm |
| --- | --- | --- |
| Vision/scope | GAME_VISION, CORE_DESIGN_PILLARS, PROJECT_SCOPE | Prototype Dawn là Quy slice hoặc Nhật Diệm canon |
| Lore/elemental/Task09 | lore/ELEMENTAL_COSMOLOGY, WORLD_HISTORY, ANCIENT_CATASTROPHE, CHAPTER_REVELATIONS | Lôi/Kim còn chỉ candidate baseline: D38 mới xác nhận; full roster/interactions vẫn mở |
| Spirit/core/resonance | lore/RESONANCE_DECISION_RECORD, SPIRIT_IDENTITY, LIFE_CORE_AND_IMPRINT, RESONANCE_RULES, ANCESTRAL_MEMORY | B+C/HP0/cost/resurrection/consent đã approved vì docs chi tiết |
| Switch/progression | gameplay/TRANSFORMATION_DESIGN, CREATURE_PROGRESSION_CONCEPT; technical/RESONANCE_DATA_MODEL/EDGE_CASES | R03 full-three và S05 empty locked cùng có thể implement; cần decision A08-05 |
| Four species/stages/art | creatures/* species, SACRED_EVOLUTION_MATRIX, SACRED_ART_REQUIREMENTS; gameplay/SACRED_CREATURE_ABILITIES/SACRED_SYNERGIES | Legend=III, stage chỉ resize, Long worm, Ly Life là combat element thứ hai |
| Story/event/quest | story/STORY_IMPLEMENTATION_HANDOFF owns24 main IDs/completion; QUEST_DESIGN_OUTLINE và STORY_TIMELINE là projections; NARRATIVE_REVELATION_MATRIX owns placement trong lore bounds | Optional species/memory/faction trở thành main requirement hoặc boss defeat=network stable |
| NPC/boss/faction | story/MAJOR_CHARACTERS_AND_FACTIONS và MAJOR_CONFLICTS_AND_BOSSES; factions/* | Requested ANTAGONIST_DESIGN/BOSS_BRIEFS literal files có thật, membership/leaders đã approved |
| Ecology/rewards | ecology/*; gameplay/ENEMY_ARCHETYPES và ENCOUNTER_AND_REWARD_DESIGN | Adapted=corrupt, rarity=behavior, defeat=unlock, mọi loài drop coins |
| World/state/save | world/WORLD_STATE_ARCHITECTURE, WORLD_STATE_TRANSITIONS; technical/PERSISTENT_WORLD_DATA_SPEC; chapter tables/population/quest rules | Phase/count/ecology là mutable stores khác, load replay grants, UI settings là gameplay save |
| Revisit/world consequence | story/CHAPTER_TRANSITIONS và WORLD_STATE_CONSEQUENCES, world/ECOLOGY_AND_SPAWN_STATES | Có REGION_REVISIT_DESIGN/FACTION_AND_WORLD_CONSEQUENCES file riêng, all species ở chỗ cũ mãi |
| Generic content architecture | technical/CREATURE_DATA_SPEC, FACTION_ENEMY_DATA_MODEL, PERSISTENT_WORLD_DATA_SPEC + audit actual src | Data definitions đã implemented hoặc mọi mechanic không cần reusable code |

Tên MemoryRecord trong W07 là shorthand AncestralMemoryRecord Task03; không tạo store song song. EncounterDefinition và ConditionalEncounter tách definition/eligibility/outcome như [crosswalk](DESIGN_DEPENDENCY_MAP.md), schema final phải được audit/approve. Không chọn framework/storage bằng tên entity.

## Quy tắc freeze/change control

- Bảo tồn CONFIRMED, current runtime/art/settings; đọc source priority trước sửa. SUPERSEDED giữ old/new source, không xóa lịch sử. Task08 D18/D38 change là explicit baseline mới, không promote toàn L02-P04.
- Proposal mechanics có thể được review nhưng không tự đưa vào production vì có stable ID. Approval phải nêu ID/phạm vi/outcome/source và cập nhật affected docs/validation. C08-01 chưa giải thì không phát hành boss I với policy tùy lập trình viên chọn.
- First playable D40 nhỏ hơn ChapterI; chưa cần boss/full-three/3factions/4chapters. Gate P0 đúng subset: body/defeat/caps/scope/save + art Quy/underwater/anchors. Deep cosmic truths giữ mở nếu task không cần.
- Read-only repository audit/Task09 design có đủ nguồn để nhận task mới; quyền sửa code/art không được suy từ việc hoàn tất PhaseI audit. User đã cho tự thực hiện nhiệm vụ/push, không hỏi lại permission cho công việc được giao; product approvals còn thiếu ghi register.

## Chuẩn bị Task09 — Elemental System Design

Khi có yêu cầu riêng: đọc D04/D09/D10/D18/D31/D36/D38/D39, cosmology, assimilation, abilities/synergies, creature data và active asset limits. Xác định native vs foreign affinity, Life authority khác combat Wood, single/dual affiliation và effect/receiver boundaries. Roster ngoài baseline, khắc chế/damage/status interactions/cost/stack/TTL và numbers chưa chốt. Task08 không thiết kế chúng thay Task09; cần đánh dấu proposed và testable examples, không morality theo element.

## Khi được giao repository audit / playable implementation

Audit actual PlayerPhoenix/SkillSystem/IslandScene/GameState/islands/AssetLoader/UISettings/build/test trước chọn reusable module seams. Không đổi engine/refactor lớn tự động. Lập schema/adapter/validation/migration nhỏ, giữ nhat-diem.ui.v1 và legacy keys. Chỉ task code riêng mới viết loader/modules/save logic.

Để vào playable Quy implementation: P0 decisions/actual assets/capability+clearance/main route+save contract phải đủ cho subset. Chứng minh lần lượt movement/combat/resonance/persistent event/reload, rồi browser/touch/collection-safe return; không gọi design tests WST đã pass runtime. Complete ChapterI thêm approved boss/roster/progression/quest coverage. Later chapters chỉ mở sau nền đã kiểm.

## Verification baseline và reporting

Task08 chạy 30 baseline tests và read-only PNG/manifest checks; xem TASK08_CHANGELOG. Chưa fresh browser playback/real devices/Windows hoặc future-world tests. Build hiện chỉ đóng app/assets/screenshots, không docs; docs được xem bằng GitHub Markdown, game UI giữ nguyên. Sau task docs kiểm link/IDs/status/source/graph và git diff chỉ Markdown. Task code sau chạy tests đúng thay đổi và báo limitations; không dùng CI baseline pass làm bằng chứng features mới.
