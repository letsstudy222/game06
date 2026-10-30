# Sổ quyết định dự án

Nguồn phê duyệt: yêu cầu Task 01/96 của người dùng, ngày 30/10/2026 (Asia/Saigon). Bằng chứng kỹ thuật tại commit `6b502c075a0649a2edcba1f2ba8956b5e599720c`. **CONFIRMED** có thể là thiết kế được chấp thuận hoặc sự kiện kỹ thuật đã kiểm tra; cột loại phân biệt hai điều này. Không được hiểu là tất cả đã hiện thực hóa.

- **CONFIRMED:** đã được người dùng xác nhận hoặc có bằng chứng trực tiếp trong repo.
- **PROPOSED:** hướng/giả thuyết ứng viên; không thành canon nếu chưa có quyết định.
- **UNRESOLVED:** chưa có câu trả lời hoặc còn lựa chọn cần chốt.

| ID | Trạng thái | Loại | Quyết định / bằng chứng |
| --- | --- | --- | --- |
| D01 | CONFIRMED | Thiết kế | Tên làm việc Tứ Linh Khởi Nguyên / Origins of the Four Sacred Spirits; action RPG 2D pixel art có cộng hưởng, hóa thân, khám phá và thời gian thực |
| D02 | CONFIRMED | Thiết kế | Người chơi là linh thể cổ xưa ban đầu vô hình; nhập/điều khiển dạng qua cộng hưởng với tinh hoa sống lưu giữ, ký ức tổ tiên và bản sắc sinh học |
| D03 | CONFIRMED | Thiết kế | Bắt đầu Chương I tại Vực Hải Uyên với Quy ngủ yên, thức tỉnh sau nhiễu động; không mở đầu bằng con người huấn luyện |
| D04 | CONFIRMED | Thiết kế | Thứ tự Quy–Thủy → Phượng–Hỏa → Long–Phong → Ly–Mộc; Sinh Mệnh là quyền năng nguyên sơ riêng của Ly, không cho hồi sinh vô hạn sinh vật chết hoàn toàn |
| D05 | CONFIRMED | Thiết kế | Bộ ba: một dạng điều khiển + hai dự bị trang bị; đổi giữa chúng trong khám phá/chiến đấu. Đổi thành viên qua bộ sưu tập ngoài encounter bị hạn chế |
| D06 | CONFIRMED | Thiết kế | Boss khóa thành phần bộ ba từ khi bắt đầu đến khi kết thúc; vẫn đổi giữa ba dạng, không trang bị sinh vật ngoài bộ |
| D07 | CONFIRMED | Thiết kế | Mỗi sinh vật có level/XP/skills/progression riêng; evolution khi phù hợp; khám phá/cộng hưởng/truyện là nguồn tiến trình cùng chiến đấu |
| D08 | CONFIRMED | Thiết kế | Vai trò tách khỏi rarity và đạo đức; dual-element cần giải thích sinh học/môi trường; không mọi sinh vật phải playable |
| D09 | CONFIRMED | Thiết kế | Thủy/Hỏa/Phong/Mộc là bốn hệ nguyên sơ liên thông; cổng đưa năng lượng/sinh vật ngoại lai vào gây xáo trộn; thích nghi tự nhiên khác đồng hóa cưỡng ép |
| D10 | CONFIRMED | Thiết kế | Không mặc định ngoại lai ác hoặc bản địa thiện; giữ bí ẩn nguồn gốc linh thể và sự thật biến cố qua Chương I |
| D11 | CONFIRMED | Phạm vi | Bốn chương là cung đầu; vertical slice sản xuất đầu tiên là phần nhỏ Chương I; du hành hành tinh khác thuộc expansion |
| D12 | CONFIRMED | Thiết kế | World changes có thể bền vững ở vùng chọn, quest có thể tiếp tục điều chỉnh; tránh choice bất ngờ khóa hoàn tất sưu tầm |
| D13 | CONFIRMED | Mục tiêu nền tảng | Browser, mobile browser và PC Windows cần được hỗ trợ về hướng kiến trúc; Windows chưa có bằng chứng đóng gói |
| D14 | CONFIRMED | Kỹ thuật hiện tại | HTML/CSS + JavaScript `.mjs`, Canvas 2D, không engine/framework ứng dụng ngoài; Node >=24, Playwright 1.62.1, build script static, Python HTTP để dev |
| D15 | CONFIRMED | Kỹ thuật hiện tại | Tilemap 32×32; `dawn` 40×28, `dawn-sample` 26×22; Phoenix atlas 192×288 gồm 6 pose 96px với hướng phải mirror |
| D16 | CONFIRMED | Bảo tồn | Giữ game/asset đã duyệt, input/HUD/settings và save settings hiện có; Task 01 chỉ documentation/assessment |
| D17 | PROPOSED | Giả thuyết truyện | Tứ Linh hy sinh hoặc phong ấn thể xác để kiềm chế biến cố và đóng cổng; sự thật và cơ chế chưa chốt |
| D18 | PROPOSED | Danh mục | Lôi và Kim là khái niệm nguyên tố ngoại lai sớm; chưa là toàn bộ roster được khóa |
| D19 | PROPOSED | Độ hiếm | Normal / Rare / Epic / Legend / Rainbow là bộ hạng ứng viên; nhãn Legend trong HUD hiện tại không chứng minh hệ rarity đã có |
| D20 | PROPOSED | Sản xuất | Tiêu chí slice Chương I trong PROJECT_SCOPE là gợi ý cắt nội dung để duyệt, chưa có số lượng/độ dài cam kết |
| D21 | UNRESOLVED | Truyện | Trứng hóa đá hay lõi sự sống; nguồn gốc linh thể; nguyên nhân chính xác và tính tự nguyện của phong ấn; bản chất cổng |
| D22 | UNRESOLVED | Kỹ thuật | Kiến trúc sản xuất dài hạn và đóng gói Windows; giữ browser runtime đang chạy, chỉ cân nhắc thay framework sau assessment riêng |
| D23 | UNRESOLVED | Gameplay | Evolution thresholds, XP/loadout resource rules, resonance conditions, boss end/reset/save rules, roster cuối |
| D24 | UNRESOLVED | Liên tục thế giới | Quan hệ Đảo Bình Minh hiện có với Đảo Nhật Diệm Chương II; không đổi map thành canon tự động |

## Bổ sung Task 02 — nguồn: yêu cầu người dùng Task 02/96

| ID | Trạng thái | Loại | Quyết định / quan hệ với bản trước |
| --- | --- | --- | --- |
| D25 | CONFIRMED | Tên vùng | Ly ở Tiên Cảnh Vạn Sinh; cụ thể hóa tên vùng chưa chốt ở Task 01, không đổi Mộc/Sinh Mệnh D04 |
| D26 | CONFIRMED | Kết cung | Bốn chương kết bằng tái kích hoạt Tinh Môn, không chỉ phát hiện; tên Tinh Môn tạm thời; du hành hành tinh khác vẫn ngoài scope D11 |
| D27 | CONFIRMED | Nhân vật | Linh thể nhận thức hạn chế, phát triển bản sắc qua trải nghiệm, tiếp cận ký ức tổ tiên; nguồn gốc/vai trò trước biến cố vẫn UNRESOLVED |

Cơ chế thế giới/biến cố/cộng hưởng mới L02-P01–P10 đều **PROPOSED**, đăng ký tại [audit lore](lore/LORE_CONSISTENCY_AUDIT.md). Không tự đóng D17/D18/D21/D23/D24. [Changelog](lore/LORE_CHANGELOG.md) lưu phạm vi cập nhật.

## Bổ sung Task 03 — nguồn: yêu cầu người dùng Task 03/96

| ID | Trạng thái | Loại | Quyết định / quan hệ với bản trước |
| --- | --- | --- | --- |
| D28 | CONFIRMED | Thuật ngữ | Dùng Tinh Linh / Linh Hạch / Linh Ấn / Cộng Hưởng / Ký Ức Tổ Tiên; định nghĩa vận hành và model hybrid chi tiết vẫn là đề xuất |
| D29 | CONFIRMED | Mở đầu | Mười nhịp nhiễu động → di tích đáp ứng → cảm Linh Hạch → tiếp cận → cảm giác → ký ức thiếu → cộng hưởng → cấu trúc hoạt động → Quy non trẻ thức → cơ thể đầu tiên; không giải đáp nguồn gốc Tinh Linh |
| D30 | CONFIRMED | Tiến hóa | Tứ Linh mỗi loài ba stage lớn; sinh vật phụ quan trọng có thể hai, wildlife/đặc thù có thể một. Ngưỡng level và thiết kế stage chưa chốt |

[R03-P01–P11](lore/RESONANCE_DECISION_RECORD.md) là các đặc tả **PROPOSED** về model, acquisition, bộ ba, boss, defeat, progression, data và edge cases. Không tự đóng D21/D23 hoặc chuyển các đề xuất Task 02 thành canon. Chưa có implementation của hệ này.

## Bổ sung Task 04 — nguồn: yêu cầu người dùng Task 04/96

| ID | Trạng thái | Loại | Quyết định / giới hạn |
| --- | --- | --- | --- |
| D31 | CONFIRMED | Bản sắc gameplay | Quy phòng ngự/kiểm soát vùng và dòng nước; Phượng Hỏa cơ động/AoE/thermal; Long controller/gió/áp; Ly hỗ trợ/hồi phục/control Mộc và mạng sống. Cả bốn có combat/exploration/env riêng, không Sacred invincibility hoặc loài sau thay vĩnh viễn loài trước |
| D32 | CONFIRMED | Hướng hình ảnh | Giữ Phoenix reference ngà/vàng-cam/crimson; Quy rùa nước cổ không mặc định rắn quấn; Long thân dài S rõ đầu/sừng/móng/bờm/đuôi xuyên mây, không worm/ngắn; Ly guardian gạc phân nhánh ngà/emerald/vàng, khác hươu thường. Đây là direction text được giao; ảnh Quy/Long/Ly chưa có trong checkout |
| D33 | CONFIRMED | Chất lượng stage | I Thức Tỉnh → II Trưởng Thành → III Thức Tỉnh Nguyên Sơ: anatomy, movement, combat/env thay đổi có ý nghĩa, không chỉ resize/recolor. Stage label không tự cấp named authority mới; riêng Ly vẫn Mộc combat và Sinh Mệnh authority |

[C04-P01–P13](creatures/TASK04_CONSISTENCY_AUDIT.md) là các đặc tả **PROPOSED**: English/stage names/IDs, anatomy chi tiết, chiêu, environmental receivers, synergy, art pipeline, data fields và edge cases. Không gán atlas Legend hiện tại là stage III, không chốt rarity/level thresholds/damage/cooldown/cost. Không nâng R03/L02 proposals thành CONFIRMED. Chỉ tài liệu, không gameplay/art mới.

## Bổ sung Task 05 — nguồn: yêu cầu người dùng Task 05/96

| ID | Trạng thái | Loại | Quyết định / giới hạn |
| --- | --- | --- | --- |
| D34 | CONFIRMED | Yêu cầu narrative | Mỗi chương có cảm xúc/conflict/awakening/revelation/local resolution riêng; mở hệ dần, ecological storytelling, meaningful combat, world response và quay lại/collection không bị khóa bất ngờ. Kết cung có giá trị địa phương trước expansion, origin Tinh Linh vẫn bí ẩn |
| D35 | CONFIRMED | Khung thức tỉnh | Theo yêu cầu Task 05: Long có dấu tổ tiên phân tán qua mạng khí, không thức từ một quả trứng khác; Ly phân tán trong mạng sinh học hỏng, không một trứng/nguồn năng lượng đơn đủ thức. Các cơ chế bảo tồn/đồng thuận/cấu trúc ý thức chi tiết của L02-P07 vẫn PROPOSED/UNRESOLVED |

[S05-P01–P16](story/TASK05_CONSISTENCY_AUDIT.md) giữ trạng thái **PROPOSED** cho plot/24 events/cast/boss/quest/world states/capabilities/persistence. S05-P02 khuyến nghị boss sớm khóa cả empty slots, khác full-three entry của R03-P06 chưa approved; không thay confirmed membership lock D06 hoặc tự thêm species optional làm main gate. Các scenario Fire–Metal/Wind–Lightning không tự khóa roster D18. Không có event gameplay/asset mới.

## Cách sửa quyết định

Mọi thay đổi ghi ID, trạng thái cũ/mới, lý do, nguồn phê duyệt và hệ/asset bị ảnh hưởng trong task tương ứng. Chuyển PROPOSED/UNRESOLVED sang CONFIRMED cần quyết định rõ, không chỉ sửa lời văn. Sự thật kỹ thuật mới phải có đường dẫn hoặc kết quả kiểm chứng. Các tài liệu audit lịch sử vẫn có giá trị theo mốc; không để chúng ghi đè hướng chính thức này.
