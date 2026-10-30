> Cập nhật: mẫu 0.9 đã được người dùng duyệt và áp dụng lên đảo chính. Xem [bàn giao toàn đảo](dawn-full-environment.md). Nội dung bên dưới mô tả mốc lịch sử trước khi nhân rộng.

# Dawn Island 0.8 — Fantasy Island × Mystic Ruins

## Audit và thay đổi cách dựng

Phiên bản 0.7 dùng `assets/production/dawn/world.png` (960×640) làm toàn bộ mặt đất; `WorldLayer` chỉ cắt hình ấy thành chunk 160px. Cây, vách và đền còn được vẽ sẵn trong tranh nên props riêng/collider không phải nguồn duy nhất mô tả thế giới. Đây là một minh họa được chia nhỏ, chưa phải tilemap.

0.8 thay toàn bộ ground/props môi trường bằng pixel tiles và sprite gốc của dự án, được vẽ ở độ phân giải đích bằng `scripts/build-tileset.cjs`. Không cắt một ảnh concept thành ô rồi gọi đó là tileset. Không dùng tài sản từ game thương mại hoặc lấy ảnh tham chiếu bốn phong cách làm nền. Không tải background hoặc props painterly cũ khi chơi.

## Quy mô và bố cục

- **32×32 pixel / tile**, 40×28 ô = **1280×896 world pixels**. Phượng Hoàng có silhouette khoảng hai ô; đủ nổi bật trên nền tiết chế.
- Bãi biển quanh đảo với hai vịnh khoét, bờ cát nhiều bậc, vùng nước nông nối biển sâu, vỏ sò và đá.
- Bãi cỏ trung tâm có khoảng trống cho movement/combat; đường đất nối cầu thang, đền và biển, đi vòng mép khoảng trống xuất hiện.
- Thềm cao phía Bắc: viền đá, mặt vách và chân vách thành các ô solid; cầu thang rộng ba ô nối hai cao độ. Phía Tây có cụm cây làm lối rừng.
- Tàn tích Đông Bắc: sàn đá, gạch nứt/rêu, góc sàn thiếu, cột nguyên/gãy, mảnh đá, bệ lửa và bàn thờ. E kích hoạt dấu ấn thật khi đứng phía trước; hiệu ứng sáng neo ở bàn thờ, không ở chân người chơi.

Bố trí cây/đá/đường/đền được tác giả đặt theo tọa độ ô trong `DawnMap.mjs`, không rải đồ vật ngẫu nhiên. Chỉ biến thể texture có phép chọn ổn định theo tọa độ. Thảm cây giảm alpha khi che người chơi. Props và Phoenix được sắp theo tọa độ chân, mọi vật cùng mật độ một art pixel trên một world pixel.

## Tileset và layer

Atlas terrain `assets/tiles/dawn/terrain.png`: **256×288**, gồm **72 tile**. Atlas objects `objects.png`: các ô 96px có alpha thật, **13 loại object**. Tất cả terrain/props dùng chung **39 màu**, alpha 0/255, không antialias hay resize tranh. Phoenix dùng atlas/palette riêng đã có, không đổi pixel nào.

| Nhóm | Cách dùng |
| --- | --- |
| Deep / shallow water | Mỗi loại bốn frame sóng nhẹ, chọn frame theo thời gian và phase ô |
| Sand | Ba biến thể nền cát; 16 tile bờ với inset cát/foam rõ ràng |
| Grass / cliff top | Bốn biến thể cỏ và 16 biến thể mép; dùng lại trên ground có elevation=1 để làm mặt thềm cao |
| Dirt path | 16 tile kết nối; phần trong suốt giữ nền cỏ ở rìa |
| Cliff | Rim, mặt vách và chân vách; top cỏ nối mặt đá, chân vách nối cỏ thấp |
| Ruins floor | Ba biến thể gạch nứt, hai biến thể đá rêu |
| Stairs | Tile bậc nối ngang thành lối rộng, không block như vách |
| Objects | Palm, broadleaf tree, boulder, bush, flowers, pillar, broken pillar, fragment, altar, brazier, shell, log, bramble |

Mask N/E/S/W có bit 1/2/4/8. Cát xét ô land lân cận để chọn bờ; cỏ xét nhóm ground liền kề; path xét path/stairs/floor để nối. Góc hai cạnh mở có đường cắt pixel nhỏ, không có ô caro hở ở junction. Nước nằm dưới bờ, sand dưới grass edge và grass dưới path alpha. Floor/cliff/stair là tile opaque. Không có file ảnh whole-world dùng ở runtime; ảnh overview trong artifacts chỉ là ảnh chụp debug/trình duyệt.

## Collision và render

`DawnMap` trả về semantic ground grid, elevation, checkpoints, vùng tên và objects. `WorldLayer` duyệt các ô nằm trong viewport rồi chọn frame atlas theo tile/mask; không duyệt hay vẽ một tranh nền. Camera giữ follow mượt, bounds theo 1280×896 và integer zoom; Canvas luôn `imageSmoothingEnabled=false`/CSS `image-rendering:pixelated`.

`geometry.canOccupy` lấy cùng ground grid: deep/shallow/rim/cliff/cliffFoot đều solid, stairs/grass/path/sand/floor/moss đi được. Mẫu thân nhân vật được kiểm tra quanh bán kính; inset bờ cát 3px cũng được tính vào collision. Trunk/rock/cột/bệ/log có footprint riêng, hoa/vỏ sò là trang trí đi xuyên được, bramble gây sát thương. Hover vẫn dùng collision terrain, không bay xuyên biển hoặc vách. Combat/cooldown/HP/respawn, joystick, menu/settings và keyboard được giữ.

## Tái sử dụng và thay thế

| Giữ lại | Thay thế trong runtime |
| --- | --- |
| `assets/production/phoenix/atlas.png`, metadata hướng/anchor/pose, animation/FX | `assets/production/dawn/world.png` → semantic tile grid + terrain atlas |
| HUD/icons/font, input, UI settings, camera follow | `assets/production/dawn/props.png` → object atlas pixel mới |
| Cơ chế movement/attack/fire/hover/HP/shrine | Polygon walkable/corridor theo tranh → collision từ tile grid |
| Canvas/native ES modules, registry đảo | Chunk ảnh 160px → culling từng ô tile 32px |

File art cũ vẫn trong Git để tra cứu, nhưng manifest mới và Pages package không phát hành ground/props cũ. Source normalizer 0.6 còn để tra cứu; `npm run art:build` hiện gọi builder tile mới, không normalize tranh cũ.

## File chính và mở rộng

- `src/island/DawnMap.mjs`: layout, semantic layers, vị trí props/checkpoints.
- `islands.mjs`: registry; có thể thêm island khác với cùng schema.
- `WorldLayer.mjs`: tile lookup/mask, animation nước, culling.
- `AssetLoader.mjs`: tiles/object/Phoenix loader, kiểm tra atlas metadata.
- `IslandScene.mjs`: lớp môi trường, depth order, nhân vật và FX.
- `geometry.mjs`: collision tile và object footprints.
- `assets/tiles/dawn/`: manifest và hai atlas; `scripts/build-tileset.cjs`: nguồn art tái lập.
- `main.mjs`: diagnostics kích thước thế giới/tile/draw calls; `index.html`: preload atlas mới.
- `scripts/build-site.cjs`, package/lockfile, tests, docs và artifacts: đóng gói/kiểm chứng.

Thêm đảo bằng một object có width/height, tilemap `{tileSize,columns,rows,ground,elevation}`, assetManifest, spawn/checkpoints/regions và các nhóm props/collider/shrine. Đăng ký trong `ISLANDS`, chọn id lúc tạo GameState, rồi thêm route/collision test. Nếu dùng cùng tileset có thể tái sử dụng toàn bộ atlas; muốn thêm prop thì đăng ký rect/anchor và footprint. Portal chuyển cảnh/tải asset nóng chưa có; registry/schema là nền để bổ sung, không tuyên bố đã có hệ nhiều đảo chơi được.

## Chạy, dựng art và kiểm tra

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# terminal khác, từ root repository:
npm ci
npm run art:build
npm test
npm run test:browser
npm run test:ui
npm run build
```

Mở `http://127.0.0.1:8000`. Dựng tiles không cần trình duyệt, imagegen hoặc dịch vụ ngoài: Node ghi PNG RGBA lossless từ source pixel gốc, kết quả tái lập. Browser tests dùng Playwright/Chromium như README. Build Pages chỉ sao chép tile assets mới và Phoenix, không đưa master/legacy vào website.

**22 kiểm tra Node đạt**: tuyến tới mọi khu, collision đúng solid grid và cầu thang, atlas/palette/alpha, movement, sáu trạng thái, combat, HP, camera và UI settings. Browser tour dùng phím thật qua thềm/rừng/đền/biển/gai, tương tác E, attack/fire/hover/hurt, pause/blur; không teleport. Kiểm tra không có request tới painted ground/props cũ. UI suite đạt 390×844, 360×800, 844×390, 1920×1080: đa chạm, rotation, safe bounds, menu/settings/drag/reset/persistence. Chưa kiểm thử trên điện thoại thật.

## Ảnh chụp gameplay thật

- [Trước: nền minh họa](../artifacts/tilemap/before-painted.png)
- [Toàn đảo ở zoom 1×](../artifacts/tilemap/overview.png)
- [Bãi cỏ ở zoom gameplay](../artifacts/dawn-meadow.png)
- [Thềm cao/cầu thang](../artifacts/tilemap/cliffs.png)
- [Tàn tích và đền đã kích hoạt](../artifacts/dawn-ruins.png)
- [Bãi biển](../artifacts/dawn-beach.png)
- [Mobile dọc](../artifacts/ui-after/portrait.png) / [ngang](../artifacts/ui-after/landscape.png)

## Giới hạn còn lại

Bộ art đầu tiên có 72 tile/13 prop: chưa có biến thể diagonal cliff, waterfall, cầu gỗ hoặc toàn bộ 47-corner autotile. Shore foam hiện tĩnh, nước có bốn frame. Cao độ là lớp hình ảnh + collision/lối cầu thang, không phải mô phỏng 3D hay nhảy lên vách. Chưa có Tiled editor/import/export workflow hoặc portal chuyển đảo. Bộ Phoenix/hoạt ảnh giữ nguyên giới hạn sáu pose của bản trước. Cần thử Safari/iPhone và Android thật để xác nhận hiệu năng/toolbar/notch; các lần kiểm tra ở đây là Chromium tự động.
