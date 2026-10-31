# Hierarchy, camera và định danh Hải Uyên

**PROPOSED H19-P01/P02.** [W07 architecture](../world/WORLD_STATE_ARCHITECTURE.md) giữ authority, [C14 camera/plane](../combat/COMBAT_SYSTEM_OVERVIEW.md) và [Quy movement](QUY_UNDERWATER_MOVEMENT.md) giữ mechanics. Runtime [Camera](../../src/island/Camera.mjs) follow/clamp x–y và integer render; [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs) không axis 3D. Production projection/depth vẫn C14-U01, H19-U01, không suy từ đề bài.

## Camera alternatives

| Mô hình | Bơi/depth/collision/room | Giá trị / dependency |
| --- | --- | --- |
| X–y nhìn từ trên xuống | Input hai chiều trên layer nước, depth biểu diễn bằng palette/occlusion và connector authored; collision/aim cùng world plane | Khuyến nghị prototype, gần runtime nhất, không gravity/jump axis; cần water geometry/occlusion/camera envelope extension |
| Side-view | Bơi ngang/dọc màn hình, depth có thể đọc tự nhiên hơn nhưng perspective/aim khác | Phải đổi controller/map/collision/render adapter và art directions; chưa được chọn |
| Isometric | Plane x–y logic có thể giữ, projection/occlusion/hit cues cần transform rõ | Tăng art/precision/large-body complexity; chưa được chọn |
| 3D tự do | Thêm trục, camera, physics và layer targeting mới | Ngoài browser-first 2D baseline, không đề xuất cho Task19 |

Khuyến nghị x–y **không approval production**. Background lớp xa/trung chỉ tạo depth, không route vô hình; connector biểu diễn xuống sâu/trồi lên đổi area/layer có arrival anchor hợp lệ, không cho input tự bơi xuyên mọi tầng. Current vector cùng gameplay plane, collision sweep và obstacle resolution trước publish motion; camera offset/render lift không đổi reach. Evolved Quy phải validate envelope/turn/occlusion trong room và viewport, không lấy camera crop che thiếu chỗ. Layer cắt qua cầu/ruins cần hit eligibility/LOS rule riêng trước implementation.

## Các cấp và ID conventions

| Cấp | Ví dụ / quan hệ | Identity và state |
| --- | --- | --- |
| World | Setting Tứ Linh Khởi Nguyên; `world_origin_arc` là scope global W07 sẵn có | Không tạo hành tinh hay global save store thứ hai; map worldDefinitionRef cần bind catalog sau duyệt |
| Chapter | `chapter_01`, tên Vực Hải Uyên | Giữ ID S05/W07, E06 boundary còn chapter_01 nhưng region đến nhat_diem |
| Canonical region | `hai_uyen` | Giữ một RegionState W07, không thay bằng các design regions con |
| Design region | `hy_reg_refuge`, `hy_reg_channels`, `hy_reg_returns` | Phân nhóm ecology/streaming của thiết kế, tất cả canonicalRegionRef hai_uyen; không sở hữu stable flags riêng |
| Zone | `hy_zone_sanctuary` … `hy_zone_exit` | Chín zone IDs ở graph, unique stable draft IDs, không display name/path/tọa độ làm key |
| Room/area | `hy_room_<zone>_<purpose>` | Room instances thuộc một zone; chia room sau blocking, không xác nhận đã có scene files |
| Landmark | `hy_lm_<purpose>` | Ví dụ hy_lm_shell_arch; shape/hint ref, không progression source |
| Connector | `hy_conn_ab` … | ID cạnh typed, hai endpoints/anchorRefs/capability/predicate/return policy; không eventId |

Naming thay đổi không đổi logical ID; alias migration có provenance nếu cần rename thật. Display names tiếng Việt đề xuất, technical keys tiếng Anh không hiển thị như lore. `opening_z01–06` Task17 giữ nguyên như localAreaRefs bên trong A, không rename thành event/room authority mới: z01–03 nhận cảm/sanctuary, z04 bơi, z05 receiver, z06 cửa A–B. Xem [opening handoff](OPENING_LEVEL_HANDOFF.md).

Không tất cả world state trong mega-scene. Zone/room là content units; loader tương lai có thể tải nhóm A/B gần, B/D, C/E/G, H, I; F optional. Conditional layers đọc cùng revision W07, không mỗi phase sea_* là map riêng. [Map data](../technical/CHAPTER1_MAP_DATA_SPEC.md) định nghĩa fields/validation, không loader hoặc JSON sản xuất.
