# Kết quả kiểm thử Task 29

Ngày 01/11/2026 (Asia/Saigon). Node 24.19.0, npm 11.9.0, Playwright 1.62.1, Chromium 154.0.8037.57 headless Linux. Browser và localhost đã chạy thực tế với quyền sandbox phù hợp. Không lấy tài liệu Task 28 thay cho phép kiểm mới.

## Baseline và lệnh thực thi

Baseline sạch `b90d731d5cec5318ae318d8bf827fa146be7cb0e` được đối chiếu remote và chạy lại toàn bộ kiểm tra trước sửa. Dùng git archive vào bản tạm; bản sau phủ đúng source/tests mới. Build và browser artifacts chỉ nằm trong bản sao, không sinh artwork hoặc ghi _site vào working tree dự án.

Browser dùng `GAME_URL=http://127.0.0.1:8765/game06/`, `CHROMIUM_PATH=/usr/bin/chromium`. Sau sửa, `RENDER_BASELINE` trỏ JSON fingerprint baseline cùng môi trường. Mọi lệnh sau đã thực thi, exit 0:

| Lệnh | Trước | Sau | Kết quả / exit |
| --- | --- | --- | --- |
| `npm test` | 1.36 s | 1.3 s | PASS / 0 |
| `npm run build` | 0.16 s | 0.14 s | PASS / 0 |
| `npm run test:browser` | 41.57 s | 41.45 s | PASS / 0 |
| `npm run test:ui` | 12.6 s | 12.96 s | PASS / 0 |
| `npm run test:sample` | 23.31 s | 23.34 s | PASS / 0 |
| `npm run validate:assets` | 0.13 s | 0.12 s | PASS / 0 |
| `npm run test:renderer:browser` | 1.67 s | 1.6 s | PASS / 0 |
| `npm run test:map:browser` | Chưa có script map | 2.03 s | PASS / 0 |

`npm test` baseline: **76 PASS, 0 FAIL**. Sau: **108 PASS, 0 FAIL** = 19 island + 5 UI + 6 sample + 28 asset + 18 renderer + 32 map. Trước suite đầy đủ còn chạy riêng `npm run test:map` hai lượt: mỗi lượt 32 PASS, 0 FAIL. Renderer unit nằm trong npm test; không coi tên script chưa chạy riêng là một lượt chạy bổ sung.

Map tests gồm dimensions/version/IDs/refs, layer grid, solid/spawn, collision độc lập art, parallax scope, culling tile chữ nhật, sorting, fade entry/exit/multiple/distant/bypass/hysteresis/reset, map immutability, current normalize/zero/vector-invalid/overlap/binding/FX-off và compatibility Dawn. Ba browser script cũ lần lượt báo 6 nhóm PASS, 4 viewport PASS và 5 nhóm PASS; đây không phải node:test count. Asset validator kiểm 9 PNG, không có required asset bị thiếu.

## Browser và evidence ảnh

Renderer suite Task 28 chạy lại: **24/24 fingerprint RGBA Dawn/Dawn Sample khớp baseline**; 8 Canvas pixel comparisons và 6 tổ hợp DPR/resize đạt. Các script cũ vẫn điều khiển Phượng thật, kiểm keyboard/mobile UI, animation, collision, camera, shrine, focus và default route.

Map browser có 2 context DPR 1/2, mỗi context resize 390×844 và 844×390 từ desktop 1366×768. Fixture dựng LayeredMapView thật qua harness canvas riêng, không thay IslandGame hoặc scene registry. Không ghi nhận page error hoặc HTTP asset error.

| Kiểm tra pixel/alpha | Kết quả thực ở cả DPR 1 và 2 |
| --- | --- |
| Trước fade | alpha 1; pixel tại (112,80) = RGBA (194,105,119,255), object che actor |
| Sau hai update 0.1 s | alpha 0.4; cùng pixel = (231,195,201,255), actor trắng nhìn được qua object |
| Actor rời vùng | Sau hai update alpha 1 và pixel trở lại giá trị gốc |
| Cell solid có art nước | Pixel tại (40,40) vẫn (23,69,89,255); art không quyết passability |
| Current debug tắt/bật | Query giữ nguyên direction (0.6,0.8), strength và field identity; actor pose không đổi |
| Resize | Pixel kiểm tra giữ nguyên; game scale nguyên, CSS pixelated; không đổi default Dawn |

Đã chụp **6 ảnh thật**: opaque, faded, current-debug cho mỗi DPR. Đã mở xem trực tiếp ba ảnh DPR 1: object đặc trước fade, actor trắng hiện qua object sau fade và bounds/vector debug riêng. Không gọi đây là artwork đẹp hoặc underwater production scene. Không so ảnh fixture với bản trước vì fixture mới; phép so RGBA trước/sau áp riêng cho hai cảnh Dawn thật.

## Artifact và giới hạn

Bản tạm trước: `/tmp/task29-before-2caje433`; sau: `/tmp/task29-after-ibosu2s0`. Log: `/tmp/task29-before-results.json`, `/tmp/task29-after-results.json`. Fingerprint trong `artifacts/renderer/results.json`; ảnh và pixel/alpha results mới trong `artifacts/map/` của bản sau. Evidence phiên làm việc không được commit và không bảo đảm tồn tại lâu dài; tests đã commit cho phép tái tạo trên cùng môi trường.

Build revision trước `8ccbdf51a2ee`, sau `fa649b28c06c`; source module mới làm revision đổi như dự kiến. Không đổi binary asset, manifest hoặc dependency/lockfile. Kết quả kiểm cú pháp, liên kết và byte preservation được ghi trong audit trước handoff.

Các thời gian trên là thời gian suite, không benchmark FPS/heap hoặc chứng minh performance tăng. Chưa kiểm physical mobile, browser zoom phân số, map production lớn, silhouette art thực, evolved body clearance hoặc underwater current force integration. Camera/spawn checks mới chỉ là foundation 2D và point-solid; không chứng nhận Task 43–45 đã hoàn tất.

**PASS trong phạm vi Task 29**, dựa trên implementation và kiểm thử thực; không đồng nghĩa Quy có thể bơi, Chapter I đã chơi được hoặc S0/S1 hoàn tất. Task 30 chưa bắt đầu.
