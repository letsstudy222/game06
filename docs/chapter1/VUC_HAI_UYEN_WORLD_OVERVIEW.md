# Vực Hải Uyên — thế giới Chương I

**CONFIRMED:** Chương I thuộc Quy/Thủy, mở đầu qua cộng hưởng, thế giới ghi nhớ thay đổi và có thể quay lại. D29, D41, bản sắc Quy và các quyết định cũ giữ nguyên. **PROPOSED H19-P01–P11:** toàn bộ cấu trúc kết nối, tên địa điểm con, ID map mới, nhịp trải nghiệm và giải pháp không gian dưới đây. **UNRESOLVED:** camera/độ sâu dùng trong sản xuất, kích thước/bao hình, vật mang, năng lực/đầu vào, encounter/thử lại, asset và save. Không tự duyệt bản đồ chỉ vì tài liệu mô tả đầy đủ.

Hải Uyên là một hệ nước có nơi cấp, đường hồi, nơi trú và nhiều sinh cảnh, không phải chuỗi phòng đánh nhau. Người chơi nhận ra mối quan hệ giữa dòng bị ngắt và sinh vật đổi chỗ; điều tra di tích giúp thử phương án bảo tồn rồi mở lưu thông. Lôi/Kim ngoại lai không mặc định gây mọi tổn hại. Không tiết lộ nguồn gốc hoặc đặt niên đại mới. Nguồn có thẩm quyền: [Chương I](../story/CHAPTER_01_QUY.md), [sự kiện S05](../story/STORY_IMPLEMENTATION_HANDOFF.md), [trạng thái W07](../world/CHAPTER_01_WORLD_STATES.md), [Task17](CHAPTER1_OPENING_OVERVIEW.md), [Quy Task18](QUY_DESIGN_OVERVIEW.md).

## Triết lý không gian

Một tuyến chính có vòng quay về; các nhánh khám phá có nơi trú và dấu đường. Mốc cảnh quan giúp tránh cảm giác mọi phòng đều dùng cùng loại san hô. Xen quan sát, bơi, cơ cấu và nơi dừng; encounter chỉ đặt tại nơi có ngữ cảnh và đường rút. Rủi ro ở vùng sâu nằm trên nhánh tùy chọn, không ép tiến hóa hoặc sưu tầm loài hiếm để đi tuyến chính. Graph chính đi được bằng Quy Stage I và các bài học/năng lực S05 được bảo đảm, được duyệt; kỹ năng I thực sự khả dụng vẫn cần được mở khóa và triển khai.

Khuyến nghị bản thử x–y nhìn từ trên xuống vì runtime đã có camera/controller tương ứng; không khẳng định phép chiếu dùng trong sản xuất đã được duyệt và không yêu cầu bơi tự do 3D. Graph vùng tách khỏi tọa độ và tilemap, cho phép thay adapter sau quyết định camera. Một vùng chức năng không nhất thiết là một scene lớn. [Phân cấp/camera](CHAPTER1_REGION_HIERARCHY.md) ghi đầy đủ phương án; [đồ thị](CHAPTER1_WORLD_GRAPH.md) sở hữu kết nối.

## Phạm vi sản xuất

| Mức | Nội dung | Độ phức tạp tương đối / phụ thuộc |
| --- | --- | --- |
| Bản chơi thử đầu tiên tối thiểu | A có đầy đủ mở đầu + phần gần B với một vòng khám phá, dòng yếu, một bộ tiếp nhận cửa, đường về an toàn và demo lưu/tải bền vững | Ít nội dung nhất; vẫn cần hình học/dòng chảy/đầu vào/art Stage I và adapter W07/receipt ký ức O17. Không cần boss hoặc F |
| Chương I cốt lõi | A–B–C–E–G–H–I, biến thể sinh thái, E01–E05 và chuyển tiếp E06 | Lớn hơn rõ: nhiệm vụ/encounter/kết quả/graph/sinh cảnh/lớp điều kiện, các nhóm art và bàn giao boss |
| Mở rộng tùy chọn | D mở vòng quan sát, F tuyến sâu, hốc II/III, lối tắt/thử thách/ký ức phụ được biên soạn | Sau khi nội dung cốt lõi đủ độ bao phủ; cần roster được duyệt, năng lực nâng cao/khoảng trống và đường về. Không chặn lát cắt tối thiểu |

D có thể là túi sinh cảnh dùng chung nhóm tải cảnh với B; C/E/G chia thành nhiều phòng trong cùng bộ thủy văn–di tích. H có phòng chuyển tiếp/chuẩn bị riêng về logic, không cần bản đồ khổng lồ; I dùng bộ nước–đá với ánh sáng chuyển dần. F được hoãn. Không sản xuất đủ chín tilemap trước khi thử Quy I. Task19 không tạo map/art/runtime/config/save thực.

## Chỉ mục 19 tài liệu bàn giao

- [Phân cấp](CHAPTER1_REGION_HIERARCHY.md), [đồ thị](CHAPTER1_WORLD_GRAPH.md), [hồ sơ vùng](CHAPTER1_ZONE_DESIGNS.md), [tuyến chính](CHAPTER1_MAIN_ROUTE.md).
- [Sinh cảnh](CHAPTER1_BIOMES.md), [dòng chảy/nguy hiểm](CHAPTER1_CURRENTS_AND_HAZARDS.md), [sinh cảnh](CHAPTER1_CREATURE_HABITATS.md), [di tích](CHAPTER1_ANCIENT_RUINS.md).
- [Câu đố](CHAPTER1_ENVIRONMENTAL_PUZZLES.md), [điều kiện chặn/lối tắt](CHAPTER1_GATES_AND_SHORTCUTS.md), [lưu bền vững](CHAPTER1_PERSISTENT_ENVIRONMENT.md).
- [Khu boss](CHAPTER1_BOSS_AREA_HANDOFF.md), [lối ra/đường về](CHAPTER1_EXIT_AND_RETURN.md), [art](../art/CHAPTER1_WORLD_ART_HANDOFF.md).
- [Dữ liệu](../technical/CHAPTER1_MAP_DATA_SPEC.md), [35 ca QA tương lai](../technical/CHAPTER1_MAP_TEST_CASES.md), [quyết định](TASK19_DECISIONS.md), [kiểm tra](TASK19_CONSISTENCY_AUDIT.md).
