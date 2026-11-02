# Tuyến nhiệm vụ chính Chương I — Vực Hải Uyên

**CONFIRMED:** Tinh Linh bí ẩn có cơ thể đầu qua Quy Sacred Thủy, D29 giữ ký ức trước cộng hưởng, thế giới ghi nhớ thay đổi và có đường về, D41 không yêu cầu đội đủ ba dạng. **PROPOSED Q21-P01–P10:** phân hồi, phân rã mục tiêu, lời nhắc/thoại, vòng đời, mô hình đọc và chi tiết tích hợp mới. **UNRESOLVED:** sinh vật có tên riêng và art, bộ chiêu/danh tính boss, cơ chế hiện thân vật lý, đầu vào/dòng chảy/hình học/lưu dữ liệu và chính sách thưởng. Tên/ID nhiệm vụ kế thừa S05 vẫn là đề xuất, không được phê duyệt chỉ vì Task21 sử dụng lại.

[Đề cương nhiệm vụ S05](../story/QUEST_DESIGN_OUTLINE.md) giữ `mq_01–mq_06`; [bàn giao truyện](../story/STORY_IMPLEMENTATION_HANDOFF.md) giữ ngữ nghĩa sự kiện/hoàn thành/phần thưởng E01–E06; [quy tắc nhiệm vụ W07](../world/QUEST_WORLD_STATE_RULES.md) giữ nguồn có thẩm quyền và cách công nhận bằng chứng có trước. Gói này cụ thể hóa và phân rã nội dung để duyệt, không tạo sổ nhiệm vụ, world graph hoặc kho sự kiện có thẩm quyền thứ hai. Nếu chi tiết hoàn thành không khớp nguồn, phải chặn review thay vì âm thầm ghi đè.

## Trải nghiệm cốt lõi

Người chơi từ nhận cảm hạn chế đến tự bơi, hiểu nơi còn sống, kiểm chứng dòng cấp–hồi và nhận ra bảo tồn không đồng nghĩa đóng kín. Cuộc đối đầu cho quyền thử tải an toàn; chỉ thao tác và kiểm chứng sinh cảnh sau đó mới phục hồi môi trường. Tới bờ vì đầu nhiệt còn cần kết nối, không tiết lộ nguồn gốc/biến cố hoặc toàn bộ kỹ năng Phượng. Lôi/Kim không mặc định xấu; không bắt buộc bắt sinh vật, cày tài nguyên hay thu thập theo số lượng.

Sáu hồi đề xuất: I mq_01; II mq_02; III phần khảo cứu mq_03; IV phần thử đường xả phụ mq_03; V mq_04; VI mq_05 và nhiệm vụ chuyển tiếp mq_06. Không tạo một nhiệm vụ mới cho mỗi hồi. Hồi IV thử cơ cấu phụ tại E và kiểm đường xả/nơi trú để hoàn tất bằng chứng E03; chỉ sau khi E03 hoàn tất mới mở đường vào G. Việc đi sâu hơn không bắt buộc vào F, chịu áp tier II hoặc có cả ba stage Quy. Tuyến chính dùng Quy I và những năng lực được bảo đảm, được biên soạn trước điều kiện chặn; không yêu cầu loài tùy chọn hoặc ngưỡng chưa duyệt.

## Bàn giao 16 tài liệu

- [Sổ sáu nhiệm vụ](CHAPTER1_MAIN_QUEST_REGISTER.md), [sáu hồi](CHAPTER1_MAIN_QUEST_ACTS.md), [đồ thị phụ thuộc](CHAPTER1_QUEST_DEPENDENCY_GRAPH.md), [ma trận nhiệm vụ–vùng](CHAPTER1_QUEST_ZONE_MATRIX.md).
- [Hợp đồng mục tiêu](CHAPTER1_QUEST_OBJECTIVES.md), [thoại](CHAPTER1_QUEST_DIALOGUE.md), [phân bố ký ức](CHAPTER1_MEMORY_DISTRIBUTION.md).
- [Trạng thái thế giới/phần thưởng](CHAPTER1_QUEST_WORLD_STATES.md), [bàn giao boss](CHAPTER1_QUEST_BOSS_HANDOFF.md), [nhịp trải nghiệm/hướng dẫn](CHAPTER1_QUEST_PACING.md), [lát cắt đầu tiên](CHAPTER1_FIRST_QUEST_SLICE.md).
- [đặc tả 12 thực thể dữ liệu](../technical/CHAPTER1_QUEST_DATA_SPEC.md), [40 ca QA tương lai](../technical/CHAPTER1_QUEST_TEST_CASES.md), [sổ quyết định](TASK21_DECISIONS.md), [kiểm tra cục bộ](TASK21_CONSISTENCY_AUDIT.md).

Task17 giữ nguyên định danh và trình tự mở đầu; Task18 cung cấp năng lực sinh vật; Task19 cung cấp graph/zone/connector; Task20 cung cấp phạm vi và trạng thái sinh thái. Hoàn thành thiết kế không có nghĩa runtime đã tồn tại. Bộ chiêu boss giao Task23; dàn dựng kết chương và chuyển sang Chương II giao Task24; Task22 cần đề bài riêng. Không tự bắt đầu các task đó hoặc sửa gameplay/dữ liệu/asset/save.
