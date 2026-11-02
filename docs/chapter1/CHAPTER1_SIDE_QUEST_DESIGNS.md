# Bốn side quests major — đặc tả để duyệt

**PROPOSED S22-P02**, trừ source facts được dẫn. [Sổ đăng ký](CHAPTER1_SIDE_QUEST_REGISTER.md) sở hữu portfolio view; [S05 optional definitions](../story/QUEST_DESIGN_OUTLINE.md) giữ opt_01/02 purpose/prereqs/legacy grants. Mỗi hồ sơ21fields cụ thể trigger/evidence/recovery; thiếu approved predicates/asset thì không gọi implementation-ready. Không main quest cần các kết quả này.

## opt_c1_quiet_refuge — Một khoảng nước yên

| Trường | Đặc tả / status |
| --- | --- |
| questId | opt_c1_quiet_refuge |
| Tên Việt | Một khoảng nước yên |
| Tiền đề truyện | Một niche cạnh rạn thiếu nhịp dòng nhẹ, hoặc sau E05 đã yên nhưng chưa được khảo cứu; giúp bằng hiểu nguồn, không lấy sinh vật làm vật phẩm |
| Nhóm | Ecological assistance / FIRST PLAYABLE CANDIDATE |
| Zone refs | hy_zone_reef, nearB; không chặn ab/bc hoặc A tutorial |
| Species / environmental object | hy_obj_optional_refuge_b receiver draft + approved environmental feeder cluster; không mandatory named species |
| Điều kiện nhiệm vụ chính | E01 parent complete; E02 không prerequisite mới, main không đọc quest này |
| Năng lực bắt buộc | Quy I read flow/context interaction, swim/brake và safe route; không skill II/resource meter mới |
| Kích hoạt bắt đầu | Quan sát feeder cue/rãnh nguồn rồi chủ động chọn khảo cứu; không auto quest từ âm/color-only |
| Chuỗi mục tiêu | source: record current/substrate condition → adjust: đưa receiver về safe weak-flow setting nếu cần → verify: nguồn/nhịp feeder/return viable và explicit confirm. Sau E05 already-safe thì inspect/verify thay sửa |
| Tương tác môi trường | Local receiver/niche property riêng, base E05/world phase không bị sửa; interact repeat không reopen unique reward |
| Chiến đấu tùy chọn | Không; peaceful/environmental organism không kill target |
| Điều kiện hoàn thành | Đúng target/source condition evidence + safe setting hoặc approved post-restoration equivalent + viable source/refuge/return + confirm → optional outcome durable |
| Thất bại / gián đoạn | Sai hướng/blur/storage fail giữ last-good, retry same op/source; actor không viable thì defer/fallback approved, không fabricate source |
| Thoại hiển thị cho người chơi | c1sq_refuge_start / flow / verify / done; xem gói dialogue, không Quy nói người |
| Loại phần thưởng | Knowledge/habitat understanding một lần; patch local nếu needed, không loot/skill/HP/guaranteed XP |
| Hệ quả bền vững | LocalObjectState receiver setting khi thực sự đổi, completion evidence/knowledge same W07 transaction; không water_stable hoặc main flags |
| Hành vi khi quay lại | Pose/current/cue dựng từ state; complete rồi replay/help feedback không reward; E05 đã làm niche safe vẫn verify không recreate damage |
| Save/load | Before durable trạng thái cũ, after durable result/proof/receipt/target setting đồng bộ; wrappers cùng source không pay lại |
| Phụ thuộc triển khai | Approved generic source/receiver/RuleRefs/geometry/current/observation predicates, W07/P15 source mapping, asset cue low-scope; hiện chưa runtime |
| Trạng thái duyệt | PROPOSED S22; new IDs/source/object placement/solution/payload chưa approved, chưa production-ready |

## opt_01_reef_observation — Nhịp sống nơi rạn

| Trường | Đặc tả / status |
| --- | --- |
| questId | opt_01_reef_observation |
| Tên Việt | Nhịp sống nơi rạn |
| Tiền đề truyện | Nhận biết wildlife từ một chu kỳ hành vi không cưỡng ép, khác việc nhìn hình hay đánh |
| Nhóm | Ecological knowledge / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_reef hoặc hy_zone_habitat source equivalent qua bd |
| Species / environmental object | Sứa/carp/polyp/ốc/cá ngựa references chỉ assignment candidates E20; source approved behavior mới đủ journal eligibility |
| Điều kiện nhiệm vụ chính | E02 complete giữ S05; không kéo quest này trước E02 để làm slice |
| Năng lực bắt buộc | Quy I movement/observe/keep distance, source scope/behavior đủ; không species form/capture |
| Kích hoạt bắt đầu | Dấu hành vi có cue visible, interact để nghiên cứu sâu hoặc approved source proof có trước được query |
| Chuỗi mục tiêu | locate: source behavior context → observe: accepted cycle/distinction theo author → record: observation provenance/habitat relationship; không arbitrary cast/kill count |
| Tương tác môi trường | Đi theo lane/refuge, current cue giúp hiểu niche; không cần thay global flow |
| Chiến đấu tùy chọn | Không required; territorial source nếu chọn phải có nonviolent observation/fallback rule |
| Điều kiện hoàn thành | Observation có source/behavior/context/provenance đủ, scope journal valid và eligible prior proofs revalidate → optional source completion |
| Thất bại / gián đoạn | Disturb/relocation cho retry/secondary source viable, không reset discovery; unapproved species/asset thì content pending, không fake record |
| Thoại hiển thị cho người chơi | c1sq_observe_start / patience / distinction / done |
| Loại phần thưởng | Journal fact và habitat knowledge theo S05; XP chỉ manifest approved, same E02 observation component đã claimed không pay lại |
| Hệ quả bền vững | Knowledge/observation/completion theo owners, không main flags/global hostility; no form unlock |
| Hành vi khi quay lại | Repeat observe chỉ feedback; E05 route/source variants giữ same ID/grant, không cần collect trước restoration |
| Save/load | Existing grant_opt_01_reef_observation canonical source, new event binding alias không regrant; Source/recipient records đồng bộ |
| Phụ thuộc triển khai | Approved species or legitimate environmental journal scope, behavior/animation/source coverage, distinct evidence/stacking vs E02, W07/R03/P15 modules |
| Trạng thái duyệt | Existing S05 PROPOSED purpose/prereq giữ; new title/placement/detail S22 PROPOSED; six refs vẫn unverified |

## opt_02_ancestral_echo — Một khoảng đã giữ

| Trường | Đặc tả / status |
| --- | --- |
| questId | opt_02_ancestral_echo |
| Tên Việt | Một khoảng đã giữ |
| Tiền đề truyện | Một dấu ở nhánh di tích cho cảm nhận cục bộ về khoảng nước được giữ, không toàn biến cố |
| Nhóm | Ancient ruins/memory / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_ruins, local side alcove/source trong E; không F hoặc connector main mới |
| Species / environmental object | hy_obj_echo_source_e draft, optional mem_quy_refuge_margin PROPOSED mới vì opt_02 chưa có memoryId cụ thể; không reuse first_sense/current như reward mới |
| Điều kiện nhiệm vụ chính | E03 complete theo S05; tiếp cận E qua ce/eb, không cần E05 để source tồn tại |
| Năng lực bắt buộc | Quy I structure/observation/context contact, no II/III/all memories/Phượng |
| Kích hoạt bắt đầu | Nhìn dấu mòn rãnh phụ/landmark, chủ động khảo cứu và chạm source viable; audio optional |
| Chuỗi mục tiêu | inspect: đối chiếu dấu/nguồn → contact: đúng source gate → record: fragment/provenance committed; viewer bản dài optional sau trigger |
| Tương tác môi trường | Một cấu trúc/receiver side room already reachable, không đổi E03 bypass/E05 stable; nguồn về archive/equivalent sau E05 nếu necessary |
| Chiến đấu tùy chọn | Không |
| Điều kiện hoàn thành | Valid optional source/provenance + memory record + same unique receipt/completion durable; main E01/E03 memory IDs khác; không chỉ animation |
| Thất bại / gián đoạn | Ngắt trước commit giữ facts cũ/source, retry same identity; after commit replay, thiếu asset/localization essential thì pending not auto memory |
| Thoại hiển thị cho người chơi | c1sq_echo_mark / fragment / limit / done; environmental description/memory echo, không narrator origin |
| Loại phần thưởng | Optional ancestral memory/knowledge một lần; không form/evolution/required boss skill hoặc XP numbers |
| Hệ quả bền vững | Source researched/completion projection + R03 MemoryRecord cùng W07/ledger; source replay vẫn available, no mandatory clue relocation |
| Hành vi khi quay lại | E05 vẫn source E/archival viable; E06 return còn, no missable core fragment, replay không reward |
| Save/load | grant_opt_02_ancestral_echo giữ S05 identity; optional memory ID/fragment mapping cần approval/collision/migration, version không regrant |
| Phụ thuộc triển khai | Approved fragment/source/provenance/art/presentation/schema/receipt, neutral Q05/chronology, H19 side-room blocking/envelope, not new physics |
| Trạng thái duyệt | Existing S05 PROPOSED; mem_quy_refuge_margin/title/source placement/dialogue S22 PROPOSED, chưa canon/asset |

## opt_c1_current_return — Theo dòng rồi trở lại

| Trường | Đặc tả / status |
| --- | --- |
| questId | opt_c1_current_return |
| Tên Việt | Theo dòng rồi trở lại |
| Tiền đề truyện | Một vòng bơi ngắn bên kênh giúp đọc điểm hãm và đường hồi, phần thưởng là hiểu lối thay sức mạnh bắt buộc |
| Nhóm | Movement/environment puzzle / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_channels, side loop nằm trong C; không cạnh mới tới G/I hoặc bypass ce story gate |
| Species / environmental object | hy_obj_channel_niche_c marker/receiver/panel draft, reused current/refuge kit; wildlife không required |
| Điều kiện nhiệm vụ chính | E02 complete, bc/C accessible, lesson Quy I trước challenge; no side prerequisite |
| Năng lực bắt buộc | Quy I swim/brake/read weak flow/context receiver, không frame-perfect/timer mandatory hoặc advanced F tier |
| Kích hoạt bắt đầu | Nhìn split-current landmark và outlet/điểm về, chủ động chọn thử vòng optional |
| Chuỗi mục tiêu | survey: xác định source/outlet/return safe → traverse: đi lane yếu tới receiver/niche accepted → return: về mốc C safe và verify route/setting; postE05 panel đã thông chỉ cần route evidence |
| Tương tác môi trường | Receiver/panel local niche làm convenience trong cùng C nếu author, không sửa13connectors/required lane hoặc E03/E05 facts |
| Chiến đấu tùy chọn | Không combat; hazard/current bounded có refuge và reject nếu insufficient cap |
| Điều kiện hoàn thành | Accepted source/route/outlet evidence + safe traversal và return anchor + allowed local setting/confirm khi definition cần; không elapsed time chỉ |
| Thất bại / gián đoạn | Miss lane thì refuge/retry, không XP/resource penalty mới; không route/envelope thì reject/defer, no noclip |
| Thoại hiển thị cho người chơi | c1sq_lane_start / brake / return / done |
| Loại phần thưởng | Knowledge/local convenience/possible authored mastery opportunity không direct mastery grant; no stat/skill/threshold boss-essential |
| Hệ quả bền vững | Local niche marker/panel setting + completion/evidence same writer; nếu E05 already-open thì readonly verify, không extra physical delta |
| Hành vi khi quay lại | Lặp luyện movement chỉ feedback; shortcut nội room giữ safe return và same source claim; evolved body cần clearance/alternate |
| Save/load | Precommit last-good, after commit reconstruct target panel/cue/receipt; no timer save/half-hit, new version không repeat first-clear |
| Phụ thuộc triển khai | Approved loop/blocking/current bounds/turn-envelope/return predicates, context input/cue/manifest/W07/P15; no production coordinates |
| Trạng thái duyệt | New PROPOSED S22, exact room geometry/rule/payload chưa approved, not new canonical connector |

Objective local keys ứng viên: mỗi quest dùng namespace `<questId>_obj_source`, `_obj_action`, `_obj_verify` theo sequence cụ thể trên; đây là typed draft objective IDs, không new world events. Objective schema/type reuse Q21 INTERACT_OBJECT/OBSERVE_CREATURE/CHANGE_ENVIRONMENT/REACH_LOCATION/RETURN_TO_AREA/RECOVER_MEMORY. Không raw placeholders ra UI hoặc production JSON tại Task22.
