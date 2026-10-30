# Creature Design Bible

**Task12 — PROPOSED:** tiêu chuẩn thiết kế/sản xuất để đánh giá, không gameplay hoặc asset đã hoàn thành. Baseline `b610b56`, ngày 31/10/2026 Asia/Saigon. [Decisions](TASK12_DECISIONS.md) phân biệt CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED.

## 1. Triết lý và nguồn authority — B12-P01

Một loài có **một ý niệm chủ đạo** nối giải phẫu → cách sống → vận động → quyết định gameplay → silhouette/animation. Brief phải mô tả vì sao cấu trúc tồn tại, không “con vật + màu hệ”. Kiểm bỏ FX/màu vẫn đọc được species và hướng hành động. Sự riêng biệt là kết quả đánh giá, không tuyên bố độc đáo tuyệt đối hoặc quyền pháp lý từ một bản mô tả.

[PROJECT_DECISIONS](../PROJECT_DECISIONS.md) thắng synthesis; CONFIRMED dựa nguồn phê duyệt/evidence, PROPOSED chưa được duyệt, UNRESOLVED thiếu lựa chọn, SUPERSEDED chỉ accepted decision bị later phê duyệt thay. User cho tự thực hiện task không duyệt toàn bản ý tưởng mới. [GDD](../GAME_DESIGN_DOCUMENT.md), [K11 axes](CREATURE_CLASSIFICATION_OVERVIEW.md), [E09](../elements/ELEMENTAL_SYSTEM_OVERVIEW.md), [E10](../elements/DUAL_ELEMENT_OVERVIEW.md) giữ nền, không copy formulas/roster.

## 2. Sacred baseline và 12 forms

| Species confirmed | Identity phải giữ | Visual hierarchy | Stage accounting |
| --- | --- | --- | --- |
| Quy Hải Uyên / water | Rùa nước cổ, phòng ngự và điều tiết dòng, mai và chi thích nghi nước | Không sao mẫu rắn quấn; loài có vỏ thường phải khác khối thân/dáng đi | `quy_s1`, `quy_s2`, `quy_s3` |
| Phượng Hoàng Nhật Diệm / fire | Thân ngà/kem, cánh vàng và đuôi đỏ chảy, bay theo luồng nhiệt | Giữ tham chiếu đã duyệt; chim thường không là Phượng thu nhỏ | `phuong_s1`, `phuong_s2`, `phuong_s3` |
| Long Thiên Phong / wind | Rồng phương Đông thân dài, đầu/sừng/móng/bờm/đuôi rõ, uốn S xuyên mây | Không thân ngắn/giun; mây không dùng để giấu giải phẫu thiếu | `long_s1`, `long_s2`, `long_s3` |
| Ly Vạn Sinh / wood + life authority | Hộ vệ rừng có cấu trúc thực vật, sinh trưởng và liên đới sinh thái | Wildlife không sao hươu cây; Life không thành nguyên tố combat | `ly_s1`, `ly_s2`, `ly_s3` |

Stage IDs/tên/deltas vẫn PROPOSED C04; **số 3 mỗi Sacred CONFIRMED**. [SACRED_EVOLUTION_MATRIX](SACRED_EVOLUTION_MATRIX.md) và [Quy](QUY_HAI_UYEN.md)/[Phượng](PHUONG_HOANG_NHAT_DIEM.md)/[Long](LONG_THIEN_PHONG.md)/[Ly](LY_VAN_SINH.md) giữ chi tiết, không duplicate stage spec. Sacred không invincible/tự thành Legend. Tinh Môn cần 4 networks restored, không 4 equipped hoặc đồng loạt stage III. nguồn gốc Tinh Linh/chronology chưa giải, không tạo lore mới để biện hộ giải phẫu.

## 3. Các trục thiết kế không trộn

Body plan khác rarity/element; affiliation khác skill effect/vật liệu/status; production tier khác rarity/power; ý nghĩa truyện khác chơi được. Dual không fifty-fifty palette, auto Rare hoặc mạnh hơn. Stable adaptation khác forced assimilation; Life không hồi sinh deceased. Species/stage/skin/elemental variant/temp condition/actor khác ID; creatureId=speciesId theo C04, formId progression riêng qua stages.

Species cùng element/role phải khác **cách thực hiện**: timing/nguồn/shape/cách vận động/commitment/utility, không chỉ đổi tên skill. Ví dụ giả thuyết phòng thủ bằng mai brace hướng và radial anchor controller khác nhau dù cùng Water; không cấp skill mới để lấp rarity. Một meaningful chơi được cần ít nhất một distinctive mechanic/niche, kèm cost/limit/counterplay và safe basic fallback; ambient có thể chỉ ecological/observation identity, không full combat kit.

## 4. Anatomy → vận động contract — B12-P04

Mỗi profile below là chuẩn brief đề xuất, không mechanics roster đã duyệt. Body-plan ở [taxonomy](CREATURE_BODY_PLANS.md); collision/hurtbox/visual envelope tách là **PROPOSED C04-P07**, chưa engine support hoặc solution final.

| Movement ID | Anatomy / main method | Acceleration/momentum | Turning | Terrain | Required cycles nếu dùng | Collision implications | Special ability | Limits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `move_swimming` | Đuôi/vây hoặc chi màng tạo lực | Quán tính/chậm hãm theo khối, không số chung | Bank/vây brake khác loài | Current/pressure/biên nước có ngưỡng chịu đựng | Swim/turn/brake/start-stop | Core/envelope dưới nước và clearance | Burst theo dòng có nguồn | Không mọi độ sâu/khô |
| `move_walking` | Chi chịu tải/foot contact | Khởi bước có chuyển trọng tâm | Pivot có bước đỡ | Nền/ledge/độ dốc phù hợp | Idle/step/turn/start-stop | Footprint/shadow ổn định | Brace hoặc bước vượt nhỏ nếu author | Không vách đứng nếu thiếu bám |
| `move_running` | Chu kỳ stride/stance đặc trưng | Tăng tốc/đà có recovery | Turn radius theo giải phẫu | Ground friction/edge có cue | Run/brake/turn/landing nếu có | Không hitbox nhảy tùy pose | Sprint/burst hữu hạn | Không unlimited-speed traversal |
| `move_flying` | Cánh hoặc cấu trúc nâng được giải thích | Takeoff/đà/nhịp cánh có nguồn | Bank/turn envelope | Landing/corridor/ceilings | Takeoff/flight/bank/landing | Visual extent khác mặt nền projection | Altitude/lane change theo profile | Không fly=noclip hoặc every stage full flight |
| `move_gliding` | Bề mặt chịu lift/cân bằng đuôi | Giữ đà/giảm cao, updraft nguồn ngoài | Bank có giới hạn stall/landing cần thiết kế | Thermal/Phong và bãi đáp | Launch/glide/bank/land | Envelope khi mở/gập | Updraft capture nếu đã duyệt | Không ascent vô hạn trong khí yên |
| `move_climbing` | Grip-pad/móng/adhesion có giải phẫu | Bước bám có nhịp | Regrip thay xoay tự do | Surface được author; deferred mechanic | Reach/bám/shift/dismount | Contact anchors/ceiling checks | Climb route optional nếu duyệt | Không main prerequisite mới Task12 |
| `move_crawling` | Chân thấp/foot cơ/tay đỡ | Chuyển lực sát nền | Nhiều điểm đỡ hoặc co thân | Bề mặt phù hợp mai/vỏ/cơ thể | Crawl/turn/retract nếu có | Footprint không chỉ max phần phụ box | Anchor hoặc slip nhỏ theo loài | Không xuyên narrow gap bằng crop |
| `move_slithering` | Body segments/cơ uốn | Wave theo lực đẩy/ma sát | S-curve liên tục không gãy | Bề mặt đủ cơ thể clearance | Wave/start/turn/recover | Whole visible cơ thể clearance, C04 solution pending | Coil/straighten nếu có đã duyệt posture | Không thu cơ thể vào đầu collider để lách |
| `move_burrowing` | Chi/đầu đào/cơ chế nền hợp lý | Đào có trở lực/nhịp | Chỉ authored tuyến | Diggable receivers, deferred mechanic | Dig/enter/undergroundcue/emerge | Exit và blocking volumes explicit | Optional authored tunnel nếu duyệt | Không arbitrary map destruction/main requirement |
| `move_floating` | Buoyancy/màng/nguồn có giới hạn | Drift/pulse có nhịp | Hướng core/edge rõ khi quay | Nước/khí/ruins theo approvedfiction | Float/pulse/turn/stop | Core/contact path; không miễn terrain vì không chân | Pulse reposition với finite nguồn | Không tự bay mọi vùng hoặc ignore collision |
| `move_leaping` | Chi/tendon/compression có điểm đỡ | Compress→launch→đà→landing | Air control limited theo giải phẫu | Landing viable/mép vực báo | Anticipation/launch/air/landing | Arc clearance và ground anchor | Jump gap optional hoặc main cap đã duyệt | Không i-frame jump mặc định |
| `move_current_assisted` | Vây/cánh/bề mặt bám dòng có giải phẫu | Source boost hữu hạn, entry/brake có cue | Turn theo lane/đường xả | Authored dòng/thermal/Phong | Enter/ride/bank/exit | Projected path/envelope/return anchor | Đọc nhịp để đi efficient | Không tạo nguồn vô hạn hoặc auto open chapter |

## 5. Sinh thái và gameplay proof

[Ecology guide](CREATURE_ECOLOGY_GUIDE.md) buộc ghi sinh cảnh/ngưỡng chịu đựng/nguồn food/vận động/behavior/territory/competitors/environment/interactions/world change. Unknown ghi rõ, không bịa food web detailed canon hoặc thêm named vật săn mồi. Species tồn tại không chỉ cung cấp XP. Observation/habitat restoration có thể resonance nếu designatedPlayable/nguồn/compatibility, không universal kill/capture. Rarity không damage multiplier, catch up/thresholds vẫn R03/K11 pending.

## 6. Review species và scope

Brief chính bản ý tưởng → đối chiếu cơ thể diversity và [silhouette rubric](CREATURE_VISUAL_STANDARDS.md) → [similarity đánh giá](CREATURE_SIMILARITY_AUDIT.md) → sinh thái/kit → [production tier](CREATURE_PRODUCTION_TIERS.md) và tham chiếu phê duyệt → [animation contract](../art/CREATURE_ANIMATION_REQUIREMENTS.md) → versioned asset validation → runtime/gameplay QA riêng. [Template](CREATURE_DESIGN_TEMPLATE.md) là đầu vào chung, [roster](CREATURE_ROSTER_REGISTER.md) giữ evidence, [pipeline](../technical/CREATURE_CONTENT_PIPELINE.md) giữ ownership/handovers.

Eight phụ/two stages và approximate ly 16 thông thường/one main form là planning targets, chưa được duyệt roster/count quota. Chương IV batch cũ bị reject theo explicit Task12, không có 4 ảnh được duyệt. Không overwrite đã duyệt art để chữa overlap; propose revision và đánh giá trước sản xuất. First chơi được Quy I nhỏ hơn complete Chapter I; không sản xuất 28 species/44 forms cùng lúc. 12Sacred+16 phụ+16 thông thường=44 là **kịch bản workload nếu targets được chọn**, không 44 đã duyệt assets.

## 7. Expansion và continuity

Thêm regions/native/adapted/boss/species chủ yếu qua definitions/reusable modules, novel mechanics có thể cần code riêng sau. Additional stage cần phê duyệt/gates/assets/migration, không thêm stage Sacred thứ 4 tự động. New element/future planet cần explicit canon/content budget đánh giá, không đưa Earth vào sáu registry hoặc planet chơi được trong cung đầu. Giữ species ID/progression/observation/reward ledger; name change/skin không reset XP. Conditional spawn/alternate habitat trước world patch, route/return rõ, tối đa 3 forms/memberlock/switchwithin và D41 không bắt đủ ba dạng ở đầu game giữ. Các entry/snapshot/recovery/save specifics vẫn UNRESOLVED.
