# Feedback, animation và đọc telegraph

**PROPOSED C14-P09**, kế thừa [B12 animation standard](../art/CREATURE_ANIMATION_REQUIREMENTS.md), [V13 asset contract](../evolution/EVOLUTION_ASSET_CONTRACT.md). Không thêm UI, sprite, SFX hoặc animation.

| Result | Body/FX | Audio/camera/UI concept | Constraint |
| --- | --- | --- | --- |
| Successful hit | Contact pose + localized flash/impact | Impact ngắn, optional number | DamageResult một lần, không mỗi overlapping shape |
| Blocked | Guard contact/sector ripple | Block sound/icon khác hit | Phân biệt mitigation/zero damage và status resisted |
| Powerful/critical candidate | Heavy anticipation/stronger impact rõ | Accent âm, camera response nhẹ | Không tự approve critical RNG hoặc huge shake |
| Elemental reaction | Source→path→output silhouette | Cue nguyên nhân/icon nếu cần | Output không che actor/hazard edge hoặc strobe |
| Status applied | Small anchored motif/icon, expiry cue | Application/removal distinct | Không chỉ palette; shared/form-bound đúng body |
| Stagger | Mất trụ→recover | Cue control break | Không cùng mọi damage flash, không camera lock |
| Knockback | Motion/contact-to-stop | Va chạm cue nếu explicit | Không sprite tách hurtbox hoặc damage wall ngầm |
| Invulnerable scope | Pattern/outline ngắn theo subwindow | Reject feedback tùy phạm vi | Không hiểu mọi damage/hazard miễn chỉ vì blink |
| Defeat | Incapacitation/outcome pose | Âm kết thúc/clear threat cue | Không tự canon death/resurrection hoặc cấp reward từ FX |

Crisp pixels: nearest sampling/integer render, alpha/anchor/gutter đúng; simulation float không snap movement. Giới hạn particles/flash/shake theo visibility priority: actor/contact > warning boundary > secondary FX. Cho giảm shake/flash/FX; không color-only, không yêu cầu âm thanh để sống sót. Floating numbers optional, aggregate/cap và không che telegraph trên mobile. Timing/audio priority và device budgets chưa có số hoặc physical-device verification.

## Telegraph standards

| Attacker | Trước commit | Lock/active/recover | Counterplay/readability |
| --- | --- | --- | --- |
| Small melee | Posture/co người + facing/lane | Hướng chốt trước contact, hụt có recovery | Bước lệch/sườn; cue không bé hơn khả năng đọc ở gameplay scale |
| Ranged | Nguồn nạp/aim line hoặc projectile wind-up | Lane khóa trước release, đạn có silhouette/speed readable | Cover/đổi lane; offscreen attack cần warning, không snap homing |
| Flying | Shadow/ground projection + dive lane/điểm đáp | Dive commit rồi landing recovery | Né lane/đón điểm đáp, không trúng bởi altitude khó thấy |
| Large boss | Body pose + zone shape/pulse/audio | Pattern pha có lock marker và khoảng punish | Edge/exit rõ ở mobile, không mọi đòn phủ arena hoặc tracking đến contact |
| Environmental hazard | Source/chu kỳ/edge và safe route | Active pulse rồi decay rõ | Rời vùng/cắt nguồn/chờ nhịp, không màu nền là cue duy nhất |

Không đồng nhất preview với damage zone chưa active. Nếu tracking trong startup, cue cũng cập nhật; sau commit không xoay đòn bất ngờ. Có obstruction/offscreen rule và finite attack concurrency để luôn còn lời giải. Thiết kế timing là C14-U04/U08 chờ prototype, không số milliseconds giả.

## Missing production coverage

[ASSET_REFERENCE_REGISTER](../ASSET_REFERENCE_REGISTER.md) và [SACRED_ART_REQUIREMENTS](../creatures/SACRED_ART_REQUIREMENTS.md) tiếp tục sở hữu AG-Q1–AG-Y3; không tạo gap IDs cạnh tranh. Phoenix atlas actual 192×288, hai pose/hướng ở ba rows/right mirror; sáu controller states không sáu full action clips. Quy I chưa có production movement/basic/brace/water skill/hurt/incapacity bộ đủ; Long segmented turn/hurt/lane và Ly support action cũng chưa certified. Cần actual references, stage anatomy, direction/anchor/markers, source/FX/SFX provenance và playback trước runtime-ready. Không lấy concept sheet hoặc idle-as-attack làm clip validated.
