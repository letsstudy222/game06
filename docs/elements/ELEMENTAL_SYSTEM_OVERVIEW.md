# Nền hệ thống nguyên tố

Baseline đã kiểm `e24b968`; commit này có trong history và là HEAD khi bắt đầu Task09, không giả mặc định mọi phiên đều như vậy. **Task09 — PROPOSED:** mọi cơ chế/ID/interaction chi tiết mới là đề xuất, chưa triển khai hoặc cân bằng. Chỉ nền được dẫn rõ là CONFIRMED. [Decision register Task09](TASK09_DECISIONS.md) giữ status/dependencies; không tự bắt đầu Task10.

## CONFIRMED — nền và phạm vi

[PROJECT_DECISIONS](../PROJECT_DECISIONS.md) D04/D09/D18/D38: Water/Thủy, Fire/Hỏa, Wind/Phong, Wood/Mộc nguyên sơ; Lightning/Lôi và Metal/Kim là ảnh hưởng ngoại lai. Quy–Thủy, Phượng–Hỏa, Long–Phong, Ly–Mộc; Life/Sinh Mệnh là authority riêng của Ly, không thành ordinary combat element thứ năm. Ngoại lai không ác mặc định, dual không tự corrupted, adaptation khác forced assimilation. Chronology tiếp xúc vẫn UNRESOLVED Q02/A08-15; không sửa mốc H2/H4.

D05/D06/D07: một active/hai reserve trong ba slot, switch khi boss nhưng membership khóa, progression mỗi loài riêng. Task09 xác nhận không bắt ba member/ba nguyên tố khác nhau để vượt early content hoặc boss đầu. Một/hai dạng main có thể vượt nội dung được thiết kế cho năng lực đã mở; không auto grant hai species hoặc biến reserve thành avatar phụ.

Chỉ documentation/system design: không đổi runtime SkillSystem numbers, UI, art, scene, maps, package/lockfile. [GDD](../GAME_DESIGN_DOCUMENT.md) và [handoff Phase I](../PHASE_I_HANDOFF.md) là nguồn đọc; Task09 không phê duyệt toàn R03/C04/S05/F06/W07.

## PROPOSED E09-P01 — triết lý chiến đấu

Nguyên tố là vocabulary của hành động, không đáp án duy nhất của matchup. Đọc anatomy/skill, vị trí/hướng, telegraph, nguồn vật chất, trạng thái và receiver đem lợi thế. Cùng một affiliation có thể tạo bruiser, duelist, artillery hoặc support theo anatomy/movement/skill selection. Không cần nhớ hàng chục hệ số ẩn; mỗi kết quả nổi bật có một nguyên nhân thấy được và một cách đối phó bằng năng lực main khả dụng.

Khuyến nghị Model C có giới hạn: affiliation cung cấp một số trait/affinity được author khai báo; property/context quyết phản ứng có điều kiện; phần lớn hit vẫn ordinary damage + counterplay. Chưa duyệt bảng affinity hay multipliers. Xem [models](ELEMENTAL_AFFINITIES.md), [36-cell matrix](ELEMENTAL_INTERACTION_MATRIX.md).

## Bốn lớp không trộn

| Lớp | Purpose / ownership | Ví dụ / không suy |
| --- | --- | --- |
| Affiliation | Species catalog; identity/nguồn sức mạnh | water không auto heal hoặc miễn mọi water hit |
| Attack properties / damage channels | Skill/cast snapshot; loại tác động và budget | pressure, cutting, moisture, heat; một đòn có thể có physical + thermal nhưng tổng budget không nhân đôi |
| Status / reaction | Runtime target/context records, setup và counterplay riêng | Wet không là damage multiplier phổ quát, steam không là nguyên tố thứ bảy |
| Environment / story | Context receiver + movementProfile + W07 event authority | Skill nước có thể tác động van hợp lệ nhưng không tự water_stable |

## Ownership và switching — PROPOSED E09-P06

[Statuses](STATUS_EFFECTS.md) phân combatant_shared, form_bound và source_active; đây là owner gameplay, không nói Tinh Linh có cơ thể cháy sinh học. AI target là player/spirit combatant identity liên tục; đổi form chỉ cập nhật silhouette, capability và active geometry tại commit R03, không reset aggro/hit ledger. Enemy chỉ phản ứng vào body/skill cues thấy được, không đọc reserve menu hoặc tự biết mọi resistance ẩn.

Burning/rooted/slowed/disrupted giữ áp lực lên combatant xuyên switch; wet/electrified/armor weakened giữ record theo form, không spawn body reserve ngoài map; shield/regen skill active-only chấm dứt khi rời form nguồn. Duration dùng cùng simulation clock, pause dừng, không tick miễn phí theo wall clock/offline. Không default reserve damage/regen mới. Bảng chi tiết là đề xuất cần review; R03 resource/recovery vẫn chưa chốt.

Projectile đã release dùng creatorFormId/config/stage snapshot, castId/hit ledger và TTL cũ. Switch không nhân damage, kéo dài lifetime, reset cooldown hay đổi thành stats form mới. PREPARING chưa release thì interruption/cancel theo skill/R03; không bắn phần đã hủy. Non-channel residue theo C04 tồn tại hữu hạn sau switch, active-only/channel kết thúc; creator incapacitated hoặc attempt abort/end xóa combat residue theo proposal nguồn. World changes đã durable không xóa theo defeat.

## Chất lượng và production cut

**PROPOSED:** first playable Quy I ưu tiên movement, directional physical/pressure attack, receiver feedback và minh họa wet nếu có source phù hợp. Không bắt có pair reaction, Lôi playable, Phượng hoặc đủ ba slot. Eight evaluated reactions không là eight mandatory release features. Mọi affinity/status/FX phải thông báo bằng shape/vector/animation + âm hỗ trợ, không chỉ màu; giữ crisp pixel art và silhouette Phoenix/Long/Ly đã duyệt.

## Nguồn chịu trách nhiệm

- [Definitions](ELEMENT_DEFINITIONS.md): sáu identities và species expression, không roster loài mới.
- [Affinities](ELEMENTAL_AFFINITIES.md): models/resistance/hit evaluation, không final matchup table.
- [Matrix](ELEMENTAL_INTERACTION_MATRIX.md): đủ36 directed cells và loại tương tác; [reactions](ELEMENTAL_REACTIONS.md) sở hữu8 reaction contracts.
- [Statuses](STATUS_EFFECTS.md):9 candidates, lifecycle/stack/owner/CC.
- [Environment](ENVIRONMENTAL_INTERACTIONS.md):16 exploration contexts và W07 boundaries.
- [Balance](../gameplay/ELEMENTAL_COMBAT_BALANCE.md): qualitative trade-offs/exploit/performance; [data](../technical/ELEMENTAL_DATA_SPEC.md):10entity contracts.
- [Cases](../technical/ELEMENTAL_TEST_CASES.md):20scenarios, không tests thực thi; [audit](TASK09_CONSISTENCY_AUDIT.md) giữ conflicts/readiness/missing.
