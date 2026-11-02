# Hải Uyên — kiểm tra push và phương án preview độc lập

02/11/2026 (Asia/Saigon). Không merge/push main, không force push, không sửa canon.

## 1. Trạng thái ban đầu và push an toàn

- Local HEAD `64349e3347d92ff6063329ceb032b639b411c0ea`, branch `work`, working tree sạch; origin fetch/push `https://github.com/letsstudy222/game06.git`. Local chưa có upstream work hợp lệ.
- Remote `main` = `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`; remote `work` = `54771f581087acb49bf6ca6e37f3f3046b7b7cfe`. Hai phía work phân kỳ: 5 commit Hải Uyên local và 28 commit Task14–34 remote. Không thể fast-forward trực tiếp local HEAD lên remote.
- Fetch cả hai nhánh, hợp nhất **origin/work vào work** tại `6102c4c77f916e2d2604d83fa8c5155cd31801f8`. Hai parent là `64349e3` và `54771f5`, không phải merge vào main. Resolve package scripts bằng hợp hai bộ tests; giữ asset validator/hash coverage từ remote và thêm entry Hải Uyên vào build. Fixture build cũ được bổ sung `data/` và `hai-uyen.html`, không bỏ assertions.
- Kiểm tra `docs/chapter1`, `docs/art`, `docs/PROJECT_DECISIONS.md`, `assets/concepts` trong merge đúng nguyên trạng origin/work. Các tài liệu/StageA đã có trên remote được bảo tồn, không đem studies vào runtime.
- Push thông thường `git push --set-upstream origin HEAD:refs/heads/work` thành công `54771f5..6102c4c`; remote `main` vẫn đúng SHA ban đầu. Commit64349e3 được giữ nguyên, có mặt trong lịch sử origin/work.
- Bổ sung fetch refspec cho work và upstream để `git branch -vv` có thể theo dõi origin/work; không đổi URL remote, không sửa main.

## 2. Pages/Actions thực tế đã đọc được

- `.github/workflows/pages.yml` trên main và work: trigger push chỉ main, có workflow_dispatch; quyền contents:read/pages:write/id-token:write; concurrency `pages`; environment `github-pages`; upload `_site` và deploy-pages. Không dispatch workflow này từ work: đó là deployment site repo hiện tại, không tạo URL preview độc lập.
- Trang repository công khai xác nhận homepage `https://letsstudy222.github.io/game06/`.
- Trang Actions công khai ghi run `41165112693` (Publish Dawn Island) và `41165112386` (pages build and deployment) trên main thành công. Đây là evidence lịch sử, không chứng minh Hải Uyên đã được publish.
- GitHub API `repos/.../pages`, `actions/permissions`, `actions/runs` bị proxy trả403 tại CONNECT tới api.github.com. Vì vậy Pages source/build_type, environment restrictions và effective Actions permissions chưa đọc được. Không suy thành thiếu token hoặc thiếu quyền write: HTTPS Git read/push đã hoạt động; có GH_TOKEN nhưng không đọc/in giá trị.

## 3. Build và prefix /game06/

- `npm test`: **220 Node tests, 0 fail** sau khi hợp nhất. Lần chạy sandbox hẹp ban đầu làm child CLI stderr không hiện; rerun với quyền chạy child-process được hỗ trợ đạt. Fixture build mới cần đủ data/entry Hải Uyên; lỗi ENOENT đã được sửa ở fixture, không skip test.
- `npm run check:syntax`: **77 JavaScript files PASS**.
- `npm run build`: `_site/index.html` (Dawn revision `d8c00e407b31`) và `_site/hai-uyen.html` (revision `9ea52f9ed807`). Dawn revision thay theo nền Task27–32 lấy từ remote; không đổi production main.
- Phục vụ `_site` qua thư mục mount `/game06/` rồi chạy `SITE_URL=http://127.0.0.1:8016/game06 ARTIFACT_DIR=/tmp/game06-deploy-prefix node tests/hai-uyen.smoke.cjs` thành công: Dawn ready/movement; Quy K3/K1; refresh giữ buff/CD; module/data cùng revision; không lỗi page/asset. CSS/font/favicon/JSON/modules dùng đường dẫn tương đối đúng prefix.
- Có thể phục vụ cùng gói dưới bất kỳ project path tương đương, không hardcode `/assets`, `/src` hoặc `/data` từ domain root.

## 4. Phương án không tác động production, đã chuẩn bị

### Build artifact trên work

`.github/workflows/hai-uyen-preview.yml` mới chạy push work, Node24, frozen npm ci, syntax/tests/build, Chromium smoke dưới `/game06/`; upload `_site` và bằng chứng thành hai artifact14 ngày. Concurrency riêng `hai-uyen-preview-*`, chỉ `contents:read`. Không pages:write/id-token, configure-pages, deploy-pages hoặc environment production. Không sửa workflow Pages đang có hay repository Actions Settings.

Artifact tải về là **gói website**, không phải URL web chơi trực tiếp. Không gọi artifact link là website đã deploy. Workflow mới phải có run thành công thực tế trước khi nói artifact đã có.

### CDN cho source công khai, không cần Pages Settings

Repository đã public. Candidate URL theo SHA của bản bàn giao:

`https://raw.githack.com/letsstudy222/game06/64349e3347d92ff6063329ceb032b639b411c0ea/hai-uyen.html`

Đây là URL bên thứ ba phục vụ source công khai từ commit bất biến, không ghi hoặc thay site Pages. Modules/maps/fonts dùng relative URL nên cùng prefix SHA. Không gửi credentials/secrets cho CDN. Không phải GitHub Pages và không có SLA của repository. **Chưa xác minh host/response hoặc gameplay ở URL này**: request raw.githack.com cũng bị proxy CONNECT403. Người dùng có thể thử link bằng trình duyệt riêng, nhưng không được mô tả nó là URL đã kiểm chứng.

## 5. Đề xuất Pages riêng — CHỜ XÁC NHẬN

Nếu muốn URL GitHub Pages chính thức tách khỏi production, đề xuất tạo **repo mới** `letsstudy222/game06-hai-uyen-preview` (chỉ nếu tên chưa tồn tại hoặc được user chỉ định khác), branch `preview`; copy đúng `_site` đã test vào `site/`. Không dùng/sửa branch main của game06, không tạo gh-pages cạnh tranh với Pages hiện tại.

Template review-only: [preview-repository-pages.yml.example](preview-repository-pages.yml.example). Chưa cài/chạy template và chưa tạo repository mới.

Những thao tác cần xác nhận trước:

1. Tạo repo preview public chỉ chứa gói build và workflow, kiểm tên chưa tồn tại trước khi tạo.
2. Trong **repo mới**, bật Pages source GitHub Actions; cho workflow contents:read/pages:write/id-token:write và environment github-pages chỉ cho branch preview. Không sửa Pages/Actions settings của game06.
3. Sau deploy, kiểm URL dự kiến `https://letsstudy222.github.io/game06-hai-uyen-preview/hai-uyen.html` bằng HTTP và browser gameplay trước khi gửi như URL hoạt động.

URL trên hiện chỉ là **dự kiến**, không phải site đã tạo. Nếu bất kỳ thao tác nào đòi quyền tổ chức hoặc setting ảnh hưởng repo hiện tại, dừng và báo lại.

## 6. Blocker mạng và hành động ngoài môi trường

Proxy đã chặn api.github.com, letsstudy222.github.io và raw.githack.com (CONNECT403; không phải404 website). Không tắt proxy/TLS hay dùng đường vòng. Đã lưu network draft thêm đúng ba domain trên, giữ preset package_managers và các trường khác. Tool trả `status:saved`, `requires_publish:true`: người dùng cần review/save trong Environment settings rồi Publish; lưu draft không tự áp dụng runtime.

Sau thay đổi mạng có hiệu lực: đọc lại environment status; retry API read để kiểm quyền Pages/Actions, rồi kiểm candidate CDN thật. Nếu chọn Pages repo riêng, vẫn cần xác nhận mục5 trước khi tạo hoặc bật settings. Không hỏi secret trong chat, không tạo PAT mới khi proxy Git đã hoạt động.
