# Nối chương: lý do, đường đi và đường về

Hướng nước→núi lửa→đảo trời→Vạn Sinh là CONFIRMED. **PROPOSED S05-P11:** tuyến, receiver/checkpoint và choreography cụ thể. Không gán topology này cho map `dawn` hiện tại.

| Event / dependency | Lý do đi tiếp và đường vật lý | Cơ thể/capability | Cửa sổ kiểm chứng và quyền quay lại |
| --- | --- | --- | --- |
| `evt_06_surface_route` / E05 | Nước đã hồi nhưng đầu địa nhiệt chưa trao đổi, dòng lộ sườn thềm biển tới vịnh nông chân Nhật Diệm. Độ sâu giảm dần, có buồng/điểm trồi, không đi thẳng vào miệng núi lửa | Quy bơi/đọc nhịp, cơ cấu phụ mở đường ngắn; không cần Phượng chưa có | Giữ điểm trú dưới biển và bờ đảo, tạo route hai chiều; hủy trước destination commit trở lại điểm xuất phát an toàn |
| `evt_12_thermal_ascent` / E11 | Hệ nhiệt có đường xả kiểm chứng tạo updraft lớn, nhưng đầu khí còn dội. Đi theo chuỗi đoạn nâng có landing, từ hơi lên tầng mây tới nút ngoài Phong Vân | Phượng lượn thermal đã được tập ở E09/E11, không free-flight vô hạn; mỗi đoạn ngắn trong capacity đã dạy, không gate level không báo | Trạm hạ đáp hai chiều, lane xuống/điểm trú; chưa có Long nên phần đầu chỉ dùng đoạn thermal và bridge phù hợp, không yêu cầu chỉnh storm trước khi mở Long |
| `evt_17_living_corridor` / E16 | Mạng khí hồi áp cho thấy tuyến tới vùng rễ/ẩm trên cao, nơi nút sống vẫn mất liên hệ | Long cảm/chỉnh lane cục bộ đã học, receiver cổ giữ trạng thái nhánh; không phải S3 kiểm soát cả map | Điểm trú giữa nhánh, đường quay về Phong Vân và các trạm thermal; không xóa đường cũ khi mở mới |
| `evt_23_activate_gate` / E22 + bốn hệ | Không là transition sang hành tinh: công trình Vạn Sinh đáp ứng khi tuần hoàn phối hợp ổn định, cho tín hiệu/cửa nhìn | Các đóng góp nước/nhiệt/khí/sự sống là trạng thái đã ghi nối tiếp; không equip bốn form hoặc cả bốn stage III | Sau epilogue người chơi vẫn ở Vạn Sinh, có route trở lại; không loading một hành tinh trống hay exit đẩy vào nội dung chưa làm |

E viết tắt event số trong [timeline](STORY_TIMELINE.md); IDs đầy đủ là authority. Số lượng trạm/đoạn, physics lift/áp, animation và art đều chưa chốt. Quy tắc route phải được prototyping theo envelope Task 04; một blueprint text không chứng minh rồng dài hoặc Phoenix đã vượt đường này trong runtime.

## Choreography có điều khiển — PROPOSED

I→II: nước sáng dần, áp giảm và mặt nước phản sáng mở một chân trời, vẫn cho bơi/hãm/chạm thay camera cắt mất agency. II→III: cánh ngà/crimson đi qua hơi ấm rồi mây lạnh, có nhịp tự đáp và nghe luồng khí khác, không cutscene bay toàn đoạn. III→IV: độ gió xiết giảm thành ẩm và vật liệu sống, tiếng/tín hiệu rễ thay âm khí, phân biệt Vạn Sinh với một đảo gió có vài cây.

Không đảm bảo thời lượng hay đòi thiết bị/camera technique mới. Nếu cần cinematic ngắn, phải skip/replay và commit event theo cùng điều kiện, không dùng việc xem hết phim làm một flag mà thiếu route thật.

## Transaction chuyển vùng — PROPOSED

1. Kiểm tra prerequisite main flags, destination assets/checkpoint/placement và capability thực sự có. Chưa đủ thì feedback ở safe boundary, không trừ reward/reset.
2. Ghi transition intent source/destination, chọn route checkpoint an toàn. Không đổi region khi pending transformation/active boss lock chưa kết thúc.
3. Sau destination loaded/placement viable, commit arrival + return edge + checkpoint/reward một lần. Chỉ lúc đó xem event transition complete.
4. Ngắt/reload precommit → source checkpoint; postcommit → destination checkpoint; không duplicate grant/chapter open hoặc rơi giữa hai scene. Nếu destination thiếu asset thì giữ source và báo gap, không “teleport tạm” sang Dawn.

Không cần unequipped optional species: trước boundary có chỗ mở collection; nếu bắt buộc một Sacred main chưa equipped thì hướng dẫn đổi tại chỗ an toàn, không sửa membership giữa boss. Nếu main form tạm disabled bởi narrative event, event đó phải có rescue/alternative đã thiết kế hoặc chờ phục hồi ở vùng trú; không bắt đi vào route không thể quay lại.


## Task07 — Region revisit design (PROPOSED W07-P07)

Tài liệu này cũng là đầu ra tương đương `REGION_REVISIT_DESIGN`: giữ nguồn topology/đường về tại đây, không tạo một bản tuyến cạnh tranh. Mở tuyến hai chiều là phần cùng arrival transaction, không phần thưởng tùy chọn sau khi qua chương.

| Vùng trở lại | Đường về / reconstruct | Quest và repeatable | Dạng mới mở thêm / nội dung sau chương |
| --- | --- | --- | --- |
| Vực Hải Uyên | Bờ nông ↔ thềm biển ↔ sanctuary; phase từ E05, variant từ owner hiện tại | Reef observation, archive, resonance refuge; predator/territory repeat policy, guardian unique outcome giữ | Phượng làm nóng receiver phụ ngoài nước, Long điều khí ở chamber, Ly chăm coral còn sống nếu rule duyệt; optional không main gate |
| Đảo Nhật Diệm | Landing thermal xuống ↔ basalt ↔ bờ; vent profile đã hồi giữ | Thermal habitat/challenge và source đã relocated; custodian theo outcome | Quy vào ống ngập, Long lane phụ, Ly phục hồi vật mang sống; không hủy rừng để tạo việc |
| Phong Vân | Living corridor về trạm ↔ corridor chính ↔ thermal xuống | Cloud archive, movement trial/observation; regulator không respawn để farm | Long nook riêng, Ly nối cầu còn mô sống, Quy/Phượng ở túi môi trường phù hợp; storm variation không khóa đường về |
| Vạn Sinh | Corridor gió nối Phong Vân, post-arc vẫn ở đây | Adapted garden/variant reversible, ecological follow-up, ký ức đọc lại | Bốn hệ đóng góp nối tiếp, không bốn equipped; Tinh Môn không teleport tới planet chưa làm |

Không ép backtrack dài cho mọi quest chính; optional quay lại được báo mục đích/location, chưa chốt fast-travel. Memory đã thu có marker/recap/replay, không object reward mới. Region load dựng projection hiện tại chứ không replay toàn story hoặc reset về crisis. Những capability/dạng sau giúp optional nook; không retroactively bắt người chơi lấy một loài optional để xong main.

### Bảo vệ loadout và traversal

- Trước đoạn không thể quay đầu, kiểm aquatic/thermal/air/clearance requirements của route và ít nhất một đường hồi với loadout khả dụng; cue từ safe approach, không sau khi đã rơi xuống.
- Vị trí đổi loadout an toàn được bố trí trước gate và hai đầu tuyến; số lượng/asset/UX chưa chốt. Không mặc định đổi loadout mọi nơi hoặc giữa boss.
- Vào biển sâu thiếu aquatic form: chặn tiến tại shelf an toàn và dẫn tới nơi chuẩn bị bộ; không cho chết kẹt rồi invent form. Nếu save cũ/bug đã đặt ở chỗ sai, recovery tới anchor validated dùng form khả dụng.
- Region patch/ability-disable làm mất lối về: defer tới boundary, giữ route fallback hoặc từ chối patch. Nếu boss đang khóa bộ, queue change; emergency recovery sau abort/reset attempt, không mở membership trong combat.
- Boss entry phải kiểm encounter capabilities và safe exit trước khóa; full-three R03-P06 vs empty-slot S05-P02 vẫn UNRESOLVED, không dùng loài optional chưa báo để lấp slot bắt buộc.
- Anchor cần clearance/render envelope/health/capabilities thực, không chỉ có tọa độ. Nếu không có viable form/anchor thì content invalid: giữ snapshot trước và không commit disable/transition; không xóa progression.

Xem [authority](../world/WORLD_STATE_ARCHITECTURE.md), [world transaction](../world/WORLD_STATE_TRANSITIONS.md), [population coverage](../world/ECOLOGY_AND_SPAWN_STATES.md). Các tuyến mới/cue/collision/landing phải prototype sau; văn bản này chưa chứng minh map production tồn tại.
