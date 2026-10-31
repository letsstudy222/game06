# Vận động và phòng thủ

**PROPOSED C14-P06**, [decisions](TASK14_DECISIONS.md). Bản sắc D31 CONFIRMED; profile/defense chi tiết chưa approved. Không đổi Shift/hover/controller Phoenix hiện tại.

## Feel và anatomy

Input phải được sample/accept trong cùng simulation boundary phù hợp, feedback rõ khi reject; không đợi clip idle hết mới di chuyển. Acceleration, momentum, turn rate và animation timing theo loài, chưa có số. Motion có nguồn input/root motion/current/knockback; coordinator hợp thành displacement rồi sweep collision, không renderer tự kéo body lần hai. Animation foot/vây/ground projection khớp kết quả motion; turn smoothing không làm aim lén khác telegraph.

| Loài | Profile candidate | Attack movement / terrain / rủi ro |
| --- | --- | --- |
| Quy | Bước chắc, chuyển hướng có chủ đích, bơi có đà và hãm | Basic tiến ngắn; brace cần điểm tựa. Dòng nước là vector địa phương có cue, có lối thoát; không miễn áp lực mọi độ sâu |
| Phượng | Reposition trên không thấp/thermal, có đáp | AoE cơ động nhưng cast/recovery hữu hạn; shadow báo ground projection; không hover immunity toàn combat |
| Long | Directional aerial movement, turn envelope thân dài, gió | Ngắm lane/điều phối gió có commit; đầu/thân/đuôi đọc được, không xoay xuyên corridor hoặc lấy FX làm hurtbox |
| Ly | Agile ground, chọn trụ/anchor thực vật, support positioning | Đặt zone/hồi phục cần chỗ và source; dash/turn không xóa channel debt; không mọi Mộc creature cùng movement |

Bay/bơi dùng plane/layer contract ở [overview](COMBAT_SYSTEM_OVERVIEW.md), chưa free z-axis. Terrain/contact tolerance khác damage resistance. Current/knockback không xuyên wall; sweep phần hợp lệ rồi stop/slide theo rule, không chuyển phần displacement còn lại thành damage ngầm. Không khóa player giữa current và wall; authored safe exit/recovery phải tồn tại. Environmental movement không tick khi pause, không tăng tốc theo render FPS.

## So sánh defense

| Option | Entry/input priority | Vulnerability/trade-off | Counterplay/status/boss |
| --- | --- | --- | --- |
| Directional evade | Viable, route và cancel marker, defense intent trước basic | Commit hướng, end recovery; CD/cost policy | Enemy delay/area/landing pressure; root có thể chặn translation nhưng không tự cấm aim |
| Brief i-frame | Chỉ named subwindow/type filter, không cả evade | Finite window, no chain refresh bằng switch | Không xóa status đã accepted; hazard exemption chỉ explicit, warning không color-only |
| Guard mitigation | Facing/sector hợp lệ, brace window | Giảm cơ động, finite hold/budget, release/break recovery | Flank/pressure/declared unblockable; status onBlock/onContact policy |
| Timed block | Guard timing evidence explicit | Optional mastery, hụt vẫn ordinary guard nếu rule cho | Không main-story frame-perfect; không perfect block mọi boss strike |
| Counter | Trigger đã accepted + input window | Một cast/cost/recovery riêng | Boss window/CC family có giới hạn, không reflect/re-counter loop |
| Species defense | Capability/clip theo anatomy | Same safety contracts, khác posture/motion | Không ép turtle có bird roll hoặc mọi loài cùng animation |

Guard chỉ chặn eligible direction/channel, không invulnerability. Attack “unblockable” phải có cue hình/âm và alternative route với Quy; không tự cả boss ignore guard. Multi-hit tiêu shield budget mỗi authored ordinal, không mỗi overlapping shape. Guard break tạo window không re-enter bởi held key; healing không hoàn guard budget vô hạn. Evade i-frame nếu duyệt chỉ filter contact mới; burn/shared status tick và reaction eligibility xét riêng, không free cleanse. Chống stun bằng family recovery thay miễn toàn damage.

## Quy first combat demonstrator

Khuyến nghị **brace ngắn theo hướng, giảm damage/knockback phù hợp**, có thời gian giữ hữu hạn, release recovery và CD; không i-frame, perfect parry, energy meter hoặc auto-counter bắt buộc. Đây là action phòng thủ tối thiểu riêng, **không cấp sớm `quy_s2` stage II**: không dùng tên/đầy đủ Mai Định Áp hoặc benefits stage II cho Quy I. Cần duyệt defense capability/clip/mitigation group/cancel policy trước implementation. One basic + brace + simple water skill đủ thử timing/counterplay, không bắt dodge universal.
