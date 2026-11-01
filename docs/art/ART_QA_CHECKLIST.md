# Danh sách nghiệm thu art

Nguồn: [AB33-S02/S09–S13](ART_BIBLE_MASTER.md), [visual rubric](../creatures/CREATURE_VISUAL_STANDARDS.md). **PROPOSED AB33-P12:** tiêu chí nghiệm thu bên dưới, mở rộng kiểm tra hình ảnh chứ không thay rubric nguồn. **CONFIRMED:** QA kỹ thuật Task32 được chạy lại riêng; không có art Quy mới. **UNRESOLVED:** production QA và ngân sách thiết bị. **SUPERSEDED:** không thay lịch sử.

Mọi mục dưới là **PLANNED / CHƯA THỰC HIỆN cho art mới**. Không đánh dấu PASS vì tài liệu đầy đủ. Mỗi lượt cần asset revision, trạng thái duyệt, scene/viewport/DPR/browser, command/exit nếu tự động, ảnh hoặc quan sát thủ công và issue còn mở. Lỗi mất anatomy/cue hoặc sai canon chặn nghiệm thu, không được bù bằng điểm đẹp.

## Creature sprite

| Kiểm tra | Bằng chứng nghiệm thu cần có |
| --- | --- |
| Nhận diện/canon | Bốn hệ đúng, bỏ FX vẫn nhận loài, không gán stage/rarity theo kích thước |
| Anatomy/silhouette | Đủ gốc chi/phụ bộ, khác loài gần hình; mặt/đầu còn rõ mọi hướng |
| Góc3/4 và pixel | Mặt trên/bên nhất quán, cluster có chủ đích, không làm mờ hoặc resize giả chi tiết |
| Hướng/mirror | Tám hướng theo coverage, asymmetry/ánh sáng được duyệt trước mirror, fallback có nhãn |
| Animation | Idle seam, swim extrema, turn/transition và non-loop end đúng, không mất chi/crop |
| Anchor/bounds | Không drift hoặc double root motion, rect nằm atlas, visual/collision/hurt/attack tách |
| Nền/mobile | Sáng/tối/rối, grayscale, portrait/landscape, occlusion và FX thấp |
| Nguồn/approval | Source/export/provenance/license, silhouette/palette và scope được duyệt |

## Environment tiles

| Kiểm tra | Bằng chứng nghiệm thu cần có |
| --- | --- |
| Nối ô | Nền lặp, bờ và góc trong/ngoài không seam, cạnh không hứa đường đi sai |
| Mật độ/vật liệu | Cùng thước pixel, bóng theo nguồn, phân biệt đá/gỗ/nước/mai |
| Tile và collision | Overlay không suy solid, không giấu gate/refuge, current data độc lập ảnh |
| Transparency/atlas | Alpha sạch, không viền màu, rect/dimensions đúng; anim tile không bleed |
| Composition | Chín vùng giữ graph, optional không khóa main, camera culling/biên đúng |

## Foreground object

| Kiểm tra | Bằng chứng nghiệm thu cần có |
| --- | --- |
| Layer/depth | Gốc neo đúng, trước/sau actor không nhảy, không dùng top-left thay depth |
| Fade | Object/layer opt-in, actor visible ở nhiều occluder, alpha hồi và không rò sang HUD |
| AABB | Vùng trống không gây fade quá rộng, margin/hysteresis không nhấp nháy; không claim mask pixel |
| Gameplay | Collision giữ nguyên, telegraph/safe lane vẫn thấy, không tự chặn route bằng hình |

## Effects

| Kiểm tra | Bằng chứng nghiệm thu cần có |
| --- | --- |
| Cue thiết yếu | Hướng/vùng/phase đúng gameplay geometry được duyệt; không dùng glow làm reach |
| Readability | FX off/giảm vẫn thấy cue; màu có shape/nhịp hỗ trợ, không flash bắt buộc |
| Vòng đời | Loop/finite duration/cleanup đúng, không replay event/reward từ clip |
| Hiệu năng | Đo scene thực, reduced FX không mất thông tin, không benchmark suy diễn |

## UI

| Kiểm tra | Bằng chứng nghiệm thu cần có |
| --- | --- |
| Tiếng Việt | Đủ dấu, không crop/chồng chữ, fallback font/contrast kiểm ở size thật |
| Layout/input | Safe area, focus/touch, portrait/landscape, không che người chơi/telegraph |
| Ngữ nghĩa | Slot rỗng hợp lệ, membership lock khác switch; HP không ngầm chọn quyền sở hữu |
| Save/reward | Thành công từ authority, committed-unverified được phân biệt, không duplicate ledger |

## Bộ xem thử và điều kiện chấp nhận

**PROPOSED:** preview opt-in trước/sau nguồn sáng, nền rạn/bazan/mây/tán, actor quay tám hướng, pause/resume, scene re-entry, missing required/optional asset, nhiều occluder. Kiểm DPR1/2 và viewport đã có fixture, bổ sung physical mobile và fractionalDPR trước cam kết tương thích rộng.

Technical validation PASS chỉ là một cổng. Phải có art review và kiểm readability thực mới chấp nhận visual production. S0 minimum ở [animation](EIGHT_DIRECTION_ANIMATION_STANDARDS.md) và [Quy brief](QUY_STAGE1_TASK34_HANDOFF.md); không bắt combat/full stages cho S0. Biên bản Task33 ở [consistency audit](TASK33_CONSISTENCY_AUDIT.md) chỉ xác nhận tài liệu và baseline hiện hữu, không thay checklist production này.
