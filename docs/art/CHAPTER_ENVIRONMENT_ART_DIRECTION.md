# Định hướng môi trường bốn chương

Nguồn: [AB33-S01/S03/S05–S08](ART_BIBLE_MASTER.md), [đồ thị Hải Uyên](../chapter1/CHAPTER1_WORLD_GRAPH.md), [bàn giao môi trường](CHAPTER1_WORLD_ART_HANDOFF.md). **CONFIRMED:** thứ tự Quy/Thủy, Phượng/Hỏa, Long/Phong, Ly/Mộc–Sinh Mệnh. **PROPOSED AB33-P05:** toàn bộ giải pháp composition bên dưới. **UNRESOLVED:** kit, palette cuối và bản đồ production. **SUPERSEDED:** lịch sử nguồn không đổi.

## Nguyên tắc chung — PROPOSED

Một cảnh có khối nền xa, mặt phẳng hoạt động rõ, vật cản có gốc tiếp đất/chiếu nước và điểm nhấn dẫn đường. Vùng nguy hiểm vẫn đẹp nhưng có cue hình học/nhịp khác vùng an toàn; không chỉ dựa màu. Đồ trang trí kể công năng của di tích, không tự đặt gate hoặc lối đi. Cùng chuẩn pixel cluster và vật liệu xuyên chương; khác silhouette địa hình, phân bổ màu và nhịp chuyển động.

| Chương | Tổ chức khối và vật liệu PROPOSED | Không khí/nhận diện | Giới hạn |
| --- | --- | --- | --- |
| I — Vực Hải Uyên | Rạn phân nhánh, đá mòn, hành lang dòng, vòm chìm có trầm tích; khoảng bơi không lấp bởi san hô | Bioluminescence theo cụm, nước nhiều tầng xanh/ngọc/ngà, ánh sáng suy giảm theo vùng kể chuyện | Không nền xanh đồng nhất, không thêm trục độ sâu bơi3D; chín vùng giữ H19 |
| II — Đảo Nhật Diệm | Bazan gãy, lòng dẫn nhiệt, tro và dung nham có bờ; công trình có khe xả/cầu chịu nhiệt | Cam nóng đối nền đá lạnh, vàng mặt trời riêng với đỏ nung; hơi nóng trang trí có mức giảm | Hỏa không đồng nghĩa hủy diệt/ác; lửa điều tiết và lửa mất kiểm soát khác nhịp, không đổi luật hazard bằng màu |
| III — Thiên Đảo Phong Vân | Đảo nổi có mặt hoạt động2D, nhịp cầu/kiến trúc đón gió, mây xa nhiều tầng | Không gian trời rộng, vệt gió có hướng, khe mây làm khoảng âm cho Long | Long hệ Phong, không Lôi; parallax background có sẵn trong adapter, không giả có flight3D hoặc mọi lớp parallax |
| IV — Tiên Cảnh Vạn Sinh | Rễ nâng đỡ, cây cổ, cấu trúc hữu cơ xen đá, tán có khe sáng và lối rõ | Mạng sinh trưởng, lọc sáng qua lá, ngà/ngọc làm điểm tựa; cũ/mới sống cạnh nhau | Mộc/Life không phải Thổ; foliage che người chơi phải author fade, không che critical cues |

## Chương I và tuyến chính

Dùng chín ID hiện hữu; tên/cấu trúc H19 tiếp tục **PROPOSED**, không tự được xác nhận bởi Art Bible. Bảng chi tiết và biến thể ở [UNDERWATER_VISUAL_DESIGN](UNDERWATER_VISUAL_DESIGN.md). Lối chính A–B–C–E–G–H, trở G phục hồi/kiểm chứng rồi I theo graph; D/F tùy chọn. Art không dựng một tuyến sản xuất khác hoặc tạo cổng yêu cầu tiến hóa/loài tùy chọn.

## Phượng và Dawn

**CONFIRMED — runtime:** Dawn/Phoenix vẫn là cảnh mặc định. Terrain Dawn hiện có nước, cỏ, cát và đá; giữ toàn bộ tài nguyên và composition đang chạy. **UNRESOLVED:** quan hệ tích hợp hình ảnh Dawn với Chương II cuối cùng theo quyết định nguồn. Định hướng núi lửa là brief chương tương lai, không lý do phủ tint cam toàn Dawn hoặc thay sprite Phượng ngay.

## Không khí và hiệu ứng theo mức chất lượng

**PROPOSED:** chế độ đầy đủ có ánh sáng môi trường, đốm phát quang/hơi nóng/mây/lá thưa; mức giảm dùng hình tĩnh hoặc animation ít hơn, giữ landmarks, hướng dòng và mọi cảnh báo. Chỉ background được parallax theo contract29; cảnh xa không là đường đi thật. Không dùng hiệu ứng thời tiết để tạo gameplay hoặc lịch ngày–đêm mới chưa được duyệt.

## Dấu tích và bí ẩn

**PROPOSED:** công trình lặp một ngữ pháp khe dẫn, khớp chịu lực và vùng bị lấp, nhưng vật liệu và cách thiên nhiên chiếm lại khác từng chương. Tranh/văn tự là góc nhìn thiếu, không giải thích đầy đủ nguồn gốc Tinh Linh, thủ phạm hoặc niên biểu biến cố. Kiến trúc cổ không mặc định mang affinity Kim/Thổ. Trạng thái phục hồi đọc từ world authority, không từ shader/màu nền.

## Bàn giao sản xuất

Mỗi bộ kit cần silhouette landmark, bảng vật liệu, tile edges/corners, prop gốc neo, lớp/occlusion, biến thể trạng thái được source cho phép và preview viewport nhỏ. Dùng [tile rules](TILESET_AND_OCCLUSION_ART_RULES.md), [palette](COLOR_AND_LIGHTING_SYSTEM.md) và [QA](ART_QA_CHECKLIST.md). Chưa tạo bốn kit hoặc chín map; số lượng asset và chi phí phải duyệt sau blocking.
