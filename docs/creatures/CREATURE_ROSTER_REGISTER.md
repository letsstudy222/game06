# Creature roster register

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

## Evidence và ID policy

Trước khi sửa ở baseline `b610b56`, đã tìm tên tiếng Việt và các cụm tên trong Markdown/JSON dưới docs/assets, đồng thời kiểm kê tên tệp tài nguyên. Không tìm thấy tám tên loài phụ và mười hai tên wildlife do Task12 cung cấp. Repo có hồ sơ chữ của bốn Tứ Linh và bốn họ tham chiếu E10. Nhãn **EXTERNAL CONCEPT REFERENCES — NOT VERIFIED IN REPOSITORY** ghi nguồn là đề bài Task12 §10/11; chưa có bằng chứng ảnh hoặc phê duyệt thiết kế trong repo. Việc ghi tên vào sổ này không tạo bằng chứng phê duyệt trước đó. Không nhận đã xem ảnh từ các cuộc trò chuyện cũ.

Các khóa `ref_*` chỉ định danh bản ghi tham chiếu nháp, không phải speciesId/formId chính thức. Gán stable speciesId sau khi thiết kế được duyệt và đối chiếu catalog C04. Độ hiếm, khả năng chơi được, nguồn bản địa/ảnh hưởng ngoại lai và nguyên tố của các tham chiếu mới đều chưa chốt. Các mô tả giải phẫu và cơ chế dưới đây là **PROPOSED**, không suy thiết kế thật từ tên gọi. Nhãn Earth lịch sử nếu được cung cấp phải giữ nguyên nguồn và đánh UNRESOLVED; không tự thêm nguyên tố thứ bảy, đổi sang Metal hoặc xóa concept.

## Bốn Tứ Linh có hồ sơ chữ, giữ đủ 12 dạng

| CreatureId ứng viên / name | Chapter | Element / designation | Stages | Runtime vs planned | Art evidence |
| --- | --- | --- | --- | --- | --- |
| quy_hai_uyen / Quy Hải Uyên | I | Thủy / sacred confirmed | 3: `quy_s1`, `quy_s2`, `quy_s3` | Planned chơi được, chưa runtime Quy | Text direction đã duyệt, ảnh/clips còn thiếu |
| phuong_hoang_nhat_diem / Phượng Hoàng Nhật Diệm | II | Hỏa / sacred confirmed | 3: `phuong_s1`, `phuong_s2`, `phuong_s3` | PlayerPhoenix hiện hữu, không mapping 3 stages | Reference và atlas đã xem Task12;2 poses×3 directions, no full stage certification |
| long_thien_phong / Long Thiên Phong | III | Phong / sacred confirmed | 3: `long_s1`, `long_s2`, `long_s3` | Planned chơi được | Text elongated dragon đã duyệt, ảnh/clips còn thiếu |
| ly_van_sinh / Ly Vạn Sinh | IV | Mộc / life authority, sacred confirmed | 3: `ly_s1`, `ly_s2`, `ly_s3` | Planned chơi được | Text guardian đã duyệt, ảnh/clips còn thiếu |

Full stage IDs và chi tiết ở [12-form nguồn](SACRED_EVOLUTION_MATRIX.md), không abbreviations trên thành IDs mới. Current runtime chỉ Phoenix avatar theo GameState/PlayerPhoenix; Dawn không tự Nhật Diệm. Plannedspecies ≠ working collection/controller.

## Eight important phụ references — planning target two stages

Tất cả 8 entries: **EXTERNAL CONCEPT REFERENCES — NOT VERIFIED IN REPOSITORY**; chưa art path, chưa inspect ed image, chưa final thiết kế/name/phê duyệt loài. Two stages là target, không stage count confirmed nếu sheet bên ngoài có 3 forms.

| Reference key | Display tham chiếu | Chapter | Anatomy giả thuyết | Primary differentiation giả thuyết | Element classification | Stages / chơi được / assets |
| --- | --- | --- | --- | --- | --- | --- |
| `ref_i_sua_ngoc_bien_sao` | Sứa Ngọc Biển Sao | I | Chuông sứa đối xứng tỏa tia | Co chuông để bơi tự do, tay tỏa theo cột nước; khác polyp bám nền | Thủy — giả thuyết, chưa duyệt | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_i_ca_chep_nguyet_chau` | Cá Chép Nguyệt Châu | I | Thân cá kéo dài, cuống đuôi và vây rõ | Đổi nhịp đuôi/vây để đọc dòng; không chỉ thêm ánh ngọc | Thủy — giả thuyết, chưa duyệt | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_ii_bo_giap_tu_thiet` | Bọ Giáp Tử Thiết | II | Chân khớp, vỏ giáp phân mảng | Chống đỡ rồi mở khớp để xả; có khoảng phục hồi | Hỏa–Kim — cần bằng chứng; tên Thiết không xác nhận Kim | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_ii_thach_sung_tro_do` | Thạch Sùng Tro Đỏ | II | Bò sát thân thấp, đuôi và bộ phận bám | Bám và đổi điểm tựa trên đá; leo trèo chỉ là khả năng đề xuất | Hỏa — giả thuyết; màu đỏ không đủ xác nhận | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_iii_hac_van_tieu` | Hạc Vân Tiêu | III | Chim có chân và cổ dài | Hạ đáp/kiếm ăn ở bãi yên, nhịp lượn khác chim săn | Phong — giả thuyết, chưa duyệt | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_iii_loi_ung_dien_vu` | Lôi Ưng Điện Vũ | III | Chim có cơ quan tích/xả cần thiết kế riêng | Chuẩn bị đường xả rồi đổi hướng; khác đòn bổ nhào thông thường | Phong–Lôi — giả thuyết; không mặc định thù địch | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_iv_loc_hoa_sinh` | Lộc Hoa Sinh | IV | Thú ăn thực vật bốn chân, chưa duyệt anatomy | Cúi đầu kiếm ăn và chuyển trọng tâm, tránh gạc/hình hộ vệ giống Ly | Mộc — giả thuyết, không quyền năng Life | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |
| `ref_iv_kim_vu_ngan_linh` | Kim Vũ Ngân Linh | IV | UNRESOLVED — tên không xác định nhóm sinh học | Cần ảnh/brief gốc trước khi chọn chim, côn trùng hoặc cấu trúc khác | UNRESOLVED — chữ Kim không xác nhận Metal | 2 giai đoạn mục tiêu / UNRESOLVED / Missing |

## Ordinary named concepts —12 external references

Tất cả 12 entries: **EXTERNAL CONCEPT REFERENCES — NOT VERIFIED IN REPOSITORY**; one main form planning target, không final species/element/art phê duyệt. Anatomy/mechanic below đều **PROPOSED**, cần bản ý tưởng trước art verdict.

| Reference key | Display tham chiếu | Chapter | Anatomy giả thuyết | Primary differentiation giả thuyết | Element classification | Forms / chơi được / assets |
| --- | --- | --- | --- | --- | --- | --- |
| `ref_i_hai_quy_bong_xanh` | Hải Quỷ Bông Xanh | I | Polyp bám nền — giả thuyết | Thu/xòe xúc tua tại chỗ thay chuông sứa trôi | Thủy — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_i_ca_duoi_luu_quang` | Cá Đuối Lưu Quang | I | Thân cá đuối dẹt, mặt vây rộng | Lượn thấp và gợn vây, khác nhịp đuôi cá chép | Thủy — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_i_oc_da_san_ho` | Ốc Đá San Hô | I | Thân mềm có vỏ và chân cơ | Bám nền/co chân, không sao chép mai lớn của Quy | UNRESOLVED — đá không là nguyên tố Earth | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_i_ca_ngua_thuy_anh` | Cá Ngựa Thủy Ảnh | I | Cá thân đứng, đuôi có khả năng bám | Neo/thả theo dòng, không tăng tốc tự do mọi hướng | Thủy — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_ii_hoa_ho_ly_diem_anh` | Hỏa Hồ Ly Diệm Ảnh | II | Thú bốn chân thân thấp | Chạy–dừng–lắng nghe trên nền, không đuôi lửa như mào/cánh Phượng | Hỏa — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_ii_thach_giap_dung_nham` | Thạch Giáp Dung Nham | II | Giáp xác hoặc chân khớp — chưa chốt | Bước lệch bên qua khớp chịu lực; cần concept gốc để phân loại | UNRESOLVED — đá/dung nham không xác nhận Earth | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_ii_dieu_viem_xich` | Điểu Viêm Xích | II | Chim gọn, đuôi ngắn | Kiếm ăn trên nền, cất cánh ngắn; không sải/đuôi giống Phượng | Hỏa — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_ii_ky_nhong_dung_nham` | Kỳ Nhông Dung Nham | II | Lưỡng cư hay bò sát — taxon UNRESOLVED | Uốn thân sát rìa nhiệt, khác kiểu bám của thạch sùng | Hỏa — giả thuyết, không miễn dung nham | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iii_van_loc_phi_duong` | Vân Lộc Phi Dương | III | Thú bốn chân — giả thuyết | Chạy/nhảy với chân đỡ; không cấu trúc gạc cây của Ly | Phong — tên Phi không cấp khả năng bay | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iii_ung_phong_kich_vu` | Ưng Phong Kích Vũ | III | Chim sải rộng — giả thuyết | Lượn, bổ nhào rồi phục hồi; không sao chép cơ quan tích điện | Phong — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iii_rua_phong_van_giap` | Rùa Phong Vân Giáp | III | Bò sát có mai — giả thuyết | Giữ thăng bằng trên nền; khác mai dẫn dòng và tư thế của Quy | Phong — không tự biết bay vì tên gọi | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iii_buom_van_mong` | Bướm Vân Mộng | III | Côn trùng có cánh — giả thuyết | Vỗ cánh nhẹ và hạ đậu linh hoạt | Phong — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |

## ChapterIV thông thường — redesign briefs, không accepted species

Task12§11 **CONFIRMED rejection constraint:** batch 4 thông thường trước bị bác vì silhouette ítđa dạng; không có ảnh/tên/ID batch đó được xác minh trong repo. Không fabricate bị bác art path/names. Four directions dưới là **PROPOSED REDESIGN BRIEF**, không external image đã xem hoặc đã duyệt replacement. Giữ rejection provenance, không xóa bản ý tưởng cũ nếu sau được cung cấp.

| Reference key | Brief | Chapter | Anatomy direction | Differentiation requirement | Element classification | Forms / chơi được / assets |
| --- | --- | --- | --- | --- | --- | --- |
| `ref_iv_flower_redesign` | Loài hoa sống — hướng thiết kế lại | IV | Hoa sống, tỏa tia hoặc rễ thấp | Mở/khép và đổi hướng phiến, không cơ thể hươu | Mộc — giả thuyết | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iv_fungal_redesign` | Loài nấm cổ — hướng thiết kế lại | IV | Nấm có mũ/cuống hoặc quần thể sợi | Nhịp rung và quan hệ giá thể, không gạc phân nhánh | Mộc hoặc UNRESOLVED — nấm không tự có affiliation Mộc | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iv_insect_redesign` | Loài côn trùng — hướng thiết kế lại | IV | Côn trùng — hình thái chưa chốt | Cần silhouette khác Bướm và Kim Vũ sau khi có tham chiếu | UNRESOLVED | 1 dạng chính mục tiêu / UNRESOLVED / Missing |
| `ref_iv_reptile_redesign` | Loài bò sát rừng — hướng thiết kế lại | IV | Bò sát rừng thân thấp | Bám/bò với cấu trúc ngụy trang; khác thú móng guốc/hộ vệ | Mộc hoặc UNRESOLVED | 1 dạng chính mục tiêu / UNRESOLVED / Missing |

## Count summary và scope

| Chapter | Sacred | Secondary references | Ordinary references/briefs | Approval boundary |
| --- | --- | --- | --- | --- |
| I | Quy,3 stages confirmed | 2 external,2 stages each target | 4 external,1 main form target | New roster/play scope/art pending |
| II | Phượng,3 stages confirmed | 2 external,2 stages target | 4 external,1 main form target | ExistingPhoenix không chứng minh other 6 species assets |
| III | Long,3 stages confirmed | 2 external,2 stages target | 4 external,1 main form target | No new bản ý tưởng images accessible |
| IV | Ly,3 stages confirmed | 2 external,2 stages target | 4 redesign briefs, old batch bị bác | Không 4 đã duyệt thông thường designs |

4Sacred +8 phụ references +12 thông thường external +4 redesign briefs =28 planning entries, **không 28 đã duyệt species hoặc 28 runtime creatures**. Eight/approximatelysixteen chỉ target đầu cung, không final world roster hoặc firstplayable quota. FourE10pairfamilies không tính thêm 4 species vào 28. Boss identities/names vẫn pending sourcesS05/F06, không tự thêm boss roster. [Ecology](CREATURE_ECOLOGY_GUIDE.md), [overlap](CREATURE_SIMILARITY_AUDIT.md), [asset evidence](../ASSET_REFERENCE_REGISTER.md) giữ đánh giá gates.
