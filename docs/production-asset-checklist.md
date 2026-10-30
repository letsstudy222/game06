# Dawn Island — production asset checklist trước khi mở rộng

Audit ngày 2026-10-30, đối chiếu prompt “Dawn Island Environment Rebuild — Sample Area First”, atlas PNG, manifest, ảnh gameplay hiện có và code render/map. Đây là audit và danh sách công việc, **không phải một sample production mới đã hoàn thành hoặc được duyệt**. Không mở rộng đảo trong bước này.

## Kết luận

Tilemap hiện tại đúng về kỹ thuật nhưng **chưa đạt mức mỹ thuật premium yêu cầu trong prompt**. Có 72 frame terrain và 13 loại props; 48 frame là các mask shore/grass/path, 8 frame là animation nước. Số frame không đồng nghĩa 72 thiết kế terrain độc lập đã được polish.

Các nhóm chính đã có PNG hợp lệ; không phải tất cả đều thiếu file. Tuy nhiên phần lớn là **PROTOTYPE — cần vẽ/polish lại** trước khi dùng làm chuẩn nhân rộng. Các bài test kỹ thuật đã có không thay thế đánh giá mỹ thuật.

Trạng thái:
- **PROTOTYPE:** đã có và sử dụng được, chưa đạt chất lượng hình ảnh mục tiêu.
- **MISSING:** chưa có asset/chức năng môi trường riêng đáp ứng yêu cầu này.
- **REUSE:** giữ nguyên, không nằm trong đợt thay art này.
- **P0:** bắt buộc cho sample đại diện; chưa nhân rộng khi chưa hoàn tất và duyệt sample.
- **P1:** bổ sung sau khi duyệt hướng mẫu, trước khi mở rộng các khu liên quan.

## P0 — bắt buộc cho sample

| ID | Nhóm | Hiện trạng / bằng chứng | Asset cần bàn giao |
| --- | --- | --- | --- |
| ENV-01 | Grass / cliff top | **PROTOTYPE**: `grass_0..3`, `grassEdge_0..15`; mặt thềm cao dùng lại cỏ. Biến thể còn ít khác biệt, mảng nền khá phẳng | Base grass và ít nhất 3 biến thể được polish; cụm cỏ thấp/sparse tufts; mép turf và cliff-top cap có highlight/underside rõ. Giữ vùng trung tâm yên, không tăng mật độ chi tiết đồng đều |
| ENV-02 | Dirt path / sand | **PROTOTYPE**: `path_0..15`, `sand_0..2`; đường rộng và đều, cát ít phân cấp vật liệu | Bộ đường với tâm nén, mép sờn và góc/T/cross/end; cát khô/ẩm có chuyển tiếp, pebble/shell decals. Kiểm tra nối ô không sinh lỗ hoặc hoa văn lặp nổi bật |
| ENV-03 | Deep / shallow water | **PROTOTYPE**: mỗi loại 4 frame, chủ yếu là các vệt ngắn lặp | Vẽ lại mặt nước sâu/nông với nhịp sóng, màu depth và highlight có kiểm soát; 4-frame loop liền mạch. Số frame hiện có được giữ nếu loop đã đủ tốt |
| ENV-04 | Shore transitions | **PROTOTYPE + MISSING corner/foam treatment**: đã có 16 mask bốn hướng, foam hiện tĩnh | Mép cát ẩm, foam strip, góc lồi/lõm và headland/cove nối sạch; một loop foam ngắn. Không bắt buộc toàn bộ 47-tile blob set nếu bộ nối dùng trong sample đã đầy đủ |
| ENV-05 | Cliff faces / height edges | **PROTOTYPE; thiếu bộ nối theo hướng đầy đủ**: chỉ `rim`, `cliff`, `cliffFoot`, lặp mặt đá khá rõ | Face/top/base có cấu trúc đá và vật liệu rõ; đầu mút, mặt bên trái/phải, góc trong/ngoài, nối mặt vách chồng tầng; đá/rêu/dây leo trang trí có chủ đích. Không dùng một face lặp cho mọi hướng |
| ENV-06 | Stairs / landings | **PROTOTYPE**: một tile `stairs` lặp ngang/dọc | Bậc nối liền, đầu trên/dưới, landing và sườn cầu thang; khớp bộ cliff. Sample phải thể hiện ít nhất 2 cao độ nối đi được. Grid hiện có elevation 0/1, không phải chưa có cao độ |
| ENV-07 | Stone walkways / ruins floor | Floor **PROTOTYPE**, stone-walkway kit riêng **MISSING**: `floor_0..2`, `moss_0..1` | Lối đá cũ riêng, sàn nguyên/nứt/rêu, viền sàn vỡ và góc thiếu; nối stone–dirt–grass. Tách chất liệu đá khỏi cát/đường, tránh mortar grid lặp quá nổi |
| ENV-08 | Tropical trees / forest borders | **PROTOTYPE**: một palm và một broadleaf; silhouette/tán lá và shading còn đơn giản | Polish ít nhất một palm và một cây tán rộng hoàn chỉnh; tán có cụm lá, vùng sáng/tối, thân/rễ đọc rõ; một cụm cây/foliage border cho rừng mát hơn. Cây lớn vẫn có anchor chân và cơ chế giảm che Phoenix |
| ENV-09 | Bushes / flowers / ground foliage | **PROTOTYPE**: mỗi nhóm một sprite, hoa rất nhỏ/thưa | Bộ bụi thấp, hoa và cụm foliage có kích thước phân cấp; đủ để tạo biên rừng/biên tàn tích dày nhưng chừa đường nhìn và khoảng combat. Không rải ngẫu nhiên để bù thiếu chất lượng |
| ENV-10 | Rocks / cliff decorations | **PROTOTYPE**: một boulder, một fragment; thiếu biến thể đất–biển | Ít nhất 2 kích thước đá, đá bờ biển và một cụm đá/rêu chân vách; silhouette, mặt bắt sáng và chân tiếp đất thống nhất. Vật trang trí không che đường đi |
| ENV-11 | Temple / ruin structural kit | **MISSING**: có pillar/altar nhưng chưa có bộ cấu trúc đền | Plinth/temple base, đoạn tường hoặc nền đền có viền, corner/end caps, entrance/threshold và rubble nối bộ. Ghép thành một quần thể có trục vào–lối đá–focal point, không chỉ đặt cột quanh sàn |
| ENV-12 | Pillars / fragments / altar | **PROTOTYPE**: pillar, brokenPillar, fragment, altar có sẵn nhưng khối/ánh sáng còn đơn giản | Polish cột nguyên/gãy, mảnh đá, mặt bệ và biểu tượng altar; thống nhất tỉ lệ kiến trúc, hướng sáng và vết phong hóa. Giữ focal point đủ nổi nhưng thấp hơn độ ưu tiên của Phoenix |
| ENV-13 | Contact / cast shadows | **MISSING** dưới dạng bộ bóng môi trường có chủ đích; renderer hiện chủ yếu có bóng Phoenix, không có pass cast-shadow thống nhất cho props | Shadow sprite/mask pixel cho cây, đá, cột, bệ và vách; tiếp đất rõ, hướng đổ bóng thống nhất từ ánh nắng trên trái. Bóng không che mép collision hay bị làm mờ kiểu illustration |
| ENV-14 | Forest / ruins light treatment | **MISSING**: tên vùng đã có, chưa có environmental lighting pass riêng | Palette/light treatment cho cỏ rừng mát hơn và đền sâu hơn; giữ đảo sáng ấm, không phủ tối toàn màn hình. Kiểm tra lúc Phoenix đi, attack và fire, không chỉ ảnh đứng |

Brazier đã có dưới dạng prototype. Có thể polish nếu dùng trong focal point, nhưng không bắt buộc thêm loại nguồn sáng mới. Bramble là hazard hiện có: giữ hành vi, chỉ polish art nếu xuất hiện trong sample.

## P1 — bổ sung trước khi nhân rộng những khu liên quan

- [ ] Palm/tree silhouette thứ hai; các biến thể tán/bụi để biên rừng không lặp cùng một cây.
- [ ] Thêm cụm đá, rubble, pillar đổ và mảng moss cho các đoạn kiến trúc lặp.
- [ ] Sand/path/floor wear decals và variation để tránh pattern khi dùng trên diện tích lớn.
- [ ] Bộ nối cho cao độ thứ ba nếu composition mở rộng sử dụng; sample tối thiểu phải có hai tầng hoàn chỉnh, có thể chọn ba nếu có đủ kit.
- [ ] Các kiểu cliff/shore corner bổ sung mà layout đảo mở rộng thực sự cần.

**Không phải blocker cho sample hiện tại:** waterfall, cầu gỗ, thuyền, nhà, NPC, inventory, portal liên đảo, bộ tileset mọi biome. Không thêm chúng chỉ để tăng số lượng asset.

## Reuse — giữ nguyên

- [x] Phoenix `assets/production/phoenix/atlas.png`, hướng/anchor/pose và FX nhân vật.
- [x] UI, HUD, menu/settings, keyboard/touch controls, hệ combat/HP/hover/interact.
- [x] Tile standard 32×32, nearest-neighbor, pixel-perfect camera và nền tảng tile renderer.
- [x] Cơ chế depth sorting/canopy fade; tiếp tục kiểm tra với art mới, không đổi hành vi gameplay.

Không cần trở lại tranh nền lớn hoặc đổi framework để xử lý các thiếu hụt này.

## Hợp đồng asset production

- Tile terrain đúng 32×32, không anti-alias, không perspective kiểu tranh; transparent transitions có alpha sạch.
- Mỗi object có source rect, kích thước thật, foot anchor, footprint collision và vùng canopy che nhân vật nếu cần. Không ép mọi prop vào ô 32px; object nhiều ô vẫn phải cùng mật độ pixel.
- Một palette thống nhất cho môi trường, có ramp sáng/tối ấm/mát. 39 màu hiện tại không phải con số bắt buộc nếu cần điều chỉnh có kiểm soát.
- Hướng nắng trên trái; bóng tiếp xúc tách khỏi cast shadow và phần tán trước/sau khi cần.
- Nối thử thành patch 3×3/5×5, kiểm tra corner/end-cap và seams trước khi lắp vào sample.
- Animation ghi rõ frame order/duration; không sửa PNG bằng cách blur/downscale một minh họa lớn.
- Với mỗi nhóm lưu source, atlas/metadata, bảng trạng thái prototype/approved và ảnh trong gameplay. Có file PNG không đồng nghĩa asset đã được duyệt.

## Mốc tiếp theo — một sample để duyệt, chưa mở rộng toàn đảo

Đề xuất một khu mẫu khoảng 24×18 ô (768×576 world pixels), điều chỉnh theo composition thực tế:

1. Coast/sand ở phía dưới, open clearing ở giữa, cliff/stairs nối thềm trên và ruin ở góc trên phải.
2. Chủ đạo khoảng 70% Fantasy Island, 30% Mystic Ruins theo **cảm giác/composition**, không phải phép đếm tile cứng.
3. Giữ vùng quanh Phoenix ít nhiễu; tạo density ở biên rừng/biên đền. Có một trục đường dẫn tới focal point kiến trúc.
4. Lắp bằng assets P0, kiểm tra collision/occlusion/bounds với cùng hệ điều khiển hiện tại. Bóng và ánh sáng là phần của environment, không đổi gameplay.
5. Chụp gameplay ở zoom sử dụng thật, thêm overview; thử di chuyển, bay, attack/fire và qua cầu thang để kiểm tra readability.
6. Duyệt sample về hình ảnh và gameplay trước khi nhân rộng. Không coi checklist này hoặc ảnh map 0.8 là sample production đã được duyệt.

### Gate nghiệm thu mẫu

- [ ] Các nhóm P0 cần trong composition không còn placeholder; mục bỏ khỏi mẫu phải có lý do cụ thể, không âm thầm bỏ yêu cầu.
- [ ] Coast, clearing, elevation và coherent ruins complex đều xuất hiện trong một sample đi được.
- [ ] Tile repeat/seams/corner không gây chú ý; có chất liệu, sáng/tối và chiều sâu rõ.
- [ ] Bóng cho cây/vách/đá/kiến trúc; rừng và đền có mood khác khu mở nhưng vẫn đọc rõ.
- [ ] Phoenix, UI và controls không bị thay thế; art không che nhân vật khi di chuyển/combat.
- [ ] Có ảnh và kiểm tra runtime thực tế; phản hồi duyệt sample được ghi nhận trước bước mở rộng.

## Tài nguyên đã kiểm tra

- [Terrain atlas](../assets/tiles/dawn/terrain.png), [object atlas](../assets/tiles/dawn/objects.png), [manifest](../assets/tiles/dawn/manifest.json).
- [Overview hiện tại — prototype, không phải sample mới](../artifacts/tilemap/overview.png).
- `scripts/build-tileset.cjs`, `src/island/DawnMap.mjs`, `WorldLayer.mjs`, `IslandScene.mjs`.

## Cập nhật — sample 0.9 đã có để review

Đã triển khai một mẫu riêng ở `/?sample=1`, không ghi đè map 0.8. Xem [bàn giao sample, ảnh runtime và giới hạn còn lại](dawn-sample-review.md). Những nhãn PROTOTYPE/MISSING phía trên ghi nhận **baseline 0.8 tại lúc audit**; không mô tả toàn bộ tài nguyên mới trong sample.

Sample đã bổ sung bộ props mới, vật liệu terrain, shadow masks, bờ động/corners, cliff sides/caps, landings, ba cao độ và quần thể shrine ngoài trời. Các nhóm P0 có đại diện trong sample; trạng thái duyệt mỹ thuật vẫn pending. Những biến thể và bộ nối chưa có được liệt kê cụ thể ở tài liệu bàn giao. Các checkbox gate không tự đánh dấu approved chỉ vì đã dựng hình hoặc test pass.
