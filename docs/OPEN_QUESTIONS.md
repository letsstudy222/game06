# Câu hỏi còn mở

Không tự trả lời các câu hỏi sau bằng canon mới. ID quyết định liên quan xem [PROJECT_DECISIONS](PROJECT_DECISIONS.md). Mức ưu tiên thể hiện thời điểm cần trả lời, không phải lịch thực hiện.

| ID | Câu hỏi | Cần chốt khi nào / điều gì được mở khóa |
| --- | --- | --- |
| Q01 | Linh thể thực sự là ai, vì sao có cộng hưởng, có giới hạn ký ức nào? | Trước story bible đầy đủ; không cần lộ đáp án ở slice; cấm giải đáp hết trong Chương I |
| Q02 | Nguyên nhân chính xác của Đại Biến Cố Tinh Giới: tác nhân, chuỗi tương tác và vai trò các bên? | Trước viết revelation các chương sau; không quy mọi lỗi cho ngoại lai |
| Q03 | Phong ấn ban đầu có tự nguyện không, có thực là hy sinh, thể xác và ký ức được lưu thế nào? | Trước chốt sự thật lịch sử; D17 chỉ là giả thuyết |
| Q04 | Cổng tinh giới là cấu trúc gì, vận hành/đóng/mở bằng gì và có giới hạn nào? | Trước tuyến kết Chương IV; không mở rộng hành tinh ngay |
| Q05 | Vật thể Quy cộng hưởng là trứng hóa đá hay lõi sự sống? | Trước script mở đầu và đặt brief art Quy |
| Q06 | Phạm vi slice Chương I, thời lượng, số vùng/encounter, tiêu chí polish và ngân sách? | Trước task triển khai; không mặc định một chương đầy đủ hoặc một boss mới |
| Q07 | Quy di chuyển/bơi, phòng thủ và cảm nhận dòng năng lượng cụ thể ra sao; có điều kiện sinh tồn nào không? | Trước thiết kế input/combat slice; chưa xác nhận oxygen/stamina hoặc mechanic mới |
| Q08 | Cộng hưởng cần điều kiện gì; những loài nào chỉ được phát hiện và những loài nào playable? | Trước collection/progression; tránh quy về bắt quái thông thường |
| Q09 | XP phân phối thế nào giữa ba dạng; HP/cooldown/tài nguyên khi đổi dạng và ngưỡng tiến hóa từng loài? | Trước prototype transformation/progression; không đặt ngưỡng giả |
| Q10 | Encounter boss bắt đầu/kết thúc khi nào; chết, bỏ chạy, retry và reload tác động khóa loadout thế nào? | Trước boss/save implementation; quy tắc khóa ba dạng đã xác nhận, chi tiết reset chưa có |
| Q11 | Roster nguyên tố bản địa/ngoại lai cuối cùng, tương tác nguyên tố và hạng rarity cuối? | Trước balance/content schema; Lôi/Kim foreign baseline được xác nhận tại Task08 D38; full roster/interactions và năm rarity còn mở |
| Q12 | Sinh Mệnh có giới hạn chữa lành/tái tạo nào và phân biệt với hồi sinh người đã chết hoàn toàn ra sao? | Trước thiết kế Ly; nguyên tắc không hồi sinh vô hạn đã xác nhận |
| Q13 | Trạng thái môi trường nào được lưu, quest điều chỉnh lại thế nào và bảo đảm đường sưu tầm ra sao? | Trước persistent world/save schema |
| Q14 | Đảo Bình Minh hiện tại nằm ở đâu so với Đảo Nhật Diệm? Tái dùng bao nhiêu art/layout mà không làm sai truyện? | Trước tích hợp prototype vào Chương II; không rename/retcon trong Task 01 |
| Q15 | Framework sản xuất dài hạn có tiếp tục Canvas hay cần đánh giá công cụ khác; pipeline Windows chọn gì? | Runtime hiện tại **đã xác minh Canvas 2D**, không phải câu hỏi engine đang chạy. Chỉ chốt thay đổi sau benchmark, nhu cầu tooling và kế hoạch bảo tồn browser |
| Q16 | Save schema/versioning, migration settings, offline và yêu cầu lưu/chơi đa thiết bị? | Trước save/progression; settings localStorage hiện hữu không phải save game đầy đủ |
| Q17 | Thiết bị/browser tối thiểu, hiệu năng/memory/input budgets và cách nghiệm thu Windows? | Trước xác nhận hỗ trợ nền tảng; chưa có kết quả phần cứng mobile trong Task 01 |
| Q18 | Tệp reference Quy/Long/Ly ở đâu; trạng thái duyệt từng bản; sprite/clip/metadata cần bàn giao gì? | Trước sản xuất asset; hiện checkout không có tham chiếu nhận diện được cho ba loài này |
| Q19 | Nguồn, quyền sử dụng và provenance đầy đủ của tham chiếu người dùng, nhạc/SFX sẽ được theo dõi thế nào? | Trước dùng asset trong sản xuất/phát hành; không suy diễn quyền từ sự tồn tại của file |

Task 01 không bị chặn bởi các câu hỏi này: tài liệu ghi rõ phần thiếu. Task 02 cần đề bài riêng và chỉ giải quyết nhóm câu hỏi thuộc phạm vi đó.

## Sau Task 02

Tên vùng Ly đã chốt là Tiên Cảnh Vạn Sinh (D25); kết cung tái kích hoạt Tinh Môn (D26). Q01–Q05 vẫn mở: [mô hình biến cố](lore/ANCIENT_CATASTROPHE.md) là PROPOSED, chưa xác nhận sự tự nguyện hoặc nguồn gốc linh thể/cổng. Q08–Q10 có [giới hạn cộng hưởng đề xuất](lore/SPIRIT_AND_RESONANCE.md), chưa chốt vật lý chuyển dạng, HP hoặc retry. Các câu hỏi kỹ thuật/asset/scope còn lại giữ nguyên.

## Sau Task 03

Q08–Q10 và Q16 có [đặc tả ứng viên](lore/RESONANCE_DECISION_RECORD.md), chưa là quyết định đã duyệt: hybrid B+C, quỹ/cooldown, bộ ba unique và boss reload abort/reset, defeat không permadeath, progression/catch-up và save journal. D30 chốt số stage lớn Tứ Linh là ba, không chốt XP curve/ngưỡng tiến hóa. Q01–Q05 về nguồn gốc/sự thật lịch sử vẫn mở. Cần duyệt model/cơ chế thuộc nhiệm vụ tiếp theo; không chặn công việc tài liệu độc lập.

## Sau Task 04

Q18 vẫn thiếu ảnh Quy/Long/Ly; cần mapping reference Phoenix ↔ stage, không tự nhận Legend là stage III. Q09/Q11 vẫn chưa chốt ngưỡng evolution/XP cap/rarity; [abilities và synergies ứng viên](creatures/TASK04_CONSISTENCY_AUDIT.md) chưa có damage/cooldown/cost/range/TTL số. Q15/Q17 cần prototype clearance/render của Long dài và envelope stage lớn. Các quy tắc Task 03 được tham chiếu nhưng chưa tự phê duyệt; nguồn gốc Tinh Linh, cổng và tính tự nguyện biến cố giữ UNRESOLVED.

## Sau Task 05

Q06 có [blueprint bốn chương và phạm vi event](story/TASK05_CONSISTENCY_AUDIT.md), chưa có ngân sách/thời lượng cam kết. Q10 cần chọn full-three R03-P06 hay empty-slot-locked S05-P02 trước boss đầu; không đòi unannounced optional species. Q13/Q16 có world/refuge/event-save contracts đề xuất, chưa implemented. D35 chốt khung Long/Ly phân tán theo Task 05, không giải ý thức nguyên thể/tự nguyện/nguồn Tinh Linh. Cast/boss identities, Kim/Lôi affiliations và capability/asset prerequisites vẫn cần duyệt đúng phạm vi task sau.

## Sau Task 06

[Hồ sơ F06](factions/TASK06_CONSISTENCY_AUDIT.md) đề xuất ba tổ chức, local concerns/access, tám behavior views, assimilation outcomes và templates/reward/ledger. Chưa chốt existence/membership/lịch sử phe, species/art, roster Kim–Lôi, recoverability từng case, encounter subset/balance hoặc boss entry policy R03/S05. Nguồn gốc Tinh Linh/cổng, thủ phạm sâu và sự tự nguyện biến cố không được giải bằng faction propaganda. Cần duyệt phạm vi trước implementation, không chặn hoàn tất tài liệu.


## Task07 — các điểm cần chốt trước implementation

Xem [W07-U01–U04](world/TASK07_CONSISTENCY_AUDIT.md): early boss entry R03/S05; capability/clearance/safe anchors; species/habitat coverage; storage adapter/namespace/backup/error UX/loss budget; weather bounds/performance/faction approvals. Không tự phê duyệt W07 model hoặc bắt đầu Task08. Không có câu trả lời mới về origin Tinh Linh hoặc cosmic culprit.


## Task08 — decision queue có gate

[Register A08-01–A08-15](PROJECT_DECISIONS.md) tập trung source/rationale/dependencies/risks/approval; [consistency log](DESIGN_CONSISTENCY_REPORT.md) giữ conflicts, [readiness](IMPLEMENTATION_READINESS.md) giữ implementation gate. Không dùng quyền tự làm/commit để tự duyệt creative decisions.

| Priority / question refs | Decision cần chốt | Gate thực sự bị chặn |
| --- | --- | --- |
| P0 Q05/Q08 → A08-01/14 | Physical B+C hay model khác; Quy core appearance, reference và consent/source | Opening resonance/art production |
| P0 Q07/Q09/Q10 → A08-02/03 | Swim/collision/hazard/cost/cooldown/defeat/recovery subset | Quy I movement/combat/save implementation |
| P0 Q13/Q16 → A08-09/11 | Authority/transaction/storage/namespace/backup/error/loss budget | Durable progress sample; UI settings vẫn tách |
| P0 Q06 → A08-13 | First playable content/budget/acceptance, giữ sáu essential D40 | Implementation scope, không cần full boss/3species |
| P1 Q10 → A08-05/07 | Theo Task09/D41 không mandatory3member/3elements; còn entry trigger/empty snapshot/retry và boss identity/outcome | Trước boss implementation; no-three baseline không cần hỏi lại, resource/recovery vẫn pending |
| P1 Q09 → A08-04/10 | Curves/evolution thresholds/catch-up | Progression production, không numeric defaults tự bịa |
| P1 Q08/Q11/Q18 → A08-14 | Roster species/habitat/refuge/animation và full elemental interaction design | Collection completeness/content-ready; Lôi/Kim affiliation đã confirmed, không hỏi lại |
| P2 → A08-06/08 | Faction names/existence/relationships và localized choices | Optional faction content, không essential first playable |
| P1/P2 Q15/Q17 → A08-12 | Adapter/modules/device budgets/Windows packaging, engine change nếu có evidence | Generic production runtime/platform claims |
| P2 Q01–04 → A08-15 | Cosmic origin/culprit/voluntary intervention/gateway nature | Final historical truth; local slice/Task09 vẫn có thể thiết kế |

### Làm rõ Q02 — chronology ngoại lai vẫn UNRESOLVED

D18/D38 đã xác nhận Lôi/Kim là ảnh hưởng ngoại lai qua biến cố; không hỏi lại baseline này. Điều còn mở là phạm vi thời kỳ Đại Biến Cố và mốc tiếp xúc đầu nằm trước hay trong phạm vi đó. H2 tiếp xúc đầu/H4 đỉnh khủng hoảng trong [ANCIENT_CATASTROPHE](lore/ANCIENT_CATASTROPHE.md) chỉ là mô hình PROPOSED L02-P05, không phải chronology đã được duyệt. [ELEMENTAL_COSMOLOGY](lore/ELEMENTAL_COSMOLOGY.md) giữ cùng cách phân biệt; chưa có lựa chọn được chốt tại Q02/A08-15.

Phase I PARTIAL, không tự tuyên bố freeze full production. Audit Task08 hoàn tất không trả lời thay các lựa chọn trên. Task09 — Elemental System Design chỉ bắt đầu khi được giao; không tự sinh damage chart/roster cuối trong audit này.


## Task09 — elemental approvals và Task10 boundary

[Task09 register](elements/TASK09_DECISIONS.md) E09-U01–U07 giữ ModelC/table/numbers, status ownership/CC/refresh/duration, reaction subset, minimal status-obligation save/performance/readability/asset gaps. Chronology Q02/A08-15 không đổi. D41 explicit xử lý no-mandatory-three early entry; các đoạn full-three-vs-empty của audit cũ là historical, không baseline hiện tại. B+C/quỹ/HP/abort-reset chưa được Task09 duyệt.

Task10 chưa bắt đầu: dual resistance composition/damage bonus/primary-secondary/evolution/foreign hybrid acquisition/roster vẫn UNRESOLVED. Interface refs không tự là phép sum/product hoặc một dual species approved. Cần user giao Task10 riêng; không triển khai classes/loaders/save/balance trong Task09.


## Task10 — queue chưa duyệt

[Overview](elements/DUAL_ELEMENT_OVERVIEW.md), [decisions E10-P01–P10/U01–U08](elements/TASK10_DECISIONS.md) và [audit](elements/TASK10_CONSISTENCY_AUDIT.md) giữ đề xuất identity Model C + unordered membership, resistance C, bốn reference families, skill/reaction/evolution/data contracts. **PROPOSED**, chưa final multipliers/roster/primary-secondary/variant taxonomy. Six-element baseline/Sacred identities và D41 giữ nguyên; explicit Task10 §13 không mandatory dual species cho main boss. A08-05 entry/snapshot/retry và R03/W07/E09 save/resource/recovery vẫn mở, Phase I vẫn PARTIAL. E09-U06 nay có đề xuất để review, không tự RESOLVED. Task11 chưa bắt đầu.
