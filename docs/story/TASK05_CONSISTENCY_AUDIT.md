# Audit và bàn giao Task 05 — narrative blueprint

Baseline `08743e7`; working tree sạch trước task, source hiện tại vẫn bản Dawn Canvas/ES modules. Đây là tài liệu thiết kế truyện, không implementation, art, animation hoặc UI. Tài liệu Tasks 01–04 có đủ; chưa có `docs/story/` hay equivalent chapter mission contracts trước Task 05. Không tiến hành Task 06.

## 14 đầu ra và authority

| File / link | Vai trò |
| --- | --- |
| [FOUR_CHAPTER_STORY_OVERVIEW](FOUR_CHAPTER_STORY_OVERVIEW.md) | Macro, nguyên nhân đi tiếp, cảm xúc, kết local và cổng |
| [CHAPTER_01_QUY](CHAPTER_01_QUY.md) | Acts nhập thân/bảo tồn và main evidence, pacing I |
| [CHAPTER_02_PHUONG](CHAPTER_02_PHUONG.md) | Water–heat, giá đổi mới, midpoint, pacing II |
| [CHAPTER_03_LONG](CHAPTER_03_LONG.md) | Gió/kiểm soát, dấu thức phân tán, pacing III |
| [CHAPTER_04_LY](CHAPTER_04_LY.md) | Quan hệ sống, xung đột adaptation, local end/epilogue |
| [STORY_TIMELINE](STORY_TIMELINE.md) | Projection cùng 24 event IDs và liên hệ H1–H7 |
| [NARRATIVE_REVELATION_MATRIX](NARRATIVE_REVELATION_MATRIX.md) | Assumption/evidence/fragment/reveal/payoff CL01–CL05 |
| [CHAPTER_TRANSITIONS](CHAPTER_TRANSITIONS.md) | Geography/capability/return checkpoint/arrival transaction |
| [MAJOR_CHARACTERS_AND_FACTIONS](MAJOR_CHARACTERS_AND_FACTIONS.md) | Năm vai phụ, nhu cầu/tri thức/sai lầm/recurrence, hai lập trường chưa faction canon |
| [MAJOR_CONFLICTS_AND_BOSSES](MAJOR_CONFLICTS_AND_BOSSES.md) | Bốn conflict narrative briefs khác nhau, không art/pattern/stat |
| [WORLD_STATE_CONSEQUENCES](WORLD_STATE_CONSEQUENCES.md) | Biến chuyển vùng/revisit/collection/refuge/variant |
| [QUEST_DESIGN_OUTLINE](QUEST_DESIGN_OUTLINE.md) | 24 main mission mapping và 8 optional đầy đủ objective/criteria/effects |
| [STORY_IMPLEMENTATION_HANDOFF](STORY_IMPLEMENTATION_HANDOFF.md) | Authority event contracts, shared persistence/retry, onboarding, 18 edge cases |
| TASK05_CONSISTENCY_AUDIT | Trạng thái/conflict/risks/prerequisites/validation |

Lore CHAPTER_REVELATIONS giữ upper-bound và clue IDs; story matrix cụ thể placement/payoff, không hai lịch tiết lộ khác nhau. Timeline/quest main là projection của cùng event contract, không tự thay dependencies/rewards. Không tạo quest JSON hay class.

## Nguồn đã review

Tasks 01–04: GAME_VISION, PROJECT_DECISIONS, OPEN_QUESTIONS, phạm vi/workflow và asset register; WORLD_HISTORY/ANCIENT_CATASTROPHE/LORE_TIMELINE/SACRED_CREATURES/CHAPTER_REVELATIONS/SPIRIT_AND_RESONANCE và các quy tắc cộng hưởng; bốn hồ sơ species/overview/evolution matrix/art gaps; TRANSFORMATION_DESIGN/CREATURE_PROGRESSION_CONCEPT/SACRED_CREATURE_ABILITIES/SACRED_SYNERGIES và data/edge-case/audit liên quan. Không nhận đã xem asset chưa có. Những nguồn này có quyết định confirmed và đề xuất chưa duyệt, không mặc định toàn bộ là canon.

## Xung đột phát hiện trước sáng tác và cách xử lý

| ID | Xung đột / rủi ro nguồn | Hướng xử lý có trạng thái |
| --- | --- | --- |
| SC01 | Task 03 full-three gate mọi boss là R03-P06; đầu I chỉ Quy, Task 05 không cho main phụ thuộc loài optional không báo | **PROPOSED S05-P02:** khóa cả ba slot gồm empty tại boss sớm; không tự cấp 2 species. R03-P06 là alternative cũ chưa approved; trước code phải chọn một policy. Không đổi luật confirmed membership lock |
| SC02 | Prompt mở đầu tóm tắt 8 nhịp, D29 confirmed có 10 | Giữ đủ D29 trong E01; tám ý tóm tắt không bị đọc như later approved xóa giác quan/kích hoạt cấu trúc |
| SC03 | Prompt yêu cầu Fire–Metal/Wind–Lightning, D18 chưa khóa Kim/Lôi roster | Dùng **PROPOSED scenarios/affiliation**, không biến thành quyết định roster toàn thế giới. Có investigation context nhưng species/asset chưa có, không grant optional hybrid như main requirement |
| SC04 | Các awakening/lịch sử ở Task 02 vẫn có chi tiết PROPOSED | Task 05 xác định khung phân tán Long/Ly theo chỉ dẫn (D35), các cơ chế bảo tồn/ý thức/hiến tế cụ thể không tự confirmed. Quy/Phượng/Ly không dùng chung công thức trứng |
| SC05 | Nếu cần Long mới nối được node để mở Long, hoặc Ly mới phục hồi mạng để mở Ly | E13/E14 dùng thermal/bridge/cơ cấu trong vùng tiếp cận; E18/E19 dùng ba form trước + đối tác sống. Sacred mới mở đủ phần bản sắc rồi mới mở rộng khả năng, không cycle |
| SC06 | C04 environmental rank II/III có thể thành gate evolution chưa được main dạy | CAP contract dùng action cơ bản + receiver cổ giữ setting, không ngầm grant rank III. Nếu physics thực cần rank cao hơn phải thêm main lesson/guaranteed eligibility rõ trước, không side quest ẩn |
| SC07 | Bốn contributions nhưng chỉ ba slot | E23 dựa bốn hệ world-state qua hành động nối tiếp, không đồng thời equip/triệu hồi bốn thân hoặc bốn stage III |
| SC08 | Phiên bản Dawn hiện chơi Phoenix không phải narrative map mới | Không rename `dawn` thành Nhật Diệm, không giả có Hải Uyên/Phong Vân/Vạn Sinh playable; topology và cast mới cần assets/layout riêng |
| SC09 | Boss defeated có thể bị hiểu world stable, optional memory thành chìa khóa ending | Conflict chỉ mở cửa sổ kiểm chứng; main fact đủ, restoration cần event sau; optional memory có archive/revisit |
| SC10 | Restoration xóa loài/habitat adaptation và collection | Refuge mapping trước commit, hint kể cả chưa discovery, reversible variant IV giữ route/main flags |
| SC11 | Mốc midpoint/timeline dễ bị hiểu đảm bảo nửa playtime | E09 là midpoint nhận thức; pacing không số giờ cam kết, production budget chưa chốt |
| SC12 | NPC đọc biết hết lịch sử có thể giải origin quá sớm | Năm vai biết cục bộ/hồ sơ, không mặc định sống từ thời cổ; không Tứ Linh dialogue tự trị, cosmic origin chưa giải |
| SC13 | Main story mới được gọi “production-ready” trong khi art/save chưa tồn tại | Đây là blueprint reviewable với missing/dependencies rõ, không content ready-to-ship hoặc code-ready khi policy/capability chưa duyệt |

## Quyết định/đề xuất Task 05

CONFIRMED: nền năm trụ cột/đặc điểm chương và kết local trọn vẹn theo chỉ dẫn mới, D34; Long phân tán dấu qua mạng khí, Ly không có một trứng/nguồn năng lượng đơn đủ thức theo D35. Không nâng toàn bộ L02/R03/C04 thành canon.

| ID | PROPOSED, chưa tự được duyệt |
| --- | --- |
| S05-P01 | Macro/24 event causal chain, cảm xúc và midpoint E09 |
| S05-P02 | Boss early-entry với empty slots bị khóa, alternative full-three R03-P06 |
| S05-P03 | Acts/di tích/bypass/guardian/outcome Hải Uyên |
| S05-P04 | Chu kỳ nước–nhiệt, custodian và thermal relay Nhật Diệm |
| S05-P05 | Node/control conflict và synchronization Long |
| S05-P06 | Quan hệ sống/advocate/variant và awakening Ly |
| S05-P07 | Năm vai phụ/chức danh/tri thức, lập trường chưa faction canon |
| S05-P08 | Bốn conflict/boss briefs và alternative outcomes |
| S05-P09 | World flags/spawn/refuges/revisit/reversible habitat variant |
| S05-P10 | Choreography Tinh Môn/epilogue/tín hiệu lịch sử xa |
| S05-P11 | Physical routes/return/arrival checkpoint contracts |
| S05-P12 | Event/quest IDs, rewards/persistence/retry contracts |
| S05-P13 | 24 main missions và 8 optional concepts |
| S05-P14 | Placement/payoff của CL01–CL05, memory IDs ứng viên |
| S05-P15 | Feature-introduction schedule và competency |
| S05-P16 | 18 narrative edge cases/failure recovery |

## Missing resources / prerequisites register

| Gap ID | Thiếu gì / ảnh hưởng | Source / xử lý trước production |
| --- | --- | --- |
| SG01 | Layout/terrain/runtime vùng Hải Uyên, Nhật Diệm theo blueprint, Phong Vân, Vạn Sinh và transitions | Không có file path để khai; không dùng Dawn như bản đầy đủ. Tạo brief/layout ở task được giao, giữ style/evidence hiện hữu |
| SG02 | Reference/production Quy/Long/Ly và mapping ba stage Phoenix; full clips cho các capabilities | Theo [SACRED_ART_REQUIREMENTS](../creatures/SACRED_ART_REQUIREMENTS.md), không giả ảnh có sẵn |
| SG03 | Năm NPC/4 antagonist role, wildlife/hybrid/optional imprint sources | Identity/species/art/animation/AI và encounter catalogs chưa duyệt; không generate trong task này |
| SG04 | Các memory fragments/cutscene/dialogue/âm cho sanctuary/cổng/epilogue | IDs mới là kế hoạch, chưa actual assets; cần provenance/production brief |
| SG05 | Skill/collision/thermal lift/long-body/cap receiver prototype, balance | C04/R03 chưa implementation; physics relay phải chứng minh không cần ability rank chưa mở |
| SG06 | Boss empty-slot policy, encounter lock/reload, event journal/save migration/ledger | Chọn policy đề xuất duy nhất và triển khai/test task riêng trước cho người chơi vào event |
| SG07 | Narrative progression budgets, restoration/refuge mapping và spawn source coverage | Chưa có guaranteed duration hoặc roster cuối. Mỗi variant/world transition cần collection coverage check |

## Tự review 15 quality gates

Đã review: bốn conflict/awakening riêng; transitions có cause/geography và đường về; ngoại lai không ác mặc định; origin Tinh Linh chưa lộ; mỗi Sacred có đóng góp; ít nhất ba early mysteries có payoff (đã plan đủ CL01–05); exploration/collection và optional không gate main; boss khác nhau; restoration có hậu quả; revisit được; không unannounced optional species; ending cổng earned bằng bốn stable systems; confirmed canon giữ; sáng tạo mới nhãn PROPOSED; chỉ docs thay đổi.

Kiểm tra tài liệu trước commit gồm Markdown/link/ID/field coverage và DAG main prerequisites; optional không reachable như prerequisite main, stable flags E23 đủ bốn. Đây là **review đặc tả**, không gameplay/cutscene tests đã chạy. CI push là kết quả riêng, không chứng minh 24 event đã playable.

## Câu hỏi và Task 06

Chưa chốt nguồn gốc Tinh Linh/cổng, chủ mưu sâu và sự tự nguyện; không cần giải đáp để triển khai phần local. Cần duyệt boss entry policy, identity cast/boss, roster/affiliation Kim–Lôi, subset main slice và optional, capability/rank/physics, asset brief và save contract. Task 06 cần đề bài riêng; nên cắt một phần E01–E03 có acceptance rõ trước, không đồng loạt xây cả bốn chương. Không tự tiến hành Task 06 hoặc tạo art thay thế.
