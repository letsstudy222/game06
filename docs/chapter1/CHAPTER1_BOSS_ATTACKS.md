# Five-action set — telegraph, commit, active, recover

**PROPOSED B23-P04**, C14 [action](../combat/ACTIVE_SKILL_SYSTEM.md)/[hit collision](../combat/HITBOX_AND_COLLISION.md)/[damage](../combat/DAMAGE_RESOLUTION.md)/[AI](../combat/ENEMY_AI_DESIGN.md) giữ pipeline. Bốn offensive patterns và một defensive action, không boss code/data/frames đã chốt. Numeric damage/speed/range/duration/cost/thresholds tiếp tục UNRESOLVED. Primary movement/basic counterpath phải còn nếu guard/Vành Nước chưa được duyệt.

## c1_keeper_sweep / Quét Kẹp Thấp

| Trường | Hợp đồng đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_sweep / Quét Kẹp Thấp |
| Truyện kể / giải phẫu | Chi trước mở ngang rồi quét để đẩy kẻ xâm nhập khỏi outlet; no invisible appendage |
| Dấu báo khởi động | Forearm nâng/mở và arc shape trước thân, hướng lock tại marker báo rõ; không chase aim tới impact |
| Khoảng tác dụng | Một swept arc gần theo chi/core trong authored contact window, một ordinal/target; body motion ngắn sweep collision |
| Khoảng phục hồi | Thu chi/ghì lại, core và sườn accessible Chấn Mai; hụt vẫn có recovery, no instant cancel into pressure |
| Chọn mục tiêu | Chọn perceived target/last direction trong range/LOS rồi lock, target combatantId stable qua form switch |
| Khái niệm hitbox | Frontal arc/capsule sweep theo anatomy anchor/world plane, không entire sprite/FX hoặc wall-through |
| Thuộc tính nguyên tố | Contact/impact channel theo C14 profile; Water affinity không tự thêm Wet/extra hit |
| Hiệu ứng trạng thái | No mandatory stun/root/Wet; push nếu eligible theo budget, no chain-lock |
| Tương tác môi trường | Không phá receiver/cover/refuge hoặc đổi permanent world bằng chi quét |
| Cách đối phó của người chơi | Bơi/hãm ra sườn hoặc ra ngoài arc trước contact, quay vào recovery basic; safe corridor kiểm trước select |
| Phản ứng phòng thủ | Movement baseline đủ; short brace frontal eligible nếu approved nhưng sườn/sau vẫn vulnerable, không i-frame required |
| Phản hồi hình ảnh / âm thanh | Arc outline+pose, contact edge/burst nhỏ và âm kẹp tùy chọn; miss không fake hit |
| Rủi ro cân bằng | Tracking sau lock/arc quá rộng/wall pin/multi-frame damage hoặc recovery quá ngắn |
| Clip bắt buộc | sweep_anticipate, sweep_contact, sweep_recover, turn/reposition compatible, hit/cancel markers |
| Điều kiện triển khai | Chưa range/duration/damage/tuning; validate accessible Quy I movement/animation/shape before ready |

## c1_keeper_pressure / Xả Áp Theo Rãnh

| Trường | Hợp đồng đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_pressure / Xả Áp Theo Rãnh |
| Truyện kể / giải phẫu | Vent/khe chi trước dẫn một nhịp nước từ nguồn local đã có, không tạo biển hoặc affinity mới |
| Dấu báo khởi động | Rãnh trên thân mở theo hướng, preview line/endpoints + vent pose; aim commit marker rõ |
| Khoảng tác dụng | Pulse/pressure projectile finite theo đường locked, swept hit/world obstruction/layer eligible; no continuous homing |
| Khoảng phục hồi | Đóng vent/thu chi, idle-recover đủ cho di chuyển/tiếp cận basic, không counter instant |
| Chọn mục tiêu | Perceived target vector tại lock, no lead từ input tương lai/reserve stats; switch không xóa target/ledger |
| Khái niệm hitbox | Finite swept line/capsule projectile, cover collider chặn theo explicit material rule, no ray xuyên toàn arena |
| Thuộc tính nguyên tố | Water candidate packet theo E09/C14 budget; không inherent electrical/steam hoặc full ocean hit |
| Hiệu ứng trạng thái | Displacement nhẹ nếu definition cho; Wet chỉ explicit status component, không default every pulse; no unavoidable stun |
| Tương tác môi trường | Static breakwater có LOS cue chặn pulse, không persistent destruction; receiver transient path only via authorized intent |
| Cách đối phó của người chơi | Sidestep khỏi preview trước release hoặc dùng cover valid; move đường quanh luôn có, counter lúc vent đóng |
| Phản ứng phòng thủ | Short brace có thể mitigate eligible front nếu approved, không mandatory immunity/resistance/roll |
| Phản hồi hình ảnh / âm thanh | Nét hướng có đầu–đuôi, pulse mép rõ/vent sound optional, lowFX giữ silhouette và line |
| Rủi ro cân bằng | Width/speed vượt Quy I response/latency, cover không đọc được, hit effect trùng direct/status budget |
| Clip bắt buộc | vent_charge, pressure_release, vent_recover; projectile/cue separate from body; lock/release/impact markers |
| Điều kiện triển khai | Line/LOS/force/resistance/markers cần prototype; no exact speed/frame/damage numbers |

## c1_keeper_recirculate / Vành Dòng Lệch

| Trường | Hợp đồng đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_recirculate / Vành Dòng Lệch |
| Truyện kể / giải phẫu | Keeper chuyển lực ở outlet tạo một dải cong local, không nắm mọi nước trong region |
| Dấu báo khởi động | Preview dải cong và lane trống/outlet thoát, chi giữ điểm tựa; phaseII first use có warning rõ trước active |
| Khoảng tác dụng | Một field displacement hữu hạn, không hút vô hạn/tick damage bí mật; core default movement hazard không thêm DoT |
| Khoảng phục hồi | Band suy/tắt và keeper nhả điểm tựa, recovery basic được reachable; không next offensive pattern khi field còn loại bỏ safe response |
| Chọn mục tiêu | Chọn vùng/đường đã author hợp arena, no follow player marker mỗi tick sau commit |
| Khái niệm hitbox | Field shape riêng current band, không glow rect; movement coordinator + sweep, no ignore collider/forced free damage |
| Thuộc tính nguyên tố | Water flow/environment context, không elemental reaction output tự chain |
| Hiệu ứng trạng thái | No root/slow overlay bắt buộc; current force không status tax vô hạn, no all-water immunity |
| Tương tác môi trường | Receiver thử xả có thể reduce field về weak lane nếu nguồn/permission đúng; không E05 patch, cover không bít return |
| Cách đối phó của người chơi | Đọc lane trống/di chuyển ra trước field, hãm tại refuge pocket, approach core khi nhả; không cần cast skill |
| Phản ứng phòng thủ | Movement baseline; Quy passive/brace chỉ giúp nếu có support và eligible, không tank arbitrary pressure |
| Phản hồi hình ảnh / âm thanh | Dải rìa/nét vector/exit gap + pose; âm nước chỉ bổ sung, reduced-motion static outline đủ |
| Rủi ro cân bằng | Field phủ arena/TTL đóng đường về, force pin wall, stack pressure attack thành trap; selection phải reject |
| Clip bắt buộc | outlet_set, current_hold, outlet_release, recover; field preview/active/fade separated |
| Điều kiện triển khai | PhaseII only core proposal, current caps/lifetime/source/space budget cần duyệt/test; no fluid engine |

## c1_keeper_brace / Ghì Giáp Giữ Van

| Trường | Hợp đồng đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_brace / Ghì Giáp Giữ Van |
| Truyện kể / giải phẫu | Boss ghì chi trước vào nền giữ hướng/outlet, reposition/thở lại có mục đích |
| Dấu báo khởi động | Chi hạ tựa/giáp nghiêng sector, gap sườn vẫn đọc được |
| Khoảng tác dụng | Finite defensive posture/reposition, không offensive hit ngoài definition hoặc permanent invulnerability |
| Khoảng phục hồi | Bắt buộc nhả thế/thu chân sau hold theo authored rule; một opening basic luôn tồn tại không cần phá shield |
| Chọn mục tiêu | Giữ hướng committed, không xoay tức thời che mọi player side, no perfect counter input |
| Khái niệm hitbox | Defense sector modifier đúng C14 owner; core hurtbox tồn tại, không second shield HP bar |
| Thuộc tính nguyên tố | Scoped mitigation chưa số, Water affiliation không blanket immunity hoặc passive regen |
| Hiệu ứng trạng thái | Không auto cleanse/refresh CC budget hoặc full-heal khi vào stance |
| Tương tác môi trường | Có thể trả outlet về neutral attempt setting theo accepted action, không close main route/refuge dưới thân |
| Cách đối phó của người chơi | Flank ngoài sector hoặc chờ nhả rồi Chấn Mai; không required stagger/ranged skill/element weakness |
| Phản ứng phòng thủ | Giữ khoảng/di chuyển có chủ đích, không universal dodge key hoặc phải guard trade damage |
| Phản hồi hình ảnh / âm thanh | Chi ghì/dấu sector và cue nhả rõ, hurt-side khác blocked front, âm scrape optional |
| Rủi ro cân bằng | Turtle forever/lặp brace không opening/nhìn giống Quy; forbid action loop che mọi damage |
| Clip bắt buộc | brace_enter, brace_hold, brace_release, side_hurt, scoped_block; reposition/anchors consistent |
| Điều kiện triển khai | Hold/mitigation/budget/cancel chưa approve; core action selector phải bảo đảm release/damageable windows |

## c1_keeper_split_release / Xả Nhịp So Le

| Trường | Hợp đồng đề xuất |
| --- | --- |
| attackId / tên Việt | c1_keeper_split_release / Xả Nhịp So Le |
| Truyện kể / giải phẫu | Refinement của pressure sau phaseII: hai vent hướng so le, không anatomy/evolution mới |
| Dấu báo khởi động | Cả hai lane hướng được vẽ trước, thứ tự có dấu/nét/pose, cùng commit snapshot; không update lane2 để bắt né lane1 |
| Khoảng tác dụng | Hai authored pulses nối tiếp trong cùng cast/budget, mỗi ordinal dedupe; quãng chuyển/space cho Quy I reposition, không unavoidable combo |
| Khoảng phục hồi | Thu cả chi/vent với recovery rõ tương xứng, basic punish sau cả chuỗi; không early followup che lane an toàn |
| Chọn mục tiêu | Lane directions locked trước first release theo admissible layout, không retarget second pulse từ live input/switch |
| Khái niệm hitbox | Same swept pressure shapes/cover/layers như pressure, ordinal set trong một rootCast; no damage nhân qua duplicate shapes |
| Thuộc tính nguyên tố | Water candidate, total effect/control budget chia trong pattern, không full reaction base mỗi pulse |
| Hiệu ứng trạng thái | No mandatory hitstun chain/stack Wet weakness; immunity/recovery family policy E09/C14, no stagger-lock |
| Tương tác môi trường | Cover/empty lane vẫn viable, no stack area-current band đang active theo core default |
| Cách đối phó của người chơi | Đọc thứ tự/lane trống, đi theo safe corridor đã author và chờ recovery; nếu không có valid Quy I route thì pattern invalid |
| Phản ứng phòng thủ | Movement baseline, optional eligible guard từng pulse nếu approved; không yêu cầu perfect parry/ba health bars |
| Phản hồi hình ảnh / âm thanh | Lane1/lane2 distinct symbol/pose, âm hai nhịp tùy chọn, reducedFX giữ toàn preview |
| Rủi ro cân bằng | Homing pulse2/unfair reaction speed/repeated guard budget exploits/small-screen crop; giảm pattern/đổi layout thay buff bắt buộc |
| Clip bắt buộc | split_charge, first_release, shift_pose, second_release, split_recover; preview/release/hit ordinal markers |
| Điều kiện triển khai | PhaseII variant sau khi pressure đã giới thiệu, thresholds/timing/damage/input-latency/animation chưa final |

## Scheduling và elemental-safe hits

Core default không đồng thời hai offensive patterns. Active field/released projectile vẫn tính spatial/concurrency budget tới expiry/retire; phase hoặc switch không reset chúng hay tạo attack copy. Pattern không admissible vì LOS/arena/active body/safe corridor thì OBSERVE/REPOSITION/RECOVER, không instant fallback hit. Telegraph lock marker rõ, boss không peek future input/reserve loadout hoặc quay aim tới impact.

Một accepted cast snapshot giữ source/stage/config/layer/owner, hit dedupe rootCast+ordinal+target combatant theo C14; switch form không target mới để ăn lại same ordinal. Interrupt trước release đóng unreleased windows theo profile, released effects theo lifetime/explicit retire policy; animation callbacks không emit hit nếu action đã cancel. No touching oversized sprite=damage, no HP/guard pool mới ở renderer. E09 status/reaction output non-reactive default, pressure/current không free cleanse hoặc permanent world receiver patch.

Mỗi pattern có route rút/counterattack **kiểm được với Quy I** ở [matrix](CHAPTER1_BOSS_QUY_COUNTERPLAY.md); physical clearance/timing/camera/input-latency phải test sau. Nếu thiếu safe route/opening, sửa boss range/targeting/force/layout/recovery, không cấp new mandatory iframe/skill/element/stage. Optional collect/reward không làm baseline only viable.
