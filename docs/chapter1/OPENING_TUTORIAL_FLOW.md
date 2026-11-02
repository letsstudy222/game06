# Học điều khiển trong mở đầu

**PROPOSED O17-P04.** Đây là action contract, không keybinding đã triển khai. [InputManager hiện tại](../../src/island/InputManager.mjs) có WASD/mũi tên cho hướng, J/Space tấn công và các thao tác của prototype Phượng; không coi chúng đã hỗ trợ Quy/bơi. Không tái gán Space thành tương tác trong tài liệu này. Q07/input mapping cần duyệt trước code.

| Thứ tự | Bài học / hành động ngữ nghĩa | Bằng chứng đạt | Nhắc khi chưa đạt / an toàn |
| --- | --- | --- | --- |
| 1 | Hướng chú ý tới một dấu gần, chọn tương tác | Một dấu phản hồi do input, không autoplay | Viền và chữ chỉ dấu; không yêu cầu thân hoặc di chuyển vật lý |
| 2 | Tiếp xúc có chủ đích | Nguồn đáp và ký ức trước cộng hưởng được xử lý | Chỉ một lời nhắc tại một lúc; không mở tutorial collection |
| 3 | Xác nhận cộng hưởng | Request hợp lệ và durable form commit | Có đường quay lại trước commit; bỏ animation không bỏ thao tác xác nhận |
| 4 | Bơi tới mốc gần | Di chuyển có chủ đích từ anchor tới vùng rộng | Mốc viền + hướng; không timer, không oxy/HP drain |
| 5 | Hãm/đổi hướng | Dừng có kiểm soát ở vùng đích; tiêu chí velocity/input cụ thể cần prototype | Hint theo action mapping tương lai; không ép timed precision |
| 6 | Quan sát dòng, tương tác cơ cấu | Đặt cơ cấu vào vị trí có nhãn hồi cục bộ, rồi thử lối | Tương tác tại receiver, không cast skill combat chưa duyệt; sai vị trí trả trạng thái cơ cấu an toàn |
| 7 | Đọc mục tiêu và đi ra | Qua cửa sau evidence bắt buộc | Mục tiêu ngắn, hướng landmark, có đường về |

Hành động môi trường là **ứng viên tương tác theo ngữ cảnh**, không mở S2 giữ thế/stage II, không mana/cooldown hoặc năng lực mới được confirmed. Nếu Q07 không duyệt thao tác này, phải sửa beat08 trước triển khai, không tự thay bằng combat. Hoàn thành bằng Quy đầu tiên là tiêu chí nghiệm thu.

## Trình bày và khả năng tiếp cận

Nhãn phím lấy từ mapping đang dùng; văn bản ở [thoại](OPENING_DIALOGUE.md) dùng `{interact}`, `{move}`, `{brake}` như token kỹ thuật phải thay bằng nhãn tiếng Việt/mapping phù hợp, không để token thô lọt ra màn hình. Keyboard thử nghiệm hướng có thể kế thừa WASD/mũi tên; interact/brake chưa chốt. Mobile dùng action tương đương bằng vùng chạm/điều hướng ảo, không đòi hover, multi-touch hoặc bàn phím để qua tuyến; kích thước và layout chờ thiết kế UI riêng.

Mỗi prompt một ý, chữ tương phản trên nền yên, không chỉ màu. Remap cập nhật tức thời và không làm mất evidence. Cues thiết yếu có nhãn/hình; tắt âm vẫn đủ. Reduced motion giữ camera tĩnh/cắt cảnh, bỏ rung/nhấp nháy. Thiết bị yếu có thể bỏ bloom, particle, caustic và lớp nền; silhouette, hướng dòng và receiver vẫn hiện. Không có tuyên bố FPS hay thiết bị tối thiểu đã được test.

Đóng prompt không hoàn thành bài học; reopen từ help hoặc khi quay lại vùng. Evidence đạt rồi không ép làm lại vì mất overlay. Triggers re-evaluate tại safe anchor sau load, không chỉ dựa enter một lần; nếu người chơi đi vòng tới cửa, nhắc đúng bài còn thiếu và có đường quay lại. Blur/visibilitychange xóa held input, pause tiến trình tạm; focus trở lại cần input mới, không tự xác nhận cộng hưởng. Không dồn combat, EXP, mastery, evolution, collection và boss vào đây.
