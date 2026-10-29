# Kiến trúc Dawn Island

`main.mjs` tải manifest bằng `AssetLoader`, khởi tạo `GameState`, nối input và vòng lặp Canvas. Lỗi tải ảnh hiển thị rõ ở loading overlay, không thay bằng hình khối giả.

| Module | Trách nhiệm |
| --- | --- |
| AssetLoader | Tải/decode và kiểm tra kích thước ảnh production |
| Camera | Theo nhân vật bằng tọa độ thực; làm tròn khi render; giới hạn theo bản đồ |
| WorldLayer | Duyệt semantic grid và chỉ vẽ tile 32px trong camera; chọn atlas theo mask N/E/S/W |
| IslandScene | Nền, props có thứ tự chiều sâu, Phoenix, ánh nước, hạt và hiệu ứng kỹ năng |
| PlayerPhoenix / AnimationController | Di chuyển, HP, hướng, idle/move/fly/attack/fire/hurt |
| SkillSystem | Cooldown, vùng đánh, thời gian tích lửa, projectile và va chạm |
| GameState | Điều phối mô phỏng, vùng hiện tại, gai, đền, pause, snapshot chẩn đoán |
| UIHud / PlayerHUD / WorldHUD | HP/cooldown/vùng thật và portrait; fade vùng và thu gọn HUD |
| InputManager / MobileJoystick / ActionButtons | Một đầu vào gameplay chung; tám hướng, đa chạm, pointer capture |
| ResponsiveLayout / UISettings | Zoom nguyên, visualViewport, safe area, cỡ/vị trí và localStorage |
| GameMenu | Menu tạm dừng, cài đặt, trợ giúp H và kéo bố trí |
| islands / geometry | Dữ liệu bố trí và kiểm tra vùng đi được/collider |

Màn Canvas phủ viewport, tỉ lệ pixel nguyên; tọa độ mô phỏng không bị làm tròn. Props có anchor riêng, cây che nhân vật giảm alpha. Alpha sprite nhị phân; không có cạnh nội suy hoặc nền caro giả. Ground/props mới dùng chung bảng màu 39 màu, Phoenix 48 màu.

## Thêm đảo

1. Chuẩn bị terrain atlas 32px, props có rect/anchor và Phoenix trong manifest; xem `assets/tiles/dawn/manifest.json`.
2. Thêm entry vào registry trong `islands.mjs`: id, kích thước, spawn, assetManifest, regions, tilemap (columns/rows/ground/elevation), cây/đá/collider/gai và shrine.
3. Dùng semantic grid làm nguồn render lẫn collision; stairs nối các vùng solid cliff. Đặt anchor props đúng chân vật thể.
4. Chọn id mới tại nơi khởi tạo GameState trong `main.mjs`; nếu thay nhiều atlas, cập nhật loader/scene theo schema thay vì đưa logic nhân vật vào dữ liệu đảo.
5. Kiểm tra spawn an toàn, hành trình giữa các vùng, camera biên và E bằng test logic lẫn bàn phím thật. `tests/route-helper.mjs` chỉ phục vụ QA.

Để thêm nhân vật/hành động: tạo atlas đăng ký frame/anchor trong manifest, mở rộng lựa chọn pose của renderer và trạng thái controller. Hiện renderer có quy ước sáu pose Phoenix cụ thể, chưa phải trình biên tập hoạt ảnh tổng quát. Môi trường hiện là tilemap với mask bốn hướng; chưa có editor/import Tiled.

Nguồn nông trại cũ nằm trong `legacy/tiny-farm/`; nguồn art bằng hình khối của prototype nằm trong `legacy/island-prototype/`. Cả hai không được import hoặc phát hành trong runtime đảo.

Chi tiết UI 0.7 và nghiệm thu mobile: [ui-redesign.md](ui-redesign.md).

Tilemap 0.8: [audit, schema, tileset và mở rộng](tilemap-island.md).
