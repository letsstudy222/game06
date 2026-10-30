# Sinh cảnh, quần thể và bảo toàn collection

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Nguồn hành vi/assimilation: [classification](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [assimilation](../ecology/ELEMENTAL_ASSIMILATION.md), [regional conflicts](../ecology/REGIONAL_CONFLICTS.md). Đây là rules cho species catalog tương lai, không xác nhận species/spawn/asset mới.

## Ba quyền độc lập

Species present là habitat rule đang cho phép hiện diện; discovered thuộc journal/observation của người chơi; playable thuộc ResonanceRecord với requirements riêng. Present không tự discovered, defeat không tự playable, đã unlock không mất XP/level khi species đổi nơi. Loài nonplayable vẫn cần observation coverage nếu thuộc collection.

| Rule field | Ý nghĩa / owner / kiểm tra |
| --- | --- |
| speciesId, habitatRuleId | Catalog IDs ổn định, không lấy sprite path làm ID |
| primaryHabitatId, secondaryHabitatIds | Habitat graph có vị trí và route tới; secondary không chỉ chuỗi tên chưa có encounter |
| behaviorProfileId | Tham chiếu đa nhãn Task06, độc lập rarity/affinity/morality |
| environmentalRequirements | Nước/nhiệt/áp/vật mang sống và tolerance định tính cần prototype |
| supportedPredicates, exclusions | Dựa facts/variant/weather có giới hạn; conflict có priority explicit |
| spawnEligibility | Habitat viable + route + encounter capacity; không đòi discovered để species đầu tiên xuất hiện |
| discoveryPredicate | Truy vấn journal, không mutate khi spawn |
| resonanceRequirementRef | Truy vấn rules/proof và playable eligibility, không tự grant do kill |
| uniqueEncounterRef, fallbackRef | Unique actor/completion và đường tiếp cận thay thế được validate |
| relocationPolicy, coverageClass | Refuge, secondary habitat, replay ecology hoặc story-safe reappearance tùy loài |

## Coverage trước mọi thay đổi habitat

Catalog phải chỉ ra đường hoàn tất discovery/observation/resonance nếu áp dụng cho **từng species**, kể cả chưa discovered. Validator kiểm transition candidate còn ít nhất một source encounter có route/capability main path bảo đảm. Không có coverage thì defer/refuse destructive patch hoặc thêm refuge trước khi duyệt, không sửa journal giả thành đã sưu tầm.

| Tình huống | Cơ chế khuyến nghị | Giới hạn |
| --- | --- | --- |
| Loài phổ thông đổi dòng | Secondary habitat + cue tại habitat cũ | Không giữ mọi spawn đúng chỗ cũ; không random chance vô hạn là bảo đảm duy nhất |
| Adapted organism phụ thuộc storm/heat | Controlled refuge phù hợp tolerances | Không chuyển sang nước/nhiệt không sống được hoặc “cleanse” mất affinity |
| Unique resonance trial | Persistent special encounter có proof theo actor identity | Không respawn unique boss để farm; replay trial không cấp unique grant lại |
| Ecological observation trước restoration | Post-restoration observation tương đương hoặc archive + live refuge | Archive kiến thức không tự thay living resonance nếu rule cần cá thể còn sống |
| Optional loài chưa thấy | Habitat fallback luôn đủ điều kiện sau main event | Không dùng discovered=false để despawn vĩnh viễn |

Coverage là điều kiện nội dung, không tự bảo đảm mọi species có thể playable. Khi roster còn UNRESOLVED, không thể tuyên bố đã chứng minh coverage cho game hoàn chỉnh; phải hoàn thiện registry trước code.

## Active actors và population reset

Ordinary wildlife dựng lại theo habitat budget, không lưu từng tọa độ/AI frame. Actor độc nhất hoặc có quest/assimilation outcome lưu stable instanceId, disposition/outcome và safe anchor; không tạo hai bản khi scene reload. Khi projection đổi giữa encounter, queue relocation ở boundary, cho retreat path hoặc safe placement; đừng despawn mục tiêu giữa hit rồi grant hai lần. Một candidate hợp lệ phải xét flying/swimming clearance và trạng thái form thực tế.

Population budget/density/drop rates chưa chốt. Không coi defeated là extinct; repeatable encounter reset policy khác permanent unique outcome. Temporary hazard chỉ tạm giảm eligibility có đường hồi, không sửa species presence vĩnh viễn. Collection đã ghi không rollback theo weather/faction opinion.
