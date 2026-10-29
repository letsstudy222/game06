# Nhật Diệm · Đảo Bình Minh

Prototype phiêu lưu pixel 2D chạy trên web, giữ **HTML/CSS/JavaScript/Canvas**, không thêm framework hoặc dependency runtime. Người chơi điều khiển trực tiếp **Phượng Hoàng Nhật Diệm (Legend)** trên một hòn đảo nhỏ, không có nhân vật nông dân hay pet phụ.

**Chơi:** https://letsstudy222.github.io/game06/?v=5

## Chạy local

Từ thư mục repository, dùng Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Mở `http://127.0.0.1:8000`. Windows có thể thay `python3` bằng `py`. Cần phục vụ qua HTTP vì game dùng ES modules native; không mở thẳng `index.html` bằng `file://`. Không cần npm install hoặc build.

## Điều khiển

| Phím           | Hành động                                   |
| -------------- | ------------------------------------------- |
| WASD / Mũi tên | Di chuyển trên đảo                          |
| Giữ Shift      | Bay thấp / hover, nhanh hơn và tránh gai đá |
| J / Space      | Vũ kích về hướng đang nhìn                  |
| K              | Phóng lửa, hồi chiêu 1,8 giây               |
| Esc            | Tạm dừng / tiếp tục                         |
| Nút `?`        | Hướng dẫn ngắn, tạm dừng trong lúc đọc      |

Hotbar chỉ có ba hành động, có thể click/tap; nút Hover bật/tắt cho người dùng cảm ứng. Thiết bị cảm ứng có cần điều khiển nhỏ dưới khung game. Tối ưu chính cho bàn phím desktop.

### Những gì có thể thử

- Di chuyển tự do trong vùng đất; nước, đá và gốc cây có va chạm. Bay thấp không cho vượt nước hay đá.
- Idle, move, fly, basic attack, fire skill là năm trạng thái animation riêng. Hướng dọc dùng cùng silhouette nghiêng, hướng trái/phải được lật từ sprite gốc; bộ art bốn hướng độc lập chưa có.
- Ba bia đá để thử đòn: Vũ kích gây 1 sát thương, lửa gây 3; bia tự xuất hiện lại sau 9 giây. Không có nhiệm vụ hay phần thưởng.
- Hai cụm gai tím gây mất 12 HP khi chạm đất; có 1 giây bảo vệ giữa các lần trúng. Hover tránh gai. Sau 4 giây không bị thương, HP hồi dần; hết HP hồi sinh ở bãi cỏ.
- Tạm dừng, mở hướng dẫn hoặc chuyển tab không làm game chạy ngầm. Thả input khi mất focus để tránh nhân vật tự đi.

Bản mẫu **bắt đầu lại khi tải lại trang**, chưa có save/load cho phiêu lưu. Không đọc, xóa hoặc ghi đè bản lưu nông trại cũ `nhat-diem.farm.v1`.

## Thay đổi giao diện và mã nguồn

Màn hình mới chỉ có chân dung/tên/Legend và HP phía trên trái; tên đảo phía trên phải; ba ô hành động phía dưới. Đã bỏ ruộng, hạt giống, cuốc, bình tưới, cửa hàng, NPC, minimap và bảng nhiệm vụ khỏi runtime. Giao diện nông trại được chuyển vào `legacy/tiny-farm/`, không đóng gói lên Pages.

| File / module                                       | Trách nhiệm                                                    |
| --------------------------------------------------- | -------------------------------------------------------------- |
| `index.html`, `style.css`                           | Khung gameplay, HUD tối giản, hướng dẫn và responsive          |
| `src/island/main.mjs`                               | Khởi tạo, input bàn phím/cảm ứng, loop, scale và pause         |
| `PlayerPhoenix.mjs`                                 | Player chính, hướng nhìn, di chuyển, hover, HP và hồi sinh     |
| `IslandScene.mjs`                                   | Vẽ đảo/cache terrain, chiều sâu cây/player, sprite và hiệu ứng |
| `UIHud.mjs`                                         | HUD đọc state thật; không sở hữu luật di chuyển hay sát thương |
| `SkillSystem.mjs`                                   | Hồi chiêu, hit cone, projectile, sát thương và bia thử         |
| `AnimationController.mjs`                           | Frame, loop và trạng thái one-shot                             |
| `GameState.mjs`                                     | State của phiên chơi, điều phối update, camera, chọn đảo       |
| `islands.mjs`, `geometry.mjs`                       | Dữ liệu map/spawn/vật thể, polygon và va chạm                  |
| `scripts/generate-player-atlas.cjs`                 | Sinh atlas mở rộng từ đồ họa Nhật Diệm đã có                   |
| `tests/island.test.mjs`, `tests/island.browser.cjs` | Kiểm thử logic, asset và thao tác thực tế                      |

Các module `.mjs` chạy trực tiếp bằng browser ES modules và Node.js 24, không cần bundler. Map, player, skill và animation không phụ thuộc DOM; chỉ scene/HUD/main dùng browser APIs.

## Asset Nhật Diệm

Dùng lại silhouette, màu trắng ngà–vàng, viền đậm và đuôi đỏ rượu của Phượng Hoàng Legend đã dựng ở phiên trước, **không đổi sang sprite nhân vật khác**. Atlas player mới `assets/sprites/phoenix-player.png` có 20 frame 32×32 trong lưới 4×5, origin `[16,22]`, alpha thật. Hàng idle giữ đúng pixel từ atlas gốc; các hàng khác mở rộng chuyển động/đòn từ cùng nguồn art. Không cắt ảnh concept có nền ô cờ.

Metadata tại `assets/sprites/phoenix-player.json`; trạng thái/fps tại `AnimationController.mjs`. Để thay art, giữ frame size/origin này hoặc sửa đồng bộ metadata, animation controller và source rectangles trong scene. Bản này có silhouette trái/phải; muốn đủ bốn hướng có thể bổ sung các dải directional frame vào atlas mà không đổi luật skill.

Nền đảo được vẽ/cache riêng từ dữ liệu bằng mã pixel, không dùng ảnh nông trại/mockup cũ. Font local VT323 kèm OFL. Canvas logic 480×270, nearest-neighbor; scale nguyên 1×/2×/3× khi cửa sổ đủ lớn, co vừa ở màn hình nhỏ.

## Kiểm thử và xuất bản

```sh
node scripts/generate-player-atlas.cjs
node tests/island.test.mjs
```

13 kiểm thử logic cho đi/diagonal speed, nước/đá, hover, animation, attack/fire, cooldown, projectile, HP, hồi sinh, pause, registry đảo và atlas. Suite cũng xác minh idle giữ nguyên pixel đồ họa Nhật Diệm hiện có và PNG khớp nguồn.

Kiểm thử trình duyệt cần Playwright + Chromium có sẵn trong môi trường phát triển và server local đang chạy:

```sh
GAME_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node tests/island.browser.cjs
```

Suite dùng bàn phím và sự kiện cảm ứng thật để thử di chuyển, đánh bia, lửa, hover/gai/HP, pause, hướng dẫn, mất focus và resize 320–1920px. Ảnh kiểm tra trong `/tmp/nhatdiem-island*.png`.

Workflow `.github/workflows/pages.yml` kiểm tra và xuất bản **chỉ runtime đảo**, atlas Nhật Diệm và font; không đưa `legacy/`, test, art nông trại hoặc ảnh tham chiếu lên site. Không có bước build bundler.

## Thêm Island 2, Island 3

1. Thêm entry có id riêng vào `ISLANDS` trong `islands.mjs`: `name`, `label`, `width/height`, `seed`, `spawn`, `coast`, `meadow`, `trees`, `rocks`, `bushes`, `paths`, `targets`, `hazards`.
2. Bảo đảm spawn nằm trong `coast`, tránh đá và gốc cây; thêm kiểm thử `canOccupy` cho entry mới.
3. Đổi `FIRST_ISLAND` để chạy thử đảo mới. `GameState(id)` và `IslandScene(state.island)` dùng cùng định nghĩa, không sửa player/HUD/skills.
4. Khi bổ sung cổng liên đảo, controller gọi `state.setIsland(id)` và tạo lại `IslandScene` cho map mới, cập nhật `hud.scene`; chờ atlas sẵn sàng rồi tiếp tục loop. Prototype hiện chưa có cổng đi sang đảo khác.

Kẻ địch có thể thêm như entity có `x/y/hp` và update riêng; hit logic đi qua `SkillSystem`. Vật phẩm/nhiệm vụ sau này nên có hệ thống/state riêng, không nhét vào HUD.

## Phạm vi hiện tại

Một đảo, một player Nhật Diệm, ba hành động, bia thử và gai; chưa có kẻ địch AI, đồ nhặt, nhiệm vụ, save phiêu lưu hay liên kết đảo. Mã/asset nông trại cũ được giữ để tham khảo, không phải thành phần hoạt động của bản mẫu này.
