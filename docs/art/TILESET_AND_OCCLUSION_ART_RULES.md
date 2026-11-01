# Quy tắc tile, lớp cảnh và vật che khuất

Nguồn: [AB33-S09–S11](ART_BIBLE_MASTER.md), [MapDefinition29](../technical/TASK29_TILEMAP_DATA_CONTRACT.md), [occlusion29](../technical/TASK29_OCCLUSION_SYSTEM.md), [source](../../src/island/MapDefinition.mjs). **CONFIRMED — triển khai:** contract29 và fade object đã có adapter/fixture; Dawn giữ logic cũ. **PROPOSED AB33-P08:** chuẩn authoring bên dưới. **UNRESOLVED:** tile size/kit/collision production. **SUPERSEDED:** không thay lịch sử.

## Pha renderer thực và cách phân tài nguyên

| Pha contract29 | Nội dung art đề xuất | Giới hạn thực |
| --- | --- | --- |
| background | Nền biển/trời xa ít cạnh | Chỉ pha này cho parallax; không tự thêm chiều sâu vật lý |
| terrain | Nền cơ sở lặp, mặt cát/đá | Visual tile không sở hữu collision |
| ground | Dấu cỏ/tảo thấp, mảnh vỡ, bóng mặt nền | Không dùng che critical cues |
| behind | Trang trí chắc chắn ở sau actor | Không giả mọi vật ở đây cần fade |
| depth | Actor và object có gốc neo để depth-sort | Depth-sort áp dụng objects/actors, không tự sort từng ô tile |
| foreground | Vòm, tán/rạn gần có authoring rõ | Muốn fade phải là object có flag, không tự fade cả tile layer |
| effects | FX trình bày theo scene | Chưa là engine chiêu/boss tổng quát |
| indicators | Cue cần đọc trên decor | Pha có trong contract; không chứng minh telegraph gameplay đã triển khai |

HUD là DOM ngoài world transform. Dawn/IslandScene có thứ tự cũ terrain→shadow/ambient→props/player→skills/shrine; không giả toàn bộ đã chuyển sang LayeredMapView. Không sửa position actor để chữa depth-sort. Gốc neo và depthY là dữ liệu tách khỏi mép texture; không vật lý Z.

## Tile kit — PROPOSED

| Nhóm | Yêu cầu bàn giao | QA tương lai |
| --- | --- | --- |
| Nền lặp | Pixel density thống nhất; vài biến thể có cạnh nối tương thích | Lát vùng lớn không đường nối/nhiễu lặp hút mắt |
| Bờ/cạnh/góc | Trong/ngoài, chuyển vật liệu và cạnh che hợp góc3/4 | Không khe hở hoặc bóng tạo cảm giác cổng sai |
| Overlay thấp | Alpha sạch, không viền nền đen/trắng, nguồn bóng thống nhất | Chồng trên mọi nền chính và FX thấp |
| Môi trường động | Frame/timing có loop, trang trí tách dấu current gameplay | Không nhấp nháy; dừng loop vẫn hiểu lối và hướng |
| Object cao | Sprite/rect/gốc neo, visual bounds và layer khai báo | Người chơi đi trước/sau/cạnh vẫn thấy; fade/recovery độc lập |
| Bóng | Hướng sáng và mức tối nhất quán với scene | Không dịch bóng làm người chơi hiểu collider khác thực tế |
| Dòng nước | Mũi/hướng/nét tĩnh + FX tùy chọn | Query current độc lập ảnh; không dùng màu tile làm lực |

Tile32 của Dawn là bằng chứng, không chuẩn bắt buộc kit mới. Không thêm tile production hoặc suy permissions từ màu nước: dữ liệu solid boolean/rect riêng, quy tắc passability do scene/actor được duyệt. Collision29 mới kiểm point/solid, chưa body sweep/clearance cho Quy; art không chứng nhận Task45 đã xong.

## Authoring occluder — PROPOSED, tương thích triển khai

Mỗi object cần layer cho phép occlusionEligible và object.occlusion.enabled; alpha/duration/margin phải được author/test, không lấy số fixture làm tuning được duyệt. Adapter xét visual AABB của actor/object và hướng depth: object ở trước hoặc foreground mới đủ điều kiện; phía sau không fade. Gốc chiếu thân Quy khác top-left ảnh; không lấy toàn ô trong suốt làm thân.

Fade là globalAlpha trên từng object với thời gian/hysteresis; không sửa PNG hoặc collision. Nhiều object có cache riêng, dispose/reset phải dọn. Không có pixel-perfect mask, polygon occlusion hoặc fade từng tile; nếu một dải tảo cao phải fade riêng, author thành object phù hợp contract về sau. Dawn canopy hiện0.48 là hành vi legacy giữ nguyên, **không** alpha mặc định mọi chương.

## Guard về đọc chiến đấu

**PROPOSED:** bố trí foreground tránh phủ làn né; kiểm actor lẫn telegraph. Không mặc định fade của actor bảo vệ toàn bộ vùng báo đòn. Nếu cần visibility override/pha đặc biệt, ghi yêu cầu tương lai theo [VFX](COMBAT_VFX_READABILITY.md), không khẳng định đã có. Bóng/trầm tích/ánh sáng không làm mờ cùng critical cue.

## Hợp đồng xuất và nghiệm thu

PNG/rect/anchor/bounds theo [manifest27](../technical/TASK27_MANIFEST_CONTRACT.md); dimensions tường minh khớp file thật, đường nguồn assets/ và output /game06/ khác nhau. Không đăng ký tileset underwater không tồn tại. QA edge/corner, camera culling, resize, DPR1/2, nhiều object che và FX thấp trên preview opt-in sau duyệt. Task33 không tạo map, sửa renderer hoặc chạy art production QA.
