# Nhật Diệm — UI/UX mobile RPG, phiên bản 0.7

## Audit và nguyên nhân

Kiểm tra trực tiếp bản 303c0c6 trước khi sửa, chụp bốn viewport vào `artifacts/ui-before/`. Không thay bản đồ hoặc tạo lại sprite. Tham khảo nguyên tắc HUD phủ thế giới, joystick trái/hành động phải; không nhập asset PokeMMO/Pokémon.

| Vấn đề | Nguyên nhân trong source cũ | Sửa |
| --- | --- | --- |
| Màn dọc nhiều biển | main dùng scale=1 dưới 700px: camera 390×844 vượt bản đồ 960×640. Camera không thể clamp trục Y; IslandScene lặp mẫu biển để lấp phần ngoài bản đồ | viewportPlan chọn zoom nguyên tối thiểu theo cả chiều rộng và cao. Mặc định mobile 2×: camera 195×422. Bỏ lặp ảnh biển ngoài bản đồ |
| HUD/nút thay cỡ cùng game | UI nằm trong `.stage` bị CSS transform theo zoom canvas | Canvas và UI cùng phủ màn hình nhưng là hai lớp độc lập; UI dùng CSS pixels và UI scale riêng |
| Kỹ năng ở giữa | `.hotbar` luôn left:50%, translateX(-50%) | Desktop thanh nhỏ góc phải; touch cụm tam giác bên phải, đánh lớn nhất |
| Joystick thiếu cân đối | Chỉ hiện theo pointer:coarse, 80px, dead zone/biên kéo cố định pixel | Nhận phương thức input thực, dead zone tương đối, tám hướng chuẩn hóa, pointer capture và pointer ID |
| Thiếu tùy chỉnh | Không có cấu hình UI | Cài đặt có size/opacity/scale/zoom, kéo vị trí riêng dọc/ngang và reset; lưu localStorage có validation/fallback |

Spawn vẫn (455,320), ground/props/atlas/hiệu ứng/địa hình/collider giữ nguyên. Phần biển thật vẫn xuất hiện khi tới bãi biển; không phủ panel để che biển và không sửa tranh nền. Camera giữ mượt theo vị trí thực, chỉ làm tròn khi render. Camera bounds gốc vẫn có hiệu lực; resize tự tính lại viewport khi xoay hoặc visualViewport thay đổi.

## Bố cục và hành vi

HUD góc trái: portrait, tên, Lv.1 (cấp khởi đầu; chưa có hệ tăng cấp), HP đỏ cập nhật thực và Legend nhỏ. Nút cạnh HUD thu gọn thành tên/HP. Góc phải có menu và pause, cả hai mở menu tạm dừng. Tên vùng mờ sau bốn giây gameplay và xuất hiện lại khi đổi vùng. Esc mở/đóng menu; H xem hướng dẫn. Các mục Nhân vật/Kỹ năng/Bản đồ hiện chưa khả dụng và disabled rõ ràng.

Touch: joystick trái và ba nút bên phải, giữ cánh để hover, thả để dừng; pointercancel/lostcapture/blur giải phóng input. Tương tác E xuất hiện thêm trong cụm phải khi gần đền. Icon kỹ năng tự vẽ pixel bằng Canvas, không emoji. Cooldown phủ nút và có số đếm; nút nhấn có phản hồi sáng. Desktop: joystick ẩn, phím cũ giữ nguyên, thanh kỹ năng góc phải. Thiết bị lai chuyển mode khi có touch hoặc phím di chuyển thực; cùng InputManager cấp đầu vào cho PlayerPhoenix, không có hai tốc độ di chuyển.

Safe area dùng env(safe-area-inset-*) bốn cạnh; khoảng đáy tối thiểu 12px. Canvas theo visualViewport, không dùng devicePixelRatio để làm nhòe pixel. Tất cả zoom là số nguyên. UI không bị zoom theo canvas. Cỡ nút tự giới hạn khi setting cực đại trên màn hẹp để không tràn sang joystick hay ngoài màn hình. Vị trí kéo nằm trong hai nửa vùng dưới, tránh vùng trung tâm của nhân vật ở spawn. Touch-action/pointer capture ngăn trang pan/zoom khi dùng gameplay; dialog cho phép cuộn dọc.

Settings lưu khóa `nhat-diem.ui.v1`; không đụng khóa save nông trại. Nếu storage lỗi/quota/private restriction, cấu hình vẫn có tác dụng trong phiên và hiển thị thông báo không lưu được. Reset xóa vị trí tùy chỉnh và trả về mặc định. Zoom yêu cầu 1× có thể được nâng tới mức an toàn trên màn cao; UI giải thích điều này.

## Kiểm chứng và ảnh trước/sau

| Viewport CSS | Trước | Sau |
| --- | --- | --- |
| 390×844 | [Portrait](../artifacts/ui-before/portrait.png) | [Portrait](../artifacts/ui-after/portrait.png) |
| 360×800 | [Small](../artifacts/ui-before/small.png) | [Small](../artifacts/ui-after/small.png) |
| 844×390 | [Landscape](../artifacts/ui-before/landscape.png) | [Landscape](../artifacts/ui-after/landscape.png) |
| 1920×1080 | [Desktop](../artifacts/ui-before/desktop.png) | [Desktop](../artifacts/ui-after/desktop.png) |

Ảnh chụp trình duyệt gameplay, không mockup. QA đã phát hiện và sửa thao tác “Xong” không nhận click sau một lần kéo cảm ứng; nút xử lý pointer release và test xác nhận quay lại Settings. `npm test`: 16 kiểm tra gameplay/asset và 5 kiểm tra mới về integer zoom/bounds, tám hướng/dead zone, storage/validation/reset và camera ở bờ biển/xoay màn hình. `npm run test:ui`: Chromium/Playwright, CDP touch events thực đi qua browser pointer dispatch; kiểm tra đồng thời hai ngón di chuyển + đánh/lửa/hover, hủy chạm, joystick về tâm, không scroll, các tap target >=44px, actor không bị HUD/nút che ở spawn, xoay cùng phiên, chỉnh size cực đại, zoom, kéo vị trí, reload persistence/reset, chuyển input lai, cuộn Settings bằng touch ở landscape, tiếp tục đi bằng bàn phím sau thu gọn HUD, menu/pause và không lỗi console/HTTP. Kết quả máy đọc ở `artifacts/ui-after/qa-results.json`.

`npm run test:browser`: hành trình bằng phím thật qua rừng/đền/biển/gai, tương tác thật, HP/skill/hurt/hover, pause/focus và save cũ. Có ảnh bờ biển dọc/ngang cùng kiểm tra cạnh canvas không trong suốt.

## File thay đổi

- `index.html`, `style.css`: hai lớp canvas/UI, HUD/menu/settings, safe-area và bố cục responsive.
- `main.mjs`, `UIHud.mjs`: khởi tạo/kết nối module.
- `InputManager.mjs`, `MobileJoystick.mjs`, `ActionButtons.mjs`: đầu vào chung, pointer capture và đa chạm.
- `PlayerHUD.mjs`, `WorldHUD.mjs`, `GameMenu.mjs`: HUD, fade vùng, pause/settings/editor.
- `UISettings.mjs`, `ResponsiveLayout.mjs`: cấu hình bền vững, zoom nguyên, visualViewport và vị trí.
- `Camera.mjs`: bảo vệ kích thước resize không vượt map. `IslandScene.mjs`: bỏ vùng biển lặp ngoài thế giới; giữ mọi lớp art/FX còn lại.
- `tests/ui.test.mjs`, `tests/ui.browser.cjs`, cập nhật `tests/island.browser.cjs`: nghiệm thu.
- `scripts/build-site.cjs`: đóng gói static, gắn revision cho toàn bộ import graph để tránh cache lẫn mã cũ/mới khi phát hành.
- `package.json`, lockfile, workflow, README, tài liệu và screenshots: chạy thử/phát hành.

## Giới hạn và bước kiểm tra thiết bị thật

Chưa kiểm thử iPhone/Safari hoặc Android trên thiết bị thật. Không khẳng định toolbar Safari/Dynamic Island/Android navigation đã được xác nhận bằng phần cứng. Cần mở link trên máy thật, kéo joystick + giữ skill, xoay khi đang chạm, thử toolbar hiện/ẩn và vùng notch, kiểm tra cuộn dialog/settings ở landscape, sau đó tinh chỉnh inset nếu thiết bị cụ thể báo lỗi. Tự động đã kiểm tra hình học viewport, safe-area CSS và đổi chiều; đây không thay thế WebKit/thiết bị thật.

Cấp hiện tại cố định 1; menu nhân vật/kỹ năng/bản đồ chưa có màn quản lý. Editor chỉ cho đặt hai cụm ở vùng dưới riêng trái/phải, không kéo tự do lên giữa nhân vật. Hoạt ảnh/nguồn art giữ giới hạn của bản 0.6 (xem art-provenance). Không bổ sung map, NPC hoặc hệ gameplay mới trong nhiệm vụ UI này.
