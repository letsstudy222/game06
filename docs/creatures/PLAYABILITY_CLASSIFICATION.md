# Phạm vi playable và non-playable

**Task11 — PROPOSED:** đặc tả để review, không gameplay đã triển khai hoặc approval mới cho mechanics. Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. [Task11 decisions](TASK11_DECISIONS.md) và [central register](../PROJECT_DECISIONS.md) giữ trạng thái.


## Scopes không một enum loại trừ tất cả — K11-P07

| Scope candidate | Purpose / overlap | Content tối thiểu theo nhu cầu | Không mặc định |
| --- | --- | --- | --- |
| playable_species | Species eligible resonance; có thể đồng thời discoverable/narrative | Acquisition route/source, controller capabilities/skills phù hợp, progression và validated required clips | Đã unlock trong save hoặc boss victory đủ điều kiện |
| discoverable_wildlife | Journal/observation về species; playable có thể thuộc scope này | Evidence/habitat/knowledge và presentation đủ observation | Full controller,3skills,XP hoặc nhiều stages |
| narrative_creature | Actor tham gia sự kiện/đối thoại/memory; có thể playable/discoverable/boss actor | Actor/event refs và clips/dialogue đúng scene | Thông minh là boss, mọi cá thể species cùng faction |
| boss_only_entity | Encounter actor/design chỉ boss, có thể discoverable/narrative | Boss encounter/objective assets/modules theo task sau | Playable form/progression/player rarity/stageIII |
| environmental_organism | Sinh vật nền đóng vai sinh thái; có thể narrative/quan sát nếu content chọn | Ambient representation/interaction receiver khi cần | Collection entry bắt buộc, combat hitbox/AI đầy đủ hoặc farming drop |

`boss_only_entity` và playable=true cùng scope/version là conflict cần author review, không silently unlock boss. Một **species playable** vẫn có thể có **actor được dùng làm boss**, nhưng actor đó không mang scope boss_only; boss encounter designation và species eligibility tách biệt. Environmental organism có thể được nâng scope discoverable bằng content update có approval, không tự tạo missing journal goal làm save cũ thiếu vĩnh viễn.

## Production gates

isPlayable của CreatureSpecies là eligibility authority; ResonanceRecord + grant ledger quyết định player unlock; availability hiện thời ở progression/context. Unknown eligibility không được tự true từ rarity/art/Sacred-like silhouette. Playable nhưng art/action modules chưa đủ vẫn catalog draft, không grant invisible body; source evidence được giữ. Missing optional art không xóa records hoặc cấp form khác.

Nonplayable không cần player XP/cooldown/level curve, nhưng encounter có thể có attribute/behavior riêng; đừng đồng nhất enemy stats với player progression. Một ambient lifeform không nhất thiết species catalog nếu chỉ decoration, nhưng không dùng decor như collection target mà thiếu identity/evidence. Narrative dialogue chỉ khi source cho phép, không tự cho Tứ Linh nói độc lập.

## Future scope changes

Nonplayable→playable: thêm approved capability/art/progression/resonance route; discovery facts cũ giữ, không automatic form grant trừ route explicit công nhận proof và grant idempotent. Boss-only→playable cần explicit reclassification/version/encounter review, không implicit reward. Catalog eligibility update không đổi completed boss outcome hoặc chapter. Rarity/type/stage changes không tự thay playability. [Data](../technical/CREATURE_CLASSIFICATION_DATA_SPEC.md) giữ một owner cho từng fact.
