# Mô hình điều kiện tiến hóa

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Bốn phương án — V13-P02

| Tiêu chí | A level threshold | B mastery | C narrative/resonance | D hybrid |
| --- | --- | --- | --- | --- |
| Motivation | Dễ đo tiến trình, nhưng dễ chỉ farm XP | Thưởng hiểu kit, dễ ép một lối chơi | Gắn phát triển với thế giới/ký ức | Tiến trình thường tạo nền, điều kiện riêng cho ý nghĩa |
| Fairness | Dễ hiểu nhưng đủ level chưa chắc hiểu mechanic | Khó nếu yêu cầu phản xạ/chính xác hẹp | Có thể khóa vì bỏ sót một quest | Có lựa chọn thử thách tương đương được author, không ép completionist |
| Replayability | Quen thuộc nhưng lặp grind từng loài | Mỗi kit khác, dễ lặp bài kiểm tra | Quest ít lặp nhưng khó mở rộng roster | Dùng modules/mục tiêu theo loài, không copy một ritual |
| Accessibility | Nhiều hoạt động XP nếu reward policy cho | Cần route thay thế khi mục tiêu đòi execution đặc biệt | Clue/đường trở lại phải rõ, không hidden missable lore | Dạy điều kiện, cho thực hành và lựa chọn đã duyệt |
| Production complexity | Thấp về condition, vẫn cần art/stages | Theo dõi evidence/mastery và nội dung thử thách | Cao ở quest/world/memory dependencies | Vừa đến cao, chỉ chọn subset điều kiện cần cho mỗi loài |
| Save compatibility | Stable curve/requirement refs; đổi curve phải migrate | Evidence/objective IDs không reset do đổi text | Existing quest/memory proofs phải reuse | Một requirement graph đọc các owner cũ, không stage boolean riêng |
| Grinding risk | Cao nếu chỉ combat kill XP | Cao nếu đòi lặp skill số lần vô nghĩa | Backtracking quá mức nếu clue yếu | Thấp hơn nếu condition hữu hạn, không random material gate |

**Khuyến nghị Model D**, chưa approval: prerequisite nền như đã resonance/đang ở stage trước và đủ tiến trình theo rule được duyệt, cộng một nhóm điều kiện loài có ý nghĩa. Không bắt mỗi loài đồng thời có level + mọi skill mastery + tất cả memory + vật liệu hiếm. Các lựa chọn anyOf chỉ tương đương khi content author chỉ định, không tự bỏ qua requirement còn thiếu.

## Requirement contracts

Mỗi EvolutionRequirement có requirementId, kind, evidenceOwnerRef, predicateRef, discoveryHintRef, alternativeGroupRef nếu có, required/optional, persistenceClass và approval/version. Level dùng thresholdRuleRef chưa có số; mastery đọc existing masteryObjectives; memory đọc AncestralMemoryRecord; story đọc WorldEventCompletion; ecological interaction dùng receiver/quest proof do W07 commit, không tên phase/UI text. Điều kiện sống/clearance/assets là transition availability, không xóa XP hoặc evidence khi tạm không đạt.

Chỉ durable proofs là đầu vào eligibility bền. Điều kiện có thể mất như “đang đứng trong vùng nhiệt phù hợp” được kiểm lại trước transition, không save vĩnh viễn đủ điều kiện từ một lần chạm vùng. Graph không cycle: mở Quy I không cần đã dùng Quy; Long I không cần Long đi lấy chính imprint; Ly I không cần Ly hồi partners. Không optional loài chưa thông báo, đủ ba dạng hoặc stage III cả bốn làm điều kiện main arc.

## Ví dụ định tính, chưa là gates chính thức

| Lineage / bước | Điều kiện ứng viên | Accessible alternative / restraint |
| --- | --- | --- |
| Quy I→II | Biết hãm dòng/giữ hướng và đọc một cơ cấu có đường hồi | Thử thách thực hành hoặc quest proof tương đương nếu được author; không farm block count |
| Quy II→III | Điều tiết cụm dòng có hồi lưu an toàn, đủ tiến trình riêng | Không bắt hoàn mọi di tích hay immunity mọi độ sâu |
| Phượng I→II→III | Thực hành thermal/đáp an toàn rồi chứng minh chu kỳ thu–xả nhiệt | Không bắt sưu tầm mọi loài Hỏa hoặc giết sinh vật ôn hòa |
| Long I→II→III | Tái dựng imprint là acquisition; sau đó điều khiển lane/chuỗi áp có đường thoát | Không full origin memory hoặc reaction Phong–Lôi bắt buộc |
| Ly I→II→III | Acquisition qua partners; sau đó nối/duy trì quan hệ sinh học còn khả thi | Không resurrection hoặc xóa adapted species để “thuần” Mộc |

Phân biệt story awakening, evolution eligibility và restoration world event; kết quả một việc không mặc định hoàn tất cả ba. Exact placement/gates/thresholds tiếp tục V13-U02/A08-04; source C04 chỉ định hướng, không final encounter conditions.

## Fairness, catch-up và Task15 boundary — V13-P10

XP riêng không biến mọi nguồn XP thành kill grind. R03-P09 đã so shared XP, gap bonus, tài nguyên và milestone floor; floor vẫn recommendation chưa được duyệt, không tự ban hành ở Task13. Có thể chuẩn bị khu thực hành an toàn/nội dung thưởng đúng niche của dạng mới, không auto mastery/evolution vì mở loài ở chương muộn. Nếu floor được duyệt sau, giữ nguyên nguyên tắc không giảm XP hiện có, không cấp lại gói thưởng hoặc vượt skill trials; values và curve để Task15.

Vật liệu tiến hóa chỉ là optional concept cho đến khi economy/inventory được thiết kế. Không mandatory rare drop/gacha hoặc currency mới. Nếu sau approval có vật liệu bắt buộc, phải nêu rõ đó là possession, permanent acquisition proof hay spend-at-commit; có deterministic source/repair route và consumer ledger. Vật đã tiêu cho việc khác không tự tính là đang sở hữu; quest proof của event cũ chỉ đủ nếu requirement khai báo evidence đó. Reservation không tiêu hai lần, failure precommit nhả đúng reservation, postcommit không hoàn lại rồi replay reward.

Điều kiện đủ level nhưng thiếu required memory giữ XP và hướng tìm rõ; có memory trước level thì giữ fragment/proof, không bắt tìm lại. Không chốt EXP curve/level/cap/mastery count/damage/cooldown/material amount hoặc deadline trong Task13.
