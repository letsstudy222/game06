# Revision2 — PHI SẢN XUẤT, CHỜ DUYỆT

[ReviewR2](../../../../../docs/art/TASK34_STAGE_A_REVISION2_REVIEW.md) và [phiếu duyệt](../../../../../docs/art/TASK34_STAGE_A_REVISION2_APPROVAL.md) là gói hiện hành. Tất cả hình cụ thể **PROPOSED / PENDING_USER_APPROVAL**, không runtime assets. Không StageB/Task35.

Nguồn tham khảo: hình do người dùng đính kèm trong tin nhắn Revision2. Đã xem trong hội thoại, không có file tham khảo local được kiểm provenance/license; không coi nhãn kích thước/chuỗi frame trong ảnh là dữ liệu thật. Không sao chép/cắt các sprite trong ảnh. Concept lineage mới được image_gen tạo dựa định hướng rồi chỉnh giảm trang tríI; đây là minh họa1942×809, không pixel native. SHA256: `4d781febf6009ea8e47c29e54a3c236e7d70b98de878e26dcf0ae7ba4595aec3`.

build_pixel_studies.py kế thừa nguồn nghiên cứuR1, đổi tọa độ vây/đầu để kiểm khung64, thêm hai cặp gờ sóng, xoáy chạm ngọc giữa mai và ấn Thủy trán. Pixel được dựng trực tiếp từ polygon/line ở độ phân giải gốc; script không đọc ảnh tham khảo hoặc ảnh concept. Native không glow/halo, alpha0/255; màu thứ16 là màu signature đục. Bảng phóng dùng NEAREST, không downsample minh họa. Không tạo spriteII/III bằng scale/recolor; chúng chỉ có concept trong comparison.

Tái tạo native/boards/số đo bằng Python3/Pillow và font DejaVuSans.ttf: `python assets/concepts/quy-stage1/task34-stage-a/revision-2/build_pixel_studies.py`. Source không là code ứng dụng, không dependency npm mới. study-measurements.json là số đo phi sản xuất, không manifest/save/catalog. Concept generated không bị script sửa. Không đảm bảo pháp lý độc quyền hoặc phê duyệt phát hành từ việc công cụ đã tạo hình.

| Tệp | Kích thước | Mode |
| --- | --- | --- |
| [direction-e-64x64.png](direction-e-64x64.png) | 64×64 | RGBA |
| [direction-n-64x64.png](direction-n-64x64.png) | 64×64 | RGBA |
| [direction-ne-64x64.png](direction-ne-64x64.png) | 64×64 | RGBA |
| [direction-nw-64x64.png](direction-nw-64x64.png) | 64×64 | RGBA |
| [direction-s-64x64.png](direction-s-64x64.png) | 64×64 | RGBA |
| [direction-se-64x64.png](direction-se-64x64.png) | 64×64 | RGBA |
| [direction-sw-64x64.png](direction-sw-64x64.png) | 64×64 | RGBA |
| [direction-w-64x64.png](direction-w-64x64.png) | 64×64 | RGBA |
| [directional-exploration.png](directional-exploration.png) | 1120×810 | RGB |
| [lineage-concept-comparison.png](lineage-concept-comparison.png) | 1942×809 | RGB |
| [mobile-layout-study.png](mobile-layout-study.png) | 390×844 | RGB |
| [motion-keyposes.png](motion-keyposes.png) | 1080×510 | RGB |
| [palette-comparison.png](palette-comparison.png) | 1120×810 | RGB |
| [pixel-jade-64x64.png](pixel-jade-64x64.png) | 64×64 | RGBA |
| [pixel-jade-64x80.png](pixel-jade-64x80.png) | 64×80 | RGBA |
| [pixel-jade-80x64.png](pixel-jade-80x64.png) | 80×64 | RGBA |
| [pixel-jade-80x72.png](pixel-jade-80x72.png) | 80×72 | RGBA |
| [pixel-ocean-64x64.png](pixel-ocean-64x64.png) | 64×64 | RGBA |
| [pixel-ocean-64x80.png](pixel-ocean-64x80.png) | 64×80 | RGBA |
| [pose-brake-64x80.png](pose-brake-64x80.png) | 64×80 | RGBA |
| [pose-swim-64x80.png](pose-swim-64x80.png) | 64×80 | RGBA |
| [scale-comparison.png](scale-comparison.png) | 1360×840 | RGB |
| [signature-detail-board.png](signature-detail-board.png) | 1120×610 | RGB |
| [silhouette-64x64.png](silhouette-64x64.png) | 64×64 | RGBA |
| [silhouette-review.png](silhouette-review.png) | 1080×590 | RGB |

25PNG:1 concept lineage,17 native/mask,7 boards. Không asset production mới; frame/motif/anatomy đều cần người dùng duyệt. R1 ở thư mục cha được giữ nguyên để đối chiếu.
