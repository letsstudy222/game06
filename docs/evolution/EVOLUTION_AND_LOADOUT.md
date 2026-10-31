# Tiến hóa, loadout và chuyển tiếp an toàn

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Luật giữ nguyên và các phương án — V13-P06/P09

CONFIRMED D05/D06/D07/D41: tối đa ba available species forms, một active/hai reserve; mỗi loài progression riêng; boss khóa selected membership, vẫn switch trong set. Không bắt đủ ba hoặc ba nguyên tố. A08-05/E09-U07/E10-U07 còn entry trigger/capability/snapshot/retry/outcome details; Task13 không dùng tiến hóa để tự chốt những phần này hoặc khôi phục universal full-three gate R03-P06.

| Vấn đề | Đánh giá phương án | Khuyến nghị PROPOSED |
| --- | --- | --- |
| Cập nhật equipped form | Slot-stage copies dễ lệch; cùng formId đọc committedStageId giữ identity | Sau evolution commit ngoài lock, slot vẫn trỏ same formId, dùng stage mới qua existing progression |
| Evolution trong combat | Immediate có thể heal/iframe/đổi geometry giữa hit; pending an toàn hơn | Đạt requirements trong combat được ghi, thực hiện khi safe và người chơi chọn rõ |
| Boss | Membership lock confirmed; freeze stage/config là proposal R03/C04 | Không execute evolution trong attempt, kể cả reserve/unequipped; chỉ facts/eligibility pending, config giữ theo policy cần duyệt |
| Skill retention | Xóa old skill làm hỏng route/quest và đầu tư | Giữ unlock/evidence, successor mapping được duyệt nếu có; no free cooldown reset |
| Geometry đổi | Auto apply có thể kẹt tường/doorway | Validate destination bounds/placement/return rồi mới atomic commit |
| Older-stage replay/skin | Mechanical downgrade tăng cost/XP/slot exploit; skin có thể lệch hitbox | Chưa hỗ trợ downevolution mặc định đề xuất; optional cosmetic/replay policy UNRESOLVED, không tự grant feature |

Đây là đánh giá preferred direction từ đề bài, **không approval chính sách safe transition hoặc HP/recovery R03**. Cần V13-U03/A08-01/02/05 trước implementation.

## Safe transition contract

Khuyến nghị safe state yêu cầu: ngoài active combat và boss attempt; không transform/interaction transaction đang chạy; subject form không incapacitated; content/required assets/modules ready; required source/material reservation hợp lệ; destination placement và đường về tương thích. Không bắt một loại shrine/sanctuary mới cho mọi loài nếu chưa có world design. Safe anchor/checkpoint/điểm nghỉ là lựa chọn content cần duyệt, không hardcode nơi mới.

Người chơi chọn species/form đích và xem thay đổi đã biết → tạo intent có fromStageId/toStageId/profileVersion/revision → kiểm proof/source/capabilities/placement → giữ các reservation cần thiết → chạy presentation có thể bỏ qua phần nhìn → revalidate ngay trước commit → commit stage/config/skill mapping/placement/material spend nếu có/unlock ledger một lần → chỉ công bố completion khi durable acknowledgement thành công. Presentation không tự là nguồn reward. [State machine](../technical/EVOLUTION_STATE_MACHINE.md) mô tả pre/post commit và retry.

Không tự định nghĩa miễn sát thương khi animation phát. Context phải thật sự an toàn; nếu threat/source invalid trước commit thì hoãn/hủy intent, không heal hoặc mất proof. Sau commit không rollback XP/stage bằng nút cancel; finish/reconstruct presentation ở boundary an toàn theo approved recovery. Damage/status đã accepted không bị animation xóa; HP ratio/cost/cooldown/status obligation vẫn policy R03/E09 chưa được duyệt.

## Đổi active và unequipped forms

Intent gắn subjectFormId/speciesId cố định, không đọc activeFormId mới để trao stage. Trước khi bắt đầu intent có thể chọn form khác; sau PENDING/EVOLVING đề xuất giữ cross-body transaction lock, defer/reject switch request không tiêu cost; hoặc hủy precommit rồi xử lý switch bình thường. Không silent switch target, thêm member hoặc cấp hai bodies. TransformationState và EvolutionTransitionState dùng cùng arbiter/revision để tránh race, giải pháp engine vẫn chưa triển khai.

Ngoài combat/safe boundary có thể cho evolve một form đã mở nhưng chưa equipped nếu source/requirements đủ; không spawn reserve/unequipped body tham chiến. Save cập nhật same progression record, loadout không đổi. Khi trang bị sau phải kiểm geometry/capabilities như mọi equip. Nếu form ở active/reserve thì sau commit readers cùng revision mới, không mỗi slot mutate stage riêng. Evolution không cấp hoặc chiếm slot thứ tư.

## HP, cooldown, old stages và route safety

R03 đề xuất giữ tỷ lệ HP khi maxHP đổi, HP0 vẫn HP0, không cooldown refill; Task13 chỉ dẫn dependency này, không áp số hoặc chốt recovery. Cooldown/accepted-status mapping cần source policy, không drop harmful state để evolution thành free cleanse. Không chuyển form đang HP0 thành viable bằng animation để né defeat.

Đường hẹp phải có compatible posture có asset/module, alternative route hoặc safe return theo C04-P07; normalization chỉ nếu approved density/anatomy/geometry contract, không thu sprite tùy cửa. Nếu chưa vừa thì giữ stage đã commit trước đó, eligibility còn, hướng đến điểm đủ chỗ; không ép downgrade hoặc xóa chi để vừa. Cosmetic old-stage selection/replay nếu sau duyệt phải giữ gameplay silhouette/hitbox/skill readability và same progression/ledger, không extra form hoặc repeat evolution reward.
