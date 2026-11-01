# Quest, world-state, ký ức và reward

**PROPOSED** port tích hợp, không quest engine mới. [W07](../world/WORLD_STATE_ARCHITECTURE.md), [P15](../economy/REWARD_CONSISTENCY.md), [Q21](../technical/CHAPTER1_QUEST_DATA_SPEC.md), [S22](../technical/CHAPTER1_SIDE_QUEST_DATA_SPEC.md), [F24](../chapter1/CHAPTER1_FINALE_EVENTS_AND_REWARDS.md) là authority.

Interaction/action emits qualified evidence→objective evaluator revalidate source/context/revision→domain command candidate→W07 writer với ownership rõ→completion/patch/memory/recipient/ledger durable→quest/chapter/UI projections. Port đề xuất submitEvidence, evaluateObjectives, requestWorldMutation, readCompletion, readRewardReceipt; không consumer nào tự award theo notification. Prior eligible proof được query khi accept/load; không bắt đánh lại để phát callback.

Một RewardGrantLedger giữ source claim và recipient allocations. Source lookup trước recipient dedupe; completed source trả payload/recipients cố định. Side/main có thể đọc cùng proof nhưng không tự mỗi consumer một reward. Overlap component/exclusion rules cần P15/S22approval trước content; event aliases không tạo claim khác. Content/schema/title version không đổi logical source, migration alias không regrant.

Memory owner R03 giữ MemoryRecord; E01 memory trước form, form sub-grant trước practice/parent, không animationEnd writer. E04 outcome/permission, E05 hydrology/chapter alias cùng source, E06 arrival/return riêng. Chapter projection không là chapterComplete flag có writer thứ hai. Region/local property mỗi thuộc tính một owner, current/nav/habitat/critical placement cùng accepted revision; renderer chỉ biểu diễn.

S0 một receiver/objective tạm không import main quest ledger, không pretend E02 species observation hoặc E05complete. S1 chỉ bind approved source scopes; full ecology/boss/ending hoãn. Unknown event/source/required actor là unavailable, không auto complete; missing authority cần recovery, không cosmetic fallback để tạo facts. Test tương lai duplicate callbacks/lostack/side-main overlap/pre-postrestoration/return, chưa thực thi.
