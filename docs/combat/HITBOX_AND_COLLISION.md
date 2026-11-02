# Hitbox, hurtbox và collision

**PROPOSED C14-P08**, mở rộng review của **C04-P07 vẫn PROPOSED** tại [C04 matrix](../creatures/SACRED_EVOLUTION_MATRIX.md), không collision changes.

| Bounds | Purpose / owner | Không đồng nhất với |
| --- | --- | --- |
| Visual envelope | Render/culling/occlusion của body+approved posture | Không tự damage toàn phần đuôi/wing FX |
| Movement footprint | Navigation/solid collision, movement profile | Không lấy sprite rectangle làm passability |
| Hurtbox | Eligible damage recipient zones, actor/body profile | Không mỗi segment một HP store/hit reward |
| Attack hitbox | Shape active window theo attack/marker/direction | Không vệt particle còn nhìn thấy sau active |
| Projectile collider | Swept shape, blockers và recipient hit rules | Không chỉ sample điểm cuối gây tunneling |
| Environmental interaction bounds | Receiver reach/contact/permissions | Không combat range auto mở cửa |

## Suitability theo anatomy

| Subject | Candidate geometry / kiểm cần |
| --- | --- |
| Small creature | Core footprint/hurt shape rõ hơn decorative parts; minimum visible contact cue, không invisible pixel target |
| Large evolved | Stage-specific bounds/anchors/turn clearance; không chỉ scale mọi hit/reach theo sprite; routes/camera phải đủ chỗ |
| Long serpentine | Core + segmented render/hurt candidates cùng combatantId/ledger; body sweep khi quay, không tail xuyên wall; cần prototype để chọn segment policy |
| Flying | Ground projection + movement layer/collision rõ; wings không tạo immunity; landing space kiểm trước commit |
| Swimming | Swim/depth capability và layer filter; water visual không chứng minh oxygen/depth model hoặc immunity |
| Boss | Multi-zone hurt candidates nhưng một actor HP owner; weakpoint/phase filters explicit, không nhân hit vì nhiều zones |

## Alignment và debug contract

Definition gắn stage/action/direction/posture/contentVersion, anchor basis và local shape offsets; chuyển world shape theo actor position/facing và logical marker, không dùng camera offset. Mirror chỉ khi anatomy/handedness đã review; origin/offset mirror cùng nhau, không kéo reach diagonal. Timing của shape mở/đóng theo simulation, render interpolation không kéo dài active window. Root motion đi qua sweep giống input motion, không animation teleport.

Đổi form/evolution kiểm footprint, visual/turn clearance và đường về theo policy V13; không shrink body khi gần cửa hoặc dùng small-body clip cho evolved form. Nếu không có posture/route compatible thì block/defer trước commit, giữ progression và source hợp lệ; lỗi sau load đi safe recovery đã duyệt, không noclip. Không sửa map/art để “vừa” trong Task14.

Debug visualization tương lai phải toggle riêng visual envelope, footprint, hurt shapes/IDs, attack/window/rootCastId, projectile swept path/first collision, facing/anchor/layer/LOS/nav và block reason. Overlay không ghi source of truth mới; cần ảnh/trace đúng tick để so animation contact với result. Geometry validation: finite coordinates, positive dimensions, resolved anchor/module refs, swept collision cho fast motion, all shapes cùng target key dedupe, bounds không vượt approved anatomy/telegraph. Không có debug overlay hoặc benchmark mới trong task này.
