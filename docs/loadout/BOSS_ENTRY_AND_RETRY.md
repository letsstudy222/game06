# Entry, preparation, retry và decision record

**PROPOSED L16-P09**, early-entry package **UNRESOLVED L16-U01** cho đến scoped approval; [PROJECT_DECISIONS](../PROJECT_DECISIONS.md)/D41 giữ baseline đã có. Không tự phê duyệt bossI hoặc fabricate mandatory species. [Lock graph](BOSS_LOADOUT_LOCK.md), [HP](FORM_STATE_OWNERSHIP.md) và [W07 save](../technical/PERSISTENT_WORLD_DATA_SPEC.md) cùng source authority.

## L16-DR01 — early capacity/entry continuity

| Question / source | Status hiện tại | Cách xử lý Task16 |
| --- | --- | --- |
| Maximum ba slots, một active / D05, Task16§2 | CONFIRMED | Không collection-size=team-size hoặc fourth slot |
| R03-P06 historical đủ ba khỏe trước boss | PROPOSED theo mốc Task03, chưa từng approved | Đánh giá A dưới đây, không viết lại thành confirmed rule rồi supersede |
| No mandatory three-member/three-element early gate / D41 explicit Task09 | CONFIRMED trong repository, không có source mới thu hồi | Giữ nguyên; formal policy details khác count constraint |
| Minimum một eligible active trong normal embodied play / R03 proposal, Task16§3 | PROPOSED L16-P01/U01 | Khuyến nghị 1–3, empty reserves hợp lệ; bootstrap/recovery exceptions, không auto canon |
| Early boss entry trigger/capabilities/healthy eligibility/empty snapshot/checkpoint/retry | UNRESOLVED L16-U01/U07 | Full policy cần approval, **D41 không tự approve package** |

Task16§3 yêu cầu phân biệt early-entry UNRESOLVED và không sửa conflict thành canon; đọc ở scope detailed policy, không âm thầm hạ D41 hoặc dùng brief để đánh dấu full-three approved. Nếu owner muốn thay no-three baseline thì cần explicit decision source/new-old scope; Task16 không quyết thay. This is a continuity record for review, không yêu cầu user trả lời để làm docs.

| Design | Lợi ích | Risks / evaluation |
| --- | --- | --- |
| A require three healthy | Team mechanics/balance dễ giả định, ba options defense | Mâu thuẫn guaranteed Quy-only opening/no-three D41 nếu dùng cho early boss; ép mandatory unlock hoặc fillers, tăng effective HP và grind. Không current candidate cho boss đầu nếu chưa explicit thay D41 |
| B one-to-three eligible, empty allowed | Khớp progression có sẵn, one-form fight testable, không optional species gate | Phải author boss counterplay/capabilities với guaranteed forms, safe retry, empty snapshot. **Recommended for approval**, chưa final entry package |

Boss đầu phải có lời giải với forms main story bảo đảm; không yêu cầu đủ elements/dual/species optional. “Một form eligible” còn định nghĩa availability/HP/context/content readiness theo model cần duyệt, không chỉ number>0. Không auto approve boss identity/pattern/outcome hoặc guarantee đã playable.

## Affected-document update plan sau approval

Chỉ cập nhật phần policy đã được duyệt, giữ historical status/provenance và cross-links; không blanket rewrite các tasks.

| Actual file(s) | Phần cần đồng bộ khi U01/U07 có approval |
| --- | --- |
| docs/PROJECT_DECISIONS.md; docs/OPEN_QUESTIONS.md | A08-05/Q10 detailed entry status, giữ D41 scope/source; new decision record có exact approval |
| docs/gameplay/TRANSFORMATION_DESIGN.md; docs/lore/RESONANCE_DECISION_RECORD.md | R03-P06 snapshot/entry và P08 retry/lock; không đổi B+C/HP/cost chưa duyệt |
| docs/technical/RESONANCE_DATA_MODEL.md; docs/technical/RESONANCE_EDGE_CASES.md | I02/EC05 + lock/intent validations theo approved subset |
| docs/story/MAJOR_CONFLICTS_AND_BOSSES.md; docs/gameplay/ENCOUNTER_AND_REWARD_DESIGN.md | S05-P02/enc_chapter_confrontation early-entry/historical wording |
| docs/PHASE_I_HANDOFF.md; docs/DESIGN_CONSISTENCY_REPORT.md; docs/DESIGN_DEPENDENCY_MAP.md | C08-01/A08-05 history-vs-current dependencies, không nói count gate unresolved khi D41 đã giải phần đó |
| docs/elements/TASK09_DECISIONS.md; docs/elements/TASK10_DECISIONS.md | E09-U07/E10-U07 remaining entry triggers/snapshot/retry, không approve elemental formulas |
| docs/evolution/EVOLUTION_AND_LOADOUT.md; docs/evolution/TASK13_DECISIONS.md | V13-U09 và stage/config freeze/ref updates, no auto evolution approval |
| docs/combat/BOSS_COMBAT_FRAMEWORK.md; docs/combat/FORM_SWITCHING_COMBAT.md; docs/combat/TASK14_DECISIONS.md | C14-U07/entry/cutoff/abort policy; keep skill/HP proposals distinct |
| docs/progression/TASK15_DECISIONS.md; docs/economy/REWARD_CONSISTENCY.md | P15-U06/U09 occurrences, first-clear resolution/abort gains, no new reward budget |
| docs/loadout/BOSS_ENTRY_AND_RETRY.md; docs/loadout/BOSS_LOADOUT_LOCK.md; docs/technical/LOADOUT_STATE_MACHINE.md; docs/technical/LOADOUT_TEST_CASES.md; docs/loadout/TASK16_DECISIONS.md; docs/GAME_DESIGN_DOCUMENT.md | Adopt selected entry/retry/snapshot subset, update fixtures/invariants/status and index, retain rejected/historical variants |

Task16 hiện chỉ adds proposals/index links, **không thực hiện trước approval các rewrites ở bảng**.

## Preparation without menu friction

Đề xuất safe approach/checkpoint + clear arena cue/short confirmation lần đầu hoặc khi loadout thay, không modal mỗi bước. Cho biết active/reserves/empty/unavailable và lock nghĩa không đổi thành viên nhưng vẫn switch. Environmental challenge warning nêu capabilities/risk và đường rút, không spoil boss attacks hoặc đòi optional species. Preparation area là safe validated context có thể dùng world anchor sẵn; không tự đặt shrine/map mới. Revalidate context/placement/content/entry readiness sát commit, không transition do UI button alone.

## Retry comparison

| Model | Benefit | Risk / recommendation |
| --- | --- | --- |
| Full reset + same-team quick retry | Ít thao tác, dễ nhất quán source/ledger, không boss persistent HP | Phải revalidate team/entry/caps; **recommended default option** sau old attempt closed |
| Full reset + return preparation | Sửa loadout/đọc warning, recovery rõ | Quá nhiều menu nếu bắt mọi retry; cho option thay vì forced flow |
| Resume exact mid-fight | Giữ tiến độ/ít mất thời gian | Snapshot boss/player HP/CD/status/RNG/phase/lock atomic, cost lớn; chưa chọn, không persist boss HP một mình |

Khuyến nghị abort-and-reset continuity R03/C14: same-team quick retry là **new attempt** + new lock/snapshot sau close/reset/recovery; về preparation nếu muốn edit hoặc invalid team. Không “retry” bằng restore old boss damage rồi refill player. No exact recovery quantities/penalty/checkpoint geometry approved.

## Browser, exit và invalid recovery

Defeat→close/reset→safe placement/recovery/unlock→RETRY_PENDING. Abandon qua explicit abort intent cùng reset/close, không arena boundary teleport. Re-enter sau exit là fresh validation/attempt; đã victory durable thì world/encounter policy đọc completion, không first-clear lại. Save trong active ghi lock/intent/ack boundaries, không quyền resume tự động. Reload/browser refresh/tab close đều same load recovery; không offline ticks/refill và không trông unload để flush. Không assume mọi encounter cần persistent boss HP.

Invalid checkpoint/team: preserve immutable saved lock/frozen proof, giải abort/reset trước repair ngoài encounter; validate last-good source checkpoint/available forms/route, không substitute thành viên ngay trong active lock. Nếu không safe form/checkpoint thì diagnostic recovery/no control + preserve backup, chưa gameplay-ready; không unlock species khác/erase progression. New unlock sau defeat chỉ dùng ở preparation sau close, không đổi result của attempt trước. Storage failure không giả close/unlock durable, retry same operation.
