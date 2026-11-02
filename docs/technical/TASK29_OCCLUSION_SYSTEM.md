# Fade object che khuất actor

**CONFIRMED D29-MAP-02:** object môi trường đủ lớn và che actor được làm mờ, collision giữ nguyên; không mặc định dùng x-ray outline. Code [OcclusionFade](../../src/island/OcclusionFade.mjs) và adapter [LayeredMapView](../../src/island/LayeredMapView.mjs).

Caller author object.occlusion gồm enabled, alpha, duration, margin; layer cũng phải occlusionEligible. Không tự suy mọi cây/san hô đều cần fade. View dùng visual rectangle theo anchor của object và visible bounds của focus actor. Chỉ depth object thực sự vẽ trước mặt actor (depth lớn hơn), hoặc foreground object, mới đủ điều kiện; cùng depth object vẽ trước actor nên không cần fade. Object xa không giao AABB bị loại bằng phép so sánh rẻ, không kiểm pixel alpha/physics.

Khi mới giao bounds, alpha chuyển tuyến tính về mức cấu hình; mỗi update giới hạn deltaTime tối đa 0.1 giây để tránh nhảy hình do tab ngừng lâu. Khi đã che, mở rộng cửa sổ thoát theo margin (hysteresis), giảm nhấp nháy ở biên. Ra khỏi cửa sổ hoặc bỏ focus thì alpha trở lại 1. duration=0 cho thay tức thì nếu caller chủ động chọn. Các số trong fixture chỉ để kiểm, không là tuning production được duyệt.

Mỗi object giữ alpha/hidden độc lập trong Map presentation tạm; nhiều occluder có thể fade cùng lúc. `enabled=false`, layer không cho fade hoặc object phía sau actor đều bypass và phục hồi. Không sửa ảnh nguồn, sprite position, collision, current hoặc world state. dispose/reset xóa alpha cache; removed object được dọn khỏi cache. Draw dùng save/restore nên alpha không rò sang actor/HUD/layer khác.

Đây là AABB approximation cần art authoring/test theo silhouette; vùng trong suốt của sprite có thể làm fade hơi sớm. Chưa có polygon mask, pixel-perfect occlusion hoặc visibility guarantee cho mọi production room. Multiple overlay và combat telegraph cần kiểm riêng theo contract Task 28. Dawn giữ canopy fade cũ để bảo toàn visuals; smooth fade mới chỉ chạy qua adapter mới/fixture, không âm thầm đổi Dawn.
