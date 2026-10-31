# Asset pipeline và mức sẵn sàng thực tế

Nguồn: [AssetLoader](../../src/island/AssetLoader.mjs), [IslandScene](../../src/island/IslandScene.mjs), [build-site](../../scripts/build-site.cjs), [asset register](../ASSET_REFERENCE_REGISTER.md), [Quy art](../art/QUY_ART_PRODUCTION_SPEC.md). Quan sát file/PNG header/manifest và unit/browser baseline; không tạo hoặc sửa ảnh.

## Tệp, metadata và đường tải

| Bộ | Tệp thật / kích thước | Mức chứng cứ và giới hạn |
| --- | --- | --- |
| Dawn đang chạy | assets/environments/dawn/terrain.png 256×736; objects.png384×480; shadows.png512×640; manifest tile32/183tile definitions/18prop IDs | Unit alpha/palette/gutter/anchor và browser runtime PASS cho baseline hiện tại; không kit dưới nước |
| Sample đang chạy | assets/samples/dawn/terrain.png256×736; objects.png384×288; shadows.png512×384; 183tile/12props | Tuyến sample riêng đã browser PASS, không thay default Dawn |
| Phượng runtime | assets/production/phoenix/atlas.png192×288, cell96, hai pose×ba row; nguồn master1024×1536 | Đủ cho renderer hai pose hiện hữu, không sáu bộ action vẽ riêng hoặc ba evolution stage |
| Hướng Phượng | down row0 origin48,72; left row1 origin45,72; right mirror row1; up row2 origin48,52 | Metadata thực; phải giữ anchor/asymmetry nếu mở rộng, không dùng toàn sprite rect làm hurtbox |
| Concept Phượng | assets/phoenix-3-v2.png1254×1254 và các biến thể cũ | Có file và hướng approved theo hồ sơ; không xem lại concept sheet này trong Task25 hoặc suy license từ file |
| Tile legacy | assets/tiles/dawn/terrain.png256×288, objects.png384×384; 72tile/13props | Còn được đóng gói, không manifest của map mặc định hiện tại |
| Production cũ | assets/production/manifest.json; world960×640, props192×288 | Không có environment.tiles/tilesSize; không tương thích đầy đủ loader tile hiện tại nếu dùng default constructor trần. Entry đang truyền manifest map nên không gặp lỗi này |
| Nguồn/sample/legacy khác | assets/samples/dawn/masters, materials/palette/objects metadata; assets/sprites/**; assets nông trại | Tư liệu/biến thể, không tự promote thành runtime asset mới |
| Quy, wildlife, boss, Hải Uyên | Có brief/handoff trong docs, không resource phù hợp được xác minh trong asset inventory | Missing/Unverified; không dùng ảnh Phượng làm Quy hoặc coi text proposal là artwork |

40 asset tracked gồm29PNG; đã đọc dimensions các PNG. Các unit assertion alpha/gutter/palette có phạm vi cụ thể trong tests, không bao trùm mọi reference/rights/clip. Task25 đã xem một screenshot Dawn mới từ browser test; không claim đã review trực quan tất cả ảnh hoặc clip tương lai.

AssetLoader nhận manifest URL từ map, resolve đường ảnh bằng new URL(url, document.baseURI), thêm revision từ import.meta.url vào requests. Promise.all decode terrain/props/phoenix/shadows; lỗi ném và boot hiện loading failed, không tự thay actor bằng ảnh khác. Check terrain width/height và hero width; chưa validate đầy đủ hero height/frameRects/anchors/all directions/clip markers/provenance. `get(id)` thiếu asset cũng ném lỗi. Tắt shadows chỉ khi manifest không khai báo; không có fallback Quy đã duyệt.

## Script và side effect đã kiểm trước chạy

| Script | Phạm vi ghi / điều kiện | Task25 |
| --- | --- | --- |
| build-site.cjs | Xóa rồi dựng lại `_site`, copy asset/module/HTML/CSS/screenshots; thay revision imports | Chạy trong bản sao /tmp, không tại repo chính |
| build-dawn-environment.cjs | Đọc sample kit, tạo/ghi assets/environments/dawn/** | NOT RUN, tránh thay art |
| build-tileset.cjs | Ghi assets/tiles/dawn/** | NOT RUN |
| build-sample-art.cjs | Ghi asset sample terrain/shadow/metadata | NOT RUN |
| normalize-production.cjs | Chromium cắt/chuẩn hóa nguồn, ghi production PNG/JSON | NOT RUN |
| normalize-sample-props.cjs; normalize-sample-materials.cjs | Đọc masters, dùng Chromium, ghi asset sample | NOT RUN |
| pixel-kit.cjs | Helper Pixel/PNG dùng bởi script sản xuất | Chỉ đọc/parse, không chạy sinh art |

Build revision hash bao gồm modules/index/style và nhiều environment/sample/legacy tiles; **không bao gồm atlas Phượng hoặc font** dù chúng được copy. Chỉ thay ảnh đó có thể giữ query revision cũ: rủi ro cache ở lần cập nhật asset tương lai, không bằng chứng hiện tại tải sai. Build còn phụ thuộc screenshots tracked tồn tại; không tự tái tạo ảnh khi thiếu. Không sửa hai vấn đề này trong Task25.

## Đầu vào cho Task27 và Tasks33–40 — PROPOSED

Task27 cần schema/path/rect/dimensions/anchor/alpha/gutter/clip compatibility validator, phân biệt nguồn–export–runtime; giữ loader map cũ hoạt động. Mỗi lỗi required asset phải báo rõ trước activation, không sinh placeholder canon tự động. Không đặt cell96 hoặc mirror Phượng thành chuẩn bắt buộc Quy.

Trước sản xuất Stage I: gate B/D/G, approved reference/anatomy, direction/scale/footprint/visual envelope; source và export riêng, provenance và quyền sử dụng. Clips phải có timing/markers hợp action, không gọi idle là attack vô hình. Tile dưới nước cần semantic terrain/solid/current/refuge/cue và manifest phù hợp renderer; không thay Dawn tile source. Lịch Tasks33–40 trong [dependency plan](TASK25_IMPLEMENTATION_DEPENDENCIES.md) là gán gói công việc đề xuất, không đề bài chính thức đã xác nhận.

Chưa chốt kích thước Quy, frame count, FPS clip hay production palette. Q05/B+C cần chốt trước asset thức tỉnh, không nhất thiết trước thử blockout bơi trung tính đã được cho phép riêng. Asset thiếu cho phép hoãn scene hoặc dùng blockout được duyệt, không chứng nhận production-ready.
