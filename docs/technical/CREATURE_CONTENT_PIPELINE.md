# Creature content pipeline — implementation-trung lập hand off

**PROPOSED B12-P11**, không loader/classes/schema executable/production JSON. [C04 data](CREATURE_DATA_SPEC.md), [E09](ELEMENTAL_DATA_SPEC.md), [E10](DUAL_ELEMENT_DATA_SPEC.md), [K11](CREATURE_CLASSIFICATION_DATA_SPEC.md), [R03](RESONANCE_DATA_MODEL.md) và [W07](PERSISTENT_WORLD_DATA_SPEC.md) giữ nguồn authorities. Actual stack Canvas 2D/ES modules/browser first, không chọn engine/storage mới từ entity names.

## Twelve hand off steps

| Step | Input → output / owner | Gate / failure handling |
| --- | --- | --- |
| 1 Phê duyệt thiết kế | Brief, nguồn và tham chiếu → đánh giá theo phạm vi bởi vai trò art/narrative/gameplay/content | Tên bên ngoài chưa là loài đã duyệt; giữ revision, lý do và phần thiếu. |
| 2 Gán stable ID | Thiết kế đã duyệt → dùng speciesId có sẵn hoặc gán ID duy nhất theo chính sách catalog | Khóa tham chiếu nháp không tự là speciesId; giữ aliases và danh tính save. |
| 3 Kiểm nguyên tố/vai | Hồ sơ E09/E10/K11 và bằng chứng → cấu hình được duyệt cho phạm vi chọn | Sáu nguyên tố, Life riêng; không tự thêm Earth hoặc suy power từ rarity/tier. |
| 4 Đặc tả manifest | Tệp nguồn/xuất thực có hoặc gap → yêu cầu manifest theo hành động/hướng | Đường dẫn, rect, alpha và provenance phải kiểm; Task12 không tạo JSON sản xuất. |
| 5 Đặc tả animation | Danh sách hành động và anatomy → frame/timing/anchor/marker/cancel | Thiếu clip bắt buộc thì chưa sẵn sàng; fallback chỉ khi đã duyệt tương thích. |
| 6 Gán skill refs | Cơ chế riêng của loài → skill/profile và module tái dùng | Không rẽ nhánh core theo tên loài; cơ chế mới thực sự cần công việc module riêng. |
| 7 Đặc tả progression | Gates của stage/skill → refs đến luật R03/C04 | Tiến trình riêng; không cộng XP theo tier/rarity; ngưỡng vẫn cần duyệt. |
| 8 Gán sinh cảnh | Mười trường ecology → habitat/coverage/context W07 | Nguồn, ngưỡng chịu đựng, nơi trú và đường về phải còn cho cả loài chưa discovered. |
| 9 Điều kiện resonance | Eligibility, nguồn còn khả dụng, tương hợp và route → requirements R03 | Không mọi organism playable; thắng boss hoặc giết không tự mở dạng. |
| 10 Tích hợp runtime | Subset/module/asset đã duyệt → công việc adapter trong task code sau | Phoenix hiện tại còn hardcoded; tài liệu này không triển khai catalog/controller mới. |
| 11 Validation tự động | Registry/manifest/rules → kiểm ID/refs/bounds/markers/ownership/dependencies | Task12 chưa viết validator runtime; lỗi thiết yếu chặn release, giữ lịch sử. |
| 12 Kiểm thử gameplay | Revision đã tích hợp → bằng chứng playback/combat/nav/status/save/collection | Ghi platform/scope/version; kiểm Markdown không chứng minh gameplay. Phê duyệt sản xuất sau đủ bằng chứng. |

Art blocking/prototypes trong task tương lai có thể lặp giữa steps, nhưng named thiết kế phê duyệt không tự approve runtime. Integration giữ old content tới khi migration/readiness đủ, không phá existing Phoenix để ép standard mới.

## Seven entity contracts

### `CreatureDesignRecord`

| Field | Contract |
| --- | --- |
| Purpose | Brief/provenance/tham chiếu bản ý tưởng trước đã duyệt species, không catalog identity mới |
| Required fields | designRecordId, sourceRefs, revision, primaryConcept, templateRef, decisionStatus |
| Optional fields | speciesRef sauapproved, externalReferenceLabel, comparatorRefs, supersedesDesignRevisionRef |
| Relationships/authority | C04 CreatureSpecies là canonical; thiết kế record->existing species khi mapping đã duyệt |
| Validation | Draft refs không formId; unknown/còn thiếu field có gap; no copied XP/rarity truth |
| Persistence/migration | Design registry chỉ content/provenance, save game không every brief; species/record alias mapping migration cần phê duyệt |

### `CreatureVisualProfile`

| Field | Contract |
| --- | --- |
| Purpose | Visual grammar/planes/silhouette/scale requirements, extension C04 art brief |
| Required fields | visualProfileId, designRecordRef, bodyPlanRefs, anatomyBrief, silhouetteReviewRef, paletteMaterialBrief, version |
| Optional fields | stageRef/directionOverrides, visualEnvelopeProposalRef, conceptAssetRefs |
| Relationships/authority | C04 visualAssetReferences/animationDefinitions/asset register, không duplicate actualframecoords |
| Validation | Review small size/FXoff, no likenessclaim từ ảnh còn thiếu; approvals scoped version |
| Persistence/migration | Content catalog refs, không save sprite pixel state; changedvisual không species/XP rename |

### `CreatureMovementProfile`

| Field | Contract |
| --- | --- |
| Purpose | Brief/contract view của movementProfileC04, không controller thứ hai |
| Required fields | movementProfileRef, locomotionMethods, anatomyForceRefs, momentumTurnBrief, terrainConditions, cycleRequirements, limitations |
| Optional fields | specialCapabilityRefs, postureRefs, clearanceProposalRef |
| Relationships/authority | Reuse C04 movementProfile, module capabilities, K11 exploration refs |
| Validation | No giải phẫu-in compatible flight/burrow main feature, actual module/clip/return ready trước release |
| Persistence/migration | Catalog owns definition; runtime placement/context existing owner; version migration safe placement/checkpoint theo approved policy |

### `CreatureGameplayProfile`

| Field | Contract |
| --- | --- |
| Purpose | Design view của skills/traits/env/progression refs hiện hữu |
| Required fields | gameplayProfileId, speciesOrDesignRef, primaryMechanic, roleEvidenceRefs, skillRefs, counterplayContract, contentStatus |
| Optional fields | secondaryMechanic, progressionRef, environmentalReceiverRefs |
| Relationships/authority | C04 skills/R03 progression/K11 roles/E09AttackProperties/E10 composition |
| Validation | No direct stats từ tier/rarity, no role grant, skill budget/nguồn/receiver resolve |
| Persistence/migration | Catalog refs only, XP/HP/unlock existing owners; no double grants khi profileversion đổi |

### `CreatureAssetManifest`

| Field | Contract |
| --- | --- |
| Purpose | Conceptual asset/action manifest contract, không file JSON tạo mới |
| Required fields | manifestRef, assetRevision, actualAssetRefsOrGapRefs, frameDirectionActionDefinitions, anchorTimingRefs, provenanceRefs, contentStatus |
| Optional fields | stageRefs, mirroringRules, approvedFallbackRefs, clipTestEvidenceRefs |
| Relationships/authority | C04 animationDefinitions và actual manifest scope; reuse E09/E10 skill markers |
| Validation | No fake paths/rects/frames; missing required clip blocks readiness; bản ý tưởng≠atlas |
| Persistence/migration | Contentversion/pinnedrefs, save existing configuration nếu đã duyệt; migration không replacement random asset |

### `CreatureProductionStatus`

| Field | Contract |
| --- | --- |
| Purpose | Readiness projection theo scope/stage/action/version |
| Required fields | productionScopeId, designRecordRef, evidenceRefs, approvalRecordRefs, requiredGateRefs, projectionVersion |
| Optional fields | gapRefs, integrationEvidenceRef, testedPlatformRefs |
| Relationships/authority | Asset readiness source/CreatureApprovalRecord; không boolean approve thứ hai |
| Validation | Gate vector partial/legacy integration explicit, no highestlevel auto approve |
| Persistence/migration | Derived status reconstruct, evidence immutable append, no save player progress metadata; stale evidence mark ed outdated không delete history |

### `CreatureApprovalRecord`

| Field | Contract |
| --- | --- |
| Purpose | Approval/change history scope có evidence |
| Required fields | approvalRecordId, subjectRef/revision, decisionStatus, sourceEvidenceRef, scope, rationale, affectedRefs |
| Optional fields | supersedesApprovalRef, reviewRoleRefs, conditions/gapRefs |
| Relationships/authority | PROJECT_DECISIONS source authority/creature catalog/thiết kế/assets; no new approval service code |
| Validation | CONFIRMED chỉ explicit phê duyệt/direct technical fact đúng type; proposal/rejection không accepted SUPERSEDED |
| Persistence/migration | Content decision audit append-only history conceptual; phê duyệt migration giữ old nguồn, không reset player progress |

## Ownership và backwards compatibility

Species identity/isPlayable/stages/rarity ref giữ C04/R03; element/resistance/attack/status giữ E09/E10; role metadata và CollectionEntry projection giữ K11; sinh cảnh/world completion/local actor facts W07/F06. DesignRecord/VisualProfile/GameplayProfile chỉ authored brief/refs, MovementProfile reuse old owner, AssetManifest contract references same assets, ProductionStatusderived từ evidence/phê duyệt records. Không progression/save/classification copy hoặc collision engine mới.

Rename species/displayname: ổn định ID/aliases, keep form XP/unlock/memory/nguồn/ledger; old removed ID opaque preservation/backup/explicit mapping, không grant new form hoặc wipe. New stage rule cần phê duyệt/assets/module/gates/clearance, pending boss configR03/E10 giữ; catalogs pinnedversion và migration after đã duyệt safe boundary. Additional regions/planets do content/sinh cảnh definitions, initial 16 thông thường không entiregamelimit. New element cần explicit cosmology approval/matrix/status/counterplay/migration audit, Earth historical metadata preserved UNRESOLVED không auto map. Save adapter/storage quota/recovery/error UX chưa được duyệt, không promise universal no code additions hoặc every species art reuse.
