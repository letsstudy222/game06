# Hệ sinh thái sống của Vực Hải Uyên

**CONFIRMED:** Quy là Sacred Thủy đầu tiên; bốn nguyên tố bản địa Thủy/Hỏa/Phong/Mộc, Lôi/Kim ngoại lai không tự là xấu; Sinh Mệnh là authority riêng, không thêm Earth. Hành vi/đạo đức không suy từ rarity/affinity. Thế giới ghi nhớ và có thể quay lại. **PROPOSED E20-P01–P11:** quan hệ thức ăn, dossier wildlife, AI recipes, placement, interaction và acquisition chi tiết sau đây. **UNRESOLVED:** approval loài/art, yếu tố bản địa cụ thể từng reference, playability, ecology tolerance, runtime/save/reward policies. Không tự giải origin hay chronology biến cố.

Nguồn [F06 hành vi](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [adaptation/assimilation](../ecology/ELEMENTAL_ASSIMILATION.md), [B12 roster](../creatures/CREATURE_ROSTER_REGISTER.md), [Task19 graph](CHAPTER1_WORLD_GRAPH.md), [Quy ecology](QUY_ECOLOGY_AND_LORE.md). Đây là ecology extension đọc các authorities có sẵn, không map/roster/collection source thứ hai.

## Mục tiêu và giới hạn

Sinh vật có chỗ ăn, nơi trú, đường bơi và nhịp đáp ứng với dòng; cảnh quan sống bằng cả tảo, fauna nền, âm tùy chọn và dấu chuyển động, không cần tất cả thành playable enemies. Quan sát và giúp habitat cho knowledge/access/proof có nguồn; không phải mọi actor có loot. Dùng ít archetype được cấu hình theo giải phẫu, không một AI chase cho mọi loài.

Tuyến chính giữ Quy I và E01–E06, không cần resonance wildlife optional hoặc đi F sâu. A không hostile tutorial; B có observation rồi territorial encounter giới hạn E02 nếu content/policy được duyệt; D/F là optional, H preparation không spawn threat bất ngờ. Chưa có roster gameplay/art đủ sản xuất, nên coverage dưới đây là hợp đồng để validate, không chứng minh đã có ecosystem runtime.

## Scope và ngân sách tương đối

| Mức | Nội dung | Công việc / cách kiểm soát |
| --- | --- | --- |
| Mandatory first ecology slice | Quy, một ambient organism generic PROPOSED, một hành vi quan sát, receiver/current yếu, thay đổi nhìn thấy, knowledge reward một lần, safe save/load contract | Có thể dùng cùng organism cho ambient + observation; không species mới mandatory, không boss |
| Recommended Chapter I | Duyệt và sản xuất một hoặc hai wildlife recipes từ roster, một territorial demo sau safe lesson, refuge/relocation và E02/E05 links | Reuse behavior/navigation/cue/animation patterns, không mọi ref xuất hiện cùng lúc |
| Deferred | Đầy đủ sáu wildlife concepts, cả hai species phụ playable/two-stage, elite/advanced resonance/F ecology, group AI dày | Nhiều controller/clip/stage/collision test hơn; không dependency minimum slice |

Không final actor count/spawn density/performance budget. Interactive species ít nhưng nhịp habitat, vegetation, schooling nền và changes theo W07 tạo diversity. Không breeding/population simulation hoặc persistent từng AI tick. Main-route guarantees/critical coverage thắng cosmetic density; giảm ambient không xóa nguồn observation/resonance đã hứa.

## Chỉ mục 18 deliverables

- [Register](CHAPTER1_SPECIES_REGISTER.md), [bảy dossier](CHAPTER1_SPECIES_DOSSIERS.md), [food web](CHAPTER1_FOOD_WEB.md), [relationships](CHAPTER1_SPECIES_RELATIONSHIPS.md).
- [Habitat matrix](CHAPTER1_HABITAT_MATRIX.md), [behaviors](CHAPTER1_WILDLIFE_BEHAVIORS.md), [noncombat](CHAPTER1_NONCOMBAT_INTERACTIONS.md), [resonance](CHAPTER1_RESONANCE_OPPORTUNITIES.md).
- [Adaptation/assimilation](CHAPTER1_ADAPTATION_AND_ASSIMILATION.md), [world states](CHAPTER1_ECOLOGICAL_WORLD_STATES.md), [distribution](CHAPTER1_ENCOUNTER_DISTRIBUTION.md), [minimum slice](CHAPTER1_FIRST_PLAYABLE_ECOLOGY.md).
- [Art](../art/CHAPTER1_CREATURE_ART_HANDOFF.md), [12entity data spec](../technical/CHAPTER1_ECOLOGY_DATA_SPEC.md), [35future QA](../technical/CHAPTER1_ECOLOGY_TEST_CASES.md).
- [Decisions](TASK20_DECISIONS.md), [local audit](TASK20_CONSISTENCY_AUDIT.md).

Chỉ documentation; không AI/code/production data/art/map/UI/save. Task21 chưa bắt đầu. Các thiết kế mới để review, không approval hoặc gameplay functioning.
