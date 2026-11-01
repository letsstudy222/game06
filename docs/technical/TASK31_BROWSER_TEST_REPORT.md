# Kết quả kiểm thử Task 31

Ngày 01/11/2026 (Asia/Saigon). Node 24.19.0, npm 11.9.0, Playwright 1.62.1, Chromium 154.0.8037.57 headless Linux. IndexedDB thật đã chạy, không dùng Node memory backend để chứng nhận durability browser. Không kiểm thiết bị di động vật lý, nhiều browser engines hoặc crash phần cứng.

## Baseline và lệnh thực thi

Baseline sạch `0fb44fc2f1ee9f1b52474623cc8daccb333e32b6` đã được đối chiếu actual origin/work, kiểm Task 30 và chạy lại regression trước sửa. Dùng git archive vào /tmp, phủ đúng source/tests mới vào bản sau; build phục vụ dưới prefix /game06/ trên localhost. Không dùng browser profile hoặc database của người chơi.

Các script browser dùng GAME_URL=http://127.0.0.1:8765/game06/ và CHROMIUM_PATH=/usr/bin/chromium. RENDER_BASELINE của lượt sau trỏ fingerprint baseline cùng môi trường. Kết quả lượt cuối:

| Lệnh | Trước sửa | Sau cùng | Kết quả / exit |
| --- | --- | --- | --- |
| `npm test` | 1.37 s | 1.48 s | PASS / 0 |
| `npm run build` | 0.15 s | 0.15 s | PASS / 0 |
| `npm run test:browser` | 41.45 s | 41.42 s | PASS / 0 |
| `npm run test:ui` | 12.87 s | 12.51 s | PASS / 0 |
| `npm run test:sample` | 23.22 s | 23.43 s | PASS / 0 |
| `npm run validate:assets` | 0.14 s | 0.19 s | PASS / 0 |
| `npm run test:renderer:browser` | 1.58 s | 1.98 s | PASS / 0 |
| `npm run test:map:browser` | 2.02 s | 2.01 s | PASS / 0 |
| `npm run test:input:browser` | 3.26 s | 3.16 s | PASS / 0 |
| `npm run test:persistence:browser` | Chưa có persistence harness | 1.88 s | PASS / 0 |

`npm test`: baseline **146 PASS, 0 FAIL**; sau cùng **181 PASS, 0 FAIL** = 19 island + 5 UI + 6 sample + 28 asset + 18 renderer + 32 map + 38 input + 35 persistence. Ngoài suite đầy đủ đã chạy riêng npm run test:persistence: ban đầu 33 PASS, sau bổ sung checks 35 PASS. Các unit asset/renderer/map/input đã nằm trong npm test, không đếm thêm lượt script riêng chưa chạy.

Node persistence unit dùng MemoryStore có fault injection để kiểm schema/protocol/queue; không được coi là IndexedDB simulation hoàn chỉnh. Browser persistence dùng database fixture IndexedDB thật và hai tab thật trong browser context mới.

## Evidence IndexedDB: 38 PASS, 0 FAIL

| Nhóm | Kiểm tra thực |
| --- | --- |
| Initialization/slots | DB version 1, ba slot ban đầu rỗng, save/load riêng, update/delete/import không đổi slot khác |
| Commit acknowledgement | Instrument transaction complete; chỉ có COMMITTED/verified=true sau commit và readback |
| Failure | Abort transaction thật sau put mô phỏng interrupted write; quota/security/readback được inject có kiểm soát; bản cũ không bị partial replacement |
| Ambiguous acknowledgement | Readback fail trả COMMITTED_UNVERIFIED, retry cùng requestId xác minh bản đã commit mà không tạo generation mới |
| Backup | Active thiếu/hỏng tìm đúng backup cùng slot; cần xác nhận restore; backup riêng lỗi báo INVALID khi active vẫn tốt; cả hai hỏng không tạo dữ liệu giả |
| Concurrent tabs | Hai tab/kết nối cùng revision: đúng một COMMITTED, một REVISION_CONFLICT |
| Browser lifecycle | Reload/reopen giữ snapshot; blur không tự save; database bị xóa thì active và backup đều mất, không giả recovery |
| Version | Schema 0/future và unsupported content giữ nguyên bytes; không tự downgrade/migrate/fallback để bỏ incompatibility |
| Import/export | JSON portable + checksum, download thật; preview và thiếu xác nhận không ghi; đổi đích hủy preview; confirm mới commit, backup giữ bản đích trước |
| Invalid input | Oversize, malformed JSON, prototype keys, digest hỏng, unsupported version và duplicate ledger fixture bị từ chối |
| Domain boundary | Ledger/receipts/world-state fixture giữ nguyên qua content update/round-trip; unsafe mid-boss save bị chặn, snapshot không có HP hoặc i-frame |
| Storage separation | Sentinel UI/farm localStorage không đổi; cuối test chỉ dọn database fixture |

Quota fault là DOMException được inject vào put, **không phải đã lấp đầy quota đĩa thực**. Interrupted write là transaction.abort xác định, không tuyên bố đã mô phỏng mọi power loss/process kill. Hai tab là pages thật dùng chung origin/profile; không chỉ hai mock writer trong Node.

Browser harness dựng panel quản lý fixture riêng, không thay UI Phượng hoặc tạo tiến trình Chapter I. Đã chụp và mở xem ảnh save-management.png: ba slot, destination selector, file picker, checkbox xác nhận và nút import có thật. Đã tải fixture-export.json bằng browser download rồi chọn file lại; file chỉ là dữ liệu kiểm thử và không commit. Export checksum là integrity check, không authenticated tamper protection.

## Regression

Ba script browser legacy đều PASS (6 nhóm island, 4 viewport UI, 5 nhóm sample). Dawn và Dawn Sample vẫn điều khiển Phượng bằng keyboard/touch/skills/collision/camera/settings cũ. Asset validation kiểm 9 PNG. Renderer browser giữ **24/24 RGBA fingerprint khớp baseline**, 8 pixel comparisons, 6 DPR/resize cases. Map và input browser tiếp tục PASS; không có page error hoặc HTTP asset error trong các lượt cuối.

Các trường hợp future gameplay không được tính là đã test: first Quy resonance receipt ordering, actual boss save/retry/HP, checkpoint catalog production, quest/reward logical commit và full migration. Các tests có fixture ledger chỉ kiểm dữ liệu không đổi/duplicate validation, không chứng minh live reward-grant sequence hoàn tất.

## Artifact và giới hạn

Baseline tạm: /tmp/task31-before-c4a1cala; lượt cuối: /tmp/task31-after-9pehpkgr. Log tổng hợp /tmp/task31-before-results.json và /tmp/task31-after-results.json; JSON results, ảnh và file export mới ở artifacts/persistence/ trong bản cuối. Lượt đầu triển khai tại /tmp/task31-after-skv36cmz cũng đạt 34 browser cases trước khi bổ sung edge cases. Artifact phiên làm việc không được commit hoặc bảo đảm lưu lâu dài; scripts đã commit cho phép tái tạo.

Build revision trước 133b77323178, sau a9c0ba501ba4; thêm module source làm revision đổi như dự kiến. Không đổi production asset hoặc default bootstrap. Thời gian suite không là benchmark FPS, disk durability hoặc latency.

**PASS cho Layer A và boundary Layer B trong scope Task 31. Layer C DEFERRED.** Browser có thể evict dữ liệu hoặc mất site storage; internal backup không bảo vệ trường hợp đó. Chưa có live save menu, Phoenix/Quy persistence integration, cloud sync hoặc schema migration được duyệt. Không bắt đầu Task 32.
