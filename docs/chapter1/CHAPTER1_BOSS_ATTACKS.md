# Five-action set — telegraph, commit, active, recover

**PROPOSED B23-P04**, C14 [action](../combat/ACTIVE_SKILL_SYSTEM.md)/[hit collision](../combat/HITBOX_AND_COLLISION.md)/[damage](../combat/DAMAGE_RESOLUTION.md)/[AI](../combat/ENEMY_AI_DESIGN.md) giữ pipeline. Bốn offensive patterns và một defensive action, không boss code/data/frames đã chốt. Numeric damage/speed/range/duration/cost/thresholds tiếp tục UNRESOLVED. Primary movement/basic counterpath phải còn nếu guard/Vành Nước chưa được duyệt.

## c1_keeper_sweep / Quét Kẹp Thấp

| Field | Contract đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_sweep / Quét Kẹp Thấp |
| Narrative / anatomy | Chi trước mở ngang rồi quét để đẩy kẻ xâm nhập khỏi outlet; no invisible appendage |
| Startup telegraph | Forearm nâng/mở và arc shape trước thân, hướng lock tại marker báo rõ; không chase aim tới impact |
| Active window | Một swept arc gần theo chi/core trong authored contact window, một ordinal/target; body motion ngắn sweep collision |
| Recovery window | Thu chi/ghì lại, core và sườn accessible Chấn Mai; hụt vẫn có recovery, no instant cancel into pressure |
| Targeting | Chọn perceived target/last direction trong range/LOS rồi lock, target combatantId stable qua form switch |
| Hitbox concept | Frontal arc/capsule sweep theo anatomy anchor/world plane, không entire sprite/FX hoặc wall-through |
| Elemental properties | Contact/impact channel theo C14 profile; Water affinity không tự thêm Wet/extra hit |
| Status effects | No mandatory stun/root/Wet; push nếu eligible theo budget, no chain-lock |
| Environmental interaction | Không phá receiver/cover/refuge hoặc đổi permanent world bằng chi quét |
| Player counterplay | Bơi/hãm ra sườn hoặc ra ngoài arc trước contact, quay vào recovery basic; safe corridor kiểm trước select |
| Defensive response | Movement baseline đủ; short brace frontal eligible nếu approved nhưng sườn/sau vẫn vulnerable, không i-frame required |
| Visual / audio feedback | Arc outline+pose, contact edge/burst nhỏ và âm kẹp tùy chọn; miss không fake hit |
| Balance risks | Tracking sau lock/arc quá rộng/wall pin/multi-frame damage hoặc recovery quá ngắn |
| Required clips | sweep_anticipate, sweep_contact, sweep_recover, turn/reposition compatible, hit/cancel markers |
| Implementation gate | Chưa range/duration/damage/tuning; validate accessible Quy I movement/animation/shape before ready |

## c1_keeper_pressure / Xả Áp Theo Rãnh

| Field | Contract đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_pressure / Xả Áp Theo Rãnh |
| Narrative / anatomy | Vent/khe chi trước dẫn một nhịp nước từ nguồn local đã có, không tạo biển hoặc affinity mới |
| Startup telegraph | Rãnh trên thân mở theo hướng, preview line/endpoints + vent pose; aim commit marker rõ |
| Active window | Pulse/pressure projectile finite theo đường locked, swept hit/world obstruction/layer eligible; no continuous homing |
| Recovery window | Đóng vent/thu chi, idle-recover đủ cho di chuyển/tiếp cận basic, không counter instant |
| Targeting | Perceived target vector tại lock, no lead từ input tương lai/reserve stats; switch không xóa target/ledger |
| Hitbox concept | Finite swept line/capsule projectile, cover collider chặn theo explicit material rule, no ray xuyên toàn arena |
| Elemental properties | Water candidate packet theo E09/C14 budget; không inherent electrical/steam hoặc full ocean hit |
| Status effects | Displacement nhẹ nếu definition cho; Wet chỉ explicit status component, không default every pulse; no unavoidable stun |
| Environmental interaction | Static breakwater có LOS cue chặn pulse, không persistent destruction; receiver transient path only via authorized intent |
| Player counterplay | Sidestep khỏi preview trước release hoặc dùng cover valid; move đường quanh luôn có, counter lúc vent đóng |
| Defensive response | Short brace có thể mitigate eligible front nếu approved, không mandatory immunity/resistance/roll |
| Visual / audio feedback | Nét hướng có đầu–đuôi, pulse mép rõ/vent sound optional, lowFX giữ silhouette và line |
| Balance risks | Width/speed vượt Quy I response/latency, cover không đọc được, hit effect trùng direct/status budget |
| Required clips | vent_charge, pressure_release, vent_recover; projectile/cue separate from body; lock/release/impact markers |
| Implementation gate | Line/LOS/force/resistance/markers cần prototype; no exact speed/frame/damage numbers |

## c1_keeper_recirculate / Vành Dòng Lệch

| Field | Contract đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_recirculate / Vành Dòng Lệch |
| Narrative / anatomy | Keeper chuyển lực ở outlet tạo một dải cong local, không nắm mọi nước trong region |
| Startup telegraph | Preview dải cong và lane trống/outlet thoát, chi giữ điểm tựa; phaseII first use có warning rõ trước active |
| Active window | Một field displacement hữu hạn, không hút vô hạn/tick damage bí mật; core default movement hazard không thêm DoT |
| Recovery window | Band suy/tắt và keeper nhả điểm tựa, recovery basic được reachable; không next offensive pattern khi field còn loại bỏ safe response |
| Targeting | Chọn vùng/đường đã author hợp arena, no follow player marker mỗi tick sau commit |
| Hitbox concept | Field shape riêng current band, không glow rect; movement coordinator + sweep, no ignore collider/forced free damage |
| Elemental properties | Water flow/environment context, không elemental reaction output tự chain |
| Status effects | No root/slow overlay bắt buộc; current force không status tax vô hạn, no all-water immunity |
| Environmental interaction | Receiver thử xả có thể reduce field về weak lane nếu nguồn/permission đúng; không E05 patch, cover không bít return |
| Player counterplay | Đọc lane trống/di chuyển ra trước field, hãm tại refuge pocket, approach core khi nhả; không cần cast skill |
| Defensive response | Movement baseline; Quy passive/brace chỉ giúp nếu có support và eligible, không tank arbitrary pressure |
| Visual / audio feedback | Dải rìa/nét vector/exit gap + pose; âm nước chỉ bổ sung, reduced-motion static outline đủ |
| Balance risks | Field phủ arena/TTL đóng đường về, force pin wall, stack pressure attack thành trap; selection phải reject |
| Required clips | outlet_set, current_hold, outlet_release, recover; field preview/active/fade separated |
| Implementation gate | PhaseII only core proposal, current caps/lifetime/source/space budget cần duyệt/test; no fluid engine |

## c1_keeper_brace / Ghì Giáp Giữ Van

| Field | Contract đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_brace / Ghì Giáp Giữ Van |
| Narrative / anatomy | Boss ghì chi trước vào nền giữ hướng/outlet, reposition/thở lại có mục đích |
| Startup telegraph | Chi hạ tựa/giáp nghiêng sector, gap sườn vẫn đọc được |
| Active window | Finite defensive posture/reposition, không offensive hit ngoài definition hoặc permanent invulnerability |
| Recovery window | Bắt buộc nhả thế/thu chân sau hold theo authored rule; một opening basic luôn tồn tại không cần phá shield |
| Targeting | Giữ hướng committed, không xoay tức thời che mọi player side, no perfect counter input |
| Hitbox concept | Defense sector modifier đúng C14 owner; core hurtbox tồn tại, không second shield HP bar |
| Elemental properties | Scoped mitigation chưa số, Water affiliation không blanket immunity hoặc passive regen |
| Status effects | Không auto cleanse/refresh CC budget hoặc full-heal khi vào stance |
| Environmental interaction | Có thể trả outlet về neutral attempt setting theo accepted action, không close main route/refuge dưới thân |
| Player counterplay | Flank ngoài sector hoặc chờ nhả rồi Chấn Mai; không required stagger/ranged skill/element weakness |
| Defensive response | Giữ khoảng/di chuyển có chủ đích, không universal dodge key hoặc phải guard trade damage |
| Visual / audio feedback | Chi ghì/dấu sector và cue nhả rõ, hurt-side khác blocked front, âm scrape optional |
| Balance risks | Turtle forever/lặp brace không opening/nhìn giống Quy; forbid action loop che mọi damage |
| Required clips | brace_enter, brace_hold, brace_release, side_hurt, scoped_block; reposition/anchors consistent |
| Implementation gate | Hold/mitigation/budget/cancel chưa approve; core action selector phải bảo đảm release/damageable windows |

## c1_keeper_split_release / Xả Nhịp So Le

| Field | Contract đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_split_release / Xả Nhịp So Le |
| Narrative / anatomy | Refinement của pressure sau phaseII: hai vent hướng so le, không anatomy/evolution mới |
| Startup telegraph | Cả hai lane hướng được vẽ trước, thứ tự có dấu/nét/pose, cùng commit snapshot; không update lane2 để bắt né lane1 |
| Active window | Hai authored pulses nối tiếp trong cùng cast/budget, mỗi ordinal dedupe; quãng chuyển/space cho Quy I reposition, không unavoidable combo |
| Recovery window | Thu cả chi/vent với recovery rõ tương xứng, basic punish sau cả chuỗi; không early followup che lane an toàn |
| Targeting | Lane directions locked trước first release theo admissible layout, không retarget second pulse từ live input/switch |
| Hitbox concept | Same swept pressure shapes/cover/layers như pressure, ordinal set trong một rootCast; no damage nhân qua duplicate shapes |
| Elemental properties | Water candidate, total effect/control budget chia trong pattern, không full reaction base mỗi pulse |
| Status effects | No mandatory hitstun chain/stack Wet weakness; immunity/recovery family policy E09/C14, no stagger-lock |
| Environmental interaction | Cover/empty lane vẫn viable, no stack area-current band đang active theo core default |
| Player counterplay | Đọc thứ tự/lane trống, đi theo safe corridor đã author và chờ recovery; nếu không có valid Quy I route thì pattern invalid |
| Defensive response | Movement baseline, optional eligible guard từng pulse nếu approved; không yêu cầu perfect parry/ba health bars |
| Visual / audio feedback | Lane1/lane2 distinct symbol/pose, âm hai nhịp tùy chọn, reducedFX giữ toàn preview |
| Balance risks | Homing pulse2/unfair reaction speed/repeated guard budget exploits/small-screen crop; giảm pattern/đổi layout thay buff bắt buộc |
| Required clips | split_charge, first_release, shift_pose, second_release, split_recover; preview/release/hit ordinal markers |
| Implementation gate | PhaseII variant sau khi pressure đã giới thiệu, thresholds/timing/damage/input-latency/animation chưa final |

## Scheduling và elemental-safe hits

Core default không đồng thời hai offensive patterns. Active field/released projectile vẫn tính spatial/concurrency budget tới expiry/retire; phase hoặc switch không reset chúng hay tạo attack copy. Pattern không admissible vì LOS/arena/active body/safe corridor thì OBSERVE/REPOSITION/RECOVER, không instant fallback hit. Telegraph lock marker rõ, boss không peek future input/reserve loadout hoặc quay aim tới impact.

Một accepted cast snapshot giữ source/stage/config/layer/owner, hit dedupe rootCast+ordinal+target combatant theo C14; switch form không target mới để ăn lại same ordinal. Interrupt trước release đóng unreleased windows theo profile, released effects theo lifetime/explicit retire policy; animation callbacks không emit hit nếu action đã cancel. No touching oversized sprite=damage, no HP/guard pool mới ở renderer. E09 status/reaction output non-reactive default, pressure/current không free cleanse hoặc permanent world receiver patch.

Mỗi pattern có route rút/counterattack **kiểm được với Quy I** ở [matrix](CHAPTER1_BOSS_QUY_COUNTERPLAY.md); physical clearance/timing/camera/input-latency phải test sau. Nếu thiếu safe route/opening, sửa boss range/targeting/force/layout/recovery, không cấp new mandatory iframe/skill/element/stage. Optional collect/reward không làm baseline only viable.
