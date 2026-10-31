# Phạm vi first playable Quy

**PROPOSED Q18-P09**, chuẩn bị nhỏ nhất đủ kiểm loop coherent, không chứng nhận đã có playable Quy. Mở đầu Task17 là gói trải nghiệm; demonstrator combat C14 đặt sau tutorial an toàn hoặc scene test được duyệt, không nhét enemy vào buồng thức. Stage II/III không là dependency để test movement I.

| Mức | Gameplay/content cần | Art/technical cần | Tiêu chí nghiệm thu tương lai |
| --- | --- | --- | --- |
| Bắt buộc first playable | Stage I, một dạng, bơi/turn/brake, current yếu, một contextual receiver, basic Chấn Mai, short brace, Vành Nước, hurt/incapacity/interaction | Reference và Stage I directions, clips/markers, footprint/anchor/hurtbox, current/collision/action resolver, one Water FX và cue không FX | Input đáp rõ, miss/guard có counterplay, một Quy đủ tuyến, không xuyên đá/softlock |
| Bắt buộc tích hợp opening | E01 prebody→memory→form commit→practice và cửa; safe resume | Task17 scene/quest hooks, source validation, atomic writer/save, memory receipt mapping | Unlock đúng một lần, memory trước thân, load sau form không quay prebody |
| Khuyến nghị cho Chương I | Ground/water transition nơi được author, ecological observation, refuge/return, E02 encounter/quest và persistence thực | Water level art/props/audio, route/camera tests, status/receiver contexts cần dùng | Không all-water immunity hoặc reward duplication; giữ nhịp điều tra |
| Hoãn | Full stage II/III production sprites, S2/S3, complex pressure graph, timed counter, nhiều reaction, advanced depth layers | Later anatomy/geometry/FX production và tuning | Không chặn sandbox movement/basic I vì chưa có những phần này |

First pass movement có thể dùng approved anatomical blockout trong môi trường test tương lai, nhưng **không** được coi là production-ready hoặc âm thầm dùng Phoenix làm Quy. Combat-ready yêu cầu clip/telegraph/marker compatible, không idle giả tấn công. Production release cần approved assets/provenance và durable adapter; prototype in-memory không chứng minh save ready.

## Thứ tự phụ thuộc triển khai sau khi duyệt

1. Chốt Q18-U01–U04 tối thiểu, blockout anatomy/envelope I và mặt phẳng x–y, input semantic/movement test.
2. Build species/content adapter, geometry/current/camera và asset manifest hợp lệ; kiểm narrow/obstacle/braking trước combat.
3. Thêm C14 action/hit/defense và một Water effect với finite budget, kiểm hit/miss/multi-hit/interrupt.
4. Kết nối E01/task17 + W07/R03 memory/form/practice atomic receipts và migration; nghiệm thu reload/skip/revisit.
5. Chỉ sau đó mở rộng Chapter I assets/encounter và xét production II/III. Đây là handoff, không đang thực thi Tasks25–48.

Gate chưa qua gồm Q05 vật mang, manifestation, input/current/guard/resource/HP/recovery và save policies cần dùng, reference/clip Quy. Xem [decisions](TASK18_DECISIONS.md), [art spec](../art/QUY_ART_PRODUCTION_SPEC.md), [runtime gaps](../technical/QUY_RUNTIME_GAP_ANALYSIS.md). Không bắt đầu Task19 hoặc code trong Task18.
