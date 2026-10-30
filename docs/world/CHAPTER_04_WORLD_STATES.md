# Trạng thái Chương 04 — Tiên Cảnh Vạn Sinh

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Region `van_sinh`, chapter_04. Các phase ID dưới là **derived display identifiers**, không saved enum. Đọc bảng từ cuối lên: chọn predicate đạt cao nhất; sub-objectives/nhánh object được lưu theo owner, không chỉ mỗi nhãn tổng quát. E## trỏ [24 events nguồn](../story/STORY_IMPLEMENTATION_HANDOFF.md).

| Phase | Trigger / predicate | Visual | Navigation | Enemy / creature encounters | Quest availability | Environmental interaction |
| --- | --- | --- | --- | --- | --- | --- |
| life_fragmented | Trước E18 complete | Rừng cổ/vườn nổi, ruins mọc cây và các khoảng suy thoái khác đảo gió | Đường vào E17 bằng Long có điểm bám; lối đi chính chưa cần Ly | Native/adapted communities cạnh tranh nước/pollination; không phân thiện ác theo affinity | E18 map quan hệ; observation hiện needs thay vì chỉ màu | Ba dạng cũ đo nước/nhiệt/gió, machinery sinh học còn sống |
| life_local_recovery | E18 complete, chưa E19 complete | Vài nhánh hồi lá, đất có độ ẩm, khe sống chưa liên kết | Cầu/rễ local đã có vật mang sống; route cũ không bị cây mới bịt | Giữ habitat adapted đã ghi; đối thủ hiểu sai restoration có thể hại chúng | E19 nối partners; adapted garden optional không thành main gate | Quy tưới đúng nguồn, Phượng nhiệt vừa đủ, Long phân tán; nối tiếp ở safe anchors |
| life_synchronizing | E19 complete, chưa E22 complete | Nhịp sinh học lan từng nút, chưa toàn mạng | E20 proof/confrontation rồi E21 Ly từ mạng; practice sau form commit | Advocate kết thúc conflict qua bằng chứng/giới hạn khai thác; không diệt adapted để thức Ly | E20–E22 main; optional memories không bắt buộc | Ly growth trên mô còn sống sau thức; không hồi sinh sinh vật chết hoàn toàn |
| life_stabilized | E22 complete | Mosaic native/adapted viable, mạng sống ổn định; biến thể vườn có thể đổi | Gate conditions available; E23 tín hiệu Tinh Môn, E24 ở lại thế giới, đường hồi giữ | New encounter refuges/relocation được kiểm coverage; hazards chọn lọc còn | Post-arc ecology challenge và opt_08 reversible; không xóa life_stable | Ly chăm nhánh, dạng cũ giữ nước/nhiệt/khí; bốn đóng góp là world facts không bốn equipped |

## Hệ quả và giới hạn

Ổn định Sinh Mệnh không là reset mọi habitat về cổ đại. E19 chuẩn bị partners không cần Ly; E21 thức Ly không cần E22 đã hoàn tất. E22 xác minh sau thức; E23 trả payoff bốn hệ, giữ origin Tinh Linh bí ẩn. Biến thể vườn không đảo milestone hoặc làm mất loài collection.

Tất cả phase cần base map + conditional objects/layers, không bốn map độc lập. Lighting/SFX chưa có asset production cho chương này. Enemy behavior là profile/habitat theo projection; không force toàn AI đổi cùng frame hoặc nhân đôi unique actor. Nếu collision/hazard đổi khi đang đứng tại đó, preflight safe placement rồi commit, hoặc defer.

## Sau reload / trở lại

Dựng phase từ completion/sub-completion, áp đúng variant mutable đang lưu, dựng habitat rules theo catalog revision. Không chạy lại grant hoặc animate toàn lịch sử. Ký ức đã thu có dấu đọc lại, không trả thưởng lại. Các đường về và coverage loài chưa gặp phải hợp lệ trước commit cuối chương; failure giữ bản committed trước theo [transitions](WORLD_STATE_TRANSITIONS.md).
