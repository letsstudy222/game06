# Phượng Hoàng Nhật Diệm — Dawn Island

Pixel adventure chạy trực tiếp bằng HTML/CSS, ES modules và Canvas 2D. Phượng Hoàng Legend là nhân vật điều khiển trên đảo gồm đồng cỏ, rừng phía Bắc, đền cổ và biển phía Nam. Đây là vertical slice khám phá; mã nông trại cũ được lưu trong `legacy/tiny-farm/`.

## Chạy thử

Từ thư mục repository, chạy:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Mở trình duyệt tại `http://127.0.0.1:8000`. Không mở bằng `file://` vì trò chơi tải ES modules và manifest qua HTTP. Không cần bundler hoặc dịch vụ backend.

WASD/phím mũi tên: di chuyển; J/Space: đánh; K: tích tụ và phóng lửa; Shift: lướt bay; E: tương tác bệ đá khi đến gần; H: trợ giúp; Esc: menu / tiếp tục. Có nút chạm cho thiết bị di động. Bụi gai gây sát thương; bay tránh gai nhưng không xuyên địa hình. Trạng thái đền đặt lại khi tải lại trang.

## Kiểm tra

Node.js 24 trở lên:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
npm run test:ui
```

Giữ HTTP server ở cổng 8000 khi chạy browser test. Có thể đặt `GAME_URL` hoặc `CHROMIUM_PATH`; hệ thống Linux tự dùng `/usr/bin/chromium` nếu có. 22 kiểm tra logic, tilemap và cấu hình UI kiểm chứng đường đi bốn khu, va chạm, sáu trạng thái, chiến đấu, HP, đền, camera, phân mảnh bản đồ và tính toàn vẹn atlas. Browser test điều khiển bằng bàn phím thật qua bốn khu, chụp ảnh, kiểm tra HUD, trợ giúp/tạm dừng, sát thương và kích thước 320–1920px; không dịch chuyển nhân vật để giả lập hành trình.

## Mẫu môi trường 0.9 — chờ duyệt

Mở `/?sample=1` để chơi sample có bộ art/bóng/ba cao độ mới; link gốc giữ đảo hiện tại. [Ảnh, nguồn art, cách dựng lại và giới hạn](docs/dawn-sample-review.md). Chưa nhân rộng ra toàn Dawn Island.

## Tilemap 0.8 — Fantasy Island × Mystic Ruins

Đảo đầu tiên hiện dựng từ tile 32×32 trên grid 40×28, 72 terrain tile và 13 prop sprite dùng chung palette. Không dùng tranh nền whole-world. Nước/bờ/cỏ/đường/vách/cầu thang/đền là các ô và lớp riêng; collision đọc cùng grid.

[Chi tiết tile logic, asset giữ/thay, ảnh gameplay và giới hạn](docs/tilemap-island.md).

[Production asset checklist — hoàn thiện mẫu trước khi mở rộng đảo](docs/production-asset-checklist.md). Bộ tile hiện tại vẫn ở mức prototype so với art target premium; kiểm tra kỹ thuật đạt không thay thế duyệt mỹ thuật.

## Giao diện mobile RPG

Joystick trái, cụm đánh/lửa/bay phải; giữ nút cánh để bay. Menu → Cài đặt chỉnh kích thước, độ hiện, UI scale, camera zoom và kéo vị trí nút. Cài đặt lưu trên trình duyệt; Reset khôi phục mặc định. Canvas và HUD có tỉ lệ riêng, hỗ trợ dọc/ngang và thiết bị lai.

[Audit, ảnh trước/sau, danh sách file và giới hạn thiết bị thật](docs/ui-redesign.md).

## Cấu trúc và tài liệu

- `src/island/`: runtime hiện tại, tách loader/camera/cảnh/nhân vật/kỹ năng/HUD/dữ liệu đảo.
- `assets/tiles/dawn/`: terrain/object atlas pixel và manifest môi trường. `assets/production/phoenix/`: giữ atlas nhân vật.
- `scripts/build-tileset.cjs`: source art tile/props gốc; `npm run art:build` dựng PNG tái lập bằng Node, không cần server.
- `artifacts/dawn-*.png`: ảnh gameplay thật từ lần kiểm tra trình duyệt.
- [Kiến trúc và cách thêm đảo](docs/architecture.md).
- [Nguồn hình ảnh và giới hạn hoạt ảnh](docs/art-provenance.md).
- [Báo cáo thay đổi và kiểm chứng](docs/rebuild-report.md).

## Phạm vi hiện tại

Đồ họa môi trường và nhân vật được tạo mới từ tham chiếu Phượng Hoàng của dự án, có alpha/palette/anchor riêng; không dùng ảnh mockup chứa UI làm màn chơi. Mặt đất được dựng từng tile trong vùng nhìn, props/nhân vật/hiệu ứng/HUD là các lớp riêng.

Có sáu trạng thái chạy thật, nhưng nguồn nhân vật mới chỉ có sáu pose (hai pose mỗi hướng trước/trái/sau; hướng phải lật gương). Đánh và trúng đòn dùng pose cùng chuyển động/hiệu ứng; chưa phải bộ frame vẽ riêng đầy đủ cho từng hành động. Chưa có lưu tiến trình đảo, nhiệm vụ, NPC hoặc hệ thống đảo thứ hai. Không coi bản này là một game thương mại đã hoàn thiện toàn bộ nội dung.

`npm run build` tạo thư mục `_site` với revision tag đồng nhất cho các ES module, tránh tải lẫn mã cũ từ cache sau khi phát hành.

GitHub Pages tự kiểm tra và xuất bản khi push `main`; chỉ đóng gói runtime, font và ảnh chụp, không tải master/legacy lên site.
