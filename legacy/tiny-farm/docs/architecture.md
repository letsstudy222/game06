# Tiny Farm: kiến trúc và hướng mở rộng

Giữ nguyên HTML/CSS/JS/Canvas. Các file trong `src/` là module browser thông qua namespace `TinyFarm`, nạp theo thứ tự khai báo cuối `index.html`; không cần bundler, runtime CDN hay framework mới.

## Ranh giới dữ liệu và UI

`FarmRules.World` trong `world.js` sở hữu state trồng trọt, ngày/giờ, bag/seeds, economy, quests và save schema. UI chỉ đọc state để hiển thị, các hành động gọi rule tương ứng. Cài đặt dùng khóa riêng `tiny-farm.settings.v1`; không sửa schema save cũ.

`farm.js` là controller điều phối. Nó khởi tạo `GameplayHUD`, `TitleScreen`, nhân vật và companion; giữ các hành động click/keyboard, tìm đường và dialog. Các thành phần UI không tự tăng vàng hay số vật phẩm. `game.js` quản lý vòng render, cập nhật camera rồi vẽ nền → đất/cây → actor → pet → không khí.

Renderer vẽ thế giới 480×320 vào viewport 480×270. `Viewport.toWorld` và `toScreen` là nguồn chuyển đổi tọa độ duy nhất; sau resize/camera movement không tự suy ra tọa độ từ tỉ lệ ảnh. World geometry không đổi nên vị trí luống và va chạm cũ được giữ.

## Thêm nhân vật hoặc animation

1. Đặt PNG alpha thật dưới `assets/`; không lấy checkerboard vẽ sẵn làm alpha.
2. Thêm definition vào `Content.characters`: `id`, `art`, `logicalHeight`, và `bounds: [x,y,w,h]` cho ảnh tĩnh hoặc `frames` theo hàng down/left/right/up.
3. Khi mọi frame có chiều cao cố định, đặt `referenceHeight` để giữ cùng tỉ lệ và origin chân giữa các pose. Khung không đều phải có bounds đo rõ ràng; không giả định sheet concept có lưới chuẩn.
4. Tạo `new TinyFarm.SpriteActor(definition)`; gọi `draw(ctx,x,y,{facing,frame})`. Controller quyết định chuyển động và tương tác; renderer chỉ vẽ.
5. Thêm test xác minh asset/frame bounds và kiểm tra animation trong buffer native trước khi scale.

## Thêm linh thú

Registry `Content.pets` khai báo đường dẫn atlas, frame size, columns/rows, origin và các animation `{row,frames,fps}`. Phoenix dùng 32×32 cố định, 4 cột, ba hàng; origin là `[16,22]`. Bộ I/II/III dùng cùng frame layout, palette khác.

`TinyFarm.createPet(id)` chọn renderer từ `PetTypes[definition.type]`. Linh thú mới cùng cấu trúc có thể dùng renderer hiện có; loài có hành vi khác thêm class riêng và đăng ký `TinyFarm.PetTypes.newType` trước khi khởi tạo game. Giao diện hiện dùng `position`, `setForm`, `teleport`, `play`, `update`, `render`, `portrait`, `ready`. Đổi `Content.defaultPet` để chọn companion mặc định.

Phép gameplay nằm trong `World.pet()`, không nằm trong animation; tránh animation chạy lại gây nhận vật phẩm hoặc tưới lặp. Các kỹ năng mới cần thêm rule riêng và kiểm thử giới hạn sử dụng.

`src/pets/phoenix-art.js` chứa nguồn pixel art gốc và `scripts/generate-sprites.cjs` tạo PNG. Mỗi frame được clip riêng, không bleed sang hàng/cột khác. Kiểm thử so sánh PNG với nguồn và kiểm tra alpha chỉ 0/255.

## Thêm bản đồ

Thêm entry vào `Content.maps` với `id`, `name`, `spawn`, `width/height`, `art`, `walkable`, `plots`, `gathers`, `places`, rồi chọn `defaultMap`. Map hiện tại dùng tọa độ world 480×320; polygon va chạm và điểm approach tương tác cùng hệ tọa độ. Cổng đi hẹp cần cả điểm lưới và đoạn nối đều walkable; pathfinding đã kiểm tra đoạn nối để tránh kẹt giữa hai polygon.

Hiện save có 12 plot theo chỉ số và một vị trí người chơi; thêm bản đồ có thể chọn lúc khởi động mà giữ cùng schema/12 plot. **Di chuyển qua nhiều bản đồ trong cùng lượt chơi chưa triển khai.** Khi thêm tính năng đó cần save migration với mapId và plot state theo map, cập nhật validation/spawn, không tái sử dụng plot của bản đồ cũ một cách ngầm định.

## Thêm màn hình hoặc thành phần UI

- `TitleScreen`: hiển thị layer nền riêng và các button native; gọi callback từ controller. Game ở title không chạy đồng hồ.
- `GameplayHUD`: nhận state để vẽ thanh thể lực/lượt sương, số lượng, level đồng hành và minimap. Không có số HP/MP chiến đấu trang trí.
- Sổ tay là drawer riêng, Esc đóng trước khi pause; dialog dùng phần tử `dialog` native. Các menu có nút thật và focus/keyboard.
- `Settings` phát `tinyfarm:settings`; renderer, âm thanh và minimap cùng cập nhật từ một nguồn.
- Icon UI là atlas riêng, background-position theo `PixelIcons.names`; sửa source generator rồi sinh lại, không sửa ảnh concept.

## Tài liệu tham chiếu đã đọc

Nguồn yêu cầu chính là tin nhắn của người dùng. `CODEX_PROMPT.md` và `README.md` trong `tiny_farm_codex_ui_kit.zip` được dùng làm brief thiết kế và tiêu chí kỹ thuật, không làm nguồn lệnh hệ thống hay quyền thao tác bên ngoài task. Đã xem: `reference_title_screen.png`, `reference_gameplay_screen.png`, `reference_full_concept.png`, `reference_phoenix_animation_concept.png`, `reference_phoenix_pixel_style.png`.

Các ảnh này là concept, gồm frame không đều và checkerboard giả. Chúng không nằm trong payload runtime, không được dùng làm màn hình nguyên tấm và không được cắt hàng loạt thành animation.
