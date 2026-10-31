# Quy progression demonstrator

**PROPOSED P15-P15**, scope provisional để review; là subset [D40](../GAME_DESIGN_DOCUMENT.md) và [C14 combat demonstrator](../combat/COMBAT_VERTICAL_SLICE.md), không toàn Chương I. Không code/data/save/UI changes Task15.

| Component gợi ý | Behavior / evidence tương lai |
| --- | --- |
| Một Quy I playable | Same species/form progression identity; không ba forms/evolution stages bắt buộc |
| Species EXP record | Cumulative XP + derived level/profile version + receipts; small level-up demonstration sau approved fixture thresholds |
| Một repeatable combat source | Genuine encounter clear/occurrence contract; one participant specialization của Model D, không bare target respawn farming |
| Một exploration/observation source | Named objective proof+optional XP, unchanged repeat no grant |
| Một unique event reward | Canonical source/claim/proof, XP+proof nếu manifest cho; item không bắt buộc |
| Progression feedback concept | Source/recipient/earned EXP/level hoặc already recorded, durable status rõ; không task UI redesign |
| Save/load | Same writer receipts+XP+proof/outcome, replay/ack failure/old ID migration cases; settings namespace tách |

Đây là minimal cuts, không final feature counts/budget. Không full inventory UI/crafting/currency/rare items/full economy/đa stage/ba forms/boss. Nếu cần resource demo riêng sau approval, chỉ một bounded resource family+purpose và safe consumer, không làm gate cho combat demo.

## Gate trước implementation

- P15-U01: Model D participation/finalization/rounding/single-form fallback scope; no reserve share mặc định.
- P15-U02/U03: Test-only curve thresholds và level benefit/maxHP mapping phải được scope approval riêng; Task15 không chọn production numbers. Current Phoenix numbers không reuse làm balance Quy.
- P15-U04/U05: Mastery/evolution/foundation nếu demonstrator thực sự bao gồm; single Quy có thể defer floor/multiform/multiple stage, không fake tests chưa support.
- P15-U06/U07: Repeatable source occurrences, unique logical keys, payload/source budgets và deterministic loot rules.
- P15-U08/U09: Inventory/retained entitlement chỉ nếu có material; writer/storage adapter/ack/backup/migration/loss budget bắt buộc cho durable progress.
- C14/V13/A08: Actual Quy movement/combat/assets/modules/plane/HP and project scope vẫn gates, Task14 design complete không có nghĩa runtime ready.

## Validation sequence sau approval

Fixture/profile/content gate → species XP/derived-level invariants → source proof/participation/grants → one meaningful combat + observation + unique completion → save/reload/retry/fault injection → feedback/browser readability. Multi-form and catch-up simulated fixtures sau khi contracts tương ứng được approve, không bắt ba runtime creatures cho first proof. Không dùng tests Phoenix hiện tại chứng minh level/loot system.

Ready để review proposal/ước lượng implementation có scope; chưa implementation-ready khi curve/rules/assets/storage chưa chốt. Không claim first playable D40 hoàn tất vì combat/progression demos có docs. Task16/full audit09–16 chỉ khi được giao.
