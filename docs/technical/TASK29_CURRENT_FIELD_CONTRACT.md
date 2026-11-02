# Dữ liệu và query dòng chảy

**CONFIRMED D29-MAP-03:** vector vật lý độc lập visual FX. [CurrentFields](../../src/island/CurrentFields.mjs) không ghi actor, áp lực, velocity, HP hoặc save.

| Trường | Quy tắc |
| --- | --- |
| currentId | ID unique trong map |
| mapId | Phải khớp map chứa field |
| bounds | Rect world-space dương trong map; trái/trên đóng, phải/dưới mở |
| direction | Vector x/y hữu hạn, chuẩn hóa một lần khi prepare |
| strength | Số hữu hạn không âm; chưa quy định đơn vị lực hoặc giá trị production |
| enabled | Boolean tùy chọn, mặc định true |
| stateBinding | Reference tùy chọn tới authority môi trường hiện hữu |
| visualEffectRef | Reference tùy chọn; không bắt buộc có FX production |

Direction zero chỉ hợp lệ khi strength=0. Strength=0 không gây lực; query vẫn có thể trả field để tooling biết khu vực. Vector không hữu hạn, bounds sai, duplicate ID hoặc mapId sai đều error. Prepared fields và vector/bounds readonly; query yêu cầu vị trí hữu hạn.

`getCurrentAt(position, preparedFields, mapState)` trả danh sách field đang enabled tại vị trí, sort currentId ổn định. Overlap trả từng field riêng, **không tự chọn thắng, cộng lực hoặc normalize resultant**. Chính sách compose/cap/blend và đơn vị strength còn UNRESOLVED cho Task 43; không lấy giá trị fixture làm balancing.

Field có stateBinding đọc `mapState.resolveBinding(reference)`; resolver phải trả boolean từ owner có thẩm quyền. Thiếu resolver/không biết binding thì báo CURRENT_BINDING, không âm thầm bật hoặc lưu thêm truth store. enabled=false không cần resolver. Không định nghĩa event production mới, không override RegionState/LocalObjectState hoặc RewardGrantLedger.

`LayeredMapView.getCurrentAt` là wrapper cùng query. Tùy chọn draw `debugCurrents` vẽ bounds và vector để tooling kiểm; không là particle engine và không là source gameplay. Tắt debug/FX không đổi prepared field/query hoặc actor. visualEffectRef mới chỉ giữ reference, chưa tự resolve/load asset; production cue bắt buộc phải được validate lúc scene integration sau này. Task 43 mới phối hợp current với controller và solver Task 45.
