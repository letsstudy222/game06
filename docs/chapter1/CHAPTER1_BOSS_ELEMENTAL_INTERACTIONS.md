# Nguyên tố, trạng thái và hai tương tác arena

**PROPOSED B23-P08/P09**, [E09 definitions](../elements/ELEMENT_DEFINITIONS.md), [statuses](../elements/STATUS_EFFECTS.md), [reactions](../elements/ELEMENTAL_REACTIONS.md), [E10](../elements/DUAL_ELEMENT_OVERVIEW.md), [C14 damage](../combat/DAMAGE_RESOLUTION.md) giữ rules/owners. Lam Giáp Water-aligned là candidate identity mới, chưa affinity/stat profile approved. Hard shell không Metal/Earth, Life không ordinary combat element.

| Context | Candidate application / limit | Quy-only/owner guard |
| --- | --- | --- |
| Boss Water resistance | Không inherent all-Water immunity hoặc mandatory opposite-element weakness; exact modifiers chưa chốt | Basic Chấn Mai profile phải có accepted meaningful harm trong opening, no hidden weak point/stat gate; nếu zero due profile thì content FAIL |
| Pressure/current | Water packet/direct impact và local force theo definition, tolerance != damage resistance | Quy không immune mọi force/pressure/hazard vì Sacred Thủy, movement/cover counter còn |
| Wet | Chỉ explicit status_wet source component, refresh/cap theo E09; underwater không mọi actor always wet hoặc vulnerability stacks | form_bound status/source/remaining budget giữ đúng owner across switch, no free cleanse |
| Control/stagger | Boss response theo control family budget/recovery, no perma root/stun hoặc every failed CC thành bonus damage | Không yêu cầu CC skill để mở damage, no absolute blanket immunity tất cả E09 |
| Nước/Lôi | **Không** mandatory Lôi source trong core recommended encounter; future authored variant cần charge/conductivity/bounded path | No foreign=evil, no Quy Lightning affinity, no chain toàn arena/ocean hoặc required dual player |
| Nước/Hỏa/Phong/Kim | Nếu future eligible extra form/effect xuất hiện, same E09 heat/flow/connector/LOS/source budgets | Không thêm reactions mandatory hoặc foreign defense khiến Quy I invalid; no Earth/Life damage type mới |

Reaction source tokens/rootCast+reactionId+target/receiver+occurrence dedupe, input competition explicit priority/exclusion, output `reactionEligible=false` mặc định. Direct/status/reaction chia authored budget, không nhân full base mỗi hop/pulse/recipient. Cast snapshot giữ source/stage/config, target defense theo approved boundary; switch/phase không reroll/reset status/cost/hit ordinals. Attempt-local environment effect không permission permanent patch/quest reward.

## Hai environment interactions tối đa trong core design

| interactionId / object | Capability / source | Trigger/effect | Cách đối phó | Reset/expiry | Performance | Persistent consequence |
| --- | --- | --- | --- | --- | --- | --- |
| c1_env_bypass_shunt / c1_obj_test_receiver draft | CAP_STRUCTURE_OPERATE I/read flow; E03 bypass proof + actual local source/outlet/refuge valid, receiver placement safe | Context interact accepted ở recovery gap→attempt-local weak-flow redirect/test ack; optional tactical reduce local band, hoặc trial proof nếu qualifying disposition được author | Không bắt cast spell/hold timing, source invalid có cue reject; boss/state scheduler vẫn chừa response route không dùng receiver | Same attempt/target operation idempotent, không toggle để reset boss CD/phase/HP; failed/abandoned attempt clear transient layer về base E03; no close return dưới thân | Local field/graph/source queries bounded, cue tĩnh/shape đủ; không fluid sim | Chỉ accepted test evidence có thể contribute E04 outcome; setting test transient, no water_stable/E05/routeI hoặc repeat reward |
| c1_env_stone_breakwater / static H cover refs sau blocking | Quy I positioning; material/LOS/collision rule approved, alternate lateral route | Player đứng bên che trước locked pressure pulse→projectile bị collider chặn nếu eligible, no guard immunity | Boss melee/flank vẫn có cue, cover không full safe exploit hoặc camera che player; no invisible damage xuyên cover | Static cover không destructible/random regenerate; no progress flag/reset needed | Same collision/LOS query, optional impact cosmetic, no dynamic physics objects | Không có, no world patch/grant khi đạn chạm đá |

Field force/current cùng motion coordinator/sweep, không shader/particle motion quyết gameplay. Particle/cue quality không thay receiver/cover eligibility. Actors/unique wildlife refuge không permanent damage/despawn do trial fail, no optional ecological side quest bị xóa. Atomic E04/outcome/recipient state thuộc W07/P15; receiver callback chỉ command/proof, không grant boss victory hoặc E05 ngay.
