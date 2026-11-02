# Task15 — local compatibility audit và delivery index

Ngày 31/10/2026 Asia/Saigon; baseline HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`. Có 17 Task14 docs và bốn index files đã sửa trước Task15; giữ nguyên nội dung đó. [Decisions](TASK15_DECISIONS.md) là status/gate register. Chỉ documentation, không full audit09–16/Task16.

## Repository sources đã đối chiếu

Đọc toàn văn hoặc phần liên quan ở các đường dẫn thực dưới; không claim file thiếu đã đọc. Tasks01–14 được review theo sources liên quan, không full retrospective audit mỗi file.

| Actual path(s) | Evidence / liên hệ |
| --- | --- |
| docs/GAME_DESIGN_DOCUMENT.md, PROJECT_DECISIONS.md, OPEN_QUESTIONS.md | Hierarchy/status/D05–08/D31/D37/D39–41, unresolved mechanics/numerics/PhaseI PARTIAL |
| docs/gameplay/CREATURE_PROGRESSION_CONCEPT.md; docs/technical/RESONANCE_DATA_MODEL.md, CREATURE_DATA_SPEC.md | R03 owner/species/form identities, active-only/floor proposals, C04 curve/growth/skills refs, no per-encounter creature instance |
| docs/creatures/SACRED_EVOLUTION_MATRIX.md; docs/evolution/EVOLUTION_TRIGGER_MODELS.md, TASK13_DECISIONS.md, EVOLUTION_AND_LOADOUT.md, EVOLUTION_GAMEPLAY_CHANGES.md; docs/technical/EVOLUTION_DATA_SPEC.md | Sacred stages/skill minimums, ModelD/eligibility/safe commit/gates, material proof vs spend, no XP/unlock reset |
| docs/creatures/CREATURE_CLASSIFICATION_OVERVIEW.md, RARITY_SYSTEM.md; docs/gameplay/CREATURE_COLLECTION_VALUE.md | Rarity/role/playability/progression khác nhau, nonplayable journal, no common obsolescence hoặc RNG kill checklist |
| docs/gameplay/ELEMENTAL_COMBAT_BALANCE.md, DUAL_ELEMENT_BALANCE.md | Shared action budgets/cause normalization, dual không better/full-kit double budget, no passive reserve heal/refill |
| docs/combat/COMBAT_SYSTEM_OVERVIEW.md, DAMAGE_RESOLUTION.md, INCAPACITATION_AND_RECOVERY.md, COMBAT_VERTICAL_SLICE.md, FORM_SWITCHING_COMBAT.md, TASK14_DECISIONS.md, TASK14_CONSISTENCY_AUDIT.md | Đủ Task14 doc delivery nhưng C14 mechanics chưa approved/runtime-ready; source snapshots/HP0/pending config/reward boundary |
| docs/world/WORLD_STATE_TRANSITIONS.md; docs/technical/PERSISTENT_WORLD_DATA_SPEC.md | W07 single writer/atomic source-outcome-payload-ledger-recipient, backup/migration/loss/return/habitat safety |
| docs/gameplay/ENCOUNTER_AND_REWARD_DESIGN.md | F06 nonlethal/material origins, ordinary vs unique, prior proof; historical full-three wording không override D41 |
| src/island/SkillSystem.mjs, GameState.mjs, PlayerPhoenix.mjs; source search src/island | Hit/cooldown/target respawn/shrine/hazard/recovery hiện có; không actual species EXP/levels/loot/mastery/inventory progression resolver được thấy. Không lấy target respawn làm repeat reward implementation |

`docs/progression/` và `docs/economy/` chưa tồn tại trước Task15. Sources Task13 dùng đúng các paths thực ở bảng trên; không suy ra approved mechanic từ tên tài liệu hoặc runtime prototype.

## 18 required deliverables

| File | Task15 requirement coverage |
| --- | --- |
| [PROGRESSION_SYSTEM_OVERVIEW](PROGRESSION_SYSTEM_OVERVIEW.md) | Philosophy/ownership/independent species §2–3 |
| [EXPERIENCE_SYSTEM](EXPERIENCE_SYSTEM.md) | Five source categories+memory, A/B/C/D comparison/participation §4–5 |
| [LEVEL_CURVES](LEVEL_CURVES.md) | Curve approaches/version/cap/extension §6 |
| [ATTRIBUTE_GROWTH](ATTRIBUTE_GROWTH.md) | Bounded stats/anatomy/stage/context/safe benefit mapping §7 |
| [SKILL_MASTERY](SKILL_MASTERY.md) | Unlock/upgrade/mastery/evolution distinctions, meaningful proof §8 |
| [CATCH_UP_PROGRESSION](CATCH_UP_PROGRESSION.md) | A–E options/minimal B-as-D foundation, no stacked buffs §10 |
| [EVOLUTION_PROGRESSION_INTEGRATION](EVOLUTION_PROGRESSION_INTEGRATION.md) | V13 source reuse/proof/spend/safe commit/migration §9 |
| [REWARD_SYSTEM](../economy/REWARD_SYSTEM.md) | Six encounter categories/seven nonlethal/exploration activities §11–12 |
| [LOOT_TABLE_DESIGN](../economy/LOOT_TABLE_DESIGN.md) | Six types/eligibility/repeatability/feedback, random alternatives §13 |
| [RESOURCE_ECONOMY](../economy/RESOURCE_ECONOMY.md) | Five resource category evaluation/limited ChapterI scope §14 |
| [INVENTORY_REQUIREMENTS](../economy/INVENTORY_REQUIREMENTS.md) | Ownership/stack/capacity/quest/spend/overflow/save §15 |
| [REWARD_CONSISTENCY](../economy/REWARD_CONSISTENCY.md) | Lifecycle/atomicity/exploit safeguards/failure boundaries §16/20 |
| [CHAPTER_PROGRESSION_BALANCE](CHAPTER_PROGRESSION_BALANCE.md) | EarlyI/laterI/II/III/IV qualitative power/competencies §17 |
| [FIRST_PLAYABLE_PROGRESSION](FIRST_PLAYABLE_PROGRESSION.md) | One-form Quy provisional demonstrator/gates §18 |
| [PROGRESSION_DATA_SPEC](../technical/PROGRESSION_DATA_SPEC.md) | 13 contracts, purpose/required/optional/relations/owner/validation/persistence/migration §19 |
| [PROGRESSION_TEST_CASES](../technical/PROGRESSION_TEST_CASES.md) | 34future cases, all30required scenarios + extra concurrency/exploit cases §21 |
| [TASK15_DECISIONS](TASK15_DECISIONS.md) | CONFIRMED, P15-P01–P17 PROPOSED, P15-U01–U10 UNRESOLVED, SUPERSEDED continuity |
| TASK15_CONSISTENCY_AUDIT (this file) | Sources/delivery/local15checks/risks/handoff §23–24 |

## Local consistency review — không runtime pass

| # | Requirement / design finding |
| --- | --- |
| 1 | Species/form canonical record giữ cumulative XP/derived level/unlocks/mastery refs/committed stage, no duplicates |
| 2 | ModelD normalized budget cho 1–3 eligible forms, no full-three gate/passive reserve bonus; source-bound credit không payout-active steal |
| 3 | Rarity/dual/Sacred không XP/stat multiplier; common/single utility qua stage/profile/context |
| 4 | Exploration/discovery/quest/resonance/memory có source rewards, no peaceful wildlife kill/grind-only progression |
| 5 | Species XP khác mastery evidence, unlock/upgrade/evolution; empty cast/self-farm không mastery |
| 6 | V13 requirements/eligibility/transition owners giữ, no XP reset/skill erase/optional-lore gate, source spend grammar explicit |
| 7 | Foundation same milestone all unlocked forms, top-up not package, no strongest-copy/heal/auto mastery/stage |
| 8 | Eligibility/occurrence/source permissions/once-vs-repeat per manifest, respawn callback không đủ |
| 9 | Unique claim existing ledger view, canonical key independent contentVersion/recipient switch, reload no reroll/regrant |
| 10 | Resource purpose/source/sink/scarcity/protection coherent, fragments proofs not currency, no crafting/gear economy auto |
| 11 | Quy demo nhỏ: XP/level proof + combat/observation/unique/save, no full inventory/threeforms/evolution/boss |
| 12 | No final max/XP curve/CD/drop rate/growth/formula/chapter bracket/stack numbers approved |
| 13 | W07 whole bundle/outcome/receipt/inventory/recipient/world proof, prior proof/revision/backup/loss gates align |
| 14 | New species refs curve/growth/skills/mastery/resonance/habitat; missing curve fail-ready, no species-name core branch |
| 15 | Documentation-only changes; pre-task hashes bảo vệ source/assets/UI/maps/saves/data/lockfile và Task14 docs. Existing index additions append-only |

## Compatibility decisions và implementation risks

| Severity / issue | Resolution trong design / required next gate |
| --- | --- |
| P0 / R03 active-only vs new D | Hai proposals khác nhau, không confirmed conflict. Task15 preferred D có source/attribution/catch-up guard, R03 history không rewrite thành đã approved; cần P15-U01 |
| P0 / Task14 docs complete, combat chưa implemented/approved | No fake participation/HP/DoT fixtures; C14-U01–10 và Quy asset/module scope trước code |
| P0 / no runtime XP/reward writer | Cần domain adapter/ledger/atomic storage/ack/migration/backup, P15-U09/W07; không implement trong docs task |
| P0 / partial reward/item loss | One candidate includes XP+inventory ownership/retained entitlement+claim+world proof; capacity policy P15-U08 chưa selected, no silently missing unique item |
| P1 / maxHP growth vs evolution | Level-up absolute currentHP no-heal proposal, evolution ratio R03/V13 proposal separate; concurrent safe mapping order, U03 trước apply |
| P1 / curve extension/cap rebalance | Keep cumulative earned XP/receipt and curve version; explicit earned-level preservation migration, no regrant perks on derive |
| P1 / support/participation spam | Coalesced meaningful evidence/per-occurrence budget/caps, no self-created farm; criteria/weights/scheduling U01/U06 |
| P1 / resource gate softlock | Prefer proofs/minimal materials, protected deterministic source/repair and W07 return/coverage; no mandatory RNG drop |
| P1 / old save/content unknown IDs | Typed aliases/backup/quarantine/last-good; preserve claims/balances/skills/mastery, no unsupported execute or arbitrary reset |
| P2 / balance/device evidence | Curves/budgets/Chapter pacing chưa numeric/QA; later tests/playtest/device measurements cần riêng, không kết quả giả |

## Verification và Task16 handoff

Đã kiểm: đủ 18 tệp yêu cầu, 13 entities mỗi entity có purpose/required/optional/relationships/ownership/validation/persistence/migration; 34 case IDs liên tiếp/không trùng; local links, số cột bảng và P15-P01–P17/U01–U10 refs hợp lệ. `git diff --check` đạt. Hash đối chiếu pre-task xác nhận toàn bộ tracked files và 17 Task14 documents giữ nguyên trừ năm append-only documentation updates: README, GDD, PROJECT_DECISIONS, OPEN_QUESTIONS và CREATURE_PROGRESSION_CONCEPT. Không thay phần nội dung có trước của các tệp đó. Các future QA chưa executed, không gameplay/browser/build run cho docs-only task. Existing onboarding/Task14 validation không progression runtime evidence. No code/save/UI/asset change là scope check, không chứng nhận hệ mới hoạt động.

Đủ bộ design inputs để review/chuẩn bị Task16 khi được giao; **chưa implementation-ready** vì models/thresholds/attribution/HP/resources/loot/inventory/storage/assets còn P15-U gates. PhaseI vẫn PARTIAL. Không bắt đầu Task16 hoặc full audit09–16, không commit/push tự động trong yêu cầu tài liệu này.
