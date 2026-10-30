# Phe phái — tổng quan và lựa chọn phạm vi

Task 06/96, baseline `4356ec8`. [Audit/mapping đầu ra](TASK06_CONSISTENCY_AUDIT.md). **CONFIRMED:** bốn hệ Thủy/Hỏa/Phong/Mộc, Ly có Sinh Mệnh riêng; bản địa không mặc định thiện, ngoại lai không mặc định ác; ưu tiên thay đổi bền vững địa phương, không bất ngờ khóa collection/main story. **PROPOSED:** cả ba tổ chức, tên, cơ cấu và mọi quan hệ phe sau; **UNRESOLVED:** lịch sử chính xác, membership và roster cuối.

Không coi Task 06 đã duyệt toàn bộ proposals Tasks 02–05. Lôi/Kim vẫn là khái niệm ngoại lai ban đầu D18, không kết luận sét hoặc kim loại vật chất chưa từng tồn tại. Mục tiêu người chơi không phải xóa mọi nguyên tố ngoại lai.

## Ba tổ chức ứng viên — PROPOSED F06-P01

| FactionId / tên | Mong muốn chính đáng | Nguy cơ phương pháp | Không được suy |
| --- | --- | --- | --- |
| `faction_hoi_nguyen` / Hồi Nguyên | Bảo tồn tri thức và phục hồi tuần hoàn nền, bảo vệ nơi sống bản địa | Dùng mẫu cổ như chuẩn duy nhất rồi hi sinh sinh cảnh mới | Cứ cổ/bản địa là tốt hoặc mọi thành viên ghét ngoại lai |
| `faction_tan_sinh` / Tân Sinh | Giữ sinh vật thích nghi và thử cách cùng sống mới | Xem mọi rủi ro là giá tiến hóa, thử nghiệm cưỡng ép hoặc mở rộng lấy tài nguyên | Mọi sinh vật song nguyên tố là thành viên/chiến binh phe |
| `faction_trong_giu` / Trông Giữ | Giữ di tích/cổng khỏi bị dùng sai, lưu quy trình giới hạn tải | Giấu tri thức, độc quyền quyền vận hành ngay khi chia sẻ có thể cứu nơi khác | Tổ chức bất biến từ thời cổ, biết toàn cosmic truth, mọi guardian đều là thành viên |

Cả ba có người bảo vệ sự sống lẫn người dùng phương pháp gây hại. Hành động cụ thể quyết định xung đột. Năng lực chính trị/sinh thái khác phân loại hành vi loài, rarity, affinity và mức ổn định đồng hóa.

## Mô hình quan hệ nhẹ — PROPOSED F06-P02

| Phương án | Lợi ích | Chi phí/rủi ro | Khuyến nghị |
| --- | --- | --- | --- |
| Fully branching reputation | Nhiều đường theo phe | Bùng nổ nội dung/test, nhiệm vụ và collection bị khóa theo điểm không minh bạch | Không chọn cho cung đầu |
| Localized quest consequences | Phản ứng sát hành động/nhu cầu, ít tổ hợp phải sản xuất | Cần scope facts và permission rõ, tránh hai NPC nói khác do thiếu projection | Chọn làm nền |
| Storyline tương đối cố định + vài choice | Giữ causal chain 24 events, vẫn có kết quả có ý nghĩa | Choice dễ thành giả nếu không có aftermath | Kết hợp với thay đổi địa phương; variant IV và một số outcome optional, không mọi boss phân nhánh |

Không mặc định thêm thanh morality/reputation hoặc UI mới. `trust`/`suspicion` được thể hiện bằng fact địa phương và lời/behavior phản hồi, không currency toàn cầu. `access permission` là quyền vào một route/công trình rõ, không vé khóa toàn chapter. Main gates và Sacred awakening không check gia nhập phe hay hoàn tất optional faction quest.

Relationship record theo player/save + factionId + regionId/actorId + concern/permission, có nguồn event; disposition tạm khác membership. Một NPC thuộc phe vẫn có thể phản đối phương pháp của phe, một guardian độc lập có thể có lập trường gần phe. Tên hiển thị đổi không đổi stable ID. Chi tiết persistence ở [consequences nguồn hiện hữu](../story/WORLD_STATE_CONSEQUENCES.md).

## Giữ Chương I nhỏ

**PROPOSED:** I dùng chủ yếu observation/territorial guardian và một dấu/ghi chép về bất đồng; không ba phe lập doanh trại, ba tutorial reputation và nhiều tuyến recruit ngay rạn đầu. II–III mới cho thấy mạng lưới/nguồn lợi của các nhóm, IV cho xung đột phục hồi–thích nghi rõ nhất. Không thêm lãnh đạo có tên. Cổng giữ bí ẩn: hiện vật/niềm tin của phe không thành lời giải Tinh Linh.

Bản chi tiết tại [profiles](FACTION_PROFILES.md), [history](FACTION_HISTORY.md). Đây là nền reviewable, không phe đã có NPC/AI/art trong runtime.
