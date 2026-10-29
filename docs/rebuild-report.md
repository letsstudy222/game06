# Báo cáo dựng lại Dawn Island

## Thay đổi

Thay presentation prototype bằng bộ môi trường mới có biển phía Nam, đồng cỏ, rừng phía Bắc và đền Phượng Hoàng. Nền, props, Phoenix, hiệu ứng và HUD được dựng thành các lớp độc lập. Nhân vật lớn hơn, giữ tông ngà/vàng/đỏ rượu của tham chiếu. Bỏ bố cục trang bao quanh để game phủ màn hình; trợ giúp nằm trong H, E chỉ xuất hiện khi đến gần đền.

Giữ và mở rộng logic di chuyển chuẩn hóa, va chạm theo bước nhỏ, đánh theo hướng, cooldown, đạn không xuyên collider, HP, hover, pause và giải phóng phím khi mất focus. Thêm hurt, tích lửa, camera theo mượt với pixel snapping, vùng nhìn chia chunk, tải asset có tiến độ/báo lỗi và đền tương tác thật. Dữ liệu nông trại cũ không bị ghi đè.

## Nhóm file chính

- `index.html`, `style.css`, `src/island/main.mjs`, `UIHud.mjs`: viewport và tương tác UI.
- `AssetLoader.mjs`, `Camera.mjs`, `WorldLayer.mjs`, `IslandScene.mjs`: pipeline hình ảnh và render.
- `islands.mjs`, `geometry.mjs`, `GameState.mjs`: vùng, đường nối, collider, gai, đền.
- `PlayerPhoenix.mjs`, `AnimationController.mjs`, `SkillSystem.mjs`: trạng thái/kỹ năng.
- `assets/production/`, `scripts/normalize-production.cjs`: master, ảnh runtime và quy trình dựng atlas.
- `tests/`, `artifacts/`: kiểm tra và ảnh chạy thật.
- `legacy/island-prototype/`: nguồn hình học cũ để tra cứu, không còn chạy.
- `package.json`, lockfile, `.github/workflows/pages.yml`: môi trường kiểm tra tái lập và đóng gói website.

## Kiểm chứng

16 kiểm tra Node đã đạt. Browser tour dùng phím thật đi tới rừng, đền, biển và gai; kiểm tra đánh/lửa/bay/hurt, prompt E và bật/tắt đền, HP thực, H/Esc, mất focus, không ghi đè save cũ, viewport 320–1920px và không lỗi console/asset HTTP. Đường nối rừng/đền từng bị hẹp trong QA đã được sửa; mép biển được giới hạn lại theo hình bờ.

Ảnh thực tế ở `artifacts/dawn-meadow.png`, `dawn-forest.png`, `dawn-ruins.png`, `dawn-beach.png`, `dawn-fire.png`. Browser test tạo lại các ảnh khi chạy thành công tới từng điểm. CI chạy kiểm tra logic trước khi đóng gói Pages; browser tour chạy tại môi trường phát triển.

## Phạm vi còn lại

Xem [nguồn art](art-provenance.md) về giới hạn sáu pose và hoạt ảnh hành động. Chưa có frame vẽ riêng đầy đủ cho mọi hành động/hướng, save tiến trình, NPC, nhiệm vụ hoặc đảo mới. Phiên bản này là một đảo khám phá tương tác có art mới, không tuyên bố toàn bộ game/animation thương mại đã hoàn tất. Cách chạy ở README; cách thêm đảo ở [kiến trúc](architecture.md).
