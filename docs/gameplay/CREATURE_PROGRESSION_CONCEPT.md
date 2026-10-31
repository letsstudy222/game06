# Tiến trình riêng của sinh vật

**CONFIRMED:** mỗi playable có level/XP/kỹ năng/tiến trình riêng; Tứ Linh có ba giai đoạn tiến hóa lớn theo Task 03. Sinh vật phụ quan trọng có thể hai; wildlife thường và một số enemy đặc biệt có thể một. Không có ngưỡng level cuối được duyệt trong Task 01/02; không tự chọn ngưỡng trong task này.

## Các trục độc lập — PROPOSED R03-P09

| Trục | Tác dụng / nguồn | Không tự đồng nhất với |
| --- | --- | --- |
| XP | Hoạt động hợp lệ: combat, khám phá, thách thức/milestone tùy reward manifest | Kill farming duy nhất hoặc XP tự cấp cho mọi reserve |
| Creature Level | Phát triển chiến đấu trong cùng formId | Cấp Tinh Linh, rarity hoặc danh tính cá thể gốc |
| Skill Unlocks | Mục tiêu kỹ năng cụ thể, prerequisites và khả năng cơ thể | Tự mở mọi skill khi resonance/memory thành công |
| Mastery | Tinh luyện tùy chọn cách dùng đặc trưng, đo bằng mục tiêu thực tế | Level cap hoặc điều kiện để mọi loài được sưu tầm |
| Ancestral Memory | Dấu truyện/khám phá có lịch tiết lộ và nguồn | XP gate, evolution threshold hoặc phim gene có thật |
| Evolution | Thay đổi stage sinh học/nguyên tố, cách di chuyển/combat/tương tác | Chỉ tăng kích thước, đổi màu, thêm FX hoặc cộng stat |

Progression key theo formId/species ổn định trong save. Gặp cá thể khác cùng species không tạo XP bar mới. Stage evolution vẫn cùng key; không equip ba stage của một loài vào ba slot. Unlock form không xóa cá thể gốc. Rarity không bảo đảm mạnh hơn; loài ít hiếm cần niche traversal, timing hay tổ hợp skill hữu dụng.

Reward XP một lần theo grantId + recipient; combat thường có reward policy riêng để không cần farm lặp tiến trình truyện. Đề xuất XP hành động vào active form tại thời điểm event hợp lệ; event task/story có recipient khai báo. Không tự cộng lại cho active mới khi đổi dạng trong lúc reward pending. Không chia XP reserve mặc định trong phương án nền.

## Bắt kịp dạng mới — PROPOSED so sánh

| Phương án | Lợi ích | Nguy cơ / cách giới hạn |
| --- | --- | --- |
| Support XP chung | Dự bị ít bị tụt cấp | Nuôi bị động bằng một dạng carry, mất ý nghĩa tiến trình riêng; không chọn mặc định |
| Catch-up XP theo khoảng cách | Khuyến khích thật sự dùng dạng yếu | Có thể farm nguồn rẻ; cần whitelist event và cap theo mốc, chưa chọn như cơ chế nền |
| Tài nguyên tiến trình kiếm được | Người chơi chủ động đầu tư | Tạo grind/kinh tế phụ, có exploit grant trùng; chưa thêm tiền tệ mới |
| Level floor theo mốc chương bền vững | Dạng mới có mức dùng được ngay, đơn giản và không reset progression | Có thể né unlock để nhận quà cao hơn; áp cùng floor cho **mọi dạng đã mở** ở cùng mốc để không thưởng trì hoãn |

**Khuyến nghị ứng viên:** floor theo milestone chương đã commit, áp tại rest/checkpoint hoặc sau attempt, không giữa boss. Nâng XP tới ngưỡng floor nếu thấp hơn, không cộng XP như gói thưởng lặp; không giảm dạng mạnh hơn, không grant mastery/memory/skill trial chưa làm. Dạng unlock mới nhận cùng floor một lần bằng phép max hiện tại/floor. Tất cả con số/floor curve là UNRESOLVED và cần task balance; không trình bày số mẫu như quyết định.

## Tiến hóa có bản sắc — CONFIRMED khung stage, PROPOSED cách thể hiện

| Dòng | Ba bước phân biệt về thiết kế, chưa đặt tên stage canon | Ranh giới |
| --- | --- | --- |
| Quy | Từ cơ thể non trẻ cảm dòng cục bộ → thân vững kiểm soát vị trí/phòng thủ → kết hợp áp lực và đường nước ở quy mô thử thách lớn hơn | Không tự cho chịu mọi độ sâu hoặc miễn sát thương |
| Phượng | Kiểm soát nhiệt/bay giới hạn → dùng thermal và đổi nhịp tấn công → phối hợp nhiệt/động tác với cơ cấu môi trường phức tạp | Không thay sprite Legend hiện tại hoặc gọi nó stage cuối đã duyệt |
| Long | Cảm/chỉnh luồng gần → cơ động đổi hướng trong nhiều nhánh → điều phối đường áp và combat theo nhịp bão | Không mặc định tăng cỡ là tiến hóa |
| Ly | Tác động tăng trưởng cục bộ → nối rễ/đối tác sống → duy trì nhiều quan hệ sinh thái khả thi | Không hồi sinh sinh vật chết hoàn toàn hoặc tạo sự sống vô hạn |

Evolution cần stage requirements theo loài: phát triển sinh học, khả năng nguyên tố, mục tiêu sử dụng và điều kiện truyện/môi trường phù hợp. Bản thiết kế chi tiết chiêu/thời điểm/tên stage và art brief phải có task riêng. Có thể đủ XP nhưng còn thiếu requirement, không bị mất XP. Không ép wildlife một stage có evolution bar giả.

Đủ điều kiện evolution trong boss: ghi pending eligibility/reward một lần, dùng stage/config đã snapshot đến khi encounter kết thúc. Sau lock, ở điểm an toàn và có đủ chỗ, apply stage atomic; giữ tỷ lệ HP, HP0 vẫn HP0, không hồi cooldown; không có lựa chọn hạ stage để nhận reward lại. Dạng/cơ thể mới không vừa footprint thì chờ safe point, không đẩy xuyên terrain. Đề xuất chỉ active stage cao nhất đã commit, không có downevolution cơ học; skin/stage selection nếu muốn là quyết định riêng.

## Còn mở — UNRESOLVED

XP curve, level cap, stage thresholds và milestone cụ thể; số/mức skill; tác dụng mastery; HP/stats theo stage; mức catch-up và giá trị cost. Không dùng các giá trị này để triển khai khi chưa được chốt. Quy tắc độc lập, chống reward trùng và hoãn trong boss là phương án R03-P09, không tự nâng thành canon qua bảng này.

## Liên kết Task 04

[Ma trận 12 dạng](../creatures/SACRED_EVOLUTION_MATRIX.md) và hồ sơ species giữ anatomy/stage deltas; [abilities](SACRED_CREATURE_ABILITIES.md) giữ tên/ID và minimum stage ứng viên. Tên, gates chi tiết và balance vẫn PROPOSED; minimum stage không tự grant mọi skill. Quy tắc progression/formId và hoãn benefits khi boss ở đây giữ nguyên trạng thái đề xuất Task 03.


## Task13 — evolution system handoff, vẫn PROPOSED

[Overview](../evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [Model D recommendation](../evolution/EVOLUTION_TRIGGER_MODELS.md), [safe loadout transition](../evolution/EVOLUTION_AND_LOADOUT.md) và [V13 decisions](../evolution/TASK13_DECISIONS.md) chi tiết hóa R03-P09/C04/E10 mà không tự duyệt. Level/skill/evolution/mastery khác nhau; đạt eligibility không same as committed stage. Recommendation ghi proof trong combat, thực hiện ở safe explicit boundary ngoài boss; exact policy/HP/cooldown/cost/catch-up và numeric thresholds vẫn cần approval, values để Task15. [State/data contracts](../technical/EVOLUTION_STATE_MACHINE.md) reuse CreatureProgression/RewardGrantLedger hiện hữu, không XP bar hoặc currentStage copy ở mỗi slot. [C04 matrix bổ sung Task13](../creatures/SACRED_EVOLUTION_MATRIX.md) vẫn nguồn đủ12forms. D41 no-three early giữ, A08-05 remaining entry/snapshot/retry không giải ngầm.
