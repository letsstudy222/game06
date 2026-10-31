# Truyền đạt tiến hóa — yêu cầu UI khái niệm

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Thông tin cần hiểu — V13-P08

Không sửa menu, layout, HUD hoặc art. Đây là contract cho future UI/feedback; tên hiển thị Việt ngữ có thể review sau, technical IDs không đổi theo text.

| Display state | Ý nghĩa dễ hiểu | Thông tin/hành động đề xuất |
| --- | --- | --- |
| Requirements incomplete | Chưa đạt yêu cầu đã biết | Stage hiện tại, requirement thiếu, hint/source và alternative đã được author; XP không mất |
| Eligible | Điều kiện phát triển đã đủ | Cho xem thay đổi đã biết và chọn thực hiện tại safe context; không tự đổi form |
| Pending transition | Đã ghi intent, đang chờ safe state/asset/placement | Nêu đúng blocker, không hiển thị completed hoặc yêu cầu farm lại |
| Evolution in progress | Presentation quanh commit boundary | Hạn chế thao tác cạnh tranh theo approved policy, skip animation không skip validation/save |
| Completed | Target stage đã durable commit | Kết quả stage, skill nào thực sự grant/eligible, movement/environment delta, đường thử an toàn |
| Temporarily unavailable | Proof còn nhưng chưa thể thực hiện | Lý do: combat/lock, chỗ hẹp, nguồn tạm thiếu, asset chưa ready hoặc form unavailable; không reset knowledge |

Không biến unavailable thành species disabled vĩnh viễn hoặc downgrade tier. COMPLETED áp cho một target transition; khi species còn stage sau, UI đọc requirements của bước kế tiếp, không ghi lại species “chưa tiến hóa”. Species chỉ một stage hoặc nonplayable không có evolution track phải hiển thị không áp dụng/không mở tiềm năng giả vô hạn.

## Preview không spoiler

Tách current stage/owned skills, future potential đã biết và unknown narrative requirements. Cho mô tả định tính như “kiểm soát hãm dòng tốt hơn”, không tên boss/đáp án catastrophe/ảnh stage chưa approved. Không hiển thị memory chưa có như full truth hoặc tất cả optional entries là bắt buộc. Exact level/XP/mastery values chỉ lấy approved catalog sau Task15, không hardcode con số trong UI design này.

Thông báo skill “mở điều kiện” khác “đã sở hữu”; inherited utility và thay đổi reach/movement có cảnh báo dễ hiểu, nhưng no forced new movement system. Missing art hiện là production gap ở tài liệu, không hứa nút evolve playable khi chưa có controller/clip. Concepts không được gọi validated animation.

## Interaction/accessibility/save feedback

Nguồn hint rõ và còn revisit, không chỉ màu hoặc biểu tượng rarity. Dùng text + shape/cue, không flashes/FX che game. Confirmation phải rõ subject species và tác động có thể lâu dài; cancel precommit không mất XP/proof. Chờ save có feedback đúng trạng thái: durable failure không báo completed; postcommit reload không cấp thưởng lần nữa. Save/error UX/controls/device target vẫn cần technical/product review, không chọn storage library hoặc sửa current settings key `nhat-diem.ui.v1`.
