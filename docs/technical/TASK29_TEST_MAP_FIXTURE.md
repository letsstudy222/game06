# Fixture map nhỏ, không phải Chapter I production

Nguồn: [tests/fixtures/layered-map.mjs](../../tests/fixtures/layered-map.mjs). ID map `fixture.layered-water`, scene reference `fixture.map-harness`; không nằm trong ISLANDS hoặc route công khai. Browser test truyền fixture vào adapter bằng harness, không đổi bootstrap hoặc tạo loop mới.

| Thành phần | Giá trị thử, không production canon |
| --- | --- |
| Kích thước | 320×240 world pixel, grid 20×15, tile 16×16 |
| Layers | background, base terrain, ground decor, depth scenery, foreground |
| Visuals | Palette debug xanh nước/cát/san hô/marker; không artwork được duyệt |
| Collision | Một cell solid và một rect solid; các cell nước khác passable |
| Spawn | fixture.entry tại (64,80), không nằm trong solid |
| Occluder | fixture.coral có anchor và fade tuning riêng |
| Marker | fixture.marker chỉ là mốc tương tác thử, không grant/quest logic |
| Current | fixture.flow với direction (3,4), chuẩn hóa thành (0.6,0.8), strength thử 1 |
| Actor browser | Hình chữ nhật trắng, không PlayerQuy hoặc sprite production |

`npm run test:map` kiểm contract/query. `npm run test:map:browser` cần site đang phục vụ qua GAME_URL và Chromium phù hợp; tạo canvas thử riêng, gọi draw xác định, chụp opaque/faded/current-debug, kiểm pixel và resize/DPR. Harness tháo canvas và dispose cuối lượt; Dawn vẫn là IslandGame thật bên dưới và không bị thay thế.

Không thể điều khiển Quy trong fixture; việc di chuyển test actor là đổi render view từ harness, không controller/swimming/current integration. Các giá trị duration/alpha/margin và geometry chỉ phục vụ phép kiểm có thể tái tạo. Production art, interaction semantics và scene lifecycle thuộc các task sau.
