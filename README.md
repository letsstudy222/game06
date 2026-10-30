# Phượng Hoàng Nhật Diệm — Dawn Island

## Định hướng dự án — Tứ Linh Khởi Nguyên

Tên làm việc tiếng Anh: **Origins of the Four Sacred Spirits**. Bản chơi Phượng Hoàng dưới đây là nền kỹ thuật hiện hữu; mục tiêu sản xuất đầu tiên của tầm nhìn mới là vertical slice Chương I — Quy tại Vực Hải Uyên. Chưa triển khai các hệ hóa thân/cộng hưởng hay bốn chương trong Task 01.

- [Tầm nhìn chính thức](docs/GAME_VISION.md) và [phạm vi sản xuất](docs/PROJECT_SCOPE.md).
- [Trụ cột thiết kế](docs/CORE_DESIGN_PILLARS.md) và [quyết định CONFIRMED / PROPOSED / UNRESOLVED](docs/PROJECT_DECISIONS.md).
- [Câu hỏi mở](docs/OPEN_QUESTIONS.md) và [đăng ký tham chiếu/asset thiếu](docs/ASSET_REFERENCE_REGISTER.md).
- [Task 06: phe phái, đồng hóa, enemy ecology và antagonist](docs/factions/TASK06_CONSISTENCY_AUDIT.md).
- [Task 05: truyện bốn chương, nhiệm vụ, hệ quả thế giới và handoff](docs/story/TASK05_CONSISTENCY_AUDIT.md).
- [Task 04: Tứ Linh, 12 dạng tiến hóa, kỹ năng và yêu cầu production](docs/creatures/TASK04_CONSISTENCY_AUDIT.md).
- [Task 03: Tinh Linh, cộng hưởng, bộ ba dạng và đặc tả dữ liệu](docs/lore/RESONANCE_DECISION_RECORD.md).
- [Lore thế giới Task 02: lịch sử, Tứ Linh, biến cố và tiết lộ từng chương](docs/lore/LORE_CONSISTENCY_AUDIT.md).
- [Kiểm kê repository Task 01](docs/REPOSITORY_AUDIT.md) và [quy trình phát triển](docs/DEVELOPMENT_WORKFLOW.md).

Các tài liệu trên định hướng thiết kế; hướng dẫn chạy và lịch sử Dawn bên dưới mô tả chức năng đang có. Không mặc định đồng nhất Đảo Bình Minh với Đảo Nhật Diệm Chương II.


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

Giữ HTTP server ở cổng 8000 khi chạy browser test. Có thể đặt `GAME_URL` hoặc `CHROMIUM_PATH`; hệ thống Linux tự dùng `/usr/bin/chromium` nếu có. 30 kiểm tra logic, tilemap và cấu hình UI kiểm chứng đường đi bốn khu, va chạm, sáu trạng thái, chiến đấu, HP, đền, camera, phân mảnh bản đồ và tính toàn vẹn atlas. Browser test điều khiển bằng bàn phím thật qua bốn khu, chụp ảnh, kiểm tra HUD, trợ giúp/tạm dừng, sát thương và kích thước 320–1920px; không dịch chuyển nhân vật để giả lập hành trình.

## Môi trường toàn đảo — Fantasy Island × Mystic Ruins

Link chính đã áp dụng art direction mẫu được duyệt lên toàn đảo 40×28 ô (1280×896), với ba cao độ, hai cầu thang, rừng mát, biển/foam và quần thể đền trên cao. Phoenix, UI và gameplay giữ nguyên. `/?sample=1` vẫn mở mẫu riêng 26×22 để đối chiếu.

[Bàn giao, kiểm kê asset, ảnh gameplay và checklist còn thiếu](docs/dawn-full-environment.md). Bộ runtime chính ở `assets/environments/dawn/`, gồm 183 frame terrain và 18 ID props cùng bóng pixel. `npm run art:dawn` dựng lại bộ mở rộng từ tài nguyên mẫu đã lưu. [Nguồn và pipeline mẫu](docs/dawn-sample-review.md); [audit 0.8 lịch sử](docs/production-asset-checklist.md).

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


## Task 07 — Persistent world blueprint

[Audit và mục lục Task07](docs/world/TASK07_CONSISTENCY_AUDIT.md): authority, bốn vùng, population/quest/revisit, event DAG, save/migration và 20 acceptance scenarios. Chỉ tài liệu; chưa triển khai world save, không thay game/art.


## Task08 — Master GDD và Phase I audit

Bắt đầu tại [Master GDD](docs/GAME_DESIGN_DOCUMENT.md), [completion audit](docs/PHASE_I_COMPLETION_AUDIT.md), [readiness](docs/IMPLEMENTATION_READINESS.md) và [handoff](docs/PHASE_I_HANDOFF.md). Audit đã hoàn tất; **Phase I PARTIAL**, còn product/asset/technical gates trước Quy first playable. Game hiện tại không đổi trong task chỉ tài liệu này; Task09 chưa bắt đầu.


## Task09 — Elemental system design

[Elemental overview](docs/elements/ELEMENTAL_SYSTEM_OVERVIEW.md), [decision register](docs/elements/TASK09_DECISIONS.md) và [audit/delivery index](docs/elements/TASK09_CONSISTENCY_AUDIT.md): six identities, ModelC recommendation,36directed cells,9status/8reaction candidates, environment/balance/data/20scenarios. Chỉ tài liệu, no runtime rebalance/art/UI. D41 giữ early progression không bắt đủ3members/3elements; mechanics mới chưa approve và Task10 chưa bắt đầu.
