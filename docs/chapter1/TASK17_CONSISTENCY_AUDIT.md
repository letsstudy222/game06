# Kiểm tra nhất quán cục bộ Task17

## Baseline và nguồn bằng chứng

Repository xác minh: `https://github.com/letsstudy222/game06.git`; nhánh `work`, HEAD trước Task17 `387b29d392ad78d65f14e7dc7720da0d16b1213c`, working tree sạch. Năm commit PhaseII đều là ancestor: `bcdfe73f18ce31d7e6e1a5ca6fcc66cdff76edc9`, `936f74f670330d83d1ad69a118e28540955bca77`, `28fed70507b265b9715933df58b7a098c03bf800`, `518f5d5bc7df772ddcf6a1ea1884681f466bcb90`, `387b29d392ad78d65f14e7dc7720da0d16b1213c`. `git ls-remote` xác minh origin/work cùng HEAD; origin/main vẫn `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`. Đây là mốc trước chỉnh tài liệu Task17, không claim Task17 đã commit/push.

Đã đối chiếu [canon](../PROJECT_DECISIONS.md), [câu hỏi mở](../OPEN_QUESTIONS.md), [cộng hưởng D29](../lore/RESONANCE_RULES.md), [ký ức](../lore/ANCESTRAL_MEMORY.md), [Quy C04](../creatures/QUY_HAI_UYEN.md), [Chương I](../story/CHAPTER_01_QUY.md), [E01/E02](../story/STORY_IMPLEMENTATION_HANDOFF.md), [quest](../story/QUEST_DESIGN_OUTLINE.md), [revelations](../story/NARRATIVE_REVELATION_MATRIX.md), [CL01–05](../lore/CHAPTER_REVELATIONS.md), [asset register](../ASSET_REFERENCE_REGISTER.md), [input hiện tại](../../src/island/InputManager.mjs).

Tasks09–16 có hồ sơ tại [09](../elements/TASK09_CONSISTENCY_AUDIT.md), [10](../elements/TASK10_CONSISTENCY_AUDIT.md), [11](../creatures/TASK11_CONSISTENCY_AUDIT.md), [12](../creatures/TASK12_CONSISTENCY_AUDIT.md), [13](../evolution/TASK13_CONSISTENCY_AUDIT.md), [14](../combat/TASK14_CONSISTENCY_AUDIT.md), [15](../progression/TASK15_CONSISTENCY_AUDIT.md), [16](../loadout/TASK16_CONSISTENCY_AUDIT.md). Bản audit PhaseII tổng hợp nằm trong hội thoại trước; không tạo hoặc giả định có báo cáo tổng hợp mới trong repository. Kết luận kế thừa: thiết kế đủ tiếp tục có điều kiện, không đồng nghĩa có runtime. Đây không phải audit lại PhaseII.

Post-audit corrections vẫn là nguồn: [boss HP0 guard](../loadout/BOSS_LOADOUT_LOCK.md), [W07 identity](../world/WORLD_STATE_TRANSITIONS.md), [reward consistency](../economy/REWARD_CONSISTENCY.md), [content version](../gameplay/ENCOUNTER_AND_REWARD_DESIGN.md). Task17 không sửa các tệp này hoặc phê duyệt emergency transfer.

## Mười lăm acceptance checks — kiểm tra thiết kế

| # | Kết quả đối chiếu | Bằng chứng Task17 / giới hạn |
| --- | --- | --- |
| 1 | Đạt ở tài liệu: Tinh Linh bí ẩn, chưa thân | Overview/b01–05; không origin reveal |
| 2 | Đạt: Quy Sacred đầu | Appearance/resonance; không Phượng tutorial tái dùng thành canon |
| 3 | Đạt: tương hợp thay bắt/đánh | First resonance; không inventory Quy |
| 4 | Đạt ở contract: dạng đầu hiểu được | b06 durable form, b07 cảm trọng lượng; asset/input còn gate |
| 5 | Đạt: từng prompt một ý | Tutorial/dialogue; không screen overload |
| 6 | Đạt ở topology: một Quy đầu đủ | b07/b08/level; receiver chờ duyệt, không skill II |
| 7 | Đạt: không mandatory three | Overview/decisions, giữ D41 |
| 8 | Đạt: boss ngoài opening | Overview/quest; E02 combat chưa triển khai ở đây |
| 9 | Đạt: dùng E01/mq_01 sẵn có | Quest table, local stepId không event mới |
| 10 | Đạt ở contract, còn schema gate | Save: source vs recipient, form sub-grant/parent; memory receipt mapping U04 chưa chốt |
| 11 | Đạt ở yêu cầu thiết kế | Cutscene/save/30future tests; chưa gameplay-test |
| 12 | Đạt: Thủy/ba stage/anatomy giữ | Appearance/decisions; stage names còn PROPOSED |
| 13 | Đạt: không chốt lịch sử mở | Environment/dialogue/U01–02; CL05 chưa chứng minh tự nguyện |
| 14 | Đạt ở bàn giao conceptual | Sáu zones không tọa độ; Task19 nhận topology, cần duyệt map |
| 15 | Đạt trong phạm vi thay đổi | Chỉ 14 tài liệu và navigation; không runtime/art/map/UI/save |

## Mâu thuẫn đã xử lý trong phạm vi

- Candidate beat09 có thể bị hiểu là ký ức đầu sau thân: b05 mang ký ức đầu theo D29, b09 chỉ replay cùng mem_quy_first_sense. Không thêm mem_quy_current của E03 sớm.
- E01 có mục tiêu “cơ thể đầu” nhưng parent complete sau practice: giữ form_committed/sub-grant riêng trước, không cycle CAP_QUY_MOVE hoặc cấp form hai lần.
- Nhiều nhãn awareness/signal/awake/cửa dễ thành nhiều writer: quest/save phân loại evidence, projections, local patch, presentation; không một boolean ledger mới mỗi beat.
- Mở cửa dễ bị nhầm phục hồi nước: chỉ local receiver/cửa; E05/water_restored không được cấp.
- Content version hoặc active recipient thay đổi không cho claim lại; giữ same RewardGrantLedger, không ledger opening/recipient authority riêng.

## Mức sẵn sàng và hạn chế

**CONDITIONAL PASS cho bàn giao thiết kế tiếp theo; chưa sẵn sàng triển khai gameplay.** Không có creative approval mới được suy ra. O17-U01–U06 chặn script/art/input/save/production tương ứng; memory receipt boundary trước form là gate cụ thể cần giải trước schema/code. Không cần giải Q01/Q02/Q04 hoặc HP/EXP/evolution/boss policies để tiếp tục viết thiết kế mở đầu trung tính.

14 deliverables có tại các link trong [overview](CHAPTER1_OPENING_OVERVIEW.md). Kiểm tra tự động chỉ xác nhận tồn tại, relative links, Markdown tables/fences và git diff formatting. 30 ca QA vẫn là kế hoạch tương lai, không kết quả runtime. Không thay gameplay, không quyết định lore/HP mới, không bắt đầu Task18. Các ghi chú “Task17 chưa bắt đầu” trong handoff cũ là mốc lịch sử, appendix điều hướng mới ghi mốc Task17 hiện tại thay vì viết lại hồ sơ cũ.

Kết quả kiểm tra tĩnh khi bàn giao: đủ 14 tài liệu mới; 94 relative links hợp lệ trong phần mới; bảng và code fences hợp lệ; 10 beat và 30 ca QA tương lai. Hash comparison xác nhận toàn bộ tracked files ngoài bốn navigation files giữ nguyên, bốn tệp đó chỉ append. Kiểm tra whitespace bằng git diff cho cả tracked changes và từng tài liệu mới đều đạt. Không commit/push tài liệu Task17 trong lần bàn giao này.
