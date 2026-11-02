# Task34 Stage A — PHI SẢN XUẤT, CHỜ DUYỆT

Không import thư mục này vào game, không coi ảnh là asset runtime-ready. **PROPOSED / PENDING_USER_APPROVAL** cho mọi hình cụ thể; hướng chữ đã duyệt không bằng hình cuối. StageB/Task35 chưa bắt đầu. [Gói review](../../../../docs/art/TASK34_STAGE_A_VISUAL_REVIEW.md) và [checklist](../../../../docs/art/TASK34_STAGE_A_APPROVAL_CHECKLIST.md) giữ trạng thái.

## Nguồn và cách tạo

01/11/2026 (Asia/Saigon). concept-illustration.png là ảnh tạo mới bằng image_gen theo brief rùa biển mai thấp, đầu trầm tĩnh, jade/deep-ocean, không glow. Ba lượt tạo/chỉnh trong cùng phiên; chỉ bản cuối nền giấy đục được copy nguyên byte vào repository. Bản này là concept illustration1536×1024, không native pixel art hoặc PNG actor. Không dùng ảnh Phượng/ảnh bên ngoài làm đầu vào. Prompt cốt lõi và các chỉnh sửa: mai thấp rộng;4 vây; StageI ít ornament; giảm rãnh/vảy/halo; đổi sang nền giấy xám ấm và chừa mép. Không tuyên bố mọi chi tiết do tool tạo đã đúng brief hoặc đã được người dùng chấp nhận.

SHA-256 concept cuối: `d843a059ec76dc7a3210058027d5e069922c96c4c89d43862457c6a218b2bd84`.

build_pixel_studies.py là nguồn vẽ pixel nguyên bản bằng mã cho nghiên cứu, không mã ứng dụng. Không đọc concept illustration hoặc dùng image downscaling/pixelation. Các mảng/đường màu dựng trực tiếp ở64×64,64×80 hoặc khung đối chứng; bảng xem mới dùng NEAREST. Cấu trúc dựa trên polygon/chiếu2D ước lệ, chưa thay công việc họa sĩ production. Không dùng resize StageI để tạoII/III; evolution note nằm trong docs.

Dùng Python3/Pillow và font hệ thống DejaVuSans.ttf để tái tạo native/boards/số đo: `python assets/concepts/quy-stage1/task34-stage-a/build_pixel_studies.py`. Không cài dependency vào package game; source dùng đường thư mục của chính nó, không phụ thuộc cwd. Concept generated được giữ nguyên, script không sinh lại ảnh đó. study-measurements.json là số đo phi sản xuất, không asset manifest/catalog/save hoặc runtime production JSON.

Đây là nội dung do công cụ/thuật toán tạo trong task, không tuyên bố bảo đảm pháp lý độc quyền hoặc phê duyệt phát hành. Provenance và quyền nguồn phải được kiểm theo workflow trước nghiệm thu thương mại.

## Tệp ảnh thật

| Tệp | Kích thước | Mode |
| --- | --- | --- |
| [concept-illustration.png](concept-illustration.png) | 1536×1024 | RGB |
| [direction-e-80x80.png](direction-e-80x80.png) | 80×80 | RGBA |
| [direction-n-80x80.png](direction-n-80x80.png) | 80×80 | RGBA |
| [direction-ne-80x80.png](direction-ne-80x80.png) | 80×80 | RGBA |
| [direction-nw-80x80.png](direction-nw-80x80.png) | 80×80 | RGBA |
| [direction-s-80x80.png](direction-s-80x80.png) | 80×80 | RGBA |
| [direction-se-80x80.png](direction-se-80x80.png) | 80×80 | RGBA |
| [direction-sw-80x80.png](direction-sw-80x80.png) | 80×80 | RGBA |
| [direction-w-80x80.png](direction-w-80x80.png) | 80×80 | RGBA |
| [directional-exploration.png](directional-exploration.png) | 1120×810 | RGB |
| [mobile-layout-study.png](mobile-layout-study.png) | 390×844 | RGB |
| [motion-keyposes.png](motion-keyposes.png) | 1080×510 | RGB |
| [palette-comparison.png](palette-comparison.png) | 1120×810 | RGB |
| [pixel-jade-64x64.png](pixel-jade-64x64.png) | 64×64 | RGBA |
| [pixel-jade-64x80.png](pixel-jade-64x80.png) | 64×80 | RGBA |
| [pixel-jade-80x64.png](pixel-jade-80x64.png) | 80×64 | RGBA |
| [pixel-jade-80x72.png](pixel-jade-80x72.png) | 80×72 | RGBA |
| [pixel-ocean-64x64.png](pixel-ocean-64x64.png) | 64×64 | RGBA |
| [pixel-ocean-64x80.png](pixel-ocean-64x80.png) | 64×80 | RGBA |
| [pose-brake-80x80.png](pose-brake-80x80.png) | 80×80 | RGBA |
| [pose-swim-80x80.png](pose-swim-80x80.png) | 80×80 | RGBA |
| [scale-comparison.png](scale-comparison.png) | 1360×840 | RGB |
| [silhouette-80x80.png](silhouette-80x80.png) | 80×80 | RGBA |
| [silhouette-review.png](silhouette-review.png) | 1080×590 | RGB |

Tổng24PNG:1 minh họa,17 nghiên cứu native/mask,6 bảng xem. Native có alpha nhị phân0/255, không antialias; boards RGB là nền trình bày. Những khung64 native S idle có thật không chứng minh full8-direction animation vừa khung64; đọc số đo envelope và giới hạn trước khi duyệt. Không fake production readiness hoặc bắt đầu StageB từ việc commit gói này.
