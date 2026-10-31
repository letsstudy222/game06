# Ma trận phân biệt hình thái Quy

**PROPOSED Q18-P01/P09**, đọc cùng [ba stage](QUY_EVOLUTION_FORMS.md) và [visual standards](../creatures/CREATURE_VISUAL_STANDARDS.md). Những gì đã duyệt là hướng rộng rùa nước/mai rõ/Thủy; không ảnh Quy nào trong checkout đã được xác nhận production-ready.

| Trục so sánh | Stage I | Stage II | Stage III | Giữ xuyên stage |
| --- | --- | --- | --- | --- |
| Hình dáng nhận diện | Oval gọn, chi ngắn tách nền | Mai ngang, vây trước mở âm rõ | Khối mai thấp tầng, vây chia mặt | Đầu–mai–bốn chi–đuôi luôn nhận ra |
| Đầu | Nêm ngắn/hàm rùa | Má trơn và cổ linh hoạt | Gờ nối cổ, cổ chắc | Mắt hai bên và mõm rùa, không mặt người/rồng |
| Mai | Ít mảng lớn | Rãnh viền có hướng | Tầng vào–ra có công năng | Mai là cấu trúc thân, không áo giáp tháo rời |
| Vây/chi | Màng bơi nhỏ | Mặt lực trước rộng | Mặt lực chia vùng, gập nếu có dữ liệu | Đúng bốn gốc chi/khớp, không đổi số khi xoay |
| Đuôi | Thuôn ngắn | Lái rõ hơn | Đuôi chắc theo nhịp thân | Không rắn hoặc xúc tu mới |
| Trang trí | Rất ít | Gờ phục vụ nước | Vàng ở nút cấu trúc | Tránh gai/hoa văn nhỏ gây noise |
| Hiệu ứng nước | Một viền/trail ngắn | Dòng theo hướng chặn | Vòng có lối vào–ra, đọc được ranh giới | FX riêng, không che đầu/telegraph |
| Scale | Compact | Rộng hơn tương đối | Uy nghi nhờ anatomy/pose | Không tự nhân pixel/collider theo stage |
| Nhịp vận động | Thử chi–đạp–hãm | Ghì điểm tựa–xoay giữ hướng | Điều phối có nhịp, chuyển thế có recovery | Bơi khác bay, phần thân có trọng lượng |
| Combat readability | Contact phía mai trước, recovery rõ | Sector trước và sườn hở | Preview vùng và cửa thoát | Telegraph khớp aim/layer/hitbox |

## Nghiệm thu art tương lai

So ba silhouette đen cạnh nhau ở scale gameplay, không tên/FX/màu để đoán stage. Kiểm hướng trước/sau/bên và frame cực trị swim/turn/attack/guard; mặt/đầu không biến mất trong mai. Sau đó kiểm màu/grayscale trên nền tối/sáng dưới nước và các vùng sau. So ngược với reference Quy được duyệt khi có, không dùng concept bên ngoài làm bằng chứng đã được approve.

Mirror trái/phải chỉ sau kiểm bất đối xứng rãnh/ánh sáng; không tự mirror mọi hướng. Bounds, anchor và camera phải thử với anatomy mới, không crop phần mai để vừa frame. Nếu III chỉ khác size/palette hoặc không phân biệt II khi tắt FX, trả art để sửa trước duyệt. Không chấm readiness bằng rubric khi chưa có hình thật. Xem [art spec](../art/QUY_ART_PRODUCTION_SPEC.md).
