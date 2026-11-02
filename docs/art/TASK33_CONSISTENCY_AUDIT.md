# Task33 — kiểm tra nhất quán cục bộ và bằng chứng

01/11/2026 (Asia/Saigon). **CONFIRMED — phạm vi:** kiểm tra Task33 với các nguồn liên quan, không phải cuộc review toàn bộ Tasks01–33. **PROPOSED:** Art Bible chuyên đề chưa là visual approval. **UNRESOLVED:** các cổng production dưới đây. **SUPERSEDED:** không đổi lịch sử quyết định.

## Pre-flight Task32

Repository letsstudy222/game06, branch work; HEAD trước Task33 **1c8c1c36ce89220efc882db913cf5e062e2d7919**, worktree sạch. Đã kiểm lịch sử, mã diagnostics/test runner và [gate32](../technical/TASK32_FOUNDATION_GATE_REPORT.md), [test infrastructure](../technical/TASK32_TEST_INFRASTRUCTURE.md), [post33 handoff32](../technical/TASK32_POST_TASK33_AUDIT_HANDOFF.md). Actual remote origin/work cùng HEAD trên; origin/main **5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d**. Task32 đã commit/push, không cần commit đồng bộ trùng.

S0 trước S1, Dawn mặc định và kiến trúc tăng dần giữ CONFIRMED. [islands.mjs](../../src/island/islands.mjs) giữ FIRST_ISLAND=dawn; [main](../../src/island/main.mjs) giữ opt-in dawn-sample/debug. Task32 gate map còn body collision/clearance Task45, LayerC persistence/HP/receipts chưa hoàn tất; đây là giới hạn triển khai, không chặn lập Art Bible. Không lấy QA nền làm chứng nhận S0 hoặc production art.

## Lượt hồi quy mới, trước sửa tài liệu

Lệnh thực: `RENDER_BASELINE=/tmp/task32-before-v12d5jen/artifacts/renderer/results.json npm run test:regression`. Aggregate exit0; báo cáo tại `/tmp/game06-qa-oaSvcF/qa-results.json`, sourceHead là HEAD32 trên, build revision d8c00e407b31. Chạy trong bundle tạm, không ghi build/ảnh vào repository. Đây là đường dẫn artifact phiên làm việc, không link tài nguyên project lâu dài.

| Lệnh con đã chạy | Kết quả quan sát / exit |
| --- | --- |
| node scripts/check-syntax.cjs | PASS,69 tệp JS /0 |
| npm test | PASS,202 Node tests,0 fail /0 |
| npm run validate:assets | PASS,9 PNG /0 |
| npm run build | PASS, output /game06/ /0 |
| npm run test:browser | PASS,6 nhóm Dawn /0 |
| npm run test:ui | PASS,4 viewport /0 |
| npm run test:sample | PASS,5 nhóm /0 |
| npm run test:renderer:browser | PASS,24 RGBA hashes với baseline,8 pixel comparisons,6 DPR/resize /0 |
| npm run test:map:browser | PASS,2 DPR/4 resize, fade/layer/current fixture /0 |
| npm run test:input:browser | PASS,2 DPR/4 resize/6 re-entry và touch emulation /0 |
| npm run test:persistence:browser | PASS,38 ca IndexedDB thật /0 |
| npm run test:debug:browser | PASS,default-off/overlay/failure observer/4 resize /0 |

Không cộng số ca Node, groups, pixels và viewport thành một tổng gameplay test. Browser là Chromium headless/emulation theo hạ tầng32, không máy mobile vật lý hay đa browser. Sau các sửa **chỉ Markdown**, không cần chạy lại toàn aggregate; không báo art playback/production QA đã PASS.

## Ma trận nhất quán cục bộ

| Kiểm tra | Bằng chứng và kết quả |
| --- | --- |
| Canon/nguyên tố | [master AB33-S01/S03](ART_BIBLE_MASTER.md): Thủy/Hỏa/Phong/Mộc, Life riêng; không Thổ làm nguyên tố thứ bảy hoặc Long=Lôi |
| Tiến hóa | [visual language](CREATURE_VISUAL_LANGUAGE.md): ba stages confirmed, chi tiết/ID giữ proposal; không resize/recolor thay tiến hóa |
| Góc nhìn | [scale](PIXEL_DENSITY_AND_SCALE.md), [hướng](EIGHT_DIRECTION_ANIMATION_STANDARDS.md):3/4 là art, world2D, không skew/Z/3D |
| Asset/runtime | [workflow](ASSET_PRODUCTION_WORKFLOW.md): PNG/path/frame/clip theo27, hướng metadata không giả đã vào schema, không file Quy bịa |
| Layer/fade | [tile rules](TILESET_AND_OCCLUSION_ART_RULES.md):8 pha29, object opt-in/AABB, không pixel-mask hoặc tile fade giả |
| Map/quest | [underwater](UNDERWATER_VISUAL_DESIGN.md):đủ9 ID nguồn, không rename/graph mới; D/F optional, E04/E05/E06 tách |
| Species/art | [creature](CREATURE_VISUAL_LANGUAGE.md):6 external refs không được approve, chỉ3 ảnh đã mở trong master |
| Combat/HP | [VFX](COMBAT_VFX_READABILITY.md), [UI](UI_ART_DIRECTION.md):readability, input dodge khác mechanics, không chọn HP quyền sở hữu |
| Save/world/reward | Art chỉ trình bày projection; không ledger thứ hai, không content-version regrant, không clip callback commit |
| Mobile | Mọi chuyên đề yêu cầu small-screen/reducedFX; số đo32 không được đổi thành benchmark art mới |
| S0/S1 | [Quy brief](QUY_STAGE1_TASK34_HANDOFF.md):idle/swim minimum tách combat/full progression, chưa S0 acceptance |
| Duyệt/review | [post-completion handoff](TASK33_POST_COMPLETION_REVIEW_HANDOFF.md):review01–33 được chuẩn bị, chưa thực hiện; Task34 chưa bắt đầu |

## Tài liệu phụ thuộc cập nhật hẹp

[QUY_ART_PRODUCTION_SPEC](QUY_ART_PRODUCTION_SPEC.md) thêm chú giải Task33: câu “chưa tìm thấy Art Bible” là quan sát lịch sử18; bốn hướng là đề xuất cũ, không target art mới; bảng Chương I đầy đủ không phải minimumS0. [CREATURE_ANIMATION_REQUIREMENTS](CREATURE_ANIMATION_REQUIREMENTS.md) thêm liên kết chuẩn tám hướng và phạm vi milestone. Không đổi hồ sơ anatomy, clip/timing hoặc trạng thái đề xuất gốc thành được duyệt.

## Cổng còn mở và chủ sở hữu

| Cổng | Owner / cách xử lý | Chặn gì |
| --- | --- | --- |
| Anatomy/silhouette/palette Quy, kích thước và coverage | Người dùng + art lead, câu hỏi Q33 brief | Sản xuất sprite cuối Task34 |
| Review01–33 theo yêu cầu | Reviewers tương ứng, handoff riêng | Phải review trước Task34, không tự tuyên bố đã đạt |
| Body envelope/collision và tuning responsive | Gameplay/engine owner, tasks controller/current/camera/collision | Gameplay S0, không chặn tài liệu art |
| HP/recovery/receipts/manifestation/boss candidate | Người dùng + design/domain owner theo source | S1/boss/persistent Chapter I, không giải quyết bằng tranh |
| Ngân sách thiết bị thật/provenance ảnh mới | Technical art/QA và asset owner | Nghiệm thu production, không lấy headless làm chứng nhận |

Đây không phải phân loại P0/P1/P2 toàn dự án; review sau sẽ xác định mức độ và quyền sở hữu với bằng chứng đầy đủ. Kết quả Task33: tài liệu đủ phạm vi, **sẵn sàng bàn giao review**, chưa duyệt sản xuất sprite.

## Kiểm tra tài liệu và an toàn

Kiểm tự động tệp bắt buộc, link tương đối, cấu trúc bảng/fence, chín zone IDs, nhãn trạng thái và git diff --check; kết quả được ghi khi handoff Git. Kết quả kiểm tự động: đủ15/15 tệp bắt buộc; 209 liên kết tương đối tồn tại,37 bảng đúng số cột, fence cân bằng, đủ9 zone IDs nguồn và bốn nhãn trạng thái trong mỗi tài liệu mới. Chỉ15 tệp Art Bible mới và2 chú giải art phụ thuộc được phép thay đổi. Không runtime, PNG, atlas, map, UI, input, IndexedDB, save, package hoặc workflow thay đổi. Đối chiếu nội dung606 tệp tracked ngoài phạm vi với HEAD32 không thấy thay đổi; toàn bộ66 PNG tracked giữ nguyên. git diff --check đạt trước handoff. Không coi kiểm Markdown là visual production QA.
