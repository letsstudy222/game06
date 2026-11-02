# Level curves và mở rộng nội dung

**PROPOSED P15-P04**, không max level, EXP/level, growth multipliers hoặc chapter brackets cuối. R03/C04 levelProgression refs là authority catalog; [data](../technical/PROGRESSION_DATA_SPEC.md) mô tả view, không writable level store mới.

## So sánh

| Approach | Ưu điểm | Rủi ro / kiểm tra |
| --- | --- | --- |
| Linear requirements | Dễ hiểu/dự đoán, tuning đơn giản | Encounter EXP tăng nhanh có thể vượt curve, late levels quá rẻ; nếu EXP source cố định có thể lại dài |
| Increasing polynomial | Tăng effort mượt, ít bảng | Hệ số/exponent sai gây late grind; expansion làm gap rộng, không tự chọn công thức |
| Segmented | Early học nhanh, mid ổn định, later mở rộng theo competencies | Discontinuity/level cliff nếu segment join sai; cần explicit cumulative boundaries/version |
| Species-specific modifiers | Có thể phản ánh content/use pattern | Rarity XP tax, bắt farm mỗi loài, khó so/share/catch-up; không anatomy tự nghĩa chậm lên cấp |

Khuyến nghị segmented **shared curve family** trước; species tham chiếu progression profile, không multiplier tùy tiện vì Sacred/dual/rarity. Chỉ exception có evidence/content review, không default modifiers. Không cần minh họa số để đặc tả: cumulative threshold `T(level)` tăng nghiêm ngặt, incremental cost dương, không đổi âm/NaN; derived level là mức cao nhất đủ threshold trong version được support. Đây là quan hệ validation, không final formula.

## Pacing và cap semantics

Early progression cho thấy reward→growth với vài meaningful objectives, không lên level mỗi thao tác; late progression mở tactical breadth/stage/skills và challenges, không exponent vô hạn. Tune bằng distribution thời gian/nguồn EXP và route exploration/combat có lời giải; chưa playtest. Main-story execution checks không thay bằng level wall hoặc full collection requirement. Không bắt đạt cap để finish cung.

Nếu future policy có cap: giữ cumulative earned EXP và receipt, derived level hiển thị không vượt supported cap; XP trên cap thuộc cùng total, không spendable overflow currency/record cộng hai lần. Extension có thể làm old overflow đủ threshold mới nhưng **áp benefits tại safe boundary**; amounts/caps/migration cần duyệt P15-U02. Nếu không chọn bank-at-cap policy thì phải có migration riêng có nguồn, không silently delete earned receipts. Không final cap được Task15 chọn.

## Version và expansion

Definition version giữ threshold semantics của save: thêm segments/stages không reset XP/skills hoặc đẩy lùi level earned. Curve rebalancing cũ cần explicit migration và preserve earned level floor/proof theo version, không lưu thêm mutable level cạnh totalXP. Tránh đổi threshold contentVersion rồi reload nhận lại level-up reward: level transitions là derived change, perks/unlocks chỉ explicit grant keys, không auto thưởng từ việc dựng UI.

Save pin curve version; content migration validated/backup trước promote. New profile thiếu curve fail runtime-ready, giữ owned data/quarantine unsupported activation; không default curve ngẫu nhiên hoặc reset về level đầu. New chapter unlock không auto highest-player level hoặc grant mọi skill/stage; economy budgets/reward profile versions riêng nhưng logical unique keys giữ. Curve registry migration phải atomic với XP/progression receipts, không ghi half-old/half-new. Max level/segment boundaries/source amounts/expected pacing targets P15-U02 còn mở.
