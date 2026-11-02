# Side quest consequences và reward identity

**PROPOSED S22-P08**, dùng [W07 architecture](../world/WORLD_STATE_ARCHITECTURE.md), [transitions](../world/WORLD_STATE_TRANSITIONS.md), [Q21 state/ownership](CHAPTER1_QUEST_WORLD_STATES.md), [P15 rewards](../economy/REWARD_CONSISTENCY.md). Event IDs mới dưới đây là catalog bindings cần duyệt, chưa production event files; một completion tại existing WorldEventCompletion và projection quest, không hai optional completion truths.

## Source/event contracts

| Logical source / proposed eventId | Preconditions / trigger | Authority / mutation | Quest relationship / idempotency | Save/load / revisit |
| --- | --- | --- | --- | --- |
| opt_c1_quiet_refuge / evt_opt_c1_quiet_refuge | E01 parent, B receiver/source/return valid; survey→adjust nếu cần→verify/confirm | WorldEventCompletion outcome/proof + hy_obj_optional_refuge_b LocalObjectState safe setting nếu thay + knowledge/receipt same W07 writer; không property E05 | Quest completion view cùng source, grant_opt_c1_quiet_refuge PROPOSED first-clear; source/target/component immutable, repeat feedback không grant | Before commit old-safe, after commit result/setting/proof giữ; E05 safe variant chỉ verify, no recreated damage/no base water overwrite |
| opt_01_reef_observation / evt_opt_01_reef_observation | E02, approved behavior/source/provenance; accepted observation/record | Existing journal/knowledge owner + optional source completion/proof/receipt W07, no global hostility/species unlock | New binding aliases **same existing S05 logical source**; preserve grant_opt_01_reef_observation, no extra grant_evt_* nguồn khác | Query prior eligible observation; same main/E20 component đã claimed exclude delta; postE05 secondary/viable source, no quest reset |
| opt_02_ancestral_echo / evt_opt_02_ancestral_echo | E03, optional memory source/provenance approved; inspect/contact/record | Existing R03 MemoryRecord + source researched/proof/completion/receipt same unit; fragment mem_quy_refuge_margin còn PROPOSED | Preserve grant_opt_02_ancestral_echo S05; new event binding không identity reward mới; memoryId dedupe thêm, no first_sense/current regrant | Precommit retry source, postcommit replay only; ruins/archive fallback same logical memory/source; no missable intended memory |
| opt_c1_current_return / evt_opt_c1_current_return | E02, C weak loop/clearance/outlet/return valid; traverse/receiver/return evidence accepted | Completion/evidence + hy_obj_channel_niche_c local panel/marker setting **chỉ nếu owner cho phép**, receipt W07; no world-graph connector edit | grant_opt_c1_current_return PROPOSED, informational/local convenience; no mandatory stat/skill/mastery auto | Reload dựng target setting/cue, không toggle reward; postE05 already-clear verify/return, old facts giữ |
| opt_c1_refuge_watch / evt_opt_c1_refuge_watch | E03 + approved encounter/source/actor/route/HP/recovery/outcome profile; explicit accepted protection outcome | Existing encounter/actor disposition/source patch/optional completion + receipt, no new global assimilation state | grant_opt_c1_refuge_watch PROPOSED first-clear; authorized nonkill/stabilization/defense outcome theo definition, no kill callback alone | Abort/fail reset attempt theo policy, earned facts giữ; missing threat afterE05 chuyển equivalent verify outcome nếu authorized, no spawn victim để farm |
| opt_03_resonance_study / evt_opt_03_resonance_study | E08 giữ S05; source/compatibility/catalog/assets/placement valid khi cần attempt | R03 knowledge/optional memory hoặc explicit approved form entitlement + optional proof/receipt same W07 unit | Preserve grant_opt_03_resonance_study logical source; fallback payload chốt trước grant, không add form bằng version/retry | Interrupted attempt source-safe, repeat same receipt, source availability khác earned unlock; không optional dependency main |

`evt_opt_*` và legacy optionalId không hai completion stores. Binding phải map canonicalSourceRef=optional logical source, event completion/ref/view một nghĩa; nếu schema cần alias migration, giữ receipt/proofs/legacy grant identity và không ghi hai bản authoritative. Hiện không actual side-quest runtime saves, đây là future schema gate S22-U04. Source name/binding wrapper không tự mint new source.

## Mutation scope và phase

LocalObjectState chỉ owns property niche/panel riêng, không copy event-derived main flags. Optional source researched/knowledge/unique actor facts đúng existing owners; side quest `COMPLETED` projection từ outcome, không UI viết permanent quest flag. World map/phase sea_* vẫn W07: E04 conflict khác E05 water_stable khác E06 arrival/return. Side patch không set E03 bypass ready, E05 stable, grant main outcome hoặc unlock13connectors sớm.

Source/environment preflight kiểm main/access/return/habitat coverage kể cả undiscovered, actor/receiver không nằm collision, current patch không xóa refuge. E05 có base current profile; optional local variant chỉ trong permission domain, revalidate nếu parent revision đổi, không last-writer-wins đè global restoration. Sau E05 already-safe không claim đã tự sửa: outcome ghi verified-current/evidence thay repair-action, cùng knowledge ceiling và same first-clear source; physical delta có thể rỗng.

## Reward categories và anti-farm

| Loại | Policy | Portfolio application |
| --- | --- | --- |
| First-clear | Một accepted optional source completion, fixed payload/recipients theo manifest | Quiet/current/observation/research, no final EXP/drop/material numbers |
| Unique | Stable logical reward identity + target/component; memory record hoặc entitlement theo owner | Optional echo, conditional approved future acquisition; no generic corpse loot |
| Informational | Knowledge/provenance/route cue có source, không phải mọi cue có progression reward | Activities nhẹ read-only/replay; durable note phải approved binding trước dùng |
| Repeatable | Chỉ feedback/practice baseline; material/EXP loop cần explicit occurrence/reset/cap/budget approval | Chưa đưa repeatable economic reward vào portfolio này; no stare/toggle/reinfect/heal farming |

Mastery opportunity là nơi practice có thể tạo evidence theo P15, không direct mastery bar/stat/currency mới. Side EXP/resources nếu author phải bounded/non-exclusive, không cần để main/boss viable. Không loot mọi creature, không phải peaceful kills là optimal progression route. No cosmetic recognition system/inventory economy được tạo chỉ vì taxonomy nhắc tới.

Single **RewardGrantLedger** giữ source-level receipt và recipient grants. Source identity từ saveId + canonical optional/event source + target khi scoped + reward component, không recipient/contentVersion; recipient allocations `grantId+recipientId` chỉ phần payload. Lookup source trước, source claimed trả frozen payload/recipient set, không đổi active form để claim thêm. UniqueRewardClaim chỉ view/lookup, no second ledger.

Main/E20 interaction có proof sớm hoặc source dùng lại: consumer recognition không tự fresh reward; nếu cùng physical source/component, bind same canonical claim/explicit exclusion, no wrapper double-pay. Chỉ distinct authorized optional objective/component/budget mới có reward riêng, không đổi key để né source đã claimed. Exact source overlap/recipient/stacking mapping còn S22-U04 trước implementation. Form fallback knowledge không hidden promised form later; content/schema/payload/text versions metadata, không grant again.

## Transaction/reload/migration

Build candidate source outcome + owned patches + quest evidence/knowledge/memory/actor placement + reward recipients/ledger + route/coverage, durable atomic-equivalent commit rồi publish. Optional FX/dialogue/marker không write truth. Trước commit storage/placement/conflict fail giữ last-good, retry same identity/reconcile; after commit replay/reload chỉ dựng projection, no double delta/unique actor respawn.

Migration source/quest/zone/object/memory aliases giữ claims/outcomes/source provenance, backup rồi validate before promote. Removed reward/source phải giữ earned receipt/entitlement và approved replacement/retrospective access cho pending core source; không downgrade/xóa facts/regrant bằng version. No valid source/return thì temporary unavailable/recovery, không fabricate capture/safe body. Side suspension/abandon không sửa boss lock hoặc reset main; accepted outcome trong unsafe context defer theo existing coordinator/policy, no shortcut to equip/heal.
