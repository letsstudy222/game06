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

## Task 06 — antagonist design source, PROPOSED F06-P11

Đây là phần mở rộng authority cho deliverable `ANTAGONIST_DESIGN.md`; không tạo file mới trùng nội dung. Năm vai Task05 giữ nguyên, không gán affiliation/leader canon. [Faction profiles](../factions/FACTION_PROFILES.md) chỉ đề xuất các lập trường tương thích, không quyết định membership. Không một tổ chức mới nào được xác nhận sống nguyên vẹn hàng vạn năm.

| Chiều antagonist | Người Giữ Mạch Nước | Người Giữ Bờ Nhiệt | Người Điều Phối Gió | Người Bảo Hộ Sinh Cảnh |
| --- | --- | --- | --- | --- |
| Desired outcome | Nơi trú quanh sanctuary không bị cuốn | Habitat trên bazan nguội còn sống khi nhiệt trở lại | Hệ khí không quá tải dưới quyền kiểm soát họ tin có thể chịu trách nhiệm | Sinh vật thích nghi không bị xóa để phục dựng mẫu cổ |
| Motivation | Trách nhiệm lãnh thổ và sợ lặp xói | Bảo vệ cộng đồng/nguồn sống đang có, không chống mọi renewal | Trách nhiệm pha với nhu cầu sở hữu quyền phân phối | Bảo vệ những đối tác không được coi trọng trong kế hoạch phục hồi |
| Historical background | Kinh nghiệm sự cố địa phương, không mặc định nhân chứng biến cố cổ | Thấy habitat hình thành và sống được khi đảo nguội, không biết toàn lịch sử Phượng | Từng giữ tuyến khỏi sự cố rồi khái quát một cách làm thành độc quyền | Biết hậu quả phục hồi sai điều kiện, không chứng minh Ly phải giữ mọi thứ như hiện tại |
| Resources / abilities narrative | Khóa/đường vào cụm nước, hiểu warning và refuge; chưa chốt anatomy/chiêu | Thông tin outlet/nhu cầu habitat, khả năng ngăn thao tác; không authority Hỏa mới | Quyền vận hành vài node/route và người chia sẻ mục tiêu chưa có named leaders | Tri thức đối tác sống/route rễ và quyền phản đối can thiệp, không Life như Ly |
| Ecosystem relation | Bảo vệ cục bộ nhưng làm hạ lưu thiếu hồi | Giữ nơi sống thích nghi nhưng việc cắt nhiệt triệt để gây lệch vùng khác | Giữ một số đường an toàn, chuyển rủi ro xuống tuyến không có tiếng nói | Bảo vệ cái mới có giá trị, nhưng ngăn mọi nối lại sẽ giữ mạng đứt |
| Vì sao người chơi phản đối | Khóa toàn hồi lưu hại rạn khác dù có phương án xả phụ | Không cho thử vận hành đã có giới hạn khiến nguồn và route chưa hồi phục | Từ giám sát chuyển thành sở hữu mọi quyền tiếp cận | Bác mọi giải pháp trước khi xem evidence bypass cùng tồn tại |
| Belief về biến cố | Đọc mất mát như hậu quả mở dòng quá nhanh | Đọc núi ngủ như bằng chứng mọi tái khởi động đều hại | Đọc khủng hoảng như bài học thiếu người kiểm soát duy nhất | Đọc ký ức cổ như lời biện minh cho xóa thích nghi mới |
| Điều dễ đồng cảm | Rủi ro refuge bị mất là thật | Sinh vật không tự chọn bị chuyển nhiệt là thật | Người vận hành có trách nhiệm và dữ liệu không đầy đủ là thật | Phục hồi nguyên trạng có thể gây hại cư dân hiện tại là thật |
| Phương pháp gây hại | Không cho kiểm chứng và khóa đường về của vùng khác | Từ chối cả đường xả không xóa habitat | Giấu/giữ node, không chia sẻ safety knowledge và quyền tiếp cận | Từ chối bằng chứng về quan hệ khả thi hoặc làm gián đoạn thao tác an toàn |
| Điều kiện kết thúc conflict | Có bypass/hồi lưu kiểm chứng giữ refuge, không phải giết keeper | Có chu kỳ cấp/xả bảo vệ nơi trú, custodian thành người theo dõi | Có mạng hồi áp/giới hạn trách nhiệm và access được xác minh, không cần xóa tổ chức | Có proof sống được cho habitat cũ/mới, follow-up điều chỉnh lại, không defeat một mình là đủ |

Beliefs ở bảng là diễn giải giới hạn, không CONFIRMED về thủ phạm/tự nguyện cổ đại. Không phe nào sở hữu sự thật Tinh Linh. Nhân vật có thể hiểu thêm nhưng không cần “gia nhập phe người chơi” để neutral.

### Phân biệt vai trò, không ép moral arc lên mọi encounter

Mindless hazard là nguồn/nguy cơ không ý chí; territorial animal có động cơ sinh tồn chứ không bài diễn văn; intelligent antagonist có mục tiêu/kiến thức/hạn chế; faction leader là vai trò tổ chức cần duyệt riêng, không mặc định bốn NPC trên; boss là scope encounter/narrative climax, không taxonomy/mức rarity. Các loại có thể liên quan nhưng không đồng nhất.

Predator săn tự nhiên có thể chỉ cần đọc dấu/thoát hoặc combat, không bắt một choice đạo đức. Một scout hostile có thể chỉ thực hiện nhiệm vụ địa phương, không dấu tổ chức toàn ác. Chỉ các encounter lớn được chọn có chứng cứ/thương lượng/bypass đủ thiết kế mới nhận alternative; không tạo branching thoại cho mọi wildlife.
