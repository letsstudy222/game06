# Đảo Bình Minh — áp dụng môi trường đã duyệt

Mẫu 0.9 đã được người dùng duyệt trong yêu cầu triển khai. Link chính dùng đảo **40×28 ô, 1280×896 pixels**, không trỏ sang map mẫu 26×22. `?sample=1` vẫn giữ mẫu để đối chiếu.

## Môi trường

Tái sử dụng nguyên terrain 183 frame của mẫu: grass/cool/transition, đất/cát, nước sâu/nông, foam động, góc bờ, đá/rêu, cliff/rim/foot, stair landings và end caps. Đây là số frame bao gồm mask/animation, không phải 183 vật liệu độc lập. Profile `sun-ruins` bật đầy đủ cùng nhánh render với mẫu; không còn phụ thuộc tên map mẫu. Rừng có mood mát và dải chuyển sang clearing sáng. Bóng props dùng atlas pixel với alpha 0/48/90; chân vách dùng shading trong terrain, không blur.

Giữ silhouette đảo, hai vịnh và vùng khám phá rộng. Thềm đầu nối clearing với rừng; thềm thứ hai tạo sân đền trên cao, có rim ba phía và dải cliff/foot phía trước. Đường đá dẫn đến cầu thang hai ô rộng ở (28–29, 11–12); cột nguyên/gãy, tường sau, brazier và altar tạo trục vào. Gai ở hai vị trí cũ vẫn gây sát thương và vẫn có thể tránh bằng hover.

## Kiểm kê tài nguyên

| Nhóm | Xử lý |
| --- | --- |
| Phoenix, hướng/anchor/animation/FX | Giữ nguyên atlas và metadata |
| HUD/menu/settings/localStorage, input và combat | Giữ nguyên module/hành vi |
| Terrain prototype 0.8 | Thay bằng terrain đã duyệt; giữ file cũ làm tư liệu |
| palm, broadleaf, bush, boulder, pillar, brokenPillar, altar, brazier, flowers, fragment | Tái dùng sprite mẫu và bóng tương ứng |
| wall | Tái dùng module mẫu, thêm hai đoạn sau sân đền với collision |
| log | Dùng hình driftwood mẫu dưới ID riêng; giữ collider gỗ cũ |
| shell | Bổ sung sprite sò nhỏ theo palette mẫu, không solid |
| bramble | Bổ sung cụm dây gai có thorn silhouette; giữ hazard radius 10 và gameplay cũ |
| palmLeaning, broadleafYoung, coastalRock | Biến thể scale/lean nearest-neighbor của sprite mẫu; không phải master/silhouette vẽ tay hoàn toàn mới |

Bộ mở rộng có **18 ID props**, chung palette 64 màu, ô atlas 96px, foot anchor (48,90), bounds/gutter và shadow riêng. Tất cả ID dùng trên đảo được kiểm tra tồn tại. Không có fallback bỏ sprite âm thầm: renderer báo lỗi nếu thiếu ID.

Builder: `npm run art:dawn` lấy các atlas mẫu đã lưu, dựng bộ mở rộng ở `assets/environments/dawn/`; không cần image generation hoặc browser. `npm run art:sample` vẫn dựng lại mẫu từ masters như trước. Sau khi dựng lại mẫu, chạy `npm run art:dawn` rồi kiểm thử/build. Build đóng gói atlas mới và đưa manifest/terrain/props/shadows vào revision hash chung để tránh cache lẫn phiên bản.

## Kiểm chứng

- `npm test`: 30 kiểm tra (19 gameplay/terrain/asset, 5 camera/input/settings, 6 sample).
- Kiểm tra mới: đảo giữ kích thước; đủ ba cao độ/mood; không thiếu asset ID; mọi cell và cả bốn frame nước được render thử; tuyến shrine đi qua cầu thang thứ hai; palette/alpha/gutter/shadow và Phoenix metadata khớp mẫu.
- `npm run test:browser`: hành trình bàn phím thật clearing → cầu thang đầu → rừng → cầu thang trên → shrine/E → biển → gai; attack/fire/hover, HP, pause, focus, camera và không lỗi page/asset. Không teleport.
- `npm run test:ui`: 390×844, 360×800, 844×390, 1920×1080; đa chạm, settings, drag/reset/persistence và camera bounds.
- `npm run test:sample`: mẫu đối chiếu vẫn đi được qua hai cầu thang, shrine và coast.
- `npm run build`: site có revision cho toàn bộ module graph và tài nguyên môi trường chính.

## Ảnh gameplay

[Clearing](../artifacts/dawn-meadow.png) · [Rừng](../artifacts/dawn-forest.png) · [Biển](../artifacts/dawn-beach.png) · [Vách/cầu thang đầu](../artifacts/tilemap/cliffs.png) · [Cầu thang trên](../artifacts/dawn-upper-stairs.png) · [Đền](../artifacts/dawn-ruins.png) · [Toàn đảo](../artifacts/tilemap/overview.png) · [Mobile dọc](../artifacts/ui-after/portrait.png) · [Mobile ngang](../artifacts/ui-after/landscape.png).

## Checklist giới hạn còn lại

- [x] Bộ art/mood/shadow đã áp dụng trên đảo chính nguyên quy mô; sample vẫn riêng.
- [x] Không mất log/shell/bramble; hazard có hình và hành vi.
- [x] Ba cao độ, hai dải cầu thang, đền có bố cục kiến trúc và collision.
- [ ] Cây biến thể hiện được chuyển đổi từ cùng master; chưa phải nhiều silhouette vẽ tay độc lập.
- [ ] Chưa có 47-corner autotile/vách chéo, kit đền mọi hướng hoặc nội thất; bố cục hiện tại dùng các hướng đã có.
- [ ] Bóng hướng cố định; không có mặt trời thời gian thực. Lửa brazier trong sprite phần lớn tĩnh, ember/FX động.
- [ ] Chưa kiểm tra iPhone/Android thật hoặc Safari toolbar/notch. Kết quả mobile là Chromium giả lập.

Không có placeholder 0.8 được dùng trong runtime chính; sprite bổ sung là pixel extension dùng được nhưng không được coi là bộ art premium hoàn thiện mọi biome.
