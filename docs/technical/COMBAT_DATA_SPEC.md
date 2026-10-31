# Combat data specification — trung lập triển khai

**PROPOSED C14-P15**, không class/loader/executable schema/production JSON. [R03 data](RESONANCE_DATA_MODEL.md), [E09 data](ELEMENTAL_DATA_SPEC.md), [E10 data](DUAL_ELEMENT_DATA_SPEC.md), [V13 data](EVOLUTION_DATA_SPEC.md), [W07 save](PERSISTENT_WORLD_DATA_SPEC.md) giữ owners. IDs dưới là conceptual fields, chưa runtime types. Required fields thiếu trong draft phải có gap/decisionRef, không numeric fallback để gắn nhãn runtime-ready.

## Authority map

Catalog: CreatureSpecies/stages và skill/attack/element/status definitions versioned. Mutable player HP/incapacity/XP/unlocks/CD chỉ CreatureProgression R03; CombatActor là live binding, không copy writable store. Enemy HP theo encounter actor record cùng combat coordinator, không progression của player. StatusEffectInstance là **entity E09 đã có**, dùng lại nguyên authority; ability refs nối existing SkillDefinition/C04, không catalog cạnh tranh. SpiritState giữ stability/switch CD; Loadout và EncounterLockState giữ membership/lock. W07 writer + RewardGrantLedger sở hữu durable results. Derived level/effective profile/phase không setter thứ hai.

Mỗi entry dưới có purpose, required fields, relationships, ownership, lifecycle, persistence và validation. Timestamps là simulation times/sequence, không wall-clock/offline regen.

## CombatActor

- Purpose: live identity/body binding cho player/enemy, độc lập sprite và selected form.
- Required: combatantId, actorKind, currentBodyRef, transformRevision, position/layerRef, facing, combatProfileRef/version, healthOwnerRef, statusOwnerRef, actionStateRef, encounterRef, capabilityRefs.
- Relationships: CreatureProgression hoặc encounter actor record; CreatureCombatProfile, CombatActionState; same combatantId xuyên form switch.
- Ownership: simulation actor coordinator giữ binding/position, **healthOwnerRef không mutable HP copy**.
- Lifecycle: spawn/validated placement → active → incapacity/retire; switch atomic thay body/profile refs.
- Persistence: player durable refs/placement ở R03/W07 boundary; ordinary enemy positions transient; unique outcomes theo W07, không dump actor mỗi frame.
- Validation: đúng một active body, finite coordinates, resolved layer/caps; HP0 không action, collision theo body revision; no new combatantId để reset hit/AI identity.

## CombatActionDefinition

- Purpose: reusable action contract, base của basic/skill/defense/transform adapters.
- Required: actionId/version, category, eligibilityRefs, phaseGraphRef, markerRefs, targetingPolicyRef, locomotionPolicyRef, interruptPolicyRef, cancelTableRef, costPolicyRef, cooldownPolicyRef, recoveryDebtPolicyRef, animationRefsOrGaps, approvalStatus.
- Relationships: AbilityDefinition/AttackDefinition, B12/V13 animation contract, reusable execution modules.
- Ownership: immutable action catalog; inherited common contract không duplicate skill IDs.
- Lifecycle: draft/review → approved+validated → runtime-ready version; active casts pin version.
- Persistence: catalog refs/version only khi boundary cần, không serialize definitions mỗi slot.
- Validation: reachable terminal/cancel states, marker order deterministic, no unbounded zero-time loop, required module/clip thực; thiếu cancel không auto allow.

## CombatActionState

- Purpose: một action đang chạy, không animation state authority.
- Required: actorRef, actionRef/version, castId, phase, elapsedSimulationTime, consumedMarkerIds, reservationRefs, committedSpendRef, recoveryDebt, bufferedIntentRefOrNone, cancellationReasonOrNone, sourceConfigSnapshotRef.
- Relationships: CombatActor/ActionDefinition/cooldown/resource owners; pending switch dùng arbiter chung.
- Ownership: action coordinator, one current incompatible action per actor.
- Lifecycle: accepted → phases → finish/cancel/incapacity; released independent effects có lifecycle riêng.
- Persistence: transient theo attempt; accepted spend/HP/CD theo existing owners; không resume half-hit trên reload. Pending durable transitions theo R03/W07, không serialize buffer để replay.
- Validation: marker exactly once, nonnegative elapsed/debt, reservation spend một lần; missing animation không tự release; cancel không undo committed effects.

## AttackDefinition

- Purpose: hit windows/contact semantics của action, view/composition của E09 AttackProperties.
- Required: attackId/version, actionRef, attackPropertiesRefs, hitboxRefs, activeWindowRefs, hitGroupRefs, targetMask, LOS/layerPolicyRef, perTargetHitPolicyRef, totalBudgetRef, releasePolicyRef, sourceSnapshotPolicyRef, statusApplicationRefs, feedbackRef.
- Relationships: C04 skill refs/E10 ElementalAbilityProfile components, DamageChannel, HitboxDefinition.
- Ownership: existing skill/attack catalog; E09 AttackProperties vẫn owns declared element/channels, không copy formula.
- Lifecycle: definition validated → cast snapshot → windows/released effect → expiry.
- Persistence: snapshot transient; accepted result/spend ở owner cũ, old config pin trong attempt nếu policy approved.
- Validation: multi-channel/components chia base budget, multi-hit explicit ordinal/cap; piercing/redirect không clone root identity/TTL; onContact/onDamage rõ.

## HitboxDefinition

- Purpose: local active attack shape, khác FX/envelope.
- Required: shapeId, attackRef, shapeModuleRef, anchorRef, localGeometry, directionTransformRef, layerMask, activeMarkerInterval, hitGroup, sweepPolicyRef, geometryVersion.
- Relationships: AttackDefinition/animation markers/world-to-local adapter.
- Ownership: geometry catalog; runtime instance đọc snapshot.
- Lifecycle: resolve anchor/heading → active interval → retire; query theo simulation.
- Persistence: definition refs; contacts transient/ledger scope, không save drawn polygons.
- Validation: positive finite bounds, marker closed/open order rõ, same group dedupe, swept fast motion, render zoom không đổi reach.

## HurtboxDefinition

- Purpose: vùng nhận hit/weakpoint của body/stage.
- Required: hurtboxId, bodyProfileRef/version, anchorRef, geometryModuleRef/geometry, eligibleLayerMask, targetCombatantBinding, damageGroupRef, responseProfileRef, poseCompatibilityRefs.
- Relationships: CreatureCombatProfile/HitboxDefinition queries, same health owner cho segments.
- Ownership: body geometry catalog, không mỗi hurtbox một HP bar.
- Lifecycle: bind lúc body spawn/switch → posture activation → retire cùng body.
- Persistence: body/profile refs, không frame state; invalid pose chặn activation.
- Validation: segmented Long/boss dedupe cùng combatantId/hit group; clip anatomy/anchors khớp; visual FX không thêm hurt shape.

## DamageContext

- Purpose: immutable intent/evidence để resolve một contact hoặc status tick.
- Required: eventId/sequence, attemptId, rootCastId, component/window/tickOrdinal, hitKey, sourceCombatantRef/sourceFormRef/configSnapshotRef, targetCombatantRef/bodyRevision, contactPosition/layer, attackPropertiesRef, channelBudgetRef, elementalContextRevision, defenseSnapshotRef, applicationTriggerRefs.
- Relationships: E09 channels/profiles, status application source, W07 receiver context read-only.
- Ownership: combat resolver tạo, không UI/animation tự mutate.
- Lifecycle: contact candidate → validate/dedupe → resolve/reject → immutable result.
- Persistence: transient evidence; commit receipt nếu cần recovery, không replay context để apply damage lại.
- Validation: target boundary một body; cause groups normalization, version resolves, root ID không đổi bởi switch/redirect; no arbitrary executable payload từ save.

## DamageResult

- Purpose: một accepted/rejected outcome cho state writer và presentation.
- Required: resultId, eventId/hitKey, acceptance/reason, targetOwnerRef/bodyRevision, HPDelta, defenseOutcomeRef, spentBudgetRefs, acceptedStatusIntentRefs, controlIntentRefs, incapacityFlag, feedbackRefs, committedRevisionOrTransientReceipt.
- Relationships: DamageContext, existing HP/status/ledger owners, defeat coordinator.
- Ownership: resolver/coordinator commit; consumers read-only. HPDelta không health store mới.
- Lifecycle: candidate → atomic runtime commit/reject → publish exactly-once logical outcome, notifications có thể duplicate.
- Persistence: committed health/status/receipt theo R03/E09/W07 boundary; visuals disposable.
- Validation: one hitKey one outcome, HP clamp/HP0 invariant, reject không spend tùy tiện; no reward side effects từ feedback notification.

## StatusEffectInstance — reuse E09

- Purpose: accepted status application, **không định nghĩa entity cạnh tranh**.
- Required E09 bindings: applicationId, statusRef/version, targetRef+kind, ownerBinding, sourceCastRef/configSnapshot, remainingTime/budget, stackGroup, procCursor, commitRevision; anchorRef khi definition cần.
- Relationships: StatusEffectDefinition, CreatureProgression/combatant shared status owner, reaction tokens.
- Ownership: existing E09 runtime status service; shared/form_bound/source_active giữ semantics source.
- Lifecycle: accepted apply/coalesce → bounded refresh/ticks → removal/expiry/source loss; switch không reset cursor/window.
- Persistence: minimal obligation **chỉ sau E09-P10/W07 approval**; cùng HP/ledger revision, no offline ticks. Unknown IDs preserve opaque+quarantine, không tự heal/delete.
- Validation: same-family caps/CC recovery, no reserve damage body/charge discharge, source_active end khi switch; burn tick target defense lấy active body boundary E09.

## AbilityDefinition

- Purpose: combat activation view của existing SkillDefinition, không số slots cố định.
- Required: abilityId(existing skill ID), version, category, actionRef, unlockRequirementRefs, targetingPolicyRef, cost/CD policyRefs, effectModuleRefs, attackComponentRefs, status/receiverPermissionRefs, sourceLifetimePolicyRef, animation/feedbackRefsOrGaps, decisionRefs.
- Relationships: C04 skills, E10 ElementalAbilityProfile, CreatureProgression unlocks.
- Ownership: existing skill catalog; category composition qua reusable modules.
- Lifecycle: authored/approved/validated → accepted cast; source_active khác released residue.
- Persistence: unlockedSkillIds/version refs existing progression, không save copied ability definitions.
- Validation: component budget split/interrupt/spend/cleanup đủ, missing modules/markers fail-ready; healing không negative damage/revive.

## AbilityCooldownState

- Purpose: **view/access contract** của perSkillCooldownRemaining R03, không new timer store.
- Required: ownerFormRef(or enemy actorRef), abilityRef, remainingSimulationTime, committedCastRef, cooldownPolicyVersion, sourceRevision.
- Relationships: ActionState/AbilityDefinition, same simulation clock.
- Ownership: CreatureProgression R03 cho player; encounter actor record cho enemy.
- Lifecycle: accepted action start → tick kể cả reserve → zero; approved recovery reset sau attempt, không menu.
- Persistence: same existing record/boundary, pause/offline không advance; no slot copies.
- Validation: nonnegative, re-entry không reset, cooldown completion inactive không grant extra cast hoặc energy.

## CreatureCombatProfile

- Purpose: composition view của C04 species/stage/movement/skills và E09/E10 element/resistance refs.
- Required: profileId/version, speciesRef/formRef/stageRef, movementProfileRef, action/abilityRefs, defenseCapabilityRefs, hurtbox/footprint/envelopeRefs, elementProfileRef, resistanceProfileRef, statusResponseRefs, animationManifestRefOrGaps, validationStatus.
- Relationships: K11 role projection, V13 stage definition, CreatureProgression reads selected version.
- Ownership: creature catalog; HP/CD/status instances không ở profile.
- Lifecycle: draft→review→runtime-ready; bind ở spawn/safe transition; boss frozen ref nếu approved R03.
- Persistence: same progression committed stage/config refs, không profile copy trong loadout slots.
- Validation: Sacred affiliation/anatomy, single/dual resolution E10 không auto sum, role/rarity không stat multiplier; required geometry/animation/module ready.

## EnemyBehaviorProfile

- Purpose: formal combat behavior extension của F06 archetype, không species/morality definition mới.
- Required: profileId/version, F06ArchetypeRef, perceptionPolicyRef, stateGraphRef, actionSelectionPolicyRef, actionRefs, navigationCapabilityRefs, territory/returnRefs, telegraphRefs, interrupt/recoveryRefs, defeatOutcomePermissionRef.
- Relationships: CombatActor/CreatureCombatProfile/W07 encounter definitions.
- Ownership: behavior catalog; runtime perceived facts/aggro state ở encounter actor.
- Lifecycle: spawn with world predicates → perceive/select/execute → disengage/incapacity/retire.
- Persistence: ordinary AI transient, unique actor outcomes/occurrence ở W07, no full AI brain dump.
- Validation: finite pursuit/path retry, not omniscient, readable first attack/lock marker/recovery, no reward directly từ AI callback.

## BossEncounterState

- Purpose: combat view/extension của R03 EncounterLockState, không lock thứ hai.
- Required: encounterId, attemptId, lifecycleState, existingLockRef, frozenMemberSetRef, frozenStage/configRefs, entryCheckpointRef, bossActorRefs, combatPhaseRef, eventCursor, resolutionOperationRefOrNone, rewardLedgerRef, sourceRevision.
- Relationships: W07 ConditionalEncounter/WorldEventCompletion, existing progression/ledger/lock.
- Ownership: encounter coordinator cho transient phase; durable lock/outcome cùng R03/W07 writer.
- Lifecycle: prepare→active_locked→resolving→completed hoặc failed/abort-reset→outside.
- Persistence: attempt lock/entry/outcome receipts; reload chưa thắng abort/reset proposal, **không snapshot resume half-hit**; phase không persistent story fact mới.
- Validation: membership immutable qua ACTIVE/RESOLVING, active trong set; empty allowed D41; new attempt reset effects, rewards idempotent; victory phase khác evolution/story event.

## FormSwitchContext

- Purpose: combat adapter/view của R03 TransformationState, không second transform transaction.
- Required: transactionId, transformationStateRef, source/targetFormRefs, expectedBody/loadoutRevision, encounterLockRefOrNone, cancelWindowRef, recoveryDebt, costReservationRef, placement/layerValidationRef, dueDamageCursor, commitMarker/receipt.
- Relationships: CombatActionState, health/CD/status owners, V13 arbiter.
- Ownership: shared transition coordinator/R03 state; action/FX chỉ observe.
- Lifecycle: validate→prepare→revalidate→atomic commit→recover hoặc precommit cancel; source HP0 hủy old request.
- Persistence: existing R03 intent/receipt/boundary, không activeFormId thứ hai.
- Validation: same locked member set, target viable, no two bodies, spend once, no default heal/iframe/CD reset; damage trước/sau boundary đúng body.

## Events, extension và migration gates

Một simulation coordinator resolve due damage/status → incapacity/cancel → switch commit → timers/publish. Event root IDs/ordered sequence/dedupe scopes giữ qua component/geometry/redirect. Runtime commit HP/control/status/ledger một lần; durable outcomes qua writer hiện hữu, không durable write mỗi frame. Exact architecture/tick rate/storage implementation chưa chọn.

Species mới: references/profile/skills/movement/resonance/assets/habitat; reusable attack module dùng marker/shape/budget/owner contracts. Mechanic thật mới cần module+validator/capability riêng được review, không core branch species name. Validation reject missing essential refs, unsupported geometry/animation hoặc unapproved formula; draft vẫn giữ gap cho review, không fake production IDs.

Migration: schema/content version + old→canonical aliases có provenance, backup generation trước ghi; skill rename không reset CD/unlocks/XP hoặc grant lại. Unknown definition/status giữ opaque source record/quarantine unsupported execution; chọn safe recovery theo approved policy, không tùy tiện cleanse/heal. Boss reload reconcile committed completion trước abort; không offline progression. UI settings namespace `nhat-diem.ui.v1` và legacy save không bị overwrite. Storage adapter/ack/error UX/loss budget C14-U09 vẫn UNRESOLVED.
