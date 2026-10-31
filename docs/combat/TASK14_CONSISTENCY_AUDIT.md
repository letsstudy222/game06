# Task14 — local consistency audit và delivery index

Baseline `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, ngày 31/10/2026 Asia/Saigon, branch `work`. Documentation/system design only. [Decision register](TASK14_DECISIONS.md) giữ trạng thái/approval; PhaseI PARTIAL. Task15 chưa bắt đầu. Audit này chỉ phạm vi Task14, không full Tasks09–16 audit.

## Repository review và evidence

| Source đã đối chiếu (toàn văn hoặc phần liên quan) | Điều rút ra / giới hạn |
| --- | --- |
| README, package.json, docs/DEVELOPMENT_WORKFLOW.md, docs/architecture.md | Workflow hiện hữu, Node24/Playwright/static server; không đổi engine/controller, không runtime test cho design chưa có |
| GAME_DESIGN_DOCUMENT, PROJECT_DECISIONS, OPEN_QUESTIONS | GDD là index, D05/06/07/31/39/40/41 và pending A08 gates; không nâng proposals thành approval |
| lore/LORE_CONSISTENCY_AUDIT, lore/RESONANCE_DECISION_RECORD | Task02 historical cosmology không ghi đè D38; Task03 physical B+C/resources vẫn pending, source lore không suy từ respawn Phoenix |
| gameplay/TRANSFORMATION_DESIGN, CREATURE_PROGRESSION_CONCEPT; technical/RESONANCE_DATA_MODEL | Up-to-three/empty/current D41; same formId progression, HP/CD/reload/emergency transfer là R03 proposals |
| creatures/QUY_HAI_UYEN, PHUONG_HOANG_NHAT_DIEM, LONG_THIEN_PHONG, LY_VAN_SINH; gameplay/SACRED_CREATURE_ABILITIES | Approved identities khác detailed stage/skills; quy_basic/quy_s1 candidates, quy_s2 minimum II không auto grant ở I |
| story/MAJOR_CONFLICTS_AND_BOSSES; gameplay/ENEMY_ARCHETYPES | Task05 boss roles chưa identities/patterns; F06 chín templates, elite overlay; exact `arch_environmental_boss` ID giữ |
| world/WORLD_STATE_TRANSITIONS; technical/PERSISTENT_WORLD_DATA_SPEC | W07 single writer/revision/grant keys/outcome/route safety, no combat callback writes milestone |
| elements/TASK09_DECISIONS, TASK10_DECISIONS, ELEMENTAL_AFFINITIES, ELEMENTAL_REACTIONS, STATUS_EFFECTS; technical/ELEMENTAL_DATA_SPEC, DUAL_ELEMENT_DATA_SPEC | E09/E10 Model C proposals, normalized causes, finite reaction inputs/output non-reactive, status owners và minimal obligations chưa approved |
| creatures/COMBAT_ROLE_TAXONOMY, CREATURE_DESIGN_BIBLE; art/CREATURE_ANIMATION_REQUIREMENTS | K11 role/rarity khác power, B12 actual clip/anchor/marker gates; không every species every clip |
| evolution/TASK13_DECISIONS, EVOLUTION_AND_LOADOUT, EVOLUTION_ASSET_CONTRACT; technical/EVOLUTION_DATA_SPEC | V13 safe explicit stage transition/config freeze vẫn pending; stage khác boss phase, no HP/CD cleanse/reset |
| src/island/main, InputManager, PlayerPhoenix, SkillSystem, GameState, AnimationController, Camera, geometry, IslandScene (.mjs) | Actual Canvas2D/input/world plane/instant melee/fire/gai/respawn; static source inspection, không claim gameplay run Task14 |

## Delivery mapping — đủ 17 required files

| File | Scope / Task14 sections |
| --- | --- |
| [COMBAT_SYSTEM_OVERVIEW](COMBAT_SYSTEM_OVERVIEW.md) | Pillars, plane, scope, balance §1–3/20 |
| [PLAYER_COMBAT_STATES](PLAYER_COMBAT_STATES.md) | 12 states, transitions/interrupt/input/accessibility §4/19 |
| [BASIC_ATTACK_SYSTEM](BASIC_ATTACK_SYSTEM.md) | Phases, four styles, target/hit/animation §5 |
| [ACTIVE_SKILL_SYSTEM](ACTIVE_SKILL_SYSTEM.md) | 12 categories, lifecycle, resource A/B/C §6–7 |
| [MOVEMENT_AND_DEFENSE](MOVEMENT_AND_DEFENSE.md) | Four anatomy profiles, defense comparison/Quy minimal §8–9 |
| [DAMAGE_RESOLUTION](DAMAGE_RESOLUTION.md) | Ordered contact/result/reaction/defeat, dedupe §10 |
| [HITBOX_AND_COLLISION](HITBOX_AND_COLLISION.md) | Six bounds, sizes/layers/segments/debug §11 |
| [COMBAT_FEEDBACK](COMBAT_FEEDBACK.md) | Nine outcomes, five telegraph categories, missing clips §12/14 |
| [ENEMY_AI_DESIGN](ENEMY_AI_DESIGN.md) | State graph, seven categories/F06 mapping/counterplay §13 |
| [FORM_SWITCHING_COMBAT](FORM_SWITCHING_COMBAT.md) | Switch phases, owners, exploit matrix §15–16 |
| [BOSS_COMBAT_FRAMEWORK](BOSS_COMBAT_FRAMEWORK.md) | Entry/lock/phase/retry/victory/world/rewards §17 |
| [INCAPACITATION_AND_RECOVERY](INCAPACITATION_AND_RECOVERY.md) | HP A/B/C, transfer/defeat/checkpoint/reload §18 |
| [COMBAT_VERTICAL_SLICE](COMBAT_VERTICAL_SLICE.md) | Quy demonstrator/approval gates, D40 boundary §21 |
| [COMBAT_DATA_SPEC](../technical/COMBAT_DATA_SPEC.md) | 15 contracts, lifecycle/owner/persistence/validation §22 |
| [COMBAT_TEST_CASES](../technical/COMBAT_TEST_CASES.md) | 32 cases × preconditions/expected/invalid/recovery/validation §23 |
| [TASK14_DECISIONS](TASK14_DECISIONS.md) | CONFIRMED/16 PROPOSED/10 UNRESOLVED/SUPERSEDED §24 |
| TASK14_CONSISTENCY_AUDIT (this file) | Sources, delivery/15 local checks/risks/handoff §25–26 |

## Local validation — document-level, không runtime pass

| # | Requirement / result of consistency review |
| --- | --- |
| 1 | Direct realtime control: action acceptance/aim/window/recovery, no auto-combat |
| 2 | Plane grounded: x–y source evidence; final underwater/depth C14-U01 vẫn mở |
| 3 | Species styles distinct: Quy pressure/brace, Phượng mobile sweep/AoE, Long lane/control/long envelope, Ly support/ground control |
| 4 | Elements agree09–10: channels/properties/affinity khác nhau, shared budgets/cause groups, no dual auto bonus hoặc Life damage |
| 5 | Evolution13: same progression/form identity, safe transition/config freeze proposal, no stage hot-swap/heal |
| 6 | Up to three/one active, empty allowed, one-form slice vẫn usable |
| 7 | Membership lock khác active switch; service-level mutation reject, not just hidden menu |
| 8 | HP/recovery/skill resource/resonance/B+C đều rõ proposals; D41 không reopen full-three |
| 9 | Hit key theo targetCombatantId/rootCast/window/group, segmented geometry và refresh không double-hit |
| 10 | Interrupt/cancel/debt/cost rules, due damage trước switch commit và no unreleased HP0 cast |
| 11 | Quy demo không boss/ba species; chỉ combat subset, D40 resonance/persistence không bị bỏ ngầm |
| 12 | Enemy telegraph/lock/recover/leash/LOS/path và counterplay, không track-hit liên tục |
| 13 | Missing stage clips/Quy/Long/Ly và Phoenix six-states≠six-clips ghi rõ; registry gaps vẫn nguồn gốc |
| 14 | Data composition/reusable modules, 15 contracts; reuse health/CD/status/lock owners không duplicate truth |
| 15 | Scope chỉ docs + README index; source/tests/assets/UI/maps/manifests/lockfile phải unchanged trong final diff |

## Runtime mismatches và risks

| Severity / mismatch | Evidence / dependency / action sau này |
| --- | --- |
| P0 / không Quy underwater controller/art | PlayerPhoenix và geometry chặn water; D40 chưa được đáp ứng. C14-U01/U05/Quy reference/clip approval trước prototype |
| P0 / instant melee khác logical windows | SkillSystem.use xử damage ngay, animation không authority; cần adapter/state implementation task riêng, không refactor trong Task14 |
| P0 / HP/regen/respawn prototype khác proposed owners | PlayerPhoenix auto regen/respawn, chưa reserve/status/transition model; duyệt C14-U03 và R03/E09 trước migration |
| P0 / lock/save/reward chưa tồn tại như spec | GameState reset shrine/targets, UI localStorage không gameplay save; cần W07 adapter/ack/backup/reload policy C14-U07/U09 |
| P1 / current geometry small-radius/hardcoded Phoenix | Long envelope/large stage/swim layer unresolved C04-P07/C14-U05, không assume generic support |
| P1 / enemy targets tĩnh, no AI | Existing SkillSystem targets chỉ hit/respawn; F06/C14 chưa path planner/telegraph controller. Cần approved subset/modules |
| P1 / browser lifecycle/input | Blur clear không auto-pause; hidden update bỏ, remap/switch chưa có. C14-U08 cần tests khác blur/visibility/touchcancel |
| P1 / elemental/progression readiness | E09/E10/V13 policies/data chỉ specs; no formula/CD/cost/catch-up numeric approval, no counterfeit runtime-ready definitions |
| P2 / mobile/performance/production animations | Chưa measured budgets, hardware/playtest/SFX provenance; giảm FX không thay proof readable telegraph/actual clip |

## Kiểm tra thực hiện và handoff

Đã kiểm: đủ 17 tệp yêu cầu, 15 entity contracts, 32 scenario IDs liên tiếp/không trùng; local Markdown link targets và số cột bảng hợp lệ; C14-P01–P16/U01–U10 có registry. `git diff --check` đạt; tracked diff chỉ README/GDD/PROJECT_DECISIONS/OPEN_QUESTIONS, 17 tài liệu mới là toàn bộ untracked files của checkout. Đã đối chiếu trực tiếp long_basic/ly_basic/quy_s1/quy_s2 với C04 và giữ stage gates. Không chạy gameplay/build/browser suites cho Task14: không code đổi và mechanics mới chưa tồn tại; onboarding tests trước đây không là Task14 results. Không tuyên bố playtest balance hoặc physical-device QA.

Đủ bộ tài liệu để review thiết kế và chuyển đầu vào sang Task15 **khi được giao**: resource recommendation A, HP recommendation A, qualitative budgets, per-species progression/skill constraints, no XP/evolution numbers mới. Implementation còn gated bởi approvals/data/assets/storage/plane ở register; PhaseI vẫn PARTIAL. Không tự bắt đầu Task15 hoặc full audit09–16. No code/assets/maps/UI/input bindings changed là điều kiện final scope check, không chứng nhận hệ combat đã chạy.
