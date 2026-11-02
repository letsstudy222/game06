# Tiến trình loài và phần thưởng — Task15

Ngày 31/10/2026 Asia/Saigon; HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`, đã có tài liệu Task14 chưa commit. Chỉ documentation/design, không runtime balance/data/save/UI changes. [Decisions](TASK15_DECISIONS.md) giữ status; [audit](TASK15_CONSISTENCY_AUDIT.md) giữ sources/delivery/checks. Tất cả cơ chế mới bên dưới **PROPOSED**, kể cả câu quy phạm trong hợp đồng; không giá trị số cuối hoặc kết quả playtest.

## Nền đã xác nhận và mục tiêu

CONFIRMED D05–08/D30–33/D36–41: mỗi playable species tiến trình riêng; một active, tối đa ba equipped forms; boss khóa membership nhưng switch trong set; rarity/dual không auto superior; không bắt đủ ba hoặc optional species để qua early main content; data-driven, giữ collection/return/persistent-world foundations. Task15 không tự approve R03 HP/cost/recovery, V13 evolution Model D hoặc C14 combat policies.

P15-P01: thưởng tham gia combat, khám phá, discovery/observation, environmental interaction, quest/story, ancestral memory và sử dụng kit đúng ngữ cảnh. Combat là kiểm kỹ năng có ý nghĩa nhưng không nguồn EXP duy nhất. Exploration có progression thật, không cần farm peaceful wildlife. Hiểu timing/counterplay/terrain vẫn cần thiết: level không auto thắng, rarity không power multiplier, later chapter không chỉ HP cao hơn.

## Một loài, nhiều chiều nhưng ít thanh tiến trình

| Domain | Authority / nội dung | Không nhân bản |
| --- | --- | --- |
| Player Spirit | SpiritState + W07 completion/quest facts/ledger; awareness, checkpoint/loadout refs, collection links | Không shared species level/EXP pool hoặc spirit stat bar mới |
| Species playable | CreatureProgression R03: canonical species/form identity, cumulative EXP, unlocked skills, mastery objective refs, committedStageId, pending benefits | Creature ID = speciesId C04; formId ổn định qua stages, không record mới mỗi encounter/cá thể |
| Evolution stage | C04/V13 catalog định nghĩa anatomy/movement/skill eligibility/attribute profile refs | Stage level/EXP bar riêng không tồn tại; minimum stage không auto unlock |
| Individual encounter | Temporary participants/evidence/casts/attempt state, pinned config và reward source occurrence | Không save mọi hit/AI frame; durable receipt/outcome mới vào owners cũ |
| Memory/discovery | AncestralMemoryRecord/ResonanceRecord độc lập | Progression chỉ refs/projection, không copied discovered flags hoặc lore currency |

Một cumulative species EXP track cho level; mastery là objective evidence/qualitative refinements, memory/discovery là facts, evolution eligibility là derived view. Không năm loại EXP bars, không inventory hóa ký ức. Species discovered chưa playable không tạo combat record hoặc tự unlock.

## Preferred package, vẫn PROPOSED

- EXP distribution **Model D: meaningful participation + milestone foundation**, không passive reserve share. Một encounter budget phân bổ giữa eligible participants, không full award mỗi form. R03 active-only là proposal cũ chưa approved; Task15 đưa alternative/refinement có nguồn tại [EXP](EXPERIENCE_SYSTEM.md), không gọi accepted rule SUPERSEDED.
- [Curve](LEVEL_CURVES.md): shared segmented progression family, species identity ở attribute/skill/stage profiles; không rarity XP tax hoặc final cap/level brackets.
- [Mastery](SKILL_MASTERY.md): evidence thực, không cast spam hoặc another currency; [evolution](EVOLUTION_PROGRESSION_INTEGRATION.md) reuse V13 requirements/transaction.
- [Economy](../economy/RESOURCE_ECONOMY.md): Chapter I rất ít vật liệu có purpose; proof/memory khác consumable, chưa crafting/equipment/currency economy.
- [Reward lifecycle](../economy/REWARD_CONSISTENCY.md): one writer/atomic candidate gồm recipients, inventory/entitlements, claims, world facts; reload không reroll/regrant.

[Quy progression slice](FIRST_PLAYABLE_PROGRESSION.md) là subset D40/C14, không đủ full first playable hoặc full chapter economy. Task14 docs đầy đủ nhưng mechanics còn approvals/runtime gaps; Task15 không giả combat đã implemented. Task16/full audit09–16 chưa bắt đầu.
