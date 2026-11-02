# Kiểm tra nhất quán cục bộ Task 30

Chỉ kiểm phạm vi Task 30, không bắt đầu Phase IV audit hoặc Task 31. Đã đối chiếu audit Task 25, input/scene contracts Task 26, assets Task 27, renderer/direction/scaling Task 28 và map/current/occlusion Task 29 với source thực. Baseline Task 29 trên remote khớp local và đã chạy lại regression trước sửa.

| Yêu cầu | Kết quả/phạm vi |
| --- | --- |
| Approved movement/aim | Tám hướng keyboard chuẩn hóa, aim độc lập; không đổi Phượng physics |
| Approved mouse attack | Left mouse thành basic_attack intent trong adapter opt-in |
| Approved dodge input | Space/dodge command CONFIRMED; mechanics/i-frame/cooldown chưa duyệt và không triển khai |
| Mobile | Analog joystick + nút action có implementation; assisted target chỉ guard proposal/fallback |
| Three slots | Intent tách read-only authority validation/transition; empty slot không được activate |
| Renderer | Thêm inverse coordinate helper; giữ Canvas2D, snap/DPR và mapping hiện hữu |
| Context/lifecycle | Clear/consume/dispose/re-entry cho adapter mới; chưa engine scene manager |
| World ownership | Không ghi collision/current, quest, unlock, HP, reward hoặc persistence |
| Asset/catalog | Không sửa sprite/atlas, không tạo species/form/stage production IDs |
| Compatibility | Dawn mặc định, sample/legacy controls/Space attack cũ giữ nguyên |
| Release | Chỉ work commit/push, không main/deployment/config thay đổi |

Phê duyệt Task 30 có ưu tiên ở mức input direction và dodge action; không tự chuyển các ADR đề xuất khác sang CONFIRMED. Right-click skill binding còn PROPOSED và chỉ preview opt-in. Animation policy, collision/body, motion tuning, target priority/range/assist, HP/recovery và storage còn mở đúng scope. CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED trong nguồn lịch sử không sửa.

Implementation mới chạy trong isolated harness, chưa dùng để tuyên bố Quy bơi/né/tấn công hoặc form switching đã có. Không có full target acquisition, homing hoặc damage engine. Task 31 storage recommendation/transaction/migration vẫn cần approval riêng theo Task 26; input remap không lén dùng gameplay save.

Evidence thực nằm ở [test report](TASK30_TEST_REPORT.md); completion dựa trên code/tests, không dựa số tài liệu. Những integration còn lại thuộc scene/controller/combat và được ghi rõ, không chặn foundation input được giao nếu regression đạt.

Kiểm tra trước handoff: 560 tracked files ngoài package.json/RenderPrimitives giữ nguyên từng byte; 15 asset build khớp byte; 56 tệp JavaScript qua node --check; 22 liên kết nội bộ trong 9 tài liệu hợp lệ; bảng/code fences và git diff --check đạt. Inventory đúng 16 tệp được giao, không build artifact, binary hoặc credential. origin/main baseline là 5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d; commit và remote cuối được báo sau khi xác minh.
