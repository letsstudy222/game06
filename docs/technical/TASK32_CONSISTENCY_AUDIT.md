# Kiểm tra nhất quán cục bộ Task 32

Baseline Task 31 actual remote/local e335a630db2809e1592bfa16e796e74e484fcfff sạch và đã chạy lại trước source edits. Phần IndexedDB ba slot, atomic row/writer, backup/recovery, import và unresolved gates được đối chiếu source và tests thật, không chỉ dựa báo cáo cũ.

| Constraint | Kết quả/phạm vi |
| --- | --- |
| S0 trước S1, Dawn default | Giữ nguyên; debug chỉ opt-in và không tạo Quy scene |
| Canvas2D/world 2D/three-quarter | Helpers cùng camera mapping, không Z/skew hoặc thay art |
| Input approved | Legacy controls vẫn giữ; new semantic input được kiểm riêng, Space dodge không tự thay Space attack Dawn |
| Dodge/combat | Không i-frame, HP model, cost/timing, boss/collection/progression mới |
| Maps/current/fade | Task 29 fixtures được chạy lại; debug chỉ vẽ view, không ghi field/collision |
| Persistence | Không thay SaveCoordinator/schema/namespace/semantics; overlay không mở writer/DB |
| Canon statuses | Không đổi CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED trong sources cũ |
| Diagnostics privacy | Ring local, numeric/scene allowlist, error name/code, không full save/message/stack hoặc telemetry |
| Runtime protection | Main thêm nullable instrumentation theo opt-in; thứ tự update/render/HUD/rAF và default scene giữ |
| Release | Chỉ work commit/push; không CI/Pages/main thay đổi hoặc dispatch deployment |
| Review handoff | Chỉ evidence index 01–32; review 01–33 được để sau Task 33/trước 34 |

Các metrics chưa có integration được ghi unavailable; sample counts/FPS không chứng nhận performance mọi device hoặc gameplay S0. User-approved nghệ thuật/input/storage không tự duyệt final Quy anatomy, collision dimensions, movement tuning, receipt ordering, migrations hoặc HP.

Known architecture risks chuyển tiếp: một legacy scene loop chưa có full lifecycle manager; actor/renderer cũ vẫn Phượng-specific; asset refs/typed catalogs production chưa hoàn tất; map query chỉ point-solid; input/save mới opt-in, chưa live Chapter I integration; CI hiện tại chưa chạy browser suites. Đây là follow-up theo roadmap, không lệnh mở rộng implementation Task 32.

Code/tests/docs được kiểm formatting, links và scope trước commit. [Gates](TASK32_FOUNDATION_GATE_REPORT.md) tách nền tảng khỏi gameplay; [handoff](TASK32_POST_TASK33_AUDIT_HANDOFF.md) không phê duyệt proposals hoặc nhận Task 33 đã hoàn thành. Không bắt đầu Task 33.

Kiểm trước handoff: 589 tracked files ngoài package.json/main/input browser test giữ nguyên từng byte; 15 asset build khớp byte; 69 tệp JavaScript qua syntax check; 67 liên kết nội bộ trong 9 tài liệu hợp lệ; bảng/code fences và git diff --check đạt. Inventory đúng 19 tệp, không database, player save, profile, build output hoặc credential. Main baseline remote 5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d giữ nguyên trước handoff; commit/actual remote cuối báo riêng sau xác minh.
