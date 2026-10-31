# Handoff art môi trường Hải Uyên

**PROPOSED H19-P11**, không tilemap/atlas/ảnh production mới. [Asset register](../ASSET_REFERENCE_REGISTER.md), [W07 presentation](../world/ENVIRONMENT_STATE_PRESENTATION.md), [Quy art spec](QUY_ART_PRODUCTION_SPEC.md) và [B12 visual standard](../creatures/CREATURE_VISUAL_STANDARDS.md) giữ nguồn. Không verified underwater kit/Quy reference đủ production; Dawn art không chứng minh Hải Uyên đã hoàn thành.

Runtime [DawnSample](../../src/island/DawnSample.mjs) dùng tile size32; [WorldLayer](../../src/island/WorldLayer.mjs) đọc tileSize và semantic cells/atlas, culling/draw theo camera. Đây là **baseline kỹ thuật có thật**, không mandate tile size/cell sprite Quy cho chapter production. Cần duyệt density/scale/envelope/renderer trước final dimensions; nearest-neighbor và integer sampling giữ tính pixel. Không concept sheet thành atlas hoặc default mọi sprite96px.

| Zone | Palette/light / background | Terrain/tiles, props và landmarks | Hạt/hazard gameplay cue | Reuse / unique requirements |
| --- | --- | --- | --- | --- |
| A | Xanh sâu/ngọc dịu, vùng sáng sanctuary; lớp xa trừu tượng không route | Đá ghép/vòm, mặt khoáng trung tính, khoảng bơi/cửa, vòm mai | Hạt rất thưa, rãnh đáp có cue tĩnh, không lethal FX | Reuse đá/rãnh; unique vật mang chờ Q05, awakening source không final trứng/lõi |
| B | Ngọc sáng/cát ngà, trụ sáng lệch; nền rạn xa | Cát/rạn viền/nền đá, observation pocket, trụ rạn landmark | Dấu dòng nhẹ, wildlife warning tách scenery | Reuse nền cát/rock; unique silhouette trụ và rạn ít biến thể |
| C | Xám xanh tương phản current lane; vách xa phân tầng | Đá kênh/edges/refuge, chạc dòng, receiver đơn | Nét/lá vector và mép danger đọc khi particle off | Reuse rock/water; unique fork/motion affordance, không noise nước toàn màn |
| D | Olive/ngà, ánh lọt tán, nền khe tảo | Tảo anchor/đá có substrate/cát yên, khoảng âm trong tán | Tảo swing cosmetic, occlusion không che hit/exit | Reuse substrate B; unique vegetation clusters và ambient behavior nếu approved |
| E | Đá tối/ngà, điểm vàng trầm ít; roof/column occlusion | Rãnh cấp/hồi, mảng khắc, outlet, cửa/memory source | Nước theo groove, pressure labels/cue có bản tĩnh | Reuse ruin kit A/G; unique bốn khe, evidence layers và vết sửa |
| F | Xanh sâu/tím xám, landmark sáng đủ đọc; xa tối bounded | Vách sâu/refuge/depth connector, terrain thưa | Pressure/turbulence rìa rõ, không chỉ tối/âm | Reuse đá; unique silhouettes/pressure indicators deferred optional |
| G | Trước bồi nghẽn, sau dòng dịu phân vùng; depth layers không che outlet | Đôi cấp/hồi, refuge edge, branch selector và state variants | Preview flow direction/return, không glow che Quy | Reuse groove/receiver; unique twin outlet và map-change variants đúng collision |
| H | Sáng thềm prep, arena tương phản; room roof không crop thân | Boundary/entry markers, checkpoint landmark, arena ground theo boss task | Warning ngoài threat, telegraph budget cần boss handoff | Reuse ruins; unique boundary/arena landmarks sau moveset spatial needs |
| I | Chuyển xanh nước sang đá ấm/ngà; ánh bờ xa | Sườn biển/connectors/refuge, ngưỡng trồi, return landmark | Current ổn định, nhiệt chỉ clue không hazard mới tự đặt | Reuse water/rock; unique coast blend/arrival anchor, chưa art Chương II đầy đủ |

## Asset families cho Tasks37–40

Đề xuất backlog families trong dải task môi trường đó, **không tự gán tên/nội dung chính thức cho từng số task**: water base/shore/depth transition; rock/current-channel/refuge; luminous reef + sandy seabed; kelp/substrate; ruin blocks/grooves/valve/outlets và closed/open variants; hazard/current/pressure cue set; coast/geothermal blend. Có thể dùng chung edges/corners/overlays và props kit, nhưng landmarks giữ silhouette riêng. F deep kit và nhiều foliage variants làm sau minimum A/B. Không yêu cầu chín palette/tileset độc lập.

Body/FX/scenery tách layers: background không collision, gameplay terrain/receiver/collision variant cùng owner revision, foreground occluder có visibility rule, cosmetic particles tắt được. Static-readable cues thiết yếu không phụ thuộc shader/bloom/caustic. Material/outline/shading theo pixel clusters, alpha/gutter/atlas bounds hợp lệ, không blur che đường ghép.

Production metadata cần assetId/provenance/approval/source-export, semantic terrain/edge type, tile dimensions khi duyệt, origin/bounds, occlusion/layer, collision association, state predicates, animation timing nếu dùng, fallbackRequired và reviewed evidence. Unique landmarks không random spawn lệch connector. Đổi hình cửa phải đổi collision/nav đúng snapshot, không cosmetic-only mở đường. Cần kiểm camera/envelope Quy mọi stage, FX off/grayscale/nền tối/sáng, low-cost và mobile orientation. Chưa benchmark/frame budget/device support; no art assets generated hoặc game config edited trong Task19.
