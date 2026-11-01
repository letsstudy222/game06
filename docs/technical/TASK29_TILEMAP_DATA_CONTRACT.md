# Contract map 2D phiên bản 1

Code: [MapDefinition](../../src/island/MapDefinition.mjs), [LayeredMapView](../../src/island/LayeredMapView.mjs). Đây là schema được triển khai cho adapter mới; không thay registry scene hoặc định nghĩa world-state authority.

| Trường bắt buộc | Quy tắc |
| --- | --- |
| metadataVersion | Chính xác 1; phiên bản chưa hỗ trợ là error |
| mapId / sceneId | ID bắt đầu bằng chữ, tiếp theo chữ/số/underscore/dot/hyphen; mapId unique trong batch |
| width / height | World pixel nguyên dương, chia hết tileWidth/tileHeight |
| tileWidth / tileHeight | Nguyên dương, cho phép tile chữ nhật; không quy định production 16/32 |
| tilesetRef | Resolve trong context tilesets do caller cung cấp, không URL hoặc ID loài |
| layers | Danh sách layerId unique, phase, order nguyên, visible boolean, scrollFactor và occlusionEligible boolean |
| collision | cells boolean grid cùng dimensions và rects solid world-space riêng |
| objects | objectId unique, layerId, tileId, x/y, width/height nguyên dương, anchor; depthY/occlusion tùy chọn |
| currentFields | Danh sách field, có thể rỗng; kiểm theo current contract |
| spawnAnchors | Ít nhất một anchorId unique với x/y hợp lệ ngoài solid |
| cameraBounds | Rect dương trong map, dữ liệu cho camera consumer tương lai |

Layer `tiles` tùy chọn: nếu có phải đúng rows×columns, mỗi cell là tile ID có thật hoặc null (không vẽ). `depth` chỉ chứa objects/actors, không tile grid. Layer được sort một lần theo phase → order → vị trí khai báo. Mọi layer trừ background dùng scrollFactor (1,1); background có thể dùng hệ số không âm. Không parallax collision/current/telegraph.

Các phase theo thứ tự: background → terrain → ground → behind → depth → foreground → effects → indicators. HUD vẫn là DOM bên ngoài map; không thêm combat renderer. Objects/actors ở depth dùng comparator Task 28, không đổi world pose. occlusionEligible chỉ hợp lệ cho depth/foreground và chỉ áp object, chưa có tile-level alpha mask.

Tileset context chứa `tiles` theo ID. Production definition dùng rect trong width/height thật; validator tái dùng prepareSpriteFrame của Task 28. View đòi image đã decode và dimensions khớp. File/path/integrity vẫn do Task 27 và loader sở hữu; schema map không mở đường tải URL tùy ý hoặc tạo asset catalog mới. Palette màu chỉ được dùng khi cả map và tileset đều debug; không coi màu/fixture là asset production.

`validateMapDefinitions(maps, tilesets)` trả diagnostics với severity/code/mapId/message, dừng ở lỗi đầu của mỗi map rồi tiếp map sau. `assertMapDefinition` và constructor từ chối error, không tự sửa ID/tile hoặc dựng cảnh rỗng thay required content. DEBUG_MAP là warning rõ ràng, không error. sceneId hiện được kiểm cú pháp reference; đối chiếu registry/lifecycle thật thuộc integration Task 41/47, chưa khẳng định scene đã đăng ký.

View clone/freeze map snapshot khi tạo; thay environment phải dựng projection mới từ owner có thẩm quyền, không ghi facts vào layer. Registry validation phải truyền toàn bộ tập map để phát hiện trùng ID giữa các map. Không có production map mới nên chưa thêm map registry/build loader tổng quát; npm test kiểm fixture còn npm build tiếp tục Task 27 asset checks.
