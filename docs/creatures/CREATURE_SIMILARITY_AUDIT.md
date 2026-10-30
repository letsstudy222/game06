# Similarity audit — text giả thuyết, không art verdict

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

## Phương pháp — B12-P07

So chính bản ý tưởng → bodyplanes/ratios/đầu/chi/đuôi/phần phụ → cách vận động/posture/khoảng âm → elemental structure → kit/nguồn/window → display/hierarchy ở actual gameplay size. Review theo [rubric](CREATURE_VISUAL_STANDARDS.md) mọi stage có thể chạm nhau và category Sacred/phụ/thông thường/boss, FXon/off. Severity là **risk dự đoán từ brief/tên**, không đo ảnh chưa có; không ghi silhouette scores đã test. Mỗi pair cần actual tham chiếu phê duyệt trước verdict cuối. Không delete/overwrite/merge loài tự động.

| ID / pair | Shared giải phẫu giả thuyết | Shared vận động | Hierarchy conflict | Element motif overlap | Gameplay overlap | Severity | Proposed revision / phê duyệt |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SIM12-01 / Hải Quỷ Bông Xanh / Sứa Ngọc Biển Sao | Nếu cùng chuông sứa/xúc tua/thân mềm | Co nhịp và trôi nước nếu dùng chung dáng | Hai loài tỏa tia khó phân loài phụ và thường | Ánh xanh/đốm sao không đủ khác | Cùng nhịp xung/vùng kiểm soát | HIGH | Hải Quỷ đề xuất polyp bám co/xòe; Sứa đề xuất chuông bơi theo cột nước. Cần tham chiếu thật. |
| SIM12-02 / Điểu Viêm Xích / Phượng Hoàng Nhật Diệm | Cánh/mỏ/đuôi chim | Vỗ cánh/bay nếu cùng tỷ lệ | Chim thường có thể thành Phượng thu nhỏ | Lông đỏ/vàng và lửa giống nhau | Cùng tấn công Hỏa cơ động | HIGH | Chim thường thân gọn/đuôi ngắn/kiếm ăn trên nền; không sao mào, ngực ngà, đuôi dài của Phượng. Giữ Phượng đã duyệt. |
| SIM12-03 / Kỳ Nhông Dung Nham / Thạch Sùng Tro Đỏ | Thân thấp/bốn chi/đuôi theo tên, chưa ảnh | Bò nếu dùng chung bộ khớp | Hai loài khác tên nhưng cùng silhouette | Tro/đỏ/dung nham không đủ phân biệt | Cùng lao sát nền/cắn Hỏa | HIGH | Chốt taxon trước: Kỳ Nhông uốn thân/rìa nhiệt; Thạch Sùng bám/đổi điểm tựa nếu khả năng này được duyệt. |
| SIM12-04 / Vân Lộc Phi Dương / Ly Vạn Sinh | Thú bốn chân/móng guốc — giả thuyết | Chạy/nhảy | Loài thường giống hộ vệ Ly | Mây hoặc lá trang trí không sửa silhouette | Cùng hỗ trợ/cơ động nếu sao kit | HIGH | Vân Lộc ưu tiên dáng ăn cỏ và khối đầu thấp; Ly giữ khối hộ vệ/cấu trúc thực vật. Không cho wildlife quyền năng Life. |
| SIM12-05 / Rùa Phong Vân Giáp / Quy Hải Uyên | Mai/bốn chi/rùa | Đi thấp/bơi nếu thiết kế tương tự | Cùng hình mai chỉ khác màu | Vệt gió so với nước không đủ | Cùng chống đỡ/kiểm soát vùng | HIGH | Nghiên cứu mặt cắt mai/chi/tư thế có chức năng khác, nhấn thăng bằng trên nền thay áp/dòng. Không tự cấp bay; không sửa Quy. |
| SIM12-06 / WildlifeIV / Ly và Lộc Hoa Sinh | Nếu cả batch dùng hươu/bốn chân/gạc | Cùng chạy/nhảy | Batch IV đã bị bác; đổi tên không phê duyệt lại | Hoa/lá trên gạc chỉ đổi bề mặt | Cùng hồi phục/rễ nếu sao kit | HIGH | Bốn hướng hoa/nấm/côn trùng/bò sát phải khác trọng tâm và vận động; Lộc chưa có ảnh kiểm chứng, Ly giữ baseline. |
| SIM12-07 / Ưng Phong Kích Vũ / Lôi Ưng Điện Vũ | Cánh/mỏ/móng chim ưng | Lượn/bổ nhào/đổi hướng | Loài phụ và thường có thể cùng hình bay | Dải gió hoặc điện trang trí không đủ | Cùng bổ nhào/đạn/tái định vị | HIGH | Ưng Phong nhấn lượn/đáp/bổ có cam kết; Lôi Ưng cần cơ quan tích/xả, hình cánh và cửa sổ xả riêng nếu được duyệt. |

## Art evidence per pair

SIM12-02 có **Phoenix tham chiếu và runtime atlas** đã xem trực tiếp Task12, thiết kế đối chiếu Điểu chưa có ảnh verified. SIM12-04/05 có đã duyệt text direction Ly/Quy, không ảnh trong repo; cả counterparts external chưa xác minh. SIM12-01/03/07 cả hai bản ý tưởng images **unavailable**, tên không đủ biết giải phẫu thật. SIM12-06 batch bị bác theo explicit prompt nhưng images/names/IDs cũ không được cung cấp; four redesign briefs chưa có art work, Lộcimage chưa xác minh. Không dùng “khác giải phẫu giả định” để đánh thiết kế đã duyệt.

## Outcome gate và change control

Artlead so actualsilhouettes sau cung cấp tham chiếu; narrative/gameplay đánh giá functions; content lead đánh cost/nav/clip impacts. Low differentiation phải revise trước phê duyệt; đã duyệt nguồn chỉ mở đề xuất revision/version/diff/rationale, không replace runtime asset. Nếu cần major identity change phải explicit user decision và cập nhật species record/affected gates, giữ old phê duyệt/saves. Similarbody/element được phép khi cách vận động/sinh thái/kit khác được chứng minh; không thêm sừng/FX ngẫu nhiên để tăng score. Originality review với provenance tránh distinctive commercial anatomy, không claim tuyệt đối original.
