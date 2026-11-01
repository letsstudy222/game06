# Bàn giao sản xuất pixel-art Quy

**PROPOSED Q18-P09**, không ảnh/atlas/clip được tạo trong Task18. [C04 anatomy](../creatures/QUY_HAI_UYEN.md), [animation standard](CREATURE_ANIMATION_REQUIREMENTS.md), [visual standards](../creatures/CREATURE_VISUAL_STANDARDS.md), [asset register](../ASSET_REFERENCE_REGISTER.md) giữ hướng và provenance. Không tìm thấy Art Bible tên riêng trong tài liệu đã kiểm; dùng các nguồn hiện hữu này, không giả định có art bible hoặc ảnh Quy đã duyệt.

## Chú giải phạm vi Task33 — 01/11/2026

Câu chưa tìm thấy Art Bible ở trên ghi nhận thời điểm Task18. Nay xem [Art Bible](ART_BIBLE_MASTER.md) và [brief Quy I](QUY_STAGE1_TASK34_HANDOFF.md). Đề xuất bốn hướng blocking bên dưới giữ **PROPOSED Q18-P09** như lịch sử, không là target art mới: yêu cầu tám hướng hiện đã **CONFIRMED theo chỉ dẫn người dùng**; fallback ít hướng cho S0 vẫn cần duyệt riêng, không đổi tên thành full tám hướng. Không tự đánh dấu đề xuất chưa từng được duyệt là SUPERSEDED.

Bảng coverage gốc là nhu cầu eventual Chapter I và các mốc tích hợp, không minimum S0. [Chuẩn animation33](EIGHT_DIRECTION_ANIMATION_STANDARDS.md) tách S0 idle/swim và phản hồi tương tác khỏi S1 combat/cộng hưởng và full chapter. Anatomy, palette, kích thước, frame-count và chính sách combat gốc vẫn **PROPOSED/UNRESOLVED**; không được phê duyệt qua chú giải này. Không thay atlas Phượng hoặc tạo asset Quy.

## Hình, vật liệu và continuity

Khối chính là mai thấp, đầu nêm/hàm rùa, bốn chi/vây có gốc đúng và đuôi lái. Tỷ lệ stage theo [các dạng](../chapter1/QUY_EVOLUTION_FORMS.md), không enlarge ảnh I thành II/III. Mai là mảng sinh học/kháng vật hóa có tổ chức, rãnh vào–ra gắn công năng; không áo giáp rời hay kim loại tự sinh affiliation Kim. Ngọc/jade/turquoise và xanh sâu là họ màu, không hex palette cuối. Ngà cho hàm/bụng, vàng tiết chế ở điểm nối; mắt và mặt đọc hơn bloom.

Dùng pixel clusters theo mặt mai/vây, outline có chủ đích đủ tương phản trên nền nước sáng/tối; không noise vảy lẻ hoặc blur để giả chi tiết. Shading tuân nguồn sáng scene, phản quang nước là lớp tùy chọn không đảo anatomy. Body alpha rõ, không rectangle nền; màng/FX translucent phải tách để còn thấy chi và hurt region. Không sao chép creature concept bên ngoài hoặc coi việc có PNG là đã có quyền sử dụng.

## Directions, anchor và clip coverage

Runtime Phượng dùng down/left/right-mirror/up, atlas **192×288**, cell **96**, hai poses mỗi ba row; `AnimationController` có tên state nhưng `IslandScene.drawPlayer` chọn hai poses để dựng chúng. Đây là pipeline hiện hữu đã đọc metadata/PNG header, **không** chuẩn kích thước/frame-count cho Quy hoặc bằng chứng đầy đủ animation Quy. Tài liệu này không thay manifest JSON.

Khuyến nghị blocking Quy có bốn hướng logic up/down/left/right để khớp adapter x–y. Ba hướng vẽ + mirror chỉ được chấp nhận nếu art review xác nhận rãnh/asymmetry/ánh sáng không sai; nếu không cần bốn hướng thật. Diagonal input không cần sprite tám hướng ở minimal scope nhưng aim/hit vector không bị làm dài hoặc đổi lén theo sprite quantization.

| Ưu tiên | Coverage clip ứng viên | Marker / kiểm hình |
| --- | --- | --- |
| Bắt buộc I movement | Idle directional, swim, turn và brake, interact | Anchor core/contact ổn định, vây đúng nhịp, displacement thật khớp animation |
| Bắt buộc I combat | Chấn Mai startup/contact/recovery, short brace enter/hold/block/release/break, hurt/incapacity | Contact/interrupt/recovery markers theo C14; block khác hurt, sườn hở đọc được |
| Bắt buộc I Water | Vành Nước charge/release/recovery, cone FX riêng | Origin nguồn đã duyệt, range/hit không theo glow; tắt FX vẫn hiểu hướng |
| Bắt buộc opening integration | Thức và vào control, tương tác cơ cấu, memory presentation trung tính | Q05/B+C phải duyệt trước production; unlock do durable state, không callback frame |
| Khuyến nghị Chương I | Chuyển nền–nước/đi nền ở zone cho phép, Mượn Dòng | Ground/contact khác swim, turn envelope hợp clearance |
| Sau này II | Anatomy II cho actions cũ + Mai Định Áp/valve | Không tái scale I, sector/break/side hurt có hình tương ứng |
| Sau này III | Anatomy III actions cũ + aim/charge/pulse/recovery S3, fold nếu dùng | FX vào–ra theo mai, chi không biến mất; fold phải có envelope/hurtbox hợp lệ |

Chưa chốt số frames, FPS, kích thước canvas/cell hoặc duration; cần blocking/playback trước. Body core anchor biểu diễn projection trên mặt phẳng nước/nền, không lấy góc ảnh hoặc mép glow. Mỗi frame có cùng basis origin; offsets authored chỉ bù thay posture thật, không renderer dịch body hai lần. Root motion chỉ từ coordinator, sprite offset không đổi reach.

## Manifest và nghiệm thu trước dùng

Mỗi clip cần stageRef, action/abilityRef, direction, posture, image/frameRects, dimensions, origin/basis, loop/timing, marker windows, visual envelope và footprint/hurt/attack refs, FX/SFX refs, anatomyRevision, approval/provenance/version. Atlas rects nằm trong ảnh, gutter/alpha không bleed, frame không crop mai/vây. Visual bounds gồm phần thân nhìn được, footprint dùng chiếm chỗ, hurtbox nhận đòn, attack hitbox theo marker; bốn loại không dùng một rectangle thay nhau.

Cần kiểm silhouette đen/grayscale/màu tại scale gameplay, mọi hướng/extrema, FX off/on, nền underwater/basalt/cloud/forest, camera sát biên và evolved turn trong khe. Nearest-neighbor, integer render sampling tương thích Camera hiện tại; không dùng concept sheet 1254px thành atlas. Asset thiếu bắt buộc chặn runtime-ready; fallback chỉ approved-compatible, không Phoenix hoặc idle vô hình tấn công.

Q18-U01/U02/U03/U04/U06 là gates; reference/model sheet Quy, production export/source, provenance/license và playback đều chưa hoàn tất. Asset readiness hiện **Missing/Unverified cho Quy**, không “production-ready”. Mobile/desktop phải báo kết quả test thật sau này; không FPS/min-spec giả định.
