# Task09 — quyết định, approval và ranh giới Task10

Baseline `e24b968`, ngày30/10/2026 Asia/Saigon. `e24b968` đã kiểm có trong Git history và là HEAD ở đầu task; không chỉ là ref được giả định. [Central register](../PROJECT_DECISIONS.md) giữ CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED và hierarchy approved. Quyền tự làm/push không là approval cơ chế mới. Task09 không đổi runtime/balance/UI/art hoặc bắt đầu Task10.

## CONFIRMED sources, không mechanics tự duyệt

| Reference | Baseline / source |
| --- | --- |
| D04/D09/D18/D38 + Task09 §2 | water/fire/wind/wood native; lightning/metal foreign; Quy/Phượng/Long/Ly đúng affiliation, Life authority không ordinary combat element |
| D10/D36 + Task09 §2 | Foreign không evil, dual không corruption; natural adaptation khác forced assimilation |
| D05/D06/D07 + Task09 §9 | Một active/hai reserve, selected loadout locked boss nhưng switch trong set; mỗi species independent progression |
| D41 — Task09 §9/19 | Không bắt ba members/ba different elements; early boss không reject chỉ vì còn một/hai forms phù hợp. Main content dùng capabilities đã mở, không unannounced optional species |
| D37 + Task09 §11/19 | Persistent restoration chỉ explicit event rules, temporary skill/status khác world milestones; collection/return không bị khóa |
| D39 + Task09 §14/17 | Data-driven species, mechanics mới có reusable modules; dual calculations/priority/evolution/hybrid acquisition/roster chưa chốt trong Task09 |
| Q02/A08-15 + Task09 §2 | Chronology tiếp xúc foreign vẫn UNRESOLVED, không viết lại H2/H4 hoặc approved lore |

D41 là ràng buộc mới explicit của người dùng, không nâng toàn bộ S05-P02 hoặc R03-P01/P02/P07/P08 thành CONFIRMED. Phần “full-three trước mọi boss” của R03-P06 là proposal lịch sử chưa từng được duyệt, nay không hợp lệ cho early content theo D41. Không gắn SUPERSEDED cho một approved rule chưa từng tồn tại; giữ trace/history và đánh dấu phạm vi không áp dụng. Stage/config snapshots, cost, HP/recovery, entry trigger và resource values vẫn pending theo nguồn Task03.

## E09 proposal register

| ID / title | Status | Source authority | Recommendation / rationale | Dependencies / risks / approval |
| --- | --- | --- | --- | --- |
| E09-P01 Element identity/philosophy | PROPOSED | ELEMENTAL_SYSTEM_OVERVIEW / ELEMENT_DEFINITIONS | Six vocabularies, species expression khác nhau; positioning/timing/context trước hidden chart | D04/D38/D39, art/skill scope; approve identity mechanics trước content implementation |
| E09-P02 Hybrid model | PROPOSED | ELEMENTAL_AFFINITIES | C limited affinity + property/context, không final pair advantage | A/B/C evaluated; learning/normalization/balance unknown, cần approval model/table riêng |
| E09-P03 Damage/resistance/matrix | PROPOSED | ELEMENTAL_AFFINITIES / ELEMENTAL_INTERACTION_MATRIX | Channel budget, cause groups,36 directed contexts không36newprocs | Resistance/CC snapshots cần prototype, no numeric multipliers approved |
| E09-P04 Status taxonomy | PROPOSED | STATUS_EFFECTS | Nine statuses, stack/refresh/removal/CC/boss response và scope rõ | Duration/severity/caps/response values unresolved; không blanket status immunity |
| E09-P05 Reactions | PROPOSED | ELEMENTAL_REACTIONS | Eight evaluated candidates, finite tokens/output non-reactive/local graph | Chọn subset trước code; no infinite chain/damage multiplication/whole-ocean electricity |
| E09-P06 Switching/owners | PROPOSED | ELEMENTAL_SYSTEM_OVERVIEW / STATUS_EFFECTS | Shared vs form-bound vs source-active, immutable projectile snapshot/AI identity | R03 body/resource/recovery chưa approve; body debuff semantics cần review, no reserve heal/new punitive HP policy |
| E09-P07 Environment | PROPOSED | ENVIRONMENTAL_INTERACTIONS |16contexts qua receiver và W07 event authority, safe route/collection | Actual layouts/anchors/viability missing; ordinary attacks không set milestones |
| E09-P08 Balance | PROPOSED | ELEMENTAL_COMBAT_BALANCE | Ten trade-off axes/nine exploit guards/hypothetical scenarios | Chưa playtest data; task balance chọn parameters, không numbers hoặc rarity power shortcut |
| E09-P09 Performance/readability | PROPOSED | ELEMENTAL_COMBAT_BALANCE | Local deterministic effects, render/logic tách, low-FX/cues readable | Browser/device budgets/FX/SFX chưa đo/có, không claim validated animation |
| E09-P10 Data/save boundary | PROPOSED | ELEMENTAL_DATA_SPEC / STATUS_EFFECTS | Ten conceptual entities, minimal status obligation nếu cần no free cleanse | W07 storage/snapshot/loss budget approval pending; không implementation classes/loaders/JSON |
| E09-P11 Acceptance scenarios | PROPOSED | ELEMENTAL_TEST_CASES |20cases x5fields, inputs/clock/ownership/migration invariants | Conceptual review không runtime tests đã pass; fixtures sau khi approved subset/values |
| E09-P12 Task10 interfaces | PROPOSED interface, details UNRESOLVED | ELEMENTAL_DATA_SPEC / quyết định dưới đây | Affiliation list và resolver hooks, không dual bonus/resistance/evolution/acquisition rules | Task10 mới thiết kế nếu được giao; no default primary/secondary hoặc sum/product math |

## UNRESOLVED cần approval / input

| ID | Câu hỏi / phạm vi | Gate |
| --- | --- | --- |
| E09-U01 | Model C/subset affinity có được chọn không; direct affinity nào có counterplay/readability tốt? | Trước elemental damage implementation; Task09 chưa final table |
| E09-U02 | Damage channels, resistance normalization/floors/caps, status duration/refresh/CC recovery/proc limits/targets | Balance/prototype task, không hardcode theo docs định tính |
| E09-U03 | Status scopes shared/form-bound/source-active và minimal obligation save ngoài boss | Cần R03/W07 A08-01/02/03/11 review; không tự đổi recovery hoặc apply reserve damage |
| E09-U04 | Reaction nào thực sự vào first playable/later chapters, required source/FX/SFX/receiver/habitat | Content/prototype chọn subset, không bắt full36/8reactions |
| E09-U05 | Exact budgets/performance/readability/mobile controls/telegraph và animation markers | Repo/renderer/device/asset audit; chưa FPS/resolution/perf numbers |
| E09-U06 | Dual resistance calculation/damage bonus/primary-secondary/skill affinities/evolution/hybrid sources/roster | Task10 scope; không chốt bằng một cell matrix Task09 |
| E09-U07 | Early boss entry trigger/capability/empty snapshot/retry/outcome/identity | D41 bỏ điều kiện đủ3 như barrier, còn các details A08-05/07/R03 phải approve |

## Task10 handoff boundary

Cung cấp six IDs, CreatureElementProfile elementRefs/resistanceProfileRef/futureDualResolverRef, AttackProperties own declaredElementRef, EIV validation và scenario E09-EC13/20. Task10 phải trả lời composition có normalize thế nào, không mặc định min/max/sum/product; damage skill có liên hệ affiliation loài thế nào; primary-secondary có cần không; progression/evolution/acquisition ở đâu; playable vs nonplayable/habitat coverage giữ ra sao. Chưa tạo dual roster, stage evolution gates, affinity multipliers hoặc hybrid source rules.

## SUPERSEDED và baseline preservation

Giữ H08-S01 accepted ending cũ đã được D26 thay activation, không mở/chốt origin mới. Không có approved creative rule khác bị Task09 tự thay. E24b968 P0 fixes giữ: C04-P07 vẫn PROPOSED trong GDD, D18/D38 provenance không là cycle gameplay, chronology vẫn unresolved. Các audit Task01–08 giữ giá trị theo mốc, không bị sửa thành kết quả playtest hoặc approval mới.
