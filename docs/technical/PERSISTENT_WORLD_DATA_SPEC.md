# Persistent world — conceptual data và save contract

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Không schema thực thi/JSON loader/save implementation. Web-first, không chốt storage library, engine hay database; cùng contract có thể adapter PC/mobile sau. [Authority](../world/WORLD_STATE_ARCHITECTURE.md), [transitions](../world/WORLD_STATE_TRANSITIONS.md) và [Task03 resonance data](RESONANCE_DATA_MODEL.md) là contracts liên kết. Stable identifiers dưới là PROPOSED.

## Mười entity contracts

| Entity / stable key | Purpose / fields | Relationships và owner | Persistence / validation / migration |
| --- | --- | --- | --- |
| GlobalProgressState / worldId | arcPhase, awakenedSpeciesIds/count, networkStatus, gatewayStatus, sourceRevision | Read model từ completion/sub-completion/resonance; không setter/count riêng | Reconstruct; optional cache có revision/catalogVersion, stale bỏ; thêm Sacred không tự đổi điều kiện arc cũ |
| ChapterProgressState / chapterId | entryAvailable, arrived, narrativePhase, awakeningStatus, crisisOutcomeRef, sourceRevision | Projection từ event definitions/completions và route proofs | Reconstruct; chapterId registry; không tự set chapterComplete để vượt thiếu evidence |
| RegionState / regionId | schemaVersion, revision, ownedVariantValues, relocationChoiceRefs, activeOperationRefs | Owner mutable thuộc region; không sở hữu milestone flags hoặc alias phase | Lưu mutable values cần thiết; validate write-set/coverage/nav; defaults versioned, variant rename mapping |
| WorldEventDefinition / eventId | chapterId, regionId, prerequisites, triggerRef, evidenceRules, writeSet, rewardManifestRef, safePlacementPolicy, retryPolicy | Catalog content owner; tham chiếu quest/caps/habitat; không quest code | Catalog không lưu nguyên bản mỗi save; pin contentVersion/outcome schema; DAG + all refs valid |
| WorldEventCompletion / saveId+eventId+targetId | completionId, subCompletions, outcome, proofRefs, committedRevision, operationId, grantedPayloadRefs | Owner irreversible facts; event definition/rules; outcome có variant hợp lệ | Lưu; monotonic main facts, no unknown completion; aliases map khi rename, không tự tạo reward mới |
| LocalObjectState / objectId | ownerRegionId, revision, mutableSetting hoặc uniqueOutcomeRef, checkpointAnchorRef khi cần | Chỉ owns setting không do region/event khác owns; boss/memory refs không boolean copy | Lưu setting độc lập/unique refs cần; static door display derived không lưu; object relocation giữ ID |
| CreatureHabitatRule / habitatRuleId | speciesId, primary/secondary habitats, behaviorProfileRef, requirements, predicates, fallbackRef, uniqueEncounterRef | Catalog; đọc ecology projection/journal/resonance độc lập | Không lưu mỗi spawn position; choice/unique actor theo owner khác; missing species giữ foreign refs, coverage audit khi thêm |
| ConditionalEncounter / encounterId | regionId, habitatRuleRefs, eligibility, actorInstancePolicy, encounterProfileRef, resetPolicy, occurrencePolicy, rewardProfileRef | Catalog eligibility; durable unique outcome/occurrence do encounter record + ledger | Lưu unique proof/claimed occurrences cần, temporary attempt reset; migration không respawn unique grant |
| QuestWorldDependency / dependencyId | questId, predicateRefs, evidenceRefs, priorCompletionPolicy, alternativeObjectiveRef, postChapterPolicy | Catalog đọc authoritative facts; quest acceptance/outcome do quest record | Không duplicate physical flags; migrate objective refs có proof, không reset quest đã xong |
| PersistentWorldFlag / flagId | ownerRef, type, scope, derivationRef hoặc storedPropertyRef, defaultPolicy, migrationAliases | Metadata registry; đúng một authority: derived alias hoặc stored mutable property | Không generic boolean bag; validate exclusive owner và type; rename giữ logical identity/grant keys |

Encounter records, Quest records, MemoryRecord, ResonanceRecord, RewardGrantLedger và FactionRelationship kế thừa Task03–06, không tạo bản sao cùng dữ liệu. RegionEcologyState Task06 là projection từ completions + RegionState + habitat catalog; pendingChanges là command intent chưa phải committed ecology. Phase labels bốn chương chỉ read model. Dữ liệu derived không được dùng lại làm authority khi load.

## Save envelope tối thiểu

- saveId, schemaVersion, contentVersion, committedRevision, commitId, integrity metadata và generation/reference tới bản hợp lệ trước.
- Completion/sub-completion/outcomes/proof; region/local owned mutable values; unique encounter/actor outcomes và relocation choices quan trọng.
- Quest acceptance/steps cần thiết, memory/observation/discovery, resonance/unlocks/progression/loadout theo từng owner.
- RewardGrantLedger với stable grantId, recipient, committed payload ref cùng recipient progression; không chỉ lưu “đã trao” mà mất XP/payload.
- Safe checkpoint/position/form tương thích, transition intent nếu dở dang, boss attempt boundary policy; relationship facts persistent có scope.

Không lưu mỗi particle, ambient frame, wildlife tọa độ thông thường, AI tick, weather frame, presentation phase/count duplicate. Temporary effects/attack attempt khi load reset theo checkpoint contract; không resume nửa hit để tạo damage/reward hai lần. World reconstruction có thể dùng deterministic seed cho scenery nếu sau này cần, không yêu cầu seed thay mọi durable outcome.

## Save boundaries và browser lifecycle

Save ngay sau mỗi logical event/sub-form commit, unique reward, arrival, persistent variant/critical quest outcome; safe checkpoint sau thao tác đã chấp nhận. Có thể batch ordinary progression khi loss budget được duyệt, nhưng không tách grant/ledger. Không trông chờ beforeunload/tab close để flush duy nhất: tab có thể bị đóng/OS suspend bất kỳ lúc nào. Autosave/manual save nếu có đều qua cùng writer/revision, không race hai nguồn.

Storage quota/denied/private mode/eviction/corruption phải được adapter kiểm, thông báo chưa lưu và giữ last good generation; không gọi notification thành durability. Export/import/backup policy và UI phản hồi lỗi **UNRESOLVED**, Task07 không sửa UI. Không thể bảo đảm browser không bị người dùng xóa dữ liệu; durable contract là khi storage acknowledgement thành công, có recovery/integrity validation. Không ghi vào settings namespace `nhat-diem.ui.v1`; namespace gameplay riêng chưa chốt.

## Atomicity và load

One logical commit gồm event/outcome + patches + quest evidence + grant/recipient + route/checkpoint + habitat mapping cần thiết. Tải generation hợp lệ mới nhất; incomplete journal chưa commit thì bỏ candidate/restore boundary. Commit đã durable thì dựng projection, không replay rewards; thiếu asset/content tạm không xóa facts. Load validate references, types, dependency closure, ledger recipients, phase projection, placement và collection coverage trước trao quyền điều khiển.

Boss outcome đã commit thì không hồi boss để trả thưởng; chưa commit thì attempt reset cùng checkpoint, không giữ damage với bộ mới. Transition trước arrival commit ở source; sau commit ở destination đã có đường về. Presentation cursor không là gameplay authority.

## Migration và compatibility

Schema migration có version tuần tự, input snapshot bất biến/backup, output validate rồi mới promote. Content migration có ID alias map một nghĩa, giữ old completion/grant identity, không cấp lại bằng ID mới; ambiguous split cần explicit mapping/outcome policy, không đoán. Lưu migration provenance/version để chạy lại idempotent. Unknown future fields/IDs giữ opaque trong phạm vi an toàn, không tự complete; version mới hơn không downgrade ghi đè.

Thêm species: defaults journal undiscovered, no form grant; habitat rules được audit coverage. Thêm region: defaults chưa tới/locked theo explicit prerequisite, không reset bốn vùng cũ. Thêm chapter sau epilogue: arc_complete cũ vẫn đúng, gate event không tự phát reward/planet transition mới. Không dùng version bump làm key thưởng. Đổi phase display label không migrate facts; đổi event/object ID cần alias và cả quest/habitat refs. Catalog thiếu: hoãn activation, giữ save và route checkpoint an toàn thay xóa dữ liệu.

## Validation contracts

PWV01: ID unique/type/owner duy nhất. PWV02: prerequisite DAG/closure, không optional gate ẩn. PWV03: four network predicates đúng completion, awake theo subgrant. PWV04: reward ledger/payload/recipient đồng revision. PWV05: habitat coverage cả undiscovered. PWV06: nav/return/checkpoint và form envelope hợp lệ. PWV07: mutable variant không đảo main stable. PWV08: load/migration idempotent, namespace tách settings. PWV09: unique actors không nhân bản. PWV10: cached projection có revision/catalog phù hợp, không authoritative.
