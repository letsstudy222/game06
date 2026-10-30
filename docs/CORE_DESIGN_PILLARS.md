# Trụ cột thiết kế

Thứ tự dưới đây là ưu tiên khi giải quyết xung đột thiết kế. Độ dễ đọc, input phản hồi tốt và khả năng tiếp cận là yêu cầu xuyên suốt; không hy sinh chúng vì spectacle. Chi tiết cân bằng phải được thử, không tự suy diễn từ cấp hiếm.

| Ưu tiên / trụ cột | Quyết định hỗ trợ | Quyết định vi phạm |
| --- | --- | --- |
| 1 — Hiện thân sinh vật và biến hình | Trực tiếp điều khiển cơ thể có khả năng sinh học riêng; đổi giữa ba dạng trang bị để đáp ứng điều kiện | Đặt một người huấn luyện cố định làm avatar chính; mọi dạng chỉ là skin cùng chức năng |
| 2 — Khám phá hệ sinh thái nguyên tố | Dòng nước/nhiệt/gió/cây tạo đường đi và bằng chứng về cân bằng; dạng cũ giữ công dụng hợp lý ở vùng sau | Khóa tùy tiện dạng đã có; đổi màu biome mà không đổi sinh thái hoặc traversal |
| 3 — Hành động thời gian thực | Đòn đánh/né/kỹ năng phản hồi rõ, enemy telegraph đọc được, loadout có đánh đổi và nguyên tố có ngữ cảnh | Boss gây sát thương không báo trước; bắt grind chỉ số thay cho đọc tình huống; dạng đầu game bị bỏ hoàn toàn vì power creep |
| 4 — Sưu tầm qua cộng hưởng | Khám phá, ký ức, gặp gỡ và tương hợp sinh học mở ra dạng; phát hiện loài vẫn có giá trị khi không playable | Sao chép vòng bắt quái thông thường làm toàn bộ bản sắc; ép mọi sinh vật thành dạng điều khiển |
| 5 — Hệ quả bền vững trong thế giới | Khôi phục một hệ làm thay đổi vùng được chọn và có tác động liên vùng; giữ đường hoàn tất bộ sưu tập | Choice không báo trước xóa vĩnh viễn loài cần sưu tầm; hứa thế giới biến đổi nhưng reload mất mọi tiến trình mà không nói rõ |
| 6 — Kể chuyện bằng bí ẩn | Tàn tích, hành vi sinh vật và mảnh ký ức gợi nhiều cách hiểu; Chương I cho câu hỏi và kết quả cục bộ | Giải thích nguồn gốc linh thể và toàn bộ biến cố trong mở đầu; biến giả thuyết hiến tế thành sự thật không có quyết định duyệt |

Các ví dụ là hướng đánh giá quyết định, không bổ sung encounter, boss hoặc asset canon. Trụ cột 5 là mục tiêu tương lai: shrine của prototype hiện đặt lại khi reload, chưa có persistent world state.

## Quy tắc chung

Vai trò sinh thái/chiến đấu tách khỏi độ hiếm. Vai trò có thể gồm sinh vật bản địa, trung lập, lãnh thổ/thù địch, bị đồng hóa nguyên tố, có trí tuệ/động cơ riêng, bạn đồng hành cộng hưởng quan trọng, linh thú và boss. Một cá thể có thể mang nhiều vai trò; đây không phải taxonomy đã khóa.

Normal / Rare / Epic / Legend / Rainbow là các hạng hiếm ứng viên, **PROPOSED**, chưa chốt bảng cân bằng hoặc xác suất. Hiếm không quyết định đạo đức hay trọng lượng cốt truyện. Hỏa/Thủy/Phong/Mộc bản địa không mặc định thiện; ngoại lai không mặc định ác. Song nguyên tố cần lý do sinh học và sinh thái.

Tiến trình phải có phần thưởng từ chiến đấu, khám phá, phát hiện truyện, cộng hưởng và thử thách môi trường. Chưa xác định chúng trả cùng loại XP hay tài nguyên nào; không áp một công thức khi chưa thiết kế.

## Cổng chất lượng hình ảnh

Pixel art sắc, silhouette mạnh, cụm pixel có chủ đích, palette kiểm soát, hướng sáng nhất quán, tương phản rõ không bão hòa quá mức, môi trường có lớp nhưng không che hành động. Dùng tilemap thật 32×32 đã xác minh trong runtime; props/sinh vật lớn có thể nhiều ô với anchor/footprint riêng. Nearest-neighbor, không smoothing làm mất pixel.

Không dùng concept illustration làm nền cả map hoặc mặc định coi hàng animation trên concept sheet là sprite hợp lệ. Bảo tồn tham chiếu Quy Hải Uyên, Phượng Hoàng Nhật Diệm, Long Thiên Phong, Ly Vạn Sinh khi được cung cấp; không tạo hình thay thế trong Task 01. Chỉ học nguyên lý thiết kế chung, không sao chép nhân vật/nhạc/UI/bản đồ của thương hiệu khác.
