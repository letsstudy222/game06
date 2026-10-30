# Affinity models, resistance và damage evaluation

**Task09 — PROPOSED:** mọi cơ chế/ID/interaction chi tiết mới là đề xuất, chưa triển khai hoặc cân bằng. Chỉ nền được dẫn rõ là CONFIRMED. [Decision register Task09](TASK09_DECISIONS.md) giữ status/dependencies; không tự bắt đầu Task10.

## Ba mô hình được đánh giá

| Dimension | A fixed advantage table | B property-based | C limited hybrid — khuyến nghị E09-P02 |
| --- | --- | --- | --- |
| Learning curve | Dễ học bảng nhỏ, nặng khi roster tăng | Khó nếu quá nhiều tag ẩn/context | Nhỏ: affiliation cue + một property/trait rõ cho tình huống |
| Combat readability | Màu “effective” dễ thấy nhưng bỏ qua execution | Mạnh nếu setup/feedback rõ, yếu nếu chemistry ẩn | Feedback chỉ nguyên nhân chính: guard, wet path, heat shield; không màn hệ số |
| Depth / limitations | Dễ thành đúng element luôn thắng | Position/anatomy/context tốt, khó dự đoán nếu overload | Giữ ordinary combat hữu ích, ít reaction chất lượng và counterplay |
| Balance scalability | Thêm element ảnh hưởng mọi matchup, immunity softlock | Nhiềutổ hợp tag có thể bùng nổ | Affinity slot ít và explainable; resist/CC/resource budget độc lập, không nhân vô hạn |
| AI complexity | AI chọn damage type đơn giản nhưng dễ biết reserve bí mật | Cần quan sát trạng thái/receiver/path, chi phí cao | Chỉ cues hiện hữu, action hợp lệ theo archetype; không biết hidden loadout |
| Data-driven | Bảng refs dễ nhưng ít khác loài | Tags/rules/modules reusable, validator phức tạp | Catalog affinity refs + trait/property/reaction modules có validation |
| Performance | Lookup nhẹ | Broad physical simulations/graph search dễ quá nặng | Local authored connectors, spatial queries/capped targets, không fluid/heat simulation đầy đủ |
| Expansion | Bảng phải rebalance khi thêm hệ | Có thể tái dùng property, mechanics mới vẫn cần module | Registry versioned, defaults/unknown IDs/migration; không rewrite mọi creature |

**Khuyến nghị PROPOSED:** C, nhưng chưa có bảng pair advantage được chốt. C không là phép nhân fixed table A với tất cả modifiers B. Trong draft/review không có affinity rule được approve thì không tự sinh bonus vì tên element. Future numerical task cần explicit neutral policy; Task09 không ghi multipliers hoặc final resist percentages.

## Ngôn ngữ damage — PROPOSED E09-P03

Attack affiliation là nguồn/narrative (water/fire...), property là moisture/heat/pressure/conductivity/cutting/displacement/rooting, channel là loại damage đã budget. Candidate channels `physical`, `thermal`, `electrical`; force/control/biological support không tự damage channel thứ tư hoặc “Life true damage”. Skill Wood hay Wind có thể dùng physical channel khi đó là cú quét/cắt cụ thể. Water pressure không mặc định bypass physical defense.

Cùng attack có nhiều channel thì chia một authored base budget, không mỗi channel nhận lại toàn base. Property không tự thêm damage mới. Direct damage, status application, reaction output và persistent event là bốn kết quả có authority riêng, tránh một hit trả hai lần cho cùng lý do.

## Pipeline khái niệm, không formula executable

1. Kiểm contact/LOS/range/telegraph/action phase và target geometry tại boundary, dùng cast snapshot/config của nguồn.
2. Dựng damage intent: channels + source budget, properties và onContact/onDamage conditions khai báo; không auto element chart.
3. Xét defense theo channel/sector/material/active trait. Mỗi defense cause có group key, chỉ một contribution được resolve trong group. Affinity cùng nguyên nhân với trait không được tính hai lần.
4. Normalize resistance/vulnerability trong group, có floor/ceiling policy được balance sau; protected absorption có budget riêng, không thành multiplier thứ ba cùng cause. Armor weakened chỉ tác động defense group được chỉ định.
5. Commit hit/HP một lần; status intents dùng evidence đã xác minh. Shield block không tự cho burn/root xuyên block trừ action định nghĩa onContact exception rõ.
6. Evaluate eligible reactions trên snapshot context/effect inputs, consume/reserve tokens và emit output ledger sau direct hit. Reaction không sửa ngược direct budget hoặc nhân thêm mọi channel.
7. Receiver intent nếu có được W07 event validator xử lý riêng, không combat callback set permanent flag.

Cùng simulation tick dùng ordered combat event IDs và target/group priority được author khai báo; ambiguities không giải bằng object iteration order. Same-input competing reactions cần mutual exclusions hoặc explicit priority; validator reject trường hợp chưa có policy. Không roll hidden random weakness. Chưa chốt crit/penetration/XP/resource formula.

## Resistance và counterplay

| Loại | Dữ liệu/biểu đạt | Counterplay / giới hạn |
| --- | --- | --- |
| Elemental resistance | Trait/affinity ref có phạm vi; source khác species moral/origin | Fire creature chịu nhiệt tốt nhưng vẫn chịu physical, không mọi Fire attack chỉ thermal |
| Physical resistance | Material/armor/joint/angle/channel profile | Đọc hướng guard/recovery/hở sườn; Quy nước không auto xuyên plate |
| Environmental protection | Movement/body tolerance với pressure/heat/wind context | Aquatic chịu áp có giới hạn, vẫn trúng Water attack có displacement/collision; safe routes bảo đảm |
| Temporary protected | Skill/receiver tạo shield sector/type/cap explicit | Flank, chờ hết/đánh đúng window; shield không all-channel immunity vĩnh viễn |
| Vulnerability | Specific evidence: exposed joint/charge window/temperature state | Nguồn vulnerability có cap, không stack multiplicative mọi debuff |
| Status resistance | Definition/profile giới hạn application, duration hoặc CC response | Damage vẫn resolve nếu status không áp; feedback “không bị trói” khác “không nhận damage” |
| Boss response | Profile theo CC family/window, giảm repeated displacement, interruptible phases | Không complete immunity tất cả statuses; root có thể giữ nhẹ/control budget hoặc không immobilize ở phase đó, damage vẫn có tác dụng |

Metal vật lý có thể conductive/insulated mà không affinity Kim; Kim creature cũng không tự dẫn điện nếu profile khác. Wind creature lợi position/mobility, không universal Wind immunity. Mọi important enemy phải có chiến thuật với forms main hiện có: contact/angle/recovery/receiver hợp lệ, không bắt sở hữu element khác như vé giết boss. Không làm main target chỉ nhận damage một element optional hoặc đủ ba member.

## Task10 interface — chưa tính dual-element

CreatureElementProfile có list affiliation và link resistance resolver versioned; Task09 không cộng/nhân hai affinity, không chọn primary/secondary, không automatic dual bonus. Skill single-element giữ own channels/tags; target dual profile cần resolver ở Task10. Nếu chưa có resolver hợp lệ thì entry content chưa runtime-ready, không lấy “nhân hai weakness” làm default production. [Task10 questions](TASK09_DECISIONS.md) giữ phần chưa chốt.
