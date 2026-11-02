# Hợp đồng trạng thái và lưu mở đầu

**PROPOSED O17-P06/P08**, không storage adapter hoặc schema đã triển khai. Giữ [W07 transaction](../world/WORLD_STATE_TRANSITIONS.md), [reward consistency](../economy/REWARD_CONSISTENCY.md), [resonance model](RESONANCE_DATA_MODEL.md) và [E01](../story/STORY_IMPLEMENTATION_HANDOFF.md) làm authority. Không có ledger “opening” mới.

## Phân loại và writer

| Dữ liệu | Phân loại / owner | Lưu và dựng lại |
| --- | --- | --- |
| Awareness/signal/contact evidence | Tiến độ objective của E01, do quest/event owner đề nghị W07 writer | Dữ liệu step trong tiến độ hiện có nếu schema được duyệt, không ba boolean global song song; chưa durable có thể thực hiện lại ở anchor |
| source_validated | Sub-completion/evidence nguồn của E01 | Revalidate điều kiện tạm trước form commit; không coi nguồn từng hợp lệ là đủ mãi mãi |
| Cộng hưởng đang diễn / phần trăm FX | Scene state/intent tạm | Không là unlock; reload bỏ hoặc reconcile intent, không cộng thời gian offline |
| mem_quy_first_sense | Memory unlock/evidence theo R03 memory owner | Một memoryId với provenance; replay không reward; không đồng nhất với mem_quy_current của E03 |
| form_committed / dạng và placement | Sub-completion E01 + unlock/active selection theo R03/loadout owner, cùng writer W07 | Atomic với sub-grant và safe placement; không thêm scene-owned activeForm hoặc unlock flag |
| quy_awake / first_body_acquired | Alias/projection từ form_committed theo S05/W07 | UI/scene đọc, không writer riêng; không buộc parent event complete mới có cơ thể |
| Cửa mở cục bộ / practice evidence | Local mechanism patch và quest progress theo W07 | Persist patch cùng evidence có liên quan; replay dựng đúng vị trí, không gọi toggle |
| practice_complete / parent completion | Event/quest owner, parent grant R0 | Sau practice/exit đã đủ; không gộp làm unlock lại dạng |
| Prompt dismissed, camera, cue đã phát | Presentation; feedback có thể lặp | Không dùng thay achievement; có thể khôi phục từ phase/evidence |
| Objective hiện hành, hướng mũi chỉ | Derived UI | Tính từ E01/E02 state; không có authoritative quest thứ hai |

## Boundaries đề xuất

1. **Trước cơ thể:** giữ last-good bootstrap anchor, progress đã commit và memory evidence. First memory phải được xử lý ở b05 trước b06. Mem provenance ứng viên: nguồn cấu trúc bảo tồn E01; cảm nhận giữ dòng và CL05, era chưa xác định, nguyên vẹn thấp, góc nhìn không biết danh tính; diễn giải không là fact lịch sử.
2. **Memory boundary:** dùng cùng memoryId `mem_quy_first_sense` của S05 và cơ chế unlock/dedupe R03. Commit memory unlock + evidence/receipt phù hợp trong W07 trước cho qua b06; không claim parent R0 sớm chỉ để lưu ký ức. **UNRESOLVED O17-U04:** schema phải map memory component/sub-completion tới receipt hiện hữu và stable source identity trước triển khai. Không tạo ledger riêng, không tự đặt một rewardGrantId mới ở đây. Nếu mapping không có, dừng triển khai boundary này để duyệt, không trì hoãn ký ức sang sau form để né lỗi.
3. **Form boundary:** validate source + memory evidence + safe placement; build candidate gồm E01 form_committed, `grant_evt_01_quy_awakes_form`, `form_quy_hai_uyen` unlock, active selection/placement và owner revisions. Cả write-set durable cùng nhau, rồi mới publish. Không chấp nhận unlock durable nhưng active placement chưa có. `quy_s1` là stage candidate, không unlock nữa.
4. **Practice boundary:** local mechanism/evidence đi cùng patch liên quan; đủ bài bơi/hãm/cơ cấu và safe exit thì commit practice_complete + parent `grant_evt_01_quy_awakes` R0 + quest completion/consequences. Parent không cấp lại dạng hoặc ký ức đã mở. E02 chỉ được đề nghị/hiển thị, không tự complete.

Form ID duy nhất dùng cho dữ liệu là `form_quy_hai_uyen`; cần catalog mapping tới species/stage theo R03/C04 trước runtime. Không lấy chuỗi hiển thị hoặc tên stage làm key.

## Identity và retry

Theo W07/P15, source-level unique claim: saveId + canonical event/target nếu scoped + reward component; stable grantId tham chiếu nguồn. Recipient allocations `grantId + recipientId` là components của cùng receipt trong **RewardGrantLedger**, không nguồn thưởng độc lập. Form sub-grant và parent là hai nguồn logic S05 đã tách. Retry source đã claimed trả toàn bộ payload/recipients cũ; đổi active form không cho claim mới. UniqueRewardClaim chỉ projection, không ledger khác.

Content/schema/payload versions pin định nghĩa và migration, không tạo identity thưởng mới. Sửa caption, memory presentation hoặc tên stage không cấp lại. Không cấp EXP/tài nguyên chưa có approved payload; không giả định XP bằng một số cụ thể. UI/audio/animationEnd chỉ đọc committed result, không có quyền grant.

## Tải lại, lỗi và sửa trạng thái

| Tình huống | Kỳ vọng và khôi phục |
| --- | --- |
| Đóng trước resonance | Trở lại bootstrap anchor hợp lệ, giữ memory/evidence đã durable; không mất nguồn, không tự có Quy |
| Reload đang resonance, chưa commit | Reconcile intent; giữ last-good prebody, retry cùng identity sau revalidation |
| Form commit xong, feedback chưa hết | Dựng Quy tại practice anchor; thông báo có thể ngắn lại, không grant lần hai hoặc quay prebody |
| Memory trigger hai lần | Tra cùng memory identity/receipt; chỉ phát lại, không duplicate unlock/XP |
| Đóng/skip prompt | Bài học còn thiếu tiếp tục được đề nghị; dismissed không là complete |
| Revisit sau E01 | Cửa/đường về từ persistent patch; replay tùy chọn; không reset event hoặc source claim |
| Thiếu alias quy_awake | Dựng lại từ form_committed/receipt chính, không mint unlock vì một boolean |
| Thiếu authority hoặc receipt mâu thuẫn | Validate/quarantine bản lỗi, dùng last-good generation hoặc yêu cầu recovery; không bịa completed phase/đổi dạng để vá |
| Save cũ opening khác | Migration có alias map/event+memory+grant identities được duyệt, giữ claims và bản gốc; nếu chưa có map thì báo không tương thích/recovery, không tự reset progression |
| Quota/denied/atomic write lỗi | Giữ last-good; không publish “đã lưu”; retry cùng candidate/identity. Không chuyển sang gameplay có phần thưởng durable giả |
| Source/placement mất hợp lệ trước commit | Reject/defer, quay anchor phù hợp; không noclip/teleport metaphysics hoặc cấp optional species |
| Hai callbacks/skip/focus cùng tới | Serialize theo expected revision/command, kiểm receipt; một kết quả, không callback thắng race |

Boundary durable cần adapter có atomic-equivalent versioned snapshot/recovery record như W07, acknowledgements và integrity validation. Chính sách retention, storage/migration UX/export Q16 chưa được chọn. Không coi localStorage settings hiện có là game save. Missing presentation flag có thể derive; missing authority không được tự suy thành thành công. Chi tiết retry vẫn PROPOSED, cần gate trước triển khai. Xem [ca kiểm chứng](OPENING_TEST_CASES.md).
