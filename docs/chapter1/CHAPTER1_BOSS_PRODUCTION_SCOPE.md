# Phạm vi sản xuất và khoảng cách runtime

**PROPOSED B23-P12**, dùng [C14 vertical slice](../combat/COMBAT_VERTICAL_SLICE.md), [Q18 gap review](../technical/QUY_RUNTIME_GAP_ANALYSIS.md), [H19 boss handoff](CHAPTER1_BOSS_AREA_HANDOFF.md). Không boss placeholder/AI/geometry/asset/config được tạo trong Task23.

| Tier | Gameplay/content | Art/system cần | Acceptance mục tiêu tương lai |
| --- | --- | --- | --- |
| MINIMUM COMBAT PROTOTYPE | Một anatomical blocking placeholder sau duyệt, c1_keeper_sweep-only loop observe/telegraph/attack/recover, Quy I basic/move, accepted health/outcome fixture | Debug-safe shape/anchor/telegraph có readability, existing C14 action/hit/health adapter cần triển khai; no full production sprite/phases required | Valid movement counter/recovery opening mọi approach, miss/hit/interruption no double hit, no mandatory guard/spell/side reward. Fixture health policy được nêu, không full HP approval |
| CORE CHAPTER I BOSS | Full recommended five actions/two phases, arena safe lanes/cover, optional receiver/trial contract khi approved, checkpoint/lock/retry, E04 outcome/quest/ledger | Approved identity/anatomy/clips/geometry/current/phase predicates/source outcomes/resources/health/status/lock/save policy, W07/P15 integration | Quy-only intended route tested, L16 memberships/switch/HP0/abort/reload and E04/E05 separation pass QA thực |
| LATER POLISH | Audio/FX/readability refinement, extra compatible animations và optional adaptive selection | Provenance assets/playback/device measurements, extra patterns chỉ khi baseline fair | LowFX/muted/reducedmotion/small-screen cues đủ, no boss new power/retarget unfairness |

Optional proof route dùng chung receiver/counterplay/result, không cam kết hai full questlines/ending/bosses. Có thể validate standard combat route trước source-authoring alternative, nhưng S05 boss_or_alternative remains PROPOSED chứ không silently delete. Nếu final identity khác Lam Giáp, rebind actions/anatomy/arena source refs và approve lại, không đổi canonical E04/actor/profile reward identity.

## Verified runtime gaps — đọc code/source, chưa fresh gameplay test

| Evidence hiện tại | Gap / next implementation dependency |
| --- | --- |
| GameState.setIsland tạo PlayerPhoenix/reset targets/shrine | Chưa generic actor/species/boss/quest/unique outcome adapter; không sửa/rename prototype Phượng tại Task23 |
| SkillSystem.use basic resolve ngay range/dot và projectile fire hardcoded | Chưa phased enemy/boss patterns, attack ordinals/cast snapshots/hit ledgers/guard/interrupt/scheduler/health outcome coordinator |
| geometry.canOccupy chặn deep/shallow/cliff | Chưa Quy water/arena current/clearance/turn/envelope/LOS-cover/receiver physical rules |
| Camera/WorldLayer/AssetLoader có follow+integer/render semantic tiles/decode-size checks | Primitive có thể tái dùng nhưng renderer/meta.phoenix/96rect và assets hardcoded chưa boss directions/markers/envelope/telegraph/streaming |
| UISettings localStorage và GameState.snapshot | Không durable gameplay save/lock/unique source/recipient/world adapter; no beforeunload-only guarantee |

Paths thực: [GameState](../../src/island/GameState.mjs), [SkillSystem](../../src/island/SkillSystem.mjs), [geometry](../../src/island/geometry.mjs), [Camera](../../src/island/Camera.mjs), [WorldLayer](../../src/island/WorldLayer.mjs), [AssetLoader](../../src/island/AssetLoader.mjs), [IslandScene](../../src/island/IslandScene.mjs). Existing Phoenix manifest/atlas không boss concept reference; no generic boss framework implementation từ Markdown.

## Dependencies và không tự bắt đầu nhiệm vụ khác

Cần duyệt identity/visuals trước final art, prototype anatomy/blockout có approval riêng; C14 generic action/damage, E09 status/reaction, Q18 movement/geometry/input, H19 arena blocking, L16 entry/HP/recovery/retry, W07/P15 atomic outcomes/reward/migration và source schemas. First prototype không đợi full production art nhưng phải readable stand-in/valid shapes/markers, không opaque hit placeholder khiến fairness test vô nghĩa. Production gameplay requires actual tests/asset provenance/device budgets, chưa có numbers/FPS/hardware claims.

Task24 chỉ nhận immediate E04 outcome/operation permission, E05 requirements/E06 boundary; complete ending/transition design chưa làm. Later implementation tasks nhận source contracts và [40future tests](../technical/CHAPTER1_BOSS_TEST_CASES.md), không code/AI/atlas/data production hoặc PhaseIII-wide audit tại Task23.
