# Renderer, camera, map và hình học

Nguồn: [IslandScene](../../src/island/IslandScene.mjs), [WorldLayer](../../src/island/WorldLayer.mjs), [Camera](../../src/island/Camera.mjs), [ResponsiveLayout](../../src/island/ResponsiveLayout.mjs), [geometry](../../src/island/geometry.mjs), [style.css](../../style.css). Đây là quan sát baseline, không phê duyệt projection Quy.

## Renderer thực

Canvas2D: attach/getContext("2d"), imageSmoothingEnabled=false; CSS image-rendering:pixelated. Không WebGL/framework/game-engine ngoài. Không có internal resolution cố định: viewportPlan tính integer CSS scale, tự động tối thiểu2, tăng để viewport không vượt world; width/height Canvas bằng ceil(viewport/scale). Camera mặc định640×360 chỉ là giá trị constructor trước resize, không là resolution luôn chạy.

Probe Chromium1366×768: DPR1 và DPR2 đều Canvas683×384, CSS scale2; smoothing=false/pixelated, world1280×896/tile32. Code không nhân Canvas theo devicePixelRatio; DPR không tự nâng backing resolution. Không suy probe này thành xác nhận mọi màn HiDPI đẹp hoặc GPU/mobile đã benchmark.

Camera giữ float x/y, exponential follow `1-exp(-9*dt)`, clamp theo world; renderX/Y làm tròn. Offset y=-18 và actor draw lift là hardcode Phượng. Render reset transform, translate theo camera integer, vẽ tile nhìn thấy, shadow, ambient, props/player sắp theo y, skill FX và shrine sau cùng. Props/shadow không được cull toàn diện như tile; render y-sort tạo list mỗi frame. Chưa có debug overlay collision/current/hit/anchor; drawCount và window.IslandGame.view chỉ là diagnostics.

AnimationController có sáu tên/đồng hồ bốn frame; IslandScene.drawPlayer dùng `meta.phoenix`, rect96, hai pose/hướng và offsets. Idle cache bẻ pixel lông/đuôi từ pose gốc, không phải bộ animation sinh học tổng quát. Không được dùng nó để khẳng định Quy idle/swim/attack đã có clip.

## Hai world thật

| World | Grid / kích thước | Nội dung và biểu diễn |
| --- | --- | --- |
| dawn | 40×28, tile32, 1280×896 | Hàm JS dựng ground/elevation/mood; năm vùng hiển thị, 20 props, 12 collider bổ sung, hai bramble hazard, targets rỗng |
| dawn-sample | 26×22, tile32, 832×704 | Map so sánh riêng, năm vùng, 16 props, 12 collider, không hazard hoặc target; cùng avatar Phượng |

Terrain quan sát: deep/shallow/sand/grass/rim/moss/floor/path/stonePath/cliff/stairs/cliffFoot. Elevation là dữ liệu/lớp tile và chặn theo loại tile, không physics 3D. Các mốc/checkpoints là tọa độ map; không có checkpoint save system. Tọa độ actor/props là world pixel, grid dùng cell; camera cùng mặt phẳng x–y.

WorldLayer chọn frame từ semantic tile/mask/mood, nước đổi bốn frame ở2Hz, không background whole-world image của manifest production cũ. Metadata profile sample/sun-ruins quyết định lớp đặc thù Dawn; tile32 là fact hiện tại, không quy định mọi scene tương lai bắt buộc cùng kích thước.

## Hình học và giới hạn dưới nước

`canOccupy` lấy tâm và bốn mẫu radius. Với tilemap, deep/shallow/cliff/cliffFoot/rim bị chặn, sand có inset3pixel; sau đó xét trunk/rock/collider dạng khoảng cách. Fallback polygon/corridor dùng point-in-polygon/segment distance nếu không có tilemap. `moveWithCollision` chia bước tối đa khoảng2pixel, xử lý x rồi y nên trượt theo trục; chưa swept shape cho body dài hoặc quay, chưa nav layer/current/depth tolerance. Hover vẫn dùng cùng collision; hình nước được vẽ không đồng nghĩa được bơi.

Tái dùng được math khoảng cách, chia bước, tile culling, clamp và descriptor world. Cần mở rộng qua policy passability theo environment/body, envelope/turn, cùng một bộ giải motion+current+knockback. Không bỏ chặn deep/shallow toàn cục vì sẽ phá bờ Dawn; không thêm full3D pathfinding vì suy diễn từ underwater.

## Bàn giao theo task — tất cả PROPOSED

| Task | Yêu cầu trước triển khai / nghiệm thu sau |
| --- | --- |
| 28 renderer | Duyệt gate B/G; tách actor renderer/manifest khỏi meta.phoenix, giữ integer sampling và baseline; low-FX vẫn thấy source/terrain/cue |
| 29 map | Descriptor/semantic terrain/collider/anchors ổn định; test room nhỏ có water-passable/solid policy riêng, không thực hiện chín zones H19 ngay |
| 43 camera, phạm vi đề xuất | Chốt footprint/visual envelope/look-ahead/current cue, clamp/viewport/rotation; không copy offset Phượng thành canon |
| 45 geometry, phạm vi theo yêu cầu Task25 | One motion composition + sweep/bounds, reject current đẩy khỏi map, kiểm góc/khe/return; tái chạy toàn test đất Dawn |

H19 vẫn sở hữu graph chín zone/13connector; test room kỹ thuật không tạo graph canon khác hoặc grant E03/E05. Plane/top-down candidate còn UNRESOLVED; cách ly code trước đo, không yêu cầu engine rewrite.
