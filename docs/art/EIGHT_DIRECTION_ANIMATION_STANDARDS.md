# Chuẩn animation tám hướng

Nguồn: [AB33-S04/S08/S10/S12](ART_BIBLE_MASTER.md), [helper hướng28](../technical/TASK28_DIRECTIONAL_ANIMATION.md), [animation chung](CREATURE_ANIMATION_REQUIREMENTS.md). **CONFIRMED:** yêu cầu trình bày/di chuyển tám hướng, tách movement và attack-facing về khái niệm. Helper renderer đã có; art Quy chưa có. **PROPOSED AB33-P04:** các tiêu chí authoring và phạm vi bên dưới. **UNRESOLVED:** số frame, timing, bố cục atlas và fallback được duyệt. **SUPERSEDED:** giữ lịch sử nguồn; không tự đánh dấu đề xuất bốn hướng cũ là quyết định đã bị thay.

## Hướng theo mặt phẳng màn hình

Trục x sang phải, y xuống; vector đường chéo được movement normalize, không tăng tốc qua art. Chuỗi enum runtime là e,se,s,sw,w,nw,n,ne; bảng sau xếp theo tên để tiện vẽ.

| Hướng | ID | Vector dấu | Điểm kiểm anatomy PROPOSED |
| --- | --- | --- | --- |
| Bắc | n | 0,-1 | Mai/lưng đọc rõ nhưng đầu vẫn có dấu định hướng |
| Đông bắc | ne | +1,-1 | Chi xa lộ có chủ đích, cổ không biến mất dưới mai |
| Đông | e | +1,0 | Đầu, mai và hai lớp chi tạo đường bơi ngang |
| Đông nam | se | +1,+1 | Mặt/hàm phía gần rõ, chi không nhập viền mai |
| Nam | s | 0,+1 | Hai phía thân cân bằng, đầu tách vùng bụng |
| Tây nam | sw | -1,+1 | Kiểm anatomy riêng, không mirror vô điều kiện |
| Tây | w | -1,0 | Đọc hướng đầu/đuôi ngay khi tắt FX |
| Tây bắc | nw | -1,-1 | Giữ khoảng âm quanh chi và đầu ở góc khuất |

Góc3/4 thuộc cách vẽ mặt trên và mặt bên, không xoay cả Canvas hoặc bóp tọa độ chéo. Quy xoay khối mai và gốc chi theo cùng anatomy, không dán đầu sang cạnh khác trên mai bất biến. Gốc bơi/chiếu thân giữ liên tục; phần vây/lông/bờm có follow-through không làm cả actor rung theo frame.

## Hướng di chuyển, hướng thân và hướng đánh

**PROPOSED:** bảng authoring ghi requestedDirection, visualDirection và lý do fallback. Movement intent, body presentation và attack-facing là các dữ liệu khác nhau; sprite quantization không đổi aim/hit geometry. Khi về sau cho đi ngang/nhìn mục tiêu, cần chính sách pose đã duyệt; không tự triển khai strafing hoặc auto-aim trong art brief.

Mirroring chỉ được phép khi giải phẫu, hoa văn, thứ tự chi, ánh sáng và điểm phát hiệu ứng tương thích, có art review và metadata rõ. Dấu bất đối xứng/receiver nằm một bên hoặc pose đánh khác cần frame riêng. Helper có fallback tường minh; không tự chọn hướng gần nhất, không tự mirror chỉ vì thiếu ảnh. Mapping hướng của helper chưa phải schema manifest production hoàn chỉnh.

## Phạm vi theo milestone — PROPOSED

| Mốc | Bắt buộc để nghiệm thu mốc tương ứng | Khuyến nghị | Hoãn |
| --- | --- | --- | --- |
| S0 | Idle và swim thể hiện hướng; anchor/frame/bounds hợp lệ; phân biệt đứng/bơi và phản hồi interaction đọc được | Turn/brake riêng, idle có nhịp, biểu cảm chạm cơ cấu; có thể reuse pose khi được duyệt | Combat, hurt/defeat, resonance cinematic, evolution, boss |
| S1 | Coverage hành động thực được duyệt: anticipation/execution/recovery, defense, hurt/incapacitation nếu dùng; cộng hưởng đúng thứ tự | Chuyển pose mượt, recovery tương thích interruption | Chiêu/chuyển dạng chưa có cơ chế, full stages |
| Chương I đầy đủ | Hành động của Quy và encounter đã được phê duyệt; môi trường/đoạn truyện cần clip thật | Biến thể idles và phản ứng sinh thái | Không bắt mọi loài ambient có attack hoặc mọi loài playable |

Tám hướng là mục tiêu art mới. Một S0 dùng ít hướng vẽ hơn chỉ có thể là fallback tạm **được duyệt riêng và ghi thiếu coverage**, không được gọi là bộ tám hướng hoàn tất. Dawn giữ ba hàng vẽ/bốn hướng logic hiện hữu, không sửa atlas theo yêu cầu mới. Clip interact có thể là pose thân dùng lại cộng phản hồi đối tượng đã duyệt, không đòi animation riêng chỉ để tăng số lượng.

## Chất lượng chuyển động — PROPOSED

Idle loop nối tư thế/anchor ở đầu–cuối, chuyển động nhỏ không làm mất silhouette. Swim có pha sinh lực và thu chi, nhịp tăng/hãm theo trạng thái controller về sau; không tự đẩy world position bằng sprite offset. Giữ độ dài chi/gốc vây, số chi và hướng vật liệu giữa keyframe/extrema. Frame-count không quyết chất lượng; chỉ thêm in-between khi cải thiện đọc hướng hoặc trọng lượng.

Hành động không loop phải có mở đầu, thực thi, hồi thế và trạng thái kết thúc xác định; interruption do gameplay authority quyết, không từ hình “đã đứng dậy”. Anticipation phải khác idle và phản hồi trúng khác defense; marker phase phục vụ đồng bộ về sau, không phê duyệt active frames/damage/i-frame. Ưu tiên animation đề xuất: phản ứng bắt buộc của trạng thái hợp lệ trước locomotion rồi idle; không dùng animation priority để vượt combat guard.

Dodge chỉ có input command đã duyệt ở Task30; clip né, khoảng cách và bất tử vẫn PROPOSED/UNRESOLVED. Không bắt làm clip dodge cho S0. Số FPS/frame/duration sẽ được duyệt bằng playback; Task33 không gán timing chiến đấu qua hình.

## Bàn giao và kiểm tra tương lai

Mỗi pose/clip cần hướng, action/stage ref theo trạng thái nguồn, frame rect, anchor/bounds, loop, timing, fallback và provenance; field ngoài schema hiện tại ở sidecar brief, không giả validator kiểm chúng. Kiểm mọi hướng đổi liên tiếp, stop/start, turn180, transition qua clip, nền tương phản, FX off/on, camera biên và mobile. Không có playback Quy hoặc animation QA production đã chạy trong Task33.
