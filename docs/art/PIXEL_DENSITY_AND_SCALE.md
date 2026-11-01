# Mật độ pixel và tỷ lệ sản xuất

Nguồn: [AB33-S08–S11/S14](ART_BIBLE_MASTER.md), [pixel contract28](../technical/TASK28_PIXEL_SCALING.md), [manifest27](../technical/TASK27_MANIFEST_CONTRACT.md). **CONFIRMED — quan sát runtime:** frame Phượng96, atlas192×288; tile Dawn32. Không có kích thước Quy được duyệt. **PROPOSED AB33-P03:** dùng frame có kích thước thay đổi nhưng cùng thước pixel/world-unit; chọn kích thước sau blocking ở scale chơi. **UNRESOLVED:** kích thước xuất cuối. **SUPERSEDED:** không thay quyết định lịch sử.

## Các lựa chọn cần so bằng ảnh thử về sau

| Phương án | Ưu thế | Chi phí/rủi ro | Khuyến nghị PROPOSED |
| --- | --- | --- | --- |
| 32×32 | Nhẹ, silhouette đơn giản | Ít chỗ cho đầu/vây và chi tiết fantasy, đường chéo dễ nhập khối | Ambient nhỏ, không ép làm chuẩn mọi nhân vật |
| 48×48 | Cân chi tiết và diện tích, dễ thử trên mobile | Phải kiểm vùng trống và pixel cluster ở góc chéo | Ứng viên blocking Quy I nếu anatomy còn rõ |
| 64×64 | Có chỗ cho mai, đầu/chi và mặt vật liệu | Nhiều pixel phải kiểm mỗi hướng; dễ làm nhân vật lấn màn hình | Ứng viên so với48, không tự được chọn |
| Frame biến thiên, kể cả chữ nhật | Giữ density giữa thân dài/cánh/mai và các giai đoạn | Quản lý anchor/bounds và atlas nhiều kích thước | Khuyến nghị tổng thể; mỗi atlas tuân định dạng validator hiện có |

Không thu Phượng96 về64/32 để đạt đề xuất mới. Không kéo giãn một sprite nhỏ thành stage lớn. Thay kích thước frame không đồng nghĩa tăng body scale hoặc collision. Nếu dùng grid frameWidth/frameHeight, cả hai phải chia hết atlas theo Task27; dùng rect tường minh khi hợp đồng cho phép, không tự thêm packing format mới.

## Thước đo và envelope

**PROPOSED:** một pixel art native tương ứng một logical pixel trước camera; dùng mật độ cụm và mức chi tiết tương đồng giữa bộ asset, không buộc khung bằng nhau. World-unit và source-pixel chỉ trùng khi preview dùng scale1 được khai báo; nếu cần scale khác phải review độ nét và tỷ lệ trong scene thật. Camera CSS integer scaling không là quyền upscale nguồn rồi gọi đó là chi tiết mới.

| Khái niệm | Quy tắc |
| --- | --- |
| Frame rectangle | Toàn ô/rect chứa pose và phần trong suốt cần thiết, không crop extrema |
| Anchor | Gốc cơ thể chiếu xuống mặt phẳng bơi/đất, ổn định giữa hướng và clip |
| Visual bounds | Thân nhìn thấy, không mặc định gồm vệt sáng dài; dùng cho culling/fade theo caller |
| Collision footprint | Phần chiếm chỗ do gameplay/collision phê duyệt; không suy từ alpha hoặc mai rộng |
| Hurt/attack shapes | Do hành động/combat sở hữu; không bằng toàn frame hay glow |

Runtime làm tròn world và camera riêng khi vẽ, không ghi vị trí snap về physics. Canvas backing hiện thích ứng viewport, không cố định640×360; DPR không tự nhân mọi asset. Giữ nearest-neighbor, tỷ lệ CSS nguyên và x/y đều; QA zoom trình duyệt/fractionalDPR riêng, chưa có bảo chứng cho mọi thiết bị.

## Tỷ lệ tương đối — PROPOSED, không kích thước collider

Lấy chiều dài thân Quy I nhìn thấy làm đơn vị1 để so composition, không làm ID/giá trị production. Ambient nhỏ khoảng0.2–0.5, wildlife tương tác khoảng0.5–1.2, prop nhỏ0.3–1, trụ/ruin nhiều đơn vị có khoảng hở. Quy II/III cần tăng khác biệt cấu trúc trước tỷ lệ; chưa ấn định hệ số. Boss và Sacred lớn phải thử ở camera sát tường, làn tránh và viewport dọc; nếu che thông tin thì sửa composition/envelope, không tự giảm hitbox cho vừa ảnh.

## Ngân sách atlas — ví dụ lập kế hoạch PROPOSED

RGBA giải nén tối thiểu là width×height×4 bytes, chưa tính bản sao CPU/GPU, Canvas, padding, cache hoặc nén PNG. Ví dụ giả định64 frame (8 hướng×2 clip×4 frame) chỉ để so phương án, **không duyệt số frame**:

| Frame vuông | Bộ64 frame, chưa padding |
| --- | --- |
| 32 | 256 KiB |
| 48 | 576 KiB |
| 64 | 1 MiB |
| 96 | 2.25 MiB |

Atlas Phượng hiện192×288 tương ứng216 KiB RGBA tối thiểu, không phải dung lượng PNG tải mạng. Không suy từ bảng rằng mọi clip cần bốn frame hoặc atlas lớn nhất có hiệu năng đạt. Chỉ giải mã/tải theo pipeline hiện có, không kiểm metadata mỗi game frame.

## Bằng chứng trước khi chốt

Sau checkpoint review01–33 và duyệt brief: so blocking48/64 hoặc phương án khác trên nền sáng/tối/rối ở viewport390×844,844×390 và desktop; DPR1/2, hướng chéo, quay đầu/hãm, occluder và animation extrema. Ghi vùng thân hiển thị, anchor drift, thời gian tải/bộ nhớ và ảnh preview đúng scale. Các phép so này **chưa thực hiện với Quy** trong Task33; không có production dimensions hoặc palette được chốt.
