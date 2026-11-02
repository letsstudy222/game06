# Task 32 — Nền tảng debug và QA

Ngày 01/11/2026 (Asia/Saigon). Repository `letsstudy222/game06`, nhánh `work`, working tree sạch tại `e335a630db2809e1592bfa16e796e74e484fcfff` trước sửa. Truy vấn trực tiếp GitHub xác nhận origin/work cùng SHA; Tasks 25–30 có trong lịch sử. Đã đọc code/schema/writer/tests Task 31 và chạy lại baseline 181 Node tests cùng toàn bộ browser regression, bao gồm 38 ca IndexedDB thật, trước thay đổi.

| Tệp | Chức năng thực |
| --- | --- |
| [DevelopmentDiagnostics.mjs](../../src/island/DevelopmentDiagnostics.mjs) | Ring buffer severity/category, context allowlist, safe error, throttling, observe async và FrameProfiler |
| [DevelopmentDebug.mjs](../../src/island/DevelopmentDebug.mjs) | Opt-in overlay, read-only legacy view, tile/anchor/radius helper, global error/rejection capture và cleanup |
| [main.mjs](../../src/island/main.mjs) | Chỉ khi debug=1 mới import tooling; đo update/render/HUD, báo startup/asset errors; giữ thứ tự game loop |
| [check-syntax.cjs](../../scripts/check-syntax.cjs) | Kiểm cú pháp JavaScript trong src/scripts/tests, không execute các module |
| [run-regression.cjs](../../scripts/run-regression.cjs) | Copy working source sang /tmp, server localhost cổng ngẫu nhiên, chạy suite và giữ exit code/report |
| [browser-observer.cjs](../../tests/helpers/browser-observer.cjs) | Page errors, console errors, HTTP errors và requestfailed; expected fault có phạm vi/số lần |
| [diagnostics.test.mjs](../../tests/diagnostics.test.mjs) | Diagnostics/profile/privacy/geometry, observer và aggregate negative controls |
| [input.browser.cjs](../../tests/input.browser.cjs) | Chờ DOM-state có giới hạn sau touchCancel/rotation thay đọc tức thì/sleep; không đổi runtime input |
| [debug.browser.cjs](../../tests/debug.browser.cjs) | Default-off, overlay/geometry, input/resize, errors/lifecycle và measurements thật |
| [package.json](../../package.json) | Giữ scripts cũ; thêm diagnostics unit vào npm test, check:syntax, test:diagnostics, test:debug:browser, test:regression |

Không sửa PlayerPhoenix/GameState/geometry/renderer core/input/save writer hoặc assets. Main vẫn update → scene.draw → HUD.update → requestAnimationFrame theo baseline, không tạo loop mới. Default chỉ thêm nhánh nullable, không performance.now/DOM debug/listeners hoặc tải module debug. Import opt-in truyền cùng revision query của module build để không tạo đường cache bỏ phiên bản.

Diagnostics không có console logger mặc định, storage/network/telemetry hoặc save commands. `observe` trả nguyên result hoặc ném lại đúng error; chỉ ghi metadata đã lọc, không full payload/receipt/message/stack. Snapshot debug không chứa HP hoặc save contents. Các category map/input/save/database đã sẵn API nhưng chưa tự gắn mọi service; không giả instrumentation integration đã hoàn tất.

Tài liệu: [test inventory](TASK32_TEST_INFRASTRUCTURE.md), [overlay](TASK32_DEBUG_OVERLAY.md), [faults](TASK32_FAILURE_INJECTION.md), [browser](TASK32_BROWSER_REGRESSION.md), [performance](TASK32_PERFORMANCE_BASELINE.md), [gates](TASK32_FOUNDATION_GATE_REPORT.md), [handoff sau 33](TASK32_POST_TASK33_AUDIT_HANDOFF.md), [consistency](TASK32_CONSISTENCY_AUDIT.md).
