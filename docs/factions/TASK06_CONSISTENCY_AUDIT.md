# Audit và bàn giao Task 06 — phe, sinh thái và antagonist

Baseline `4356ec8`, working tree sạch trước task; repository vẫn HTML/CSS/ES modules/Canvas 2D. Không AGENTS.md được tìm thấy trong workspace ở lần kiểm tra. Đây là documentation-only; không AI/code/stat/sprite/animation/map/UI hoặc formal state machine được thêm. Không tiến hành Task07.

## Mapping 14 đầu ra, giữ source of truth hiện hữu

| Deliverable yêu cầu | File thực tế / authority | Loại thay đổi |
| --- | --- | --- |
| FACTION_OVERVIEW.md | [FACTION_OVERVIEW](FACTION_OVERVIEW.md) | Mới: phạm vi ba tổ chức/quan hệ nhẹ |
| FACTION_PROFILES.md | [FACTION_PROFILES](FACTION_PROFILES.md) | Mới: tổ chức, bất đồng và quan hệ Tứ Linh |
| FACTION_HISTORY.md | [FACTION_HISTORY](FACTION_HISTORY.md) | Mới: succession/tri thức/myth, không tổ chức bất biến |
| CREATURE_BEHAVIOR_CLASSIFICATION.md | [Behavior classification](../ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md) | Mới: tám views, nhiều trục độc lập rarity |
| ELEMENTAL_ASSIMILATION.md | [Elemental assimilation](../ecology/ELEMENTAL_ASSIMILATION.md) | Mới: ba hiện tượng và bốn profile ứng viên |
| REGIONAL_CONFLICTS.md | [Regional conflicts](../ecology/REGIONAL_CONFLICTS.md) | Mới: bốn vùng/niche/main events giữ nguyên |
| ENEMY_ARCHETYPES.md | [Enemy archetypes](../gameplay/ENEMY_ARCHETYPES.md) | Mới: chín template/overlay, không species/AI hoàn tất |
| ENCOUNTER_AND_REWARD_DESIGN.md | [Encounter/reward](../gameplay/ENCOUNTER_AND_REWARD_DESIGN.md) | Mới: encounter/reward origins, elite scope |
| ANTAGONIST_DESIGN.md | [MAJOR_CHARACTERS_AND_FACTIONS](../story/MAJOR_CHARACTERS_AND_FACTIONS.md), phần Task06 | Mở rộng source Task05, không tạo antagonist source thứ hai |
| CHAPTER_BOSS_NARRATIVE_BRIEFS.md | [MAJOR_CONFLICTS_AND_BOSSES](../story/MAJOR_CONFLICTS_AND_BOSSES.md), phần Task06 | Mở rộng bốn brief hiện hữu, thêm profile IDs/alternative review |
| FACTION_AND_WORLD_CONSEQUENCES.md | [WORLD_STATE_CONSEQUENCES](../story/WORLD_STATE_CONSEQUENCES.md), phần Task06 | Mở rộng phản ứng local/world projection, không world-state cạnh tranh |
| FACTION_ENEMY_DATA_MODEL.md | [Data model](../technical/FACTION_ENEMY_DATA_MODEL.md) | Mới: chín conceptual entities/reuse ledger |
| FACTION_ENEMY_EDGE_CASES.md | [Edge cases](../technical/FACTION_ENEMY_EDGE_CASES.md) | Mới: 20 expected outcomes và trace review |
| TASK06_CONSISTENCY_AUDIT.md | File này | Mới: trạng thái, xung đột, gaps, validation |

Tổng 11 file mới và 3 tài liệu story được mở rộng cho 14 đầu ra; README và tài liệu nền thêm links/decision notes. Không tạo ba file tên khác để lặp lại rules đang có.

## Tài liệu/canon đã đối chiếu

GAME_VISION, PROJECT_DECISIONS, OPEN_QUESTIONS, scope/workflow/asset register; lore ELEMENTAL_COSMOLOGY, WORLD_HISTORY, ANCIENT_CATASTROPHE và các định nghĩa thích nghi/biến cố; Resonance rules/data/edge cases và spirit identity; Tứ Linh overview/species identities/art requirements/abilities; Task05 story overview/timeline/main event handoff/quest outline, cast, boss briefs và world consequences. Các tài liệu này có thật; có cả CONFIRMED/PROPOSED/UNRESOLVED, không tất cả đã approved.

Không có factions/ecology chuyên biệt trước Task06; có cast/boss/world sources tương đương nên giữ lại. Assets register vẫn ghi thiếu reference Quy/Long/Ly và bộ animation đầy đủ; Task06 không nhận đã xem ảnh mới hoặc tìm thấy enemy sprites chưa có.

## Các xung đột và rủi ro đã nhận diện

| ID | Xung đột / điều dễ suy sai | Xử lý có ghi trạng thái |
| --- | --- | --- |
| FC01 | Ba faction mới có thể làm hai stance và năm vai Task05 thành ba phe confirmed | Cả tên/existence/profile PROPOSED; stance là trục tư tưởng, actor vẫn độc lập; không gán membership/leader tự động |
| FC02 | Trông Giữ có truyền thừa cổ dễ thành organization sống nguyên vẹn hàng chục nghìn năm | Profile/history chọn successor hoặc nhóm mới quanh tri thức/công trình; claims truyền đời không objective canon |
| FC03 | Adapted/unstable/intelligent/faction-hostile nằm cùng behavioral list nhưng khác trục | Tám views đa nhãn, tách behavior/condition/affinity/cognition/membership/disposition; không enum trộn rarity |
| FC04 | Dual-element thường bị dùng như dấu corrupted hoặc forced process | Affinity là outcome, process/stability riêng; sau stabilization vẫn có thể dual và độc lập ý chí |
| FC05 | Forced assimilation dễ bị hiểu luôn irreversible hoặc mindless | Recoverability/evidence theo cá thể, có recovering/managed/stable_adapted; không phép cleanse/Life hồi sinh vô hạn |
| FC06 | Tân Sinh innovation dễ bị viết thành phe chủ mưu mọi thí nghiệm | Bất đồng nội bộ/nguồn chứng cứ, native/foreign/cá thể mọi phe đều có thể gây hoặc ngăn hại; chưa chốt thủ phạm cosmic |
| FC07 | Story I–IV có hybrid examples nhưng D18 chưa final roster | Thủy–Lôi/Hỏa–Kim/Phong–Lôi là candidate scenarios, không grant element mới hoặc species/art approved |
| FC08 | Full-three R03-P06 vs empty slots S05-P02 ở boss sớm vẫn chưa duyệt | Không tự giải; data/encounter phải explicit assumption trước code, không dùng optional faction/species làm main gate |
| FC09 | Faction permission/trust có thể chặn bốn Sacred và completion | Ưu tiên localized persistent changes, main proof/bypass bảo đảm; không global morality meter/permanently exclusive routes |
| FC10 | HP0/defeat có thể bị gộp với reward/resonance/restore | Actor outcome, encounter completion, reward ledger, collection, form unlock và stable main events tách authority |
| FC11 | Một elite/base overlay hoặc alternative outcome có thể double grant | Một completion key/manifest, proof trước quest đọc lại không respawn loot; repeatables policy khác unique story grant |
| FC12 | Đổi world-state despawn actor/nguồn sưu tầm hoặc làm faction alert sai | Versioned projection/safe relocation/refuge mappings/ledger; main flags không optional rollback, concerns theo scope/witness |
| FC13 | Người chơi đổi form làm enemy mất target/hit | Player/spirit instance giữ identity; hit theo body/geometry tại boundary R03, không free aggro reset hoặc double-hit |
| FC14 | Archetype/AI vocabulary dễ bị hiểu game đã có enemy system | Chỉ templates/requirements, không formal transition graph/code/stats/pathfinding. Runtime hiện tại không được nhận đã có các faction/encounters này |

## Đề xuất chưa tự thành canon

| ID | Nội dung PROPOSED |
| --- | --- |
| F06-P01 | Ba faction Hồi Nguyên/Tân Sinh/Trông Giữ và tư tưởng tổ chức |
| F06-P02 | Local concern/trust/suspicion/access, không morality meter |
| F06-P03 | Nội bộ, quan hệ Sacred/alliances và liên hệ cast có giới hạn |
| F06-P04 | Formation/succession/myth/provenance lịch sử |
| F06-P05 | Tám ecological behavior views và triggers/rewards |
| F06-P06 | Ba phenomena, observable evidence và bốn assimilation profiles |
| F06-P07 | Regional population/conflict và lợi ích phe từng vùng |
| F06-P08 | Chín archetype templates/combat readability requirements |
| F06-P09 | Bảy encounter profiles và completion/reset conditions |
| F06-P10 | Bảy reward origins/profiles và elite scope/density principles |
| F06-P11 | Mở rộng motivations/knowledge/điều kiện kết thúc bốn antagonists hiện hữu |
| F06-P12 | Bốn boss narrative profiles và đánh giá alternative hội tụ/selected variant |
| F06-P13 | Local faction/world consequences, active actor changes và follow-up |
| F06-P14 | Chín conceptual entities/FEV invariants/persistence/reuse |
| F06-P15 | 20 edge cases, recovery/idempotency và trace review |

Chỉ constraints Task06 được ghi D36 là chỉ dẫn confirmed, không bất kỳ tổ chức/species/leader/named faction history nào. Không nâng L02/R03/C04/S05 proposals thành approved. Nguồn gốc Tinh Linh, thủ phạm sâu, tự nguyện của biến cố và nguồn Tinh Môn giữ UNRESOLVED.

## Asset gaps và nguyên gốc — không tạo hình mới

| Gap ID | Thiếu và ảnh hưởng | Yêu cầu production sau, chưa có path giả |
| --- | --- | --- |
| FG01 | Species/reference/model sheets cho các archetype, identities của NPC/boss chưa duyệt | Bắt đầu từ habitat → áp lực tiến hóa → anatomy chức năng → movement → silhouette; không recolor template thương mại hoặc gán Pokémon-like stereotypes |
| FG02 | Telegraph/locomotion/attack/recovery/retreat/incapacitation và direction/anchor/alpha/timing thực | Concept poses không là tested animation. Cần separated frames/validated atlas, anatomy nhất quán và playback riêng trước content-ready |
| FG03 | Habitat/refuge/nav/sensory cues/receiver và map theo story | Tương thích footprint/envelope/độ sâu/thermal/gió, return paths; không dùng map Dawn làm bằng chứng bốn vùng đã playable |
| FG04 | Faction concerns/permissions/actor/world projection và event/save/ledger implementation | Chỉ conceptual fields, chưa cần UI reputation/inventory mới; migrate source evidence/grants trước phát hành |
| FG05 | Boss exact mechanics/visual/stats và elite layouts | Để task riêng, không hoàn tất qua narrative template; giữ identity Phoenix và các references được duyệt theo asset register |
| FG06 | Balance/detection/leash/durations/XP/material budgets và performance/test thiết bị | Không có numbers hoặc fixed density quotas trong Task06, không claim AI/mobile đã thử |

Dùng art standard hiện có làm mục tiêu nhất quán, không thay creature references. General biology/myth không tự chứng nhận originality; provenance/source/license review và so silhouette cần được thực hiện khi có art, không khẳng định độc đáo tuyệt đối bằng text. Chưa có file enemy/faction art nào mới được kiểm tra ở task này.

## Tự review 16 quality gates

Đã đối chiếu: ngoại lai không ác; native không luôn thiện; thích nghi khác đồng hóa; phe có nhu cầu/bất đồng hợp lý và không overwrite cast; behavior tách rarity; bốn conflict sinh thái riêng; antagonists có lý do; realtime combat có detection/telegraph/counterplay; collection không kill checklist; refuges/return routes tồn tại; boss outcome nối story; data templates mở rộng; proposals giữ nhãn; chỉ docs thay đổi.

Kiểm tra tài liệu trước commit: file/link/table shape/ID refs, đủ tám behavior views/chín archetypes/chín entities/20 edge cases, reuse Task05 event IDs không tạo main faction gates, taxonomy/fields/status consistency và diff. Đây là review/spec validation, không test AI/drop rates/combat/animation chạy thật. CI của repo sau push là kiểm tra riêng, không chứng minh nội dung mới đã triển khai.

## Quyết định cần chọn và Task07 prerequisites

Cần duyệt: có dùng ba tổ chức/tên/phạm vi hiện diện không; membership actor hoặc chỉ stance; subset archetypes/sources cho slice; roster/affiliations và mức phục hồi từng assimilation case; faction concerns/access + phương án repair; nonlethal representation/reward provenance; boss entry policy đang mở; asset/movement/telegraph và save/world-state implementation. Không cần giải đáp cosmic origin để làm phần độc lập.

Task07 cần đề bài riêng. Nên chọn một encounter sinh thái trong vùng/slice được duyệt và các acceptance về warning/disengage/observation/reward/return, không bắt làm cả ba faction/chín templates đồng loạt. Chưa tiến hành Task07, không generate artwork thay thế hoặc implement enemy AI trong Task06.
