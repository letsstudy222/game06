# Tham chiếu, yêu cầu art và khoảng trống production

Task 04/96, kiểm kê baseline `fce9cf2`. Không generate, chuyển đổi hoặc thay asset. Chỉ có đường dẫn đến file thật; mọi tài nguyên dự kiến chưa có dùng **Missing / chưa có đường dẫn**, không đặt path export giả.

## Bằng chứng đã xem và giới hạn

| Tài nguyên | Trạng thái kiểm tra trong Task 04 | Có thể kết luận / không thể kết luận |
| --- | --- | --- |
| [Phoenix reference](../../assets/phoenix-3-v2.png) | Đã mở xem trực tiếp | Ngà/kem, vàng/cam, crimson, cánh/đuôi đặc trưng. Đây là design reference được người dùng yêu cầu giữ, không một atlas animation |
| [Phoenix runtime atlas](../../assets/production/phoenix/atlas.png) | Đã xem trực tiếp; kiểm tra PNG/metadata read-only | 192×288, ô 96, 2 pose × 3 hướng; phải mirror hướng phải. Có alpha/anchors; chưa đủ bộ clip mới cho 3 stages |
| [Runtime manifest Dawn](../../assets/environments/dawn/manifest.json) và [manifest nguồn Phoenix](../../assets/production/manifest.json) | Đã đọc metadata/nguồn loader | Đường ảnh Phoenix, directions/anchors thực. Manifest nguồn còn trường environment cũ, không phải toàn runtime Dawn hiện tại |
| [AnimationController](../../src/island/AnimationController.mjs), [IslandScene](../../src/island/IslandScene.mjs) | Đã đọc timing và lựa chọn pose | Có sáu trạng thái runtime nhưng renderer phối hai pose mỗi hướng, không sáu bộ frame vẽ tay riêng; không fresh playback test Task 04 |
| [Legacy Phoenix metadata](../../assets/sprites/phoenix-legend.json) và ảnh cùng basename | Có file, đọc JSON; ảnh legacy chưa được review lại trực tiếp Task 04 | Sheet cũ 32px theo JSON không tự thay atlas 96px hiện hành; nhãn Legend không xác định stage III |
| Phoenix reference/masters khác trong `assets/`, `assets/sprites/`, `assets/production/phoenix/` | Đã tìm thấy tên file; không xem mọi ảnh lịch sử trong Task 04 | Không đánh dấu toàn bộ chúng là visual authority hoặc đã validated; provenance tại [art-provenance](../art-provenance.md) |
| Quy, Long, Ly | Không có ảnh nhận diện được trong file inventory repo | Chỉ có brief text Task 04; không nhận đã xem reference ngoài checkout hoặc đã biết crop/hex/atlas của chúng |

Hướng Long dài xuyên mây là **CONFIRMED bằng chỉ dẫn Task 04**, dù ảnh review cũ chưa có. Không cần tự tạo ảnh thay thế. Identity matrix mô tả brief được giao, không chứng nhận ảnh chưa thấy.

## Register đủ 12 stage

| Asset gap ID / stage | Reference có thể dùng | Production resources cần | Trạng thái |
| --- | --- | --- | --- |
| AG-Q1 / `quy_s1` | Brief text rùa nước cổ trong Task 04 | Model sheet/non-snake silhouette, swim/dive/ground/basic/S1/hurt/defeat/transform, anchors | Missing; chưa có file |
| AG-Q2 / `quy_s2` | Hồ sơ stage ứng viên, chưa có ảnh được duyệt | Kênh mai/vây mới, brace/block/release, env valve và toàn locomotion thích hợp | Missing |
| AG-Q3 / `quy_s3` | Hồ sơ stage ứng viên | Mai vào–ra, turn/fold, S3, tương tác cụm; clearance và FX | Missing |
| AG-P1 / `phuong_s1` | Phoenix reference có sẵn; chưa chốt mapping stage | Anatomy stage I được duyệt, clip riêng nhảy/lướt/basic/charge/release/hurt/landing | Missing bộ stage được phân loại; runtime cũ giữ nguyên |
| AG-P2 / `phuong_s2` | Cùng identity; chưa có mapping | Cánh/đuôi phát triển, bank/glide/landing/S2 và timing/hit markers | Missing |
| AG-P3 / `phuong_s3` | Cùng identity; không tự gán atlas Legend | Full spread/turn/S3/recovery và envelope/anchors stage III | Missing bộ clip stage III đã duyệt |
| AG-L1 / `long_s1` | Brief text elongated dragon, chưa có ảnh | Head/horns/4 legs/mane/tail trong thân S dài, curve turn, basic/S1 | Missing; không dùng worm placeholder để nhận hoàn thành |
| AG-L2 / `long_s2` | Hồ sơ ứng viên | Cổ/eo/chi phát triển, hãm/đổi lane/S2, anatomy continuity | Missing |
| AG-L3 / `long_s3` | Hồ sơ ứng viên | Multi-bend dài, cloud pass riêng, S3/turn/compact posture/clearance | Missing |
| AG-Y1 / `ly_s1` | Brief text guardian gạc phân nhánh, chưa có ảnh | Silhouette khác hươu thường, chạy/nhảy/basic/rễ/hurt/transform | Missing |
| AG-Y2 / `ly_s2` | Hồ sơ ứng viên | Collar/chi/gạc khác tỷ lệ, plant contact, channel healing/ngắt/S2 | Missing |
| AG-Y3 / `ly_s3` | Hồ sơ ứng viên | Vòm gạc rỗng và mạng anatomy, sweep/landing/S3/recovery | Missing |

Gap chung: clip evolution giữa I→II/II→III; transformation source/target; defeat không chết vĩnh viễn theo model ứng viên; tương tác dưới nước/thermal/gió/mạng sống; âm/FX cues và accessibility shapes; provenance/approval từng export; kiểm chứng playback trên nền/viewport thật. Không có “12 production sprites đã hoàn thành”.

## Hợp đồng production — PROPOSED C04-P11

1. Reference và brief anatomy được duyệt theo loài/stage, turnaround có hướng nhất quán; creatureId/stageId/asset revision có nguồn. Không lấy concept-sheet row làm frame nếu chưa xác minh.
2. Atlas/export phải có file thật, frame rect trong ảnh, dimensions không cắt chi/cánh/gạc/đuôi, alpha phù hợp và gutter; palette/ramp, outline, pixel density và ánh sáng thống nhất. Tile 32px không quyết định frame creature; 96px là dữ liệu Phoenix hiện tại, không tiêu chuẩn bắt tất cả theo.
3. Mỗi animationDefinition có actionId, direction/posture, frame references, anchor theo frame hoặc base anchor có offset rõ, timing/durations, loop, anticipation/contact/recovery markers, hit/hurt/footstep event và interruption policy. Hướng mirror chỉ khi thiết kế bất đối xứng cho phép; không suy tất cả rồng/gạc đều mirror an toàn.
4. Required repertoire: idle, locomotion theo profile (swim/dive/ground/leap/glide/wind), turn, basic, từng skill đã mở, hurt, incapacitation, tương tác môi trường, transformation và evolution. Không ép animation không liên quan cho loài; mọi action dùng được phải có clip hoặc fallback được phê duyệt có telemetry rõ.
5. Draw envelope theo posture/clip, ground anchor/shadow và footprint/hurtbox/attackbox tách; kiểm tra culling/depth/occlusion/clearance. Long có track anatomy/curve liên tục, mây không dùng để giấu mất chi. Ly gạc và Phoenix tail/cánh phải giữ khoảng âm.
6. Playback test riêng từng clip/hướng và chuyển clip khi di chuyển, đánh, bị ngắt/hurt; hit marker khớp effect. Test ở 390×844, 360×800, 844×390, 1920×1080 và nền sáng/tối/nhiễu; báo emulation khác phần cứng thật.

Chỉ nhận production-ready animation sau khi có frames/atlas hợp lệ, anatomy nhất quán, dimensions/anchor/alpha/timing rõ và playback thực sự được kiểm. Metadata có fps không thay việc nhìn clip chơi thật. Task 04 chỉ read-only metadata, không chạy để tạo ảnh gameplay mới của loài chưa có.

## Readability, tính riêng và review nguyên gốc

| Loài | Silhouette cần kiểm | Rủi ro cần phản biện |
| --- | --- | --- |
| Quy | Mai thấp/đầu nêm/4 vây và kênh nước qua ba stage | Trượt thành Huyền Vũ rắn quấn mặc định hoặc rùa thường chỉ recolor; không sao motif độc quyền |
| Phượng | Ngực ngà, cánh vàng/cam, đuôi crimson chảy và mặt đọc được | Mất identity đã duyệt khi “stage hóa”; nhầm lửa/FX với anatomy; không thay hình bằng thương hiệu khác |
| Long | Đầu sừng/móng/bờm/đuôi + thân dài S xuyên mây, còn đọc khi tắt FX | Thân ngắn/giun, mất chân trong mây, body nối sai hoặc mượn cấu trúc ký hiệu riêng của nhân vật thương mại |
| Ly | Guardian vai/ngực và cấu trúc gạc–cổ–lưng, khác hươu thường | Chỉ thêm lá lên hươu; quá giống loài hỗ trợ tương lai hoặc bố cục copyrighted quen thuộc |

Dùng thần thoại chung và sinh học làm cảm hứng nhưng không sao character-specific anatomy, costume, proprietary symbol, nhạc hoặc arrangement. Review side-by-side nội bộ và provenance/reference sources trước chốt; **không tuyên bố độc đáo tuyệt đối hay đủ quyền pháp lý** chỉ vì đã viết hồ sơ. Các loài chưa có ảnh không thể được chứng nhận visual uniqueness bằng text.
