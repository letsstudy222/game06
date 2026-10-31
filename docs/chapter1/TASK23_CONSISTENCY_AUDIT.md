# Local consistency audit Task23

Các content/mechanics mới vẫn **PROPOSED**; đọc code/metadata và static design checks không gameplay/balance/asset certification.

## Baseline và existing work

Repository `https://github.com/letsstudy222/game06.git`, work, HEAD `387b29d392ad78d65f14e7dc7720da0d16b1213c`, ngày31/10/2026 (Asia/Saigon). Năm PhaseII handoff commits bcdfe73/936f74f/28fed70/518f5d5/387b29d ancestor checks đạt. Before Task23 có sáu tracked files modified và101docs untracked Tasks17–22, không staged; source prerequisites đều có thật trong working tree, không claim các uncommitted docs đã lên GitHub.

Task23 thêm18docs + append bốn navigation files. Hash/prefix comparison giữ existing Task01–22 sources, S05 actor/profile/event, Q21/H19 graph, S22 optional independence và old code/assets/maps/UI/save/config. No discard/reset/merge/stage/commit/push, no PhaseIII-wide audit/Task24 auto start.

## Source evidence

| Nhóm | Real paths |
| --- | --- |
| Canon/story | [GDD](../GAME_DESIGN_DOCUMENT.md), [decisions](../PROJECT_DECISIONS.md), [questions](../OPEN_QUESTIONS.md), [Chapter I arc](../story/CHAPTER_01_QUY.md), [major boss brief](../story/MAJOR_CONFLICTS_AND_BOSSES.md), [cast](../story/MAJOR_CHARACTERS_AND_FACTIONS.md), [E04/E05](../story/STORY_IMPLEMENTATION_HANDOFF.md) |
| Main/map/ecology/side | [Q21 register](CHAPTER1_MAIN_QUEST_REGISTER.md), [boss quest handoff](CHAPTER1_QUEST_BOSS_HANDOFF.md), [H19 graph](CHAPTER1_WORLD_GRAPH.md), [boss area](CHAPTER1_BOSS_AREA_HANDOFF.md), [E20 ecology states](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), [species register](CHAPTER1_SPECIES_REGISTER.md), [S22 independence](CHAPTER1_SIDE_QUEST_ZONE_MATRIX.md) |
| Quy/combat | [Q18 combat](QUY_COMBAT_DESIGN.md), [skills](QUY_SIGNATURE_SKILLS.md), [C14 overview](../combat/COMBAT_SYSTEM_OVERVIEW.md), [enemy AI](../combat/ENEMY_AI_DESIGN.md), [boss framework](../combat/BOSS_COMBAT_FRAMEWORK.md), [hit/collision](../combat/HITBOX_AND_COLLISION.md), [HP/recovery](../combat/INCAPACITATION_AND_RECOVERY.md), [F06 archetypes](../gameplay/ENEMY_ARCHETYPES.md) |
| Element/lock/reward/world | [E09 reactions](../elements/ELEMENTAL_REACTIONS.md), [statuses](../elements/STATUS_EFFECTS.md), [E10](../elements/DUAL_ELEMENT_OVERVIEW.md), [L16 lock](../loadout/BOSS_LOADOUT_LOCK.md), [entry/retry](../loadout/BOSS_ENTRY_AND_RETRY.md), [P15 consistency](../economy/REWARD_CONSISTENCY.md), [W07 transitions](../world/WORLD_STATE_TRANSITIONS.md) |
| Actual art/runtime | [Asset register](../ASSET_REFERENCE_REGISTER.md), [manifest](../../assets/production/manifest.json), [Q18 runtime gaps](../technical/QUY_RUNTIME_GAP_ANALYSIS.md), [GameState](../../src/island/GameState.mjs), [SkillSystem](../../src/island/SkillSystem.mjs), [geometry](../../src/island/geometry.mjs), [Camera](../../src/island/Camera.mjs), [IslandScene](../../src/island/IslandScene.mjs) |

S05 đã có actor npc_tide_keeper/Người Giữ Mạch Nước, narrative profile boss_water_access và evt_04_guardian_conflict; role/outcome detail đều **PROPOSED**, brief nêu rõ chưa approve species/visual/attack. Hai candidates không overwrite identity đã confirmed. Actual production Phoenix manifest/PNG header192×288/frame96 inspected, not boss reference image; no missing concept sheet fabricated or fresh boss playback claimed.

## 18 local checks

| # | Design finding | Evidence / limit |
| --- | --- | --- |
| 1 | Đạt: narrative identity respects sources | Existing actor/profile/E04 kept, two mutually exclusive visual candidates, no evil/chronology/origin invention |
| 2 | Đạt ở spec: visually distinct Quy | Segmented crustacean/two forearms/four support legs, no turtle oval/recolor; artwork chưa có để chấm thật |
| 3 | Đạt contract coverage: Quy-only | Every five action has movement/basic response/opening, receiver contextI; physical/timing/balance still gate |
| 4 | Đạt: no full3 | One/two/three slots supported conceptually, no optional rare/dual/side power requirement |
| 5 | Đạt: membership lock | Existing L16 selected set/entry/close refs, no local bossLock writer |
| 6 | Đạt: switch allowed | Eligible frozen members switch theo action gates, stable target/hit ledger, no reset HP/CD/status |
| 7 | Đạt cue standard ở design | Pose/arc/locked line/gap/order/recovery+caption/shape, muted/lowFX/reducedmotion; actual assets/devices chưa test |
| 8 | Đạt required counter coverage | Each dangerous pattern has baseline avoid/counter; invalid safe path means revise boss, no mandatory new unlock |
| 9 | Đạt: meaningful phases | Two phases change current/order, no heal/biology evolution; phase threshold still undefined approval gate |
| 10 | Đạt: no new mandatory element | Water candidate not immutable immunity, no Lôi/Kim/Earth/Life mandatory; optional E09 reactions bounded |
| 11 | Đạt: HP/recovery statuses | HP0 active→incapacity eval, defeat only no policy-valid continuation; emergency transfer PROPOSED, shared/individual/hybrid not selected silently |
| 12 | Đạt: outcome vs restoration | E04 permission ≠ E05 water_stable ≠ E06 arrived/return; Task24 ending deferred |
| 13 | Đạt single-ledger contract | Source-level receipt/recipient allocations same RewardGrantLedger, existing grant_evt_04_guardian_conflict preserved |
| 14 | Đạt idempotency design | Repeated casts/phase/attempt/alternative/version no new first-clear, ack loss lookup/retry same result |
| 15 | Đạt: mysteries | No spirit origin/final cause/chronology/faction new, keeper motivation source proposal |
| 16 | Đạt: asset honesty | Written candidates only, no approved boss art/sprite/atlas/playback/runtime/gameplay-tested certification |
| 17 | Đạt: prototype smaller | One placeholder/readable sweep+counter loop before full five attacks/two phases/production assets |
| 18 | Đạt edit scope | Eighteen docs/four navigation appends only, runtime/map/UI/sprite/animation/save/config unchanged |

## Risks và unresolved approvals

B23-U01–U07 giữ identity/art, movement/plane/geometry/camera/latency/return, attack/phase/health/resource/control/resistance values, L16 entry/retry/HP0/arbitration, accepted combat/trial source/outcome/refuge rules, W07/P15 durable recipients/close/migration và assets/devices. Specification đủ counters/proof boundaries, **không** chứng minh fair win/playability chưa được prototype.

Không mandatory guard/Water spell unlocked vì minStage I; short brace capability chưa approve không sole response. Boss basic damageability phải author, no hidden Water immunity để ép loài khác. Proposed trial là actual operation/source proof có cease-block/refuge qualification, không E03/thoại/HP0 alone auto win. Simultaneous boss/player defeat policy chưa chọn, no callback victory-first; undefined policy blocks production. Accepted E04 committed missing UI flag chỉ rederive, pending outcome khác durable fact.

Original `npc_tide_keeper`/`boss_water_access` source kept, candidate BossDefinition IDs not speciesId/collection unlock. Phase/AI state/cast/attempt/biological stage/event completion types tách; no second health/state/claim ledgers. Action patterns no core simultaneous offensive trap, phase queue giữ accepted damage/status/cursors and old field lifetime. Boss outcome doesn't auto E05 or S22 memory/reward cleanup, failed trial no permanent ecology damage. Abort-and-reset remains recommended L16/R03 proposal, not silent new save law.

## Readiness

**CONDITIONAL PASS cho design handoff Task24 sau yêu cầu riêng; chưa implementation/production-ready.** Task24 nhận E04 actor/operation permission và independent E05/E06 boundaries, không complete ending tự chạy từ Task23. Optional S22 content không prerequisite boss, all existing approval statuses preserved. Full PhaseIII audit chưa thực hiện.

[Overview](CHAPTER1_BOSS_OVERVIEW.md) linked đủ18deliverables, two candidates×13fields/five attacks×16fields/two phases/AI+Quy matrix/two environment interactions/12entities/40future QA. Static checks only links/structure/source IDs/counter coverage/ownership protection, no gameplay/AI/timing/playback/performance tests. No runtime/data/art/map/UI/save modification hoặc Task24 auto begin.

Kết quả validation tĩnh đã thực hiện: đủ18docs mới,151relative links hợp lệ, Markdown tables/code fences/whitespace đạt; two candidates×13fields/five actions×16fields/two phases×10fields/two environment recipes/12unique dialogue IDs/12entities/40future QA. Five-action references đủ counterplay rows, eleven AI states normal-loop reachability và đường tới resolution đạt; AI loop có chu trình chủ đích, không quest dependency DAG. New keys collision-free, existing event/zone refs valid. Hash/prefix comparison giữ toàn pre-existing content, chỉ bốn navigation files append; không code/art/map/UI/save/config change. Cuối bàn giao work/387b29d, không staged/commit/push mới; tổng Tasks17–23 có sáu tracked files modified và119docs untracked. Đây không gameplay/balance/playback/device test completion.
