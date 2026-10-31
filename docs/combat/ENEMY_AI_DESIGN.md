# Enemy AI, targeting và counterplay

**PROPOSED C14-P10**. [F06 archetypes](../gameplay/ENEMY_ARCHETYPES.md) giữ chín template IDs, ecology/reward/affiliation; không species mới, AI code hoặc approval existence của factions.

## State graph có điều kiện

IDLE↔PATROL; stimulus hợp giác quan→INVESTIGATE→ALERT; threat hợp lệ→PURSUE; range/LOS/action admissible→ATTACK→RECOVER→re-evaluate; nguy hiểm→RETREAT; mất path/target/leash→RETURN_TO_TERRITORY→idle/patrol; HP0→INCAPACITATED. Không bắt mọi enemy đủ states. Recover không cancel mỗi tick để đuổi; Alert có warning trước first hit. Unconfirmed sensory/path/range/timeout numbers để sau.

Action planner đọc local perceived facts, movement capabilities, nav layer, last known position/time và territory/source refs; không đọc reserve loadout bí mật hoặc player input tương lai. Target stable combatantId qua switch; geometry/LOS vẫn có thể làm miss thật, switch không clear aggro/hit ledger. Telegraph lock vector tại attack marker; không continuously track tới impact. Path mất: ngừng attack thiếu LOS, thử route hữu hạn/điểm last-known rồi return có cue; không teleport xuyên vách hoặc reset unique rewards.

| Category / F06 mapping | Detection/aggression | Movement/selection/telegraph | Defense/territory/recovery/counterplay |
| --- | --- | --- | --- |
| Passive wildlife / arch_passive_grazer, arch_neutral_forager | Giác quan chuyển động/nguồn ăn; bị dồn/quấy mới self-defense | Tránh/refuge, warning stress trước shove, không chase player mọi lúc | Escape/contact giới hạn; hết threat về sinh thái. Quan sát/để lối thoát; không bắt kill |
| Territorial / arch_territorial_defender | Boundary/nguồn/tổ và warning trước escalation | Giữ điểm, approach/shove có nạp và facing lock | Flank/outside boundary, recovery sau miss; leash/refuge rõ |
| Predator / arch_ambush_predator | LOS/chuyển động/cover giới hạn, lane săn | Rình→warning dấu săn→commit lao→recover | Cover/rút khi bất lợi; dụ hụt/đổi lane, không hit ngoài màn vô báo |
| Unstable / arch_unstable_organism | Exposure/stress + cognition nền, không psychic | Đợt xả theo source cue, movement nền, attack selection finite | Giữ khoảng/tìm refuge; cắt nguồn/né nhịp; không purple=evil hoặc cleanse universal |
| Intelligent faction / arch_faction_scout, arch_patrol_guardian | Witness/permission/LOS/local concern | Intercept/cover/call hữu hạn theo nhiệm vụ, warning có ý định | Retreat/territory theo nhiệm vụ, punish recover; evidence/disengage được nếu content cho. Faction names chưa approved |
| Regional elite / arch_regional_elite | Detection nền, optional challenge entry | Overlay một timing/lane refinement, không radar vì rarity | Hở có thể học, finite defense/control; route rút/reset attempt không reset unique ledger |
| Boss / arch_environmental_boss | Arena trigger/capability policy, không species mới | [Encounter framework](BOSS_COMBAT_FRAMEWORK.md), authored patterns/phase predicates | Leash là arena/abort contract, vulnerability/CC response rõ; không require unavailable forms |

## Selection, fairness và tests về sau

Filter actions theo capability, source, distance/LOS, cooldown, terrain; chọn trong admissible set bằng deterministic priority hoặc authored seeded variant nếu approved. Không hidden perfect counter sau switch. Nếu không action hợp lệ thì reposition/recover, không fire instant fallback hit. Attack scheduling có concurrency/space budget để không tổ hợp unavoidable; exact cap chưa chốt. Detection/attack/recovery khác difficulty/rarity/affinity/morality. Navigation thay vì per-species core branch; elite overlay không nhân toàn stats.

Telegraph theo [feedback standard](COMBAT_FEEDBACK.md); audio luôn có visual counterpart. Enemy stun hủy unreleased actions theo interrupt profile, không tiếp tục release do animation callback. Released projectile vẫn theo cast lifecycle; guard/CC/boss status policy không tự toàn miễn. Outcome combat không đồng nghĩa loot/acquisition/quest completion: grants qua existing ledger/world writer, không AI callback.
