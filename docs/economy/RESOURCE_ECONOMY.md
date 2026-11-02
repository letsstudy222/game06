# Resource economy tối thiểu

**PROPOSED P15-P11**. Chưa currency/equipment/crafting/training system được approve; không production resource IDs/recipes/drop rates. [V13 requirements](../evolution/EVOLUTION_TRIGGER_MODELS.md), [R03 resonance](../lore/RESONANCE_DECISION_RECORD.md), [inventory](INVENTORY_REQUIREMENTS.md) giữ boundaries.

## Đánh giá categories

| Category | Narrative origin / acquisition | Purpose / consumption candidate | Inventory / scarcity / risks |
| --- | --- | --- | --- |
| Biological materials | Shed/byproducts từ ecology/source permission; không kill peaceful bắt buộc | Optional receiver repair/maintenance chỉ khi content/sink approved | Fungible resource ref, finite sourced quantity; tránh heal-self-farm, habitat depletion/unused inventory |
| Elemental materials | Local bounded source/residue sau verified event, không spell player tự sinh | Optional environment trial/receiver use; không hồi quỹ vô hạn | Small stack/category set nếu dùng, source budget; risk loop cast→loot→energy |
| Ancient memory fragments | AncestralMemoryRecord/provenance/gated discovery | Knowledge/proof đọc lại, **không tiêu như coin** | Unique fact/ref thay stack, không duplicate collection inventory |
| Resonance resources | Viable source/compatibility/trial conditions R03 | Ưu tiên prerequisite/proof, không capture currency bắt mọi loài | Không inventory hóa spirit stability; stability là combat/transform resource riêng, regen/cost chưa duyệt |
| Evolution resources | Special event/source nếu V13 requirement explicit | Possess/acquired-proof/spend-at-commit phân biệt; chưa gate mandatory | Protected/deterministic access/repair nếu required; không random rare material softlock |

## Chapter I recommendation

Bắt đầu **EXP + observation/memory/world proofs**, chưa cần generic currency hoặc loot inventory cho progression loop. Nếu cần thử vật liệu trong Chương I sau scope approval, chọn **một family elemental residue có nguồn và một optional receiver sink đã thiết kế**, không đồng thời biological/training/evolution currencies. “Một” là cách cắt prototype, không final resource quota/ID. Slice Quy tối thiểu có thể chỉ unique reward proof, không phải item.

Không emit resource khi chưa có purpose/sink/source permission/inventory policy. Các categories trên là evaluation, không tất cả sẽ được sản xuất. Memory fragments không salvage/sell; species unlock/progression không mất do spend. Không crafting tree/shops/gear affixes/repair tax/death loss tự xuất hiện. Cần currency chỉ nếu later content trade/sinks có justification và approval riêng.

## Source–sink và scarcity

ResourceDefinition đề xuất ghi sourceRef, ecological provenance, allowed sink refs, stack/capacity policy, quest protection, persistence/version và no-farm predicates. Scarcity từ finite event/source budgets và meaningful access, không rate thấp vô hạn/main gate RNG. Repeat optional sources có clear requalification, không player tự toggle/reset để mint thêm. Consumption validates reserved/unreserved balance và writes same inventory owner/receipt, không negative units hoặc refund hai lần.

Required main-path consumer phải có guaranteed access, alternative proof/repair route hoặc reservation/protection đủ tránh spend nơi khác gây softlock. Không tiêu final viable source/habitat để hoàn collection; W07 preflight return/coverage. Resource removal/update cần explicit alias/replacement/protected entitlement migration, không xóa quest resource và giữ objective impossible. Giá/quantities/stack limits/capacity/costs P15-U08 còn mở; không cân bằng đã đo.
