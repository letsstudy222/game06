# Bảo toàn Phoenix và promotion có kiểm soát

Toàn bộ kế hoạch dưới đây **PROPOSED** cho lần code sau. Task25 không đổi default scene, asset, save hoặc workflow. [Luồng hiện tại](TASK25_RUNTIME_EXECUTION_FLOW.md) và [test thực chạy](TASK25_BUILD_TEST_DEPLOYMENT.md) là mốc so sánh.

## Cách ly và quản lý nhánh

Giữ `/game06/` vào Dawn và `?sample=1` vào sample. Route/flag Quy mới chỉ là opt-in sau duyệt, không tự vào map đầu của truyện; fixture kỹ thuật không là E01 completion. Để asset Quy dưới prefix riêng, giữ manifest/Phượng source/export hiện hữu. Adapter mới phải giữ behavior cũ khi flag không bật; lỗi required asset cảnh thử không phá boot Dawn.

Main là nhánh public theo workflow đã quan sát; work là integration, branch task theo scope khi có đề bài. PR cần diff review, explicit scene switch/default/save namespace checks và tests trước merge. Không coi push work là deploy. Manual dispatch cùng github-pages có thể ảnh hưởng public nên không dùng làm preview giả; preview riêng cần quyết định/workflow riêng, Task25 không tạo.

## Ma trận chống hồi quy trước promotion

| Nhóm | Kiểm hiện hữu / mở rộng cần có | Điều kiện chặn phát hành |
| --- | --- | --- |
| Boot/routes | npm test + ba browser suite tại root và prefix/game06/, sample=1 | Dawn không ready, mặc định đổi, scene bind không đồng bộ |
| Asset paths | Manifest fetch/decode, rect/size, zero404/console; cache revision gồm tài sản thay | Ảnh thiếu/legacy default incompatible, cached actor cũ sau asset update |
| Render | Pixelated/integer scale, camera edge, y-sort/occlusion, screenshot so baseline có review | Crop body/telegraph, sai anchor/palette, thay art Phượng không được giao |
| Input | Keyboard/touch/cancel/release/blur/visibility/menu; no duplicate listeners sau scene round-trip | Stuck input/attack khi pause, phím Quy làm đổi baseline Phượng |
| Camera/map | Cả hai island route/shrine/beach; collision/water vẫn chặn đúng trong Dawn | Patch passability dưới nước làm Phượng đi xuyên biển/cliff |
| Actor/combat | Basic/fire cooldown/hazard/respawn baseline; fixture actor khác typed refs | Dùng state Phượng thay Quy hoặc apply recovery policy chưa duyệt |
| Save | nhat-diem.ui.v1 và nhat-diem.farm.v1 giữ; game-save namespace mới sau GF | Xóa/migrate ngầm key, half-write, duplicate grant, load reset progress |
| Build/CI | node--check/npm test/build, built prefix browser smoke; artifacts chỉ được đưa vào khi có scope | _site thiếu resource/screenshot hoặc pipeline công khai không chạy được |
| Hiệu năng/thiết bị | Như mục dưới; đo riêng, không suy từ suite time | Cơ chế chính/cue biến mất khi giảm FX, physical-device support chưa có bằng chứng |

Kết quả visual diff cần người review thay vì so screenshot byte-exact vì ambient/time/headless có thể thay; không thay snapshot kỳ vọng chỉ để giấu regression. Console/asset error và structural assertions vẫn là điều kiện cứng cho smoke.

## Hiệu năng và thiết bị: fact khác target

Fact: rAF variable dt cap50ms, hidden không update/draw, input clear khi blur; Canvas scale CSS integer không DPR multiplier; visible tile culling có, props/shadows sort/draw phần lớn mỗi frame, collision linear theo objects/substeps. Probe DPR1/2 tại1366×768 có drawCount597 ở frame quan sát, không phải giới hạn hoặc benchmark. Image.decode và idleCache allocate lúc boot; không có telemetry memory/FPS/long-task hoặc offscreen AI vì chưa có AI population. UI ActionButtons.update gọi snapshot mỗi frame để hỏi nearShrine, có thể tạo allocation lớn nếu targets phát triển; giữ query nhỏ trong kiến trúc tương lai khi có bằng chứng cần.

Mục tiêu **PROPOSED, chưa được nghiệm thu**: desktop tham chiếu hướng tới60FPS (frame budget16.7ms), thiết bị cảm ứng thấp hơn hướng tới30FPS (33.3ms) với cue bắt buộc giữ nguyên. Trước cam kết cần chọn browser/device/CPU/GPU/DPR, kịch bản scene actor count, warm-up/thời lượng, p95/p99 frame time, input latency và memory/loading budgets. Không chốt MB hoặc supported-device list từ ảnh headless.

Task25 chạy Chromium Linux, touch/mobile emulation bốn viewport; không Android/iOS/Safari/Firefox/Windows hoặc thiết bị thật. Tương lai quality tier giảm decorative particles/ambient, không xóa source/receiver/hazard cue. Đo tile visible/object sorting/collision và actor culling ở scope thật trước tối ưu hoặc thay engine. Không yêu cầu full ecosystem/offscreen simulation cho S0.

## Rollback và lúc công khai Quy

Chỉ đưa opt-in Quy ra public sau acceptance scene/asset/input/map, browser built-prefix và persistence phù hợp nhãn S0/S1; giữ default Dawn cho đến quyết định promotion riêng. Không phát hành scene có save chưa an toàn dưới thông báo “đã lưu”. Rollback bằng commit revert đã review trên nhánh public, hoặc artifact tốt còn lưu/quyền cho phép; không reset/force-push và không hạ schema save để rollback code. Có thể tắt route thử nếu kiến trúc hỗ trợ và rollback không phá data; flag này chưa được triển khai. Kế hoạch không là quyền deploy tự động.
