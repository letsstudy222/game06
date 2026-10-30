# Archetype enemy/NPC — templates chưa phải species

**PROPOSED F06-P08:** chín archetype dưới đây là reusable design templates/overlays, không roster sinh vật hoặc enemy AI đã triển khai. Không chốt art, attack pattern, HP/damage/detection distance/drop rates. Rarity không là behavior/difficulty; affiliation không là đạo đức. Phân loại [ecology](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md) và [assimilation](../ecology/ELEMENTAL_ASSIMILATION.md) là các trục riêng.

Mỗi entry có stable archetypeId, 21 trường về sinh thái/combat/reward. SpeciesDefinition/variant lựa chọn profile phù hợp, không branch core theo tên loài. Elite là overlay trên base profile; boss là encounter template liên hệ narrative brief, không tự một loài hoặc một faction leader.

## Từ vựng hành vi cho nhiệm vụ sau, không formal state machine

| Nhãn khái niệm | Nhu cầu cần thể hiện khi phù hợp |
| --- | --- |
| Idle | Vòng sống bình thường, không nghĩa đứng bất động chờ player |
| Patrol | Giữ route/nguồn theo nhiệm vụ/habitat |
| Investigate | Đọc kích thích có thể cảm, không tự xác định target qua mọi vật cản |
| Alert | Cảnh báo/chuẩn bị, có dấu người chơi nhận biết |
| Chase | Tiếp cận trong leash phù hợp, không mặc định mọi loài chase |
| Attack | Commit đòn có anticipation/contact/recovery và mục tiêu rõ |
| Recover | Khoảng đối phó sau đòn, không bị cancel mọi tick để không có hở |
| Retreat | Tránh nguy/giữ nguồn sống, không HP0 rồi teleport heal để farm |
| Return to territory | Trở route/refuge hợp lệ, không xuyên habitat không thể sống |
| Incapacitated | Không tiếp tục attack; narrative outcome và loot khác trạng thái này |

Không loài nào bắt buộc dùng đủ nhãn; không có transition graph, code hoặc formal AI state machine trong Task06. Targeting gắn player body/spirit instance đang active, không đổi dạng là tạo targetId mới để xóa alert/hit. Theo R03, damage áp thân ở boundary commit, attack không nhân hit do hai silhouette; targeting/miss theo geometry/LOS thật vẫn có thể thay đổi hợp lý.


## `arch_passive_grazer` — Sinh vật ăn/lọc thụ động

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_passive; có thể behavior_adapted |
| Elemental affiliation | Native phù hợp vùng hoặc dual-affinity candidate, không khóa species |
| Habitat | Rạn/bãi sống, nơi có thức ăn và đường trú |
| Territorial behavior | Không chủ động giữ biên combat, tránh khu mất đường về |
| Aggression triggers | Đến quá gần, chặn đường thoát hoặc bị đánh |
| Attack philosophy | Tránh/rút trước; tự vệ ngắn nếu bị dồn, không truy sát |
| Defensive behavior | Né/thu cơ thể theo anatomy sẽ duyệt, không armor vô hạn |
| Escape / retreat | Ưu tiên refuge; hết đe dọa trở về chu kỳ, không follow qua biome |
| Ecological purpose | Lọc/ăn, giữ nhịp vật chất và làm mồi, cho thấy nơi còn sống |
| Player interaction | Quan sát khoảng cách/hành vi, giữ route trú; không cần giết |
| Potential rewards | Observation/research hoặc vật liệu rụng có nguồn; không mặc định combat loot |
| Resonance relevance | Ecological route nếu designatedPlayable + compatibility; không nhìn là unlock |
| Narrative significance | Mở cảm giác thế giới sống, không mọi đối tượng là enemy |
| Detection method | Chuyển động/tiếp cận tại cự ly hợp lý với giác quan tương lai, không omniscient |
| Attack readability | Đường rút/biểu hiện stress khác animation bình thường |
| Telegraph requirements | Warning cơ thể trước tự vệ, không hit ngay khi discover |
| Decision complexity | Thấp; ưu tiên sinh tồn hơn combat |
| Environmental navigation | Ground/swim theo loài; tránh vùng không thể sống, cần refuge đủ chỗ |
| Player counterplay | Giữ khoảng, không chặn lối; nếu lỡ đánh có thể disengage |
| Potential status effects | Không status bắt buộc; tự vệ có thể đẩy nhẹ được báo, chưa duyệt số |
| Difficulty progression | Thêm ngữ cảnh/hành vi theo habitat, không tăng hostility vì rarity |


## `arch_neutral_forager` — Sinh vật kiếm ăn trung lập

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_neutral; có thể behavior_adapted |
| Elemental affiliation | Affiliation theo habitat, không quyết định disposition |
| Habitat | Mé rạn/bazan/vườn và tuyến kiếm ăn |
| Territorial behavior | Có vùng hoạt động, không auto-nest defender |
| Aggression triggers | Nguồn thức ăn, vật lạ, tác động lặp tại nơi kiếm ăn |
| Attack philosophy | Investigate/đẩy khỏi chỗ ăn nếu bị quấy, fight khi escalated thật |
| Defensive behavior | Giữ khoảng hoặc vật cản, không block mọi player action |
| Escape / retreat | Rời điểm bị quấy về nguồn khác; có dấu dừng aggro |
| Ecological purpose | Luân chuyển thức ăn/hạt/dấu sinh thái, không là nguồn XP vô hạn |
| Player interaction | Theo chu kỳ/đặt lại điều kiện môi trường, không delivery grind |
| Potential rewards | Research/observation, sản phẩm rụng tự nhiên hoặc outcome trial cụ thể |
| Resonance relevance | Quan sát và bảo vệ habitat có thể mở availability; victory không đủ |
| Narrative significance | Cho khác biệt neutral với passive và hostile |
| Detection method | Giác quan nguồn ăn/dao động vật lạ, phản ứng vào fact thực |
| Attack readability | Dấu chú ý và đổi posture trước phản ứng |
| Telegraph requirements | Hành vi warning/đẩy thấy được, không màu hệ là warning duy nhất |
| Decision complexity | Thấp–vừa theo chu kỳ/ngữ cảnh, không dialogue AI bắt buộc |
| Environmental navigation | Route tới nguồn/refuge hợp lệ, không mắc kẹt khi region projection đổi |
| Player counterplay | Ngừng quấy/rời route hoặc đối phó một lần có phục hồi |
| Potential status effects | Có thể xô nhẹ, không debuff vĩnh viễn hoặc cướp progression |
| Difficulty progression | Đổi lịch nguồn/lane, không làm tất cả neutral thành aggressive ở chương sau |


## `arch_territorial_defender` — Cá thể giữ lãnh thổ

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_territorial; có thể intelligent/adapted |
| Elemental affiliation | Native hoặc dual candidate tùy region |
| Habitat | Tổ/nguồn/điểm trú sát route |
| Territorial behavior | Boundary + refuge/return point rõ, không biên cả map |
| Aggression triggers | Xâm biên sau warning, chạm nguồn/tổ, tấn công |
| Attack philosophy | Giữ vị trí/đẩy khỏi vùng, commit có recovery; không chỉ chase cận |
| Defensive behavior | Quay hướng/bảo vệ vị trí; hở sườn hoặc ngoài vùng |
| Escape / retreat | Leash theo habitat; mất target thì kiểm tra vùng và về, không reset unique reward để farm |
| Ecological purpose | Bảo vệ quần thể/nguồn, có thể vô tình chặn hồi lưu |
| Player interaction | Warning/đi vòng/giảm stress hoặc combat khi cần, không mọi cá thể phải thương lượng |
| Potential rewards | Trial XP/research hoặc vật liệu rụng bảo vệ có provenance, không tiền tùy tiện |
| Resonance relevance | Challenge/habitat route và viable source, không kill-unlock |
| Narrative significance | Xung đột cục bộ có động cơ sinh học, không nhất thiết đạo đức |
| Detection method | Dấu xâm biên/tiếp cận nguồn và line-of-sight/dao động thích hợp |
| Attack readability | Boundary/attention/active/recovery tách rõ |
| Telegraph requirements | Hướng chịu lực hoặc cú đẩy có anticipation trước contact |
| Decision complexity | Vừa: quyết định giữ điểm/rút/nhìn target, không chiến thuật toàn tri |
| Environmental navigation | Giữ corridor an toàn cho sinh vật/player, không bơi/chui xuyên vách |
| Player counterplay | Đọc biên, flank/rút, giữ điểm bằng Quy; không bắt optional species |
| Potential status effects | Đẩy/slow cục bộ có giới hạn, không perma-lock |
| Difficulty progression | Thêm vị trí/nhịp đòn/đọc hướng, không nhân HP vì Epic |


## `arch_ambush_predator` — Thú săn phục kích

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_predatory; có thể adapted |
| Elemental affiliation | Affiliation theo habitat, không coi native hiền |
| Habitat | Rìa nơi trú/địa hình che, không spawn trên điểm safe arrival |
| Territorial behavior | Vùng săn hữu hạn, không theo mọi chapter transition |
| Aggression triggers | Mồi/chuyển động trong lane và cơ hội phơi sườn |
| Attack philosophy | Rình rồi commit một đợt, recovery/mất lợi nếu hụt; không chạy dính player mọi tick |
| Defensive behavior | Dùng cover/khoảng cách thay shield toàn hướng |
| Escape / retreat | Bỏ cuộc theo đường/điều kiện săn, retreat nếu bất lợi; không teleport về để heal trước mặt |
| Ecological purpose | Điều tiết quần thể và tạo áp lực đọc môi trường |
| Player interaction | Thấy dấu săn trước, tránh/chống đòn/rút; không cần moral branching |
| Potential rewards | Biological materials có nguồn hoặc research/trial outcome, không mọi thắng phải xác chết |
| Resonance relevance | Combat trial + evidence/compatibility riêng nếu playable |
| Narrative significance | Nguy hiểm bình thường của thế giới, không mindless evil |
| Detection method | Chuyển động/che khuất/giác quan loài có giới hạn; không thấy qua map |
| Attack readability | Dấu săn, vị trí lao ra và khoảng phục hồi đọc được |
| Telegraph requirements | Tín hiệu trước nhịp commit đủ thấy ở viewport; không burst ngoài màn không báo |
| Decision complexity | Vừa: kiên nhẫn/từ bỏ, không biết loadout dự bị |
| Environmental navigation | Đi theo nav/movementProfile, không rời nước lên đất khô vô hạn |
| Player counterplay | Quan sát cover/lane, dụ hụt/đổi vị trí; né không cần form có i-frame |
| Potential status effects | Có thể gây pressure/slow đề xuất, không mất form/XP vĩnh viễn |
| Difficulty progression | Bố trí cover/lane và lựa chọn thoát, không tăng tốc đến không thể đọc |


## `arch_patrol_guardian` — Người/mẫu giữ tuyến tuần tra

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_territorial hoặc behavior_intelligent; không tự faction |
| Elemental affiliation | Affiliation của nguồn/cấu trúc, có thể không là cơ thể nguyên tố |
| Habitat | Di tích/đường tiếp cận/receiver |
| Territorial behavior | Phạm vi bảo vệ được khai báo theo công trình, không quyền sở hữu mọi vùng |
| Aggression triggers | Vi phạm access/warning, can thiệp receiver khi chưa có điều kiện |
| Attack philosophy | Chặn/intercept/vô hiệu thao tác trái phép, không kill-at-sight mặc định |
| Defensive behavior | Dùng vị trí/góc cảnh giới, có pha phục hồi sau commit |
| Escape / retreat | Kết truy đuổi tại biên quyền/route, trở nhiệm vụ khi threat mất |
| Ecological purpose | Giữ công trình khỏi dùng sai, có thể làm downstream hại vì khóa quá mức |
| Player interaction | Đọc quy tắc/chứng minh quyền/safe operation hoặc confrontation |
| Potential rewards | Access/record/tool loan có nguồn, không loot coin từ mọi guardian |
| Resonance relevance | Narrative/challenge nếu có vật mang viable, không mọi cơ cấu có Linh Hạch |
| Narrative significance | Phân biệt nhiệm vụ giữ trạm với faction và thủ phạm cổ |
| Detection method | Phát hiện thao tác/entry boundary được thấy, không đọc quest journal bí mật |
| Attack readability | Route tuần tra/điểm dừng/warning rõ; không đổi hostile không feedback |
| Telegraph requirements | Trước đòn/ngăn thao tác phải có cue, action window cho rút |
| Decision complexity | Vừa theo permission/concern, không AI biết hết story |
| Environmental navigation | Giữ route/patrol theo world projection mới, không vào habitat không supported |
| Player counterplay | Đợi/đi lối khác/chứng minh điều kiện hoặc né nhịp khi hợp lệ |
| Potential status effects | Transient alert/interception, không khóa chapter bằng status |
| Difficulty progression | Thêm phối hợp receiver/đường nhìn, không biến tất cả patrol thành mini-boss |


## `arch_unstable_organism` — Cá thể chịu exposure mất ổn định

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_unstable + behavior nền; cognition giữ riêng |
| Elemental affiliation | Affiliation/nguồn exposure chưa đủ chứng cứ cho tới khảo cứu |
| Habitat | Gần source lệch nhịp, có thể trú nơi giảm stress |
| Territorial behavior | Có thể giữ nguồn/né nguồn theo cá thể, không cùng một hành vi |
| Aggression triggers | Exposure tăng, đau/áp, bị tấn công, điều kiện hồi phục thay đổi |
| Attack philosophy | Xả lệch nhịp/đợt tự vệ có warning, có thể chủ động tránh hoặc xin hỗ trợ nếu thông minh |
| Defensive behavior | Giữ khoảng/đi trú/che chắn, không tự bất tử vì instability |
| Escape / retreat | Có đường về vùng ít exposure, không ép ở nguồn gây đau để farm |
| Ecological purpose | Còn vai trò cũ nhưng chức năng hỏng tác động fauna khác |
| Player interaction | Khảo cứu source/ổn định/cô lập hoặc combat giới hạn khi nguy hiểm |
| Potential rewards | Residue hữu hạn sau xử lý nguồn, research/quest proof; không heal–reinfect farm |
| Resonance relevance | Ổn định chưa auto unlock; chỉ viable source + compatibility + route approved |
| Narrative significance | Nạn nhân/phức tạp, không mọi assimilated mất trí hoặc ác |
| Detection method | Giác quan nền cộng cues exposure cục bộ, không psychic toàn map |
| Attack readability | Nhịp stress/source và warning khác hành vi thường |
| Telegraph requirements | Dấu tích tụ/xả trước active, không hit vô hình ngẫu nhiên vì màu lạ |
| Decision complexity | Tùy cognition/behavior nền; không preset mindless |
| Environmental navigation | Tránh nguồn nếu khả dụng; safe relocation khi state ổn định thay đổi |
| Player counterplay | Đọc nhịp, ngắt nguồn/giữ khoảng/đường rút; Life không là universal cleanse |
| Potential status effects | Residue zone/pressure đề xuất, có cap/expiry và nguồn rõ |
| Difficulty progression | Đổi điều kiện nguồn/cách đối phó thay chỉ tăng lượng burst |


## `arch_faction_scout` — Trinh sát tổ chức có ý định

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | behavior_intelligent; faction_hostile chỉ khi disposition local hostile |
| Elemental affiliation | Không khóa nguyên tố/rarity của faction |
| Habitat | Rìa nguồn/route/di tích có nhiệm vụ tổ chức |
| Territorial behavior | Khu khảo sát/phạm vi lệnh hữu hạn; không claim cả biome |
| Aggression triggers | Hành động được chứng kiến, trespass có warning, tấn công hoặc concern của quest |
| Attack philosophy | Observe/warn/intercept/call theo hỗ trợ khai báo, không spawn vô hạn đồng đội |
| Defensive behavior | Giữ cover/khoảng, bảo vệ hồ sơ/đường rút |
| Escape / retreat | Rút tới điểm phù hợp/đổi nhiệm vụ sau concern giải; không kéo alert sang toàn phe vĩnh viễn |
| Ecological purpose | Theo dõi quyền tiếp cận/nguồn lực, có thể bảo vệ hoặc khai thác tùy nhiệm vụ |
| Player interaction | Trao đổi/evidence/không can thiệp hoặc fight, không auto-recruit/faction war |
| Potential rewards | Record/tool/access có provenance, XP trial; không mặc định ăn cắp ví loot |
| Resonance relevance | Narrative/challenge riêng có tôn trọng ý chí gốc, faction không unlock species |
| Narrative significance | Đặt tổ chức vào nhu cầu cụ thể, không tất cả member là enemy |
| Detection method | LOS/âm/dấu thao tác được catalog cho phép, có phạm vi tri thức |
| Attack readability | Tư thế chú ý/warning/retreat rõ, nhận diện nhiệm vụ không chỉ màu áo |
| Telegraph requirements | Ý định tấn công/gọi hỗ trợ có cue và thời gian đối phó |
| Decision complexity | Vừa, dùng local facts/permissions, không global morality meter |
| Environmental navigation | Nav/movement theo cá thể, không biết các khu chưa có path |
| Player counterplay | Rút đúng biên, trình evidence hoặc ép scout retreat không cần giết |
| Potential status effects | Local alert/suspicion facts, có điều kiện gỡ, không permanent aggro toàn thế giới |
| Difficulty progression | Thêm lựa chọn mission/cover/coordination có budget, không omniscience |


## `arch_regional_elite` — Overlay tinh luyện trên archetype nền

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | Kế thừa behavior nền, elite không là rarity mới |
| Elemental affiliation | Kế thừa native/dual/condition đã được duyệt |
| Habitat | Nhánh optional đủ chỗ di chuyển và quay về |
| Territorial behavior | Biên challenge có preview/retreat, không chặn main bắt buộc |
| Aggression triggers | Player chủ động thử hoặc vào biên đã báo, không đuổi qua route an toàn |
| Attack philosophy | Một đặc trưng tinh luyện của nền (timing/lane/position), không copy boss toàn chương |
| Defensive behavior | Điểm hở có thể học, không chỉ armor/stat cao |
| Escape / retreat | Disengage/reset challenge theo boundary, completion ledger không reset |
| Ecological purpose | Cho thấy cá thể sử dụng niche tốt, không “loài quái tím mạnh” |
| Player interaction | Optional mastery/research/material challenge, bỏ qua vẫn xong main |
| Potential rewards | Material đặc trưng/tri thức hoặc XP manifest, unique grant không lặp |
| Resonance relevance | Challenge route nếu playable/source đủ; victory không bảo đảm cộng hưởng |
| Narrative significance | Thử thách vùng không cần một tiểu truyện lớn |
| Detection method | Kế thừa detection nền và điều kiện entry rõ, không cộng radar vì elite |
| Attack readability | Telegraph nền nhất quán, biến thể báo bằng posture/hướng |
| Telegraph requirements | Có cue trước biến thể; số/nhịp chính xác để combat task sau |
| Decision complexity | Chỉ tăng một trục quyết định đáng học, không tất cả AI phức tạp |
| Environmental navigation | Dùng clearance/movement thật; vùng có đường thoát và không all-form disadvantage trap |
| Player counterplay | Đọc biến thể, chọn form/niche, có thể quay lại sau |
| Potential status effects | Chỉ status đã khai báo/cap, không permanent debuff hoặc auto-dispel player progression |
| Difficulty progression | Đổi layout/nhịp lựa chọn thay quota hoặc stat inflation |


## `arch_environmental_boss` — Template encounter lớn gắn môi trường

| Field | Thiết kế ứng viên |
| --- | --- |
| Behavior category | Theo BossNarrativeProfile: territorial/intelligent/nguồn hazard; không cùng taxonomy |
| Elemental affiliation | Theo actor/source cụ thể, không suy phe hoặc corrupted |
| Habitat | Cụm công trình/sinh cảnh trong brief bốn chương, chưa map/art |
| Territorial behavior | Arena/điểm thử và safe checkpoint, không active world chase sau kết |
| Aggression triggers | Xác nhận encounter khi điều kiện narrative/entry đạt |
| Attack philosophy | Tạo áp lực lên objective môi trường; attack patterns/stat chưa final, thắng HP không tự restoration |
| Defensive behavior | Phòng vệ theo motif/động cơ cần thiết kế sau, có cơ hội giải/kiểm chứng |
| Escape / retreat | Attempt fail/retreat theo lock policy đề xuất, completed boss không tự tái thù địch |
| Ecological purpose | Đối đầu về quyền/điều kiện sống hoặc nguy cơ cục bộ, không final cosmic villain |
| Player interaction | Combat có mục đích; selected proof alternative theo briefs, không branch mọi boss |
| Potential rewards | Narrative access/research/XP milestone + hậu quả, không mặc định body drop/capture |
| Resonance relevance | Sacred awakening theo riêng event, boss victory không universally grant form |
| Narrative significance | Bốn vai hiện hữu Task05 giữ, không thêm bốn named leaders |
| Detection method | Dùng cues/objective vùng và actor context, không truy player ngoài encounter |
| Attack readability | Đọc actor/environmental pressure + điều kiện an toàn, không che telegraph bằng FX |
| Telegraph requirements | Telegraph và recovery đủ cho action realtime; exact cycle/pattern sau, không statechart ở đây |
| Decision complexity | Theo scope encounter, không đòi hệ AI chiến lược toàn phe |
| Environmental navigation | Validate mọi equipped viable/corridor, boundary/transition khóa đúng |
| Player counterplay | Đọc môi trường, dùng khả năng đã dạy, evidence/alternative khi được brief chọn |
| Potential status effects | Chỉ effects có nguồn/expiry/reset, không làm progression mất vĩnh viễn |
| Difficulty progression | Không gia tăng độ khó bằng optional species bắt buộc hay full-stage-III check ngầm |


## Nguyên tắc difficulty và production

Giới thiệu ít archetype đơn trước, xen nơi nghỉ/observation rồi mới có phối hợp hoặc overlay elite. Không lượng hóa mật độ, số lượng enemy/chapter hoặc thời lượng chiến đấu; điều chỉnh sau test readability/path/CPU và nguồn art thật. Không tăng difficulty chỉ bằng chase nhanh vô hạn/đòn không telegraph hay affiliation hiếm.

Detection không cần chung một giác quan: dòng/dao động ở Hải Uyên, nhiệt/cover tại bazan, hướng/áp tại Phong Vân, dấu sống/nguồn ở Vạn Sinh là candidate cues. Nếu future technology không hỗ trợ một cue phải báo/điều chỉnh spec có review, không giả AI đã biết toàn sinh thái. Missing animation/receiver/clearance chặn content-ready, không giảm yêu cầu để claim đã hoàn thành.
