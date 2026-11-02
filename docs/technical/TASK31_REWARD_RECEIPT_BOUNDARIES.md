# RewardGrantLedger và receipt boundary

Nguồn authority: [reward consistency](../economy/REWARD_CONSISTENCY.md), [W07 transitions](../world/WORLD_STATE_TRANSITIONS.md), [R03 model](RESONANCE_DATA_MODEL.md) và [opening save contract](OPENING_STATE_AND_SAVE_CONTRACT.md). Task 31 không sao chép định nghĩa domain thành ledger mới.

Một RewardGrantLedger authority giữ hai cấp: canonical source-level unique reward claim và recipient-level grants của cùng resolved source/grant. grantId+recipientId định danh allocation, không tạo nguồn thưởng mới. Content/schema version, reload, import hoặc backup recovery không cấp lại source, không chọn recipient mới.

Physical generation serialize snapshot đã được authority cung cấp. Storage không apply EXP/item delta, không phát reward callback và không suy completed quest từ render. requestId của writer và revision không phải canonicalGrantKey hoặc occurrenceId. Event outcome, ledger receipt, recipient updates và world patch cần logical candidate theo policy được duyệt; atomic row không tự quyết định thời điểm tạo candidate.

Fixture payload.RewardGrantLedger chỉ là test codec minh họa một nguồn dữ liệu chứa sourceClaims/recipientGrants và uniqueness. IDs đều fixture.*, không source Chapter I production. Round-trip kiểm payload/receipts/worldState không đổi; thay supported content version không phát grant. Không có claims store thứ hai. Validation fixture không được gọi là schema canonical hoàn chỉnh của mọi phần thưởng.

Resonance encountered, memory recorded, resonance confirmed, playable unlock, reward granted và quest projection là các facts khác nhau. Giữ nguyên thứ tự narrative và canon CONFIRMED trong nguồn. Mapping memory component/source identity tới durable receipt của O17-U04 vẫn UNRESOLVED; các transaction boundaries O17-P06/P08 còn PROPOSED, không được tự chốt bởi storage; không nối first Quy resonance vào writer. Trước Task 57–64 phải duyệt receipt/source mapping, retry/ack ordering, milestone write-set và durable publication. Trước combat/reward production cũng cần approved source/attribution/health policies.

Storage bảo vệ CAS/integrity, nhưng **không chứng minh domain monotonicity** của mọi snapshot caller có thể gửi. Production contract chưa đăng ký; future domain validators phải giữ earned progression/immutable receipts và checkpoint consistency. Không dùng snapshot fixture mới để reset progression thật hoặc lấy vật lý commit PASS thay cho Layer C approval.
