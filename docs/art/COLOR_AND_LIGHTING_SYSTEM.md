# Hệ bảng màu, ánh sáng và khí quyển

Nguồn: [AB33-S01/S03/S06/S10/S11/S14](ART_BIBLE_MASTER.md). **CONFIRMED:** bản sắc nguyên tố và giữ màu/ảnh Phượng hiện hữu; readability ưu tiên. **PROPOSED AB33-P06:** mọi HEX, cách phân bổ và xử lý ánh sáng dưới đây, chưa bảng màu export được duyệt. **UNRESOLVED:** palette production, ngân sách hiệu ứng và thiết bị mục tiêu. **SUPERSEDED:** không thay lịch sử tại nguồn.

## Cấu trúc màu — PROPOSED

Mỗi vật liệu có ramp tối–trung–sáng gắn mặt khối, chuyển hue có chủ đích thay chỉ cộng trắng/đen. Khối nền giảm cạnh và độ bão hòa quanh actor; mắt/đầu và receiver được ưu tiên. Một hệ không bằng một màu phẳng: Thủy có cát ngà/đá xám/sinh quang ấm, Hỏa có đá lạnh, Phong có bóng mây đậm, Mộc có gỗ/ngà và khoảng trống tối. Không đặt toàn cảnh và người chơi cùng giá trị sáng rồi bù bằng bloom.

## Họ màu tham khảo — tất cả PROPOSED

Các mã PAL33 chỉ là chỉ mục brief, không assetId. Không lấy mẫu từ Option A/B không truy cập được và không recolor Phượng theo bảng này.

| Họ / chương | Bóng / nền | Trung gian | Điểm sáng / nhấn | Cách dùng đề xuất |
| --- | --- | --- | --- | --- |
| PAL33-W — Hải Uyên | #153B4A | #287E87 | #B9DED0 / #DCC99A | Nước sâu, ngọc, cát ấm và sinh quang thưa; Quy tách nền bằng sáng/cạnh |
| PAL33-F — Nhật Diệm | #252A36 | #A64D32 | #F4BA59 / #F4E4BE | Bazan và nhiệt/solar, giữ thân ngà Phượng đọc được trên dung nham |
| PAL33-A — Phong Vân | #334D70 | #77ACBC | #E1EAE7 / #C5A45C | Trời/mây, bóng xanh khác thân Long; vàng tiết chế |
| PAL33-L — Vạn Sinh | #193F37 | #54866A | #E4DDC5 / #A7C879 | Tán sâu, lá nhiều lớp, ngà cho điểm nhìn; Life theo mạng chứ không chỉ xanh |
| PAL33-U — UI trung tính | #202B35 | #5F747A | #F1E7D0 / #D6AF67 | Nền chữ tối, chữ ngà, viền cổ tiết chế; không viền vàng cho mọi nút |

Tỷ lệ chủ đạo/phụ/nhấn xác định qua composition: nền chiếm diện tích lớn, điểm tương tác và nhân vật ít nhưng nổi. Không khóa phần trăm hoặc số màu tối đa trước art test. Palette nhân vật có thể cùng họ môi trường nhưng khác value và phân bổ cạnh. Các họ màu canon của Ly/Long là hướng chữ, mã trong bảng không được suy là đã duyệt.

## Ngữ nghĩa và tiếp cận — PROPOSED

| Thông tin | Màu là kênh phụ | Kênh bắt buộc đi cùng |
| --- | --- | --- |
| Nguy hiểm/telegraph | Hổ phách hoặc magenta đối nền, chọn sau test | Viền/hatch/hình vùng, hướng và nhịp chuẩn bị, không chỉ đỏ–xanh |
| Vùng an toàn | Value yên, không tranh với danger | Ranh giới/khoảng trống rõ, tương phản với vùng hoạt động |
| Phục hồi môi trường | Độ trong và phân bố sinh quang thay đổi | Dòng ổn định, cây/sinh vật quay lại theo state nguồn; không tự báo hồi HP |
| Lôi/Kim thích nghi | Có thể sáng cân đối hoặc vật liệu ổn định | Tư thế/hành vi theo dossier; không tím đen mặc định là ác |
| Đồng hóa cưỡng bức | Nhịp/vật liệu lệch theo nội dung được duyệt | Dấu căng thẳng và phản ứng cụ thể; không nhấp nháy mạnh bắt buộc |

Kiểm grayscale và mô phỏng hạn chế phân biệt màu; không tuyên bố đạt tiêu chuẩn accessibility chỉ qua mô tả. Tránh strobe, giữ cảnh báo khi giảm chuyển động/tắt hạt. Bảng UI chữ/viền phải đo tương phản trên nền thực và kiểm dấu tiếng Việt.

## Ánh sáng tương thích Canvas2D — PROPOSED

**Thiết yếu:** shading đã vẽ trong asset, tương phản thân/nền, bóng neo giản dị và cue tĩnh đọc được. **Trang trí tùy chọn:** light shaft raster bán trong suốt, cụm phát quang, phản quang nước, halo dung nham, lớp màu môi trường nhẹ. **Nhạy hiệu năng:** nhiều lớp phủ toàn màn, blur/screen blend lớn hoặc hạt dày; chỉ thêm sau đo draw cost/overdraw và mức giảm FX.

Không yêu cầu shader/WebGL, không giả đã có lighting engine. Có thể dùng ảnh sáng tĩnh và drawImage/globalAlpha trong mở rộng tương lai; hiện chỉ hợp đồng layer/fade được kiểm. Không đổi source light giữa frame vì mirror. Bóng thể hiện điểm neo, không tạo trục Z/khả năng bay hoặc collider.

Day/night chỉ là biến thể màu đề xuất nếu sau này được duyệt; Task33 không thêm clock hoặc chu kỳ world state. Mức FX thấp giữ màu phân biệt cơ bản, hình báo đòn và hướng dòng; giảm số lớp trang trí, không tắt thông tin. Chưa có benchmark cho ánh sáng Hải Uyên trên thiết bị thật.
