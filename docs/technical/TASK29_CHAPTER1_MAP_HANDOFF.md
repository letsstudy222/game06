# Bàn giao map cho Chapter I

Nguồn duy nhất về connectivity: [CHAPTER1_WORLD_GRAPH](../chapter1/CHAPTER1_WORLD_GRAPH.md), trạng thái **PROPOSED H19-P03**; [zone designs](../chapter1/CHAPTER1_ZONE_DESIGNS.md) mô tả vùng, không tạo graph khác. Task 29 không nâng graph hoặc tên vùng thành CONFIRMED.

| zoneId có thật | Tên vùng đề xuất | Map/scene/anchor runtime |
| --- | --- | --- |
| hy_zone_sanctuary | Buồng Thức Mai Cổ | Chưa gán |
| hy_zone_reef | Rạn Ánh Dịu | Chưa gán |
| hy_zone_channels | Khe Dẫn Lưu | Chưa gán |
| hy_zone_habitat | Vườn Tảo Né Dòng | Chưa gán |
| hy_zone_ruins | Phế Tích Hồi Văn | Chưa gán |
| hy_zone_trench | Rãnh Áp Sâu | Chưa gán |
| hy_zone_core | Nút Hồi Lưu | Chưa gán |
| hy_zone_boss | Thềm Giữ Nước | Chưa gán |
| hy_zone_exit | Lối Nước Ra Bờ | Chưa gán |

Quan hệ tương lai: chapter → design region → zone theo Task 19; zone có thể ánh xạ một phần map hoặc nhiều map nhỏ khi production chốt. MapId/sceneId là identity kỹ thuật riêng; connectorId giữ identity Task 19 và trỏ destination map/anchor khi đã được author/validate. Không bắt chín zone thành chín map lớn hoặc dùng fixture ID làm vùng canon.

Ví dụ reference có thật `hy_conn_ab` nối sanctuary↔reef; destination spawnAnchorId hiện chưa gán, không tạo tên production giả. Production connector phải kiểm endpoint/map/anchor tồn tại, spawn clearance, gate predicate từ quest/world owner và return path. Chưa có connector runtime, scene transition hay Chapter II travel ở Task 29.

Rạn nông dùng foreground/coral, kênh sâu dùng composition/current cues, phế tích dùng overlap/shadow, rãnh áp dùng styling hoặc explicit transition, lõi thủy văn dùng cấu trúc/layer và state projection. Đây là hướng áp dụng contract, không physics Z, map mới hoặc approval art cụ thể.

Các dependency: Task 30 semantic input; Tasks 33–40 approved art/tileset/anchor/cue; Task 41 scene integration; 42 controller; 43 force policy; 44 camera; 45 footprint/clearance; 46 interaction; 47 transitions. Dimensions/clearance, current strengths và art còn UNRESOLVED. S0 trước S1, Dawn default và main route không phụ thuộc optional collection được bảo toàn. Không tạo ledger/save hoặc grant capability từ map.
