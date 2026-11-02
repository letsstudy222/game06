# Định hướng mỹ thuật giao diện

Nguồn: [AB33-S01/S07/S08/S12](ART_BIBLE_MASTER.md), [boss lock](../loadout/BOSS_LOADOUT_LOCK.md), [input30](../technical/TASK30_MOBILE_CONTROLS.md), [schema31](../technical/TASK31_INDEXEDDB_SCHEMA.md). **CONFIRMED:** giữ UI Dawn hoạt động, tối đa ba form trang bị và được để trống slot, persistence nền có ba slot độc lập. **PROPOSED AB33-P10:** toàn bộ giao diện tương lai ở đây. **UNRESOLVED:** mô hình HP và sản xuất UI. **SUPERSEDED:** không thay lịch sử nguồn.

## Ngôn ngữ hình và chữ — PROPOSED

Khung cổ có viền mảnh/khớp vật liệu, nền trung tính tối và chữ ngà, điểm vàng tiết chế theo [PAL33-U](COLOR_AND_LIGHTING_SYSTEM.md). Nội dung và nút quan trọng đọc trước texture. Icon cần silhouette riêng, trạng thái disabled/selected/focus không chỉ đổi hue. Có biến thể rút gọn cho viewport dọc, chừa safe area và vùng nhìn của người chơi/telegraph.

Giữ font/UI hiện hữu; font thay thế chỉ là đề xuất cần kiểm giấy phép, dấu tiếng Việt, cỡ hiển thị thật và độ nét. Không raster hóa đoạn thoại dài thành ảnh. Kiểm font fallback, dấu chồng, dòng dài và tương phản trên nền thực; không khẳng định đạt accessibility khi chưa đo.

## Các nhóm giao diện tương lai

| Nhóm | Hình thức PROPOSED | Guard nghiệp vụ |
| --- | --- | --- |
| HP | Có thể thử thanh/icon theo projection được domain cấp | Hai hướng trình bày theo active form hoặc projection chung chỉ là phương án; không chọn HP owner qua mockup |
| Skill | Icon công năng, trạng thái sẵn/cấm/hồi bằng hình và text | Không gán số damage/cost/cooldown từ art |
| Ba equipped slots | Khung ba vị trí, slot rỗng rõ, active khác reserve | Không bắt đủ ba; membership lock khác quyền switch eligible equipped forms |
| Tiến trình | Chân dung/nhãn loài, stage và tiến trình theo record gốc | Không gộp EXP loài, rarity không đồng nghĩa mạnh hoặc playable |
| Nhật ký | Mục tiêu rõ và nguồn thông tin, optional khác main | Không tạo quest truth riêng hoặc bắt side quest cho main |
| Bản đồ | Legend đường thật/đã biết/gate theo projection, landmark rõ | Không sáng tạo graph từ tranh, không tiết lộ sớm lối/collection khi chưa discovery |
| Vật phẩm | Icon vật liệu dễ phân biệt nếu inventory được duyệt | Không tạo crafting economy hoặc loot cho mọi wildlife |
| Save slots | Ba thẻ độc lập, tên/thời điểm/trạng thái kiểm xác rõ | Committed-unverified không vẽ thành thành công; confirm overwrite/recovery/import theo nền31 |
| Thoại/ký ức | Khung gọn, caption/nhãn điểm nhìn, nhịp đọc tùy người chơi | Sinh vật không tự nói tiếng người; không tiết lộ origin/catastrophe đầy đủ |
| Boss | Tên/trạng thái và cảnh báo chỉ theo encounter đã duyệt | Không thêm thanh giáp/HP thứ hai, không xác nhận boss candidate |
| Mobile controls | Nút/touch zone đọc được, hướng/interaction nhất quán | Không che người chơi/đường né, không đổi binding hoặc thêm dodge gameplay |

## HP và trạng thái chưa duyệt

**PROPOSED:** có thể trình hai mockup về sau, một nhấn actor đang điều khiển, một nhấn projection do health authority xuất; cả hai phải đợi HP/recovery policy. Không đặt thanh dự bị hồi đầy chỉ vì chuyển form. Active incapacitation, viable reserve/recovery và total defeat cần nhãn khác theo chính sách tương lai, không suy từ màu chân dung. Task33 không vẽ mockup production hoặc đổi HUD.

## Save và nhận thưởng

**CONFIRMED — giới hạn triển khai31:** IndexedDB nền và harness có thử nghiệm thật, không phải durable Chapter I gameplay đã tích hợp. UI đọc kết quả writer, không tự đánh dấu save/reward vì animation hoàn tất. RewardGrantLedger là authority duy nhất cho source claim và recipient grants; thay content version không phát thưởng lại. Save card preview không lấy ảnh/art làm xác nhận receipt.

## QA và phạm vi S0

**PROPOSED:** S0 chỉ cần chỉ dấu interaction/mục tiêu cục bộ và thông báo trạng thái demo tạm/restart; không yêu cầu journal, collection, HP hoặc gameplay save hoàn chỉnh. Sau khi có UI art: kiểm tiếng Việt, tab focus, touch hit area thực, portrait/landscape, DOM không theo camera, FX off và reduced motion. Task33 không thay UI, font, input hoặc settings.
