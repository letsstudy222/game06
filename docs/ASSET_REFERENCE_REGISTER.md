# Đăng ký tham chiếu và tài nguyên

Kiểm kê checkout tại commit `6b502c0`, ngày 30/10/2026. Chỉ tệp thực sự có trong repository được ghi là có thể truy cập. Task 01 không tạo/sửa art. Tên linh thú và vai trò từ đề bài không đồng nghĩa artwork đã có.

## Quy ước trạng thái

- **Concept/reference:** hướng hình dáng; không dùng như atlas đã kiểm định.
- **Approved design:** chỉ ghi duyệt khi có xác nhận; duyệt hình không đồng nghĩa duyệt clip animation.
- **Runtime sprite:** có ảnh, frame/anchor/metadata và đang được code tải; chưa mặc định đạt toàn bộ tiêu chí sản xuất.
- **Tested animation:** chỉ nhận theo từng clip/hướng được thử; không suy từ số hàng trên concept sheet.
- **Missing:** chưa tìm thấy trong checkout; không khẳng định người dùng không có ở nơi khác.

## Tứ Linh

| Sinh vật | Vùng/chương và vai trò | Đường dẫn có thể truy cập | Concept / thiết kế được duyệt | Sprite / animation | Thiếu và lưu ý |
| --- | --- | --- | --- | --- | --- |
| Quy Hải Uyên | I — Vực Hải Uyên; Thủy, dạng mở đầu, bảo tồn/ký ức/phòng thủ và traversal dưới nước | **Missing** — chưa có tệp nhận diện được | Đề bài nói tham chiếu tồn tại; chưa được cung cấp trong checkout để xem hay xác minh duyệt | Missing; không tuyên bố có sheet/clip | Cần tham chiếu gốc, trạng thái duyệt, silhouette/hướng/scale/anchors và spec clip trước sản xuất; không tự tạo hình thay thế |
| Phượng Hoàng Nhật Diệm | II — Đảo Nhật Diệm; Hỏa, tái sinh/nhiệt. Hiện là avatar prototype Đảo Bình Minh | [Tham chiếu](../assets/phoenix-3-v2.png); [runtime atlas](../assets/production/phoenix/atlas.png); [metadata](../assets/production/manifest.json); [master](../assets/production/phoenix/master.png) | Reference đã xem trực tiếp trong Task 01: thân ngà, cánh vàng, đuôi đỏ; thiết kế Phoenix hiện hữu phải bảo tồn theo yêu cầu người dùng. Không chứng nhận pháp lý từ ảnh | Atlas runtime 192×288, ô 96, 2 pose × 3 hướng; phải mirror hướng phải. Runtime có idle/move/fly/attack/fire/hurt; không phải sáu bộ clip vẽ tay độc lập | Cần thêm/duyệt anticipation/contact/recovery và clip riêng nếu yêu cầu production đầy đủ. Kiểm thử hành vi trước đây không chứng minh clip mới hoặc frame chưa có |
| Long Thiên Phong | III — Thiên Đảo Phong Vân; Phong, chuyển động/cân bằng khí quyển | **Missing** — chưa có tệp nhận diện được | Có tên/tham chiếu theo đề bài, chưa xem được file | Missing | Cần hình gốc, mức duyệt, sinh học và spec bay/dòng khí; không tự bổ sung hình canon |
| Ly Vạn Sinh | IV — Tiên Cảnh Vạn Sinh (tên chốt ở Task 02), thiên đường cổ đổ nát; Mộc và quyền năng Sinh Mệnh, quan hệ sinh thái | **Missing** — chưa có tệp nhận diện được | Có tên/tham chiếu theo đề bài, chưa xem được file | Missing | Cần hình gốc và spec; không suy ngoại hình từ tên hoặc tự đặt thêm loài thay thế |

Các Phoenix khác còn tồn tại: `assets/phoenix-1.png`, `assets/phoenix-2-v2.png`, `assets/sprites/phoenix-*.png` và JSON liên quan. Đây là tài liệu/biến thể lịch sử; chưa kiểm duyệt lại từng ảnh trong Task 01 và không tự thay runtime bằng chúng. Nguồn lịch sử: [art-provenance.md](art-provenance.md). Concept sheet có hàng động tác vẫn phải tách/kiểm tra frame, alpha, bounds, gutter, anchor, hướng và timing riêng.

## Môi trường và tài nguyên khác

| Nhóm | Tệp / trạng thái | Quy tắc bảo tồn và hạn chế |
| --- | --- | --- |
| Môi trường Dawn chính | [manifest](../assets/environments/dawn/manifest.json), terrain/objects/shadows PNG cùng thư mục; 183 terrain frame, 18 prop ID | Áp dụng art mẫu được người dùng duyệt ở nhiệm vụ trước; không đổi hướng art ở Task 01. Con số frame gồm mask/animation, không phải số vật liệu độc lập |
| Mẫu đối chiếu | `assets/samples/dawn/manifest.json`, `terrain.png`, `objects.png`, `shadows.png`, `palette.json`, `objects.json`; `masters/` chứa foliage-stone/structure/materials | Giữ bản mẫu riêng; master/concept khác runtime. Palette 64 màu, bóng alpha 0/48/90; không suy đây là kit mọi biome |
| Prototype/historical environment | `assets/tiles/dawn/`, `assets/production/dawn/` | Giữ file và provenance; không dùng nền minh họa whole-world cũ làm nền sản xuất mới |
| Art lịch sử nông trại | `assets/an-gardener.png`, `assets/farmer-walk.png`, `assets/garden-detailed.png`, `legacy/` | Không biến thành nhân vật/chức năng canon mới, không xóa trong task tài liệu |
| Font | `assets/fonts/VT323-Regular.ttf`, `VT323-OFL.txt` | Có file license kèm theo; giữ provenance |
| Ảnh gameplay và QA cũ | `artifacts/dawn-*.png`, `artifacts/ui-after/`, `artifacts/sample/`, `artifacts/dawn-environment-qa.json` | Bằng chứng lần chạy trước, không phải concept, không phải kết quả mới Task 01 |
| Art Vực Hải Uyên, bộ Quy, Long, Ly và các sinh vật tiếp theo | Missing trong checkout theo mục đích nhận diện | Chỉ ghi thiếu, chờ cung cấp dần; không generate ảnh hoặc coi Dawn là art dưới nước đã hoàn thành |

## Hợp đồng asset cho nhiệm vụ sau

Mỗi asset cần định danh, chủ sở hữu/provenance và điều kiện sử dụng, chapter/role, reference được duyệt, source và export riêng, palette/scale/hướng sáng, alpha, frame rect, origin, bounds, footprint collision và trạng thái clip theo hướng. Tile chuẩn 32×32 hiện có; props/sinh vật nhiều ô được phép nếu nhất quán mật độ pixel và không che hành động. Dùng nearest-neighbor khi scale.

Kiểm tra kỹ thuật phải đọc file thật, kiểm tra gutter/alpha, khớp metadata và chơi thử animation trong tình huống di chuyển/combat. Báo riêng phần nào được xem, phần nào chỉ có metadata, phần nào đã thử runtime. Không nhận “production-ready animation” chỉ vì có PNG hoặc art đã duyệt. Không sao chép proprietary character/visual/music/layout/UI; tham khảo nguyên lý chung không chuyển thành quyền dùng asset.

## Kiểm kê bổ sung Task 04

Đã xem lại trực tiếp `assets/phoenix-3-v2.png` và `assets/production/phoenix/atlas.png`, đọc manifest/timing/pose selection. Chưa có ảnh Quy/Long/Ly nhận diện được trong checkout; các direction text Task 04 (Long dài xuyên mây, Ly guardian, Quy rùa nước cổ) được xác nhận bằng chỉ dẫn người dùng, không giả đã xem ảnh. [Register 12 stage và clip còn thiếu](creatures/SACRED_ART_REQUIREMENTS.md) là nguồn gap hiện tại; Phoenix reference có sẵn chưa đồng nghĩa bộ ba stage/clip đã được phân loại và nghiệm thu. Không tạo hoặc đổi tài nguyên trong Task 04.

## Task 06 — template không là artwork/species đã duyệt

[Asset-gap FG01–FG06](factions/TASK06_CONSISTENCY_AUDIT.md) ghi yêu cầu nguồn sinh học/habitat, silhouette, direction/anchor/telegraph/timing/playback và các dependencies chưa có. Task06 không tạo/thay/sửa art hoặc nhận đã xem enemy/faction ảnh chưa tồn tại. Chín archetype là templates, không chín sinh vật đã có sprite. Reference Tứ Linh đã duyệt giữ nguyên; không concept sheet nào được tự nhận là production animation.


## Task07 — environment state presentation gaps

[Presentation contract](world/ENVIRONMENT_STATE_PRESENTATION.md) cần base geography/conditional layers, receiver/bridge/vent/wind/root states, collision/nav anchors, readable cues và audio/lighting profiles cho bốn vùng. Chưa có các bộ production được xác minh cho toàn bốn chương; Dawn hiện hữu không tự đáp ứng. Không tạo/đổi hoặc xem lại ảnh/animation mới trong Task07; đây là handoff và ghi thiếu, không xác nhận assets sẵn sàng.


## Task08 — Asset readiness audit (nguồn tương đương ASSET_READINESS_REGISTER)

Baseline `7125160`. Tài liệu này nhận thêm trách nhiệm readiness, không tạo `ASSET_READINESS_REGISTER.md` trùng nguồn. Các sections Task01/04/06/07 ở trên giữ evidence theo mốc. Task08 xem trực tiếp đúng bốn ảnh: `assets/phoenix-3-v2.png`, `assets/production/phoenix/atlas.png`, `assets/environments/dawn/terrain.png`, `assets/environments/dawn/objects.png`. Các ảnh còn lại được inventory/header/metadata, không nhận đã review visual hay playback tất cả.

### Classification và mức chứng cứ

| Classification | Nghĩa / evidence cần | Task08 disposition |
| --- | --- | --- |
| Approved visual reference | User chỉ định giữ identity + actual accessible file | Phoenix phoenix-3-v2.png; Quy/Long/Ly chỉ có approved text direction, không ảnh được thấy |
| Unreviewed concept | Có source illustration/master/history nhưng chưa review ảnh ở Task08 | Reference variants/masters trong inventory; không tự promote vì filename có production |
| Production-ready sprite | Frame/alpha/anchor/bounds hợp lệ cho **scope action cụ thể** và art review | Existing Phoenix two-pose sprite technically usable cho baseline Dawn; không full action/stage production certification |
| Validated animation atlas | Phải tách structural validation và action/direction/timing playback | Phoenix cấu trúc PASS, timing/render mapping có source; không fresh browser playback Task08, không đủ full attack/fire/hurt clips hoặc 12 stage sets |
| Environment tile asset | Actual tile/props/anchors, source grid/collision/use và checks | Dawn/sample/legacy tile sets có manifest, current Dawn đã xem và tests PASS; không underwater biome kit |
| Missing | Không có resource nhận diện/được chỉ định trong checkout | Quy/Long/Ly refs/clips; underwater sample/state art; new bosses/NPCs/creatures, story scenes/effects/SFX |
| Unverified | File có nhưng purpose/approval/clip compatibility chưa được chứng minh | Legacy sheets, variants/masters không tự thay runtime; licenses/provenance completeness cần review riêng |

**Test thực chạy Task08:** `npm test` — 19 island + 5 UI + 6 sample = 30 PASS, không skipped. Bao gồm alpha/gutters/palette/anchors/route baseline; không tests cho future forms/resonance/world save. Python/Pillow đọc PNG/manifest read-only: Phoenix192×288/alpha 0 hoặc255/sáu bounds/row directions; dimensions terrain đúng metadata, prop rects nằm trong ảnh cho Dawn/sample/legacy manifests. Không write/normalize/re-export ảnh.

Current Dawn:183 terrain definitions,18 props, tile32, palette64; sample:183 definitions,12 props; legacy tiles:72 definitions,13 props. PNG color type6 là RGBA format, tự nó không chứng minh mọi pixel alpha đúng; alpha assertion riêng áp Phoenix/current unit tests. Fresh playback, full anatomy consistency across action clips và physical-device review chưa chạy Task08.

### Accessible PNG inventory — classification theo phạm vi

| Actual file | Dimensions | Classification / review limit |
| --- | --- | --- |
| [assets/an-gardener.png](../assets/an-gardener.png) | 1254×1254 | Unreviewed concept/reference variant trong Task08; không approval mới hoặc validated animation |
| [assets/environments/dawn/objects.png](../assets/environments/dawn/objects.png) | 384×480 | Environment tile/prop/shadow asset; terrain/objects xem trực tiếp, shadow metadata + tests |
| [assets/environments/dawn/shadows.png](../assets/environments/dawn/shadows.png) | 512×640 | Environment tile/prop/shadow asset; terrain/objects xem trực tiếp, shadow metadata + tests |
| [assets/environments/dawn/terrain.png](../assets/environments/dawn/terrain.png) | 256×736 | Environment tile/prop/shadow asset; terrain/objects xem trực tiếp, shadow metadata + tests |
| [assets/farmer-walk.png](../assets/farmer-walk.png) | 1254×1254 | Unreviewed concept/reference variant trong Task08; không approval mới hoặc validated animation |
| [assets/garden-detailed.png](../assets/garden-detailed.png) | 1536×1024 | Unreviewed concept/reference variant trong Task08; không approval mới hoặc validated animation |
| [assets/phoenix-1.png](../assets/phoenix-1.png) | 1254×1254 | Unreviewed concept/reference variant trong Task08; không approval mới hoặc validated animation |
| [assets/phoenix-2-v2.png](../assets/phoenix-2-v2.png) | 1254×1254 | Unreviewed concept/reference variant trong Task08; không approval mới hoặc validated animation |
| [assets/phoenix-3-v2.png](../assets/phoenix-3-v2.png) | 1254×1254 | Approved visual reference — xem trực tiếp, không atlas |
| [assets/production/dawn/props-master.png](../assets/production/dawn/props-master.png) | 1024×1536 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/production/dawn/props.png](../assets/production/dawn/props.png) | 192×288 | Unverified cho production hiện tại; historical normalized export, không current base map |
| [assets/production/dawn/world-master.png](../assets/production/dawn/world-master.png) | 1536×1024 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/production/dawn/world.png](../assets/production/dawn/world.png) | 960×640 | Unverified cho production hiện tại; historical normalized export, không current base map |
| [assets/production/phoenix/atlas.png](../assets/production/phoenix/atlas.png) | 192×288 | Production sprite baseline; atlas cấu trúc PASS, full animation production chưa verified |
| [assets/production/phoenix/master.png](../assets/production/phoenix/master.png) | 1024×1536 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/samples/dawn/masters/foliage-stone.png](../assets/samples/dawn/masters/foliage-stone.png) | 1024×1536 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/samples/dawn/masters/materials.png](../assets/samples/dawn/masters/materials.png) | 1024×1536 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/samples/dawn/masters/structure.png](../assets/samples/dawn/masters/structure.png) | 1024×1536 | Unreviewed concept/master trong Task08; provenance lịch sử không là animation validation |
| [assets/samples/dawn/materials.png](../assets/samples/dawn/materials.png) | 96×64 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |
| [assets/samples/dawn/objects.png](../assets/samples/dawn/objects.png) | 384×288 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |
| [assets/samples/dawn/shadows.png](../assets/samples/dawn/shadows.png) | 512×384 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |
| [assets/samples/dawn/terrain.png](../assets/samples/dawn/terrain.png) | 256×736 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |
| [assets/sprites/phoenix-1.png](../assets/sprites/phoenix-1.png) | 128×96 | Unverified legacy sprite/concept sheet; metadata có thể 32px, không runtime96px replacement |
| [assets/sprites/phoenix-2.png](../assets/sprites/phoenix-2.png) | 128×96 | Unverified legacy sprite/concept sheet; metadata có thể 32px, không runtime96px replacement |
| [assets/sprites/phoenix-legend.png](../assets/sprites/phoenix-legend.png) | 128×96 | Unverified legacy sprite/concept sheet; metadata có thể 32px, không runtime96px replacement |
| [assets/sprites/phoenix-player.png](../assets/sprites/phoenix-player.png) | 128×160 | Unverified legacy sprite/concept sheet; metadata có thể 32px, không runtime96px replacement |
| [assets/sprites/ui-icons.png](../assets/sprites/ui-icons.png) | 400×16 | Unverified legacy sprite/concept sheet; metadata có thể 32px, không runtime96px replacement |
| [assets/tiles/dawn/objects.png](../assets/tiles/dawn/objects.png) | 384×384 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |
| [assets/tiles/dawn/terrain.png](../assets/tiles/dawn/terrain.png) | 256×288 | Environment tile/prop asset có manifest/tests; không review mọi ảnh trực tiếp |

SVG/favicon và font/VT323-OFL nằm trong build assets, không creature/reference/animation; giữ license file thực. Screenshots trong `artifacts/` là QA lịch sử, không source sprites hoặc bằng chứng task08 đã chạy browser mới. Legacy farm art không là NPC/feature mới được approved.

### Naming / compatibility risks và gaps trước production

| Gap / risk | Evidence / phạm vi | Required next evidence |
| --- | --- | --- |
| AR08-01 Quy I/underwater | Không ảnh Quy/underwater kit nhận diện được; AG-Q1 và SG01–02 còn mở | Approved reference/model sheet + swim/dive/basic/hurt/transform/action frames, anchors/timing/clearance, underwater tiles/receiver |
| AR08-02 Long/Ly và evolved sets | Text direction có; ảnh/model/production clips không có; 12 AG records | Elongated dragon/guardian silhouette và anatomy qua stage, envelope/collision/clip playback |
| AR08-03 Phoenix action/stage | 2 poses×3 rows, mirror right; controller 6 states×4 timeline indices nhưng renderer remap | Stage mapping approved; dedicated anticipation/contact/recovery hoặc fallback được duyệt, no Legend=III |
| AR08-04 Manifest/source naming | production/manifest environment còn world/props cũ; current dawn manifest khác. AssetLoader/renderer đọc per-island | Trace actual loader; generic adapter kế tiếp phân catalog/reference/runtime, không rename asset trong audit |
| AR08-05 32px legacy vs96px runtime | sprites/phoenix-player.json và phoenix-legend.json khác current directions manifest | Không dùng legacy row schema thay atlas mới; validate dimensions/anchors/timing per clip |
| AR08-06 Effects/audio/memory/NPC/boss | Baseline skill FX procedural; chưa bộ FX/SFX/scene/character resources cho proposed content | Scope skill/telegraph/environment change cần file hay procedural effect phải declared; audio production missing, không fabricate paths |
| AR08-07 Tiles/state layers/lighting | Dawn coastline water tiles không chứng minh underwater traversal/art package | Base/conditional layers, collision masks, refuges/safe anchors/return, four regions trình bày theo W07 |
| AR08-08 Rights/originality | provenance lịch sử có, user reference không là chứng nhận quyền tuyệt đối | Review source/license cho tài nguyên phát hành; không claim absolute originality hoặc tạo third-party substitute |

Không sửa art để “chữa” các gaps trong Task08. Production approval và kỹ thuật validation là hai gate riêng; một file nằm trong production/ không tự đáp ứng cả hai. [IMPLEMENTATION_READINESS](IMPLEMENTATION_READINESS.md) giữ gate Quy/blockers và [HANDOFF](PHASE_I_HANDOFF.md) chỉ nguồn cần đọc.


## Task12 — creature asset readiness frame work (PROPOSED B12-P10)

Requested `docs/art/CREATURE_ASSET_READINESS.md` được đáp ứng ở nguồn này, không tạo authoritative register cạnh tranh. [Bible](creatures/CREATURE_DESIGN_BIBLE.md), [roster](creatures/CREATURE_ROSTER_REGISTER.md) và [animation standard](art/CREATURE_ANIMATION_REQUIREMENTS.md) dẫn cùng evidence. Mọi check mới ở 31/10/2026 Asia/Saigon, baseline `b610b56`, **read-only**.

### Ten evidence gates, không một progress bar tự đã duyệt

| Gate / conceptual level | Evidence cần | Không suy |
| --- | --- | --- |
| idea_only | Có brief/nguồn/tham chiếu key | Name không là đã duyệt species hoặc art file |
| written_design | Anatomy/sinh thái/kit/template có nguồn/status | Document hoàn tất không là creative approval |
| concept_sheet_created | Actual file truy cập, content/version/provenance | Multiple poses không frames/atlas |
| concept_visually_approved | Explicit phê duyệt nguồn/revision/scope | Approved reference không action clip/readiness |
| sprite_production_started | Actual export/nguồn và scope frames/action list | Filename production không validated |
| sprite_frames_validated | Dimensions/alpha/rect/anchor/giải phẫu/orientation checks cho frames cụ thể | Frame check không timing/playback phê duyệt |
| animation_atlas_validated | Frame refs/timing/action markers/directions + playback evidence được scope rõ | PartialstructuralPASS không full action certification |
| integrated_in_runtime | Loader/render/action dùng asset trong actual code/config | Source integration không fresh game playtest |
| gameplay_tested | Clip/action/geometry/interrupt/status/context test evidence, platform/version rõ | Baseline tests cũ không future features pass |
| production_approved | Art/gameplay/technical acceptance đủ scope và explicit release phê duyệt | Không sốgate hoặc total score tự cấp phê duyệt |

Lưu evidence theo từng stage/action/direction/revision và lĩnh vực; legacy runtime có thể integrated dù full animation gate chưa đủ. Không backfill còn thiếu gates bằng suy luận hoặc downgrade/xóa runtime hiện tại. Approval và technical validation là hai trục; dòng production status là projection từ evidence/phê duyệt records, không authoritative boolean độc lập. Missing/chưa xác minh khác bị bác.

### Evidence mới thực sự đã kiểm Task12

| Resource / nguồn | Thao tác và kết quả | Scope limit |
| --- | --- | --- |
| [Phoenix tham chiếu](../assets/phoenix-3-v2.png) | Mở xem trực tiếp: ivory/cream cơ thể, gold/orange/crimson lông vũ, cánh/flowingtail identity | Reference illustration, không crisp runtime frames hoặc 3 stage phê duyệt |
| [Phoenix atlas](../assets/production/phoenix/atlas.png) | Mở xem trực tiếp và đọc PNG/alpha/bounds read-only:192×288,96 cell,2 poses×3 rows, alpha 0/255;6 alpha bounding boxes khớp manifest | Static structure PASS, chưa fresh playback/action certification, không full 12 sets |
| [Manifest](../assets/production/manifest.json) | Đọc phoenix image/directions/origins/bounds; down origin 48,72/left 45,72/up 48,52; rightmirrorsleft | Environment section của manifest này là historical, không thay current Dawn manifest |
| [AnimationController](../src/island/AnimationController.mjs), [IslandScene](../src/island/IslandScene.mjs), [PlayerPhoenix](../src/island/PlayerPhoenix.mjs), [GameState](../src/island/GameState.mjs) | Source inspection:6 states, renderer chọn 2 poses/direction, GameState tạo Player Phoenix | Actual runtime avatar chỉ Phoenix, chưa generic creature catalog/resonance/progression/loadout; không fresh game playtest |
| [Legacy player metadata](../assets/sprites/phoenix-player.json), [Legend metadata](../assets/sprites/phoenix-legend.json) | Đọc 32 px metadata, khác 96 px actual atlas; không load như substitute | Không mở mọi legacy image/phê duyệt/playback, Legend không rarity/evolution proof |
| [Dawn manifest](../assets/environments/dawn/manifest.json), [sample](../assets/samples/dawn/manifest.json), DawnMap nguồn | Read-only metadata/nguồn cho tile 32; dimension conventions giữ | Không kiểm/nhận underwater kit hoặc all region assets mới |

### Production quality contract và gaps

Frame dimensions theo đã duyệt cơ thể/pose, rect in bounds/gutter/no bleed; alpha phù hợp cơ thể/FX, orientation/mirroring explicit; per frame anchor/offset ổn định; anatomy consistent qua hướng/stages; timing/loop/phase/interrupt markers; actual manifest/version/ref re so lv es; core footprint/hurtbox/attackbox/visual envelope alignment **proposalC04-P07** cần prototype; runtime playback và actual scene contrast/culling/clearance; provenance/license/nguồn/approver scope đầy đủ. Không file nào được legalcertify từ filename hoặc image view.

Quy/Long/Ly: đã duyệt text direction nhưng chưa có ảnh nhận diện được/production clips trong repo.12 stage gaps AG-Q1–AG-Y3 tại [C04 register](creatures/SACRED_ART_REQUIREMENTS.md) vẫn authority. Eight secondary +12 thông thường names external chưa xác minh;4IV redesign briefs chưa art work; batch IV cũ bị bác theo Task12 không có ảnh/IDs xác minh. Missing fx/audio/action frames/anchors/asymmetric directions/capability modules cho new roster ghi gap, không invent export paths. ExistingPhoenix mapping từng stage chưa được duyệt, integrated runtime không đồng nghĩa đủ 3 forms. Existing licenses/provenance cần scope audit sau, không claim absolute originality.
