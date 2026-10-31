# Ca nghiệm thu mở đầu tương lai

**PROPOSED O17-P08.** 30 kịch bản dưới đây là kế hoạch nghiệm thu, **chưa chạy trên gameplay**. Cần prototype, fixtures save/adapter và input/asset được duyệt. Mỗi ca chỉ PASS khi cả kỳ vọng và điều kiện khôi phục đều đúng; FAIL nếu phát sinh grant trùng, mất dữ liệu hoặc softlock. [Save contract](OPENING_STATE_AND_SAVE_CONTRACT.md) và [quest mapping](../chapter1/OPENING_QUEST_AND_EVENTS.md) là oracle thiết kế.

| ID / ca | Tiền điều kiện | Thao tác / lỗi tiêm | Kết quả cần đạt | Khôi phục / invariant lưu |
| --- | --- | --- | --- | --- |
| O17-T01 — Đáp ứng đầu | Save mới, chưa có thân | Input hướng chú ý rồi tương tác dấu | Dấu đáp và tiến tới b02; không tạo cơ thể | Không action thì không tự complete; cue chữ/hình và anchor vẫn còn |
| O17-T02 — Không input | Đang b01 | Chờ lâu hơn budget giả thuyết | Không fail theo timer hoặc grant autoplay | Vẫn có thể làm action đầu; không có progression giả |
| O17-T03 — Nhận cảm giới hạn | Prebody b03 | Thử đi ngoài tuyến | Không free-flight/noclip và không activeForm prerequisite | Về anchor nhận cảm gần, source chưa bị mất |
| O17-T04 — Ký ức trước thân | b04 đạt | Chạm và chạy b05 rồi xin b06 | mem_quy_first_sense evidence đi trước form_committed | Nếu evidence thiếu phải giữ b05, không dời ký ức sang b09 |
| O17-T05 — Skip memory | b05 đã chủ động kích hoạt | Rút ngắn phần trình bày | Bản ngắn/ghi nhận cùng identity; không đổi lịch tiết lộ | Skip trước trigger không tự unlock, có thể tiếp xúc lại |
| O17-T06 — Memory lặp | Memory đã durable | Trigger hai lần hoặc replay | Một unlock/receipt; không XP mới | Lưu/load vẫn chỉ cùng memory, không mem_quy_current sớm |
| O17-T07 — Bootstrap không vòng | Chưa có activeForm, CAP_BOOTSTRAP | Yêu cầu nguồn hợp lệ | Entry không cần CAP_QUY_MOVE/đội ba/Quy có trước | Thiếu điều kiện nguồn thì báo đúng lý do, không thêm điều kiện dạng |
| O17-T08 — Hủy trước commit | Nguồn validated, form chưa commit | Hủy hoặc đóng cảnh | Không có form hoặc resource spend giả định | Anchor prebody và evidence durable còn nguyên; retry được |
| O17-T09 — Nguồn đổi | Đã validate nguồn | Làm nguồn tạm invalid trước commit | Revalidate và reject/defer, không grant | Nguồn phục hồi có thể retry, giữ memory đã durable |
| O17-T10 — Reload giữa resonance | Intent có, chưa durable form | Đóng tab và load | Last-good prebody, reconcile receipt trước retry | Không bán trạng thái nửa unlock; cùng source identity |
| O17-T11 — Sau commit trước cue | Form durable, animation chưa xong | Reload hoặc skip | Quy tại practice anchor, một form sub-grant | Không về linh thể; ledger/unlock/placement nhất quán |
| O17-T12 — Durable lỗi | Candidate form dựng xong | Giả lập denied/quota hoặc commit fail | Không báo đã lưu/đã mở dạng thành công | Last-good không đổi; retry cùng candidate/identity |
| O17-T13 — Race callbacks | Một form request đang xử lý | Double click + skip + callback animation | Một commit theo revision và source receipt | Không unlock, ledger hoặc placement thứ hai |
| O17-T14 — Blur và held input | b06 hoặc b07 giữ action | Mất focus rồi trở lại | Input held clear, không xác nhận/cộng tiến độ offline | Đọc phase durable, cần input mới, không grant callback mới |
| O17-T15 — Bơi/hãm một dạng | Form Quy đầu đã commit | Hoàn thành hai bài bằng Quy | Cả hai evidence được ghi, không cần stage II/team | Không drain HP/oxygen theo policy chưa duyệt; anchor an toàn |
| O17-T16 — Prompt bị đóng | Bài hãm chưa đạt | Dismiss rồi tới cửa | Cửa chỉ rõ evidence thiếu, không complete bài | Help/trigger re-evaluate cho mở lại, đường quay về còn |
| O17-T17 — Sai cơ cấu | b08 hợp lệ | Tương tác sai vị trí rồi thử lại | Không mở nhầm, không mất tài nguyên giả định | Reset local receiver an toàn, hint rãnh, thử lại được |
| O17-T18 — Cửa lưu và dựng | Cơ cấu đã commit patch | Reload trong/ngoài cửa | Cửa từ patch đúng vị trí, không gọi toggle | Quay về sanctuary được, không water_restored hoặc E05 hoàn tất |
| O17-T19 — Bỏ b09 | b08 đã đạt | Đi thẳng tới cửa | E01 có thể hoàn thành, không thiếu memory mới | Memory đầu vẫn có; optional replay không gate |
| O17-T20 — Parent riêng | Form sub-grant đã durable | Hoàn tất practice và exit hai lần | Parent R0 một lần; không form/memory regrant | E01 complete, E02 chỉ objective, không reef_observed tự sinh |
| O17-T21 — Revisit | E01 đã complete | Quay buồng và chạm nguồn | Feedback/replay, cửa và progression giữ nguyên | Không reset story/source claims, không farm reward |
| O17-T22 — Alias thiếu | form_committed/receipt đúng, quy_awake projection thiếu | Load và derive | Alias dựng từ authority, không grant mới | Receipt vẫn giữ nguyên; UI khớp dạng đã mở |
| O17-T23 — Authority mâu thuẫn | Unlock/receipt bị thiếu một phần | Validate save | Không suy success từ UI flag, không silent reset | Quarantine/last-good recovery theo policy; bảo toàn bản gốc |
| O17-T24 — Save cũ | Schema cũ dùng tên/phase khác | Migration thử nghiệm | Alias giữ cùng event/memory/source claims, không tạo reward mới | Không có map đã duyệt thì báo recovery, giữ save gốc |
| O17-T25 — Content version mới | Source claim cũ đã có | Load catalog/payload version mới | Không nhận lại reward hoặc cấp recipient mới | Receipt cũ giữ payload/recipients, UI văn bản có thể đổi |
| O17-T26 — Placement invalid | Nguồn đủ nhưng body anchor bị chặn | Yêu cầu form commit | Không durable unlock thiếu placement | Giữ anchor cũ/revalidate, không noclip hoặc cấp dạng cứu hộ |
| O17-T27 — Không âm/mù màu | Save mới, muted và palette hạn chế | Chơi toàn tuyến | Cue nét/chữ đủ hướng, CL05 có caption | Không gate yêu cầu nghe/nhìn màu; evidence giữ như đường thường |
| O17-T28 — Reduced motion/FX thấp | Tắt pan/rung/particle phụ | Qua memory/transition/cơ cấu | Hiểu được tuyến, silhouette/receiver đọc được | Không thiếu callback FX gây softlock; kết quả save như thường |
| O17-T29 — Remap/mobile | Mapping thay đổi hoặc action touch adapter tương lai | Thực hiện hướng/interact/brake/exit | Prompt hiện mapping đúng; không cần hover/bàn phím | Không lộ token thô; đổi mapping không mất evidence |
| O17-T30 — Giới hạn lore và hệ thống | Đọc toàn gói và chơi giả lập tuyến | Kiểm dialogue, gates và next objective | Không tiết lộ origin/Q03/Q05, không boss/EXP/evolution gate | Một Quy đủ; art/manifestation và mechanics vẫn đúng trạng thái đề xuất |

Kiểm tra tài liệu/link chỉ xác nhận cấu trúc bàn giao; không thay 30 ca gameplay này. Adapter/storage compatibility và mobile usability cần nghiệm thu thực tế riêng trước phát hành.
