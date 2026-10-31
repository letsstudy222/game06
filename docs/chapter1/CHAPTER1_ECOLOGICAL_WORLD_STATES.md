# Ecology trước/sau và spawn persistence

**PROPOSED E20-P09**, theo [W07 ecology](../world/ECOLOGY_AND_SPAWN_STATES.md), [Chapter I phases](../world/CHAPTER_01_WORLD_STATES.md), [Task19 bindings](CHAPTER1_PERSISTENT_ENVIRONMENT.md), [W07 transitions](../world/WORLD_STATE_TRANSITIONS.md). Không ecology save database hoặc per-zone permanent flags mới.

| Derived phase / source | Hành vi/source trước hoặc sau | Feeding/visibility/migration/aggression | Observation/resonance / phạm vi |
| --- | --- | --- | --- |
| sea_dormant — chưa E01 form_committed | Sanctuary nhận cảm giới hạn, fauna ở túi tách, không địch tutorial | Ambient yên, nguồn/bề mặt còn sống, không toàn biển chết/tối | Chỉ Quy E01 bootstrap, không cần body trước; chưa wildlife collection overload |
| sea_disturbed — E01 form_committed, E03 chưa complete | B observation, C lane yếu; cá chép/sứa/polyp candidates khác niche | Dòng đứt chia nguồn, sứa drift refuge, polyp khép khi source yếu, territory local chứ không global hostility | Discovery giữ khi nguồn tạm unavailable; B/D secondary candidates, no compulsory resonance wildlife |
| sea_restoring — E03 complete, E05 chưa complete | Bypass E03 hoạt động, các nhánh có thể chỉnh theo owned variants, E04 outcome riêng | Fauna dùng lane/refuge tốt hơn cục bộ; sediment cue cho source đổi; predator còn, keeper disposition theo E04 | Opportunity re-evaluate sources/caps; boss reward không phase stable, không source sau F duy nhất |
| sea_stabilized — E05 complete | Cấp/hồi/refuge đã kiểm, current/collision/habitat projection cùng revision | Migration sang secondary habitat viable, nhịp ăn/neo/mở tua đổi; encounter stress có thể giảm context, không all neutral | Main/source observations tiếp cận được sau E06 return, claims/proofs giữ, F còn hazards |

Phase names là derived identifiers, không saved enum hoặc ecology authority cạnh W07. E01 form sub-grant trước parent practice; E04 conflict/outcome không grant water_stable; E05 mới restoration; E06 arrival/return edge riêng. Không tăng “population health” meter global để thay facts.

## Spawn/despawn bốn loại

| Loại | Initial spawn / distance / transition | Despawn/respawn / environment change | Lưu và safety |
| --- | --- | --- | --- |
| Ambient reusable | Recipe theo viable habitat/camera quality và local budget, không cần discovered | Cull/suspend khi xa tại logical boundary, reconstruct theo projection; không loot/completion mỗi lần spawn | Không save từng position/AI tick; có thể scenery-only, không damage/quest source ngầm |
| Observation/ordinary encounter actors | Spawn eligibility kiểm approved species/source/route/clearance; actor không nằm trong solid/receiver | Respawn/reset chỉ theo occurrence policy được duyệt, no offscreen kills/reward. Không cull source đang objective/action giữa hit | Source/encounter identity/proof/occurrence nếu cần theo owners cũ, không population breeding sim |
| Unique narrative/quest-critical | Stable instanceId/disposition/anchor refs, available theo event/outcome | Không spawn bản mới vì zone reload; relocate ở safe boundary hoặc giữ outcome resolved | Durable unique outcome/critical relocation + quest/world patch same revision; unexpected missing actor cần reconcile, không farm replacement |
| Permanently changed entity / temporary attempt actor | Changed organism/receiver đọc owned facts, encounter actor theo attempt scope | Variant không đảo story; temporary attempt reset theo approved policy, no unique reward respawn | Permanent facts/outcomes đúng owner, transient presentation/state không thành completion/ledger thứ hai |

Before habitat/current patch: validate full approved roster coverage, kể cả undiscovered; mỗi applicable observation/living resonance còn source + tolerance/food/source + route/capability guaranteed. Không có coverage thì defer/reject destructive patch hoặc author refuge trước, không fake discovered và không archive thay living source thiếu. Sáu refs chưa approved nên chưa chứng minh full coverage runtime.

Ordinary wildlife không mô phỏng persistent births/deaths/offscreen predation. Density giảm theo quality không xóa interactive source/critical cue. Actor về bounds/refuge phải bằng nav hợp lệ, không current teleport; group/collision/turn-envelope kiểm theo body plan. Khi player/actor đang cast/dialogue/transition thì queue destructive relocation/aggro presentation tới boundary an toàn theo encounter rules; không attack vô cảnh báo trong UI lock.

## Save/load, rewards và migration

W07 một writer nhận commands/expected revision; source outcome + owned patch + placement/refuge/quest proof + grant/recipient nếu có atomic rồi mới publish ecology/render/collision/nav. RewardGrantLedger giữ source-level receipt và recipient allocations, không ecological claimed store riêng. Content/schema/map/behavior version không nguồn reward mới. Repeat observation/assist/reinfect/flow toggle không farm.

Load last-good đọc facts/variants/habitat catalog, reconstruct ordinary actors và presentation, không replay action/grant. Unique outcomes/accepted harmful status obligations theo F06/E09/C14/W07, không free cleanse vì unload; transient AI cursor không resume nửa attack để hit lại. Migration habitat/zone/animation aliases giữ species/actor/object/event/grant identity và backup; unknown/ambiguous ref giữ để recovery, không silent reset hoặc auto unlock. Source một generation trước vẫn bảo toàn nếu write/quota/content fail. Adapter/retention/error UX chưa duyệt, không settings localStorage thành full save.
