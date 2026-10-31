# Skill unlock, upgrade và mastery

**PROPOSED P15-P06**, [R03 progression](../gameplay/CREATURE_PROGRESSION_CONCEPT.md), [C04 abilities](../gameplay/SACRED_CREATURE_ABILITIES.md), [V13 gameplay](../evolution/EVOLUTION_GAMEPLAY_CHANGES.md) giữ skills/stages. Không skill tree/UI/module mới.

| Concept | Điều đạt / owner | Không tự đồng nghĩa |
| --- | --- | --- |
| Unlock | Existing unlockedSkillIds, explicit prerequisites/grant | Có level/minimum stage không auto mở mọi skill |
| Upgrade | Versioned ability improvement/config choice theo objective | Không spend species EXP lần nữa hoặc auto +damage mỗi mastery tick |
| Mastery | Objective evidence về dùng kit có ý nghĩa, ref trong form record | Không currency/bar song song hoặc chỉ cast count |
| Evolution upgrade | Committed stage anatomy/capability/skill eligibility V13 | Không reset XP/mastery, không giành slot mới hoặc cấp sớm S2/S3 |

Khuyến nghị mastery theo finite objectives/qualitative tiers nếu được duyệt, không mastery EXP bar riêng. Definitions nói objectiveId, eligible skill/action/evidence refs, target/context conditions, repeatability/cap, success/failure, accessible alternatives/hints và benefit refs. Completion receipt theo logical objective key; đổi text/contentVersion không award lại. SkillMasteryRecord mở rộng existing masteryObjectives owner, không duplicate unlocked skills.

## Meaningful-use examples, chưa final requirements

| Candidate | Accepted evidence | Không credit |
| --- | --- | --- |
| Quy basic/brace | Timing/sector đối phó threat thực hoặc safe authored trial có proof | Guard giữ vô hạn chỗ trống, tự tạo damage loop |
| Water receiver | Dùng áp nước đúng receiver/nhịp đạt authored ecological objective | Spray cùng object unchanged hoặc toggle qua lại do player để mint mastery |
| Phượng/Long reposition | Đọc lane/landing và hoàn objective/safe route | Bay vòng vô hạn, touch checkpoint reset counter |
| Ly support | Effective intervention/anchor vào viable target/source thực | Overheal, heal reserve HP0 hoặc biomass→resource loop |

Một cast nhiều hit/segments/status ticks chỉ coalesce objective evidence; rootCast/source form snapshots cố định C14. Có dedupe sourceId+objective+occurrence, finite per-encounter cap và anti-loop predicates; không hidden diminishing penalty sau khi đã hứa reward. Repeat meaningful practice có thể cho feedback nhưng not every input grants mastery/EXP. Mastery optional skill refinement không completionist main-story gate; evolution chỉ dùng specific approved subset, với alternatives author chỉ định.

Mastery completion có thể kèm ordinary species EXP khi manifest khai báo, nhưng cùng source có explicit stacking/exclusion policy để không nhân combat+mastery+quest reward ngoài budget. Không cashout mastery sang universal resource. Benefit không xóa weakness, recovery, channel cost hoặc CC limit; optional specialization có trade-off/readability/module/clip compatibility. Không tự respec economy hoặc permanent missable choice.

Trong boss có thể commit evidence/earned unlock receipts, effect benefits pending theo R03/C14 frozen config proposal. Đừng unlock kỹ năng đang cooldown rồi đổi ID để CD về zero; canonical alias/successor mapping giữ accepted cost/cursor. Evolution giữ unlock/evidence cũ, successor mapping V13 reviewed; asset missing chặn use, không xóa tiến trình. Save/load hoàn objective hai lần return same receipt, không reset proof. Exact objectives/counts/tiers/benefits/assist policies P15-U04 chưa chốt.
