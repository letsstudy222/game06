# Khung phân loại sinh vật

**Task11 — PROPOSED:** đặc tả để review, không gameplay đã triển khai hoặc approval mới cho mechanics. Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. [Task11 decisions](TASK11_DECISIONS.md) và [central register](../PROJECT_DECISIONS.md) giữ trạng thái.

## Nền CONFIRMED và giới hạn

D05–D08/D30–D36/D39/D41 và Task11: mỗi playable có progression riêng; up-to-three available forms, một active/hai reserve tối đa, boss khóa membership nhưng cho switch trong bộ; đầu game không cần đủ ba. Rarity không auto power, dual không auto rare, native/foreign không quyết đạo đức; không mọi sinh vật phải playable. Tứ Linh giữ identity/element, mỗi loài ba stages. Life của Ly là authority, không Wood–Life dual. Chi tiết rarity/role/data dưới đây vẫn đề xuất.

## Chín trục độc lập — K11-P01

### Species identity

| Chiều | Contract |
| --- | --- |
| Purpose | Định danh và lineage bền |
| Conceptual values | speciesId; formId nếu playable; stage refs |
| Interactions | Không suy loài mới từ stage/skin/cá thể |
| Validation | Unique canonical ID; creatureId là alias cùng ID, stage refs resolve |
| Gameplay implications | XP gắn existing form progression, không mỗi cá thể một bar |
| Player-facing information | Tên loài, lineage đã biết; ID kỹ thuật không cần hiển thị |

### Rarity

| Chiều | Contract |
| --- | --- |
| Purpose | Mức khác thường/điều kiện tìm hiểu, không thang damage |
| Conceptual values | Model B đề xuất Normal/Rare/Epic; chưa assign thật; unknown hợp lệ có policy |
| Interactions | Độc lập Sacred/element/playability; narrative weight không auto nâng rarity |
| Validation | rarityRef approved registry hoặc explicit unclassified theo scope; không multiplier |
| Gameplay implications | Có thể gợi hành trình tìm kiếm, không đổi HP/XP |
| Player-facing information | Nhãn và mô tả discovery effort, không hứa mạnh hơn |

### Combat role

| Chiều | Contract |
| --- | --- |
| Purpose | Tactical function dựa trên kit |
| Conceptual values | Bruiser/Defender/Striker/Ranged/Controller/Support; hybrid có primary/secondary; none |
| Interactions | Element không ấn định vai, mobility/healer specialization |
| Validation | Role refs resolve và có ability evidence tại stage; no forced role cho organism không combat |
| Gameplay implications | Giúp chọn form/đọc trade-off, không auto bonus |
| Player-facing information | Động tác mẫu, ưu/nhược và vai hiện tại khác tiềm năng stage |

### Exploration role

| Chiều | Contract |
| --- | --- |
| Purpose | Khả năng qua địa hình/receiver |
| Conceptual values | Underwater/Flight/Glide/Climb/Burrow/Speed/Manipulation/Detection/Restoration/Mechanism candidates |
| Interactions | Movement/environment profile sở hữu capability, role chỉ index |
| Validation | Required flag theo route, không rarity; capability/action/return path thật |
| Gameplay implications | Mở optional route/alternative, không loại cũ vĩnh viễn |
| Player-facing information | Mô tả chướng ngại và điều kiện dùng/giới hạn |

### Ecological role

| Chiều | Contract |
| --- | --- |
| Purpose | Vị trí trong food web và hành vi ngữ cảnh |
| Conceptual values | feeding/dispersal/refuge roles + tám views F06; elite là encounter overlay |
| Interactions | Disposition/stability/cognition/faction khác nhau |
| Validation | Reuse CreatureBehaviorProfile, không rarity→hostility; individual override đúng owner |
| Gameplay implications | Spawn/quan sát/reward có nguyên nhân, không kill-peaceful gate |
| Player-facing information | Dấu ăn/nghỉ/tổ/nguồn, bằng chứng và confidence |

### Elemental profile

| Chiều | Contract |
| --- | --- |
| Purpose | Affiliation một hoặc hai hệ bền |
| Conceptual values | water/fire/wind/wood/lightning/metal; life authority riêng |
| Interactions | Skill attribution/status/material khác species element |
| Validation | E09/E10 refs đúng, Sacred single native; >2/unknown chưa approve |
| Gameplay implications | Context/counterplay theo effect thực sự, không dual auto mạnh/rare |
| Player-facing information | Hệ đã nhận biết và trait, không suy bằng màu |

### Playability

| Chiều | Contract |
| --- | --- |
| Purpose | Phân biệt catalog eligibility và unlock trong save |
| Conceptual values | playable eligibility; discoverable; narrative; boss-only; environmental scopes |
| Interactions | Scopes chồng được với explicit constraints; không mọi art là playable |
| Validation | isPlayable owner CreatureSpecies, false không form progression; boss-only không playable đồng thời |
| Gameplay implications | Giới hạn production, collection vẫn có giá trị khi không playable |
| Player-facing information | Có thể ghi nhận/cộng hưởng theo knowledge đã mở, không hứa form khi chưa có route |

### Narrative significance

| Chiều | Contract |
| --- | --- |
| Purpose | Vai trò truyện, không thuộc tính damage |
| Conceptual values | ordinary/special/sacred/antagonist/boss theo species hoặc actor/encounter scope |
| Interactions | Sacred khác rarity; intelligent không auto boss; boss không auto species mới |
| Validation | Chapter gates đúng, role actor không gán cả species thành ác |
| Gameplay implications | Story payoff và memory source độc lập unlock/level |
| Player-facing information | Thông tin không spoiler quá chapter gate |

### Evolution structure

| Chiều | Contract |
| --- | --- |
| Purpose | Dòng stage hữu ích và continuity |
| Conceptual values | Sacred3 CONFIRMED; secondary2/wildlife1/boss1 là planning targets; variants/temporary condition riêng |
| Interactions | Stage không rarity, recolor không evolution, assimilation không auto stage |
| Validation | Stage order/gates acyclic, IDs stable, nonplayable không bị ép XP/skills |
| Gameplay implications | Anatomy/kit thay đổi có nghĩa, safe commit giữ boss snapshot |
| Player-facing information | Stage hiện tại/khả năng đã biết; unknown future stage không giả đã unlock |

## Species, actor và projections

Species catalog mô tả khả năng bền; stage config mô tả ability/capability đang có; actor/encounter giữ nest/hostility/boss role; save người chơi giữ discovery/resonance/XP. Không một enum “Legend Boss Wood Enemy” trộn tất cả. Narrative sacred designation là species-level riêng theo recommendation; boss là actor/encounter role có thể cùng species với cá thể thường. Số stages ngoài Sacred là target sản xuất, không quota/cam kết roster. [Evolution matrix](SACRED_EVOLUTION_MATRIX.md) vẫn nguồn12forms; Task11 không tạo stage mới hoặc ngưỡng level.

## Nguồn và mapping deliverables

[Rarity](RARITY_SYSTEM.md), [combat](COMBAT_ROLE_TAXONOMY.md), [exploration](EXPLORATION_ROLE_TAXONOMY.md), [playability](PLAYABILITY_CLASSIFICATION.md), [matrix](CREATURE_CLASSIFICATION_MATRIX.md), [collection](../gameplay/CREATURE_COLLECTION_VALUE.md), [balance](../gameplay/CREATURE_ROLE_BALANCE.md), [data](../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md), [cases](../technical/CREATURE_CLASSIFICATION_TEST_CASES.md), [audit](TASK11_CONSISTENCY_AUDIT.md).

Requested `ECOLOGICAL_CLASSIFICATION.md` được đáp ứng bằng mở rộng nguồn F06 hiện hữu [CREATURE_BEHAVIOR_CLASSIFICATION](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), tránh taxonomy thứ hai. Chưa làm Task12 hoặc full phase audit09–16.
