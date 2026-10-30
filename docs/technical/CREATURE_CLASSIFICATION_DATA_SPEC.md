# Creature classification — conceptual data specification

**PROPOSED K11-P11**, trung lập implementation, không code/loaders/JSON. [R03 data](RESONANCE_DATA_MODEL.md), [C04 species](CREATURE_DATA_SPEC.md), [F06 behavior](FACTION_ENEMY_DATA_MODEL.md), [E09](ELEMENTAL_DATA_SPEC.md), [E10](DUAL_ELEMENT_DATA_SPEC.md) và [W07](PERSISTENT_WORLD_DATA_SPEC.md) giữ authority hiện hữu. Các tên mới là extensions/views/references, không chín stores bắt buộc.

## `CreatureSpecies`

| Field | Contract |
| --- | --- |
| Purpose | Entity gốc R03/C04, một species identity |
| Required fields | speciesId, displayName, contentVersion, classification metadata refs, elementProfileRef, isPlayable, stage definition refs |
| Optional fields | formId khi playable, rarityRef theo approved policy, narrativeDesignationRefs, habitat refs, visualAssetReferences |
| Relationships | CreatureClassification/EvolutionLineage/E09 CreatureElementProfile; creatureId alias speciesId |
| Validation | Unique stable ID, không stage/skin/pairId thành species, playable có required form/actions |
| Ownership/persistence | Creature catalog owner; save chỉ stable references và existing progression/records, không copy mutable catalog |
| Compatibility Tasks09–10 | E09/E10 element profile giữ owner; không direct role→element/resistance hoặc dual→rarity |
| Migration | Version/aliases không reset XP; source metadata preserved, no arbitrary remap |

## `CreatureClassification`

| Field | Contract |
| --- | --- |
| Purpose | Metadata extension/view cùng species catalog, không identity store mới |
| Required fields | classificationRef, speciesRef, combatRoleRefs, explorationRoleRefs, narrativeScopeRefs, decisionRefs, contentVersion |
| Optional fields | stageRoleOverrides, rationaleRefs, rarityPolicyRef |
| Relationships | CreatureSpecies/RarityDefinition/roles/PlayabilityProfile/behavior refs |
| Validation | Rarity chính nằm CreatureSpecies.rarityRef; element/playable/stages là refs/projections không duplicate values; role evidence hợp lệ |
| Ownership/persistence | Species catalog sở hữu metadata, effective stage classification derived; không saved mutable currentRole |
| Compatibility Tasks09–10 | Đọc element/stage profiles E09/E10, no formula override |
| Migration | Recompute labels từ catalog version, pin boss config; không cấp skill vì label đổi |

## `RarityDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Nghĩa nhãn sưu tầm, không balance modifier |
| Required fields | rarityId, displayName, discoveryRationale, applicabilityPolicy, approvalStatus, contentVersion |
| Optional fields | presentationCueRefs, legacyAliases, localizationRefs |
| Relationships | CreatureSpecies.rarityRef/CollectionEntry projection |
| Validation | Model/tiers chưa approved thì draft; no stat/XP multiplier, unknown/not_applicable đúng scope |
| Ownership/persistence | Content registry; save resolved refs/version chỉ nếu cần provenance, không rarity XP record |
| Compatibility Tasks09–10 | Single/dual và status không quyết tier |
| Migration | Alias chỉ semantic-equivalent với approval; unsupported legacy preserved không Rainbow→Epic tự động |

## `CombatRoleDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Taxonomy tactical purpose, primary/hybrid/tag rules |
| Required fields | roleId, purpose, strengths, constraints, abilityEvidenceRules, decisionStatus |
| Optional fields | specializationTags, synergyRefs, feedbackRefs |
| Relationships | CreatureClassification/skill catalog/stage config |
| Validation | No role forced on noncombat, two roles không hai full budgets; healer/mobility tag recommendation |
| Ownership/persistence | Catalog rules, stage effective view; no mutable player role progression |
| Compatibility Tasks09–10 | Ability attribution/status budgets ở E09/E10 không role override |
| Migration | Rename alias giữ historic notes, no skill grant/rebalance implicit |

## `ExplorationRoleDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Index capability/world interaction |
| Required fields | explorationRoleId, capabilityRefs, obstacleContexts, useConditions, safeReturnContract, decisionStatus |
| Optional fields | routeExamples, evolutionExpressionRefs, cueRefs |
| Relationships | MovementProfile/environmentAbilities/W07 route dependencies |
| Validation | Required theo route; deferredClimb/Burrow không main prereq; no optional species softlock |
| Ownership/persistence | Catalog; route status đọc W07, temporary effect owner cũ |
| Compatibility Tasks09–10 | Receiver/property E09 và source E10 compatible, không element-door shortcut |
| Migration | New role/module không reset old regions; obsolete route có validated alternative |

## `EcologicalBehaviorProfile`

| Field | Contract |
| --- | --- |
| Purpose | Reuse F06 CreatureBehaviorProfile dưới tên view yêu cầu, không taxonomy song song |
| Required fields | behaviorProfileRef, speciesOrActorScopeRef, habitatRuleRefs, behaviorPatternRefs, stabilityProfileRef nếu dùng, cognitionScope, decisionStatus |
| Optional fields | localDispositionOverrideRefs, factionMembershipRefs, feedingRoleRefs |
| Relationships | F06 CreatureBehaviorProfile/AssimilationProfile/E10 ElementalStabilityProfile/W07 ecology projection |
| Validation | Behavior/disposition/stability/faction/elite tách; species default không overwrite actor context |
| Ownership/persistence | F06 catalog owns definitions, unique actor outcome/condition ở existing owner; ordinary movement transient |
| Compatibility Tasks09–10 | Stable dual không forced assimilation, Wet không đổi behavior classification |
| Migration | Preserve actor history/refuge coverage, stabilization không tự species rename |

## `PlayabilityProfile`

| Field | Contract |
| --- | --- |
| Purpose | Requirements view của eligibility và content scope |
| Required fields | playabilityProfileId, speciesRef, supportedScopeRefs, acquisitionRouteRefs khi playable, contentReadinessRefs, decisionStatus |
| Optional fields | discoveryPolicyRef, futurePlayableProposalRef, missingGapRefs |
| Relationships | CreatureSpecies.isPlayable authority/ResonanceRecord/C04 animations |
| Validation | Không lưu boolean khác isPlayable; boss_only với playable cùng scope conflict; nonplayable không required form/XP/3skills |
| Ownership/persistence | Catalog refs; unlock/availability vẫn R03 owners, content readiness không grant facts |
| Compatibility Tasks09–10 | Same R03 requirements cho single/dual, no rarity capture override |
| Migration | Nonplayable→playable có approved route/ledger, previous discovery evidence giữ |

## `EvolutionLineage`

| Field | Contract |
| --- | --- |
| Purpose | View/extension ordered stages do C04 species stage definitions sở hữu |
| Required fields | lineageRef, speciesRef, orderedStageRefs, gateRuleRefs, continuityContract, contentVersion |
| Optional fields | variantClassificationRefs, futureStageProposalRefs, stageRoleOverrideRefs |
| Relationships | CreatureSpecies.evolutionStages/CreatureProgression/E10 ElementalEvolutionRule |
| Validation | Sacred đúng3, other counts targets; visual variant/status không stage; acyclic gates |
| Ownership/persistence | Catalog stage definitions duy nhất, save committedStageId/pending benefits trong progression |
| Compatibility Tasks09–10 | E10 fixed identity default proposal/exceptions approval, E09 skill/cast snapshot không hot swap |
| Migration | New stage chỉ eligibility, không auto evolve; unknown stage preserved, migration aliases/backup |

## `CollectionEntry`

| Field | Contract |
| --- | --- |
| Purpose | Read model từ R03 records, không collection save thứ hai |
| Required fields | speciesRef, catalogVersion, resonanceRecordRef nếu đã biết, visibilityPolicyRef, projectionRevision |
| Optional fields | progressionRef, memoryRefs, observationSourceRefs, accessibleHabitatProjectionRefs |
| Relationships | ResonanceRecord discoveryTier/observationFacts + CreatureProgression + AncestralMemoryRecord/W07 habitats |
| Validation | Presence/discovery/study/resonance/unlock/stage không đồng nhất; hidden unknown không spoiler; no kill-peaceful goal |
| Ownership/persistence | Durable facts existing records/ledger only; entry reconstructed, no duplicated discovery/unlock booleans |
| Compatibility Tasks09–10 | Element knowledge/confidence đọc approved catalog/evidence; skill expression/progression E09/E10 unchanged |
| Migration | Unknown refs opaque preserve; expanded collection scope/version có explicit completion policy, no reward replay |

## Single-source ownership / invalid duplication

SpeciesId/name/form eligibility/rarity/stage definitions ở CreatureSpecies catalog theo R03/C04; E09 CreatureElementProfile giữ affiliation/skill/resistance refs; K11 classification chỉ bổ sung role/narrative metadata và trỏ các nguồn. Species default role và per-stage override là catalog inputs, effective current role derived, không biến role thành skill unlock. isPlayable trong CreatureSpecies khác `unlocked` trong ResonanceRecord/grant ledger, khác `availableNow` progression/context; không PlayabilityProfile boolean thứ hai. EvolutionLineage là view stage definitions, EcologicalBehaviorProfile alias/view CreatureBehaviorProfile, CollectionEntry projection ResonanceRecord. Rarity default refs không duplicate independently mutable ở classification/slot/collection.

Collection knowledge facts ở R03, XP/stage/skills ở progression, memory ở memory record; local disposition/important stability ở F06 actor/quest authority, habitat phase ở W07 projection. Important grant/completion/evidence cùng logical transaction với ledger theo W07, UI entry không write gameplay facts. No save every ambient organism/movement/particle. Catalog additions versioned không tự unlock new content hoặc invalidate old completion; completion-scope version policy K11-U06 phải chọn trước achievements/collection completion implementation.

## Validation K11V01–K11V10

1. K11V01 canonical species/form/stage IDs/refs unique, legacy aliases resolve không tạo progression mới.
2. K11V02 rarity/role/ecology/element/playability/narrative/stage axes tách, no rarity damage multiplier.
3. K11V03 Model/tiers/status approved trước production; missing/unknown/not_applicable policy explicit.
4. K11V04 Sacred4 identities/affiliations và3stages giữ, Life không ordinary combat element.
5. K11V05 roles có ability/capability evidence và stage gate, hybrid không double budgets.
6. K11V06 nonplayable/ambient không bị ép full player controller/3skills/XP/stages.
7. K11V07 collection projection không double-save facts, discovery không auto unlock/kill gate.
8. K11V08 restoration/migration giữ alternate habitats/prior proof/revisit và progression records.
9. K11V09 loadout boss membership locked, no-three/dual/rarity gate cho early main content; entry details pending.
10. K11V10 runtime-ready cần approved source/action/module/assets và migration, draft status honest.

Future species thêm qua catalog/role/capability/skills/resonance/animation/habitat definitions và reusable modules; genuinely new mechanics cần module/validation riêng. Không branch core theo speciesId hoặc rarity. Browser-first giữ actual stack Canvas2D/ES modules, không chốt engine/storage library/packaging/performance budgets. Chưa có implementation validator hoặc migration runtime trong Task11.
