# Collision độc lập và chiều sâu thị giác

**CONFIRMED D29-MAP-01:** world và collision 2D; three-quarter là presentation. Background, terrain, overlap, depth anchors và foreground biểu đạt chiều sâu; không thêm physics Z, đổi hitbox theo elevation hoặc skew Canvas.

Map mới có collision.cells boolean và rects riêng. `isSolidAt` trả true ở ngoài map, tọa độ không hữu hạn, cell solid hoặc rect solid; rect/cell dùng biên trái/trên đóng, phải/dưới mở. Đổi tile, ẩn layer hoặc fade không đổi collision. Nước trong fixture là passable theo cells, không theo chữ water hoặc màu xanh. Object lớn có visual rect nhưng không tự sinh collider; partial solid có thể author bằng rect riêng. Marker/interaction boundary hoặc hazard cần consumer tương lai, không tự damage/complete quest.

Legacy [geometry](../../src/island/geometry.mjs) giữ nguyên: Dawn deep/shallow/cliff/rim vẫn chặn, sand inset và trunk/rock/collider radius không đổi. Không chuyển global water thành passable. Query mới chỉ kiểm một điểm; chưa phải solver swept/body footprint. Spawn được kiểm point containment, chưa chứng nhận clearance cho Quy hoặc evolved body. Task 45 phải kiểm footprint, corner, long step và motion/current integration trước production.

Depth phase gộp scenery và render views actor dùng compareRenderDepth Task 28. Object dùng depthY nếu có, còn lại y; thứ tự layer/object tạo tie-break ổn định. Actor cung cấp renderOrder nguyên không âm và unique trong actor list; tại cùng depth objects đứng trước actors. Focus actor có visible bounds riêng cho fade, không biến visible bounds thành collision/hurtbox.

WorldLayer và adapter mới dùng chung visibleCells; chỉ duyệt vùng camera, không sort static tiles mỗi frame. Layer order được cache khi tạo. Depth list vẫn được sort mỗi draw; chưa benchmark nên không khẳng định tối ưu FPS. Object chỉ vẽ nếu visual bounds giao viewport. Camera x/y được làm tròn khi vẽ, không ghi trở lại actor; cameraBounds là metadata, không sở hữu camera state hoặc thay Camera follow/clamp hiện hữu.
