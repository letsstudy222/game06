# Task11 — consistency audit và delivery mapping

Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. Working tree sạch khi bắt đầu. Audit này chỉ classification/rarity/roles/collection và compatibility cần thiết, **không full phase audit Tasks09–16**. Nội dung mới là PROPOSED, implementation chưa có. Task12 không bắt đầu.

## Nguồn đã đối chiếu

| Task / area | Actual paths và sections | Finding sử dụng |
| --- | --- | --- |
| 01/08 vision/decisions | [GDD §3.1–3.14](../GAME_DESIGN_DOCUMENT.md), [PROJECT_DECISIONS D08/D19/D30–41/A08](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md), [PHASE_I_HANDOFF](../PHASE_I_HANDOFF.md) | D19 vẫn candidate five tiers; PhaseI PARTIAL; first playable Quy khác Dawn prototype |
| 02 cosmology continuity | GDD §3.3 và [E09 baseline](../elements/ELEMENTAL_SYSTEM_OVERVIEW.md) | Six elements/Life authority giữ; Task11 không quyết chronology hoặc origin |
| 03 resonance/progression | [RESONANCE_RULES](../lore/RESONANCE_RULES.md), [RESONANCE_DATA_MODEL](../technical/RESONANCE_DATA_MODEL.md), [CREATURE_PROGRESSION_CONCEPT](../gameplay/CREATURE_PROGRESSION_CONCEPT.md), [TRANSFORMATION_DESIGN](../gameplay/TRANSFORMATION_DESIGN.md) | Discovery/observation/resonance/memory/mastery riêng; catch-up floor proposal; no new progression owner |
| 04 Sacred/data/art | [Overview](SACRED_CREATURE_OVERVIEW.md), [Quy](QUY_HAI_UYEN.md), [Phượng](PHUONG_HOANG_NHAT_DIEM.md), [Long](LONG_THIEN_PHONG.md), [Ly](LY_VAN_SINH.md), [CREATURE_DATA_SPEC](../technical/CREATURE_DATA_SPEC.md), [ASSET_REFERENCE_REGISTER](../ASSET_REFERENCE_REGISTER.md) | Four identities/3stages preserved; ID/role mapping proposals; Phoenix reference khác stageIII và atlas đủ clips |
| 05 story handoff | GDD §3.6, PHASE_I_HANDOFF story event authority references | Classification không thêm optional creature/rarity requirement vào24main events hoặc đổi chapter order |
| 06 behavior | [CREATURE_BEHAVIOR_CLASSIFICATION](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [FACTION_ENEMY_DATA_MODEL](../technical/FACTION_ENEMY_DATA_MODEL.md), [ENEMY_ARCHETYPES](../gameplay/ENEMY_ARCHETYPES.md) | Tám views khác rarity; elite overlay, factions không species-wide morality |
| 07 population | [ECOLOGY_AND_SPAWN_STATES](../world/ECOLOGY_AND_SPAWN_STATES.md) | Coverage cả undiscovered, alternate habitat/refuge, journal không reset khi world đổi |
| 09 elemental | [ELEMENTAL_SYSTEM_OVERVIEW](../elements/ELEMENTAL_SYSTEM_OVERVIEW.md), [E09 decisions](../elements/TASK09_DECISIONS.md), [elemental data](../technical/ELEMENTAL_DATA_SPEC.md) | Role không ràng element; status/property/channel khác affiliation, effects không rarity modifiers |
| 10 dual | [DUAL_ELEMENT_OVERVIEW](../elements/DUAL_ELEMENT_OVERVIEW.md), [MODELS](../elements/DUAL_ELEMENT_MODELS.md), [families](../elements/DUAL_ELEMENT_COMBINATIONS.md), [E10 decisions](../elements/TASK10_DECISIONS.md), [dual data](../technical/DUAL_ELEMENT_DATA_SPEC.md) | Four families là templates chưa roster; ModelC/resistance/math/variants/recovery vẫn pending |

Review tài liệu/metadata, không direct image/playback mới. Không claim kiểm concept attachment bên ngoài repository. Ngoài bốn Sacred, nhóm nguồn review có archetypes/families nhưng chưa named secondary species/art approved để đưa vào official roster. Matrix ghi templates rõ, không tạo species giả. Các file expected và link có thật được kiểm khi validation; không suy existence từ prompt.

## Deliverable mapping — 13 yêu cầu

| Requested | Actual source |
| --- | --- |
| CREATURE_CLASSIFICATION_OVERVIEW | [Overview](CREATURE_CLASSIFICATION_OVERVIEW.md) |
| RARITY_SYSTEM | [Rarity](RARITY_SYSTEM.md) |
| COMBAT_ROLE_TAXONOMY | [Combat](COMBAT_ROLE_TAXONOMY.md) |
| EXPLORATION_ROLE_TAXONOMY | [Exploration](EXPLORATION_ROLE_TAXONOMY.md) |
| ECOLOGICAL_CLASSIFICATION | Reuse/extend [CREATURE_BEHAVIOR_CLASSIFICATION](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), không duplicate file |
| PLAYABILITY_CLASSIFICATION | [Playability](PLAYABILITY_CLASSIFICATION.md) |
| CREATURE_CLASSIFICATION_MATRIX | [Matrix](CREATURE_CLASSIFICATION_MATRIX.md) |
| CREATURE_COLLECTION_VALUE | [Collection value](../gameplay/CREATURE_COLLECTION_VALUE.md) |
| CREATURE_ROLE_BALANCE | [Balance](../gameplay/CREATURE_ROLE_BALANCE.md) |
| CREATURE_CLASSIFICATION_DATA_SPEC | [Data](../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md) |
| CREATURE_CLASSIFICATION_TEST_CASES | [Future scenarios](../technical/CREATURE_CLASSIFICATION_TEST_CASES.md) |
| TASK11_DECISIONS | [Decisions](TASK11_DECISIONS.md) |
| TASK11_CONSISTENCY_AUDIT | Tài liệu này |

Tổng12tệp mới;7tệp existing chỉ mở rộng: README.md; docs/GAME_DESIGN_DOCUMENT.md; docs/PROJECT_DECISIONS.md; docs/OPEN_QUESTIONS.md; docs/PHASE_I_HANDOFF.md; docs/technical/CREATURE_DATA_SPEC.md; docs/ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md. Original bodies preserved. Không delete hoặc rename authoritative docs.

## Findings, contradictions và missing prerequisites

| ID | Severity | Evidence / risk | Handling / approval dependency |
| --- | --- | --- | --- |
| C11-01 | HIGH | D19 five tiers PROPOSED dễ được lấy làm confirmed bởi HUD Legend | ModelA/B so sánh, recommendation B chưa approve; legacy labels không xóa, K11-U01 |
| C11-02 | HIGH | Sacred/Legend/Rainbow/stageIII dễ trộn | Separate narrative designation recommendation, Sacred rarity unresolved, identity3stages confirmed |
| C11-03 | HIGH | CollectionEntry/EcologicalBehaviorProfile/Lineage dễ duplicate R03/F06/C04 state | Explicit projection/alias/extension, one-owner contract K11-P11; runtime mapping cần audit |
| C11-04 | HIGH | Prompt giữ early-entry conflict có thể bị hiểu D41 chưa giải count | Count đã confirmed no-three; entry trigger/capability/snapshot/retry A08-05 còn pending, không mở lại full-three |
| C11-05 | HIGH | Missing actual Quy/underwater/secondary assets/modules; Phoenix atlas chưa all actions | Matrix/register honest gaps, không concept=production; K11-U08/A08-14 |
| C11-06 | MEDIUM | Role hybrid/evolution tạo full kit/cost kép hoặc XP reset | Stage role projection, onebudget, same progression, skill gates không tự grant |
| C11-07 | HIGH | Habitat restored trước discovery hoặc rare encounter only RNG gây collection lock | W07 coverage/prior proof/alternate refuge, no mandatory gacha/species gate |
| C11-08 | MEDIUM | Secondary2/wildlife1/boss1 hoặc4dual families thành fixed roster | Planning targets/templates, chưa species approval, không bịa art files/counts |
| C11-09 | MEDIUM | Catch-up/status/save/variant choices chưa approved | R03/E09/E10/W07 decisions giữ pending; classification không tự giải mechanics |
| C11-10 | LOW | Historical “Task11 chưa bắt đầu” ở Task10 handoff | Thêm current navigation với historical context, không sửa audit lịch sử |

Không tìm thấy xung đột confirmed-vs-confirmed mới đòi sửa canon trong scope này. Không có nghĩa các proposed mechanics đã verified balance. D18/D38 provenance, C04-P07 proposal status và chronology Q02/A08-15 không sửa. H08-S01 giữ accepted supersession; D19 không tự SUPERSEDED bởi ModelB.

## Internal gates — document review, không gameplay pass

| Gate Task11 §19 | Kết quả tài liệu / evidence |
| --- | --- |
| 1 Separate rarity/affinity/combat/ecology | Đạt về đặc tả: nine-axis overview + data ownership |
| 2 Rarity không auto power | Đạt: rarity/balance không numerical modifiers |
| 3 Normal useful | Đạt: hypothetical traversal niche/late-game utility, chưa playtest |
| 4 Sacred coherent | Đạt: recommendation separate designation, rarity unresolved |
| 5 Playable/nonplayable | Đạt: scopes/overlaps/production requirements rõ |
| 6 Four identities preserved | Đạt: matrix refs original4profiles, no source profile edits |
| 7 Evolution counts consistent | Đạt: Sacred3 confirmed, othercounts planning, variants/status riêng |
| 8 No false approval concepts | Đạt: four families template labels, taxonomy/rarity proposals |
| 9 Three-form compatible | Đạt: role synergy onebody/memberlock/switchwithin |
| 10 ChapterI không full-three | Đạt: D41 constraint giữ, A08-05 remaining details explicit |
| 11 Dual không auto rare | Đạt: Normal dual future case và E10 baseline |
| 12 Data expansion | Đạt về blueprint:9entities/one-owner/reusable modules, chưa generic loader |
| 13 Unapproved rarity proposed | Đạt: D19 unchanged; ModelB K11-P02 chưa approve |
| 14 Docs-only | Kiểm diff/status scope khi hoàn tất; không code/UI/art/map changes được phép |

## Task12 readiness

Đủ nguồn để nhận Task12 khi được giao, không tự bắt đầu. Trước finalized classification/rarity production cần approve model/labels/scope/Sacred policy và actual roster; trước playable code cần R03 body/resources/HP/recovery, E09/E10 approved subset/parameters, W07 save/ledger/migration, actual QuyI/underwater/actions/clearance/assets và technical repo audit cho small ChapterI sample. Không bắt allroles/alltiers/allwildlife playable hoặc bốn chapters đồng loạt. Đây không full phase audit, không PhaseI COMPLETE và không gameplay đã triển khai.

## Validation đã chạy

`/tmp/validate_task11.py` kiểm thành công1.004relative file links;12files mới+7existing đều Markdown;9axes mỗi6fields;6combat roles mỗi8fields;10exploration categories;9entities mỗi8fields;20future scenarios mỗi5fields. Markdown tables/fences hợp lệ và toàn bộ original bodies của7existing files giữ nguyên như prefix so baselinea2023bb, chỉ append. `git diff --check` thành công. Các4Sacred profiles,12evolution forms, E09/E10 mechanics sources và story/world dependency definitions không bị sửa. Không gameplay/UI/art/maps/config bị thay đổi; gate14 đạt về diff scope. Cácfuture QA scenarios chưa thực thi, không dùng document validation làm bằng chứng gameplay balance hoặc save implementation.
