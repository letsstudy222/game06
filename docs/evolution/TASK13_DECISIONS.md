# Task13 — quyết định và phê duyệt

Baseline `1d49708`, ngày31/10/2026 Asia/Saigon. [PROJECT_DECISIONS](../PROJECT_DECISIONS.md) giữ hierarchy: explicit approval → later approved supersession → consistent repo canon → completed task requirements → recommendations. Quyền tự làm/commit/push không là approval mechanics. CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED giữ nghĩa nguồn, không số lần lặp.

## CONFIRMED constraints / evidence

| Source | Phạm vi được giữ |
| --- | --- |
| D07/D30–D35, Task13§2/4/6 | Species progression riêng, bốn Sacred ba stages mỗi loài; anatomy/identity continuity, không chỉ scale/recolor/stat |
| D04/D09/D18/D38, Task13§6/9 | Six-element baseline, Ly Wood/Life authority riêng; approved Phoenix palette/wings/tail, Long elongated/head/horns/mane/claws/tail, Quy aquatic shell và Ly guardian |
| D05/D06/D41, Task13§11/18/20 | Up to three available forms, một active/hai reserve tối đa, boss khóa membership vẫn switchwithin; no mandatory full-three/three-elements early gate |
| D08/D36/D37/D39, Task13§14/16 | Rarity không auto power, older species không obsolete, collection/revisit giữ, data-driven/reusable modules |
| Actual repo sources | Existing stage IDs C04 là identifiers thiết kế PROPOSED có thật trong tài liệu; Task13 giữ nguyên, không giả đã approved runtime catalog. Phoenix reference/atlas accessible và metadata checked, chưa đủ allstage clips |

Ngoài Sacred, two/one stage counts vẫn planning targets; không phê duyệt roster external B12, K11 rarity ModelB hoặc E09/E10 formulas. HP/cost/cooldown/catch-up/snapshot/storage policies chưa confirmed qua Task13.

## PROPOSED register

| ID / recommendation | Source authority | Dependencies / risks / required approval |
| --- | --- | --- |
| V13-P01 / Phân biệt species/stage/variant/assimilation/phase và tiến trình riêng | [EVOLUTION_SYSTEM_OVERVIEW.md](EVOLUTION_SYSTEM_OVERVIEW.md) | D07/D30, C04/R03/K11 identity; không progression owner mới; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P02 / So A/B/C/D, khuyến nghị hybrid requirements | [EVOLUTION_TRIGGER_MODELS.md](EVOLUTION_TRIGGER_MODELS.md) | A08-04/R03-P09; exact thresholds/mastery/Task15 chưa approved; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P03 / Bổ sung chín chiều cho đủ 12 stage ở nguồn C04 | [../creatures/SACRED_EVOLUTION_MATRIX.md](../creatures/SACRED_EVOLUTION_MATRIX.md) | Species profiles/AG gaps; names/gates/anatomy details vẫn C04 proposals; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P04 / Visual evolution rubric không cứng số thay đổi | [EVOLUTION_VISUAL_GUIDELINES.md](EVOLUTION_VISUAL_GUIDELINES.md) | B12 rubric/actual art missing, approved identities không thay; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P05 / Gameplay delta/skill inheritance/old utility | [EVOLUTION_GAMEPLAY_CHANGES.md](EVOLUTION_GAMEPLAY_CHANGES.md) | C04 abilities/E09 budgets/K11 roles, skill mapping cần content review; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P06 / Explicit safe evolution, fixed subject và size/loadout handling | [EVOLUTION_AND_LOADOUT.md](EVOLUTION_AND_LOADOUT.md) | R03/C04-P07, A08-01/02/05; no immediate combat/boss transition là recommendation chưa duyệt; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P07 / Resonance/memory/element continuity và exceptional changes | [EVOLUTION_AND_RESONANCE.md](EVOLUTION_AND_RESONANCE.md) | E10 variants/affiliation rules/F06 stability, no universal dual rule hoặc full-origin reveal; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P08 / Conceptual UI trạng thái/requirements/hints không spoiler | [EVOLUTION_UI_REQUIREMENTS.md](EVOLUTION_UI_REQUIREMENTS.md) | Catalog gates/source proofs/actual assets, không menus hoặc current UI changes; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P09 / Derived eligibility + intent/commit/outcome, replay-safe state flow | [../technical/EVOLUTION_STATE_MACHINE.md](../technical/EVOLUTION_STATE_MACHINE.md) | W07 writer/save acknowledgement, R03 HP/status/boss policy cần duyệt; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P10 / Fairness/catch-up/material optional và Task15 numeric boundary | [EVOLUTION_TRIGGER_MODELS.md](EVOLUTION_TRIGGER_MODELS.md) | R03 floor/curve chưa approved, chưa inventory/economy implementation; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P11 / Stage art/action/directions/anchors/readiness contract | [EVOLUTION_ASSET_CONTRACT.md](EVOLUTION_ASSET_CONTRACT.md) | B12/C04 asset sources/real clips, no concept=validated animation; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P12 / Eight conceptual entities/typed refs/single owner/migration | [../technical/EVOLUTION_DATA_SPEC.md](../technical/EVOLUTION_DATA_SPEC.md) | C04/R03/E09/E10/K11/B12/W07 interfaces, no schema executable; cần scoped approval trước implementation/content freeze phần phụ thuộc |
| V13-P13 / 22future QA cases và local validation invariants | [../technical/EVOLUTION_TEST_CASES.md](../technical/EVOLUTION_TEST_CASES.md) | Approved subset/fixtures/modules/assets trước runtime tests; cần scoped approval trước implementation/content freeze phần phụ thuộc |

## UNRESOLVED decision queue

| ID | Câu hỏi / gate |
| --- | --- |
| V13-U01 | Chọn Model D và requirement grammar/alternative policy nào cho từng species? Trước evolution resolver production |
| V13-U02 | Exact EXP curves/levels/caps/mastery counts/evolution thresholds và placements? Để Task15 và A08-04/10, không số default |
| V13-U03 | Chấp nhận safe explicit transition/outside-combat/outside-boss policy, fixed subject/switch arbiter/unequipped behavior? Trước transition implementation |
| V13-U04 | HP/maxHP/cooldown/accepted-status/resource mapping khi stage đổi; material reservation có dùng không? R03/E09/E10 và inventory/economy chưa approved |
| V13-U05 | Quyền replay/cosmetic old stages/downevolution, skill successor compatibility và migration? Không tự tạo extra forms/rewards |
| V13-U06 | Actual stage references/required clips/modules/geometry/Long envelope/size normalization/camera/route clearances? C04-P07/B12 production approval trước art/integration |
| V13-U07 | Ngoại lệ đổi affinity/elemental variants/memory required/dual evolution rule? E10 và story gates cần chọn rõ, Sacred canon giữ |
| V13-U08 | Save adapter/atomic writer/acknowledgement/backup/UX/loss budget và old ID/schema/content migrations? W07/A08-11, minimal E09 status obligation chưa duyệt |
| V13-U09 | Early boss entry trigger/capability/empty snapshot/retry/outcomes? A08-05; D41 count barrier đã giải, không hỏi lại full-three |
| V13-U10 | New species/stages ngoài Sacred, B12 external concept scope/playability và final production tier? Không two/one fixed quotas hoặc new roster approval |

## SUPERSEDED / continuity

Không confirmed creative decision nào bị Task13 thay. H08-S01 historical ending vẫn superseded bởi D26; R03-P06 full-three chưa từng approved, không gọi là accepted canon superseded. Các đề xuất trước về hoãn evolution/R03-P09/C04-P06/E10-P07 được chi tiết hóa nhưng **không tự RESOLVED/CONFIRMED**. Stage-name/ID/chapter/element/art identity giữ. PhaseI PARTIAL, không full audit09–16 hoặc Task14 tự bắt đầu.
