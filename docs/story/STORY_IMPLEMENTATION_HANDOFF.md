# Story implementation handoff — tài liệu trung lập triển khai

**PROPOSED S05-P12:** 24 event contracts và persistence/retry sau; không tạo quest JSON/class/code. [Timeline](STORY_TIMELINE.md) là projection từ cùng danh sách, [quest outline](QUEST_DESIGN_OUTLINE.md) thêm mục đích nhiệm vụ; IDs và completion tại đây là nguồn chính. Không phần nào là event đã chạy trong game.

## Shared contracts được kế thừa rõ

Mỗi event ở bảng dưới có stable eventId/chapterId/regionId, cause/dependencies, trigger, actors, objective/actions, scene/combat/capability requirements, completion/state changes/reward/revelation/consequence/retry/persistence. Không cần một dialogue/cutscene dài cho mọi event; `brief` là cue tương tác + tối đa trao đổi ngắn cần thiết, chưa viết thoại cuối.

Actors: `actor_spirit` là người chơi; `form_*` là dạng hiện thân, không NPC độc lập biết nói; năm `npc_*` định nghĩa ở MAJOR_CHARACTERS_AND_FACTIONS. Regions `hai_uyen`, `nhat_diem`, `phong_van`, `van_sinh` là ID ứng viên vùng canon; không asset path hoặc rename `dawn`.

**Reward R0:** một `grant_<eventId>` ghi ledger cùng completion và payload: flags/routes/knowledge/form unlock đã nêu. XP nếu được reward manifest sau này chỉ nhận một lần theo recipient rõ, chưa có số. Không loot boss/species unlock ngoài mục đã chỉ rõ; sinh vật NPC không mặc định bị thu thập. Event awakening dùng sub-transaction mở form như đoạn dưới, không grant lại ở parent completion. Memory được ghi độc lập form/XP. Khi Narrative information chỉ rõ một `mem_*` thì fragment đó thuộc payload R0 của event, có chapter gate/provenance; không grant lại fragment đã có khi replay.

**Persistence P0:** event stage/sub-objectives cần thiết, facts/grant ledger/world projection lưu cùng revision; world stable flags chỉ commit khi event phục hồi completion thực đạt; form unlock theo sub-completion form_committed của awakening, không đợi thực hành xong mới có thân. Cue/skip không tự grant khi chưa có điều kiện. Presentation cursor tách khỏi event commit. Không viết đè settings `nhat-diem.ui.v1`; save gameplay/schema/migration theo Task 03 còn là spec tương lai.

**Retry:** `local` giữ facts/sub-objectives durable, reset thao tác/hazard tạm, cho retry từ chỗ trú; không mất unlock/collection. `bootstrap` khôi phục nhịp đã commit, không cần body có trước. `attempt` giữ boss membership/empty snapshot, fail/retreat/reload abort-reset trước khi mở collection, không reward trận chưa thắng. `trial` dừng phép thử an toàn, giữ map nhu cầu, không phá habitat vì fail; có combat thì dùng attempt contract. `transition` source trước commit/destination sau commit theo CHAPTER_TRANSITIONS. `cutscene` skip/reload phục hồi committed event result và safe control, chưa commit thì replay từ boundary an toàn; không reward kép.

**Scenes:** `awakening` dùng interactable beat checkpoints/clip riêng từng Sacred; `aftermath` cho tự kiểm chứng trạng thái; `transition` là traversal có agency + cue ngắn; `ending` là gate/epilogue replayable. Tất cả cinematic/dialogue/art mới đều Missing, không phụ thuộc file giả.

### Awakening sub-transaction: tránh vòng phụ thuộc cơ thể

Với E01/E08/E14/E21, chia event thành `source_validated → form_committed → practice_complete`. Khi resonance đủ điều kiện và placement hợp lệ, ghi form unlock/active placement cùng sub-grant `grant_<eventId>_form` một lần; sau đó mới cho thực hành/giác quan với cơ thể mới. Parent event complete/R0 ghi phần knowledge/facts và việc kết thúc practice, **không grant form lần hai**. Nếu reload sau form_committed nhưng trước parent completion, giữ form và tiếp tục ở practice checkpoint, không bắt trả về spirit-only hoặc xem lại để nhận thêm reward. Mỗi sub-grant có ledger riêng cùng revision payload tương ứng; không để frame trình chiếu quyết định việc có cơ thể.

E01 entry chỉ đòi CAP_BOOTSTRAP; CAP_QUY_MOVE là capability dùng sau sub-commit nhịp 9, không prerequisite để mở chính Quy. Mười nhịp D29 được giữ; ngay nhịp 10 có giác quan/điều khiển vật lý mà không cần parent complete trước. Awakening khác cũng không cần dạng mới để tiếp cận chính nguồn của nó. Các sub-grants/facts đã durable không bị parent retry xóa; world stable flags vẫn chỉ được grant bởi các event phục hồi riêng.

## Capabilities cần bảo đảm trên main path

| ID | Hợp đồng chức năng / nguồn thiết kế |
| --- | --- |
| CAP_BOOTSTRAP | Nhận cảm/chạm có giới hạn trước cơ thể, mười nhịp D29, không free-flight vô hình |
| CAP_QUY_MOVE | Bơi/hãm cơ bản, `quy_mobility` I, route có chỗ trú và depth khả dụng |
| CAP_QUY_READ_FLOW | `env_quy_sense` I đọc hướng; cơ cấu cổ đo/giữ setting cho thao tác áp phức tạp |
| CAP_QUY_BASIC | `quy_basic` I và tự di chuyển/đọc telegraph, không bắt S2/S3 |
| CAP_STRUCTURE_OPERATE | Tương tác receiver đã khảo cứu, không là skill nguyên tố mới; công trình dùng nguồn hiện hữu, không khuếch đại vô hạn |
| CAP_PHUONG_GLIDE | `phuong_mobility` I hoặc rank học qua main training; thermal lớn gồm các đoạn trong capacity, có landing; không yêu cầu evolution optional chưa dạy |
| CAP_PHUONG_HEAT | `phuong_s1` I tác động receiver nhiệt có dải an toàn; mạng cổ điều tiết, không cho cast đốt toàn đảo |
| CAP_LONG_MOVE | `long_mobility` I theo từng lane địa phương có clearance; mạng receiver giữ đường hồi |
| CAP_LONG_LOCAL_WIND | `long_s1` I/đọc áp tại receiver đã khảo cứu; cơ cấu vận hành network, không ngầm grant env rank III |
| CAP_LY_LOCAL_GROWTH | `env_ly_growth` I ở vật mang còn sống; liên kết phần lớn đã chuẩn bị E19, không S3 hồi toàn rừng |

Các rank/physics/cost/animation cần prototype và duyệt trước triển khai. Nếu main route thực tế đòi rank II, phải thêm main lesson/gate bảo đảm trước, không lấy tiến hóa optional làm prerequisite ẩn. Không cần loài optional hoặc tất cả Sacred stage III. Required caps của E19 dùng **nối tiếp ở điểm an toàn**, không ba form active; E22/E23 dựa world flags nên không đòi equip cả bốn.

## Event contracts


### E01 — `evt_01_quy_awakes` — Cảm một dòng sống

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / hai_uyen |
| Nguyên nhân | Nhiễu động cục bộ làm sanctuary/vật mang còn sống đáp ứng |
| Prerequisites | BOOTSTRAP_START |
| Trigger | Chủ động chạm tín hiệu sau từng nhịp D29 |
| Actors | actor_spirit, form_quy_hai_uyen |
| Mục tiêu | Có cơ thể đầu và thoát buồng thức |
| Essential actions | Theo tín hiệu; chạm hạch; trải nghiệm ký ức thiếu; cộng hưởng; thử bơi/hãm |
| Dialogue / cutscene | awakening — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_BOOTSTRAP ở entry; CAP_QUY_MOVE sau form_committed, không gate entry |
| Completion | Đủ 10 nhịp D29 và đặt Quy ở vùng bơi an toàn |
| State changes | quy_awake, first_body_acquired |
| Rewards | Sub-grant grant_evt_01_quy_awakes_form mở form_quy_hai_uyen; parent R0 grant_evt_01_quy_awakes ghi facts/practice, không unlock lại; XP chưa định lượng |
| Narrative information | mem_quy_first_sense; CL05 mảnh nhịp thiếu; chưa biết nguồn gốc |
| Outcome / long-term consequence | Có công cụ khám phá, chưa khôi phục toàn nước |
| Failure / retry | bootstrap — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + bootstrap boundary; actor state/route/stable flags commit theo completion |


### E02 — `evt_02_read_reef` — Rạn vẫn đang sống

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / hai_uyen |
| Nguyên nhân | Quy cần hiểu môi trường ngoài sanctuary |
| Prerequisites | evt_01_quy_awakes |
| Trigger | Tiếp cận dấu hành vi và chấp nhận ghi quan sát |
| Actors | actor_spirit, npc_record_keeper |
| Mục tiêu | Quan sát và ghi khác biệt giữa sinh cảnh/hostility |
| Essential actions | Bơi rạn; quan sát hành vi; ghi journal; vượt encounter lãnh thổ ngắn; thấy habitat ngoại lai yên ổn |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | encounter |
| Required capabilities | CAP_QUY_MOVE, CAP_QUY_READ_FLOW, CAP_QUY_BASIC |
| Completion | Ghi observation main và vượt/thoát đoạn thù địch về chỗ trú |
| State changes | reef_observed, journal_introduced |
| Rewards | R0: grant_evt_02_read_reef; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL03: dấu ngoại lai không đồng nghĩa dấu tàn phá |
| Outcome / long-term consequence | Journal hỗ trợ điều tra, không tự đầy collection |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E03 — `evt_03_trace_returns` — Đường nước trở về

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / hai_uyen |
| Nguyên nhân | Rạn hạ lưu thiếu hồi lưu dù sanctuary còn giữ nước |
| Prerequisites | evt_02_read_reef |
| Trigger | Tương tác điểm khảo cứu và cơ cấu phụ |
| Actors | actor_spirit, npc_record_keeper, npc_tide_keeper |
| Mục tiêu | Hiểu đe dọa và chuẩn bị đường xả phụ |
| Essential actions | Đọc kênh cấp/hồi; khảo cứu CL01/CL02; tìm vết sửa; thử cơ cấu phụ; ghi mảnh Quy |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Có bằng chứng main và đường xả phụ thử được mà không xóa refuge |
| State changes | water_bypass_ready, water_evidence_recorded |
| Rewards | R0: grant_evt_03_trace_returns; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | mem_quy_current; vắng mặt có thể là bảo tồn |
| Outcome / long-term consequence | Có phương án để đối đầu keeper không phải giết lấy chìa |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E04 — `evt_04_guardian_conflict` — Giữ lại nơi trú

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / hai_uyen |
| Nguyên nhân | Keeper chặn mở dòng vì từng có xói hại |
| Prerequisites | evt_03_trace_returns |
| Trigger | Xác nhận bước vào vùng confrontation |
| Actors | actor_spirit, npc_tide_keeper |
| Mục tiêu | Giành cửa sổ vận hành có kiểm chứng |
| Essential actions | Chuẩn bị loadout hiện có; bảo vệ thao tác hoặc chứng minh hồi lưu; không phá refuge |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | boss_or_alternative |
| Required capabilities | CAP_QUY_BASIC, CAP_QUY_MOVE, CAP_STRUCTURE_OPERATE |
| Completion | Threat cục bộ được ngăn và keeper không còn chặn thử tải an toàn |
| State changes | water_conflict_resolved, tide_keeper_neutral |
| Rewards | R0: grant_evt_04_guardian_conflict; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Bảo tồn và đóng kín không phải một |
| Outcome / long-term consequence | Có quyền thử restore, chưa grant water_stable |
| Failure / retry | attempt — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + attempt boundary; actor state/route/stable flags commit theo completion |


### E05 — `evt_05_restore_water` — Mạch nước có lối về

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / hai_uyen |
| Nguyên nhân | Có bypass và cửa sổ an toàn sau conflict |
| Prerequisites | evt_04_guardian_conflict |
| Trigger | Người chơi xác nhận kết quả vận hành |
| Actors | actor_spirit, npc_tide_keeper |
| Mục tiêu | Khôi phục vòng nước, giữ habitat |
| Essential actions | Vận hành kênh; đọc hướng/áp; kiểm chứng sanctuary và rạn; xác nhận đường sườn biển |
| Dialogue / cutscene | aftermath — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Vòng cấp/hồi hoạt động và refuge còn tiếp cận được |
| State changes | water_stable, refuge_preserved, chapter_01_complete |
| Rewards | R0: grant_evt_05_restore_water; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL02 có công năng, không chỉ ký hiệu; đầu nhiệt còn thiếu trao đổi |
| Outcome / long-term consequence | Hải Uyên ổn định tuyến chính, mở nơi trồi lên và follow-up |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E06 — `evt_06_surface_route` — Từ sâu tới bờ

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_01 / nhat_diem |
| Nguyên nhân | Hồi lưu hé tuyến địa nhiệt ở đầu kia |
| Prerequisites | evt_05_restore_water |
| Trigger | Chấp nhận rời chỗ trú rồi thực hiện traversal |
| Actors | actor_spirit |
| Mục tiêu | Tới chân Nhật Diệm bằng đường hợp lý |
| Essential actions | Theo sườn biển giảm độ sâu; dừng chỗ trú; tới điểm trồi; ghi checkpoint/return edge |
| Dialogue / cutscene | transition — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_QUY_MOVE, CAP_QUY_READ_FLOW |
| Completion | Đặt được avatar ở bờ đến và đường quay lại đã ghi |
| State changes | route_sea_open, arrived_nhat_diem |
| Rewards | R0: grant_evt_06_surface_route; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Cùng một vòng nối biển với địa nhiệt |
| Outcome / long-term consequence | Chương II bắt đầu vì cần nối đầu nhiệt |
| Failure / retry | transition — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + transition boundary; actor state/route/stable flags commit theo completion |


### E07 — `evt_07_survey_basalt` — Ấm dưới đá nguội

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / nhat_diem |
| Nguyên nhân | Nhiệt bất ổn cục bộ giữa đảo ngủ và rừng sống |
| Prerequisites | evt_06_surface_route |
| Trigger | Khảo cứu khe nhiệt và receiver nước |
| Actors | actor_spirit, npc_thermal_custodian |
| Mục tiêu | Khảo sát nơi ở và chuẩn bị xả nhiệt |
| Essential actions | Đi bờ/kênh/dốc có tuyến an toàn; quan sát thích nghi; đọc basalt/outlet; mở buồng trao đổi |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | encounter |
| Required capabilities | CAP_QUY_MOVE, CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Có hồi lưu và đường xả thử tới sanctuary Phượng, nơi trú được đánh dấu |
| State changes | thermal_prerequisites_ready, basalt_refuge_mapped |
| Rewards | R0: grant_evt_07_survey_basalt; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Không phải toàn đảo dung nham; Fire–Metal là hướng thích nghi ứng viên |
| Outcome / long-term consequence | Có thể kích hoạt mầm mà chưa cần Phượng |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E08 — `evt_08_phuong_awakes` — Đánh thức bằng nhịp nhiệt

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / nhat_diem |
| Nguyên nhân | Vật mang Phượng được bảo tồn, nay có trao đổi nước–nhiệt an toàn |
| Prerequisites | evt_07_survey_basalt |
| Trigger | Chủ động kích hoạt resonance sau kiểm chứng |
| Actors | actor_spirit, form_phuong_hoang_nhat_diem |
| Mục tiêu | Cộng hưởng Phượng và thử hai dạng |
| Essential actions | Đọc nhịp nhiệt; vận hành xả; cộng hưởng; tự hạ đáp/lướt ở chỗ an toàn; đổi lại Quy |
| Dialogue / cutscene | awakening — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Nhiệt cục bộ ổn định, Phượng unlock một lần và placement an toàn |
| State changes | phuong_awake, two_form_tutorial_ready |
| Rewards | Sub-grant grant_evt_08_phuong_awakes_form mở form_phuong_hoang_nhat_diem; parent R0 grant_evt_08_phuong_awakes ghi facts/practice, không unlock lại; XP chưa định lượng |
| Narrative information | Mầm ngủ không là xác chết, nước hỗ trợ nhiệt thay vì chỉ dập lửa |
| Outcome / long-term consequence | Hai form có vai trò; chưa khởi động cả núi |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E09 — `evt_09_thermal_evidence` — Khi lửa phải dừng

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / nhat_diem |
| Nguyên nhân | Phượng cho tới công trình/ký ức nơi dấu hạ tải còn rõ |
| Prerequisites | evt_08_phuong_awakes |
| Trigger | Tương tác ghi chép và dấu nhiệt cùng vị trí |
| Actors | actor_spirit, npc_thermal_custodian |
| Mục tiêu | Đối chiếu dấu bỏ rơi với hạ tải |
| Essential actions | Lượn các đoạn thermal có landing; dùng Quy đọc kênh; xem mảnh ký ức và vết xả |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | encounter |
| Required capabilities | CAP_PHUONG_GLIDE, CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Ghi bằng chứng main và chứng minh đường xả thay thế không xóa habitat |
| State changes | heat_bypass_ready, thermal_evidence_recorded |
| Rewards | R0: grant_evt_09_thermal_evidence; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | mem_phuong_cutback; midpoint: thêm lực không luôn chữa được mất cân bằng |
| Outcome / long-term consequence | Có cơ sở phản biện kế hoạch bật mọi outlet |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E10 — `evt_10_protect_outlets` — Giá của một lần đổi mới

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / nhat_diem |
| Nguyên nhân | Custodian lo kế hoạch tái hoạt động hủy nơi ở |
| Prerequisites | evt_09_thermal_evidence |
| Trigger | Xác nhận thử tải tại confrontation boundary |
| Actors | actor_spirit, npc_thermal_custodian |
| Mục tiêu | Cho thấy thử tải an toàn có thể cùng giữ nơi trú |
| Essential actions | Chuẩn bị loadout; bảo vệ outlet hoặc chứng minh bypass; dừng khi mất điều kiện xả |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | boss_or_alternative |
| Required capabilities | CAP_PHUONG_HEAT, CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Conflict được giải và thử tải đạt điều kiện bảo tồn |
| State changes | heat_conflict_resolved, custodian_monitoring |
| Rewards | R0: grant_evt_10_protect_outlets; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Phản đối có lý do, người ngoại lai có thể bảo vệ sinh cảnh |
| Outcome / long-term consequence | Có quyền kiểm chứng chu kỳ, không thắng là núi tự bật |
| Failure / retry | attempt — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + attempt boundary; actor state/route/stable flags commit theo completion |


### E11 — `evt_11_restore_heat` — Nhiệt trở lại có đường thoát

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / nhat_diem |
| Nguyên nhân | Outlets có điều kiện vận hành an toàn |
| Prerequisites | evt_10_protect_outlets |
| Trigger | Người chơi kiểm chứng chu kỳ sau thử tải |
| Actors | actor_spirit, npc_thermal_custodian |
| Mục tiêu | Ổn định tuyến nhiệt chọn lọc |
| Essential actions | Đọc cấp/xả; đặt nhiệt receiver; kiểm chứng forest/refuge; thử landing trạm nâng |
| Dialogue / cutscene | aftermath — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_PHUONG_HEAT, CAP_QUY_READ_FLOW, CAP_STRUCTURE_OPERATE |
| Completion | Chu kỳ trao đổi an toàn, habitat còn, các trạm nâng có điểm đáp |
| State changes | heat_stable, basalt_refuge_preserved, chapter_02_complete |
| Rewards | R0: grant_evt_11_restore_heat; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL02 nối nhiệt với nước, renewal không là reset toàn đảo |
| Outcome / long-term consequence | Hồi lưu cũ đổi tốt, updraft lớn mở tuyến trời |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E12 — `evt_12_thermal_ascent` — Qua tầng hơi ấm

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_02 / phong_van |
| Nguyên nhân | Đầu khí trên cao còn dội dù vòng nhiệt đã phục hồi |
| Prerequisites | evt_11_restore_heat |
| Trigger | Chấp nhận thử tuyến sau khi trạm an toàn |
| Actors | actor_spirit |
| Mục tiêu | Tới nút ngoài Phong Vân |
| Essential actions | Lượn theo chuỗi đoạn nâng ngắn; hạ đáp; đọc gió lạnh mới; ghi checkpoint/return lane |
| Dialogue / cutscene | transition — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_PHUONG_GLIDE |
| Completion | Tới trạm ngoài có placement và đường về hợp lệ |
| State changes | route_thermal_open, arrived_phong_van |
| Rewards | R0: grant_evt_12_thermal_ascent; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Nhiệt đưa lên được, chưa giải được mọi áp/gió |
| Outcome / long-term consequence | Chương III có lý do điều tra mạng khí |
| Failure / retry | transition — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + transition boundary; actor state/route/stable flags commit theo completion |


### E13 — `evt_13_air_routes` — Những đường gió bị giữ

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_03 / phong_van |
| Nguyên nhân | Các đảo có lối trú nhưng nhánh khí bị kiểm soát/lệch |
| Prerequisites | evt_12_thermal_ascent |
| Trigger | Tiếp cận node khảo sát theo tuyến không cần Long |
| Actors | actor_spirit, npc_wind_regulator |
| Mục tiêu | Khảo sát quyền tiếp cận và các nút phân mảnh |
| Essential actions | Đi bridge/đường thermal; timing gió; quan sát habitat Phong–Lôi ứng viên; đối chiếu sửa cơ cấu |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | encounter |
| Required capabilities | CAP_PHUONG_GLIDE, CAP_STRUCTURE_OPERATE |
| Completion | Có sơ đồ tiếp cận các nút ban đầu và bằng chứng nhiều point-of-view |
| State changes | air_nodes_accessible, air_evidence_recorded |
| Rewards | R0: grant_evt_13_air_routes; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL01/CL03: mạng nhiều vùng, thích nghi khác cưỡng ép |
| Outcome / long-term consequence | Có thể nối phần dấu Long mà chưa cần Long |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E14 — `evt_14_synchronize_long` — Một ý thức qua nhiều hướng

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_03 / phong_van |
| Nguyên nhân | Nút tiếp cận được giữ các mảnh dấu tương thích |
| Prerequisites | evt_13_air_routes |
| Trigger | Tương tác đồng bộ sau khi các nhánh thử hợp lệ |
| Actors | actor_spirit, form_long_thien_phong |
| Mục tiêu | Đồng bộ đủ phần mạng để Long hiện thân |
| Essential actions | Dùng cơ cấu khí/bridge và thermal; nối hồi áp; xem mảnh Long; cộng hưởng; luyện lane cục bộ |
| Dialogue / cutscene | awakening — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_PHUONG_GLIDE, CAP_STRUCTURE_OPERATE |
| Completion | Dấu đủ liên tục và Long unlock một lần, có lane tập an toàn |
| State changes | long_awake, local_wind_tutorial_complete |
| Rewards | Sub-grant grant_evt_14_synchronize_long_form mở form_long_thien_phong; parent R0 grant_evt_14_synchronize_long ghi facts/practice, không unlock lại; XP chưa định lượng |
| Narrative information | mem_long_split; CL05 cùng một can thiệp có nhiều vị trí quan sát |
| Outcome / long-term consequence | Ba Sacred main đã có, chưa thống nhất quyền vận hành mạng |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E15 — `evt_15_network_conflict` — Không ai sở hữu mọi luồng

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_03 / phong_van |
| Nguyên nhân | Regulator giữ độc quyền các nhánh vừa nối |
| Prerequisites | evt_14_synchronize_long |
| Trigger | Xác nhận confrontation tại cụm phân phối |
| Actors | actor_spirit, npc_wind_regulator |
| Mục tiêu | Mở quyền tiếp cận nhiều node có giới hạn tải |
| Essential actions | Chuẩn bị bộ ba; bảo vệ quyền thao tác tại node hoặc chứng minh mạng hồi áp; không phá toàn shrine |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | boss_or_alternative |
| Required capabilities | CAP_LONG_LOCAL_WIND, CAP_LONG_MOVE, CAP_STRUCTURE_OPERATE |
| Completion | Quyền vận hành thử đa nhánh được mở, không còn một node khóa mọi đường |
| State changes | air_conflict_resolved, regulator_monitoring |
| Rewards | R0: grant_evt_15_network_conflict; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Tự do cần đường hồi và trách nhiệm, không kiểm soát tuyệt đối |
| Outcome / long-term consequence | Mạng có thể được cân lại, chưa tự wind_stable |
| Failure / retry | attempt — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + attempt boundary; actor state/route/stable flags commit theo completion |


### E16 — `evt_16_restore_wind` — Mạng có lối hồi

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_03 / phong_van |
| Nguyên nhân | Có quyền và topology thử đa nhánh |
| Prerequisites | evt_15_network_conflict |
| Trigger | Xác nhận kiểm chứng vòng khí sau conflict |
| Actors | actor_spirit, npc_wind_regulator |
| Mục tiêu | Cân tuyến khí chính và đường ẩm |
| Essential actions | Dùng Long đọc/cắt luồng cục bộ vào receiver; cơ cấu giữ setting; đi kiểm chứng các lối trú |
| Dialogue / cutscene | aftermath — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_LONG_LOCAL_WIND, CAP_LONG_MOVE, CAP_STRUCTURE_OPERATE |
| Completion | Các nhánh có đường hồi, các đảo còn lối tiếp cận và nút hướng rễ đáp ứng |
| State changes | wind_stable, shared_air_access, chapter_03_complete |
| Rewards | R0: grant_evt_16_restore_wind; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL01/CL02 là cấu trúc điều tiết, không bộ chìa màu |
| Outcome / long-term consequence | Ẩm tới vùng sống, route Vạn Sinh hiện |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E17 — `evt_17_living_corridor` — Qua nơi gió thành hơi ẩm

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_03 / van_sinh |
| Nguyên nhân | Nút phía sống còn đứt quan hệ sau khi khí đã cân |
| Prerequisites | evt_16_restore_wind |
| Trigger | Bắt đầu hành lang đã kiểm chứng |
| Actors | actor_spirit |
| Mục tiêu | Đi hành lang tới Vạn Sinh |
| Essential actions | Đọc lane/áp; đi từng nhánh qua điểm trú; tới rễ sống; ghi return route |
| Dialogue / cutscene | transition — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_LONG_MOVE, CAP_LONG_LOCAL_WIND |
| Completion | Đặt được ở rừng Vạn Sinh, checkpoint/đường về có hiệu lực |
| State changes | route_living_open, arrived_van_sinh |
| Rewards | R0: grant_evt_17_living_corridor; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Sự sống là hệ đệm khác, không chỉ một đảo gió có cây |
| Outcome / long-term consequence | Có lý do khảo cứu các quan hệ sống |
| Failure / retry | transition — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + transition boundary; actor state/route/stable flags commit theo completion |


### E18 — `evt_18_map_relationships` — Nơi sống không giống quá khứ

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Nước/nhiệt/khí có nhưng một số vùng vẫn không hồi phục |
| Prerequisites | evt_17_living_corridor |
| Trigger | Khảo sát các nút/nhu cầu và phản hồi cư dân |
| Actors | actor_spirit, npc_garden_advocate |
| Mục tiêu | Hiểu nhu cầu sinh cảnh cũ và thích nghi |
| Essential actions | Quan sát communities; ghi đối tác/nước/ẩm; thử cấp lực đơn để thấy chưa đủ; gặp advocate |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_QUY_READ_FLOW, CAP_LONG_LOCAL_WIND, CAP_STRUCTURE_OPERATE |
| Completion | Có map quan hệ main và vùng trú mới cần giữ, không lệ thuộc side quests |
| State changes | living_needs_recorded, adapted_refuge_mapped |
| Rewards | R0: grant_evt_18_map_relationships; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL04: cây/rễ mới sống có giá trị, không mọi thứ phải trở về mẫu cũ |
| Outcome / long-term consequence | Có phương án phục hồi không xóa adaptation |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E19 — `evt_19_restore_partners` — Nối lại điều còn có thể

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Thiếu quan hệ/vật chất chứ không chỉ thiếu năng lượng |
| Prerequisites | evt_18_map_relationships |
| Trigger | Tương tác các receiver đúng nhu cầu đã khảo cứu |
| Actors | actor_spirit, npc_garden_advocate |
| Mục tiêu | Tạo các liên hệ mẫu trước khi Ly thức |
| Essential actions | Điều nước/khí/nhiệt qua cơ cấu; nối nguồn sống còn; đọc mảnh Ly; kiểm chứng refuge |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | encounter |
| Required capabilities | CAP_QUY_READ_FLOW, CAP_PHUONG_HEAT, CAP_LONG_LOCAL_WIND, CAP_STRUCTURE_OPERATE |
| Completion | Các đối tác còn khả thi liên hệ và habitat thích nghi còn lối sống/collection |
| State changes | partners_linked, life_evidence_recorded |
| Rewards | R0: grant_evt_19_restore_partners; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | mem_ly_refuge; mất quan hệ không chữa bằng mana đơn |
| Outcome / long-term consequence | Đủ bằng chứng đối đầu tư tưởng, chưa Ly toàn năng |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E20 — `evt_20_ecological_confrontation` — Phục hồi không phải xóa đi

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Advocate sợ tuyến nối xóa nơi ở hiện hữu |
| Prerequisites | evt_19_restore_partners |
| Trigger | Chủ động trình bày/thử vận hành ở điểm conflict |
| Actors | actor_spirit, npc_garden_advocate |
| Mục tiêu | Chứng minh bypass cùng tồn tại |
| Essential actions | Đối chiếu map nhu cầu; thử nhánh; bảo vệ thao tác nếu hostile reaction; chấp nhận variant có thể chỉnh lại |
| Dialogue / cutscene | brief — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | defensive_optional |
| Required capabilities | CAP_STRUCTURE_OPERATE, CAP_QUY_READ_FLOW, CAP_LONG_LOCAL_WIND |
| Completion | Bằng chứng/thử vận hành giữ cả hệ chính và refuge; HP boss một mình không đủ |
| State changes | life_conflict_resolved, advocate_cooperating |
| Rewards | R0: grant_evt_20_ecological_confrontation; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Phục hồi bền vững không đồng nghĩa nguyên trạng lịch sử |
| Outcome / long-term consequence | Từ kiểm soát sang chăm sóc, đủ điều kiện mạng cho resonance |
| Failure / retry | trial — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + trial boundary; actor state/route/stable flags commit theo completion |


### E21 — `evt_21_ly_awakes` — Khi các nhánh cùng đáp

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Quan hệ khả thi đã nối, không một trứng/hạch đơn đủ |
| Prerequisites | evt_20_ecological_confrontation |
| Trigger | Xác nhận cộng hưởng sau phản hồi mạng |
| Actors | actor_spirit, form_ly_van_sinh |
| Mục tiêu | Cộng hưởng Ly từ mạng sống |
| Essential actions | Đi kiểm tra nút; cảm phản hồi chung; cộng hưởng; thử chạy/nhảy/chạm nguồn sống tại safe area |
| Dialogue / cutscene | awakening — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_STRUCTURE_OPERATE |
| Completion | Ly unlock một lần, hiện thân/placement hợp lệ và sinh cảnh mới vẫn tồn tại |
| State changes | ly_awake, life_practice_ready |
| Rewards | Sub-grant grant_evt_21_ly_awakes_form mở form_ly_van_sinh; parent R0 grant_evt_21_ly_awakes ghi facts/practice, không unlock lại; XP chưa định lượng |
| Narrative information | Bản sắc giữ qua mạng sống, không hồi sinh mọi cá thể đã mất |
| Outcome / long-term consequence | Có khả năng hỗ trợ/điều phối mạng rộng hơn |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E22 — `evt_22_stabilize_life` — Giữ một thế giới có thể sống

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Mạng đã có quan hệ, cần sức đệm/nhịp do Ly hỗ trợ |
| Prerequisites | evt_21_ly_awakes |
| Trigger | Xác nhận hoàn tất phép thử môi trường |
| Actors | actor_spirit, npc_garden_advocate |
| Mục tiêu | Ổn định hệ sống cuối mà không xóa sinh cảnh mới |
| Essential actions | Dùng growth cục bộ tại nút còn sống; receiver giữ nhánh; kiểm chứng nước/nhiệt/khí và lối trú |
| Dialogue / cutscene | aftermath — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_LY_LOCAL_GROWTH, CAP_STRUCTURE_OPERATE |
| Completion | Mạng sống vận hành và các habitat vẫn truy cập được, bốn hệ có vòng ổn định |
| State changes | life_stable, adapted_habitat_preserved, chapter_04_local_complete |
| Rewards | R0: grant_evt_22_stabilize_life; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | CL04 payoff: cái mới có thể cùng giữ sức sống của hệ |
| Outcome / long-term consequence | Đã có kết quả địa phương độc lập cổng |
| Failure / retry | local — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + local boundary; actor state/route/stable flags commit theo completion |


### E23 — `evt_23_activate_gate` — Tinh Môn đáp lại

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Bốn tuyến sống/nước/nhiệt/khí đều đạt trạng thái phối hợp |
| Prerequisites | evt_22_stabilize_life; water_stable + heat_stable + wind_stable + life_stable |
| Trigger | Chủ động kích hoạt sau preflight các stable flags |
| Actors | actor_spirit |
| Mục tiêu | Tái kích hoạt cổng sau kiểm chứng bốn hệ |
| Essential actions | Đọc bốn nhánh theo dấu xưa; chạm xác nhận; chứng kiến phản hồi/tín hiệu, không bước sang planet |
| Dialogue / cutscene | ending — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_STRUCTURE_OPERATE |
| Completion | Gate responsive và kết quả ghi bền vững; không destination planet được mở |
| State changes | gate_active, four_systems_verified |
| Rewards | R0: grant_evt_23_activate_gate; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | mem_gate_echo; CL01/CL02/CL05 trả lời chức năng phối hợp, lịch sử rộng hơn vẫn chưa giải đáp |
| Outcome / long-term consequence | Cung đầu hoàn tất phục hồi, tương lai có câu hỏi đáng theo |
| Failure / retry | cutscene — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + cutscene boundary; actor state/route/stable flags commit theo completion |


### E24 — `evt_24_local_epilogue` — Những đường có thể trở về

| Field | Giá trị ứng viên |
| --- | --- |
| Chapter / region | chapter_04 / van_sinh |
| Nguyên nhân | Cổng active nhưng thế giới hiện tại còn cuộc sống tiếp diễn |
| Prerequisites | evt_23_activate_gate |
| Trigger | Kết cảnh cổng hoặc chọn xem lại epilogue |
| Actors | actor_spirit |
| Mục tiêu | Thấy payoff địa phương và tiếp tục khám phá |
| Essential actions | Xem/skip tableau sinh cảnh; đọc journal; tự chọn route quay về; nhận trạng thái epilogue một lần |
| Dialogue / cutscene | ending — kế thừa scene contract; không thoại đã duyệt |
| Combat requirements | none |
| Required capabilities | CAP_STRUCTURE_OPERATE |
| Completion | Kết cảnh/skip đều trả control ở safe point cùng trạng thái, không mở planet |
| State changes | arc_complete, post_arc_exploration_available |
| Rewards | R0: grant_evt_24_local_epilogue; knowledge/state như dòng này; XP chưa định lượng |
| Narrative information | Không có đáp án nguồn gốc, nhưng hành động của Tinh Linh đã có ý nghĩa |
| Outcome / long-term consequence | Revisit/follow-up/collection còn mở |
| Failure / retry | cutscene — shared contract, không hồi reward/chapter flags bằng reload |
| Save persistence | P0 + cutscene boundary; actor state/route/stable flags commit theo completion |


Nguồn `mem_gate_echo`: Linh Ấn Ly đã mở tại E21 + đối chiếu tín hiệu công trình ngoài cơ thể; xem provenance trong NARRATIVE_REVELATION_MATRIX. Không cộng hưởng một dạng Tinh Môn hoặc mở kiến thức toàn tri từ đồ vật.

## Guardrails kỹ thuật và asset dependencies

Event-complete authority ở durable story state, không dựa vào cinematic đã đóng, actor HP0 hoặc UI journal mở. Rewards/completion/world projections cùng atomic unit hoặc journal tương đương; stable IDs không đổi theo title/localization. Transition và encounter lock không chồng commit. Fail giữa stage không làm mất bằng chứng đã ghi nhưng chưa grant world stable sớm.

Chưa có level Hải Uyên/Nhật Diệm/Phong Vân/Vạn Sinh theo blueprint; chưa có NPC/boss/memory/cutscene, physics tuyến chuyển chương, full Quy/Long/Ly hoặc 12 bộ clip theo Task 04. Không đặt runtime asset paths cho chúng. Asset Missing được đăng ký ở audit; không coi event ready-for-implementation nếu contract yêu cầu capability chưa prototyped hoặc policy boss chưa được duyệt.

Story event mới cần contentVersion + decision references + migration aliases; thế giới/route/state và quest cùng version để tránh spawn projection của chương mới làm mất nguồn collection cũ. Dữ liệu narrative là conceptual records, không buộc một engine/database/language.

## Feature-introduction schedule — PROPOSED S05-P15

Không cam kết thứ tự phút/giờ, không cùng lúc nhồi mọi hệ ở I. Các cơ chế tương lai chưa có trong runtime hiện tại.

| Chapter / milestone | Mechanic | Tutorial opportunity | Competency sau đó |
| --- | --- | --- | --- |
| I / E01 trước thân | Nhận cảm/chạm giới hạn | Tín hiệu sanctuary có một hướng và phản hồi vật mang | Tiếp cận/tương tác mà chưa cần hiểu UI hệ |
| I / E01 sau thân | Movement/bơi/hãm | Buồng an toàn và chỗ trú | Di chuyển tới điểm, dừng theo dòng |
| I / E02 wildlife | Discovery/observation | Theo một hành vi, tiếp cận không đánh | Phân biệt gặp và hiểu loài |
| I / E02 gặp keeper | Collection journal dạng đọc/ghi | Ghi observation đã làm, không menu unlock hết | Biết tra clue/nguồn hiện tại |
| I / E02 encounter | HP/basic/counterplay | Xung đột lãnh thổ ngắn có đường rút | Đọc telegraph, dùng Quy giữ vị trí/thoát |
| I / E03 | Environmental interaction / memory | Kênh cấp–hồi và fragment có nguồn | Biết kiểm chứng cảm giác/khắc chữ bằng môi trường |
| I / E04 chuẩn bị | Encounter lock | Xem snapshot Quy + empty theo S05-P02, vùng trú trước trận | Hiểu thành phần không đổi giữa attempt, không cần optional form |
| I / E05 | Persistent consequence | Đi lại rạn/cửa sanctuary sau vận hành | Tự nhận thấy thay đổi, biết còn đường quay lại |
| II / E08 | Second form / switch | Hai dạng main tại điểm hạ đáp an toàn | Đổi công cụ, không tưởng swap là heal/reset cooldown |
| II / E09 | Form-specific progression/thermal | Nhận XP/milestone theo manifest và thử glide theo relay | Biết form có tiến trình riêng; không coi rarity = sức mạnh |
| II / optional sau E08 | Resonance acquisition khác observation | Nguồn viable được catalog chỉ định, không cưỡng ép | Hiểu discovery/resonance/playable tách biệt, main không bắt hoàn tất |
| III / E14 | Three-form strategy / Long | Ba Sacred đã mở main, tập lane cục bộ | Chọn active theo nhiệm vụ, khóa membership không khóa switch |
| III / E15–E16 | Network/combination | Các receiver giữ setting sau switch, node cần lối hồi | Dùng nhiều dạng nối tiếp, không phải spam đổi mỗi tile |
| IV / E18–E20 | Ecological reasoning/variant | So hai nhu cầu và preview nhánh có thể chỉnh lại | Giữ collection/refuge trong cả hai cấu hình hợp lệ |
| IV / E21–E22 | Mộc khác Sinh Mệnh | Chạm nguồn sống có điều kiện, đọc cái gì không hồi | Không mong heal combat cứu mọi cây/xác chết |
| IV / E23–E24 | Arc payoff / revisit | Chạm cổng và tự chọn route về | Biết cung local đã hoàn tất, không cần expansion để có ý nghĩa |

Không đặt stage/evolution threshold hoặc collection UI mới trong blueprint. Nếu task sau cần dạy evolution, gắn milestone loài đã duyệt ở safe point, không tự làm cả bốn stage III trước cổng.

## Narrative failure / edge cases — PROPOSED S05-P16

| ID | Tình huống | Expected behavior / recovery và persistence |
| --- | --- | --- |
| T05-EC01 | Trở lại đảo cũ sau chương mới | Đọc current regional projection + preserved archive/refuge/return edge, không reset main flags/NPC hostile hoặc nhận reward cũ |
| T05-EC02 | Dạng tạm unavailable trong event | Giữ progress, trước entry có safe place/alternative; active invalid thì safe transfer/checkpoint theo R03, không đổi membership để cứu boss attempt |
| T05-EC03 | Hạ boss trước optional memories | Conflict complete không xóa nguồn; fragment ở archive/ruins vẫn tới được, main fact tối thiểu đã bảo đảm; không khóa ending “tốt” |
| T05-EC04 | Bỏ side quests | Tất cả main prerequisites chỉ main events/stable flags/capabilities được main dạy; không đòi optional species, reward hay observation ngoài main |
| T05-EC05 | Story reward/trigger lặp | Cùng grantId/event completion atomic → no-op, không XP/loại form/reward trùng; dùng event version, không đổi ID để farm |
| T05-EC06 | Ngắt chapter transition | Trước arrival commit về source safe checkpoint; sau commit về destination; return edge có cùng transaction, không rơi giữa vùng |
| T05-EC07 | Reload/skip trong cutscene | Presentation cursor không là completion authority; resume boundary trước commit hoặc giữ outcome đã commit và trả control an toàn. Không replay unlock/reward |
| T05-EC08 | World-state đổi spawn | Validate habitat mapping/source availability trước commit; giữ references stable, không duplicate unique NPC; thiếu nguồn collection thì reject content-ready/migrate recovery |
| T05-EC09 | Habitat gốc loài collectible thay | Refuge/alternate source có route và journal hint dù chưa từng gặp loài; không yêu cầu đã capture trước biến cố hoặc mất vĩnh viễn |
| T05-EC10 | Quest cần dạng main chưa equipped | Nêu requirement trước vùng khóa và có chỗ đổi; trong boss không thay reserve. Không tự equip/đổi body bất ngờ trong cutscene |
| T05-EC11 | Tới vùng không có transformation phù hợp | Safe boundary chặn và chỉ route/điều kiện còn thiếu; route đã commit có checkpoint/rescue/return. Không teleport sang biome thiếu asset |
| T05-EC12 | Revisit boss đã giải | Khu hậu conflict/NPC neutral theo flag, không reward/boss main tự hồi; replay challenge nếu có là instance riêng không sửa canon |
| T05-EC13 | Intelligent hostile trở thành neutral | Commit disposition cùng conflict result, xóa transient aggro/attempt state; không xóa danh tính/species hoặc bắt làm pet; dialogue phản ánh quan hệ mới |
| T05-EC14 | Optional choice đổi môi trường | Preview, reversible rebalance, giữ stable main flags/refuge/route; không lựa chọn tuyệt chủng bí mật hoặc ép replay toàn game để đủ collection |
| T05-EC15 | Save nâng cấp sau sửa narrative | Schema/content version + alias event/quest/state IDs, backup rồi migrate ledger/routes/NPC disposition cùng revision. Không reset arc hoặc grant lại; record chưa map giữ nguyên để recovery có thông báo |
| T05-EC16 | Slot trống được lấp sau unlock giữa boss sớm | Snapshot cả empty, unlock ghi collection nhưng không equip tới khi attempt kết thúc theo S05-P02; không bypass lock bằng menu/reload |
| T05-EC17 | Reload trong boss hoặc conflict alternative | Theo candidate R03 abort/reset attempt, giữ main evidence đã durable; completion chưa đạt không grant restoration. Alternative proof state commit ở safe boundary, không hai outcome grant cùng event |
| T05-EC18 | Event main đòi animation/receiver/asset thiếu | Mark blocked content-ready trước cho entry; không xóa requirement âm thầm hoặc dựng placeholder rồi nhận đã có chương. Không sửa bản Phoenix đang chạy để fake pass |

Các quy tắc là acceptance expectations cho task tương lai, không test đã thực thi. Bảo vệ reload/menu hợp lệ, không hứa anti-cheat mọi save chỉnh tay. Thay đổi narrative phải cập nhật cả projection spawn, reward ledger và các phụ thuộc; rename text không rename stable ID.


## Task07 — làm rõ authority/save contract (PROPOSED W07-P01/P04)

State changes trong 24 contracts là predicate aliases/outcomes dưới [world architecture](../world/WORLD_STATE_ARCHITECTURE.md), không bag boolean độc lập cạnh completion. Awake lấy form_committed, practice lấy parent; stable lấy restoration completion. Outcome nhánh, memory, resonance và grant vẫn theo owner riêng. P0 lưu authoritative facts + mutable owned patches + reward recipient/ledger cùng logical transaction; projection phase/count/cache được dựng lại, không replay grant/old patches khi load. [World dependency projection](../world/WORLD_EVENT_DEPENDENCIES.md) phân biệt entry available với arrived. Event IDs, narrative completion và rewards scope Task05 không đổi.
