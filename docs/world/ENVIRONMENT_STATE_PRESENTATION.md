# Hợp đồng trình bày trạng thái môi trường

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Không tạo map/tile/sprite/audio/lighting asset trong Task07. Các references thực có và gaps xem [asset register](../ASSET_REFERENCE_REGISTER.md), [Sacred art requirements](../creatures/SACRED_ART_REQUIREMENTS.md). Map Dawn hiện có không được nhận là bốn chapter maps đã hoàn chỉnh. Chưa có atlas/anchor/clip production đủ cho các cảnh thay đổi dưới đây.

## Presentation contract cho mỗi region-state profile

| Thành phần | Input / yêu cầu | Phân loại / validation |
| --- | --- | --- |
| Base environment | Map/layer IDs thực sau khi có, geography/anchors/clearance | Dùng base chung, không invent đường dẫn production |
| Persistent modifications | PatchId, owner predicate, layer/object targets, revision | Rebuild từ authoritative state; không apply cộng dồn mỗi load |
| Conditional objects | Receiver/cầu/cửa hiện khi predicate đúng | Một objectId/instance, interaction predicate khớp quest |
| Conditional obstacles | Collision/hazard/navigation mask cùng snapshot | Không chỉ đổi ảnh mà quên physics hoặc ngược lại |
| Conditional creatures | Habitat rule và unique actor outcome | Coverage, relocation boundary và không duplicate |
| Ambient effects | Dòng hạt, bụi/hơi/lá, intensity profile | Cosmetic tái tạo; không lưu particle frame |
| Lighting | Palette/contrast cue theo profile | Cue vẫn rõ khi low effects; không darkness khiến không đọc route |
| Sound cues | Vị trí loop, transition cue, navigation warning | Missing production, không gameplay gate chỉ bằng âm thanh |
| Navigation | Enabled edges, return edges, safe anchors, envelope budget | Test available forms, boss lock và interruption trước commit |

## Presentation theo chương

| Vùng | Dormant / crisis | Đang phục hồi | Sau ổn định / navigation delta |
| --- | --- | --- | --- |
| hai_uyen | Coral đẹp xen ruins, dòng ngắt, pressure warning | Hồi lưu từng nhánh, receiver sáng theo hành động | Kênh chính sáng/âm đều, cửa surface mở, trench nguy hiểm còn |
| nhat_diem | Rừng/basalt/vent cục bộ, không toàn lava | Vent test có ranh giới/cue, bypass nguội giữ | Updraft + landings, refuge basalt/mạch nước không mất |
| phong_van | Cloud valley/bridge/corridor rời, wind cue lệch | Node synchronization có cadence, lane từng đoạn | Main wind corridors đều, storm pockets còn; return platform ổn định |
| van_sinh | Vườn nổi/rễ/ruins sinh học đứt mối, khác đảo trời | Cây hồi trên mô còn sống, cầu local và partners | Mosaic native/adapted viable, gate cue bốn nhịp; không mọc cây bịt đường về |

## Boundary, accessibility và ngân sách

Collision/nav/hazard/conditional interaction chuyển cùng world revision; cosmetic crossfade có thể trễ nhưng phải giữ cảnh báo trước nguy cơ. Nếu không preload được lớp art, giữ presentation an toàn từ revision cũ hoặc fallback placeholder đã duyệt trước khi cho vào, không dùng ảnh trống che hazard. Thiếu required production animation/geometry thì encounter chưa release-ready; không lấy concept sheet làm sprite animation.

Chọn patch/layer tái dùng, object có state, palette và loop variation thay bản map riêng mỗi phase. Chi tiết animation timing/lighting budget/độ dài wind lane UNRESOLVED cần prototype web và art review. Giảm particles vẫn giữ silhouette, boundary, indicator; hướng màu kèm hình/chuyển động, không chỉ colored doors. Persistent update không phát lại toàn cinematic khi reload; memory replay không thay world state.
