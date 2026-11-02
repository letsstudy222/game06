# Save eligibility và checkpoint

**CONFIRMED Task 31:** hỗ trợ autosave ở milestone hợp lệ, manual save ở địa điểm an toàn và tiếp tục từ safe checkpoint đã commit khi rời trạng thái nguy hiểm. Không chốt mọi event đều save được hoặc đặt checkpoint production mới.

`requestSave` nhận trigger auto/manual cùng eligibility do gameplay/scene authority cung cấp. Cả hai cần state=SAFE_TO_SAVE và checkpointApproved=true; auto còn cần milestoneApproved=true. COMBAT_UNSAFE, TRANSITION_IN_PROGRESS, TEMPORARILY_BLOCKED, PERSISTENCE_UNAVAILABLE hoặc thiếu authority đều bị SAVE_BLOCKED. Storage không tự suy boss an toàn từ HP, vị trí hoặc animation.

Checkpoint reference sceneId/mapId/anchorId, zoneId tùy chọn, phải qua contract validator. Fixture chỉ cho fixture.scene/fixture.map/fixture.safe; không tuyên bố Dawn spawn, shrine hoặc mọi tọa độ Task 29 đã được duyệt làm save point. Camera/animation/current particles/input held không phải checkpoint authority.

Không có timer autosave hoặc beforeunload write. Hệ thống tương lai gửi milestone đã được duyệt kịp thời và chờ kết quả commit; browser đóng tab không bảo đảm async save kịp hoàn tất. Khi chưa có checkpoint mới hợp lệ, load giữ active safe snapshot trước đó. Không ghi transient mid-boss pose để rồi gọi đó là safe resume.

Eligibility đúng chưa đủ cho Layer C: source receipt ordering, pending reward/quest outcome, logical write-set và checkpoint nào đi cùng milestone vẫn cần approval. Nếu đã có durable completed progression, scene phải cung cấp snapshot nhất quán từ domain owners; persistence không tự xóa, grant lại hoặc suy thắng boss. Cách tách progress durable khỏi checkpoint khi đang nguy hiểm còn gate, không được tự chọn ở Task 31.

Manual save và import management không tạo menu production; harness chỉ gửi fixture. Load trả snapshot/checkpoint, chưa apply vào GameState/PlayerPhoenix. Không hồi đầy HP, cleanse status, tiêu tài nguyên hoặc phát lại quest khi load. S0 demo temporary và S1 durable gameplay vẫn tách biệt.
