# Input và movement: baseline Phượng và khoảng cách Quy

Đọc [InputManager](../../src/island/InputManager.mjs), [MobileJoystick](../../src/island/MobileJoystick.mjs), [ActionButtons](../../src/island/ActionButtons.mjs), [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs), [GameMenu](../../src/island/GameMenu.mjs), [main](../../src/island/main.mjs). Browser suites kiểm keyboard, pointer và focus trên Dawn/sample; không kiểm Quy.

## Điều khiển đang hoạt động

| Đầu vào | Hành vi thực | Giới hạn |
| --- | --- | --- |
| WASD/mũi tên | Set keys, tạo x/y; keyboard có ưu tiên khi có hướng, không cộng với joystick | Chưa action map/remap theo loài; DOM listeners gắn toàn document |
| J/Space; K; E | attack; fire; interact ngay khi keydown không repeat | Đầu vào gọi state trực tiếp; chưa buffered cast/action coordinator |
| Shift trái/phải | Hover trong lúc giữ; nút touch giữ hoặc latch từ click bàn phím | Không là swim/brake/guard Quy được duyệt |
| Escape; H | Menu/pause; help, chặn một số focus input | Chưa mode prebody/resonance/lock-boss riêng |
| Joystick | Pointer capture một pointer, deadzone0.16 radius, hướng lượng tử8 chiều | Không analog speed theo độ kéo; profile deadzone chưa dành Quy |
| Action buttons | Pointerdown một action, capture/release/cancel/lostcapture; multi-pointer hover | Icon và SKILLS gắn Phượng; interaction chỉ proximity shrine |
| Blur/visibilitychange | clear keys/pad/hover và pointer resetters | Blur không tự pause clock khi trang vẫn visible; hidden bỏ update, không cộng elapsed offline |

Player.update chuẩn hóa vector bằng hypot: đường chéo không nhanh hơn. Speed64 khi đi,84 khi hover; vị trí += speed*dt qua moveWithCollision(radius7), dt được cap0.05. Không acceleration/deceleration/inertia; ngừng input thì ngừng chuyển động chủ ý. Facing giữ hướng cuối; renderer gom thành bốn hướng logic, mirror right. Player vẫn có thể di chuyển trong attack/fire theo logic hiện tại, không có movement permission do action phase tổng quát.

Không nâng các số hiện tại thành thông số Quy. Ngay cả việc chọn cùng x–y cũng chỉ là khuyến nghị tương thích code, chưa đóng gate B.

## Khoảng cách và thứ tự mở rộng PROPOSED

| Nhu cầu Quy | Có thể tái dùng | Thiếu / gate |
| --- | --- | --- |
| Input bơi/hãm/tương tác | Vector, pointer release/clear, menu focus | Gate C: ngữ nghĩa, remap/keyboard/touch, brake không đè phím cũ |
| Bơi có đáp ứng và đà hữu hạn | dt cap, hướng/facing, collision substeps | Acceleration/deceleration, giới hạn vận tốc và biến thể accessibility phải duyệt; không đặt số mới ở đây |
| Một dòng nước nhìn được | Tile water animation chỉ làm cue nền | Motion source/current volume, vector/cap/bounds và fallback blocked; không coi animation nước đã có lực |
| Hồ sơ theo sinh vật | AnimationController nhận definitions có thể mở rộng | Profile movement/collider/turn-envelope thuộc catalog typed; không switch theo tên từng loài trong core |
| Camera/thị giác | Float follow + integer render | Gate B/G, envelope Quy và dòng trong khung; không hover-lift giả bơi |
| Scene teardown | Input.resetters giúp clear | Listener disposal/unbind DOM và action gates khi load/error/pause, không input rơi sang scene mới |

Task30 chuẩn bị semantic input theo scope được duyệt; Tasks42–43 nhận controller/camera integration theo đề bài sau này. Task45 kiểm motion/collision. Có thể làm fixture keyboard nhỏ trước full touch polish; không được lấy thiếu mobile art làm lý do đổi mặc định Phượng. Chưa implement module hoặc chốt motion plane.

## Nghiệm thu tương lai

Đổi hướng/nhả phím, normalized diagonal, giữ brake, input khi menu/blur/hidden/rotate, simultaneous key+touch, current đẩy vào góc, timestep lớn và return anchor. Test keyboard/touch Dawn hiện tại phải giữ PASS. Các ca Quy này NOT RUN vì chưa có controller; không tính chúng vào browser PASS của Task25.
