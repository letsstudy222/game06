# Trạng thái Chương 01 — Vực Hải Uyên

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Region `hai_uyen`, chapter_01. Các phase ID dưới là **derived display identifiers**, không saved enum. Đọc bảng từ cuối lên: chọn predicate đạt cao nhất; sub-objectives/nhánh object được lưu theo owner, không chỉ mỗi nhãn tổng quát. E## trỏ [24 events nguồn](../story/STORY_IMPLEMENTATION_HANDOFF.md).

| Phase | Trigger / predicate | Visual | Navigation | Enemy / creature encounters | Quest availability | Environmental interaction |
| --- | --- | --- | --- | --- | --- | --- |
| sea_dormant | Chưa form_committed của evt_01_quy_awakes | Sanctuary lặng, coral còn sống xen kiến trúc sập; không toàn biển tối | Chỉ bootstrap tới hạch, chưa yêu cầu bơi trước có thân | Wildlife ở túi nước tách; guardian canh cửa; không tự hostile mọi loài | Main E01; chưa đưa journal/combat đầy đủ | Tín hiệu hạch; không cần Quy để mở Quy |
| sea_disturbed | E01 form_committed, chưa hoàn tất E03 | Vệt dòng cục bộ sáng, phù sa chuyển báo dòng mới | Bơi tập/chỗ trú, đường rạn; chưa có surface route | Territorial cảnh giác theo vị trí; sinh cảnh Thủy–Lôi là candidate, có vùng sống yên | E02 quan sát/journal rồi E03 điều tra; ký ức tùy chọn sau bằng chứng | Quy đọc dòng; receiver cổ giới hạn áp |
| sea_restoring | E03 complete, chưa E05 complete | Các nhánh đã sửa có dòng hồi, rạn bệnh chưa lành tức thì | Bypass bảo vệ refuge, cửa tới E04; không coi boss thắng là mạng đã hồi | Predator còn lãnh thổ, guardian outcome đổi ở E04; refuge giữ adapted organisms | E04 xung đột và E05 xác minh; optional công nhận cơ cấu đã sửa | Đọc chênh áp, test receiver và đường xả an toàn |
| sea_stabilized | E05 complete | Kênh chính vận hành, sáng dịu/ruins chọn lọc hoạt động; recovery có dấu hiệu chứ không hồi sinh | Surface entry available trước E06; E06 arrival tạo return edge; trench optional còn nguy hiểm | Wildlife phân tán sang secondary habitat; patrol giảm theo outcome chứ không tất cả neutral | Post-chapter reef/archive/resonance ở refuge; main không reset | Cơ cấu nhánh, tuyến sâu Quy vẫn riêng; dạng mới mở alcove optional |

## Hệ quả và giới hạn

Bảo tồn dòng hồi và refuge là điều kiện E05, không phần thưởng tự suy sau khi giết guardian. Vị trí cá thể quan trọng được relocate ở boundary, dòng combat ngắn không đổi pha. Quy vẫn cần cho vùng ngập khi đã có Phượng.

Tất cả phase cần base map + conditional objects/layers, không bốn map độc lập. Lighting/SFX chưa có asset production cho chương này. Enemy behavior là profile/habitat theo projection; không force toàn AI đổi cùng frame hoặc nhân đôi unique actor. Nếu collision/hazard đổi khi đang đứng tại đó, preflight safe placement rồi commit, hoặc defer.

## Sau reload / trở lại

Dựng phase từ completion/sub-completion, áp đúng variant mutable đang lưu, dựng habitat rules theo catalog revision. Không chạy lại grant hoặc animate toàn lịch sử. Ký ức đã thu có dấu đọc lại, không trả thưởng lại. Các đường về và coverage loài chưa gặp phải hợp lệ trước commit cuối chương; failure giữ bản committed trước theo [transitions](WORLD_STATE_TRANSITIONS.md).
