# Nền tảng đo hiệu năng

Các số sau đo thật trong aggregate cuối: Node 24.19.0, Chromium 154.0.8037.57 headless Linux, Canvas2D Dawn, viewport 1280×720/DPR1. Dữ liệu gốc ở /tmp/game06-qa-irVXns/artifacts/debug/results.json. Không có FPS PASS threshold hoặc claim optimization.

Mỗi mode thu 90 khoảng RAF sau hơn 10 callback warm-up. Off không tải debug modules; metrics có panel đọc khoảng 4Hz; visuals thêm grid/anchor/circle/viewport Canvas riêng. Các lượt nối tiếp, không controlled benchmark hoàn toàn đồng nhất: các mode bật còn có input/resize smoke và camera/player vị trí khác nhẹ. Không dùng chênh lệch RAF này để suy causal overhead hoặc lợi ích tối ưu.

| Mode | RAF samples | Mean ms | p50 ms | p95 ms | Max ms |
| --- | --- | --- | --- | --- | --- |
| off | 90 | 16.6667 | 16.7000 | 16.8000 | 16.8000 |
| metrics | 90 | 16.6667 | 16.7000 | 16.8000 | 16.8000 |
| visuals | 90 | 16.6656 | 16.7000 | 16.8000 | 16.8000 |

Timing hooks trong mode bật giữ 120 mẫu gần nhất. Phân vị nearest-rank; đơn vị ms, số làm tròn 4 chữ số không có nghĩa timer chính xác đến 0.0001 ms. Giá trị 0 có thể do độ phân giải clock, không có nghĩa không tốn CPU.

| Mode / vùng đo | Samples | Mean ms | p95 ms | Max ms |
| --- | --- | --- | --- | --- |
| metrics / updateMs | 120 | 0.0292 | 0.1000 | 0.2000 |
| metrics / renderMs | 120 | 0.6825 | 0.8000 | 1.3000 |
| metrics / hudMs | 120 | 0.0883 | 0.2000 | 0.3000 |
| metrics / debugMs | 120 | 0.0117 | 0.1000 | 0.3000 |
| visuals / updateMs | 120 | 0.0317 | 0.1000 | 0.2000 |
| visuals / renderMs | 120 | 0.7650 | 1.1000 | 1.4000 |
| visuals / hudMs | 120 | 0.1067 | 0.2000 | 0.3000 |
| visuals / debugMs | 120 | 0.3325 | 0.5000 | 0.8000 |

updateMs bao state.update, renderMs bao scene.draw, hudMs bao hud.update. debugMs đo phần endFrame đọc provider/cập nhật DOM/draw helpers, chưa bao toàn bộ begin/after hooks, profiler bookkeeping, compositor/GPU hoặc runtime module startup. Đây là measurement support và partial overhead observation, không tổng chi phí overlay tuyệt đối. Off không có per-stage timings vì instrumentation tắt; không bịa số 0 để so.

Resource counts hiện có: loaded image count, một player actor và WorldLayer tile draw workload. Không đo heap/VRAM hoặc chứng nhận memory leak-free. Tile culling giữ nguyên; debug grid giới hạn tối đa 200 lines mỗi trục; ring diagnostics và profiler hữu hạn. Không validate assets/decode ảnh mỗi frame mới, không telemetry/console frame spam.

Chưa benchmark map lớn/nhiều actor, physical mobile, DPR phân số, browser zoom, multi-engine hoặc long session p99/heap. Mục tiêu 60 FPS desktop/30 FPS mobile trong đề xuất trước vẫn PROPOSED; browser vsync/headless RAF không phê duyệt budget production. Trước tối ưu cần chọn device/workload, đo frame percentiles, long tasks/input latency/heap và so kiểm soát cùng trạng thái scene. Task 32 không tối ưu gameplay hoặc tự đặt nghiệm thu performance.
