# Keyboard, mouse và tương thích Phượng

**CONFIRMED Task 30:** WASD/mũi tên, normalized diagonal; mouse aim độc lập move; left mouse là basic attack intent; Space là dodge intent trong adapter mới.

| Binding adapter mới | Intent |
| --- | --- |
| WASD / arrows | move_x, move_y; trái/phải và lên/xuống đối nghịch triệt tiêu |
| Mouse move trên Canvas | aim_x, aim_y qua screenToWorld và actor origin |
| Left mouse | basic_attack pressed/released |
| J | Alias basic_attack, không là damage command |
| K | skill_primary intent |
| E | interact intent |
| Space | dodge intent, không gọi attack hoặc di chuyển |
| 1 / 2 / 3 | switch_form_1/2/3 intent |
| Escape | pause intent; consumer sở hữu việc mở menu |

Right mouse → skill_primary vẫn **PROPOSED**: implementation cho phép binding opt-in và harness kiểm nó, nhưng DEFAULT_INPUT_BINDINGS không bật right mouse. Context menu chỉ bị ngăn trên Canvas khi binding phải đang được bật và action được context cho phép; không ngăn menu chuột phải toàn document.

BrowserInput không gọi GameState.use/interact. Mouse aim không ghi player.facing. Keyboard repeat hoặc keydown trùng không tạo edge; nhả một alias không xóa alias khác. Input vào text field, contenteditable, button/link được loại khỏi gameplay (Escape/pause vẫn dùng được); shortcut Ctrl/Meta/Alt không bị chiếm; focus UI clear held. Canvas pointer actions không nhận UI click bên ngoài.

Legacy Dawn giữ WASD/arrows, J/Space attack, K fire, Shift hover, E shrine, Escape/H menu/help. Không đổi HTML controls, animation hoặc combat. Space dodge và mouse aim mới chỉ hoạt động qua opt-in adapter/harness; không giả vờ Phượng đã dùng targeting mới. Future scene integration phải chọn đúng một input owner, không chồng hai profile cùng surface.
