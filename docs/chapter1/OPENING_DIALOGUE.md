# Gói lời văn mở đầu — bản nháp đầu

**PROPOSED O17-P05.** Không có thoại đã duyệt hay voice asset. Không nhân vật nào nói lời người trong mở đầu. “Ấn tượng” là cảm nhận của người chơi qua Tinh Linh, không lời khai của Quy; “tiếng vọng” là ký ức có điểm nhìn hạn chế. Tất cả câu hiển thị dưới đây tiếng Việt, IDs chỉ cho content pipeline. Cảnh có thể diễn bằng hình thay lời cảm nhận, nhưng objective/hint thiết yếu phải có phương án đọc.

| dialogueId | Đoạn / kênh | Văn bản lượt đầu | Bản rút ngắn / lặp | Điều kiện |
| --- | --- | --- | --- | --- |
| opening_silence | b01 / mô tả tiếp cận | Trong tối sâu, một vệt sáng khẽ rung. | Một vệt sáng khẽ rung. | Caption thay âm/hình; không giọng toàn tri |
| opening_orient | b01 / UI | Hướng chú ý về vệt sáng. | Vệt sáng ở gần. | Trước đáp ứng đầu |
| opening_answer | b02 / ấn tượng | Có gì đó… vừa đáp lại. | Một nhịp đáp. | Sau input thành công |
| opening_follow | b03 / UI | Theo dấu nước tới nơi còn sáng. | Theo dấu nước. | Tuyến nhận cảm mở |
| opening_broken | b03 / mô tả tiếp cận | Dòng nước dừng ở một rãnh đá gãy. | Rãnh đá gãy. | Quan sát tùy chọn; không gán thủ phạm |
| opening_near | b04 / ấn tượng | Lạnh. Rồi một nhịp rất chậm. | Một nhịp chậm. | Tiếp xúc từng phần |
| opening_touch | b04 / UI | Dùng {interact} để chạm vào nơi đang đáp. | Chạm vào nơi đang đáp. | Có nguồn hợp lệ |
| opening_memory_pressure | b05 / tiếng vọng | Một sức ép. Một dòng nước vẫn được giữ lại. | Một dòng nước được giữ lại. | mem_quy_first_sense; cảm giác thiếu, không người nói |
| opening_memory_absence | b05 / tiếng vọng | Ba nhịp xa dần. Rồi chỉ còn nhịp nước. | Chỉ còn nhịp nước. | CL05, không nhận diện ba nhịp |
| opening_memory_note | b05 / UI | Một mảnh ký ức chưa trọn vẹn. | Ký ức chưa trọn vẹn. | Ghi đúng identity, không claim diễn giải đúng |
| opening_resonate | b06 / UI | Chạm vào nhịp nước. | Chạm vào nhịp nước. | Nút hành động cộng hưởng khi đủ điều kiện |
| opening_wait | b06 / UI | Nhịp nước chưa ổn định. Hãy thử lại. | Hãy thử lại khi nhịp nước ổn định. | Validation tạm thất bại, không mất nguồn |
| opening_body | b06 / ấn tượng | Có trọng lượng. Có dòng nước lướt qua mình. | Dòng nước lướt qua mình. | Chỉ sau form commit |
| opening_body_notice | b06 / UI | Bạn đã cảm được cơ thể đầu tiên. | Cơ thể đầu tiên đã thức. | Durable unlock; không hiển thị nếu commit lỗi |
| opening_swim | b07 / UI | Dùng {move} để bơi tới khoảng sáng. | Bơi tới khoảng sáng. | Quy đã active tại anchor |
| opening_brake | b07 / UI | Dùng {brake} để hãm lại trong vùng đánh dấu. | Hãm lại ở vùng đánh dấu. | Mapping và hành vi chờ duyệt |
| opening_flow | b08 / UI | Nhìn hướng nước. Tới cơ cấu ở cạnh cửa. | Tới cơ cấu cạnh cửa. | Evidence bơi/hãm đủ |
| opening_mechanism | b08 / UI | Dùng {interact} để đưa cơ cấu theo rãnh hồi. | Đưa cơ cấu theo rãnh hồi. | Receiver cục bộ hợp lệ |
| opening_retry | b08 / UI | Lối nước chưa thông. Hãy nhìn lại hướng rãnh. | Nhìn lại hướng rãnh. | Sai thao tác; không phạt tài nguyên |
| opening_echo_again | b09 / UI | Nghe lại tiếng vọng? | Nghe lại / Đi tiếp | Chỉ replay đã mở, không grant |
| opening_exit | b10 / UI | Rời buồng thức theo lối nước vừa mở. | Đi theo lối nước. | Đủ evidence, parent chưa complete |
| opening_next | Sau b10 / UI | Rạn vẫn đang sống: quan sát dấu sống ngoài sanctuary. | Quan sát dấu sống ngoài sanctuary. | mq_02 được giới thiệu, không tự complete E02 |
| opening_resume | Sau load / UI | Bạn có thể tiếp tục từ đây. | Tiếp tục hành trình. | Anchor và state đã reconcile |
| opening_save_issue | Lỗi lưu / UI | Chưa thể lưu tiến trình. Thử lưu lại trước khi rời đi. | Chưa thể lưu. Hãy thử lại. | Không báo thành công giả |

Các lựa chọn chung: `opening_skip` — “Rút ngắn trình bày”; `opening_continue` — “Tiếp tục”; `opening_cancel` — “Để sau”; `opening_replay` — “Xem lại ký ức”. Đây là dialogue IDs bổ sung, không grant IDs. Replay dùng bản ngắn, không thêm lời giải về nguồn gốc. Không có câu “ta đã chờ ngươi”, “hãy bắt Quy” hay tên thủ phạm. Template tokens lấy nhãn từ [input contract](OPENING_TUTORIAL_FLOW.md); caption mô tả không thay completion evidence. Lời lưu lỗi là yêu cầu UX tương lai, không sửa UI hiện tại.
