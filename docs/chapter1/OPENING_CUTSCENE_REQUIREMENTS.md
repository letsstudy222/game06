# Trình chiếu, input và khôi phục mở đầu

**PROPOSED O17-P08.** Không có framework cutscene được triển khai. Mặc định pause/help và accessibility luôn khả dụng. Khóa input chỉ theo ngữ cảnh ngắn nhất, không tự khóa menu để che lỗi lưu. Skip là rút ngắn **trình bày**, không tạo evidence hành động hay commit.

| Đoạn | Hình thức / input | Skip và replay | Boundary commit / load |
| --- | --- | --- | --- |
| b01 | Guided focus; input chú ý/tương tác, camera tĩnh | Bỏ khoảng chờ mở màn, vẫn cần đáp ứng đầu | Evidence E01 nếu durable; load anchor nhận cảm |
| b02 | Playable giới hạn vùng nhận cảm | Bỏ nhịp ánh sáng, không tự tương tác | Evidence signal; load đúng bước thiếu |
| b03 | Guided chuyển giữa anchor, khóa di chuyển thân vì chưa có thân | Rút ngắn camera, vẫn chọn hướng/đích | Source evidence theo owner; không free-flight |
| b04 | Overlay tiếp xúc, input hủy/tiếp xúc | Bỏ cận cảnh không bỏ tiếp xúc | Chưa unlock; reload prebody anchor |
| b05 | Memory overlay ngắn, không điều khiển thân | Có bản ngắn/caption; sau trigger hợp lệ skip phần diễn vẫn ghi memory evidence theo contract | Memory boundary trước resonance; reload không cấp lại |
| b06 | Camera in-engine ngắn, xác nhận trước đoạn chuyển | Cancel trước commit; skip animation không tự confirm, sau commit cho tới anchor | form_committed durable là ranh giới, không animationEnd; đang commit thì reconcile receipt |
| b07 | Fully playable bơi/hãm; không camera ép | Đóng prompt, vẫn tự đạt hai evidence | Load Quy tại practice anchor, không lại cảnh sinh thân |
| b08 | Fully playable tương tác | Bỏ camera cửa, vẫn thao tác đúng receiver | Local patch qua W07; load dựng cửa từ state, không toggle lần nữa |
| b09 | Optional memory overlay | Bỏ qua hoặc replay bản ngắn tự do | Không write reward/progress mới; không quay lùi event |
| b10 | Fully playable rời buồng, overlay mục tiêu | Bỏ khung toàn cảnh không tự đi qua cửa | Parent completion durable rồi mới đổi projection objective |

Không cần phim non-interactive dài. Giới hạn đoạn chuyển chỉ che placement atomic, không giữ người chơi chờ lời dẫn. Animation lỗi hoặc không có hiệu ứng phải có đường fallback tĩnh và reconcile kết quả theo owner; không dùng thiếu animation callback làm điều kiện không thể hoàn thành.

Blur/visibilitychange: xóa held input, dừng tiến trình tạm/camera, không tự xác nhận hoặc bù thời gian thành thành công. Khi focus lại, kiểm phase đã durable và cần input mới cho action tiếp theo. Commit đã gửi có thể hoàn tất khi mất focus: khi trở lại đọc receipt, không gửi source claim mới. Trước boundary thì resume anchor tương ứng; sau boundary dựng kết quả rồi tiếp tục practice. Tab đóng/crash theo [save contract](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md).

Replay cảnh từ menu/điểm nhớ chỉ là presentation dựa receipt, không chạy quest trigger/reward path. Reduced motion thay pan bằng cắt cảnh, thay rung bằng viền; không dùng flash nhanh bắt buộc. Low-cost mode bỏ lớp FX phụ; hướng dòng/mai/receiver/caption vẫn rõ. Audio optional giữ đủ meaning CL05 bằng văn bản, không cần nghe nhịp chính xác. Không đặt ngân sách FPS hay thời gian khóa cứng khi chưa benchmark.
