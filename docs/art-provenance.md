# Nguồn đồ họa và quy trình production

Tất cả môi trường/props/Phoenix mới được tạo bằng công cụ image generation trong phiên làm việc này. Không lấy tài sản Stardew Valley hoặc game thương mại khác. Thiết kế Phượng Hoàng tham chiếu hình có sẵn của dự án `assets/phoenix-3-v2.png`: thân ngà, cánh vàng, đuôi đỏ rượu. Tài liệu này ghi nguồn kỹ thuật, không xác nhận quyền pháp lý của hình tham chiếu do người dùng cung cấp.

| Master đã lưu | Nguồn lần tạo | Runtime |
| --- | --- | --- |
| `assets/production/dawn/world-master.png` | exec-c2e679a8-fa99-4310-b717-9437b183a8f8 | dawn/world.png, 960×640 |
| `assets/production/dawn/props-master.png` | exec-57491c31-1dd8-4bd8-b928-d96fc6dafb72 | dawn/props.png, 192×288 |
| `assets/production/phoenix/master.png` | exec-b3ae4170-a285-4b0d-af40-4ca87fa0c0a0 | phoenix/atlas.png, 192×288 |

Một sheet thử đầu tiên (exec-7e58c0c1-0558-4315-a3fd-b9c1eb4dc100) bị cắt đầu cánh nên bị loại, không đưa vào runtime. Sheet thay thế có sáu pose hoàn chỉnh và khoảng trống alpha.

`normalize-production.cjs` dùng những source rectangle và chân neo đã kiểm tra, đưa vào ô 96px, resize nearest-neighbor, lượng tử palette và alpha nhị phân. Manifest ghi source rectangles, anchor, palette và bounds sau xử lý. Kiểm tra tự động đọc PNG thực để xác nhận alpha/gutter và số màu, không chỉ kiểm tra tên file. Không cắt nhân vật từ ảnh concept có nhãn hoặc nền caro.

Ground và props dùng chung palette tối đa 128 màu; Phoenix tối đa 48 màu. Cây/đá/bụi/đá rune có sprite riêng. Nước, bóng và kỹ năng dùng các điểm/đường pixel động; chúng là hiệu ứng, không thay thế art nhân vật/cây/đá bằng hình học.

## Giới hạn cần nói rõ

Sáu pose gốc tương ứng hai nhịp cánh ở mỗi hướng trước, trái, sau. Phải dùng lật gương. Idle có biến thể lông/đuôi đăng ký theo pixel; move/fly thay pose và nhịp; attack/fire/hurt phối pose, chuyển động và hiệu ứng. Sáu trạng thái hoạt động không đồng nghĩa sáu bộ hoạt ảnh vẽ tay độc lập. Để đạt animation production đầy đủ cần bổ sung frame anticipation/contact/recovery cho đánh, tích/phóng lửa và trúng đòn, rồi kiểm tra lại silhouette từng hướng.

Nền là tranh pixel đã chuẩn hóa cho một đảo, không phải bộ tile ghép vô hạn. Ảnh `artifacts/dawn-*.png` là ảnh trình duyệt render thật, tách biệt với master. Font VT323 dùng giấy phép OFL đi kèm.
