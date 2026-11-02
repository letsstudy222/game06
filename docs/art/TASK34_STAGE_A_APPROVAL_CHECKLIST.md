# Task34 Stage A — checklist duyệt gói hình

**Bản nghiên cứu R1 được giữ làm lịch sử.** Gói hiện hành theo phản hồi người dùng là [Revision2](TASK34_STAGE_A_REVISION2_REVIEW.md), bổ sung linh tính xuyên ba bậc và số đo native mới; không coi R1 hoặc R2 là hình đã được duyệt.

**READY_FOR_USER_REVIEW / PROPOSED.** Tài liệu này không ghi nhận người dùng đã duyệt các ảnh mới. **CONFIRMED:** hướng kết hợp và scope trong [brief](QUY_STAGE1_TASK34_HANDOFF.md); **UNRESOLVED:** các quyết định hình cuối bên dưới. **SUPERSEDED:** không tự thay quyết định lịch sử. Sau khi hoàn tất StageA phải dừng, chỉ StageB khi có chỉ dẫn phê duyệt tường minh sau đó.

## Gói cần mở trước khi trả lời

- [Minh họa hình thể](../../assets/concepts/quy-stage1/task34-stage-a/concept-illustration.png): nguồn sáng, đầu/vây/mai; không sprite.
- [Silhouette](../../assets/concepts/quy-stage1/task34-stage-a/silhouette-review.png) và [hai palette](../../assets/concepts/quy-stage1/task34-stage-a/palette-comparison.png).
- [So64×64/64×80 và khung đối chứng](../../assets/concepts/quy-stage1/task34-stage-a/scale-comparison.png), [tám hướng](../../assets/concepts/quy-stage1/task34-stage-a/directional-exploration.png).
- [Tư thế thăm dò](../../assets/concepts/quy-stage1/task34-stage-a/motion-keyposes.png), [bố cục dọc](../../assets/concepts/quy-stage1/task34-stage-a/mobile-layout-study.png).
- [Số đo và kế hoạch](TASK34_STAGE_A_SCALE_AND_ANIMATION.md), [trần tiến hóa](TASK34_STAGE_A_EVOLUTION_CONSISTENCY.md).

## Bảy quyết định cần phê duyệt bằng hình

| Mục | Cần phản hồi | Trạng thái |
| --- | --- | --- |
|1. Silhouette cuối | Có chấp nhận hình cụ thể mai thấp/vây trước trong gói này, hoặc cần chỉnh tỷ lệ/gốc vây? Không hỏi lại ba họ silhouette cũ | PENDING_USER_APPROVAL |
|2. Mặt | Đầu nêm và ánh mắt trong concept có đủ bình tĩnh/cổ xưa? Pixel study cần họa sĩ tinh chỉnh mức gọn/không cute nào? | PENDING_USER_APPROVAL |
|3. Mai/hoa văn | Chấp nhận mật độ giản lược của native hay muốn điều chỉnh? Không tự lấy toàn texture minh họa vào pixel sprite | PENDING_USER_APPROVAL |
|4. Palette | Ngọc trầm hay Biển sâu, hoặc yêu cầu chỉnh trong cùng họ đã duyệt? Đề xuất tiếp tục Ngọc trầm, chưa chọn thay người dùng | PENDING_USER_APPROVAL |
|5. Khung | Giữ64×64 và vẽ lại envelope,64×80 với điều chỉnh ngang, hay cân nhắc80×72 theo số đo hiện tại?80×72 là đề xuất có lý do, không final size | PENDING_USER_APPROVAL |
|6. Hướng | Duyệt hướng tới8 idle/swim dedicated trước, hay yêu cầu phương án staged/fallback cụ thể? Không mirror tự động; keyposes chưa là production views | PENDING_USER_APPROVAL |
|7. Animation | Có chấp nhận estimate96frame/5 nhóm làm cơ sở lập ngân sách tiếp theo, hay yêu cầu giảm bằng reuse pose hợp lệ? Scope năm nhóm đã duyệt, allocation/timing chưa | PENDING_USER_APPROVAL |

Có thể duyệt một phần và yêu cầu sửa phần còn lại. Không dùng lựa chọn palette hoặc frame để suy approval HP, combat, persistence hoặc StageB integration. Nhận xét về ảnh là creative review, không xác nhận code/gameplay.

## Kiểm tra StageA đã thực hiện

| Kiểm tra | Kết quả và phạm vi |
| --- | --- |
| Baseline | Audit b2c84c1 có trên origin/work, TASK34_STAGE_A_READY; Dawn vẫn default |
| Hình thật |24 PNG mở/đọc được; concept cuối và6 boards đã xem trực tiếp;17 native RGBA (gồm mask) có alpha0/255 |
| Pixel construction |16 native có màu tối đa15 màu đục; source polygon tại độ phân giải gốc, không đọc/downsample concept; bảng dùng nearest integer zoom |
| So khung |24 static envelope cases/khung:64 rộng chưa đủ,80×72 đạt margin thăm dò2px cho24/24; không phải animation acceptance |
| Manifest |16 fixture ảnh đạt validator27,0error/0warning; production validator cũ9PNG PASS; không đăng ký manifest mới |
| Mức độ hình | Minh họa khác pixel study khác production sprite. Pixel study còn là blocking bằng mã, cần art polish/anatomy review, không final-quality claim |
| Mobile | Có mockup390×844 tĩnh; không browser/gameplay/physicalmobile test mới |
| Evolution | Chỉ artI; không glow diện rộng, chừaII/III; đúng Thủy/rùa, không rắn/Kim/Thổ |
| Source/status | Ảnh generated + source pixel gốc được ghi trong README; palette/frame/direction đều chờ duyệt |
| Git/docs | Kiểm mới82 liên kết hợp lệ, bảng/fence và git diff --check đạt;31 tệp mới đúng phạm vi. Đối chiếu624 tệp tracked, gồm66 PNG cũ: giữ nguyên. Rebuild cho cùng SHA của24 PNG; không code ứng dụng/asset production đổi |

Gói StageA được nộp để xem và duyệt/chỉnh, **không phải Task34 hoàn tất**. A33-01 chưa được đóng chỉ vì tạo hình; A33-08/HP/LayerC/gameplay gates còn nguyên cho mốc sau. Không production atlas/clip/in-engine integration, không StageB, không Task35.
