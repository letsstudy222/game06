# Kết Chương I — Dòng nước có lối về

**CONFIRMED:** Quy/Thủy mở Chương I, Phượng/Hỏa thuộc Nhật Diệm/Chương II, Long/Phong, Ly/Mộc với Sinh Mệnh riêng; giữ khả năng quay lại khám phá và hệ quả bền vững, D29/D41 không đổi. **PROPOSED F24-P01–P11:** nhịp kết, phục hồi bằng hành động, trình bày, tác động theo vùng, di chuyển và dữ liệu mới dưới đây. Các ID/điều kiện logic S05/W07, bản chất/kết quả boss B23 và chi tiết Q18/H19/E20/Q21/S22 giữ trạng thái gốc, không được duyệt chỉ vì lặp lại. Q01–Q05 cùng chính sách HP/thử lại/hiện thân/lưu trữ/asset còn **UNRESOLVED**; các bản ghi lịch sử **SUPERSEDED** giữ nguyên.

Cảm xúc kết: người chơi thấy có thể mở một đường mà không cuốn mất nơi trú; Quy cảm lại công năng giữ dòng thay vì khóa kín. Nước ở hạ lưu có nhịp sống mới nhưng không phải mọi vấn đề đã biến mất. Tín hiệu nhiệt yếu tạo lý do đi tới bờ Nhật Diệm. Không tiết lộ trọn nguồn gốc cổ linh, trình tự biến cố hoặc Tinh Môn; không thêm Sacred thứ năm, không coi ngoại lai là xấu và không tự tiến hóa.

## Bốn mốc, không tạo thêm bốn kho/sự kiện

| Mốc khái niệm | Nguồn hiện hữu/ý nghĩa | Khác biệt và lưu bền vững |
| --- | --- | --- |
| A — Xung đột boss đã được giải quyết | evt_04_guardian_conflict ghi nhận kết quả đủ điều kiện và đã lưu bền vững | Kết quả/receipt/quyền từ thực thể của E04; lần thử thất bại hoặc bỏ dở không đạt A. Chính sách xử lý cụ thể B23 còn PROPOSED |
| B — Có thể bắt đầu phục hồi | Suy ra từ quyền E04 **và** kết thúc lần thử được chấp nhận, cơ thể/ngữ cảnh/nguồn khám phá hợp lệ | Không lưu mở khóa độc lập; có A nhưng khóa/phục hồi/nội dung chưa an toàn thì B tạm không khả dụng, không đảo ngược A |
| C — Phục hồi đã commit | evt_05_restore_water được lưu bền vững sau thao tác thực, kiểm chứng, bảo vệ nơi trú, kiểm độ bao phủ và xác nhận | Patch thế giới/tuyến/sinh thái/bằng chứng nhiệm vụ/người nhận+ledger cùng giao dịch nguyên tử, không suy từ VFX hoặc boss chết |
| D — Chương I hoàn tất | chapter_01_complete là alias từ E05 theo hợp đồng S05/W07 hiện hữu | Kết thúc tuyến truyện khác nghĩa với thay đổi thủy văn/thuộc tính nhưng C/D **cùng E05 commit hiện có**. Không tạo cờ hoàn tất/phần thưởng riêng cho finale hoặc bắt xem thoại trước D |

[S05](../story/STORY_IMPLEMENTATION_HANDOFF.md)/[kiến trúc W07](../world/WORLD_STATE_ARCHITECTURE.md) hiện gán water_stable/refuge_preserved/chapter_01_complete từ E05; giữ như **đề xuất kế thừa**, không âm thầm tách thành sự kiện mới. E06 ghi nhận đến nơi và đường về riêng sau C/D, không là điều kiện để E05 hoàn tất. NEXT_ROUTE khả dụng sau E05 khác với các alias route_sea_open/arrived_nhat_diem của E06. Nếu muốn D trở thành sự kiện hoặc điều kiện thoại riêng, cần quyết định nguồn và phương án chuyển đổi dữ liệu được duyệt tường minh; Task24 chưa thực hiện việc đó.

## Nguyên tắc và phạm vi kết chương

Sau boss → người chơi khảo sát/vận hành G → thử đầu thoát → quay A/B kiểm nơi trú/rạn → xác nhận E05 → đoạn kết/hồi tưởng ngắn tùy chọn → chọn ở lại hoặc đi I/E06. Quyền chủ động và các bước thao tác cục bộ đã được chấp nhận không bị thay bằng phim thụ động. FX xem trước có thể xuất hiện sớm, nhưng chỉ công bố thay đổi bền vững của map/va chạm/sinh cảnh/trạng thái sau xác nhận lưu bền vững. Các kết quả sau boss/E05/E06 chỉ cấp phần thưởng từ nguồn độc nhất của chính chúng, không cấp trùng thưởng E04.

## 19 tài liệu bàn giao

- [Xử lý kết quả boss](CHAPTER1_BOSS_RESOLUTION.md), [phục hồi bằng hành động](CHAPTER1_HYDROLOGICAL_RESTORATION.md), [vùng trước/sau](CHAPTER1_RESTORATION_ZONE_MATRIX.md), [hệ quả sinh thái](CHAPTER1_ECOLOGICAL_AFTERMATH.md).
- [kết chương của Quy](CHAPTER1_QUY_FINALE.md), [ký ức/manh mối kết chương](CHAPTER1_FINAL_MEMORY.md), [điều kiện hoàn thành](CHAPTER1_COMPLETION_CONDITIONS.md), [khám phá sau phục hồi](CHAPTER1_POST_RESTORATION_EXPLORATION.md).
- [Gợi báo Phượng](CHAPTER1_PHOENIX_FORESHADOWING.md), [di chuyển liên chương](CHAPTER1_CROSS_CHAPTER_TRAVEL.md), [quyền điều khiển trong thoại/cảnh](CHAPTER1_FINALE_DIALOGUE.md), [sự kiện/trạng thái/phần thưởng](CHAPTER1_FINALE_EVENTS_AND_REWARDS.md).
- [Phạm vi sản xuất](CHAPTER1_FINALE_PRODUCTION_SCOPE.md), [bàn giao art](../art/CHAPTER1_FINALE_ART_HANDOFF.md), [12 thực thể dữ liệu](../technical/CHAPTER1_FINALE_DATA_SPEC.md), [45 ca QA tương lai](../technical/CHAPTER1_FINALE_TEST_CASES.md), [quyết định](TASK24_DECISIONS.md), [kiểm tra cục bộ](TASK24_CONSISTENCY_AUDIT.md).

Chỉ tài liệu; không triển khai runtime/save/UI/map/art/dữ liệu sản xuất hoặc tự chạy Task25/audit toàn Phase III. Gói thiết kế đủ để bàn giao review không đồng nghĩa toàn Chương I đã có gameplay hoạt động.
