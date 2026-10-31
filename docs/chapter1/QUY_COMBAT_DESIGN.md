# Combat và phòng thủ Quy

**PROPOSED Q18-P03/P04**; bản sắc defense/control là CONFIRMED, action/timing/cost chưa duyệt. Dùng [C14 basic](../combat/BASIC_ATTACK_SYSTEM.md), [states](../combat/PLAYER_COMBAT_STATES.md), [hit/collision](../combat/HITBOX_AND_COLLISION.md), [damage](../combat/DAMAGE_RESOLUTION.md), không resolver riêng cho Quy.

## Chọn basic đầu tiên

| Phương án | Hình và độ rõ | Animation/hit detection | Môi trường/defense/trade-off |
| --- | --- | --- | --- |
| Cú mai ngắn có thân đẩy | Vai–mai trước báo hướng, vẫn thấy đầu | Ít pose chính; swept arc/capsule trước core theo active window | Hợp Chấn Mai có sẵn; tiến ít nên giữ vị trí, miss có recovery |
| Húc lao dài | Đọc hướng lao nhưng dễ nhầm mobility | Nhiều turn/stop, swept body và collision khó | Dễ xuyên gate/overextend; không chọn minimal |
| Vây đẩy nước | Dễ nhận Water, có nguy cơ che chi | Cần vây contact + FX/volume riêng | Trùng vai trò Vành Nước; deferred variant |
| Xung áp gần | Vòng rõ nếu có ranh giới | FX dễ làm ảo range, nguy cơ AoE toàn hướng | Dễ quá mạnh/không thấy contact; không dùng thay basic |

Khuyến nghị **`quy_basic` / Chấn Mai** — cú thân/mai tiến ngắn của C04, không đổi concept/ID thành đòn mới. Không generic damage chỉ vì frame chạm mục tiêu trong renderer.

| Phase / điều kiện | Hành vi và hit contract |
| --- | --- |
| Accept | Active, usable, action state cho phép; capture cast/source form/stage/config, facing và eligible layer; cost/CD policy chưa chốt |
| Startup | Hạ đầu/đưa vai–mai trước, vây đạp ngắn; aim cho sửa trước marker commit nếu C14 rule cho, không homing |
| Active | Một cửa sổ contact; arc hoặc short swept capsule trước thân theo shape đã duyệt, không cả sprite/FX. Motion nhỏ do coordinator, không xuyên đá |
| Dedupe | Một hit/target cho authored hit ordinal của cast; overlap nhiều frame/shape không nhân damage; target theo layer/LOS/range hợp lệ |
| Recovery | Thu lực và trả về swim/idle, hụt vẫn có recovery; không reset bằng đổi clip/switch |
| Feedback | Mép contact, âm nhỏ và dấu hit; miss chỉ kết thúc đòn, không fake hit/status/XP; FX tắt vẫn đọc anticipation/contact |
| Interrupt | Theo C14 window/state, damage không mặc định luôn stun. Accepted hurt interrupt đóng future hit windows; hit đã committed không undo. HP0 hủy unreleased windows |

Bơi khi basic chỉ giữ mức displacement được định nghĩa trong action; không root motion cộng hai lần với input/current. Obstacle cản lunge, không cho attack đem body xuyên collider. Không tự cho đòn Thủy basic phá van/tường, tạo Wet hoặc knockback mọi boss; impact/category, amount/control budgets cần definition được duyệt.

## Defense và recovery

| Hành vi | Phạm vi / ưu tiên | Giới hạn và counterplay |
| --- | --- | --- |
| Short brace Stage I | Capability phòng thủ tối thiểu của C14, hướng trước, giữ ngắn với recovery hữu hạn | Không cấp `quy_s2` Mai Định Áp sớm; nhóm mitigation/clip/cost/cancel cần duyệt; hở sườn/sau và unblockable có cue |
| Rút có hướng | Bơi lùi/đổi vị trí có kiểm soát, không instant turtle teleport | Không i-frame mặc định, không full withdraw vô hình làm mất hurtbox |
| Guard stage II | Mai Định Áp cần minimumStage II + explicit unlock | Hold/budget hữu hạn, di chuyển giảm, release/break; hit nhiều lần tiêu theo ordinal, không refresh miễn phí |
| Timed counter | Candidate mastery sau, không first playable bắt buộc | Không frame-perfect main gate, không reflect/re-counter vô hạn; nếu thêm cần ID/definition approval riêng |
| Né nhờ nước | Mượn Dòng chỉ khi source/route hợp lệ | Không universal dodge key hoặc i-frame tự cấp; current không xóa status |

Universal defense input là intent/priority của C14, còn thực hiện theo capability Quy; không ép animation roll của loài khác. Guard/Thế Trụ là posture hoặc modifiers theo owner, không shield/HP pool thứ hai. Temporary statuses vẫn E09 quản lý, không defense script tự cleanse Wet/burn.

HP model: C14 khuyến nghị A HP riêng từng form; L16 gọi cùng hướng là B individual. **Vẫn PROPOSED**, shared player HP và hybrid còn alternatives. Với một Quy prototype có thể thiết kế một owner HP qua interface nhưng không dùng điều đó làm approval cho hệ thống. Không kế thừa auto-regen/respawn Phượng thành luật Quy. Khi HP0, đóng action và coordinator giải incapacity trước; chỉ defeat khi không có continuation hợp lệ theo policy. Emergency transfer/checkpoint refill/cost vẫn chờ duyệt; không heal bằng switch/equip/evolution, không xóa species/XP. Xem [HP/recovery](../combat/INCAPACITATION_AND_RECOVERY.md) và [boss guard đã sửa](../loadout/BOSS_LOADOUT_LOCK.md).
