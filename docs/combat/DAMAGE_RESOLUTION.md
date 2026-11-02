# Damage resolution và event ordering

**PROPOSED C14-P07**; cụ thể hóa combat-side [E09 affinity/pipeline](../elements/ELEMENTAL_AFFINITIES.md), [E09 status](../elements/STATUS_EFFECTS.md), [E10 composition](../technical/DUAL_ELEMENT_DATA_SPEC.md), không thay sources bằng formula mới. Authoritative order dưới đây là khuyến nghị để implement sau approval, không engine đã tồn tại.

## Thứ tự một hit

| Bước | Kiểm tra / output |
| --- | --- |
| 1 Activate | Accept action/unlock/cost policy, castId/config/stage snapshot; animation không tự tạo cast |
| 2 Emit window | Logical marker mở shapes/projectile với window ordinal, lifetime và shared budget |
| 3 Collision | Broad query rồi narrow/swept geometry, world layer, LOS/range và obstacle ordering |
| 4 Eligible/dedupe | Live target, faction/target mask, phase/defense scope, ledger key; reject cho reason rõ, không mark damage lần hai |
| 5 Channels | Đọc AttackProperties của component: physical/thermal/electrical candidates khác properties và elemental affiliation; split tổng budget |
| 6 Element context | Snapshot properties/material/affinity rule eligible; chưa có approved chart thì definition chưa release-ready, không tự multiplier |
| 7 Defense | Guard sector/barrier budget, armor/resistance/vulnerability cause groups normalize; cùng nguyên nhân chỉ một contribution, không dual sum/product default |
| 8 Outcome candidate | Tính damage/heal riêng, proposed HP delta, onContact/onDamage status eligibility, knockback/stagger intents từ result; chưa mutate stores |
| 9 Commit | Runtime coordinator commit một lần HP + hit ledger + accepted status intents/control/budget. HP0 đánh dấu incapacitated và khóa future release trước publish; target recipient chỉ một body |
| 10 Reactions | E09/E10 arbitration đọc accepted evidence/snapshot, reserve input tokens rồi output event riêng; không sửa ngược direct hit. Default output non-reactive, finite graph/cap |
| 11 Feedback | DamageResult cho flash/block/impact/audio; camera/animation consumer không gây damage hoặc XP |
| 12 Defeat handoff | Defeat coordinator giải transfer/attempt outcome một lần; W07 writer mới commit completion/reward khi đủ proof |

Status/control intents được dựng trước HP update để cùng một result, nhưng **chỉ accepted khi bước 9 commit**, không apply trước defense hoặc cho target HP0 cast thêm action. Defeat flag xảy ra tại commit, presentation/outcome đến sau; không chờ FX xong mới cấm đánh. React-on-defeat chỉ khi content explicit và không hồi sinh target. Khi cần durable boundary, HP/status obligation/ledger theo cùng revision của existing writer, không persist từng contact particle.

## Ordering cùng tick và contact identity

Due events có simulation sequence/eventId xác định, không callback order/wall clock. Giữ R03: due damage/status ticks → incapacity/cancel → revalidate switch → atomic switch commit → timers/publish. Hit trước commit áp source; hit sau áp target. Một key giữ `targetCombatantId` liên tục xuyên switch, không sourceBodyId để trúng hai thân.

Đề xuất xử lý simultaneous attacks theo stable sequence, revalidate eligibility trước từng hit; không mặc định mutual kill/trade. Hit đến trước làm HP0 thì unreleased action bị hủy; projectile đã release còn hợp lệ theo lifecycle/encounter policy, có thể tạo trade nếu vẫn ACTIVE. Exact tie-break/input-vs-hit ordering cần duyệt C14-U04 và fixtures; không bật random hoặc lấy array iteration. Obstacle và actor cùng sweep time: ưu tiên blocker nếu chưa có content override, tránh đạn xuyên tường do tìm target trước.

Contact key: `attemptId + rootCastId + componentHitGroup + windowOrdinal + targetCombatantId`. Hurtbox segments/shapes cùng hit group chia key. Một attack nhiều targets mỗi target một key, tổng/per-target budgets explicit. Multi-hit chỉ dùng authored ordinal và cap; DoT `applicationId + tickOrdinal` không reset vì refresh/switch; projectile redirect giữ rootCastId/TTL/remaining budget. Reject invulnerability/contact consumption behavior thuộc attack policy, không retry mỗi frame để vượt one-hit rule.

## Phân biệt dữ liệu

Physical property (cắt/áp/va), damage channel, element affiliation, status và environment context là năm trục khác nhau. Water attack có thể physical pressure; Wood không Life true damage. Direct damage là một hit event; DoT là accepted status tick với nguồn snapshot và active target defense tại boundary E09; environment hazard có sourceId/occurrence/geometry/telegraph, không vô chủ bỏ qua pipeline. Healing là intent riêng trên active viable recipient, không negative damage trick hoặc revive HP0.

Crit/penetration/formulas/resistance floors/caps/affinity values/CC values chưa chốt. Powerful hit có thể là authored heavy strike, không tự thêm RNG critical system. Dual ability components chia một budget; E10 wrapper không copy base cho cả hai. Block không tự nhận burn/root xuyên shield trừ explicit onContact exception. Reactions không tự cấp progression/world milestone; receiver command qua W07 validation, revision/ledger/route checks.
