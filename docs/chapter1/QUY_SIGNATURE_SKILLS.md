# Họ kỹ năng Quy và tích hợp nguyên tố

**PROPOSED Q18-P04/P05**, chi tiết áp dụng từ [C04 ability registry](../gameplay/SACRED_CREATURE_ABILITIES.md). Registry đó sở hữu ID/tên/concept; tài liệu này không đăng ký ability thứ hai. Không ID nào trở thành CONFIRMED vì được dùng lại. Stage reference và ability reference có cùng chuỗi `quy_s1/s2/s3` phải typed ở [data spec](../technical/QUY_DATA_SPEC.md).

## Vai trò và điều kiện dùng

| abilityId / tên tiếng Việt | Category / minimum stage ứng viên | Vai trò combat / activation | Môi trường / status |
| --- | --- | --- | --- |
| quy_basic / Chấn Mai | Basic / I | Active usable, startup→contact→recovery, giành khoảng gần | Không mở cửa tự động; không auto Wet/CC; [combat](QUY_COMBAT_DESIGN.md) |
| quy_mobility / Mượn Dòng | Movement / I | Có dòng hợp lệ và hướng/endpoint an toàn; tăng tốc hữu hạn rồi hãm, không i-frame mặc định | Mượn dòng đã có, không tạo nước trên đất; status không được cleanse |
| quy_s1 / Vành Nước | Water control / I | Nhấn skill, cone trước ngắn không homing; đẩy/chậm mục tiêu eligible theo budget | Chỉ pressure receiver đã author; Wet/slow nếu definition gán rõ, không suy mọi hit gây cả hai |
| quy_s2 / Mai Định Áp | Defense / II | Đủ unlock, facing/điểm tựa và sector hợp lệ, hold hữu hạn | Giữ vị trí trong nhịp áp hợp lệ; mitigation không all-hazard immunity; status modifier qua E09 |
| quy_s3 / Hải Uyên Hồi Lưu | Advanced Water / III | Chọn vùng line-of-sight rồi nhả; current vào–ra hữu hạn, bị ngắt nạp theo C14 | Chỉ cụm có nhánh/đường hồi; displacement/control budget, không kéo boss vô hạn hoặc terraform |
| quy_passive / Thế Trụ | Passive / I | Chỉ body active có điểm tựa và posture hợp lệ; ổn định trước lực đẩy | Không passive reserve, không luôn bật khi trôi/bơi, không shield hoặc immunity tự sinh |

Minimum stage là điều kiện cần, còn explicit skill unlock và asset/capability prerequisites theo P15/V13; không evolution xong tự cho toàn kit. Bản thử Stage I chỉ cần basic + short brace C14 + một skill Water; không lấy full Mai Định Áp xuống stage I. `env_quy_sense` và `env_quy_route` là environmental capability refs C04, không hai combat skill mới.

## Telegraph, animation, cost và mức sẵn sàng

| Ability | Telegraph / clips bắt buộc | Resource/CD assumption | Rủi ro / readiness |
| --- | --- | --- | --- |
| quy_basic | Hạ đầu/nạp vai, contact viền mai, thu lực; hướng/hit marker rõ | C14 acceptance/cancel và cooldown policy ứng viên; chưa số/cost final | Spam lunge/double-hit; concept đủ prototype sau action/asset gates |
| quy_mobility | Preview vector và chỗ hãm, vây đạp–lướt–hãm, trail tách thân | Finite action/cap, dùng shared coordinator policy; không cost/CD tự đặt | Stack current/switch reset; cần movement profile và route validation |
| quy_s1 | Phồng nước tại nguồn miệng/viền được duyệt, cone mép rõ, release/recovery | One accepted cast/reservation, ability cooldown A là khuyến nghị C14; exact resource model chưa duyệt | Chain-control, multi-frame proc; cần cone/markers/control/status definitions |
| quy_s2 | Chi ghì, mai hướng sector; enter/hold/block/hurt-side/break/release | Finite hold/budget/recovery; drain/CD/mitigation chờ duyệt | Turtle vĩnh viễn, multi-hit refresh; chưa production-ready |
| quy_s3 | Preview vòng và lối ra, nạp kênh mai, pulse hữu hạn rồi tan | Budget/lifetime/cost/CD qua C14/E09; không cooldown reset khi switch | Perma-vortex/whole-ocean query; cần later-stage geometry/FX/gates |
| quy_passive | Bụng thấp/chi tựa, ký hiệu nhỏ; không flash toàn thân | Conditional active-only modifier; không pool tài nguyên mới | Buff reserve hoặc luôn tựa; cần contact/posture evidence, không auto grant status |

## Nguyên tố và status — cùng owners Task09

Quy chỉ Thủy, không dual-element hoặc Life authority mới. Xem [status taxonomy](../elements/STATUS_EFFECTS.md), [reaction lifecycle](../elements/ELEMENTAL_REACTIONS.md), [affinities](../elements/ELEMENTAL_AFFINITIES.md). Mọi outcome/multiplier chi tiết vẫn E09-P proposals.

| Context | Áp dụng có điều kiện | Điều bị cấm |
| --- | --- | --- |
| Wet đã có | status_wet form_bound, refresh tới cap theo definition, không stack nhiều lớp vulnerability | Water affiliation không luôn Wet/immune; skill không tự cấp duplicate condition |
| Nước + Lôi | rx_conductive_discharge chỉ charge source thật + conductivity/path địa phương còn budget | Không toàn biển dẫn vô hạn, không thêm affinity Lôi cho Quy |
| Nước + Hỏa | rx_water_fire chọn cooling/open hoặc confined steam theo receiver; consume input budgets | Không vừa full burn vừa full steam/hoàn damage cũ; không tự chữa HP |
| Phong tác động dòng | Direction/flow effect qua authored current receiver và motion coordinator | Không suy Quy có Phong hoặc Long required cho opening |
| Kim trong vùng nước | Physical material/connector khác affinity; rx_charged_path chỉ khi source và graph hợp lệ | Không kim loại nào cũng dẫn vô hạn, không ngoại lai đồng nghĩa xấu |
| Hazard nước/áp | Terrain tolerance, force/pressure và damage resistance là channels khác nhau | Không miễn sét, acid, current hoặc áp vì là Sacred Thủy |

Reaction key từ root cast/source tokens + reactionId + target/receiver + occurrence. Reserve/consume tokens một lần, cạnh tranh input phải explicit priority/exclusion; thiếu rule thì không content-ready. Output mặc định non-reactive (`reactionEligible=false`), không tự recursion hoặc nhân full damage mỗi hop. Status owner E09, hit/action owner C14, persistent receiver change W07; skill script không tự viết HP/status ledger/world facts. Reactions không tạo nguồn XP/loot/memory mới. Bounded path, target cap, budget và counterplay phải có trước implementation; chưa định lượng ở đây.
