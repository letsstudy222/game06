# Outline nhiệm vụ chính và optional

**PROPOSED S05-P13:** tên/ID mission, không quest JSON. Mỗi main mission `mq_NN` map một event sau; purpose/objective/actions/entry/completion/information/reward/world effects/dependencies resolve qua contract cùng ID trong [handoff](STORY_IMPLEMENTATION_HANDOFF.md), là nguồn duy nhất cho các field đó. Bảng này thêm mục đích/nhịp thay vì chép điều kiện có thể lệch. Không gate main bằng optional.

| QuestId / tên | Event authority | Purpose / essential actions |
| --- | --- | --- |
| `mq_01` / Cảm một dòng sống | `evt_01_quy_awakes` | Có cơ thể đầu và thoát buồng thức; Theo tín hiệu; chạm hạch; trải nghiệm ký ức thiếu; cộng hưởng; thử bơi/hãm |
| `mq_02` / Rạn vẫn đang sống | `evt_02_read_reef` | Quan sát và ghi khác biệt giữa sinh cảnh/hostility; Bơi rạn; quan sát hành vi; ghi journal; vượt encounter lãnh thổ ngắn; thấy habitat ngoại lai yên ổn |
| `mq_03` / Đường nước trở về | `evt_03_trace_returns` | Hiểu đe dọa và chuẩn bị đường xả phụ; Đọc kênh cấp/hồi; khảo cứu CL01/CL02; tìm vết sửa; thử cơ cấu phụ; ghi mảnh Quy |
| `mq_04` / Giữ lại nơi trú | `evt_04_guardian_conflict` | Giành cửa sổ vận hành có kiểm chứng; Chuẩn bị loadout hiện có; bảo vệ thao tác hoặc chứng minh hồi lưu; không phá refuge |
| `mq_05` / Mạch nước có lối về | `evt_05_restore_water` | Khôi phục vòng nước, giữ habitat; Vận hành kênh; đọc hướng/áp; kiểm chứng sanctuary và rạn; xác nhận đường sườn biển |
| `mq_06` / Từ sâu tới bờ | `evt_06_surface_route` | Tới chân Nhật Diệm bằng đường hợp lý; Theo sườn biển giảm độ sâu; dừng chỗ trú; tới điểm trồi; ghi checkpoint/return edge |
| `mq_07` / Ấm dưới đá nguội | `evt_07_survey_basalt` | Khảo sát nơi ở và chuẩn bị xả nhiệt; Đi bờ/kênh/dốc có tuyến an toàn; quan sát thích nghi; đọc basalt/outlet; mở buồng trao đổi |
| `mq_08` / Đánh thức bằng nhịp nhiệt | `evt_08_phuong_awakes` | Cộng hưởng Phượng và thử hai dạng; Đọc nhịp nhiệt; vận hành xả; cộng hưởng; tự hạ đáp/lướt ở chỗ an toàn; đổi lại Quy |
| `mq_09` / Khi lửa phải dừng | `evt_09_thermal_evidence` | Đối chiếu dấu bỏ rơi với hạ tải; Lượn các đoạn thermal có landing; dùng Quy đọc kênh; xem mảnh ký ức và vết xả |
| `mq_10` / Giá của một lần đổi mới | `evt_10_protect_outlets` | Cho thấy thử tải an toàn có thể cùng giữ nơi trú; Chuẩn bị loadout; bảo vệ outlet hoặc chứng minh bypass; dừng khi mất điều kiện xả |
| `mq_11` / Nhiệt trở lại có đường thoát | `evt_11_restore_heat` | Ổn định tuyến nhiệt chọn lọc; Đọc cấp/xả; đặt nhiệt receiver; kiểm chứng forest/refuge; thử landing trạm nâng |
| `mq_12` / Qua tầng hơi ấm | `evt_12_thermal_ascent` | Tới nút ngoài Phong Vân; Lượn theo chuỗi đoạn nâng ngắn; hạ đáp; đọc gió lạnh mới; ghi checkpoint/return lane |
| `mq_13` / Những đường gió bị giữ | `evt_13_air_routes` | Khảo sát quyền tiếp cận và các nút phân mảnh; Đi bridge/đường thermal; timing gió; quan sát habitat Phong–Lôi ứng viên; đối chiếu sửa cơ cấu |
| `mq_14` / Một ý thức qua nhiều hướng | `evt_14_synchronize_long` | Đồng bộ đủ phần mạng để Long hiện thân; Dùng cơ cấu khí/bridge và thermal; nối hồi áp; xem mảnh Long; cộng hưởng; luyện lane cục bộ |
| `mq_15` / Không ai sở hữu mọi luồng | `evt_15_network_conflict` | Mở quyền tiếp cận nhiều node có giới hạn tải; Chuẩn bị bộ ba; bảo vệ quyền thao tác tại node hoặc chứng minh mạng hồi áp; không phá toàn shrine |
| `mq_16` / Mạng có lối hồi | `evt_16_restore_wind` | Cân tuyến khí chính và đường ẩm; Dùng Long đọc/cắt luồng cục bộ vào receiver; cơ cấu giữ setting; đi kiểm chứng các lối trú |
| `mq_17` / Qua nơi gió thành hơi ẩm | `evt_17_living_corridor` | Đi hành lang tới Vạn Sinh; Đọc lane/áp; đi từng nhánh qua điểm trú; tới rễ sống; ghi return route |
| `mq_18` / Nơi sống không giống quá khứ | `evt_18_map_relationships` | Hiểu nhu cầu sinh cảnh cũ và thích nghi; Quan sát communities; ghi đối tác/nước/ẩm; thử cấp lực đơn để thấy chưa đủ; gặp advocate |
| `mq_19` / Nối lại điều còn có thể | `evt_19_restore_partners` | Tạo các liên hệ mẫu trước khi Ly thức; Điều nước/khí/nhiệt qua cơ cấu; nối nguồn sống còn; đọc mảnh Ly; kiểm chứng refuge |
| `mq_20` / Phục hồi không phải xóa đi | `evt_20_ecological_confrontation` | Chứng minh bypass cùng tồn tại; Đối chiếu map nhu cầu; thử nhánh; bảo vệ thao tác nếu hostile reaction; chấp nhận variant có thể chỉnh lại |
| `mq_21` / Khi các nhánh cùng đáp | `evt_21_ly_awakes` | Cộng hưởng Ly từ mạng sống; Đi kiểm tra nút; cảm phản hồi chung; cộng hưởng; thử chạy/nhảy/chạm nguồn sống tại safe area |
| `mq_22` / Giữ một thế giới có thể sống | `evt_22_stabilize_life` | Ổn định hệ sống cuối mà không xóa sinh cảnh mới; Dùng growth cục bộ tại nút còn sống; receiver giữ nhánh; kiểm chứng nước/nhiệt/khí và lối trú |
| `mq_23` / Tinh Môn đáp lại | `evt_23_activate_gate` | Tái kích hoạt cổng sau kiểm chứng bốn hệ; Đọc bốn nhánh theo dấu xưa; chạm xác nhận; chứng kiến phản hồi/tín hiệu, không bước sang planet |
| `mq_24` / Những đường có thể trở về | `evt_24_local_epilogue` | Thấy payoff địa phương và tiếp tục khám phá; Xem/skip tableau sinh cảnh; đọc journal; tự chọn route quay về; nhận trạng thái epilogue một lần |

## Optional missions: đầy đủ contract rút gọn

Mọi quest sau giữ retry local/ledger P0 của handoff; rewardId `grant_<optionalId>` chỉ một lần, repeat observation không lặp XP. Optional chưa có source species/asset hợp lệ phải ghi draft, không dùng cho main prerequisites.

| QuestId / purpose | Entry / dependency | Objective / essential actions | Narrative information | Completion criteria | Rewards | World-state effect |
| --- | --- | --- | --- | --- | --- | --- |
| `opt_01_reef_observation` / Nhận biết wildlife bằng hành vi | `evt_02_read_reef` | Theo một chu kỳ hành vi tại rạn, tiếp cận không cưỡng ép | Native/foreign không suy hostility | Ghi observation có nguồn | Journal fact, reward manifest XP chưa số | Không đổi main flags; thêm habitat fact |
| `opt_02_ancestral_echo` / Bổ sung điểm nhìn Quy | `evt_03_trace_returns` | Đọc dấu ở nhánh ruins kín/archival sau restoration | Một mảnh bảo tồn không cho toàn lịch sử | Fragment mới ghi với provenance | Memory optional, không form unlock | Đánh dấu nguồn đã khảo cứu, nguồn vẫn replay được |
| `opt_03_resonance_study` / Học discovery khác resonance | `evt_08_phuong_awakes` | Khảo cứu nguồn imprint/hạch phụ viable được catalog chỉ định; ổn định và đồng bộ nếu đủ | Quan sát không tự grant dạng; sinh vật gốc độc lập | Observation/compatibility/source requirements được kiểm | Record/fragment; form chỉ nếu designatedPlayable và đủ điều kiện, không cam kết loài chưa duyệt | Không xóa core/cá thể hoặc thêm member giữa boss |
| `opt_04_thermal_habitat` / So sánh thích nghi và tổn hại | `evt_07_survey_basalt` | Quan sát habitat Fire–Metal ứng viên và so dấu xả cổ | Khác nguyên tố không là ác; forced assimilation khác thích nghi | Ghi đủ hai nguồn bằng chứng khác loại | Ecological record; không grant nguyên tố Kim canon | Bản đồ refuge có hint, không đổi heat_stable |
| `opt_05_wind_challenge` / Thử vận động Long | `evt_14_synchronize_long` | Đi lane timing có lối về, không kill quota | Tự do cần đọc nhịp/điểm trú | Tới điểm và trở lại an toàn | Mastery eligibility theo manifest chưa số, không auto stage II | Mở route phụ, không gate corridor main |
| `opt_06_cloud_archive` / Hidden area/đối chiếu ký ức | `evt_16_restore_wind` | Tìm archive tại shrine đã ổn định, đọc mảnh đối chiếu hướng | Hai cảm giác giữ/đẩy có thể cùng đúng theo vị trí | Fragment/source mới được ghi | Memory optional, không đáp án nguồn Tinh Linh | Archive replay được; không reset boss |
| `opt_07_adapted_garden` / Quan sát hệ sống mới | `evt_18_map_relationships` | Theo chu kỳ hai đối tác còn sống, không bắt/diệt | Bảo vệ cái mới có thể giúp phục hồi | Journal có nhu cầu và route source | Observation/collection record, không bắt trở thành playable | Thêm hint refuge; không buộc variant đạo đức |
| `opt_08_rebalance_garden` / Follow-up điều chỉnh môi trường | `evt_22_stabilize_life` | Chọn lại nhánh ẩm/tưới có preview; kiểm tra cả hai nơi trú | Restoration là chăm sóc liên tục | Variant đạt điều kiện sống và collection accessibility | Follow-up fact; đổi lại không farm reward | habitat_variant thay có thể đảo; giữ life_stable và main return route |

Failure của optional chỉ reset thử thách/chu kỳ tạm, không xóa tiến trình species hoặc main flags; sau boss/biome change luôn có archival/refuge source tương đương. Không event nào cần defeat-20/collect-30 hoặc delivery không có lý do. Không hứa mọi optional có form thưởng. Tất cả actors/levels/nguồn imprint phụ cần catalog và asset review trước production.
