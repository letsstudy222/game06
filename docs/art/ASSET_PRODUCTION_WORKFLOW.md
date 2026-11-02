# Quy trình sản xuất và tích hợp mỹ thuật

Nguồn: [AB33-S02/S04/S09–S14](ART_BIBLE_MASTER.md), [manifest27](../technical/TASK27_MANIFEST_CONTRACT.md), [path27](../technical/TASK27_PATH_AND_DEPLOYMENT_RULES.md). **CONFIRMED:** dùng pipeline thực hiện hữu, không thay Phượng/Dawn. **PROPOSED AB33-P11:** quy trình và vai trò nghiệm thu dưới đây. **UNRESOLVED:** người phụ trách thực tế, ngân sách và phê duyệt visual cuối. **SUPERSEDED:** giữ lịch sử nguồn.

## Cổng sản xuất — PROPOSED

| Bước | Đầu ra và bằng chứng | Vai trò chịu trách nhiệm / quyền quyết |
| --- | --- | --- |
| 1. Đề xuất concept | Brief, ràng buộc canon, nguồn ảnh/quyền sử dụng, vài phương án | Art director lập; continuity reviewer kiểm canon |
| 2. Duyệt định hướng | Quyết định phạm vi, phương án được chọn, phần còn mở | Người dùng/product owner phê duyệt, không suy từ số lần lặp |
| 3. Duyệt silhouette | Hình đen, gameplay scale, so loài/stage | Character/environment lead trình; người dùng duyệt nhận diện |
| 4. Duyệt palette | Ramp, nền thử sáng/tối/rối, accessibility preview | Art lead trình; người dùng duyệt màu cuối |
| 5. Keyframes | Anatomy nhất quán, tám hướng theo coverage được duyệt, anchor/bounds | Artist sản xuất; technical artist kiểm density/metadata |
| 6. Animation | Clip thực, loop/transition/marker, fallback rõ | Animator và gameplay owner đối chiếu cơ chế đã duyệt |
| 7. Atlas | PNG alpha, rect/grid, export/source revision và provenance | Technical artist; không crop extrema hoặc thay image để qua validator |
| 8. Manifest validation | File tồn tại, path/dimensions/frame/clip/integrity hợp lệ | Tool27 + engineer kiểm; không đồng nghĩa duyệt art |
| 9. Preview in-engine | Opt-in fixture/scene, đúng scale/anchor/layer, không đổi default | Engineer tích hợp hạn chế sau task cho phép |
| 10. Browser QA | Desktop/mobile emulation, resize/DPR, missing asset, readability | QA ghi command, exit, ảnh và lỗi thật |
| 11. Hiệu năng | Load/memory/frame cost trên môi trường công khai, reduced FX | Technical artist/engineer đo, không tự đặt kết quả |
| 12. Nghiệm thu | Quyết định chấp nhận, scope/mốc, các giới hạn còn lại | Người dùng/product owner; commit/push có kiểm tra scope |

Tên vai trò là phân công đề xuất, không khẳng định đã có người hoặc agent được giao. Riêng Quy I: review01–33 theo [handoff](TASK33_POST_COMPLETION_REVIEW_HANDOFF.md) phải diễn ra trước Task34, sau đó duyệt các câu hỏi [brief](QUY_STAGE1_TASK34_HANDOFF.md). Task33 không thực hiện các bước sản xuất hình.

## Từ brief tới contract hiện có

Generic assetContractVersion1 hỗ trợ các loại sprite-atlas, tileset, environment-image, effects-image, decoration, hiện kiểm **PNG**. Asset ID riêng với species/form/stage/ability/clip; dùng ID đã duyệt khi có, fixture không biến thành catalog production. Không sáng tạo filename PNG Quy cuối hoặc đăng ký file chưa tồn tại.

Đường nguồn tương đối assets/, không URL, traversal, query/hash hay prefix /game06/. Build chuyển thành URL deploy đúng base; không hardcode đường máy. width/height khai báo phải khớp PNG; frameWidth/frameHeight nếu dùng phải là số nguyên dương chia hết atlas. Frame id/rect và clip id/frameIds/timing phải hợp lệ; requiredClips và requiredFrameMetadata theo milestone, không yêu cầu mọi clip cho S0.

Anchor là tuple[x,y] trong frame, bounds là[left,top,right,bottom] đúng validator. Hướng/mirroring/fallback là hợp đồng renderer/brief, không mặc định mọi trường direction metadata đã được schema27 hỗ trợ. Provenance, trạng thái duyệt anatomy, frame markers gameplay hoặc source-layer file có thể nằm trong hồ sơ bàn giao ngoài schema; không khẳng định validator kiểm quyền tác giả hoặc combat timing.

## Mức độ sẵn sàng không được gộp

Concept bằng chữ → reference ảnh thật → hình được duyệt → sprite xuất thật → atlas được validate → runtime tích hợp → gameplay/visual QA đạt là các mức khác nhau. File có checksum không có nghĩa palette đã được duyệt; build PASS không đủ chứng nhận đẹp/đọc được. Missing required actor asset chặn scene-ready, không dùng Phượng thay Quy. Decoration optional có thể bỏ an toàn nếu không mang cue bắt buộc.

## Kiểm tra và Git

Các lệnh thực hiện ở task triển khai sau khi có asset: npm run validate:assets, npm test, npm run build và browser suites thích hợp; aggregate npm run test:regression tạo bundle tạm. Đưa asset hợp lệ vào inventory đúng cách để runner có dữ liệu kiểm; không commit _site/cache/screenshots tạm hoặc save/profile thật. Không gọi asset generation chỉ để kiểm PNG đã có.

Trước commit kiểm diff, binaries ngoài scope, quyền nguồn và git diff --check; stage tường minh. work là nhánh tích hợp, main là public baseline; push thường, không force/reset. [.github/workflows/pages.yml](../../.github/workflows/pages.yml) deploy khi push main hoặc dispatch; không merge/dispatch để preview art. Preview riêng cần task/quyền phù hợp.

## Hiệu năng và vòng đời

**PROPOSED:** validate một lần ở build/load, cache ảnh theo loader hiện có, tải theo scene và giữ quyền sở hữu tài nguyên rõ. Không decode/check atlas mỗi frame. Atlas lớn phải đo decode/memory chứ không chỉ PNG bytes; dispose event listeners/scene references, optional art giảm chất lượng không giảm cue. Task33 không sửa loader, cache, CI hoặc manifest.
