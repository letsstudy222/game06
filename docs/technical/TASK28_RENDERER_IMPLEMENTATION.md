# Task 28 — Nền tảng renderer tương thích Phượng

Ngày kiểm tra: 01/11/2026 (Asia/Saigon). Repository `letsstudy222/game06`, nhánh `work`, baseline sạch tại `356d15667384c02e126d0763f7135a2818552ab7`; truy vấn remote xác nhận `origin/work` cùng SHA. Task 25 (`4dd014bf161e548d50b724df15934de26a960400`) và Task 26 (`d239855f476ee61bda8a5575b0709d34400ebe46`) nằm trong lịch sử. Tài liệu, ADR và validator Task 27 có thật; kiểm thử lại baseline trước khi sửa.

## Renderer hiện hữu và thay đổi

[index.html](../../index.html) tạo Canvas và DOM HUD; [main.mjs](../../src/island/main.mjs) sở hữu vòng lặp; [ResponsiveLayout](../../src/island/ResponsiveLayout.mjs) thực hiện integer scaling; [Camera](../../src/island/Camera.mjs) giữ tọa độ float và làm tròn khi vẽ; [WorldLayer](../../src/island/WorldLayer.mjs) vẽ tile và culling. Các hệ thống này đã đáp ứng nền tảng cần thiết nên được giữ nguyên.

| Tệp | Thay đổi thực tế |
| --- | --- |
| [RenderPrimitives.mjs](../../src/island/RenderPrimitives.mjs) | Thêm worldToScreen, direction8, resolveDirectionalClip, prepareSpriteFrame, drawPreparedSprite, compareRenderDepth và foregroundAlpha |
| [IslandScene.mjs](../../src/island/IslandScene.mjs) | Chuẩn bị metadata frame một lần; dùng drawPreparedSprite cho Phượng khi không idle; thêm renderOrder và dùng helper làm mờ tán cây |
| [renderer.test.mjs](../../tests/renderer.test.mjs) | 18 kiểm thử tập trung cho tọa độ, metadata, hướng, sorting và tương thích |
| [renderer.browser.cjs](../../tests/renderer.browser.cjs) | So sánh pixel Canvas, DPR/resize và fingerprint RGBA của hai cảnh |
| [package.json](../../package.json) | Thêm unit renderer vào npm test; thêm test:renderer và test:renderer:browser |

Frame được cache theo đối tượng direction, không decode ảnh hoặc kiểm manifest mỗi frame. Idle cache, mapping hướng Phượng, timing, hover lift, camera offset và input giữ nguyên. Mirror Phượng vẫn ở vị trí cũ; helper không mirror lần thứ hai. API tám hướng chưa gắn vào Phượng vì không có bộ sprite tám hướng được duyệt.

Không tạo scene manager, render graph, particle engine, scene dưới nước hoặc gameplay Quy. Renderer hỗ trợ tái sử dụng nhưng không tự tạo chất lượng artwork production.

Tài liệu liên quan: [scaling](TASK28_PIXEL_SCALING.md), [three-quarter](TASK28_THREE_QUARTER_PRESENTATION.md), [hướng](TASK28_DIRECTIONAL_ANIMATION.md), [layer](TASK28_RENDER_LAYERS.md), [kiểm thử](TASK28_BROWSER_VALIDATION.md), [hiệu năng](TASK28_PERFORMANCE_REVIEW.md), [nhất quán](TASK28_CONSISTENCY_AUDIT.md).
