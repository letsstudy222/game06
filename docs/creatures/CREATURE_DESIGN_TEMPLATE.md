# Template thiết kế loài thống nhất

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

Dùng template dưới để **viết Markdown species brief khi được giao**, không production JSON. Điền UNRESOLVED/Missing/not_applicable kèm lý do thay bịa chi tiết hoặc asset path. Field canonical chỉ chứa tham chiếu tới owner, không duplicate nguồn. Draft key khác ổn định approved speciesId. CurrentTask12 không tạo 24 official species profiles.

## Identity

| Required field | Hướng dẫn điền |
| --- | --- |
| Stable creature ID | Dùng speciesId ownerC04 nếu đã có; trước phê duyệt dùng draft reference Key, không hai canonical IDs. |
| Vietnamese display name | Tên tham chiếu/working/đã duyệt status riêng, đổi tên không đổiID. |
| Working English name | PROPOSED hoặc UNRESOLVED, không runtime key từ tên dịch. |
| Chapter | Intro chapter/region refs, không hạnchế chỉ dùng trong chương đó. |
| Native or foreign-influenced status | Evidence/nguồn riêng; unknown hợp lệ, không morality. |

## Classification

| Required field | Hướng dẫn điền |
| --- | --- |
| Elemental profile | Ref E09/E10 và evidence; status/vật liệu khác affiliation, Life authority riêng. |
| Proposed rarity | Ref K11 policy hoặc UNRESOLVED; không power multiplier. |
| Ecological behavior | F06 profile refs, context và actor override riêng. |
| Playability | Eligibility owner Species và production readiness riêng, không discovery=unlock. |
| Narrative significance | Species/actor/encounter scope; Sacred/boss khác rarity. |
| Combat role | Primary/hybrid/none + actual ability evidence. |
| Exploration role | Capabilityrefs/conditions, route essential/optional theo quest. |

## Biology

| Required field | Hướng dẫn điền |
| --- | --- |
| Body plan | Primary/phụ descriptors + chức năng. |
| Anatomy | Đầu/thân/chi/phần phụ/khớp, nguồn force/mass logic. |
| Size category | Relative scale scene; actual bounds per direction/posture pending, không mọi sprite 96. |
| Locomotion | Main method/momentum/turn/terrain/cycles/collision/special/limits. |
| Habitat | Primary/phụ/refuges, ngưỡng chịu đựng/nguồn/return. |
| Ecology | 10 field sinh thái contract; unknown ghi reason và evidence cần. |

## Visual Design

| Required field | Hướng dẫn điền |
| --- | --- |
| Silhouette | Primary concept/khoảng âm/centerofmass, closestcomparators/rubricreview. |
| Color palette | Core/accent/material ramp, không element color only. |
| Materials | Functional texture/highlights, vật liệu khác element. |
| Distinguishing structures | Anatomy và vận động khác comparator vì sao. |
| Elemental visual language | Physical expression/cues/FXseparation; dual integrated, no 50/50. |
| Art tham chiếu status | Actual file+scope+phê duyệt nguồn hoặc Missing, không fabricate path. |

## Gameplay

| Required field | Hướng dẫn điền |
| --- | --- |
| Primary mechanic | Một tactical identity nếu chơi được, hoặc observation/sinh thái interaction nếu ambient. |
| Secondary mechanic | Optional/not applicable nếu scope không cần; không force 3 skills. |
| Movement specialty | Capability/module ref và counter conditions. |
| Combat style | Timing/targeting/counterplay/telegraph; none nếu non combat. |
| Environmental interactions | Receiver/nguồn/revision và transientvsW07 event. |
| Weaknesses | Learnablecounterplay, không xóa utility vùng sau hoặc block main. |
| Progression considerations | R03 form progression refs; costs/HP/catch up/gates pending không invent. |

## Evolution

| Required field | Hướng dẫn điền |
| --- | --- |
| Number of stages | Sacred 3 baseline; phụ 2/thông thường 1 targets, phê duyệt status. |
| Differences between stages | Meaningful anatomy/vận động/decisions, no resize/recolor only. |
| Art needs | Stage-specific clips/directions/anchors/FXgaps, nguồn Asset Register. |
| Gameplay unlock considerations | Eligibility/skill gates/safe commit/boss freeze; no auto identity change. |

## Production

| Required field | Hướng dẫn điền |
| --- | --- |
| Required animation clips | Theo tier/actions có thật, variations/asymmetry/phases; no identicalquota. |
| Asset references | Actual source/export/manifest/provenance refs, còn thiếu null+gapId. |
| Current asset readiness | Evidence vector 10 levels và scope/version, không bản ý tưởng=atlas. |
| Technical risks | Body clearance/renderer/module/nguồn/status/save/migration/performance unknown. |
| Approval status | DecisionRefs/scope/revision/approver/nguồn, changes pending không overwrite approved. |

## Narrative

| Required field | Hướng dẫn điền |
| --- | --- |
| Species lore | Một câu sinh thái đủ cho ambient; không bắt epicbiography. |
| Relation to ancient catastrophe | Unknown/not applicable nếu không có nguồn; không invent chronology. |
| Resonance acquisition bản ý tưởng | Only if playable: viable nguồn/compatibility/route; nonplayableN/A. |
| Ancestral memory relevance | Optional/nguồn/chapter gate, không all species full memory hoặc origin truth. |

## Review attachments / exit check list

Attach nguồn provenance/status, closest 3 comparators khi đủ roster, silhouette đánh giá evidence/sizes/conditions (hoặc gap), sinh thái 10 fields, role budget/route/return proof, minimum production tier, required action manifest gaps, phê duyệt/diff/migrationimpact. Art/capability không đủ thì written thiết kế vẫn draft, không runtime-ready. Thay đổi đã duyệt tham chiếu mở proposal revision riêng; không copy art work từ commercial character hoặc claim originality tuyệt đối. Ordinary ambient chỉ cần lore ngắn và N/A đúng trường không áp dụng, không full combat/progression/ancestral story. [Pipeline](../technical/CREATURE_CONTENT_PIPELINE.md) quyết thứ tự đánh giá, không template tự cấp phê duyệt.
