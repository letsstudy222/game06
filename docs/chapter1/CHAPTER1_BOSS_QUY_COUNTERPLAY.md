# Quy-only route — capability coverage và fairness

**PROPOSED B23-P07**, theo [Q18 combat](QUY_COMBAT_DESIGN.md), [skills](QUY_SIGNATURE_SKILLS.md), [Q21 register](CHAPTER1_MAIN_QUEST_REGISTER.md), [H19 main graph](CHAPTER1_WORLD_GRAPH.md). Story-guaranteed intended roster tới E04 là Quy I; actual controller/clip/input/geometry/action approvals chưa có đủ để claim gameplay win-tested.

## Required baseline / optional advantages

Baseline main caps: CAP_QUY_MOVE (bơi/hãm/đổi hướng), CAP_QUY_BASIC (quy_basic/Chấn Mai), CAP_QUY_READ_FLOW và CAP_STRUCTURE_OPERATE (receiver context I). Bơi không đòi arbitrary3D depth, shift-hover/regen Phượng không luật Quy. Short brace I cần capability/cost/clip approval và lesson E02 nếu dùng; không mặc định full Mai Định Áp quy_s2 II. Vành Nước quy_s1 khả năng StageI nhưng minimumStage không auto unlock, vì thế **không mandatory** cho route này.

| Required decision/action | Available Quy response | Boss pattern | Counterplay/opening | Environment | Failure/recovery |
| --- | --- | --- | --- | --- | --- |
| Nhìn arc/facing lock, ra sườn hoặc lùi | Quy I move/brake, Chấn Mai sau recover | c1_keeper_sweep | Arc finite/locked, flank và recovery core reachable; không required i-frame/guard/parry | Lane trống và turn/braking margin trước selection | Hụt nhịp nhận damage theo approved model, còn route lấy lại vị trí; nếu wall pin thì pattern invalid/content fix |
| Rời line trước pulse hoặc dùng cover valid | Quy I lateral movement, basic punish sau vent đóng | c1_keeper_pressure | Không homing, LOS/cover explicit, safe side path còn | Static breakwater và alternate no-cover route, no damage immunity assumption | Missed cue không chuỗi guaranteed hitstun; reset vị trí qua refuge, no free heal |
| Chọn lane trống, hãm ở pocket rồi vào opening | Quy I movement/read flow/context receiver optional | c1_keeper_recirculate | Không required chống dòng mạnh/tank; band finite/gap và recovery, baseline escape before active | Current band không phủ main response lanes, no overlap offensive trap | Current+wall sweep stop/slide, invalid layout revise/defer, no force→damage ngầm |
| Flank/đợi nhả, đánh body đúng window | Quy I Chấn Mai và positioning | c1_keeper_brace | Scoped front mitigation, mandatory release/opening, no perma immunity/shield-break condition | Flank/collision clearance đủ cho core/head approach | Không damage được main basic vì resistance/hitbox thì validator FAIL; sửa boss, no new elemental unlock |
| Đọc hai locked lane/order, di chuyển theo lối an toàn | Quy I movement/brake/basic sau combo | c1_keeper_split_release | Both lanes preview trước release, no retarget pulse2, no phaseII speed surprise; recovery reachable | Authored safe corridor, no current-band coactive trap | Nếu không tới lane an toàn trong accessible motion/latency budget thì giảm/đổi attack geometry/timing, không require brace/roll/three HP pools |
| Thử xả có kiểm chứng khi lựa chọn tactic/trial | CAP_STRUCTURE_OPERATE I/read flow, no combat spell | c1_env_bypass_shunt | Interact ở recovery safe window, thao tác đơn acknowledged; không hold chính xác dưới unavoidable fire | E03 bypass proof/current source/refuge-valid receiver interface | Invalid source/revision/placement báo lý do/retry, no persistent ecology harm hoặc E05 auto |

Optional eligible short brace mitigate một số front hits, Vành Nước tạo khoảng/đáp receiver nếu assigned, optional forms/II/III utility có thể thay strategy khi equipped/usable. Không technique nào là only safe response hoặc điều kiện damage meaningful. Side quests S22 chỉ knowledge/local convenience, không armor/cost/stat cần để encounter viable; all optional completions rỗng vẫn same route.

## Standard combat route và trial convergence

Standard: E03→H prep→accepted attempt→đọc/move/punish bằng Chấn Mai qua phases→accepted boss combat defeat/disposition theo health/outcome rule→coordinator xác thực E03 proof/refuge và keeper cho phép thử G→E04 atomic result. Recommended boss HP0 là **nhượng thế/không cần chết**, không species capture. HP0 không chỉ animation; source/outcome qualification và simultaneous player-incapacity policy phải resolve trước commit.

Alternative PROPOSED sau core route thử được: dùng cùng attempt/receiver/pattern windows để chứng minh return-flow local. Accepted test ack phải có actual operation trong H, valid E03 bypass/source/outlet/refuge evidence và guardian cease-block disposition; E03 alone/skip thoại/reputation không auto win. Có thể giảm phần trao đổi damage, không hai questline/loot/ending khác. Final alternative requirements/tuning/cognition/source binding còn B23-U03/U04/U05, không runtime-ready chỉ vì nêu path.

## Fairness tuning methodology — chưa có số đo

| Chiều | Mục tiêu qualitative / phương pháp kiểm sau này |
| --- | --- |
| Learning curve | PhaseI cue đơn và opening rõ trước current/order refinement; first phaseII cue đủ đọc |
| Damage tolerance | Mục tiêu cho phép lỗi đọc cue thông thường có cơ hội lấy lại vị trí theo health model được duyệt; không one-shot mặc định/đòi perfect run hoặc ba dạng khỏe |
| Reaction speed/input | Prototype đo accepted input/latency/braking/distance-to-safe-lane trước chốt windup/range, no frame-perfect gate |
| Attack frequency/recovery | Hụt đòn vẫn recovery, thời gian reposition/counter meaningful, không chain stun/perfect AI chase |
| Position/hazards | No wall pin/unavoidable coverage, cover/lane rõ với camera/envelope actual; move path không cần guard |
| Optional advantage | So no-side-quest/QuyI baseline với extra forms/guard/Vành Nước, advantages không thành power prerequisite |
| Feedback/readability | FXoff/audiooff/reducedmotion/small display vẫn pose/lock/line/gap/recover cue hiểu được |

Iterate theo thứ tự: anatomical blockout + sweep single attack→verify all directions/LOS/wall/turn/input latency→add pressure/brace với valid openings→add one phaseII pattern each time/space budget→Quy-only/no guard/no spell/no optional rewards run→retry/HP0/simultaneous outcome/migration/device matrix. Record failed cue/counter attempts và revise boss/layout/timing, không giải bằng tăng player unlock. No final HP/damage/frames/speed/performance/playtested claims tại Task23.
