# Quy ước three-quarter được duyệt

**CONFIRMED theo phê duyệt trước Task 28 và mục 1 của yêu cầu Task 28:** top-down 2D three-quarter, góc hơi cao; fantasy pixel art chi tiết với bảng màu, ánh sáng và chiều sâu có chủ ý; di chuyển tám hướng chuẩn hóa; Quy có quán tính nhẹ nhưng phản hồi tốt; ưu tiên silhouette, telegraph và safe lane; hướng di chuyển tách khái niệm khỏi attack-facing; giữ Canvas2D, world 2D và Dawn mặc định.

Phê duyệt mới thu hẹp các câu hỏi về hướng nhìn và hướng di chuyển trong tài liệu lịch sử Task 25–26, không chốt các giá trị tuning. Reference A là cảm hứng chất lượng được chọn; B chỉ minh họa góc nhìn. Ảnh gốc không có trong lượt này nên không tuyên bố đã xem lại hoặc đạt chất lượng tham chiếu.

Dodge/dash vẫn **PROPOSED**. Tốc độ, gia tốc, giảm tốc, lực dòng chảy, collision dimensions, sprite/atlas layout, timing và camera tuning còn **UNRESOLVED**. Visual reference cuối của Quy chưa được duyệt.

## World plane và presentation

Giữ orthographic mapping 2D. Góc nhìn three-quarter thể hiện qua anatomy sprite, mặt đứng props/terrain, bóng và overlap; không skew Canvas, đổi tọa độ thành isometric hoặc thêm trục z gameplay.

Anchor là điểm di chuyển/tiếp xúc trên world plane; phần thân và đầu có chiều cao thị giác phía trên nó. Quy có thể dùng swimming anchor thay footpoint, nhưng chưa chọn tọa độ thật trước art được duyệt. Frame rect và visual bounds độc lập với collision footprint. Shadow có anchor và quy ước nguồn sáng riêng; không là hitbox.

Depth-sort dùng anchor `depthY`, không dùng đỉnh hình ảnh. Cây, san hô và phế tích cao có thể vẽ trước actor mà không đổi x/y vật lý. Phượng giữ art, hai pose mỗi hướng, hover shadow và canopy fade hiện hữu. Task 28 không tạo artwork, underwater scene hoặc gameplay Quy.
