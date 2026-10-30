# Mô hình danh tính và phòng thủ

**Task10 — PROPOSED:** đặc tả để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline kiểm tra `38b8c1c`, 30/10/2026 Asia/Saigon. [Decision register](TASK10_DECISIONS.md) phân biệt nền CONFIRMED, recommendations và UNRESOLVED.


## Identity alternatives — E10-P01

| Mô hình | Lợi ích | Rủi ro | Đánh giá |
| --- | --- | --- | --- |
| A ordered primary/secondary | Trình bày specialization dễ; validation hai vai rõ | Thứ tự giả thành hierarchy, cùng pair bị nhân bản; dễ suy primary thắng hoặc secondary bonus | Chỉ dùng nếu có thiết kế gameplay riêng được duyệt; chưa chọn |
| B unordered equal membership | Canonical comparison đơn giản, không hai thứ tự thành hai loài | Hai hệ bằng membership không mô tả anatomy/kit, không giải reaction attribution | Dùng kỹ thuật membership, không tự chia damage đều |
| C species-specific profile | Hai affiliation, từng skill tự khai báo expression; giữ sinh thái và trade-off | Nhiều validation/content review hơn, không được tùy tiện miễn kháng | Khuyến nghị; dùng unordered membership của B cho canonical identity |

Primary/secondary có thể là presentation emphasis hoặc metadata lịch sử, không strength/order mặc định. SpeciesId sở hữu identity, pairKey chỉ chỉ mục tra cứu, không tạo formId từ cặp. Hai loài cùng cặp vẫn progression độc lập. Serialization đề xuất unique sorted elementRefs theo stable ID và version; `lightning + water` là canonical membership, display “Thủy–Lôi” không phụ thuộc thứ tự lưu. Không suy formula từ array index. Import ordered metadata giữ provenance, không sort rồi đổi mechanics/XP. Có hai refs giống nhau là invalid dual; len1 single, len2 distinct dual, hơn2 chưa hỗ trợ; unknown refs draft/quarantine, không tự tạo element.

## Resistance alternatives — E10-P02

| Approach | Ưu điểm | Rủi ro | Khuyến nghị |
| --- | --- | --- | --- |
| A average | Dễ giải thích khi hai bảng chuẩn đã có | E09 chưa có bảng approved; làm phẳng anatomy và ẩn weakness | Không chọn làm default |
| B dominant + modifier | Dễ giữ vai chính | Dominant chưa được duyệt; chồng bonus/kháng ẩn | Không chọn làm default |
| C authored species profile | Phân biệt channel, status, vật liệu, môi trường và cửa sổ yếu | Cần content constraints và review counterplay | Chọn làm recommendation, không final parameters |

Profile C tham chiếu ElementalResistanceProfile E09, không lưu một defense store thứ hai. Affinity chỉ là constraint/context, không tự cấp immunity; material conductive không suy electrical immunity, chịu nhiệt không tự có giáp mọi hướng. Physical defense theo anatomy/sector; status resistance theo trigger/owner; environment tolerance theo môi trường; vulnerability có điều kiện và cue. Các response cùng nguyên nhân gom causeGroup trước khi áp dụng, không nhân hai elemental resist rồi nhân trait armor cùng cause lần nữa.

Target kháng một component và yếu component khác: resolver xét mỗi allocated channel budget đúng một lần, không dùng max/min cả cặp hoặc miễn toàn hit. Một skill single chỉ có element thực sự declared; không xét hệ còn lại của attacker. Immunity nếu tương lai author phải scope cụ thể, có đường damage/utility phù hợp main form, không immunities kép tránh mọi damage. Các floors/caps/multipliers/duration vẫn E09-U02/E10-U02, chưa có con số kiểm chứng.

## Compatibility gate

C là đề xuất mới trong ranh giới E09-P12/U06; không nâng E09-P02 hoặc E09-P03 thành approved. Muốn runtime-ready phải chọn profile constraints, response rules, telegraph/counterplay, approved skill subset và actual assets. Chưa có lý do sửa Sacred affiliations, chronology hoặc first playable scope.
