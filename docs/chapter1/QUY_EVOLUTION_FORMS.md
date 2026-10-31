# Ba dạng phát triển Quy

**CONFIRMED:** ba major stages, cùng Sacred Thủy và giải phẫu rùa nước cổ. **PROPOSED Q18-P01**, cụ thể hóa C04-P02/V13-P03; giữ [profile gốc](../creatures/QUY_HAI_UYEN.md), [stage matrix](../creatures/SACRED_EVOLUTION_MATRIX.md) và [skill registry](../gameplay/SACRED_CREATURE_ABILITIES.md) làm nguồn IDs/tên ứng viên. Không định kích thước pixel hoặc tuổi sinh học.

| Thuộc tính | Stage I — `quy_s1`, Quy Khởi Triều | Stage II — `quy_s2`, Quy Hộ Lưu | Stage III — `quy_s3`, Quy Hải Uyên Nguyên Sơ |
| --- | --- | --- | --- |
| Vai trò truyện | Cơ thể đầu, học cảm giác và giữ một nhánh nhỏ | Từ chịu lực sang chủ động chọn hướng giữ | Bảo tồn có điều tiết và chấp nhận thay đổi, không phục hồi mọi thứ đã mất |
| Loại tỷ lệ thị giác | Gọn, thân thấp so với vòm sanctuary | Trung bình, mai mở ngang và vây rõ hơn | Uy nghi, khối thấp nhiều tầng; không bắt buộc footprint khổng lồ |
| Thân/tỷ lệ | Mai oval nổi hơn đầu, thân bầu thấp, cổ ngắn nhưng thấy khớp | Thân dẹt ngang hơn, cổ đủ xoay nhìn, vai vây phát triển | Cổ chắc, mặt lực thân rõ; tăng cấu trúc thay kéo dài thành rồng |
| Cấu trúc mai | Mảng lớn đơn giản, đường ghép đọc rõ, viền thấp | Viền có rãnh nước có đầu vào–ra, không đắp gai trang trí | Mảng xếp tầng theo đường hồi, có khoảng âm giữa gờ; vẫn là mai sinh học |
| Đầu/mặt | Đầu nêm ngắn, hàm rùa, hai mắt nhỏ sáng vừa; thân thiện qua tư thế, không cười người | Gờ má trơn nối cổ, mắt bình tĩnh, hàm còn nhận ra | Gờ đầu liên tục với cổ/mai, mắt tách nền; không sừng/gạc/đầu rồng |
| Bốn chi/vây | Chi có màng, nhịp đạp ngắn, nhìn rõ bốn điểm gắn | Vây trước rộng có rìa chịu lực; chi sau lái | Vây chia mặt lực, gập hợp lệ nếu có clip; không mất chi trong FX |
| Đuôi | Ngắn thuôn, giúp đọc hướng sau | Dài tương đối vừa đủ làm bánh lái, không roi tấn công mặc định | Đuôi chắc có mép lái, giữ gốc giải phẫu; không rắn độc lập |
| Màu/vật liệu | Xanh nước sâu, xanh ngọc/cyan ở viền, hàm/bụng ngà; ít vàng | Cùng họ màu, vùng mặt/viền chức năng tương phản; rãnh sáng có tiết chế | Vàng trầm ở điểm nối, ngọc sáng dẫn mắt vào đầu/đường hồi; không dát kim loại toàn thân |
| Silhouette riêng | Oval mai + đầu nêm + bốn chi ngắn, thấy đuôi | Dẹt ngang, khoảng âm dưới vây trước lớn hơn | Mai tầng thấp và mặt vây phân lực; uy nghi nhờ cấu trúc/nhịp, không chỉ size |
| Movement | Bơi/đổi hướng/hãm dễ đọc, mượn dòng có sẵn; đi nền chậm khi hợp lệ | Giữ hướng/hãm chắc hơn trước dòng đã khai báo, không miễn mọi dòng | Lựa đường trong cụm, điều tiết có giới hạn; vẫn có route và clearance |
| Combat | Chấn Mai gần, Vành Nước ngắn, short brace thử nghiệm riêng | Giữ tools I; Mai Định Áp sector có duy trì hữu hạn và recovery | Giữ tools I/II; vùng Hồi Lưu có preview, ngắt nạp/counterplay |
| Phòng thủ | Chọn vị trí và short brace C14; mất cơ động, còn sườn/sau | Định hướng chịu lực tốt hơn; không toàn hướng, không vô hạn | Chọn khi giữ và khi đổi dòng; không xóa damage/hazard bằng danh Sacred |
| Phát triển signature | `quy_s1` ability + `quy_mobility`/passive theo unlock được duyệt | `quy_s2` ability đủ minimumStage II và condition riêng | `quy_s3` ability đủ minimumStage III và condition riêng |
| Khám phá | Đọc chiều dòng, tương tác cơ cấu đơn của opening | Đọc nhịp áp/chuyển nhánh đơn có đường hồi | Điều phối cụm vào–ra đã khảo cứu, không terraform hoặc world-stable tự động |
| Animation | Idle, swim/turn/brake, basic, short brace, water release, hurt/incapacity, interact, awakening | Thay core anatomy tất cả hướng; thêm guard enter/hold/block/break/release và valve | Mai/rãnh theo xoay, S3 aim/charge/release/recovery, fold nếu dùng; FX tách thân |
| Liên tục tiến hóa | Căn đầu/mai/chi và skill nền rõ để lên II không mất nhận diện | Giữ unlock/evidence I, mapping clip/geometry mới; không clone form | Giữ khả năng receiver I/II, route và controls nền; không bắt quay I để mở cửa cũ |
| Độ phức tạp sản xuất | Ưu tiên cao nhất, ít action đủ test loop; chưa có sprite Quy | Cao hơn do sector defense và vây/mai nhiều posture; không cần cho test I | Cao nhất do anatomy tầng và vùng FX; sản xuất sau khi geometry/camera đạt |
| Trạng thái duyệt | Anatomy/tên/kit chi tiết PROPOSED, reference/clip Missing | PROPOSED; chưa approval gate/asset | PROPOSED; không bảo đảm mở ở Chương I |

Số stage **CONFIRMED** không đồng nghĩa toàn tên/IDs/abilities đã duyệt. Không mặc định phải lên II để qua opening hay lên III để hoàn Chương I. `minimumStage` chỉ eligibility của skill, không tự grant. Mỗi transition cần [progression contract](QUY_PROGRESSION.md) và envelope/route/assets đã validate; không phóng Stage I lớn lên để giả anatomy mới.
