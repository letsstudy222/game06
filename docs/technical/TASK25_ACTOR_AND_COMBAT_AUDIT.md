# Actor, creature và combat hiện tại

Nguồn trực tiếp: [GameState](../../src/island/GameState.mjs), [PlayerPhoenix](../../src/island/PlayerPhoenix.mjs), [SkillSystem](../../src/island/SkillSystem.mjs), [IslandScene](../../src/island/IslandScene.mjs), [AnimationController](../../src/island/AnimationController.mjs), [index](../../index.html). Đối chiếu [Task14](../combat/COMBAT_SYSTEM_OVERVIEW.md), [Task16](../loadout/LOADOUT_SYSTEM_OVERVIEW.md), [Quy](../chapter1/QUY_DESIGN_OVERVIEW.md), [boss Task23](../chapter1/CHAPTER1_BOSS_QUY_COUNTERPLAY.md).

## Actor và identity

GameState có đúng một player và luôn `new PlayerPhoenix(spawn)`. Không species/form/stage ID, loadout slots, reserve bodies, EXP/mastery/evolution hoặc spawn factory. Renderer dùng meta.phoenix và cell96; HUD tên Nhật Diệm/Lv.1/LEGEND là HTML viết sẵn, không bằng chứng progression hoặc rarity model đang chạy. setIsland tái tạo player/skill; chưa là chuyển vùng bảo toàn identity.

D05/D06/D07/D30/D39/D41 giữ CONFIRMED theo nguồn: tối đa ba dạng/một active, khóa membership boss, progression riêng loài, ba stage Tứ Linh, mở rộng qua dữ liệu và không compulsory-three early. `quy_hai_uyen`, `form_quy_hai_uyen`, stage/ability `quy_s1` là mapping ứng viên; trùng chuỗi giữa stage/ability đòi typed refs. Task25 không duyệt catalog hoặc hot-swap body.

## Combat thực và hardcode

| Cơ chế | Thực tế | So với thiết kế tương lai |
| --- | --- | --- |
| attack | Cooldown0.38, damage1, range38; use resolve ngay bằng range/dot>0.15, thêm slash FX | Không startup/contact/recovery authority hoặc hit ordinal ledger; visual animation không điều khiển thời điểm hit |
| fire | Cooldown1.8, damage3, range170, speed200, charge0.16; hướng snapshot, theo owner lúc charge, sau release chia bước3pixel | Có ý tưởng charge/projectile nhưng không generic cast/interrupt/source packet/element resolver |
| Target damage | hit() trừ HP/clamp0, flash0.15, respawn timer9 giây | Không reward/loot/attribution; direct hit trước obstruction trong mỗi projectile substep cần kiểm edge case sau |
| Player damage | damage() kiểm invulnerable/recovery, HP clamp, i-frame1giây; hazard gây12 nếu không hover | Pipeline nhận damage khác target; không common damage resolver hay guard/control model |
| Hồi phục | Auto-regen5HP/giây sau4giây; HP0 GameState respawn tại spawn, đầy HP/invulnerable2/recovery0.55 | Chỉ luật prototype Phượng, không phê duyệt HP/recovery Quy hoặc emergency transfer |
| Cooldown | Hai key attack/fire giảm theo update dt; mỗi setIsland tạo lại | Chưa per-species/canonical skill cooldown/carry-over qua đổi dạng |
| Địch/AI | Hai map hiện tại đều targets:[], không enemy AI states; hazards là vật cản vùng tròn | Unit test dựng targets fixture; browser thấy FX/hazard thật, không chứng minh encounter boss |
| Combat UI | Nút/icons/cooldown mask theo SKILLS cố định | Chưa binding ability theo loài hoặc trạng thái boss/loadout |

Không suy sáu tên AnimationController là sáu bộ action sprite. Không có generic Wet/reaction, status obligations, resistances, resource reservation, action cancel debt, guard, stun, threat scheduler, boss phases/outcome arbitration hoặc membership lock.

## Lộ trình tương thích PROPOSED

1. Giữ PlayerPhoenix/SkillSystem và tuyến Dawn như regression fixture, không đổi số hiện tại.
2. Duyệt gate A–D rồi bổ sung interface actor/view/movement/ability catalog trong scene thử riêng; adapter cũ vẫn tạo đúng Phượng.
3. Scene movement-only có Quy I fixture được ghi nhãn kỹ thuật, không giả E01 unlock hoặc quyền sở hữu form trong save chính.
4. Khi thêm basic combat, chốt gate E và action/geometry/clip subset; tạo common hit/source resolver có test, không bọc tên mới quanh hit ngay lập tức rồi gọi đó là Task14 hoàn chỉnh.
5. Chỉ nối progression/loadout/evolution sau typed IDs và writer gate F; không cần ba playable species để thử Quy I. B23/health/boss result policy vẫn UNRESOLVED.

Tái dùng math/dt/clock/FX làm primitive có điều kiện; cần mở rộng bootstrap/render/input contracts; cần tạo mới domain creature/quest/reward/save/AI phù hợp slice. Không đề xuất full-engine rewrite, không triển khai actor system trong Task25.
