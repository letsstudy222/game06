# Task16 — local consistency audit và delivery index

Ngày31/10/2026 Asia/Saigon, HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`. Pre-existing Task14/15 docs/index changes đã nhận diện trước sửa và giữ nguyên nội dung. Documentation only; [decisions](TASK16_DECISIONS.md) giữ statuses. Local compatibility review không comprehensive PhaseII09–16 audit, không Task17.

## Actual repository review

| Actual path(s), đọc toàn văn/phần liên quan | Evidence / scope |
| --- | --- |
| docs/GAME_DESIGN_DOCUMENT.md; PROJECT_DECISIONS.md; OPEN_QUESTIONS.md; PHASE_I_HANDOFF.md | Source hierarchy, D05/06/07/39/41, PhaseI PARTIAL; historical C08-01 còn source history, current D41 đã xử lý count scope |
| docs/lore/SPIRIT_IDENTITY.md; RESONANCE_RULES.md; RESONANCE_DECISION_RECORD.md | Spirit identity/bootstrap/resonance/collection, B+C model không final, no full origin reveal/revive lore |
| docs/gameplay/TRANSFORMATION_DESIGN.md; docs/technical/RESONANCE_DATA_MODEL.md | Canonical loadout/active/transform/lock owners và proposed HP/CD/empty/snapshot/abort recovery |
| docs/creatures/CREATURE_CLASSIFICATION_OVERVIEW.md; CREATURE_DESIGN_BIBLE.md | Species/stage/role/rarity/playability/asset readiness khác nhau; not every creature a playable/3stage/Sacred |
| docs/evolution/EVOLUTION_AND_LOADOUT.md; docs/technical/EVOLUTION_DATA_SPEC.md | V13 eligibility/safe transition/fixed subject/geometry/material/config proposals, same progression refs |
| docs/combat/COMBAT_SYSTEM_OVERVIEW.md; PLAYER_COMBAT_STATES.md; FORM_SWITCHING_COMBAT.md; INCAPACITATION_AND_RECOVERY.md; TASK14_DECISIONS.md | C14 action priority/cancel/debt/ownership/HP model/geometry, combat still proposed/not implemented |
| docs/progression/EXPERIENCE_SYSTEM.md; SKILL_MASTERY.md; TASK15_DECISIONS.md; docs/technical/PROGRESSION_DATA_SPEC.md; docs/economy/REWARD_CONSISTENCY.md | P15 source-form evidence/normalized participation/pending benefits, no slot XP copies/no reward replay; still proposed models |
| docs/technical/PERSISTENT_WORLD_DATA_SPEC.md; WORLD_STATE_TEST_CASES.md; docs/world/WORLD_STATE_TRANSITIONS.md | W07 one writer/last-good/ack/typed migration, lock+reward+world outcome coherent, tests future not already passed |
| docs/elements/TASK09_DECISIONS.md; TASK10_DECISIONS.md; STATUS_EFFECTS.md | E09/E10 scope/cast/budget/status/clock, six elements/Ly Life separate; no new dual power/three-elements requirement |
| src/island/InputManager.mjs; PlayerPhoenix.mjs; GameState.mjs; SkillSystem.mjs; geometry.mjs; main.mjs | Actual browser Canvas2D/ES modules/input/hover/collision/regen/respawn/target state; no generic loadout/collection/transform/boss lock/durable save implementation |

Task14 đủ17required docs, Task15 đủ18required docs tồn tại trong checkout nhưng chưa commit, không được gọi runtime features. Task16 không thiếu predecessor documentation deliverable được phát hiện; mechanics/approvals/assets còn unresolved được giữ làm dependencies. Source code inspection không fresh gameplay/playback test.

## 15 required outputs

| File | Coverage Task16 |
| --- | --- |
| [LOADOUT_SYSTEM_OVERVIEW](LOADOUT_SYSTEM_OVERVIEW.md) | Baseline/authority/one active/synergy/collection vs team/phase boundary §2/13 |
| [LOADOUT_MANAGEMENT](LOADOUT_MANAGEMENT.md) | Commands/eligibility/uniqueness/context permissions/invalid cases §4–5 |
| [FORM_SWITCHING_RULES](FORM_SWITCHING_RULES.md) | Four model comparison, lifecycle,15+context interruption matrix, position/velocity/clearance §6–9 |
| [FORM_STATE_OWNERSHIP](FORM_STATE_OWNERSHIP.md) | HP A/B/C crosswalk, metaphysics dependencies, spirit/species/body/world state/recovery §8/10–12 |
| [BOSS_LOADOUT_LOCK](BOSS_LOADOUT_LOCK.md) | Nine-state lifecycle/actions/edit/switch/save/failure/transition matrix §14 |
| [BOSS_ENTRY_AND_RETRY](BOSS_ENTRY_AND_RETRY.md) | DR01 early policy conflict/sources/update-after-approval plan, preparation/retry/reset/load/recovery §3/15–16 |
| [EVOLUTION_AND_LOADOUT](EVOLUTION_AND_LOADOUT.md) | Eligibility/proofs/config/skill/geometry/safe transition versus lock §17 |
| [COLLECTION_INTEGRATION](COLLECTION_INTEGRATION.md) | Discovery/resonance/unlock/combat/boss/safe equip/bootstrap §18 |
| [LOADOUT_UI_REQUIREMENTS](LOADOUT_UI_REQUIREMENTS.md) | Adaptive conceptual HUD/menu and keyboard/gamepad/touch/focus/pause §20–21 |
| [FIRST_PLAYABLE_LOADOUT](FIRST_PLAYABLE_LOADOUT.md) | Single Quy/two-empty/save/synthetic lock/second species criteria §22 |
| [LOADOUT_DATA_SPEC](../technical/LOADOUT_DATA_SPEC.md) | 13contracts×purpose/required/relationships/ownership/validation/lifecycle/save/migration §19/23 |
| [LOADOUT_STATE_MACHINE](../technical/LOADOUT_STATE_MACHINE.md) | Switch/lock graph,18invariants/status distinction §24 |
| [LOADOUT_TEST_CASES](../technical/LOADOUT_TEST_CASES.md) | 44future scenarios, each6required fields, all40requested cases §25 |
| [TASK16_DECISIONS](TASK16_DECISIONS.md) | Confirmed/16proposals/10unresolved/superseded continuity, no silent approval |
| TASK16_CONSISTENCY_AUDIT (this file) | Local15checks/compatibility/risks/audit readiness §27–28 |

## Compatibility09–15 — local review only

| Task | Contract preserved / open dependency |
| --- | --- |
| 09 elements | combatant_shared/form_bound/source_active same E09 instances/clock; no reserve damage bodies, status obligation still pending |
| 10 dual | Dual one species/one slot/source budget, no automatic two pools/passives/XP, resistance model not finalized |
| 11 classification | Rarity/role/playability/species identity independent, mobility is tag, no fixed role composition or optional rarity gate |
| 12 production | Required clips/markers/postures/modules/content readiness checked; no art generated/shape cropped for passages |
| 13 evolution | Same formId/stage progression, eligibility facts retained, safe explicit geometry/config transition proposal, no boss lock bypass |
| 14 combat | Cancel/debt/priority/hit/source identity retained, damage before commit, no default i-frame/heal, HP model letter crosswalk explicit |
| 15 progression/economy | No slot-level XP/skills/mastery stores, source contribution/DoT/projectile ownership fixed, receipt/world bundle not reward callback |

## Local15requirements review

| # | Result of design review |
| --- | --- |
| 1 | Max3 member positions; exactly3 explicit-cell representation is proposed, not collection capacity |
| 2 | One physical active body/one selection owner; bootstrap/recovery no-control exceptions explicit |
| 3 | Combat switch valid between admissible action windows; buffer+revalidate, no all-combat disable |
| 4 | Boss membership lock separate active switch, service/writer check not UI only |
| 5 | Same species progression refs/no slot copies; no reset by re-equip/switch/stage |
| 6 | Empty reserve valid recommended, no phantom unlock/target; snapshot empties policy pending |
| 7 | DR01 separates historical full-three proposal/D41count constraint/Task16entry-package unresolved; affected-file plan not executed before approval |
| 8 | HP B individual recommendation crosswalk to C14/P15 A, health/recovery/manifestation/stability all still pending |
| 9 | Switch matrix debt/cancel/resource/hit ledger prevents recovery/iframe/cooldown loops |
| 10 | E09/E10 status scopes/affinities/reactions/source budgets retained; no mandatory three-element/dual gate |
| 11 | Evolution proof may accrue, no irreversible stage/config/geometry transition in attempt without selected policy |
| 12 | Collection facts independent member tuple, full-team new unlock no replacement or slot4 |
| 13 | Durable canonical refs/active/lock/receipt/recovery/migration/placement validated, no silent unlock |
| 14 | Species profiles/curve/skill/movement/geometry/assets refs and reusable modules, second-species acceptance no core rewrite |
| 15 | Only docs/index additions, pre-task hashes and final Git scope check protect source/UI/maps/sprites/saves/runtime data/earlier tasks |

## Risks và unresolved conflicts

| Severity / issue | Disposition / next useful gate |
| --- | --- |
| P0 / early boss wording | D41 confirmed count scope giữ, min1/entry/snapshot/retry pending U01/U07. No fabricated approval; plan exact previous files after scoped approval |
| P0 / generic runtime chưa có | PlayerPhoenix single controller/regen/respawn, no transform/save writer; implementation needs own approved scope/modules/assets, not docs edits |
| P0 / snapshot versus authority duplication | Active selection/membership one owner, snapshot immutable identities/config refs only; actual HP/XP/CD/status no snapshot writable copies |
| P0 / save/lock bypass/partial rewards | U09 W07/P15 atomic writer+ack/last-good/aliases; lock before threat, close before edit/retry; in-memory snapshot no durability |
| P1 / HP letters accidentally change semantics | Task16 B individual = C14/P15 A individual; policy semantic/version refs, not just model letters, no health chosen implicitly |
| P1 / evolving/large/fly/swim placement | C04-P07/underwater layers/Long envelope/asset postures pending, conservative same-region fallback not noclip, U02/U04/U08 |
| P1 / source/status/clock exploit | E09/C14 single event/body/cursor, paused/no offline ticks, source-active effects end, U05/U09 no free cleanse |
| P1 / invalid checkpoint/all forms unavailable | Abort/reset before outside-lock repair; no-control recovery if no safe validated form, preserve backup not silent auto unlock |
| P2 / touch/focus/UX/performance | Logical contracts not final binding/layout, U10 requires future playback/physical device/budgets; no claims tested feel |

## Verification và PhaseII audit readiness

Đã kiểm: đủ15required documents,13entities mỗi entity đủ8fields;44case IDs liên tiếp/không trùng với6required scenario fields;18status-qualified invariants và9boss lifecycle states. Local Markdown links/table column counts/L16-P01–P16/U01–U10 references hợp lệ; `git diff --check` đạt. Hash pre-task xác nhận các tệp có trước (kể cả Task14/15 docs) được giữ nguyên, chỉ sáu documentation updates append-only: README/GDD/PROJECT_DECISIONS/OPEN_QUESTIONS/PHASE_I_HANDOFF/TRANSFORMATION_DESIGN. Toàn bộ15new files là exact Task16 scope. Không runtime tests cho Task16 mechanics, không build/browser tests/no PhaseII comprehensive audit. Future scenarios không passed test results; source-reading facts không playable claims.

Đã có Task16 design package và compatibility map cho audit PhaseII khi được giao, nhưng **chưa audit/freeze/production-ready**. Open decisions/data/actual assets/storage/physics/combat còn gate; PhaseI PARTIAL không tự đổi. Không Task17. Không commit/push hoặc đổi gameplay save/inputs/UI/scene/asset/runtime files trong task này.
