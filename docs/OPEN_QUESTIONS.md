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


## Task11 — decisions chưa chốt

[Classification overview](creatures/CREATURE_CLASSIFICATION_OVERVIEW.md), [K11-P01–P12/U01–U08](creatures/TASK11_DECISIONS.md) và [audit/delivery mapping](creatures/TASK11_CONSISTENCY_AUDIT.md) ghi chín axes, ModelB ba rarity candidates, separate Sacred designation, sáu combat roles/specialization tags, exploration/ecology/playability và collection/data/20future cases. Mọi lựa chọn mới **PROPOSED**; D19 nămlabels vẫn PROPOSED, chưa assign Sacred rarity, không tiers→damage. D41 no-three early constraint giữ; A08-05 entry/capability/snapshot/retry còn mở. E09/E10 mechanics/save/catch-up/variant taxonomy chưa tự duyệt. Sacred identities/3stages và approved art preserved, PhaseI PARTIAL; Task12 chưa bắt đầu. Các handoff nói Task11 chưa bắt đầu ở phần trước là mốc lịch sử Task10.


## Task12 — roster và asset decisions

[Creature Design Bible](creatures/CREATURE_DESIGN_BIBLE.md), [roster](creatures/CREATURE_ROSTER_REGISTER.md), [B12-P01–P12/U01–U09](creatures/TASK12_DECISIONS.md) và [audit/mapping](creatures/TASK12_CONSISTENCY_AUDIT.md) giữ standards/phê duyệt/evidence. Eight secondary/two stages và approximate ly 16 thông thường/one main form là planning targets;8+12 names external chưa xác minh,4IV redesign briefs chưa được duyệt, previous IV batch bị bác theo explicit Task12. Không thêm Earth hoặc final species/playability/rarity. Production tier/rubric/pipeline mới PROPOSED, C04-P07 vẫn proposal. Phoenix tham chiếu/atlas actual static inspection/metadata không full clip certification. E09/E10/K11/R03/W07 decisions giữ pending; đã duyệt Sacred/12 forms/art preserved, PhaseI PARTIAL. Task13 chưa bắt đầu; historical Task 11 hand off phía trên không current Task12 status.


## Task13 — evolution decisions còn mở

[Evolution overview](evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [V13-P01–P13/U01–U10](evolution/TASK13_DECISIONS.md) và [audit/delivery map](evolution/TASK13_CONSISTENCY_AUDIT.md) giữ Model D recommendation,12stage supplements tại [C04 matrix](creatures/SACRED_EVOLUTION_MATRIX.md), visual/gameplay/memory/loadout/UI/asset contracts, eight conceptual entities và22future QA cases. Safe explicit transition và state/config freeze vẫn PROPOSED, không phê duyệt HP/resources/recovery/catch-up/storage hoặc nguyên tố mới; exact curves/thresholds để Task15. Sacred4×3/approved visual identity/stable IDs và D41 no-three early giữ; A08-05 trigger/capability/snapshot/retry còn mở. Existing E09/E10/K11/B12 proposals và PhaseI PARTIAL không đổi. Task14 chưa bắt đầu; câu Task13 chưa bắt đầu ở handoff Task12 là mốc lịch sử.


## Task14 — combat decision queue, không tự đóng Q

[C14-U01–U10](combat/TASK14_DECISIONS.md) nối Q07/Q09/Q10/Q15–18: plane/swim/depth/clearance; cooldown/defense/spend; HP/incapacity/recovery; damage/input ordering/cancel markers; actual stage clips/geometry; switch/status ownership; boss trigger/snapshot/retry/outcome; focus/remap/accessibility; storage/ack/migration/performance; numeric tuning. Recommendation cooldown A và HP riêng A/brace nhỏ là PROPOSED, không số final hoặc physical-model approval. D41 no mandatory three đã giải, không hỏi lại gate đó. [Quy combat demo](combat/COMBAT_VERTICAL_SLICE.md) không cần boss/ba forms, nhưng chưa đủ toàn D40 resonance/persistence; [audit](combat/TASK14_CONSISTENCY_AUDIT.md) ghi runtime mismatches/gates. Không cosmic-origin answer, không runtime implementation hoặc full audit09–16. Task15 chưa bắt đầu.


## Task15 — progression và reward approvals còn mở

[P15-U01–U10](progression/TASK15_DECISIONS.md) nối Q09/Q10/Q11/Q13/Q16/Q17: distribution/meaningful contribution/rounding, curves/cap/overflow/migration, stat/HP/pending benefits, mastery/evolution gates, foundation milestones, source budgets/occurrences/claims, optional RNG/alternatives, resource/inventory/protection/overflow, writer/storage/ack/error/loss budget và Quy implementation scope. D participation+foundation/segmented curve/objective mastery/proof-first economy là PROPOSED, không numbers final; không reopen D41 hoặc tự approve C14/V13/R03. [Minimal progression demo](progression/FIRST_PLAYABLE_PROGRESSION.md) và [audit](progression/TASK15_CONSISTENCY_AUDIT.md) giữ dependency gaps. Task16/full audit09–16 chưa bắt đầu.


## Task16 — loadout approvals và audit boundary

[L16-U01–U10](loadout/TASK16_DECISIONS.md) nối Q07–10/Q15–18: minimum-one/detailed early entry, eligibility/uniqueness, context edit, cancel/buffer/placement/motion, HP/manifestation/recovery/stability, exact lock/snapshot, retry/invalid checkpoints/reload, safe evolution/config benefits, writer/ack/migration/loss budget, logical input/UI/device rules. D41 đã xác nhận no-compulsorythree early; **không hạ baseline này hoặc tự chốt toàn early-entry policy**. [DR01/update-after-approval plan](loadout/BOSS_ENTRY_AND_RETRY.md) giữ conflict/source scope; HP16B=C14/P15A chưa chosen. [Quy-only slice](loadout/FIRST_PLAYABLE_LOADOUT.md), [audit](loadout/TASK16_CONSISTENCY_AUDIT.md) giữ missing implementation/assets/save gates. Full PhaseII audit/Task17 chưa bắt đầu.

## Sau Task17 — gate mở đầu

[O17-U01–U06](chapter1/TASK17_DECISIONS.md) nối Q05 vật mang, Q03 manifestation/ý thức, Q07 input/bơi/cơ cấu, Q16 durable save/memory receipt mapping/migration, Q18–19 asset/provenance và Q06/Q17 scope/thiết bị. [Save contract](technical/OPENING_STATE_AND_SAVE_CONTRACT.md) cần mapping receipt memory trước form; không tự claim parent E01 sớm. Chưa câu hỏi nào được tự đánh RESOLVED. Q01/Q02/Q04 tiếp tục giữ bí ẩn, không cần trả lời trong mở đầu. Không bắt đầu Task18.

## Sau Task18 — phụ thuộc Quy

[Q18-U01–U06](chapter1/TASK18_DECISIONS.md) theo dõi vật mang/manifestation, movement/input/current/geometry/camera, health/resource/guard/recovery, typed catalog/save/memory receipt mapping, evolution/mastery/thresholds và art/provenance/device budgets. Q01–Q05 và O17 gates không tự RESOLVED; Quy art chưa production-ready. Task19 cần kiểm receiver tiers/route/clearance, không đặt mandatory stage II/III gate khi chưa bảo đảm progression.

## Sau Task19 — gate map Hải Uyên

[H19-U01–U07](chapter1/TASK19_DECISIONS.md) nối production camera/plane/depth/streaming/envelope, current/input/pressure/capability, boss spatial/entry/retry/HP, W07 durable save/O17 memory receipt/migration, roster-habitat coverage và art/provenance/device/scope/topology/name approval. Main graph dùng Quy I, không optional species/full3/II/III gate. Các vấn đề cũ chưa tự RESOLVED; không nhận đã có production map hoặc bắt đầu Task20.

## Sau Task20 — ecology gates

[E20-U01–U07](chapter1/TASK20_DECISIONS.md) nối official species/art/element/origin/stage approval, playability/resonance routes, AI plane/current/nav/performance, P15 source/payload mapping và C14 health/recovery, W07 save/actor/coverage/migration, F06 adaptation evidence và production scope/devices. Không tự RESOLVED các câu hỏi cũ; stable foreign adaptation khác forced assimilation/temporary status, không Earth mới hoặc mandatory optional collection.

## Sau Task21 — quest implementation gates

[Q21-U01–U07](chapter1/TASK21_DECISIONS.md) nối source/objective predicate/instance bindings, Quy/route/input/geometry, Task23 qualifying boss outcome/entry/retry/HP policies, W07/O17 memory receipt/durable save/migration, E20 approved species/actor/source/asset coverage, P15 reward payload/recipient policy và dialogue/localization/Task24 staging. Chưa câu hỏi cũ nào tự RESOLVED; first slice có thể dừng partial E02, không fake full completion hoặc start Task22.

## Sau Task22 — optional content gates

[S22-U01–U07](chapter1/TASK22_DECISIONS.md) nối source/objective/room/predicate scope, official species/art/behavior/journal, current/geometry/return/combat policy, W07/Q21/P15 optional alias/legacy-source/recipient/stacking/durable save/migration, optional echo provenance, late R03 eligibility/fallback-entitlement và localization/device budgets. Không tự RESOLVED câu hỏi cũ; no optional→main hoặc form retro grant qua content version.

## Sau Task23 — boss production gates

[B23-U01–U07](chapter1/TASK23_DECISIONS.md) nối identity/visual approval, QuyI current/geometry/camera/latency/return, attack/control/resource/phase thresholds/resistance, HP0/continuation/simultaneous outcomes/L16 entry-retry, E04 combat/trial/refuge/permission predicate, W07/P15 atomic save/recipients/migration và art/audio/device/Task24 ending staging. Chưa vấn đề cũ nào tự RESOLVED; counter thiếu phải sửa boss/arena thay invent mandatory skill/form.

## Sau Task24 — finale/travel implementation gates

[F24-U01–U07](chapter1/TASK24_DECISIONS.md) nối source-version closure/E05 alias/predicate/write-set, G/A/B/outlet/refuge/coverage/placement checks, body/current/geometry/camera/lock recovery, W07/P15 atomic writer/ledger/travel identity/migration, E20/S22 sources và actual ChapterII destination/return anchors/art/cues/device budgets. Giữ E05 C/D same source semantics, E06 arrived riêng; any future split D cần explicit source decision. Không tự RESOLVED Q01–Q05/D24 hoặc chạy Task25/audit toàn phase.
