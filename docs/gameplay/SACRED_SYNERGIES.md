# Phối hợp Tứ Linh — ứng viên, không phải luật đã duyệt

**PROPOSED C04-P10:** mọi synergy trong tài liệu này. Không mở thêm nguyên tố cho species hoặc đổi Ly thành song Mộc/Sinh Mệnh. [Abilities](SACRED_CREATURE_ABILITIES.md) giữ luật từng chiêu; [transformation](TRANSFORMATION_DESIGN.md) giữ transaction/khóa boss đề xuất Task 03.

## Sáu cặp và đánh đổi

| Cặp | Ý nghĩa truyện | Exploration có thể dùng | Combat ứng viên | Hệ quả môi trường / cảnh báo | Balance và điều kiện |
| --- | --- | --- | --- | --- | --- |
| Thủy + Hỏa | Bảo tồn và biến đổi có đường hồi/xả | Quy chuẩn bị hồi lưu, Phượng cấp nhiệt vừa đủ cho hơi/áp để chạy cơ cấu hoặc luồng thấp | Residue nước hợp lệ gặp Hỏa tạo một pulse hơi che lane/đẩy nhẹ được báo trước | Hơi quá áp có thể nguy hiểm ở receiver; puzzle cần đường xả, không đun mọi hồ | Không auto-khuếch đại damage; không heal/quỹ hồi từ chu kỳ, mỗi effect-pair chỉ react một lần |
| Hỏa + Phong | Đổi mới cần hướng và giới hạn | Phượng tạo thermal, Long chỉnh hướng đoạn nối tới điểm đáp | Long có thể đổi hướng flame effect được tag, không kéo dài TTL hoặc nhân projectile | Tránh làm cháy lan toàn bản đồ/habitat; receiver chặn propagation ngoài vùng cho phép | Phải đọc vector, enemy có đường né; không tăng AoE theo số segment/mây vẽ |
| Phong + Mộc | Kết nối hệ sống không chỉ cấp năng lượng | Ly chuẩn bị nền khả thi, Long phân tán hạt/ẩm theo tuyến khảo cứu | Gió đổi vị trí một số seed/plant effect tạm để dựng điểm control mới, không mọc mạng mới vô hạn | Có thể hỗ trợ hoặc làm khô nguồn nếu sai, fail an toàn có thể làm lại; không tạo loài/canon mới | Cần nút/đất hợp lệ, seed carrier chỉ từ effect có nguồn; không spawn vật phẩm farm |
| Thủy + Mộc | Nước nuôi quan hệ, không tự hồi sinh | Quy tạo nhịp nước, Ly nối rễ/điểm bám cục bộ | Vùng đất sống đủ ẩm giúp một plant-control effect duy trì cấu trúc theo cap, không reset duration/heal | Tưới quá nhiều không luôn tốt; restoration event có điều kiện/mốc riêng | Không vòng mana→plant→heal→mana; S2 heal channel vẫn owner-only và kết thúc khi switch |
| Thủy + Phong | Đường ẩm và áp liên hệ nhưng không toàn năng thời tiết | Quy khôi phục nguồn ẩm, Long đưa tới nhánh khí/receiver gần | Dòng khí đổi đường water projectile hợp lệ hoặc gợn báo lane địch, không auto-homing | Không gọi bão/mưa khắp thế giới bằng hai nút; địa chất/nguồn nước vẫn cần | Không khống chế mọi đạn; chỉ tag có luật, một vector modification cap mỗi shot |
| Hỏa + Mộc | Đổi mới có kiểm soát khác phá hủy hệ sống | Phượng điều nhiệt cho nền sống có thể hồi, Ly nối lại quan hệ sau; không coi rừng cần đốt hết | Ly có thể ngắt/giới hạn một dải nhiệt ở nút tương hợp, mở đường an toàn thay vì nhân damage cháy | Thực vật không có khả năng hồi thì không “cháy rồi mọc lại”; không unlock bằng phá habitat collection | Không thêm Life resurrection; không friendly grief/irreversible choice; mọi vùng thử cần preview và phương án phục hồi |

Các ví dụ là hợp đồng interaction cần prototype, không hứa các effect này đều có trong game. Không lấy sáu cặp làm sáu ability slots mới hoặc ép tất cả puzzle đều là combo hai nguyên tố.

## Một active, tối đa ba member — PROPOSED

Synergy là thao tác nối tiếp lên trạng thái môi trường/hiệu ứng hữu hạn, không đồng thời triệu hồi hai/bốn cơ thể. Loadout chỉ cần hai form trong cặp, member thứ ba là lựa chọn; không dùng form ngoài bộ ba bị khóa boss. Khi mới chỉ có Quy hoặc chưa mở một cặp, tuyến chính không được đòi synergy chưa có; có đường cơ cấu/quan sát/cơ động khác, hoặc báo nhánh optional cần quay lại. Không đề xuất softlock phải mang cả bốn Sacred.

Ví dụ một thử thách ba dạng: Quy chuẩn bị hồi lưu → Phượng thermal → Long chỉnh một nhánh gió; Ly không bị đòi equip. Một nhánh khác có thể dùng Quy/Ly và cơ cấu xả tay, không bắt cùng ba lựa chọn cho mọi vùng. Đây là ví dụ cấu trúc task, không thêm level/quest canon.

Các world-state puzzle đã commit có thể tồn tại qua đổi dạng để tránh switch mỗi tile. Combat residue luôn có TTL/cap, khác persistent restoration. Content phải cho điểm đổi đủ an toàn và thời gian TTL phù hợp khi switch có cost/cooldown; chưa cân bằng được thì không làm mandatory path.

## Chủ sở hữu, snapshot và luật hết hiệu ứng — PROPOSED

- Mỗi effect có effectId, creatorFormId, stage/config snapshot, sourceAbilityId, castEventId, affectedReceiverIds, remaining lifetime, reaction ledger và ownership mode. Dùng snapshot lúc cast để không hưởng stats/skill mới từ reserve/evolution giữa attempt.
- Passive chỉ active; đổi dạng tắt ngay passive nguồn, không giữ bốn passive qua residue. Khóa boss cũng khóa stage/config. Field không tự là một cơ thể hoặc form slot.
- S2 hồi Ly là channel: switch, incapacitation, ngắt hoặc mất điều kiện chấm dứt channel; không chữa reserve. S3 Ly trong phương án này hỗ trợ qua vùng đứng ổn định/control, **không có healing tự động** cho mọi form; mọi heal bổ sung cần quyết định riêng.
- Effect combat không-channel đã cast hợp lệ có thể tồn tại đến hết TTL qua switch bình thường, trừ effect có ownership mode active-only. Khi creator incapacitated hoặc attempt abort/end, xóa combat residue của nó; không biến defeat thành nguồn effect lâu dài. World-state restoration đã commit không xóa chỉ vì đổi dạng/thua, trừ encounter rollback policy khai báo.
- Một cặp effect/receiver + reactionType chỉ kích hoạt một lần theo ledger. Reaction không tự sinh lại cùng hai input vô hạn, không gia hạn TTL/reset cooldown/generate resource. Chặn recursive feedback và giới hạn tổng effect theo budget chưa định lượng.
- Receiver xác định tác động có hợp lệ, blocked hay không có tác dụng; có preview/feedback bằng hình hướng/âm/shape, không chỉ màu. Không map toàn bộ tương tác theo “màu hợp thì mở”.

## Điểm cần duyệt — UNRESOLVED

Cặp nào thực sự vào vertical slice; loại effect có thể phản ứng; cap/TTL/cost, active-only exceptions, khả năng enemy dùng interaction, chính sách persistence của từng world receiver. Duyệt synergy không tự duyệt cả model hybrid hoặc các bảng khắc chế nguyên tố chưa có. Không đặt thông số số học để lấp phần balance.


## Task09 — generic elemental contracts

[Reaction register](../elements/ELEMENTAL_REACTIONS.md) đánh giá8conditional cases, [36-cell matrix](../elements/ELEMENTAL_INTERACTION_MATRIX.md) không là fixed multiplier chart. Giữ sixpair concepts/owner/channel/expiry ở đây PROPOSED C04-P10, không đổi names/skills/anatomy. Water–Wind/Wind–Wood có thể chỉ vector/carrier environmental synergy; không mọi cặp cần damage proc. D41 không mandatory3member/3elements, early content đủ main forms hiện có; Task10 dual profile math chưa chốt. Source snapshots/active-only Ly channel/reserve noheal/reaction ledger vẫn proposal nguồn, không được auto approve vì Task09 dẫn lại.
