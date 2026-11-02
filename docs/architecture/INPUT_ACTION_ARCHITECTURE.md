# Input semantic và độc lập thiết bị

**PROPOSED**. [InputManager](../../src/island/InputManager.mjs) hiện gắn DOM listeners và gọi state trực tiếp; joystick8hướng, clear khi blur/hidden; [ActionButtons](../../src/island/ActionButtons.mjs) giữ pointer capture. Task26 không đổi controls.

| Action đề xuất | Loại / scope | Binding và gate |
| --- | --- | --- |
| move_x, move_y | Analog level cho S0 | WASD/arrows có thể tái dùng; touch vector qua adapter; mapping Quy chưa chốt |
| interact | Edge cho S0 | E là binding Phượng hiện tại, không tự là Quy canon |
| pause | Edge app/context | Escape/menu giữ Dawn; context transition chặn tác động gameplay |
| restart_scene | Edge demo | Explicit confirm khi cần; không reset storage hoặc hồi HP chính |
| basic_attack, defend, skill_primary | S1 hoặc scope được duyệt | Không ép guard/Water skill thành prerequisite S0 |
| switch_next | Sau khi có nhiều form hợp lệ | Không xuất hiện như required lesson khi chỉ Quy; boss freeze membership vẫn giữ |

Raw device state→binding/context resolver→ActionFrame `{levels,pressed,released,sequence,contextGeneration}` readonly→controller/command consumer. Một frame được consume một lần; renderer không đọc keyboard. Chặn browser repeat cho edge; vector keyboard/touch chọn policy ưu tiên rõ, normalized diagonal, không cộng để tăng tốc. Giữ adapter Dawn trả x/y/hover và attack/fire/interact cũ; không rename phím trong HTML lúc chưa implementation task.

Context BOOT/LOADING/PLAYING/MENU/TRANSITION xác định action hợp lệ; tên context là proposal. Remap kiểm xung đột reserved menu/scene action, cập nhật nhãn và xóa held cũ; không giữ một action bị mắc khi đổi binding. Keyup/pointercancel/lostcapture/blur/hidden/exit đều clear; focus lại đòi input mới, không replay interact/pause. Tách app pause khỏi scene command để không có hai listeners cùng toggle.

S0 chỉ cần move/interact/pause/restart; buffering gameplay mặc định không tự bật. S1 nếu cần buffer phải được C14 policy duyệt: giới hạn tuổi/kích thước, một consume, clear khi context/actor/scene đổi; không buffered attack xuyên menu/save lock. Pointer và keyboard không cấp nguồn reward mới. Task30 cần unit fake-device/context/remap, integration two-scene disposal, browser keyboard/touch/focus; đều NOT RUN cho API đề xuất.
