# Phase I completion audit — evidence-based inventory

**Baseline:** `7125160`, working tree sạch trước Task08. **Task08 audit completion: PASS** sau validation; **Phase I production design freeze: PARTIAL**. PASS tài liệu không = approved toàn proposal, code implemented hoặc asset-ready. PARTIAL của Task03/05 dưới đây là current cross-system handoff gate, không phủ nhận chúng đã bàn giao tài liệu lịch sử.

## Phương pháp và giới hạn

Inventory đọc toàn văn 84 tài liệu Markdown trong docs tại baseline, kiểm headings/sections/status/refs/IDs/cấu trúc bảng; 75 tệp là nguồn chính Tasks01–07, 9 tệp historical technical/art/UI đối chiếu. README là entrypoint thêm, không tính vào84. Đối chiếu nội dung theo các sections chỉ rõ bên dưới với decision register, creature/stage/ability matrices, event contracts, world authority, source/manifests/tests. Prompt Tasks01–03 được đối chiếu phần required-document từ văn bản người dùng đính kèm truy cập được; các bản tải nằm ngoài repo, không gọi chúng là repository docs. Tasks04–08 dựa yêu cầu người dùng trong phiên. Không giả một requested filename có thật nếu đã dùng equivalent.

Manual review tập trung authority/canon, opening/source/body, four identities/evolutions, abilities/caps, chapter acts/revelation/payoff/cast, faction morality/ecology, event/save/recovery và art/source mapping. Automated checks bao gồm toàn corpus path/link/status structure và graphs/coverage fields; không thể tự chứng minh chất lượng văn chương/consent/physics. Bảng inventory ghi heading evidence thật và completeness; hashes là baseline fingerprints, không hash của file đã cập nhật Task08. Không dùng word count hay số file đơn thuần làm PASS.

Task08 xem trực tiếp 4 ảnh, đọc PNG headers/manifests/source; `npm test` chạy mới 30 PASS. Chưa chạy mới browser/playback/mobile hardware/Windows, không kiểm chứng future runtime. Settings persistence hiện có không là persistent-world gameplay.

## A. Task completion matrix

| Task | Intended deliverables / actual coverage | Status / content completeness | Missing deliverables / contradictions | Implementation readiness / software | Recommended action / evidence |
| --- | --- | --- | --- | --- | --- |
| 01 | 7 foundation docs + repository audit = 8/8 có | **PASS** documentation: vision/pillars/scope/decisions/questions/assets/workflow/stack đúng | Không thiếu file; D18 baseline mới cập nhật Task08, original dated audit giữ | CONDITIONAL cho slice bởi assets/physics; existing Dawn implemented, Quy target NOT IMPLEMENTED | Đọc GAME_VISION/PROJECT_SCOPE/REPOSITORY_AUDIT sections, chốt A08-13/14 |
| 02 | 9/9 lore docs có | **PASS** documentation: H1–H7, four fates, revelation/timeline và uncertainty labels đầy đủ | Không thiếu file; mô hình thủ phạm/hiến tế/cổng vẫn proposed, không tự đóng Q01–05 | CONDITIONAL narrative production; lore systems không gameplay implementation | WORLD_HISTORY/ANCIENT_CATASTROPHE/CHAPTER_REVELATIONS; dùng D38 current, giữ historical status notes |
| 03 | 9/9 resonance/progression/data docs có | **PARTIAL** cross-system handoff: acquisition/model/26 cases/5 traces có, boss entry còn conflict | Không thiếu file; R03-P06 vs S05-P02 C08-01; B+C/energy/defeat chưa approved | CONDITIONAL mechanics, BLOCKED boss integration; mới NOT IMPLEMENTED | RESONANCE_DECISION_RECORD P01–P11, TRANSFORMATION boss, RESONANCE_DATA I02; resolve A08-01/02/05 |
| 04 | 11/11 creature/stage/ability/art/data/audit docs có | **PASS** documentation: 4 identities,12 forms,24 abilities,8 env,6 pairs,15 cases | Không thiếu docs; art/clip stage gaps explicit, stage gates/numbers chưa approved | CONDITIONAL design, BLOCKED art-complete forms; mới NOT IMPLEMENTED | SACRED_EVOLUTION_MATRIX, species stage tables/ART_REQUIREMENTS; A08-03/04/14 |
| 05 | 14/14 story docs có | **PARTIAL** handoff: four acts/reveals,24main+8optional,18edge cases, transitions/world consequences có | Không thiếu file; early boss policy C08-01 và physics/caps gap; identities/outcomes chưa final | CONDITIONAL story subset, BLOCKED boss/full content; NOT IMPLEMENTED | STORY_IMPLEMENTATION_HANDOFF, NARRATIVE_REVELATION_MATRIX, QUEST_DESIGN_OUTLINE; choose A08-05/07/13 |
| 06 | 14 outputs =11 new-source files +3 reused story authorities | **PASS** documentation:3 proposed factions,8views,3phenomena,9templates,7encounters/7rewards,20cases | Không thiếu equivalent; names/species/AI/balance chưa approved, không scope triển khai task này | CONDITIONAL one encounter design; full factions/enemies NOT IMPLEMENTED | TASK06 audit/mapping; FACTION_PROFILES, ELEMENTAL_ASSIMILATION, ENEMY_ARCHETYPES; A08-06/08/14 |
| 07 | 14 outputs =13 files +1 reused revisit source | **PASS** documentation:4levels/5categories/16phase rows/24eventDAG/10entities/20cases | Không thiếu equivalent; storage/owner proposal, actual anchors/habitat catalog chưa đủ | CONDITIONAL scoped save design; gameplay persistent world NOT IMPLEMENTED | WORLD_STATE_ARCHITECTURE, PERSISTENT_WORLD_DATA_SPEC/WORLD_STATE_TEST_CASES; A08-09/11 |
| 08 | 10 required outputs =7 new docs +3 extended existing authorities | **PASS audit task**, riêng **Phase I PARTIAL** | Baseline/status drift corrected; open blockers không bị che; equivalent asset register dùng lại | READY Task09 design/read-only repo audit khi giao; chưa READY first playable production | GDD, consistency/readiness/dependency/handoff/changelog ở root docs; không tự bắt đầu Task09 |

## Requested names không có literal file nhưng đã có authority tương đương

| Task / requested path | Actual source / relevant section | Disposition |
| --- | --- | --- |
| 06 docs/story/ANTAGONIST_DESIGN.md | [MAJOR_CHARACTERS_AND_FACTIONS](story/MAJOR_CHARACTERS_AND_FACTIONS.md), motivations/antagonist philosophy | Reused, không missing content |
| 06 docs/story/CHAPTER_BOSS_NARRATIVE_BRIEFS.md | [MAJOR_CONFLICTS_AND_BOSSES](story/MAJOR_CONFLICTS_AND_BOSSES.md), four narrative briefs | Reused, pending identity approval |
| 06 docs/story/FACTION_AND_WORLD_CONSEQUENCES.md | [WORLD_STATE_CONSEQUENCES](story/WORLD_STATE_CONSEQUENCES.md), localized faction/world effects | Reused, factions remain proposals |
| 07 docs/world/REGION_REVISIT_DESIGN.md | [CHAPTER_TRANSITIONS](story/CHAPTER_TRANSITIONS.md), Task07 Region revisit design | Reused topology/return source |
| 08 docs/ASSET_READINESS_REGISTER.md | [ASSET_REFERENCE_REGISTER](ASSET_REFERENCE_REGISTER.md), Task08 Asset readiness audit | Extended register, không tạo competing source |

Không nhận đã đọc năm nonexistent literal files trên. Những tài nguyên production/gameplay còn thiếu được ghi readiness, không lấp bằng tạo file/species/approval giả.

## Inventory Task01–07: actual files và section evidence

Completeness tại đây là **đủ cấu trúc/nội dung để review design scope**; không approve từng claim. Các detail pending theo matrix trên. Bảng liệt kê mỗi nguồn chủ một lần; reused cross-task refs đã map ở trên. `B` là bytes thực baseline, fingerprint8 là SHA256 prefix để nhận diện snapshot.

### Task 01 — 8 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [GAME_VISION.md](GAME_VISION.md) | Lời hứa với người chơi; Thể loại, nền tảng và sắc thái | Reviewable; 10036 B; `f7e714b8` |
| [PROJECT_SCOPE.md](PROJECT_SCOPE.md) | Các mốc và ranh giới; Vertical slice Chương I | Reviewable; 6034 B; `688eda7d` |
| [CORE_DESIGN_PILLARS.md](CORE_DESIGN_PILLARS.md) | Quy tắc chung; Cổng chất lượng hình ảnh | Reviewable; 4610 B; `4889f947` |
| [PROJECT_DECISIONS.md](PROJECT_DECISIONS.md) | Bổ sung Task 02 — nguồn: yêu cầu người dùng Task 02/96; Bổ sung Task 03 — nguồn: yêu cầu người dùng Task 03/96 | Reviewable; 13006 B; `8907ec2d` |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Sau Task 02; Sau Task 03 | Reviewable; 8045 B; `e3bc627f` |
| [ASSET_REFERENCE_REGISTER.md](ASSET_REFERENCE_REGISTER.md) | Quy ước trạng thái; Tứ Linh | Reviewable; 8481 B; `fc89aa78` |
| [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) | Trước khi chỉnh sửa; Khi thực hiện | Reviewable; 6605 B; `58e6f40f` |
| [REPOSITORY_AUDIT.md](REPOSITORY_AUDIT.md) | Công nghệ và cấu trúc thực tế; Khả năng truy cập và bằng chứng | Reviewable; 5705 B; `1da201e9` |

### Task 02 — 9 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [lore/WORLD_HISTORY.md](lore/WORLD_HISTORY.md) | Nền lịch sử — CONFIRMED; Trước biến cố — PROPOSED, mô hình L02-P01 | Reviewable; 7221 B; `61a8c032` |
| [lore/ELEMENTAL_COSMOLOGY.md](lore/ELEMENTAL_COSMOLOGY.md) | Vai trò nền — CONFIRMED; Cách tuần hoàn vận hành — PROPOSED, L02-P01 | Reviewable; 9018 B; `a1bfd343` |
| [lore/ANCIENT_CATASTROPHE.md](lore/ANCIENT_CATASTROPHE.md) | Nền được xác nhận — CONFIRMED; Chuỗi làm việc của tác giả — PROPOSED, L02-P05 | Reviewable; 8027 B; `ae80a688` |
| [lore/SACRED_CREATURES.md](lore/SACRED_CREATURES.md) | Quy Hải Uyên — Thủy; Phượng Hoàng Nhật Diệm — Hỏa | Reviewable; 9135 B; `ccb25b8e` |
| [lore/SPIRIT_AND_RESONANCE.md](lore/SPIRIT_AND_RESONANCE.md) | Đã xác nhận — CONFIRMED; Quy tắc giải thích đề xuất — PROPOSED, L02-P08 | Reviewable; 6958 B; `3f91b928` |
| [lore/CHAPTER_REVELATIONS.md](lore/CHAPTER_REVELATIONS.md) | Nền và giới hạn — CONFIRMED; Bốn lớp thông tin | Reviewable; 10213 B; `b3da1d51` |
| [lore/LORE_TIMELINE.md](lore/LORE_TIMELINE.md) | Niên biểu tương đối | Reviewable; 4356 B; `6851f5d4` |
| [lore/LORE_CONSISTENCY_AUDIT.md](lore/LORE_CONSISTENCY_AUDIT.md) | Mục lục và quyền hạn tài liệu; Tài liệu đã đọc | Reviewable; 8219 B; `3bca2d3a` |
| [lore/LORE_CHANGELOG.md](lore/LORE_CHANGELOG.md) | Task 02/96 — 30/10/2026 (Asia/Saigon); CONFIRMED từ chỉ dẫn mới | Reviewable; 3213 B; `101d4b97` |

### Task 03 — 9 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [lore/SPIRIT_IDENTITY.md](lore/SPIRIT_IDENTITY.md) | Nền nhân vật — CONFIRMED; Quan hệ với cơ thể — PROPOSED, R03-P01 | Reviewable; 5187 B; `eb7023d3` |
| [lore/LIFE_CORE_AND_IMPRINT.md](lore/LIFE_CORE_AND_IMPRINT.md) | Từ điển có ranh giới; Linh Hạch giữ được gì và mất gì — PROPOSED | Reviewable; 5930 B; `2bc881e9` |
| [lore/RESONANCE_RULES.md](lore/RESONANCE_RULES.md) | Điều kiện và kết quả; Trạng thái — PROPOSED | Reviewable; 8025 B; `50a5aa4d` |
| [lore/ANCESTRAL_MEMORY.md](lore/ANCESTRAL_MEMORY.md) | Ba tầng thông tin — PROPOSED, R03-P05; Độ tin cậy và quy trình diễn giải — PROPOSED | Reviewable; 3941 B; `640d366b` |
| [lore/RESONANCE_DECISION_RECORD.md](lore/RESONANCE_DECISION_RECORD.md) | Mục lục / nguồn luật; CONFIRMED từ Task 01–03 | Reviewable; 12755 B; `9454a7e8` |
| [gameplay/TRANSFORMATION_DESIGN.md](gameplay/TRANSFORMATION_DESIGN.md) | Bộ ba và điều kiện chọn dạng — PROPOSED; Một giao dịch đổi dạng — PROPOSED | Reviewable; 12040 B; `323e796c` |
| [gameplay/CREATURE_PROGRESSION_CONCEPT.md](gameplay/CREATURE_PROGRESSION_CONCEPT.md) | Các trục độc lập — PROPOSED R03-P09; Bắt kịp dạng mới — PROPOSED so sánh | Reviewable; 6792 B; `c2d9be1c` |
| [technical/RESONANCE_DATA_MODEL.md](technical/RESONANCE_DATA_MODEL.md) | Thực thể và quan hệ; Các bất biến liên hệ — PROPOSED | Reviewable; 11575 B; `2ee49541` |
| [technical/RESONANCE_EDGE_CASES.md](technical/RESONANCE_EDGE_CASES.md) | Trace biên tập — PROPOSED, không phải kết quả thực thi; Phụ thuộc chưa định lượng | Reviewable; 8236 B; `f1fcdf3f` |

### Task 04 — 11 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [creatures/SACRED_CREATURE_OVERVIEW.md](creatures/SACRED_CREATURE_OVERVIEW.md) | Nền chung — CONFIRMED; Ma trận bản sắc | Reviewable; 8644 B; `75ff3fbc` |
| [creatures/QUY_HAI_UYEN.md](creatures/QUY_HAI_UYEN.md) | Bản sắc và lịch sử; Ba dạng tiến hóa — PROPOSED | Reviewable; 6815 B; `a7964874` |
| [creatures/PHUONG_HOANG_NHAT_DIEM.md](creatures/PHUONG_HOANG_NHAT_DIEM.md) | Bản sắc và ký ức; Ba dạng tiến hóa — PROPOSED | Reviewable; 6997 B; `7b327db9` |
| [creatures/LONG_THIEN_PHONG.md](creatures/LONG_THIEN_PHONG.md) | Bản sắc và ký ức; Ba dạng tiến hóa — PROPOSED | Reviewable; 7328 B; `2cc48a2d` |
| [creatures/LY_VAN_SINH.md](creatures/LY_VAN_SINH.md) | Bản sắc và ký ức; Ba dạng tiến hóa — PROPOSED | Reviewable; 7218 B; `4cda1e17` |
| [creatures/SACRED_EVOLUTION_MATRIX.md](creatures/SACRED_EVOLUTION_MATRIX.md) | Kế thừa và khác biệt — PROPOSED; Kích thước, collision và rendering — PROPOSED C04-P07 | Reviewable; 7107 B; `282d44ce` |
| [creatures/SACRED_ART_REQUIREMENTS.md](creatures/SACRED_ART_REQUIREMENTS.md) | Bằng chứng đã xem và giới hạn; Register đủ 12 stage | Reviewable; 8883 B; `24a5532e` |
| [creatures/TASK04_CONSISTENCY_AUDIT.md](creatures/TASK04_CONSISTENCY_AUDIT.md) | Mapping đủ 11 đầu ra; Tài liệu/reference đã review | Reviewable; 13236 B; `2fa7d086` |
| [gameplay/SACRED_CREATURE_ABILITIES.md](gameplay/SACRED_CREATURE_ABILITIES.md) | Quy tắc đọc bảng — PROPOSED; Quy — bruise/giữ vùng, PROPOSED | Reviewable; 18877 B; `b9ab6e04` |
| [gameplay/SACRED_SYNERGIES.md](gameplay/SACRED_SYNERGIES.md) | Sáu cặp và đánh đổi; Một active, tối đa ba member — PROPOSED | Reviewable; 7439 B; `9c50f5b5` |
| [technical/CREATURE_DATA_SPEC.md](technical/CREATURE_DATA_SPEC.md) | Quan hệ định danh; Fields bắt buộc của catalog concept | Reviewable; 9936 B; `2a1fa6a1` |

### Task 05 — 14 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [story/FOUR_CHAPTER_STORY_OVERVIEW.md](story/FOUR_CHAPTER_STORY_OVERVIEW.md) | Xung đột trung tâm — PROPOSED; Hành trình cảm xúc và cơ thể — PROPOSED | Reviewable; 8452 B; `720e5756` |
| [story/CHAPTER_01_QUY.md](story/CHAPTER_01_QUY.md) | Cấu trúc không gian; Act I — Có một cơ thể (evt_01_quy_awakes) | Reviewable; 6479 B; `b8d0caa1` |
| [story/CHAPTER_02_PHUONG.md](story/CHAPTER_02_PHUONG.md) | Vùng sống nhiều lớp; Act I — Cơ thể không hợp mọi nơi (evt_07_survey_basalt) | Reviewable; 5756 B; `daeb44ac` |
| [story/CHAPTER_03_LONG.md](story/CHAPTER_03_LONG.md) | Không gian và giới hạn ban đầu; Act I — Tự do của ai? (evt_13_air_routes) | Reviewable; 5258 B; `518f011b` |
| [story/CHAPTER_04_LY.md](story/CHAPTER_04_LY.md) | Bản sắc vùng; Act I — Ai có quyền gọi nơi này là hỏng? (evt_18_map_relationships) | Reviewable; 6168 B; `b5d31546` |
| [story/STORY_TIMELINE.md](story/STORY_TIMELINE.md) | Timeline truyện và liên hệ lịch sử | Reviewable; 5562 B; `156d2175` |
| [story/NARRATIVE_REVELATION_MATRIX.md](story/NARRATIVE_REVELATION_MATRIX.md) | Tiến trình nhận thức từng chương; Năm bí ẩn sớm phải được trả lời có ý nghĩa | Reviewable; 7911 B; `cfbd4d1d` |
| [story/CHAPTER_TRANSITIONS.md](story/CHAPTER_TRANSITIONS.md) | Choreography có điều khiển — PROPOSED; Transaction chuyển vùng — PROPOSED | Reviewable; 8795 B; `de31d4dd` |
| [story/MAJOR_CHARACTERS_AND_FACTIONS.md](story/MAJOR_CHARACTERS_AND_FACTIONS.md) | Hai lập trường, chưa faction canon; Sản xuất thoại/cảnh — PROPOSED | Reviewable; 10220 B; `7c769186` |
| [story/MAJOR_CONFLICTS_AND_BOSSES.md](story/MAJOR_CONFLICTS_AND_BOSSES.md) | Khóa bộ ba và xung đột nguồn — PROPOSED S05-P02; Task 06 — boss profile mapping và đánh giá alternatives | Reviewable; 8433 B; `e63195b1` |
| [story/WORLD_STATE_CONSEQUENCES.md](story/WORLD_STATE_CONSEQUENCES.md) | Spawn và collection — PROPOSED; Variant điều chỉnh lại — PROPOSED | Reviewable; 12226 B; `f8edf2d9` |
| [story/QUEST_DESIGN_OUTLINE.md](story/QUEST_DESIGN_OUTLINE.md) | Optional missions: đầy đủ contract rút gọn | Reviewable; 10276 B; `8e460945` |
| [story/STORY_IMPLEMENTATION_HANDOFF.md](story/STORY_IMPLEMENTATION_HANDOFF.md) | Shared contracts được kế thừa rõ; Awakening sub-transaction: tránh vòng phụ thuộc cơ thể | Reviewable; 52767 B; `e133ec45` |
| [story/TASK05_CONSISTENCY_AUDIT.md](story/TASK05_CONSISTENCY_AUDIT.md) | 14 đầu ra và authority; Nguồn đã review | Reviewable; 11138 B; `440739a7` |

### Task 06 — 11 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [factions/FACTION_OVERVIEW.md](factions/FACTION_OVERVIEW.md) | Ba tổ chức ứng viên — PROPOSED F06-P01; Mô hình quan hệ nhẹ — PROPOSED F06-P02 | Reviewable; 4578 B; `3aa7b081` |
| [factions/FACTION_PROFILES.md](factions/FACTION_PROFILES.md) | Ma trận tổ chức; Liên minh có điều kiện, không tam giác chiến tranh cố định | Reviewable; 7934 B; `75625d44` |
| [factions/FACTION_HISTORY.md](factions/FACTION_HISTORY.md) | Tổ chức có thể tồn tại nguyên vẹn lâu như vậy không?; Tài nguyên thúc đẩy xung đột — PROPOSED | Reviewable; 4693 B; `fd1dc78c` |
| [factions/TASK06_CONSISTENCY_AUDIT.md](factions/TASK06_CONSISTENCY_AUDIT.md) | Mapping 14 đầu ra, giữ source of truth hiện hữu; Tài liệu/canon đã đối chiếu | Reviewable; 12308 B; `47a0760b` |
| [ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md](ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md) | Không dùng một enum trộn mọi khái niệm; Hành vi có thể đổi mà species không đổi — PROPOSED | Reviewable; 7452 B; `fbfd020e` |
| [ecology/ELEMENTAL_ASSIMILATION.md](ecology/ELEMENTAL_ASSIMILATION.md) | Ba hiện tượng và các trục khác nhau; Dấu có thể quan sát — PROPOSED | Reviewable; 7917 B; `d56e1b10` |
| [ecology/REGIONAL_CONFLICTS.md](ecology/REGIONAL_CONFLICTS.md) | Coexistence và bố trí encounter — PROPOSED; Event liên hệ, không branch main mới | Reviewable; 5414 B; `fef67c40` |
| [gameplay/ENEMY_ARCHETYPES.md](gameplay/ENEMY_ARCHETYPES.md) | Từ vựng hành vi cho nhiệm vụ sau, không formal state machine; arch_passive_grazer — Sinh vật ăn/lọc thụ động | Reviewable; 23691 B; `d23d9160` |
| [gameplay/ENCOUNTER_AND_REWARD_DESIGN.md](gameplay/ENCOUNTER_AND_REWARD_DESIGN.md) | Loại encounter và tiêu chí kết thúc; Reward origins và điều kiện — PROPOSED | Reviewable; 9088 B; `9ddc1cf2` |
| [technical/FACTION_ENEMY_DATA_MODEL.md](technical/FACTION_ENEMY_DATA_MODEL.md) | Chín thực thể yêu cầu; Identity và authority reuse | Reviewable; 13224 B; `be8e3b5a` |
| [technical/FACTION_ENEMY_EDGE_CASES.md](technical/FACTION_ENEMY_EDGE_CASES.md) | Trace review tài liệu, không test thực thi | Reviewable; 7448 B; `49a30cd7` |

### Task 07 — 13 primary files

| File actual / source of truth | Evidence sections reviewed | Completeness / baseline fingerprint |
| --- | --- | --- |
| [world/WORLD_STATE_ARCHITECTURE.md](world/WORLD_STATE_ARCHITECTURE.md) | Mục tiêu và ranh giới; Năm loại thay đổi | Reviewable; 6080 B; `afede1fa` |
| [world/WORLD_STATE_TRANSITIONS.md](world/WORLD_STATE_TRANSITIONS.md) | Lifecycle và một logical transaction; Keys và replay | Reviewable; 5288 B; `d2f35b21` |
| [world/CHAPTER_01_WORLD_STATES.md](world/CHAPTER_01_WORLD_STATES.md) | Hệ quả và giới hạn; Sau reload / trở lại | Reviewable; 3787 B; `3ba28f2b` |
| [world/CHAPTER_02_WORLD_STATES.md](world/CHAPTER_02_WORLD_STATES.md) | Hệ quả và giới hạn; Sau reload / trở lại | Reviewable; 3727 B; `7fdc3ad9` |
| [world/CHAPTER_03_WORLD_STATES.md](world/CHAPTER_03_WORLD_STATES.md) | Hệ quả và giới hạn; Sau reload / trở lại | Reviewable; 3801 B; `4f025264` |
| [world/CHAPTER_04_WORLD_STATES.md](world/CHAPTER_04_WORLD_STATES.md) | Hệ quả và giới hạn; Sau reload / trở lại | Reviewable; 3942 B; `cd808f3b` |
| [world/ECOLOGY_AND_SPAWN_STATES.md](world/ECOLOGY_AND_SPAWN_STATES.md) | Ba quyền độc lập; Coverage trước mọi thay đổi habitat | Reviewable; 4746 B; `56f0a48c` |
| [world/QUEST_WORLD_STATE_RULES.md](world/QUEST_WORLD_STATE_RULES.md) | Objective đã xảy ra trước khi nhận quest; Đồng bộ với world transaction | Reviewable; 4597 B; `0e5c15c1` |
| [world/WORLD_EVENT_DEPENDENCIES.md](world/WORLD_EVENT_DEPENDENCIES.md) | Graph đầy đủ để handoff; Conflicts và recovery theo nhóm | Reviewable; 6200 B; `0e6acdf9` |
| [world/ENVIRONMENT_STATE_PRESENTATION.md](world/ENVIRONMENT_STATE_PRESENTATION.md) | Presentation contract cho mỗi region-state profile; Presentation theo chương | Reviewable; 3997 B; `99f2ed78` |
| [world/TASK07_CONSISTENCY_AUDIT.md](world/TASK07_CONSISTENCY_AUDIT.md) | Tài liệu thực có đã đối chiếu; Mapping 14 deliverables → nguồn thực | Reviewable; 11242 B; `42d2ef20` |
| [technical/PERSISTENT_WORLD_DATA_SPEC.md](technical/PERSISTENT_WORLD_DATA_SPEC.md) | Mười entity contracts; Save envelope tối thiểu | Reviewable; 9431 B; `e252eb8c` |
| [technical/WORLD_STATE_TEST_CASES.md](technical/WORLD_STATE_TEST_CASES.md) | WST01 — Phục hồi vùng rồi reload; WST02 — Gửi world event hai lần | Reviewable; 11690 B; `2cf1a416` |

### Historical technical/art/UI sources — 9 files

Không dùng status/geometry/palette theo mốc cũ để override current source/manifests hoặc canon mới.

| Actual file | Evidence / scope reviewed | Baseline fingerprint |
| --- | --- | --- |
| [architecture.md](architecture.md) | Kiến trúc Dawn Island; Thêm đảo — historical evidence, không canon/features mới | `bcea666a` |
| [art-provenance.md](art-provenance.md) | Nguồn đồ họa và quy trình production 0.6 (lịch sử); Giới hạn cần nói rõ — historical evidence, không canon/features mới | `4aa20f7a` |
| [dawn-full-environment.md](dawn-full-environment.md) | Đảo Bình Minh — áp dụng môi trường đã duyệt; Môi trường — historical evidence, không canon/features mới | `bd827a02` |
| [dawn-sample-review.md](dawn-sample-review.md) | Dawn Island — sample môi trường để duyệt, 0.9; Phạm vi — historical evidence, không canon/features mới | `271cc525` |
| [production-asset-checklist.md](production-asset-checklist.md) | Dawn Island — production asset checklist trước khi mở rộng; Kết luận — historical evidence, không canon/features mới | `38b39821` |
| [rebuild-audit.md](rebuild-audit.md) | Dawn Island presentation rebuild — audit; Stack and retained logic — historical evidence, không canon/features mới | `9f6287d5` |
| [rebuild-report.md](rebuild-report.md) | Báo cáo dựng lại Dawn Island; Thay đổi — historical evidence, không canon/features mới | `f518b24f` |
| [tilemap-island.md](tilemap-island.md) | Dawn Island 0.8 — Fantasy Island × Mystic Ruins; Audit và thay đổi cách dựng — historical evidence, không canon/features mới | `b20b46ed` |
| [ui-redesign.md](ui-redesign.md) | Nhật Diệm — UI/UX mobile RPG, phiên bản 0.7; Audit và nguyên nhân — historical evidence, không canon/features mới | `6e0ffe53` |

## Content kiểm chứng trọng điểm

- Task03 đầy đủ definitions, acquisition/memory axes và progression; full-three entry đọc trực tiếp trong TRANSFORMATION và I02, không suy từ audit cũ.
- Task04 12 stageIDs khớp bốn species; từng table có anatomy/movement/combat/env/animation/meaningful delta. Ability contracts có targeting/readability/counterplay, không finalize numbers.
- Task05 24 events có17fields; timeline/main quests cùng IDs; optional8 không thành prerequisites. CL01–05 payoff có nguồn/era/viewpoint; main fact scaffold không cần optional memories.
- Task06 templates có21fields; profiles đa trục không trộn rarity/morality; repeated combat/noncombat reward không nhân unique grant. Faction founders không giả bất tử hàng chục nghìn năm.
- Task07 24-event graph acyclic, E23 đủ four stable sources; four awakening subgraphs không self-body loop; available/arrived khác; source states/quest proof/ledger/read models không đồng nghĩa runtime save đã có.

## Phase I exit criteria

| Criterion | Status / rationale |
| --- | --- |
| 1 Essential design areas documented | PASS ở mức blueprint, detail approval/production inputs còn gate |
| 2 Confirmed baseline consistent | PASS sau D18/D38 provenance update; không phát hiện confirmed-conflict còn mở |
| 3 Major conflicts resolved or blockers recorded | PASS recording C08-01 và P0 queue; **chưa resolution** boss/physical choices |
| 4 GDD accurately summarizes sources | PASS đối chiếu sections và status, không copy toàn docs |
| 5 Proposals distinguishable | PASS; có decision hierarchy/metadata; không approval từ lặp |
| 6 First playable scope | PASS D40 essentials và layered scope; sizing/acceptance subset chưa duyệt |
| 7 Implementation dependencies identified | PASS readiness + dependency map |
| 8 Missing assets recorded | PASS actual asset inventory, missing không path giả |
| 9 Future tasks identify sources | PASS PHASE_I_HANDOFF/authority map |
| 10 No unexplained gaps block next phase | **PARTIAL**: gaps đã giải thích nhưng approved body/recovery/save contract, art/capabilities và boss policy chưa đủ cho production handoff |

Kết luận bảo thủ: **Phase I PARTIAL, không full design freeze**. Baseline đã xác nhận được đóng mốc bảo tồn; hồ sơ proposals là candidate review baseline. Audit hoàn tất, không đồng nghĩa pipeline ChapterI-ready. Task09 design/read-only technical audit có thể được giao tiếp vì không cần mọi secret; chuyển sang playable implementation chỉ sau P0 subset liên quan có approval/evidence.

Correction plan cụ thể: (1) quyết A08-01/02/03/09/11/13 cho Quy I; (2) A08-14 reference/clip/underwater kit + anchors; (3) repository audit + module/schema/QA plan; (4) scoped playable tasks với reload/unique reward evidence; (5) A08-05/07 trước boss I, full habitat coverage/progression trước complete ChapterI. Không bắt approve factions/late cosmic truth để làm phần local.
