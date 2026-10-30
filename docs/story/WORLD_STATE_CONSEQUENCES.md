# Thế giới đáp ứng và quyền quay lại

**CONFIRMED:** có thể lưu thay đổi quan trọng, tránh bất ngờ khóa nội dung/collection thiết yếu. **PROPOSED S05-P09:** các trạng thái/cờ/spawn/variant sau. Dormant / Unstable / Restoring / Stabilized / Adapted ecosystem là khái niệm kể chuyện, không mandatory enum hoặc năm cấp tuyến tính.

Một vùng có thể vừa ổn định tuyến chính vừa có habitat thích nghi chưa trở về mẫu cổ. `*_stable` nghĩa là tuyến phục hồi được kiểm chứng vận hành trong giới hạn, không mọi góc biome đã hoàn hảo. Flag main đã commit không bị side quest hay thời tiết xóa ngược để softlock chương sau.

| Vùng | Ban đầu | Giữa chương | Sau climax | Nơi mở / sinh vật mới hoặc dời | Ảnh hưởng vùng cũ / follow-up |
| --- | --- | --- | --- | --- | --- |
| Hải Uyên | Sanctuary dormant; hồi lưu bất ổn, rạn có vùng trú vẫn đẹp | E01 Quy thức cục bộ; E03 đường hồi tạm; habitat ngoại lai được quan sát, không xóa | E05 `water_stable`, `refuge_preserved`; keeper có thể neutral | Kênh sườn biển/điểm trồi; loài trước ở cửa dòng dời sang hồ trú có entry journal, loài theo dòng mới xuất hiện ở nhánh optional | Sau E11 nhiệt phân phối khác, sau E16 ẩm/gió giúp mặt nước; theo dõi rạn và ký ức trước chưa nhặt vẫn tới được |
| Nhật Diệm | Núi lửa ngủ, khe nóng cục bộ, rừng bazan và nơi ở thích nghi | E08 sanctuary Phượng active, chưa cả núi; outlet thử tải giới hạn | E11 `heat_stable`, `basalt_refuge_preserved`; rừng/đường trú còn | Luồng nâng theo trạm, buồng nhiệt có lối an toàn; một số loài dời khỏi outlet được đánh dấu; không tất cả đảo hóa lava | Hải Uyên có nước hồi lưu ấm phân bố, mở ecological follow-up; revisit Nhật Diệm có habitat nhiệt/nguội song song |
| Phong Vân | Lane đứt, storm barrier và đường trú; một nhóm giữ tuyến vận hành | E14 Long hiện thân từ phần mạng đã nối; quyền tiếp cận chưa ổn định | E16 `wind_stable`, `shared_air_access`; regulator neutral hoặc vai giám sát | Nhánh tới rễ Vạn Sinh; loài quen dòng xiết dời sang hành lang tương thích, không bị xóa | Thermal Nhật Diệm có điểm đáp ổn định hơn; ghi chép Hải Uyên có payoff cấu trúc; optional Wind–Lightning habitat còn |
| Vạn Sinh | Đẹp nhưng mạng sống phân mảnh; cộng đồng cũ/mới có nhu cầu khác | E19 quan hệ mẫu được phục hồi, Ly chưa thức; lựa chọn variant có preview | E22 `life_stable`, `adapted_habitat_preserved`; Ly điều phối, không revive mọi cá thể | Cụm sống nối và công trình cổng tới được; loài di chuyển theo nhu cầu có chỗ thay thế, không bắt phải chọn giết một loài | Bốn vùng nhận sức đệm sinh học; follow-up kiểm chứng tác động, không xóa mọi bất ổn để mất lý do khám phá |

## Spawn và collection — PROPOSED

Mỗi habitat change có bảng nguồn cũ → refuge/new habitat → accessibility route → journal hint → repeatable observation/resonance source. Trước commit, kiểm tra mọi essential/collectible record có ít nhất một nguồn tiếp cận sau thay đổi. Không yêu cầu đã ghi journal trước mới được bảo vệ quyền gặp lại; hint có thể tự thêm là “dấu nơi trú thay đổi”, không tự grant observation/unlock.

Dời loài không spawn duplicate unique individual hoặc cho farm story reward. Species có thể gặp nhiều lần nhưng unlock/reward idempotent theo Task 03. Core/historical memory optional có archival/revisit source ở ruins đã ổn định; kết boss trước không xóa fragment. Không cần capture/giết NPC để hoàn tất collection; NPC có thể là species nonplayable.

## Variant điều chỉnh lại — PROPOSED

`habitat_variant` tại IV chọn phân nhánh nước/ẩm giữa các khu vẫn có điều kiện sống. Preview nêu ai chịu ảnh hưởng, có inspection interval và thao tác chỉnh lại qua `opt_08_rebalance_garden`; không thay `life_stable=false` hoặc làm mất main route. Mỗi variant giữ refuge cho collection. Không đặt “chọn sai thì tuyệt chủng vĩnh viễn” hoặc yêu cầu replay toàn game để gặp loài khác.

Variant ID không ghi quyết định đạo đức tốt/xấu. Nếu chưa chứng minh tương thích sinh thái/collection, không đưa lựa chọn ấy vào production. Không xóa habitat cũ chỉ để làm màu cảnh sau đẹp hơn.

## Persistence và revisit

Main environmental event commit cùng quest completion/reward/spawn mapping bằng transaction; simulation hazard/scene presentation khác durable world state. Trở lại sau chapter mới đọc current regional projection, không replay sự kiện main hoặc reset keeper hostile. Completed boss location là không gian khám phá/đối thoại sau conflict; challenge replay nếu có phải instance tách không grant main reward.

Mở chapter transition tạo cả return edge an toàn và checkpoint trước khi cho người chơi qua; dùng cơ cấu/đường trú đúng geography, không nút fast travel vô nguyên cớ. Nếu biến thể/thời tiết chặn một lane, return route hoặc rescue checkpoint vẫn có. Các spec storage/migration chi tiết tại [handoff](STORY_IMPLEMENTATION_HANDOFF.md), không triển khai enum/save code trong task này.

## Task 06 — quan hệ phe và encounter consequences authority

**PROPOSED F06-P02/P13:** mở rộng file hiện hữu thay `FACTION_AND_WORLD_CONSEQUENCES.md`. Region state Task05 vẫn là nguồn chính; faction response chỉ overlay địa phương. Không thêm global morality meter, không biến một faction quest optional thành điều kiện Sacred/cổng hoặc xóa stable main flags.

| Trigger / source | Before → after địa phương | NPC/creatures chịu tác động | Access mới / collection | Persistence / rollback/follow-up |
| --- | --- | --- | --- | --- |
| `evt_04_guardian_conflict` rồi `evt_05_restore_water` | Guardian ngăn thao tác → neutral/thử an toàn → hồi lưu có refuge | `npc_tide_keeper`, defenders theo nguồn, wildlife/Thủy–Lôi candidate | Sanctuary/route nước mở, dời loài cửa dòng tới refuge có đường quan sát | Disposition cùng conflict commit; water_stable/refuge/route theo E05 riêng. Không replay fight/reward; follow-up rạn, không faction optional gate |
| `evt_10_protect_outlets` rồi `evt_11_restore_heat` | Outlet bị tranh → monitoring/chu kỳ chọn lọc, hazard lane đổi | Custodian, forager/adapted Hỏa–Kim và unstable theo source | Trạm nhiệt/đường trú, deposit có chỗ khảo cứu an toàn; giữ nguồn collection nguội/ấm | Commit heat/refuge/source mapping theo E11; fail thử tải không phá habitat vĩnh viễn, follow-up kiểm chứng source |
| `evt_15_network_conflict` rồi `evt_16_restore_wind` | Node độc quyền/patrol ngăn → quyền tiếp cận chung + tuần tra bớt đối địch tại route đã giải | Regulator/scout/patrol có nhiệm vụ liên quan, không tất cả loài/phe | Route khí/điểm trú mở, storm-adapted vẫn có niche/refuge | Access/disposition scope đúng node/region; wind_stable không bị optional faction bất đồng xóa; source archive còn |
| `evt_20_ecological_confrontation` tới E21/E22 | Nghi kế hoạch xóa adaptation → proof/bypass hợp tác → mạng sống ổn định | Advocate và populations cũ/mới có nhu cầu khác | Refuge/nguồn observation ở cả variant, không climax extermination | `life_stable`, `adapted_habitat_preserved` giữ; `opt_08_rebalance_garden` điều chỉnh variant có preview, không undo main |
| Optional stabilization outcome **chưa có eventId production** | Source stress → recovering/managed/stable_adapted theo evidence, không forced-pure | Cùng cá thể/loài và nơi trú; behavior nền còn, không mặc định pet | Observation giai đoạn cũ qua record/archive/refuge; không duplicate specimen/form | Lưu source/outcome/version + reward một lần; nếu cần follow-up khai manifest riêng, không tái gây đau để farm residue |
| Local concern/action được chứng kiến | Một nhóm tăng suspicion, nhóm khác có thể ghi nhận bảo vệ nguồn | Actor/region/faction concern cụ thể, không toàn faction global war | Optional access hoặc offer khảo cứu; main route luôn có main proof/bypass | Source actionId/evidence và scope; lời truyền chưa biết không thành fact mọi NPC; repair qua evidence/hành động hợp lệ không kill grind |
| Accidental attack/disengage | Neutral → transient alert/self-defense → ngừng truy khi threat hết và safe boundary | Cá thể và witnesses thực sự có khả năng nhận biết, không cả species | Giữ đường rút và nguồn quan sát về sau; không permanent lost collection | Aggro tạm không tự durable hostility toàn phe. Nếu action cố ý/lặp có concern thì record riêng; không gift/đổi form xóa damage ledger |

### Trust/suspicion/access không là điểm đạo đức

Fact có sourceId, concernId, scope region/actor và permission cụ thể. Hai phe có thể đánh giá cùng hành động khác nhau mà không mâu thuẫn state: một bên lo ảnh hưởng nguồn, bên kia thấy refuge được giữ. Feedback giải thích concern/điều kiện sửa, không trừ thanh ẩn khóa cả game. Trông Giữ có thể cấp archive read nhưng không buộc gia nhập để đi Sacred main route; Tân Sinh/Hồi Nguyên có thể hợp tác tại một nơi và bất đồng nơi khác.

Permission optional có điều kiện review/revoke và đường repair; **essential main access** có guaranteed proof/alternative trên main path và không bị optional faction reputation chặn. Temporary hostility có scope/điều kiện hết/đường tiếp xúc lại ở safe place. Không cho lựa chọn phe permanently exclusive hoặc yêu cầu genocide làm điều kiện trung lập.

### World change khi actors còn active

Đề xuất stage change ở boundary an toàn: ngừng nhận spawn mới từ projection cũ, giữ actor IDs/completion ledger, đối chiếu placement/source/nav mới rồi relocate tới refuge hợp lệ trước khi cho attack lại. Không despawn vào void hoặc spawn một bản mới để nhận reward trùng. Nếu đang boss lock/transition không tương thích, queue change tới khi attempt/arrival resolve; đừng sửa cảnh đánh nửa chừng không báo.

Một quest ổn định nguồn có thể chủ động ngắt encounter nếu contract cho phép: commit source/outcome/disposition/HP policy đã khai và kết thúc attack an toàn, không heal hay đổi affiliation ngầm. Boss completion vs ecological restoration là transactions khác như Task05; các rollback của thử nghiệm chưa commit không đảo main flags đã durable. Mọi mapping habitat/source phải giữ ít nhất một route nghiên cứu/collection, kể cả người chơi chưa từng gặp loài.
