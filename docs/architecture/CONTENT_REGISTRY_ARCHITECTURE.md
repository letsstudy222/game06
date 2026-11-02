# Registry có kiểu, không production catalog mới

**PROPOSED**. [Creature data](../technical/CREATURE_DATA_SPEC.md), [Quy data](../technical/QUY_DATA_SPEC.md), [world authority](../world/WORLD_STATE_ARCHITECTURE.md) giữ nguồn. Registry là definition readonly, không lưu unlock/quest truth.

| Kind / ID scope | Quan hệ | Mốc cần |
| --- | --- | --- |
| Scene / sceneId | factory+bundle+world/profile refs; dawn/dawn-sample và quy-s0-test đề xuất | S0 |
| Asset / assetId | source/export/manifest/clip refs, provenance |27/S0 |
| MovementProfile / profileId | motion/policy/collision refs | S0 sau duyệt |
| Interactable / interactionId | receiver/local result hoặc domain command ref |46S0 nhỏ |
| Species / speciesId | elements/progression/allowed stage refs | S0 fixture typed tối thiểu; catalog production sau GD |
| Stage / stageId | species owner/visual/capability | S0I, II/III hoãn |
| Form / formId | playable identity/species/acquisition | S0 fixture không unlock; S1R03 |
| Ability / abilityId | action/config/minimumStage refs | S1; không tự grant theo stage |
| Quest / questId | objective/source/predicate refs | S1 hoặc sau |
| WorldEvent / eventId | W07 write-set/prereqs/reward source | S1source đủ scope, không sao chép vào scene |

Lookup dùng kind+id; cùng chuỗi quy_s1 ởstage/ability không collision nếu kiểu đúng, không resolve bằng displayName. ActorInstanceId và slotId không content registry. Không tự cấp speciesId cho ref_i_* vì nhắc lại. Validate duplicate kind/id, unknown kind, foreign-key closure, required assets, capability reachability và cyclic dependencies tại bundle startup trước enter. Load từng bundle để không đòi full catalog bốn chương cho S0; unknown external bundle là unavailable, không default unlocked.

Definition version pin behavior; schema version pin encoding; logical source/event/grant ID không đổi do hai loại version đó. Alias migration có provenance/backup, không reassign ID cũ sang nội dung khác hoặc tạo reward mới. Scene ID kỹ thuật không là canonical ChapterI zone. S0 definitions có thể ở fixture riêng sau implementation task, không viết production JSON ở đây. Catalog validation không có quyền sửa save; unknown saved ref phải giữ để recovery/migration, không xóa hoặc mint form.
