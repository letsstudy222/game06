# Trạng thái combat, input và accessibility

**PROPOSED C14-P02/P13**, [decisions](TASK14_DECISIONS.md). Logical states khác sáu animation states Phoenix. Một action owner; locomotion, aim, posture, status, body clip và FX là lớp trực giao. Root hạn chế translation, không tự stun toàn input. Thời lượng, buffer windows, marker timings chưa chốt.

## State contract

| State / phạm vi | Entry | Allowed / restricted | Exit / interrupt | Animation, input và exploit guard |
| --- | --- | --- | --- | --- |
| IDLE / chung | Thân viable, không action | Aim/move/action hợp lệ | Move hoặc accepted action; hurt/CC/HP0 | Idle/contact anchor; không repeat bởi giữ input |
| MOVE / chung | Vector/route hợp lệ | Aim, action compatible; không noclip | Zero/blocked → idle; action có thể giữ locomotion | Cycle/turn; normalize diagonal |
| ATTACK_STARTUP / attack | Cast accepted, reservation | Turn/move trong declared window; action/switch khác chỉ tại cancel marker | Active marker hoặc interrupt→recovery, HP0→incapacity | Anticipation; buffer expiry, cancel không refund spend đã commit |
| ATTACK_ACTIVE / attack | Contact/release marker | Movement theo profile; không default switch/guard cancel | Hết window→recovery; interrupt đóng future windows, không undo released hit | Contact frames; ledger không reset khi đổi clip/heading |
| ATTACK_RECOVERY / attack | Active/cancel kết thúc với debt | Aim/move nếu cho; action mới tại allowed marker | Hết debt→idle/move; hurt không xóa debt | Return pose; switch không bỏ recovery bắt buộc |
| SKILL_CAST / ability | Ability admissible | Aim/hold/release/cancel theo definition, không mặc định đứng cứng | Release→attack phases/channel/finish; interrupt theo spend policy | Charge/release markers; keyup không release hai lần |
| EVADE / capability | Route/hướng/cancel window hợp lệ | Profile motion/aim; không attack/switch reset evade | End→vulnerable recovery; collision stop, CC theo scope | Species-specific; optional i-frame subwindow khác cả state |
| GUARD / capability | Directional defense accepted | Turn giới hạn, move nếu brace cho; không all-sector attack đồng thời | Release/break/flank interrupt→recovery | Enter/hold/block/release; held input không re-enter sau break |
| HURT / response chung | DamageResult yêu cầu flinch | Limited move/aim theo response; không mọi flash đều interrupt | Response end→state theo debt; HP0 ưu tiên | Hurt khác flash overlay; repeated hit không kéo lock vô hạn |
| STAGGER / response theo profile | Control budget cho phép | Chỉ escape explicit, hạn chế theo CC family | Recovery→viable state; refresh bị cap/family recovery | Mất trụ/recover; bỏ input cũ để không burst sau stun |
| TRANSFORM / playable | Switch transaction R03 accepted | Source/target chịu damage theo commit; không action/switch chồng | Cancel precommit hoặc commit/recovery; HP0→defeat arbiter | FX không authority, one pending tx, không i-frame ngầm |
| INCAPACITATED / chung | HP0 committed | Không move/cast/guard; chỉ coordinator recovery | Approved transfer/reset | Defeat/outcome clip; bỏ buffer/reservation chưa tiêu, không future release |

## Transition và cancel

[Damage ordering](DAMAGE_RESOLUTION.md): due hit/status trước switch commit; defeat hủy pending action/transform. Một input batch: pause/focus gate → forced incapacity/control → committed action/debt → defense hợp lệ → switch hợp lệ → skill → basic → locomotion. Priority không cho action cắt phase thiếu cancel marker. Chỉ một incompatible action accepted, action bị từ chối không tiêu resource. Buffer revalidate tại consume.

Cancel table thuộc definition: fromPhase, toActionCategory, marker, spendPolicy, recoveryDebtPolicy, interruptClass. Không khai báo cancel thì từ chối. Charged action có trần/timeout/release policy; key repeat không auto-fire. Logical markers theo simulation, frame render skip không bỏ hoặc chạy marker hai lần. Pause dừng action/CC/cooldown/clock, resume không cộng wall time.

## Input hiện có và target

Evidence InputManager: WASD/arrows move; J/Space attack; K fire; Shift hover; E interact; H help; Esc menu. Joystick/touch đa chạm đã có. Task14 không đổi mapping. Logical actions tương lai: basic, abilityRef, defense, selectEquippedForm; keyboard-first, adapters gamepad/touch dùng cùng command contract. Chưa gán phím switch/guard hoặc quota skill slots.

Remap cần conflict detection/reset/labels và settings riêng save gameplay; gamepad deadzone/disconnect và touch pointercancel clear held input. Đề xuất bounded buffer một intent/category, TTL simulation, clear khi pause/blur/defeat/scene change; không queue combo vô hạn. Opposite directions triệt tiêu; keyboard active ưu tiên analog như baseline; skill/basic theo priority, không trừ hai cost. Hold accessibility là option explicit, không bật auto-combat.

Runtime clear input khi blur/visibility; hidden tab bỏ update/reset timestamp khi trở lại, nhưng blur riêng không đồng nghĩa pause. C14-U08: đề xuất auto-pause single-player khi mất focus, clear charge/pointer và resume rõ; cần approval. Menu command ở boundary: due hit trước pause vẫn resolve, sau pause không advance. Collection boss read-only, service cũng reject mutation. Fail reason bằng icon/text/shape, cue âm bổ sung; low-FX/giảm shake; không color-only hoặc frame-perfect main-story gate. Không triển khai UI.
