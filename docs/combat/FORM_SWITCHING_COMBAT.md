# Chuyển dạng trong combat

CONFIRMED D05/D06/D41: tối đa ba available forms, một active; boss khóa **membership**, vẫn cho switch trong bộ; không đủ ba vẫn chơi early content phù hợp. **PROPOSED C14-P11** cụ thể hóa combat-side [R03 transformation](../gameplay/TRANSFORMATION_DESIGN.md), không override authority. B+C/vật lý hiện thân và quỹ cộng hưởng vẫn chưa approved.

## Input và transition

Logical `selectEquippedForm(formId)` trỏ thành viên ổn định, không slot hiển thị thay đổi khi active đổi; direct select rõ hơn bắt cycle liên tục. Physical bindings/remap/gamepad/touch layout còn mở, không đổi controls hiện tại. Single-form: request về cùng form là no-op, không cost/CD/reset; slots empty không là target hoặc clone.

STABLE → PREPARING → atomic COMMIT → RECOVERING → STABLE theo R03; chỉ một pending transaction, target còn viable/membership/capability/placement hợp lệ tại request **và** commit. PREPARING nguồn chịu damage, target sau commit chịu damage, không hai bodies hoặc free i-frame. Due damage trước commit xử nguồn rồi revalidate; HP0 hủy request cũ, coordinator incapacity quyết tiếp. Cancel precommit nhả reservation chưa tiêu, không undo damage; postcommit không rollback để refund. Recovery/switch cooldown dùng simulation, không exact frames/giây.

| Action phase | Switch candidate policy | Giữ invariant |
| --- | --- | --- |
| Idle/move | Cho request nếu placement/gates đủ | Target footprint/layer/đường về hợp lệ |
| Startup | Chỉ cancel window explicit; nếu không reject | Committed CD/spend và recovery debt không xóa |
| Active hit/cast release | Default defer/reject, không instant cancel | Released projectile/window ledger không reset |
| Recovery | Chờ mandatory debt; late cancel chỉ nếu definition duyệt | Switch không là đường bỏ mọi recovery |
| Guard/evade/channel | Kết thúc hợp lệ + debt, source_active effect kết thúc | Không shield/heal/i-frame carry sang target |
| Hurt/stagger/root | Theo interrupt/scope gate; không default cleanse | Shared control remaining/cursor giữ nguyên |
| Incapacity | Không manual action; forced path [recovery](INCAPACITATION_AND_RECOVERY.md) | Không request cũ tự commit hoặc revive nguồn |
| Evolution/world transaction | Cùng arbiter, không hai cross-body commits | Fixed subject/version, không đổi stage/loadout lén |

Buffer switch hữu hạn có expiry và revalidation; fail target cho reason rõ, không tự chọn form ngoài loadout. Request rate/cancel marker/switch CD còn C14-U06, không khuyến khích high-frequency mashing.

## Ownership matrix

| Dữ liệu/effect | Owner / switch behavior |
| --- | --- |
| HP/incapacity/maxHP context | CreatureProgression theo formId theo proposal R03; switch đọc target record, không copy/hồi HP nguồn, không reserve regen mặc định |
| XP/skill/stage | Existing progression riêng; event recipient fixed tại accepted event, không active form tại reward animation. Boss benefits pending/frozen config proposal, V13 safe evolution pending |
| Ability CD | Same per-form/per-skill owner, inactive vẫn tick cùng simulation; pause dừng; re-equip/re-entry không reset |
| Stability/switch CD | SpiritState R03, tách combat skill resource; không HP/energy owner mới |
| Released projectile/area | Immutable source form/stage/cast snapshot, TTL/hit cursor/budget tiếp tục; target combatant identity không đổi. Self/source_active effect khác released residue |
| Damage attribution | Root cast/source IDs giữ qua switch, không XP/kill credit sang target form mới; recipients theo reward manifest |
| combatant_shared statuses | E09 giữ remaining window/proc cursor; tick chỉ một active body, target defense tại boundary; không lore spirit bị cháy |
| form_bound statuses | Giữ theo formId, clock simulation; inactive không emit hit/charge discharge/body ngoài map; không reset khi re-entry |
| source_active statuses | End khi nguồn mất/switch; không reserve shield/heal hoặc passive carry |
| Loadout | Existing member refs + revision; active role đổi không đổi member set. Persistence R03/W07, không mỗi slot lưu HP/CD/stage copy |

Không đổi E09 `StatusEffectInstance` thành instance riêng Task14. Minimal harmful-status obligation để reload không free cleanse vẫn E09-P10/W07 pending, không claim mọi effect đã persist. Reload không offline tick/regen.

## Exploit review

| Exploit | Guard đề xuất |
| --- | --- |
| Infinite attack-cancel / bỏ recovery bằng spam | Explicit cancel table + mandatory debt + one pending switch; action ID không regenerate window khi clip đổi |
| Swap strongest skill repeatedly | Per-form CD persists, cast budget/late recovery; balance toàn loadout chứ không reset skill entry |
| Cooldown/refill re-entry | Same owner/simulation clock, no re-equip/init copy; menu không recovery transaction |
| Duplicate projectile | Release marker exactly-once, immutable root castId, redirect không clone TTL/budget |
| Switch immunity loop | Không inherent i-frame, source trước/target sau commit nhận một hit |
| Repeat status per hit | Application/group/proc cursor + hit ledger, refresh không tick mới ngay |
| Heal rồi giấu form | No reserve regen/source_active heal; HP0 recovery chỉ sau approved defeat/reset |
| Small form xuyên vách rồi switch lớn | Placement/turn clearance revalidate, block/defer không dịch xuyên solid |

Early boss count barrier đã được D41 giải; **không hỏi lại full-three**. Trigger/capability/empty snapshot/retry/reload/outcomes, unique-species detail, HP và physical model còn approvals tương ứng. Không tự quyết lore hoặc grant species để lấp slots.
