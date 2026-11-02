# Hải Uyên v1.0 — tích hợp chọn lọc vào website hiện tại

02/11/2026 (Asia/Saigon). Được người dùng cho phép xuất bản trực tiếp tại `https://letsstudy222.github.io/game06/hai-uyen.html`, giữ nguyên game Dawn và không merge toàn bộ work.

## Phạm vi phát hành

Baseline main: `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`. Source Hải Uyên: work `c488ed241fd405e67b75469cba874ba7f72c09ea`, kế thừa bản bàn giao64349e3. Branch `release/hai-uyen-site-v1` được tạo từ main, copy đúng nhóm file bên dưới; không cherry-pick merge commit work và không đưa lịch sử Task14–34 vào main.

- Mới: `hai-uyen.html`; `src/hai-uyen/{maps,model,save,view,main}.mjs`, `src/hai-uyen/style.css`; bốn JSON M4 trong `data/hai-uyen/`.
- Mới: `tests/hai-uyen.test.mjs`, `tests/hai-uyen.browser.cjs`, `tests/hai-uyen.smoke.cjs`, `tests/site-integration.browser.cjs` và báo cáo này.
- Sửa `index.html`: link tương đối `hai-uyen.html` với nút “Chơi thử Hải Uyên”, không đổi entry game cũ; bump version CSS cho các cách phục vụ source cũ.
- Sửa `style.css`: chỉ thêm style phạm vi `.hai-uyen-launch`, có trạng thái focus và vị trí riêng trên mobile, không sửa rule cũ.
- Sửa `scripts/build-site.cjs`: giữ nguyên phần build Dawn trên main và nối phần đóng gói Hải Uyên, có revision cho toàn bộ module/CSS/JSON.
- Sửa `package.json`: giữ scripts chính của main, thêm suite18 test Hải Uyên và lệnh test browser/site. Không thay dependency hoặc lockfile.
- Sửa `.github/workflows/pages.yml`: vẫn push main, cùng Pages environment/concurrency/permissions đang có. Thêm npm ci, syntax check, Chromium và smoke kiểm tra /game06/ trước configure/upload/deploy Pages; upload evidence. Không đổi Pages Settings qua API.

Không đưa sang main: các thay đổi Dawn/foundation Task27–32, canonical docs Task14–34, art/concept studies, toàn bộ artifacts mới của work, workflow preview, template tạo repo khác hoặc đề xuất CDN. Existing `src/island/`, assets, canonical docs và legacy giữ nguyên byte-for-byte so với main. Không xóa tệp cũ, không force push, không reset lịch sử main.

## Website và lưu trữ

- `/game06/` và `/game06/index.html`: Dawn vẫn chạy mặc định; link mới chỉ điều hướng khi người dùng chọn.
- `/game06/hai-uyen.html`: bản chơi Quy solo, bốn phòng, K1–K4/Space, puzzle, miniboss, checkpoint và ba slot. Menu có đường quay về `index.html` tương đối.
- Module, JSON, font, favicon và CSS đều resolve dưới cùng project prefix. Không thêm backend hoặc credential; giữ HTTPS/TLS/proxy của môi trường.
- Save Hải Uyên có namespace riêng `hai-uyen.vs.v1.slot.*`, không đổi/xóa save settings/farm. Game mới không ghi schema save của Dawn. Test click/tap qua hai game và refresh xác nhận các key cũ còn nguyên.
- Toàn bộ Quy/quái/terrain/FX mới là art tạm trong engine, không sprite production cắt từ concept. Không sửa canon hoặc ghép sandbox vào main quest Chương I.

## Kiểm tra trước khi push main

- `npm test`: **48/48**, gồm30 logic Dawn trên main và18 logic Hải Uyên. Các suite foundation khác ở work không đưa vào release vì main không chứa các module tương ứng; không bỏ test của main hoặc skip test lỗi.
- `npm run build`: Dawn revision `6e2ede732c74`, Hải Uyên `9ea52f9ed807`; Dawn revision đổi vì index/CSS thêm link, không đổi gameplay assets/code.
- `node --check`: kiểm mọi JS/MJS/CJS của release; workflow YAML và shell kiểm hợp lệ.
- `SITE_URL=.../game06 ARTIFACT_DIR=... node tests/site-integration.browser.cjs`: desktop1366×768, portrait390×844, small320×640, landscape844×390. Mỗi target kiểm Dawn movement, link nhìn thấy/tap>=44px/không chồng điều khiển, điều hướng Hải Uyên, K3/K1, refresh CD/buff, giữ key cũ, quay lại Dawn, không scroll hoặc lỗi asset/page.
- Smoke built Dawn/Hải Uyên dưới `/game06/`: PASS; cùng revision module/data; không page/asset errors.
- `tests/ui.browser.cjs` của Dawn: cả4 viewport PASS cho camera, controls, bounds, settings và input.
- `tests/hai-uyen.browser.cjs` chạy trên build release cùng prefix: phải hoàn tất hành trình input thật A1→B1→LAB→ARENA, hai phase/ba tell boss, nhận thưởng+refresh, quay về A1, slot save và mobile đa chạm. Chỉ push sau khi suite đạt.

## Xuất bản và kiểm chứng

Push fast-forward duy nhất commit release từ nhánh bắt đầu ở main; xác minh tip main không đổi từ baseline ngay trước push. Existing workflow Pages sẽ deploy `_site` chỉ sau khi toàn bộ validation đạt. Không dispatch workflow production từ work.

Run GitHub Pages của đúng SHA cần success trước khi báo đã xuất bản. Host letsstudy222.github.io/api.github.com từng bị proxy môi trường chặn CONNECT403; nếu còn chặn, báo rõ kiểm tra trực tiếp URL bị giới hạn, không suy HTTP403 proxy thành lỗi404/site. Artifact/run success và browser local không thay thế tuyên bố đã kiểm gameplay qua Internet. Network draft cho host đã lưu trước đó; không tắt proxy hoặc TLS để vượt policy.
