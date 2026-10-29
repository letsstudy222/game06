# Nhật Diệm · Khu vườn linh thú

Bản thử nghiệm game nông trại pixel trên trình duyệt, không cần build hoặc dependency.

## Chạy tại máy

```sh
cd /workspace/game06
python3 -m http.server 8000 --bind 0.0.0.0
```

Mở trang gốc trên server. Chạm vào cỏ để gọi Phượng Hoàng, chọn ba hình thái, bay lượn, tạo lửa hoặc đổi ngày/đêm. Có nút tạm dừng và hỗ trợ reduced motion. Âm thanh chỉ phát sau khi bật bằng nút.

## Xuất bản

Workflow `.github/workflows/pages.yml` xuất bản khi push lên `main`. Nếu repository chưa bật Pages, vào Settings → Pages → Source: GitHub Actions. Địa chỉ dự kiến: https://letsstudy222.github.io/game06/ (chỉ khả dụng sau khi deploy thành công).

## Mỹ thuật

Ảnh chân dung Phượng Hoàng Nhật Diệm được lấy từ repository của chủ dự án `letsstudy222/ankis`, commit `4f2d050be28aa349ee6ea43c918d60c37adf1e87`, các file `assets/pets/legend/phoenix-{1,2-v2,3-v2}.png` theo yêu cầu chủ dự án. Nhân vật pixel được vẽ riêng bằng Canvas, có chuyển động cánh, đuôi và bay; ảnh chân dung gốc không phải sprite sheet. Nền nông trại chi tiết `assets/garden-detailed.png` được tạo riêng bằng công cụ tạo ảnh; cây, nhà gỗ, hồ và vườn rau được tích hợp với hiệu ứng Canvas. Mã nền đơn giản được giữ làm dự phòng nếu ảnh không tải được. Không sử dụng tài sản Stardew Valley. Phông Be Vietnam Pro tải qua Google Fonts; có phông sans-serif dự phòng.
