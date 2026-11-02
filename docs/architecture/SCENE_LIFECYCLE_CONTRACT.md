# Hợp đồng scene tối thiểu

**PROPOSED ADR-26-05**. [main](../../src/island/main.mjs) hiện start một lần, GameState.update rồi IslandScene.draw và HUD.update; không có scene manager/dispose. Contract dùng adapter, không yêu cầu sửa chữ ký actor cũ ngay.

ID đề xuất `quy-s0-test`: tìm trong src và docs hiện có trước authoring không thấy ID này; là scene kỹ thuật, không species/form/zone canon. `dawn` mặc định; `dawn-sample` giữ sample=1. URL opt-in cho ID mới chỉ là đề xuất mapping tương lai, chưa route hoạt động. Request không chỉ định scene vẫn chọn dawn; scene lạ báo lỗi và đưa lựa chọn về Dawn, không tự grant Quy.

| API đề xuất | Điều kiện / kết quả | Chủ trách nhiệm |
| --- | --- | --- |
| load(context) async | Validate refs/geometry/bundle, preload không nhận input, trả resource handle; có cancellation token | Scene giữ handle, asset service giữ cache |
| enter(context) | load thành công, spawn/camera/input/UI binding hợp lệ; trả ready sau bind | Scene giữ actor; bootstrap chuyển active handle đúng một lần |
| update(deltaTime) | Chỉ scene ACTIVE và không paused; frame input đã snapshot | Adapter Dawn gọi state.update(dt,input), không gọi thêm update actor lần hai |
| render(renderer) | Đọc committed scene view; có thể vẽ frame pause | Adapter gọi scene.draw(state) và HUD view theo thứ tự cũ |
| exit() async | Chặn input/update mới, bỏ held/queued actions, tháo binding có thể tái lập | Không xóa progression; không tự refill HP |
| dispose() async | Sau exit hoặc load/enter thất bại; idempotent, release listeners/requests/cache refs | Không hủy shared asset đang được scene khác dùng |

Context chỉ cấp services cần dùng: assets/catalog/input scope/render surface/diagnostics và cancellation, không global object cho phép ghi mọi store. Update nhận dt giây đã clamp; tick policy/input snapshot do loop duy nhất sở hữu. Scene không tạo rAF riêng. Re-entry tạo instance hoặc reset transient state theo scene definition, không gọi enter hai lần trên cùng active handle.

Lifecycle: REGISTERED→LOADING→READY→ENTERING→ACTIVE→EXITING→DISPOSED; FAILED/CANCELLED thoát qua cleanup. Chỉ một transition được chấp nhận tại một thời điểm; generation/operation token ngăn load cũ hoàn muộn chiếm active scene. Tải destination và validate trước khi unbind nguồn; freeze ngắn khi swap. Nếu enter thất bại, dispose destination và re-enter nguồn hợp lệ, hoặc boot lại Dawn với thông báo. Không hứa rollback animation/clock như durable transaction. E06 sau này phải dùng persistence boundary riêng, không lấy state machine này làm arrival fact.

Pause/menu/hidden không hoàn objective; blur xóa input và pending edge. Pause policy Quy vẫn cần duyệt; không âm thầm đổi việc visible-blur vẫn tick của Phượng. Exit clear pointer capture/hover/action buffer, callbacks/timer/resize handlers; scene không sở hữu settings lifetime toàn app. Cleanup lỗi được log theo scene/generation, khóa scene lỗi khỏi update; không nuốt lỗi rồi tạo hai actor điều khiển. Khôi phục Dawn bằng lifecycle đầy đủ, không gọi riêng GameState.setIsland.

Lỗi asset/animation/creature/geometry bắt buộc: từ chối enter, giữ nguồn hoặc Dawn an toàn; optional decor chỉ fallback được duyệt. Focus mất giữa transition không auto confirm. Unknown persistent schema phải khóa S1 load/recovery, không reset data để vào scene. Test tương lai: cancel load, double request, late resolve, enter throw, dispose twice/throw, re-entry, missing ID/clip, restore input/camera/HUD, không tăng listener hoặc rAF sau nhiều vòng. Chưa test contract vì chưa implement.
