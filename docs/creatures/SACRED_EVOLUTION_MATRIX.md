# Ma trận 12 dạng tiến hóa

**CONFIRMED:** bốn species có ba major stages Thức Tỉnh / Trưởng Thành / Thức Tỉnh Nguyên Sơ; progression riêng, không buộc ngưỡng giống nhau. **PROPOSED C04-P06:** tên, stageId và mọi gate/anatomy/mechanical delta trong bảng. Không coi số thứ tự stage là level hoặc rarity. Hồ sơ loài là nguồn giải phẫu chi tiết, abilities là nguồn luật chiêu.

| StageId / tên ứng viên | Anatomy/silhouette cốt lõi | Movement/combat | Environmental delta | Điều kiện phát triển ứng viên, không level cuối |
| --- | --- | --- | --- | --- |
| `quy_s1` / Quy Khởi Triều | Mai oval thấp, đầu nêm, bốn chi màng | Bơi/lặn, basic và dòng đẩy ngắn | Cảm chiều dòng/cơ cấu đơn | Bootstrap thức Quy + học cảm giác thân thể |
| `quy_s2` / Quy Hộ Lưu | Mai dẹt có kênh viền, vây trước rộng, đuôi lái | Hãm dòng, chặn hướng S2 | Đọc nhịp áp và chuyển nhánh có hồi lưu | Thử dùng dòng + giữ hướng, phát triển riêng loài |
| `quy_s3` / Quy Hải Uyên Nguyên Sơ | Mai xếp tầng dẫn vào–ra, vây có mặt lực | Hồi lưu S3 và điều hướng tinh luyện | Cụm hồi lưu nhiều nhánh có giới hạn | Chứng minh khôi phục dòng bền vững, không chỉ stat |
| `phuong_s1` / Phượng Sơ Diệm | Chim gọn thân ngà, cánh vàng, đuôi crimson ít dải | Lướt ngắn, basic và đạn S1 | Cảm nhiệt/cơ cấu đơn | Thức sanctuary và học đặt nhiệt an toàn |
| `phuong_s2` / Phượng Dực Nhật | Vai/lông sơ cấp và đuôi phát triển tương đối | Lượn thermal, vùng nhiệt S2 | Điều tiết xả nhiệt, chọn điểm đáp | Dùng thermal và kiểm soát khoảng nhiệt |
| `phuong_s3` / Phượng Hoàng Nhật Diệm Nguyên Sơ | Cánh phân tầng và đuôi nhiều dải có khoảng âm | Đường bùng Hỏa S3, điều phối lượn | Cụm chu kỳ địa nhiệt, không miễn dung nham | Làm chủ nhiệt có đường hồi/xả; mapping reference chưa chốt |
| `long_s1` / Long Sơ Phong | Rồng dài S nhẹ, đầu sừng/4 chân/đuôi đọc được | Lượn luồng cục bộ, basic cắt và S1 lane | Cảm hướng nút khí | Nối đủ dấu thức cho một hiện thân; không trứng |
| `long_s2` / Long Vân Hành | Cổ/eo dài tương đối, bờm/chi và S rõ | Đổi lane, S2 lệch đạn có hướng | Chỉnh nhánh qua timing | Điều khiển hướng/áp có đường thoát |
| `long_s3` / Long Thiên Phong Nguyên Sơ | Thân phân bố khối dài, bờm/đuôi đầy, xuyên mây có khe hở | Chuỗi khí S3, đổi hướng nâng cao | Nối mạng khí tới Vạn Sinh | Kiểm soát mạng, không tự cấp quyền mọi cơn bão |
| `ly_s1` / Ly Sơ Mầm | Guardian ngực rõ, bốn chi, gạc cành ngắn | Chạy/nhảy, basic và rễ S1 | Cảm nút sống/tăng trưởng cục bộ | Đủ quan hệ sống cho thức tỉnh, không chỉ mana |
| `ly_s2` / Ly Kết Diệp | Vai/collar/gạc/đuôi khác tỷ lệ stage I | Bám điểm cây hợp lệ, vùng hồi S2 | Nối đối tác/rễ | Duy trì quan hệ có nước/vật chất và nguồn sống |
| `ly_s3` / Ly Vạn Sinh Nguyên Sơ | Vòm gạc rỗng, cấu trúc nhánh nối cổ–lưng | Mạng Mộc S3, traversal theo cụm | Phục hồi quan hệ đa dạng còn khả thi | Điều phối hệ sống, không hồi sinh mọi cá thể đã mất |

Mỗi bước lên stage cần đủ điều kiện loài và progression đã được duyệt ở task balance sau. Bảng không tự đặt ngày/chapter checkpoint chính xác hoặc level cap. Không tự thêm yêu cầu “bốn Sacred đều stage III” để tái kích hoạt Tinh Môn; kết chương dựa điều kiện phục hồi bốn hệ của Task 02, không chỉ chỉ số tiến hóa.

## Kế thừa và khác biệt — PROPOSED

Stage II giữ basic/mobility/S1/passive I, mở biến thể cấu trúc và S2 khi điều kiện skill riêng đạt. Stage III giữ các công cụ cũ, cho mức điều khiển/traversal nâng cao và S3 khi đạt condition. `minimumStage` là điều kiện cần, không tự grant mọi skill khi evolution. Không đưa toàn bộ abilities vào stage I chỉ vì species Sacred.

Một species → một formId ổn định → ba stageIds, một stage hiện dùng đã commit. Không equip nhiều stage của cùng species, không tách XP/HP thành ba cá thể để heal/tránh khóa. R03-P09 hoãn evolution khi boss hoặc thiếu chỗ vẫn PROPOSED; Task 04 dùng làm giả định tham chiếu, không phê duyệt ngầm toàn bộ Task 03.

## Kích thước, collision và rendering — PROPOSED C04-P07

| Thành phần | Hợp đồng tương lai |
| --- | --- |
| Visual envelope | Dữ liệu khung hình tối đa của thân/cánh/gạc/đuôi theo hướng và posture, tách FX/mây; không bắt mọi stage vào 96px |
| Footprint | Vùng chiếm chỗ ở mặt đất/mặt nước theo body core và posture có asset; không bằng cả bounding box hình |
| Hurtbox | Phần hiện thân có thể nhận đòn với quy tắc nhất quán và dễ đọc; cloud/particle không là hurtbox |
| Attack hitbox | Theo từng phase/animation marker; cánh/đuôi vẽ to không tự gây damage ngoài marker/shape được khai báo |
| Anchor/depth | Điểm chân/core ổn định qua idle/move/hurt/turn; draw-order theo ground projection, có occlusion test từng stage |
| Passage | Chỉ chọn compact posture khi có art/clip và clearance thật; không scale nhỏ whole-sprite hay crop cứng để lách |
| Long đặc biệt | Curve/envelope và các đoạn thân cứng phải vừa hành lang, kể cả khi core footprint nhỏ. Chọn segment/envelope implementation ở task prototype, không coi engine hiện hỗ trợ |
| Camera | Duy trì integer sampling và đủ biên envelope, kiểm tra 390×844, 360×800, 844×390, 1920×1080; không lấy FX sáng để che cắt sprite |

Evolution là transaction: validate conditions/assets → chờ ngoài lock/safe point → kiểm tra footprint/envelope mới → commit stage/visual/config cùng revision. Giữ tỷ lệ HP, HP0 vẫn HP0, không reset cooldown. Nếu không vừa: giữ stage cũ đã commit, đánh dấu pending và chỉ dẫn đến vùng đủ chỗ; không xóa tiến trình, tự biến lại stage I hoặc dịch xuyên vách. Sau commit, lối hẹp phải có posture hợp lệ, đường vòng hoặc safe retreat được thiết kế trước; không tạo map khiến người chơi bị kẹt sau tiến hóa.

Stage III lớn/uy nghi qua anatomy, khoảng âm và nhịp animation, không nhất thiết tăng footprint tới mức phá tilemap. Kích thước sprite/collider cụ thể và posture repertoire còn UNRESOLVED trước art blocking/prototype. Không nhận bộ 12 sprite đã tồn tại.
