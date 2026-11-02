# Objective taxonomy và hợp đồng completion

**PROPOSED Q21-P02/P04**, không objective runtime code. [W07 quest rules](../world/QUEST_WORLD_STATE_RULES.md) giữ prior-proof/acceptance/owner; [S05](../story/STORY_IMPLEMENTATION_HANDOFF.md) giữ event semantics. Evidence phải chứa source/target/context/revision phù hợp predicate, không text “đã xong”. Numeric tolerances/encounter profiles chưa approved thì production validation FAIL/pending, không fallback tùy tiện.

## Taxonomy tái dùng

| Type | Event source / eligibility | Completion predicate | Persistence / duplicate | Progress feedback tiếng Việt |
| --- | --- | --- | --- | --- |
| REACH_LOCATION | Accepted traversal/placement, destination layer/capability/route valid | Actor đặt ở anchor/area hợp lệ sau transaction, không camera thấy nơi đến | Placement/evidence đúng owner, repeat same target không reward; arrival milestone riêng | “Đã tới nơi trú.” |
| INTERACT_OBJECT | Receiver command đúng object/source/caps/expected revision | Receiver accepted kết quả/setting hoặc proof được definition yêu cầu, không button press | Local/event owner, idempotent op/source key; toggle không complete unique lần hai | “Cơ cấu đã đáp lại.” |
| OBSERVE_CREATURE | Approved observation source và behavior/context đủ, scope journal rõ | Ghi behavioral evidence theo author rule, không chạm/kill/proximity alone | Journal/evidence owner, same source/objective dedupe, no auto form | “Đã ghi nhận nhịp sống.” |
| COMPLETE_RESONANCE | R03 viable source/compatibility/catalog playable và placement hợp lệ | form_committed durable + unlock/placement receipt đúng source | R03/W07/RewardGrantLedger, E01 sub-grant khác parent; no callback mint | “Cơ thể đầu tiên đã thức.” |
| RECOVER_MEMORY | R03 source/memory chapter gate/provenance hợp lệ | MemoryRecord/evidence và required receipt committed, presentation cursor không authority | Existing memory owner, replay không reward/skill tự động | “Đã ghi một mảnh ký ức.” |
| CHANGE_ENVIRONMENT | Authorized receiver/source/context/route/habitat permission | Owned setting/patch/outcome đúng target, collision/nav/habitat cùng candidate revision | W07 single writer, repeated source returns result hoặc explicit new mutable op, no story regrant | “Lối nước đã đổi.” |
| SURVIVE_ENCOUNTER | Accepted eligible encounter attempt và required objectives | Accepted resolve/escape-to-refuge proof theo profile, không timer đứng yên hoặc farm kill count | Encounter/quest proof, reward occurrence/unique policy; animation/hp alone không đủ | “Đã vượt qua vùng giữ lãnh thổ.” |
| DEFEAT_BOSS | Đúng encounter/attempt qualifying combat outcome | Coordinator accepted victory/disposition proof của encounter, không chỉ boss HP0 hoặc kill animation | E04/outcome/ledger theo owner atomic, no extra quest first-clear | “Thử tải không còn bị ngăn.” |
| RETURN_TO_AREA | Access sau state change, route valid và actor trở lại area | Verify current required property/refuge/source tại target/revision, không entry trigger alone | Quest evidence owner; completed state/proof cũ eligible có thể công nhận, no reset damage | “Nơi trú vẫn tiếp cận được.” |
| RESOLVE_CONFLICT | Extension đề xuất cho S05 boss_or_alternative, authorized nonlethal outcome profile | Threat stopped + safe operation permission + required refuge constraints, không dialogue skip auto win | Cùng E04 source/completion, không event/reward mới cho nhánh khác | “Có thể thử mở dòng an toàn.” |

DEFEAT_BOSS không bắt giết trong mọi E04 path; alternative RESOLVE_CONFLICT chỉ khả dụng khi Task23 author/duyệt qualifying outcome. Không Task21 tự viết moveset/nonlethal solution. Reach/observe không suy raw actor ID thành approved species record, không generic decor giả journal discovery.

## Objective decomposition / stable draft refs

`opening_b01…opening_b10` là mười refs Task17 sẵn có, dấu … chỉ nhóm biểu diễn không phải ID mới. `mq_NN_obj_*` bên dưới là local objective IDs mới **PROPOSED**, không evt_* hoặc registry độc lập. S05 event definition binding phải pin chúng trước implementation. AllOf mandatory proof groups chỉ gồm dòng Main; Optional/presentation không gate.

| Objective ref / quest / role | Source + eligibility | Completion evidence | Persistence / duplicate / retry |
| --- | --- | --- | --- |
| opening_b01…opening_b10 / mq_01 / Main, b09 optional | Task17 exact ten beats/D29, CAP_BOOTSTRAP trước thân | Các sub-boundaries memory→form_committed→practice_complete theo Task17; không parent từ form alone | Existing E01/R03 evidence/receipts/exit patch, ngắt theo before/after commit, no renamed objective set |
| mq_02_obj_observe / Main | E02 approved behavior source ở B, accessible bằng Quy I | Observed behavior/source context được author và accepted journal evidence | Existing journal/evidence, source moved dùng viable equivalent được author, repeated observe không reward |
| mq_02_obj_coexist / Main | B stable foreign habitat clue CL03, không đòi optional species unlock | Environmental/behavior evidence cho thấy foreign trace không đồng nghĩa damage/hostility | Evidence/provenance giữ, uncertainty không giải chronology; không spawn unapproved dual species để tick |
| mq_02_obj_journal / Main | Sau có observation hoặc eligible prior proof, npc_record_keeper interaction nếu source author | Ghi proof/tri thức đã thấy, không full collection unlock hoặc speech callback | Quest/journal owner, UI disabled vẫn source command có binding khác approved, missing actor fallback có rule hoặc pending |
| mq_02_obj_refuge / Main | Accepted E02 territorial profile có warning/basic/defense lesson phù hợp | Resolve/escape accepted và đặt về refuge an toàn, no kill quota | Encounter proof + placement, retry theo reset policy; no alias từ elapsed animation |
| mq_03_obj_routes / Main | E03 khảo cứu C/E, CL01/02 receiver source trước eg | Đọc cấp/hồi/vết sửa và corroborate CL03 prior proof; source facts đủ context | Durable evidence đọc được sau accept, không phải xem hỏng lại nếu trước đó đã sửa |
| mq_03_obj_bypass / Main | Receiver phụ E, I tools/source/outlet viable | Test setting/bypass hoạt động và refuge giữ; preflight route/coverage success | Existing W07 owned patch/proof, failed test giữ safe old setting, repeat source no grant |
| mq_03_obj_memory / Payload/presentation | mem_quy_current theo E03 source payload/chapter gate | Memory component ghi theo R03 khi source/event contract đủ; xem phim dài/extra lore không bắt | Existing memory/ledger mapping, không thêm must-collect fragment hoặc prerequisite all memories; source payload không cấp lại |
| mq_04_obj_entry / Attempt boundary | E03 complete, prep/one-Quy caps/placement/profile valid | Entry accepted + attempt/membership boundary theo L16; không event E04 complete | Attempt receipt, retry attempt mới không reward source mới, no permanently saved bossEntered flag |
| mq_04_obj_conflict / Main | Authorized E04 qualifying combat hoặc alternative outcome | Threat stopped + keeper operation permission + refuge constraint accepted → E04 candidate | E04/outcome/actor/ledger same unit; failed/abort retry giữ prior earned facts |
| mq_05_obj_flow / Main | E04 permission và E03 bypass, receiver G đúng nguồn | Cấp/hồi/outlet setting hợp lệ, force/pressure eligibility đã author | Local/region properties đúng owner; change không tự E05 completion |
| mq_05_obj_sanctuary / Main | Route G/E/C/B/A valid hoặc eb, current candidate revision | Verify sanctuary source/refuge access còn, accepted proof thuộc candidate/owner revision | Revalidate stale proof nếu setting đổi, không global sanctuaryChecked bool |
| mq_05_obj_reef / Main | B refuge/habitat/source coverage valid | Verify rạn và applicable species sources/secondary habitat còn accessible | Wildlife refs chưa official là content gate, no coverage fake bằng discovered=true; knowledge cũ giữ |
| mq_05_obj_confirm / Main | All mandatory E05 proofs và safe placement đã validate | Explicit confirm → E05 atomic completion/patch/routes/ecology/grants | Durable failure giữ E04/last-good, retry same source; notification không commit |
| mq_06_obj_route / Main | E05 complete, gi/I available | Traversal giảm độ sâu theo authored connectors và refuge đến source boundary | Transition intent/eligible evidence, not arrived by camera pan; no Phượng prerequisite |
| mq_06_obj_arrival / Main | Destination N/content/geometry/return/checkpoint valid | Arrival placement + return edge + E06 completion/receipt durable cùng unit | Before commit source I, after commit N; traversal lại không R0 regrant |

Primary completion của E02/E03/E05 là AllOf các Main proof tương ứng và source preconditions, E01/E04/E06 theo boundaries đặc thù. Chỉ acceptance/UI status không làm facts. Source evidence eligible xảy ra sớm được công nhận sau prerequisite revalidation; out-of-order optional discovery không tự complete main event chưa đủ. [State model](CHAPTER1_QUEST_WORLD_STATES.md) và [data spec](../technical/CHAPTER1_QUEST_DATA_SPEC.md) tách definitions/proofs/projections.
