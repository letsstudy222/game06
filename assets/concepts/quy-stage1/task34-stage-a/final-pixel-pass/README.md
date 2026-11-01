# Lượt pixel study cuối Stage A — PHI SẢN XUẤT

[Review](../../../../../docs/art/TASK34_STAGE_A_FINAL_PIXEL_REVIEW.md). **PIXEL_STUDY_PENDING_APPROVAL**, không production asset. Hướng concept ba bậc đã được duyệt về nguyên tắc; master ưu tiên là bộ thứ hai [comparisonR2](../revision-2/lineage-concept-comparison.png), SHA256 `4d781febf6009ea8e47c29e54a3c236e7d70b98de878e26dcf0ae7ba4595aec3`. Không dựng lại hoặc thay master ảnh.

build_studies.py vẽ trực tiếp ở độ phân giải native bằng Python3/Pillow; font bảng dùng DejaVuSans.ttf. Source không mở ảnh concept hoặc pixelate/downsample minh họa. Các bảng mới dùng NEAREST nguyên lần để xem; hìnhI 64×64/64×80 có cùng body scale, chỉ đổi padding. II/III có các bộ tọa độ shell/head/flippers/rim riêng, không resize ảnhI; chỉ là previewSE so lineage chứ không full sprites. Chuyển động chỉ một key pose tĩnh, không full animation.

Tái tạo: `python assets/concepts/quy-stage1/task34-stage-a/final-pixel-pass/build_studies.py`. Source art không import vào game. measurements.json là số đo thăm dò, không production manifest/save/catalog; không IDs runtime mới. Màu cyanIII là minh họa cục bộ, không hiệu ứng gameplay.

| Tệp | Kích thước | Mode |
| --- | --- | --- |
| [lineage-light-dark-check.png](lineage-light-dark-check.png) | 1220×770 | RGB |
| [stage1-light-dark-comparison.png](stage1-light-dark-comparison.png) | 1140×740 | RGB |
| [stage1-s-64x64.png](stage1-s-64x64.png) | 64×64 | RGBA |
| [stage1-se-64x64.png](stage1-se-64x64.png) | 64×64 | RGBA |
| [stage1-se-64x80.png](stage1-se-64x80.png) | 64×80 | RGBA |
| [stage1-swim-key-64x80.png](stage1-swim-key-64x80.png) | 64×80 | RGBA |
| [stage2-lineage-preview.png](stage2-lineage-preview.png) | 96×88 | RGBA |
| [stage3-lineage-preview.png](stage3-lineage-preview.png) | 112×104 | RGBA |
| [swim-key-comparison.png](swim-key-comparison.png) | 1080×540 | RGB |

Concept art đã được duyệt về nguyên tắc khác pixel study đang chờ duyệt và khác production-ready sprite. Chưa có production sprite mới. Không Task34B, runtime integration hoặc Task35. Quyền/phê duyệt phát hành không được suy từ việc có file PNG.
