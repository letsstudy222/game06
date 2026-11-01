# Thiết kế hình ảnh Vực Hải Uyên

Nguồn: [AB33-S05–S07/S11](ART_BIBLE_MASTER.md), [graph H19](../chapter1/CHAPTER1_WORLD_GRAPH.md), [world art](CHAPTER1_WORLD_ART_HANDOFF.md), [finale art](CHAPTER1_FINALE_ART_HANDOFF.md). **CONFIRMED:** Quy Sacred Thủy, ngoại lai không mặc định ác, thế giới có thay đổi bền vững. **PROPOSED AB33-P07:** cách thể hiện dưới đây; chín zone ID/tên H19 giữ trạng thái PROPOSED nguồn, không đổi graph. **UNRESOLVED:** production kit/scene và tuning. **SUPERSEDED:** lịch sử nguồn không đổi.

## Chín vùng, một ngôn ngữ môi trường

| Zone ID / tên nguồn | Định hướng hình ảnh PROPOSED | Điểm đọc gameplay | Biến thể phục hồi đề xuất |
| --- | --- | --- | --- |
| hy_zone_sanctuary — Buồng Thức Mai Cổ | Vòm mòn, nền tối dịu, trầm tích và vùng sáng tập trung | Không gian đầu ít nhiễu, nguồn tương tác tách cảnh; không chốt trứng/lõi/vật mang | Sáng ổn định ở cơ cấu được state nguồn cho phép, không tiết lộ nguồn gốc Tinh Linh |
| hy_zone_reef — Rạn Ánh Dịu | Cát ngà, san hô phân cụm, sinh quang thấp | Khoảng quan sát an toàn và đường chính rộng, wildlife không thành đội quân | Nước rõ hơn, cụm sinh vật trở lại đúng habitat |
| hy_zone_channels — Khe Dẫn Lưu | Vách phân tầng, nhịp đá dẫn mắt theo luồng | Vector dòng và refuge khác nền, làn yếu đọc được cả FX thấp | Nhịp dòng đều hơn theo current/world state, không đổi chỉ bằng hạt |
| hy_zone_habitat — Vườn Tảo Né Dòng | Tảo mềm, túi nước yên, khoảng trống theo hành vi | Vùng tùy chọn, không giấu species bắt buộc cho main route | Tảo/sinh vật phân bố lại theo ecology; không thêm unlock bắt buộc |
| hy_zone_ruins — Phế Tích Hồi Văn | Khe dẫn và khớp đá có dấu mòn, trầm tích đứt đoạn | Receiver và đường bypass có biểu hiện, không biến văn tự thành đáp án full lore | Cơ cấu giữ cấu hình từ world authority, đường đọc rõ hơn |
| hy_zone_trench — Rãnh Áp Sâu | Value sâu, khe sáng hẹp, nền xa gợi áp lực | Optional advanced gate vẫn rõ trước entry, luôn thấy đường rút hợp lệ | Giữ vẻ sâu/nguy hiểm sau phục hồi; không tự bỏ gate |
| hy_zone_core — Nút Hồi Lưu | Nút vào–ra nước nhìn thấy, kiến trúc hướng tâm có khoảng hở | Điểm điều tiết phân biệt với boss arena, trạng thái nhận/đang thử/đã ổn định khác nhau | Chuyển nhịp theo E05 nguồn, không callback animation tự commit |
| hy_zone_boss — Thềm Giữ Nước | Khối rìa ít nhiễu, nền vừa đủ chi tiết, landmark quanh mép | Telegraph, thân Quy/boss và làn tránh rõ; boss candidate chưa duyệt | Hậu encounter không mặc định xác chết/tẩy ác, E04 khác E05 |
| hy_zone_exit — Lối Nước Ra Bờ | Nước mở và dấu nhiệt xa gợi chuyển chương | Cửa ra và đường về rõ, không tự xác nhận arrival E06 khi thấy ánh lửa | Lối quay lại giữ được; foreshadow Phượng không tiết lộ hiện thân cuối |

Không thêm zone thứ mười Hải Uyên hoặc dựng chín map production. Tuyến A–B–C–E–G–H và mở I theo predicate H19 giữ nguyên; D/F không thành điều kiện bắt buộc do art bố trí. Mọi tên là tên nguồn hiện hành, không được Art Bible tự đổi thành canon mới.

## Độ sâu bằng hình ảnh, không thêm vật lý3D

**PROPOSED:** dùng nền xa ít tương phản, chồng mặt đá và rạn, bóng neo, vật thể depth-sort và ánh sáng theo vùng. Áp lực/độ sâu là cảm giác và hazard theo source, không một trục bơi Z. Mặt phẳng hoạt động cần nổi hơn vực trang trí, cửa đi không bị vẽ như hố không thể qua nếu nav cho phép. Không méo/skew toàn Canvas.

Nước sống nhờ cụm hạt thưa, tảo chuyển nhịp, ánh sinh quang và sinh vật ambient có khoảng yên. Dòng có đường dẫn/biểu tượng tĩnh rõ; hiệu ứng nước không sở hữu lực. Mọi sinh vật có tên dùng [register](../chapter1/CHAPTER1_SPECIES_REGISTER.md); sáu concept ngoài chưa có ảnh/asset được duyệt. Ambient generic chỉ là đề xuất sản xuất thấp scope, không loài playable mới.

## Nhiễu loạn, phục hồi một phần, ổn định

| Trạng thái trình bày PROPOSED | Hình ảnh có thể dùng | Guard |
| --- | --- | --- |
| Nhiễu loạn | Trầm tích ngắt tầm nhìn vừa phải, nhịp dòng lệch, vùng tảo bị ép | Không phủ mù làm mất đường né hoặc mặc định toàn Lôi/Kim là hỏng |
| Một phần | Một nhánh dòng rõ, sinh quang tập trung quanh nhánh hoạt động | Chỉ hiển thị khi state nguồn có predicate phù hợp, không thêm save flag từ art |
| Ổn định | Nước rõ hơn, dòng đều, wildlife/vegetation trở lại theo ecology | Predator và hazard hợp lệ còn tồn tại; không biến toàn map thành vùng không nguy hiểm |

Đây là biến thể hình ảnh của state có thẩm quyền, không định nghĩa event mới. Nếu nguồn chỉ có hai state, chưa được tự lưu state giữa thứ ba; có thể dùng transition presentation tạm khi hợp đồng cho phép. Reload lấy snapshot/world projection, không lấy frame đang phát làm sự thật. Không đổi E04 boss resolved thành E05 restoration hoặc E06 chapter arrival.

## Composition và mobile

**PROPOSED:** rạn cao ở rìa hoặc author fade từng object, khoảng trống quanh actor/receiver, nền arena tránh sọc cạnh tranh với telegraph. Test dọc/ngang và nhiều occluder; AABB fade hiện chỉ là xấp xỉ, vùng alpha rộng cần chỉnh bounds thay đòi pixel-perfect mask đã tồn tại. Mức FX giảm vẫn có hướng dòng, đường về, vùng an toàn và trạng thái cơ cấu. Chưa có visual production QA Hải Uyên; xem [checklist](ART_QA_CHECKLIST.md).
