# Chuyển dạng realtime, geometry và interruptions

**PROPOSED L16-P04/P05**, chi tiết hóa [R03](../gameplay/TRANSFORMATION_DESIGN.md), [C14](../combat/FORM_SWITCHING_COMBAT.md). Không final frame/ms/cost/CD, không sửa handlers hoặc controller Phoenix.

## So sánh và recommendation

| Model | Ưu | Rủi ro |
| --- | --- | --- |
| Instant | Phản hồi nhanh, ít presentation | Hit/damage boundary khó đọc, geometry pop, cancel spam nếu không debt |
| Short transition | Chuẩn bị/commit/recovery rõ, hợp one-body transaction | Quá dài làm sluggish; FX không được authority hoặc i-frame ngầm |
| Context-sensitive | Tôn trọng swim/fly/action geometry | Hidden rules dễ reject khó hiểu; cần reason/preview |
| Buffered after recovery | Giữ ý định không yêu cầu timing cực hẹp | Stale target/queue spam nếu không expiry/revalidate |

Khuyến nghị short readable transition, context validation và **một bounded buffered request** khi chờ recovery tương thích. Immediate input feedback, không phải immediate gameplay commit. Invalid target/forbidden state reject ngay, buffer không dự trữ locked/empty target để bất ngờ activate sau unlock. Logical request `selectEquippedForm(formId,expectedMembershipRevision,requestId)`; slot gesture resolve form+revision tại input, không đọc slot hiển thị đã xoay lúc consume. Select self no-op, no cost/reset.

## Lifecycle một switch

1. Receive/dedupe request; pause/focus/context gate, normalize target ID.
2. Resolve target thuộc membership/frozen set, unlocked/usable, khác nguồn; check action/cancel, cooldown/quỹ theo approved policy.
3. Prepare candidate source/target/profile versions/position/facing/velocity và reservation chưa tiêu; source vẫn physical damage recipient.
4. Validate target posture/layer/movement/footprint/envelope/return và arena/story boundaries; start readable transition, không deactivate source sớm.
5. Process due damage/status → incapacity/interruption → revalidate request/revisions/eligibility/placement immediately before commit.
6. Atomic commit: deactivate source **và** bind target body/profile/activeForm/placement, spend approved cost/CD/debt/status binding và receipt trong một outcome; không intermediate two-body/null-body gameplay state.
7. Recovery target damageable, preserve mandatory debt/skill CD/accepted status cursors; finish presentation từ committed result.
8. Confirm completed/rejected/canceled reason. Failure precommit giữ nguồn+damage, nhả unspent reservation; after commit không rollback/refund. Incapacity/world recovery xử riêng, không replay old request.

Exact durable schedule/runtime batching cần L16-U09/W07: một atomic gameplay boundary không tự chứng minh durable write. Adapter phải reconcile intent/commit receipts với HP/cost/status acknowledged revision; không block simulation để chờ FX hoặc claim memory snapshot là save.

## Action permission matrix

| Context/state | Switch request policy | Interruption / debt / recovery |
| --- | --- | --- |
| Idle/move | Allow start nếu gates hợp lệ | Không đổi topology/phase để noclip |
| Basic startup | Allow tại explicit cancel marker; ngoài marker buffer tới admissible boundary nếu TTL đủ | Giữ accepted spend/CD/recovery debt, no free re-start |
| Active hit frames | Buffer tới hết protected active/recovery, không immediate cancel | Window/ledger/projectile đã release giữ root ID |
| Attack recovery | Buffer tới mandatory debt hoàn tất hoặc approved late-cancel marker | Không override debt bằng switch spam |
| Skill cast/channel | Chỉ declared cancel/finish; noninterruptible cast temporarily disabled | Cancel policy/refund chưa tiêu, source_active effect end, released effects không undo |
| Dodge | Buffer tới end+vulnerable recovery nếu TTL đủ | Không prolong i-frame/restart evade CD |
| Guard | Release qua hợp lệ marker rồi buffer recovery | Không giữ shield reserve; no instant guard→switch→guard loop |
| Hurt | Short bounded buffer nếu response cho; otherwise reject | Damage accepted không được rollback, không every hit refresh buffer |
| Stagger/stun | Temporarily disabled, reject stale request | Clear buffer, recovery mới accept fresh input; không cleanse by switch |
| Knockback | Buffer tới stable collision/landing boundary | Không cancel wall push/teleport bằng body swap |
| Incapacitated | Reject manual switch | Coordinator forced transfer/reset nếu model được duyệt, một defeat event |
| Environmental interaction | Atomic commit section disabled; cancelable precommit có thể cancel rồi switch | Không spend effect/item hai lần, same W07/V13 arbiter |
| Dialogue | Ngoài restricted blocking scene dùng context; blocking dialogue temporarily disabled | Sau close cần fresh input, không phát request cũ |
| Cutscene | Temporarily disabled, content owner kiểm placement/return | Resume revalidate/clear queue, không auto switch khi cine xong |
| Boss phase transition | Chỉ nếu authored phase cho stable placement; unsafe scripted relocation temporarily disabled | Membership không đổi; bounded defer hoặc clear on relocation, không iframe từ phase+switch |
| Paused/blur/hidden | Reject new gameplay command, clear buffer | In-flight transaction theo last committed boundary; presentation resume không charge/reset mới |

Priority kế thừa C14: forced damage/incapacity → committed action/debt → defense admissible → switch → skill/basic; pause command ordering không làm miễn due hit. Table là concrete proposed default cho C14 defer/reject alternatives, L16-U04 chưa approval. Switching được phép trong normal combat **giữa admissible windows**, không nghĩa cắt mọi phase.

## Position/movement/collision — L16-P05

Default preserve world anchor+facing, target visual direction quantize riêng. Velocity reproject vào target movement profile, clamp/clear unsupported modes theo explicit policy; không carry flight speed vào swim vô hạn hoặc reset inertia để né knockback. Swim/fly/depth/layer contract còn C14-U01; target phải sống/đặt được tại context và có return path. Đang sâu dưới nước không đổi sang form không phù hợp rồi heal/teleport lên mặt nước.

Validate footprint khác visual/turn envelope/hurtbox; large stage/Long cần approved posture/clearance C04-P07, không tự scale/crop asset. Conservative fallback candidate chỉ trong same reachable connected free-space/layer/arena/story region, sweep path và offsets bounded/visible theo placement policy chưa số. Không tìm điểm qua wall/door/arena boundary hoặc dùng small form vào passage rồi spawn large bên kia. Nếu không chứng minh valid thì reject/defer ở nguồn; không auto relocation như dodge miễn phí. World patch không còn source hợp lệ thì coordinated safe recovery sau abort, không lách boss lock. Collider/segmentation algorithm cụ thể vẫn PROPOSED, chưa implementation.
