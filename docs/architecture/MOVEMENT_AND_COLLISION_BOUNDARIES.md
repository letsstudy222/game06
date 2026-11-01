# Ranh giới movement, current, collision và camera

**PROPOSED**. [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs) hiện normalize input, speed64/84 và radius7; [geometry](../../src/island/geometry.mjs) chia bước khoảng2pixel, block deep/shallow/cliff. Những số đó không chuyển thành thông số Quy.

| Thành phần | Nhận / trả | Owner / điều cấm |
| --- | --- | --- |
| Input interpreter | ActionFrame→move/brake intent | Không ghi position, không tự apply current |
| Creature controller | Intent+motion state+profile+dt→desired displacement/velocity | Giữ velocity riêng instance, không camera transform |
| MovementProfile | Acceleration/brake/limits/capability refs khi duyệt | Catalog readonly, không XP/HP/canonical unlock |
| CurrentFieldQuery | Vị trí/layer→force intents và cue refs có bounds | Không teleport actor, không mọi nước đều cùng lực |
| Motion coordinator | Input/controller/current/knockback→một candidate | Compose đúng một lần, thứ tự/limits cần duyệt, không double integration |
| Collision solver | Candidate+shape+terrain policy→accepted pose/contacts | Quyết world position/bounds hợp lệ, blocked motion không tự damage |
| Camera | Pose/envelope/world→view transform | Không sửa world position để sprite nằm trong khung |

Phượng tiếp tục land/hover policy hiện tại; scene Quy dùng underwater passability riêng. Không đổi global deep/shallow thành passable; không thu sprite để qua khe. Visual envelope, footprint, hurtbox và hitbox không dùng một rect chung. Evolved body cần clearance/return trước transition, nhưng S0 chỉ stageI. Không triển khai physics 3D hoặc finalize plane vì chữ underwater.

Đánh giá Task28–30: so top-down x–y/side-on bằng prototype được giao sau approval; đo cue readability, atlas directions, keyboard/touch, camera bounds, solid corners và chiều dòng. Chọn projection trước production art/geometry; acceleration/speed/current force/clearance cần fixtures và approval, không cung cấp số mặc định ở đây. Task42 controller trước Task43 inertia/current,44camera,45collision integration; test geometry fixture tối thiểu ở29 cho phép thử controller mà không tạo vòng42↔45.

Restart S0 phục hồi spawn/velocity/current/local objective từ scene fixture, không gọi đó là HP recovery hoặc free cleanse. Motion lỗi nonfinite/out-of-bounds: từ chối candidate, giữ pose an toàn, log; nếu fixture không có spawn hợp lệ thì scene fail và fallback Dawn. Tests tương lai: diagonal,dt spike,brake/reverse,current+wall,corner/turn,envelope/camera, return; chưa thực thi cơ chế Quy.
