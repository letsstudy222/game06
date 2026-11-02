# Báo cáo kiểm thử Task27

Baseline code d239855f476ee61bda8a5575b0709d34400ebe46 được chạy mới trước thay đổi; không dùng lại kết quả Task25. Linux, Node24.19.0/npm11.9.0, Playwright1.62.1, Chromium154.0.8037.57 có sẵn, không cài dependency. Mọi script đã được đọc trước khi chạy: build xóa_site, browser ghi artifacts, vì vậy chạy git archive/bản sao sửa trong /tmp; server8765 cung cấp /game06/ và browser context mới, không dùng save người chơi. Không chạy art-generation.

| Lệnh | Trước / exit / thời gian | Sau / exit / thời gian |
| --- | --- | --- |
| `npm test` | PASS / 0 / 0.92s | PASS / 0 / 1.18s |
| `npm run build` | PASS / 0 / 0.14s | PASS / 0 / 0.15s |
| `npm run test:browser` | PASS / 0 / 42.37s | PASS / 0 / 41.45s |
| `npm run test:ui` | PASS / 0 / 12.36s | PASS / 0 / 13.0s |
| `npm run test:sample` | PASS / 0 / 23.15s | PASS / 0 / 23.12s |

npm test trước:19island+5UI+6sample=30PASS/0FAIL/0skipped. Sau:30cũ+28asset=58PASS/0FAIL/0skipped. Hai npm script mới validate:assets và test:assets cũng chạy thực:9PNG tham chiếu hợp lệ và28asset tests PASS. node--check trên41tệp src/scripts/tests đạt.

Ba browser suite trước/sau kiểm default Dawn, sample=1, idle/move/hover/attack/fire, route forest/ruins/beach/stairs, shrine/hazard/HP/focus/settings/farm key, bốn viewport UI; không page/asset errors theo assertions. Built prefix/game06/ dùng thật, không chỉ URL unit assertion. Không chạy physical device hoặc Quy scene chưa tồn tại, không đo FPS và không pixel-diff ảnh ambient động.

Lượt phát triển đầu của suite24asset tests trong sandbox mặc định cho21PASS/3FAIL do subprocess output bị trống. Chạy lại cùng24test ngoài sandbox đạt24/24, sau đó mở rộng lên28 và chạy đầy đủ PASS. Đây là hạn chế môi trường/stdio đã được đối chiếu, không bỏ qua hoặc đánh skipped ba test CLI/build. Browser chạy trong tiến trình được cấp quyền vì socket/Chromium cần quyền đó.

## Phạm vi28kiểm thử mới

Valid existing3manifests/Phoenix, valid future fixture, missing required/optional, width/height/grid/rect/index, clip refs/duration/required clips, duplicate asset/frame/clip, anchor/visual bounds/required metadata, malformed optional dimensions/schema, unsupported PNG/checksum, path traversal/encoding/absolute/URL/symlink, baseURLprefix, CLI cwd/exit/diagnostics, image categories, build digest thay font và fail trước xóa output tốt. Tất cả dùng temp fixture; không đăng ký production Quy.

## Side effect và bảo toàn

Hai thư mục chạy: `/tmp/task27-before-9a3087zv` và `/tmp/task27-after-tee9fq85`. Log JSON tại /tmp/task27-before-results.json và /tmp/task27-after-results.json, bằng chứng tạm của phiên, không phát hành. _site/screenshots/qa-results và fixture thay đổi chỉ ở bản sao. Source repo không nhận generated artifacts hoặc binary diff. Build assets trước/sau được so byte-for-byte: giống nhau. Source runtime và asset tracked so git blob hashes: không đổi. Build revision đổi từcc45f0893967 sang a0a3b3be820c do coverage digest được mở rộng; không phải đổi ảnh/timing.

Kết quả Task27 **PASS** cho phạm vi validation foundation đã chạy; không là PASS production Quy/S0 hoặc chứng nhận full PNG decode/provenance. CI/workflow/public deployment không bị sửa hoặc kích hoạt. Các gate visual/catalog/plane/HP/persistence vẫn trạng thái nguồn. Task28chưa bắt đầu.
