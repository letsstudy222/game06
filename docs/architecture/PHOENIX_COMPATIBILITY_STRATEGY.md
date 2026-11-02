# Tương thích Phượng và migration tăng dần

D26-02 **CONFIRMED**: Dawn mặc định, Quy opt-in, không thay PlayerPhoenix sớm. Adapter cụ thể **PROPOSED**, chưa tồn tại. Đọc [GameState](../../src/island/GameState.mjs), [IslandScene](../../src/island/IslandScene.mjs), [InputManager](../../src/island/InputManager.mjs) và [Task25](../technical/TASK25_RUNTIME_EXECUTION_FLOW.md).

Adapter Dawn sẽ giữ cặp GameState/IslandScene: load manifest từ map; enter tạo state/player như cũ; update chuyển semantic adapter về `{x,y,hover}` và gọi state.update một lần; render gọi draw/HUD theo thứ tự hiện tại. Attack/fire/interact vẫn đi state.use/interact theo input cũ. Animation, camera follow, land collision, HP/regen/respawn và số liệu Phượng không được sửa để khớp Quy. Quy nhận controller/render contract riêng sau approval.

| Đợt tương lai | Tệp có thể cần sửa, không sửa trong Task26 | Bằng chứng trước chuyển đợt |
| --- | --- | --- |
| Wrapper/bootstrap | main.mjs; registry bổ sung cạnh islands.mjs | Default/sample boot như cũ, một loop; không dùng setIsland riêng làm transition |
| Resource/input scope | AssetLoader.mjs, InputManager.mjs, MobileJoystick.mjs, ResponsiveLayout.mjs, GameMenu.mjs, ActionButtons.mjs | Dispose/reset APIs có test; không đổi mapping/UI Phượng |
| Render adapter | IslandScene.mjs/AnimationController.mjs/WorldLayer.mjs/Camera.mjs theo nhu cầu thật | Golden views/anchor/camera/FX baseline giữ; không trích toàn renderer trước khi cần |
| World/controller policy | geometry.mjs, map descriptor adapter mới | Deep/shallow vẫn block Phượng, nước thử chỉ mở trong policy Quy |
| Data/UI binding về sau | GameState.mjs, PlayerHUD.mjs, UIHud.mjs nếu cần | Adapter giữ construction PlayerPhoenix, static label không biến thành XP thật |
| Build/test về sau | build-site.cjs/tests/*.mjs/*.cjs | Prefix/game06, sample và cache resources đúng; không đổi CI nếu task chưa cho phép |

Không cần sửa PlayerPhoenix/GameState trong Task26. Khi một đợt sau thật sự cần interface mới, thêm wrapper trước, test hành vi tương đương, rồi mới selective extraction; không rename file/loài cũ thành Quy. UI Phượng có thể mount nguyên trạng trong Dawn scope; scene Quy không ghi nhãn NhậtDiệm/Lv1/LEGEND mặc định thành identity thật. DOM chung được unbind trước bind scene mới, settings app giữ nguyên. Không sản xuất UI mới ở task này.

Dawn→Quy→Dawn cần test listener counts ổn định, không input rơi, không stale map camera, asset cache refcount hợp lệ, errors không phá Dawn. Legacy UI/farm namespace giữ; sample query và screenshots baseline không thay ngầm. StageII/III/Long/Ly là extensibility requirement, không cần bốn controller hoặc ECS trước S0.
