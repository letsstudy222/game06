# Render và animation theo view

**PROPOSED**. [IslandScene](../../src/island/IslandScene.mjs) dùng Canvas2D, meta.phoenix/cell96 và idle pixel warp; [WorldLayer](../../src/island/WorldLayer.mjs) cull tile; [Camera](../../src/island/Camera.mjs) float follow/integer render; [ResponsiveLayout](../../src/island/ResponsiveLayout.mjs) integer CSS scale. Không thay pipeline trong Task26.

RenderView đề xuất gồm actorInstanceId, worldPosition, facing, stageVisualRef, clipRef, playbackTime, layer/sortAnchor, visualEnvelope và cosmeticEffects. Renderer resolve approved manifest→frameRect/anchor/direction/timing; cache chỉ là cache. Controller/collision sở hữu pose; action resolver sở hữu hit timing, clip marker không tự grant/hit/complete quest. Pose interpolation tương lai nếu dùng phải giữ collision authoritative và pixel sampling rõ.

| Contract | Kiểm tra / fallback | Mốc |
| --- | --- | --- |
| AtlasFrame | Rect trong ảnh, kích thước/alpha/gutter/anchor basis hợp lệ |27validator/34art |
| ClipDefinition | Frames/timing/loop/direction, action markers tương thích | Không gọi hai pose Phượng là full Quy clip;37nếu action scope |
| ActorRenderAdapter | Chọn species/stage visual qua typed refs | Không core if tên Quy/Phượng;28/41 |
| SceneRenderView | Layer terrain/shadow/actor/effects, stable y-sort hoặc policy được duyệt | Giữ Dawn layering cũ qua adapter;28 |
| CameraView | Transform/viewport/clamp, chỉ đọc |44, không copy offsety=-18 thành Quy canon |
| QualityProfile | Giảm decor/particles, giữ terrain/receiver/current cue | Không xóa interactable để đạt FPS |

Chưa chốt cellsize Quy, mirror, FPS clip, hướng tám hay bốn hoặc artwork trước approval Task34. Required clip thiếu thì action/scene chưa ready; fallback chỉ compatible và đã duyệt, không dùng Phượng/idle vô hình đánh. Optional FX thiếu có thể bỏ khi cue chính còn đủ. Không load sprite nguồn concept sheet làm atlas.

Task25 probe1366×768 tạiDPR1/2 cho cùng Canvas683×384/scale2, smoothing false; đây là số đo cũ, không test mới hoặc benchmark. Quyết định DPR/backing resolution tương lai cân bằng pixel-art/memory qua gate, không tự nhân canvas trên devicePixelRatio. Tile32 là fact Dawn, không hardcode toàn game. Cache key cần asset digest/config revision, refcount release khi dispose; tránh build revision bỏ sót ảnh/font như rủi ro Task25. Tests tương lai anchors/extrema/FXoff/DPR/occlusion/scene re-entry, không tạo ảnh ở task này.
