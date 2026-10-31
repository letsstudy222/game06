# Cộng Hưởng Quy đầu tiên

**CONFIRMED:** D29, Quy đầu tiên, cơ thể đầu không đòi một cơ thể trước đó. **PROPOSED O17-P02:** cách thể hiện dưới đây kế thừa [R03](../lore/RESONANCE_RULES.md), [E01](../story/STORY_IMPLEMENTATION_HANDOFF.md), không duyệt B+C, HP hoặc vật mang Q05.

## Điều kiện và ý nghĩa

Nhiễu động làm một nhánh sanctuary đáp; nguồn còn tổ chức sống được cấu trúc bảo tồn duy trì. Người chơi đã tiếp xúc giác quan từng phần và mảnh ký ức thiếu, nhận biết có một nhịp đáp khi lại gần. Chỉ cần ổn định cục bộ và tương hợp mở đầu, không cần phục hồi mạng nước, đánh Quy, có item, ba dạng, cấp hoặc mastery.

Phản hồi nhịp phù hợp diễn tả **tương hợp**, không xác nhận một cá thể Quy có ý thức người đã tự nguyện hy sinh hay nói “đồng ý”. Q03 về ý thức/tự nguyện vẫn UNRESOLVED. Không diễn giải hành động thành chiếm hữu. Bootstrap này khác các tuyến khám phá/quan sát/thử thách sau; không áp cùng nghi thức cho mọi species.

## Hành trình yêu cầu

| Mốc | Điều kiện kiểm / hành động | Phản hồi | Kết quả và writer |
| --- | --- | --- | --- |
| Tiếp cận | CAP_BOOTSTRAP, nguồn E01 hợp lệ; giác quan giới hạn và memory trước cộng hưởng | Vùng đáp có viền/nhãn, âm tùy chọn | Evidence theo owner E01; chưa form |
| source_validated | Kiểm nguồn, nhánh cục bộ, tương hợp và safe anchor; chủ động chọn “Chạm vào nhịp nước” | Một nhịp vào, một nhịp đáp | Stage nguồn của E01; không tự báo unlock |
| Bắt đầu | Input xác nhận đơn, không timed hold; lưu intent nếu adapter hỗ trợ | Cấu trúc sống khoáng hóa hoạt động; hình cuối chờ Q05 | Trạng thái trình chiếu tạm; intent không chứng minh hoàn tất |
| form_committed | Nguồn vẫn hợp lệ, Quy non và anchor bơi có placement hợp lệ | Sau durable ack mới báo “Bạn đã cảm được cơ thể đầu tiên.” | Một transaction: sub-completion, grant_evt_01_quy_awakes_form, form_quy_hai_uyen unlock/active placement và tham chiếu owner selection theo R03/W07 |
| Luyện tập | Dạng đã commit; CAP_QUY_MOVE ở đây, không tại entry | Bơi/hãm có phản hồi ngay | Không grant lại dạng; practice_complete/parent chỉ sau thực hành và cửa ra |

`form_quy_hai_uyen` là ID event actor/form theo S05; `quy_s1` là stage ứng viên trong C04, không loài hay unlock thứ hai. Cần mapping catalog được duyệt trước code, không cấp hai dạng vì hai tên. Không khẳng định Quy nở từ trứng, tạo xác từ hư vô hoặc hồi sinh xác chết.

## Ngắt và thử lại

Trước form commit: hủy/focus loss dừng tiến trình cảm giác, không mất nguồn, không tiêu hao tài nguyên giả định. Reload về anchor bootstrap hợp lệ và evidence đã durable; source_validated phải revalidate, không dựa animation để mở dạng. Commit đang chờ: không gửi yêu cầu mới có identity khác; kiểm receipt trước retry cùng command. Nếu chưa durable, không báo đã lưu.

Sau form commit: bỏ phần trình bày còn lại hoặc reload đều đặt Quy tại anchor luyện tập, giữ unlock; không quay về linh thể và không thưởng lại. Nếu placement không hợp lệ trước commit, từ chối/defer và giữ trạng thái cũ; không noclip cứu lỗi. Nếu nguồn đã claimed, trả kết quả receipt cũ, không chọn recipient mới. Xem [save contract](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md).
