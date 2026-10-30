# Linh thể và cộng hưởng

> Mốc Task 02. Task 03 đã cụ thể hóa L02-P08 thành mô hình ứng viên và quy tắc trong [RESONANCE_DECISION_RECORD](RESONANCE_DECISION_RECORD.md). Những câu “chưa chốt” dưới đây ghi trạng thái canon; các ứng viên Task 03 vẫn PROPOSED, không là triển khai đã có. Khi đặc tả hệ, dùng các tài liệu Task 03 được dẫn, không tạo state machine thứ hai từ bản tóm tắt này.

## Đã xác nhận — CONFIRMED

Linh thể ban đầu không có cơ thể, nhận thức hạn chế, cộng hưởng với cấu trúc sống được bảo tồn và lần đầu nhập Quy. Bản sắc riêng được hình thành dần qua trải nghiệm; linh thể có thể tiếp cận ký ức tổ tiên của sinh vật cộng hưởng. Nguồn gốc thật không được tiết lộ trong Chương I.

Cơ chế thiết kế D05–D07: một dạng điều khiển và hai dạng trang bị bổ sung; đổi giữa ba dạng trong khám phá/chiến đấu. Ngoài encounter bị hạn chế có thể thay thành viên qua bộ sưu tập. Boss khóa thành phần ba dạng nhưng vẫn cho đổi giữa chúng. Mỗi sinh vật có tiến trình riêng; không mặc định chia sẻ level/XP/HP/cooldown.

Đây là quy tắc thiết kế đã xác nhận, chưa phải tính năng runtime hiện tại. Giới hạn ba dạng không tự chứng minh một “định luật vũ trụ số ba”; nguyên nhân lore của giới hạn chưa được xác nhận.

## Quy tắc giải thích đề xuất — PROPOSED, L02-P08

| Vấn đề | Quy tắc làm việc | Giới hạn / trường hợp không hợp lệ |
| --- | --- | --- |
| Vật mang | Cần cấu trúc còn giữ bản sắc sống có tổ chức: lõi ngủ, mầm sống hoặc nút liên tục trong mạng như bốn trạng thái đề xuất | Một xác phân hủy hoàn toàn, bản chép ký ức hoặc đồ vật khắc tên không đủ tạo lại cá thể |
| Khả năng tiếp cận | Cần tương hợp, điều kiện môi trường cho vật mang và mối liên hệ hình thành qua trải nghiệm/gặp gỡ | Không nhìn từ xa là lập tức sao chép mọi sinh vật; không dùng cấp hiếm làm bằng chứng tương hợp |
| Bản sắc nguyên thể | Cộng hưởng không tẩy/xóa cá thể gốc; ký ức và xu hướng sinh học đặt giới hạn cho sự hiện thân | Không coi sinh vật như skin rỗng hoặc nhập cưỡng bức mọi cá thể có trí tuệ; đồng thuận của cá thể có nhận thức cần đặc tả riêng |
| Đa dạng hình thái | Linh thể giữ nhiều quan hệ cộng hưởng đã thiết lập, nhưng chỉ hiện thân một dạng tại một thời điểm | Không có nhiều cơ thể hoạt động đồng thời hoặc nhân bản cá thể để phá ràng buộc |
| Bộ ba | Một số quan hệ được giữ sẵn ở trạng thái có thể chuyển nhanh; sắp xếp lại cần khoảng ổn định ngoài hạn chế encounter | Lý giải cho bộ ba là đề xuất, không thêm ritual, điểm đổi dạng bắt buộc hoặc chi phí mới chưa duyệt |
| Nhớ qua biến hình | Trải nghiệm người chơi thuộc dòng nhận thức linh thể, nên đổi cơ thể không xóa hiểu biết; mỗi dạng vẫn giữ tiến trình riêng | Biết một động tác không cho cơ thể không phù hợp thực hiện được; không tự chia sẻ XP hoặc skill |
| Ký ức tổ tiên | Nhận từng mảnh có điểm nhìn và vật mang; có thể thiếu ngữ cảnh, thời gian hoặc cảm giác bị hiểu sai | Không phải camera khách quan toàn tri; không tải mọi bí mật ngay khi cộng hưởng |
| Cạn sức/thua trận | Dạng mất khả năng duy trì hiện thân, quan hệ có thể rút về vật mang còn nguyên và cần hồi phục | Đây là thất bại không đồng nghĩa chết sinh học hoàn toàn; không chứng minh cơ chế retry hay respawn cụ thể đã duyệt |
| Chết hoàn toàn | Mất cấu trúc bản sắc sống khả dụng thì cộng hưởng/Sinh Mệnh không tái tạo cá thể chỉ từ dấu ký ức | Không rollback mọi cái chết hoặc hồi sinh miễn phí vô hạn; không biến tàn tích thành nguồn sinh vật bất tận |

Linh thể không tự sửa môi trường đang giết vật mang, không tự cấp nguyên tố chưa có, không ép sự sống tiến hóa tức thì và không có quyền hiểu mọi ký ức là sự thật. Khả năng điều khiển có thể mở qua cộng hưởng nhưng cơ thể vẫn chịu va chạm, điều kiện sống và giới hạn vận động.

## Kiểm soát và tư cách cá thể — PROPOSED / UNRESOLVED

**PROPOSED:** tách “điều khiển gameplay” khỏi “chiếm đoạt bản sắc”. Trạng thái ngủ yên cho phép linh thể tiếp tục phần hoạt động còn khả thi; bản sắc gốc hiện qua ký ức và đặc tính cơ thể. Với sinh vật đang có ý chí độc lập, cộng hưởng cần quan hệ tương hợp và tôn trọng chủ thể, không là giấy phép cưỡng ép.

**UNRESOLVED:** ý thức gốc có đối thoại hay đồng điều khiển không; cách biểu đạt đồng thuận; hiện thân là thân vật chất nào và vật mang ở đâu khi đổi dạng. Không tự chốt rằng linh thể tạo cơ thể từ hư không hoặc bỏ xác ở từng lần chuyển. Level design chưa được dựa vào logistics cơ thể khi chưa phê duyệt.

## Thua trận và runtime hiện có — UNRESOLVED

Prototype Phoenix có hồi HP và respawn tại spawn. Task 02 không sửa, không tuyên bố đây là hồi sinh sinh vật chết hoàn toàn trong canon. Đề xuất “đứt hiện thân tạm thời” có thể giải thích hành vi về sau; checkpoint, phí phục hồi, mất tiến trình, retry boss, thoát encounter và trường hợp cả ba dạng bị đánh bại đều chưa chốt. Không thêm permadeath hoặc penalty vào game bằng tài liệu này.

## Nguồn gốc linh thể — UNRESOLVED

Có từ trước biến cố hay không; xuất hiện do ngẫu nhiên hay được gọi; có liên quan Tinh Môn hoặc từng tham gia khủng hoảng không. Không gán linh thể là linh thú thứ năm, thần sáng thế, mảnh phản diện hay một người cổ cụ thể. [L02-P06](ANCIENT_CATASTROPHE.md) chỉ giải thích điều kiện khởi động gần tại Quy, không trả lời nguồn gốc.

Khi ký ức xung đột, cần vật chứng độc lập và nguồn cụ thể; không dùng “linh thể nhớ lại tất cả” để lách lịch tiết lộ hoặc giải quyết bất kỳ lỗ hổng nào.
