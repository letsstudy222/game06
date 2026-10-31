# Attribute growth và bản sắc loài

**PROPOSED P15-P05**, [C04 data](../technical/CREATURE_DATA_SPEC.md), [E09 balance](../gameplay/ELEMENTAL_COMBAT_BALANCE.md), [C14 damage](../combat/DAMAGE_RESOLUTION.md) giữ mechanics/budgets. Không final formula hoặc runtime balance changes.

| Property | Level growth candidate | Chủ yếu do đâu / constraint |
| --- | --- | --- |
| maxHP | Modest bounded durability progression nếu HP model được duyệt | Anatomy/stage/profile giữ base; không chọn HP pool C14 thay user |
| Attack/damage budget | Bounded increase theo growth profile | Skill phases/reach/channel split giữ; level không nhân full damage từng status/reaction output |
| Defense | Bounded mitigation contribution | Guard sector/material/cause groups E09/C14, không tiến tới zero damage/all-channel immunity |
| Movement speed/turn/acceleration | Không universal growth mỗi level | Anatomy/movementMode/terrain/stage module; Quy không thành fastest attacker vì level |
| Attack speed/recovery | Không universal level stat | Animation/contact/cancel markers là action contract, unlock refinement phải review timing/telegraph |
| Elemental/status resistance | Không tăng tất cả affinities mỗi level | E09/E10 response profile/scoped protection/context; không thêm dual stacking hoặc Life damage |
| Skill efficiency | Optional bounded upgrade với opportunity cost | Unlock/mastery/versioned action policy; không cooldown→zero, infinite heal/CC/resource loop |
| Environment tolerance/reach | Không stat chung auto tăng | Stage/capability/receiver và topology/return route, không level đủ là đi mọi độ sâu |
| Equipment/resources | Chưa chọn equipment stat growth | Không introduce gear rarity/crafting/buff economy qua bảng growth |

Combat effective attributes là read model từ catalog version + level derived + committed stage + approved action upgrades + current context/status. Stored species XP/skill facts là owner cũ; không mỗi loadout slot lưu independent attack/maxHP. E09 cause groups normalize cùng source, đừng vừa tăng defense profile vừa nhân cùng buff lần nữa. Rarity/dual/narrative Sacred không multiplier.

## Safe application và HP

EXP/grant có thể durable khi inactive hoặc trong boss; proposed frozen combat config không đổi mid-attempt. Pending benefits là refs/revision cần apply, **không XP chờ grant lần hai**. Outside lock áp tại safe boundary với current body/status/geometry checks; inactive reader dùng same committed revision khi equip. C14/R03/V13 HP model/status obligations còn pending.

Đề xuất mapping maxHP **không là heal**: normal level-up giữ currentHP tuyệt đối (bounded bởi max mới), HP0 vẫn HP0; nếu chọn khác cần scoped approval P15-U03. Evolution maxHP mapping tiếp tục R03/V13 ratio proposal, không bị Task15 thay ngầm. Concurrent level benefit + evolution cần coordinator tính level baseline trước, rồi evolution mapping trên same candidate đúng một lần; không áp cả absolute/ratio hai lần hoặc nhầm form. Boss abort/reset recovery riêng sau attempt, không dùng level-up để refill. Không chọn số tăng trưởng/cap/floor/resist values.

## Species trade-offs

Quy giữ defense/pressure/zone, Phượng mobile AoE/thermal, Long lane/wind control/long-body envelope, Ly support/plant positioning. Level giúp sustain niche, không tự cấp skill stage sau. Common/single species có reliable tool/counterplay và utility tại late regions, không bị gear/rarity/dual tổng stats thay hoàn toàn. Comparative tests sau approval đo encounter completion/skill demand/safety/utility, không chỉ DPS; hiện không balance claims.
