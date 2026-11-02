# Hệ thống chiến đấu thời gian thực — Task14

Ngày 31/10/2026 (Asia/Saigon), baseline `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`. Chỉ thiết kế/tài liệu. [Decisions](TASK14_DECISIONS.md) giữ trạng thái; [audit](TASK14_CONSISTENCY_AUDIT.md) là mục lục bàn giao. Mọi mechanics mới trong Task14 là **PROPOSED**, kể cả câu quy phạm trong hợp đồng ứng viên. Không thông số cuối hoặc kết quả playtest mới.

## Trụ cột

CONFIRMED D01/D05–07/D31/D39/D41: trực tiếp điều khiển thời gian thực; tối đa ba dạng khả dụng, một active; boss khóa thành viên nhưng vẫn switch trong bộ; tiến trình riêng; khác biệt loài; definitions/reusable modules; không bắt đủ ba dạng/ba nguyên tố ở đầu game. Cấp/rarity không thay việc chọn vị trí, đọc telegraph và timing.

PROPOSED C14-P01: quan sát → di chuyển/chọn góc → commit đòn hoặc thủ → đọc hit/miss → tận dụng recovery → cân nhắc switch. Encounter đầu có warning, khoảng sửa sai và đường rút; main story không frame-perfect. Không auto-combat hoặc combo dài bắt buộc. Balance theo damage, survivability, mobility, reach, control, support, resource efficiency, execution difficulty và environmental utility; một strength phải có cost/window/counterplay. Không claim đã cân bằng.

## Camera, mặt phẳng và evidence

| Lớp | Evidence / quyết định |
| --- | --- |
| Runtime | `src/island/main.mjs`, `IslandScene.mjs`: Canvas 2D/ES modules/requestAnimationFrame. `PlayerPhoenix.mjs`: vector x–y normalize. `Camera.mjs`: follow/clamp, làm tròn lúc render. Map nhìn từ trên xuống, không gravity/jump axis hoặc phép chiếu isometric trong controller |
| Terrain | `geometry.mjs`: grid/radius samples, substeps/trượt theo trục; nước/cliff chặn cả hover. Cao độ qua tile/stairs, chưa z combat; hover tăng tốc/tránh gai, chưa bơi/lặn |
| Approved target | 2D pixel realtime browser-first; Quy I/underwater sample D40; production projection/depth combat chưa chốt |
| C14-P01 | Giữ world x–y để thử combat; aim vector độc lập số hướng sprite. Tách movementMode/surfaceLayer/capabilities, không bay = bỏ collider |
| C14-U01 | Production camera/projection, bơi/lặn/depth lanes, giao nhau trên/dưới cầu, giới hạn bay, aim adapter/navigation layer còn mở. Nếu plane khác, giữ action/damage/owner contracts và đổi adapter sau approval |

Aim lấy hướng input hợp lệ cuối nếu không có aim riêng; không tự homing/lock-on. Hit shapes/projectile dùng world space và eligible layer; render offset không đổi reach. Quantize hướng chỉ cho sprite; diagonal không dài hơn. Enemy nav dùng footprint/capabilities/layer và LOS thật. Bay/bơi có route/landing/return hợp lệ, không xuyên mọi vách. Vertical movement chỉ qua authored connector; layer ảnh hưởng hit phải có rule/cue trước implementation.

## Integration và balance guards

Nguồn cũ giữ authority: [R03 transformation](../gameplay/TRANSFORMATION_DESIGN.md), [E09 data](../technical/ELEMENTAL_DATA_SPEC.md), [E10 data](../technical/DUAL_ELEMENT_DATA_SPEC.md), [V13 loadout](../evolution/EVOLUTION_AND_LOADOUT.md), [W07 transactions](../world/WORLD_STATE_TRANSITIONS.md). Task14 là combat-side interfaces, không store mới/approval nguồn cũ.

Guard hở sườn và finite hold/recovery; CC có family recovery; heal finite không reserve loop; mobility có landing/route/recovery; switch không xóa recovery; dual skills chia budget, không nhân base; boss có đường thắng bằng main forms đã mở; rarity không coefficient damage. Đây là nguyên tắc thiết kế, chưa playtest.

Runtime Phoenix giữ nguyên: melee tức thì trong SkillSystem.use, fire charge/projectile, target tĩnh, regen/respawn; chưa AI/form switching/generic phases. [Quy slice](COMBAT_VERTICAL_SLICE.md) là combat demonstrator, không toàn first playable D40. Không thay controller. Task15 chưa bắt đầu.
