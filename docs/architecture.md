# Island prototype

Entry point: `index.html` → `src/island/main.mjs`. Thay cho màn chơi nông trại, runtime có `GameState`, `PlayerPhoenix`, `SkillSystem`, `AnimationController`, `IslandScene`, `UIHud`.

- `GameState` là đầu mối cập nhật world; `UIHud` chỉ đọc state và phát ý định hành động.
- Input nằm trong `main.mjs`. Đổi input thiết bị không đổi player/skill.
- `PlayerPhoenix` dùng move-with-collision chia substep để không đi xuyên đá khi frame chậm.
- `SkillSystem` có cooldown độc lập, đòn hình nón theo hướng nhìn và projectile có substep chống tunneling. Sát thương nằm ở logic, không gắn với số lần render frame.
- `IslandScene` cache terrain vào canvas một lần; mỗi frame vẽ sóng, bia, depth-sorted tree/player và hiệu ứng. Camera chỉ thay transform, UI vẫn neo viewport.
- Art dùng đúng nguồn Phoenix Legend cũ. Generator tạo atlas 4×5: idle/move/fly/attack/fire. Các module logic không cần tải PNG hay DOM để test.
- Map registry trong `islands.mjs`; thêm đảo mới bằng dữ liệu. Khi thay đảo trong cùng phiên cần tạo scene mới tương ứng state.
- Frame logic 480×270; world lớn hơn viewport, camera clamp trong world. Scale nguyên khi đủ màn hình; fractional fit chỉ ở cửa sổ hẹp.
- Phiên chơi hiện ở bộ nhớ. Không chuyển đổi hoặc đụng bản lưu nông trại cũ.

Xem README gốc để chạy, kiểm thử và thêm nội dung. Mã nông trại cũ nằm trong `legacy/tiny-farm`, không được nạp hoặc xuất bản.
