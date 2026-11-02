# Nhiệm vụ phụ Hải Uyên — tò mò có giá trị

**PROPOSED S22-P01–P10**, trừ canon được dẫn rõ. Nhiệm vụ phụ tạo hiểu biết sinh thái, điểm nhìn, đường đi và quan hệ; tránh chỉ tiêu giết, thu gom lặp, cày tài nguyên hoặc thưởng mạnh đến mức bắt buộc. Main `mq_01–06` giữ S05/Q21 và graph H19, không phụ thuộc việc hoàn thành, nhận thưởng hoặc bắt sinh vật từ nhiệm vụ phụ. D29/D41, Quy đầu tiên và nguyên tắc ngoại lai không mặc định xấu giữ **CONFIRMED**; artwork/loài/boss/HP/hiện thân/chính sách save còn **PROPOSED/UNRESOLVED**; bản ghi lịch sử **SUPERSEDED** không đổi.

Nguồn: [hợp đồng tùy chọn S05](../story/QUEST_DESIGN_OUTLINE.md), [graph chính Q21](CHAPTER1_QUEST_DEPENDENCY_GRAPH.md), [world graph H19](CHAPTER1_WORLD_GRAPH.md), [sinh thái E20](CHAPTER1_ECOLOGY_OVERVIEW.md), [quy tắc nhiệm vụ W07](../world/QUEST_WORLD_STATE_RULES.md). Task22 mở rộng định nghĩa và bên đọc của cùng kiến trúc nhiệm vụ, không tạo engine nhiệm vụ phụ, world graph hoặc reward ledger riêng.

## Các phạm vi khác nhau

| Loại | Ý nghĩa / nguồn | Không suy |
| --- | --- | --- |
| Nhiệm vụ hoàn toàn tùy chọn | Có nguồn/kích hoạt/chuỗi mục tiêu/hoàn thành lần đầu riêng; tuyến chính không đọc kết quả này làm điều kiện tiên quyết | Không cung cấp chỉ số/kỹ năng/tuyến duy nhất bắt buộc để thắng boss |
| Mục tiêu tùy chọn trong tuyến chính | B09 phát lại, thoại/lore tùy chọn trong nhiệm vụ nguồn Task17/Q21 | Không nhân bản thành nhiệm vụ thưởng riêng chỉ để trả lại cùng bằng chứng |
| Nhiệm vụ phụ mở theo tuyến chính | opt_01 sau E02, opt_02 sau E03; nội dung mới có điều kiện tiên quyết nêu rõ | Cạnh main→side một chiều; nhiệm vụ phụ không mở tuyến chính |
| Nhiệm vụ phụ chịu tác động phục hồi | Mục tiêu/trình bày đổi theo E05 nhưng nguồn logic/claim giữ nguyên | Không đặt lại môi trường để tái diễn hỏng hoặc tạo phiên bản thưởng mới |
| Hoạt động sinh thái lặp lại | Luyện/quan sát lại nhận phản hồi; thưởng lặp chỉ khi có chính sách occurrence được duyệt | Không tạo EXP/mastery từ mỗi đầu vào, lần đổi dòng hoặc thực thể mới sinh |
| Khám phá một lần | Tri thức/ký ức/nguồn được khảo cứu có định danh ổn định | Phát lại trình bày không tính hoàn thành lần đầu lần nữa |

## Taxonomy thực dụng

| Nhóm | Giá trị truyện / gameplay | Năng lực | Phần thưởng / lặp lại | Sản xuất / khả năng tiếp cận |
| --- | --- | --- | --- | --- |
| Hỗ trợ sinh thái | Giữ một nơi sống: đọc nguồn→chỉnh bộ tiếp nhận→kiểm lại | Quy I tương tác ngữ cảnh/đọc dòng, nguồn/tuyến khả thi | Tri thức/cải thiện cục bộ lần đầu; phát lại phản hồi | Tái sử dụng bộ dòng yếu/nền bám; dấu nét/chữ/tư thế, không chỉ âm |
| Khám phá | Mốc cảnh quan/ngõ có đường về giúp thấy ý nghĩa mới của không gian hiện hữu | I hoặc tier muộn được chỉ định; không yêu cầu năng lực chính chưa có | Manh mối tuyến/tiện ích cục bộ, khám phá độc nhất | Tái sử dụng phòng/bộ đá, không thêm vùng lớn; mốc thấy được trên màn nhỏ |
| Di tích/ký ức | Góc nhìn cổ không trọn: khảo cứu dấu→tiếp xúc nguồn | Quy I thao tác cơ cấu tại E, tiếp cận sau E03 | Ký ức tùy chọn một lần; phát lại/nguồn lưu trữ | Cần mảnh ký ức/nguồn/provenance được duyệt; bản ngắn/skip/caption |
| Cộng hưởng/tri thức | Phân biệt hành vi/điều kiện hợp lệ/nguồn/mở khóa | Quan sát/ngữ cảnh; tuyến mở dạng chơi được chỉ khi đã duyệt | Tri thức dự phòng; không hứa dạng chưa duyệt | Thiếu tham chiếu/controller phải ghi gate; không mọi loài có nghi thức bắt |
| Di chuyển/môi trường | Đọc làn/hãm/quay lại, áp dụng công cụ đã học | Thử thách I nền tảng; F nâng cao chỉ dành mở rộng | Cơ hội mastery theo P15 nếu được biên soạn; không nâng cấp bắt buộc | Tái sử dụng dòng/bộ tiếp nhận; không bắt chính xác từng frame, timer hoặc engine vật lý mới |
| Chiến đấu/phòng thủ tùy chọn | Giữ nơi trú/lãnh thổ có lý do; kết quả không giết nếu được cho phép | Đòn cơ bản/short brace C14 sau bài học, profile thực thể đã duyệt | Kết quả nguồn/nghiên cứu; loot/EXP chỉ theo manifest đã duyệt | Phạm vi về sau; báo trước/rút lui/an toàn khi khóa điều khiển; không mọi loài thù địch hoặc ép giết |

## Phạm vi được khuyến nghị, chưa duyệt số lượng

Bốn nhiệm vụ chính trong portfolio được đặc tả đầy đủ, bốn hoạt động nhẹ và hai ứng viên mở rộng. Một nhiệm vụ mới ở B là FIRST PLAYABLE CANDIDATE; bản thử không cần toàn portfolio hoặc đủ sáu sinh vật được sản xuất. Tái sử dụng opt_01/02; không kéo opt_03 từ E08 về đầu Chương I. Tổng phạm vi là đề xuất kế hoạch, không phải chỉ tiêu canon hoặc cam kết phát hành. Chỉ tài liệu gameplay; không triển khai mã/dữ liệu/map/art/UI/save hoặc tự bắt đầu Task23.

## Chỉ mục 17 tài liệu bàn giao

- [Sổ đăng ký](CHAPTER1_SIDE_QUEST_REGISTER.md), [bốn thiết kế](CHAPTER1_SIDE_QUEST_DESIGNS.md), [sinh thái](CHAPTER1_ECOLOGICAL_SIDE_QUESTS.md), [khám phá](CHAPTER1_EXPLORATION_SIDE_QUESTS.md).
- [Ký ức](CHAPTER1_MEMORY_SIDE_QUESTS.md), [cộng hưởng](CHAPTER1_RESONANCE_SIDE_QUESTS.md), [thoại](CHAPTER1_SIDE_QUEST_DIALOGUE.md).
- [Ma trận vùng](CHAPTER1_SIDE_QUEST_ZONE_MATRIX.md), [ma trận hệ thống](CHAPTER1_SIDE_QUEST_SYSTEM_MATRIX.md), [trạng thái thế giới/phần thưởng](CHAPTER1_SIDE_QUEST_WORLD_STATES.md), [tính khả dụng/vòng đời](CHAPTER1_SIDE_QUEST_AVAILABILITY.md).
- [Lát cắt nhiệm vụ phụ đầu tiên](CHAPTER1_FIRST_SIDE_QUEST_SLICE.md), [đặc tả 10 thực thể dữ liệu](../technical/CHAPTER1_SIDE_QUEST_DATA_SPEC.md), [40 ca QA tương lai](../technical/CHAPTER1_SIDE_QUEST_TEST_CASES.md), [quyết định](TASK22_DECISIONS.md), [kiểm tra](TASK22_CONSISTENCY_AUDIT.md).
