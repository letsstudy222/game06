# Trạng thái Chương 02 — Đảo Nhật Diệm

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Region `nhat_diem`, chapter_02. Các phase ID dưới là **derived display identifiers**, không saved enum. Đọc bảng từ cuối lên: chọn predicate đạt cao nhất; sub-objectives/nhánh object được lưu theo owner, không chỉ mỗi nhãn tổng quát. E## trỏ [24 events nguồn](../story/STORY_IMPLEMENTATION_HANDOFF.md).

| Phase | Trigger / predicate | Visual | Navigation | Enemy / creature encounters | Quest availability | Environmental interaction |
| --- | --- | --- | --- | --- | --- | --- |
| heat_dormant | Trước E07 complete | Basalt nguội, rừng trên đất núi lửa, vent yếu cục bộ | Bờ có chỗ nước/đường thấp cho Quy; không bắt leo khô cao vô hạn | Grazer/forager sống ở rừng; loài phụ thuộc nhiệt quanh túi ấm | E07 khảo sát sau E06; optional thermal habitat | Đọc mạch nước, kiểm receiver; không lava phủ toàn đảo |
| heat_disturbed | E07 complete, chưa E09 complete | Vent dao động có cue âm/hơi; hạch/trứng bảo tồn chỉ candidate lore | Nguồn nước hồi + receiver an toàn + nhiệt dư cho E08; practice Phượng ở landing gần | Fire và Fire–Metal candidate có refuge basalt; disturbed không biến toàn quần thể hostile | E08 thức Phượng khác Quy; E09 chứng cứ/thermal training | Quy làm mát đường phụ; Phượng heat/glide sau sub-commit |
| heat_controlled | E09 complete, chưa E11 complete | Đường xả thử hoạt động từng khu; heat bloom có ranh giới rõ | Bypass/outlet E10, landing chọn lọc; chưa mở updraft liên chương | Custodian bảo vệ adapted habitat, đổi disposition theo E10; retreat khỏi vent thử | E10 bảo vệ outlet, E11 kiểm circulation; optional nhận proof có trước | Nước và nhiệt phối hợp nối tiếp, không cần active hai dạng |
| heat_stabilized | E11 complete | Vent trong safe bands, rừng/refuge giữ; nguy cơ cục bộ còn | Updraft available; E12 tới trời và ghi trạm xuống; đường nước vẫn dùng | Loài nhiệt có ổ mới, loài basalt còn vùng nguội; không xóa toàn habitat cũ | Thử thermal optional, archive và collection sau chương | Phượng dùng thermal từng đoạn; Quy vào bể/ống ngập; không global immunity |

## Hệ quả và giới hạn

Núi lửa ngủ hàng chục nghìn năm không đồng nghĩa mọi magma phun tràn khi hồi mạng. Heat hazard persistent theo vent policy; lửa combat temporary và ánh glow cosmetic tách. E11 phải kiểm refuge trước commit.

Tất cả phase cần base map + conditional objects/layers, không bốn map độc lập. Lighting/SFX chưa có asset production cho chương này. Enemy behavior là profile/habitat theo projection; không force toàn AI đổi cùng frame hoặc nhân đôi unique actor. Nếu collision/hazard đổi khi đang đứng tại đó, preflight safe placement rồi commit, hoặc defer.

## Sau reload / trở lại

Dựng phase từ completion/sub-completion, áp đúng variant mutable đang lưu, dựng habitat rules theo catalog revision. Không chạy lại grant hoặc animate toàn lịch sử. Ký ức đã thu có dấu đọc lại, không trả thưởng lại. Các đường về và coverage loài chưa gặp phải hợp lệ trước commit cuối chương; failure giữ bản committed trước theo [transitions](WORLD_STATE_TRANSITIONS.md).
