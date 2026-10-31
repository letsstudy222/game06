# Gameplay phát triển theo stage

**Task13 — PROPOSED:** đặc tả hệ thống để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline `1d49708`, ngày 31/10/2026 Asia/Saigon. [Sổ quyết định](TASK13_DECISIONS.md) giữ nguồn và trạng thái; mọi ngưỡng chưa duyệt tiếp tục UNRESOLVED.


## Hợp đồng delta — V13-P05

| Dimension | Thay đổi có ý nghĩa | Ranh giới chống mất giá |
| --- | --- | --- |
| Skills | Mở eligible skill hoặc biến thể theo prerequisites | Giữ unlockedSkillIds; minimumStage không auto grant tất cả |
| Skill variants | Timing/targeting/source khác được author | Không reset cooldown/HP hoặc nhân reward vì đổi ID biến thể |
| Movement | Hãm/turn/landing/đọc dòng tinh hơn | Không hứa mỗi stage có movement system mới, không mất basic locomotion cũ |
| Environment | Cụm receiver phức tạp hơn theo source/tolerance | Giữ capability cơ bản để revisits/quest không softlock |
| Defense | Sector/stance/pressure response có anatomy mới | Không Sacred/dual auto immunity hoặc all-direction guard |
| Mobility | Chọn lane/chỗ đáp/điểm bám tốt hơn | Không unlimited flight/speed hoặc arbitrary global penalties |
| Attack reach | Shape theo stage/skill đã review | Cánh/gạc/đuôi lớn không free hitbox ngoài animation marker |
| Combat rhythm | Setup/commit/recovery và cơ hội phản công khác | Không biến cao stage thành safe maximum damage mọi lúc |
| Passives | Điều kiện/active scope và source rõ | Không cộng passive của reserve hoặc heal-switch loop |

Numerical growth, skill development, evolution và mastery tách ở [overview](EVOLUTION_SYSTEM_OVERVIEW.md). Trước/after delta lưu bằng profile/config refs, không duplicated mutable stats; pipeline E09 xử lý hit/status/reaction, label stage không tự modifier. Mọi coefficient/cost/cap/budget để combat/progression balancing, Task15 cho EXP curves và thresholds.

## Kế thừa utility và skills

Theo recommendation C04/R03, stage mới giữ chức năng basic/mobility/environment đã mở, có thể biểu đạt khác nhưng phải có mapping capability/receiver và skill identity rõ. Nếu skill được thay bởi successor profile, alias/mapping giữ unlock, mastery evidence và cooldown nghĩa vụ theo approved migration; không để cooldown cũ+skill mới thành hai lần dùng miễn phí. Không bỏ công cụ cần cho quest đã nhận hoặc đường về vì “đã tiến hóa”. Không tự mở skill chưa làm trial chỉ vì stage đủ.

Các hành vi chỉ có ở old stage không tự trở thành lý do cho phép downevolution. Thiết kế inherited capability/compatible posture/route trước; nếu không thể tương thích thì content chưa ready, cần alternative được duyệt, không xóa tiến trình hoặc ép người chơi giữ save cũ. Stages được thêm sau cũng phải audit legacy routes, collection và save.

## Fairness giữa loài/rarity

Common/single-element specialist vẫn có niche reliability, góc tiếp cận, route hoặc utility mà Sacred/dual không làm tốt nhất. Evolution nâng identity của lineage, không bắt loài mới thay loài cũ hoặc tất cả đội Legend. Phượng II không thay Quy nước/pressure; Long III không thay thermal source của Phượng; Ly III không tự bù vật chất/partner đã chết. Boss/main progression dựa main capabilities đã mở, không bắt optional rare/dual hoặc stage III bốn loài.

## Element identity và assimilation — V13-P07

E09 affiliation khác damage channel/property/status. E10 khuyến nghị giữ membership một/hai hệ ổn định, tăng expression theo stage; Task13 **kế thừa dưới dạng proposal**, không universal dual evolution rule được approved. Ví dụ cơ quan xả của Thủy–Lôi rõ hơn, nhưng một skill Thủy vẫn không tự có Lôi; Kim khoáng/vảy vàng không tự thêm Metal affiliation. Sáu IDs giữ `water`, `fire`, `wind`, `wood`, `lightning`, `metal`; Life authority của Ly không ordinary element, Earth historical labels giữ provenance/UNRESOLVED.

Exceptional identity change cần approved EvolutionRule riêng với source/proof, profile version, staged skill/resistance/movement compatibility và migration; không mặc định stage III thêm hệ. Forced assimilation/stability là actor/process riêng F06/E10, có thể tác động cá thể đã dual nhưng không tự evolution/unlock/rarity; phục hồi không xóa lịch sử hoặc universally cleanse foreign. Không Life resurrection.

## Handoff thực thi tương lai

Mỗi delta cần reference action/animation/source/receiver/counterplay và acceptance cases. Thiếu art/module/clearance thì catalog draft không runtime-ready. Kiểm actual browser scene, interrupt/transform boundary, cast snapshot và temporary status nghĩa vụ theo E09/R03; không dùng document review làm bằng chứng engine hiện hỗ trợ.
