# Elemental edge cases và acceptance scenarios

**PROPOSED E09-P11:**20 scenarios cho future validation; không automated tests đã implement, không playtest data. [Data spec](ELEMENTAL_DATA_SPEC.md) EIV01–10 và [decision register](../elements/TASK09_DECISIONS.md) giữ dependencies. Preconditions dùng hypothetical configured values, không chốt numbers.

## E09-EC01 — Hai hit cùng status

| Field | Expected contract |
| --- | --- |
| Preconditions | Hai sources cùng simulation tick vào target, cùng stackGroup |
| Expected behavior | Resolve hit IDs theo thứ tự ổn định, coalesce strongest compatible/refresh cap, không tick kép |
| Design invariant | Một group/cause không nhân budget vì callback order |
| Possible failure | Double stack/tick ngay refresh hoặc target khác theo array order |
| Recommended validation | Đảo source order, so group state/HP/proc cursor; use same configured caps |

## E09-EC02 — Status hết giữa transform

| Field | Expected contract |
| --- | --- |
| Preconditions | Combatant có burning/shared slow gần expiry; request switch hợp lệ |
| Expected behavior | Clock tick một lần, expiry đúng boundary; damage trước commit vào nguồn/sau vào target, không cả hai |
| Design invariant | Shared status không reset theo form; một damage event một recipient |
| Possible failure | Reset duration, cancel expiry hoặc damage hai bodies |
| Recommended validation | Trace precommit/commit/postcommit/expiry và pause; dựa R03 event ordering |

## E09-EC03 — Switch khi projectile đã release

| Field | Expected contract |
| --- | --- |
| Preconditions | Phượng cast release, còn TTL, chuyển sang Quy hợp lệ |
| Expected behavior | Đạn giữ creator config/hit ledger/TTL; passive active-only nguồn tắt, no copy stats mới |
| Design invariant | Source snapshot/once-only hit |
| Possible failure | Đạn biến element/nhân damage hoặc cooldown reset |
| Recommended validation | So source/target switched và unswitched snapshots, hai callback collision cùng hit |

## E09-EC04 — Reaction output gặp input khác

| Field | Expected contract |
| --- | --- |
| Preconditions | Steam/discharge output gần another compatible setup |
| Expected behavior | Output non-reactive default; input cũ consumed, không tạo graph hồi tiếp |
| Design invariant | Finite budget/acyclic eligibility |
| Possible failure | Chain exponential, output tự nạp lại charge |
| Recommended validation | Trace root tokens/ledger và graph cycle detection; không dựa particle count |

## E09-EC05 — Boss bị CC lặp

| Field | Expected contract |
| --- | --- |
| Preconditions | Hai root/disrupt sources trong cùng family window |
| Expected behavior | Response profile hạn chế repeated hold, feedback resisted rõ; damage vẫn resolve nếu hợp lệ |
| Design invariant | Không perma-lock, không blanket immunity toàn statuses |
| Possible failure | Reset recovery mỗi hit/đòi element optional để thắng |
| Recommended validation | Chạy multi-source timelines từng boss phase, verify escape/action opportunities |

## E09-EC06 — Target có nhiều resistance

| Field | Expected contract |
| --- | --- |
| Preconditions | Affinity/trait/armor cùng cause và protected sector |
| Expected behavior | Normalize cùng cause group, vulnerability không multiply mọi channel; mỗi channel đúng budget |
| Design invariant | Một nguyên nhân không tính hai lần |
| Possible failure | Affinity×trait×armor cùng cause thành invulnerable hoặc damage vô hạn |
| Recommended validation | Audit defense group IDs, split damage totals và flank/window counterplay |

## E09-EC07 — Form vào vùng bất lợi

| Field | Expected contract |
| --- | --- |
| Preconditions | Phượng trước storm hoặc Quy trước dốc khô, main capabilities đã có |
| Expected behavior | Feedback điều kiện/source/lối trú; vẫn combat phù hợp và đường hồi, không mất XP |
| Design invariant | Environmental disadvantage không progression loss/softlock |
| Possible failure | Global immunity gate/unwarned death ở exit |
| Recommended validation | Validate main-form routes/anchors/tolerance profiles và available loadout; no numeric assumptions |

## E09-EC08 — Water hit charged metal

| Field | Expected contract |
| --- | --- |
| Preconditions | Object material conductive và charged còn budget, target chưa có wet |
| Expected behavior | Water surface intent revalidate source/path, reserve tokens, discharge một lần nếu đủ; không affinity Kim requirement |
| Design invariant | Material !=element; charge hữu hạn, input ledger stable |
| Possible failure | Auto lightning mọi kim loại hoặc double direct/discharge fullbudget |
| Recommended validation | Vary insulated/uncharged/no-path cases; compare actor+object intents budgets |

## E09-EC09 — Defeat khi status còn

| Field | Expected contract |
| --- | --- |
| Preconditions | Active creator HP0/shared burn hoặc source-active regen đang tồn tại |
| Expected behavior | Kết thúc channel/buff và combat residue creator theo C04; status/HP cleanup theo R03 recovery chưa approve; world stable giữ |
| Design invariant | Không revive HP0/reserve heal/duplicate defeat hoặc reset durable world |
| Possible failure | Burn auto hồi sinh, effect source tiếp tục farm sau defeat |
| Recommended validation | Trace creator/incapacitation/attempt IDs và checkpoint transaction; no new recovery penalty |

## E09-EC10 — Effect trùng quest receiver

| Field | Expected contract |
| --- | --- |
| Preconditions | Combat heat effect chạm cơ cấu có quest/world prerequisites |
| Expected behavior | Temporary effect hoặc typed event intent; chỉ W07 validate/commit proof/reward/world patch |
| Design invariant | Attack không bypass story gate/persistent owner |
| Possible failure | Skill tick set flag/quest grant lặp |
| Recommended validation | Test pre/post-prereq and revision, duplicate notifications, collection coverage |

## E09-EC11 — Save có status ID không biết

| Field | Expected contract |
| --- | --- |
| Preconditions | Minimal obligation accepted của version cũ, definition chưa resolve |
| Expected behavior | Preserve/quarantine record, alias/migration nếu biết, restore safe boundary theo policy; không execute/auto heal |
| Design invariant | No orphan deletion/free cleanse hoặc arbitrary code |
| Possible failure | Crash/null effect hoặc mất cost đã accepted |
| Recommended validation | Test missing catalog, ambiguous aliases, backup rollback và HP/cursor consistency |

## E09-EC12 — Reaction definition đổi version

| Field | Expected contract |
| --- | --- |
| Preconditions | Cast/inputs dùng version cũ, catalog mới có output khác |
| Expected behavior | Giữ encounter/cast snapshot; migration approved ở safe boundary, key logical không mới để grant lại |
| Design invariant | Version bump không refill budgets/replay reward |
| Possible failure | Old input bị xử hai versions hoặc frozen config đổi giữa boss |
| Recommended validation | Load old/new snapshots, abort/reset policy, compare input/ledger outcome, pin content versions |

## E09-EC13 — Dual creature dùng single-element skill

| Field | Expected contract |
| --- | --- |
| Preconditions | Hypothetical dual-affiliation species, skill declared Water |
| Expected behavior | Skill own channel/tags giữ Water action; profile dual resolver để Task10, không tự bonus/primary choice |
| Design invariant | Attack affiliation khác species list; no dual math in Task09 |
| Possible failure | Nhân damage/resists hai affiliation hoặc tự unlock hybrid |
| Recommended validation | Schema interface validation: unresolved resolver blocks production-ready, draft vẫn reviewable |

## E09-EC14 — Một form trước boss đầu

| Field | Expected contract |
| --- | --- |
| Preconditions | Chỉ Quy playable/main capability, hai slots empty |
| Expected behavior | Early encounter/boss không reject chỉ vì thiếu3 member/elements; freeze selected set/empty, counterplay bằng main tools |
| Design invariant | D41/D06; không unlock optional species ngầm hoặc đổi membership trong boss |
| Possible failure | Full-three old gate gây softlock hoặc empty slot thành equip loophole |
| Recommended validation | Walk story dependency to E04, evaluate one/two/three non-distinct-element sets; no auto forms |

## E09-EC15 — Reaction ngoài camera

| Field | Expected contract |
| --- | --- |
| Preconditions | Valid local-context effect/target ngoài render view, source có warning |
| Expected behavior | Logical result deterministic theo context/budget; cull drawing không cull hit ledger; không chain sang unloaded region tự do |
| Design invariant | Render visibility không đổi authority, new hazard phải readable |
| Possible failure | Damage phụ thuộc camera hoặc offscreen storm lan vô hạn |
| Recommended validation | Compare camera positions/low-FX; bound context recipients and pre-entry warnings |

## E09-EC16 — Revisit với ability mới

| Field | Expected contract |
| --- | --- |
| Preconditions | E05 water_stable và variant current; later form unlock |
| Expected behavior | Dựng current state, new action chỉ optional receiver hợp lệ; không replay old event reward/đảo stable |
| Design invariant | Earlier regions/collection remain, abilities không rewrite milestone |
| Possible failure | Reset vùng/drops hoặc clear adapted habitat qua highrank skill |
| Recommended validation | Check current revision/quest proof/habitat alternate sources kể cả undiscovered |

## E09-EC17 — Miễn một status không miễn hit

| Field | Expected contract |
| --- | --- |
| Preconditions | Enemy chống root/disrupt, ordinary physical channel vẫn hợp lệ |
| Expected behavior | Không hold nếu profile phản kháng, damage/feedback đúng; cho counterplay angle/window |
| Design invariant | Status resistance !=all damage immunity |
| Possible failure | Hit=0 vì failed root hoặc extra damage miễn phí thay root |
| Recommended validation | Test status-only resist vs channel resist separate, protected/onContact policy |

## E09-EC18 — Hai effects sửa cùng object

| Field | Expected contract |
| --- | --- |
| Preconditions | Water/heat intents cùng expected object revision/setting |
| Expected behavior | W07 writer serialize/revalidate; conflict feedback/retry, no last-writer-wins âm thầm |
| Design invariant | One owner/property/commit, finite inputs |
| Possible failure | Patch race, double source use/reward hoặc orphan route |
| Recommended validation | Permute commands/retry IDs, confirm single committed setting/ledger and safe navigation |

## E09-EC19 — Hit trúng actor và mechanism

| Field | Expected contract |
| --- | --- |
| Preconditions | Same cast AoE/contact valid actor + interactive receiver |
| Expected behavior | Tạo typed target intents riêng với budget phân bổ; direct HP không auto quest, receiver world validation riêng |
| Design invariant | Không duplicate hit/grant/counter cả actor lẫn object cho cùng outcome |
| Possible failure | Collider hai handlers nhân damage hoặc altar bypass |
| Recommended validation | Trace target IDs/hit markers/operation/receiver refs; onContact/onDamage gates and per-target cap |

## E09-EC20 — Thêm element expansion

| Field | Expected contract |
| --- | --- |
| Preconditions | Save/catalog cũ có six baseline, expansion thêm definition mới |
| Expected behavior | Registry/module refs và migration defaults rõ, old creatures/grants giữ; không auto affinity bonuses |
| Design invariant | New content không rewrite unrelated core creature logic hoặc confirmed roster silently |
| Possible failure | Hardcoded six-index crash/unknown IDs bị xóa/old resistance đổi |
| Recommended validation | Validate registry+capability modules+save aliases+old profiles, no new confirmed element in Task09 |

## Verification boundary

Review này chỉ logic/spec. Future implementation cần unit/integration/browser tests sau khi approved subset/values/asset/profile definitions có thật; chưa có expected numeric fixture để tuyên bố balance pass. Check storage interruption, duplicated callbacks, status refresh/camera culling, low-FX readability và actual mobile hardware riêng. Không sửa baseline test assertions hoặc runtime numbers để “đạt” tài liệu.
