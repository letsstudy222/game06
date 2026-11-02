# Thiết kế biến hình và bộ ba

[Quyết định và trạng thái](../lore/RESONANCE_DECISION_RECORD.md). **CONFIRMED:** ba slot, chỉ một dạng vật lý active; boss khóa thành phần bộ ba nhưng vẫn cho đổi giữa ba dạng; ngoài hạn chế encounter được sắp lại từ collection. **PROPOSED R03-P01/P02/P06–P08:** mọi quy tắc chi tiết dưới đây. Không có code/UI/animation nào được sửa trong Task 03.

## Bộ ba và điều kiện chọn dạng — PROPOSED

Dữ liệu có ba vị trí chứa formId hoặc empty và một activeFormId. Khi trình bày, Slot 1 là active, Slot 2/3 là reserve; chuyển dạng đổi vai trò hiển thị chứ không thay tập thành viên. Không dùng thứ tự hiển thị để vượt khóa boss. formId ổn định theo species/dòng tiến hóa, không là từng cá thể hoặc từng stage. Không cho trùng formId/species trong ba slot.

Dạng chỉ equip được nếu đã RESONATED, catalog designatedPlayable, không bị đình chỉ nội dung và có cấu trúc được hỗ trợ ở version hiện tại. Ngoài encounter hạn chế có thể đổi reserve; đổi active qua collection cũng phải qua kiểm tra/transaction biến hình bình thường, không miễn năng lượng/cooldown. Dạng tạm unavailable do truyện không được thêm vào slot mới; dạng đang equip giữ ID/progression nhưng bị disable, không bị xóa. Dạng HP=0 không chọn làm active, không thể dùng re-equip để hồi máu; chỉ phục hồi theo quy tắc nghỉ/reset.

Trước khi đủ ba dạng, slot còn lại empty và không có filler/clone. **CONFIRMED D41 — Task09 §9/19:** không đặt yêu cầu ba thành viên hoặc ba nguyên tố khác nhau làm điều kiện tiến triển; boss đầu không bị chặn chỉ vì người chơi còn một/hai dạng phù hợp. Entry kiểm capabilities đã được main path bảo đảm và đường rút an toàn, không ngầm bắt loài optional. Giả định full-three gate ở proposal R03-P06 theo mốc Task03 không áp dụng cho early content; unique species/snapshot/HP/resource details khác của R03 vẫn PROPOSED.

## Một giao dịch đổi dạng — PROPOSED

Các trạng thái: `STABLE → PREPARING → COMMIT → RECOVERING → STABLE`; `CANCELLED` trở về nguồn còn hợp lệ. Chỉ một giao dịch pending. Chưa có activeForm chỉ hợp lệ trong bootstrap mở đầu có sceneId rõ, không là cách đi vô hình sau thất bại.

| Bước | Điều kiện / hiệu ứng |
| --- | --- |
| Request | Target trong tập equip, khác nguồn, HP>0, không unavailable, đạt ràng buộc môi trường và footprint chỗ đặt; source không trong hành động không thể ngắt; quỹ ổn định đủ và cooldown hết |
| PREPARING | Đặt chỗ chi phí nhưng chưa tiêu; nguồn vẫn là thân vật lý chịu damage. Không tấn công hoặc nhận request đổi dạng chồng; có thể hủy trước commit theo input rõ |
| COMMIT nguyên tử | Kiểm tra lại source/target/lock/location; tiêu chi phí đúng một lần, chuyển active/collision/HP context sang target và ghi transactionId. Không spawn thân thứ hai, không reset HP/cooldown |
| RECOVERING | Target chịu damage; chưa thể request đổi lần nữa cho đến hết recovery và cooldown. Không cấp i-frame chỉ vì effect biến hình |
| Cancel trước commit | Nguồn còn hợp lệ thì trả trạng thái nguồn, nhả reservation, không tiêu chi phí, không heal; không nhận input combo/attack trong cùng tick hủy. Rate limit request tránh spam effect |

Sát thương đến trước mốc commit áp nguồn; từ commit áp target; event cùng tick dùng thứ tự xác định: damage đã xếp trước commit được giải quyết trước, sau đó kiểm tra lại giao dịch. Source HP0 trước commit hủy giao dịch và chạy luồng incapacitation; không tự hoàn tất sang target theo request cũ. Target HP0/unavailable trước commit cũng hủy. Sau commit không rollback để tránh trả damage/chi phí. Khác biệt kích thước cần space clearance; không dùng đổi dạng để xuyên vách.

Quỹ ổn định chung Tinh Linh hữu hạn, cost/cap/rate/cooldown/thời gian phase là tham số cân bằng **UNRESOLVED**, không hardcode số. Đề xuất hồi quỹ theo simulation khi active ổn định, không đang biến hình, không trong hazard gây mất ổn định; không cộng thời gian đóng tab/offline. Boss không có kênh hồi riêng qua collection. Năng lực chiến đấu có thể dùng tài nguyên riêng ở task sau; không mặc định dùng chung quỹ này. Không đốt quỹ để tồn tại cơ bản/đi bộ khi hết, tránh softlock.

## HP, thua trận và phục hồi — PROPOSED

HP, trạng thái incapacitated, cooldown kỹ năng giữ riêng từng form, không hồi nhờ cất vào reserve hoặc thay membership. Mọi cooldown dùng cùng simulation clock, tick dù form reserve; pause dừng cả hai. Không có regen reserve mặc định. Evolution không là full heal; thay maxHP ở điểm commit an toàn giữ tỷ lệ HP, không hồi form đã HP0.

HP0 làm form `INCAPACITATED`, hiện thân rút về mất ổn định, không có cái chết vĩnh viễn của cá thể gốc. Nếu có reserve HP>0, được phép và môi trường/footprint hợp lệ: thực hiện một **chuyển khẩn cấp tự động** tới form hợp lệ đầu tiên theo thứ tự reserve đã chọn, không tốn quỹ và không cần hết cooldown. Không cho người chơi dùng chuyển khẩn cấp tùy ý; chỉ do active mới về HP0, không grant invulnerability/heal hoặc tạo quỹ mới, không lặp trên cùng defeat event. Thiết lập cooldown chung/recovery như chuyển thường để không làm chuỗi thao tác lợi dụng miễn phí.

Nếu không có form hợp lệ, encounter thua, không cho Tinh Linh chạy tự do. Kết thúc attempt, đưa về checkpoint an toàn, hoàn tất transaction defeat/recovery rồi mới mở collection. Đề xuất nghỉ/reset checkpoint ngoài attempt phục hồi HP các dạng đã mở, quỹ ổn định và cooldown; đây là transaction recovery riêng sau khi boss đã reset, không reset cooldown bằng menu hoặc load thường. Khi hoàn tất recovery, không mất dạng/XP/memory đã commit và không nhận reward attempt chưa hoàn thành. Retry reset toàn boss và reward ledger của attempt chưa commit; không hồi HP miễn phí giữa cùng attempt. Không có permadeath thông thường.

Khi active trở nên bất hợp lệ do truyện/môi trường mà không do HP0: dùng safe transfer nguyên tử sang reserve hợp lệ không grant reward/heal, hoặc rút về checkpoint an toàn. Đây là phục hồi sự cố/content gate, không skill để lợi dụng; không được đặt trigger lặp tại checkpoint. Ưu tiên báo trước/chặn entry vào vùng không có dạng an toàn. Không đổi loadout membership trong boss để “cứu”; nếu không có lựa chọn hợp lệ thì reset attempt.

## Khóa boss — PROPOSED quản lý chi tiết, CONFIRMED khóa thành phần

Trạng thái encounter: `OUTSIDE → PREPARING → ACTIVE_LOCKED → RESOLVING → OUTSIDE`. attempt có ID và entry snapshot. Khóa theo tập ba formId, progression/evolution/config version tại entry; biến hình được đổi activeFormId nhưng không sửa member set. Mở UI collection trong boss chỉ đọc, service/state validation cũng từ chối mutation; không dựa vào ẩn nút.

| Tình huống | Quy tắc ứng viên |
| --- | --- |
| Chuẩn bị | Hiển thị điều kiện, ba dạng, nguy cơ môi trường, checkpoint; cho chỉnh loadout và rút ra. Không vượt điểm bắt đầu trước xác nhận |
| Khởi tạo | Theo D41 không reject vì chưa đủ ba member hoặc ba element khác nhau; kiểm available capabilities/main route và không pending transform theo encounter contract. Đề xuất ghi entry checkpoint, frozen selected set gồm empty/stages, attemptId và lock bền vững **trước** kích hoạt boss; chi tiết snapshot/recovery chưa tự approved |
| Trong trận | Switch chỉ trong frozen set; stat/skill/evolution config theo snapshot. Không đổi reserve bằng menu, transition, collection API hoặc save editor bình thường |
| Hạ boss | RESOLVING khóa tiếp; commit completion + reward ledger duy nhất rồi kết thúc lock. Reload giữa resolution phục hồi transaction, không cộng thưởng hai lần |
| Defeat | Ghi attempt failed, reset boss, rút về checkpoint, recovery như trên, đóng lock; retry là attempt mới và chọn lại bộ ba |
| Rời trận | Chỉ qua cơ chế retreat/abort rõ; coi attempt abandoned, boss reset, checkpoint ngoài. Không đứng ngoài arena với tiến trình boss cũ nhưng bộ ba mới |
| Reload/disconnect/save-load | Đề xuất **abort-and-reset**, không resume giữa boss. Nếu load thấy lock chưa kết thúc thì resolve abort idempotent, reset boss/đưa checkpoint trước khi mở collection. Không phục hồi boss đã mất HP cùng loadout mới |
| Unlock/memory/XP giữa trận | Có thể ghi vào collection/ledger nhưng không thêm member hoặc thay stats snapshot. Trì hoãn áp skill/evolution/level benefit đến sau attempt, không biến thành slot thứ tư |

Không có resume boss giữa trận trong phương án này. Nếu cần resume sau này phải thiết kế snapshot cả boss, RNG, cooldown, HP và lock nguyên tử; không tự bổ sung bằng task code. Bảo đảm consistency cho save hợp lệ; chống sửa save thủ công/đồng hồ độc hại hoặc gian lận multiplayer không nằm trong cam kết single-player này.

## Traversal khác combat — PROPOSED

| Dạng | Đọc và tác động môi trường | Combat không thay thế được | Loại thử thách |
| --- | --- | --- | --- |
| Quy | Đọc hướng/nhịp dòng, áp lực, cơ cấu ngập nước | Bắn nước không tự cho thở/bơi đúng mọi độ sâu | Quan sát nhịp, chọn tuyến, timing di chuyển |
| Phượng | Bắt luồng nhiệt, điều tiết cơ cấu lửa trong giới hạn nhiệt | Attack Hỏa không tự mở mọi đá đỏ hoặc miễn dung nham | Đọc đường xả, di chuyển giữa khoảng nhiệt an toàn |
| Long | Chỉnh hướng/áp dòng khí, vượt hành lang gió | Có thể bay không đồng nghĩa điều khiển dòng xiết | Phối hợp nhánh gió và nhịp chuyển động |
| Ly | Nối quan hệ rễ/cộng sinh, khôi phục điều kiện tăng trưởng | Healing combat không hồi sinh cả rừng chết | Suy luận nước/ẩm/đối tác sống, chọn quan hệ cần nối |

Nhóm tương tác khác nhau có thể dùng cùng phím contextual sau này nhưng không tự dùng cùng cooldown/combat rule. Hạn chế mandatory switching bằng đoạn thử thách đủ dài cho một dạng, alternate route và điểm đổi an toàn; phối hợp khả năng trên trạng thái môi trường được lưu chứ không bật/tắt dạng mỗi tile. Dạng không thuận lợi vẫn có thể dùng ở đoạn tương hợp; không phủ debuff toàn chương để xóa ích lợi dạng cũ.

## Task09 — current early-entry constraint

[Story S05-P02](../story/MAJOR_CONFLICTS_AND_BOSSES.md) đã khuyến nghị entry sớm với empty slots. Task09/D41 nay xác nhận không mandatory three-member/three-element gate, nên không tiếp tục coi full-three là alternative hợp lệ để chặn boss đầu. Đây là source mới explicit, không approval toàn bộ S05-P02. Selected membership vẫn khóa theo D06; snapshot cả empty, entry trigger, stage/config snapshot, atomic/reload/defeat và resource mechanics khác vẫn PROPOSED. [Task09 decisions](../elements/TASK09_DECISIONS.md) ghi phạm vi cập nhật và không tự chọn recovery model.


## Task16 — detailed loadout contracts, vẫn PROPOSED

[Overview](../loadout/LOADOUT_SYSTEM_OVERVIEW.md), [management](../loadout/LOADOUT_MANAGEMENT.md), [switch](../loadout/FORM_SWITCHING_RULES.md), [lock](../loadout/BOSS_LOADOUT_LOCK.md) và [L16 decisions](../loadout/TASK16_DECISIONS.md) mở rộng **cùng** EquippedFormLoadout/TransformationState/EncounterLockState R03, không new membership/HP/XP/active store. Active-first slots là display projection, immutable locked member identities khác active selection. [DR01](../loadout/BOSS_ENTRY_AND_RETRY.md) giữ D41 count constraint confirmed nhưng minimum-one/detailed entry/snapshot/retry pending và plan đồng bộ source sau approval. Same individual HP recommendation mang label B ở Task16/A ở C14, chưa approval. No automatic B+C/resource/geometry/config/health/save policy confirmation; không gameplay/UI/art changes.
