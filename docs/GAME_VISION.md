# Tứ Linh Khởi Nguyên

**English working title:** Origins of the Four Sacred Spirits. Tên làm việc, không phải quyết định phát hành cuối cùng.

Đây là định hướng thiết kế chính thức từ Task 01/96. Tính năng được xác nhận về thiết kế không đồng nghĩa đã có trong game. Xem [kiểm kê repository](REPOSITORY_AUDIT.md), [phạm vi](PROJECT_SCOPE.md) và [sổ quyết định](PROJECT_DECISIONS.md).

## Lời hứa với người chơi

Một action RPG 2D pixel art về khám phá, cộng hưởng và hóa thân: người chơi là một linh thể cổ xưa, ban đầu vô hình, có nguồn gốc chưa được tiết lộ. Linh thể cộng hưởng với tinh hoa sự sống được lưu giữ, ký ức tổ tiên và bản sắc sinh học của một số sinh vật để nhập vào và trực tiếp điều khiển hình thái của chúng. Người chơi không phải huấn luyện viên con người cố định.

Niềm vui cốt lõi là cảm nhận một thế giới khác đi qua từng cơ thể: khả năng di chuyển, chiến đấu và nhận biết môi trường gắn với sinh học của dạng đang điều khiển. Khám phá mở ra cộng hưởng; cộng hưởng mở ra cách khám phá mới. Không phải mọi sinh vật được phát hiện đều cần trở thành dạng chơi được.

## Thể loại, nền tảng và sắc thái

Thể loại: phiêu lưu nhập vai hành động thời gian thực, có biến hình, sưu tầm sinh vật và thế giới liên thông. Mục tiêu nền tảng gồm trình duyệt, giao diện trình duyệt di động và PC Windows. Hiện đã có nền Canvas 2D cho browser; phương thức đóng gói Windows chưa được quyết định. Không tự chuyển engine theo tầm nhìn này.

Sắc thái kết hợp khám phá đẹp và giàu không khí, những khoảng lặng thư giãn, kể chuyện qua môi trường, chiến đấu nhanh và phản hồi rõ, tiến trình sinh vật có ý nghĩa và bí ẩn cổ đại hé lộ dần. Rừng/đền có chiều sâu nhưng không mặc định chuyển sang kinh dị. Bản sắc đến từ cơ thể sinh vật, quan hệ sinh thái và sự đan xen của bốn hệ nguyên tố; không sao chép nhân vật, hình dáng, nhạc, bản đồ hay UI của thương hiệu thương mại.

## Mở đầu và vòng lặp chính

Hành trình bắt đầu tại **Vực Hải Uyên**, nền văn minh chìm bị lãng quên. Một quả trứng hóa đá hoặc lõi sự sống ngủ yên gắn với Quy đã bị phong ấn hàng chục nghìn năm. Nhiễu động năng lượng đánh thức tàn tích và cho phép linh thể cộng hưởng với Quy. Việc chọn trứng hay lõi vẫn **UNRESOLVED**.

Vòng lặp mục tiêu: khám phá dấu vết và hệ sinh thái → đọc điều kiện môi trường → lựa chọn/đổi dạng để di chuyển, chiến đấu hoặc giải quyết thách thức → tìm ký ức, cộng hưởng và tiến trình → khôi phục một phần hệ nguyên tố → quay lại vùng cũ với hiểu biết hoặc khả năng mới. Đây là vòng lặp thiết kế tương lai; game hiện tại mới có nền khám phá/chiến đấu Phượng Hoàng.

## Bốn chương của cung truyện đầu

| Chương / linh thú | Vùng | Nguyên tố và chủ đề | Đặc trưng và kết quả chương |
| --- | --- | --- | --- |
| I — Quy / Quy Hải Uyên | Vực Hải Uyên | Thủy: thức tỉnh, bảo tồn, ký ức cổ, khám phá dưới nước | Bơi/di chuyển dưới nước, cảm nhận dòng năng lượng, phòng thủ, điều khiển nước. Khôi phục một hệ năng lượng lớn dưới biển, dần mở đường đến đảo núi lửa |
| II — Phượng / Phượng Hoàng Nhật Diệm | Đảo Nhật Diệm | Hỏa: tái sinh, biến đổi, nhiệt, đổi mới | Lửa, di chuyển trên không, dòng nhiệt và năng lực liên quan cháy/tái sinh. Thức tỉnh Phượng góp phần đánh thức núi lửa đã ngủ hàng chục nghìn năm; luồng khí nóng là một phần đường lên thiên đảo |
| III — Long / Long Thiên Phong | Thiên Đảo Phong Vân | Phong: tự do, chuyển động, cân bằng khí quyển, kiểm soát | Điều khiển gió, vượt dòng khí nguy hiểm, đổi luồng khí cục bộ, chiến kỹ bão. Giới hạn tự nhiên của các dạng cũ được thể hiện mà không vô hiệu hóa chúng tùy tiện; thức tỉnh Long mở đường tới thiên đường cổ |
| IV — Ly / Ly Vạn Sinh | Tiên Cảnh Vạn Sinh — thiên đường cổ trên trời đã đổ nát | Mộc; quyền năng nguyên sơ đặc biệt **Sinh Mệnh**: sinh thái, tái tạo, nương tựa, phục hồi | Cây, rễ/dây leo, chữa lành, khôi phục môi trường và quan hệ giữa hệ sống. Sinh Mệnh quan trọng về truyện hơn nguyên tố Mộc thông thường; không cho hồi sinh vô hạn sinh vật đã chết hoàn toàn |

Hoàn tất Chương IV kết nối lại bốn hệ nguyên tố và tái kích hoạt cổng tinh giới cổ (tên tạm: Tinh Môn). Du hành hành tinh khác là hướng mở rộng sau này, ngoài phạm vi sản xuất ban đầu.

## Đại Biến Cố Tinh Giới và giới hạn tiết lộ

Tên sự kiện là tên làm việc. Thế giới từng được duy trì bởi bốn hệ Thủy/Hỏa/Phong/Mộc liên kết. Cổng tinh giới nối với những môi trường xa, đưa năng lượng và sinh vật ngoại lai vào; tương tác giữa hệ bản địa và ngoại lai làm xáo trộn cân bằng sinh thái. Có loài thích nghi qua nhiều thế hệ, có loài mất ổn định vì biến đổi cưỡng ép hay đồng hóa trái tự nhiên. Ngoại lai không đồng nghĩa xấu; cổ xưa/bản địa không mặc định tốt.

Giả thuyết Tứ Linh hiến tế hoặc phong ấn thể xác để kiềm chế biến cố và đóng cổng là **PROPOSED**, chưa phải sự thật cuối cùng. Chưa chốt thủ phạm, nguyên nhân chính xác, sự tự nguyện hay cơ chế phong ấn. Chương I chỉ cho thấy dấu vết và ký ức cục bộ; không giải thích nguồn gốc thật của linh thể hoặc toàn bộ bí ẩn vũ trụ.

## Hóa thân và tiến trình

Người chơi có thể thu thập nhiều dạng qua cộng hưởng, khám phá, phát hiện và gặp gỡ có ý nghĩa về truyện. Bộ trang bị gồm **một dạng đang điều khiển và hai dạng bổ sung**. Đổi giữa ba dạng trong khám phá/chiến đấu thông thường. Thay thành viên của bộ ba qua giao diện bộ sưu tập ngoài các cuộc chạm trán bị hạn chế.

Khi boss bắt đầu, khóa thành phần bộ ba; vẫn đổi giữa ba dạng đó, nhưng không trang bị sinh vật khác cho đến khi cuộc chạm trán kết thúc. Mỗi sinh vật có cấp, kinh nghiệm, kỹ năng, tiến trình riêng và trạng thái tiến hóa khi phù hợp. Ngưỡng tiến hóa, phân phối XP và tài nguyên giữa các dạng chưa chốt.

Tiến trình có ý nghĩa đến từ chiến đấu, khám phá, khám phá cốt truyện, cộng hưởng và thách thức môi trường. Tránh grind bắt buộc và power creep làm sinh vật đầu game lỗi thời.

## Cập nhật Task 02

Tên Tiên Cảnh Vạn Sinh và kết quả tái kích hoạt Tinh Môn do người dùng xác nhận ở Task 02, cụ thể hóa phần mở của Task 01. Xem [changelog lore](lore/LORE_CHANGELOG.md) và [lịch tiết lộ](lore/CHAPTER_REVELATIONS.md). Các cơ chế mới trong bộ lore vẫn PROPOSED nếu chưa có quyết định xác nhận riêng.

## Thuật ngữ và đặc tả Task 03

Tinh Linh là tên thuật ngữ cho chủ thể linh thể người chơi. [Sổ quyết định cộng hưởng](lore/RESONANCE_DECISION_RECORD.md) tách quy tắc đã xác nhận với mô hình B+C và cơ chế mới còn PROPOSED. Task 03 xác nhận Quy thức ở dạng non trẻ và Tứ Linh có ba giai đoạn tiến hóa lớn; chưa có ngưỡng level hoặc bộ animation được duyệt cho ba stage.

## Đặc tả Tứ Linh Task 04

[Ma trận bản sắc](creatures/SACRED_CREATURE_OVERVIEW.md) và [12 dạng tiến hóa](creatures/SACRED_EVOLUTION_MATRIX.md) cụ thể hóa hướng thiết kế từ Task 04. Giữ thứ tự chương và bộ ba; tên/ID stage, anatomy chi tiết, skills/synergies còn PROPOSED theo [audit](creatures/TASK04_CONSISTENCY_AUDIT.md). Chưa có bộ 12 animation production hoặc gameplay mới.
