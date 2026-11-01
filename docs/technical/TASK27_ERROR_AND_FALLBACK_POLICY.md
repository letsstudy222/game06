# Lỗi, warning và fallback

Diagnostics thực có severity, code, location gồm manifest/asset/field, message tiếng Việt; CLI/build in stderr và nonzero khi có error. Không throw raw JSON thành scene thành công. Chỉ missing optional file được hạ severity; optional nhưng schema/metadata/integrity sai vẫn error.

| Mã / nhóm | Hành vi được triển khai | Runtime/scene implication |
| --- | --- | --- |
| MISSING_REQUIRED_ASSET | Error, CLI/buildfail | Không asset thay thế hoặc ảnh loài khác |
| MISSING_OPTIONAL_ASSET | Warning, không thêm file vào report.files | Có thể bỏ decor ở content consumer tương lai; chưa có loader generic tự render fallback |
| INVALID_MANIFEST / UNSUPPORTED_FORMAT | Error: schema/version/type/JSON/PNGheader không hỗ trợ | Không activate nội dung không hiểu |
| INVALID_PATH / IMAGE_READ_ERROR | Error | Không đọc ngoài project hoặc giả resource hợp lệ |
| INVALID_DIMENSIONS / INVALID_FRAME_INDEX / INVALID_FRAME_BOUNDS | Error | Không crop tùy tiện hoặc sửa atlas |
| DUPLICATE_ID / INVALID_ID | Error | Không last-write-wins trong bundle |
| INVALID_ANIMATION_REFERENCE / INVALID_ANIMATION_DURATION / MISSING_REQUIRED_CLIP | Error | Required action không dùng idle giả |
| INVALID_ANCHOR / INVALID_VISUAL_BOUNDS | Error | Không tự đặt origin không có chứng cứ |
| MISSING_REQUIRED_METADATA | Error khi milestone yêu cầu | S0 actor cần anchor/bounds explicit |
| MISSING_OPTIONAL_METADATA | Warning khi không yêu cầu | Contract validation chưa là production readiness |
| CACHE_VERSION_MISMATCH | Error khi sha256 được khai báo nhưng sai | Không silently dùng data khác expected digest |
| Image decode failure | Loader hiện hữu ném lỗi decode và boot hiển thị lỗi | Không sửa runtime loader ở27; không gọi header validation là decode đầy đủ |

Ảnh shadows trong legacy manifest nếu khai báo vẫn required, vì renderer đang get/draw nó; không âm thầm hạ optional để vượt regression. Contract1 optional decoration hỗ trợ warning-and-omit ở build report; chưa đưa generic manifest vào runtime. Required Quy actor trong future scene phải required và qua contract milestone; marking optional không phải cách vượt scene readiness. Fallback hình tương thích còn cần duyệt/art và integration; không có fallback Phoenix→Quy. Không tạo scene manager/placeholder/image.

Validation một lượt, metadata cache cục bộ, không validate mỗi frame. Giữ resource ownership/cleanup hiện hữu vì runtime không đổi. Không đo hoặc khẳng định tiết kiệm FPS/RAM; full decode, atlas lớn và scene-specific release còn việc sau.
