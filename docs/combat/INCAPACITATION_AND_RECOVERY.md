# HP, incapacity và recovery

**PROPOSED C14-P12**, đánh giá trên [R03 transformation](../gameplay/TRANSFORMATION_DESIGN.md) và [R03 data](../technical/RESONANCE_DATA_MODEL.md); Q09/Q10 chưa thành CONFIRMED. Không phê duyệt lore hiện thân B+C hoặc cái chết của Tinh Linh.

| Model | HP0/switch behavior | Ưu / nhược / progression |
| --- | --- | --- |
| A HP riêng từng form | Form HP0 unavailable, có thể transfer sang reserve viable; hết viable→defeat | Giữ damage ownership và khác biệt kit; thêm UI/recovery và nguy cơ ba thanh HP carry. Mỗi species vẫn XP riêng |
| B shared player HP | Mọi form đọc một pool; HP0→defeat, switch không rescue | Dễ đọc/ít reserves exploit, nhưng maxHP/defense mapping phức tạp và mất cảm giác form bị thương; không tự canon spirit có mô vật lý. XP riêng không đổi |
| C shared vitality + form integrity | Hai ngưỡng/transfer và defeat | Nhiều chiều chiến thuật nhưng nhiều meters/races/recovery ambiguity; chi phí cao cho first combat slice, không bắt buộc |

Khuyến nghị **A theo hướng R03-P07**, chưa approval. Một dạng ở slice tương đương một HP owner đơn giản, không đợi ba forms. Không ordinary permadeath hoặc xóa species đã thu thập. Không reserve healing mặc định, switch/re-equip/evolution không full heal. MaxHP khi stage đổi theo R03 ratio proposal, HP0 vẫn HP0; mapping/cooldown/status/cost vẫn V13-U04 pending.

## HP0 transaction

1. HP0 committed → incapacitated đúng một event, đóng future attack windows/reservations chưa release, clear input buffer, cancel manual switch chưa commit.
2. Coordinator tìm reserve theo approved order trong locked membership, HP>0/available/capability/placement/return hợp lệ; không thêm species/slot.
3. Khuyến nghị emergency transfer tự động theo R03, không stability cost/gate CD để tránh deadlock; **không** heal/i-frame, vẫn recovery/global switch cooldown và one defeatEventId consumed. Không manual invoke để đi miễn phí. Nếu lựa chọn này không duyệt thì explicit defeat path cần được thay có nguồn, không fallback bí mật.
4. Không có viable reserve (hoặc không đặt được): attempt failed, stop threat emissions/reset attempt, về safe checkpoint rồi recovery và unlock. Không spirit-only noclip hoặc revive source bằng animation.

Player có thể switch bình thường sang healthy form trước HP0 nếu action cho; không switch vào incapacitated. Form tạm unavailable giữ progression/ID, không xóa collection. Nếu mọi form đều bị environmental gate không sống được thì lỗi entry/content, cần safe recovery/defer, không bắt farm optional species.

## Checkpoint, loss và recovery

Đề xuất safe checkpoint đã validate với movement/placement/đường về; không tự đặt shrine/geography mới. Loss reset encounter/transient attempts, không undo durable XP/memory/species/world facts đã commit. Reward chưa commit không grant khi retry. Sau abort/reset hoàn tất mới phục hồi HP/quỹ/CD theo recovery transaction R03; không giữ boss progress cũ cùng HP mới. Ordinary load ngoài boss không free heal/cleanse/offline recharge. Recovery settings, loss budget, placements và whether all unlocked forms refill cần scoped approval C14-U03/U07/W07, không số hoặc item penalty tự đặt.

Harmful accepted status cần E09 obligation policy nếu load/drop làm free cleanse; active/form/shared bindings giữ theo source, không thêm invisible damage body ở reserve. Storage lỗi/quota: giữ last-good generation và pending receipts, không xóa dữ liệu hoặc báo thành công; exact adapter/error UX còn mở. Không khẳng định checkpoints/save combat đã implemented từ localStorage UI settings hiện tại.
