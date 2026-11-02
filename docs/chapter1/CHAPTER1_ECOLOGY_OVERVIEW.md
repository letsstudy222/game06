# Hệ sinh thái sống của Vực Hải Uyên

**CONFIRMED:** Quy là Sacred Thủy đầu tiên; bốn nguyên tố bản địa Thủy/Hỏa/Phong/Mộc, Lôi/Kim ngoại lai không mặc định xấu; Sinh Mệnh là authority riêng, không thêm Earth. Không suy hành vi/đạo đức từ rarity/affinity. Thế giới ghi nhớ thay đổi và có thể quay lại. **PROPOSED E20-P01–P11:** quan hệ thức ăn, hồ sơ sinh vật hoang dã, mẫu cấu hình AI, vị trí, tương tác và cách thu nhận chi tiết dưới đây. **UNRESOLVED:** phê duyệt loài/art, nguồn gốc bản địa cụ thể của từng tham chiếu, khả năng chơi được, mức chịu đựng sinh thái và chính sách runtime/save/reward. Không tự giải thích nguồn gốc hoặc trình tự biến cố.

Nguồn [hành vi F06](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [thích nghi/đồng hóa](../ecology/ELEMENTAL_ASSIMILATION.md), [roster B12](../creatures/CREATURE_ROSTER_REGISTER.md), [graph Task19](CHAPTER1_WORLD_GRAPH.md), [sinh thái Quy](QUY_ECOLOGY_AND_LORE.md). Đây là phần mở rộng sinh thái đọc các nguồn có thẩm quyền hiện hữu, không tạo nguồn map/roster/collection thứ hai.

## Mục tiêu và giới hạn

Sinh vật có chỗ ăn, nơi trú, đường bơi và nhịp đáp ứng với dòng; cảnh quan sống nhờ cả tảo, sinh vật nền, âm thanh tùy chọn và dấu chuyển động, không cần mọi loài thành nhân vật chơi được hoặc kẻ địch. Quan sát và giúp sinh cảnh tạo tri thức/quyền tiếp cận/bằng chứng có nguồn; không phải mọi thực thể đều cho loot. Dùng ít kiểu hành vi được cấu hình theo giải phẫu, không dùng cùng một AI truy đuổi cho mọi loài.

Tuyến chính giữ Quy I và E01–E06, không cần cộng hưởng sinh vật tùy chọn hoặc xuống F sâu. A không có địch trong tutorial; B có quan sát rồi encounter lãnh thổ giới hạn E02 nếu nội dung/chính sách được duyệt. D/F là tùy chọn; khu chuẩn bị H không sinh mối đe dọa bất ngờ. Chưa có roster gameplay/art đủ sản xuất, nên độ bao phủ dưới đây là hợp đồng cần xác thực, chưa chứng minh hệ sinh thái runtime đã tồn tại.

## Phạm vi và ngân sách tương đối

| Mức | Nội dung | Công việc / cách kiểm soát |
| --- | --- | --- |
| Lát cắt sinh thái đầu tiên bắt buộc | Quy, một sinh vật nền chung PROPOSED, một hành vi quan sát, bộ tiếp nhận/dòng yếu, thay đổi nhìn thấy, thưởng tri thức một lần, hợp đồng lưu/tải an toàn | Có thể dùng cùng sinh vật cho cảnh nền và quan sát; không bắt buộc loài mới hoặc boss |
| Khuyến nghị cho Chương I | Duyệt và sản xuất một hoặc hai mẫu cấu hình sinh vật từ roster, một demo lãnh thổ sau bài học an toàn, nơi trú/di dời và liên kết E02/E05 | Tái sử dụng mẫu hành vi/điều hướng/dấu báo/animation, không để mọi tham chiếu xuất hiện cùng lúc |
| Hoãn | Đầy đủ sáu concept sinh vật, cả hai loài phụ chơi được/hai stage, elite/cộng hưởng nâng cao/sinh thái F và AI đàn dày | Cần thêm controller/clip/stage/kiểm thử va chạm; không là phụ thuộc của lát cắt tối thiểu |

Chưa chốt số thực thể, mật độ sinh hoặc ngân sách hiệu năng. Dù ít loài tương tác, nhịp sinh cảnh, thực vật, đàn sinh vật nền và thay đổi theo W07 vẫn tạo sự đa dạng. Không yêu cầu mô phỏng sinh sản/quần thể hoặc lưu từng nhịp AI. Bảo đảm tuyến chính và độ bao phủ nguồn quan trọng được ưu tiên hơn mật độ trang trí; giảm sinh vật nền không được xóa nguồn quan sát/cộng hưởng đã hứa.

## Chỉ mục 18 tài liệu bàn giao

- [Sổ đăng ký](CHAPTER1_SPECIES_REGISTER.md), [bảy dossier](CHAPTER1_SPECIES_DOSSIERS.md), [mạng thức ăn](CHAPTER1_FOOD_WEB.md), [quan hệ](CHAPTER1_SPECIES_RELATIONSHIPS.md).
- [Ma trận sinh cảnh](CHAPTER1_HABITAT_MATRIX.md), [hành vi](CHAPTER1_WILDLIFE_BEHAVIORS.md), [tương tác ngoài chiến đấu](CHAPTER1_NONCOMBAT_INTERACTIONS.md), [cộng hưởng](CHAPTER1_RESONANCE_OPPORTUNITIES.md).
- [Thích nghi/đồng hóa](CHAPTER1_ADAPTATION_AND_ASSIMILATION.md), [trạng thái thế giới](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), [phân bố](CHAPTER1_ENCOUNTER_DISTRIBUTION.md), [lát cắt tối thiểu](CHAPTER1_FIRST_PLAYABLE_ECOLOGY.md).
- [Art](../art/CHAPTER1_CREATURE_ART_HANDOFF.md), [đặc tả 12 thực thể dữ liệu](../technical/CHAPTER1_ECOLOGY_DATA_SPEC.md), [35 ca QA tương lai](../technical/CHAPTER1_ECOLOGY_TEST_CASES.md).
- [Quyết định](TASK20_DECISIONS.md), [kiểm tra cục bộ](TASK20_CONSISTENCY_AUDIT.md).

Chỉ tài liệu; không triển khai AI/mã/dữ liệu sản xuất/art/map/UI/save. Task21 chưa bắt đầu tại mốc bàn giao này. Các thiết kế mới phục vụ review, không phải phê duyệt hoặc gameplay đang hoạt động.
