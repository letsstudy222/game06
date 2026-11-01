# Task 30 — Nền tảng input semantic

Ngày 01/11/2026 (Asia/Saigon). Repository `letsstudy222/game06`, nhánh `work`, baseline sạch `f88f2a71982a7c8469062be1b762788ab732bae0`; truy vấn trực tiếp GitHub xác nhận origin/work cùng SHA. Tasks 25–28 có trong lịch sử và tài liệu; Task 29 có implementation, commit và tests thật. Trước sửa đã chạy lại 108 Node tests, build, browser/UI/sample, asset validation, renderer và map browser; đều đạt.

Đã đọc InputManager, MobileJoystick, ActionButtons, PlayerPhoenix, main, GameMenu, ResponsiveLayout, RenderPrimitives, UISettings, source/tests Task 29; đối chiếu audit input Task 25, input/scene/ownership contracts Task 26 và direction/scaling Task 28. Không suy hệ thống đề xuất đã được triển khai.

| Tệp | Implementation thực |
| --- | --- |
| [SemanticInput.mjs](../../src/island/SemanticInput.mjs) | Action/axis state, source aggregation, context, consumption, frame edges, bindings và vector joystick liên tục |
| [InputDevices.mjs](../../src/island/InputDevices.mjs) | BrowserInput, VirtualJoystick, VirtualActionButton; listeners/capture/reset/dispose và remap trong bộ nhớ |
| [InputIntents.mjs](../../src/island/InputIntents.mjs) | Guard target proposal, fallback assisted aim, kiểm form-switch intent từ authority projection |
| [RenderPrimitives.mjs](../../src/island/RenderPrimitives.mjs) | Thêm screenToWorld dùng cùng camera snap, không sửa worldToScreen/draw |
| [input.test.mjs](../../tests/input.test.mjs) | Kiểm logic, fake-device lifecycle, coordinates, guards và compatibility boundary |
| [input.browser.cjs](../../tests/input.browser.cjs) | Harness iframe riêng, keyboard/mouse thật trong Chromium và touch emulation |
| [package.json](../../package.json) | Thêm unit input vào npm test, scripts test:input và test:input:browser |

Đây là adapter **opt-in**, chưa thay input mặc định của Dawn. Các component được chạy thực trong browser harness, không chỉ định nghĩa interface; chưa nối chúng vào controller Quy hoặc combat mới. Legacy InputManager/MobileJoystick/ActionButtons/main/GameMenu và mechanics Phượng giữ nguyên. Không có scene manager mới hoặc vòng rAF thứ hai.

Bàn giao integration Task 41/42/47: một owner input cho active scene; sample một lần mỗi tick, consumers dùng snapshot/consume rồi endFrame đúng một lần; owner đặt context và dispose khi exit. Không gắn đồng thời adapter mới với legacy vào cùng document để điều khiển một actor. Harness iframe tách event tree để Space dodge không đi vào Space attack Phượng.

Tài liệu liên quan: [actions](TASK30_SEMANTIC_ACTION_CONTRACT.md), [desktop](TASK30_DESKTOP_CONTROLS.md), [mobile](TASK30_MOBILE_CONTROLS.md), [aim/assist](TASK30_AIMING_AND_TARGET_ASSIST.md), [dodge/switch](TASK30_DODGE_AND_SWITCH_INPUT.md), [lifecycle](TASK30_INPUT_LIFECYCLE.md), [tests](TASK30_TEST_REPORT.md), [audit](TASK30_CONSISTENCY_AUDIT.md).
