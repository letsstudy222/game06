# Chi phí renderer và giới hạn phép đo

Tile culling được giữ. Props closures/list/y-sort mỗi frame và shadow/ambient chưa có full culling vẫn như cũ. Không tối ưu HUD hoặc input ngoài phạm vi. Metadata frame được prepare/freeze khi tạo IslandScene; hot draw tra cache, không decode ảnh hoặc kiểm manifest mỗi frame. Nhánh không mirror gọi drawImage trực tiếp; nhánh mirror dùng save/restore trong finally. Phượng giữ mirror ngoài helper.

Comparator vẫn O(N log N), có thêm tie-breaker và kiểm tra số hữu hạn. Không có bằng chứng nhanh hơn. List/position vẫn có allocation nhỏ; không tuyên bố đã tối ưu. Cache frame có kích thước hữu hạn theo directions × poses; không thêm global image cache. Scene cleanup tổng quát vẫn thuộc kế hoạch Task 26/47.

Các phép đo thực: thời gian chạy suite trước/sau trong [báo cáo kiểm thử](TASK28_BROWSER_VALIDATION.md), Canvas/scale ở DPR 1/2, 24 fingerprint RGBA và 8 so sánh pixel. Thời gian suite không phải FPS, độ trễ input hoặc benchmark bộ nhớ.

Chưa đo thiết bị di động thật, browser zoom phân số, nhiều actor hoặc p95/p99 frame time. Headless Linux không chứng nhận mọi nền tảng. Mục tiêu tương lai 60 FPS desktop/30 FPS mobile vẫn **PROPOSED**: cần chọn workload/device/browser, warm-up rồi đo frame percentile, long task, heap và input latency trước khi chốt budget. Không loại cue gameplay để đạt chỉ tiêu chưa được đo.
