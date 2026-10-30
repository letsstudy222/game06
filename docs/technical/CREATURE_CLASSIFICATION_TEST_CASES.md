# Creature classification — future QA cases

**PROPOSED K11-P12**. Đây là 20 tình huống để test sau implementation, **chưa thực thi gameplay tests**. [K11 data invariants](CREATURE_CLASSIFICATION_DATA_SPEC.md) và [E10 cases](DUAL_ELEMENT_TEST_CASES.md) giữ trace; scenario labels Normal/Legend là vocabulary so sánh, không approved production tier.

## K11-EC01 — Normal thắng traversal

| Field | Scenario |
| --- | --- |
| Preconditions | Normal/Legend chỉ hypothetical labels, challenge có movement geometry khác |
| Expected behavior | Common có niche tốt hơn trong challenge, không nerf để rarity thắng |
| Invalid states | Rarity damage/speed bonus hoặc auto vượt mọi geometry |
| Recovery approach | Review route/kit conditions, không đổi tiers vì kết quả một challenge |
| Future validation criteria | So capability/turn/landing và completion route, chưa số playtest |

## K11-EC02 — Boss discoverable nonplayable

| Field | Scenario |
| --- | --- |
| Preconditions | Encounter boss_only có observation route |
| Expected behavior | Record evidence, không player form/progression grant |
| Invalid states | Defeat tự playable/Legend |
| Recovery approach | Giữ journal/outcome, eligibility false đúng source |
| Future validation criteria | Boss completion+record một lần, no formId/saveXP mới |

## K11-EC03 — Normal dual

| Field | Scenario |
| --- | --- |
| Preconditions | Species dual stable có approvedNormal hypothetical |
| Expected behavior | Hai affiliation độc lập rarity, abilities attribution E10 |
| Invalid states | Auto Rare hoặc corrupted |
| Recovery approach | Giữ profile/rationale, validate registry khi approved |
| Future validation criteria | No rarity/element coupling hoặc damage bonus |

## K11-EC04 — Sacred riêng rarity

| Field | Scenario |
| --- | --- |
| Preconditions | Quy identity confirmed, ordinary rarity unresolved |
| Expected behavior | Sacred designation giữ, unknown rarity theo policy |
| Invalid states | Auto Legend/Rainbow hoặc life là element |
| Recovery approach | Read confirmed narrative designation, không đoán tier |
| Future validation criteria | 4Sacred/3stages unchanged, rarity no stats |

## K11-EC05 — Evolution đổi vai

| Field | Scenario |
| --- | --- |
| Preconditions | Stage mới có kit/role override được duyệt |
| Expected behavior | Effective role derived sau safe commit, same progression |
| Invalid states | Role label cấp skill/XP hoặc boss hot swap |
| Recovery approach | Pending stage benefits theo R03, last good config nếu fail |
| Future validation criteria | Stage refs/gates hợp lệ, boss snapshot giữ |

## K11-EC06 — Hai combat roles

| Field | Scenario |
| --- | --- |
| Preconditions | Species có primary/secondary tactical roles |
| Expected behavior | Hybrid biểu diễn trọng tâm một kit/budget |
| Invalid states | Hai independent stat/skill budgets |
| Recovery approach | Reject unsupported role refs; review ability evidence |
| Future validation criteria | Role primary không ảnh hưởng elemental ordering/resist |

## K11-EC07 — Không combat

| Field | Scenario |
| --- | --- |
| Preconditions | Ambient organism hoặc discoverable species không attack |
| Expected behavior | Combat role none hợp lệ, chỉ content theo scope |
| Invalid states | Ép3skills/playerXP/hitbox để catalog valid |
| Recovery approach | Bỏ combat requirements không áp dụng, không fake placeholder ability |
| Future validation criteria | Noncombat entry valid theo approved scope, no damage actions |

## K11-EC08 — Hostility tạm

| Field | Scenario |
| --- | --- |
| Preconditions | Territorial actor nhận accidental attack |
| Expected behavior | Local disposition đổi, species/rarity/records giữ |
| Invalid states | Toàn species/faction vĩnh viễn evil |
| Recovery approach | Leash/repair/expiry theo F06, alternate source nếu cần |
| Future validation criteria | Journal không mất, no mandatory kill-peaceful |

## K11-EC09 — Rare dời habitat

| Field | Scenario |
| --- | --- |
| Preconditions | Restoration thay primary location, optional chưa discovered |
| Expected behavior | Alternate habitat/special observation source có clue |
| Invalid states | Permanently unavailable collection |
| Recovery approach | Defer patch nếu coverage thiếu, prior proof giữ |
| Future validation criteria | Coverage kiểm cả undiscovered, safe route revisit |

## K11-EC10 — Unlock sớm

| Field | Scenario |
| --- | --- |
| Preconditions | Có grant form trước expected chapter |
| Expected behavior | Validate actual approved prerequisites, legitimate grant không skip story |
| Invalid states | Rarity/chapter label tự revoke XP hoặc complete chapter |
| Recovery approach | Quarantine invalid source với provenance theo policy, không wipe valid grant |
| Future validation criteria | Progression/unlock và world event authority tách |

## K11-EC11 — Outdated rarity save

| Field | Scenario |
| --- | --- |
| Preconditions | Oldsave lưu rarityId cũ |
| Expected behavior | Resolve version/approved semantic alias, level/XP giữ |
| Invalid states | Auto Rainbow→Epic hoặc record bị xóa |
| Recovery approach | Opaque preserve/backup/unclassified theo approved policy |
| Future validation criteria | Load repeat không grant lại hoặc mutate progression |

## K11-EC12 — Nonplayable thành playable

| Field | Scenario |
| --- | --- |
| Preconditions | Approved content update thêm route/assets/modules |
| Expected behavior | Discovery cũ giữ, unlock chỉ khi route satisfied+ledger commit |
| Invalid states | Mọi discovered auto form, missing animation vẫn playable runtime |
| Recovery approach | Catalog draft tới khi assets đủ, record evidence giữ |
| Future validation criteria | Một progression/grant, no repeated unlock reward |

## K11-EC13 — Thêm evolution stage

| Field | Scenario |
| --- | --- |
| Preconditions | Existing species có stage mới được duyệt, Sacred baseline không đổi |
| Expected behavior | Thêm eligible gate/catalog version, không auto evolve |
| Invalid states | Tự thêm stage4Sacred/đổi rarity hoặc mất XP |
| Recovery approach | Migration refs/backup; pending/safe commit khi đủ proof |
| Future validation criteria | Old stage/loadout valid, new gate acyclic và assets ready |

## K11-EC14 — Optional environment ability

| Field | Scenario |
| --- | --- |
| Preconditions | Side route cần optional capability |
| Expected behavior | Main route/return vẫn accessible, rõ optional |
| Invalid states | Hidden must-have optional species cho main |
| Recovery approach | Alternate route/checkpoint, không equip bypass boss lock |
| Future validation criteria | Dependency graph không thêm optional vào main |

## K11-EC15 — Missing production art

| Field | Scenario |
| --- | --- |
| Preconditions | Concept approved reference có nhưng clips/anchors chưa đủ |
| Expected behavior | Draft/gap rõ, không invisible body/action grant |
| Invalid states | Concept sheet=validated atlas hoặc fallback idle giả |
| Recovery approach | Giữ record/last supported playable config, chặn new content runtime-ready |
| Future validation criteria | Actual asset refs/markers test sau, no false paths |

## K11-EC16 — No assigned rarity

| Field | Scenario |
| --- | --- |
| Preconditions | Draft hoặc ambient scope thiếu rarityRef |
| Expected behavior | Explicit unknown/not_applicable policy theo domain |
| Invalid states | Assume Normal/Legend theo filename hoặc crash collection |
| Recovery approach | Giữ entry evidence, no stats change, production require approved applicability policy |
| Future validation criteria | Unknown khác low tier; valid scope hoặc readiness blocker rõ |

## K11-EC17 — New rarity proposal

| Field | Scenario |
| --- | --- |
| Preconditions | Future expansion đề xuất nhãn mới |
| Expected behavior | PROPOSED cho tới approval/criteria/migration/presentation review |
| Invalid states | Auto stronger tier và apply old roster |
| Recovery approach | Isolate draft/legacy metadata, old approved registry unaffected |
| Future validation criteria | No unknown tier executable modifier, source approval trace |

## K11-EC18 — Rarity đổi level giữ

| Field | Scenario |
| --- | --- |
| Preconditions | Approved metadata reclassification species |
| Expected behavior | XP/level/stage/skills không đổi, rationale version update |
| Invalid states | Reset XP/HP, duplicate collection reward |
| Recovery approach | Catalog projection refresh; preserve progression/grant ledger |
| Future validation criteria | Before/after progress same, display metadata only |

## K11-EC19 — Boss ít hơn3forms

| Field | Scenario |
| --- | --- |
| Preconditions | Player có1/2main available forms phù hợp |
| Expected behavior | D41 no count rejection, membership lock/switchwithin, trigger/caps còn cần duyệt |
| Invalid states | Require full3/Legend/dual hoặc free equip giữa boss |
| Recovery approach | Safe checkpoint/retry theo approved policy, chưa tự chọn A08-05 |
| Future validation criteria | Route review cho main caps; entry/snapshot/retry approval là implementation gate |

## K11-EC20 — Element update

| Field | Scenario |
| --- | --- |
| Preconditions | Future approved identity exception/content migration |
| Expected behavior | E09/E10 versioned profile/stage/proof và catalog mapping giữ species continuity |
| Invalid states | Rarity đổi theo type, XP wipe/hot swap boss hoặc seventh element implicit |
| Recovery approach | Preserve old refs/backup, unknown quarantine, safe validated recovery |
| Future validation criteria | 6baseline preserved trừ explicit laterapproval, no duplicate form/XP |
