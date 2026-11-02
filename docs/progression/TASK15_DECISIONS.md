# Task15 — decisions, proposals và unresolved gates

Ngày 31/10/2026 Asia/Saigon, HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`; Task14 docs đã có trong working tree chưa commit và giữ nguyên. [PROJECT_DECISIONS](../PROJECT_DECISIONS.md) giữ hierarchy explicit approval → later approved supersession → consistent canon → task requirements → recommendations. Không quyền viết docs nào tự approve balance. Task15 documentation only, không Task16/full audit09–16.

## CONFIRMED constraints / actual evidence

| Source | Phạm vi được giữ |
| --- | --- |
| D07/D30–33, Task15 §2–3/9 | Species XP/level/skills/progression riêng, Sacred ba major stages; evolution không reset XP/erase skills; không record mới theo duplicate encounter |
| D05/D06/D41 | One active/up-to-three equipped, boss membership lock cho switch trong set; không mandatory full-three/three-elements/optional-species early main gate |
| D08/D31/D36/D39, Tasks09–12 | Role/rarity/element/morality/playability độc lập, old/common/single forms giữ utility, data-driven definitions/reusable modules |
| D12/D37, Task15 §12/15/20 | Peaceful collection không cần kill, unique rewards/recovery/return safety/persistence coherent; không spend required item thành unavoidable main softlock |
| Actual runtime | HTML/CSS/Canvas ES modules; SkillSystem có hit/target respawn, GameState có hazards/shrine reset. Không species XP/levels/loot/mastery/inventory/save progression resolver được thấy trong src/island |
| Actual Task14 docs | Đủ 17 tài liệu theo delivery index, 32 future cases; C14-P01–P16 vẫn PROPOSED và C14-U01–U10 mở, chưa runtime combat generic/Quy ready |

Task15 yêu cầu không final cap/EXP growth/drop rates/thresholds. Không thay R03/V13/C14 status bằng số minh họa. D19 rarity labels và K11 ModelB vẫn proposals; không rarity stat/XP multiplier mới.

## PROPOSED register

| ID / recommendation | Authority document | Lý do / dependencies / approval gate |
| --- | --- | --- |
| P15-P01 / one species owner, nhiều meaningful activities/ít bars | [Overview](PROGRESSION_SYSTEM_OVERVIEW.md) | R03/C04/W07 source owners; no spirit level/duplicate species instances, cần scoped domain approval |
| P15-P02 / source categories cùng species XP; mastery evidence riêng | [EXP sources](EXPERIENCE_SYSTEM.md) | Combat/exploration/resonance/quest/mastery/memory evidence, source budgets/stacking P15-U01/U06 |
| P15-P03 / Model D bounded participation + milestone foundation | [EXP distribution](EXPERIENCE_SYSTEM.md) | Fair tactical use 1–3 forms, no reserve passive share; weights/cutoff/attribution U01 |
| P15-P04 / shared segmented curve, retained earned XP at future cap | [Curves](LEVEL_CURVES.md) | Avoid rarity XP tax/grind, version/expansion safe; cap/curve/overflow/migration U02 |
| P15-P05 / bounded attribute growth, safe benefits/no heal | [Growth](ATTRIBUTE_GROWTH.md) | Preserve species/cause budgets, proposed absolute HP on level-up vs V13 stage ratio distinct; U03/R03/C14/V13 pending |
| P15-P06 / mastery objective evidence/refinements | [Mastery](SKILL_MASTERY.md) | No empty-cast/overheal/self-farm, same masteryObjectives owner; U04 |
| P15-P07 / global support expressed as milestone floor, not two bonuses | [Catch-up](CATCH_UP_PROGRESSION.md) | max(existingXP,floor), same eligible unlocked species, safe boundary/no heal/mastery grants; U05 |
| P15-P08 / V13 requirement/ref/spend integration | [Evolution](EVOLUTION_PROGRESSION_INTEGRATION.md) | Durable proof vs volatile availability, atomic stage/spend, preserve XP/skills; exact gates U04/U08/V13 |
| P15-P09 / sourced combat/nonlethal rewards | [Rewards](../economy/REWARD_SYSTEM.md) | F06/W07 recipients/occurrences/one-time vs repeat, no coin-from-every-creature; U06 |
| P15-P10 / deterministic main rewards, optional random later | [Loot](../economy/LOOT_TABLE_DESIGN.md) | Freeze selection/version, evaluate alternatives/guarantee not auto pity; U07 |
| P15-P11 / minimal Chapter I resources, proofs not currency | [Economy](../economy/RESOURCE_ECONOMY.md) | No crafting/equipment/training economy by default; optional one sourced family only if sink approved; U08 |
| P15-P12 / canonical inventory ownership/retained entitlement | [Inventory](../economy/INVENTORY_REQUIREMENTS.md) | Full capacity không lost unique payload, resource conservation/protection; U08/U09 |
| P15-P13 / whole reward lifecycle same W07/R03 writer | [Consistency](../economy/REWARD_CONSISTENCY.md) | No partial XP/item/claim/outcome, no replay/reroll; U09 storage/ack/loss budget |
| P15-P14 / qualitative chapter competencies/budgets | [Chapters](CHAPTER_PROGRESSION_BALANCE.md) | Old/common forms useful, no level brackets/HP-only ladder; U02/U10 |
| P15-P15 / minimal one-form Quy progression demonstrator | [Slice](FIRST_PLAYABLE_PROGRESSION.md) | XP+repeat combat+observation+unique+save proof, subset D40/C14, no inventory UI/crafting quota; U10 |
| P15-P16 / 13 conceptual data contracts/views | [Data](../technical/PROGRESSION_DATA_SPEC.md) | Same XP/skill/stage/status/world/ledger owners, not runtime models, U09 |
| P15-P17 / 34 future QA cases và local doc validation | [QA](../technical/PROGRESSION_TEST_CASES.md) | Fixtures/numerics/assets/storage phải approve, chưa tests thực thi |

## UNRESOLVED queue

| ID | Quyết định còn cần / gate |
| --- | --- |
| P15-U01 | Chọn distribution D hay A/B/C; meaningful support/control criteria, normalized weights/rounding/cutoff/recipient choice/DoT/env attribution policy? Trước multi-form reward resolver |
| P15-U02 | Segmented curve/cap/overflow/adoption/migration policy và XP/level/growth/pace targets? Không final max/chapter ranges/thresholds trong Task15 |
| P15-U03 | Level/stage growth/HP mapping/pending benefits/frozen combat config, resistance/skill efficiency limits? R03/C14/V13 HP/recovery chưa approve |
| P15-U04 | Skill unlock/upgrade/mastery objectives/alternatives/refinements và evolution condition subset? No optional lore completionist main gate |
| P15-U05 | Foundation milestones/levels/curve thresholds/eligibility/application timing và practice sources? No strongest-copy, no passive share stack |
| P15-U06 | Encounter/source budgets, source occurrence/reset policies, reward recipients/source provenance/exclusion groups và first-clear identities? Trước content manifests |
| P15-U07 | Có optional random loot không, pool/weights/guarantee-counter hay deterministic alternatives? No production drop rates/pity numbers approved |
| P15-U08 | Resource family/sinks, inventory/protection/capacity/overflow/consumption/repair routes và material evolution grammar? No generic currency/crafting assumption |
| P15-U09 | Writer/storage adapter/namespace/atomic acknowledgement/backup/migration/quota/export/error UX/loss budget cùng R03/W07/E09 obligations? Trước persistence implementation |
| P15-U10 | Slice scope/Quy assets/combat modules/plane/HP readiness, chapter competency/budgets/device acceptance? C14 gates còn mở, cần task implementation riêng |

## SUPERSEDED và continuity

Không confirmed creative decision nào bị Task15 thay; H08-S01 historical ending vẫn theo D26. R03 active-only và catch-up floor là proposals; P15-P03 khuyến nghị alternative D có participation **không phải supersession một accepted rule**, và vẫn giữ floor direction dưới proposal. C14 cooldown/HP riêng/brace/abort-reset, V13 safe transition/ModelD, E09/E10 mechanics không auto approved. Phần full-three R03-P06 chưa từng approved và không early prerequisite theo D41; không hỏi lại no-three baseline.

Task14 “Task15 chưa bắt đầu” là historical handoff; Task15 hiện được giao, Task16 chưa bắt đầu. PhaseI PARTIAL, local review không full09–16 audit. Không final numerical balancing parameters được duyệt mới.
