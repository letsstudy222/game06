# Overlay và visual helpers opt-in

Bật local/development bằng `?debug=1`; thêm `&debugVisuals=1` để vẽ geometry. Có thể kết hợp `?sample=1&debug=1` theo route sample hiện hữu, nhưng tests Task 32 tập trung Dawn. Không lưu cờ debug vào UI settings hoặc gameplay save. URL không có debug=1 không import module debug, không tạo overlay/global API/listeners mới.

API chỉ xuất hiện khi bật: `window.IslandDebug.snapshot()` và `dispose()`. Không setter actor, reward, HP, checkpoint hoặc writer. Diagnostics nội bộ là bộ nhớ hữu hạn 128 records, throttle cùng category/code trong 1 giây; profiler giữ 120 frame samples. DOM readout cập nhật tối đa khoảng 4 lần/giây, không log mỗi frame. Category/severity/code dùng constants; context chỉ numeric allowlist và scene IDs kỹ thuật đã biết. Error chỉ giữ name/code an toàn, không message/stack/raw object.

| Metric hiện có | Nguồn/giới hạn |
| --- | --- |
| FPS estimate / frame delta | RAF timestamps trong cửa sổ mẫu; không là performance acceptance threshold |
| Update/render/HUD/debug duration | performance.now tại các ranh giới trong main khi opt-in |
| Scene/camera/player/tile | Đọc runtime Dawn và Camera snapshot hiện hữu |
| Movement | Vector thô từ legacy input.sample, không tự normalize hoặc điều khiển actor |
| Input context | legacy-gameplay hoặc pause, không giả SemanticInput đã thay Dawn |
| Assets / actor / tile draws | Số resource đang tải, player hiện hữu và WorldLayer.drawCount; không phải heap bytes |
| Aim/current/save | Chưa tích hợp vào Dawn, hiển thị unavailable; không mở IndexedDB để lấy số liệu |
| Warnings | Ba diagnostic records gần nhất không thuộc info, đã redaction |

Panel inert, aria-hidden, pointer-events:none; không có hotkey hoặc control giành focus. Giới hạn chiều rộng theo viewport và cao 42vh, có thể cắt bớt text trên màn nhỏ thay vì đẩy UI khỏi viewport. Debug Canvas riêng có backing/CSS bounds khớp Canvas game, không sửa pixel của Canvas gốc.

Visual helpers hiện có: tile grid theo vùng nhìn, cross tại movement anchor, circle radius hiện hữu của player và viền viewport. Circle không phải full collision proof: shore/trunk/rock tests dùng geometry gốc riêng; không suy sprite rect thành collider. Current/layer/occlusion diagnostics khác được kiểm bằng fixture Task 29, chưa thêm tổng render graph hoặc boss telegraph ở đây.

Factory ngăn double install cùng document và chỉ thêm một panel/two error listeners; dispose idempotent tháo listeners/DOM/global view. Re-enable để gắn lại game loop nên reload URL opt-in; kiểm lifecycle scope không đồng nghĩa scene manager Task 47 đã có. Tất cả view/geometry chỉ đọc; debug startup failure không tự heal/save/đổi scene.
