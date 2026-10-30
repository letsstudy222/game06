# Quyết định Cộng Hưởng — Task 03/96

Ngày 30/10/2026 (Asia/Saigon), baseline `9179697`. Task 01 và toàn bộ chín tài liệu Task 02 tồn tại, đã được đọc/đối chiếu. Chỉ documentation/system design; không thêm implementation classes, UI, art hoặc animation. Mọi quyết định ứng viên bên dưới là **PROPOSED**, chưa tự trở thành canon dù đặc tả đủ cụ thể cho programmer ước lượng/test về sau.

## Mục lục / nguồn luật

| Chủ đề | Tài liệu chịu trách nhiệm |
| --- | --- |
| Nhân vật và giới hạn Tinh Linh | [SPIRIT_IDENTITY](SPIRIT_IDENTITY.md) |
| Linh Hạch, Linh Ấn, khác cá thể gốc | [LIFE_CORE_AND_IMPRINT](LIFE_CORE_AND_IMPRINT.md) |
| Acquisition, discovery và mở đầu Quy | [RESONANCE_RULES](RESONANCE_RULES.md) |
| Ký ức/độ tin cậy/provenance | [ANCESTRAL_MEMORY](ANCESTRAL_MEMORY.md) |
| Bộ ba, switch, defeat, boss/reload | [TRANSFORMATION_DESIGN](../gameplay/TRANSFORMATION_DESIGN.md) |
| XP/level/mastery/evolution/catch-up | [CREATURE_PROGRESSION_CONCEPT](../gameplay/CREATURE_PROGRESSION_CONCEPT.md) |
| Entity, persistence và invariants | [RESONANCE_DATA_MODEL](../technical/RESONANCE_DATA_MODEL.md) |
| Edge cases/acceptance scenarios | [RESONANCE_EDGE_CASES](../technical/RESONANCE_EDGE_CASES.md) |

Các file technical diễn đạt cùng luật, không được tạo default khác gameplay/lore. [SPIRIT_AND_RESONANCE](SPIRIT_AND_RESONANCE.md) giữ bản đề xuất Task 02 với liên kết cập nhật; không là bản state machine thứ hai.

## CONFIRMED từ Task 01–03

| ID tham chiếu | Quy tắc và nguồn |
| --- | --- |
| D02/D03/D27 | Chủ thể là linh thể cổ ban đầu vô hình, có nhận thức hạn chế và phát triển bản sắc; cộng hưởng đầu với Quy ở Vực Hải Uyên; nguồn gốc chưa biết |
| D04/D25/D26 | Quy–Thủy, Phượng–Hỏa, Long–Phong, Ly–Mộc/Sinh Mệnh ở Tiên Cảnh Vạn Sinh; cuối cung Tinh Môn tái kích hoạt, chuyến đi ngoài hành tinh chưa thuộc scope |
| D05/D06/D07 | Ba slot (active + hai reserve), một thân active; switch trong bộ ba; khóa thành phần khi boss bắt đầu đến khi kết thúc; progression riêng từng playable |
| D28 | Tên khái niệm Tinh Linh, Linh Hạch, Linh Ấn, Cộng Hưởng, Ký Ức Tổ Tiên được dùng nhất quán; ngữ nghĩa vận hành chi tiết R03 vẫn PROPOSED |
| D29 | Task 03 xác nhận trình tự mười nhịp thức Quy, dạng non trẻ và cơ thể đầu tiên; không phải switch thường cần có dạng nguồn |
| D30 | Tứ Linh mỗi loài ba stage; sinh vật phụ quan trọng có thể hai, wildlife và enemy đặc biệt có thể một; chưa có ngưỡng số được duyệt |

Không nhận trạng thái rare/Legend trong HUD là hệ rarity/progression hoàn chỉnh. Không coi model hybrid đã được duyệt chỉ vì người dùng nói đó là giả thuyết ưu tiên.

## Đánh giá ba mô hình — PROPOSED, R03-P01

| Tiêu chí | A — nhập cơ thể có sẵn | B — tái cấu trúc từ mẫu | C — hiện thân tinh hoa bảo tồn | Hybrid B+C được đề xuất |
| --- | --- | --- | --- | --- |
| Nhất quán lore | Gần cách nói “nhập”, nhưng khó di chuyển giữa cơ thể đang ở nhiều nơi | Cần ràng buộc để không tạo sinh vật vô hạn | Hợp ký ức/vật mang nhưng phải rõ thân vật lý | Một mẫu ổn định + hiện thân tạm có vật lý, không cá thể mới |
| Linh hoạt gameplay | Phụ thuộc có cá thể sẵn tại chỗ | Cao, hợp collection mang theo | Cao nếu quan hệ bảo tồn không cần kéo hạch theo mỗi lần | Cao nhưng giới hạn tương hợp/quỹ và môi trường |
| Bản sắc sinh vật | Rủi ro xóa/chiếm ý chí cá thể | Phải phân biệt mẫu với người gốc | Dễ giữ mối liên hệ tổ tiên, có rủi ro “mang linh hồn trong túi” | Mẫu không là nhân cách; nguồn vẫn độc lập |
| Tốc độ đổi dạng | Cần giải thích tele nhập nhiều thân | Có thể nhanh theo giao dịch | Có thể nhanh nhưng dễ thành thân mờ không collision | Một commit đổi collision/HP, không spawn hai thân |
| Đạo đức | Dễ thành cưỡng ép bắt/nhập | Không cần bắt cá thể nếu acquisition hợp lệ | Cần tránh hút cạn nguồn bảo tồn | Ghi mẫu không tiêu hủy/ghi đè cá thể, có điều kiện tương hợp |
| Hình ảnh | Phải quản lý thân bỏ lại/nhiều cá thể | Có FX vật chất hóa dễ quá phô | Có FX cộng hưởng, khó đọc thân có thật | Dạng hiện thân pixel rõ, collision thật; chưa thiết kế FX/art mới |
| Mở rộng | Nhiều vấn đề logistics cơ thể và cá thể ngoài cảnh | Scalable species catalog nhưng có nguy cơ tạo tài nguyên | Phụ thuộc kit vật mang | Stable species/formId, một body, cấm sản xuất cơ thể/tài nguyên độc lập |
| Level/evolution riêng | Progression gắn cá thể, dễ duplicate exploit | Dễ giữ formId, cần không nhân reward theo stage | Cần lưu tiến trình mẫu | Một progression/formId, stage trong cùng record, không chiếm ba slot cùng species |

**Khuyến nghị:** B+C có kiểm soát. Dùng Linh Ấn hoàn chỉnh làm mẫu, tinh hoa/quan hệ cộng hưởng giữ tính liên tục, quỹ ổn định hữu hạn duy trì một hiện thân có vật lý. Không cần thân gốc hiện diện để switch; không bắt sinh vật gốc, không tạo người/cá thể đã chết từ ký ức. Thức Quy lần đầu khác vì phải khởi động cấu trúc sống và quan hệ đầu; không tiêu một hạch cho mỗi lần switch. Tối hậu vật chất/siêu hình vẫn UNRESOLVED, không thêm thần học để hợp thức hóa.

## PROPOSED — danh mục quyết định có thể review

| ID | Đề xuất chính | Đánh đổi |
| --- | --- | --- |
| R03-P01 | Hybrid B+C; mẫu khác cá thể; một body; nguồn vẫn độc lập | Cần biểu đạt rõ “hiện thân vật lý” không phải clone/hồi sinh |
| R03-P02 | Quỹ ổn định chung, switch cost/cooldown; không i-frame, hồi theo simulation ổn định | Có giới hạn chống spam nhưng cần balance không phạt khám phá quá mức |
| R03-P03 | Health/activity của hạch tách; discovery/resonance/memory/mastery nhiều trục | Rõ nonplayable/memory độc lập, cần UI trình bày dễ hiểu ở task sau |
| R03-P04 | Bốn acquisition route, story exception có event/requirements và idempotent grant | Nội dung riêng từng loài tốn thiết kế hơn kill-count chung |
| R03-P05 | Memory có provenance, điểm nhìn, integrity và chapter gate | Không được dùng memory làm lời giải tự động; cần biên tập clue |
| R03-P06 | Bộ ba unique species, empty slots sớm; boss gate đủ ba; membership snapshot khác active role | Phải có ba dạng sẵn trước boss đầu, không buộc đầu game có ba ngay |
| R03-P07 | Switch transaction chịu damage, footprint revalidate; HP/cooldown riêng; chuyển khẩn khi HP0, không permadeath | Giữ nhịp trận nhưng forced transfer phải chống xử lý trùng và không miễn damage |
| R03-P08 | Boss reload abort-and-reset, lock durable; reward/stage/skill benefit không đổi combat snapshot | Hy sinh resume giữa boss để có consistency đơn giản, rõ ràng |
| R03-P09 | XP riêng, floor bắt kịp theo milestone tại safe rest; evolution hoãn ngoài boss, không heal | Tránh dạng mới quá yếu; cần mức floor không xóa ý nghĩa phát triển riêng |
| R03-P10 | Tám entity yêu cầu + LifeCoreRecord và RewardGrantLedger; save/journal/migration có version | Tăng công persistence nhưng ngăn menu/reload lách khóa và duplicate grants |
| R03-P11 | 26 edge cases + 5 trace logic có recovery/checkpoint | Là kế hoạch nghiệm thu, chưa phải test thực thi |

## UNRESOLVED / cần duyệt trước implementation

Mô hình hybrid và hệ quả có được phê duyệt không; thông số phase/cooldown/cost/cap/rate; XP curve/floor/cap/thresholds; skill/stage names và art; nội dung acquisition từng species; ý thức gốc Sacred và cách biểu đạt đồng thuận; bản chất hiện thân cuối; tên ngoại hình hạch Quy; checkpoint placement và yêu cầu resume boss về sau. Nguồn gốc Tinh Linh, trách nhiệm biến cố và nguồn Tinh Môn vẫn mở như Task 02, không cần đáp án để quy định switch.

## Audit tính liên tục và xử lý xung đột

| Vấn đề | Cách ghi nhận / kết quả review thiết kế |
| --- | --- |
| Task 01 nói “nhập/điều khiển” có thể bị hiểu bắt cá thể | Giữ ý người chơi trực tiếp điều khiển dạng; đề xuất hybrid giải thích bằng hiện thân, không lặng lẽ xác nhận possession đã bị loại khỏi canon |
| L02-P08 để vật lý chuyển dạng, HP/retry mở | R03-P01/P07/P08 cụ thể hóa thành ứng viên; không đóng UNRESOLVED ở cấp canon khi chưa duyệt |
| Quy thức trước phục hồi hệ nước, Ly phải phục hồi sinh thái trước thức | Bootstrap Quy chỉ cần nhánh khởi động + compatibility; phục hồi toàn vùng đến sau. Các điều kiện bốn linh thú khác nhau; không dùng một quy trình cho tất cả |
| L02-P07 bảo tồn Linh Thú, R03 nói hiện thân không cá thể mới | Phân biệt vật mang/bản sắc gốc với body điều khiển; lần đầu kích hoạt cấu trúc bảo tồn, switch sau không nhân linh thú hoặc tiêu hủy vật mang. Ý thức gốc vẫn chưa chốt |
| Exactly three slots nhưng mở đầu chỉ Quy | Ba vị trí cố định, empty cho khám phá; chuẩn boss đủ ba là PROPOSED, không duplicate filler |
| Ly Sinh Mệnh, Phoenix respawn có thể bị hiểu hồi sinh vô hạn | Defeat là mất ổn định hiện thân trong model đề xuất; người/cá thể đã chết hoàn toàn không được phục sinh. Runtime cũ giữ nguyên, chưa được retcon thành implementation mới |
| Level/evolution XP giữa boss có thể đổi stage trong snapshot | Ledger giữ gains, combat config/stage frozen; apply benefit ở ngoài lock/safe rest. Tiến hóa cùng formId không lách thành slot mới |
| Không heal nhờ reload nhưng reload boss về checkpoint có recovery | Ngoài boss giữ HP/cost; trong boss chỉ recovery **sau** abort/reset toàn attempt. Không giữ tiến trình boss với HP/loadout mới |
| Memory có thể không có form; hạch hỏng có thể còn dấu | Các trục tách biệt, ký ức không đủ mẫu hiện thân; không mâu thuẫn cấm hồi sinh |
| Tên Tinh Linh mới và “linh thể” cũ | Tinh Linh là thuật ngữ nhân vật chuẩn từ Task 03; “linh thể” vẫn là mô tả, không một thực thể khác |

## Review thiết kế Task 03

Đã kiểm tra mười điểm: giữ bí ẩn nguồn gốc; bootstrap Quy khác switch; không hồi sinh vô hạn; model hỗ trợ bộ ba; progression riêng; boss khóa rõ; nonplayable có collection; ký ức có giới hạn; traversal khác combat; mô hình ID/catalog và trạng thái hỗ trợ nhiều chương. Các bảng edge case/trace được review như đặc tả, không nhận là test gameplay chạy thành công. Các quyết định P chưa duyệt không là tính năng hoàn tất.

## Tài liệu đã đọc và thay đổi

Đã đọc tám tài liệu Task 01 và chín file lore Task 02, gồm WORLD_HISTORY, SACRED_CREATURES, SPIRIT_AND_RESONANCE, ANCIENT_CATASTROPHE và lịch tiết lộ. Tạo chín tài liệu Task 03 ở mục lục; thêm tham chiếu trong README/GAME_VISION/PROJECT_DECISIONS/OPEN_QUESTIONS và ghi chú supersession có giới hạn trong tài liệu Task 02. Không thay source, tests, UI, assets, build config hoặc lockfile.

## Chuẩn bị Task 04

Cần đề bài riêng và phạm vi rõ. Nếu triển khai hệ: duyệt ứng viên model/transaction/boss save, chốt các tham số cần cho phần code đó, catalog IDs và migration strategy; nếu làm nội dung: reference Quy và brief các stage/clip vẫn thiếu. Không tự tạo artwork hay tiến hành Task 04. Không cần tiết lộ nguồn gốc vũ trụ để tiếp tục công việc độc lập.
