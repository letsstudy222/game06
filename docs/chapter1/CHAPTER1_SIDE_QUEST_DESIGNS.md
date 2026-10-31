# Bốn side quests major — đặc tả để duyệt

**PROPOSED S22-P02**, trừ source facts được dẫn. [Register](CHAPTER1_SIDE_QUEST_REGISTER.md) sở hữu portfolio view; [S05 optional definitions](../story/QUEST_DESIGN_OUTLINE.md) giữ opt_01/02 purpose/prereqs/legacy grants. Mỗi hồ sơ21fields cụ thể trigger/evidence/recovery; thiếu approved predicates/asset thì không gọi implementation-ready. Không main quest cần các kết quả này.

## opt_c1_quiet_refuge — Một khoảng nước yên

| Field | Đặc tả / status |
| --- | --- |
| questId | opt_c1_quiet_refuge |
| Tên Việt | Một khoảng nước yên |
| Narrative premise | Một niche cạnh rạn thiếu nhịp dòng nhẹ, hoặc sau E05 đã yên nhưng chưa được khảo cứu; giúp bằng hiểu nguồn, không lấy sinh vật làm vật phẩm |
| Category | Ecological assistance / FIRST PLAYABLE CANDIDATE |
| Zone refs | hy_zone_reef, nearB; không chặn ab/bc hoặc A tutorial |
| Species / environmental object | hy_obj_optional_refuge_b receiver draft + approved environmental feeder cluster; không mandatory named species |
| Main quest prerequisite | E01 parent complete; E02 không prerequisite mới, main không đọc quest này |
| Required abilities | Quy I read flow/context interaction, swim/brake và safe route; không skill II/resource meter mới |
| Activation trigger | Quan sát feeder cue/rãnh nguồn rồi chủ động chọn khảo cứu; không auto quest từ âm/color-only |
| Objective sequence | source: record current/substrate condition → adjust: đưa receiver về safe weak-flow setting nếu cần → verify: nguồn/nhịp feeder/return viable và explicit confirm. Sau E05 already-safe thì inspect/verify thay sửa |
| Environmental interactions | Local receiver/niche property riêng, base E05/world phase không bị sửa; interact repeat không reopen unique reward |
| Optional combat | Không; peaceful/environmental organism không kill target |
| Completion condition | Đúng target/source condition evidence + safe setting hoặc approved post-restoration equivalent + viable source/refuge/return + confirm → optional outcome durable |
| Failure / interruption | Sai hướng/blur/storage fail giữ last-good, retry same op/source; actor không viable thì defer/fallback approved, không fabricate source |
| Player-facing dialogue | c1sq_refuge_start / flow / verify / done; xem gói dialogue, không Quy nói người |
| Reward category | Knowledge/habitat understanding một lần; patch local nếu needed, không loot/skill/HP/guaranteed XP |
| Persistent consequences | LocalObjectState receiver setting khi thực sự đổi, completion evidence/knowledge same W07 transaction; không water_stable hoặc main flags |
| Revisit behavior | Pose/current/cue dựng từ state; complete rồi replay/help feedback không reward; E05 đã làm niche safe vẫn verify không recreate damage |
| Save/load | Before durable trạng thái cũ, after durable result/proof/receipt/target setting đồng bộ; wrappers cùng source không pay lại |
| Implementation dependencies | Approved generic source/receiver/RuleRefs/geometry/current/observation predicates, W07/P15 source mapping, asset cue low-scope; hiện chưa runtime |
| Approval status | PROPOSED S22; new IDs/source/object placement/solution/payload chưa approved, chưa production-ready |

## opt_01_reef_observation — Nhịp sống nơi rạn

| Field | Đặc tả / status |
| --- | --- |
| questId | opt_01_reef_observation |
| Tên Việt | Nhịp sống nơi rạn |
| Narrative premise | Nhận biết wildlife từ một chu kỳ hành vi không cưỡng ép, khác việc nhìn hình hay đánh |
| Category | Ecological knowledge / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_reef hoặc hy_zone_habitat source equivalent qua bd |
| Species / environmental object | Sứa/carp/polyp/ốc/cá ngựa references chỉ assignment candidates E20; source approved behavior mới đủ journal eligibility |
| Main quest prerequisite | E02 complete giữ S05; không kéo quest này trước E02 để làm slice |
| Required abilities | Quy I movement/observe/keep distance, source scope/behavior đủ; không species form/capture |
| Activation trigger | Dấu hành vi có cue visible, interact để nghiên cứu sâu hoặc approved source proof có trước được query |
| Objective sequence | locate: source behavior context → observe: accepted cycle/distinction theo author → record: observation provenance/habitat relationship; không arbitrary cast/kill count |
| Environmental interactions | Đi theo lane/refuge, current cue giúp hiểu niche; không cần thay global flow |
| Optional combat | Không required; territorial source nếu chọn phải có nonviolent observation/fallback rule |
| Completion condition | Observation có source/behavior/context/provenance đủ, scope journal valid và eligible prior proofs revalidate → optional source completion |
| Failure / interruption | Disturb/relocation cho retry/secondary source viable, không reset discovery; unapproved species/asset thì content pending, không fake record |
| Player-facing dialogue | c1sq_observe_start / patience / distinction / done |
| Reward category | Journal fact và habitat knowledge theo S05; XP chỉ manifest approved, same E02 observation component đã claimed không pay lại |
| Persistent consequences | Knowledge/observation/completion theo owners, không main flags/global hostility; no form unlock |
| Revisit behavior | Repeat observe chỉ feedback; E05 route/source variants giữ same ID/grant, không cần collect trước restoration |
| Save/load | Existing grant_opt_01_reef_observation canonical source, new event binding alias không regrant; Source/recipient records đồng bộ |
| Implementation dependencies | Approved species or legitimate environmental journal scope, behavior/animation/source coverage, distinct evidence/stacking vs E02, W07/R03/P15 modules |
| Approval status | Existing S05 PROPOSED purpose/prereq giữ; new title/placement/detail S22 PROPOSED; six refs vẫn unverified |

## opt_02_ancestral_echo — Một khoảng đã giữ

| Field | Đặc tả / status |
| --- | --- |
| questId | opt_02_ancestral_echo |
| Tên Việt | Một khoảng đã giữ |
| Narrative premise | Một dấu ở nhánh di tích cho cảm nhận cục bộ về khoảng nước được giữ, không toàn biến cố |
| Category | Ancient ruins/memory / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_ruins, local side alcove/source trong E; không F hoặc connector main mới |
| Species / environmental object | hy_obj_echo_source_e draft, optional mem_quy_refuge_margin PROPOSED mới vì opt_02 chưa có memoryId cụ thể; không reuse first_sense/current như reward mới |
| Main quest prerequisite | E03 complete theo S05; tiếp cận E qua ce/eb, không cần E05 để source tồn tại |
| Required abilities | Quy I structure/observation/context contact, no II/III/all memories/Phượng |
| Activation trigger | Nhìn dấu mòn rãnh phụ/landmark, chủ động khảo cứu và chạm source viable; audio optional |
| Objective sequence | inspect: đối chiếu dấu/nguồn → contact: đúng source gate → record: fragment/provenance committed; viewer bản dài optional sau trigger |
| Environmental interactions | Một cấu trúc/receiver side room already reachable, không đổi E03 bypass/E05 stable; nguồn về archive/equivalent sau E05 nếu necessary |
| Optional combat | Không |
| Completion condition | Valid optional source/provenance + memory record + same unique receipt/completion durable; main E01/E03 memory IDs khác; không chỉ animation |
| Failure / interruption | Ngắt trước commit giữ facts cũ/source, retry same identity; after commit replay, thiếu asset/localization essential thì pending not auto memory |
| Player-facing dialogue | c1sq_echo_mark / fragment / limit / done; environmental description/memory echo, không narrator origin |
| Reward category | Optional ancestral memory/knowledge một lần; không form/evolution/required boss skill hoặc XP numbers |
| Persistent consequences | Source researched/completion projection + R03 MemoryRecord cùng W07/ledger; source replay vẫn available, no mandatory clue relocation |
| Revisit behavior | E05 vẫn source E/archival viable; E06 return còn, no missable core fragment, replay không reward |
| Save/load | grant_opt_02_ancestral_echo giữ S05 identity; optional memory ID/fragment mapping cần approval/collision/migration, version không regrant |
| Implementation dependencies | Approved fragment/source/provenance/art/presentation/schema/receipt, neutral Q05/chronology, H19 side-room blocking/envelope, not new physics |
| Approval status | Existing S05 PROPOSED; mem_quy_refuge_margin/title/source placement/dialogue S22 PROPOSED, chưa canon/asset |

## opt_c1_current_return — Theo dòng rồi trở lại

| Field | Đặc tả / status |
| --- | --- |
| questId | opt_c1_current_return |
| Tên Việt | Theo dòng rồi trở lại |
| Narrative premise | Một vòng bơi ngắn bên kênh giúp đọc điểm hãm và đường hồi, phần thưởng là hiểu lối thay sức mạnh bắt buộc |
| Category | Movement/environment puzzle / CHAPTER I CORE OPTIONAL CONTENT |
| Zone refs | hy_zone_channels, side loop nằm trong C; không cạnh mới tới G/I hoặc bypass ce story gate |
| Species / environmental object | hy_obj_channel_niche_c marker/receiver/panel draft, reused current/refuge kit; wildlife không required |
| Main quest prerequisite | E02 complete, bc/C accessible, lesson Quy I trước challenge; no side prerequisite |
| Required abilities | Quy I swim/brake/read weak flow/context receiver, không frame-perfect/timer mandatory hoặc advanced F tier |
| Activation trigger | Nhìn split-current landmark và outlet/điểm về, chủ động chọn thử vòng optional |
| Objective sequence | survey: xác định source/outlet/return safe → traverse: đi lane yếu tới receiver/niche accepted → return: về mốc C safe và verify route/setting; postE05 panel đã thông chỉ cần route evidence |
| Environmental interactions | Receiver/panel local niche làm convenience trong cùng C nếu author, không sửa13connectors/required lane hoặc E03/E05 facts |
| Optional combat | Không combat; hazard/current bounded có refuge và reject nếu insufficient cap |
| Completion condition | Accepted source/route/outlet evidence + safe traversal và return anchor + allowed local setting/confirm khi definition cần; không elapsed time chỉ |
| Failure / interruption | Miss lane thì refuge/retry, không XP/resource penalty mới; không route/envelope thì reject/defer, no noclip |
| Player-facing dialogue | c1sq_lane_start / brake / return / done |
| Reward category | Knowledge/local convenience/possible authored mastery opportunity không direct mastery grant; no stat/skill/threshold boss-essential |
| Persistent consequences | Local niche marker/panel setting + completion/evidence same writer; nếu E05 already-open thì readonly verify, không extra physical delta |
| Revisit behavior | Lặp luyện movement chỉ feedback; shortcut nội room giữ safe return và same source claim; evolved body cần clearance/alternate |
| Save/load | Precommit last-good, after commit reconstruct target panel/cue/receipt; no timer save/half-hit, new version không repeat first-clear |
| Implementation dependencies | Approved loop/blocking/current bounds/turn-envelope/return predicates, context input/cue/manifest/W07/P15; no production coordinates |
| Approval status | New PROPOSED S22, exact room geometry/rule/payload chưa approved, not new canonical connector |

Objective local keys ứng viên: mỗi quest dùng namespace `<questId>_obj_source`, `_obj_action`, `_obj_verify` theo sequence cụ thể trên; đây là typed draft objective IDs, không new world events. Objective schema/type reuse Q21 INTERACT_OBJECT/OBSERVE_CREATURE/CHANGE_ENVIRONMENT/REACH_LOCATION/RETURN_TO_AREA/RECOVER_MEMORY. Không raw placeholders ra UI hoặc production JSON tại Task22.
