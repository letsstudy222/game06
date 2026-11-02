# Task16 — decisions, sources và approval queue

Ngày 31/10/2026 Asia/Saigon, HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`. Pre-existing Task14/15 working-tree docs giữ nguyên. [PROJECT_DECISIONS](../PROJECT_DECISIONS.md) hierarchy: explicit approval → later approved supersession → consistent canon → completed requirements → recommendations. Documentation permission không creative/mechanic approval; không code/UI/save/asset edits, Task17/full PhaseII audit chưa bắt đầu.

## CONFIRMED baseline / evidence

| Source | Constraint / evidence, không suy implementation |
| --- | --- |
| D02/D05/D06/D07, Task16§2 | Tinh Linh mở playable forms qua resonance, collection có thể nhiều; ba slots tối đa/one physical active; boss khóa membership nhưng switchwithin; species XP/level/skills/stage/mastery independent slots |
| D41 explicit Task09 | No mandatory three-member/three-elements early barrier. Đây là approved count constraint, không full early-entry policy approval |
| D39, Task16§23 | Data-driven species/reusable modules, one authoritative membership/active/progression ownership; no species-name core rewrite |
| Task16§18/19/24 | Discovery!=playable unlock; new collection unlock không overwrite occupied/locked membership; safe save/load recovery/no silent unlock/no reward replay goals |
| Runtime actual | Canvas2D/ES modules, InputManager existing keyboard/touch actions, PlayerPhoenix/SkillSystem/GameState; no generic loadout/switch/lock/persistent gameplay-save implementation thấy tại source |
| Earlier task docs | Task14 đủ17docs, Task15 đủ18docs; C14/P15/V13/R03/E09/E10/W07 specifics vẫn PROPOSED/UNRESOLVED, không features implemented |

## L16-DR01 continuity / scope

[Early-entry record](BOSS_ENTRY_AND_RETRY.md) phân biệt D41 CONFIRMED count constraint với Task16§3 minimum-one recommendation **PROPOSED** và entry trigger/capability/empty snapshot/health/retry package **UNRESOLVED L16-U01/U07**. Không tự dùng full-three cũ chặn boss đầu, không tự cấp species lấp slot; không sửa các previous decisions thành canon. Actual affected-file update plan tại entry record, chỉ đồng bộ approved scope sau approval. Đây là phần conflict-resolution design, không declared formal early-entry decision.

## PROPOSED register

| ID / preferred proposal | Authority | Dependencies / risk / required approval |
| --- | --- | --- |
| L16-P01 / canonical3 positions, active ref, active-first UI projection, recommended1–3 | [Overview](LOADOUT_SYSTEM_OVERVIEW.md) | Minimum/empty details U01; no duplicate writable activeSlot, R03 same owner |
| L16-P02 / eligibility/uniqueness/safe active replacement | [Management](LOADOUT_MANAGEMENT.md) | R03/C04/K11/B12 criteria/aliases/assets/health U02/U05, uniqueness not approved |
| L16-P03 / context-specific edit permissions | [Management](LOADOUT_MANAGEMENT.md) | Safe exploration flexible, ordinary threat limited edits, canonical order/config freezes separate U03/U06 |
| L16-P04 / short transaction + bounded buffer/action matrix | [Switch](FORM_SWITCHING_RULES.md) | C14 cancel/debt/spend/priority timings U04, no exact frames/ms/cost/iframe |
| L16-P05 / anchor/facing/capability/velocity/clearance safe placement | [Switch geometry](FORM_SWITCHING_RULES.md) | C04-P07/C14-U01/actual anatomy/Long/swim/fly modules; U02/U04, no noclip fallback |
| L16-P06 / Spirit/species/body/world ownership map | [Ownership](FORM_STATE_OWNERSHIP.md) | E09 scopes/clock/status obligation/R03 source snapshots/P15 attribution U05/U09 |
| L16-P07 / Task16 HP ModelB individual + coordinated recovery | [Health/recovery](FORM_STATE_OWNERSHIP.md) | Same semantics C14/P15 ModelA; no implicit model-letter switch, HP/lore/stability U05 pending |
| L16-P08 / detailed boss lifecycle/service lock/snapshot | [Lock](BOSS_LOADOUT_LOCK.md) | Early freeze/config/empty/order proposal separate D06; U06/U09 durable barriers |
| L16-P09 / 1–3 early recommendation, full reset quick retry+prep option | [Entry/retry/DR01](BOSS_ENTRY_AND_RETRY.md) | U01/U07, D41 count baseline stays, no exact resume/no old boss HP+new team |
| L16-P10 / safe explicit evolution/config apply outside attempt | [Evolution](EVOLUTION_AND_LOADOUT.md) | V13/C14/P15 facts/benefits, same species identity; U08, no freeze-from-D06 inference |
| L16-P11 / collection read model + manual safe equip after unlock | [Collection](COLLECTION_INTEGRATION.md) | R03 grant/bootstrap/P15/W07 owners, no new authoritative unlock list, U02/U09 |
| L16-P12 / adaptive conceptual UI+logical cross-platform selection | [UI/input](LOADOUT_UI_REQUIREMENTS.md) | Existing keys preserved, target IDs/revision/focus/touch/U10, no mockups/handlers |
| L16-P13 / Quy-only+two-empty loadout architecture milestone | [Slice](FIRST_PLAYABLE_LOADOUT.md) | D40 subset, C14/P15/assets/plane/save scope, no multiple production forms/boss quota |
| L16-P14 /13 conceptual ref/view/command contracts | [Data](../technical/LOADOUT_DATA_SPEC.md) | R03 same owners/no HP/XP slot copies, migrations/receipts U09 |
| L16-P15 / conceptual graphs +18 status-qualified invariants | [States](../technical/LOADOUT_STATE_MACHINE.md) | Runtime vs durable boundary, selected policies U01–10 not silently confirmed |
| L16-P16 /44future cases+local validation | [QA](../technical/LOADOUT_TEST_CASES.md) | All40requested cases+4race/crosswalk scenarios, fixtures/assets/rules approval before runtime tests |

## UNRESOLVED approval gates

| ID | Decision / gate |
| --- | --- |
| L16-U01 | Minimum-one normal embodied context, empty eligibility/snapshot, early boss trigger/main capabilities/entry health/checkpoint complete policy? D41 count restriction already confirmed, no reopen full-three without explicit source |
| L16-U02 | Species uniqueness, equip vs activate eligibility, temporary unavailable/content-assets/profile/geometry/aliases/repair criteria? Before loadout admission/activation validator |
| L16-U03 | Ordinary combat edit boundary/hysteresis, safe exploration/story restrictions, reorder/config permissions? No unnecessary shrine/menu lock by default |
| L16-U04 | Short switch/buffer/cancel/debt/action priority/velocity/placement/subwindow policy, exact cost/CD/frames/ms/response timing? Not final numerical design |
| L16-U05 | HP model B-individual vs A-shared/C, incapacity/emergency transfer/checkpoint recovery, R03 stability/cost and manifestation-compatible body/status rules? No B+C/unlimited resurrection approval |
| L16-U06 | Lock exact begin/end, confirmation/entering freeze, snapshot empty/order/config/state version/equality and service barriers? D06 only membership lock/switchwithin confirmed |
| L16-U07 | Early entry details/retry/abandon/reload/refresh/close/full-reset vs exact resume, invalid checkpoint recovery and simultaneous boss victory/player defeat outcomes? Before boss implementation |
| L16-U08 | Evolution/level/skills benefits freeze/safe transition/HP/CD/status mappings/content migration during attempt? V13/P15 still proposals |
| L16-U09 | Single writer/storage/namespace/atomic ack/backup/migration/quota/error/export/loss budget and harmful status obligations, runtime vs durable boundary? Before persistent-save claim |
| L16-U10 | Final remap/direct/cycle/gesture/gamepad/focus-auto-pause/UI layout/accessibility/device budgets? Current input/UI unchanged |

## SUPERSEDED và phase boundary

Không confirmed creative/mechanic decision bị Task16 thay. H08-S01 ending giữ D26 history; R03-P06 full-three chưa từng approved nên không gọi confirmed rule SUPERSEDED. HP labels crosswalk không đổi policy; C14/P15 individual recommendation còn proposal. R03/B+C/E09/E10/V13/C14/P15/W07 specifics chưa approved chỉ vì được nhắc lại.

Task16 hoàn tất bộ tài liệu thiết kế được giao của dải PhaseII09–16; readiness cho **requested future audit** khác việc đã audit/freeze/production-ready. PhaseI PARTIAL không tự thay. Full PhaseII audit/Task17 cần yêu cầu riêng, không tự thực hiện hoặc công bố all cross-system gates đã đóng.
