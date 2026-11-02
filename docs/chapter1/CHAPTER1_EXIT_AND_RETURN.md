# Lối ra bờ và đường quay Hải Uyên

**PROPOSED H19-P10**, theo [S05 E05/E06](../story/STORY_IMPLEMENTATION_HANDOFF.md) và [W07 chapter states](../world/CHAPTER_01_WORLD_STATES.md). Không thiết kế toàn Chương II, không nhận Dawn/Đảo Bình Minh prototype là Nhật Diệm canon hoặc đổi map hiện tại.

G→I chỉ available sau E05: kênh hồi ổn định hé lối theo sườn biển. Từ I, nền đá dần ít bồi, ánh nước bớt xanh sâu, khe có dấu nhiệt nhẹ và chỗ nghỉ đủ rộng. Đây là bằng chứng cần kiểm nối đầu nhiệt, không full Phượng appearance/lore reveal. Quy I vẫn bơi/read flow đến chỗ trồi được author, không cần có Phượng trước để mở Phượng hoặc bắt bơi 3D tự do.

| Boundary | Evidence / commit | Kết quả và return |
| --- | --- | --- |
| E05 complete | Cấp/hồi/refuge đã xác minh, source completion W07 | gi và shortcut ib available; chưa arrived_nhat_diem, chưa route_sea_open alias E06 |
| E06 transit intent | Người chơi chọn đi, source anchor I hợp lệ, destination N content/geometry/envelope ready | Chuẩn bị route/return/checkpoint candidate; chưa coi tới đích vì camera đổi |
| E06 arrival durable | Traversal giảm độ sâu qua connectors, destination và đường về đã validate | arrived_nhat_diem + route_sea_open projections, source/destination/return refs và placement cùng revision |
| Load trước/đang commit | Reconcile receipt/last-good | Chưa commit thì ở I; không lost between scenes hoặc auto give new form |
| Load sau commit / quay về | Đọc arrival và return edge cũ | Ở N hoặc trở I theo transition accepted; giữ E05 stable, không regrant E06 |

Return N→I→G/B/A hoạt động cùng capability đã dùng để tới N, có source/arrival anchors và checkpoint phù hợp Quy. Nếu đổi form ở chương sau không phù hợp nước, check transition/loadout placement trước crossing, đề nghị safe selection theo policy hoặc defer; không auto grant/equip/teleport để cứu lỗi. Không khóa vĩnh viễn chapter cũ sau cutscene, không main reward miss vì rời đi.

Post-restoration: B/D observation/refuge, E archive và F optional tiered route còn giá trị, không reset guardian E04 để farm. F vẫn có pressure risk, ecology hồi phục có giới hạn chứ không all-hostile removed. Optional content thêm sau phải giữ aliases/claims/route coverage và không yêu cầu replay main để nhận lại reward cũ. [Map data](../technical/CHAPTER1_MAP_DATA_SPEC.md) và [tests](../technical/CHAPTER1_MAP_TEST_CASES.md) giao transaction/migration/revisit validation cho nhiệm vụ kỹ thuật sau.
