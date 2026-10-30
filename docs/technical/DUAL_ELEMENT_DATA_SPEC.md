# Dual-element conceptual data specification

**PROPOSED E10-P09**, không code/class/loader/production JSON. [E09 data](ELEMENTAL_DATA_SPEC.md) giữ authorities hiện hữu; [C04 species](CREATURE_DATA_SPEC.md), [R03 progression](RESONANCE_DATA_MODEL.md), [F06](FACTION_ENEMY_DATA_MODEL.md) và [W07 save](PERSISTENT_WORLD_DATA_SPEC.md) không bị thay store.

## `CreatureElementProfile`

| Field | Contract |
| --- | --- |
| Purpose | Mở rộng cùng entity E09, không tạo bản sao |
| Required fields | speciesId, profileVersion, elementRefs, skillRefs, resistanceProfileRef, movementProfileRef, decisionStatus |
| Optional fields | primordialAuthorityRef, perStageOverrides, pairDefinitionRef, stabilityProfileRef, sensoryCueRefs |
| Validation | 1 hoặc2 distinct registered refs, Sacred affiliations cố định, Life authority riêng; draft không runtime-ready |
| Relationships | CreatureSpecies/CreatureProgression/E09 AttackProperties |
| Ownership/persistence | Creature catalog; save progression giữ refs/version/stage, không slot element copies |
| Migration | Alias/profile migration giữ speciesId/XP; ordered legacy giữ provenance |

## `ElementPairDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Vocabulary/constraints cho một cặp, không species hoặc damage table |
| Required fields | pairId, memberElementRefs, canonicalizationVersion, allowedExpressionRefs, decisionStatus |
| Optional fields | ecologyBriefRef, presentationOrder, reviewNotes |
| Validation | Đúng2 distinct refs, canonical membership unique; presentation không gameplay hierarchy |
| Relationships | ElementDefinition/CreatureElementProfile |
| Ownership/persistence | Content catalog; save ref chỉ khi cần frozen config, không duplicate species state |
| Migration | Giữ pair aliases/version; thêm pair không rewrite unrelated species |

## `ElementalAbilityProfile`

| Field | Contract |
| --- | --- |
| Purpose | Composition wrapper cho skill, AttackProperties vẫn sở hữu từng hit |
| Required fields | abilityProfileId, skillRef, category, componentAttackRefs, sourceSnapshotPolicy, releasePolicy, budgetPolicy, validationStatus |
| Optional fields | internalReactionPolicy, statusApplicationRefs, animationMarkerRefs, environmentPermissionRefs |
| Validation | Component attribution resolve; budget không clone; single vẫn1 declared element, missing required clip chặn release-ready |
| Relationships | E09 AttackProperties/SkillDefinition/ElementalReactionContext |
| Ownership/persistence | Skill catalog; runtime immutable cast snapshot transient, accepted HP/cost theo existing owner |
| Migration | Version pin released casts; renamed skills aliases không replay grants |

## `DualElementResistanceProfile`

| Field | Contract |
| --- | --- |
| Purpose | Constraint/composition view của E09 ElementalResistanceProfile, không defense store thứ hai |
| Required fields | compositionRuleId, resistanceProfileRef, speciesProfileRef, causeGroupPolicy, counterplayContract, approvalStatus |
| Optional fields | phaseConstraints, temporaryProtectionRefs |
| Validation | Không sum/product automatic; same cause normalize; immunity scoped và main-form route tồn tại |
| Relationships | E09 ElementalResistanceProfile/ElementalAffinity/DamageChannel |
| Ownership/persistence | Content rules; actual responses đọc E09 owner, save chỉ frozen refs nếu cần |
| Migration | Alias rules và config version, không invent default multiplier khi thiếu |

## `ElementalStabilityProfile`

| Field | Contract |
| --- | --- |
| Purpose | Quy tắc evidence/stability tách identity, reuse F06 assimilation |
| Required fields | stabilityProfileId, assimilationProfileRef, evidenceRules, sourceTriggerRefs, recoveryRuleRefs, decisionStatus |
| Optional fields | symptomCueRefs, cognitionConsentEvidenceRefs, managedConditionRefs |
| Validation | Stable không sạch ngoại lai; status không auto assimilation, không guaranteed recovery/resurrection |
| Relationships | F06 AssimilationProfile/actor record/RegionEcologyState projection |
| Ownership/persistence | Catalog sở hữu rules; current individual condition ở actor/quest owner F06/W07, không new global corruption meter |
| Migration | Giữ originProcess/history khi ổn định; unknown evidence preserved, không auto chuyển affinity |

## `ElementalReactionContext`

| Field | Contract |
| --- | --- |
| Purpose | Input snapshot/runtime arbitration cho E09 reactions |
| Required fields | contextId, rootCastId, acceptedComponentRefs, targetOrReceiverRef, inputTokenRefs, contextRevision, priorityGroupRef, budgetRef, reactionLedgerRef |
| Optional fields | preStatusSnapshot, internalReactionPolicyRef, environmentalSourceRefs |
| Validation | One primary perroot/target/group recommendation, token once, outputs nonreactive, bounded local paths |
| Relationships | E09 ElementalReaction/StatusEffectInstance/EnvironmentalElementContext |
| Ownership/persistence | Runtime snapshot/ledger theo attempt; permanent result chỉ W07 completion, không save half-hit |
| Migration | Pending intents không replay; accepted outcomes/obligations theo E09/W07 version boundary |

## `ElementalEvolutionRule`

| Field | Contract |
| --- | --- |
| Purpose | Điều kiện thay expression/profile, không progression store mới |
| Required fields | ruleId, speciesRef, fromStageProfileRef, toStageProfileRef, eligibilityRefs, commitPolicy, migrationPolicy, approvalStatus |
| Optional fields | exceptionalIdentityChangeProofRef, variantClassificationRef, animationGapRefs |
| Validation | Default fixed identity; exception approved riêng; safe clearance/no boss hot swap, no duplicate stage slots |
| Relationships | CreatureProgression/C04 evolutionStages/CreatureElementProfile/W07 transactions |
| Ownership/persistence | Content catalog rule; progression owner lưu committed stage/config/proof, pending eligibility nếu policy duyệt |
| Migration | Stage/profile aliases và backup; migration không reset XP/cấp form lần nữa |

## Quan hệ và readiness

Species → CreatureElementProfile → ElementDefinition/optional ElementPairDefinition; skills → ElementalAbilityProfile → E09 AttackProperties; resistance composition → E09 ElementalResistanceProfile; individual stability → existing F06 actor condition; evolution → existing progression transaction. ReactionContext dùng snapshot refs, không viết catalog, XP hoặc region phase. Không bắt single species có pairDefinitionRef hoặc combined skill.

Catalog có version/status và gaps; runtime-ready yêu cầu approved rules/modules, source permissions, actual animation/receiver refs, valid budgets/counterplay và migrations. Không numeric fallback cho missing resistance. Thêm species là profiles/skills/movement/resonance/assets/habitat refs, genuinely new mechanic cần reusable module/validator; không branch theo species name. Thêm element tương lai cần explicit approval, vocabulary/matrix/counterplay/migration review, không tự registry hóa Earth.

Save authoritative: existing progression stage/config/XP/skill/grant ledger; unique actor stability nếu cần persistence; W07 completion/object settings; optional minimal E09 status obligation chỉ sau approval. Derived: pair membership key, display order, count/rarity inference (không dùng), projected phase. Không lưu same truth ở CreatureElementProfile và từng loadout slot như hai mutable sources. Browser-first không chọn storage library/engine mới; storage quotas/error UX/migration backup vẫn technical gate.

## Validation checklist — E10V01–E10V10

1. E10V01: six refs resolve, cardinality/uniqueness hợp lệ, Life authority tách.
2. E10V02: species/profile/stage/variant identity ổn định, presentation order không formula.
3. E10V03: skill components attribution/budget/release markers rõ, optional combined không bắt buộc.
4. E10V04: một resistance owner/cause group, no blanket double immunity.
5. E10V05: reaction priority/token/ledger/bounded graph/non-reactive output rõ.
6. E10V06: status scope/source/expiry và switch snapshot theo E09, không reserve exploit.
7. E10V07: evolution commit/migration atomic, boss frozen config, progression không nhân đôi.
8. E10V08: stability/history/consent riêng, recovery không auto affinity/collectible grant.
9. E10V09: habitat coverage/quest proof/return route qua W07, no dual mandatory main gate.
10. E10V10: assets/module/version readiness honest, unknown metadata quarantine/provenance, no invented runtime tests.
