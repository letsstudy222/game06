# TỨ LINH KHỞI NGUYÊN — HẢI UYÊN PREVIEW

Ngày tổng hợp: 2026-11-03.

## ĐỌC TRƯỚC KHI UPLOAD

Đây là **bản DEMO độc lập từ Bước 14** + thư viện concept, **KHÔNG** phải game hoàn chỉnh 4 phòng từ Codex, và **KHÔNG** phải bộ sprite art cuối.

**Phương án an toàn cho website sẵn có**: Trong repo `letsstudy222/game06` trên nhánh dùng để deploy GitHub Pages (`main` nếu workflow đó dùng `main`), tải lên **cả thư mục `hai-uyen-preview/`** để tạo URL:

`https://letsstudy222.github.io/game06/hai-uyen-preview/`

Cách này **không ghi đè** `index.html` gốc của trang game06.

**Nếu muốn dùng làm website mới**: Đưa **các file bên trong** `hai-uyen-preview/` lên root của một repo có Pages. Khi đó `index.html` là trang đầu, `hai-uyen.html` là trò chơi thử.

Không upload file ZIP nguyên vẹn rồi mong GitHub Pages tự giải nén. Cần **giải nén** và tải đúng cây thư mục.

## Cấu trúc

- `hai-uyen-preview/index.html`: trang giới thiệu; có nút chơi demo.
- `hai-uyen-preview/hai-uyen.html`: playable demo Bước 14 (WASD, mũi tên, mobile buttons; E tương tác cổng).
- `hai-uyen-preview/assets/`: PNG thật của Bước 14 và manifest.
- `hai-uyen-preview/thu-vien.html`: bộ 10 hình concept đã chốt được nén để xem trên web.
- `hai-uyen-preview/tham-chieu/`: gallery images; không phải spritesheets để engine tự dùng.
- `hai-uyen-preview/huong-dan.html`: hướng dẫn xem ngay trên web.

## Phạm vi thực sự

| Giai đoạn | Nội dung | Đánh giá |
|---|---|---|
| 01–02 | Kiểm kê và khóa mẫu | Đạt về tài liệu |
| 03–04 | Tile nền, demo môi trường | Đạt về kỹ thuật; chưa đạt mỹ thuật |
| 05–06 | Cổng động và cảnh kiến trúc | Prototype; chưa đạt final art |
| 07–11 | Cột/props và thử ghép | Ứng viên; phối cảnh và tỉ lệ chưa đồng nhất |
| 12–14 | Nền painted, va chạm và demo sạch | Có demo HTML; chưa đủ gameplay |

Các tính năng **KHÔNG có trong gói này**: A1↔B1↔LAB↔ARENA, hai quái, miniboss hai phase, K1–K4/Thủ Mai đầy đủ, checkpoint và 3 slot save của **Codex vertical slice**. Những phần đó được Codex phát triển trong repo `game06` nhánh `work` và **không nằm trong các thư mục asset Bước 01–14 đã tổng hợp**. Đừng coi gói này là bản thay thế cho commit ấy.

## Chú ý trước khi upload

- Nếu đưa mọi file trong `hai-uyen-preview` ra root `game06`, `index.html` **sẽ thay trang game cũ**. Chỉ thực hiện nếu thực sự muốn thay thế.
- Muốn liên kết từ website cũ thì thêm hyperlink đến `/game06/hai-uyen-preview/` bằng GitHub editor (không bắt buộc).
- GitHub Pages cần bật cho nhánh và đường dẫn đang dùng, hoặc Actions workflow tự xuất bản những file này.
- Nếu game không hiện hình, kiểm tra đường dẫn tương đối của `assets/` và DevTools/Network.

## Nghiệm thu

- Kiểm tra cấu trúc file, ảnh và đường dẫn tương đối, thư mục asset và checksum trong `SHA256SUMS.txt`.
- Chromium headless **bị môi trường chặn localhost (`ERR_BLOCKED_BY_ADMINISTRATOR`)**. Chỉ kiểm thử được đường dẫn, cú pháp JavaScript, dữ liệu asset, PNG và ZIP bằng công cụ tĩnh; xem `TEST_REPORT.txt`.
- Không xác nhận site công khai đã được upload; cần tự tải lên GitHub.
