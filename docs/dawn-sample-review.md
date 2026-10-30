> Cập nhật: mẫu 0.9 đã được người dùng duyệt và áp dụng lên đảo chính. Xem [bàn giao toàn đảo](dawn-full-environment.md). Nội dung bên dưới mô tả mốc lịch sử trước khi nhân rộng.

# Dawn Island — sample môi trường để duyệt, 0.9

## Phạm vi

Mở `/?sample=1` để chơi mẫu. Mở URL không có `sample=1` để xem đảo 0.8 hiện tại. Đây là **mẫu riêng chờ duyệt**, chưa áp dụng art mới ra toàn đảo.

Giữ nguyên atlas Phượng Hoàng, animation/skills, HP/combat/interact, UI, menu/settings và keyboard/touch controls. Chỉ bổ sung dữ liệu map mẫu, tài nguyên môi trường, các nhánh render cho bộ art mới và bộ kiểm tra. `DawnMap.mjs` và các atlas môi trường 0.8 không bị ghi đè.

Mẫu 26×22 ô, **832×704 pixels**, tile **32×32**. Kích thước lớn hơn đề xuất ban đầu một chút để cây/kiến trúc có khoảng trống và camera phù hợp cả mobile dọc. Bố cục lấy Fantasy Island làm chủ đạo, Mystic Ruins làm landmark phụ; tỷ lệ 70/30 là định hướng composition, không phải đếm cứng số ô.

## Đã triển khai

- **Coast:** nước sâu/nông, cát khô/ẩm, bờ có foam bốn frame, góc bờ lõm và vỏ sò/driftwood. Không có tranh nền toàn cảnh.
- **Clearing:** cỏ ít nhiễu quanh Phoenix, đường đất dẫn qua bãi cỏ tới thềm trên; hoa/đá/bụi được đặt ở biên vùng chơi.
- **Elevation:** ba giá trị elevation 0/1/2, hai dải vách có cầu thang, rim trái/phải/phía sau để tránh đi tắt qua sườn. Có landing trên/dưới và end caps tiếp giáp cầu thang.
- **Forest:** tán cây dày ở biên trái, mặt cỏ có palette mát và dải chuyển màu sang vùng sáng. Mẫu dùng phạm vi canopy fade phù hợp tán sprite mới, giữ Phoenix đọc được khi đi phía sau cây.
- **Ruins:** trục cầu thang → đường đá → sân đền → bàn thờ; cột nguyên/gãy hai bên, tường trang trí phía sau, mảnh đá và hai brazier. Đây là một quần thể shrine ngoài trời, không phải các props rải ngẫu nhiên.
- **Lighting:** hướng sáng trên trái được giữ ở vật liệu/sprite; bóng tiếp xúc và bóng chiếu xuống phải được dựng thành atlas pixel riêng, ba mức alpha 0/48/90, không dùng blur toàn cảnh. Forest mát hơn, sân đền dùng đá/rêu mát và lửa vàng, clearing/cát ấm sáng.

## Bộ art và nguồn

Runtime sample dùng `assets/samples/dawn/manifest.json`, `terrain.png`, `objects.png`, `shadows.png`. Hiện có **183 frame terrain, 12 loại object, palette môi trường 64 màu**. Số frame bao gồm biến thể mask và animation; không đồng nghĩa 183 thiết kế vật liệu độc lập.

Terrain có grass/cool grass/transition grass, sand, dirt paths, shallow/deep water, bờ bốn hướng và góc, cliff/foot/rim theo hướng, stone path, ruins floor/moss và stair/landing/caps. Các props: palm, broadleaf, bush, boulder, brokenPillar, altar, pillar, wall, fragment, brazier, flowers, driftwood. Mỗi sprite có crop nguồn đã kiểm tra, bounds, rect atlas, foot anchor và shadow anchor.

Ba master được tạo bằng image generation cho dự án, không dùng pack của game thương mại:

| Nguồn master | Lần tạo | Công dụng |
| --- | --- | --- |
| `masters/foliage-stone.png` | exec-7a03bd6c-5af7-49cc-bbae-d13d1086afde | Sáu vật thể tách alpha: cây, bụi, đá, cột, bàn thờ |
| `masters/structure.png` | exec-7154f21d-6303-40a5-ae4d-9986e564f959 | Cột, module tường, rubble, brazier, hoa, driftwood |
| `masters/materials.png` | exec-ccbaa661-d382-4429-966e-bfd2fa3e100b | Sáu swatch chất liệu riêng, không phải một scene |

Master không phải runtime art. Normalizer chọn crop/foot thủ công, đưa object vào ô 96px với gutter, normalize swatch xuống **32px**, nearest-neighbor, alpha nhị phân và palette chung. Builder ghép tile/mask/animation, làm yên texture tại clearing, dựng shadow masks và manifest. Không cắt một minh họa cả đảo thành các mảnh. Bản chụp overview là ảnh trình duyệt, không được dùng làm nền game.

## Chạy và dựng lại

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# Mở http://127.0.0.1:8000/?sample=1
# Terminal khác, từ root repository:
npm ci
npm run art:sample
npm test
npm run test:sample
ARTIFACT_DIR=artifacts/sample/ui GAME_URL='http://127.0.0.1:8000/?sample=1' npm run test:ui
npm run build
```

`art:sample` cần server đang chạy và Chromium/Playwright như README; dùng các master đã lưu, không gọi lại image generation. `ASSET_URL` và `CHROMIUM_PATH` có thể ghi đè đường dẫn. Source normalizer ghi rõ các crop thủ công vì master không phải mọi object đều nằm gọn trong ô 512px giả định ban đầu. Compiler `build-sample-art.cjs` dùng PNG đã normalize và không cần browser.

## Kiểm chứng

- **28 kiểm tra logic/asset:** 17 gameplay gốc, 5 camera/input/settings và 6 sample mới. Kiểm tra đường tới coast/forest/both stairs/shrine, vách solid, ba cao độ, atlas/palette/alpha/gutter và shadow masks.
- Browser tour bằng phím thật, không teleport: di chuyển + attack, hover, fire, qua hai cầu thang, đến đền nhấn E, xuống bãi biển; camera bounds và không lỗi page/HTTP. Kiểm tra link gốc vẫn vào `dawn`.
- UI suite trên sample: 390×844, 360×800, 844×390 và 1920×1080; đa chạm, xoay màn hình, drag/reset/persistence, menu, bàn phím và safe bounds. Giao diện không được thiết kế lại trong nhiệm vụ này.
- Ảnh và kết quả máy đọc nằm trong `artifacts/sample/` và `artifacts/sample/ui/`. Chưa thử trên iPhone/Android thật; không khẳng định hiệu năng/toolbar/notch thực tế đã được xác nhận.

## Ảnh runtime để đánh giá

- [Clearing](../artifacts/sample/clearing.png)
- [Cliffs / stairs](../artifacts/sample/cliffs.png)
- [Forest](../artifacts/sample/forest.png)
- [Ruins / altar](../artifacts/sample/ruins.png)
- [Coast](../artifacts/sample/beach.png)
- [Overview](../artifacts/sample/overview.png)
- [Mobile portrait](../artifacts/sample/ui/portrait.png) / [landscape](../artifacts/sample/ui/landscape.png)

## File chính

`DawnSample.mjs` và registry/entry query chọn map mẫu; `WorldLayer.mjs` xử lý material/mood/foam/caps có điều kiện cho sample; `EnvironmentShadows.mjs`/`IslandScene.mjs` dựng bóng và props. AssetLoader có shadows tùy chọn. `scripts/normalize-sample-*`, `build-sample-art.cjs`, `pixel-kit.cjs` là pipeline art. Build site đóng gói runtime sample, không ship masters hoặc compiler intermediate. Các import/assets dùng revision để tránh cache lẫn phiên bản.

## Checklist sau mẫu / giới hạn còn lại

Các P0 trong [audit gốc](production-asset-checklist.md) đã có đại diện dùng được trong composition mẫu, nhưng **chưa được người dùng duyệt mỹ thuật**. Không đổi trạng thái thành approved tự động.

- Bộ vách/góc chỉ bao phủ các hướng/đầu mút dùng trong sample; chưa có toàn bộ 47-corner autotile, vách chéo, mọi kiểu nối cao độ.
- Mỗi loại cây/props mới chỉ có một silhouette chính. Cần thêm biến thể cây, đá, rubble trước khi nhân rộng để tránh lặp.
- Module kiến trúc hiện là shrine ngoài trời với tường trước/cột/bệ, chưa có kit đền mọi hướng hoặc nội thất.
- Contact/cast shadow là mặt nạ định hướng cố định, không phải hệ mặt trời thời gian thực. Foam loop và flame art vẫn cần đánh giá nhịp; lửa trong sprite hiện tĩnh, ember/FX động.
- Bề mặt grass/path/cliff còn có thể cần art pass tiếp sau phản hồi ở zoom chơi thật; không coi số lượng atlas hoặc test pass là chứng nhận chất lượng nghệ thuật.
- Chưa có NPC/story/portal mới; không thêm gameplay mới vào sample. Phoenix giữ nguyên giới hạn pose của phiên bản trước.

**Bước tiếp theo:** duyệt hình ảnh và gameplay của chính sample này. Sau khi duyệt, khóa palette/material/light/prop scale rồi mới áp dụng sang vùng còn lại của Dawn Island. Hiện tại chưa nhân rộng.
