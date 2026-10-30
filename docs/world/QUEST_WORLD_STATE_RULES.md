# Quest và thay đổi thế giới

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

[Quest outline](../story/QUEST_DESIGN_OUTLINE.md) vẫn sở hữu mission concepts; [story handoff](../story/STORY_IMPLEMENTATION_HANDOFF.md) sở hữu 24 main event IDs/completion. Tài liệu này chỉ quy định cách dependency đọc authoritative state, không tạo tuyến nhiệm vụ mới.

| Loại | Unlock / world relevance | Completion / tác động | Fail / retry | Sau chương |
| --- | --- | --- | --- | --- |
| Main story | Main event predecessors, entry/capability đã bảo đảm | Event evidence → completion, network/route theo contract | Safe checkpoint/attempt; không mất unlock đã commit | Main facts giữ, không nhận thưởng lại; aftermath/recap đọc được |
| Side quest | Chapter access + local NPC/outcome | Quest-specific proof/outcome, không tự đảo main stable | Đổi objective hợp lý nếu nguồn đã thay; không repeat irreversible action | Có equivalent source hoặc completed-action acknowledgement |
| Ecology restoration | Habitat needs + viable sources | Patch đúng owner + coverage + ecological evidence | Trial fail không phá habitat cần cho main | Biến thể optional reversible, main network vẫn stable |
| Resonance | Species/source khả dụng + observation/proof | ResonanceRecord theo rules, không victory=unlock | Mất encounter tạm → refuge/retry, không xóa progression | Alternate habitat/special trial vẫn tiếp cận được |
| Exploration challenge | Route enabled + cap rõ | Local proof/unique discovery hoặc repeatable occurrence | Trở về landing/anchor, không khóa đường về | Có thể lặp, unique grant đã nhận không lặp |
| Repeatable activity | Reset policy + occurrence mới hợp lệ | Reward profile đúng lần; không mutate main completion | Abort attempt không xem là hoàn thành | Reset chỉ activity, không boss/story reward |

## Objective đã xảy ra trước khi nhận quest

Quest đọc durable event/subobjective proof thay vì đòi nút accept phải có trước hành động. Nếu nước đã hồi E05, optional điều tra cơ cấu xác nhận bằng proof + kiểm chứng hiện trạng/quan sát refuge, không tắt mạng để sửa lại. Nếu elite bị đánh trước quest, encounter proof dùng được; quest completion có grantId riêng nhưng không trả lại unique elite loot. Nếu proof chưa từng đủ, đưa alternative live source hợp lý, không tự complete chỉ vì cùng chapter phase.

Quest journal status là read model từ acceptance + evidence + outcome; không độc lập ghi “complete” trong khi event chưa commit. Acceptance/time-limited step được lưu nếu cần, nhưng main event không cần side quest acceptance trừ dependency explicit được duyệt. Một event có nhiều quest consumer thì mỗi quest đọc cùng proof, mỗi unique reward có owner/key rõ.

## Đồng bộ với world transaction

Event completion + quest evidence + physical patch + reward/ledger cùng logical commit khi là cùng hành động. Derived availability tính sau revision mới. Notification lặp không chạy grant. Quest accepted sau event query ngay state hiện tại, không chỉ subscribe signal tương lai. Alternative objective/version lưu migration mapping, không reset main completion hoặc lén đổi điều kiện đã hoàn tất.

## Faction và lựa chọn

Hồi Nguyên/Tân Sinh/Trông Giữ vẫn PROPOSED. Local relationship fact có actor/region/witness/reason; nó có thể đổi thoại, service, patrol/quest tùy chọn, không set water_stable hoặc tắt ecology. Temporary hostility có điều kiện hạ nhiệt và main-safe interaction/bypass. Không global morality meter, không faction optional chặn Sacred. Hai phe bất đồng cùng hành động được lưu ở hai relationship owners, không trộn thành một ecosystem flag.

## Điều kiện chấp nhận nội dung

Mỗi quest phải chỉ rõ prerequisites, objective evidence, owner/write-set, reward key, fail/retry, post-chapter alternative và route/capability tới source. Không yêu cầu loài optional chưa công bố; main capability mới cần main lesson trước gate. Xem [dependencies](WORLD_EVENT_DEPENDENCIES.md) và [20 test cases](../technical/WORLD_STATE_TEST_CASES.md).
