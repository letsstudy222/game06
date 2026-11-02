# Framework kỹ năng và resource

**PROPOSED C14-P04/P05**. [C04](../gameplay/SACRED_CREATURE_ABILITIES.md) giữ skill IDs/gates, [E09](../technical/ELEMENTAL_DATA_SPEC.md) giữ AttackProperties/status, [E10](../technical/DUAL_ELEMENT_DATA_SPEC.md) giữ composition wrapper. Không cố định active slots/loài; ba signature examples không là quota production.

## Lifecycle

Request → kiểm actor/phase/unlock/target/capability/asset → reservation → accept/cooldown commit → cast/release → bounded effects → recovery/cleanup. Đề xuất CD từ accept; nếu có energy, reserve tại accept, spend tại release, cancel nhả phần chưa spend. Phần đã tiêu không refund; startup cancel không tránh CD. Target mất: revalidate rồi cancel/whiff theo definition, không auto retarget ngoài warning. Missing cost/CD/interrupt/marker policy chặn runtime-ready, không tự điền số.

Mỗi category kế thừa lifecycle, finite budget và E09 status applications; CD dưới đây là policy cần author, không cùng giá trị mọi category. Không element label→debuff mặc định.

| Category | Activation/target/duration | Resource/CD/interrupt | Detection/status | Visual/audio/balance |
| --- | --- | --- | --- | --- |
| Direct damage | Nhấn hướng/actor, một release | Accept CD; startup ngắt theo profile; release spend | Arc/thrust/sweep, onDamage status explicit | Nạp/contact/impact ngắn; burst đổi recovery |
| Area damage | Point/self trong LOS, warning→pulse finite | Budget vùng chia ticks; cast ngắt trước release | Layer/obstacle query, dedupe/pulse | Viền/nhịp nổ/âm nạp-xả; tránh phủ màn |
| Projectile | Hold/release hướng, TTL/range | Owner snapshot khi release; ngắt không xóa đạn đã bắn | Sweep/LOS/pierce policy, explicit contact statuses | Silhouette/vector, âm phóng-va; cover/cận counterplay |
| Mobility | Vector/route đủ chỗ, finite motion | CD/cost finite, collision stop; interrupt profile | Swept footprint, damage chỉ qua attack component | Nạp/đáp/trail/âm lướt; không default i-frame |
| Barrier | Self/sector/anchor, cap/expiry | CD/hold budget, break/release recovery | Defense filter, status pass-through explicit | Mép/góc hở, block/break sound; không reserve shield |
| Counterattack | Block/evade evidence + input window | Không reset CD khi hit reject; ngắt trước release | Cast mới linked triggerId; không reflect trùng | Counter cue/impact; không bắt perfect timing |
| Crowd control | Nguồn/anchor/target family hợp lệ | Cost/CD/CC budget, source break theo scope | Hit/node; E09 root/slow/disrupt | Anchor/icon/âm giữ-thả; family recovery chống chain |
| Support | Self/receiver, bounded uptime | Finite cost/CD, channel có hở | Permission query, explicit buff không auto damage | Phạm vi/expiry/âm hỗ trợ; không buff reserve bodies |
| Healing | Active viable recipient, không corpse/HP0 reserve | Finite budget/CD, channel ngắt; không tạo resource | Heal intent/maxHP cap; source_active E09 | Pulse/icon/âm nhẹ; không auto cleanse/revive |
| Summoned environmental effect | Anchor hữu hạn, không organism reward mới | Source budget/TTL/cap; source-active hoặc released residue rõ | Local area/receiver, tick ledger | Nguồn/expiry/âm nguồn; không sinh tài nguyên vô hạn |
| Elemental interaction | Properties+material/receiver evidence | Consume token/cost, cancel trước consume | E09 reactions/E10 arbitration | Setup/output/cue nguyên nhân; non-reactive output default |
| Traversal riêng loài | Connector/context/capability | Budget nếu được duyệt, không bắt dùng combat CD | Clearance+W07 permission, không auto status | Hướng/đích/âm tương tác; không nước mở mọi cửa |

## So sánh tài nguyên

| Tiêu chí | A cooldown | B energy | C hybrid |
| --- | --- | --- | --- |
| Accessibility | Ít meter, học nhịp | Đọc quỹ/regen/cạn nút | Nhiều ràng buộc cần giải thích |
| Pacing | Commit/recovery/chờ cửa | Burst/tiết kiệm/downtime | Điều tiết burst và sustained |
| Depth | Position/target/window | Chia quỹ giữa skills | Phong phú, dễ quá tải |
| Switch | CD form tick reserve, switch gate riêng | Shared carry hoặc ba pin riêng | Ownership cả resource/CD |
| Balance | Uptime/damage/recovery dễ cô lập | Cost/regen/heal loops | Nhiều tương tác nhất |
| Implementation | Thấp, reuse timer concepts | Thêm quỹ/reservation/save | Cả hai + refund cases |
| Exploit | Rotate strongest nếu bỏ recovery | Reserve recharge/refill/heal-energy loop | Reset đồng thời quỹ/CD |

Khuyến nghị **A cho combat slice Quy**, giữ resourcePolicyRef để đánh giá C khi kit rộng hơn. B/C không SUPERSEDED, chưa chọn. A không cho guard/heal vô hạn: finite hold/budget/recovery/CD. Không thêm energy meter chỉ để lấp field. **Quỹ ổn định cộng hưởng R03 tách skill resource**; chọn A không tự xóa hoặc approve quỹ switch. Exact costs/CD/regen/defense stamina tiếp tục C14-U02/R03 pending.
