# Tiny Farm · Phượng Hoàng Nhật Diệm

Game nông trại pixel một người chơi bằng **HTML/CSS/JavaScript/Canvas**, giữ stack hiện tại, không cần backend hoặc dependency để chạy. Giao diện được dựng lại theo hướng mỹ thuật của Tiny Farm UI Kit: logo và bảng gỗ là HTML/CSS, chữ là font local, HUD và menu là các control thật, bản đồ và sprite do Canvas render. Không dùng ảnh mockup nguyên tấm làm giao diện, không cắt các concept có nền ô cờ thành sprite.

**Bản chơi:** https://letsstudy222.github.io/game06/?v=4

## Chạy thử local

Cần Python 3; chạy trong thư mục repository:

```sh
cd /workspace/game06
python3 -m http.server 8000 --bind 127.0.0.1
```

Mở trình duyệt tại `http://127.0.0.1:8000`. Trên Windows, có thể dùng `py -m http.server 8000 --bind 127.0.0.1` từ thư mục repo. Không có bước build hay yêu cầu npm để chơi.

- **Bắt đầu:** tạo khu vườn mới; khi có tiến trình, cần xác nhận trước khi xóa.
- **Tiếp tục:** chỉ bật khi có tiến trình. Tương thích bản lưu cũ `nhat-diem.farm.v1`.
- **Cài đặt:** âm thanh, chuyển động trang trí và minimap; áp dụng ngay, lưu local.
- **Thoát:** bản web giải thích cách đóng thẻ/cửa sổ; không giả vờ có quyền đóng trình duyệt.

## Điều khiển và gameplay

- WASD / mũi tên: đi; chạm bản đồ: tự tìm đường. Map có va chạm.
- E / Space: tương tác gần nhất; 1–5: bàn tay, cuốc, hạt, bình tưới, cần câu.
- **Cuốc → gieo → tưới → ngủ → thu hoạch.** Củ cải cần 1 đêm đủ nước, cà rốt 2, bí ngô 3. Thiếu nước thì ngừng lớn, không chết.
- Quầy An: mua hạt, bán nông sản/cá/táo, nâng cấp bình tưới. Gỗ được giữ lại để khôi phục đài.
- Cầu gỗ: đợi cá cắn, kéo cần khi vạch trắng ở vùng xanh. Nhặt táo/gỗ mỗi ngày; ăn táo hồi 25 thể lực.
- Nhật Diệm Legend đi theo người chơi; **Q hoặc chạm chân dung:** gọi sương tưới cây, hồi 10 thể lực, một lần mỗi ngày.
- **I / nút sổ tay:** túi đồ, nhiệm vụ và linh thú. Esc đóng sổ tay trước, sau đó tạm dừng. Nút nhà trong quickbar mở nghỉ ngơi.
- Minimap: hiển thị khung camera, người chơi và linh thú; chạm để đi. Nút địa điểm bên trái dẫn đến nhà, quầy, An, bến câu, đài.
- Năm nhiệm vụ dẫn tới phục hồi Đài Bình Minh bằng 350 G + 8 gỗ, rồi tiếp tục chơi tự do.
- Mưa mỗi ngày thứ 4 tự tưới cây. Mùa đổi sau 28 ngày; hiện cây trồng được quanh năm.

## Pixel rendering và UI thật

Gameplay render vào buffer **480×270**; thế giới hiện có là 480×320 và camera cuộn theo chiều dọc. Viewport chọn scale nguyên 1×/2×/3× trên cửa sổ đủ lớn; ở cửa sổ nhỏ hơn 480px, co vừa màn hình với nearest-neighbor. Canvas tắt smoothing, sprite/UI dùng `image-rendering: pixelated`. Không stretch/crop canvas bằng `object-fit: cover`; đổi tọa độ chuột qua camera để giữ đúng vị trí ô đất.

HUD dùng **thể lực thật** và **lượt sương mỗi ngày**, không thêm HP/MP chiến đấu giả. Cấp đồng hành được tính từ thu hoạch, cá và thân thiết. Tiền, số hạt, táo, gỗ và minimap đọc trạng thái hiện tại. Font **VT323** hỗ trợ tiếng Việt, tải từ `assets/fonts/`, không gọi Google Fonts lúc chơi.

## Lưu tiến trình

Tự lưu sau hành động và mỗi 10 giây; thời gian không chạy khi ở màn hình chính, đóng tab, tạm dừng hoặc mở dialog. Sổ tay → dấu `?` có xuất/nhập JSON, xác nhận thay dữ liệu và bắt đầu lại. Lưu tự động không ghi đè dữ liệu vừa nhập lúc reload. Không đồng bộ tài khoản; khi trình duyệt chặn localStorage, vẫn chơi trong phiên và xuất tệp được.

## Kiến trúc và bổ sung nội dung

Xem [docs/architecture.md](docs/architecture.md).

| Thành phần                       | Trách nhiệm                                                           |
| -------------------------------- | --------------------------------------------------------------------- |
| `world.js`                       | Luật trồng trọt, kinh tế, nhiệm vụ, thời gian, save/load; độc lập DOM |
| `src/config/content.js`          | Registry bản đồ, nhân vật, frame bounds, dụng cụ, linh thú/animation  |
| `src/ui/title-screen.js`         | Màn hình chính, keyboard focus, Bắt đầu/Tiếp tục/Cài đặt/Thoát        |
| `src/ui/gameplay-hud.js`         | HUD, số lượng thật, chân dung, sổ tay và minimap                      |
| `src/ui/settings.js`             | Cài đặt local; sự kiện thay đổi cho renderer/UI/audio                 |
| `src/ui/pixel-icons.js`          | Các icon UI dùng atlas riêng                                          |
| `src/engine/viewport.js`         | Buffer, integer scale, camera và chuyển đổi tọa độ                    |
| `src/characters/sprite-actor.js` | Vẽ nhân vật từ bounds hoặc các frame đã khai báo                      |
| `src/pets/phoenix.js`            | Nhật Diệm: theo chân, idle/bay/phép, hiệu ứng; pet factory            |
| `src/pets/phoenix-art.js`        | Nguồn pixel art vẽ riêng, không lấy frame từ concept                  |
| `game.js`                        | Render loop, nền cũ/fallback, âm thanh và kết nối renderer            |
| `farm.js`                        | Điều khiển, điều phối các luật chơi và tương tác thế giới             |

## Sinh atlas, kiểm thử và xuất bản

Node.js 24 để sinh sprite và chạy kiểm thử thuần Node:

```sh
node scripts/generate-sprites.cjs
node tests/world.test.cjs
node tests/content.test.cjs
```

Generator tạo PNG RGBA có alpha thật: atlas Phoenix **128×96**, 12 ô **32×32**, origin cố định, 3 hàng idle/bay/phép; atlas icon UI 400×16. Hình thái I/II có palette riêng, cùng cấu trúc khung. Metadata tại `assets/sprites/phoenix-legend.json`. Không cần dependency đồ họa để sinh lại.

Kiểm thử trình duyệt cần Playwright và Chromium có sẵn trong môi trường phát triển, cùng server local đang chạy:

```sh
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/browser.cjs
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/scenarios.cjs
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/ui-kit.cjs
```

Có 13 kiểm thử Node cho vòng chơi, lưu, registry và tính hợp lệ của atlas. Các suite trình duyệt dùng thao tác thật cho trồng trọt, ngủ/thu hoạch, mua bán, câu cá, linh thú, save/load, nhập/xuất/reset, menu bàn phím, cài đặt, HUD, minimap và resize 320–1920px. Ảnh kiểm tra nằm trong `/tmp/`.

GitHub Actions kiểm tra cú pháp và luật/nội dung, đóng gói các file runtime cùng `src/` và `assets/`, rồi triển khai GitHub Pages. Không đưa kit tham chiếu, test hay script sinh ảnh vào site. Không có bước build bundler; payload là các file tĩnh.

## Nguồn gốc art và phạm vi hiện tại

- Tiny Farm UI Kit do người dùng cung cấp: đã đọc `CODEX_PROMPT.md`, `README.md` và xem 5 PNG; dùng làm tham chiếu bố cục/màu sắc. Các PNG tham chiếu không được tải bởi game.
- Phoenix, icon UI, logo chữ và bảng gỗ mới được dựng riêng bằng mã. Nền, farmer và An là asset gốc đã tạo cho repository ở phiên trước. Các ảnh chân dung cũ từ `letsstudy222/ankis` vẫn được giữ lại trong repo nhưng HUD mới dùng sprite pixel riêng.
- VT323 theo SIL Open Font License 1.1; giấy phép kèm `assets/fonts/VT323-OFL.txt`.
- Không dùng logo, nhân vật, nhạc hay asset thương mại của Stardew Valley.

Hiện có **một bản đồ, một chương nhiệm vụ**, không có chiến đấu/multiplayer/chuyển qua nhiều bản đồ. Atlas Phoenix hiện có idle/bay/phép; các động tác attack/hurt/die trong concept chưa triển khai và không có nút giả cho chúng. Nhà dùng dialog tương tác; chưa có map nội thất đi lại. Hình thái I/II đang dùng palette khác, chưa có bộ silhouette tiến hóa riêng. Viewport trên điện thoại nhỏ phải dùng tỉ lệ lẻ để vừa màn hình.
