# Task11 — decision và approval register

Baseline `a2023bb`; ngày31/10/2026 Asia/Saigon. [PROJECT_DECISIONS](../PROJECT_DECISIONS.md) sở hữu source hierarchy: explicit approval → later approved supersession → consistent canon → completed requirements → recommendations. Quyền tự làm/commit/push không là duyệt mechanics.

## CONFIRMED — sources và phạm vi

| Source | Ràng buộc được giữ |
| --- | --- |
| D05/D06/D07/D41, explicit Task11 §14/19 | Up-to-three available forms theo tiến trình, membership locked boss, switch trong set; đầu game không đòi đủ3forms, progression độc lập |
| D08/D36, explicit Task11 §2/4/7/8 | Rarity/role/ecology/element/morality/playability riêng; rare không auto mạnh, boss không auto playable, intelligent không auto boss, dual không auto rare |
| D09/D30–D35, Task11 §9/10 | BốnSacred identity/affiliations/3stages preserved, Life authority riêng, approved Phoenix/Long directions preserved |
| D37/D39, Task11 §12/16 | Collection/revisit bảo vệ, data-driven expansion/reusable mechanics; không main-story optional-species gate hoặc mandatory random gacha |

D19 vẫn **PROPOSED**: năm nhãn là candidates, không confirmed canon. Các mechanics R03/C04/S05/F06/W07/E09/E10 không được tự nâng approval. Các quantities ngoài Sacred là targets Task11, không fixed species quota.

## PROPOSED register

| ID / title | Source authority | Rationale / dependencies / risks / approval |
| --- | --- | --- |
| K11-P01 / Chín axes/species-actor-stage/save scope | [CREATURE_CLASSIFICATION_OVERVIEW.md](CREATURE_CLASSIFICATION_OVERVIEW.md) | D08/D36/D39, không taxonomy gameplay auto-effect; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P02 / ModelB ba candidates, Legend/Rainbow defer | [RARITY_SYSTEM.md](RARITY_SYSTEM.md) | D19 giữ PROPOSED, roster/criteria/presentation chưa đủ; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P03 / Sacred narrative designation riêng rarity | [RARITY_SYSTEM.md](RARITY_SYSTEM.md) | D30–35, không automatic Legend hoặc power bonus; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P04 / Sáu combat roles và specialization/hybrid tags | [COMBAT_ROLE_TAXONOMY.md](COMBAT_ROLE_TAXONOMY.md) | C04 skills/stage evidence, E09 budgets, no primary-element hierarchy; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P05 / Mười exploration categories và route scope | [EXPLORATION_ROLE_TAXONOMY.md](EXPLORATION_ROLE_TAXONOMY.md) | W07 geometry/capability; climb/burrow deferred; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P06 / Reuse F06 ecology và elite encounter overlay | [../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md) | F06 behavior/state owners, E10 stability, no new enum/roster; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P07 / Playability scopes/overlap/readiness | [PLAYABILITY_CLASSIFICATION.md](PLAYABILITY_CLASSIFICATION.md) | R03 source/compatibility/catalog eligibility và actual assets; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P08 / Evidence matrix/evolution/variant boundaries | [CREATURE_CLASSIFICATION_MATRIX.md](CREATURE_CLASSIFICATION_MATRIX.md) | C04 threeSacred stages confirmed, othercounts targets, E10 variants pending; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P09 / Sáu collection values/pacing/accessibility | [../gameplay/CREATURE_COLLECTION_VALUE.md](../gameplay/CREATURE_COLLECTION_VALUE.md) | R03 catch-up chưa approved, W07 habitat/quest proof; no mandatory gacha; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P10 / Chín power axes/composition/counterplay examples | [../gameplay/CREATURE_ROLE_BALANCE.md](../gameplay/CREATURE_ROLE_BALANCE.md) | D41 count resolved, entry/retry pending, no balance numbers verified; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P11 / Chín conceptual entities, projections/owners/migration | [../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md](../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md) | R03/C04/F06/E09/E10/W07 ownership và future technical audit; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |
| K11-P12 / 20future QA cases | [../technical/CREATURE_CLASSIFICATION_TEST_CASES.md](../technical/CREATURE_CLASSIFICATION_TEST_CASES.md) | Approved subset/fixtures/runtime implementation sau, chưa actual gameplay tests; khuyến nghị để review, cần approval trước implementation/content freeze phần phụ thuộc |

## UNRESOLVED decision queue

| ID | Decision needed | Gate / dependency |
| --- | --- | --- |
| K11-U01 | Chọn ModelB? Số/tên tiers, semantics Legend/Rainbow, unclassified/not_applicable/presentation? | Trước rarity catalog/UI production; D19 vẫn PROPOSED, no implicit supersession |
| K11-U02 | Chấp nhận separate Sacred designation; rarity từng species có áp dụng/assign gì? | Trước finalized collection catalog, không ảnh hưởng confirmed identity/stages |
| K11-U03 | Roles/primary-secondary taxonomy, stage mappings và exploration subset? | C04 ability evidence/actual geometry; climb/burrow không approved features |
| K11-U04 | Secondary species roster/playability/lineage counts/variants/habitats? | E10-U04/U05/A08-14; templates không species đã duyệt, không quotas |
| K11-U05 | Catch-up/floor/XP/skills/mastery/evolution gates/power-budget parameters? | R03-P09/A08-04/10, E09/E10 balances; no final numbers |
| K11-U06 | Rarity/role/collection-scope version migration và recognition of old observation? | R03/W07 save/storage/ledger; policy trước achievements/production migrations |
| K11-U07 | Early boss trigger/capability/empty snapshot/retry/outcomes? | A08-05/E09-U07/E10-U07; no-three count barrier đã giải, không hỏi lại full-three |
| K11-U08 | Actual art/animation/controller/collision/receiver/performance readiness? | Repository audit/approved production assets trước playable implementation; không giả concept là atlas |

## SUPERSEDED và preservation

Không approved decision nào bị Task11 thay thế. H08-S01 historical ending supersession vẫn theo D26; R03-P06 full-three là proposal cũ, không accepted canon bị supersede. D19 năm labels không bị xóa hay tự supersede bởi recommendation ModelB. E10/E09 ModelC recommendations và numbers/status/save chưa approved, tiếp tục mở. PhaseI PARTIAL, Task11 documentation completion không gameplay implementation hoặc phase09–16 audit. Task12 chưa bắt đầu.
