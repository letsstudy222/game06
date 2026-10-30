# Xung đột lớn và vai trò boss

**PROPOSED S05-P08:** narrative briefs, không phê duyệt identity/species/visual/attack/stat của boss. “Boss” là encounter có khóa loadout; thắng combat không tự là restoration. [Cast](MAJOR_CHARACTERS_AND_FACTIONS.md) giữ motivation/knowledge; đây là outcome contract của conflict, tránh tạo nhân vật mới trùng vai.

| Chiều brief | I — Người Giữ Mạch Nước | II — Người Giữ Bờ Nhiệt | III — Người Điều Phối Gió | IV — Người Bảo Hộ Sinh Cảnh |
| --- | --- | --- | --- | --- |
| Actor / event | `npc_tide_keeper` / `evt_04_guardian_conflict` | `npc_thermal_custodian` / `evt_10_protect_outlets` | `npc_wind_regulator` / `evt_15_network_conflict` | `npc_garden_advocate` / `evt_20_ecological_confrontation` |
| Chức năng hệ sinh thái | Bảo vệ nơi trú quanh sanctuary/dòng yếu | Theo dõi sinh cảnh bazan/rừng ở outlet cũ | Giữ các tuyến khí còn vận hành | Bảo vệ đối tác và habitat mới trong mạng sống |
| Lịch sử cá nhân ứng viên | Từng chứng kiến mở dòng nhanh gây xói | Cộng đồng sống tốt trong trạng thái núi lửa nguội | Từng ngăn một tuyến chịu quá tải, rồi nắm quyền phân phối | Chứng kiến một nỗ lực “trồng lại” làm hỏng sinh cảnh đã thích nghi |
| Động cơ | Không muốn nơi trú bị cuốn đi | Sợ hồi phục nhiệt xóa nơi ở | Tin chỉ kiểm soát tập trung mới an toàn | Không muốn sinh vật hiện tại bị coi là sai lệch phải xóa |
| Xung đột với người chơi | Chặn khóa hồi lưu cần mở có giới hạn | Ngăn outlet cần kiểm chứng cho chu kỳ nhiệt | Giữ node không cho mạng có nhiều lối điều phối | Cản liên kết khi chưa thấy bypass bảo vệ habitat |
| Liên hệ mất cân bằng | Bảo vệ cục bộ làm hạ lưu thiếu đường về | Đóng nhiệt triệt để làm dòng khác lệch | Giữ một nhánh khiến nhánh xa chịu áp sai | Mất lòng tin làm các nút sống còn bị cô lập |
| Vì sao đối đầu/combat | Người chơi phải bảo vệ thao tác xả trong phản ứng lãnh thổ, không đấu để chứng minh loài ác | Tranh quyền thử vận hành/xả nhiệt trong vùng còn sinh vật | Tranh quyền tiếp cận nhiều node/route, không chỉ HP boss | Lập luận bằng bằng chứng và thử vận hành; combat bảo vệ thao tác có thể có nhưng không thay giải pháp sinh thái |
| Liên hệ Sacred | Quy hiểu giữ lại sự sống khác khóa mọi dòng | Phượng biểu hiện renewal có trách nhiệm, không đốt hết | Long phân tán ký ức trái với quyền sở hữu một nút | Ly không tự hồi khi quan hệ mất, cần phục hồi trước thức |
| Kết quả thắng | Có cửa sổ thao tác và chấp nhận kiểm chứng xả phụ, keeper không cần chết | Có quyền vận hành thử có ràng buộc, custodian giữ vai giám sát | Nhiều tuyến được tiếp cận, regulator bớt độc quyền | Bypass và điều kiện cùng tồn tại được chứng minh; advocate có thể đồng thuận thực dụng |
| Hệ quả môi trường | E05 mới commit nước ổn định sau đo/đọc dòng | E11 mới commit nhiệt ổn định sau kiểm chứng | E16 mới commit gió ổn định sau cân nhánh | E19/E21/E22 chứng minh quan hệ sống và ổn định, không boss death flag |
| Alternative nếu phù hợp | Bằng chứng và thử nhánh hồi trên main path thay một phần combat | Chứng minh đường xả phụ trên main path | Thử mạng đa nhánh có giới hạn kiểm chứng quan điểm | Có thể không fight; phải chứng minh điều kiện sống, không skip bằng dialogue check thuần |
| Failure / retry | Mất thao tác/HP → rút checkpoint, attempt reset; không mất loài | Dừng thử tải an toàn, habitat không bị phá vĩnh viễn vì fail | Reset trạng thái encounter tạm, giữ node khảo cứu đã commit | Thử nhánh không đạt → quay về kế hoạch, không diệt habitat; combat fail nếu có theo checkpoint |

Không dùng một “tà lực bí ẩn” làm nguyên nhân của cả bốn. Những sinh vật hostile thường có lãnh thổ/hành vi; forced assimilation chỉ là một trường hợp, không default mọi boss. Không tự thêm nhiều lựa chọn đạo đức vào mỗi trận; chỉ IV có variant sinh thái trọng tâm, các nhánh khác là cách giải quyết cùng điều kiện an toàn.

## Khóa bộ ba và xung đột nguồn — PROPOSED S05-P02

D05/D06 confirmed: ba slot, một active, thành phần khóa trong boss. R03-P06 đề xuất thêm full-three khỏe trước mọi boss, chưa confirmed. Blueprint này **khuyến nghị khác** cho encounter sớm: cho entry với các dạng main đã mở và slot trống; snapshot cả membership lẫn empty, cấm lấp slot đến khi encounter kết thúc. I chỉ Quy, II Quy/Phượng, từ III có ba Sacred qua main path. Vẫn không thêm member giữa boss, không buộc sở hữu loài optional.

Đây là xung đột creative design được ghi công khai, không tự sửa code/canon. R03 full-three vẫn là alternative cũ; trước implementation phải duyệt một chính sách duy nhất hoặc duyệt nội dung main bảo đảm đủ ba dạng. Không ngầm thêm hai species chưa được duyệt. Handoff/schedule của Task 05 dựa S05-P02; các transaction/reload/defeat ứng viên khác R03 giữ nguyên trạng thái PROPOSED.

## Task 06 — boss profile mapping và đánh giá alternatives

**PROPOSED F06-P12:** file này tiếp tục là authority cho yêu cầu `CHAPTER_BOSS_NARRATIVE_BRIEFS.md`, không tạo bốn boss/leader mới. Bảng brief Task05 ở trên giữ chức năng sinh thái/history/motivation/crisis/outcome; các profile ID sau là khóa dữ liệu ứng viên, không identity/art/stat approved.

| BossNarrativeProfileId | Actor / event giữ nguyên | Identity riêng và đánh giá alternative |
| --- | --- | --- |
| `boss_water_access` | `npc_tide_keeper` / `evt_04_guardian_conflict` | Bảo vệ refuge ở mạng nước; phòng ngự/bơi có ý nghĩa. Proof xả phụ trên main có thể giảm một phần confrontation, cùng outcome kiểm chứng, không một nhánh ending đạo đức riêng |
| `boss_thermal_access` | `npc_thermal_custodian` / `evt_10_protect_outlets` | Tranh nguồn/nơi trú và điều kiện thử nhiệt, không lava monster vô tri. Các cách combat/proof hội tụ về cùng giới hạn an toàn; không cam kết sản xuất hai questline hoặc loot khác nhau để ép lựa chọn |
| `boss_air_control` | `npc_wind_regulator` / `evt_15_network_conflict` | Tranh quyền access mạng khí, liên hệ faction control là hypothesis chứ không membership canon. Đối đầu có objective môi trường; proof/lối hồi là điều phải kiểm chứng, không skip toàn nhiệm vụ bằng điểm reputation |
| `boss_living_network` | `npc_garden_advocate` / `evt_20_ecological_confrontation` | Đối đầu tư tưởng bảo vệ adaptation; cho selected noncombat proof/bypass và variant có thể điều chỉnh lại. Combat bảo vệ thao tác nếu có không tự giải sinh thái bằng HP0 |

Chỉ IV có variant môi trường trọng tâm; I–III có cách giải hội tụ cùng điều kiện, không buộc mỗi boss hai ending/phe exclusive. Alternative cần thiết kế nguồn evidence **main** hoặc điều kiện có thể đạt không giết, không check optional faction quest/morality score. Danh tính cuối, pattern, precise mechanics, artwork/animation và numbers dành task sau; không mở nội dung hành tinh hay giải origin qua boss.

Thắng conflict không đồng nghĩa stable toàn hệ: giữ E05/E11/E16/E22, các routes/refuges/journal source Task05 và lock/retry candidate. Completed encounter/NPC neutral không tự respawn hostile khi quay lại; replay nếu có là challenge tách không main reward. Chính sách empty-slot S05-P02 vs full-three R03-P06 vẫn UNRESOLVED, Task06 không phê duyệt một bên.
