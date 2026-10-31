# Quy Hải Uyên — hồ sơ thiết kế triển khai

## Bản sắc và phạm vi

**CONFIRMED:** Sacred Thủy nguyên sơ, rùa nước cổ có mai rõ, dạng chơi đầu tiên qua cộng hưởng tại Vực Hải Uyên; ba stage lớn, phòng thủ ổn định và điều khiển dòng là bản sắc. Hướng hình rộng dùng xanh ngọc/jade, turquoise/cyan và xanh nước tự nhiên; không thêm nguyên tố thứ hai, rắn quấn mai hay đầu rồng. Nguồn [D03/D29–32](../PROJECT_DECISIONS.md), [C04 Quy](../creatures/QUY_HAI_UYEN.md) và yêu cầu Task18. Palette cụ thể, anatomy từng stage và mechanics mới vẫn **PROPOSED Q18-P01–P11**, không thiết kế đã duyệt hoặc gameplay đã có.

Quy giúp Tinh Linh học có trọng lượng, giữ vị trí rồi lựa chọn cách điều tiết dòng mà vẫn giữ nơi sống. Không là ordinary wildlife có nhiều cá thể để bắt, không giải thích nguồn gốc linh thể, không là vật phẩm kho. Species `quy_hai_uyen` → form `form_quy_hai_uyen` ổn định → stage `quy_s1/quy_s2/quy_s3`; không ba slot/ba thanh XP. Các ID chi tiết là baseline ứng viên C04/S05/R03, không tự chuyển thành CONFIRMED. Skill cũng có IDs `quy_s1/s2/s3`: phải dùng typed reference `stageId` hoặc `abilityId`, không lookup bằng chuỗi trần.

## Năm trụ cột và prototype đầu

| Trụ cột | Biểu hiện thiết kế | Phần phải chứng minh ở first playable |
| --- | --- | --- |
| Giải phẫu nhận ra được | Mai–đầu rùa–bốn chi/vây–đuôi liên tục cả ba stage | Stage I đọc được hướng và contact khi FX tắt |
| Cơ động dưới nước | Bơi theo mặt phẳng x–y, đà nhỏ có hãm, cue dòng địa phương | Input đáp ngay, không trôi vô kiểm soát hoặc xuyên đá |
| Phòng thủ | Chọn hướng, short brace và recovery hữu hạn | Một basic, một phòng thủ ngắn có sườn hở; chưa cấp S2 |
| Khám phá môi trường | Đọc dòng, receiver được author, giữ đường về | Một cơ cấu cửa cục bộ bằng Stage I; không mở mọi gate |
| Tăng trưởng tiến hóa | Mai/vây/đuôi và mức điều tiết thay đổi có công năng | Spec II/III đủ handoff; không bắt asset II/III để test I |

## Chỉ mục bàn giao

- [Ba stage](QUY_EVOLUTION_FORMS.md), [ma trận hình thái](QUY_VISUAL_DIFFERENTIATION.md), [movement](QUY_UNDERWATER_MOVEMENT.md).
- [Combat](QUY_COMBAT_DESIGN.md), [skills và nguyên tố](QUY_SIGNATURE_SKILLS.md), [môi trường](QUY_ENVIRONMENTAL_ABILITIES.md).
- [Sinh thái/truyện](QUY_ECOLOGY_AND_LORE.md), [progression](QUY_PROGRESSION.md), [loadout](QUY_LOADOUT_INTEGRATION.md).
- [First playable](QUY_FIRST_PLAYABLE_SCOPE.md), [art production](../art/QUY_ART_PRODUCTION_SPEC.md).
- [Data spec](../technical/QUY_DATA_SPEC.md), [runtime gaps](../technical/QUY_RUNTIME_GAP_ANALYSIS.md), [30 ca QA tương lai](../technical/QUY_TEST_CASES.md).
- [Decision/gates](TASK18_DECISIONS.md), [local audit](TASK18_CONSISTENCY_AUDIT.md).

Task17 là đầu vào mở đầu hiện hữu: ký ức thiếu trước cộng hưởng, form commit trước practice, một Quy đủ tuyến. Task18 mở rộng thiết kế creature, không viết lại [E01](OPENING_QUEST_AND_EVENTS.md). Không runtime/art/map/UI/save/config mới, không final numbers và không tự bắt đầu Task19. “Đầy đủ” ở đây là đủ hợp đồng và gate để bàn giao; chưa đủ approval/asset/runtime để triển khai sản xuất.
