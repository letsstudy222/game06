# Đăng ký tham chiếu và tài nguyên

Kiểm kê checkout tại commit `6b502c0`, ngày 30/10/2026. Chỉ tệp thực sự có trong repository được ghi là có thể truy cập. Task 01 không tạo/sửa art. Tên linh thú và vai trò từ đề bài không đồng nghĩa artwork đã có.

## Quy ước trạng thái

- **Concept/reference:** hướng hình dáng; không dùng như atlas đã kiểm định.
- **Approved design:** chỉ ghi duyệt khi có xác nhận; duyệt hình không đồng nghĩa duyệt clip animation.
- **Runtime sprite:** có ảnh, frame/anchor/metadata và đang được code tải; chưa mặc định đạt toàn bộ tiêu chí sản xuất.
- **Tested animation:** chỉ nhận theo từng clip/hướng được thử; không suy từ số hàng trên concept sheet.
- **Missing:** chưa tìm thấy trong checkout; không khẳng định người dùng không có ở nơi khác.

## Tứ Linh

| Sinh vật | Vùng/chương và vai trò | Đường dẫn có thể truy cập | Concept / thiết kế được duyệt | Sprite / animation | Thiếu và lưu ý |
| --- | --- | --- | --- | --- | --- |
| Quy Hải Uyên | I — Vực Hải Uyên; Thủy, dạng mở đầu, bảo tồn/ký ức/phòng thủ và traversal dưới nước | **Missing** — chưa có tệp nhận diện được | Đề bài nói tham chiếu tồn tại; chưa được cung cấp trong checkout để xem hay xác minh duyệt | Missing; không tuyên bố có sheet/clip | Cần tham chiếu gốc, trạng thái duyệt, silhouette/hướng/scale/anchors và spec clip trước sản xuất; không tự tạo hình thay thế |
| Phượng Hoàng Nhật Diệm | II — Đảo Nhật Diệm; Hỏa, tái sinh/nhiệt. Hiện là avatar prototype Đảo Bình Minh | [Tham chiếu](../assets/phoenix-3-v2.png); [runtime atlas](../assets/production/phoenix/atlas.png); [metadata](../assets/production/manifest.json); [master](../assets/production/phoenix/master.png) | Reference đã xem trực tiếp trong Task 01: thân ngà, cánh vàng, đuôi đỏ; thiết kế Phoenix hiện hữu phải bảo tồn theo yêu cầu người dùng. Không chứng nhận pháp lý từ ảnh | Atlas runtime 192×288, ô 96, 2 pose × 3 hướng; phải mirror hướng phải. Runtime có idle/move/fly/attack/fire/hurt; không phải sáu bộ clip vẽ tay độc lập | Cần thêm/duyệt anticipation/contact/recovery và clip riêng nếu yêu cầu production đầy đủ. Kiểm thử hành vi trước đây không chứng minh clip mới hoặc frame chưa có |
| Long Thiên Phong | III — Thiên Đảo Phong Vân; Phong, chuyển động/cân bằng khí quyển | **Missing** — chưa có tệp nhận diện được | Có tên/tham chiếu theo đề bài, chưa xem được file | Missing | Cần hình gốc, mức duyệt, sinh học và spec bay/dòng khí; không tự bổ sung hình canon |
| Ly Vạn Sinh | IV — Tiên Cảnh Vạn Sinh (tên chốt ở Task 02), thiên đường cổ đổ nát; Mộc và quyền năng Sinh Mệnh, quan hệ sinh thái | **Missing** — chưa có tệp nhận diện được | Có tên/tham chiếu theo đề bài, chưa xem được file | Missing | Cần hình gốc và spec; không suy ngoại hình từ tên hoặc tự đặt thêm loài thay thế |

Các Phoenix khác còn tồn tại: `assets/phoenix-1.png`, `assets/phoenix-2-v2.png`, `assets/sprites/phoenix-*.png` và JSON liên quan. Đây là tài liệu/biến thể lịch sử; chưa kiểm duyệt lại từng ảnh trong Task 01 và không tự thay runtime bằng chúng. Nguồn lịch sử: [art-provenance.md](art-provenance.md). Concept sheet có hàng động tác vẫn phải tách/kiểm tra frame, alpha, bounds, gutter, anchor, hướng và timing riêng.

## Môi trường và tài nguyên khác

| Nhóm | Tệp / trạng thái | Quy tắc bảo tồn và hạn chế |
| --- | --- | --- |
| Môi trường Dawn chính | [manifest](../assets/environments/dawn/manifest.json), terrain/objects/shadows PNG cùng thư mục; 183 terrain frame, 18 prop ID | Áp dụng art mẫu được người dùng duyệt ở nhiệm vụ trước; không đổi hướng art ở Task 01. Con số frame gồm mask/animation, không phải số vật liệu độc lập |
| Mẫu đối chiếu | `assets/samples/dawn/manifest.json`, `terrain.png`, `objects.png`, `shadows.png`, `palette.json`, `objects.json`; `masters/` chứa foliage-stone/structure/materials | Giữ bản mẫu riêng; master/concept khác runtime. Palette 64 màu, bóng alpha 0/48/90; không suy đây là kit mọi biome |
| Prototype/historical environment | `assets/tiles/dawn/`, `assets/production/dawn/` | Giữ file và provenance; không dùng nền minh họa whole-world cũ làm nền sản xuất mới |
| Art lịch sử nông trại | `assets/an-gardener.png`, `assets/farmer-walk.png`, `assets/garden-detailed.png`, `legacy/` | Không biến thành nhân vật/chức năng canon mới, không xóa trong task tài liệu |
| Font | `assets/fonts/VT323-Regular.ttf`, `VT323-OFL.txt` | Có file license kèm theo; giữ provenance |
| Ảnh gameplay và QA cũ | `artifacts/dawn-*.png`, `artifacts/ui-after/`, `artifacts/sample/`, `artifacts/dawn-environment-qa.json` | Bằng chứng lần chạy trước, không phải concept, không phải kết quả mới Task 01 |
| Art Vực Hải Uyên, bộ Quy, Long, Ly và các sinh vật tiếp theo | Missing trong checkout theo mục đích nhận diện | Chỉ ghi thiếu, chờ cung cấp dần; không generate ảnh hoặc coi Dawn là art dưới nước đã hoàn thành |

## Hợp đồng asset cho nhiệm vụ sau

Mỗi asset cần định danh, chủ sở hữu/provenance và điều kiện sử dụng, chapter/role, reference được duyệt, source và export riêng, palette/scale/hướng sáng, alpha, frame rect, origin, bounds, footprint collision và trạng thái clip theo hướng. Tile chuẩn 32×32 hiện có; props/sinh vật nhiều ô được phép nếu nhất quán mật độ pixel và không che hành động. Dùng nearest-neighbor khi scale.

Kiểm tra kỹ thuật phải đọc file thật, kiểm tra gutter/alpha, khớp metadata và chơi thử animation trong tình huống di chuyển/combat. Báo riêng phần nào được xem, phần nào chỉ có metadata, phần nào đã thử runtime. Không nhận “production-ready animation” chỉ vì có PNG hoặc art đã duyệt. Không sao chép proprietary character/visual/music/layout/UI; tham khảo nguyên lý chung không chuyển thành quyền dùng asset.

## Kiểm kê bổ sung Task 04

Đã xem lại trực tiếp `assets/phoenix-3-v2.png` và `assets/production/phoenix/atlas.png`, đọc manifest/timing/pose selection. Chưa có ảnh Quy/Long/Ly nhận diện được trong checkout; các direction text Task 04 (Long dài xuyên mây, Ly guardian, Quy rùa nước cổ) được xác nhận bằng chỉ dẫn người dùng, không giả đã xem ảnh. [Register 12 stage và clip còn thiếu](creatures/SACRED_ART_REQUIREMENTS.md) là nguồn gap hiện tại; Phoenix reference có sẵn chưa đồng nghĩa bộ ba stage/clip đã được phân loại và nghiệm thu. Không tạo hoặc đổi tài nguyên trong Task 04.

## Task 06 — template không là artwork/species đã duyệt

[Asset-gap FG01–FG06](factions/TASK06_CONSISTENCY_AUDIT.md) ghi yêu cầu nguồn sinh học/habitat, silhouette, direction/anchor/telegraph/timing/playback và các dependencies chưa có. Task06 không tạo/thay/sửa art hoặc nhận đã xem enemy/faction ảnh chưa tồn tại. Chín archetype là templates, không chín sinh vật đã có sprite. Reference Tứ Linh đã duyệt giữ nguyên; không concept sheet nào được tự nhận là production animation.
