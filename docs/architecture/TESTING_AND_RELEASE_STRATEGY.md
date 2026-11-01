# Kiểm thử và bảo vệ public release

**PROPOSED ADR-26-08**; yêu cầu giữ Dawn/default và không public unfinished là CONFIRMED D26-02. [Task25 tests](../technical/TASK25_BUILD_TEST_DEPLOYMENT.md) là evidence cũ, không kết quả Task26.

| Lớp | Trách nhiệm / fixture | Tự động hóa tái dùng / acceptance tương lai |
| --- | --- | --- |
| Unit | Registry typed refs, lifecycle generation, vectors/collision, ownership; fake services | node:test/assert hiện có; không missing refs/duplicate IDs/cycle/input replay |
| Integration | Fake asset/actor/input+scene coordinator, invalid geometry, cancellation | Khởi tạo source/destination và swap/rollback; một actor/loop, dispose idempotent, stale load không bind |
| Browser | Built prefix/game06, scene opt-in, pointer/keyboard/focus/menu | Playwright hiện có; actual ready/input/Canvas/zero console404, default và sample không đổi |
| Regression | Phượng movement/hover/fire/hazard/shrine/camera/UI/storage | 30unit +3browser suite hiện hữu; screenshot review không tự thay expected để che lỗi |
| Persistence tương lai | Fault writer/receipts/schema/last-good/migration | Fake test không thay real-adapter crash test; cần GF trước31, NOT RUN |
| Performance | rAF pacing, visible tiles, actors/collision/cache/listeners | Task32diagnostics; warm-up+repeat p95/p99, device matrix được chọn; không suy suite time là FPS |

Task25 đo Canvas683×384/scale2 ở1366×768 DPR1/2; main dt cap50ms, tile culling có nhưng props/shadow chưa đầy đủ. Mục tiêu tạm60FPS desktop/30FPS mobile như Task25 vẫn PROPOSED, chưa min-device guarantee. Đo CPU/GPU/DPR/browser/scene actor count/memory/loading và input latency trước cam kết. Giảm FX không xóa required cue. Resource handles/refcounts/cache digest phải bao gồm ảnh/font thay đổi; listener/canvas/cache disposal kiểm không tăng sau nhiều lần scene switch. Không chọn DPR strategy mới ở26.

[pages.yml](../../.github/workflows/pages.yml) được đọc lại: push main và workflow_dispatch, artifact_site, Node24/unit/build; không tự deploy khi push work. Dispatch ref khác có thể deploy production nếu quyền cho phép, nên không dùng như preview ngầm. Task26 chỉ push docs work, không dispatch/merge/config change.

Quy trình đề xuất: feature branch cho code rủi ro→work integration/local hoặc preview riêng khi được duyệt→unit/build/browser prefix+default/sample+Quy opt-in→review assets/save schema→promotion đã xác minh sang main. Không mặc định đổi public scene khi thêm registration. Rollback bằng commit revert được review hoặc artifact tốt còn sẵn nếu quyền/retention cho phép; không reset/force-push, không downgrade save. Expose S0 chỉ khi nhãn tạm/restart/compatibility/readability đạt và có quyết định release; S1 cần save/combat gates và test riêng.

Task26 chỉ static checks docs và bảo toàn code hashes. Không chạy lại game suite vì không thay runtime; các tests contract nêu trên NOT RUN. Public health trực tiếp vẫn không có chứng cứ mới ngoài kiểm workflow; không dùng push docs để khẳng định gameplay public tốt.
