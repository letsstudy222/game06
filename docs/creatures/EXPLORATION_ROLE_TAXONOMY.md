# Exploration role taxonomy

**Task11 — PROPOSED:** đặc tả để review, không gameplay đã triển khai hoặc approval mới cho mechanics. Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. [Task11 decisions](TASK11_DECISIONS.md) và [central register](../PROJECT_DECISIONS.md) giữ trạng thái.

## Capability khác nhãn role — K11-P05

Những loại dưới là index năng lực; movementProfile/environmentAbilities hiện hữu mới quyết định hình học/nguồn/giới hạn. Không dùng nhãn “Flight” tự cấp controller hoặc capability. Required/optional là thuộc **route/quest**, không độ hiếm của species.

| ID / loại | Obstacle | Movement change | Suitability / scope | Evolution coexistence | Softlock protection |
| --- | --- | --- | --- | --- | --- |
| `explore_underwater` / Underwater Mobility | Áp/dòng/độ sâu có giới hạn | Bơi/lặn, mượn dòng | Essential cho opening Quy đã có baseline; route caps cụ thể pending | Stage cải thiện thao tác/phạm vi không miễn mọi pressure | Aquatic requirement cue, entry/safe return; không đổi away giữa boss nếu không viable |
| `explore_flight` / Flight | Khoảng không và storm corridor có landing | Bay có turn envelope và safe landing | Direction Phượng/Long có nguồn; full flight từng stage chưa final | Stage khác banking/control, không noclip | Forecast lane, safe anchor/return, không route cần optional loài chưa thông báo |
| `explore_glide` / Gliding | Khoảng vượt có chênh cao/thermal | Lượn nhận updraft, không unlimited ascent | Phượng chapterII direction; route profile proposal | Stage mở nhịp/lane nhưng vẫn cần source | Landing reachable/đường về trước takeoff, không đòi switch mỗi platform |
| `explore_climb` / Climbing | Vách có điểm bám phù hợp | Bám tuyến được author | DEFERRED optional candidate, chưa baseline mechanic | Chỉ thêm stage capability khi module/animation được duyệt | Route không mandatory cho main; luôn phương án đã unlocked |
| `explore_burrow` / Burrowing | Lớp nền đào được và lối ra | Chỉ authored receiver/passages, không xuyên map | DEFERRED, chưa approved hoặc first playable scope | Không tự tạo vì Rare/Epic/stage cao | Không đi vào nếu không có exit/return; không arbitrary terrain destruction |
| `explore_speed` / High-Speed Traversal | Dòng/đoạn đường dài | Burst hữu hạn theo profile | Optional utility; không thêm speed mode chung | Stage nâng control, không vô hạn tốc độ | Braking/turn/edge cues và safe ordinary route nếu không required |
| `explore_manipulation` / Environmental Manipulation | Van/heat/vector/roots compatible | Hành động local receiver hơn đổi movement chung | Đúng context story có thể essential, không mọi hệ mở cửa cùng màu | Capability/ref overrides theo stage | W07 revision/return coverage, nhóm receiver thành nhịp thay spam switch |
| `explore_detection` / Resource Detection | Dấu nguồn/đối tác khó đọc | Quan sát định hướng thay radar toàn map | Optional investigation, không bắt rare scanner cho story | Tăng đọc cue có điều kiện, không lộ hết memory | Accessible clue thường/alternate observation; resource loot economy chưa tạo |
| `explore_restoration` / Ecological Restoration | Quan hệ sống còn viable bị đứt | Nối điều kiện/đối tác qua route/events | Story restoration thiết yếu, chiêu cụ thể proposed; không mọi form có Life | Stage tăng độ tinh luyện, không resurrect | Nguồn/partners/alternate habitats/safe route, no unannounced optional species |
| `explore_mechanism` / Ancient Mechanism Interaction | Cơ cấu cổ có source/predicate | Tiếp cận/vận hành receiver có feedback | Các main receivers chỉ cần main capabilities đã học | Stage mở optional complexity không épIII cho main arc | Bootstrap Quy trước body không yêu cầu form; prior quest proof công nhận event đã làm |

## Giảm compulsory switching và revisit

Thiết kế các cụm chướng ngại cùng capability với landing/rest/loadout point rõ; không mỗi ô bắt một dạng khác. Một receiver có thể có alternative hợp lý theo source/material, không mọi loài cùng element làm được mọi việc. Main route dùng capabilities đã mở, không rarity/dual/check đủ3. Optional shortcuts/side rooms có thể khuyến khích form khác nhưng không khóa essential progression/collection vĩnh viễn.

Trước tuyến một chiều kiểm cả return và world phase sau event. Region patch ảnh hưởng nav phải safe-boundary/defer theo W07, không tự cho equip giữa boss locked. Nếu ability tạm unavailable giữ species XP/skills, đưa safe return/checkpoint theo policy cần duyệt. Early boss trigger/snapshot/retry A08-05 vẫn dependency, D41 count barrier không mở lại. Sự trưởng thành không làm form lớn tự xuyên hẹp; C04 clearance/art proposals phải prototype.

Quy nước/pressure tiếp tục dùng ở chương sau; Phượng heat/updraft không bị Long wind thay hết; Long atmospheric path không thay Ly biological relationships. Backtracking có optional loop/research/habitat recovery, tránh mandatory ferry lặp nhiều lần. Climb/Burrow không main prerequisite hoặc công việc implement Task11.
