# Progression và reward data specification

**PROPOSED P15-P16**, 13 conceptual entities, không classes/loaders/executable schema/runtime tables. [R03](RESONANCE_DATA_MODEL.md), [C04](CREATURE_DATA_SPEC.md), [V13](EVOLUTION_DATA_SPEC.md), [C14](COMBAT_DATA_SPEC.md) và [W07](PERSISTENT_WORLD_DATA_SPEC.md) giữ owners. Definition draft thiếu rules phải có gap/decisionRef, không điền numeric fallback thành runtime-ready.

## Authority và relationships

CreatureSpecies.levelProgression → LevelProgressionDefinition/AttributeGrowthProfile; one canonical CreatureProgression R03 per playable form/species → derived level/unlocks/mastery refs/committed stage. Cumulative XP không nằm ở loadout slots, encounter và SpiritState như ba writable copies. Existing masteryObjectives được mở rộng SkillMasteryRecord; memory/discovery/world facts có owners cũ, chỉ refs ở progression. RewardGrantRecord/ExperienceGrantEvent/UniqueRewardClaim là receipts/views cùng **RewardGrantLedger**, không ledgers cạnh tranh. InventoryRecord là proposed vật liệu owner nếu cần, không memory/progression duplicate store.

## CreatureProgressionRecord

- Purpose: alias/view của CreatureProgression R03 và V13, canonical independent species progression.
- Required: formId, canonicalSpeciesRef, cumulativeXP, curveRef/version, committedStageId, unlockedSkillIds, masteryObjectiveRefs, pendingBenefitRefs, availabilityRef, revision; HP/CD owner refs theo R03 nếu model được duyệt.
- Optional: adoptedFoundationReceiptRefs, growthProfileOverrideRef nếu approved, migrationProvenance.
- Relationships: CreatureSpecies/C04, LevelProgressionDefinition, SkillMasteryRecord, V13 stage/eligibility, existing memory refs (không memory flags copy).
- Ownership: existing species progression domain; level derived từ XP/curve+approved migration floor proof, không setter level khác.
- Validation: same species/formId qua stages/encounters, XP nonnegative, no skill/evolution reset bởi grant/migration, pending benefits không grant XP lần nữa.
- Persistence: durable existing record cùng accepted ledger revision; boss stat/config pin policy R03/C14 pending.
- Migration: stable IDs/typed aliases, curve version/earned-level preservation, backup trước promote; missing catalog preserve/quarantine, không default XP0.

## ExperienceSourceDefinition

- Purpose: catalog contract cho nguồn EXP meaningful, không event instance.
- Required: sourceDefinitionId/version, category, evidencePredicateRefs, occurrencePolicyRef, repeatabilityClass, eligibilityRuleRef, allocationPolicyRef, budgetRuleRef, recipientPolicyRef, stackingExclusionGroupRef, approvalStatus.
- Optional: world/quest refs, randomSelectionRef nếu approved, masteryEvidencePermissionRef, feedbackRefs.
- Relationships: encounter/objective/world definitions, RewardTableDefinition, P15 distribution policy; không tự authoritative completion.
- Ownership: content source catalog.
- Validation: readable repeatability/source permissions, finite resolved budget, meaningful participants, no reset-by-respawn default, no optional species main gate.
- Persistence: definitions versioned refs; save occurrence/evidence do source owner, không toàn table copy.
- Migration: canonical source aliases giữ logical grant identity; definition update không regrant past source.

## ExperienceGrantEvent

- Purpose: EXP component/receipt của reward operation, không kill callback hoặc second XP writer.
- Required: eventId, logicalGrantKey, sourceDefinitionRef/version, sourceOccurrenceRef, proofRefs, frozenRecipientAllocations, resolvedTotalBudget, allocationPolicyVersion, operationId, expectedRevision, receiptState/committedRevision.
- Optional: rootCast/status sourceRefs, catchUpTopUpBasisRef, presentationRef.
- Relationships: existing RewardGrantLedger/RewardGrantRecord, CreatureProgressionRecord, C14 attribution snapshot.
- Ownership: reward writer giữ payload/receipt; recipients update same transaction.
- Validation: allocations normalized kể cả rounding, total không nhân theo number equipped, recipients frozen trước payout; same source key/different payload conflict, not another reward.
- Persistence: accepted payload/receipt và recipient deltas durable together; no every hit event storage obligation.
- Migration: renamed form/source canonical aliases; event replay no apply twice, no active-new recipient rewrite.

## LevelProgressionDefinition

- Purpose: curve contract cho derived level từ same cumulative XP.
- Required: curveId/version, modelKind, cumulativeThresholdRuleRefs, segmentJoinPolicyRef, capPolicyRefOrExplicitUnresolved, overflowPolicyRef, expansionMigrationRef, validationStatus.
- Optional: species exception ruleRef có rationale/approval, pacing target notes không final values.
- Relationships: CreatureSpecies.levelProgression, AttributeGrowthProfile, progression record.
- Ownership: progression catalog, không player levels store.
- Validation: thresholds finite/increasing, segments không gap/overlap/level cliff ngoài policy; cap chưa chosen thì draft, no numeric defaults.
- Persistence: save curve/version refs và cumulative XP; level recompute, compatible migration proof nếu threshold changes.
- Migration: preserve earned history/XP/unlocks, no level-up reward replay; extension appended không reset legacy progression.

## AttributeGrowthProfile

- Purpose: catalog rules cho bounded level-dependent growth, khác combat formula/element profile.
- Required: growthProfileId/version, species/stage applicabilityRefs, levelCurveRef, attributeRuleRefs, boundedGrowthPolicyRefs, benefitApplicationBoundaryRef, HPMappingPolicyRef, decisionRefs.
- Optional: skillEfficiencyUpgradeRefs, approved exceptionRefs.
- Relationships: C04 baseAttributes, E09 resistance cause groups, C14 effective combat profile, V13 stage mapping.
- Ownership: catalog rules; effective values derived read model, no second mutable maxHP/attack store.
- Validation: no universal move/recovery scaling, no rarity/dual multiplier, no level-up revive, same cause not applied twice.
- Persistence: active/pinned version refs theo approved encounter policy; pending benefit receipt refs not extra XP.
- Migration: reconcile old level/stage configs on safe boundary, status/CD obligations preserve; exact HP formula remains gate.

## SkillMasteryRecord

- Purpose: detail/view mở rộng existing masteryObjectives, không extra mastery currency.
- Required: formRef, objectiveId/version, skillRef, acceptedEvidenceRefs, progressState, completionReceiptRefOrNone, refinementEligibilityRefs, revision.
- Optional: accessibleAlternativeProofRef, successorAliasRefs, lastEligibleOccurrenceCursor.
- Relationships: C04 unlocked skills, P15 ExperienceSourceDefinition, V13 requirement refs.
- Ownership: same species progression domain; completion/benefit grant same existing ledger.
- Validation: meaningful target/context, no empty cast/overheal/self-farm, source/occurrence coalesce/caps, duplicate completion once.
- Persistence: durable proof/completion; disposable per-tick samples not save; unlock store remains existing unlockedSkillIds.
- Migration: objective/skill rename/successor retains proofs/CD/unlocks, not reset count/reward by contentVersion.

## RewardTableDefinition

- Purpose: conceptual reward resolution manifest, không production table/drop rates.
- Required: tableId/version, sourceApplicabilityRefs, selectionMode, entryRuleRefs, eligibilityPredicateRefs, repeatabilityPolicyRef, logicalRewardComponentRefs, budget/exclusionRefs, capacityPolicyRef, approvalStatus.
- Optional: weightedPoolRefs, deterministicAlternativeRef, guaranteeCounterPolicyRef chỉ nếu approved, feedbackRefs.
- Relationships: ExperienceSourceDefinition, ResourceDefinition, RewardEligibility, source owner/world event manifest.
- Ownership: content reward catalog.
- Validation: approved selection/weights/empty outcome policy, sourced categories, no cloned budget/missing essential main source/random-only gate.
- Persistence: resolved payload/version held in grant receipt; definition không saved copies từng recipient.
- Migration: committed payload immutable, accepted pending pin/migrate explicitly; unique identity independent table version.

## RewardEligibility

- Purpose: read model/candidate validation, không mutable claimed flag.
- Required: sourceOccurrenceRef, table/sourceVersionRefs, authoritativeProofRefs, recipientEligibilityRefs, currentOwnerRevisions, repeatabilityCheckRef, existingClaimLookupRef, result/reasons.
- Optional: habitat/context refs, capacityProjectionRef, playerChosenRecipientIntentRef.
- Relationships: R03 resonance/progression, W07 quest/world, existing grant ledger.
- Ownership: derived query result, writer revalidates trước commit.
- Validation: stale revision cannot authorize grant; observed!=playable/unlocked, no full-three requirement; complete prior proof recognized.
- Persistence: reconstruct, optional cache disposable; proof owner/receipt durable, no duplicate eligibility booleans save.
- Migration: discard stale caches, remap proof refs via existing owner, unknown context stays blocked not auto granted.

## RewardGrantRecord

- Purpose: existing RewardGrantLedger receipt/view cho full payload, không independent award ledger mới.
- Required: canonicalGrantKey, operationId, sourceOccurrenceRef, pinnedManifestVersion, resolvedPayload/recipientRefs, expectedRevision, commitState, committedRevision/resultReceiptRef.
- Optional: resolvedRandomOutcomeOrSeed, inventoryDeliveryRefs, relatedCompletion/questProofRefs, migrationProvenance.
- Relationships: ExperienceGrantEvent components, inventory updates, UniqueRewardClaim projection, W07 logical bundle.
- Ownership: existing single reward/world writer; atomic with recipient/inventory/claims/outcome.
- Validation: one key one payload, same ID conflict visible; no partial XP/item grant, feedback read-only.
- Persistence: durable payload/receipt same commit; retained result serves retry/load rather than re-execution.
- Migration: preserve logical identity across versions/aliases, backup/provenance, no reward replay from renamed table.

`canonicalGrantKey` là source-level reward identity, cùng logical identity với `canonicalSourceRewardKey` của UniqueRewardClaim; stable `grantId` trong W07/R03 tham chiếu nguồn này. Recipient-level grant key `grantId + recipientId` chỉ định danh allocation component trong cùng receipt. Tra source receipt trước recipient component, commit source/payload/toàn bộ allocations và recipient updates cùng writer/revision; không tạo ledger riêng cho mỗi view. Mapping này theo [reward identity contract](../economy/REWARD_CONSISTENCY.md), không thêm fields, recipients hoặc EXP distribution rules.

## ResourceDefinition

- Purpose: catalog semantics của actual consumable category nếu approved, không inventory balance.
- Required: resourceId/version, provenance/sourcePermissionRefs, purpose/sinkRefs, itemKind, unit/stackPolicyRef, scarcityPolicyRef, questProtectionPolicyRef, consumptionRuleRef, compatibilityStatus.
- Optional: deterministicReacquisitionRef, protectedReplacementRef, feedback/localizationRefs, evolutionRequirementUsageRef.
- Relationships: reward entries, InventoryRecord, V13 possess/acquired/spend rule (không đồng nghĩa).
- Ownership: resource catalog; memory/observation proofs remain existing fact owners, not resource definitions by default.
- Validation: no sinkless loot, no cast→loot→resource loop, no expendable required unique key without repair route; no final stack/cost values in draft.
- Persistence: references/version, balances ở inventory domain only.
- Migration: aliases merge once preserving quantities/ownership/protection, removed resource needs explicit replacement or preserved entitlement, no arbitrary coin compensation.

## InventoryRecord

- Purpose: proposed canonical player material ownership/balance domain nếu slice cần, not final UI.
- Required: inventoryOwnerRef, schema/contentVersion, canonicalResourceBalances, retainedUndeliveredEntitlements, reservationRefs, protectedPurposeRefs, revision.
- Optional: capacityPolicyRef, deliveryOperationReceipts, migrationQuarantineRefs.
- Relationships: ResourceDefinition/RewardGrantRecord, source/world consumers; no species XP/skill/memory copies.
- Ownership: player inventory domain under same durable writer; entitlements are locations in same ownership record, not second loot store.
- Validation: nonnegative finite integer units, balance+undelivered conservation, no unit in two locations, available unreserved check, no quest item discard/optional spend.
- Persistence: balances/retained ownership/reservations requiring recovery atomic with grant/spend/effect; capacity full không discard grant.
- Migration: canonical aliases idempotent, input backup/output validate, unknown preserve/quarantine; no downgrade overwrite future saves.

## UniqueRewardClaim

- Purpose: projection/lookup của committed unique grant identity, không second mutable claimed table authority.
- Required: canonicalSourceRewardKey, existingGrantReceiptRef, sourceLogicalIdentityRef, payloadVersionRef, committedRevision.
- Optional: historicalAliasRefs, deliveryStateProjectionRef (khác claim completion).
- Relationships: RewardGrantRecord/W07 completion/quest proof, inventory entitlement delivery.
- Ownership: existing ledger receipt authority; query reconstructs claimed status.
- Validation: consume/drop item không reset claim; different recipient/version không create new first-clear key; claimed ownership khác visible bag delivery.
- Persistence: receipt durable, projection disposable/index được rebuild và revision checked.
- Migration: canonical key/aliases giữ provenance, no new claim on rename, unknown proof không auto unclaimed/rewarded.

## ProgressionCatchUpPolicy

- Purpose: content rule cho milestone foundation, không player shared level hoặc XP currency.
- Required: policyId/version, durableMilestonePredicateRef, eligibleSpeciesRuleRef, foundationCurveThresholdRef, topUpPolicyRef, applicationBoundaryRef, noHeal/noUnlockPolicyRef, receiptIdentityPolicyRef, approvalStatus.
- Optional: authoredPracticeSourceRefs, later multiplier/share alternativeRefs not active defaults.
- Relationships: R03/W07 milestone facts, CreatureProgression/curve, ExperienceGrantEvent top-up component.
- Ownership: catalog policy; eligibility derived, applied species delta in existing ledger/progression.
- Validation: max(existingXP,floor), all unlocked species same eligible milestone policy, no strongest-level copy/passive reserve/multiplier stack; no grant mastery/evolution.
- Persistence: milestone proof existing owner, per-species receipt/delta durable same unit, no separate catch-up XP balance.
- Migration: policy update explicit delta/adoption rules, old receipts no repeat; floor version not new entitlement key just to award again.

## Validation và migration handoff

Runtime-ready definitions resolve typed IDs/modules/curve/eligibility/recipient/budget/capacity/persistence/approval; missing essential rules fail, không production fallback. New creature references same progression/curve/growth/skill/mastery/resonance/habitat contracts, mechanics mới qua reusable module review D39. Nonplayable species không bắt level profile; newly playable cần valid curve trước activation, records owned vẫn preserve.

One writer candidate includes full reward/spend/outcome set, revision checks và canonical identities. Migration input immutable/backup, versioned aliases (typed namespaces stage/skill có thể cùng chuỗi), output validate rồi promote; unknown future data preserved/read-only/quarantine, không execute arbitrary saved effects hoặc zero-out species. UI settings namespace tách. No runtime/save files changed Task15. Storage adapter/atomic implementation/error UX/loss budget P15-U09 cần approval; not a guarantee browser storage cannot be user-cleared.
