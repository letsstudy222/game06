# Kiểm tra nhất quán cục bộ Task 28

Baseline `356d156` đã được đối chiếu remote; Task 25–26 có tài liệu/ADR và Task 27 có validator/tests thực tế. Không tạo prerequisite giả hoặc sửa lịch sử. Chỉ helper renderer, adapter IslandScene, package test scripts, kiểm thử và tám tài liệu thuộc phạm vi.

| Kiểm tra | Kết quả |
| --- | --- |
| Approval | Quyết định 1–6 và 8 trước Task 28 được giữ CONFIRMED; không tự duyệt toàn bộ ADR cũ |
| Engine | Canvas2D và world 2D giữ nguyên; không skew/isometric/3D |
| Dawn/Phượng | Default, sample, PlayerPhoenix, GameState, input, camera, collision, timing và artwork giữ nguyên |
| Frame contract | Anchor/bounds tương thích Task 27; prepare một lần, helper được dùng thực tế |
| Direction | API tám hướng và explicit fallback thực; không tạo frame giả hoặc sửa gameplay facing |
| Depth | Tie-breaker tường minh; cửa sổ và alpha canopy như cũ; không đổi pose vật lý |
| Layer | Pha Dawn giữ nguyên; underwater và telegraph tổng quát chỉ là contract tương lai |
| S0/S1 | Renderer readiness không phải S0 gameplay hay D40 hoàn tất; không tự duyệt save/HP |
| Regression | Kiểm thử Node và browser chạy mới; RGBA so với baseline, không chỉ dựa báo cáo Task 27 |
| Release | Chỉ commit/push work; không sửa workflow, merge main hoặc dispatch deployment |

Các tham số chuyển động, current, collision, camera, sprite/atlas Quy còn UNRESOLVED; dash/dodge PROPOSED. Không đổi trạng thái CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED trong nguồn lịch sử.

Giới hạn: chưa có production Quy art, scene/controller, direction schema persisted hoặc renderer cho mọi loài. Visual bounds không tự là collision/hurtbox. Tasks 49–55/73–77 cần kiểm visibility/telegraph riêng. Chi tiết evidence và giới hạn kiểm thử ở [browser validation](TASK28_BROWSER_VALIDATION.md).

Task 28 chỉ được đánh giá PASS trong phạm vi đã kiểm; không chứng nhận underwater gameplay. Task 29 chưa bắt đầu.
