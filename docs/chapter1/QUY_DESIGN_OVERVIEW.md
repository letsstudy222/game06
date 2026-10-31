# Quy Hải Uyên — hồ sơ thiết kế triển khai

## Bản sắc và phạm vi

**CONFIRMED:** Sacred Thủy nguyên sơ, rùa nước cổ có mai rõ, dạng chơi đầu tiên qua cộng hưởng tại Vực Hải Uyên; ba stage lớn, phòng thủ ổn định và điều khiển dòng là bản sắc. Hướng hình tổng thể dùng xanh ngọc/jade, turquoise/cyan và xanh nước tự nhiên; không thêm nguyên tố thứ hai, rắn quấn mai hay đầu rồng. Nguồn [D03/D29–32](../PROJECT_DECISIONS.md), [C04 Quy](../creatures/QUY_HAI_UYEN.md) và yêu cầu Task18. Bảng màu cụ thể, giải phẫu từng stage và cơ chế mới vẫn **PROPOSED Q18-P01–P11**, chưa là thiết kế được duyệt hoặc gameplay đã tồn tại.

Quy giúp Tinh Linh học cảm giác có trọng lượng, giữ vị trí rồi lựa chọn cách điều tiết dòng mà vẫn giữ nơi sống. Quy không phải sinh vật hoang dã thông thường có nhiều cá thể để bắt, không giải thích nguồn gốc linh thể và không là vật phẩm trong kho. Loài `quy_hai_uyen` → dạng ổn định `form_quy_hai_uyen` → stage `quy_s1/quy_s2/quy_s3`; không chiếm ba slot hoặc có ba thanh XP. Các ID chi tiết là ứng viên nền tảng C04/S05/R03, không tự chuyển thành CONFIRMED. Kỹ năng cũng có ID `quy_s1/s2/s3`: phải dùng tham chiếu có kiểu `stageId` hoặc `abilityId`, không tra cứu bằng chuỗi trần.

## Năm trụ cột và prototype đầu

| Trụ cột | Biểu hiện thiết kế | Phần phải chứng minh ở bản chơi thử đầu tiên |
| --- | --- | --- |
| Giải phẫu nhận ra được | Mai–đầu rùa–bốn chi/vây–đuôi liên tục cả ba stage | Stage I đọc được hướng và tiếp xúc khi FX tắt |
| Cơ động dưới nước | Bơi theo mặt phẳng x–y, đà nhỏ có hãm, dấu báo dòng địa phương | Đầu vào đáp ngay, không trôi vô kiểm soát hoặc xuyên đá |
| Phòng thủ | Chọn hướng, short brace và phục hồi hữu hạn | Một đòn cơ bản, một phòng thủ ngắn có sườn hở; chưa cấp S2 |
| Khám phá môi trường | Đọc dòng, bộ tiếp nhận tương tác được biên soạn, giữ đường về | Một cơ cấu cửa cục bộ bằng Stage I; không mở mọi điều kiện chặn |
| Tăng trưởng tiến hóa | Mai/vây/đuôi và mức điều tiết thay đổi có công năng | Đặc tả II/III đủ bàn giao; không bắt có asset II/III để thử I |

## Chỉ mục bàn giao

- [Ba stage](QUY_EVOLUTION_FORMS.md), [ma trận hình thái](QUY_VISUAL_DIFFERENTIATION.md), [di chuyển](QUY_UNDERWATER_MOVEMENT.md).
- [Chiến đấu](QUY_COMBAT_DESIGN.md), [kỹ năng và nguyên tố](QUY_SIGNATURE_SKILLS.md), [môi trường](QUY_ENVIRONMENTAL_ABILITIES.md).
- [Sinh thái/truyện](QUY_ECOLOGY_AND_LORE.md), [tiến trình phát triển](QUY_PROGRESSION.md), [bộ dạng](QUY_LOADOUT_INTEGRATION.md).
- [Bản chơi thử đầu tiên](QUY_FIRST_PLAYABLE_SCOPE.md), [sản xuất art](../art/QUY_ART_PRODUCTION_SPEC.md).
- [Đặc tả dữ liệu](../technical/QUY_DATA_SPEC.md), [khoảng cách runtime](../technical/QUY_RUNTIME_GAP_ANALYSIS.md), [30 ca QA tương lai](../technical/QUY_TEST_CASES.md).
- [Quyết định/điều kiện chặn](TASK18_DECISIONS.md), [kiểm tra cục bộ](TASK18_CONSISTENCY_AUDIT.md).

Task17 là đầu vào mở đầu hiện hữu: ký ức thiếu trước cộng hưởng, commit dạng trước luyện tập, một Quy đủ tuyến. Task18 mở rộng thiết kế sinh vật, không viết lại [E01](OPENING_QUEST_AND_EVENTS.md). Không tạo runtime/art/map/UI/save/config mới, không chốt thông số và không tự bắt đầu Task19. “Đầy đủ” ở đây là đủ hợp đồng và điều kiện chặn để bàn giao; chưa đủ phê duyệt/asset/runtime để triển khai sản xuất.
