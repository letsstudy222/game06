# Đòn đánh thường

**PROPOSED C14-P03**. [C04 abilities](../gameplay/SACRED_CREATURE_ABILITIES.md) giữ ID/gates, không catalog thứ hai. Mỗi attack startup→active window(s)→recovery; accept khác release/contact. Không số giây/frame/reach cuối, không combo dài bắt buộc.

| Reference/style | Startup → active → recovery | Target/reach/geometry | Movement, attribution, element | Confirm/animation |
| --- | --- | --- | --- | --- |
| quy_basic / Chấn Mai | Hạ trụ/nạp vai → một contact → thu thân | Arc trước mai, cận, facing khóa tại marker | Tiến ngắn collision, turn giới hạn; cast/source form immutable; physical pressure, Thủy không auto thêm channel | Impact/block/miss; hạ đầu/contact/thu, không spam stun |
| phuong_basic / Dực Trảm | Thu cánh → quét → thu lại | Arc trước, không cả đuôi trang trí | Reposition theo profile, không free flight; physical cánh/móng, Hỏa không auto burn | Cánh/contact/recover thật; flash chừa sườn |
| long_basic / Phong Nhận | Ngực/đầu lấy nhịp, chi cắt → release lưỡi gió → hãm, đuôi theo | Projectile/crescent trung theo lane trước như C04 | Turn giới hạn trước release, clearance thân dài; Phong identity, channel explicit | Đầu/lane/đạn rõ, thân không hitbox toàn màn |
| ly_basic / Chi Diệp Quét | Hạ gạc/chi lấy đà → quét cành/lực chi trước → thu | Arc trước cận, hướng contact như C04; gạc trang trí không auto-hit | Ground maneuver có commit; Mộc không Life true damage/heal | Gạc/chi/contact/recover đúng anatomy, miss vẫn recovery |

Cả bốn ID/tên lấy đúng C04 và vẫn PROPOSED; Task14 không tự grant/đổi kiểu chiêu hoặc thêm discharge cho Ly. Reusable variants dưới là vocabulary cho species khác nếu được duyệt, không thay C04 basics. Charged strike có hold cap/vulnerable charge và release policy. Thrust dùng swept narrow shape; sweep có arc giới hạn; discharge kiểm range/obstacle. Multi-hit cần authored window ordinal/budget, không hit theo FPS.

`castId + windowOrdinal + targetCombatantId + hitGroup` dedupe theo [damage](DAMAGE_RESOLUTION.md). Shapes cùng window hợp lại; multi-target theo target/budget policy, một enemy nhiều hurtboxes không nhân damage. Projectile single-hit expire theo contact rule; piercing/multi-hit có explicit cap và budget. Miss không hoàn cooldown nhờ switch/đổi hướng.

Aim có thể track trong startup nhưng khóa trước active theo definition; không retarget vô hạn sau warning. Reach theo world anchor, không camera zoom/bloom. Basic không tự phá door/receiver hoặc apply status bởi tên element. Hit confirm tách damage/block/scoped immunity/miss; VFX/SFX đọc DamageResult, không gây hit lần nữa. Missing clip/marker là readiness gap, không dùng idle thay attack hoặc sửa Phoenix trong Task14.
