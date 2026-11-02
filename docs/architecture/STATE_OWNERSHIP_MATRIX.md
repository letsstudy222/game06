# Ma trận ownership trạng thái

**PROPOSED ADR-26-07**, áp dụng authority R03/P15/V13/C14/E09/L16/W07 hiện hữu, không định nghĩa store cạnh tranh.

| Loại / dữ liệu | Authority duy nhất | Lifecycle / consumer | Persist? |
| --- | --- | --- | --- |
| Frame dt/active scene handle | Bootstrap/loop | Một tick, scene read | Không |
| Raw keys/pointer/edge queue | Input scope | Clear blur/hidden/exit/remap | Không |
| Actor pose/velocity | Scene actor/motion coordinator | Collision commit một lần; renderer read | S0không; S1critical placement qua domain transaction |
| Animation/camera/FX/cache | Presentation owner | Reset/dispose hoặc reconstruct từ view | Không progression |
| Loaded entities/bundles | Scene lifecycle + resource service | Enter/exit/refcount/generation | Không |
| Local receiver/objective S0 | Demo scene state | Restart fixture, nhãn tạm | Không ledger/game-save |
| Actor HP/status/cooldown | Combat owners theo policy chưa chọn | Scene đọc; actor không clone reserve health | S1theo approved obligations/recovery |
| Form unlock/active selection/equipped set | R03/L16 | Scene projection, max3/một active | Writer tương lai, không scene copy |
| Species EXP/mastery/stage | P15/V13/R03 | Per-species record, benefits theo safe boundary | Có khi S1được triển khai |
| Quest milestone/world outcome | W07 source completion/evidence | Main/side/UI đọc cùng facts | Có, không questComplete store riêng |
| Unique reward claim/recipient grants | RewardGrantLedger duy nhất | Same receipt/frozen recipients | Có qua writer cùng result |
| Memory | R03 MemoryRecord + source receipt | Trình bày replay readonly | Có; source trước form đúng D29 |
| Mutable environment | RegionState/LocalObjectState đúng một property owner | Render/nav/habitat cùng revision | Có S1/sau, không animation toggle |
| UI preferences | UISettings hiện hữu | App lifetime, keys riêng | nhat-diem.ui.v1 giữ |
| Controls/audio settings tương lai | Configuration service khi scope cho phép | Không gameplay authority | Namespace/schema riêng cần duyệt |

Các read model có sourceRevision/catalogVersion, discard/rebuild cache không replay side effect. Renderer/UI chỉ gửi intent và đọc result, không set XP/unlock/chapterComplete. Scene state S0 không serialize vào persistent gameplay bằng một cờ “save” dùng chung. S0 restart không migrate/reset UI/farm keys. Disposal chỉ release tài nguyên, không xóa earned facts. Multiple subscribers không thành nhiều writer; command serialize theo revision và source identity.
