# Task34 Stage A — giữ trần hình ảnh ba dạng Quy

**Bản nghiên cứu R1 được giữ làm lịch sử.** Gói hiện hành theo phản hồi người dùng là [Revision2](TASK34_STAGE_A_REVISION2_REVIEW.md), bổ sung linh tính xuyên ba bậc và số đo native mới; không coi R1 hoặc R2 là hình đã được duyệt.

**CONFIRMED:** I nhỏ và đơn giản nhất; II lớn/nổi bật hơn; III lớn/uy nghi nhất, có thể có vùng sáng kiểm soát. Nguồn: yêu cầu StageA hiện tại, [audit33](../reviews/POST_TASK33_COMPREHENSIVE_AUDIT.md), [forms18](../chapter1/QUY_EVOLUTION_FORMS.md), [visual language](CREATURE_VISUAL_LANGUAGE.md). **PROPOSED:** giải pháp diễn đạt cụ thể bên dưới. **UNRESOLVED:** hình cuối của mọi stage. **SUPERSEDED:** không thay lịch sử hoặc tự duyệt hồ sơ anatomy cũ.

## Những gì có hình trong gói này

Chỉ Quy I có [concept minh họa](../../assets/concepts/quy-stage1/task34-stage-a/concept-illustration.png), [native pixel](../../assets/concepts/quy-stage1/task34-stage-a/pixel-jade-64x64.png) và [silhouette study](../../assets/concepts/quy-stage1/task34-stage-a/silhouette-review.png). Không tạo sprite/silhouette StageII/III bằng resize để giả thiết kế tiến hóa. Bảng sau là lời bàn giao, không production art hai giai đoạn sau.

| Trục | I — thể hiện hiện tại và cần tiết chế | II — dành cho tương lai | III — dành cho tương lai |
| --- | --- | --- | --- |
| Khối và tỷ lệ | Mai oval thấp, đầu nhỏ, thân gọn,4 vây không giáp rời | Mai/khối vai và vây chịu lực phát triển, lớn hơn I bằng cấu trúc mới | Khối uy nghi nhất với mặt mai/tầng dẫn dòng có trật tự, không chỉ phóngII |
| Phiến mai | Mảng lớn thưa, vài rãnh ngắn; native giản lược hơn minh họa | Đường vào–ra/gờ viền rõ và có công năng, không gai trang trí vô hạn | Tổ chức mặt lực/đường hồi có chiều sâu, vẫn đọc đầu và silhouette |
| Hoa văn | Ít, màu gần bề mặt; không glyph kể trọn lịch sử | Có thể phong phú hơn nhưng theo anatomy | Nét cổ tinh luyện và điểm nhấn chọn lọc, không dát sáng toàn mai |
| Nguyên tố | Gợi dòng bằng nhịp/cấu trúc, không halo trên body | Hiện diện Thủy rõ hơn sau khi cơ chế được duyệt | Có thể có vùng phát sáng hạn chế ở rãnh/mép chức năng; không mặc định toàn thân emissive |
| Chuyển động | Đạp/thu/hãm tiết chế, học cơ thể | Nhịp giữ hướng và lực vây có chủ đích hơn | Nặng, điềm, điều tiết tinh luyện; vẫn responsive theo policy tương lai |
| Nhận diện xuyên dòng | Đầu nêm/mai/vây, họ jade–ocean, gốc chi nhất quán | Phát triển từ anatomy I, không đổi thành loài khác | Giữ rùa biển, không đầu rồng/gạc/rắn hoặc Life authority của Ly |

## Cách ngăn StageI trở thành hình cuối

Concept minh họa còn nhiều texture/phản quang trên vây; không chuyển tất cả sang sprite nhỏ. Pixel study dùng mảng lớn và không alpha glow, không crown/gai/crest, chỉ vài nét nước trên mai. Không thêm vàng sáng hoặc bloom để chữa tương phản nền tối. Nếu vòng review muốn I lộng lẫy hơn, cần kiểm lại trần II/III trước khi tăng chi tiết.

Mắt bình tĩnh/đầu gọn phải truyền sức mạnh tiềm ẩn thay vẻ boss hung dữ hoặc trẻ con quá mức. Giai đoạn lớn hơn không chỉ là số pixel export lớn hơn: frame rộng hơn do padding vây ở I không phải tiến hóa. Phải có bản anatomy/pose riêng choII/III về sau; exact size/collider/skill không được chốt từ bảng art.

## Những thứ không được suy ra

Không tự mởII/III ở ChươngI, không yêu cầuII/III để thắng boss hoặc qua đường chính, không biến màu phát quang thành skill/kháng/HP vô hạn, không gán Thổ/Kim vì vật liệu mai. Ba stage là cùng lineage/form progression theo nguồn; asset study không đăng ký species/stage IDs production. Không làm atlasII/III hoặc cinematic trong StageA.

Gói hiện tại sẵn sàng để người dùng đánh giá **Quy I có còn đủ giản dị hay không**, chưa phải nghiệm thu lineage hoàn chỉnh. StageB/Task35 chưa bắt đầu.
