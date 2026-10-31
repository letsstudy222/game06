# Sổ quyết định ecology Task20

## Status kế thừa

| Status | Nền được giữ |
| --- | --- |
| CONFIRMED | Quy Sacred Thủy đầu tiên; Thủy/Hỏa/Phong/Mộc native và Lôi/Kim foreign; Life authority riêng; foreign/dual không auto evil; behavior/rarity/affinity độc lập; D29 sequence, D41 no mandatory full3 early, persistent revisitable world |
| PROPOSED | F06 ecology/process/behavior, K11 scopes, B12 body plans/reference keys, R03 acquisition, C14/E09 mechanics, P15 reward policies, W07 transactions, O17/Q18/H19 details và tất cả E20 proposals mới |
| UNRESOLVED | Official species/element/origin/playability/stages wildlife, concept art, production plane/input/geometry/AI/save/reward quantities; Q01–Q05 lịch sử/vật mang vẫn mở |
| SUPERSEDED | H08-S01 ending cũ phát hiện cổng được D26 thay bằng tái kích hoạt; giữ hồ sơ lịch sử, không sửa canon để hợp ecology |

[PROJECT_DECISIONS](../PROJECT_DECISIONS.md) và [OPEN_QUESTIONS](../OPEN_QUESTIONS.md) giữ canon. Có bản ghi reference trong repo không đồng nghĩa ảnh/thiết kế loài approved. Không thêm D-record xác nhận wildlife, element, playability hoặc HP/recovery. Không use “native” chapter ecology để tự xác nhận origin sáu refs.

## Các đề xuất

| ID / status | Phạm vi và owner file | Cần phê duyệt trước |
| --- | --- | --- |
| E20-P01 PROPOSED | [Tổng quan](CHAPTER1_ECOLOGY_OVERVIEW.md), [register view](CHAPTER1_SPECIES_REGISTER.md), scope/status provenance | Ecology scope/catalog binding, no silent ref→species promotion |
| E20-P02 PROPOSED | [Seven dossiers](CHAPTER1_SPECIES_DOSSIERS.md), body plan/diet/behavior distinctions | Species concept/anatomy/element/origin/stage approval |
| E20-P03 PROPOSED | [Food web](CHAPTER1_FOOD_WEB.md), [quan hệ](CHAPTER1_SPECIES_RELATIONSHIPS.md) | Ecology/narrative cue placement, không mandatory population simulation |
| E20-P04 PROPOSED | [Ma trận sinh cảnh](CHAPTER1_HABITAT_MATRIX.md), distribution by unchanged Task19 graph | Habitat/secondary source/tolerance/coverage production |
| E20-P05 PROPOSED | [Eight behaviors](CHAPTER1_WILDLIFE_BEHAVIORS.md), minimal AI architecture/force/nav/relevance | AI modules/input/geometry/quality budgets implementation |
| E20-P06 PROPOSED | [Noncombat](CHAPTER1_NONCOMBAT_INTERACTIONS.md), knowledge/reward fairness | Interaction/evidence/source target/payload authoring |
| E20-P07 PROPOSED | [Resonance opportunities](CHAPTER1_RESONANCE_OPPORTUNITIES.md), sứa/carp optional playable candidates, ordinary wildlife nonplayable recommendations | Official catalog eligibility/form/assets/requirements; không cấp secondary form IDs ở đây |
| E20-P08 PROPOSED | [Thích nghi/đồng hóa](CHAPTER1_ADAPTATION_AND_ASSIMILATION.md), stable/forced/temporary distinction | Named species profile/individual condition/recovery source approval |
| E20-P09 PROPOSED | [World-state ecology](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), spawn/despawn/outcome views W07 | Save/unique actor/coverage/migration integration |
| E20-P10 PROPOSED | [Encounter distribution](CHAPTER1_ENCOUNTER_DISTRIBUTION.md), [lát cắt đầu tiên](CHAPTER1_FIRST_PLAYABLE_ECOLOGY.md) | Scope/encounter/telegraph/source proof policy và art |
| E20-P11 PROPOSED | [Art](../art/CHAPTER1_CREATURE_ART_HANDOFF.md), [12 thực thể dữ liệu](../technical/CHAPTER1_ECOLOGY_DATA_SPEC.md), [35 ca QA tương lai](../technical/CHAPTER1_ECOLOGY_TEST_CASES.md) | Asset production/loader/schema/runtime validation sau này |

## Các điều kiện chưa giải quyết

| ID / status | Cần quyết định / dependency | Chặn gì và neutral handoff |
| --- | --- | --- |
| E20-U01 UNRESOLVED | B12 sáu concept images/source/provenance, body plan/element/origin/rarity/stage counts final | Official species content/art freeze; ref_* giữ EXTERNAL CONCEPT REFERENCE — NOT VERIFIED IN REPOSITORY |
| E20-U02 UNRESOLVED | K11/R03 eligibility của từng wildlife, acquisition source/trial/compatibility và player controller/assets | Optional playable production; sứa/carp chỉ candidates, bốn ordinary chưa confirmed nonplayable; main không cần chúng |
| E20-U03 UNRESOLVED | Q18/H19 plane/current/input/geometry/anchor/AI perception/action/return policies và performance budgets | Underwater AI/encounter prototype; x–y/local recipes chỉ recommendation, không3D hoặc force numbers |
| E20-U04 UNRESOLVED | P15 source/reward component mapping, XP attribution/quantities/stacking; C14 health/resource/recovery, E09 obligations | Reward/combat production, không loot mọi actor; generic knowledge source phải author trước dùng |
| E20-U05 UNRESOLVED | W07/O17 durable save/memory receipt, unique instance/relocation/coverage/migration mappings | Persistence/release; one writer/RewardGrantLedger, no ecology store/claimed flags khác |
| E20-U06 UNRESOLVED | F06 named adaptation/assimilation source/evidence/tolerance/recovery limitations, confirmed food relations | Specific ecology/assistance content, không cure/dual/hostility từ màu hoặc element |
| E20-U07 UNRESOLVED | Q06/Q17/Q18/Q19 scope/device/actor-density/playback/production asset pipeline, H19 topology/names approval | Production certification/Chapter I ecosystem completeness; minimum slice không full6 or boss |

Q01/Q02/Q04 không cần giải để thiết kế habitat, nhưng cấm ecology/ruin/food web tự giải origin/chronology. Q05/B+C vẫn chặn final Quy awakening/manifestation. HP riêng/emergency transfer/EXP thresholds còn proposal, không dùng Task20 để phê duyệt. Task21 có thể tiếp nhận conditional design handoff sau yêu cầu riêng; không tự khởi chạy.
