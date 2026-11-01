# Độ rõ chiến đấu và hiệu ứng

Nguồn: [AB33-S07/S10–S13](ART_BIBLE_MASTER.md), [render layers28](../technical/TASK28_RENDER_LAYERS.md), [boss art](CHAPTER1_BOSS_ART_HANDOFF.md), [HP31](../technical/TASK31_HP_AND_BOSS_RECOVERY_BOUNDARIES.md). **CONFIRMED:** real-time combat; nhìn rõ người chơi/báo đòn/làn né ưu tiên; HP0 active không tự đồng nghĩa thất bại toàn encounter. **PROPOSED AB33-P09:** giải pháp VFX bên dưới. **UNRESOLVED:** timing, HP/recovery, dodge và boss candidate. **SUPERSEDED:** giữ quyết định lịch sử nguồn.

## Thứ bậc thông tin — PROPOSED

Khi cạnh tranh độ rõ, ưu tiên thân/hướng người chơi và thông tin nguy hiểm thiết yếu, tiếp đến mục tiêu tương tác/trạng thái cần hành động, cuối cùng ambience và ánh sáng trang trí. Critical cue phải đọc được trên nền sáng/tối/rối và khi giảm FX; cắt hạt trước khi cắt ranh giới vùng. Safe lane phải là khoảng trống thật theo encounter authority, không một dải sáng trang trí hứa sai an toàn.

| Nhóm | Ngôn ngữ hình ảnh PROPOSED | Điều không được tự quyết |
| --- | --- | --- |
| Basic attack | Tư thế chuẩn bị và đường ngắn theo facing, vùng contact không lớn bởi glow | Damage/reach hoặc active frames |
| Skill | Hình riêng theo công năng nguồn/hướng/vùng, FX phụ tách thân | Skill mới, cost, cooldown hoặc nguyên tố phụ |
| Defense | Khối chịu lực/hướng che khác hurt, vào/giữ/ra thấy rõ nếu cơ chế dùng | Sector/duration/break policy chưa duyệt |
| Dodge | Có thể có pose thu thân/vệt ngắn ở thiết kế sau | Input Space đã có không phê duyệt i-frame, khoảng cách hoặc stamina |
| Damage | Cue cục bộ/pose phản ứng ngắn, silhouette vẫn đọc | HP thuộc actor/form/shared hoặc mọi hit làm stagger |
| Incapacitation | Tư thế mất khả năng hành động phân biệt với idle/defense | Chết vĩnh viễn, heal khi switch, emergency transfer; chính sách cuối vẫn PROPOSED |
| Boss warning | Biên vùng, hướng, nhịp chuẩn bị và đường tránh khác nhau | Boss identity/timing, hitbox hoặc pha2 chưa duyệt |
| Status | Biểu tượng + dấu trên cơ thể, có thể thêm màu | Lôi tạm thời không đồng nghĩa dual-element/corruption |

## Đồng bộ animation và hình học

**PROPOSED:** anticipation/execution/recovery có cue riêng, marker tham chiếu hành động được duyệt; visualDirection fallback không thay requested attack-facing. Tách collision footprint, hurtbox, hitbox và FX envelope. Art preview phải chồng debug geometry để phát hiện vệt đẹp nhưng báo vùng sai. Không dùng callback kết thúc clip để ghi reward, phục hồi môi trường hoặc xác nhận boss resolved.

Critical indicators cần pha sau decor hoặc visibility override được duyệt. Contract29 có indicators nhưng Dawn còn skills/shrine legacy; chưa có telegraph engine tổng quát hay bảo đảm mọi room. Actor fade không tự bảo vệ telegraph: kiểm cả cue khi nhiều foreground object chồng nhau. Đề xuất engine mới ghi vào backlog có owner kỹ thuật, không triển khai Task33.

## Bản sắc nguyên tố không che counterplay

**PROPOSED:** Thủy dùng luồng/biên mặt nước; Hỏa dùng co–bùng nhiệt có khoảng trống; Phong dùng đường áp/hướng và mây rời; Mộc dùng nhánh/mạng có gốc nguồn. Sinh Mệnh không chỉ là icon heal; Lôi/Kim ngoại lai có thể ổn định và không ác. Mọi FX trang trí có thời gian sống hữu hạn và mức giảm, không nổ trắng toàn màn để biểu đạt quyền năng.

## Giảm hiệu ứng và accessibility

**PROPOSED:** bản thấp giữ hình vùng/viền/hướng và trạng thái actor, bỏ hạt phụ, bloom raster và shake trang trí trước. Kết hợp shape/hatch/pose, không chỉ đỏ–xanh; âm thanh có tín hiệu hình thay thế. Tránh flash/strobe và rung bắt buộc. Chưa có hiệu ứng mới hoặc phép đo trên mobile vật lý; không đưa cam kết FPS.

## Tiêu chí QA tương lai

Trước nghiệm thu combat art: nhìn rõ lúc hitbox active và khoảng an toàn; hướng aim chính xác khi đi chéo; FX off, palette hạn chế, nhiều occluder, boss lớn, camera biên và viewport dọc; reload không replay reward từ animation. Chỉ chạy sau gameplay/asset liên quan tồn tại và policy được duyệt. S0 không cần combat, boss, dodge animation hoặc HP UI để đạt scope di chuyển.
