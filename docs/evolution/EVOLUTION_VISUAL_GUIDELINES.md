# Giải phẫu và silhouette qua tiến hóa

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Rubric phát triển — V13-P04

Kế thừa [Bible](../creatures/CREATURE_DESIGN_BIBLE.md) và [visual standards](../creatures/CREATURE_VISUAL_STANDARDS.md), không thay approved identities hoặc biến điểm rubric Task12 thành phê duyệt. So từng stage trước/sau trong cùng lineage, đồng thời so với các loài khác để không tiến hóa thành bản sao Sacred khác.

| Category | Câu hỏi review | Evidence cần |
| --- | --- | --- |
| Body proportions | Khối đầu/ngực/hông/eo có phát triển chức năng thay scale đều? | Orthographic/pose so cùng display scale |
| Head | Face planes/đầu/mào trưởng thành mà vẫn cùng species? | Mắt/hàm/mỏ đọc trong mọi hướng |
| Limbs | Chi/khớp chịu lực/bơi/đáp thay đổi đi cùng hành động? | Contact/stride/turn extrema |
| Wings | Cấu trúc lông/màng/sải và bank có ý nghĩa? | N/A với loài không cánh, không gắn cánh để đủ rubric |
| Tail | Đà/định hướng/phân nhánh khác nhưng continuity rõ? | Turn/attack/landing không crop |
| Shell | Kênh/viền/mặt lực mai phát triển rõ? | N/A nếu không mai; Quy không snake-wrapped copy |
| Antlers or horns | Nhánh/khối/khoảng âm hỗ trợ identity thay thêm trang sức? | Ly khác hươu thường, Long sừng gắn head anatomy |
| Distinctive appendages | Cơ quan biểu đạt nguyên tố có chức năng/source? | Không chỉ glow, thêm hệ hoặc overload chi tiết |
| Movement posture | Trọng tâm/nhịp/hãm/đổi hướng phản ánh anatomy mới? | Animation blocking, không identical gait phóng to |
| Overall silhouette | Vẫn cùng lineage nhưng hai stage có quyết định thị giác riêng? | Black-fill/grayscale/color, FX off/on, small gameplay scale |

Mỗi stage cần nhiều khác biệt giải phẫu có ý nghĩa, **không đặt số thay đổi tối thiểu cứng**. Đánh dấu N/A có lý do, không bắt vây mọc sừng/cánh để đủ số. Kết luận đề xuất: `insufficient`, `needs_revision`, `reviewable`, `approved_by_source` chỉ khi có approval evidence; không tính điểm khách quan hoặc chấm ảnh chưa có.

## Quy trình review

Giữ primary concept/head grammar/material palette xuyên stage. Chọn các pose cùng hướng tại display size dự kiến và native/integer scale; xem nền vùng sáng/tối/nhiễu. Kiểm negative space ở idle/move/turn/attack extrema; che FX vẫn nhận anatomy và head direction. Tách novelty bằng anatomy khỏi novelty do shader/particles. Art/gameplay review cùng xác nhận cấu trúc mới hỗ trợ gameplay delta, content review kiểm cost/clip/route impacts; ghi revision/source và phần chưa rõ trước production approval.

Phượng giữ ivory/cream–gold–crimson, wings/flowing tail theo reference được duyệt; không mapping atlas hiện tại sang stage III. Long elongated S từ stage I, đọc head/horns/mane/claws/tail qua mây, không “giun rồi mọc rồng”. Ly gạc/nhánh/guardian mass khác deer và wildlife IV; Quy cấu trúc mai/chi aquatic rõ. Art missing không được chấm PASS silhouette.

## Kích thước và route contract — V13-P06, C04-P07 vẫn PROPOSED

| Thành phần | Yêu cầu thiết kế để prototype sau |
| --- | --- |
| Visual bounds | Envelope theo direction/posture/action gồm thân thật; FX/mây tách riêng |
| Movement footprint | Ground/water support hợp anatomy, không tự cả bounding rectangle của hình |
| Collision geometry | Quy tắc tĩnh/động/terrain và turn phải đọc được; chưa chọn collider/segmentation engine |
| Hurtboxes | Body có thể nhận hit, không FX; chuyển stage không tạo miễn hit/nhận double body |
| Attack hitboxes | Phase/action markers đúng geometry; tăng sải không tự tăng reach mọi skill |
| Camera framing | Thấy head/telegraph/landing; culling/depth không cắt body dài hoặc che hazard |
| Anchors | Điểm neo/core/foot contacts ổn qua hướng/clip, root motion cần explicit contract |
| Clearance | Sweep cả visual body/appendages/turn ở pose cần dùng, không chỉ core radius |
| Doorways | Kiểm entry và đường về sau commit, không cho vào rồi buộc downgrade |
| Narrow passages | Compact posture chỉ khi có approved art/module và clearance; hoặc route thay thế/safe point; không crop chi hay noclip |

Có thể đề xuất scale envelope trong giới hạn mật độ pixel/scene đã review để giữ uy nghi mà không phá nav, không resize tùy ô cửa hoặc làm sprite mềm. Geometry/render solutions cụ thể, world topology, size/scale budgets và kỹ thuật Long segment rig vẫn chưa approved; current 32px tiles/96px Phoenix cell là facts, không kích thước bắt buộc mọi stage. Không đổi maps, sprites hay colliders Task13.
