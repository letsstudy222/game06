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
