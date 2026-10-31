# Task14 — decisions và approval boundaries

Ngày 31/10/2026 Asia/Saigon, baseline `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`. [PROJECT_DECISIONS](../PROJECT_DECISIONS.md) giữ hierarchy explicit approval → later approved supersession → consistent canon → task requirements → recommendations. Quyền làm tài liệu không là approval mechanics. Task14 chỉ documentation/system design, không Task15 hoặc full audit09–16.

## CONFIRMED constraints / evidence

| Nguồn | Phạm vi được giữ, không suy implementation |
| --- | --- |
| D01/D13/D14, Task14 role/scope | Direct realtime 2D pixel action, browser-first; actual HTML/CSS/ES modules/Canvas2D; keyboard + existing touch input, không replace controller |
| D05/D06/D41, Task14 §15/21 | Up to three available forms, một active; boss khóa membership nhưng cho switch trong set; early one/two-form content không bị count gate, Quy demo không cần boss/ba forms |
| D07/D30–33/D39 | Species progression độc lập, Sacred 4×3 stages, distinct anatomy/roles; reusable data/modules thay vì core branch mỗi loài |
| D04/D18/D38, Tasks09–10 | Six-element baseline, Ly Mộc/Life authority riêng; dual không auto power/corruption hoặc mandatory main boss solution |
| D12/D36/D37 | Ordinary defeat không được dùng để bất ngờ xóa collection; world outcome có authority/return safety, wildlife/factions không evil vì affiliation |
| Runtime source inspected | x–y normalize/facing, camera follow/clamp/integer render, grid collision/stairs; hover không xuyên solid/water. Đây là evidence hiện tại, **không approved final underwater plane** |

Không nâng C04-P07, R03 B+C/quỹ/HP/recovery, E09/E10 resource/status/resistance hoặc V13 safe evolution thành CONFIRMED. Chi tiết C14 dưới vẫn proposals. No ordinary permadeath là ràng buộc thiết kế Task14 §18, không phê duyệt toàn recovery model hoặc lore thân gốc chết.

## PROPOSED register

| ID / recommendation | Authority document | Lý do / dependencies / approval cần |
| --- | --- | --- |
| C14-P01 / pillars và world x–y adapter trước | [Overview](COMBAT_SYSTEM_OVERVIEW.md) | Giữ baseline responsiveness, camera/swim/layer C14-U01 trước implementation phần phụ thuộc |
| C14-P02 / logical phases, capability gates, cancel/debt | [States](PLAYER_COMBAT_STATES.md) | Không animation-driven hit/cancel exploit; timings/interrupt/ordering U04 cần duyệt |
| C14-P03 / basic styles, window/hit identity | [Basic](BASIC_ATTACK_SYSTEM.md) | Distinct anatomy, không long combo quota; C04 skill/stage/clip refs và U05 |
| C14-P04 / reusable ability categories/lifecycle | [Skills](ACTIVE_SKILL_SYSTEM.md) | C04/E09/E10 cùng authority, không quota active slots; accepted spend/interrupt/modules U02/U04 |
| C14-P05 / cooldown A cho combat slice, xem hybrid C sau | [Skills/resources](ACTIVE_SKILL_SYSTEM.md) | Ít meters để đo feel; R03 stability tách, no numeric costs/CD/regen; U02 trước code |
| C14-P06 / species motion, finite directional Quy brace | [Movement/defense](MOVEMENT_AND_DEFENSE.md) | Tối thiểu không i-frame/perfect parry bắt buộc, không cấp quy_s2 stageII cho stageI; U01/U02/U05 |
| C14-P07 / ordered damage result/ledger/atomic runtime commit | [Damage](DAMAGE_RESOLUTION.md) | E09 cause/budget normalization, E10 composition, R03 boundary; tie/crit/formula U04/U10 chưa chốt |
| C14-P08 / geometry separation/segmented candidates | [Collision](HITBOX_AND_COLLISION.md) | C04-P07 vẫn pending, prototype Long/large/depth/clearance và actual clips U05 |
| C14-P09 / feedback và telegraph standards | [Feedback](COMBAT_FEEDBACK.md) | Small-screen/shape/audio/readability, B12/V13 asset gaps; U05/U08/U09 |
| C14-P10 / finite perceived-facts AI/state graph | [AI](ENEMY_AI_DESIGN.md) | F06 IDs/ecology giữ, không new species/faction/boss attacks; U04/U05/content approval |
| C14-P11 / switch adapter và exploit guards | [Switch](FORM_SWITCHING_COMBAT.md) | R03/E09/V13 ownership/recovery debt/one body; U03/U06, physical B+C vẫn mở |
| C14-P12 / HP riêng A, emergency transfer, boss abort/reset | [Recovery](INCAPACITATION_AND_RECOVERY.md), [boss](BOSS_COMBAT_FRAMEWORK.md) | Ưu tiên continuity R03, one-form valid; không approval HP/cost/checkpoint/entry/outcomes/save U03/U07/U09 |
| C14-P13 / bounded input, remap/focus/pause/accessibility | [States/input](PLAYER_COMBAT_STATES.md) | Existing bindings giữ; proposed focus loss auto-pause khác source behavior; U08 |
| C14-P14 / nhỏ Quy combat demonstration | [Slice](COMBAT_VERTICAL_SLICE.md) | Một phần D40, không hứa đủ first playable; U01–09/subset assets/budget approval |
| C14-P15 / 15 conceptual contracts, owners không duplicate | [Data](../technical/COMBAT_DATA_SPEC.md) | R03/E09/E10/V13/W07 refs, no runtime classes/loaders; U06/U09/version/adapter approval |
| C14-P16 / 32 future QA cases và local doc checks | [QA](../technical/COMBAT_TEST_CASES.md) | Chưa runtime tests; fixtures/values/modules approved trước executable QA |

## UNRESOLVED decision queue

| ID | Cần chọn / gate, không reopen baseline đã approved |
| --- | --- |
| C14-U01 | Production plane/camera/aim adapter, underwater layer/current/depth/collision/nav và flying/vertical connectors; trước Quy movement implementation |
| C14-U02 | Resource A hay khác, defense hold/budget/CD/spend/refund/regen nếu có; skill vs resonance separation giữ. Exact values không final trong Task14 |
| C14-U03 | HP model, maxHP/status mapping, reserve recovery và emergency transfer vs defeat; R03 physical model không cần giải cosmic origin để chọn technical subset |
| C14-U04 | Cancel/interrupt markers, tie-break đồng tick, input-vs-hit boundary, crit/penetration có dùng không, mitigation/CC windows và numerical budgets; trước resolver/action implementation |
| C14-U05 | Quy/Long/Ly actual references/clips/geometry/anchors/directions, C04-P07 prototype, enemy/receiver assets/module subset và animation fallback approval |
| C14-U06 | Switch admissible phases/debt/buffering/direct-select mapping, resource/clock/status/projectile contracts subset và evolution arbiter; không tự approve full R03/E09/V13 |
| C14-U07 | Boss start/end trigger, capability checks, empty/stage/config snapshot, retreat/retry/reload/defeat-victory tie/outcome/checkpoint details; D41 no-three đã giải, không hỏi lại |
| C14-U08 | Remap/focus-auto-pause/menu/input buffer policy, optional assist/low-FX/telegraph timings/touch/gamepad scope; không thay mapping trong task này |
| C14-U09 | Simulation architecture/device performance budgets, storage adapter/namespace/ack/migration/backup/error UX/loss budget, minimal status obligations theo E09-P10/W07 |
| C14-U10 | Numerical damage/resist/cost/CD/regen/XP/evolution curves, role budget/catch-up và selected E09/E10 rules; Task15 chỉ bắt đầu khi có yêu cầu, không default numbers |

## SUPERSEDED / continuity

Không confirmed creative rule bị Task14 thay. Giữ historical H08-S01 ending đã được D26 thay; full-three R03-P06 là proposal chưa từng approved, không gọi accepted rule SUPERSEDED. B/C resource và shared HP alternatives chưa được chọn, không tự “bác” hoặc supersede. Q07/Q09/Q10/Q15–18 được bổ sung proposal, không tự đóng. PhaseI vẫn PARTIAL; local review Task14 không full audit09–16.
