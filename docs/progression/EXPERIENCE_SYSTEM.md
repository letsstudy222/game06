# EXP sources, participation và phân phối

**PROPOSED P15-P02/P03**, [decisions](TASK15_DECISIONS.md). Reuse [R03 progression](../gameplay/CREATURE_PROGRESSION_CONCEPT.md) và [C14 attribution](../combat/FORM_SWITCHING_COMBAT.md); không EXP resolver runtime mới.

## Sources và tracks

| Category | Evidence đủ điều kiện / owner | Recipient và repeatability |
| --- | --- | --- |
| Combat | Encounter objective/outcome và meaningful participation, không mỗi damage callback | Eligible species participants; encounter occurrence budget; first-clear payload riêng key |
| Exploration | Named location discovery/traversal objective proof ở W07/journal owner | Explicit acting form hoặc recipient policy đã chốt; một discovery fact một grant, không mỗi bước qua border |
| Resonance | Observation/synchronization/trial milestones R03, source viable và route validated | Playable eligible form theo manifest; discovered species không tự có EXP record. Bootstrap unlock+initial grant cùng tx |
| Quest/story | Completion/prior environmental proof + reward manifest | Recipients khai báo; nếu cho chọn thì chọn trước commit, retry không đổi recipient. Không full award cho mọi reserve |
| Mastery use | Effective-action evidence tới distinct objective, không mỗi cast | Mastery objective ở form dùng kỹ năng; optional ordinary EXP chỉ khi manifest explicit, dedupe với same source reward |
| Ancestral memory | Canonical fragment unlock/provenance/gate | Memory fact giữ owner riêng; optional species EXP theo manifest, không duplicate khi reread |

So một shared species EXP track với mỗi category một bar: nhiều bars khó đọc, double reward/tuning và ép mọi phong cách. Khuyến nghị categories là source tags của cùng cumulative EXP; mastery progress là evidence objectives, không spendable XP hoặc bar thứ hai. Không auto cộng EXP cho mọi discovery/memory: mỗi source cần reward contract và budgets. Proof nguồn và outcome gameplay không do EXP service tự tạo.

## A–D distribution models

| Model | Fairness/clarity | Incentive / three-form fit | Complexity/exploit |
| --- | --- | --- | --- |
| A active only | Dễ hiểu, reserve tụt; phải rõ active tại action hay payout | Khuyến khích direct use, một form hoạt động bình thường | Thấp; last-hit switch nếu payout đọc active mới, support không được credit |
| B active+reserve | Dễ bắt kịp nhưng người không dùng vẫn có gain | Experiments dễ, đầy ba có lợi hơn một nếu bonus budget | Vừa; equip trước payout/AFK carry, phải cap và không nhân tổng budget |
| C participation | Thưởng damage/defense/control/objective thực; giải thích khó hơn | Tactical switch có ý nghĩa, một đến ba đều hợp lệ | Cao hơn, tag-and-swap/overkill/staged ally farming nếu evidence yếu |
| D hybrid | C participation + foundation theo durable milestones, không passive B | Use meaningful vẫn cần cho mastery/skills; không phải đủ ba để hiệu quả | Vừa-cao nhưng chỉ hai mechanisms, normalized budget + rest boundary, không stacked bonus currencies |

Khuyến nghị **D**, chi tiết C bounded attribution + foundation tại [catch-up](CATCH_UP_PROGRESSION.md). Không chốt weights/thresholds/shares. Đây là alternative mới cho R03 active-only, không tự phê duyệt hoặc sửa nguồn R03. Nếu implementation scope chọn A tối thiểu cho single-form demo thì kết quả giống D một participant; multi-form attribution vẫn gate trước mở rộng.

## Meaningful participation contract

Accepted evidence trỏ event/cast/source form và objective/target; không dùng “đã equip/đã active vài tick” làm proof. Candidate contribution classes: damage hợp lệ (không overkill/self-created farm), defense ngăn đòn có threat thực, control mở objective/punish hợp lệ, traversal/receiver action góp objective encounter. Healing chỉ effective restored HP trong genuine encounter, không self-damage loop/overheal; điều kiện C14 HP/heal chưa approved thì không fixture giả.

Một form được coalesce evidence; split species budget một lần trên eligible participants bằng normalized policy weights sau approval, không full payload mỗi participant. Tổng allocations + rounding remainder bằng total budget; deterministic remainder assignment, không làm tròn tạo thêm XP. Không bắt ba participants, không hidden minimum để boss entry. Không participant hợp lệ thì không tự award active cuối: lỗi source/fixture hoặc intentional environmental/non-player outcome theo manifest.

Source form của projectile/DoT giữ theo accepted cast/status snapshot C14, không active form lúc target chết; environment-owned kill không mạo nhận credit nếu player không có evidence. Hit count/multi-target/segments không là reward count. Support/control evidence có caps per objective/occurrence để spam block/refresh không nâng share vô hạn; không disclosure exact tuning chưa chọn, nhưng player-facing reason biết “đã góp / chưa đủ proof” và source repeatability.

## Occurrence, cutoff và boss

Encounter definition quyết objective, reset/occurrence eligibility và finalization cutoff. Ordinary meaningful clear có thể repeat theo explicit policy, target respawn timer **không** tự sinh reward occurrence. Boss aborted chưa completion không award first-clear/whole encounter EXP; proof/grants độc lập đã durable trước đó giữ, không refund rồi grant lại. Repeated failed attempts không mint boss participation rewards. Released source trước switch vẫn credit form cũ; late evidence sau cutoff không mở lại reward hoặc đổi payload, C14 retires attempt effects khi resolving.

Pending recipients freeze trước grant commit. Incapacitated participant vẫn được earned EXP nếu manifest cho, HP0 không hồi/auto evolve. Inactive level-up là durable XP với pending combat benefits; trong boss dùng frozen config đề xuất R03/C14/V13, ngoài lock apply theo safe policy [attributes](ATTRIBUTE_GROWTH.md). Pause/offline không participation hoặc EXP. Quest có prior proof không bắt dựng lại môi trường để “participate” lần hai.
