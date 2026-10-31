# Vận động dưới nước của Quy

**PROPOSED Q18-P02**, kế thừa [C14 movement](../combat/MOVEMENT_AND_DEFENSE.md) và [plane contract](../combat/COMBAT_SYSTEM_OVERVIEW.md). Runtime xác minh là x–y nhìn từ trên xuống, Camera follow/clamp và integer render; không axis lặn tự do. Production projection/depth vẫn C14-U01. Khuyến nghị prototype Quy giữ mặt phẳng x–y hiện hữu trong một vùng nước được author, không giả định bơi 3D. Đổi độ sâu/layer chỉ qua connector có cue và hit eligibility được duyệt sau; chữ “lặn” không thêm axis mới.

## Ba profile tuning ứng viên

| Profile | Tăng tốc/đà/hãm/turn | Dòng và trade-off | Đánh giá |
| --- | --- | --- | --- |
| Dễ tiếp cận | Đáp input sớm, đà ngắn, thả hướng giảm nhanh, brake rõ; turn dễ sửa trước commit | Dòng yếu có thể chống lại trong tutorial, không kéo mất agency | Khuyến nghị first playable; vẫn animate chi để thấy khối lượng |
| Cân bằng | Tăng tốc mềm hơn, giữ một ít đà, brake chủ động quan trọng, turn có bán kính đọc được | Cần dự đoán hướng current nhưng có refuge/exit | Candidate thử sau khi accessible đạt; không ép ngay người mới |
| Thiên mô phỏng | Đà dài, giảm tốc lâu, turn quán tính lớn | Dễ kẹt wall/current, khó ngắm/cảm ứng | Không chọn mặc định; chỉ khảo sát nếu có mục tiêu usability và assist |

Không chốt velocity/friction/acceleration/turn-rate số. Prototype phải đo thời gian đáp ứng, quãng hãm, overshoot, khả năng đổi hướng và thao tác touch thực tế; không sao chép speed Phượng thành Quy.

## Motion contract

Input normalization tránh diagonal nhanh hơn; input được nhận trong simulation boundary phù hợp. Motion coordinator duy nhất hợp thành ý định bơi, root motion của action, current địa phương và knockback rồi collision sweep một lần; renderer chỉ vẽ, không cộng dịch chuyển lại. Có budget/cap cho tổng lực theo profile được duyệt, không tích tốc vô hạn bằng Mượn Dòng + dòng + switch.

Hướng aim phải rõ trước startup/contact; sprite có thể quantize hướng còn collision/aim dùng vector hợp lệ. Bơi tự do có thể turn dễ, nhưng đòn đã commit/brace không xoay tức thời để phủ mọi góc. Hãm không dừng vô hạn mọi current; không auto stationary passive khi đang trôi không điểm tựa. Current thay đổi có warning và chuyển hợp lệ, không giật thân xuyên wall.

| Tình huống | Hành vi / dữ liệu cần author | Fail-safe và giới hạn |
| --- | --- | --- |
| Bơi thường | Swim loop theo displacement thật, thả input hãm theo profile | Không dừng input chờ idle hết; pause không tick dòng |
| Cạnh đá | Sweep footprint và body envelope, stop/slide theo rule | Không cộng displacement bị chặn thành damage ngầm; còn đường rút |
| Khe hẹp | Clearance theo stage/posture thực và turn envelope | Không crop/scale thân để lọt; posture compact chỉ khi clip/hurtbox được duyệt |
| Dòng yếu | Vector/nhịp hiện bằng lá/nét/caption, có safe anchor | Tutorial không lethal, không ép stage II |
| Dòng mạnh/turbulence | Capability gate và route/return được author | Thủy không miễn; lối optional có cảnh báo, không đẩy qua progression gate |
| Áp/depth | Local hazard/receiver profile tách affinity; connector nếu đổi layer | Chưa oxygen hoặc depth-damage số; không đánh đồng depth với trục 3D |
| Mượn Dòng | Input hướng đúng, source current hợp lệ, endpoint/braking route valid | Chặn bởi đá, finite action; không dash xuyên cổng hoặc free i-frame |
| Lên nền/đất | Profile terrestrial riêng khi map cho phép | Đi chậm có chỗ đứng, không bay; không tự mất XP/HP vì khô |

Mobile/remap dùng action semantic, không final bindings; blur clear held vector và không thêm quán tính input giả khi focus lại. Reduced motion không đổi collision. Camera giữ float follow/integer sampling có thể tái dùng, nhưng offset/clamp phải validate với water zones/envelope từng stage; không claim hỗ trợ Quy chỉ vì module có sẵn. Xem [gaps](../technical/QUY_RUNTIME_GAP_ANALYSIS.md).
