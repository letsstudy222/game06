# Art Bible — Tứ Linh Khởi Nguyên

Task33/96 · 01/11/2026 (Asia/Saigon). Tài liệu này sở hữu định hướng hình ảnh tổng thể; các tài liệu chuyên đề bên dưới sở hữu chi tiết sản xuất. Không thay [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định dự án](../PROJECT_DECISIONS.md), roster, đồ thị vùng, hợp đồng kỹ thuật hoặc [sổ tham chiếu tài nguyên](../ASSET_REFERENCE_REGISTER.md).

## Trạng thái và quyền phê duyệt

**CONFIRMED** chỉ dùng cho yêu cầu người dùng đã duyệt hoặc sự thật runtime được kiểm tra, ghi rõ loại bằng chứng. **PROPOSED** là khuyến nghị mỹ thuật chưa duyệt. **UNRESOLVED** là lựa chọn cần quyết định. **SUPERSEDED** chỉ áp dụng quyết định đã được thay bằng phê duyệt mới; không tự đổi nhãn một phương án chưa được chọn. Các nhãn lịch sử tại nguồn giữ nguyên.

**CONFIRMED — chỉ dẫn người dùng Task33:** 2D Top-down 3/4, góc nhìn hơi cao; pixel art fantasy chi tiết, trau chuốt; chuyển động tám hướng; đọc được người chơi, đường tránh và báo đòn. Đây không phải 3D, phép chiếu isometric, global skew hay trục Z vật lý. Canvas2D, tọa độ thế giới 2D và Dawn mặc định được bảo toàn. Các hình Option A/B trước đây không có trong đầu vào Task33 hoặc được xác minh trong repository: A chỉ là cảm hứng chất lượng, B chỉ minh họa góc nhìn; không suy bảng màu, kích thước hoặc bố cục cụ thể từ chúng.

**PROPOSED — AB33-P01:** nhận diện chung là “thần thoại sống trong dấu tích phục hồi”: sinh vật có cấu trúc và nhịp sống đáng tin, kiến trúc cổ giữ công năng chưa hiểu hết, thiên nhiên phát triển quanh những đứt gãy. Chi tiết phục vụ quan sát và hành động trước khi phục vụ trang trí. Không chốt nguyên nhân đại biến cố qua tranh tường hoặc hình Tinh Linh.

## Ngữ pháp hình ảnh — PROPOSED AB33-P01

| Thành phần | Quy tắc sản xuất đề xuất | Cách đánh giá |
| --- | --- | --- |
| Hình khối | Khối lớn rõ, khoảng âm có chủ đích; chi tiết nhỏ theo vùng chức năng | Nhận loài và lối đi khi thu về kích thước chơi |
| Mật độ chi tiết | Mặt/đầu, cơ quan hành động và điểm tương tác nổi hơn nền | Không phủ cùng độ sắc/nhiễu lên mọi bề mặt |
| Vật liệu | Đá có mặt gãy, mai có phiến sinh học, lông có cụm, gỗ có thớ tăng trưởng | Bỏ màu vẫn phân biệt vật liệu bằng cạnh và nhịp mảng |
| Ánh sáng | Nguồn sáng chính nhất quán, phản quang cục bộ có tiết chế | Không đảo sáng giữa hai hướng chỉ do mirror |
| Kể chuyện | Vết mòn, rễ, trầm tích và cơ cấu còn tác dụng gợi lịch sử | Dấu tích là góc nhìn, không tuyên bố niên biểu chưa duyệt |
| Tương phản | Nhân vật và thông tin hành động tách khỏi nền bằng giá trị sáng, hình và cạnh | Kiểm grayscale, nền sáng/tối/rối và màn hình nhỏ |
| Phép thuật | Thủy theo dòng, Hỏa theo nhiệt, Phong theo hướng, Mộc theo mạng sống | Không chỉ đổi màu một cùng hiệu ứng; Sinh Mệnh không là dấu cộng hồi máu |
| Silhouette | Quy khối mai; Phượng cánh/đuôi; Long thân S dài; Ly khối hộ vệ/gạc | Bỏ FX vẫn nhận đủ bốn loài |
| Chiến đấu | Báo đòn và làn an toàn không bị ánh sáng/hạt che | Giảm FX vẫn thấy hướng, vùng và thời điểm hành động |
| Liên chương | Cùng mật độ pixel và ngôn ngữ vật liệu, khác nhịp khối/màu/khí quyển | Không ghép các gói asset khác phong cách rồi phủ tint |

## Sổ nguồn cho các quy tắc chính

Mã AB33 dưới đây là chỉ mục bằng chứng trong tài liệu, không speciesId, assetId hoặc quyết định gameplay mới. Nguồn có trạng thái PROPOSED vẫn giữ nguyên khi được viện dẫn.

| Mã | Phạm vi quy tắc | Nguồn thực và loại bằng chứng |
| --- | --- | --- |
| AB33-S01 | Tầm nhìn, canon, bốn hệ, bí ẩn | [GDD](../GAME_DESIGN_DOCUMENT.md), [quyết định](../PROJECT_DECISIONS.md), [vũ trụ nguyên tố](../lore/ELEMENTAL_COSMOLOGY.md): canon CONFIRMED và diễn giải PROPOSED được tách tại nguồn |
| AB33-S02 | Loài và ba giai đoạn | [Creature Bible](../creatures/CREATURE_DESIGN_BIBLE.md), [chuẩn hình](../creatures/CREATURE_VISUAL_STANDARDS.md), [tiến hóa](../evolution/EVOLUTION_VISUAL_GUIDELINES.md): rubric PROPOSED; ba giai đoạn Sacred CONFIRMED |
| AB33-S03 | Nhận diện Tứ Linh | [Quy](../creatures/QUY_HAI_UYEN.md), [Phượng](../creatures/PHUONG_HOANG_NHAT_DIEM.md), [Long](../creatures/LONG_THIEN_PHONG.md), [Ly](../creatures/LY_VAN_SINH.md): bản sắc CONFIRMED, giải phẫu chi tiết theo trạng thái nguồn |
| AB33-S04 | Quy và phạm vi art Chương I | [Dạng Quy](../chapter1/QUY_EVOLUTION_FORMS.md), [đặc tả art](QUY_ART_PRODUCTION_SPEC.md), [yêu cầu animation](CREATURE_ANIMATION_REQUIREMENTS.md): hồ sơ PROPOSED, chưa sprite được duyệt |
| AB33-S05 | Vùng và môi trường | [Đồ thị H19](../chapter1/CHAPTER1_WORLD_GRAPH.md), [hồ sơ vùng](../chapter1/CHAPTER1_ZONE_DESIGNS.md), [bàn giao môi trường](CHAPTER1_WORLD_ART_HANDOFF.md): chín vùng và kết nối PROPOSED hiện hữu, không tạo bản đồ cạnh tranh |
| AB33-S06 | Sinh thái và trạng thái thế giới | [Loài Chương I](../chapter1/CHAPTER1_SPECIES_REGISTER.md), [bàn giao sinh vật](CHAPTER1_CREATURE_ART_HANDOFF.md), [bàn giao finale](CHAPTER1_FINALE_ART_HANDOFF.md), [world state](../world/WORLD_STATE_TRANSITIONS.md): không biến ngoại lai thành ác hoặc art thành chủ trạng thái |
| AB33-S07 | Truyện, nhiệm vụ, boss | [Cộng hưởng](../lore/RESONANCE_RULES.md), [nhịp mở đầu17](../chapter1/OPENING_BEAT_SHEET.md), [phục hồi24](../chapter1/CHAPTER1_HYDROLOGICAL_RESTORATION.md), [gợi mở Phượng](../chapter1/CHAPTER1_PHOENIX_FORESHADOWING.md), [nhiệm vụ chính](../chapter1/CHAPTER1_MAIN_QUEST_OVERVIEW.md), [nhiệm vụ phụ](../chapter1/CHAPTER1_SIDE_QUEST_OVERVIEW.md), [boss](CHAPTER1_BOSS_ART_HANDOFF.md): kế thừa thứ tự, tính tùy chọn và các quyết định còn mở |
| AB33-S08 | S0/S1, bảo vệ Dawn | [ADR26](../architecture/TASK26_ARCHITECTURE_DECISIONS.md), [kiểm toán runtime25](../technical/TASK25_RENDERER_AND_MAP_AUDIT.md): ba ràng buộc D26 đã duyệt, không đồng nghĩa S0 hoàn tất |
| AB33-S09 | Manifest và đường dẫn | [Contract27](../technical/TASK27_MANIFEST_CONTRACT.md), [path27](../technical/TASK27_PATH_AND_DEPLOYMENT_RULES.md), [validator](../../scripts/validate-assets.cjs): triển khai đã kiểm thử |
| AB33-S10 | Pixel, anchor, tám hướng | [scale28](../technical/TASK28_PIXEL_SCALING.md), [direction28](../technical/TASK28_DIRECTIONAL_ANIMATION.md), [RenderPrimitives](../../src/island/RenderPrimitives.mjs): có helper; chưa tám hướng vẽ Quy |
| AB33-S11 | Tile/layer/fade/dòng | [map29](../technical/TASK29_TILEMAP_DATA_CONTRACT.md), [fade29](../technical/TASK29_OCCLUSION_SYSTEM.md), [current29](../technical/TASK29_CURRENT_FIELD_CONTRACT.md), [LayeredMapView](../../src/island/LayeredMapView.mjs): adapter và fixture, không production map |
| AB33-S12 | Input, HP và lưu | [input30](../technical/TASK30_DODGE_AND_SWITCH_INPUT.md), [receipt31](../technical/TASK31_REWARD_RECEIPT_BOUNDARIES.md), [HP31](../technical/TASK31_HP_AND_BOSS_RECOVERY_BOUNDARIES.md): input dodge khác cơ chế; LayerC và HP chưa duyệt |
| AB33-S13 | Gate và QA | [gate32](../technical/TASK32_FOUNDATION_GATE_REPORT.md), [QA32](../technical/TASK32_TEST_INFRASTRUCTURE.md), [hiệu năng32](../technical/TASK32_PERFORMANCE_BASELINE.md): giới hạn phép đo và môi trường được công khai |
| AB33-S14 | Tham chiếu thật | [Asset register](../ASSET_REFERENCE_REGISTER.md), [Sacred art](../creatures/SACRED_ART_REQUIREMENTS.md) và ảnh đã mở bên dưới: phân biệt reference/production/integration |
| AB33-S15 | Định hướng mới | AB33-P01 và các đề xuất tại 12 tài liệu chuyên đề: yêu cầu Task33 là nhiệm vụ lập đề xuất, không phê duyệt giải pháp cụ thể |

## Tham chiếu trực quan đã kiểm trong Task33

| Tệp thực | Bằng chứng trực tiếp | Vai trò và giới hạn |
| --- | --- | --- |
| [phoenix-3-v2.png](../../assets/phoenix-3-v2.png) | Đã mở ảnh1254×1254; thân ngà, cánh vàng–cam nhiều tầng, đuôi đỏ uốn, đầu/mỏ chim rõ | Reference nhận diện được giữ; không atlas tám hướng hoặc chuẩn pixel density cho Quy |
| [atlas Phượng](../../assets/production/phoenix/atlas.png) | Đã mở ảnh; 192×288, ô96, hai tư thế mỗi ba hàng hướng | Asset runtime hiện hữu; không sáu bộ clip vẽ riêng hoặc mapping stage đã duyệt |
| [terrain Dawn](../../assets/environments/dawn/terrain.png) | Đã mở ảnh256×736; nền nước, cỏ/cát, bờ và cấu kiện đá dạng ô | Production môi trường hiện hữu; không kit Hải Uyên hoặc chuẩn Chương II cuối cùng |

Các ảnh khác có tên trong asset register không mặc định được xem lại trong Task33. Không có ảnh Quy/Long/Ly, Option A/B hoặc boss mới được xác minh qua ba ảnh trên. Quyền sử dụng và provenance tiếp tục do sổ tham chiếu nguồn quản lý; không suy giấy phép từ việc mở được ảnh.

## Các phần của Art Bible

| Chủ đề và chủ sở hữu chi tiết | Tài liệu |
| --- | --- |
| Loài và tiến hóa | [CREATURE_VISUAL_LANGUAGE](CREATURE_VISUAL_LANGUAGE.md) |
| Mật độ và tỷ lệ | [PIXEL_DENSITY_AND_SCALE](PIXEL_DENSITY_AND_SCALE.md) |
| Hướng và animation | [EIGHT_DIRECTION_ANIMATION_STANDARDS](EIGHT_DIRECTION_ANIMATION_STANDARDS.md) |
| Bốn chương | [CHAPTER_ENVIRONMENT_ART_DIRECTION](CHAPTER_ENVIRONMENT_ART_DIRECTION.md) |
| Bảng màu/ánh sáng | [COLOR_AND_LIGHTING_SYSTEM](COLOR_AND_LIGHTING_SYSTEM.md) |
| Hải Uyên | [UNDERWATER_VISUAL_DESIGN](UNDERWATER_VISUAL_DESIGN.md) |
| Tile/che khuất | [TILESET_AND_OCCLUSION_ART_RULES](TILESET_AND_OCCLUSION_ART_RULES.md) |
| VFX và UI | [COMBAT_VFX_READABILITY](COMBAT_VFX_READABILITY.md), [UI_ART_DIRECTION](UI_ART_DIRECTION.md) |
| Quy trình/nghiệm thu | [ASSET_PRODUCTION_WORKFLOW](ASSET_PRODUCTION_WORKFLOW.md), [ART_QA_CHECKLIST](ART_QA_CHECKLIST.md) |
| Duyệt Quy và kiểm tra tiếp theo | [Task34 brief](QUY_STAGE1_TASK34_HANDOFF.md), [kiểm tra cục bộ33](TASK33_CONSISTENCY_AUDIT.md), [bàn giao review01–33](TASK33_POST_COMPLETION_REVIEW_HANDOFF.md) |

**UNRESOLVED:** giải phẫu/palette/kích thước/frame-count Quy, bộ hướng được phép fallback ở S0, ngân sách hiệu ứng trên máy thật. **CONFIRMED:** Task33 chỉ lập tài liệu; không sản xuất sprite, không đổi Dawn, không thực hiện review01–33 hoặc bắt đầu Task34.
