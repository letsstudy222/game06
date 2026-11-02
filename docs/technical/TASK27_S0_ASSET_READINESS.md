# Readiness asset S0

D26-01/02/03 giữ CONFIRMED, ADR kỹ thuật khác/visual approval vẫn trạng thái nguồn. Contract đã thực thi không làm Quy sprites thành production-ready. Không loài, form, stage hoặc ability mới được đăng ký.

| Thành phần S0 | Minimum contract cho task sau | Hiện tại |
| --- | --- | --- |
| QuyI sprite | Required sprite-atlas, PNG/frames valid, requiredFrameMetadata anchor+ bounds, approved anatomy/IDbinding | Contract ready; fixture ready; production Quy missing |
| Idle/movement | Clip IDs explicit trong requiredClips, frame refs/timing hợp lệ; directions theo projection được duyệt | Kiểm được contract; chưa clip Quy approved |
| Frame metadata | Rect/atlas dimensions/grouping; anchor/bounds trên mọi frame milestone | Validator có; chưa export Quy |
| Underwater tileset | Required PNG, grid frameWidth/frameHeight nếu dùng grid, frames theo consumer28/29 | Contract ready; production kit missing |
| Interaction image | Required nếu là cue thiết yếu; có thể approved-compatible blockout khi được duyệt riêng | Không tạo placeholder; production/runtime integration pending |
| Water-current effects | Có thể optional nếu bỏ ảnh vẫn còn direction/bounds cue từ layer khác đã implement | Warning-and-omit contract ready; cue/flow runtime chưa có |

S0 milestone lựa chọn clip name/content contract cần Task28/34approval, không cố định sprite dimensions hoặc đề xuất artwork ở27. idle/move là vai trò cần thể hiện, không claim tên clip production Quy đã được duyệt. Non-sprite images không bắt có attack/defend/hurt; S1 mới bổ sung required clips đúng scope. Progression/manifestation/HP/save không được phê duyệt bởi validator.

Task28 nhận schema/diagnostics/tests cùng adapter Dawn; phải triển khai renderer consumer cho generic clips sau brief, không coi CLI validation là runtime multi-species support. Contract1 vẫn chỉ fixture và thư viện build-time. S0 scene/controller/underwater map/physics chưa được xây; S0PASS không tương đương fullD40, S1cần approvals bổ sung.
