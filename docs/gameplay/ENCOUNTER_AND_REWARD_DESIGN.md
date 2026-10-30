# Encounter, reward và vai trò elite

**PROPOSED F06-P09/P10:** nguyên tắc tương lai, không combat statistics, drop rates, economy/inventory implementation hoặc fixed content quotas. Giữ combat realtime và cảnh báo/di chuyển có agency. [Archetypes](ENEMY_ARCHETYPES.md) giữ behavior; [Task05 event contracts](../story/STORY_IMPLEMENTATION_HANDOFF.md) giữ main completion/state/reward authority.

## Loại encounter và tiêu chí kết thúc

| EncounterProfileId | Mục đích / entry | Thành công có ý nghĩa | Không được suy / reset |
| --- | --- | --- | --- |
| `enc_observe_wildlife` | Đọc hành vi ở habitat có safe route, không active boss lock | Có observation/source evidence đúng điều kiện; creature sống độc lập | Không nhìn là RESONATED, không buộc kill; quấy làm rút thì chờ/đổi góc không xóa record |
| `enc_territory_passage` | Đối mặt biên nơi trú sau warning | Đi qua/rút/chứng minh thao tác an toàn hoặc thắng challenge theo objective | HP0 không luôn nghĩa đã phục hồi nguồn; aggro không lan vô hạn; unique grant không reset theo leash |
| `enc_predator_survival` | Nguy cơ săn có dấu trước và đường xử lý | Tránh được/thoát hoặc kết thúc trial combat nếu objective khai báo | Không mọi rút lui được XP farm; outcome do encounter rule, không chỉ ra/vào trigger |
| `enc_stabilize_source` | Có evidence source bất ổn/viable habitat và permission cần thiết | Dừng exposure và kiểm chứng cá thể/mạng quanh, outcome có mức chắc chắn | Không heal một lần là stable toàn biome/resonated; fail không bắt giết nạn nhân |
| `enc_faction_interception` | Nhiệm vụ/concern địa phương được cảnh báo | Evidence/access/retreat hoặc đối đầu có kết quả rõ, không tự war với cả phe | Membership không quyết định aggro toàn map; hoàn tất optional không gate Sacred |
| `enc_optional_elite` | Challenge tự chọn có route tránh/quay lại và briefing | Thử movement/combat đặc trưng, ghi completion/material proof một lần theo manifest | Không main gate unannounced species/key; bỏ qua vẫn xong chương; replay không farm unique grant |
| `enc_chapter_confrontation` | Bốn narrative briefs hiện hữu và attempt policy được duyệt trước | Conflict mở cửa sổ kiểm chứng; event restore riêng mới stable system | Không win=capture/cleansing/restoration tự động; giữ empty-slot vs full-three policy là quyết định chưa chốt |

Entry không sinh enemy/hazard ngay trên điểm arrival/save trú. Encounter camera/FX phải cho đọc telegraph ở viewport mobile, không bắt biết form chưa có. Damage/target khi biến hình theo boundary R03, không xóa encounter identity khi đổi form. Các labels behavior là vocabulary thiết kế, không AI executable được thêm.

## Reward origins và điều kiện — PROPOSED

| RewardProfileId | Nguồn hợp lý | Cách combat/noncombat nhận khi phù hợp | Giới hạn và liên kết progression |
| --- | --- | --- | --- |
| `reward_observation` | Tri thức hành vi/habitat có nguồn | Observation/challenge cung cấp evidence, ghi record khi thực đạt | Không tự form/XP toàn bộ; journal fact không kho đồ vật vô hạn |
| `reward_biological_material` | Chất rụng, lớp bảo vệ thay tự nhiên, vật liệu sau encounter phù hợp | Thu sau trial không chí tử hoặc nguồn rụng; combat material nếu nội dung cho phép và giải thích | Không cần kill passive để hoàn tất collection; không lấy tùy tiện mọi bộ phận/coin từ mọi xác |
| `reward_structural_component` | Mảnh thiết bị/mineral cấu trúc vốn có thật trong encounter | Khảo cứu/sửa ổn định, thu phần an toàn hoặc sau neutralization | Chưa khẳng định loài Fire–Metal là máy; không phá di tích/unique source rồi softlock |
| `reward_elemental_residue` | Phần năng lượng/thải bị giữ lại sau xử lý source có budget | Cô lập source/ổn định hoặc trial nguy hiểm, không bắt tổn thương thêm cá thể | Không heal–reinfect/drop farm; không instability là “rarity tốt hơn”; cost/cap/rates chưa chốt |
| `reward_records_access` | Hồ sơ, công cụ hoặc quyền được giữ/trao sau nhiệm vụ có nguồn | Evidence/hợp tác/đối đầu có thể cùng đạt quyền cần thiết | NPC không luôn rơi ví/gear; essential route không phụ thuộc optional loyalty, item vay không bị duplicate vô hạn |
| `reward_encounter_progress` | Hoàn thành objective và học counterplay | Combat có XP; nonlethal/evasion/proof được manifest cho reward tương ứng khi objective cho | Amount/recipient chưa định lượng; một outcome completion grant không nhân theo số phương án hoặc form đang equip |
| `reward_special_component` | Thành phần nguyên tố hiếm từ nguồn được khảo cứu, chưa tên item cuối | Optional elite/challenge hoặc nguồn noncombat hợp lệ | Không chốt rarity/item/economy mới; không kill quota mọi loài, không essential gate chỉ random drop |

Material và energy fragments là candidate reward categories, không hệ crafting/inventory mới đã confirmed. Không ấn định bảng coins, equipment hay drop rate. Recipient XP active/event recipients theo Task03 candidate, không reset/quay vòng nhiều form để nhân event reward. “Nonlethal” là outcome/representation phải thiết kế và có asset; không lấy đổi nhãn kill thành safe khi hành vi hình ảnh chưa phù hợp.

## Một kết quả, không hai lần thưởng — PROPOSED

CompletionGrant dùng stable encounter/story outcome key và ledger gắn save/content version. Đạt bằng proof rồi fight lại không nhận hai milestone grants; observed facts và material lots có ID/source riêng để không biến xem lại record thành loot. Normal repeatable encounters có thể có material/XP policy riêng được balance sau, không được giả tất cả unique rewards đều repeatable chỉ vì sinh vật respawn.

Một optional elite đã được vượt trước khi nhận side quest: completion evidence durable đủ để quest nhận ra, không reset elite bắt đánh lại. Drop/record là quest proof có acquisition fact/source; quest tới sau đọc evidence thay đòi chưa có item rồi spawn duplicate unique loot. Nếu vật liệu tương lai có thể tiêu/thất lạc, nội dung quest phải dùng proof bền vững hoặc nguồn thay thế hợp lệ; không essential main key qua RNG/optional-only enemy. Không khóa Sacred awakening bằng một vật người chơi có thể bán trước khi biết nhiệm vụ.

Actor defeat/incapacitated, encounter objective complete, reward grant, quest complete và world stable là các khái niệm khác. Payload duy nhất commit cùng completion tương ứng; quest/world event tham chiếu proof thay phát lại reward của actor. Logic idempotency/migration ở [data model](../technical/FACTION_ENEMY_DATA_MODEL.md).

## Collection không là kill checklist

Discover → observe/study có thể trước hoặc sau combat, nhưng defeat không tự làm viable source/compatibility/RESONATED. Ecological habitat, movement challenge, narrative voluntary encounter, ancient viable core/memory có routes riêng theo [RESONANCE_RULES](../lore/RESONANCE_RULES.md). Không mọi species playable hoặc mọi boss drop form. Không đòi giết peaceful wildlife để đủ journal; một nguồn đã defeat/relocate có phương án quan sát/archival/refuge không reward trùng.

## Elite và nhịp encounter — PROPOSED

Elite là overlay làm nổi một năng lực sinh học/không gian: defender giữ hướng, predator chọn lane, guardian phối hợp receiver… không mỗi elite cần một arc/boss đầy đủ. Cho optional challenge có dấu nguy hiểm, lối tránh/retreat, điểm nghỉ và thông tin habitat; reward có nguồn và đáng khám phá, không cần số lượng fixed/chapter.

Đề xuất Chương I ưu tiên behavior ít lớp và chỗ yên để học thân/observation; instability, faction phối hợp và elite xuất hiện khi main competency phù hợp, không ném tất cả template vào slice. Các chương sau tăng cách đọc/điều kiện không gian hơn chỉ thêm HP/speed. Không hai boss liên tiếp thiếu aftermath/exploration; không patrol dày kín mọi đường quay lại.

Density được cân theo tầm nhìn, nguồn art, clearance/năng lực form, khả năng rút/nghỉ và performance được đo ở task sau, không hứa quota/playtime. Không cần kill-20/collect-30 hay delivery không lý do. Missing resources/AI/balance là prerequisite, không proof các encounter đã chạy.
