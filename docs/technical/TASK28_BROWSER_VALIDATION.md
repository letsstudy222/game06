# Kiểm thử thực tế Task 28

Ngày 01/11/2026 (Asia/Saigon). Node 24.19.0, npm 11.9.0, Playwright 1.62.1 và Chromium 154.0.8037.57 headless trên Linux. Browser đã chạy thực tế với localhost và quyền sandbox phù hợp; không suy kết quả browser từ Node build.

## Baseline và cách ly artifact

Baseline `356d15667384c02e126d0763f7135a2818552ab7` sạch đã chạy lại trước sửa. Dùng git archive vào thư mục tạm, sau đó bản sau thay đổi được phủ đúng source/tests mới; node_modules dùng lại. Build phục vụ tại `/game06/` trên localhost để kiểm deployment prefix. Không chạy art generation hoặc ghi output build vào working tree.

Các lệnh browser dùng `GAME_URL=http://127.0.0.1:8765/game06/` và `CHROMIUM_PATH=/usr/bin/chromium`. Lệnh renderer sau sửa có `RENDER_BASELINE` trỏ đến JSON fingerprint trước sửa. Mọi lệnh bên dưới exit 0:

| Lệnh | Thời gian trước | Thời gian sau | Kết quả / exit |
| --- | --- | --- | --- |
| `npm test` | 1.66 s | 1.42 s | PASS / 0 |
| `npm run build` | 0.16 s | 0.17 s | PASS / 0 |
| `npm run test:browser` | 41.76 s | 41.61 s | PASS / 0 |
| `npm run test:ui` | 12.85 s | 12.54 s | PASS / 0 |
| `npm run test:sample` | 23.31 s | 23.19 s | PASS / 0 |
| `npm run validate:assets` | Không có trước Task 28 | 0.12 s | PASS / 0 |
| `npm run test:renderer:browser` | Không có trước Task 28 | 1.63 s | PASS / 0 |

`npm test` trước: 58 PASS, 0 FAIL (19 island + 5 UI + 6 sample + 28 assets). Sau: 76 PASS, 0 FAIL, thêm 18 renderer. Ba script browser hiện hữu không dùng bộ đếm node:test: lần lượt 6 nhóm PASS, 4 viewport PASS và 5 nhóm PASS. Asset validation kiểm 9 ảnh PNG, không thiếu required asset.

Sau khi chỉnh tên unit test để phân biệt viewport math với DPR thực và bổ sung assertion kích thước ảnh phân số, đã chạy riêng `npm run test:renderer`: 18 PASS, 0 FAIL. Source renderer không đổi sau bộ regression đầy đủ.

## Evidence pixel và trình duyệt

[renderer.browser.cjs](../../tests/renderer.browser.cjs) dựng hai cảnh `dawn`/`dawn-sample` bằng GameState, AssetLoader và IslandScene thật. Mỗi cảnh có 12 cấu hình state/facing xác định (idle/move bốn hướng, attack, fire, hurt, fly), canvas 640×360, thời gian cố định. Hash SHA-256 toàn bộ RGBA sau sửa **khớp 24/24** với baseline trước sửa; đây là so sánh dữ liệu ảnh thực, không chỉ kiểm draw-call. Fixture state không thay kiểm tương tác keyboard; các script browser cũ vẫn chạy di chuyển, combat và shrine thật.

Chuẩn bị baseline bằng script renderer mới chạy ở chế độ `FINGERPRINT_ONLY=1` trong bản source cũ; lúc đó chỉ thu hash và viewport, không import helper chưa tồn tại. Sau sửa dùng `RENDER_BASELINE` để assert deep equality. Không đóng băng hash theo browser khác: có thể tái tạo baseline từ git revision trên cùng môi trường.

Kiểm thêm 8 phép so sánh pixel helper với drawImage tham chiếu: hai vị trí nguyên/phân số × mirror có/không × DPR 1/2, dùng atlas Phượng thật. Anchor và transparency giữ đúng; không phát sinh hình production.

| Viewport CSS | Canvas backing | Scale | DPR đã chạy |
| --- | --- | --- | --- |
| 1366×768 | 683×384 | 2 | 1 và 2 |
| 390×844 | 195×422 | 2 | 1 và 2 |
| 844×390 | 422×195 | 2 | 1 và 2 |

Sáu tổ hợp resize/DPR kiểm `devicePixelRatio`, scale nguyên, CSS pixelated, smoothing=false và giới hạn world. Các script UI cũ còn kiểm 360×800 và 1920×1080, controls/settings/safe bounds. Không có page error hoặc HTTP asset error được ghi nhận trong các lượt browser. Dawn và Dawn Sample vẫn tải, route mặc định không đổi.

## Artifact và giới hạn

Artifact tạm của lượt này: `/tmp/task28-before-94uwubbo`, `/tmp/task28-after-t0tsy5kh`; log tổng hợp `/tmp/task28-before-results.json`, `/tmp/task28-after-results.json`; fingerprint baseline `/tmp/task28-before-renderer/results.json`, kết quả sau tại `artifacts/renderer/results.json` trong bản tạm. Screenshots của ba suite cũ nằm trong artifacts của bản tạm. Đây là evidence phiên làm việc, không bảo đảm tồn tại lâu dài và không được commit.

Build revision trước `a0a3b3be820c`, sau `8ccbdf51a2ee`: đổi source renderer nên revision đổi như dự kiến. So sánh byte xác nhận 15 tệp asset trong build giữ nguyên. Kiểm tra 533 tracked files ngoài hai tệp được phép sửa xác nhận nội dung khớp Git; artwork, manifest, input, camera và collision không đổi. Kiểm tra cú pháp 44 tệp JavaScript, 21 liên kết nội bộ trong tám tài liệu, bảng, code fence và git diff --check đều đạt. Các thời gian trên là thời gian chạy suite, **không phải benchmark FPS hoặc độ trễ**.

Chưa kiểm physical mobile, browser zoom phân số, DPR 1.25/3, tải nhiều actor hoặc underwater scene chưa có. Không chứng nhận art Quy, S0 gameplay hoặc Task 44 camera mới. Đánh giá **PASS trong phạm vi Task 28** dựa trên code, unit tests và regression browser thực.
