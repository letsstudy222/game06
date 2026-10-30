# Cast và xung đột tư tưởng

**PROPOSED S05-P07:** năm vai phụ, ID là khóa thiết kế, các tên Việt dưới đây là chức danh làm việc, chưa tên riêng/species/visual canon. Không giả có NPC art/AI/dialogue system trong game. Tinh Linh là chủ thể người chơi; Tứ Linh không có lời thoại độc lập chưa được resonance design xác nhận. Rarity/element không định đạo đức.

| Actor ID / chức danh | Chức năng và động cơ cá nhân | Quan hệ môi trường / conflict | Biết gì / hiểu sai gì | Thay đổi và khả năng tái xuất |
| --- | --- | --- | --- | --- |
| `npc_record_keeper` / Người Giữ Dấu | Guide sinh thái và ghi chép, muốn tri thức không lại mất | Sống gần rạn/ruins Hải Uyên, mở journal bằng trải nghiệm quan sát | Biết dấu dòng và cách đọc kiến trúc; tưởng một nguồn ghi chép phản ánh cả biến cố | Học đối chiếu nhiều nguồn. Có thể tái gặp ở Hải Uyên và gửi ghi chép qua công trình được mở; không teleport xuất hiện ở mọi đảo |
| `npc_tide_keeper` / Người Giữ Mạch Nước | Guardian lãnh thổ, muốn sanctuary/nơi trú không bị xói | Khóa nhánh cấp/hồi sau sự cố cục bộ; đối đầu I | Biết mở nhanh từng gây hại; nhầm mọi mở dòng đều đe dọa | Nhìn nhánh xả phụ chứng minh bảo tồn không đồng nghĩa đóng kín; neutral và giữ checkpoint/quan sát địa phương sau I |
| `npc_thermal_custodian` / Người Giữ Bờ Nhiệt | Sinh vật thông minh ảnh hưởng ngoại lai, bảo vệ nơi ở đã thích nghi | Habitat bazan/thermal Nhật Diệm; phản đối tái hoạt động thiếu giới hạn | Biết đất rừng cần nhiệt thấp và đường trú; tưởng phục hồi chỉ có nghĩa trở về trạng thái phun trào cũ | Có thể chấp nhận chu kỳ chọn lọc và theo dõi outlet. Dấu Fire–Metal là proposal, không khẳng định Kim canon/loài ác |
| `npc_wind_regulator` / Người Điều Phối Gió | Đại diện nhóm vận hành, muốn người khác không làm sập các tuyến | Khống chế nút áp Phong Vân, tạo xung đột III | Biết một số tải/đường khí, hiểu sai rằng an toàn đòi một quyền lực độc nhất và hi sinh tuyến xa | Bằng chứng nhiều lối hồi/đối đầu làm đổi vai sang giám sát có giới hạn; có thể gửi theo dõi thời tiết sau III |
| `npc_garden_advocate` / Người Bảo Hộ Sinh Cảnh | Bảo vệ sinh vật thích nghi không có tiếng nói trong kế hoạch phục hồi | Vạn Sinh, chống xóa habitat mới để khôi phục “vườn đúng” | Biết phụ thuộc sinh học hiện tại; nghĩ Tinh Linh nhất định muốn xóa chúng, không thấy bypass có thể cùng giữ | Thay đổi qua minh chứng mạng sống, không bị ép tuyên thệ; tái gặp trong follow-up điều chỉnh variant sau IV |

Giữ năm vai, không tách mỗi nhiệm vụ thành một NPC mới. Loài thường/hostile là encounter population, chưa thêm tên/nhân vật riêng. “Hiểu sai” không phủ nhận nhu cầu có thật của họ; nhân vật không chỉ tồn tại để thuyết giảng hoặc thưởng form khi thua.

## Hai lập trường, chưa faction canon

**PROPOSED:** `stance_restore_template` muốn dùng mẫu công trình xưa như chuẩn an toàn; `stance_protect_adaptation` ưu tiên nơi sống đã thích nghi. Đây là trục tư tưởng có thể xuất hiện ở nhiều cá thể bản địa/ngoại lai, không hai phe thiện/ác có quân đội mới. Regulator còn có động cơ kiểm soát phân phối, không đại diện tất cả loài Phong.

Nếu nhiệm vụ sau cần faction thực, phải phê duyệt tên/thành phần/lịch sử/provenance art riêng. Không xác nhận văn minh cổ là người, không định danh thủ phạm sâu nhất qua một đại diện hiện tại.

## Sản xuất thoại/cảnh — PROPOSED

Mỗi vai cần ít lời có mục đích: chỉ ra điều có thể tự kiểm chứng, một lý do phản đối, một phản hồi sau thay đổi. Dùng hành vi bảo vệ nơi trú và bố trí công trình để kể phần còn lại. Không cần lồng tiếng hoặc portrait mới để coi blueprint hoàn tất; những tài nguyên ấy Missing. Thoại cụ thể chưa được viết/duyệt. NPC biết theo địa phương và hồ sơ; không tự nhận đã sống hàng chục nghìn năm để kể toàn lịch sử.
