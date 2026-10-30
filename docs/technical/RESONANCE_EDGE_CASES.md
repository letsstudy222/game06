# Trường hợp biên Cộng Hưởng

**PROPOSED R03-P11:** kết quả kỳ vọng để viết acceptance tests về sau, **không phải test gameplay đã chạy**. Dẫn chiếu [data model](RESONANCE_DATA_MODEL.md), [biến hình](../gameplay/TRANSFORMATION_DESIGN.md) và [thu nhận](../lore/RESONANCE_RULES.md). Mọi fallback giữ progression/collection, không tạo loài hay dạng thay thế chưa được mở.

| ID | Điều kiện / thao tác | Kết quả an toàn và recovery | Bất biến cần kiểm |
| --- | --- | --- | --- |
| EC01 | Event mở species đã ghi/đã RESONATED | Thêm provenance mới nếu có; no-op unlock/reward cũ; ID grant cũ không áp lần hai | I04/I07: một progression/formId và grant một lần |
| EC02 | Gặp cá thể cùng loài đang hiện thân | Cá thể gốc vẫn độc lập; observation/source mới có thể cập nhật; không tự unlock hoặc chiếm cơ thể | I04/I07; không delete/spawn clone cá thể gốc |
| EC03 | Đủ điều kiện evolution trong boss | Ghi eligibility/pending benefits, giữ stage/config frozen; sau attempt và safe rest mới apply một lần | I03/I05/I07, không maxHP heal giữa boss |
| EC04 | Source HP0 trong PREPARING | Hủy pending, nhả reservation; defeat flow chọn reserve viable theo thứ tự hoặc reset checkpoint; không commit request cũ | I01/I06; cùng defeat event không chuyển hai lần |
| EC05 | Chỉ có một/hai dạng | Ba vị trí vẫn có empty; khám phá thường hợp lệ; boss yêu cầu bộ ba bị chặn ở preparation, luôn có đường rút | I02; không clone Quy để lấp ba slot |
| EC06 | Reload lúc biến hình ngoài boss | Precommit giữ source với HP/cooldown durable mới nhất, không tiêu reservation; postcommit giữ target/cost/recovery; không offline heal | I05/I06; rollback không hoàn HP đã nhận |
| EC07 | Đổi reserve qua menu trong boss | Từ chối ở state authority, collection chỉ đọc; active switch trong frozen set vẫn được | I03; scene/menu không thay set hoặc revision |
| EC08 | Narrative event tạm khóa một dạng | Giữ unlock/XP/stage, disable selection có lý do và điều kiện gỡ; không xóa collection | I08; không reset tiến trình khi mở lại |
| EC09 | Active trở nên unavailable | Atomic safe transfer tới reserve HP>0/hợp lệ; nếu không có thì checkpoint/abort boss, không spirit-only tự do | I01/I03/I09; không đổi thành viên để bypass boss |
| EC10 | Memory mở trước hoặc không có dạng | Ghi fragment/ledger theo gate; discovery có thể được cập nhật, không tự RESONATED hoặc tạo progression | I04/I07 |
| EC11 | Loài collectible không playable | Có discovery/observation/memory phù hợp; không nút equip, không bắt RESONATED/MASTERED; record không lỗi vì thiếu formId | I04, catalog playable flag độc lập rarity |
| EC12 | Linh Hạch hỏng IRRECOVERABLE | Không đồng bộ để hiện thân; còn dấu đủ thì khảo cứu/memory theo gate. Năng lượng không khôi phục cá thể mất hoàn toàn | I04; không mana→revive unlimited |
| EC13 | Story reward chạy hai lần / reload khi grant | Stable grantId + atomic payload/marker; lần sau no-op; payload khác cùng ID báo conflict | I07; unlock/XP/memory chỉ một lần |
| EC14 | Save tham chiếu species bị đổi tên/xóa | Alias stable ID khi rename; removed content giữ orphaned progression trong backup, disable render/equip; nếu active invalid, fallback dạng đã mở hợp lệ hoặc last valid checkpoint; không fabricate form | I01/I08; migrate backup trước ghi, không erase records |
| EC15 | Entry vùng mọi dạng đều bất lợi | Bất lợi nhưng viable: báo rõ, vẫn cho lựa chọn; nếu không dạng nào có thể tồn tại/thoát thì chặn entry ở safe boundary. Nếu dynamic event làm invalid toàn bộ: hồi checkpoint, abort/reset boss | I01/I10; không xử lý disadvantage như cấm vô cớ |
| EC16 | Unlock form/memory giữa boss | Reward hợp lệ commit collection/ledger; không equip dạng mới/đổi snapshot; benefits hoãn ngoài attempt | I03/I07; không slot thứ tư |
| EC17 | Reload/disconnect trong boss | Dùng persisted lock → idempotent abort/reset boss/entry checkpoint → unlock sau reset; không giữ damage boss và đổi bộ ba | I03/I07; không lợi reload từ menu hoặc transition |
| EC18 | Target HP0/disabled hoặc footprint chỗ đặt đổi trước commit | Hủy khi source còn viable, nhả reservation; không tiêu/heal; target không xuất hiện trong tường. Source cũng invalid thì safe recovery | I01/I06 |
| EC19 | Damage đúng tick COMMIT | Event trước boundary đánh source, event sau đánh target; cùng tick resolve queued damage trước validate; không hai body nhận cùng hit do duplication | I05/I06; event ID chống xử lý kép |
| EC20 | Hết quỹ hoặc switch cooldown còn | Từ chối voluntary switch, giữ thân hiện hành/đi bộ; không reset qua re-equip. Chuyển khẩn chỉ khi active thực HP0 và còn reserve viable | I01/I05; không spam miễn phí |
| EC21 | Tất cả ba dạng incapacitated | Attempt failed, boss reset, checkpoint recovery; giữ unlock/XP/memory đã commit, không mất dạng vĩnh viễn hoặc reward boss chưa thắng | I01/I07/I09 |
| EC22 | Không activeForm trước thức tỉnh Quy | Chỉ bootstrap scene có nhận cảm giới hạn; nhịp 9 commit dạng đầu một lần, sau đó bắt buộc active | I01/I09; không đòi form sẵn để mở Quy |
| EC23 | Reload khi boss đã chết, reward đang RESOLVING | Nếu completion durable thì replay commit idempotent và finalize; nếu chưa durable thì abort attempt theo policy, không giữ loot partial/double | I07; reward và completion cùng transaction |
| EC24 | Reserve HP0 được remove rồi equip lại ngoài boss | HP0 và cooldown thuộc progression, không thuộc slot; vẫn không thể active trước recovery | I05; menu không heal |
| EC25 | Content version mới làm frozen snapshot không còn hợp lệ | Load policy abort/reset attempt trước migration; preserve/alias records; không resume boss với stats mới và HP boss cũ | I03/I08 |
| EC26 | Scene transition xảy ra khi PREPARING | Chặn transition hoặc cancel precommit trước boundary; trong boss chỉ retreat đã ghi abort; không mang pending tx và lock nửa vời sang scene | I03/I06 |

## Trace biên tập — PROPOSED, không phải kết quả thực thi

- **T1:** PREPARING A→B, A bị đánh về HP0 và B lúc ấy cũng unavailable → cancel → reserve viable C nhận active qua defeat flow một lần → C giữ HP cũ, không reward/miễn damage. Không dùng target B của request bị hủy như một commit thành công ngầm.
- **T2:** ACTIVE_LOCKED {A,B,C}, unlock D, reload → abort/reset attempt cũ và checkpoint → mới cho chọn D → attempt mới boss full/reset. Không vừa giữ HP boss cũ vừa thay D vào set.
- **T3:** DISCOVERED nonplayable, mở fragment M → lưu memory M và grantId → event lặp no-op → không form progression. Cho thấy collection/memory không kéo theo playable.
- **T4:** PREPARING A→B đã nhận damage durable, đóng trang trước commit → nguồn A giữ damage mới nhất, reservation nhả; không rollback về snapshot HP trước animation.
- **T5:** Stage đủ điều kiện ở boss, reload abort → pending benefit hợp lệ được giải quyết ngoài lock tại safe rest, một lần; attempt mới dùng stage mới từ đầu, không biến hình để heal trận cũ.

## Phụ thuộc chưa định lượng

Giá trị thời gian phase/cooldown, resource cap/rate/cost, HP theo stage và curve XP cần task balance. Các test tương lai dùng symbolic/configured values, không đưa số giả thành canon. Cần test storage interruption tại mỗi boundary, môi trường thay đổi và catalog migration trước phát hành; chỉ review logic tài liệu ở Task 03.
