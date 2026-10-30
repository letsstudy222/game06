# Kỹ năng và attribution song nguyên tố

**Task10 — PROPOSED:** đặc tả để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline kiểm tra `38b8c1c`, 30/10/2026 Asia/Saigon. [Decision register](TASK10_DECISIONS.md) phân biệt nền CONFIRMED, recommendations và UNRESOLVED.


## Bốn loại — E10-P04

| Loại | Activation | Attribution | Damage/utility | Status | Other effects | Animation | Resource | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| single_element | Active form có skill và source hợp lệ | Một declaredElementRef thuộc profile hoặc explicit external source | Một channel allocation theo E09, không bonus hệ dự trữ | Chỉ statusApplicationRefs declared | Reaction theo effect thực sự, không hệ còn lại | Windup/release/recovery và hit marker một nghĩa | Cost/cooldown R03 còn mở, snapshot không reroll khi switch | Element/source/module/marker resolve, skill gate đúng |
| combined_element | Hai expression và skill rule sẵn, không mặc định mọi dual có ultimate | Component IDs, declaredElementRef từng component, chung rootCastId | Chia authored total budget, không full base hai lần | Application keys/group chống trùng | Chỉ reaction permissions explicit, không tự react với chính skill | Joint release marker đề xuất; staged release phải có cancel policy riêng | Một cast commitment policy, không charge hai lần callback; không tự free refund | Budget/cancel/priority/assets đủ, component attribution không null |
| property_based | Anatomy/công cụ và geometry phù hợp | Physical/cutting/pressure hoặc property refs; không auto thêm hệ thứ hai | Guard, push, precision cut hoặc utility; không tất cả có damage | Chỉ trigger author, blade không auto armor break | Material response có điều kiện | Contact/brace/turn/anchor rõ | Cost/module rule theo action, chưa numerical | Property khác element/channel, source và hit ledger hợp lệ |
| environmental | Receiver/source/path/world predicates còn hợp lệ | Skill expression + external source provenance riêng | Tác động local receiver, không tự global restoration | Object/surface status riêng scope | Intent qua W07 writer, revision/coverage checks | Source→path→endpoint + thiếu điều kiện có cue | Finite source/budget; ordinary ability không tạo tài nguyên | Receiver permissions, return path, idempotent event và no missing source |

## Cast và interrupt contract

AttackProperties E09 giữ định nghĩa single-element; ElementalAbilityProfile chỉ composition wrapper tham chiếu các attack components. Không sửa mọi attack thành hai affinity hoặc copy damage. Snapshot gồm caster combatant/form/stage/config, source refs, component budgets, rootCastId/hit IDs, phase markers và release policy. Credit XP/reward qua owner cũ, không mỗi component tự cấp.

Default recommendation: combined release atomic tại joint marker sau khi kiểm source; interrupt trước release không phát component/status/reaction; interrupt sau accepted release không hoàn HP/cost hoặc replay. Staged release chỉ khi authored explicit component commit/cancel và resource policy: component đã commit giữ outcome, chưa release không xuất hiện. Hoàn cost/cooldown cụ thể vẫn R03/E10-U02, không quyết mới qua tài liệu này.

Release xong switch không clone projectile, reset TTL/hit ledger hoặc thêm affiliation form mới. Đòn single Thủy từ loài Thủy–Lôi chỉ attribution Thủy; slash vật lý của Hỏa–Kim không tự gây burning; Mộc–Kim anchor không tự heal; Phong–Lôi directional hit không tự stunlock.

Missing optional combined skill không làm một dual species invalid. Missing required clip/action/source thì content chưa runtime-ready; không coi idle pose là attack animation đủ, không cấp chiêu vô hình. Catalog draft giữ gapId; current approved art không thay. Kỹ năng tốt nhờ timing/space/utility, không số lượng elements.
