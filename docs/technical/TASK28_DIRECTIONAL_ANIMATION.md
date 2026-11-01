# Hướng tám chiều và fallback tường minh

[RenderPrimitives](../../src/island/RenderPrimitives.mjs) nhận facing vector độc lập với movement/controller. Trục y màn hình tăng xuống: e(1,0), se(1,1), s(0,1), sw(-1,1), w(-1,0), nw(-1,-1), n(0,-1), ne(1,-1). `direction8` dùng atan2 và sector 45 độ; điểm giữa sector theo Math.round. Vector zero giữ stationary direction do caller chọn, mặc định `s`; dữ liệu không hữu hạn bị từ chối. Renderer không normalize input hoặc đổi tốc độ.

`resolveDirectionalClip(direction, directions, clips, fallbacks)` nhận mapping hướng → `{clipId, mirror?}` và danh sách clip có ID. Mapping chính xác được ưu tiên; hướng thiếu chỉ đi qua chuỗi fallback được khai báo. Không tự chọn nearest/cardinal/idle hoặc sprite loài khác. Vòng fallback, đích thiếu, clip không tồn tại và mirror không boolean đều báo lỗi.

Kết quả giữ riêng `requestedDirection`, `visualDirection`, `clipId`, `mirror` và `fallbackUsed`. Visual fallback không ghi đè combat facing/hitbox. Caller phải chọn fallback giữ silhouette và không làm sai thông tin hướng tấn công. Chỉ mirror khi metadata cho phép, không tự mirror loài bất đối xứng.

Task 27 hỗ trợ frames/anchor/bounds/clips/requiredClips. Mapping hướng của Task 28 là API render bổ sung, **chưa phải schema persisted hoặc creature catalog**. Không đăng ký clip giả hoặc dùng Phượng thay required asset Quy bị thiếu.

Phượng vẫn dùng bốn hướng logic hiện hữu và mirror hướng phải theo metadata cũ; keyboard diagonal không đồng nghĩa có sprite tám hướng. Timing và controller không đổi. Fixture chỉ chứng minh API; production animation Quy vẫn thiếu. API tám hướng sẵn sàng không có nghĩa tám hướng sprite đã có.
