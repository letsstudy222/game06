# Quy tắc Cộng Hưởng

**CONFIRMED:** mở đầu Quy; thu nhận qua khám phá/cộng hưởng/truyện, không buộc mọi loài playable. **PROPOSED R03-P03/P04:** toàn bộ điều kiện/trạng thái/loại thu nhận cụ thể ở đây. Các chỉ số chưa định lượng, nhưng đường thành công/thất bại rõ để không cần lập trình viên tự bịa luật.

## Điều kiện và kết quả

Nguồn/vật mang hợp lệ → hiểu biết hoặc story exception được khai báo → tương hợp → ổn định môi trường → đồng bộ → commit bản ghi một lần. `playable=true` là quyền của catalog nội dung, không suy từ rarity, boss hay có ký ức. Phát hiện, đăng ký bộ sưu tập, mở dạng và mở ký ức là các kết quả khác nhau.

Nguồn irrecoverable, thiếu tương hợp/điều kiện, vật mang chưa ổn định hoặc event bị ngắt: không grant dạng, không tiêu hủy cá thể/hạch, giữ discovery/observation đã đạt; nêu lý do và cho retry khi điều kiện thay đổi. Không reset về UNKNOWN sau một lần thất bại. Đã có Linh Ấn hoàn chỉnh vẫn cần điều kiện hiện thân tại chỗ; xem giới hạn môi trường.

## Trạng thái — PROPOSED

Không dùng một enum thẳng cho tất cả, vì ký ức có thể mở trước dạng và wildlife không thể đạt RESONATED. Tách discovery, resonance, memory, mastery; các tên sau là nhãn hiển thị/sự kiện, không buộc một chuỗi tuyến tính.

| Nhãn | Điều kiện / bắt buộc | Chuyển hợp lệ |
| --- | --- | --- |
| UNKNOWN | Chưa có species record; chỉ với loài chưa gặp | Gặp nguồn hợp lệ → DISCOVERED |
| DISCOVERED | Nhìn/gặp đủ nhận diện, ghi một lần theo species | Hiểu hành vi/sinh cảnh → OBSERVED; memory có thể được cấp riêng |
| OBSERVED | Đạt observation requirements của loài; wildlife có thể dừng ở đây và collection vẫn có giá trị | Đạt prerequisites → RESONANCE_AVAILABLE nếu có lộ trình cộng hưởng |
| RESONANCE_AVAILABLE | Nguồn hợp lệ, tương hợp, điều kiện loài đủ; không tự unlock | Bắt đầu đồng bộ; thành công → RESONATED; điều kiện tạm mất chỉ làm unavailable, không xóa tri thức |
| RESONATED | Quan hệ Linh Ấn hoàn chỉnh được commit; mở dạng chỉ khi playable | Có thể mở memory/mastery riêng; không grant lại khi gặp cá thể khác |
| ANCESTRAL_MEMORY_UNLOCKED | Có ít nhất một memoryId đủ điều kiện, độc lập trục resonance | Có thể xảy ra khi chỉ DISCOVERED/OBSERVED hoặc hạch hỏng; không tự mở dạng |
| MASTERED | Các mục tiêu major ability/progression của dạng đã đạt; không phải chỉ level cap | Chỉ cho playable đã RESONATED; không bắt tất cả wildlife có mastery |

Story exception có thể gom DISCOVERED/OBSERVED/AVAILABLE vào cùng event nhưng vẫn ghi các điều kiện đã đáp ứng theo story, không lưu trạng thái thiếu prerequisites. RESONATED không thể bị bỏ qua nếu dạng được mở. Memory và mastery không bắt buộc để mọi dạng được equip. Loài không playable có discovery/observation/collection/memory; nếu không có lộ trình cộng hưởng thì resonance status là `NOT_APPLICABLE`, không một nút khóa vĩnh viễn đánh lừa người chơi.

Gặp lại cùng species cập nhật nguồn/tri thức chưa có; không tạo duplicate unlock. Mỗi reward có stable grantId; transaction trùng được coi đã xử lý. Gặp loài trong khi dùng dạng của nó vẫn là encounter với cá thể độc lập, không tự sinh clone reward.

## Bốn nhóm thu nhận — PROPOSED

| Loại | Prerequisites / hoạt động minh họa, không thêm loài canon | Thất bại / retry | Reward và độ phức tạp |
| --- | --- | --- | --- |
| Story Resonance | Tứ Linh; milestone truyện và điều kiện sanctuary/môi trường, Quy là bootstrap trước phục hồi toàn vùng | Giữ milestone đã commit; khởi động lại từ checkpoint hợp lệ, không lặp reward | Linh Ấn/dạng Sacred nếu event cấp quyền, mảnh ký ức theo lịch; nhiều điều kiện nhưng hữu hạn |
| Ecological Resonance | Hiểu sinh cảnh/hành vi từ observation; tương hợp và nguồn không gây hại; ví dụ quan sát chu kỳ di chuyển rồi tạo điều kiện tiếp xúc | Sinh vật rời đi không mất tri thức; chờ/tiếp cận lại mà không farm kill | Collection/observation, dạng nếu designated playable; độ phức tạp thấp–vừa |
| Challenge Resonance | Thử combat/traversal/năng lực được loài/nội dung yêu cầu; có nguồn Linh Ấn hợp lệ sau thử thách | Thua reset phần thử thách, không thu cơ thể hay ép đồng ý; retry không cấp XP/unlock lặp vô hạn | Dạng/skill milestone được quy định, discovery độc lập; độ phức tạp vừa |
| Ancient Resonance | Hạch còn khả dụng hoặc nguồn imprint còn liên tục, khảo cứu và ổn định di tích; loài được coi tuyệt chủng vẫn phải có vật mang sống đặc biệt còn lại | Hạch FRAGILE cần phục hồi điều kiện; IRRECOVERABLE chỉ khảo cứu/memory, không unlock bằng mana | Linh Ấn nếu đủ, hoặc tri thức/memory riêng; độ phức tạp vừa–cao; không hồi sinh xác thường |

Một loài có thể có nhiều lộ trình khai báo, nhưng dùng cùng species unlock/grant key. Truyện đặc biệt không biến thành đường tắt mặc định cho mọi loài. Collection reward không tự đồng nghĩa tài nguyên/XP; mỗi event có reward manifest rõ.

## Mở đầu Quy: mười nhịp bắt buộc — CONFIRMED trình tự, PROPOSED cách tương tác

| Nhịp | Sự kiện theo yêu cầu | Gợi ý tương tác/ngắn gọn và điều kiện |
| --- | --- | --- |
| 1 | Nhiễu động năng lượng cổ | Dấu âm/ánh nước cục bộ; không kể nguồn gốc linh thể |
| 2 | Di tích đáp ứng | Nhánh kênh đầu sáng; người chơi hướng chú ý, không có free-flight xuyên toàn map |
| 3 | Linh Hạch ngủ trở nên cảm nhận được | Tín hiệu tăng theo hướng đúng; vật mang vẫn còn tổ chức sống |
| 4 | Tinh Linh bị thu hút tới sanctuary | Dẫn chuyển nhận cảm giới hạn theo tuyến an toàn, không exposition dài |
| 5 | Tiếp xúc giác quan từng phần | Cảm áp/lạnh/mặt vỏ trước khi có đủ giác quan |
| 6 | Một mảnh ký ức chưa hoàn chỉnh | Hình/cảm ngắn có điểm nhìn, không toàn biến cố |
| 7 | Cộng Hưởng đầu bắt đầu | Xác nhận tương tác có thể lặp nếu bị ngắt; exceptional compatibility riêng cho mở đầu |
| 8 | Cấu trúc sinh học khoáng hóa hoạt động | Dòng năng lượng kích hoạt + cấu trúc bảo tồn + tương hợp, cả ba phải có |
| 9 | Quy thức dưới dạng non trẻ | Commit unlock một lần, mở hiện thân đầu; không yêu cầu ba dạng hoặc một thân trước đó |
| 10 | Cảm nhận vật lý đầu tiên | Học chuyển động rồi cảm dòng và tương tác trong không gian an toàn |

Chỉ giác quan/điều hướng giới hạn trước nhịp 9; không áp quy tắc “phải có activeForm” lên bootstrap này. Sau nhịp 9 mới dùng state machine biến hình thường. Khôi phục toàn hệ nước diễn ra sau lần thức đầu, tránh vòng phụ thuộc “phải có Quy mới phục hồi nước nhưng phải phục hồi toàn nước mới có Quy”. Nguồn nhiễu động và lý do xuất hiện linh thể vẫn không được giải đáp thành canon.
