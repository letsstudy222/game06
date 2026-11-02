# Register sáu nhiệm vụ chính — application view

**PROPOSED Q21-P01/P02**, kế thừa [quest IDs/titles S05](../story/QUEST_DESIGN_OUTLINE.md) và [event contracts](../story/STORY_IMPLEMENTATION_HANDOFF.md). Sáu quest đã tồn tại trong planning scope, không số lượng mới áp đặt hoặc registry cạnh tranh. 19 field mỗi hồ sơ dưới đây cụ thể hóa route/evidence/retry; S05/W07 vẫn owner semantics. Completion phải là accepted domain evidence + durable transaction, không text UI/animation. Thiếu approved content predicate vẫn chặn implementation-ready và ghi [gates](TASK21_DECISIONS.md).

## mq_01 — Cảm một dòng sống

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_01 / evt_01_quy_awakes |
| Tên nhiệm vụ | Cảm một dòng sống |
| Hồi truyện | I — nhận cảm và cơ thể đầu |
| Zone refs | hy_zone_sanctuary (A), cửa ab; opening_z01–06 giữ localAreaRefs Task17 |
| Mô tả | Một nguồn còn sống đáp lại nhận cảm giới hạn, Quy non thức rồi player học thân |
| Mục tiêu chính | Có cơ thể đầu và ra buồng thức sau thực hành an toàn |
| Điều kiện tiên quyết | BOOTSTRAP_START, CAP_BOOTSTRAP; không activeForm/Quy hoặc mạng nước restored trước |
| Kích hoạt bắt đầu | Chủ động tiếp xúc tín hiệu theo Task17; không autoplay unlock hoặc nhận quest UI bắt buộc |
| Kích hoạt hoàn thành | Source D29 đủ: memory trước resonance; form_committed durable; practice bơi/hãm/receiver/exit đủ evidence và safe anchor theo Task17 → parent practice_complete |
| Thất bại / gián đoạn | Trước form commit retry prebody same source; sau form commit resume practice, không trả về linh thể/regrant; thiếu asset/save giữ last-good |
| Năng lực bắt buộc | CAP_BOOTSTRAP entry; CAP_QUY_MOVE chỉ sau form commit; context receiver I |
| NPC / creature refs | actor_spirit, form_quy_hai_uyen; vật mang Q05 chưa chốt |
| Phụ thuộc encounter | Không combat/boss/tutorial XP/evolution/loadout switching |
| Phụ thuộc môi trường | Task17 local source/placement/receiver và exit; không full hydrology |
| Loại phần thưởng | Form sub-grant một lần; knowledge/memory và parent facts/practice R0; XP chỉ nếu manifest được duyệt |
| Thay đổi bền vững | E01 sub-completions + R03 unlock/placement/memory + local exit patch; quy_awake/first_body_acquired projections |
| Unlocks | ab/B và mq_02 available sau parent; không E02 complete |
| Khả năng lặp lại | Chỉ presentation/practice feedback, không unique unlock/parent reward lặp |
| Trạng thái duyệt | S05/O17 proposals giữ; D29/Quy-first confirmed, chi tiết mới Q21 PROPOSED |

## mq_02 — Rạn vẫn đang sống

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_02 / evt_02_read_reef |
| Tên nhiệm vụ | Rạn vẫn đang sống |
| Hồi truyện | II — hệ nước còn sống |
| Zone refs | hy_zone_reef (B); D optional không prerequisite |
| Mô tả | Quan sát, ghi điều đã thấy, phân biệt territorial threat với habitat ngoại lai sống ổn |
| Mục tiêu chính | Ghi observation main và vượt/thoát đoạn lãnh thổ về nơi trú, không kill quota |
| Điều kiện tiên quyết | E01 parent complete; main observation/encounter source approved, Quy I capabilities được học trước dùng |
| Kích hoạt bắt đầu | Tới dấu hành vi B, chủ động quan sát/ghi journal; reconcile prior eligible proof |
| Kích hoạt hoàn thành | Observation behavior + record journal + stable foreign habitat clue CL03 + accepted territorial resolution/escape và safe refuge proof đủ → E02 commit |
| Thất bại / gián đoạn | Bị xua/gián đoạn thì retreat/retry; source đổi cần fallback viable, không reset observation hoặc giết thay proof |
| Năng lực bắt buộc | CAP_QUY_MOVE, CAP_QUY_READ_FLOW, CAP_QUY_BASIC; short brace lesson nếu content dùng |
| NPC / creature refs | actor_spirit, npc_record_keeper proposal; wildlife assignment theo E20 còn unverified, không named species gate |
| Phụ thuộc encounter | E02 territorial encounter bounded có warning/retreat; approved resolution/escape profile trước production |
| Phụ thuộc môi trường | B observation sources/current cue/refuge; không cần thu sứa/carp, D/F hoặc skill II |
| Loại phần thưởng | Creature/ecological knowledge, narrative progress/access R0; species XP chỉ payload P15 approved |
| Thay đổi bền vững | E02 completion/evidence/journal owners; reef_observed/journal_introduced derived, không discovered mọi roster |
| Unlocks | bc/C và mq_03; không E03 proof từ journal alone |
| Khả năng lặp lại | Quan sát lại cho feedback, unique R0 không replay; ordinary encounter reset theo approved policy |
| Trạng thái duyệt | Tên/ID/actors S05 PROPOSED; species/asset source và resolution geometry còn gate, chưa implementation-ready |

## mq_03 — Đường nước trở về

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_03 / evt_03_trace_returns |
| Tên nhiệm vụ | Đường nước trở về |
| Hồi truyện | III khảo cứu + IV thử đường hồi |
| Zone refs | hy_zone_channels (C), hy_zone_ruins (E); G nhìn hậu quả từ phía trước gate, không cần vào G lấy proof |
| Mô tả | Đối chiếu cấp–hồi, vết sửa và mảnh cảm nhận; thử bypass giữ sanctuary/refuge |
| Mục tiêu chính | Có bằng chứng main và đường xả phụ thử được không phá nơi trú |
| Điều kiện tiên quyết | E02 complete, ce lane yếu accessible; receiver/evidence cần đều ở E trước eg |
| Kích hoạt bắt đầu | Khảo cứu dấu rãnh/cơ cấu phụ E, query evidence đã durable trước đó |
| Kích hoạt hoàn thành | CL01/CL02 và CL03 corroboration nguồn + dấu sửa/flow check + bypass test/outlet/refuge valid → E03 completion; mem_quy_current ghi theo source payload, không yêu cầu xem dài hay all memories |
| Thất bại / gián đoạn | Thao tác sai giữ old setting safe, revalidate outlet/habitat, retry cùng target/revision; không reset mạng để tái hiện damage |
| Năng lực bắt buộc | CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE I; không env_quy_route II/S2 hoặc S3 |
| NPC / creature refs | actor_spirit, npc_record_keeper, npc_tide_keeper theo S05; species của NPC chưa final |
| Phụ thuộc encounter | Không combat bắt buộc, F optional không main proof |
| Phụ thuộc môi trường | Receiver/cấp–hồi/vết sửa/bypass và safe route/coverage, contextual manipulation I |
| Loại phần thưởng | Knowledge/mem_quy_current/route progress R0; no form hoặc evolution auto |
| Thay đổi bền vững | E03 proof/outcome + configured bypass/shortcut patch W07; water_bypass_ready/water_evidence_recorded aliases |
| Unlocks | eg/G, eb shortcut, gh/H theo H19; mq_04; chưa water_stable |
| Khả năng lặp lại | Derived clue/replay/setting command riêng có thể dùng; unique source không reward lại |
| Trạng thái duyệt | S05/H19/E20/Q21 PROPOSED, no exact current force/threshold approval |

## mq_04 — Giữ lại nơi trú

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_04 / evt_04_guardian_conflict |
| Tên nhiệm vụ | Giữ lại nơi trú |
| Hồi truyện | V — thử thách giữ nước |
| Zone refs | hy_zone_core (G) approach, hy_zone_boss (H) prep/encounter scopes |
| Mô tả | Keeper sợ xói mất nơi trú; người chơi giành cửa sổ thử tải có bằng chứng |
| Mục tiêu chính | Threat cục bộ được ngăn và keeper không còn chặn thử tải an toàn |
| Điều kiện tiên quyết | E03 complete, Quy I guaranteed caps, prep/checkpoint/entry route viable; no mandatory3forms |
| Kích hoạt bắt đầu | Explicit confirm/cross approved E04 boundary từ H prep, threat chưa active trước accepted entry |
| Kích hoạt hoàn thành | Encounter coordinator accepted qualifying outcome chứng minh threat stopped + operation permission/refuge preserved theo authored contract → E04 atomic outcome/R0; HP0/kill animation alone không đủ |
| Thất bại / gián đoạn | Abandon/loss không permanent quest fail; close/reset/placement/recovery theo policy trước unlock/retry, earned proofs giữ |
| Năng lực bắt buộc | CAP_QUY_BASIC, CAP_QUY_MOVE, CAP_STRUCTURE_OPERATE; one Quy eligible đủ intended first route |
| NPC / creature refs | actor_spirit, npc_tide_keeper actor proposal, không final boss species/identity mới |
| Phụ thuộc encounter | boss_or_alternative S05; Task23 phải author qualifying combat/alternative outcome; không moveset ở Task21 |
| Phụ thuộc môi trường | H arena/prep/receiver/refuge separation, checkpoint placement, no restore yet |
| Loại phần thưởng | Conflict outcome/access/knowledge R0, XP/resources chỉ nếu approved manifest |
| Thay đổi bền vững | E04 completion/outcome/actor disposition + attempt/grants W07; water_conflict_resolved/tide_keeper_neutral aliases |
| Unlocks | Permission thử E05 ở G và mq_05; chưa gi/I hoặc E05 fact |
| Khả năng lặp lại | Presentation/approved repeatable trial nếu có riêng; first-clear/outcome không regrant |
| Trạng thái duyệt | S05/L16/Q21 PROPOSED; D06/D41 lock/no-full3 confirmed; HP/retry/emergency transfer chưa approve |

## mq_05 — Mạch nước có lối về

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_05 / evt_05_restore_water |
| Tên nhiệm vụ | Mạch nước có lối về |
| Hồi truyện | VI — khôi phục có kiểm chứng |
| Zone refs | hy_zone_core (G), quay A/B kiểm sanctuary/rạn, I chỉ available sau commit |
| Mô tả | Vận hành đường cấp/hồi và giữ habitats thay giải quyết bằng chiến thắng đơn thuần |
| Mục tiêu chính | Vòng cấp/hồi hoạt động và refuge còn tiếp cận, có kiểm chứng sanctuary/rạn |
| Điều kiện tiên quyết | E04 accepted outcome, E03 bypass, route cũ G–E–C–B–A hoặc eb viable; không cần I mở trước |
| Kích hoạt bắt đầu | Chủ động vận hành/kiểm rồi xác nhận kết quả tại G, không boss callback tự completion |
| Kích hoạt hoàn thành | Current source/outlet setting đúng + physical checks A/B/refuge/coverage tại revision candidate + player confirm → E05 atomic completion/patch/route/grants |
| Thất bại / gián đoạn | Storage/coverage/placement fail giữ E04 và last-good environment, retry same source; không đấu boss lại hoặc rollback earned facts |
| Năng lực bắt buộc | CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE I; no II/III/mana/level grind |
| NPC / creature refs | actor_spirit, npc_tide_keeper disposition theo E04, habitat actors không named capture gate |
| Phụ thuộc encounter | Không boss/combat mới mandatory; predators có thể còn context nhưng không chặn validation route |
| Phụ thuộc môi trường | Hệ cấp/hồi/refuge/habitat coverage và conditional nav/current patches, one owner mỗi property |
| Loại phần thưởng | Restoration/access/knowledge R0; no unlimited heal/new form/EXP numbers |
| Thay đổi bền vững | E05 completion + required patches/route/ecology placement same revision; water_stable/refuge_preserved/chapter_01_complete derived |
| Unlocks | gi/I, ib shortcut và E06 available; chưa arrived_nhat_diem/route_sea_open |
| Khả năng lặp lại | Revisit/rebalance approved mutable settings không xóa stable proof, unique R0 không replay |
| Trạng thái duyệt | S05/W07/H19/Q21 PROPOSED; exact adapter/coverage/receiver thresholds chưa final |

## mq_06 — Từ sâu tới bờ

| Trường | Đặc tả / trạng thái |
| --- | --- |
| questId / eventRef | mq_06 / evt_06_surface_route |
| Tên nhiệm vụ | Từ sâu tới bờ |
| Hồi truyện | VI boundary hướng Chương II |
| Zone refs | hy_zone_exit (I) → N destination anchor nhat_diem; N không zone Hải Uyên mới |
| Mô tả | Theo sườn biển ít sâu dần, thấy dấu nhiệt và nối đường về |
| Mục tiêu chính | Đặt avatar ở bờ đến và ghi return edge hợp lệ |
| Điều kiện tiên quyết | E05 complete, gi/I accessible; destination content/geometry/capability/anchor/return valid, chưa cần Phượng |
| Kích hoạt bắt đầu | Chấp nhận rời nơi trú và thực hiện traversal I→N, preflight rồi transition intent |
| Kích hoạt hoàn thành | Accepted traversal qua connector + destination placement/return/checkpoint validated và durable arrival E06 → completed |
| Thất bại / gián đoạn | Trước durable load ở I; sau durable ở N có return; missing content giữ source/last-good, no half-arrival |
| Năng lực bắt buộc | CAP_QUY_MOVE, CAP_QUY_READ_FLOW I, không Phượng trước arrival |
| NPC / creature refs | actor_spirit / current eligible form theo policy, không NPC mới mandatory |
| Phụ thuộc encounter | Không boss/encounter mới bắt buộc |
| Phụ thuộc môi trường | hy_conn_gi/hy_conn_in và source/destination safe anchors, layer connector theo production plane approval |
| Loại phần thưởng | Arrival/access/knowledge R0, future story handoff chứ không Phượng unlock |
| Thay đổi bền vững | E06 arrival/placement/return edge/receipt same revision; route_sea_open/arrived_nhat_diem derived |
| Unlocks | Bờ đến và return N→I→B/G/A; context cho chương sau, không implement mq_07 |
| Khả năng lặp lại | Return traversal không arrival reward mới, presentation replay không reset chapter |
| Trạng thái duyệt | S05/H19/Q21 PROPOSED; final ending/transition staging thuộc Task24, không thực hiện ở đây |

Không mandatory quest nào cần optional D/F/rare species/evolution. Source eligibility/encounter outcomes/physics thresholds/asset binding phải author và duyệt trước production; explicit trigger contract không có nghĩa các phụ thuộc đó đã resolve. Xem [objective matrix](CHAPTER1_QUEST_OBJECTIVES.md), [zone matrix](CHAPTER1_QUEST_ZONE_MATRIX.md), [world-state mapping](CHAPTER1_QUEST_WORLD_STATES.md).
