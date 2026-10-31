# Vực Hải Uyên — thế giới Chương I

**CONFIRMED:** Chương I thuộc Quy/Thủy, mở đầu qua cộng hưởng, thế giới ghi nhớ thay đổi và có thể quay lại. D29, D41, identity Quy và các quyết định cũ giữ nguyên. **PROPOSED H19-P01–P11:** toàn bộ topology, tên địa điểm con, ID map mới, pacing và solution spatial dưới đây. **UNRESOLVED:** production camera/depth, kích thước/envelope, vật mang, ability/input, encounter/retry, assets và save. Không tự duyệt bản đồ vì tài liệu mô tả đầy đủ.

Hải Uyên là một hệ nước có nơi cấp, đường hồi, nơi trú và nhiều sinh cảnh, không chuỗi phòng đánh nhau. Người chơi nhận ra mối quan hệ giữa dòng bị ngắt và sinh vật đổi chỗ; điều tra di tích giúp thử phương án bảo tồn rồi mở lưu thông. Ngoại lai Lôi/Kim không mặc định gây mọi tổn hại. Không origin reveal hoặc niên đại mới. Nguồn authority: [Chương I](../story/CHAPTER_01_QUY.md), [S05 events](../story/STORY_IMPLEMENTATION_HANDOFF.md), [W07 states](../world/CHAPTER_01_WORLD_STATES.md), [Task17](CHAPTER1_OPENING_OVERVIEW.md), [Task18 Quy](QUY_DESIGN_OVERVIEW.md).

## Triết lý không gian

Một tuyến chính có vòng quay về, các nhánh khám phá có nơi trú và dấu đường; landmarks thay coral giống nhau ở mọi phòng. Xen quan sát, bơi, cơ cấu và nơi dừng; encounter chỉ ở chỗ có ngữ cảnh/retreat. Rủi ro sâu nằm ở nhánh optional, không ép tiến hóa hay sưu tầm loài hiếm để đi chính. Main graph đi được bằng Quy Stage I và các guaranteed lesson/capabilities S05 được duyệt; việc skill I có sẵn thực tế vẫn cần unlock/implementation.

Khuyến nghị prototype x–y nhìn từ trên xuống vì runtime đã có camera/controller như vậy; không khẳng định production projection đã approve, không free 3D swimming. Zone graph tách khỏi tọa độ và tilemap, cho phép đổi adapter sau quyết định camera. Một zone chức năng không nhất thiết một scene lớn. [Hierarchy/camera](CHAPTER1_REGION_HIERARCHY.md) ghi đầy đủ alternatives và [graph](CHAPTER1_WORLD_GRAPH.md) là nguồn connectivity.

## Scope sản xuất

| Mức | Nội dung | Relative effort / dependency |
| --- | --- | --- |
| Minimum first playable | A sanctuary đầy đủ opening + phần gần B với một vòng khám phá, dòng yếu, một receiver cửa, safe return và demo persistent reload | Nhỏ nhất về content; vẫn cần Stage I geometry/current/input/art và W07 adapter/O17 memory receipt. Không cần boss hoặc F |
| Chapter I core | A–B–C–E–G–H–I, variation sinh thái, E01–E05 và boundary E06 | Lớn hơn rõ: quests/encounter/outcomes/graph/habitat/conditional layers, art families và boss handoff |
| Optional expansion | D mở vòng quan sát, F tuyến sâu, alcove II/III, shortcut/trial/memory phụ được author | Sau core coverage; cần roster approved, advanced capability/clearance và return path. Không block minimum slice |

D có thể là habitat pocket dùng chung streaming group B; C/E/G chia nhiều room trong cùng kit hydrology–ruins; H dùng transition/preparation room riêng logic, không cần mega-map; I dùng kit nước–đá đổi ánh sáng. F deferred. Không sản xuất đủ chín tilemap trước thử Quy I. Không có map/art/runtime/config/save thật trong Task19.

## Chỉ mục 19 deliverables

- [Hierarchy](CHAPTER1_REGION_HIERARCHY.md), [graph](CHAPTER1_WORLD_GRAPH.md), [zone profiles](CHAPTER1_ZONE_DESIGNS.md), [main route](CHAPTER1_MAIN_ROUTE.md).
- [Biomes](CHAPTER1_BIOMES.md), [currents/hazards](CHAPTER1_CURRENTS_AND_HAZARDS.md), [habitats](CHAPTER1_CREATURE_HABITATS.md), [ruins](CHAPTER1_ANCIENT_RUINS.md).
- [Puzzles](CHAPTER1_ENVIRONMENTAL_PUZZLES.md), [gates/shortcuts](CHAPTER1_GATES_AND_SHORTCUTS.md), [persistence](CHAPTER1_PERSISTENT_ENVIRONMENT.md).
- [Boss area](CHAPTER1_BOSS_AREA_HANDOFF.md), [exit/return](CHAPTER1_EXIT_AND_RETURN.md), [art](../art/CHAPTER1_WORLD_ART_HANDOFF.md).
- [Data](../technical/CHAPTER1_MAP_DATA_SPEC.md), [35 ca QA tương lai](../technical/CHAPTER1_MAP_TEST_CASES.md), [decisions](TASK19_DECISIONS.md), [audit](TASK19_CONSISTENCY_AUDIT.md).
