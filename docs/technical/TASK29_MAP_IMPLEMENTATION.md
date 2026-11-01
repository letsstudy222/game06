# Task 29 — Nền tảng map nhiều lớp

Ngày 01/11/2026 (Asia/Saigon). Repository `letsstudy222/game06`, nhánh `work`, working tree sạch tại `b90d731d5cec5318ae318d8bf827fa146be7cb0e` trước sửa. Truy vấn GitHub xác nhận `origin/work` cùng SHA; quan ngại Task 28 vắng trên remote đã được kiểm chứng và không còn là blocker. Baseline Phase III `1bae084`, Task 25 `4dd014b`, Task 26 `d239855`, Task 27 `356d156` đều là ancestors. Đã đọc code, ADR, tài liệu và chạy lại regression Task 28 trước triển khai.

## Thay đổi thực tế

| Tệp | Trách nhiệm |
| --- | --- |
| [MapDefinition.mjs](../../src/island/MapDefinition.mjs) | Contract, diagnostics, kiểm map/layer/object/spawn/current và query solid tại một điểm |
| [LayeredMapView.mjs](../../src/island/LayeredMapView.mjs) | Adapter Canvas2D nhiều lớp; static order, depth-sort, frame cache, culling, fade và current debug |
| [OcclusionFade.mjs](../../src/island/OcclusionFade.mjs) | Alpha presentation tạm thời, chuyển tiếp và hysteresis |
| [CurrentFields.mjs](../../src/island/CurrentFields.mjs) | Kiểm/chuẩn hóa field và query không áp lực lên actor |
| [WorldLayer.mjs](../../src/island/WorldLayer.mjs) | Trích visibleCells dùng chung; legacy visibleTiles giữ cùng vùng, thứ tự và dữ liệu đầu ra |
| [map.test.mjs](../../tests/map.test.mjs) | Kiểm thử logic và compatibility |
| [map.browser.cjs](../../tests/map.browser.cjs) | Harness browser với pixel assertions và screenshots thật |
| [fixture](../../tests/fixtures/layered-map.mjs) | Hình học/palette debug nhỏ, không production map |
| [package.json](../../package.json) | Tích hợp unit map vào npm test; thêm test:map và test:map:browser |

Không thay IslandScene, PlayerPhoenix, GameState, camera, controls, collision solver, Dawn layout, sprite, UI, save hoặc deployment. Không tạo scene manager hay loop mới. LayeredMapView là adapter bổ sung, chỉ được dùng khi caller chủ động dựng nó; test harness không thay registry hoặc default scene.

Đã đọc WorldLayer, islands, DawnMap, DawnSample, geometry, IslandScene, Camera, ResponsiveLayout, AssetLoader, build script; đối chiếu Tasks 25–28 và graph Task 19. Legacy Dawn có semantic terrain gắn passability và atlas profile riêng; không ép migrate nó sang schema mới. Danh sách nguồn liên quan và trạng thái ở [audit](TASK29_CONSISTENCY_AUDIT.md).

Tài liệu: [contract](TASK29_TILEMAP_DATA_CONTRACT.md), [collision/depth](TASK29_COLLISION_AND_DEPTH.md), [fade](TASK29_OCCLUSION_SYSTEM.md), [current](TASK29_CURRENT_FIELD_CONTRACT.md), [fixture](TASK29_TEST_MAP_FIXTURE.md), [kết quả kiểm thử](TASK29_BROWSER_AND_TEST_REPORT.md), [Chapter I](TASK29_CHAPTER1_MAP_HANDOFF.md).
