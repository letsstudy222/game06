# Dodge và ý định đổi slot

**CONFIRMED theo Task 30:** có action dodge, Space là binding desktop của adapter mới. Phê duyệt này chỉ thu hẹp trạng thái “dash/dodge PROPOSED” trước đây ở mức **input command tồn tại**. Cơ chế dodge/dash, khoảng cách, thời lượng, stamina, cooldown, i-frame và interaction với collision/HP vẫn **UNRESOLVED/PROPOSED** theo quyết định tương ứng.

SemanticInput chỉ phát edge/held. Không gọi moveWithCollision, không đổi pose, HP, invulnerability, resource hoặc timer combat. Harness có nút dodge và trạng thái text để chứng minh phát hiện intent, không biểu diễn một động tác né đã chơi được. Legacy Space attack vẫn giữ vì Dawn chưa chuyển sang adapter mới.

Actions switch_form_1/2/3 nhận phím 1/2/3. `formSwitchIntent(slot, view)` kiểm slot 1–3, view tối đa ba phần tử và slot có formId. View có thể chỉ một form hoặc slot rỗng; không bắt đủ ba. Consumer phải cấp canSwitch=true và eligibleSlots từ loadout/encounter authority; thiếu quyền thì authority_blocked. Hàm trả request readonly hoặc lý do từ chối, không đổi active form hoặc membership.

Boss membership lock khác quyền chuyển active giữa các form đã trang bị. Guard không dùng membership lock để tự cấm mọi switch; authority vẫn phải xác nhận eligibility theo trạng thái encounter/recovery. Test dùng projection bị khóa membership để chứng minh không sửa slots và không tự cho phép form bị authority chặn. Không thực hiện loadout engine, emergency transfer, progression hoặc đổi form production.

Trước integration combat cần duyệt health/recovery/continuation policy và emergency transfer theo Phase II/Task 26. Active-form HP0 khác total encounter defeat; input này không giải quyết quyết định còn mở đó. Không đổi RewardGrantLedger hoặc save records.
