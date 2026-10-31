# Mười nhịp chơi mở đầu

**PROPOSED O17-P01.** D29 là trình tự **CONFIRMED**; mười nhịp chơi sau gom các vi nhịp chứ không đánh số lại canon. `opening_bNN` là khóa đoạn nội dung cục bộ, không eventId, questId hoặc cờ lưu mới. Xem [E01](../story/STORY_IMPLEMENTATION_HANDOFF.md) và [hợp đồng lưu](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md).

| Đoạn | D29 | Hình/âm và ý định | Hành động, đầu vào | Kết quả / chuyển tiếp | Pacing giả thuyết |
| --- | --- | --- | --- | --- | --- |
| opening_b01 — Tĩnh lặng | 1 | Khung cận tối có rìa sáng đứng yên; âm nước thấp tùy chọn. Một khoảng trống có khả năng đáp, chưa vẽ thân linh thể | Hướng chú ý tới dấu hoặc chọn tương tác được nhắc; pause/help luôn có | Dấu đáp ngay, hướng tới b02; không tự tuyên bố có cơ thể | 10–20 giây; lần đáp đầu 5–15 giây |
| opening_b02 — Có hồi đáp | 2 | Rãnh gần sáng theo đường nét, nhịp âm ngắn | Chọn dấu gần; nhận một phản hồi thành công rõ | Di tích đáp, mở đường nhận cảm có giới hạn | 15–30 giây |
| opening_b03 — Dòng bị ngắt | 3–4 | Khung trượt ngắn theo khe dẫn đứt; tiếng nước mỏng; dấu tổn hại chưa có thủ phạm | Chuyển chú ý giữa điểm gần, tiếp cận theo tuyến dẫn; không bay tự do | Cảm được nơi có nguồn sống, tới sanctuary | 30–60 giây |
| opening_b04 — Dấu Quy | 5 | Mặt khoáng, đường cong gợi mai; áp nhẹ và nhịp chậm | Chạm vùng đáp khi đã ở gần; có thể lùi chú ý | Giác quan từng phần; chưa mở dạng | 25–45 giây |
| opening_b05 — Nhịp còn thiếu | 6 | Chớp cảm giác giữ dòng, ba nhịp xa rời rồi im; không thấy người quyết định | Chọn tiếp xúc; xem hoặc rút ngắn trình bày ký ức | Evidence mem_quy_first_sense được xử lý đúng identity; mở lựa chọn cộng hưởng khi đủ nguồn | 30–50 giây |
| opening_b06 — Cơ thể đầu | 7–9 | Dòng vào cấu trúc khoáng, nhịp đáp, Quy non thức; chuyển cận sang tầm chơi | Xác nhận bắt đầu một lần, không QTE/giữ phím chính xác; có thể hủy trước commit | source_validated → form_committed; có dạng và placement an toàn trước thông báo | 40–60 giây |
| opening_b07 — Học trọng lượng | 10 | Camera ổn định, mai và hướng thân đọc được, dấu bơi/hãm | Tự bơi tới mốc gần, hãm tại vùng rộng; không thao tác trong thời hạn | Có evidence luyện bơi/hãm, không XP mới | 60–100 giây |
| opening_b08 — Một lối nước | Sau D29 | Lá hướng dòng và cơ cấu có vị trí tựa, cửa nhỏ còn khép | Quan sát → tới điểm tương tác → đặt cơ cấu theo rãnh hồi cục bộ → thử lối; một Quy đủ | Evidence thực hành cơ cấu, mở cửa cục bộ; không đồng nghĩa phục hồi toàn vùng | 60–100 giây |
| opening_b09 — Nghe lại | Sau D29 | Cùng mặt khoáng ở phía cửa, cùng tiếng vọng đã ghi; không thêm sự thật | Có thể chọn đọc lại bản ngắn hoặc đi tiếp | Chỉ replay mem_quy_first_sense; không chặn hoàn thành, không grant mới | 0–30 giây, tùy chọn |
| opening_b10 — Ngoài buồng thức | Sau D29 | Tầm nhìn mở ra rạn, đường về còn đọc được; âm không bắt buộc | Đi qua mốc cửa an toàn sau evidence bắt buộc | Commit practice_complete + parent R0 một lần; hiển thị mục tiêu mq_02, không hoàn thành E02 | 20–40 giây |

Các khoảng cộng lại khoảng 6–9 phút; dự trù 6–10 phút khi người chơi đọc/lùi lại, chưa có số đo. Không khóa người chơi theo đồng hồ. Nếu chưa hành động, nhắc lại dấu bằng hình/nhãn, không tự vượt objective. Không cần nghe, phân biệt màu hoặc nhìn hiệu ứng chuyển động mới hiểu được đường đi. Reduced motion dùng cắt cảnh tĩnh và đường viền thay camera trôi. Mọi đoạn dùng [quyền điều khiển/skip](OPENING_CUTSCENE_REQUIREMENTS.md); các đoạn b01–05 chưa có activeForm, b06 là boundary duy nhất tạo cơ thể đầu.
