# Khoảng cách runtime Quy và bàn giao triển khai

Kiểm tra tĩnh nguồn tại baseline `387b29d392ad78d65f14e7dc7720da0d16b1213c`, ngày 31/10/2026 (Asia/Saigon). **PROPOSED Q18-P11** cho giải pháp/handoff; các mô tả runtime bên dưới là bằng chứng đọc code, không fresh gameplay/playback hoặc benchmark. Không refactor prototype Phượng trong Task18.

Nhãn: **Có sẵn, tái dùng** = primitive thích hợp, chưa tích hợp Quy; **Cần mở rộng**; **Cần triển khai mới**; **Cần quyết định duyệt**; **Cần asset sản xuất**. Một hạng mục có nhiều nhãn khi các dependency độc lập.

| Hạng mục / bằng chứng thực | Phân loại | Khoảng cách và bàn giao |
| --- | --- | --- |
| Actor [GameState.setIsland](../../src/island/GameState.mjs), [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs) | Cần mở rộng + quyết định | Hardcode new PlayerPhoenix; cần species/form/stage adapter, giữ prototype cũ, không rename Phượng thành Quy |
| Movement PlayerPhoenix.update | Cần triển khai mới + quyết định | Normalize input rồi speed trực tiếp, hover và radius cố định, chưa inertia/current/brake profile; cần coordinator và accessible tuning |
| Geometry [canOccupy/moveWithCollision](../../src/island/geometry.mjs) | Có sẵn primitive + cần mở rộng | Substeps/point-polygon có thể tái dùng, nhưng canOccupy chặn deep/shallow/cliff và land-only checks; chưa water layer/tier/turn-envelope sweep |
| Camera [follow/renderX/renderY](../../src/island/Camera.mjs) | Có sẵn + cần mở rộng/duyệt | Float follow/clamp, round render dùng lại có đánh giá; offset gắn player, chưa evolved envelope/depth connector/underwater occlusion |
| Rendering [IslandScene.drawPlayer](../../src/island/IslandScene.mjs) | Cần mở rộng + asset | Dùng meta.phoenix và 96px rect, hai pose rồi offsets, idle cache; cần per-stage manifest/directions/anchors/FX/body bounds |
| Clips [AnimationController](../../src/island/AnimationController.mjs) | Có sẵn primitive + cần mở rộng/asset | Có state timing/loop/complete nhưng default Phoenix six names, không Quy clips/markers/contact events tổng quát; complete không grant authority |
| Assets [AssetLoader.load](../../src/island/AssetLoader.mjs), [manifest](../../assets/production/manifest.json) | Có sẵn loading primitive + cần mở rộng/asset | Loader decode/progress/size check có ích nhưng hardcode phoenix/environment; atlas thật192×288, không phải Quy atlas; cần strict manifest + provenance |
| Combat [SkillSystem.use/hit](../../src/island/SkillSystem.mjs) | Cần triển khai mới + quyết định | Basic hiện resolve ngay theo range/dot; fire projectile hardcoded, target respawn timer; thiếu C14 phased action/ordinal hit ledger/guard/channel/interrupt/CC policy |
| Status/reactions | Cần triển khai mới + quyết định | Chưa generic E09 status/reaction owners/token budgets; không suy flash/hp là Wet/guard; cần bounded graph và recursion/dedupe tests |
| Health [PlayerPhoenix.damage/update/respawn](../../src/island/PlayerPhoenix.mjs), GameState.update | Cần quyết định + triển khai mới | Prototype auto-regen, invulnerability và immediate respawn không policy Quy; chốt HP/recovery/defeat routing trước tích hợp, không copy luật số |
| Input [InputManager](../../src/island/InputManager.mjs) | Có sẵn + cần mở rộng/duyệt | WASD/arrows, attack J/Space, hover và blur clear có thật; cần semantic swim/brake/guard/remap/mobile mapping, không final binding ở docs |
| Scene/quest [GameState.setIsland/interact](../../src/island/GameState.mjs) | Cần triển khai mới | setIsland reset actor/targets/shrine, interact toggle shrine; không E01 sub-completion, memory/quest graph hoặc idempotent receiver |
| Save [UISettings](../../src/island/UISettings.mjs), GameState.snapshot | Cần triển khai mới + quyết định | localStorage phục vụ settings, snapshot không durable progression adapter; cần W07 atomic writer, receipts, integrity, migration và O17 memory boundary |
| Progression/evolution/loadout | Cần triển khai mới + quyết định | Chưa species XP/mastery/stage/config/frozen membership tổng quát; refs/view không thay owners R03/V13/P15/L16 |
| World/water art và audio | Cần asset sản xuất + quyết định | Chưa verified Quy reference/clips, sanctuary/water kit; cần Q05/manifestation/anatomy/provenance, không nhận Dawn art là Hải Uyên hoàn tất |

## Handoff cho các task triển khai trong dải 25–48

Đây là work packages cần map sang đề bài cụ thể khi tới lượt; không tự đặt tên/nội dung chính thức cho từng số task chưa được cung cấp, không thực thi các task đó.

| Gói phụ thuộc | Đầu vào bắt buộc | Đầu ra cần nghiệm thu sau này |
| --- | --- | --- |
| Content/asset adapter | Approved species/form/stage refs, typed IDs, Stage I anatomy/manifest | Resolve đúng refs, missing clip fail rõ, không Phoenix fallback trái giải phẫu |
| Movement/geometry/camera | Plane x–y, profile/input/current/clearance được duyệt, test zone | Bơi/hãm responsive, không wall/current trap, envelope không crop |
| Action/defense/Water | C14 policy/markers/health/resource scope approved, Stage I clips | Hit/miss/multi-hit/interrupt deterministic, finite brace và one Water ability |
| Quest/resonance/world/save | Task17 IDs, memory receipt mapping, W07 adapter/migration | E01 idempotent atomic unlock/practice, route patch load đúng, last-good recovery |
| Later evolution/loadout/reactions | Approved requirements và ownership/config mapping, II/III assets khi cần | Eligibility không bypass boss lock, old capabilities giữ, no regrant/CD reset/reaction loops |
| Browser/device validation | Approved accessibility/performance targets, scenes/assets thật | Nghiệm thu bằng [test cases](QUY_TEST_CASES.md), báo rõ device/browser/playback/performance kết quả |

Gate mở xem [Q18 decisions](../chapter1/TASK18_DECISIONS.md). Không coi việc có Canvas/camera/loader là đã có underwater/combat/save Quy; mọi estimates và thông số phải dựa prototype sau approval.
