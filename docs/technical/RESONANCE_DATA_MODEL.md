# Mô hình dữ liệu Cộng Hưởng — đặc tả khái niệm

**PROPOSED R03-P10:** hợp đồng thiết kế trung lập triển khai, không phải class/schema đã có trong repository. Stack hiện tại vẫn Canvas/ES modules; không bắt ngôn ngữ, engine, database hoặc thêm code trong Task 03. Cùng nguồn luật: [biến hình](../gameplay/TRANSFORMATION_DESIGN.md), [thu nhận](../lore/RESONANCE_RULES.md), [tiến trình](../gameplay/CREATURE_PROGRESSION_CONCEPT.md).

ID dưới đây là technical identifiers; tên hiển thị Việt ngữ có thể đổi mà ID không đổi. Catalog định nghĩa nội dung; save lưu tiến trình/thể trạng người chơi, không lưu một cá thể gốc như món đồ. Quy tắc áp dụng save hợp lệ và reload bình thường, không là cam kết anti-cheat đối với file sửa tay.

## Thực thể và quan hệ

| Entity / purpose | Dữ liệu bắt buộc | Quan hệ | Invariants / invalid state | Persistence |
| --- | --- | --- | --- | --- |
| SpiritState — chủ thể liên tục | spiritId, phase (bootstrap/embodied/recovering), awarenessMilestones, stabilityResource/cap, sharedSwitchCooldownRemaining, safeCheckpointId, saveRevision | Sở hữu records, progression, loadout; một transform và tối đa một encounter active | Không có nhiều active body; embodied phải có activeForm hợp lệ; quỹ không âm/vượt cap; không hồi resource từ offline/menu | Durable trong save; giữ mốc nhận thức, không ghi lời giải nguồn gốc |
| CreatureSpecies — catalog loài | stable speciesId, stable formId nếu playable, playable flag, role/rarity tách, element affiliations, stage definitions, resonance prerequisites/routes, environmental constraints, contentVersion | Một species được nhiều cá thể/nguồn gặp; một progression/formId trong save | Wildlife nonplayable không bị ép có formId; stage count theo loài; không rarity→moral/power | Catalog versioned; save giữ tham chiếu ID/version và alias migration |
| CreatureProgression — phát triển và thể trạng dạng | formId, XP, derived level, unlockedSkillIds, masteryObjectives, committedStageId, pendingBenefits, currentHP/maxHP context, incapacitated, perSkillCooldownRemaining, availabilityReason | Chỉ playable đã resonated; đọc stage catalog, liên hệ form loadout | HP0 ⇔ incapacitated; stage hợp lệ; level nhất quán XP/curve; XP không chia sẻ ngầm; thay slot không reset HP | Durable; stats tính từ config version hoặc snapshot khi boss |
| ResonanceRecord — discovery/collection/quan hệ | speciesId, discoveryTier, observationFacts, sources, compatibilityOutcome, requirementsSatisfied, resonanceStatus, imprintVersion/integrity, unlockGrantId nếu có | Sources trỏ core/encounter/route; có thể không có progression; memory độc lập | RESONATED chỉ sau commit; playable unlock cần designatedPlayable; unknown không tự unlocked; route lặp không duplicate record | Durable theo species, provenance nhiều nguồn; không reset khi điều kiện tạm mất |
| AncestralMemoryRecord — fragment truyện | memoryId, fragmentId, species/sourceRef, relativeEra, viewpoint, integrity/confidence, chapterGate, unlocked, interpretationNotes, rewardGrantId | Nguồn resonance/core/di tích; không bắt form unlock | Đã xem không là objective truth; duplicate fragment không grant lại; gate không lách bằng level | Save giữ IDs/unlocked/notes/ledger; text/assets ở catalog versioned |
| EquippedFormLoadout — bộ ba | three member slots (formId hoặc empty), activeFormId, membershipRevision, reserveOrder | Members tham chiếu progression; encounter khóa frozen set; Slot 1 active là projection | Luôn ba vị trí, unique species/formIds; ít nhất một playable viable ngoài bootstrap/recovery; empty không là fake form; active phải thuộc set | Durable; active switch không đổi membershipRevision |
| TransformationState — giao dịch đổi thân | transactionId, phase, source/targetFormId, requestReason, reservedCost, commitMarker, position/safePlacement, damageEventCursor, phaseTimeRemaining, snapshotRevision | Kiểm tra loadout/lock/progression; đúng một pending tx | PREPARING chưa tiêu; COMMIT phải atomic; không hai body/chi phí kép; cancel không heal; request cũ không chạy sau defeat | Write-ahead intent + commit record; không chỉ lưu hiệu ứng hình ảnh |
| EncounterLockState — khóa boss/attempt | encounterId, attemptId, state, frozenMemberSet, frozenStage/config snapshot, entryCheckpointId, entryPosition, membershipRevisionAtEntry, completion/abortTransactionId | Một attempt khóa một loadout; reward journal cùng revision | Active locked set phải bằng snapshot; chỉ active role đổi; không unlock lock trước reset/completion atomic | Durable trước boss active; policy reload là abort-and-reset, không resume HP boss |
| LifeCoreRecord — vật mang nội dung | coreId, sourceLocation, associatedSpecies, structuralHealth, activityState, preservationConditions, usableImprintSources, consumedEventIds | Nguồn của record/memory, có thể không unlock | Health tách activity; IRRECOVERABLE không thành viable bằng mana; không mọi loài/cá thể có core | Content + world-state overlay nếu biến đổi; không xóa core sau mỗi switch |
| RewardGrantLedger — chống grant lặp | stable grantId, eventId, attemptId nếu có, recipientIds, payloadVersion, state (pending/committed), transactionRevision | Unlock/XP/memory/evolution/completion | Một grantId áp payload một lần; ID trùng với payload khác báo conflict, không grant lại; không marker trước/xa payload | Durable, cùng atomic unit với hiệu ứng reward |

role có thể đa nhãn; rarity là dữ liệu riêng. Species removed/renamed không được làm mất record cũ. AvailabilityReason và environmentalConstraint là khác nhau: đang yếu trong biome không nhất thiết forbidden.

## Các bất biến liên hệ — PROPOSED

I01. Sau bootstrap hoặc recovery, đúng một active body HP>0, thuộc member set, catalog hợp lệ và đặt được ở vị trí an toàn.

I02. Ba vị trí loadout luôn tồn tại, có thể empty trước đủ dạng. **CONFIRMED D41 (Task09):** không bắt ba member/ba different elements, boss đầu không reject chỉ vì thiếu số dạng; capabilities/placement/entry phải phù hợp main forms đã mở. Unique-species restriction và chi tiết snapshot còn PROPOSED R03-P06, không tự phê duyệt qua cập nhật này.

I03. ACTIVE_LOCKED/RESOLVING giữ frozen membership, stage/config; chuyển active không đổi set. Reward mở dạng mới không thêm thành viên.

I04. Dạng unlocked chỉ khi species playable và resonance committed; memory unlock không kéo theo form unlock.

I05. XP/HP/cooldown/stage thuộc formId, không reset theo slot hoặc menu; load thường không hồi. Recovery checkpoint chỉ sau attempt đã abort/reset theo policy, không giữ boss progress. Global switch cooldown/resource thuộc SpiritState.

I06. Chỉ một transform đang chạy; cost và active/position commit cùng lần, damage đúng body trước/sau boundary. Không để UI hiển thị target là thật trước khi state commit.

I07. Mọi reward/event quan trọng idempotent; pending grant và effects được giải quyết cùng revision. Collection menu/scene transition không là nguồn authority thay membership.

I08. Không xóa progression/memory khi disabled, đổi tên hoặc lỗi asset. Content không render được cần fallback/migration, không giả đã mở dạng thay thế mới.

I09. Bootstrap không cần một form có trước; trạng thái spirit-only không được tái dùng để đi lại sau combat defeat.

I10. Loadout còn toàn dạng bất lợi nhưng vẫn sống được là thử thách; toàn dạng không thể tồn tại là lỗi entry/content phải chặn hoặc recover, không softlock.

## Persistence và giao dịch — PROPOSED

Save envelope cần schemaVersion, catalogVersion, monotonic saveRevision, currentScene/checkpoint và các entity durable. Không thay key UI `nhat-diem.ui.v1` hoặc viết đè legacy save; save gameplay mới phải có namespace/migration riêng ở task code. Không ấn định localStorage/database trong spec này.

1. Trước PREPARING, ghi intent liên hệ snapshot nguồn/HP/clock hiện hành và cost reservation. Source vẫn chịu damage; mỗi event đã commit cập nhật revision/transaction journal, không dùng snapshot nguồn cũ để chữa damage khi reload.
2. Tại commit, activeForm, target placement, cost, remaining recovery/cooldown và marker được ghi như một đơn vị. Nếu storage không bảo đảm primitive atomic, task kỹ thuật phải hiện thực journal/recovery tương đương; không cho effect/reward trước durable commit rồi bỏ marker.
3. Load ngoài boss: intent chưa commit → giữ nguồn và mọi damage đã durable, nhả reservation; committed → giữ target/chi phí và phần recovery còn lại. Không tiến clock theo thời gian tab đóng, không nhận quỹ/HP miễn phí. Nếu nguồn/target không còn viable, chạy safe recovery, không để null active có input.
4. Load có encounter ACTIVE_LOCKED/RESOLVING chưa completion commit: thực hiện abort idempotent, boss reset, checkpoint entry, phục hồi theo defeat/reset, kết thúc lock rồi mới mở collection. Nếu completion đã commit: không abort để lấy lại loot, khôi phục kết quả đã commit. Không ghép state boss cũ với loadout mới.
5. Save user trong boss chỉ lưu envelope có lock/journal, không tạo quyền resume tùy ý. Một attempt mới luôn bắt đầu full/reset trạng thái boss; pending XP/evolution benefits áp ngoài lock sau abort/completion theo ledger hợp lệ.

Save thiếu/hỏng không được silently grant unlock hoặc xóa dữ liệu. Giữ backup/revision trước migration, ghi lỗi, dùng last known valid checkpoint/save; nếu không có thì không overwrite bản hỏng, báo recovery rõ. Không hứa chống mọi thao tác rollback save thủ công; bảo đảm menu/reload/transition bình thường không vượt luật.

## Thứ tự xử lý đề xuất và điểm tích hợp tương lai

Sự kiện có ID và order: resolve damage đến hạn → cancel/defeat nếu cần → validate pending transform → atomic commit → recovery/cooldown tick → reward/milestone commit theo gate → save snapshot. Có thể chọn tick architecture khác nhưng phải giữ cùng kết quả ở ranh giới damage/commit. Level/skill benefits trong boss lưu pending, không đổi combat snapshot.

Task triển khai sau cần adapter từ GameState hiện tại sang entities và save migration, test retry/reload/damage/ledger; không sửa `PlayerPhoenix` trong Task 03. Công cụ/engine sản xuất và bảo mật save multiplayer vẫn UNRESOLVED.


## Task07 — tích hợp world persistence (PROPOSED)

[Persistent world contract](PERSISTENT_WORLD_DATA_SPEC.md) dùng cùng durable writer/revision và RewardGrantLedger, không thêm collection/progression copy. Awakening sub-completion và form unlock/placement/sub-grant là cùng transaction; main awakening count suy từ bốn designated species, availability hiện thời theo progression/resonance. Task07 chưa tự đổi I02; Task09/D41 cập nhật rõ current no-mandatory-three entry ở I02 theo source mới. Boss lock D06 giữ; abort-reset/resource/HP và snapshot details vẫn cần quyết định riêng, không tự approved.
