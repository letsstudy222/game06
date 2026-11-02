# Build, test và deployment — chứng cứ Task25

Ngày01/11/2026 Asia/Saigon, baseline `1bae0846ecfc0e2aab23a000abf2371a84e6b233`. Môi trường Linux x86_64/glibc2.41, Node v24.19.0, npm11.9.0, Playwright1.62.1, Chromium154.0.8037.57. Không cài dependency mới. Bản sao git archive HEAD tại `/tmp/task25-runtime-v006xz6d`, dùng node_modules hiện hữu chỉ để đọc dependency; npm cache riêng trong bản sao. Không thực thi script tạo art.

## An toàn trước chạy

Đã đọc package.json, scripts/build-site.cjs, ba tests/*.browser.cjs và unit scripts. Unit đọc mã/PNG, dùng fixture trong bộ nhớ. Build có rmSync `_site`; browser scripts ghi đè ảnh và qa-results.json trong artifacts, nên chỉ chạy ở bản sao. HTTP server localhost8765 phục vụ webroot/game06→_site của bản sao, `GAME_URL=http://127.0.0.1:8765/game06/`, `CHROMIUM_PATH=/usr/bin/chromium`. Browser dùng context mới, không profile/save người chơi.

## Kết quả thực chạy

| Lệnh / môi trường | Trạng thái | Exit | Kết quả / side effect |
| --- | --- | --- | --- |
| node --check trên23 src/island/*.mjs và8 scripts/*.cjs, đọc source repo chính | PASS | 0 cho31tệp | Chỉ parse, không thực thi script hoặc sinh art |
| npm test, bản sao tạm | PASS | 0 | 19island+5UI+6sample=30; fail0/skipped0; không viết mã hoặc asset |
| npm run build, bản sao tạm | PASS | 0 | Static Pages package revision cc45f0893967; tạo `_site` trong /tmp |
| npm run test:browser, sandbox mặc định | BLOCKED | 1 | Chromium SIGTRAP/setsockopt Operation not permitted trước boot; không là lỗi assertion game |
| npm run test:ui, sandbox mặc định | BLOCKED | 1 | Cùng hạn chế socket/process; server bind localhost cũng bị chặn |
| npm run test:sample, sandbox mặc định | BLOCKED | 1 | Cùng hạn chế môi trường; đã chạy lại bằng tiến trình được cấp quyền |
| npm run test:browser, localhost/bản sao, tiến trình được cấp quyền | PASS | 0 | 41.97giây; boot/fullscreen/idle/move/hover/attack/fire, đi forest/ruins/beach, shrine, damage/hurt/HP/hover, focus release/farm key, không console hoặc asset error |
| npm run test:ui, cùng bản sao | PASS | 0 | 13.32giây; viewport390×844,360×800,844×390,1920×1080: controls/camera/bounds/settings/input |
| npm run test:sample, cùng bản sao | PASS | 0 | 23.43giây; sample=1, keyboard/actions, hai cầu thang/forest/shrine/coast, camera bounds; default entry giữ dawn, không page/asset error |
| Probe Playwright DPR1/DPR2, localhost | PASS | 0 | Cùng viewport1366×768→Canvas683×384/scale2, pixelated/smoothing false, zero pageerror |
| Art generation, legacy suite, physical device, Quy/RPG tests | NOT RUN | — | Ngoài phạm vi hoặc cơ chế chưa tồn tại; 295ca QA Phase III không được tính PASS |

Không có runtime assertion FAIL trong các suite chạy được; BLOCKED ban đầu được giữ riêng, không che dưới kết quả PASS. Không có ca nào được tự gán SKIPPED thay cho NOT RUN; unit runner báo skipped0.

Log `/tmp/task25-run-0.log`, `/tmp/task25-run-1.log`, `/tmp/task25-test-*-authorized.log`, kết quả `/tmp/task25_test_results.json` và probe `/tmp/task25_browser_probe.json` là bằng chứng tạm của phiên, không artifact phát hành lâu dài. Browser tạo/thay22 tệp ảnh/JSON trong artifacts của bản sao; không đưa chúng vào repository. Một ảnh `artifacts/dawn-meadow.png` mới đã được xem trực tiếp: thấy Phượng, tile cảnh đảo, HUD và controls; các ảnh khác chưa được review thủ công toàn bộ. Không đo FPS, memory hoặc chất lượng trên thiết bị thật. Thời gian suite không phải benchmark gameplay.

## CI và deployment được xác minh

[pages.yml](../../.github/workflows/pages.yml) tên Publish Dawn Island: push branches:[main] và workflow_dispatch; concurrency pages/cancel-in-progress. Job Node24 chạy node--check, npm test, build-site rồi upload `_site` và deploy-pages, có pages/id-token write. Không npm ci hoặc browser suite trong job hiện tại; unit không cần Playwright nên run hiện tại vẫn thành công. Không có preview workflow riêng trong inventory.

Push work **không tự kích hoạt** workflow này. workflow_dispatch là đường khác có thể chạy ref được chọn nếu quyền/environment cho phép; không được suy rằng work vĩnh viễn không thể deploy. Không gọi dispatch hoặc đổi Pages settings ở Task25.

Trang GitHub Actions truy cập được và xác minh [run41165112693](https://github.com/letsstudy222/game06/actions/runs/41165112693): triggered via push, branch main, commit `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, Status Success, tổng21giây, deploy16giây; artifact github-pages6.9MB, digest `sha256:55008e4d8a35b9eef518ffe95ad7b3e1c6ab33a5c4b076c96656fc7d4bc09d67`, liên kết deploy `https://letsstudy222.github.io/game06/`. Đây là lần chạy thành công mới nhất thấy trên danh sách workflow tại lúc kiểm tra; không phải xác nhận trực tiếp bytes đang được CDN phục vụ.

Git diff giữa main SHA trên và work baseline không có thay đổi trong src/assets/scripts/tests/workflow/index/style/package*.json. Tuy nhiên main object không có TASK24_DECISIONS.md; không suy main chứa Phase III mới. GitHub API repo/pages/actions/deployments và request trang Pages bị proxy từ chối tunnel403: **BLOCKED do network policy**, không kết luận website lỗi403. Pages setting/build_type hiện hành, response public/live ETag và browser tương tác public chưa xác minh. Trang deployments/github-pages trên github.com trả404, không đủ kết luận không có deployment.

## Đường dẫn, rollback và promotion — PROPOSED

Local build đã chạy đầy đủ dưới prefix `/game06/`; ES module imports và asset relative theo document.baseURI hợp lệ tại prefix đó. Điều này chưa chứng nhận mọi CDN/service-cache policy. Build copy screenshots lịch sử vào screenshots/, không làm chúng thành test result mới.

Giữ main là tuyến public ổn định theo workflow quan sát, work là tích hợp tài liệu/kỹ thuật; nhánh task cô lập khi được giao. Kiểm unit/build/browser trước PR/promotion; không đổi default scene bởi thêm Quy. Preview tĩnh hoặc local build chỉ sau scope riêng, không dispatch vào cùng production environment để gọi là preview. Rollback đề xuất là revert commit phát hành lỗi bằng commit mới đã review rồi deploy main, hoặc redeploy artifact tốt nếu platform/retention/quyền thực sự cho phép; không hứa artifact cũ luôn còn. Không reset/force-push, không rollback save bằng schema cũ. Warning Actions về Node20 actions bị ép Node24 và runner-image migration là nợ theo dõi, không đã sửa trong Task25.
