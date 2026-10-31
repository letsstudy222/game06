# Loadout data specification — neutral contracts

**PROPOSED L16-P14**. 13 entities là views/extensions/commands của [R03 data](RESONANCE_DATA_MODEL.md), [C14](COMBAT_DATA_SPEC.md), [P15](PROGRESSION_DATA_SPEC.md), [V13](EVOLUTION_DATA_SPEC.md), [W07](PERSISTENT_WORLD_DATA_SPEC.md). Không classes/loaders/production JSON hoặc save implementation.

## One-owner map

Mutable membership+activeFormId chỉ `EquippedFormLoadout` R03. Task16 `EquippedCreatureLoadout` là alias/view, không new store. `EquippedSlot` là child reference, không creature/HP/XP copy. `ActiveFormState` là projection/body binding, không second writable active selection. PlayerCreatureCollection là aggregate/read model ResonanceRecord/progression/memory; collection ownership không loadout slot. BossEncounterLock/Snapshot là same EncounterLockState extension/ref, không independent lock flag. LoadoutPersistenceRecord là serialization envelope view, không live state mirror.

State/lifecycle refs ở [state machine](LOADOUT_STATE_MACHINE.md); proposed semantic invariants L16-I01–I18 ở đó. IDs typed: creatureId=canonicalSpeciesId C04, formId stable lineage qua stages; stageId/skillId namespace khác dù same text. display slot number không key progression/selection.

## PlayerCreatureCollection

- Purpose: aggregate/read model many discovered/unlocked species và references, không new unlock list authority.
- Required: player/saveRef, resonanceRecordRefs, ownedProgressionRefs, catalogVersion, sourceRevision, availabilityProjectionRefs.
- Relationships: R03 ResonanceRecord/CreatureProgression/AncestralMemoryRecord, K11 playability catalog.
- Ownership: source domains giữ facts, collection service/query đọc.
- Validation: discovered!=unlocked!=usable, no duplicate species identity/progression, nonplayable không bắt formId.
- Lifecycle: reconstruct sau load/catalog/world revision, invalidate stale cache; unlock source commit cập nhật owners cũ.
- Persistence: underlying source records durable, collection cache disposable/revision tagged.
- Migration: typed aliases/provenance, unknown preserve, no automatic form grant khi thêm catalog entry.

## EquippedCreatureLoadout

- Purpose: alias/view của canonical EquippedFormLoadout R03, current equipped membership/active selection.
- Required: ownerRef, three memberPositions(formRefOrEmpty), activeFormIdOrRecoveryNone, membershipRevision, canonicalOrderRef, selectionRevision.
- Relationships: collection/progression refs, EquippedSlot children, EncounterLockState/frozen snapshot.
- Ownership: R03 loadout domain dưới same writer, **chỉ một** activeFormId setter qua validated transaction.
- Validation: max ba, eligible admission, uniqueness proposal, active thuộc usable equipped set trong embodied control; empty không pseudo member. Bootstrap/recovery no-control exceptions explicit.
- Lifecycle: bootstrap initial bind → safe edits/switch selection → restricted/frozen membership → close/recovery/safe edits.
- Persistence: canonical refs/order/active/revisions cùng placement/transition commit boundary; không serialize UI active-first permutation như membership mới.
- Migration: validate aliases/duplicates/unknown refs; active/frozen set không sửa in-place để lách boss, abort/recovery trước outside-lock repair.

## EquippedSlot

- Purpose: child position reference, khác UI slot role và species record.
- Required: canonicalPositionId thuộc ba positions, parentLoadoutRef, formRefOrEmpty, parentRevision.
- Relationships: EquippedCreatureLoadout, SpeciesProgressionReference; display role derived từ activeFormId.
- Ownership: contained in parent only, no independent membership mutation.
- Validation: empty explicit, ref resolves/unlocked admission, no XP/HP/CD/stage fields; alias duplicate check theo canonical species.
- Lifecycle: create ba positions trong loadout, safe assign/remove/reorder, freeze in boss.
- Persistence: contained reference/order trong same canonical parent record, không own serialized creature object.
- Migration: position display labels có thể đổi, stable form refs không; old slot-index active convert qua validated parent mapping, ambiguous→recovery.

## ActiveFormState

- Purpose: read projection/runtime body binding từ canonical activeFormId, not another active store.
- Required: canonicalLoadoutRef/selectionRevision, activeFormRef projection, combatantId, bodyBindingRef, effectiveProfileVersionRef, position/layer/facing/velocityContextRef, controlAvailabilityReason.
- Relationships: C14 CombatActor/CreatureCombatProfile, R03 loadout, world placement owner.
- Ownership: active identity do parent; runtime actor coordinator owns one body/placement context.
- Validation: projection đúng same revision, one controlled body, no active from collection outside membership, HP/capability suitable nếu approved model.
- Lifecycle: bind bootstrap/switch commit, recover/no-control exception, retire source binding atomically với target.
- Persistence: refs/placement owned elsewhere trong envelope; không duplicate activeForm value independently; runtime buffers/render poses transient.
- Migration: rebuild projection, validate stage/assets/layer/placement trước control, unsupported source không silent clone/unlock.

## FormSwitchRequest

- Purpose: logical user intent/dedupe envelope, không accepted switch hoặc input binding production.
- Required: requestId, targetCanonicalFormRef, expectedMembership/selectionRevision, sourceCombatantRef, inputActionRef, contextRef, requestSimulationSequence, bufferExpiryPolicyRef.
- Relationships: current loadout/lock/context/action policies, FormSwitchTransition nếu accepted.
- Ownership: input adapter tạo intent, arbiter validates; no resource/active mutation by UI.
- Validation: no empty/locked target, no same-form side effect, stale slot resolved ID/revision, only one bounded pending request.
- Lifecycle: request→reject/no-op/buffer→revalidate→accepted transition hoặc expire/clear.
- Persistence: buffered input transient, không replay sau load/focus/resume; accepted transaction uses separate durable boundary refs.
- Migration: no replay old gesture; command schema mismatch reject safely, existing source state giữ.

## FormSwitchTransition

- Purpose: view/extension R03 TransformationState + C14 FormSwitchContext, same transaction not second state machine owner.
- Required: transactionId, existingTransformationRef, source/targetFormRefs, phase, pinnedProfileRefs, expectedRevisions, reservationRef, placementCandidateRef, dueDamageCursor, commitReceiptRefOrNone, recoveryDebtRef.
- Relationships: active loadout/body binding, health/status/CD owners, V13 cross-body arbiter, W07 writer.
- Ownership: existing transition coordinator; FX only observe committed phase/result.
- Validation: due damage before commit, spend once, source viable before commit, target still in frozen set/placeable; no two bodies/iframe/HP or CD reset.
- Lifecycle: PREPARING→COMMIT→RECOVERING→STABLE hoặc precommit CANCELLED→stable/recovery; incapacity path independent, no old intent auto retry.
- Persistence: existing R03 intent/commit receipt+active/placement/cost/status/health revision, no every animation frame. Durable policy L16-U09 required.
- Migration: precommit cancel reservation giữ accepted damage, postcommit reconstruct target/debt, unknown profile→safe recovery không refund committed spend/regrant.

## CreatureEligibilityRule

- Purpose: content predicates cho admission/equip/activation, không species ownership flag mới.
- Required: ruleId/version, operationKind, playable/unlockPredicateRefs, contentModuleAssetRequirements, context/availabilityPredicateRefs, movement/placementRuleRef, decisionStatus.
- Relationships: R03 resonance/progression/catalog, B12 assets, C14 action/movement/health, W07 world rules.
- Ownership: eligibility catalog, evaluation read model theo source revision.
- Validation: no rarity/dual⇒playable, no full-three early predicate by default, unavailable reference khác unknown; draft missing approved policy fail-ready.
- Lifecycle: author/review→resolve at request→revalidate at commit; reason codes stable for UI.
- Persistence: rule/version refs nếu snapshot cần, source facts durable ở owners; no copied eligible boolean as save authority.
- Migration: alias predicates/capabilities with proof, no silent unlock hoặc deny-erases-owned-record; unknown scopes preserve/quarantine.

## SpeciesProgressionReference

- Purpose: typed pointer tới same CreatureProgression R03/P15/V13, no copied XP/level/HP.
- Required: formId, canonicalSpeciesRef, progressionRecordRef, catalog/stageVersionRef, sourceRevision.
- Relationships: equipped slots/collection/skill configs/HP/CD/mastery refs, existing progression owner.
- Ownership: source species domain, slots/encounter consumers read.
- Validation: same species maps one canonical progression lineage; stage không form mới; aliases typed/cycle-free, no slot-specific level updates.
- Lifecycle: unlock record once→reference across equip/switch/evolve→preserve on temporary unavailable.
- Persistence: source record durable plus IDs in loadout, no serialized independent progression per slot/snapshot.
- Migration: retain XP/skills/mastery/stage/grants, successor mappings preserve CD/status obligations; unknown record not auto initialize XP0.

## CombatStateOwnership

- Purpose: schema/rule mapping Spirit/species/active-body/world scopes, không container copy tất cả statuses.
- Required: ownershipRuleId/version, stateKindRef, scope, authoritativeOwnerRefType, switchRebindingPolicyRef, sourceSnapshotPolicyRef, clockPolicyRef, persistenceBoundaryRef, approvalStatus.
- Relationships: E09 StatusEffectInstance/definition, C14 damage/actor, R03 stability/health/CD, P15 attribution/rewards.
- Ownership: rules catalog; actual instances stay existing owners, no writable mirrored status bags.
- Validation: exactly one owner/instance per logical state; source_active end, shared single-body tick, form_bound no reserve body, released effects finite IDs/budget.
- Lifecycle: rule approved→bind each accepted effect→rebind/end/expire on actual switch source policy.
- Persistence: policy refs plus minimal obligations ở owners nếu approved E09-P10; no particle snapshots/offline ticks.
- Migration: unknown status preserved/quarantined with source receipt, not free cleanse/heal or arbitrary execution; HP model crosswalk semantics not letters.

## BossEncounterLock

- Purpose: view/extension của R03 EncounterLockState, single source lock lifecycle.
- Required: encounterId/attemptId, lifecyclePhase, existingLockRef, frozenSnapshotRef, lockCommitRevision, closeDispositionOrNone, closeReceiptRefOrNone, completionLookupRef.
- Relationships: canonical loadout, BossEncounterSnapshot/RetryPolicy, W07/P15 completion/reward ledger.
- Ownership: encounter coordinator+same durable writer; HUD lock read-only.
- Validation: BOSS_ACTIVE/RESOLVING membership immutable including empty/order proposal, selection can change valid members; no unlock before completion/reset close boundary.
- Lifecycle: preparation confirmation/entering→active→defeat or victory/abort→exiting→closed; old lock closed before new retry attempt.
- Persistence: lock intent/commit/outcome/close receipts durable, no UI-only flag; live process snapshot không đủ.
- Migration: reconcile committed completion first, unresolved active lock abort/reset proposal, no repair membership inside active lock to new species.

## BossEncounterSnapshot

- Purpose: immutable entry/config evidence của same lock, **không live HP/progression copy** hoặc mid-fight resume snapshot.
- Required: snapshotId, attemptRef, frozenFormIdentitiesAndEmptyPositions, canonicalOrder/membershipRevisionAtEntry, pinnedStage/configRefs, entryCheckpoint/position/layer/arenaScopeRefs, sourceCatalogVersion, retryPolicyRef, integrity/revisionRefs.
- Relationships: EncounterLockState, species progression reference owners, source world safe anchor.
- Ownership: immutable child evidence of lock; actual mutable HP/CD/XP/status remain source owners.
- Validation: current member identities equal frozen tuple under proposed rule, active selection membership checked separately; no boss partial HP+new team reconstruction.
- Lifecycle: build candidate at confirmation→revalidate/commit entering→immutable until outcome close, retain receipt as recovery evidence.
- Persistence: durable entry proof/config refs/placement, not frame-by-frame actor/RNG snapshot. Exact resume would need separate approval/system not chosen.
- Migration: aliases preserve historical/frozen identity, content mismatch →abort/recover before new snapshot, no silently swap new profile into live old attempt.

## BossRetryPolicy

- Purpose: content contract cho full reset/quick retry/preparation/load recovery, không boss persistent HP assumption.
- Required: policyId/version, restartMode, lockClose/resetRuleRef, checkpointRecoveryRuleRef, sameTeamValidationRef, reloadPolicyRef, rewardEligibilityBoundaryRef, invalidTeamFallbackRef, decisionStatus.
- Relationships: lock/snapshot/world checkpoint/P15 grant ledger, selected health model.
- Ownership: encounter policy catalog; current retry state tracked in same encounter receipt domain.
- Validation: new attempt only after old close, no membership bypass/free heal with old boss HP, no first-clear from aborted attempt; invalid team has safe prep/recovery path.
- Lifecycle: read on entry→resolve fail/abort/victory/load→validate retry target/snapshot afresh.
- Persistence: version/ref plus disposition/reset/close operation receipts, no ordinary half-hit resume.
- Migration: old pending locks reconcile with pinned policy/backup; incompatible policy requires recovery decision, not replay rewards.

## LoadoutPersistenceRecord

- Purpose: serialization boundary/envelope view của existing R03/W07 records, không second live loadout/save writer.
- Required: saveId, schema/contentVersion, committedRevision, canonicalLoadoutRef/payload, progression/resonanceRecordRefs, transformationIntentOrReceiptRef, encounterLock/snapshot/closeRefs, safePlacement/checkpointRefs, integrity/lastGoodGenerationRefs.
- Relationships: W07 save envelope/writer, R03 owners, P15 grants, E09 obligations if approved; skill configs/CD/health referenced not duplicated.
- Ownership: existing durable writer/generation, decode reconstructs same owners then projections.
- Validation: ID types/ownership/membership/active/eligibility/lock/placement coherent at revision, no synthetic unlock, incomplete intents≠committed state.
- Lifecycle: candidate→validate→atomic promote/ack→load validate/migrate/reconcile→control only safe. Save errors retain last-good generation/no false success.
- Persistence: canonical slot refs/order/active + source progression/config/CD/health/status obligations according to approved policy; no buffers/FX/offline simulation.
- Migration: immutable backup/versioned aliases/output validate; invalid member preserve/quarantine, lock abort before outside repair, future-version no downgrade overwrite, no rewards regrant.

## Serialization/recovery contract

All species levels/XP/skills/mastery/evolution serialize **once at existing species domain**, collection unlocked facts once R03, loadout member refs/order/active once canonical record. Form health conditional chosen model, switch stability/CD/clocks/status obligations according to approved owners. Persist entry/retry/checkpoint/close evidence, not actual live boss HP alone. No save namespace overwrite `nhat-diem.ui.v1` hoặc legacy. No storage/library/engine selected.

Load procedure: validate schema/integrity/last-good → typed alias migration on copy → reconcile committed completion before unresolved boss abort/reset → reconcile transform pre/postcommit without refund damage/spend → validate references/eligibility/membership/active/placement/return → close old lock/reset if required → recover/repair ngoài lock using approved policy → rebuild collection/UI/body read models → allow control only with valid active or explicit bootstrap. Unknown IDs/assets preserve data/quarantine, no auto unlocking/replacement reward; no valid recovery thì keep backup/no-control diagnostic, not softlock gameplay resumed inside invalid arena.

Candidate writes share writer/revision with W07/P15: active/placement/spend/health/status at switch boundary, unlock/progression/loadout bootstrap grants, lock/reset/recovery/close và victory world/reward receipts coherent. Storage quota/ack-loss/error/export/loss budget L16-U09 pending; save không dựa beforeunload hoặc frame snapshot. New species uses profiles/refs/modules, novelty requires reusable capability adapter/validator, not giant species switch statement.
