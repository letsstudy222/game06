# Hợp đồng tài nguyên theo stage

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Nguồn và readiness — V13-P11

[ASSET_REFERENCE_REGISTER](../ASSET_REFERENCE_REGISTER.md) vẫn nguồn evidence/readiness; [SACRED_ART_REQUIREMENTS](../creatures/SACRED_ART_REQUIREMENTS.md) vẫn giữ AG-Q1–AG-Y3 cho đủ 12 stage; [animation standard Task12](../art/CREATURE_ANIMATION_REQUIREMENTS.md) giữ chuẩn chung. Task13 không duplicate gap IDs hoặc tạo manifest/atlas/export mới.

Đã kiểm khả năng truy cập ảnh `assets/phoenix-3-v2.png` (1254×1254 RGBA), `assets/production/phoenix/atlas.png` (192×288 RGBA) bằng metadata đọc-only và manifest có ô96, hai pose/hướng, ba rows, right mirror. Task13 không fresh image review hoặc playback; các lần xem ảnh Tasks04/08/12 giữ evidence theo mốc. Reference giữ ngà/kem–vàng–crimson, không tự gán stage III. Quy/Long/Ly không có ảnh stage nhận diện được theo register/inventory hiện hữu; không claim đã xem external concepts hoặc tạo art thay.

## Stage production handoff bắt buộc

| Required item | Contract / evidence |
| --- | --- |
| Approved silhouette reference | Actual accessible file hoặc Missing + gap; approval scope/revision đúng stage, không tên file thay approval |
| Anatomy specification | Proportions/head/limbs/structures/contact/movement continuity theo source species |
| Main color palette | Ramp/material/contrast và identity giữ; không approved hex mới nếu chưa có |
| Dimensions or sizing constraints | Visual bounds theo direction/posture, pixel density phù hợp; không mọi stage96px |
| Required movement directions | Named directions/mirroring/asymmetry hợp anatomy, metadata thật |
| Idle | Posture/core/anchor/loop có anatomy ổn định |
| Movement | Cycles thực dùng: swim/dive/ground/leap/glide/wind...; không every species every clip |
| Attack | Anticipation/contact/recovery và effect/hit marker đúng phạm vi |
| Skills | Assigned skill/stage variants, source/target/cancel/release policy, missing required clip not ready |
| Hurt and defeat | Scope damageable/response/incapacitation, không tự revive hoặc permadeath mới |
| Optional special movement | Chỉ khi capability được duyệt và có module/terrain/return; không thêm climb/burrow main feature |
| Anchor metadata | Frame rect/dimensions, origin/offset, ground projection, timing/loop và phase markers |
| Collision alignment | C04-P07 proposals: body/FX/envelope/footprint/hurt/attack separation, sweep clearance, narrow routes/camera; phải prototype |

Mỗi record thêm stageId/speciesId/contentVersion/decisionRefs, source/master/export/provenance/license scope, required module/receiver/skill refs, unresolved gaps, validation/playback evidence. Không giả alpha/anchor/FPS từ concept sheet. Đã approved visual identity không đồng nghĩa được redesign anatomy để tiện export; stage-specific proposal phải art review riêng.

## Sáu lớp không gộp

Concept sheet là ý tưởng/pose; approved visual design là quyết định hình; individual sprite frames cần rect/alpha/anatomy/anchors; validated animation atlas còn cần timing/markers/directions và playback theo scope; runtime integration chứng minh actual loader/render/action refs; gameplay-tested evolution cần transition/geometry/combat/status/save/revisit tests thật. Không chỉ tăng số poses mà đánh production approved, không integrated legacy asset = all stage clips ready. Task12 evidence vector giữ các cấp chi tiết, không serializing một highestLevel để suy đủ mọi gate.

## Gate trước release

Validate actual refs/rects/alpha/anchors, hướng/turn/asymmetry, anatomy qua transition, small gameplay scale trên nền vùng, FX off/on, culling/depth/camera, action markers/hitboxes, passability sau evolution và save/reload interruption. Missing required action/art/module blocks target stage runtime-readiness nhưng không xóa owned stage/XP/evidence. Compatible fallback chỉ sau approval cùng anatomy/geometry/telegraph, không idle-as-attack hoặc invisible evolved form. Không sửa bất kỳ visual asset, UI, scene, manifest hoặc code trong Task13.
