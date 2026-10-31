# Task13 — local consistency audit và bàn giao

Baseline `1d49708`, ngày31/10/2026 Asia/Saigon; working tree sạch trước sửa. Chỉ documentation/system design. Đây là local audit Task13, không full Tasks09–16 hoặc production freeze. **Task14 chưa bắt đầu.**

## Nguồn thực tế đã review

| Area / task | Evidence paths / sections | Kết luận dùng |
| --- | --- | --- |
| Tasks01/08 vision/decisions | [GDD](../GAME_DESIGN_DOCUMENT.md) §3.1–3.14, [PROJECT_DECISIONS](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md), [handoff](../PHASE_I_HANDOFF.md) | Source priority, first playable QuyI, PhaseI PARTIAL; D30 stage counts confirmed nhưng A08-04/05/10/11 mechanics còn mở |
| Tasks02/03 spirit/resonance | [RESONANCE_RULES](../lore/RESONANCE_RULES.md), [ANCESTRAL_MEMORY](../lore/ANCESTRAL_MEMORY.md), [progression](../gameplay/CREATURE_PROGRESSION_CONCEPT.md), [R03 data](../technical/RESONANCE_DATA_MODEL.md) | Acquisition/memory/skill/mastery/evolution khác nhau; B+C/cost/HP/recovery/catch-up chưa approval |
| Task04 Sacred | [Quy](../creatures/QUY_HAI_UYEN.md), [Phượng](../creatures/PHUONG_HOANG_NHAT_DIEM.md), [Long](../creatures/LONG_THIEN_PHONG.md), [Ly](../creatures/LY_VAN_SINH.md), [matrix](../creatures/SACRED_EVOLUTION_MATRIX.md), [art requirements](../creatures/SACRED_ART_REQUIREMENTS.md), [C04 data](../technical/CREATURE_DATA_SPEC.md) | Đủ12stageIDs và anatomy/roles; IDs/tên/gates detail vẫn PROPOSED, không renderer/runtime stage catalog đã có |
| Tasks05–07 narrative/world | GDD §3.6/3.10, [story handoff](../story/STORY_IMPLEMENTATION_HANDOFF.md), [W07 save](../technical/PERSISTENT_WORLD_DATA_SPEC.md) | Awakening sub-grant khác restoration, one writer/ledger, durable acknowledgement và migration; no optional main gate |
| Tasks09–10 elemental | [E09 data](../technical/ELEMENTAL_DATA_SPEC.md), [E09 decisions](../elements/TASK09_DECISIONS.md), [dual evolution](../elements/DUAL_ELEMENT_EVOLUTION.md), [E10 data](../technical/DUAL_ELEMENT_DATA_SPEC.md), [E10 decisions](../elements/TASK10_DECISIONS.md) | Affiliation/property/status/material riêng; fixed-affinity default và exception chỉ proposals; no Earth/Life combat family |
| Task11 classification | [K11 data](../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md), [rarity](../creatures/RARITY_SYSTEM.md), [classification overview](../creatures/CREATURE_CLASSIFICATION_OVERVIEW.md) | EvolutionLineage/CollectionEntry là views, không secondstage/XP store; rarity không power, ModelB chưa approved |
| Task12 production | [Bible](../creatures/CREATURE_DESIGN_BIBLE.md), [roster](../creatures/CREATURE_ROSTER_REGISTER.md), [animation](../art/CREATURE_ANIMATION_REQUIREMENTS.md), [decisions](../creatures/TASK12_DECISIONS.md), [asset register](../ASSET_REFERENCE_REGISTER.md) |8secondary/16ordinary và2/1stages targets, externalconcepts chưa verified; actualframes/markers/clearance khác written design |

Accessible art metadata Task13: assets/phoenix-3-v2.png1254×1254RGBA và assets/production/phoenix/atlas.png192×288RGBA; actual manifest ô96/two poses/directions/right mirror có thật. Không fresh image inspection/playback hoặc alpha/bounds certification mới trong Task13; Task12 có evidence checks riêng theo mốc. Không Quy/Long/Ly stage images nhận diện được theo source register/inventory, không claim xem prior external artwork. Phoenix reference không tự stageIII hoặc fullthree-stageanimation.

## Deliverable mapping —14 yêu cầu,13tài liệu mới và1nguồn stage tái dùng

| Requested file | Actual authoritative source |
| --- | --- |
| EVOLUTION_SYSTEM_OVERVIEW | [Overview](EVOLUTION_SYSTEM_OVERVIEW.md) |
| EVOLUTION_TRIGGER_MODELS | [Models/fairness](EVOLUTION_TRIGGER_MODELS.md) |
| SACRED_CREATURE_EVOLUTION | Mở rộng [SACRED_EVOLUTION_MATRIX](../creatures/SACRED_EVOLUTION_MATRIX.md) bằng12stage blocks ×9fields; không duplicate file |
| EVOLUTION_VISUAL_GUIDELINES | [Visual/size contract](EVOLUTION_VISUAL_GUIDELINES.md) |
| EVOLUTION_GAMEPLAY_CHANGES | [Gameplay](EVOLUTION_GAMEPLAY_CHANGES.md) |
| EVOLUTION_AND_RESONANCE | [Resonance/memory](EVOLUTION_AND_RESONANCE.md) |
| EVOLUTION_AND_LOADOUT | [Loadout/safe proposal](EVOLUTION_AND_LOADOUT.md) |
| EVOLUTION_UI_REQUIREMENTS | [Communication](EVOLUTION_UI_REQUIREMENTS.md) |
| EVOLUTION_ASSET_CONTRACT | [Asset handoff](EVOLUTION_ASSET_CONTRACT.md) |
| technical/EVOLUTION_DATA_SPEC | [Data](../technical/EVOLUTION_DATA_SPEC.md) |
| technical/EVOLUTION_STATE_MACHINE | [State/persistence](../technical/EVOLUTION_STATE_MACHINE.md) |
| technical/EVOLUTION_TEST_CASES | [22future cases](../technical/EVOLUTION_TEST_CASES.md) |
| TASK13_DECISIONS | [Decisions](TASK13_DECISIONS.md) |
| TASK13_CONSISTENCY_AUDIT | Tài liệu này |

8existing files được append: README.md; docs/GAME_DESIGN_DOCUMENT.md; docs/PROJECT_DECISIONS.md; docs/OPEN_QUESTIONS.md; docs/PHASE_I_HANDOFF.md; docs/creatures/SACRED_EVOLUTION_MATRIX.md; docs/gameplay/CREATURE_PROGRESSION_CONCEPT.md; docs/technical/CREATURE_DATA_SPEC.md. Không xóa/tạo competing stage/progression/asset register. Original bodies giữ như prefix để bảo tồn canon/proposals/history.

## Findings, risks và recommended handling

| Conflict ID | Severity | Evidence / problem | Handling / approval gate |
| --- | --- | --- | --- |
| C13-01 | HIGH | R03/C04/E10 đã khuyến nghị hoãn evolution, dễ bị repetition thành approval | V13-P06/P09 vẫn PROPOSED; safe explicit policy/HP/status/recovery cần V13-U03/04/A08 approval |
| C13-02 | HIGH | Suggested seven states bị lưu thành independently mutable flags | Derived requirements/availability/completion tách intent/receipt; existing progression/ledger owners; no completion từ animation |
| C13-03 | HIGH | Reload/tab/save interruption duplicate stage/grant hoặc mất XP | Atomic bundle/acknowledgement/semantic key, pre/postcommit recovery, backups; W07storage/error UX còn gate |
| C13-04 | HIGH | stageId quy_s1 và skillId quy_s1 có cùng string trong C04 registries | Typed references/namespace unique trong đúng registry đề xuất; không rename approved/referenced IDs hoặc auto grant skill vì string trùng |
| C13-05 | HIGH | Stage0/previous-body requirement tạo bootstrap cycle | Stage I acquisition reuse S05sub-grant, no form trướcQuy, no evolution doublegrant; stageII/III graph riêng |
| C13-06 | HIGH | C04-P07 specific collision/Long body solution chưa approved | Footprint/visual/hurt/attack/anchor/camera/clearance contracts là requirements/proposals; cần actualprototype/module/assets |
| C13-07 | HIGH | Evolved form mất old utility hoặc không qua returnroute | Capability/skill successor mapping, compatible posture/alternative/coverage trước release; no forced downgrade |
| C13-08 | HIGH | Missing required clips/currentPhoenix atlas bị coi đủ stageart | Same asset register/gaps, no invisible/idle fallback chưa approved; stage target notruntime-ready |
| C13-09 | MEDIUM | Stronger secondary expression bị coi automatic dual affiliation mới hoặc assimilation=evolution | E09/E10 refs và separate F06 stability, identity exception approval riêng; no Earth/Life ordinary element |
| C13-10 | HIGH | A08-05 early-entry còn mở dễ làm D41 no-three bị đảo | Countbarrier đã giải; trigger/capability/snapshot/retry giữ pending, evolution không lấpslot fake |
| C13-11 | MEDIUM | Thêm stage/rename skill/catversion làm resetXP hoặc grantagain | Stable IDs/aliases, same form, receipt identity giữ qua version, legacy migration no reward replay |
| C13-12 | MEDIUM | Hybrid thành level+allmemory+materials+mastery grind mọi loài | ModelD chọn subset/alternatives có author, thresholds Task15; không currency/material quota mới |
| C13-13 | LOW | Historical handoff nói Task13 chưa bắt đầu | Append current Task13 entrypoints, giữ snapshots theo mốc; không sửa lịch sử thành approval |

Không phát hiện confirmed-vs-confirmed conflict mới cần rewrite major canon trong scope này. Những điểm trên là risks/ambiguities cần contracts/approval, không khẳng định future runtime bug đã xảy ra. D18/D38 provenance, C04-P07 proposal status và chronology Q02/A08-15 giữ nguyên. Không full audit09–16, PhaseI vẫnPARTIAL.

## 15 local gates — document review, không gameplay PASS

| Gate | Evidence / document result |
| --- | --- |
| 1 Sacred4×3 | Same source IDs/counts, không stageIV mới |
| 2 All12stage descriptions |12supplemental blocks gồm purpose/anatomy/silhouette/move/combat/env/memory/production/risk |
| 3 Evolution khác leveling/mastery/temp | Overview seven concepts/fourprogression axes |
| 4 Anatomy chứ không cosmetic only | Species source + visual rubric, không cứng minimumchange count |
| 5 Approved identities giữ | Original4species files/art untouched, Phoenix palette vàLong elongated từstageI |
| 6 Element canon unchanged | Sixregistry giữ, Lifeauthority riêng, E10exceptions pending |
| 7 Threeform compatible | SameformId/currentstage derived, no slot4 hoặc duplicate stageforms |
| 8 Boss restriction preserved | D06 membership lock/switchwithin; execution/freeze policies PROPOSED, no hot swap |
| 9 Missingart honest | Same AG gaps/register, metadata access không fullplaybackcertification |
| 10 Progress/skills survive | Existingowner/atomic receipts/inherited capability/mapping giữ |
| 11 Migration concerns | Alias/orphan/backup/version/unknown rules; no defaultstageI hoặc rewardversionkey |
| 12 Early fewer3forms | D41 no countbarrier, entry details A08-05 vẫn requiredapproval |
| 13 Extensibility |8conceptual entities, profile/module refs, newmechanics có modulework |
| 14 Thresholds unapproved | ExactXP/levels/mastery/caps đểTask15; ModelD là recommendation |
| 15 Docs-only | Diff/status validation trướccommit, không code/UI/maps/art/manifestchanges |

## Readiness và Task14 boundary

Tài liệu đủ để review/nhận Task14 khi được giao, không tự bắt đầu. Evolution implementation **CONDITIONAL** vào approved ModelD/subset/policy/R03HP-status-resource mappings/W07writer+migration và actualstageassets/geometry; targetstages thiếu requiredassets **BLOCKED cho runtime-ready content**, không mất ownedprogression. FirstplayableQuyI có thể ưu tiên acquisition/basic/save và dùng stageI, không đợi allstages/species/fullboss. Need actual technical audit trướcadapter/modulecode, prototype/playback/reload/collection/return tests sau implementation. Exact curves/thresholds vẫn Task15 scope, không dùng doc hoàn thành làm balance ready.

## Kết quả validation thực sự đã chạy

`/tmp/validate_task13.py` thành công: 1.284 relative file links resolve; 13 tài liệu mới +8tài liệu hiện hữu được append đều Markdown; bảng/fences hợp lệ;12stage blocks mỗi9fields;8entities mỗi6fields;22future cases mỗi5fields. ExistingIDs và thứ tự I→II→III của bốn lineage giữ nguyên, không stageIV; original bodies của8existing files giữ nguyên như prefix. Bốn species profiles, rarity source, asset register, six-element definitions, status/reaction, E10 evolution và story/world dependency sources byte-identical với baseline1d49708. `git diff --check` thành công.

Read-only PNG/manifest access kiểm kích thước và RGBA của hai tệp Phoenix hiện hữu, không render, generate hoặc write ảnh. Không fresh playback, gameplay/state-machine/save/migration tests;22ca là kế hoạch tương lai, không kết quả runtime PASS. Diff chỉ README/docs Markdown, không code/UI/maps/animation/sprite/manifest/config thay đổi; gate15 đạt về phạm vi file. Không full phase audit09–16 và Task14 chưa bắt đầu.
