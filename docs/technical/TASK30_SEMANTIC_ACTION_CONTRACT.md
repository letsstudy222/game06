# ActionFrame và ngữ cảnh input

Nguồn code: [SemanticInput](../../src/island/SemanticInput.mjs). Không đọc creature name, actor HP, save, reward hoặc quest.

| Dữ liệu | Ngữ nghĩa |
| --- | --- |
| move_x / move_y | Vector intent độ dài tối đa 1; keyboard chuẩn hóa diagonal, touch giữ magnitude analog |
| aim_x / aim_y | Hướng chuẩn hóa độc lập move; giữ hướng hợp lệ cuối khi pointer zero/rời Canvas |
| actions | basic_attack, skill_primary, skill_secondary, defend, dodge, interact, switch_form_1/2/3, pause |
| pressed | Có ít nhất một nguồn vật lý đang giữ action |
| justPressed / justReleased | Edge tích lũy trong frame hiện tại; tap nhanh có thể có cả hai và pressed=false |
| sequence / generation | sequence tăng ở endFrame; generation tăng khi clear/context/remap, không phải persistent ID |
| directions | Category move/aim riêng theo direction8 Task 28; idle move=null |

`setAction` gộp theo source token: nhả mouse không nhả action còn giữ từ keyboard. Repeat/held keydown không tạo edge mới. `snapshot` readonly, không tự xóa edge; `consume(action)` trả trạng thái một lần và che action với consumer sau trong frame. `endFrame()` xóa edges/consumption, giữ level đang nhấn. Owner phải gọi đúng một lần; không có buffer combat vượt frame hoặc tự cast lại.

Keyboard có ưu tiên khi bất kỳ phím hướng đang giữ, kể cả hai hướng đối nghịch triệt tiêu; không cộng với touch để tăng tốc. Khi keyboard không giữ hướng thì touch có thể cung cấp intent. Normalization và context không tự ghi vận tốc actor.

| Context | Cho phép | Chặn |
| --- | --- | --- |
| gameplay / debug | Move, aim và các actions đã khai báo | Không tự grant ability chỉ vì action tồn tại |
| dialogue | interact, pause | Move, aim, attack, dodge và switch |
| menu / pause | pause | Gameplay actions và axes |
| cutscene | pause | Move, aim và mọi action còn lại |

Đổi context clear raw held, pointers và edges; giữ last valid aim trong scope nhưng không phơi aim axis khi context chặn. Focus lại cần input mới, không replay attack/dodge. Đây là policy adapter kỹ thuật, không quyết định cutscene/quest progression hoặc pause behavior combat.

Bindings tập trung trong DEFAULT_INPUT_BINDINGS; remap kiểm conflict movement/action và giữ Escape cho pause. Chỉ remap trong bộ nhớ, không control-settings screen, controller backend hoặc storage mới. skill_secondary/defend có semantic ID nhưng chưa có default binding hay gameplay implementation.
