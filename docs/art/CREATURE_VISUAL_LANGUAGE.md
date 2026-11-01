# Ngôn ngữ tạo hình Tứ Linh và tiến hóa

Nguồn: [Art Bible, AB33-S01–S04/S14](ART_BIBLE_MASTER.md), [rubric tiến hóa](../evolution/EVOLUTION_VISUAL_GUIDELINES.md). **CONFIRMED** là bản sắc trong bảng; các mô tả sản xuất tiếp theo là **PROPOSED AB33-P02**, không phê duyệt hình thể hoặc tên stage mới. **UNRESOLVED:** bản vẽ cuối và mapping production của từng giai đoạn. **SUPERSEDED:** giữ lịch sử tại sổ quyết định nguồn, không tự thay nhãn ở đây.

## Nhận diện ở kích thước chơi

| Linh thú | Ràng buộc CONFIRMED | Giải pháp tạo hình PROPOSED | Tránh |
| --- | --- | --- | --- |
| Quy Hải Uyên | Sacred Thủy, rùa biển cổ, cơ thể đầu tiên, ba giai đoạn | Khối mai làm trọng tâm, đầu/vây tách khỏi viền, vận động có lực hãm và hướng dòng | Rắn quấn mai mặc định, giáp Kim, boss giáp xác cùng silhouette, thần thái hung dữ bắt buộc |
| Phượng Hoàng Nhật Diệm | Hỏa; chim phượng; giữ ảnh/atlas hiện hữu, ngà–vàng/cam–đỏ | Lông theo cụm cánh/đuôi, mặt ngà làm điểm neo, nhịp vỗ và co cánh có trọng lượng | Đổi màu toàn sprite, gán atlas hiện tại là stage III, tái sinh thành bất tử gameplay |
| Long Thiên Phong | Phong; thân dài S, đầu/sừng/móng/bờm/đuôi rõ, xuyên mây | Khoảng âm dọc thân và mây rời giúp nối anatomy bằng mắt; ngực làm điểm neo | Long hệ Lôi, giun/ống ngắn, mây che chỗ thiếu chân, bay 3D tự do |
| Ly Vạn Sinh | Mộc; Sinh Mệnh riêng; hộ vệ thần thoại, gạc phân nhánh, ngà/ngọc/vàng | Khối vai–thân có sức nặng, gạc/rễ tạo mạng có trật tự, khoảng âm quanh mặt | Hươu thường thêm lá, hệ Thổ/Kim, dấu cộng chữa máu thay toàn quyền năng Sinh Mệnh |

Giải phẫu chi tiết ở hồ sơ gốc vẫn theo nhãn tại nguồn. Họ màu đã duyệt không đồng nghĩa mã HEX, tỷ lệ phân bổ hoặc vật liệu mọi bộ phận đã khóa. Phượng hiện hữu là ngoại lệ tương thích được bảo tồn, không làm mẫu ép mọi loài vào cell96.

## Ba giai đoạn — ma trận phát triển PROPOSED

Ba giai đoạn lớn là **CONFIRMED**; các cách diễn đạt sau kế thừa đề xuất hồ sơ, không thêm catalog/stageId.

| Loài | I — thức tỉnh | II — trưởng thành | III — nguyên sơ |
| --- | --- | --- | --- |
| Quy | Mai gọn, đầu và bốn chi đọc được; nhịp bơi/hãm rõ, ít hoa văn | Phiến mai và rãnh dẫn nước có cấu trúc hơn; vai/vây chịu lực, đổi hướng có khoảng chuẩn bị | Tầng mai và đường vào–ra có tổ chức; nhịp điều tiết trầm, không phóng lớn đồng đều hoặc che mặt bằng hào quang |
| Phượng | Thân chim gọn, lông chủ đạo và mào giữ nhận diện reference | Vai/cánh trưởng thành, phân lớp lông sơ cấp và tư thế hạ đáp rõ | Sải cánh và dải đuôi có tầng/khoảng âm; trọng lượng hành động đổi, không sao chép atlas rồi resize |
| Long | Vẫn rồng dài từ đầu, đường S nhẹ, vị trí móng rõ | Ngực/cổ/bờm phát triển khác nhau, chuỗi hãm–uốn có nhịp | Nhịp thân nhiều đoạn qua mây, sừng/bờm hoàn chỉnh, cần kiểm clearance tương lai trước export |
| Ly | Mầm gạc rõ, thân hộ vệ gọn, điểm nhấn sống vừa đủ | Gạc phân nhánh có hướng, vai/chi chịu lực và mô-típ mạng tăng trưởng | Tán gạc/mạng sống nhiều tầng nhưng còn khoảng âm; dáng gìn giữ, không thêm trang sức vô hạn |

Mỗi bản so giai đoạn phải có cùng thước world-unit, tư thế trung tính và ví dụ vận động. Chấm riêng tỷ lệ đầu/thân, khớp chi, mặt vật liệu, dấu cổ, cơ quan nguyên tố, nhịp animation và tác động môi trường. Tăng chi tiết không đồng nghĩa tăng rarity; trang sức không tự tạo kỹ năng hoặc secondary element. Các ID như quy_s1 tại hồ sơ nguồn vẫn PROPOSED; không đăng ký asset/form/stage mới trong Task33.

## Đặc tính sinh vật và quyền năng

**PROPOSED:** Quy ít chuyển động thừa, Phượng thay đổi thế cánh nhanh nhưng còn hồi thế, Long tạo đường dẫn mắt theo thân, Ly phản ứng qua đầu/gạc/nhánh chứ không nhấp nháy toàn thân. Thực hiện silhouette không màu, sau đó grayscale rồi palette. Mọi loài phải nhận ra khi tắt FX; màu, đuôi sáng hoặc mây không được sửa anatomy thiếu.

Nền bản địa/ngoại lai không quyết định thiện ác. Một cá thể thích nghi ổn định có thể bình thản và cân đối; đồng hóa cưỡng bức chỉ biểu đạt lệch nhịp/căng thẳng theo nội dung được duyệt, không đổi mọi cơ thể sang tím/đen. Không vẽ trọn nguồn gốc Tinh Linh hay đại biến cố trên mai/gạc như sự thật được xác nhận.

## Sinh vật Chương I và giới hạn scope

[Species register](../chapter1/CHAPTER1_SPECIES_REGISTER.md) giữ thẩm quyền. Sứa Ngọc Biển Sao, Cá Chép Nguyệt Châu, Hải Quỷ Bông Xanh, Cá Đuối Lưu Quang, Ốc Đá San Hô và Cá Ngựa Thủy Ảnh tiếp tục là **EXTERNAL CONCEPT REFERENCE — NOT VERIFIED IN REPOSITORY**, không có sprite được duyệt chỉ vì có tên trong tài liệu.

**PROPOSED:** sứa mỏng/lều tua tách hải quỷ khối dày; chép thân thoi/đuôi quạt khác đuối mặt ngang/cánh vây; ốc xoắn nhỏ bám nền khác mai Quy lớn và chi bơi. Đây là tiêu chí phân biệt để review concept, không tự phê duyệt sáu anatomy hoặc thêm loài playable. S0 không cần toàn bộ roster, boss hoặc stage II/III.

## Điều kiện mở sản xuất

Cần duyệt silhouette/anatomy, tỷ lệ gameplay, palette, hướng bắt buộc, animation scope và quyền dùng nguồn; sau đó theo [workflow](ASSET_PRODUCTION_WORKFLOW.md). Long cần prototype envelope/đoạn thân trước giải pháp chia sprite, không giả engine có rig. Mọi thay đổi style của Phượng phải là quyết định tích hợp riêng; Task33 không sửa ảnh hiện tại.
