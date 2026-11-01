# Kiểm tra nhất quán cục bộ Task 29

Chỉ kiểm Task 29, không bắt đầu audit Phase IV. Đã đọc Task 25 renderer/map và build/regression findings; ADR và renderer/movement/ownership contracts Task 26; manifest contract, implementation và audit Task 27; implementation, scaling, presentation, direction, layers và test report Task 28; source runtime thực và graph Task 19.

| Yêu cầu | Evidence và giới hạn |
| --- | --- |
| Task 28 prerequisite | Commit b90d731 trên local và remote; baseline regression chạy lại đạt trước code |
| D29-MAP-01 CONFIRMED | 2D coordinates/collision, depth chỉ presentation; không Z/skew |
| D29-MAP-02 CONFIRMED | Fade object, transition/hysteresis, độc lập collision; Dawn visual path giữ nguyên |
| D29-MAP-03 CONFIRMED | Current vector/query độc lập FX; không tích phân lực |
| Canvas2D compatibility | Tái dùng WorldLayer culling và RenderPrimitives Task 28; không engine rewrite |
| Dawn default | islands/main/PlayerPhoenix/GameState/geometry không sửa; fixture chỉ tests harness |
| Identity/authority | Map/scene/tile/object/current IDs tách species/form/stage/reward; binding chỉ đọc owner |
| S0/S1 | Foundation không phải S0 playable hoặc durable S1; chưa resonance/combat/progression |
| Asset | Fixture màu debug được cảnh báo; production image phải decode/metadata hợp lệ, file checks theo Task 27 |
| Regression | Node, build, browser, UI, sample, assets, renderer và map tests thực; xem report |
| Scope/release | Không art/scene layout/UI/save/deployment; chỉ push work, không main hoặc public release |

Dawn dùng schema semantic cũ; adapter mới dùng visual grid và collision riêng. Đây là compatibility boundary được ghi rõ, không hai truth store cho cùng map. Legacy canOccupy vẫn sở hữu collision Dawn; isSolidAt chỉ phục vụ schema mới và kiểm spawn point. Chưa có actor integration cho Quy hoặc solver Task 45.

Tuning fade, geometry, collision dimensions, sprite/atlas Quy, camera tuning, current compose/strength còn UNRESOLVED; dash/dodge PROPOSED. HP/recovery/save production và emergency transfer không được tự duyệt. CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED trong tài liệu cũ không sửa. Task 29 chỉ triển khai trong approval cụ thể, không đổi mọi ADR đề xuất thành CONFIRMED.

Known limitations: AABB occlusion approximation; point-only collision; scene/connector registry integration và world mutation projection sau này; không full Chapter I map, underwater physics hoặc production effects. Readiness cho Task 30 là nền tảng additive có kiểm thử, không giấy chứng nhận gameplay Chapter I. Task 30 chưa bắt đầu.

Kiểm tra handoff trước commit: 544 tracked files ngoài package.json/WorldLayer giữ nguyên từng byte; 15 asset trong hai build khớp byte; 51 tệp JavaScript qua node --check; 26 liên kết nội bộ trong 9 tài liệu hợp lệ; bảng/code fence và git diff --check đạt. Inventory chỉ có 18 tệp được giao, không artifact, binary, cache hoặc dấu hiệu credential. origin/main được ghi nhận tại 5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d; commit và remote cuối báo riêng sau khi xác minh.
