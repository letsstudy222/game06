# Tứ Linh — tổng quan thiết kế sinh vật

Task 04/96; baseline `fce9cf2`. [Audit và mục lục bàn giao](TASK04_CONSISTENCY_AUDIT.md). Đây là đặc tả tài liệu, không phải tính năng/asset mới. **CONFIRMED** chỉ cho điều người dùng xác nhận hoặc bằng chứng repo; **PROPOSED** cho thiết kế ứng viên; **UNRESOLVED** cho phần chưa chốt. Các tên dạng, English reference names, ID ứng viên, kỹ năng và thông số định tính dưới đây chưa tự trở thành canon được duyệt.

## Nền chung — CONFIRMED

Thứ tự Quy–Vực Hải Uyên → Phượng–Đảo Nhật Diệm → Long–Thiên Đảo Phong Vân → Ly–Tiên Cảnh Vạn Sinh. Nguyên tố lần lượt Thủy/Hỏa/Phong/Mộc; chỉ Ly có quyền năng đặc biệt **Sinh Mệnh** đã xác nhận. Không tự đặt một quyền năng nguyên sơ có tên mới cho ba loài còn lại.

Tinh Linh là người chơi, không một người huấn luyện; ba dạng trang bị, một active và hai reserve, đổi trong chiến đấu nhưng khóa thành phần khi boss. Mỗi playable có XP/level/skills/evolution riêng. Mỗi Tứ Linh có ba stage: Thức Tỉnh → Trưởng Thành → Thức Tỉnh Nguyên Sơ. Sacred không đồng nghĩa bất tử; dạng xuất hiện sau không thay thế vĩnh viễn dạng trước. Sinh Mệnh không hồi sinh vô hạn sinh vật chết hoàn toàn.

Chỉ dẫn visual của Task 04 là cơ sở: Quy là rùa nước cổ, không mặc định rắn quấn Huyền Vũ; Phoenix giữ thiết kế được duyệt; Long dài, phân đốt giải phẫu rõ, uốn chữ S xuyên mây; Ly là hộ vệ rừng thần thoại có cấu trúc như gạc phân nhánh, không chỉ hươu thường. File hình thực sự xem được và thiếu hụt ở [art requirements](SACRED_ART_REQUIREMENTS.md).

## Ma trận bản sắc

Tên/nguyên tố/vùng, vai trò combat và hướng vận động đến từ Task 04 (**CONFIRMED về định hướng**). English names, tính khí, nhược điểm cụ thể và lịch sử bảo tồn là **PROPOSED**; không suy đoán ý thức gốc tự nói chuyện.

| Chiều thiết kế | Quy Hải Uyên | Phượng Hoàng Nhật Diệm | Long Thiên Phong | Ly Vạn Sinh |
| --- | --- | --- | --- | --- |
| English reference name — PROPOSED | Abyssal Memory Turtle | Dawnfire Phoenix | Skywind Dragon | Verdant Life Guardian |
| Element / primordial authority | Thủy / chưa xác nhận authority riêng ngoài hệ Thủy | Hỏa / chưa xác nhận authority riêng ngoài hệ Hỏa | Phong / chưa xác nhận authority riêng ngoài hệ Phong | Mộc / Sinh Mệnh |
| Vùng/chương | Vực Hải Uyên / I | Đảo Nhật Diệm / II | Thiên Đảo Phong Vân / III | Tiên Cảnh Vạn Sinh / IV |
| Biểu tượng | Bảo tồn, bền bỉ, ký ức, ổn định giữa dòng | Tái sinh, dũng khí, biến đổi nhiệt và đổi mới | Tự do có điều tiết, chuyển động và cân bằng khí quyển | Tăng trưởng có quan hệ, phục hồi và cân bằng sống |
| Tính khí/bản năng — PROPOSED | Thận trọng, cảm áp và nhịp trước khi hành động | Chủ động tiến tới, nhạy nhiệt, phải học kiềm lửa | Tò mò về đường mở, ghét luồng bị ép, nhạy biến thiên áp | Chú ý sự phụ thuộc, phản ứng bảo vệ nơi sống nhưng không tự biết hết sinh thái |
| Vận động | Bơi/lặn, tăng tốc nhờ đúng dòng; trên cạn chậm có chủ đích | Bay/lượn theo luồng nhiệt; cơ động tấn công rồi rút | Điều chỉnh đường gió, đổi hướng và vượt mạng đảo | Chạy/nhảy linh hoạt trên đất, bám điểm thực vật hợp lệ |
| Combat | Bruiser phòng ngự và kiểm soát vùng, giữ vị trí | Hỏa cơ động và sát thương vùng, cần chọn đường thoát | Controller di động, đạn/cắt gió và tái bố trí đối thủ | Hỗ trợ/hồi phục và vùng rễ, chiến đấu hiệu quả qua chuẩn bị |
| Phòng thủ | Ổn định trước đẩy/áp, che một hướng; không chặn hết mọi phía | Né bằng vị trí/thermal, không armor vô hạn hoặc auto revive | Đổi góc/đường đạn hạn chế, không làm mọi đòn hụt | Hồi phục có điều kiện và vùng trú, không cứu dạng HP0 trong trận bằng heal |
| Tương tác môi trường | Đọc hồi lưu, cơ cấu ngập, áp nước | Xả/thu địa nhiệt, cơ cấu phụ thuộc khoảng nhiệt | Hướng/áp mạng khí, rào bão và cơ cấu đón gió | Vật liệu sống, mạng rễ, độ ẩm/đối tác sinh học khả thi |
| Yếu và giới hạn — PROPOSED | Khó truy đuổi khô/cao; định hướng chặn cần đọc đòn | Bão mạnh làm projectile khó điều khiển; vùng hẹp hạn chế lượn | Hành lang kín hạn chế vòng lượn; không xuyên tường bằng gió | Thiếu vật liệu sống làm giảm restoration; không có lá chắn vô hạn trong đất chết |
| Vai trò biến cố — PROPOSED L02-P07 | Giữ hồi lưu, bảo tồn phần bản sắc còn khả dụng | Cắt đường nhiệt quá tải, giữ mầm chu kỳ sống | Chia dấu thức theo nút khí để các nhánh không sụp cùng lúc | Giữ nút sống/cộng sinh cuối khi mạng bị đứt |
| Trạng thái ngủ — PROPOSED | Lõi sống trong vỏ khoáng, tên trứng/lõi chưa chốt | Mầm ngủ dạng trứng, ngoài kênh dung nham chính | Dấu thức rải ở nút khí có cấu trúc, không có một quả trứng | Bản sắc phân bố trong mạng sống bị hỏng, không chỉ một cây khô |
| Thức tỉnh — PROPOSED chi tiết | Bootstrap: dòng yếu + tương hợp + cấu trúc còn sống; phục hồi nước toàn vùng sau đó | Có hồi lưu nước và đường thu/xả nhiệt an toàn, không chỉ đổ thêm lửa | Nối hướng/áp rồi đủ liên tục bản sắc để hiện thân | Khôi phục quan hệ còn khả thi, không cấp năng lượng để thay đối tác đã mất |
| Quan hệ với ba loài khác — PROPOSED | Phân phối nước/nhiệt cho Phượng; ẩm cho Long/Ly | Tạo chênh nhiệt cho Long, đổi mới có kiểm soát cùng Quy/Ly | Đưa ẩm/hạt/khí, mở tuyến tới Ly; không thay thermal của Phượng | Giữ sức đệm sinh thái cho cả ba, cần nước/nhiệt/khí chứ không tự cứu toàn bộ |

## Nguồn chịu trách nhiệm

- Bốn hồ sơ loài: [Quy](QUY_HAI_UYEN.md), [Phượng](PHUONG_HOANG_NHAT_DIEM.md), [Long](LONG_THIEN_PHONG.md), [Ly](LY_VAN_SINH.md) giữ giải phẫu/stage, không sao chép bảng balance.
- [Evolution matrix](SACRED_EVOLUTION_MATRIX.md) là chỉ mục 12 stage và quy tắc commit chung.
- [Abilities](../gameplay/SACRED_CREATURE_ABILITIES.md) là nguồn duy nhất cho tên/ID chiêu, stage minimum, targeting, animation và counterplay; [synergies](../gameplay/SACRED_SYNERGIES.md) giữ quy tắc kết hợp.
- [Art requirements](SACRED_ART_REQUIREMENTS.md) giữ đường dẫn thật/asset gaps; [data spec](../technical/CREATURE_DATA_SPEC.md) nối sang entities Task 03, không dựng schema cạnh tranh.

## Nguyên tắc sản xuất — PROPOSED C04-P01

Mỗi stage thay đổi cấu trúc và cách ra quyết định, không chỉ scale/recolor. Giữ “họ hàng” của đầu/thân/chi trước–sau và motif qua cả ba stage. Stage III là năng lực điều phối tinh luyện, không luôn mạnh nhất ở mọi vị trí hoặc bất tử.

Dùng tile 32×32 của repo làm chuẩn môi trường, không buộc mọi sinh vật vào sprite 32px/96px. Physics footprint, hurtbox, attack hitbox và visual envelope là bốn dữ liệu riêng. Camera/depth cần giữ điểm chạm đọc được và sprite không xuyên kiến trúc. Không mặc định dùng bounding rectangle cả mây/cánh/gạc làm collision; cũng không cho thân nhìn thấy xuyên vách khi logic bảo rằng vừa. Quy tắc chi tiết ở evolution matrix/art requirements cần kiểm chứng prototype về sau.

Không gán nhãn Legend hiện có cho cả bốn như rarity cuối; Sacred là vai trò truyện. Không kích hoạt đồng thời bốn avatar để tạo synergy: một cơ thể active, tối đa ba member, hiệu ứng để lại hữu hạn có owner và luật kết thúc riêng.
