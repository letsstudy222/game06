# Kiến trúc truyện bốn chương

Task 05/96, baseline `08743e7`. [Mục lục, audit và trạng thái](TASK05_CONSISTENCY_AUDIT.md). **CONFIRMED:** nền Tinh Linh, thứ tự/vùng/nguyên tố Tứ Linh, bộ ba, progression riêng, giới hạn Sinh Mệnh và Tinh Môn tái kích hoạt cuối IV theo D01–D33. **PROPOSED S05-P01:** mọi diễn biến, nhân vật, tên nhiệm vụ, ID và lựa chọn production mới trong bộ này. **UNRESOLVED:** nguồn gốc linh thể, thủ phạm tối hậu, tính tự nguyện của phong ấn và nguồn gốc cổng.

Không coi cụm “approved foundations” là phê duyệt toàn bộ L02/R03/C04 proposals. Thẩm quyền: quyết định explicit approved → later approved supersession → canon nhất quán → yêu cầu Task 05 → sáng tạo mới. [Audit](TASK05_CONSISTENCY_AUDIT.md) ghi xung đột trước khi đề xuất cách giải; không overwrite lịch sử.

## Xung đột trung tâm — PROPOSED

Một thế giới sống nhờ trạng thái cân bằng bị tổn thương, không một bãi phế tích chờ bật lại. Tinh Linh bắt đầu bằng nhu cầu rất nhỏ: hiểu cơ thể và nơi mình vừa xuất hiện. Khi sửa một dòng nước, người chơi phát hiện mỗi điều kiện sống ở một nơi phụ thuộc nơi khác. Vấn đề không chỉ là “đánh thức bốn vị thần” mà là **khôi phục khả năng sống cùng nhau mà không xóa những sinh vật đã thích nghi trong thời cô lập**.

Câu hỏi nguồn gốc vẫn kéo dài, nhưng cung đầu có mục tiêu và kết quả đủ trọn: bốn tuyến bị chia cắt được nối lại ở mức an toàn, những cộng đồng từng đối đầu có cách cùng sử dụng chúng, các sinh cảnh vẫn tiếp tục tồn tại. Tinh Môn là kết quả của phục hồi này, không phần thưởng ngẫu nhiên sau boss.

## Hành trình cảm xúc và cơ thể — PROPOSED

| Chương | Trải nghiệm cảm xúc | Xung đột riêng / cách thức tỉnh | Kết quả địa phương / vì sao phải đi tiếp |
| --- | --- | --- | --- |
| I — Quy | Ngạc nhiên có thân thể → sợ hại nơi vừa cứu mình → học bảo tồn bằng hiểu dòng | Người giữ sanctuary khóa kênh để tránh mất vùng trú; Quy thức trước, sau đó người chơi mới phục hồi nước | Dòng được phân nhánh an toàn và nơi trú giữ lại; hồi lưu hé tuyến địa nhiệt lên đảo, đầu kia vẫn có vấn đề nhiệt |
| II — Phượng | Tò mò về ấm/lửa → nhận ra đổi mới có giá → học điều tiết | Người bảo vệ sinh cảnh bazan sợ khởi động núi lửa xóa nơi ở; Phượng thức từ cấu trúc bảo tồn sau chuẩn bị nước/đường xả | Nhiệt trở lại ở các tuyến chọn, đảo không thành biển dung nham; thermal tới trời cần tìm vì dòng khí đang dội ngược |
| III — Long | Tự do mở rộng → thấy kiểm soát tuyệt đối cũng gây nghẽn → nhận trách nhiệm | Người điều hành mạng khí muốn một quyền kiểm soát duy nhất; Long được đồng bộ từ dấu thức/nút, không trứng | Nhiều nhánh có lối hồi áp và quyền tiếp cận, tuyến tới Vạn Sinh hiện ra vì nút sống trên đó còn thiếu kết nối |
| IV — Ly | Muốn chữa tất cả → đối diện thứ đã mất và cái mới đáng giữ → chấp nhận chăm sóc thay sở hữu | Người bảo vệ hệ thích nghi chống “khôi phục nguyên trạng”; Ly thức nhờ các quan hệ sống được phục hồi, không chỉ thắng trận | Mạng sống hỗ trợ tuần hoàn bốn hệ, cổng đáp ứng; thế giới địa phương có thể tiếp tục sống, bí ẩn rộng hơn được mở |

## Chuỗi nhân quả vĩ mô

Các event có đầy đủ cause/actors/location/objective/outcome/dependency ở [handoff](STORY_IMPLEMENTATION_HANDOFF.md); [timeline](STORY_TIMELINE.md) và [mission catalog](QUEST_DESIGN_OUTLINE.md) dùng cùng 24 event IDs, không thêm tuyến song song mâu thuẫn.

1. `evt_01_quy_awakes`: nhiễu động sanctuary + vật mang còn sống + cộng hưởng → cơ thể đầu; sự im lặng của các nhánh khác là bí ẩn đầu, không một lời tiên tri.
2. `evt_02_read_reef` → `evt_05_restore_water`: observation, tàn tích và đối đầu địa phương chứng minh khóa kênh giữ nơi này nhưng làm nơi khác suy; khôi phục có hồi lưu thay phá mọi khóa.
3. `evt_06_surface_route` → `evt_08_phuong_awakes`: nước đã trở lại nhưng đường nhiệt không thể tự hoạt động; chuẩn bị xả an toàn mới kích hoạt cấu trúc Phượng. Người chơi không cần Phượng để tới Phượng.
4. `evt_09_thermal_evidence`: **midpoint về nhận thức** — dấu hạ tải có chủ ý cho thấy sự vắng mặt không đơn giản là chết/bỏ rơi; “thêm năng lượng” có thể làm tai họa nặng hơn. Chưa xác nhận sự tự nguyện hay thủ phạm.
5. `evt_10_protect_outlets` → `evt_12_thermal_ascent`: thắng/giải tỏa xung đột không tự bật núi lửa; kiểm chứng đường xả trước, giữ sinh cảnh, thermal ổn định mới cho đi lên.
6. `evt_13_air_routes` → `evt_16_restore_wind`: ký ức/nút khí cần nhiều góc nhìn; đối đầu tư tưởng “một người giữ mọi dòng” chuyển từ chiếm quyền sang mạng có lối hồi; Long không thay Phượng trong mọi điều kiện.
7. `evt_17_living_corridor` → `evt_21_ly_awakes`: trên cao còn hệ sống thật, không chỉ gió và đá; người chơi thực hiện phục hồi quan hệ trước khi có Ly, rồi Ly giúp điều phối rộng hơn.
8. `evt_22_stabilize_life` → `evt_23_activate_gate`: cả bốn hệ được đo/đọc cùng hoạt động ổn định; đóng góp các dạng là chuỗi tác động bền vững, **không bốn avatar cùng active hoặc cần stage III tất cả**.
9. `evt_24_local_epilogue`: nhìn lại các nơi đã thay đổi và các cơ thể đã cho mình trải nghiệm; cổng đưa dấu vết một lịch sử rộng hơn, không đưa người chơi sang hành tinh mới.

## Năm trụ cột kể chuyện — CONFIRMED định hướng Task 05

Hiện thân làm thay đổi cách hiểu nơi chốn; sinh thái có nguyên nhân/hệ quả; combat có động cơ và kết quả; ký ức nhiều điểm nhìn chưa đầy đủ; thế giới đáp ứng nhưng không bất ngờ xóa đường hoàn tất collection. Các mission minh họa cụ thể đều PROPOSED. Không biến combat thành bài kiểm tra đạo đức ở mọi vùng, không bắt kill-count grind và không nhồi mọi hệ vào mở đầu.

## Kết cung và cảnh cuối — PROPOSED S05-P10

Sau khi các tuyến địa phương đã ổn định, một khoảng im lặng tại công trình cổng ở Vạn Sinh cho người chơi tự chạm/đọc bốn nhánh. Vệt nước, nhịp nhiệt, luồng khí và phản hồi rễ nối tiếp chứ không bùng nổ đồng loạt. Mỗi lần xác nhận là một trạng thái thế giới đã kiếm được, không triệu hồi form ngoài loadout.

Các khe CL01 từng vô nghĩa giờ đáp ứng như bộ điều tiết; nhịp CL05 xuất hiện trong đúng thứ tự hồi lưu. Một cửa nhìn/tiếng vọng ngắn từ bên kia cho thấy dấu tích tương tự xuất hiện trong nhiều môi trường xa: biến cố địa phương là phần của lịch sử rộng hơn, **không tiết lộ ai gây ra, nguồn gốc Tinh Linh hoặc một phản diện tối hậu**. Hình/âm bên kia là brief Missing, không art đã có.

Trước khi kết, người chơi nhìn thấy đường nước có sinh vật trở lại, khe nhiệt có lối tránh, tuyến khí không còn độc quyền và mảng sống cũ/mới cùng tồn tại. Epilogue ngắn đặt lại quyền điều khiển trong thế giới hiện tại với route quay về và follow-up, không khóa game chờ expansion. Không cần montage dài hoặc lời thoại giải thích toàn cosmic truth.
