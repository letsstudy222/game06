# Browser regression Task 32

Baseline e335a630db2809e1592bfa16e796e74e484fcfff đã được đối chiếu origin/work và chạy lại trước edits. Fresh aggregate cuối PASS, không dựa riêng vào báo cáo Task 31. Điều kiện/environment và exit codes đầy đủ ở [test inventory](TASK32_TEST_INFRASTRUCTURE.md).

Dawn/sample/UI browser giữ keyboard movement, attack/fire/hover, actual collision/camera, region traversal, shrine, settings và focus release. Renderer **24/24 RGBA scene fingerprints khớp baseline**, 8 Canvas pixel comparisons và 6 DPR/resize đạt. Asset CLI kiểm 9 PNG. Map/input/persistence suites đều đạt đúng scope cũ; IndexedDB có 38 ca thật và không ghi player DB.

## Debug opt-in

Ba browser contexts riêng: default-off, metrics-only, geometry; cùng Chromium headless, 1280×720, DPR1. Thêm một failure page riêng. Hai mode bật còn kiểm 390×844 và 844×390: tổng 4 resize cases. Đây là viewport emulation, không kiểm thiết bị vật lý. DPR2 của renderer/input vẫn do suites Task 28/30 kiểm, không giả overlay Task 32 đã chạy DPR2.

| Kiểm tra mới | Kết quả thực |
| --- | --- |
| Default-off | Không global IslandDebug, DOM panel, module debug request hoặc error listeners mới |
| Read-only metrics | Scene/camera/actor/tile/assets có dữ liệu; aim/current/save honest unavailable, không mở IndexedDB |
| Input compatibility | Canvas vẫn focus, panel inert/pointer-events:none; Phượng di chuyển và J attack hoạt động khi overlay bật |
| Geometry | Canvas riêng khớp CSS/backing bounds sau resize; không sửa Canvas game hoặc world coordinates |
| Listener lifecycle | Duplicate install trả cùng owner/một panel; hai listeners; dispose/reinstall cleanup về zero |
| Error observer | Page exception, unhandled rejection, console error, HTTP missing asset có expected fault rõ; unexpected=[] |
| Redaction | Runtime diagnostics không chứa fixture-private error message/stack/full save |
| Profiling | RAF và update/render/HUD/debug durations ghi thật; xem report đo, không gate FPS |

Đã chụp ba ảnh off.png, metrics.png, visuals.png trong artifacts/debug. Đã mở xem trực tiếp metrics.png và visuals.png: panel và geometry có thật trên Dawn; không artwork mới hoặc Quy gameplay. Các helper shape chỉ là debug, không production collision/telegraph approval.

## Lượt lỗi và sửa QA

- /tmp/game06-qa-xrW3PP: aggregate exit 1 ở debug observer do intentional HTTP fixture còn phát requestfailed chưa được phân loại. Đã consume response body và cho phép tối đa một tín hiệu phụ của đúng fixture path, không global ignore lỗi mạng.
- /tmp/game06-qa-oTMdIM: aggregate exit 1 ở input browser vì đọc vector ngay sau CDP touchCancel. Đã dùng bounded DOM-state wait, rotation cũng chờ reset thay sleep cố định. Nếu cleanup không xảy ra trong 3s test vẫn fail.
- /tmp/game06-qa-ox50jq: focused input/debug PASS sau sửa, trước full aggregate cuối.

Các lỗi này chứng minh runner fail đúng, không là lý do đổi input mechanics hoặc save policy. Lượt cuối tại /tmp/game06-qa-irVXns PASS toàn bộ; no unexpected errors trên positive routes. Failure page vẫn có lỗi intentional đã ghi rõ loại/count, không gọi toàn browser là “zero errors” bỏ qua negative controls.

Full scene enter/exit/fallback manager chưa tồn tại; observe async throwing fixture chỉ kiểm diagnostic boundary và Dawn không bị đổi, không chứng nhận Task 47. Render-loop smoke dùng ready/sample progression và thao tác thật, không có watchdog tự restart hoặc sửa state khi loop lỗi. Không Quy controller, assisted acquisition đầy đủ, boss hoặc Chapter I persistence integration.

Build revision cuối d8c00e407b31 khác a9c0ba501ba4 vì thêm debug source/main hooks. Default scene/assets/control behavior giữ; không CI/Pages/main thay đổi hoặc public deploy. Evidence này là technical foundation, không S0/Chapter I completion.
