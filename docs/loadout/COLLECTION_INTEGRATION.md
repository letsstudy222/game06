# Collection, resonance và new species

CONFIRMED D02/D07/D39 và Task16§18: discovery khác playable unlock, collection độc lập equipped membership. **PROPOSED L16-P11** dùng [R03 resonance](../lore/RESONANCE_RULES.md), [P15 records](../technical/PROGRESSION_DATA_SPEC.md) và [W07 writer](../world/WORLD_STATE_TRANSITIONS.md), không collection store mới.

| Event/context | Collection/progression | Loadout/active effect |
| --- | --- | --- |
| Discover/observe species | ResonanceRecord facts, memory nếu source cho; không auto playable | Không tạo formId/progression/member khi nonplayable |
| Establish resonance | Validate viable source/compatibility/source grant; RESONATED receipt | Designated playable mới eligible mở form, không auto equip |
| Playable unlock outside combat | Same stable species/form record, grant once, initialize approved base/catch-up eligibility P15 | Add collection only; người chơi chọn equip safe, occupied slot không overwrite |
| Unlock khi đã dùng form khác | Source organism khác player body; không spawn clone | Active/current position/status/CD giữ |
| Unlock ordinary combat | Record valid proof/grant atomically, pending benefits/readiness | No add mid-combat theo edit restriction proposal; notify an toàn |
| Unlock boss active/resolving | Collection receipts/XP/proof giữ theo source policy; frozen config unaffected | Frozen membership kể cả empty không được lấp; new form không emergency rescue của attempt đó |
| Return safe area | Re-evaluate eligibility/assets/catch-up/boundary | Có thể manual equip/replace theo management, no auto selecting newest/highest rarity |
| Unlock bootstrap Quy | Story exception R03 không cần previous active, source event+progression+placement cùng tx | Initial active binding chỉ theo explicit bootstrap operation, không ordinary unlock side effect |

`PlayerCreatureCollection` technical entity là **read model/aggregate references** từ ResonanceRecord/progression/memory, không second independently mutable unlocked-species list. Many collected forms, only ba member positions; UI browse không attach body hoặc reset config. Repeated resonance/another individual same species updates facts/source refs nhưng không new XP/HP record.

Temporarily unavailable giữ ownership/history/skills; show reason vs locked/unknown/content unsupported khác nhau. Same source alias/grant key ngăn duplicate unlock từ migration/new table version. Species added later không auto unlock, default undiscovered/eligible catalog status; first playable activation yêu cầu curve/skills/movement/geometry/assets/receiver/caps resolve. Nonplayable ecosystem record vẫn có value không false disabled equip button.

New species + full loadout không tạo slot4 hoặc replace reserve; selection workflow ngoài lock. No optional species main gate để lấp empty, rarity/dual không guarantee eligibility/power. Catch-up floor proposal có thể xét ở safe boundary sau unlock, không auto highest level/mastery/stage hoặc free heal. Valid ecology acquisition routes/return coverage phải giữ qua W07 habitat changes; không tự tiết lộ spirit origin/manifestation lore.
