# Task 25 — Audit repository và nền tảng kỹ thuật

Ngày kiểm tra: **01/11/2026, Asia/Saigon**. Repository `letsstudy222/game06`, nhánh `work`, HEAD khảo sát `1bae0846ecfc0e2aab23a000abf2371a84e6b233`. Cây làm việc ban đầu sạch, không staged/untracked; commit bàn giao mong đợi tồn tại và là HEAD. `git ls-remote --heads origin work main` xác minh remote work cùng SHA, main ở `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`. Không có sai khác local/remote trước khi viết tài liệu.

## Phạm vi và bằng chứng

Task25 chỉ audit kỹ thuật, chạy kiểm thử cách ly và lập kế hoạch; không thực hiện Task26 hoặc audit toàn Phase IV. 138/138 tài liệu Tasks17–24 hiện diện trong baseline đã commit; sáu tài liệu dùng chung cũng được bảo toàn. Kết quả Phase III 75%/CONDITIONAL PASS là điểm thiết kế, không tỷ lệ hoàn thành game. Báo cáo audit tổng hợp Phase III trước đó nằm trong hội thoại; không giả định có một tệp audit tổng hợp riêng trên đĩa. Các sổ quyết định O17/Q18/H19/E20/Q21/S22/B23/F24 là chứng cứ trạng thái trong repository.

495 tệp tracked ban đầu: 23 module trong `src`, 8 tệp `tests`, 8 script, 40 asset, 41 artifact, 340 tài liệu, 28 tệp legacy, một workflow và sáu tệp gốc. Đếm theo `git ls-files`; node_modules và `_site` không nằm trong inventory tracked. Không tìm thấy AGENTS.md áp dụng trong workspace. Node v24.19.0/npm11.9.0 đáp ứng `engines.node >=24`; Playwright1.62.1 và Chromium154.0.8037.57 đã có, không cài thêm dependency.

## Inventory hệ thống từ mã thực

| Nhóm / nguồn | Hành vi / phụ thuộc hiện tại | Tái sử dụng và điểm mở rộng thiếu | Bao phủ kiểm thử / rủi ro hồi quy |
| --- | --- | --- | --- |
| Entry: [index.html](../../index.html), [main.mjs](../../src/island/main.mjs) | ES module, DOM có sẵn; chọn dawn mặc định hoặc sample=1 | Giữ hai tuyến; thêm lựa chọn scene cô lập sau duyệt, chưa có scene router | Browser boot/sample; đổi mặc định có thể phá public |
| State: [GameState](../../src/island/GameState.mjs) | Sở hữu player, skills, targets, camera, shrine; setIsland tạo lại tất cả | Cần ranh giới khởi tạo/chuyển cảnh, không dùng reset này để chuyển progression | Unit pause/respawn/shrine; rủi ro mất state nếu tái dùng nguyên trạng |
| Actor: [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs) | Hướng, vị trí, HP, animation, hover; phụ thuộc geometry | Giữ nguyên actor cũ; adapter năng lực/hình học/dạng là đề xuất | Unit movement/hurt/hover; không có Quy |
| Input: [InputManager](../../src/island/InputManager.mjs), [MobileJoystick](../../src/island/MobileJoystick.mjs), [ActionButtons](../../src/island/ActionButtons.mjs) | Event DOM, keyboard/pointer, gọi state trực tiếp | Tái dùng clear/capture; thiếu action map độc lập loài và dispose listeners | Unit vector + browser focus/touch; dễ sót phím khi đổi scene |
| Camera: [Camera](../../src/island/Camera.mjs), [ResponsiveLayout](../../src/island/ResponsiveLayout.mjs) | Theo player, clamp world, integer CSS scale | Tái dùng math; offset/envelope/input plane cần gate | Unit bounds + browser rotation/viewport; không phải camera Quy đã duyệt |
| World: [islands](../../src/island/islands.mjs), [DawnMap](../../src/island/DawnMap.mjs), [DawnSample](../../src/island/DawnSample.mjs) | Hai world dựng bằng hàm JS, grid/props/regions/checkpoints | Map descriptor hữu ích; chưa loader world graph, receiver hoặc nav dưới nước | Unit route/collision + browser tới shrine/beach; scene switch còn reset |
| Geometry: [geometry](../../src/island/geometry.mjs) | Grid, polygon/segment fallback, circle props, chia bước chuyển động | Tái dùng sweep chia bước; cần policy passability theo môi trường/cơ thể | Unit long step/cliff/water; dùng policy đất cho Quy sẽ chặn nước |
| Render: [IslandScene](../../src/island/IslandScene.mjs), [WorldLayer](../../src/island/WorldLayer.mjs), [EnvironmentShadows](../../src/island/EnvironmentShadows.mjs) | Canvas2D, tile culling, sắp theo y, sprite Phượng, FX | Tái dùng lớp tile/shadow; thiếu actor renderer/biome resolver tổng quát | Unit tile assets + browser ảnh; nhiều hardcode anatomy Phượng |
| Animation: [AnimationController](../../src/island/AnimationController.mjs) | Đồng hồ sáu state; renderer chọn lại hai pose | Tái dùng clock; cần clip/marker/direction manifest theo loài | Unit state timing; không chứng minh sáu bộ clip độc lập |
| Combat: [SkillSystem](../../src/island/SkillSystem.mjs) | attack/fire, cooldown, hit target, projectile và respawn target | Math/fixture có ích; thiếu action pipeline/status/AI/attribution/loadout | Unit hit fixture + browser FX/hazard; không enemy AI |
| UI: [UIHud](../../src/island/UIHud.mjs), [PlayerHUD](../../src/island/PlayerHUD.mjs), [WorldHUD](../../src/island/WorldHUD.mjs), [GameMenu](../../src/island/GameMenu.mjs), style.css | HP/cooldown/proximity/menu/settings; LV1/LEGEND viết sẵn trong HTML | Giữ DOM cũ; thêm UI bindings khi có scope riêng | 5 unit UI, browser4viewport; chữ cấp/rarity không là progression |
| Persistence: [UISettings](../../src/island/UISettings.mjs) | Lưu cấu hình UI, không lưu gameplay | Cần writer/receipt/migration mới; không kế thừa save legacy làm chuẩn | Test corrupt/denied settings; chưa test game save |
| Asset: [AssetLoader](../../src/island/AssetLoader.mjs), assets/** | Manifest theo map, decode PNG, validate một phần kích thước | Giữ pipeline Dawn; thiếu schema/clip/species validator hoàn chỉnh | Unit palette/alpha/gutter/paths; xem audit asset |
| Build/CI: [build-site](../../scripts/build-site.cjs), [pages.yml](../../.github/workflows/pages.yml), package*.json | Đóng gói `_site`; push main hoặc chạy workflow thủ công | Tái dùng static build; chưa có preview tự động hoặc browser suite trong CI | Build hiện PASS; screenshot tracked là dependency đóng gói |
| Tests/artifacts: tests/**, artifacts/** | Unit, route-helper, PNG decoder, ba browser script, ảnh/JSON kết quả cũ | Test mới cần tách dữ liệu/fixture khỏi production | 30 unit và ba suite đã chạy lại trong bản sao; không ghi artifact vào repo chính |
| Legacy: legacy/tiny-farm/**, legacy/island-prototype/** | Code/asset/script lịch sử; farm có localStorage riêng | Bảo toàn, không import vào entry hiện tại hoặc đưa vào `_site` | Không chạy legacy suite; tránh reset key farm |
| Tài liệu: docs/**, README.md | Hợp đồng thiết kế, không phải executor/data production | Tái dùng đúng authority, không tạo progression/quest ledger khác | 295 ca Phase III vẫn là kế hoạch, không tính vào 30 unit |

## Kết luận và chỉ mục bàn giao

Canvas2D hiện tại có nền để thêm scene Quy cô lập; chưa có bằng chứng buộc viết lại engine. Khuyến nghị này **PROPOSED**, không phê duyệt plane, health, manifestation hoặc catalog. CONFIRMED/SUPERSEDED theo nguồn cũ giữ nguyên; các lựa chọn còn mở vẫn UNRESOLVED.

1. [Luồng thực thi](TASK25_RUNTIME_EXECUTION_FLOW.md).
2. [Renderer/map](TASK25_RENDERER_AND_MAP_AUDIT.md).
3. [Input/movement](TASK25_INPUT_AND_MOVEMENT_AUDIT.md).
4. [Actor/combat](TASK25_ACTOR_AND_COMBAT_AUDIT.md).
5. [Save/persistence](TASK25_SAVE_AND_PERSISTENCE_AUDIT.md).
6. [Asset pipeline](TASK25_ASSET_PIPELINE_AUDIT.md).
7. [Build/test/deployment](TASK25_BUILD_TEST_DEPLOYMENT.md).
8. [Scope bản chơi thử](TASK25_FIRST_PLAYABLE_SCOPE.md).
9. [Phụ thuộc triển khai](TASK25_IMPLEMENTATION_DEPENDENCIES.md).
10. [Decision gates](TASK25_DECISION_GATES.md).
11. [Chống hồi quy](TASK25_NON_REGRESSION_PLAN.md).
12. [Rủi ro](TASK25_TECHNICAL_RISKS.md).
13. [Kiểm tra nhất quán cục bộ](TASK25_CONSISTENCY_AUDIT.md).
