# Quy trình nhiệm vụ phát triển

## Trước khi chỉnh sửa

1. Đọc [GAME_VISION](GAME_VISION.md), [PROJECT_SCOPE](PROJECT_SCOPE.md), [PROJECT_DECISIONS](PROJECT_DECISIONS.md), các trụ cột và tài liệu kỹ thuật liên quan. Tra [OPEN_QUESTIONS](OPEN_QUESTIONS.md) và [ASSET_REFERENCE_REGISTER](ASSET_REFERENCE_REGISTER.md) để tránh tự điền phần thiếu.
2. Kiểm tra `git status`, HEAD/branch và hướng dẫn repository; ghi nhận thay đổi có trước. Mỗi cloud task đã được cô lập: dùng checkout sẵn có, không tạo worktree nếu không được yêu cầu. Không reset/force-push hoặc xóa dữ liệu để có trạng thái sạch.
3. Chốt phạm vi task, mục tiêu nghiệm thu, non-goals và phụ thuộc. Không mở sang nhiệm vụ tiếp theo chỉ vì số thứ tự liên tiếp. Task 01 kết thúc ở tài liệu; Task 02 cần chỉ dẫn riêng.
4. Phân biệt quyết định thiết kế xác nhận với tính năng đã triển khai. Với câu hỏi chưa chốt, ghi PROPOSED/UNRESOLVED và tiếp tục phần độc lập; chỉ hỏi điều thực sự chặn công việc.

## Khi thực hiện

Thay đổi nhỏ, có thể review. Bảo tồn gameplay hoạt động, art đã duyệt, schema và dữ liệu người dùng. Không refactor engine, thay framework, cập nhật dependency hoặc generate asset ngoài phạm vi. Kiến trúc mới cần bằng chứng và quyết định riêng; không mặc định thay Canvas vì mục tiêu Windows.

Không xóa/đổi tên key `nhat-diem.ui.v1` hoặc save legacy tùy tiện. Khi thêm save/progression, thiết kế versioning/migration/fallback và kiểm tra đọc dữ liệu cũ trước khi phát hành; key cấu hình hiện tại không phải save game hoàn chỉnh. Ghi thay đổi dữ liệu môi trường có ảnh hưởng persistent state và cách giữ đường hoàn tất collection.

Khi asset thiếu, ghi tên/role/trạng thái/path còn thiếu; không giả đã xem reference, không lấy concept sheet làm atlas chưa kiểm định, không tạo hình thay thế ngoài ủy quyền. Giữ provenance/license và sự khác biệt giữa design approval, export kỹ thuật và kiểm thử clip. Task hình ảnh cần ảnh gameplay thật đúng viewport/tình huống, không dùng mockup để thay bằng chứng.

## Cài, chạy và kiểm tra theo loại thay đổi

Từ checkout `/workspace/game06` (hoặc root thực tế tương đương):

```sh
npm ci
npm test
npm run build
python3 -m http.server 8000 --bind 127.0.0.1
```

Node >=24; Python 3 cho static HTTP. Browser test dùng Playwright 1.62.1 và Chromium hệ thống nếu có; nếu cần browser của Playwright, theo README chạy `npx playwright install chromium`. Giữ TLS/checksum và proxy được cấu hình, không tắt xác minh khi cài lỗi. Không mở bằng `file://` vì ES modules/manifest cần HTTP. Server phải đang chạy cho browser suites:

```sh
npm run test:browser
npm run test:ui
npm run test:sample
```

`GAME_URL` đổi target, `CHROMIUM_PATH` chỉ định executable. Browser tests tạo/ghi lại ảnh trong `artifacts/` theo working directory; kiểm tra diff để không ghi đè bằng chứng ngoài phạm vi. `test:ui` có `ARTIFACT_DIR`; các test khác dùng path tương đối cố định. Muốn giữ repo không thay đổi, từ thư mục output ngoài checkout chạy script qua đường dẫn tuyệt đối và tạo sẵn `artifacts/ui-after` / `artifacts/tilemap` dưới đó. Không đồng thời chạy suite có cùng output path.

| Loại thay đổi | Kiểm tra cần chọn |
| --- | --- |
| Chỉ tài liệu | Đường dẫn, thuật ngữ, quyết định/canon, đối chiếu source và diff bảo đảm không chạm runtime/art; không bắt buộc rebuild hoặc chạy gameplay suite |
| Logic gameplay/map | Test logic liên quan và hành vi runtime thực; nếu đổi tuyến, cập nhật checkpoint đúng mà giữ assertions/đường đi thật |
| UI/input/camera | Browser UI bốn viewport, keyboard/touch/multitouch/persistence; báo rõ emulation khác thiết bị thật |
| Art/render | Kiểm tra atlas/metadata/palette/alpha/anchor/footprint, browser gameplay/occlusion và ảnh trước/sau; không teleport để giả hành trình |
| Build/đóng gói | `npm run build` và smoke test gói `_site` bằng HTTP: assets, module revision, ready và hành vi đại diện |

Dựng art chỉ khi task yêu cầu: `npm run art:dawn` mở rộng kit từ mẫu đã lưu; `npm run art:sample` dùng masters qua normalizer/browser rồi compiler; `npm run art:build` là pipeline prototype lịch sử, không vô tình dùng để thay bộ art mới. Xem tài liệu Dawn tương ứng trước khi chạy.

## Bàn giao và phát hành

Báo danh sách file thay đổi, lý do, kiểm tra thực sự chạy, lỗi/skip/chưa chạy, asset thiếu, phần còn dang dở và ảnh khi phù hợp. Không viết “đạt” khi chưa chạy, không lấy zero-test run làm nghiệm thu, không gộp emulation với phần cứng thật.

Cập nhật sổ quyết định và câu hỏi nếu có thay đổi đã duyệt; không ghi giả thuyết thành canon. Kiểm tra `git diff --check`, diff và trạng thái cuối; không hoàn tác thay đổi của người dùng.

Commit/push/deploy theo phạm vi ủy quyền của phiên/task. Repository có Pages workflow trên main, nhưng push thành công không tự chứng minh deploy/site hoạt động: kiểm tra workflow của đúng SHA và site nếu mạng cho phép. Nếu mạng/credential chặn, báo điều đã xác minh và giới hạn, không bịa kết quả hoặc tự xin token khi proxy sẵn có chưa được thử. Nhiệm vụ tài liệu không cần triển khai lại gameplay để được coi là hoàn tất.

## Chuẩn bị cho Task 02

Cần một đề bài riêng: lựa chọn mục tiêu cụ thể (ví dụ đặc tả slice Chương I trước khi viết code), phạm vi được phép và tiêu chí nghiệm thu. Ưu tiên cung cấp reference Quy có thể truy cập cùng mức duyệt; chốt trứng/lõi nếu nhiệm vụ đụng mở đầu; thống nhất quy cách art/animation, điều kiện traversal và giới hạn nội dung slice. Đánh giá nhu cầu save và packaging Windows theo task riêng, không ép mọi câu hỏi lớn phải có đáp án trước khi làm việc độc lập.


## Entry point sau Task08

Đọc [PHASE_I_HANDOFF](PHASE_I_HANDOFF.md) và [Master GDD](GAME_DESIGN_DOCUMENT.md) trước work package chi tiết. PROJECT_DECISIONS sở hữu approval/status, audit/readiness chỉ evidence/gates. D18/D38 foreign baseline và D39 extensibility là yêu cầu confirmed mới; B+C/HP/boss entry/factions/thresholds/storage vẫn chưa tự approved. Không dùng “design freeze” để suy PhaseI đã production-ready: hiện PARTIAL. Phần chuẩn bị Task02 ở trên là hướng dẫn lịch sử theo mốc, không hủy các task đã được người dùng giao sau đó.
