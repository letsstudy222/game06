# Sổ quyết định Task17

## Những gì kế thừa, không tái phê duyệt

| Trạng thái / nguồn | Ràng buộc giữ nguyên |
| --- | --- |
| CONFIRMED D02/D03/D29 | Linh thể bí ẩn, Quy đầu ở Vực Hải Uyên; D29 ký ức trước cộng hưởng/thân |
| CONFIRMED D04/D30/D32 | Quy Thủy, Phượng Hỏa, Long Phong, Ly Mộc với Sinh Mệnh riêng; ba stage lớn, Quy rùa nước cổ có mai |
| CONFIRMED D05/D06/D07/D41 | Tối đa ba dạng một active, khóa membership boss, progression độc lập; không full-three early gate |
| CONFIRMED D38/D39 | Lôi/Kim ngoại lai không mặc định xấu, định hướng data-driven; không thêm element/lore mới |
| PROPOSED S05/R03/W07/C04/C14/P15/L16 | Event/quest IDs, form/scene/save/movement/mechanics chi tiết giữ proposal, không thành confirmed vì Task17 dùng lại |
| UNRESOLVED Q01–Q05 | Nguồn gốc, biến cố, tự nguyện, Tinh Môn, trứng hay lõi sống chưa có đáp án mới |
| SUPERSEDED H08-S01 | Bản ending cũ “phát hiện cổng” đã thay bởi D26 tái kích hoạt; giữ hồ sơ, không khôi phục hoặc sửa lịch sử |

Nguồn: [PROJECT_DECISIONS](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md). Không tạo D-record xác nhận gameplay mới.

## Đề xuất cần duyệt

| ID / trạng thái | Nội dung và tài liệu owner | Khi nào cần duyệt |
| --- | --- | --- |
| O17-P01 PROPOSED | Mười beat chơi gom D29, giả thuyết pacing, b09 chỉ replay; [bảng nhịp](OPENING_BEAT_SHEET.md) | Trước script/prototype nhịp mở đầu |
| O17-P02 PROPOSED | Tương hợp và xác nhận một action, phản hồi thức trung tính; [cộng hưởng](FIRST_QUY_RESONANCE.md) | Trước triển khai bootstrap |
| O17-P03 PROPOSED | Diễn xuất Quy và motifs/clue giới hạn; [appearance](QUY_FIRST_APPEARANCE.md), [environment](OPENING_ENVIRONMENTAL_STORYTELLING.md) | Trước art/audio brief |
| O17-P04 PROPOSED | Học bơi/hãm, contextual receiver không combat; [tutorial](OPENING_TUTORIAL_FLOW.md) | Trước input/movement/receiver prototype |
| O17-P05 PROPOSED | Toàn bộ first-pass lời văn và bản ngắn; [thoại](OPENING_DIALOGUE.md) | Trước localization/voice/script chốt |
| O17-P06 PROPOSED | Objective detail E01, ownership và boundaries; [quest](OPENING_QUEST_AND_EVENTS.md), [save](../technical/OPENING_STATE_AND_SAVE_CONTRACT.md) | Trước quest/save implementation |
| O17-P07 PROPOSED | Topology sáu zones, safe anchor/cửa cục bộ; [level](OPENING_LEVEL_HANDOFF.md) | Task19 duyệt spatial detail trước map |
| O17-P08 PROPOSED | Skip/focus/reload/accessibility và 30 ca nghiệm thu; [cutscene](OPENING_CUTSCENE_REQUIREMENTS.md), [QA](../technical/OPENING_TEST_CASES.md) | Trước cinematic/persistence integration |

## Gate chưa giải quyết

| ID / trạng thái | Câu hỏi, owner/phụ thuộc | Chặn gì / cách giữ thiết kế trung tính |
| --- | --- | --- |
| O17-U01 UNRESOLVED | Q05 vật mang trứng/lõi; narrative/art | Chặn final script/asset; dùng “cấu trúc bảo tồn” trong tài liệu |
| O17-U02 UNRESOLVED | Q03/R03 manifestation B+C, phần ý thức Quy | Chặn diễn giải vật lý và animation cuối; mô tả tương hợp/kết quả, không cuộc đối thoại hay sinh xác |
| O17-U03 UNRESOLVED | Q07/C14 input bơi/hãm, current, contextual receiver, geometry/camera | Chặn playable prototype; giữ actions ngữ nghĩa, không cost/skill/stage giả định |
| O17-U04 UNRESOLVED | Q16/W07/R03 schema, mapping memory receipt trước form, durable adapter, migration | Chặn persistence implementation; giữ một writer/ledger, không claim parent sớm hoặc tạo ledger mở đầu |
| O17-U05 UNRESOLVED | Q18/Q19 reference Quy, clips, provenance/audio rights và catalog species↔form↔stage mapping | Chặn sản xuất art và runtime binding; không nhận Phoenix atlas là Quy |
| O17-U06 UNRESOLVED | Q06/Q17 scope, thiết bị, usability và performance budgets | Chặn nghiệm thu production; pacing chỉ giả thuyết, FX thiết yếu có fallback |

Q01/Q02/Q04 không cần trả lời để tiếp tục thiết kế mở đầu, nhưng cấm lời văn tự giải đáp. HP/cost/EXP/threshold và emergency transfer PhaseII chưa approve; mở đầu không phụ thuộc các lựa chọn đó. Không dùng Task17 làm bằng chứng đã phê duyệt policy của Task14–16. Đề xuất mười beat của đề bài được điều chỉnh về chronology D29; không gắn SUPERSEDED cho một canon chưa từng tồn tại.
