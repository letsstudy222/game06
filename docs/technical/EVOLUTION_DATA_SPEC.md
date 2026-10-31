# Evolution data specification — trung lập triển khai

**PROPOSED V13-P12**, không class/loader/production JSON. [R03](RESONANCE_DATA_MODEL.md), [C04](CREATURE_DATA_SPEC.md), [E09](ELEMENTAL_DATA_SPEC.md), [E10](DUAL_ELEMENT_DATA_SPEC.md), [K11](CREATURE_CLASSIFICATION_DATA_SPEC.md), [B12 pipeline](CREATURE_CONTENT_PIPELINE.md) và [W07](PERSISTENT_WORLD_DATA_SPEC.md) giữ authoritative owners. [State machine](EVOLUTION_STATE_MACHINE.md) mô tả logical transaction/recovery, không engine đã có.

## `SpeciesEvolutionDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Contract/view mở rộng evolutionStages của CreatureSpecies C04, không species catalog thứ hai |
| Required attributes | speciesId; lineageRef; orderedStageRefs; transitionRequirementRefs; progressionRuleRef; contentVersion; decisionRefs |
| Relationships | C04 species/evolutionStages, K11 EvolutionLineage, E10 ElementalEvolutionRule |
| Validation | Sacred đúng3; refs resolve/gates acyclic; Stage I acquisition root không yêu cầu form có trước; future branching chỉ nếu approved riêng |
| Persistence | Catalog sở hữu definitions; save refs/version trong record hiện hữu, không copy entire definition |
| Save migration | Stage/lineage aliases có provenance, giữ formId/XP; không contentVersion thành reward key |

## `EvolutionStageDefinition`

| Field | Contract |
| --- | --- |
| Purpose | Extension của stage record C04: anatomy/capability và stage-specific config |
| Required attributes | stageId; speciesRef; displayNameRef; anatomyBriefRef; movementProfileRef; skillEligibilityRefs; environmentCapabilityRefs; visualAssetRefsOrGaps; contentStatus |
| Relationships | C04 stage/abilities/animationDefinitions; E09 element/attack profiles; K11 role projection |
| Validation | Không scale/recolor only; owned skills khác eligible skills; required assets/module missing thì draft; Sacred affinity giữ |
| Persistence | Catalog stage duy nhất; progression chỉ committedStageId và pinned config nếu policy cần |
| Save migration | Rename display không stageID đổi; removed/split stage cần explicit mapping, không default stage I |

## `EvolutionRequirement`

| Field | Contract |
| --- | --- |
| Purpose | Predicate có evidence, hint và alternatives theo content author |
| Required attributes | requirementId; kind; predicateRef; evidenceOwnerRef; requiredOrOptional; persistenceClass; discoveryHintRef; ruleVersion |
| Relationships | Level/mastery records R03; memory/quest/world facts; optional future inventory owner nếu approved |
| Validation | No exact threshold mặc định; volatile source/placement khác durable proof; anyOf explicit; no optional species hidden main gate |
| Persistence | Content rule, proof ở owner cũ; requirement service không copy independently mutable level/memory flags |
| Save migration | Requirement change versioned; recognize old valid proofs theo explicit policy, không bắt replay irreversible event |

## `EvolutionEligibility`

| Field | Contract |
| --- | --- |
| Purpose | Read model điều kiện target, không state authoritative riêng |
| Required attributes | subjectSpeciesRef; targetStageRef; requirementEvaluationRefs; sourceRevision; catalogVersion; availabilityReasons |
| Relationships | Existing progression/ResonanceRecord/AncestralMemoryRecord/W07 proofs/EvolutionRequirement |
| Validation | Derived LOCKED/PARTIAL/ELIGIBLE, availability overlay; no cache dùng như proof sau source revision đổi |
| Persistence | Reconstruct; optional cache disposable gắn revision; source facts durable ở owners |
| Save migration | Discard stale cache, re-evaluate refs; unknown requirements giữ evidence và gap, không auto grant |

## `CreatureProgressionRecord`

| Field | Contract |
| --- | --- |
| Purpose | Alias/view của CreatureProgression R03, giữ same formId owner |
| Required attributes | formId; speciesRef; XP; derivedLevelRuleRef; committedStageId; unlockedSkillIds; masteryObjectiveRefs; pendingBenefits; HP/cooldown/availability refs theo R03 |
| Relationships | CreatureSpecies/formId, existing progression, loadout refs, stage catalog |
| Validation | Một progression theo species/form; không mỗi stage/slot một XP bar; HP0 không evolve revive; no skill loss |
| Persistence | Durable existing record; transition atomic patch cùng ledger, level derived từ XP/curve version |
| Save migration | Stable formId, aliases và old unknown data preserve/backup; no XP reset/regrant vì stage/skill rename |

## `EvolutionUnlockRecord`

| Field | Contract |
| --- | --- |
| Purpose | Projection/receipt của existing grant ledger và evolution/acquisition commit outcome |
| Required attributes | logicalUnlockKey; speciesRef; canonicalTargetStageRef; sourceOperationRef; proofRefs; committedRevision; payloadRef |
| Relationships | RewardGrantLedger R03/W07, progression committed stage, S05 awakening subgrant cho Stage I |
| Validation | No second grant authority; same key conflicting payload reject; version bump không reward mới; advanced stage vẫn giữ receipt bước trước |
| Persistence | Save ledger/commit receipt tại existing owner; view dựng từ đó, không duplicate completed boolean |
| Save migration | Alias giữ original logical key; legacy owned stage thiếu receipt cần migration proof/marker no reward replay, không giả đã test |

## `EvolutionAssetManifest`

| Field | Contract |
| --- | --- |
| Purpose | View/spec của C04 animationDefinitions và manifest B12 theo target stage |
| Required attributes | manifestRef; stageRef; actualAssetRefsOrGapRefs; actionDirectionRefs; anchorTimingMarkerRefs; geometryContractRefs; validationEvidenceRefs; contentStatus |
| Relationships | Existing creature asset manifest, asset register, C04 art gaps, B12 approval records |
| Validation | Actual paths khi có; concept không atlas; required action không missing/idle fallback; collision solutions vẫn proposal |
| Persistence | Versioned content refs, no save every frame; stage ready projection theo evidence/approval |
| Save migration | New art revision compatibility review, old supported config refs giữ; missing future asset không xóa owned stage/XP |

## `EvolutionTransitionState`

| Field | Contract |
| --- | --- |
| Purpose | Intent/commit-boundary contract cho explicit safe transition, phối hợp arbiter R03 |
| Required attributes | operationId; subjectFormId; speciesRef; fromStageRef; toStageRef; expectedRevision; pinnedCatalogVersion; phase; reservationRefs; checkpointPlacementRef; commitReceiptRef nếu committed |
| Relationships | TransformationState/EncounterLockState existing arbiter, progression/ledger writer W07, eligibility view |
| Validation | Một body-affecting transition tại boundary; subject không đổi theo active; no boss execution theo proposal; atomic costs/placement/stage/outcome |
| Persistence | Durable intent/receipt; animation cursor/presentation derived, không second currentStage; cancel precommit no grant |
| Save migration | Old intent unsupported giữ provenance và last good save; abort/re-evaluate precommit, postcommit reconstruct không replay payload |

## Authority map và dependencies

C04 CreatureSpecies.evolutionStages sở hữu stage definitions; SpeciesEvolutionDefinition/EvolutionStageDefinition chỉ extensions/views; K11 EvolutionLineage không stage list mutable thứ hai. R03 CreatureProgression giữ committedStageId/XP/skills/HP/cooldowns, CreatureProgressionRecord không save schema cạnh tranh. Requirement refs đọc facts; Eligibility derived. Existing grant ledger và committed transaction receipt sở hữu unlock outcome; EvolutionUnlockRecord không reward store độc lập. AssetManifest refs đọc existing manifest/register, không production file tạo mới; TransitionState giữ intent/pinned revisions, không independently mutable currentStage.

Element expression qua E09/E10 profile refs, không save “current elements” ở từng slot. Two-element stage expression tăng không new affinity mặc định. Memory/quest/actor stability/world phases giữ owners Task03–07; collection vẫn projection K11, không evolution summary ghi đè discovery/unlock. Material inventory/reservation là dependency future nếu được duyệt, Task13 không tự tạo currency hoặc inventory system.

## Save/version/migration contract

SchemaVersion/contentVersion/committedRevision/generation và backup theo W07. Một atomic unit áp stage/config, required skill mapping, subject placement, resource/material policy nếu approved, receipt và ledger; giữ XP/evidence/known skills. No callback UI/animation tự grant. Save chưa acknowledge không reported completed; precommit giữ last valid facts, postcommit restore accepted outcome một lần. Offline clock không tự evolve hoặc heal. Storage/namespace riêng gameplay chưa chọn, không chạm settings key.

Aliases stage/skill/species phải một nghĩa, versioned và không vòng. Stage rename map cả requirements, profiles, save references và grant logical identity; duplicate old/new aliases không thêm progression slot/grant. Split/removed stages có migration được review, giữ backup/orphan evidence, không tự giảm XP hoặc chọn branch. Legacy save có owned stage nhưng thiếu receipt: chỉ tạo migration marker từ validated existing proof theo approved migration, không trả thưởng hoặc charge lại. Unknown IDs/config mới hơn giữ opaque trong safe scope, không execute unsupported effects hoặc ghi downgrade lên bản mới.

Catalog thêm species/stage: defaults chưa unlocked, old species không reset; target new stage chỉ eligible khi rule đã duyệt và source thật. Một stage thêm không đòi rewrite core theo species name, dùng profile/module refs; movement mới thật sự có thể cần reusable module/validator/animation và physics tests. Browser-first Canvas2D/ES modules hiện hữu không tự có generic evolution loader/saver, chưa chọn engine/database/PC packaging hoặc performance budget mới.

## EV13 validation expectations

| ID | Invariant cho validator tương lai |
| --- | --- |
| EV13-01 | IDs resolve/unique, species/form identity ổn định, Sacred4×3; aliases acyclic |
| EV13-02 | Requirement graph không bootstrap cycle hoặc hidden optional-species/three-slot gate |
| EV13-03 | Durable proof/volatile availability tách; derived eligibility cache có revision |
| EV13-04 | Same progression owner; level/skill/evolution/mastery khác nhau, no rarity damage rule |
| EV13-05 | Safe intent fixed subject, no concurrent transform/body commit, boss policy chưa autoapproved |
| EV13-06 | Stage/config/placement/spend/receipt/ledger atomic, replay idempotent, no contentVersion reward identity |
| EV13-07 | Required asset/module/markers/geometry ready, C04-P07 prototype gate, no fake references |
| EV13-08 | XP/skill/evidence/HP/status obligations giữ đúng approved policy; no free heal/cooldown reset |
| EV13-09 | Migrated IDs/grant identity/unknown records preserve, no stage/affinity downgrade ngầm |
| EV13-10 | Old utility/revisit/collection coverage và early available main-form routes còn viable |

Đây là conceptual validations, chưa có runtime validator hoặc save migration được viết/chạy ở Task13.


## Typed references, không rename existing identifiers

C04 có stageId `quy_s1` và skillId `quy_s1` trong hai registry khác nhau. Task13 đề xuất refs có type/registry scope (stageRef so với skillRef) để disambiguate, unique trong đúng registry; không global string uniqueness rồi rename stage/skill làm mất save. Tương tự các suffix s2/s3 của Sacred cần typed lookup, không suy skill unlock từ stageId string trùng. Namespaces/serialization actual sẽ do technical task duyệt; labels ở đây không tạo runtime IDs mới hoặc sửa existing ability definitions.
