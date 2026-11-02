# Loot tables khái niệm

**PROPOSED P15-P10**, không production tables/drop rates/random implementation. [Rewards](REWARD_SYSTEM.md), [transaction](REWARD_CONSISTENCY.md) và [data](../technical/PROGRESSION_DATA_SPEC.md) là contracts. “Loot” gồm EXP/proof/entitlements có provenance, không mọi nguồn rơi chest hoặc coin.

| Type | Eligibility / source | Category / repeatability | Persistence / dedupe | Feedback concept |
| --- | --- | --- | --- | --- |
| Guaranteed | Validated clear/objective và source budget | Authored EXP/material/proof; once hoặc occurrence explicit | Source+occurrence+manifest logical key, freeze payload | Expected reward/reason và committed gain |
| Weighted random | Eligible optional source, approved weighted pool/conditions | Optional material variation, không main progression lottery | Resolve outcome/seed payload once trong candidate; retry dùng same result, not reroll | Possible categories/conditional context, outcome sau durable ack |
| Conditional | Predicate từ authoritative world/quest/ecology/action evidence | Local residue/observation/tool-access proof, repeat policy khai báo | Expected revision; predicate changing trước commit revalidate, committed result immutable | Condition met/missing bằng clue không spoil |
| First-clear | Canonical encounter/event chưa claimed | Unique story reward/EXP package | UniqueRewardClaim view của existing ledger; contentVersion không key mới | First clear khác repeat reward rõ |
| Quest-specific | Accepted quest hoặc approved prior proof contract | Protected quest entitlement/proof, not fungible drop | Quest owner+grant atomic, no duplicate khi accept sau objective | Đã có proof/đã nhận, không yêu cầu phá restoration |
| Rare ecological discovery | Habitat/behavior/evidence condition có clue | Research/memory/optional find, chưa rarity item ladder | Discovery logical identity, no refresh farming; nếu RNG có counter rule riêng approved | Trackable clues/fallback route, không color-only |

## Evaluation và rules

Table chọn eligibility trước resolve payload. Entries có selectionMode (all/one-of/conditional), mutual exclusion/budget group, target/source constraints, provenance, occurrence policy và approved version. Weighted pool yêu cầu weights resolve/nonnegative/eligible outcomes và deterministic empty-pool policy; thiếu rule thì fail runtime-ready, không tự rate hoặc guaranteed “rare”. Một table không clone total budget cho tất cả entries/components.

Khuyến nghị deterministic guaranteed/conditional/first-clear cho Quy slice và main progression; random chỉ optional variety khi có purpose/sinks. Rare random rewards nên có deterministic authored alternative hoặc bounded failure guarantee **nếu được duyệt**; không chọn cả pity system mặc định. Pity counter nếu sau này có phải source-scope stable owner, chỉ tăng bằng committed eligible outcomes, không reset bằng table version/reload; exact cap/rates/outcomes còn P15-U07. Không paid roll/loot boxes hoặc premium resource.

Loot reroll bằng reload ngăn bằng resolved payload/seed tied occurrence trong same candidate/receipt, không RNG trên presentation. Player retry trước durable commit có thể quay last-good boundary theo W07 loss policy; không claim chống manual save rollback/cheat. Muốn chống reroll qua reset source occurrence phải persist occurrence acceptance/selection receipt theo approved writer policy, không rely memory-only RNG. World projection/load không roll thêm.

Reward table update: committed receipt giữ payload/version gốc; same logical first-clear identity không cấp lại vì contentVersion mới. Pending accepted candidate pin version/payload hoặc migration explicit trước apply, không trộn EXP cũ với material mới. Nếu source habitat thay, new eligibility đọc world facts nhưng unique reward logical identity không đổi chỉ vì spawn vị trí/label khác. Player UI thiết kế sau chỉ đọc availability/committed result, không claim authority.
