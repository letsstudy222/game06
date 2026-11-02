# Task27 — Triển khai nền tảng asset

Ngày01/11/2026. Nhánh work, baseline d239855f476ee61bda8a5575b0709d34400ebe46 đã xác minh bằng git ls-remote trước sửa; Task25 4dd014bf là ancestor. Task26 có16tài liệu architecture đã commit/push, ADR01–03 CONFIRMED: S0trướcS1, Dawn mặc định, tăng dần/architecture-first. Không cần push bổ sung baseline; main5ad5678d giữ nguyên.

## Thay đổi thực thi

| Tệp | Thay đổi thực |
| --- | --- |
| [scripts/validate-assets.cjs](../../scripts/validate-assets.cjs) | validateManifest, validateProjectAssets, assertProjectAssets, safeFile; adapter3manifest Dawn và contract1fixture; CLI độc lập cwd, filesystem/PNG metadata, diagnostic có mã và vị trí |
| [scripts/build-site.cjs](../../scripts/build-site.cjs) | Gọi assertProjectAssets trước xóa_site; thêm atlas Phượng/font/favicon vào revision digest |
| [tests/assets.test.cjs](../../tests/assets.test.cjs) | 28kiểm thử hợp lệ/lỗi/path/CLI/build, dùng fixture tạm; không ghi asset committed |
| [package.json](../../package.json) | Thêm validate:assets và test:assets; npm test chạy thêm suite mới |

Không thêm dependency hoặc đổi package-lock. Runtime AssetLoader API/renderer/animation/input/camera/collision/scene không đổi. Build vẫn xuất_site với đường dẫn cũ, screenshots và module revision; không sinh art. Khi assets bắt buộc lỗi, build fail trước rmSync_site nên giữ output trước đó; điều này không là atomic deployment hoặc save writer.

Adapter hiện hữu nhận manifests environments/dawn, samples/dawn, tiles/dawn. Manifest production cũ dùng world thay tiles không được tự promote thành format tilemap hợp lệ. New contract chỉ fixture/validation, chưa runtime catalog hoặc loader đa species. Tất cả9ảnh tham chiếu trong default manifests hợp lệ; atlas192×288/cell96 giữ nguyên. Không áp anatomy/size Quy vào Phượng.

Mã chạy một lần trước build/CLI, không mỗi frame. PNG metadata cache dùng trong một lượt project validation, không thêm cache scene lifecycle. Runtime decode/cleanup behavior vẫn như cũ. Không claim cải thiện FPS hoặc triển khai generic loader; pending ởTask28/41khi có brief.

Chỉ mục: [contract](TASK27_MANIFEST_CONTRACT.md), [atlas](TASK27_ATLAS_AND_ANIMATION_VALIDATION.md), [paths](TASK27_PATH_AND_DEPLOYMENT_RULES.md), [errors](TASK27_ERROR_AND_FALLBACK_POLICY.md), [tests](TASK27_TEST_REPORT.md), [S0](TASK27_S0_ASSET_READINESS.md), [consistency](TASK27_CONSISTENCY_AUDIT.md).
