# Logical pixel, CSS, DPR và snapping

World x/y và camera có thể là float. Renderer làm tròn vị trí và camera độc lập; không ghi tọa độ đã snap trở lại gameplay. `worldToScreen` trả `round(world) - round(camera)`, tương thích pipeline hiện hữu; không thay bằng `round(world-camera)` khi có phần lẻ.

| Đơn vị | Quy ước hiện tại |
| --- | --- |
| World unit | Tọa độ gameplay/collision 2D; một đơn vị tương ứng logical pixel trước camera |
| Canvas backing pixel | Kích thước do viewportPlan tính; không cố định 640×360 |
| CSS pixel | Backing nhân integer scale, tỷ lệ x/y bằng nhau |
| Device pixel | CSS nhân DPR; hiện không tự nhân backing resolution theo DPR |
| Source pixel | Kích thước atlas độc lập: Phượng dùng frame 96px, tile Dawn 32px |

Giữ `imageSmoothingEnabled=false` và CSS `pixelated`. viewportPlan chọn scale nguyên tối thiểu 2, giới hạn theo world và tùy chọn zoom hiện hữu. Layout phủ visualViewport; phép ceil có thể tạo phần dư nhỏ bị crop, không thêm letterbox hoặc kéo giãn khác tỷ lệ. Không bổ sung Fullscreen API; kiểm thử phủ viewport không có nghĩa kiểm thử fullscreen hệ điều hành.

`prepareSpriteFrame` kiểm tra và clone/freeze rect, anchor, visual bounds một lần. `drawPreparedSprite` đặt đích tại `round(position-anchor×scale)` với scale nguyên dương; mirror phải khai báo. Bounds hình ảnh không trở thành collision shape. Các offset hurt/action và hover của Phượng được giữ trước helper.

Đã kiểm thực tế DPR 1/2 và resize dọc/ngang; so pixel Canvas với drawImage tham chiếu. Chưa kiểm zoom trình duyệt phân số, DPR 1.25/3 hoặc thiết bị thật. Không đổi camera interpolation, thêm screen shake hay artificial lag; tuning camera thuộc Task 44.
