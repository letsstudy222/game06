# Tiến trình riêng loài và tiến hóa Quy

**PROPOSED Q18-P08**, kế thừa [V13 evolution](../evolution/EVOLUTION_SYSTEM_OVERVIEW.md), [trigger Model D](../evolution/EVOLUTION_TRIGGER_MODELS.md), [P15 progression](../progression/PROGRESSION_SYSTEM_OVERVIEW.md), [mastery](../progression/SKILL_MASTERY.md). D07 XP riêng loài và ba major stage là CONFIRMED, không chốt level/curve/threshold/drop mới.

## Requirement graph ứng viên

| Bước | Nền / bằng chứng có ý nghĩa | Điều không bắt buộc mặc định | Kết quả |
| --- | --- | --- | --- |
| Chưa thân → I | E01 bootstrap hợp lệ theo Task17, không cần level/mastery hoặc đã có Quy | Đánh Quy, full3, phục hồi toàn hydrology, item hiếm | Form unlock/stage đầu qua existing sub-grant một lần |
| I → II | Đang I đã commit, tiến trình Quy đủ theo thresholdRuleRef chưa duyệt; proof biết hãm/giữ hướng và đọc receiver có đường hồi | Farm block/cast count, có S2 trước mới lên II, mọi memory hoặc optional species | Eligibility II; transition ở safe context, không auto grant toàn skill II |
| II → III | Đang II, tiến trình riêng đủ, proof điều tiết cụm có hồi an toàn qua trial/quest được author | Dùng S3 trước mới lên III, mọi relic, all4 Sacred stageIII hoặc full origin memory | Eligibility III và transition nếu asset/geometry/lock hợp lệ |

Proof cụm trước III phải có thể đạt bằng các thao tác nhánh nối tiếp của II; S3 mới mở sau không là prerequisite của chính nó. I→II không yêu cầu Mai Định Áp trước khi đủ minimumStage II: dùng short brace/positioning/receiver baseline. Mỗi accessible alternative chỉ hợp lệ khi content author chỉ định nhóm tương đương; không tự bỏ required proof. Exact objectiveId/milestone/memory subset và thresholds cần Q18-U05/V13/P15 approval trước production data.

Mastery đo finite meaningful objectives: Chấn Mai đúng opening có threat hoặc safe trial, hãm tới refuge có kiểm soát, điều tiết receiver có hậu quả đã xác minh. Không credit spam vào vật unchanged, tự gây damage/heal hoặc toggle lại để mint XP. Read existing masteryObjectives/evidence, không thêm mastery bar/currency. Memory chỉ là candidate subset nếu được requirement graph chỉ định; E01 mem_quy_first_sense không thành “đã hiểu biến cố”, không tự thay mem_quy_current. Story awakening, evolution và restoration là ba kết quả khác nhau.

## XP, skill và tính liên tục

XP tích lũy thuộc `quy_hai_uyen`, không chia cho từng stage. P15 distribution D là khuyến nghị bounded meaningful participation/milestone foundation, không approval thay R03 active-only; Task18 chỉ nhận kết quả attribution của owner P15. Quy reserve không tự nhận XP vì có mặt trong loadout. Released effect giữ source Quy/cast snapshot kể cả khi đổi active form; active form mới không chiếm credit.

Giữ basic/mobility/S1/passive và evidence đã có qua II/III. minimumStage mở eligibility, `unlockedSkillIds` vẫn cần explicit grant/requirements; không gán S2/S3 chỉ vì asset đã tải. Successor/alias mapping nếu có phải giữ canonical cooldown/cost và mastery history, không đổi ID để reset nợ. Không reset XP khi evolution hoặc tiêu XP như tiền chưa duyệt.

## Transition và save

Đọc stage/progress/evidence owners → kiểm lock/safe context → validate target anatomy assets/config/movement/footprint/envelope và đường về → build candidate stage + visual/config selection + pending benefits cùng existing revision → durable commit theo [W07](../world/WORLD_STATE_TRANSITIONS.md) → publish. Không clip callback tự đổi stage.

Eligibility trong boss có thể được ghi, transition/config benefits hoãn theo V13/L16 proposal, không vượt frozen membership/config. Không đủ chỗ/asset thì giữ stage cũ và pending eligibility, chỉ dẫn safe area; không mất XP hay ép revert I sau commit. HP ratio mapping, HP0 giữ HP0, CD/status carry-over là proposals chưa duyệt; không full heal/cleanse/evolution rescue. Trước triển khai phải chốt mapping dưới health model được chọn, không tạo second HP owner ở stage profile.

Before durable: load stage cũ; after durable: load stage mới/config cùng receipt, không lặp benefits. Migration alias giữ species/form/stage/ability identities và source claims; contentVersion không grant lại. Bản cũ giữ backup, không silent reset khi missing definition. Xem [data spec](../technical/QUY_DATA_SPEC.md) và [tests](../technical/QUY_TEST_CASES.md).
