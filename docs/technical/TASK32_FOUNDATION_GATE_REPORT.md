# Gates nền tảng Task 25–32

Đánh giá trong scope technical foundations theo yêu cầu Task 32, **không comprehensive audit Tasks 01–33**. Kết quả dựa trên source hiện hữu và các lệnh thực trong [test inventory](TASK32_TEST_INFRASTRUCTURE.md)/[browser report](TASK32_BROWSER_REGRESSION.md). Không chấm phần trăm game development.

| Gate | Trạng thái | Evidence | Phần chưa được chứng nhận |
| --- | --- | --- | --- |
| A — Asset foundation | PASS | 28 asset unit tests, validator/build 9 PNG, path/frame/clip/integrity fixtures | Production Quy art, catalog và approved anatomy/atlas còn thiếu |
| B — Renderer | PASS | 18 unit, 24 RGBA scenes, 8 pixel comparisons, DPR/resize/anchor/direction checks | Chất lượng art/future clips không sinh ra từ renderer |
| C — Map system | CONDITIONAL PASS | 32 unit và actual map browser: layers, fade, point-solid, current query độc lập FX | Chưa full body clearance/solver Task 45, scene Quy hoặc map Chapter I production |
| D — Input | PASS | 38 unit, desktop/mobile intent, independent aim, contexts/dispose/switch guard | Chưa Quy controller, actual dodge hoặc target acquisition combat |
| E — Persistence | PASS cho Layer A/B boundary | 35 unit và 38 ca IndexedDB thật, CAS, backup, confirmation import | Layer C receipts/reward/HP/checkpoint catalog/migration còn DEFERRED |
| F — Observability | PASS trong runtime/fixtures đã kiểm | Opt-in diagnostics/profile/overlay, default-off, safe error, browser monitor, fail-propagating runner | Aim/current/save metrics Dawn chưa tích hợp được ghi unavailable |
| G — Regression | PASS | Fresh baseline và aggregate cuối, default/sample/UI/keyboard/combat/assets giữ | Không đóng gói Windows hoặc physical multi-device certification |

**Task 32 PASS trong phạm vi tooling khi aggregate cuối đạt. S0/Chapter I chưa hoàn tất.** Gate C conditional là giới hạn integration có chủ đích, không che một test failure. S0 vẫn cần Tasks 33–40 art, 41 scene, 42 controller, 43 inertia/current integration, 44 camera, 45 collision, 46 interaction, 47 transitions và 48 sample acceptance đúng thứ tự.

Readiness cho Task 33: có thể nhận brief và chuẩn bị/sản xuất trong phần được duyệt; final Quy anatomy/reference, pixel density/atlas/anchors và scope clip vẫn cần approval tương ứng. Không tự bắt đầu Task 33 hoặc duyệt asset bằng fixture. Sau Task 33 phải thực hiện review Tasks 01–33 riêng theo yêu cầu người dùng, trước Task 34; chưa review ở Task 32.

Blockers trước S1/live gameplay: HP ownership/recovery/defeat/emergency transfer; dodge distance/duration/cost/cooldown/i-frame; resonance/memory receipt ordering; production reward transaction; full migration/rollback; checkpoint catalog và boss retry. Debug metrics hoặc test markers không đóng các gates này.
