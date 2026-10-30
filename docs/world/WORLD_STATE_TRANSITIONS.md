# Giao dịch và chuyển trạng thái

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

## Lifecycle và một logical transaction

1. Đọc revision đã commit; đánh giá prerequisite, capabilities, boss lock, habitat coverage và route an toàn.
2. Tạo operationId ổn định cho lần yêu cầu; ghi intent nếu cần khôi phục hành trình, chưa coi event complete.
3. Người chơi thực hiện hành động; preview/animation/temporary hazard không cấp reward vĩnh viễn.
4. Kiểm completion evidence, actor outcome, placement, version và write-set một lần nữa.
5. Dựng candidate authoritative completion/sub-completion, outcome, region/local patches và quest evidence.
6. Dựng grant payload cố định và ledger key, recipient progression cùng candidate; chưa công bố là đã nhận.
7. Tính consequences: habitat/refuge, route đi-về, checkpoint và critical actor placement hợp lệ trên candidate.
8. Commit candidate như **một đơn vị bền vững** gồm bước 5–7 và reward recipient/ledger; chỉ sau xác nhận durable mới thay revision đang chơi.
9. Publish projection và thông báo systems bằng commitId/revision. Notification có thể lặp, consumer không cấp reward lại.

Thứ tự 5–7 là xây candidate, không chuỗi mutate độc lập. Không có trạng thái đã thắng boss nhưng thiếu outcome/quest proof hoặc nhận XP mà ledger chưa lưu. Cosmetic/audio có thể bắt đầu sớm nhưng không báo “đã lưu” trước acknowledgement. Adapter không bảo đảm atomic multi-key phải cung cấp cơ chế tương đương versioned snapshot + recovery record; không chọn thư viện trong task này.

## Keys và replay

| Trường hợp | Key / kết quả |
| --- | --- |
| Story một lần | saveId + eventId + targetId (nếu scoped); cùng key trả committed result, không chạy reward manifest hiện tại |
| Awakening | eventId + source_validated/form_committed/practice_complete; sub-grant `_form` và parent grant riêng như Task05 |
| Lựa chọn mutable | operationId duy nhất cho yêu cầu được chấp nhận, expected owner revision; retry giữ cùng ID/payload, lựa chọn mới có ID mới |
| Unique reward | stable grantId + recipientId trong save; không thêm contentVersion để lách dedupe; grant và recipient update cùng commit |
| Repeatable | encounterId + occurrenceId được reset policy cho phép; story grant vẫn key độc nhất không theo occurrence |

Random reward nếu sau này duyệt phải chốt payload/seed trong candidate và retry cùng kết quả; không roll lại khi animation hay mạng chậm. Không dùng timestamp/notification order làm thứ tự nội dung.

## Tranh chấp và deterministic ordering

Một durable writer nhận command đã có sequence; mỗi write-set có expected region/object revision. Hai event sửa cùng property: commit đầu hợp lệ, event sau revalidate hoặc báo conflict và cho thử lại, không last-writer-wins âm thầm. Hai write-set độc lập có thể được tuần tự hóa và kiểm lại; chỉ merge khi chứng minh commutative. Không dựa thứ tự callback load asset. Region phase suy từ tập facts với precedence bảng chương; weather không thắng milestone.

## Interrupted save và boundary

Trước durable commit: last known good snapshot còn nguyên; trong session có thể retry cùng candidate, reload sau crash về checkpoint/attempt cũ. Sau durable commit nhưng trước cue: load kết quả mới, không cấp lại hoặc đấu lại unique boss. Không cho giữ damage boss với loadout mới: reload attempt chưa thắng abort/reset trước khi cho đổi bộ.

Lưu snapshot mới vào generation được kiểm version/integrity trước khi thay committed reference; giữ generation tốt trước. Nếu quota/storage denied/corruption: không giả đã lưu, giữ bản tốt, cung cấp retry/export contract tương lai; không xóa progression hoặc trả thưởng lần hai. Journal incomplete không được suy thành completion. Migration ghi ra bản mới sau validate, không phá bản cũ trước.

## Preflight sinh thái và an toàn

Candidate cần route/return/checkpoint có clearance cho envelope hiện tại và loadout khả dụng, habitat coverage cho cả loài chưa discovered, actor độc nhất không nhân đôi, unique reward ledger khớp. Nếu thay đổi khi đang boss hoặc giữa transition có nguy cơ nhốt: queue ở boundary an toàn; không đổi membership trong trận. Không có placement hợp lệ thì từ chối/defer thay đổi; fallback về anchor đã validate sau abort attempt. Không invent spirit noclip/loài optional để cứu gate.

Temporary cast chỉ có thể đề nghị persistent event khi đúng receiver, prerequisites và completion evidence; expiry không đảo milestone. Reapply load chỉ dựng consequences, không chạy thao tác commit lần hai. Xem [test cases](../technical/WORLD_STATE_TEST_CASES.md).
