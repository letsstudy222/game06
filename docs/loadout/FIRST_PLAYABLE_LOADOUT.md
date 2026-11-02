# Quy-first loadout architecture demonstrator

**PROPOSED L16-P13**, technical milestone subset D40/[C14 combat](../combat/COMBAT_VERTICAL_SLICE.md)/[P15 progression](../progression/FIRST_PLAYABLE_PROGRESSION.md). Không yêu cầu thêm production species hoặc boss để chứng minh contracts; no code/assets/save/UI changes Task16.

| Target | Future acceptance evidence |
| --- | --- |
| One unlocked Quy | R03 bootstrap proof+same progression ref, no cloned form instances |
| Active slot+two empty reserve | Canonical membership refs và activeFormId, display active-first projection, empty non-invalid by default |
| Collection/loadout domain | Collection read model khác team, locked/unsupported species reject equip, no slot-owned XP/skills/stage |
| One-form movement/combat | Existing/future approved Quy controller adapter có same actor binding, no dependency reserve skill/guard/boss |
| Empty target switch | Immediate no-op/reject with reason, no cost/CD/reset/body creation; self-select no-op |
| Progression persistence | Same species XP/skill/mastery/stage receipts P15/R03, not save copy in each slot |
| Boss-lock compatibility | Future synthetic lock fixture service rejects membership mutation, allows eligible active request; không cần actual boss art/pattern hoặc entry policy approved để inspect schema contract |
| Save/load validation | Identity/refs/active/placement/backup/unsupported/interrupt cases, no in-memory snapshot-as-durable claim |
| Second species later | Catalog profile+progression/eligibility/caps/assets refs; equip ngoài restrictions+switch same modules/owner, no core species-name branch |
| Future expansion | >3 collected vẫn three positions, new stage same formId, no auto member/auto unlock on update |

Synthetic fixtures/test-only definitions chỉ sau scoped approval và trong future implementation task; **không production JSON hoặc test code bây giờ**. One-form runtime không chứng minh actual transition body/geometry hoặc multi-form UI/element/status behavior đã chạy; phải kiểm riêng khi second species ready.

## Gate và sequence

L16-U01/U02/U03: minimum-one/eligibility/uniqueness/edit scopes; U04/U05: switching/health/stability/recovery subset; U06/U07: lock/retry/snapshot nếu implement fixtures; U08: stage/config compatibility; U09: storage/namespace/ack/migration/loss budget; U10: input/UI/device subset. C14 plane/Quy assets/modules/HP và P15 curve/source/reward rules còn gates, không invent rules để demo pass.

Sau approval: identity/eligibility/owner validator → single-form active/empty commands → same actor movement/combat → save/reload/fault boundary → synthetic lock invariants → approved second species data/module integration → real browser/touch/status/projectile/geometry tests. Keep actual artifact/results target/version rõ, report pass/fail/skipped/unrun, no zero-test hoặc Phoenix old tests chứng minh multi-form features.

D40 còn underwater/resonance/persistent progress thực, không gọi loadout milestone docs là full first playable. Ready cho design review và future implementation scope, chưa production-ready. PhaseII design set Tasks09–16 có đầu vào để được audit khi có yêu cầu riêng; Task17/full PhaseII audit chưa bắt đầu.
