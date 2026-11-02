# Evolution, benefits và locked loadout

**PROPOSED L16-P10**. Source evolution vẫn [V13 EVOLUTION_AND_LOADOUT](../evolution/EVOLUTION_AND_LOADOUT.md), [state](../technical/EVOLUTION_STATE_MACHINE.md), [P15 integration](../progression/EVOLUTION_PROGRESSION_INTEGRATION.md); file này chỉ scope permissions/entry boundary, không stage catalog hoặc eligibility owner mới.

| Case | Contract recommendation |
| --- | --- |
| Requirement hoàn trong combat/boss | Ghi durable proof/XP/mastery nếu source cho, derived eligibility theo V13; không execute stage transition |
| Eligible sau enemy defeat | Accepted grant/recipient/source stable; event không swap active/stage hoặc member, không hai stages như hai slots |
| Movement footprint thay | Defer tới safe point đủ clearance/return/assets/modules; no heal/iframe hoặc xuyên arena door vì evolve |
| Stage có skills mới | minimumStage đủ chưa auto unlock, benefit pending/frozen config trong lock; unlock evidence không mất |
| Same species stage commit | Giữ formId/member identity, không add fourth slot, no XP/CD/HP reset; skill successor aliases giữ obligations |
| Sau boss victory | Chờ completion/reward/exit/placement và lock close ack, ngoài threat mới offer safe explicit evolution, không start ngay trong victory FX |
| Reserve/unequipped evolution | Stage/config freeze recommendation áp same species state trong attempt, không lách bằng unequip menu hoặc reserve-only change |
| Evolution và switch cùng lúc | Same cross-body arbiter/fixed subject/revision, defer/reject conflicting intent; no double cost/spend/placement |

D06 xác nhận membership lock, **không tự xác nhận freeze stage/config**. L16-P10 kế thừa R03/V13/C14 freeze proposal vì geometry/stat changes ảnh hưởng encounter, cần L16-U08 trước implementation. XP/proofs earned vẫn ở owners P15, pending benefits là refs không new XP grant. MaxHP level-up/evolution mapping theo P15/V13 pending, HP0 không được animation/evolution revive.

Eligibility durable facts khác volatile availability: thiếu safe placement/content/assets không mất evidence hoặc XP. Stage update/migration giữ owned skills/collection/world return; không downgrade/delete data để repair corridor, không dùng old-stage cosmetic như hitbox loophole. Effects đã release pin source config, không reroll damage/XP theo new stage.
