# Test infrastructure và inventory thực

Ngày 01/11/2026 (Asia/Saigon). Node 24.19.0, npm 11.9.0, Playwright 1.62.1, Chromium 154.0.8037.57 headless Linux. Source đã inspect: package scripts, mọi suite được liệt kê, build-site và GitHub Actions. Không dùng danh sách QA tương lai làm bằng chứng đã chạy.

## Entry points và phạm vi

| Suite | Entry command | Count sau cùng | Thực sự kiểm | Không kiểm |
| --- | --- | --- | --- | --- |
| Island unit | node tests/island.test.mjs | 19 | Phượng prototype movement/combat/geometry/assets/tiles/camera | Quy hoặc production combat tổng quát |
| UI unit | node tests/ui.test.mjs | 5 | Viewport math, legacy joystick, settings và camera | Physical mobile/browser UI render |
| Sample unit | node tests/sample.test.mjs | 6 | Sample map/art/collision/anchors | Chapter I map production |
| Asset unit | npm run test:assets | 28 | Manifest/path/grid/clip/integrity/CLI/build failures | Approved anatomy hoặc full animation quality |
| Renderer unit | npm run test:renderer | 18 | Pixel math, anchors, fallback, sorting/occlusion | Sprite Quy production |
| Map unit | npm run test:map | 32 | Validation, point-solid, fade/currents/culling | Body sweep/clearance integration |
| Input unit | npm run test:input | 38 | Intent/context/aim/joystick/cleanup/guards | Dodge, target-acquisition hoặc form transition gameplay |
| Persistence unit | npm run test:persistence | 35 | Schema/protocol/queue/fake store failures | Browser durability; dùng suite browser bên dưới |
| Diagnostics unit | npm run test:diagnostics | 21 | Safe logs/profile/geometry/observer và aggregate negative controls | FPS/mobile certification |
| Dawn browser | npm run test:browser | 6 nhóm PASS | Keyboard/action/collision/regions/focus/HUD thật | Runtime Quy |
| UI browser | npm run test:ui | 4 viewport PASS | Layout, controls, settings và safe bounds | Thiết bị vật lý |
| Sample browser | npm run test:sample | 5 nhóm PASS | Routes, stairs, shrine, camera và controls | Production Chapter I |
| Renderer browser | npm run test:renderer:browser | 24 RGBA + 8 pixel + 6 DPR/resize | Hai cảnh thật và pixel reference | Chất lượng art tương lai |
| Map browser | npm run test:map:browser | 2 DPR, 4 resize | Fixture layers/fade/current separation | Swimming force hoặc full collision solver |
| Input browser | npm run test:input:browser | 2 DPR, 4 resize, 6 re-entry + touch | Intent độc lập, multi-touch/cancel/rotation | Physical touch, damage/immunity |
| Persistence browser | npm run test:persistence:browser | 38 ca | IndexedDB thật, hai tab, faults, reload, confirmation/download | Canonical receipt/HP/migration policy |
| Debug browser | npm run test:debug:browser | 3 mode + failure page, 4 resize | Default-off, overlay/geometry, timings/errors/input/cleanup | Full scene transition engine |

`npm test` chạy chín Node suites: **202 PASS, 0 FAIL**. Baseline Task 31 chạy lại trước edits: 181 PASS, 0 FAIL. Ngoài aggregate còn chạy npm run check:syntax độc lập: exit 0, 69 tệp; npm run test:diagnostics với execution permissions phù hợp: 21 PASS, 0 FAIL. Counts browser là loại evidence khác, không cộng thành một con số gameplay tests. Asset validator CLI kiểm 9 PNG; syntax script kiểm 69 JavaScript files. Lệnh đơn lẻ vẫn giữ tên cũ; không rename/remove workflow nào.

## Aggregate mới

`npm run test:regression` gọi scripts/run-regression.cjs, copy tracked working content và untracked src/scripts/tests sang thư mục game06-qa-* trong os.tmpdir. Untracked asset/art cần được đưa vào Git inventory trước khi muốn bundle kiểm thử; runner không tự copy thư mục ngoài scope hoặc player profiles. Symlink source bị từ chối; node_modules hiện có được dùng lại, không npm install hoặc viết dependency/lockfile.

Build và browser artifacts chỉ ở bản tạm; localhost bind 127.0.0.1 với port 0 do OS chọn, phục vụ duy nhất /game06/ từ _site, không directory listing/traversal. Child runs async để HTTP server tiếp tục phục vụ. Cleanup server/socket trong finally; child timeout 180s dùng process-group terminate/kill trên POSIX. Bundle/log được giữ để review và có thể xóa sau, không commit.

Child fail làm aggregate fail, giữ nguyên nonzero exit và dừng suite sau. Unit negative control tạo Git fixture riêng: child exit 7 khiến CLI exit 7 và build sau không chạy; timeout fixture trả 124. Không có cơ chế “retry tới khi xanh” hoặc bỏ failure khỏi report.

## Lệnh cuối thực tế và thời gian đo

Aggregate đã được thực thi, report tại /tmp/game06-qa-irVXns/qa-results.json. Các command con dưới đây thực sự chạy; script aliases ở bảng inventory không được hiểu là các lượt độc lập bổ sung nếu đã nằm trong npm test.

| Command thực | Baseline đo | Lượt cuối đo | Exit / kết quả |
| --- | --- | --- | --- |
| `/opt/codex/runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-syntax.cjs` | Suite mới/lệnh syntax trực tiếp | 1.747 s | 0 / PASS |
| `npm test` | 1.8 s | 1.748 s | 0 / PASS |
| `npm run validate:assets` | 0.13 s | 0.153 s | 0 / PASS |
| `npm run build` | 0.16 s | 0.164 s | 0 / PASS |
| `npm run test:browser` | 41.88 s | 41.297 s | 0 / PASS |
| `npm run test:ui` | 13.07 s | 12.277 s | 0 / PASS |
| `npm run test:sample` | 23.39 s | 23.134 s | 0 / PASS |
| `npm run test:renderer:browser` | 1.61 s | 1.597 s | 0 / PASS |
| `npm run test:map:browser` | 1.99 s | 2.06 s | 0 / PASS |
| `npm run test:input:browser` | 3.33 s | 3.258 s | 0 / PASS |
| `npm run test:persistence:browser` | 1.79 s | 1.956 s | 0 / PASS |
| `npm run test:debug:browser` | Suite mới/lệnh syntax trực tiếp | 10.394 s | 0 / PASS |

Các thời gian là suite wall time, không FPS hoặc performance budget. Hai aggregate trước đã thất bại và được giữ bằng chứng: lần đầu observer chưa phân loại requestfailed của intentional missing asset, lần hai phát hiện CDP touchCancel race trong test cũ. Đã sửa bounded expectation cho đúng fixture và chờ DOM state có timeout 3s trong input.browser, không sửa runtime input. Focused input/debug rồi aggregate cuối đạt; không che các lượt thất bại.

## Environment/CI và artifact

Node suites cần Node >=24 và repository assets; diagnostics negative control còn cần Git, filesystem /tmp và child processes. Lượt thử trong sandbox hẹp ban đầu bị EPERM khi spawn git; chạy lại với execution permissions phù hợp đạt 21/21. Browser suites cần Playwright cài sẵn, Chromium qua CHROMIUM_PATH, localhost permissions và browser contexts mới. Không có physical-device hoặc multi-browser claim.

Workflow hiện hữu chỉ push main hoặc workflow_dispatch: syntax src/scripts, npm test, build rồi Pages upload/deploy. Chưa cấu hình full browser/aggregate trong CI và chưa có bằng chứng CI run mới cho Task 32. Có thể chạy aggregate trong CI sau setup browser/dependencies phù hợp; Task 32 không sửa workflow hoặc dispatch/public deploy.

Artifacts từng suite nằm dưới artifacts/ trong /tmp/game06-qa-irVXns; browser contexts/fixture DB được đóng/dọn, screenshot và log ở /tmp được giữ để kiểm. Không profile/save thật được copy. Build dùng screenshots lịch sử đã tracked theo script cũ; không gọi chúng là ảnh mới. Ảnh debug/map/input/persistence từ suite mới nằm trong thư mục riêng tương ứng.
