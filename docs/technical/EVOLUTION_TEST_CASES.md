# Evolution future QA scenarios

**PROPOSED V13-P13**.22ca dưới là acceptance plan cho task implementation sau, **chưa thực thi runtime tests**. [Data](EVOLUTION_DATA_SPEC.md), [state flow](EVOLUTION_STATE_MACHINE.md) và [decisions](../evolution/TASK13_DECISIONS.md) giữ trace. Không có số threshold/EXP hoặc balance test giả.

## V13-EC01 — Đủ điều kiện trong combat

| Field | Scenario |
| --- | --- |
| Preconditions | Proof/XP cho target đã hoàn tất giữa trận thường |
| Expected outcome | Ghi facts hợp lệ; eligibility đạt, chưa thay body/stage; chỉ thực hiện khi safe explicit |
| Invalid states | Auto evolve giữa hit, refill HP/cooldown hoặc mất XP khi hoãn |
| Recovery behavior | Giữ committed stage và proofs, chờ safe boundary; precommit intent có thể hủy |
| Future test requirements | Future combat/revision tests: one target, no body swap/reward trước commit |

## V13-EC02 — Eligibility trong boss

| Field | Scenario |
| --- | --- |
| Preconditions | Một/two forms đang selected và membership locked, target đủ proof |
| Expected outcome | Theo recommendation chỉ pending eligibility, không execute evolution cho active/reserve/unequipped trong attempt |
| Invalid states | Đổi stage/config frozen hoặc thêm member khi boss còn active |
| Recovery behavior | Giữ locked policy; sau attempt/recovery theo approved R03 contract mới re-evaluate |
| Future test requirements | Verify no new snapshot stats/skills trong attempt, no-three barrier vẫn không có |

## V13-EC03 — Active đổi giữa transition

| Field | Scenario |
| --- | --- |
| Preconditions | Intent đã gắn subjectFormId, có switch request |
| Expected outcome | Defer/reject cạnh tranh hoặc cancel precommit rồi switch theo policy; subject grant không đổi |
| Invalid states | Trao stage cho active mới, hai body/transaction cùng commit |
| Recovery behavior | Arbiter/revision revalidate; precommit giữ source, postcommit dựng outcome đúng subject |
| Future test requirements | Race input/reload tests cho fixed subject, same HP/XP/ledger |

## V13-EC04 — Reload giữa animation

| Field | Scenario |
| --- | --- |
| Preconditions | EVOLVING có/không commit receipt durable |
| Expected outcome | Precommit trở last good stage với facts; postcommit giữ target, không lặp effects |
| Invalid states | Animation finish grant lại, rollback XP đã durable hoặc free cleanse |
| Recovery behavior | Resolve receipt/intent trước trình bày, replay/skip cosmetics không replay payload |
| Future test requirements | Reload trước/sau marker nhiều lần, one logical unlock và unchanged committed progress |

## V13-EC05 — Mất kết nối lúc save

| Field | Scenario |
| --- | --- |
| Preconditions | Writer đang chờ storage acknowledgement |
| Expected outcome | Đọc ack/generation chứ không networkflag: chưa ack không báo completed, đã ack dựng result |
| Invalid states | Giả mất mạng=local save fail, reward phát trước durability hoặc ghi đè last good |
| Recovery behavior | Giữ backup/valid generation và intent; error UX/storage policy cần duyệt |
| Future test requirements | Simulate quota/denied/disconnect/suspend riêng, no false durable success |

## V13-EC06 — Vật liệu đã tiêu

| Field | Scenario |
| --- | --- |
| Preconditions | Optional approved requirement phân biệt proof/possession/spend; item đã dùng trước |
| Expected outcome | Predicate đúng semantics: prior proof chỉ đủ khi khai báo; spend cần nguồn hiện tại và atomic reservation |
| Invalid states | Đếm spent item như inventory, charge/refund hai lần hoặc softlock main route |
| Recovery behavior | Reject invalid spend; deterministic replacement/alternative phải approved, existing proof giữ |
| Future test requirements | Reserve/cancel/retry/quest-priorproof tests, one consumer ledger nếu system tồn tại |

## V13-EC07 — Đạt level thiếu memory

| Field | Scenario |
| --- | --- |
| Preconditions | Có level theo approved rule, required fragment chưa có |
| Expected outcome | Requirement partial, giữ XP, nêu clue/đường tìm; không auto waive memory |
| Invalid states | Xóa XP hoặc bắt tìm tất cả optional lore |
| Recovery behavior | Đi theo authored source/alternative; revisit có coverage |
| Future test requirements | Future predicate/hint/coverage tests, no grant trước required proof |

## V13-EC08 — Memory trước level

| Field | Scenario |
| --- | --- |
| Preconditions | Fragment proof đã commit, level chưa đủ |
| Expected outcome | Giữ fragment/source, đủ level sau dùng lại proof không tìm lại |
| Invalid states | Bỏ memory khi stage chưa mở hoặc replay thưởng fragment |
| Recovery behavior | Re-evaluate requirement refs từ record, no duplicate memory grant |
| Future test requirements | Reverse event ordering cho cùng kết quả eligibility, XP không auto cấp từ memory |

## V13-EC09 — Update thêm stage

| Field | Scenario |
| --- | --- |
| Preconditions | Catalog thêm target mới được approved; old save có stage trước |
| Expected outcome | Old progression/skills/receipts giữ, target mới chỉ eligible theo rule và assets |
| Invalid states | Auto evolve mọi save hoặc thêm stage4Sacred không approval |
| Recovery behavior | Versioned catalog/migration backup, pending gap nếu chưa hỗ trợ |
| Future test requirements | Migration old/new repeated, old routes/skills viable, no reward version bump |

## V13-EC10 — Old stage ID

| Field | Scenario |
| --- | --- |
| Preconditions | Save chứa stage alias cũ cùng lineage |
| Expected outcome | Resolve explicit alias, giữ grant identity/XP/skills/config proof |
| Invalid states | Unknown default về stage I hoặc alias tạo hai stages/forms |
| Recovery behavior | Preserve opaque/backup nếu mapping thiếu; validated safe recovery không erase owned stage |
| Future test requirements | Alias acyclic/idempotent, logical grant key same qua rename |

## V13-EC11 — Visual dimensions đổi

| Field | Scenario |
| --- | --- |
| Preconditions | Target có cánh/gạc/đuôi/mai lớn hơn |
| Expected outcome | Revalidate envelope/anchors/geometry/camera/return trước active commit |
| Invalid states | Sprite bounds=allcollision tự động, crop chi hoặc teleport qua tường |
| Recovery behavior | Giữ pending tại last supported stage trước commit; approved posture/route nếu có |
| Future test requirements | Future direction/turn/hit/camera and frame bounds tests, no invisible limbs |

## V13-EC12 — Đi vào lối hẹp

| Field | Scenario |
| --- | --- |
| Preconditions | Owned evolved stage tới doorway không đủ clearance |
| Expected outcome | Authored compatible posture/alternative/safe return; không ép downgrade |
| Invalid states | Kẹt sau irreversible commit hoặc thu sprite tùy cửa không anatomy |
| Recovery behavior | Content gate trước release; safe checkpoint/recovery theo approved policy |
| Future test requirements | Sweep visible body cả turn, necessary old routes/collection accessible |

## V13-EC13 — Thiếu animation stage

| Field | Scenario |
| --- | --- |
| Preconditions | Target written design có gaps/required clip chưa có |
| Expected outcome | Target not runtime-ready, giữ proof/XP và available old stage |
| Invalid states | Concept sheet=validated atlas, invisible target hoặc idle fallback chưa duyệt |
| Recovery behavior | Hoãn execution, ghi gap; fallback chỉ sau compatibility approval |
| Future test requirements | Actual refs/directions/markers/alpha/playback evidence cần có trước ready |

## V13-EC14 — Skill rename

| Field | Scenario |
| --- | --- |
| Preconditions | Existing unlocked skill/cooldown được catalog đổi ID |
| Expected outcome | Approved skill alias/successor mapping giữ unlock/mastery/cooldown nghĩa vụ |
| Invalid states | Mất skill hoặc old+new thành hai lần dùng miễn phí |
| Recovery behavior | Versioned mapping/backup, unknown records preserved, no auto refund |
| Future test requirements | Repeat migration cho same action identity, old utility vẫn làm receiver |

## V13-EC15 — Evolve form unequipped

| Field | Scenario |
| --- | --- |
| Preconditions | Form đã unlocked đủ proof, ngoài combat và safe context |
| Expected outcome | Có thể explicit evolve qua same progression không thêm slot/body; equip sau validate |
| Invalid states | Spawn reserve body, ép equip thứ tư hoặc grant XP cho active khác |
| Recovery behavior | Fixed subject intent; future equip checks geometry và requirements |
| Future test requirements | Verify selected membership unchanged, progression target only, no extra active body |

## V13-EC16 — Hai conditions cùng tick

| Field | Scenario |
| --- | --- |
| Preconditions | Hai source events có stable IDs hoàn requirements |
| Expected outcome | Owner facts commit/merge theo revision, eligibility derive một lần |
| Invalid states | Hai pending intents/unlock grants hoặc last-callback-wins mất proof |
| Recovery behavior | Re-evaluate snapshot sau writer conflict, reuse semantic operation key |
| Future test requirements | Permutation/replay events dẫn cùng facts và one completion |

## V13-EC17 — Duplicate evolution reward

| Field | Scenario |
| --- | --- |
| Preconditions | Same operation/grant callback hoặc reload lặp |
| Expected outcome | Ledger/receipt xác nhận đã commit, không apply payload/spend lần hai |
| Invalid states | ContentVersion đổi thành new reward key hoặc completed marker xa payload |
| Recovery behavior | Same key same payload no-op; conflict payload quarantine/review |
| Future test requirements | Repeat request/load before/after ack, XP/skills/materials một kết quả |

## V13-EC18 — Dual expression tăng

| Field | Scenario |
| --- | --- |
| Preconditions | Stable dual profile same two memberships, stage phát triển cơ quan secondary |
| Expected outcome | Stronger expression qua anatomy/skill refs, affiliation không tự đổi; single skill attribution E09 giữ |
| Invalid states | Free reaction/kháng kép/hệ thứ ba/Earth hoặc automatic assimilation |
| Recovery behavior | Validate E10 profile rule/version; exception thay identity cần approval riêng |
| Future test requirements | Profile/resistance/skill snapshots typed refs, unchanged element set khi expression-only |

## V13-EC19 — Boss đổi phase

| Field | Scenario |
| --- | --- |
| Preconditions | Encounter có phase2 visual/AI khác, không approved biological evolution rule |
| Expected outcome | Chỉ encounter phase/outcome, species/progression/stage grants không đổi |
| Invalid states | Boss phase tự player evolution/unlock/rarity hoặc XP bar mới |
| Recovery behavior | Encounter state owner giữ, catalog classification tách |
| Future test requirements | Future actor/phase tests không mutation player progression hay global species identity |

## V13-EC20 — Wildlife thành playable

| Field | Scenario |
| --- | --- |
| Preconditions | Content update approved eligibility, source/controller/assets/route mới |
| Expected outcome | Giữ discovery/memory; unlock qua R03 grant, stage I gắn acquisition receipt |
| Invalid states | Mọi discovered tự max stage hoặc ephemeral actor stats thành playerXP |
| Recovery behavior | Draft tới đủ content readiness, recognize old proofs chỉ theo approved route |
| Future test requirements | Old save records giữ, one form/grant, không ép nonplayable có evolution track |

## V13-EC21 — Ít hơn ba species

| Field | Scenario |
| --- | --- |
| Preconditions | Người chơi có một/hai main forms phù hợp, còn slots empty |
| Expected outcome | D41 không count barrier; evolution cùng lineage không đổi membership, entry details vẫn pending |
| Invalid states | Yêu cầu3forms/3elements/dual hoặc evolution thành form duplicate để lấp slot |
| Recovery behavior | Chỉ main capabilities và safe-route checks theo approved encounter; không tự cấp species |
| Future test requirements | Future entry/transition tests với empty slots, boss membership lock/switchwithin preserved |

## V13-EC22 — Giữ utility cũ

| Field | Scenario |
| --- | --- |
| Preconditions | Quest/route cần environment ability đã mở ở stage trước |
| Expected outcome | Stage mới giữ capability hoặc explicit compatible successor/route được duyệt; evidence/skill unlock còn |
| Invalid states | Mất công cụ làm kẹt return/collection, bắt downgrade/farm lại trial |
| Recovery behavior | Block content-ready nếu thiếu mapping; preserve owned skills, approved alternative trước release |
| Future test requirements | Future receiver/revisit/quest-priorproof tests, same cooldown/grant identity không duplicate |
