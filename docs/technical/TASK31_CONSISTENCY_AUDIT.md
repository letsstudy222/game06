# Kiểm tra nhất quán cục bộ Task 31

Chỉ kiểm Task 31, không Phase IV-wide audit hoặc Task 32. Nguồn: Tasks 25–30 và runtime thực, W07/R03/P15, opening receipts, boss loadout contract. Tài liệu đề xuất không được coi là gameplay đã triển khai.

| Check | Evidence/phạm vi |
| --- | --- |
| Task 30 prerequisite | Local/actual remote 0fb44fc; baseline mới chạy lại đạt trước sửa |
| Approved storage | IndexedDB primary, đúng ba slot; không localStorage gameplay fallback |
| Approved triggers/checkpoint | Authority-supplied eligibility; không tự duyệt Dawn coordinates hoặc mid-boss save |
| Physical writer | Một SaveCoordinator public, backend nội bộ; queue + CAS toàn row trong một transaction |
| Backup/recovery | Hai generations, digest/ref validation, xác nhận khi fallback cũ; không cross-slot borrowing |
| Import/export | JSON bounded, preview token gắn slot/revision, xác nhận overwrite và readback |
| Version | Same-schema only; unsupported data preserved, migration còn gate |
| Rewards/receipts | Một ledger authority, opaque fixture serialization không grant; live ordering DEFERRED |
| HP/recovery | Không HP model, heal, i-frame, penalty, emergency transfer hoặc boss retry mới |
| State ownership | Không persist camera/input/FX/DOM; world state là domain facts sau này, không current particles |
| Compatibility | Dawn/sample/main/PlayerPhoenix/GameState/UISettings/legacy farm/assets giữ nguyên |
| Release | Chỉ work commit/push, không main merge hoặc public deployment |

Phê duyệt Task 31 đóng phần technology/three-slots/high-level backup/triggers của gate F trong Task 26; không tự đóng phần receipts, full migration và event transaction. S0 temporary khác S1 persistent gameplay. Không đổi các trạng thái CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED trong tài liệu lịch sử.

Remaining blockers cho live persistence: production snapshot/domain validators và stable checkpoint catalog; receipt order trước Quy form; reward logical write-set và publication; boss result/HP continuation policy; future migration/rollback; scene lifecycle/apply/reconcile. Chúng không ngăn Layer A và boundary Layer B được kiểm thử độc lập bằng fixtures.

[Browser/test report](TASK31_BROWSER_TEST_REPORT.md) ghi kết quả thực, limitations và artifacts. IndexedDB commit có giới hạn browser/device; internal backup không chống xóa site data. Không backend/cloud/login, không thay public default, không bắt đầu Task 32.

Kiểm trước handoff: 575 tracked files ngoài package.json giữ nguyên từng byte; 15 asset build khớp byte; 62 tệp JavaScript qua node --check; 30 liên kết nội bộ trong 10 tài liệu hợp lệ; bảng/code fences và git diff --check đạt. Inventory đúng 17 tệp được giao, không save JSON, database, artifact, binary hoặc credential. origin/main baseline 5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d được đối chiếu trước handoff; commit và actual remote cuối báo riêng sau khi xác minh.
