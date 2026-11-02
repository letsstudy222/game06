# Scope Quy dưới nước — đề xuất nhỏ, phân biệt rõ D40

**CONFIRMED D40** tại [PROJECT_DECISIONS](../PROJECT_DECISIONS.md): movement hoạt động, basic combat, Quy I, underwater sample, demonstration cộng hưởng đầu và persistent progress. D40 nhỏ hơn full Chương I. Task25 đề xuất chia checkpoint dưới đây **PROPOSED**, không hạ chuẩn D40 hoặc gọi movement-only là đã hoàn first playable.

## S0 — demo movement cách ly, chưa hoàn D40

| Thành phần | Scope đề xuất / acceptance tương lai |
| --- | --- |
| Scene thử riêng | URL/scene/feature flag mới chỉ sau duyệt; ví dụ ?scene=quy-test là đề xuất, chưa route tồn tại. Dawn mặc định và sample=1 giữ nguyên |
| Quy Stage I | Một active actor fixture có asset/blockout hợp giải phẫu được duyệt; không giả E01 đã grant, không đòi form thứ hai |
| Keyboard | Bơi/đổi hướng/hãm/tương tác theo semantic map được duyệt; giữ input Phượng và focus release |
| Movement/camera | Đáp ứng dễ đọc trong plane đã chọn; camera clamp, sprite không crop, không dùng hover-lift để gọi là bơi |
| Solid geometry | Một phòng nước nhỏ có biên/tường/đường về và safe spawn; nước passable chỉ trong policy scene này |
| Một dòng nước | Có cue hướng/ranh giới rõ và lực hữu hạn được cấu hình sau duyệt; không đẩy qua collider hoặc ra bounds |
| Một tương tác | Receiver cục bộ thay setting trong phiên, có before/after nhìn được; không giả E05 restoration |
| Một mục tiêu ngắn | Bằng chứng thao tác/marker trong phiên, ví dụ kiểm lại đường về; không tự tạo RPG reward hoặc journal species |
| Restart/retry | Khôi phục fixture có chủ đích, clear input/effects và spawn hợp lệ; không xóa UI/farm/save keys hoặc giả recovery HP |
| Dữ liệu | Ghi rõ trạng thái tạm, refresh có thể mất; UI settings vẫn được lưu như cũ. Không viết claims/E01 completion vào save chính |

Không cần boss, ba stage, full collection, AI wildlife, full questline, E05/E06 hoặc Chapter II. Movement-only không cần chọn toàn health model nếu không có combat/HP/recovery giả. Gate A–D/G và subset B/C vẫn phải duyệt; asset tạm cũng cần được cho phép rõ, không dùng Phượng làm Quy.

## S1 — tích hợp đủ essentials D40 sau gate

Bổ sung basic combat có startup/contact/recovery và target hợp lệ trong scope nhỏ; không bắt full combat system, boss hoặc all reactions. Dùng [opening](../chapter1/FIRST_QUY_RESONANCE.md) và [save contract](OPENING_STATE_AND_SAVE_CONTRACT.md) cho memory trước form, form commit trước practice và durable progress một lần. Chọn gate E cho damage/HP/retry cần dùng, gate F cho writer/receipt/source/migration. Không tích hợp O17-U04 bằng cách claim parent sớm hoặc dời ký ức sau thân.

Chỉ đạt D40 khi cả movement/basic/underwater/QuyI/resonance/persistence thực chạy và được nghiệm thu; S0 PASS không đủ. Guard/Vành Nước là scope ứng viên trong Q18/C14, không âm thầm biến thành requirement D40 mới; nếu brief triển khai chọn chúng thì cần approval/clip/policy tương ứng. Giữ status của các đề xuất Phase II/III.

## Trình tự nhỏ nhất

Duyệt A/B/C/D/G→adapter có đường Phượng cũ→asset contract + phòng nhỏ + input fixture→QuyI motion/camera/solid→một current→receiver/objective/restart→regression S0. Song song chuẩn bị F/error fixtures và asset clips; khi E/F/source boundary đủ mới nối basic combat và E01/durable progress thành S1. Không tạo phụ thuộc vòng: art biết envelope từ contract, không cần full controller xong mới brief; controller có thể thử blockout được duyệt nhưng chưa production-ready.

Task25 không đặt tốc độ/damage/current force/EXP hoặc FPS clip cho Quy. Đo tuning sau gate trong task triển khai. Phụ thuộc [Task26–48](TASK25_IMPLEMENTATION_DEPENDENCIES.md), [gate register](TASK25_DECISION_GATES.md), [non-regression](TASK25_NON_REGRESSION_PLAN.md). Tất cả acceptance Quy NOT RUN.
