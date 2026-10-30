# Mục lục lore và kiểm tra tính liên tục — Task 02

## Mục lục và quyền hạn tài liệu

- [Lịch sử thế giới](WORLD_HISTORY.md): bối cảnh trước/sau biến cố, địa lý và văn minh.
- [Tuần hoàn nguyên tố](ELEMENTAL_COSMOLOGY.md): sinh thái, ngoại lai và Tinh Môn.
- [Biến cố](ANCIENT_CATASTROPHE.md): bảy pha nhân quả, giải thích làm việc của tác giả.
- [Tứ Linh](SACRED_CREATURES.md): bốn trạng thái vắng mặt và điều kiện thức tỉnh.
- [Linh thể/cộng hưởng](SPIRIT_AND_RESONANCE.md): giới hạn và phần cơ chế chưa chốt.
- [Lịch tiết lộ](CHAPTER_REVELATIONS.md): bằng chứng, ký ức, clue và chuyển chương.
- [Niên biểu](LORE_TIMELINE.md): mốc tương đối, không đặt ngày lịch sử giả.
- [Changelog](LORE_CHANGELOG.md): nguồn và các cập nhật Task 01.

Thứ tự thẩm quyền: chỉ dẫn mới của người dùng → quyết định CONFIRMED có nguồn → mô hình PROPOSED. Tài liệu lịch sử/asset/runtime không tự xác nhận canon. “Sự thật tác giả” của mô hình đề xuất chỉ là một phương án nhất quán để biên tập; chưa được nâng thành sự thật đã duyệt. Tài liệu repository công khai có thể chứa spoiler, không phải nội dung hội thoại game.

## Tài liệu đã đọc

Task 01: GAME_VISION, PROJECT_DECISIONS, OPEN_QUESTIONS, PROJECT_SCOPE, CORE_DESIGN_PILLARS, ASSET_REFERENCE_REGISTER, DEVELOPMENT_WORKFLOW và REPOSITORY_AUDIT. Tài liệu Dawn/architecture/provenance từ công việc trước cung cấp nền kỹ thuật, không chứng minh chuyện Tứ Linh đã triển khai. Baseline Task 02 là `37b977f`. Không có bộ lore chuyên biệt trong `docs/lore/` trước task này.

## Kiểm tra xung đột và hướng xử lý

| ID | Vấn đề | Cách xử lý trong Task 02 / trạng thái |
| --- | --- | --- |
| A01 | Task 01 chưa chốt tên vùng Ly; Task 02 chỉ rõ tên | CONFIRMED: dùng Tiên Cảnh Vạn Sinh, cập nhật GAME_VISION/asset register có log; không tự đặt tên khác |
| A02 | Task 01 kết thúc “hé lộ/phát hiện” cổng; Task 02 yêu cầu tái kích hoạt | CONFIRMED: cuối IV có tái kích hoạt thực; mở hành trình liên hành tinh vẫn ngoài scope. Cơ chế tải nhỏ/tín hiệu là PROPOSED, không lùi kết quả này tới expansion |
| A03 | Hiến tế có thể bị hiểu là chết rồi hồi sinh vô hạn | Giữ D17 PROPOSED; đề xuất cấu trúc sống còn/đình chỉ thay chết hoàn toàn. Không xác nhận tự nguyện |
| A04 | Nếu Tứ Linh là pin giữ khóa, đánh thức từng vị sẽ mở cổng sai lúc | PROPOSED: đóng cổng là cấu hình tải thấp, không đòi ý chí liên tục; phục hồi hồi lưu trước khi tăng tải |
| A05 | Núi lửa ngủ nhưng mầm Phượng cần nhiệt | PROPOSED: ngủ về chu kỳ hoạt động lớn, còn nhánh địa nhiệt bảo trì; sanctuary ngoài kênh phun. Không miễn nhiễm mọi nhiệt |
| A06 | Long là ý thức trong “gió” có thể vô hạn và mất vật mang | PROPOSED: các nút khí có cấu trúc gắn địa hình/công trình, không mọi phân tử khí; số nút và thân phục hồi UNRESOLVED |
| A07 | Ly có Sinh Mệnh sao không tự phục hồi | PROPOSED: thiếu quan hệ/đối tác và vật chất khả thi; hồi phục không chỉ cấp năng lượng. Không tạo lại cá thể mất hoàn toàn |
| A08 | Cổng đóng vẫn có nhiễu động Quy | PROPOSED: dòng nội giới bị trầm tích đổi hướng, không cần cổng tự mở trước I; nguồn gốc/đúng lúc linh thể vẫn UNRESOLVED |
| A09 | Lôi/Kim “ngoại lai” có thể phủ nhận sét/kim loại vốn tồn tại | PROPOSED là ngành nguyên tố/kiểu năng lượng, không khẳng định vật chất tự nhiên trước đó không tồn tại |
| A10 | Đổi dạng, ý chí gốc và respawn có thể xung đột | Task 02 chỉ đề xuất giới hạn, không chốt vật lý chuyển dạng hoặc giải thích respawn hiện tại; để task hệ thống riêng |
| A11 | Khôi phục nguyên trạng xóa sinh cảnh mới hoặc khóa collection | PROPOSED: mục tiêu cân bằng sống được có cả loài thích nghi; chưa đặt quest lựa chọn phá hủy/khóa vĩnh viễn |
| A12 | Dawn hiện hữu có Phoenix, mở đầu mới là Quy | Giữ D24 UNRESOLVED: không rename map, không đổi runtime hoặc mặc định Dawn là Đảo Nhật Diệm |
| A13 | Ký ức hồi phục có thể làm lộ nguyên nhân sâu nhất quá sớm | PROPOSED: ma trận I–IV và clue CL01–CL05 có nguồn/giới hạn; sự tự nguyện, linh thể và bản chất cổng vẫn chưa biết |

## Danh mục đề xuất để duyệt về sau

| ID | Đề xuất / nguồn chính | Ranh giới |
| --- | --- | --- |
| L02-P01 | Địa lý nhiều tầng và tuần hoàn có giới hạn — WORLD_HISTORY/ELEMENTAL_COSMOLOGY | Chưa chốt map/khoảng cách/cơ chế nâng đảo cuối |
| L02-P02 | Mạng cộng đồng cổ xem Tứ Linh là đối tác, đền có công năng — WORLD_HISTORY | Chưa đặt tên phe, loài hoặc thể chế canon |
| L02-P03 | Điểm nối tự nhiên + công trình điều tiết, vận hành có tải — ELEMENTAL_COSMOLOGY | Nguồn gốc tối hậu UNRESOLVED |
| L02-P04 | Tiếp xúc/ngoại lai, phân biệt thích nghi–song nguyên tố–cưỡng ép | Lôi/Kim vẫn là ứng viên, không roster cuối |
| L02-P05 | Bảy pha quá tải–can thiệp–cô lập — ANCIENT_CATASTROPHE | Không xác nhận thủ phạm hoặc tự nguyện |
| L02-P06 | Nhiễu động gần do đổi dòng + cộng hưởng, không đáp án linh thể | Không biến trùng thời thành lời tiên tri |
| L02-P07 | Bốn cách bảo tồn/vắng mặt — SACRED_CREATURES | Không tạo sprite, cơ thể cuối hoặc hồi sinh chết hoàn toàn |
| L02-P08 | Giới hạn cộng hưởng và hiện thân — SPIRIT_AND_RESONANCE | Chưa chốt mô hình vật lý/đạo đức/HP switching |
| L02-P09 | Lịch tiết lộ, ký ức có điểm nhìn và CL01–CL05 | Không phải lời thoại hay quest được duyệt |
| L02-P10 | Tuyến chuyển chương có traversal và kết thúc địa phương | Không áp thông số di chuyển mới lên prototype |

## Câu hỏi và điều kiện cho Task 03

Nguồn gốc linh thể; nguyên nhân sâu/động cơ tăng tải; sự tự nguyện; bản chất điểm nối vẫn mở theo Q01–Q05. Cần duyệt/đặc tả riêng mô hình biến hình, vật mang bản sắc, ý chí gốc/đồng thuận, HP/defeat, bộ ba và khóa boss; không dùng mô hình đề xuất làm luật triển khai ngầm. Quy trứng hay lõi vẫn chưa chốt; ưu tiên ngôn từ không làm mất cấu trúc sống bên trong.

Task 03 chỉ bắt đầu khi có yêu cầu riêng. Không cần khóa mọi bí ẩn vũ trụ để thiết kế quy tắc cộng hưởng. Không cần generate reference thiếu trong task lore.

## Kết quả kiểm tra tài liệu

Đã đối chiếu bốn nguyên tố/vùng, bảy pha, bốn trạng thái vắng mặt, giới hạn Sinh Mệnh, các nguồn ký ức, đường nối chương và phạm vi expansion. Rủi ro còn lại là **đề xuất chưa được phê duyệt**, không phải tính năng đã hoàn tất. Kiểm tra đường dẫn/diff được thực hiện trước commit; không dùng test gameplay cũ làm bằng chứng task này. Không thay gameplay, UI, input, art, animation hoặc engine.

## Tiếp nối Task 03

Yêu cầu Task 03 đã được người dùng cung cấp riêng. L02-P08 có đặc tả ứng viên chi tiết tại [RESONANCE_DECISION_RECORD](RESONANCE_DECISION_RECORD.md); core/imprint, switch, defeat và persistence chưa được nâng thành CONFIRMED. Không thay đổi bí ẩn nguồn gốc hoặc sự tự nguyện của biến cố.
