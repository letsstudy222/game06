# Nhật Diệm · Thung lũng Ban Mai

Game nông trại một người chơi trên trình duyệt. Một bản đồ nông trại gốc, một chương có thể hoàn thành, rồi tiếp tục chơi tự do. Không cần tài khoản, backend, API key hoặc cài dependency để chạy game.

## Chơi

- WASD / mũi tên để di chuyển; **chạm bản đồ** để nhân vật tự tìm đường.
- Chạm một ô đất hoặc địa điểm để đi tới và tương tác; **E / Space** tương tác gần nhất.
- **1–5** chọn bàn tay, cuốc, hạt giống, bình tưới, cần câu. **I** mở túi. **Esc** tạm dừng hoặc đóng hộp thoại.
- Cuốc → gieo → tưới → ngủ ở nhà → thu hoạch. Củ cải cần 1 đêm đủ nước, cà rốt 2 đêm, bí ngô 3 đêm. Cây thiếu nước ngừng lớn; không chết.
- Ghé quầy An để mua hạt, bán rau/cá/táo, nâng cấp bình tưới. Gỗ được giữ lại cho công trình.
- Câu ở cầu gỗ: đợi cá cắn, kéo cần khi vạch trắng nằm trong vùng xanh.
- Nhặt gỗ, táo hằng ngày. Ăn táo hồi 25 thể lực. Trò chuyện và tặng An một quả táo mỗi ngày tăng thân thiết.
- Nhật Diệm đi theo nhân vật. Phép sương mỗi ngày tưới toàn bộ cây và hồi 10 thể lực.
- Hoàn thành nhật ký và khôi phục Đài Bình Minh bằng **350 vàng + 8 gỗ**. Chơi tiếp sau khi hoàn thành chương.
- Mỗi ngày thứ 4 có mưa, tự tưới cây. Lịch đổi mùa sau 28 ngày; bốn mùa có sắc thái và hiệu ứng riêng. Cây có thể trồng quanh năm.

## Chạy tại máy

```sh
cd /workspace/game06
python3 -m http.server 8000 --bind 0.0.0.0
```

Phục vụ các file tĩnh qua HTTP. `index.html`, `style.css`, `world.js`, `game.js`, `farm.js` và `assets/` là toàn bộ bản phát hành. `world.js` chứa luật chơi, `game.js` vẽ nền và linh thú, `farm.js` xử lý điều khiển, UI và bản đồ.

## Lưu tiến trình

Lưu sau mỗi hành động và mỗi 10 giây vào localStorage khóa `nhat-diem.farm.v1`. Thời gian và cây không chạy khi tắt trang, mở hộp thoại, tạm dừng hoặc chuyển tab. Không đồng bộ giữa máy/trình duyệt. Nút **?** có chức năng xuất/nhập JSON và bắt đầu lại với xác nhận. Khi trình duyệt chặn lưu trữ, game vẫn chơi được trong phiên và có thể xuất bản lưu. Nhập JSON chỉ nhận các trường game đã biết và kiểm tra giới hạn giá trị.

## Kiểm thử

Không cần dependency cho kiểm thử luật chơi (Node.js 24):

```sh
node tests/world.test.cjs
node --check world.js
node --check game.js
node --check farm.js
```

10 kiểm thử bao gồm vòng đời 3 loại cây, mưa, thể lực, kinh tế, phép sương, phần thưởng hằng ngày, quan hệ, nhiệm vụ, toàn bộ chương, lưu/nhập và lịch mùa.

Kiểm thử trình duyệt cần Playwright và Chromium có sẵn trong môi trường phát triển:

```sh
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/browser.cjs
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/scenarios.cjs
```

Suite thực hiện thao tác chuột/chạm thực tế qua tìm đường, trồng 3 cây, ngủ, thu hoạch, mua bán, đối thoại, nhặt gỗ, câu cá, phép sương, tải lại bản lưu, bàn phím, tạm dừng, xuất JSON và điện thoại. Ảnh kiểm tra được ghi vào `/tmp/nhatdiem-*.png`.

## Xuất bản

Push lên `main` chạy `.github/workflows/pages.yml`: kiểm tra cú pháp và luật chơi rồi xuất bản file tĩnh bằng GitHub Pages. Địa chỉ: https://letsstudy222.github.io/game06/. Repository cần chọn Settings → Pages → Source: GitHub Actions.

## Mỹ thuật và âm thanh

Nền nông trại `assets/garden-detailed.png` được tạo riêng; không dùng tài sản Stardew Valley. Nhân vật nông dân có sprite sheet 16 khung hình, 4 hướng di chuyển (`assets/farmer-walk.png`); An có sprite riêng (`assets/an-gardener.png`), đều được tạo riêng cho game. Các ô canh tác, cây trồng, vật phẩm, quầy hàng và đài cổ được vẽ bằng Canvas. Phượng Hoàng pixel có cánh và đuôi chuyển động riêng. Hiệu ứng ngày/đêm, mưa, bướm/phấn hoa, đom đóm và ánh đèn được dựng trực tiếp; reduced motion giảm chuyển động trang trí.

Ảnh chân dung Phượng Hoàng lấy theo yêu cầu chủ dự án từ `letsstudy222/ankis`, commit `4f2d050be28aa349ee6ea43c918d60c37adf1e87`, các file `assets/pets/legend/phoenix-{1,2-v2,3-v2}.png`. Be Vietnam Pro tải từ Google Fonts, có sans-serif dự phòng. Âm thanh tổng hợp bằng Web Audio, tắt mặc định, bật sau thao tác người dùng; không dùng nhạc ngoài.
