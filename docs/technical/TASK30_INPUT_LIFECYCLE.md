# Scope listeners, focus và scene exit

BrowserInput giữ listener scope có removeEventListener rõ ràng cho document/window/Canvas. VirtualJoystick và VirtualActionButton giữ scope riêng, trả reset subscription khi dispose. Không có timer, rAF, storage writer hoặc global singleton input mới. dispose của BrowserInput và các virtual controls đều idempotent; controller mới tạo scope mới khi re-entry.

| Sự kiện | Xử lý |
| --- | --- |
| Keyup / pointerup | Nhả đúng source, không nhả source khác còn giữ action |
| Pointercancel / lostcapture | Nhả pointer owner và action/vector tương ứng |
| Blur / visibilitychange | Owner clear held, movement, pending edges và capture |
| Focus vào editable/button | Clear held; keydown UI không thành gameplay action |
| Context transition | Clear scope device state/edges, tăng generation; không replay action |
| Resize / visualViewport resize | Clear transient input để tránh kéo joystick/tọa độ cũ qua rotation |
| Remap | Validate trước, clear held rồi thay bindings trong bộ nhớ |
| Scene exit / dispose | Tháo listeners, reset sources/capture; không xóa save/config/progression |

Escape/pause vẫn được nhận khi menu button hoặc editable có focus; đây là app intent, không gameplay action. Shortcut Ctrl/Meta/Alt không bị chuyển thành movement/action hoặc preventDefault.

Caller scene integration phải bind một owner sau enter thành công, sample theo tick, consume rồi endFrame một lần; đổi context trước menu/dialogue/pause, dispose khi exit hoặc enter thất bại. Không gắn adapter mới và legacy vào cùng document để cùng điều khiển actor.

Task 30 chưa tạo scene manager Task 47 hoặc thay lifecycle toàn ứng dụng. Legacy main hiện khởi động một lần và chưa có scene teardown tổng quát; các listeners cũ không bị viết lại trong nhiệm vụ này. Khả năng cleanup/re-entry được triển khai và kiểm cho adapter mới, không được diễn giải thành engine đã chuyển scene hoàn chỉnh.

Harness browser dùng iframe riêng trong trang Dawn, để keyboard/mouse events không đi qua legacy document. Tạo/dispose/re-enter adapter không tạo actor hoặc rAF mới; probe instance cũ không nhận edge sau teardown. Component mobile cần nằm cùng SemanticInput owner để visibility/context clear có hiệu lực đồng bộ.
