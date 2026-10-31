# Ma trận 12 dạng tiến hóa

**CONFIRMED:** bốn species có ba major stages Thức Tỉnh / Trưởng Thành / Thức Tỉnh Nguyên Sơ; progression riêng, không buộc ngưỡng giống nhau. **PROPOSED C04-P06:** tên, stageId và mọi gate/anatomy/mechanical delta trong bảng. Không coi số thứ tự stage là level hoặc rarity. Hồ sơ loài là nguồn giải phẫu chi tiết, abilities là nguồn luật chiêu.

| StageId / tên ứng viên | Anatomy/silhouette cốt lõi | Movement/combat | Environmental delta | Điều kiện phát triển ứng viên, không level cuối |
| --- | --- | --- | --- | --- |
| `quy_s1` / Quy Khởi Triều | Mai oval thấp, đầu nêm, bốn chi màng | Bơi/lặn, basic và dòng đẩy ngắn | Cảm chiều dòng/cơ cấu đơn | Bootstrap thức Quy + học cảm giác thân thể |
| `quy_s2` / Quy Hộ Lưu | Mai dẹt có kênh viền, vây trước rộng, đuôi lái | Hãm dòng, chặn hướng S2 | Đọc nhịp áp và chuyển nhánh có hồi lưu | Thử dùng dòng + giữ hướng, phát triển riêng loài |
| `quy_s3` / Quy Hải Uyên Nguyên Sơ | Mai xếp tầng dẫn vào–ra, vây có mặt lực | Hồi lưu S3 và điều hướng tinh luyện | Cụm hồi lưu nhiều nhánh có giới hạn | Chứng minh khôi phục dòng bền vững, không chỉ stat |
| `phuong_s1` / Phượng Sơ Diệm | Chim gọn thân ngà, cánh vàng, đuôi crimson ít dải | Lướt ngắn, basic và đạn S1 | Cảm nhiệt/cơ cấu đơn | Thức sanctuary và học đặt nhiệt an toàn |
| `phuong_s2` / Phượng Dực Nhật | Vai/lông sơ cấp và đuôi phát triển tương đối | Lượn thermal, vùng nhiệt S2 | Điều tiết xả nhiệt, chọn điểm đáp | Dùng thermal và kiểm soát khoảng nhiệt |
| `phuong_s3` / Phượng Hoàng Nhật Diệm Nguyên Sơ | Cánh phân tầng và đuôi nhiều dải có khoảng âm | Đường bùng Hỏa S3, điều phối lượn | Cụm chu kỳ địa nhiệt, không miễn dung nham | Làm chủ nhiệt có đường hồi/xả; mapping reference chưa chốt |
| `long_s1` / Long Sơ Phong | Rồng dài S nhẹ, đầu sừng/4 chân/đuôi đọc được | Lượn luồng cục bộ, basic cắt và S1 lane | Cảm hướng nút khí | Nối đủ dấu thức cho một hiện thân; không trứng |
| `long_s2` / Long Vân Hành | Cổ/eo dài tương đối, bờm/chi và S rõ | Đổi lane, S2 lệch đạn có hướng | Chỉnh nhánh qua timing | Điều khiển hướng/áp có đường thoát |
| `long_s3` / Long Thiên Phong Nguyên Sơ | Thân phân bố khối dài, bờm/đuôi đầy, xuyên mây có khe hở | Chuỗi khí S3, đổi hướng nâng cao | Nối mạng khí tới Vạn Sinh | Kiểm soát mạng, không tự cấp quyền mọi cơn bão |
| `ly_s1` / Ly Sơ Mầm | Guardian ngực rõ, bốn chi, gạc cành ngắn | Chạy/nhảy, basic và rễ S1 | Cảm nút sống/tăng trưởng cục bộ | Đủ quan hệ sống cho thức tỉnh, không chỉ mana |
| `ly_s2` / Ly Kết Diệp | Vai/collar/gạc/đuôi khác tỷ lệ stage I | Bám điểm cây hợp lệ, vùng hồi S2 | Nối đối tác/rễ | Duy trì quan hệ có nước/vật chất và nguồn sống |
| `ly_s3` / Ly Vạn Sinh Nguyên Sơ | Vòm gạc rỗng, cấu trúc nhánh nối cổ–lưng | Mạng Mộc S3, traversal theo cụm | Phục hồi quan hệ đa dạng còn khả thi | Điều phối hệ sống, không hồi sinh mọi cá thể đã mất |

Mỗi bước lên stage cần đủ điều kiện loài và progression đã được duyệt ở task balance sau. Bảng không tự đặt ngày/chapter checkpoint chính xác hoặc level cap. Không tự thêm yêu cầu “bốn Sacred đều stage III” để tái kích hoạt Tinh Môn; kết chương dựa điều kiện phục hồi bốn hệ của Task 02, không chỉ chỉ số tiến hóa.

## Kế thừa và khác biệt — PROPOSED

Stage II giữ basic/mobility/S1/passive I, mở biến thể cấu trúc và S2 khi điều kiện skill riêng đạt. Stage III giữ các công cụ cũ, cho mức điều khiển/traversal nâng cao và S3 khi đạt condition. `minimumStage` là điều kiện cần, không tự grant mọi skill khi evolution. Không đưa toàn bộ abilities vào stage I chỉ vì species Sacred.

Một species → một formId ổn định → ba stageIds, một stage hiện dùng đã commit. Không equip nhiều stage của cùng species, không tách XP/HP thành ba cá thể để heal/tránh khóa. R03-P09 hoãn evolution khi boss hoặc thiếu chỗ vẫn PROPOSED; Task 04 dùng làm giả định tham chiếu, không phê duyệt ngầm toàn bộ Task 03.

## Kích thước, collision và rendering — PROPOSED C04-P07

| Thành phần | Hợp đồng tương lai |
| --- | --- |
| Visual envelope | Dữ liệu khung hình tối đa của thân/cánh/gạc/đuôi theo hướng và posture, tách FX/mây; không bắt mọi stage vào 96px |
| Footprint | Vùng chiếm chỗ ở mặt đất/mặt nước theo body core và posture có asset; không bằng cả bounding box hình |
| Hurtbox | Phần hiện thân có thể nhận đòn với quy tắc nhất quán và dễ đọc; cloud/particle không là hurtbox |
| Attack hitbox | Theo từng phase/animation marker; cánh/đuôi vẽ to không tự gây damage ngoài marker/shape được khai báo |
| Anchor/depth | Điểm chân/core ổn định qua idle/move/hurt/turn; draw-order theo ground projection, có occlusion test từng stage |
| Passage | Chỉ chọn compact posture khi có art/clip và clearance thật; không scale nhỏ whole-sprite hay crop cứng để lách |
| Long đặc biệt | Curve/envelope và các đoạn thân cứng phải vừa hành lang, kể cả khi core footprint nhỏ. Chọn segment/envelope implementation ở task prototype, không coi engine hiện hỗ trợ |
| Camera | Duy trì integer sampling và đủ biên envelope, kiểm tra 390×844, 360×800, 844×390, 1920×1080; không lấy FX sáng để che cắt sprite |

Evolution là transaction: validate conditions/assets → chờ ngoài lock/safe point → kiểm tra footprint/envelope mới → commit stage/visual/config cùng revision. Giữ tỷ lệ HP, HP0 vẫn HP0, không reset cooldown. Nếu không vừa: giữ stage cũ đã commit, đánh dấu pending và chỉ dẫn đến vùng đủ chỗ; không xóa tiến trình, tự biến lại stage I hoặc dịch xuyên vách. Sau commit, lối hẹp phải có posture hợp lệ, đường vòng hoặc safe retreat được thiết kế trước; không tạo map khiến người chơi bị kẹt sau tiến hóa.

Stage III lớn/uy nghi qua anatomy, khoảng âm và nhịp animation, không nhất thiết tăng footprint tới mức phá tilemap. Kích thước sprite/collider cụ thể và posture repertoire còn UNRESOLVED trước art blocking/prototype. Không nhận bộ 12 sprite đã tồn tại.


## Task13 — bổ sung mục đích, ký ức và handoff cho đủ 12 stage

**PROPOSED V13-P03**; số ba major stages mỗi Sacred là CONFIRMED, tên/IDs/anatomy/skill/gate và các mô tả sau vẫn proposals C04/V13. Requested `docs/evolution/SACRED_CREATURE_EVOLUTION.md` dùng chính nguồn này, không tạo stage registry thứ hai. [Evolution overview](../evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [asset contract](../evolution/EVOLUTION_ASSET_CONTRACT.md) và [decisions](../evolution/TASK13_DECISIONS.md) giữ rule/gate chung. Bảng đầu và bốn species profiles ở trên tiếp tục sở hữu anatomy/ID gốc; các blocks sau cụ thể hóa mối liên hệ, không rename hoặc approve mới.

Không tự đặt primordialAuthorityId mới cho Quy/Phượng/Long; “điều tiết dòng/nhiệt/khí” mô tả phạm vi biểu đạt, không vô hạn năng lực. “Firebird huyền thoại” không gán rarity Legend. Stage I là acquisition; các bước II/III phải qua approved requirements riêng, không bảo đảm hoàn mọi stage trong đúng chapter giới thiệu. Không bắt đủ bốn stage III để kích hoạt Tinh Môn.

### Task13 stage `quy_s1` — Quy Khởi Triều

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Trải nghiệm cơ thể đầu và học bảo tồn một nhánh nhỏ |
| Anatomical changes | Mai oval thấp, đầu nêm, bốn chi màng ngắn; không nguyên thể full kit thu nhỏ |
| Silhouette changes | Khối mai gọn, đầu/chi/đuôi đọc được trong nước |
| Movement development | Bơi/lặn cơ bản và mượn dòng đã có; vẫn có động tác trên nền |
| Combat development | Cận chiến gần, đẩy dòng ngắn, ổn định khi đứng hướng phù hợp |
| Environmental abilities | Cảm chiều dòng và receiver đơn, không cần hồi toàn mạng để mở Quy |
| Memory relationship | Mảnh cảm áp/lạnh và ký ức giữ một dòng, chưa biết nguồn nhiễu động |
| Production requirements | AG-Q1: reference còn thiếu; swim/dive/ground/turn/basic/hurt/transform/contact anchors |
| Balance risks | Không passive miễn mọi pressure; bootstrap không thành spirit noclip dùng lại |

### Task13 stage `quy_s2` — Quy Hộ Lưu

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Từ chịu lực sang chọn hướng giữ và phản công |
| Anatomical changes | Mai dẹt rộng hơn với kênh viền, vây trước phát triển, đuôi lái |
| Silhouette changes | Viền mai và mặt vây mở ngang khác oval stage I |
| Movement development | Hãm/đổi hướng tốt hơn, tăng tốc theo dòng có điều kiện |
| Combat development | Guard một sector và tương tác áp lực, có hở sườn/recovery |
| Environmental abilities | Đọc nhịp van, chuyển nhánh khi có đường hồi/xả phù hợp |
| Memory relationship | Nhớ lựa chọn giữ một nhánh nhưng góc nhìn vẫn cục bộ; không toàn biến cố |
| Production requirements | AG-Q2: mai/vây mới, brake/brace/block/release/valve clips, anchors và clearance |
| Balance risks | Guard không all-direction, lên stage không refill HP/cooldown; rules còn pending |

### Task13 stage `quy_s3` — Quy Hải Uyên Nguyên Sơ

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Điều tiết hồi lưu có trách nhiệm thay đóng băng thay đổi |
| Anatomical changes | Mai xếp tầng với đường vào–ra, cổ vững và vây phân mặt lực |
| Silhouette changes | Khối mai cổ uy nghi nhưng thấp, dòng đi theo cấu trúc không phủ anatomy |
| Movement development | Chọn hướng dòng trong cụm và turn tinh hơn, không chịu mọi độ sâu |
| Combat development | Kỹ thuật phòng ngự nâng cao và vùng hồi lưu có giới hạn |
| Environmental abilities | Phối hợp nhiều nhánh nước/áp với nguồn và đường hồi; không free world-stable flag |
| Memory relationship | Đối chiếu ký ức bảo tồn với dấu tích mất mát, không biết trọn thủ phạm |
| Production requirements | AG-Q3: full body/turn/fold nếu dùng, S3/environment FX riêng, sweep và playback |
| Balance risks | Không perma-control boss hoặc ép mọi main route phải stage III |

### Task13 stage `phuong_s1` — Phượng Sơ Diệm

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Học cơ thể có cánh và đặt nhiệt an toàn |
| Anatomical changes | Thân chim ngà gọn, cánh ngắn tương đối, mào/mỏ continuity reference |
| Silhouette changes | Ngực ngà, cánh vàng và đuôi crimson ít dải; không đổi palette được duyệt |
| Movement development | Nhảy/lướt và dùng luồng thấp; chưa bảo đảm full flight |
| Combat development | Móng/cánh gần và đạn Hỏa có ngắm, không tự rebirth |
| Environmental abilities | Cảm nguồn nhiệt và receiver đơn, chưa tự tái kích hoạt volcano |
| Memory relationship | Ký ức rút sự sống về mầm giữ góc nhìn nhiệt, không chứng minh Phoenix bất tử |
| Production requirements | AG-P1: approve stage-reference mapping; hop/glide/charge/release/landing/hurt, stage clips missing |
| Balance risks | Hỏa không miễn lava, memory không auto revive; atlas hiện tại không stage I đã được gán |

### Task13 stage `phuong_s2` — Phượng Dực Nhật

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Tự do bay đi cùng trách nhiệm có đường đáp/xả |
| Anatomical changes | Vai/ngực và lông sơ cấp phát triển, đuôi thêm dải có khoảng âm |
| Silhouette changes | Sải/lớp lông và đuôi chảy khác tỷ lệ stage I, thân ngà vẫn là điểm neo |
| Movement development | Lượn thermal/bank/hạ đáp với khoảng nhiệt và landing hợp lệ |
| Combat development | Vùng nhiệt hỗ trợ đường rút và kỹ thuật Hỏa phức tạp hơn |
| Environmental abilities | Thu/xả nhiệt trong tolerance, dùng updraft có source thật |
| Memory relationship | Nhớ hạ tải và giữ một nơi trú; fragment không thay toàn heat-network proof |
| Production requirements | AG-P2: stage anatomy approval, glide/bank/landing/S2/contact and interrupt clips |
| Balance risks | Không shield cứng cộng reserve hoặc free heat-resource loop |

### Task13 stage `phuong_s3` — Phượng Hoàng Nhật Diệm Nguyên Sơ

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Điều phối chu kỳ nhiệt và đổi mới có kiểm soát |
| Anatomical changes | Cánh phân tầng hoàn chỉnh, trục ngực–vai cân với đuôi dài nhiều dải |
| Silhouette changes | Firebird uy nghi ivory/gold/crimson, khoảng âm cánh/đuôi rõ; không rarity Legend rule |
| Movement development | Chọn tầng thermal và đường đáp nâng cao; bão vẫn có giới hạn đọc được |
| Combat development | Đường bùng Hỏa và cơ động không trung có anticipation/recovery |
| Environmental abilities | Phối hợp cụm địa nhiệt với nước/đường xả, không full-island lava |
| Memory relationship | Đối chiếu lựa chọn đổi mới với tổn thất cục bộ, không lộ nguồn gốc Tinh Linh |
| Production requirements | AG-P3: reference mapping chưa chốt; full-spread/turn/S3/recovery và bounds đủ cánh/đuôi |
| Balance risks | Không auto-resurrection, maximum AoE đồng thời safe defense, hoặc crop 96px mất anatomy |

### Task13 stage `long_s1` — Long Sơ Phong

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Nối dấu thức đủ liên tục, học đọc một đường khí |
| Anatomical changes | Thân đã dài với cổ/ngực/eo/đuôi phân đoạn, bốn chân móng, mầm sừng/bờm |
| Silhouette changes | S dài nhẹ, head/horns/claws/mane/tail nhận ra; không giun ngắn |
| Movement development | Lượn theo luồng cục bộ và turn có nhịp, không free-flight xuyên level |
| Combat development | Cắt gió định hướng, lane kéo/đẩy có source và window |
| Environmental abilities | Cảm hướng nút khí và chỗ trú, acquisition không cần trứng |
| Memory relationship | Imprint rải nút khí là evidence giới hạn, không toàn tri mọi cơn bão |
| Production requirements | AG-L1: thiếu reference; body-axis/curve/turn/basic/lane clips và anchors |
| Balance risks | Không dùng clouds che mất chân hoặc coi radius core là clearance toàn thân |

### Task13 stage `long_s2` — Long Vân Hành

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Từ đi theo luồng sang chọn hướng có trách nhiệm |
| Anatomical changes | Cổ/eo dài tương đối, ngực/chi chịu lực, sừng và bờm tách cụm |
| Silhouette changes | Đường S sâu, khối cổ–ngực và khoảng âm khác stage I |
| Movement development | Đổi lane/hãm ở nút khí, maneuver tốt hơn nhưng cần turn space |
| Combat development | Lệch projectile tagged trong sector với budget; không cancel mọi đòn |
| Environmental abilities | Chỉnh nhánh qua timing/hướng áp, source/đường thoát rõ |
| Memory relationship | Các mảnh giữ/đẩy dòng được đối chiếu với kiến trúc, chưa kết luận toàn catastrophe |
| Production requirements | AG-L2: neck/limb continuity, curve-turn/brake/S2 clips, body sweep và source markers |
| Balance risks | Không infinite redirect, tăng reach miễn phí theo mọi đoạn thân hoặc immunity bão |

### Task13 stage `long_s3` — Long Thiên Phong Nguyên Sơ

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Phối hợp mạng khí để giữ đường đi thay độc quyền bầu trời |
| Anatomical changes | Thân dài phân bố khối có hai nhịp uốn, bờm/sừng/đuôi hoàn chỉnh |
| Silhouette changes | Rồng trời dài xuyên mây với các đoạn thân lộ nối được bằng mắt |
| Movement development | Điều chỉnh chuỗi hướng/áp trong authored corridor, không tốc độ vô hạn |
| Combat development | Hành lang gió/vùng ép nâng cao, counterplay và control recovery |
| Environmental abilities | Nối cụm khí và định tuyến qua rào bão được author, không global weather reset |
| Memory relationship | Tăng hiểu trách nhiệm liên kết nhưng origin/cosmic culprit vẫn chưa tiết lộ đầy đủ |
| Production requirements | AG-L3: atlas dài hoặc reusable segment solution chưa chọn; cloud FX tách, turn/S3/clearance |
| Balance risks | Không perma-juggle boss, worm silhouette hoặc khẳng định engine đã hỗ trợ segmented body |

### Task13 stage `ly_s1` — Ly Sơ Mầm

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Học quan sát sự sống và giới hạn của năng lượng |
| Anatomical changes | Guardian bốn chi linh hoạt, ngực rõ, gạc cành ngắn phân đôi, đuôi chồi |
| Silhouette changes | Thấp gọn nhưng khác hươu thường; face và chân còn rõ trước foliage |
| Movement development | Chạy/nhảy ngắn, chạm điểm thực vật còn viable |
| Combat development | Cành quét gần và rễ định hướng, support ban đầu không universal heal |
| Environmental abilities | Cảm nút sống, tăng trưởng nhỏ có nguồn/đối tác |
| Memory relationship | Mảnh ký ức giữ refuge không là lời giải sinh thái duy nhất |
| Production requirements | AG-Y1: thiếu reference; run/leap/plant-contact/basic/hurt/transform, antler envelope |
| Balance risks | Không tái tạo corpse/biomass/mana, hoặc every Wood = healer |

### Task13 stage `ly_s2` — Ly Kết Diệp

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Hiểu quan hệ qua nhiều đối tác và vật mang sống |
| Anatomical changes | Vai/cổ/collar, chi trước chịu lực và chân sau bật, gạc/đuôi dài theo cấu trúc |
| Silhouette changes | Collar/gạc phân cụm và đuôi tạo đường đọc khác stage I |
| Movement development | Bật qua điểm bám thực vật được author, không tạo platform vô hạn |
| Combat development | Vùng hồi phục có điều kiện/lộ thân, kiểm soát rễ giữ finite budget |
| Environmental abilities | Nối rễ/đối tác qua nền có nước và điều kiện sống phù hợp |
| Memory relationship | Ký ức cho thấy một cách bảo vệ có thể gây mất cân bằng nơi khác |
| Production requirements | AG-Y2: stage anatomy, plant anticipation/contact, channel/interrupt/S2/hurt, marker và sweep |
| Balance risks | Không heal reserve/HP0, hoặc switch vòng để giữ cả ba dạng miễn phí |

### Task13 stage `ly_s3` — Ly Vạn Sinh Nguyên Sơ

| Field | Proposed specification |
| --- | --- |
| Narrative purpose | Điều phối phục hồi đa dạng, tôn trọng hệ đã thích nghi |
| Anatomical changes | Nhánh nối gạc–cổ–lưng, vòm gạc có khoảng âm, chi chịu tải và hông nhảy cân |
| Silhouette changes | Hộ vệ cổ ngà/emerald/vàng, organic network đọc rõ, không phóng to hươu |
| Movement development | Nối nhịp qua cụm cây đã hồi phục, không tự bay |
| Combat development | Mạng Mộc có thể phá/ngắt và support nâng cao, không bất tử |
| Environmental abilities | Nối nhiều quan hệ sống còn viable, Life authority có vật chất/đối tác và giới hạn |
| Memory relationship | Đối chiếu I–III để hiểu liên đới; optional lore không bắt hoàn hết, complete origin còn mở |
| Production requirements | AG-Y3: branching continuity, antler/turn/landing/S3 clips và body/FX separate, safe placement |
| Balance risks | Không unrestricted resurrection hoặc xóa adapted organisms để công nhận “phục hồi” |
