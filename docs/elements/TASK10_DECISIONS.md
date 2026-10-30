# Task10 — quyết định và approval

Baseline `38b8c1c`, ngày30/10/2026 Asia/Saigon. [Central register](../PROJECT_DECISIONS.md) giữ hierarchy; quyền tự thực hiện/push không là approval mechanics.

## CONFIRMED

Task10 §2/13 giữ six elements, foreign không evil, dual không automatic power/rarity/corruption, Sacred affiliations/Life authority, up-to-three slots/member lock và switch trong set. D41 không bắt full-three, không mandatory hybrid cho main boss theo explicit Task10. Đây là constraints của đề bài, không approved Model C hoặc resistance math.

## PROPOSED

| ID | Recommendation / source | Dependencies / risk / approval |
| --- | --- | --- |
| E10-P01 | [Identity Model C + unordered canonical membership](DUAL_ELEMENT_MODELS.md) | E09-P12/U06; serialization/provenance review; cần duyệt trước phần implementation phụ thuộc |
| E10-P02 | [Species-specific resistance C, E09 owner reuse](DUAL_ELEMENT_MODELS.md) | E09-P03/U02; normalization/counterplay chưa approved; cần duyệt trước phần implementation phụ thuộc |
| E10-P03 | [Bốn families và15pair coverage, art briefs](DUAL_ELEMENT_COMBINATIONS.md) | F06 roster/ecology/art thiếu; không species approved; cần duyệt trước phần implementation phụ thuộc |
| E10-P04 | [Bốn skill types/composition attribution/release](DUAL_ELEMENT_SKILLS.md) | R03 costs/interrupt, actual clips/modules; cần duyệt trước phần implementation phụ thuộc |
| E10-P05 | [Reaction arbitration/root budgets/status compatibility](DUAL_ELEMENT_REACTIONS.md) | E09-P04/05/06; choose subset/priority/caps; cần duyệt trước phần implementation phụ thuộc |
| E10-P06 | [Collection/acquisition riêng và evolution alternatives](DUAL_ELEMENT_OVERVIEW.md) | R03 playable/source/compatibility, C04 gates/variant taxonomy; cần duyệt trước phần implementation phụ thuộc |
| E10-P07 | [Fixed identity default/stability/save migration](DUAL_ELEMENT_EVOLUTION.md) | F06 individual state, W07 transaction/A08-11; cần duyệt trước phần implementation phụ thuộc |
| E10-P08 | [Qualitative power budgets và single-only boss path](../gameplay/DUAL_ELEMENT_BALANCE.md) | Actual encounters/prototype, D41 entry details chưa chốt; cần duyệt trước phần implementation phụ thuộc |
| E10-P09 | [Bảy conceptual entities, single owner extensions](../technical/DUAL_ELEMENT_DATA_SPEC.md) | E09/CREATURE_DATA/F06/W07; no implementation; cần duyệt trước phần implementation phụ thuộc |
| E10-P10 | [20edge scenarios/acceptance invariants](../technical/DUAL_ELEMENT_TEST_CASES.md) | Approved subset/parameters/fixtures trước runtime QA; cần duyệt trước phần implementation phụ thuộc |

## UNRESOLVED

| ID | Câu hỏi / gate |
| --- | --- |
| E10-U01 | Chọn C/unordered membership và presentation semantics? Cần trước catalog resolver production |
| E10-U02 | Species response constraints, damage allocation, resource/cancel/cooldown, proc/CC caps và numbers? Cần prototype/balance, không số giả |
| E10-U03 | Combination subset, internal self-reaction có được dùng không, priority groups/release markers? Cần trước combined action implementation |
| E10-U04 | Species roster/rareness/playable designation, ecology tolerance/anatomy/reference/production clips? Bốn families chưa được duyệt thành species |
| E10-U05 | Có exception đổi secondary/variant taxonomy nào không; gates/conditions? Cần evolution/content approval, Sacred unchanged |
| E10-U06 | Stability actor ownership/recovery evidence, migration and minimal status obligation save? Phụ thuộc F06/R03/W07/E09-U03/A08-11 |
| E10-U07 | Early boss entry trigger/capability/snapshot/retry/outcomes? D41 count barrier đã giải; không reopen full-three gate |
| E10-U08 | Nếu phát hiện Earth historical metadata, là material/environment/temp label/future candidate? Không có approved concept tương ứng tìm thấy tại baseline |

## SUPERSEDED

Task10 không supersede confirmed creative decision nào. H08-S01 giữ historical accepted ending đã thay bằng D26; R03-P06 full-three là proposal cũ không được duyệt, không gọi nó approved SUPERSEDED. E09-U06 được thiết kế đề xuất chi tiết hơn ở Task10 nhưng **chưa RESOLVED/CONFIRMED**; các lựa chọn vẫn cần duyệt. Phase I PARTIAL không biến COMPLETE vì có thêm tài liệu.
