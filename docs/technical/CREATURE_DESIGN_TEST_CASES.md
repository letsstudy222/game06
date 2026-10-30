# Creature thiết kế — future acceptance scenarios

**PROPOSED B12-P12**.20 cases dưới là QAplan, **chưa thực thi gameplay/animation/migration tests**. Read-only PNG structure và Markdown checks trong Task12 là riêng, không thay thế cases này. [Pipeline](CREATURE_CONTENT_PIPELINE.md), [decisions](../creatures/TASK12_DECISIONS.md) và [similarity](../creatures/CREATURE_SIMILARITY_AUDIT.md) giữ truy vết.

## B12-EC01 — Silhouettes gần giống

| Field | Scenario |
| --- | --- |
| Preconditions | Hai draft bản ý tưởng cùng shape ở required scale |
| Expected handling | So rubric/side-by-side FXoff, revise proportions/posture/sinh thái trước phê duyệt |
| Approval requirements | Art/gameplay phê duyệt scoped revision, không auto merge/delete |
| Validation method | Futureblackfill/grayscale/actionextrema đánh giá actual images |
| Risk severity | HIGH |

## B12-EC02 — Resembles Sacred

| Field | Scenario |
| --- | --- |
| Preconditions | New wildlife giống mai Quy/crown Phoenix/Long cơ thể/gạc Ly |
| Expected handling | Giữ Sacred baseline, đề xuất sửa thiết kế đối chiếu chính bản ý tưởng không chỉ color |
| Approval requirements | Explicit review nếu thiết kế đã duyệt bị đề nghị thay, không overwrite |
| Validation method | Compare cả 12Sacred stages/sizes và actual tham chiếu |
| Risk severity | HIGH |

## B12-EC03 — Sheet 3 forms chỉ 2 đã duyệt

| Field | Scenario |
| --- | --- |
| Preconditions | Secondary target 2 có bản ý tưởng sheet 3 poses/forms |
| Expected handling | Inventory cả 3 với nguồn, chỉ 2 đã duyệt nếu có evidence; form 3UNRESOLVED |
| Approval requirements | Additional stage separate phê duyệt, sheet không auto approve |
| Validation method | Approval revision/stageIDs/progression gates match |
| Risk severity | HIGH |

## B12-EC04 — Unapproved element label

| Field | Scenario |
| --- | --- |
| Preconditions | Metadata ghi Earth/Water–Earth |
| Expected handling | Preserve label/nguồn, UNRESOLVED material/env/temp/future ứng viên |
| Approval requirements | New family explicit phê duyệt, không map Metal/delete bản ý tưởng |
| Validation method | Six registry refs và unknown metadata quarantine đánh giá |
| Risk severity | HIGH |

## B12-EC05 — Concept no sprite

| Field | Scenario |
| --- | --- |
| Preconditions | Có visual ly approved concept nhưng chưa player frames |
| Expected handling | Concept ready đúng scope, runtime form not ready; giữgap |
| Approval requirements | Production reference approval không thay clip phê duyệt |
| Validation method | Check actual paths/action/directions/timing/provenance |
| Risk severity | HIGH |

## B12-EC06 — Missing direction frames

| Field | Scenario |
| --- | --- |
| Preconditions | Atlas thiếu required left/up hoặc mirror ed asymmetry |
| Expected handling | Block required action ready; fallback chỉ compatible được duyệt |
| Approval requirements | Art/technical đánh giá mirror/fallback, no silent placeholder |
| Validation method | Future frame bounds/direction/anchor/playback tests |
| Risk severity | HIGH |

## B12-EC07 — Nonplayable becomesplayable

| Field | Scenario |
| --- | --- |
| Preconditions | Future approved scope update có sinh thái record cũ |
| Expected handling | Thêm module/art/route/progression; discovery cũgiữ, unlock proof+ledger |
| Approval requirements | Playability/content đã duyệt trước integration |
| Validation method | R03 grantidempotence/old record preservation và required clips |
| Risk severity | HIGH |

## B12-EC08 — New evolution

| Field | Scenario |
| --- | --- |
| Preconditions | Existing species được đề xuất stage |
| Expected handling | Versioned gates/art/clearance/safe commit, no auto XP reset |
| Approval requirements | Explicit stage approval, Sacred 3 không silent stage 4 |
| Validation method | Migration/oldsave/skill gates/boss frozen config tests sau |
| Risk severity | HIGH |

## B12-EC09 — Same cơ thể/element

| Field | Scenario |
| --- | --- |
| Preconditions | Hai loài dạng chim Wind hoặc Water-mai/vỏ |
| Expected handling | Tìm giải phẫu/vận động/nguồn/kit khác cómeaning, không label ban |
| Approval requirements | Design/art/gameplay đánh giá, chưa score khi không ảnh |
| Validation method | Side-by-side stance/turn/role/counterplay at scale |
| Risk severity | MEDIUM |

## B12-EC10 — Unreadable small size

| Field | Scenario |
| --- | --- |
| Preconditions | Concept detail đẹp nhưng silhouette mấtởgameplayscale |
| Expected handling | Simplifycluster/khoảng âm theo reviewed revision, chưa approve production |
| Approval requirements | Reference change cần scoped approval trước export mới |
| Validation method | Native/integer display bright/dark/busybackground tests |
| Risk severity | HIGH |

## B12-EC11 — Movement giải phẫu mismatch

| Field | Scenario |
| --- | --- |
| Preconditions | Creature được gán climb/flight thiếugrip/lift body |
| Expected handling | Revise cách vận động/giải phẫu hoặc defer ability, không bịa engine capability |
| Approval requirements | Art+gameplay/capability phê duyệt, không new main mechanic auto |
| Validation method | Review force/contact/turn/terrain/clip và safe return |
| Risk severity | HIGH |

## B12-EC12 — Collision sizejumps

| Field | Scenario |
| --- | --- |
| Preconditions | Animation visual đổi làm collider phình theo mỗi FX frame |
| Expected handling | Tách cơ thể/FX/envelope/collision proposal, test readable contact |
| Approval requirements | C04-P07 solution cần technical prototype/phê duyệt, không silent hitbox change |
| Validation method | Future passage/turn/hurtbox/frame alignment/anchor tests |
| Risk severity | HIGH |

## B12-EC13 — No gameplay niche

| Field | Scenario |
| --- | --- |
| Preconditions | Meaningful playable chỉ copy kit và đổi màu |
| Expected handling | Reviseprimarymechanic hoặc re classify ambient nếu được duyệt |
| Approval requirements | Gameplay/scope phê duyệt, không bắt ambient thành combat |
| Validation method | Compare nguồn/timing/utility/limits với closestspecies |
| Risk severity | MEDIUM |

## B12-EC14 — Redesign thiết kế đã duyệt

| Field | Scenario |
| --- | --- |
| Preconditions | Có proposal thay Phoenix/other đã duyệt identity |
| Expected handling | Giữ existing asset, tạo revision/diff/rationale/nguồn, chờ review |
| Approval requirements | Explicit creative approval cho replacement; task docs không replace |
| Validation method | Git/asset checksum và phê duyệt scope/evidence đánh giá |
| Risk severity | HIGH |

## B12-EC15 — Renamed species save

| Field | Scenario |
| --- | --- |
| Preconditions | Oldsave giữ speciesId/têncũ |
| Expected handling | StableID/aliases giữ form XP/records/memory/ledger, no auto grant |
| Approval requirements | Migration mapping approved trước release |
| Validation method | Futureloadtwice/progression preservation/unknown ID backup |
| Risk severity | HIGH |

## B12-EC16 — Future element

| Field | Scenario |
| --- | --- |
| Preconditions | Content expansion đề xuất seventh family |
| Expected handling | Draft isolate, cosmology/affinity/counterplay/migration đánh giá |
| Approval requirements | Explicit user approval; nguồn/status giữ unknown |
| Validation method | Registry/matrix/old catalog unaffected, no Earth auto confirm |
| Risk severity | HIGH |

## B12-EC17 — Chapter overshoottarget

| Field | Scenario |
| --- | --- |
| Preconditions | Chapter có hơn 2 phụ/4 ordinary planning entries |
| Expected handling | Budget/silhouette/sinh thái đánh giá, target không hard cap; no all playable assumption |
| Approval requirements | Content/scope approval cho additions, không invent quotas confirmed |
| Validation method | Coverage/action workload/table counts/quality gates đánh giá |
| Risk severity | MEDIUM |

## B12-EC18 — Boss same species

| Field | Scenario |
| --- | --- |
| Preconditions | Boss actor cùng ecological species với chơi được form |
| Expected handling | Actor/encounter role separate species ID/eligibility, no boss-only conflict |
| Approval requirements | Encounter/capability/scope đã duyệt, unique outcome ledger |
| Validation method | Future actor/progression/discovery/no duplicate grants tests |
| Risk severity | HIGH |

## B12-EC19 — Unavailable reference file

| Field | Scenario |
| --- | --- |
| Preconditions | Brief trỏpriorconversationimage hoặc missing file |
| Expected handling | RecordMissing/nguồn provenance, không claim inspection/invent path |
| Approval requirements | Needactualreference+phê duyệt trước visual production ready |
| Validation method | Local path/access/link check và absence honest report |
| Risk severity | HIGH |

## B12-EC20 — False production ready

| Field | Scenario |
| --- | --- |
| Preconditions | Concept sheet/metadata bị đánh full atlas approved |
| Expected handling | Correctstatus projection từ actual evidence, preserve audit trail |
| Approval requirements | Status review đủ scope; existing asset không đổi tựđộng |
| Validation method | Review 10 gates/frame/marker/playback/license evidence, fail còn thiếu gates |
| Risk severity | HIGH |
