# Boss đầu Hải Uyên — thử thách giữ đường hồi

**CONFIRMED:** Quy là Sacred Thủy đầu tiên; D41 không bắt buộc đủ ba dạng ở giai đoạn đầu; D06 khóa tập thành viên trong boss và vẫn cho đổi giữa các dạng đã trang bị đủ điều kiện. **PROPOSED B23-P01–P12:** danh tính, hình dáng, đấu trường, đòn, phase, AI, cách đối phó, kết quả và sản xuất trong gói này. Chính sách HP/tài nguyên/chuyển dạng khẩn cấp/save/thử lại còn **PROPOSED/UNRESOLVED**; bản ghi lịch sử **SUPERSEDED** giữ nguyên. Không boss mới nào được duyệt chỉ vì hồ sơ đầy đủ.

Nguồn [đề cương xung đột S05](../story/MAJOR_CONFLICTS_AND_BOSSES.md), [dàn nhân vật](../story/MAJOR_CHARACTERS_AND_FACTIONS.md) đã có **npc_tide_keeper / Người Giữ Mạch Nước**, hồ sơ **boss_water_access**, nhiệm vụ mq_04 / evt_04_guardian_conflict. Đây là vai trò/hồ sơ truyện **PROPOSED**, chưa phê duyệt loài, hình ảnh hoặc đòn tấn công. Task23 giữ các tham chiếu đó, bổ sung ID BossDefinition ứng viên để duyệt, không thay thực thể hoặc tạo thêm guardian trùng vai.

Khuyến nghị **Lam Giáp Giữ Mạch**, boss_c1_lam_giap_keeper: thực thể bảo vệ dạng giáp xác thấp có hai chi trước dẫn lực, bốn chân tựa và thân phân đốt, khác Quy với mai rùa/bốn vây. Thuộc tính Thủy là ứng viên; không suy Kim từ vỏ cứng hoặc coi ngoại lai là xấu. Động cơ là giữ nơi trú trước xói hại; cách giữ kín làm hạ lưu thiếu hồi lưu. Lịch sử chi tiết, trình tự, nhận thức và cơ chế siêu hình vẫn chưa chốt.

## Các trụ cột gameplay

Đọc dấu báo → bơi/hãm/đổi làn hoặc đỡ đòn nếu đã có năng lực đủ điều kiện → xử lý đòn hữu hạn → có khoảng phục hồi để tiếp cận bằng Chấn Mai → lùi/chỉnh vị trí. Phase II thay hướng/nhịp dòng có báo trước, không chỉ tăng sát thương/tốc độ. Không có hazard phủ toàn đấu trường không thể tránh; không bắt tiến hóa, dual-element, loài hiếm, thưởng nhiệm vụ phụ hoặc đỡ chính xác tuyệt đối.

Tuyến nền tảng của Quy I dùng bơi/hãm, quy_basic và CAP_STRUCTURE_OPERATE sau bài học tuyến chính. Short brace chỉ là cách đáp ứng tùy chọn cho đến khi năng lực/chi phí được duyệt; không bắt buộc mở Vành Nước. Thiếu cách đối phó phải sửa mẫu đòn/đấu trường/tuning, không tạo kỹ năng bắt buộc mới. Quy-only ở đây là **độ bao phủ đã đối chiếu ở cấp hợp đồng**, chưa là bằng chứng playtest/cân bằng/khoảng trống di chuyển vật lý.

Kết quả chiến đấu thông thường E04 được khuyến nghị là **nhượng thế/không cần chết**: kết quả đánh bại/thái độ được chấp nhận, bằng chứng đường xả phụ E03 còn hợp lệ và keeper cho thử tải an toàn với ràng buộc nơi trú. Phương án thử tải thay thế có thể dùng cùng bộ tiếp nhận/mẫu đòn/kết quả sau khi duyệt; không tự thắng nhờ thoại hoặc chỉ có E03. Cả hai dùng cùng E04/nguồn thưởng, không tạo hai ending/chuỗi loot. E05 phục hồi và E06 đến nơi/đường về vẫn riêng; không làm trước dàn dựng Task24.

## 18 tài liệu bàn giao

- [Các ứng viên](CHAPTER1_BOSS_CONCEPTS.md), [hình ảnh](CHAPTER1_BOSS_VISUAL_DESIGN.md), [đấu trường](CHAPTER1_BOSS_ARENA.md), [năm hành động](CHAPTER1_BOSS_ATTACKS.md).
- [Các phase](CHAPTER1_BOSS_PHASES.md), [AI](CHAPTER1_BOSS_AI.md), [cách đối phó của Quy](CHAPTER1_BOSS_QUY_COUNTERPLAY.md), [nguyên tố](CHAPTER1_BOSS_ELEMENTAL_INTERACTIONS.md).
- [Trình bày truyện](CHAPTER1_BOSS_STORY_PRESENTATION.md), [thử lại/khóa](CHAPTER1_BOSS_RETRY_AND_LOCK.md), [phần thưởng/trạng thái](CHAPTER1_BOSS_REWARDS_AND_STATES.md), [phạm vi sản xuất](CHAPTER1_BOSS_PRODUCTION_SCOPE.md).
- [Bàn giao art](../art/CHAPTER1_BOSS_ART_HANDOFF.md), [12 thực thể dữ liệu](../technical/CHAPTER1_BOSS_DATA_SPEC.md), [40 ca QA tương lai](../technical/CHAPTER1_BOSS_TEST_CASES.md), [quyết định](TASK23_DECISIONS.md), [kiểm tra cục bộ](TASK23_CONSISTENCY_AUDIT.md).

Chỉ tài liệu, chưa triển khai AI/chiến đấu/map/UI/save/asset sản xuất. Tuyến chính không cần bất kỳ phần thưởng/dạng tùy chọn S22 nào. Không tự bắt đầu Task24 hoặc audit PhaseIII.
