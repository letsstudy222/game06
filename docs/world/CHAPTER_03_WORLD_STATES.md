# Trạng thái Chương 03 — Thiên Đảo Phong Vân

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Region `phong_van`, chapter_03. Các phase ID dưới là **derived display identifiers**, không saved enum. Đọc bảng từ cuối lên: chọn predicate đạt cao nhất; sub-objectives/nhánh object được lưu theo owner, không chỉ mỗi nhãn tổng quát. E## trỏ [24 events nguồn](../story/STORY_IMPLEMENTATION_HANDOFF.md).

| Phase | Trigger / predicate | Visual | Navigation | Enemy / creature encounters | Quest availability | Environmental interaction |
| --- | --- | --- | --- | --- | --- | --- |
| air_unstable | Trước E13 complete | Cloud valley, cờ/chuông báo hướng gió đứt nhịp | Outer islands tới bằng Phượng qua landing; tuyến chính có đường hồi cố định | Loài Wind/Wind–Lightning candidate chọn storm pockets; predation theo habitat | E13 khảo sát nút không cần Long chưa có | Quan sát stream/receiver; không penalty damage toàn cục lên Phượng |
| air_fragmented | E13 complete, chưa E14 form_committed | Các nút nhận diện nhưng lệch pha; tín hiệu có cadence khác | Chuỗi bridge/lane tiếp cận mảnh imprint bằng dạng cũ và cơ cấu | Patrol giữ nút, wildlife tránh vùng áp; không mọi storm species hostile | E14 reconstruction/synchronization; không một trứng khác | Receiver giữ nhịp, source_validated không tự cấp Long |
| air_partial | E14 form_committed, chưa E16 complete | Long thân dài đọc rõ qua mây; các corridor địa phương đã nối | Practice Long rồi E15; corridor còn khóa có bypass về điểm trú | Wind regulator tranh quyền kiểm soát, actor duy nhất theo outcome E15 | E14 practice, E15 conflict, E16 xác minh shared access | Long gió cục bộ và machinery, không yêu cầu stage III |
| air_stabilized | E16 complete | Corridor chính đều nhịp, storm pockets có biển cue | Living route available trước E17; E17 arrival/return edge; platform routes không random biến mất | Storm-adapted habitat vẫn có vùng; patrol giảm theo quyền truy cập địa phương | Sky archive/wind challenge còn, Long mở nook cũ | Receiver chỉnh nhánh tùy chọn giữ main route/return không đóng |

## Hệ quả và giới hạn

Weather categories proposed: calm, gusting, storm-pocket. Story corridor availability deterministic theo facts; variation bounded trong corridor đã validate. Không random storm khóa điểm hạ đáp hoặc làm platform đưa người chơi tới chỗ không về. “Fragmented” mô tả mạng, “unstable” mô tả khí; phase precedence ở bảng chỉ read model, hai đặc tính có thể cùng tồn tại.

Tất cả phase cần base map + conditional objects/layers, không bốn map độc lập. Lighting/SFX chưa có asset production cho chương này. Enemy behavior là profile/habitat theo projection; không force toàn AI đổi cùng frame hoặc nhân đôi unique actor. Nếu collision/hazard đổi khi đang đứng tại đó, preflight safe placement rồi commit, hoặc defer.

## Sau reload / trở lại

Dựng phase từ completion/sub-completion, áp đúng variant mutable đang lưu, dựng habitat rules theo catalog revision. Không chạy lại grant hoặc animate toàn lịch sử. Ký ức đã thu có dấu đọc lại, không trả thưởng lại. Các đường về và coverage loài chưa gặp phải hợp lệ trước commit cuối chương; failure giữ bản committed trước theo [transitions](WORLD_STATE_TRANSITIONS.md).
