# Gói tiền sản xuất Quy I — bàn giao Task34

Nguồn: [AB33-S01–S04/S08–S12](ART_BIBLE_MASTER.md), [hồ sơ Quy](../creatures/QUY_HAI_UYEN.md), [các dạng](../chapter1/QUY_EVOLUTION_FORMS.md), [art spec18](QUY_ART_PRODUCTION_SPEC.md). **CONFIRMED:** Quy Hải Uyên, Sacred Thủy, rùa thủy sinh cổ, cơ thể đầu tiên, ba giai đoạn. **PROPOSED AB33-P13:** toàn bộ lựa chọn anatomy, palette, frame và animation cụ thể ở đây. **UNRESOLVED:** lựa chọn cuối, quyền nguồn, coverage và kích thước. **SUPERSEDED:** không tự thay lịch sử các phương án nguồn.

**Cổng bắt buộc:** thực hiện review01–33 theo [handoff](TASK33_POST_COMPLETION_REVIEW_HANDOFF.md) trước Task34; xử lý vấn đề chặn sản xuất và nhận phê duyệt visual cần thiết. Task33 chỉ chuẩn bị brief, **không bắt đầu Task34**, không vẽ hoặc xuất sprite.

## Mục tiêu brief

Quy I là cơ thể còn tương đối khiêm tốn, có sức bền và cảm giác cổ xưa tiềm ẩn, không boss khổng lồ hoặc bản stage III thu nhỏ. Đầu và bốn gốc chi phải đọc trong góc3/4, mai khác giáp xác và vỏ ốc. Chuyển động có pha đẩy–thu–hãm, đáp ứng gameplay về sau nhưng chưa duyệt speed/inertia/collision/timing. Đặc điểm thủy văn/ký ức diễn đạt bằng hướng dòng và cấu trúc mai đề xuất, không kể nguồn gốc Tinh Linh trên hoa văn.

Không mặc định rắn quấn, Huyền Vũ hai cơ thể, giáp Kim, nguyên tố Thổ, khả năng hồi sinh hoặc Life của Ly. Bộ kit không cần full opening/resonance cinematic để dùng S0; S1 phải giữ thứ tự cảm nhận/ký ức/cộng hưởng/thức tỉnh theo truyện nguồn.

## Ba hướng silhouette — đều PROPOSED, chưa chọn

Mã Q33-SIL chỉ là nhãn phương án thảo luận, không speciesId/formId/assetId; không liên quan Option A/B trước đây.

| Phương án | Mai/khối thân | Đầu và chi | Lợi ích | Rủi ro cần so |
| --- | --- | --- | --- | --- |
| Q33-SIL-01 — Mai thấp vững | Oval rộng thấp, viền chia vài mảng lớn | Đầu nêm gọn/hàm rõ, chi trước bản rộng có màng, chi sau lái ngắn | Đọc endurance, thân gọn và mặt dễ tách | Khối mai có thể che chi ở hướng bắc; tránh giống ốc/cua |
| Q33-SIL-02 — Dòng lướt | Mai thuôn sau, trục bơi dài hơn, rãnh rất tiết chế | Đầu rùa hơi vươn, vây trước dạng mái chèo, chi sau tách rõ | Hướng bơi/turn dễ đọc, phù hợp nhịp nước | Không làm thành cá/chi hoàn toàn vô khớp hoặc quá nhanh so vai trò |
| Q33-SIL-03 — Vòm cổ nhỏ | Mai vòm rõ mặt trên/bên, khối thân chắc nhưng không cồng kềnh | Cổ ngắn, đầu rộng vừa, chi nhỏ có gốc chắc | Tiềm năng progression mai qua ba stages | Dễ thành quá tròn/dễ thương hoặc cao như rùa cạn, cần giữ aquatic silhouette |

Các chi tiết đầu/mắt/hàm đều cần duyệt: biểu cảm tĩnh quan sát hoặc hiếu kỳ kín đáo là phương án, không mặt cuối được chọn. Có thể kết hợp yếu tố sau review nhưng phải dựng lại silhouette/anatomy thống nhất, không ghép danh sách ưu điểm làm cơ thể khó sản xuất.

## Bề mặt mai và màu — PROPOSED

| Trục lựa chọn | Phương án | Ràng buộc |
| --- | --- | --- |
| Phân phiến | Mảng lớn thưa hoặc phiến trung tâm có hướng, không tiểu tiết dày mọi pixel | Cùng cấu trúc ở mọi hướng, không đổi số phiến mỗi frame |
| Rãnh cổ | Rãnh dẫn nước nông hoặc dấu mòn kín ở điểm nối | Không văn tự tiết lộ lịch sử thật hoặc ánh sáng mặc định toàn mai |
| Vật liệu | Mai sinh học hơi khoáng, cạnh mòn và bụng/hàm khác mặt lưng | Khoáng hóa không tự gán Kim/Thổ; không áo giáp rời thay thân |
| Q33-COL-01 | Ngọc dịu, bóng xanh sâu, ngà ở đầu/bụng, nhấn ấm rất ít | So với nền xanh/ngọc; cần value tách thân |
| Q33-COL-02 | Xanh sâu chủ đạo, đường mai trung tính, ngà rõ ở mặt/chi | Không mất silhouette trong trench, không cần glow để thấy đầu |
| Q33-COL-03 | Mai xám ngọc bớt bão hòa, vây xanh, nhấn sinh quang cục bộ | Không giống đá vô tri hoặc hứa kỹ năng phát sáng chưa duyệt |

Các họ màu trên dẫn về [palette](COLOR_AND_LIGHTING_SYSTEM.md), không HEX cuối. Không có ảnh concept Quy đã xác minh; không dùng hình Option A/B không truy cập được làm sheet anatomy.

## Góc nhìn, chuyển động và neo

**PROPOSED:** khối mai có mặt trên/bên nhất quán, đầu và gốc chi rõ ở n/ne/e/se/s/sw/w/nw. Thử silhouette ở hướng bắc và hai góc chéo trước khi tăng ornament. Mirroring cần đánh giá asymmetry/ánh sáng/rãnh, không mặc định được dùng. Đường bơi chuẩn hóa tám hướng; aim/body/movement giữ tách về khái niệm, không bắt controller tương lai khóa aim theo frame.

Đề xuất anchor ở projection khối thân chính lên mặt phẳng bơi, cùng basis mọi pose. Visual bounds bao thân và chi extrema, FX tách; collision footprint và hurt/attack shapes do task tương ứng duyệt, không lấy mai rộng hay toàn frame. Frame48/64 hoặc chữ nhật biến thiên là ứng viên so, chưa chọn. Chừa padding vừa đủ extrema/alpha; không yêu cầu ô96 chỉ vì Phượng dùng96.

## Gói tối thiểu S0 — PROPOSED

| Mức | Sản phẩm cần có về sau | Tiêu chí |
| --- | --- | --- |
| Mandatory | Hình Quy I được duyệt, idle/swim và coverage hướng được duyệt | Nhận đúng loài/hướng, không crop/anchor drift; fallback có phê duyệt và nhãn thiếu coverage |
| Mandatory | PNG/frames/anchor/bounds/clip metadata hợp validator27 | File thật, required clips rõ, không dùng Phượng làm fallback |
| Mandatory | Phản hồi interaction, restart/demo-state đọc được | Có thể reuse pose + cue đối tượng được duyệt; không giả persistent progression |
| Recommended | Turn/brake riêng, loop idle tinh tế, shadow hợp mặt phẳng | Không tạo root motion lần hai, không sửa tuning gameplay bằng ảnh |
| Deferred | Attack/defense/hurt/incapacity, full resonance, evolution II/III, boss | Đợi S1/cơ chế/HP và task đúng phạm vi |

Chưa khóa số frame/FPS hoặc atlas layout. Tám hướng là mục tiêu art; giảm bộ hướng vẽ cho S0 chỉ được làm sau duyệt riêng, không gọi là full tám hướng. Nhân lực và memory tính theo [scale](PIXEL_DENSITY_AND_SCALE.md); so pose trước khi đặt hàng cả atlas.

## Bằng chứng người sản xuất phải bàn giao

Concept source/provenance, quyết định chọn silhouette/anatomy/palette; sheet hướng và scale so; keyframes/animation extrema; PNG nguồn/xuất thật; manifest contract27; bảng clip/direction/fallback; anchor/bounds và giới hạn geometry chưa duyệt. Tên file cuối và asset IDs chỉ đặt khi phê duyệt và có asset thật. Marker gameplay hoặc metadata ngoài schema ở brief, không khẳng định validator tự hiểu.

Preview sau duyệt trên nền sáng/tối/rối và mobile dọc/ngang, nhiều foreground, FX off, DPR1/2; kiểm thêm máy thật trước cam kết hiệu năng. Hiện **chưa có** sprite, animation playback hoặc visual production QA Quy.

## Câu hỏi phê duyệt trước sản xuất — tất cả UNRESOLVED

1. Chọn Q33-SIL-01/02/03 hay yêu cầu vòng silhouette khác; mức độ khiêm tốn/cổ xưa của Quy I mong muốn?
2. Duyệt tỷ lệ đầu/cổ, dạng chi có màng hay vây mái chèo và biểu cảm; chi tiết nào cần bất đối xứng?
3. Chọn cách chia phiến/rãnh mai; có dấu mòn hoặc phát sáng cục bộ nào được phép, nguồn nào giải thích?
4. Chọn Q33-COL-01/02/03 và palette test tiếp theo; chưa khóa HEX từ mô tả chữ?
5. Cho phép so blocking48/64/variable trước khi khóa frame và body scale nào; bộ tile cần thước tương ứng ra sao?
6. S0 cần tám hướng vẽ riêng ngay hay chấp nhận fallback tạm được chỉ định; hướng nào được mirror sau review anatomy/ánh sáng?
7. Duyệt minimum idle/swim và phản hồi interaction bằng reuse pose hay cần clip riêng; turn/brake có trong ngân sách đợt đầu?

Trả lời các câu hỏi không tự khởi động Task34. Cần review01–33 và chốt phạm vi sản xuất rõ; HP, tuning, collision và combat timing không nằm trong quyền phê duyệt của palette/anatomy.
