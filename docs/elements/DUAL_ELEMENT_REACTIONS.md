# Phản ứng có giới hạn và trạng thái

**Task10 — PROPOSED:** đặc tả để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline kiểm tra `38b8c1c`, 30/10/2026 Asia/Saigon. [Decision register](TASK10_DECISIONS.md) phân biệt nền CONFIRMED, recommendations và UNRESOLVED.


## Context resolution — E10-P05

Nguồn authority là [E09 reactions](ELEMENTAL_REACTIONS.md) và [statuses](STATUS_EFFECTS.md), vẫn proposals. Không tạo bảng khắc chế số, status mới hoặc phản ứng bắt buộc cho mọi pair.

| Context | Quy tắc đề xuất |
| --- | --- |
| Dual dùng single skill | Chỉ element/property của skill, không miễn phí proc từ membership thứ hai |
| Combined skill | Accepted components chia budget, explicit permissions; không tự setup/self-react trừ internalReactionPolicy được author/duyệt riêng |
| Pre-existing status | Đọc accepted target/context snapshot, reserve/consume token theo rule; không lấy màu/vừa có affiliation làm status |
| Environmental reaction | Source/path/receiver finite, W07 giữ quyền permanent commit, cast chỉ gửi intent |
| Dual vs dual | Không cartesian bốn pair để phát bốn outcomes; target resistance theo component channel, chọn reaction priority explicit |
| Dual vs single | Cùng luật source/budget/counterplay, single không bị phạt vì thiếu identity thứ hai |

## Một root event, ownership rõ

Snapshot pre-status/context → validate accepted components → direct hit theo allocated budget/cause groups E09 → chọn reaction từ eligible inputs theo priority/exclusions → consume token và ghi ledger → output non-reactive → receiver intent/presentation. OnContact/onDamage phải khai báo, shield không tự mặc định cả hai. Một status được apply trong cast không tự thành setup của component sau cùng root nếu chưa có internal policy được review.

Khuyến nghị giới hạn một primary reaction cho mỗi rootCastId + target/receiver + reactionGroup; E09 ledger reactionId vẫn giữ, thêm exclusivity group không bỏ idempotency. Priority là metadata rõ, không source array order/primary affinity/hit callback race. Same input tokens không nuôi hai outputs cạnh tranh. Một skill thật sự có nhiều hit cần hit windows/budgets author, không dùng callback occurrence vô hạn. Direct/status/reaction chia cùng nguồn hữu hạn; không full base damage cho mỗi channel/hop/recipient.

Output `reactionEligible=false` theo E09; không dùng output điện tự nạp nguồn đã xả hoặc root gia hạn root. Ngoại lệ tương lai cần approved acyclic graph và total budget, không tự bật. Bounded local graph/spatial query, không full ocean conductivity, world weather hoặc elemental physics simulator. Visual cull không bỏ authority; silhouette, path, endpoint và warning ưu tiên, không stack full-screen FX. Root/slow/disrupt coalesce/control recovery theo E09, không queue stunlock; values vẫn pending.

## Dùng lại tám candidates, không duyệt qua Task10

Thủy–Lôi dùng `rx_conductive_discharge` nếu Wet/path/charge thật có; Hỏa–Kim đánh giá `rx_heat_transfer` theo material/outlet; Phong–Lôi `rx_storm_guidance` vẫn DEFERRED có thể chỉ generic redirect. Mộc–Kim không cần named reaction mới, property-based precision/support đủ identity. `rx_water_fire`, `rx_directed_heat`, `rx_hydrated_growth`, `rx_controlled_renewal`, `rx_charged_path` giữ source/selection/status như E09, không dual membership làm điều kiện đủ.

## Switching, save và environmental boundary

Combatant_shared follows target identity, form_bound giữ binding/expiry và không đánh body reserve; source_active ends khi rời nguồn. Skill attribution frozen ở release, target profile đọc đúng accepted boundary. Không reset status/tick/CC recovery khi đổi dạng. HP0/recovery và resource policy không chốt lại. Minimal obligation save E09-P10 vẫn cần A08-11/E09-U03; Task10 không biến transient FX thành world facts hoặc tự cho load cleanse miễn phí. Unique reward/progression và region patches chỉ owner cũ, không reaction engine tự grant.
