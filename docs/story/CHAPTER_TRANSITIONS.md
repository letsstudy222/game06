# Nối chương: lý do, đường đi và đường về

Hướng nước→núi lửa→đảo trời→Vạn Sinh là CONFIRMED. **PROPOSED S05-P11:** tuyến, receiver/checkpoint và choreography cụ thể. Không gán topology này cho map `dawn` hiện tại.

| Event / dependency | Lý do đi tiếp và đường vật lý | Cơ thể/capability | Cửa sổ kiểm chứng và quyền quay lại |
| --- | --- | --- | --- |
| `evt_06_surface_route` / E05 | Nước đã hồi nhưng đầu địa nhiệt chưa trao đổi, dòng lộ sườn thềm biển tới vịnh nông chân Nhật Diệm. Độ sâu giảm dần, có buồng/điểm trồi, không đi thẳng vào miệng núi lửa | Quy bơi/đọc nhịp, cơ cấu phụ mở đường ngắn; không cần Phượng chưa có | Giữ điểm trú dưới biển và bờ đảo, tạo route hai chiều; hủy trước destination commit trở lại điểm xuất phát an toàn |
| `evt_12_thermal_ascent` / E11 | Hệ nhiệt có đường xả kiểm chứng tạo updraft lớn, nhưng đầu khí còn dội. Đi theo chuỗi đoạn nâng có landing, từ hơi lên tầng mây tới nút ngoài Phong Vân | Phượng lượn thermal đã được tập ở E09/E11, không free-flight vô hạn; mỗi đoạn ngắn trong capacity đã dạy, không gate level không báo | Trạm hạ đáp hai chiều, lane xuống/điểm trú; chưa có Long nên phần đầu chỉ dùng đoạn thermal và bridge phù hợp, không yêu cầu chỉnh storm trước khi mở Long |
| `evt_17_living_corridor` / E16 | Mạng khí hồi áp cho thấy tuyến tới vùng rễ/ẩm trên cao, nơi nút sống vẫn mất liên hệ | Long cảm/chỉnh lane cục bộ đã học, receiver cổ giữ trạng thái nhánh; không phải S3 kiểm soát cả map | Điểm trú giữa nhánh, đường quay về Phong Vân và các trạm thermal; không xóa đường cũ khi mở mới |
| `evt_23_activate_gate` / E22 + bốn hệ | Không là transition sang hành tinh: công trình Vạn Sinh đáp ứng khi tuần hoàn phối hợp ổn định, cho tín hiệu/cửa nhìn | Các đóng góp nước/nhiệt/khí/sự sống là trạng thái đã ghi nối tiếp; không equip bốn form hoặc cả bốn stage III | Sau epilogue người chơi vẫn ở Vạn Sinh, có route trở lại; không loading một hành tinh trống hay exit đẩy vào nội dung chưa làm |

E viết tắt event số trong [timeline](STORY_TIMELINE.md); IDs đầy đủ là authority. Số lượng trạm/đoạn, physics lift/áp, animation và art đều chưa chốt. Quy tắc route phải được prototyping theo envelope Task 04; một blueprint text không chứng minh rồng dài hoặc Phoenix đã vượt đường này trong runtime.

## Choreography có điều khiển — PROPOSED

I→II: nước sáng dần, áp giảm và mặt nước phản sáng mở một chân trời, vẫn cho bơi/hãm/chạm thay camera cắt mất agency. II→III: cánh ngà/crimson đi qua hơi ấm rồi mây lạnh, có nhịp tự đáp và nghe luồng khí khác, không cutscene bay toàn đoạn. III→IV: độ gió xiết giảm thành ẩm và vật liệu sống, tiếng/tín hiệu rễ thay âm khí, phân biệt Vạn Sinh với một đảo gió có vài cây.

Không đảm bảo thời lượng hay đòi thiết bị/camera technique mới. Nếu cần cinematic ngắn, phải skip/replay và commit event theo cùng điều kiện, không dùng việc xem hết phim làm một flag mà thiếu route thật.

## Transaction chuyển vùng — PROPOSED

1. Kiểm tra prerequisite main flags, destination assets/checkpoint/placement và capability thực sự có. Chưa đủ thì feedback ở safe boundary, không trừ reward/reset.
2. Ghi transition intent source/destination, chọn route checkpoint an toàn. Không đổi region khi pending transformation/active boss lock chưa kết thúc.
3. Sau destination loaded/placement viable, commit arrival + return edge + checkpoint/reward một lần. Chỉ lúc đó xem event transition complete.
4. Ngắt/reload precommit → source checkpoint; postcommit → destination checkpoint; không duplicate grant/chapter open hoặc rơi giữa hai scene. Nếu destination thiếu asset thì giữ source và báo gap, không “teleport tạm” sang Dawn.

Không cần unequipped optional species: trước boundary có chỗ mở collection; nếu bắt buộc một Sacred main chưa equipped thì hướng dẫn đổi tại chỗ an toàn, không sửa membership giữa boss. Nếu main form tạm disabled bởi narrative event, event đó phải có rescue/alternative đã thiết kế hoặc chờ phục hồi ở vùng trú; không bắt đi vào route không thể quay lại.
