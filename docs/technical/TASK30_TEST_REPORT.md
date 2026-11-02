# Kết quả kiểm thử Task 30

Ngày 01/11/2026 (Asia/Saigon). Node 24.19.0, npm 11.9.0, Playwright 1.62.1 và Chromium 154.0.8037.57 headless Linux. Đã chạy browser thật bằng Chromium, còn thiết bị mobile là emulation qua CDP; không có phép kiểm thiết bị vật lý.

## Baseline và lượt cuối

Baseline sạch f88f2a71982a7c8469062be1b762788ab732bae0 đã được đối chiếu origin/work và chạy lại toàn bộ regression trước khi sửa. Dùng git archive vào bản tạm, phủ đúng code/tests mới cho bản sau; build/artifacts chỉ sinh ở bản sao. Không chạy art generation hoặc ghi build output vào working tree.

Browser dùng GAME_URL=http://127.0.0.1:8765/game06/ và CHROMIUM_PATH=/usr/bin/chromium. Renderer sau sửa có RENDER_BASELINE trỏ JSON fingerprint baseline trên cùng môi trường. Các lệnh cuối thực tế:

| Lệnh | Baseline | Sau cùng | Kết quả / exit |
| --- | --- | --- | --- |
| `npm test` | 1.22 s | 1.33 s | PASS / 0 |
| `npm run build` | 0.15 s | 0.14 s | PASS / 0 |
| `npm run test:browser` | 41.37 s | 41.41 s | PASS / 0 |
| `npm run test:ui` | 12.81 s | 13.79 s | PASS / 0 |
| `npm run test:sample` | 23.22 s | 23.49 s | PASS / 0 |
| `npm run validate:assets` | 0.13 s | 0.15 s | PASS / 0 |
| `npm run test:renderer:browser` | 1.61 s | 1.9 s | PASS / 0 |
| `npm run test:map:browser` | 1.96 s | 2.14 s | PASS / 0 |
| `npm run test:input:browser` | Chưa có input harness | 3.22 s | PASS / 0 |

Baseline npm test: **108 PASS, 0 FAIL**. Lượt cuối: **146 PASS, 0 FAIL** = 19 island + 5 UI + 6 sample + 28 asset + 18 renderer + 32 map + 38 input. Renderer/map/asset unit đã nằm trong npm test; không đếm chúng như các lượt chạy script riêng chưa thực hiện. Ngoài suite đầy đủ còn chạy npm run test:input riêng: lần đầu 34 PASS; sau bổ sung lifecycle checks 36 PASS và sau kiểm Escape/shortcut 38 PASS.

Ba browser script hiện hữu lần lượt báo 6 nhóm PASS, 4 viewport PASS và 5 nhóm PASS, không phải node:test count. Asset validation kiểm 9 PNG. Renderer browser: **24/24 fingerprint RGBA Dawn/Dawn Sample khớp baseline**, 8 pixel comparisons và 6 tổ hợp DPR/resize đạt. Map browser Task 29 tiếp tục đạt fade/recovery/current-query độc lập FX, 4 resize cases và 6 ảnh fixture.

## Input browser thực tế

[Harness](../../tests/input.browser.cjs) tạo iframe riêng trên trang Dawn để keyboard/mouse event không lọt vào legacy document. Chạy adapter mới với Canvas debug, không thay GameState hoặc điều khiển Quy.

| Kiểm tra | Evidence |
| --- | --- |
| Desktop DPR 1 và 2 | Move trái (-1,0), aim phải x=1 và y≈−6.5×10⁻⁹; hai vector độc lập |
| Diagonal | Move x=y≈−0.70710678, magnitude 1 |
| Mouse | Left attack edge và right-skill opt-in edge được nhận; right binding vẫn PROPOSED |
| Space | dodge edge được nhận, không thành basic_attack trong adapter mới |
| UI/context | Menu chặn attack; focus textarea clear move; Space trong textarea không thành dodge |
| Focus | Dispatch blur trong DOM Chromium clear held movement; không mô tả đây là đổi cửa sổ OS vật lý |
| Camera/resize | Pointer đứng yên phản ánh camera đổi; pointerleave giữ aim; 4 resize cases kiểm aim đúng hướng ở CSS size mới |
| Lifecycle | 3 re-entry mỗi DPR; tổng 6 lượt, instance cũ không nhận action mới |
| Mobile emulation | Joystick trái analog (0.49396115,0.24698057), góc không bị lượng tử; attack bên phải nhận cùng lúc |
| Cancel/rotation | TouchCancel nhả vector/action; resize sang landscape xóa held touch |
| Mobile dodge | Tap nút dodge phát edge, không thực hiện chuyển động né |
| Target assist | Không có proposal trả targetId=null; eligibility/range/LoS guards kiểm bằng fixture unit |

Không ghi nhận page error hoặc HTTP asset error ở các lượt cuối. Đã chụp 3 ảnh mới (desktop DPR1, desktop DPR2, mobile multi-touch) và mở xem trực tiếp ảnh desktop DPR1/mobile: control trái/phải và readout intent có thật. Đây là UI debug, không asset hoặc giao diện production được duyệt.

## Lỗi đã phát hiện và sửa

Lượt input browser đầu bị FAIL do assertion yêu cầu aim_y dưới 10⁻¹⁰, trong khi tọa độ CSS/pointer thực của Chromium cho sai số khoảng 6.5×10⁻⁹. Đây là assertion quá chặt; unit coordinate math vẫn đạt. Đổi browser tolerance theo component hướng thành 0.01 để tránh phụ thuộc độ chính xác dưới pixel, giữ phép kiểm hướng rõ ràng và unit math chính xác. Đã chạy focused build/input browser lại đạt, rồi suite đầy đủ cuối đạt.

Trong review còn bổ sung guard không nhả capture không thuộc owner và dispose idempotent của virtual controls, cùng hai unit cases. Sau đó thêm Escape/pause khi menu button có focus và bảo toàn shortcut Ctrl/Meta/Alt, cùng hai unit cases; lượt cuối phía trên đã dùng đúng source hoàn thiện và thêm kiểm mobile dodge/aim sau resize; không lấy kết quả trước sửa thay kết quả cuối.

## Artifact, phạm vi và giới hạn

Baseline tạm: /tmp/task30-before-ftyhqq89; lượt cuối: /tmp/task30-after-ytpdr4m1. Logs tổng hợp: /tmp/task30-before-results.json và /tmp/task30-after-results.json. JSON/ảnh input ở artifacts/input/ của bản cuối; renderer/map và screenshots legacy ở artifacts tương ứng. Lượt đầu thất bại nằm tại /tmp/task30-after-m8uyx4fx; lượt focused tại /tmp/task30-after-_gp30fb5. Evidence phiên làm việc không commit hoặc bảo đảm lưu lâu dài; scripts đã commit cho phép tái tạo.

Build revision baseline fa649b28c06c, sau cùng 133b77323178; module source mới làm revision đổi như dự kiến. Không có runtime asset bị thay. Thời gian suite không phải FPS hoặc benchmark input latency. Chưa kiểm browser zoom phân số, physical mobile/controller hoặc scene manager hoàn chỉnh. Raw input không chứng minh Quy swimming, damage, dodge/i-frame hoặc actual form transition đã hoạt động.

**PASS trong phạm vi Task 30** khi kết hợp implementation, 38 input tests và toàn bộ regression thực. Adapter mới opt-in; Dawn vẫn giữ legacy controls. Không bắt đầu Task 31.
