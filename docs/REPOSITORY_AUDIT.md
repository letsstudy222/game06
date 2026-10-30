# Kiểm kê repository — Task 01/96

**Ngày:** 30/10/2026 (Asia/Saigon). **Repository:** `letsstudy222/game06`. **Baseline:** `6b502c075a0649a2edcba1f2ba8956b5e599720c` — Apply approved sun ruins environment across full Dawn Island. Checkout `/workspace/game06`, nhánh local `work` ở lần kiểm tra; commit này đã được đưa lên remote main ở nhiệm vụ trước. Task 01 không thực hiện fetch để suy trạng thái remote mới.

Working tree sạch trước khi soạn tài liệu; không thấy `AGENTS.md` trong lần tìm kiếm tại workspace. Không reset, đổi branch hoặc tạo worktree.

## Công nghệ và cấu trúc thực tế

| Thành phần | Bằng chứng / trách nhiệm |
| --- | --- |
| Browser runtime | [index.html](../index.html), [style.css](../style.css), [main.mjs](../src/island/main.mjs): HTML/CSS, JavaScript ES modules và Canvas 2D; không React/Phaser/Godot trong runtime hiện hành |
| Mô phỏng | `GameState`, `PlayerPhoenix`, `SkillSystem`, `AnimationController`, `geometry` dưới `src/island/`: input, movement/collision, HP/hazard/respawn và skill cooldown |
| Render / môi trường | `WorldLayer`, `IslandScene`, `EnvironmentShadows`, `AssetLoader`: tile culling, depth sorting/canopy fade, atlas và bóng pixel |
| UI / input | `InputManager`, `MobileJoystick`, `ActionButtons`, `UIHud`, HUD con, `GameMenu`, `ResponsiveLayout`, `UISettings` |
| Bản đồ | [islands.mjs](../src/island/islands.mjs) đăng ký `dawn` và `dawn-sample`; query `sample=1` chọn mẫu, mặc định `dawn` |
| Tooling | [package.json](../package.json), [lockfile](../package-lock.json): Node >=24, npm, Playwright 1.62.1 dev dependency; không bundler/runtime backend bắt buộc |
| Build | [build-site.cjs](../scripts/build-site.cjs): tạo `_site`, sao chép static runtime và thêm revision cho module/assets; không đóng gói Windows |
| CI | [pages.yml](../.github/workflows/pages.yml): kiểm tra cú pháp, `npm test`, build rồi GitHub Pages khi push main |
| Art pipeline | `scripts/normalize-*`, `build-sample-art.cjs`, `build-dawn-environment.cjs`, `pixel-kit.cjs`; phân biệt master và atlas export |
| Kiểm thử | `tests/*.test.mjs` cho logic/assets/settings; `*.browser.cjs` cho bàn phím/UI/sample với Playwright |
| Lịch sử | `legacy/tiny-farm/`, `legacy/island-prototype/`: không phải app hiện tại và không được coi là hệ farming trong tầm nhìn mới |
| Tài liệu hiện hữu | `docs/architecture.md`, tài liệu Dawn/sample/UI, provenance/checklist, rebuild reports: giữ làm nguồn kỹ thuật/lịch sử; bộ GAME_VISION và tài liệu liên quan định hướng thiết kế từ Task 01 |

## Khả năng truy cập và bằng chứng

Source, test, manifest và tài nguyên nêu trên đọc được. Có `index.html` runtime và artifact `_site/index.html` local tại thời điểm kiểm kê. Đây là **artifact build có sẵn**, không phải một lần build/chơi thử mới trong Task 01. Không truy cập site công khai, chạy browser suite, test gameplay hay kiểm tra Windows/mobile phần cứng trong task tài liệu này.

Đã xem trực tiếp reference `assets/phoenix-3-v2.png`. Đã decode PNG: Phoenix atlas 192×288, Dawn terrain 256×736, Dawn props 384×480; đọc metadata frame/anchor. Không tìm thấy tệp Quy/Long/Ly nhận diện được trong danh sách asset của checkout; không tuyên bố đã xem ảnh ngoài repository. Chi tiết tại [asset register](ASSET_REFERENCE_REGISTER.md).

Tile thực tế là 32×32: Dawn chính 40×28 = 1280×896, mẫu 26×22 = 832×704. Atlas Phoenix có 6 pose, hướng phải mirror; trạng thái runtime khác bộ clip production đầy đủ.

## Năng lực đang có và cần giữ

- Một Phoenix điều khiển trực tiếp, keyboard/touch/đa chạm, di chuyển, attack/fire/hover, HP, sát thương gai, hồi HP và hồi sinh.
- Tile collision, camera bounds/integer scaling, nearest-neighbor, depth sorting/canopy fade, các vùng và shrine tương tác.
- HUD, pause/help/menu/settings; `nhat-diem.ui.v1` lưu cấu hình điều khiển/UI qua localStorage. Giữ dữ liệu legacy; không coi key UI là save progression.
- Đảo chính dùng art direction mẫu đã duyệt; mẫu riêng vẫn tồn tại. Giữ atlas Phoenix, ảnh/master và pipeline hiện có.

## Khoảng cách với tầm nhìn mới

Chưa có hệ linh thể/resonance, đổi ba dạng, khóa loadout boss, collection/XP/level/evolution có tiến trình, quest bốn chương hoặc trạng thái thế giới được lưu. HUD hiển thị level/Legend không chứng minh hệ level/rarity đã hoạt động. Các map hiện tại có `targets: []`; tồn tại combat logic và test target không đồng nghĩa đã có hệ sinh thái enemy/boss đầy đủ.

Shrine reset khi tạo lại GameState/tải trang. Chưa có slice Quy/Vực Hải Uyên, traversal dưới nước hay pipeline Windows được kiểm chứng. Nền browser hiện hành được xác minh; lựa chọn kiến trúc sản xuất dài hạn vẫn cần đánh giá có căn cứ. Đảo Bình Minh chưa được xác nhận là Đảo Nhật Diệm của Chương II.

## Phạm vi kiểm định Task 01

Kiểm định tài liệu bằng đọc/đối chiếu source, đường dẫn Markdown, đủ mục/thuật ngữ/trạng thái và diff chỉ tài liệu. Không dùng kết quả QA trước làm kết quả chạy mới. Mọi thay đổi nằm ở README và tài liệu mới; không sửa gameplay, art, tests, dependency/lockfile, CI hoặc generated site.
