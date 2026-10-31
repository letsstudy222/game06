# Handoff nơi confrontation Chương I

**PROPOSED H19-P10**. H `hy_zone_boss` nằm bên khóa hồi lưu giữa G và nhánh vận hành, theo [S05 E04](../story/STORY_IMPLEMENTATION_HANDOFF.md). `npc_tide_keeper` là actor proposal hiện có, không xác nhận species/boss identity mới. Không moveset/stats/phases/reward loot mới; E04 vẫn **boss_or_alternative**, không bắt giết để lấy chìa.

| Thành phần spatial | Yêu cầu cho boss task/level production | Lock/state invariant |
| --- | --- | --- |
| Buildup G→H | Thấy outlet được giữ và refuge bị ảnh hưởng, dấu hư hại/pressure chỉ động cơ | Không arena damage ép entry khi đang đọc clue |
| Preparation H ngoài arena | Chỗ trú rộng, thấy đường quay G, có cảnh báo ranh giới và lựa chọn vào/để sau | Equip/config ở safe context theo L16; có một Quy phù hợp không reject vì slot trống |
| Checkpoint | Anchor đã validate envelope/water/return trước entry, không nằm trong hostile hit range | Không mặc định auto full heal/resource refill; placement/recovery policy chờ duyệt |
| Entry | Explicit confirm và crossing theo approved boundary, destination arena safe | Attempt + membership lock/snapshot đúng policy durable trước activate threat; entry fail giữ prep |
| Arena/alternative receiver | Không gian né/giữ hướng/đọc current bằng Quy I, không required S2/optional form; receiver và refuge không bị boss FX che | C14 movement/collision/hit layer; nonlethal alternative chỉ sau task author, chưa solution/moveset final |
| Retreat/abort | Ngoài entry quay G tự do; sau entry chỉ explicit abort/exit được policy cho | Không bước ra trigger rồi unlock/equip giữ boss damage; close/reset/placement/recovery trước unlock |
| HP0 | Có khu vực nhận recovery placement sau coordinator resolution | Inactive-form HP0 khác no viable continuation; emergency transfer/HP model vẫn PROPOSED, không map tự quyết |
| Outcome/aftermath | Threat/outcome receipt cho phép thử vận hành G, route về E/B giữ | E04 outcome+reward+permission atomic, không tự E05/water_stable/gi |

H cần arena scope và approach scope riêng dù có thể chung scene; camera clamp/envelope/occluders, threat emissions và receiver hooks phải tách. Arena topology chính xác phụ thuộc boss kit và Quy action/geometry approved, không được chốt production dimensions từ Task19. Có nấc nghỉ giữa E02 encounter đầu và H, không tuyến arena nối arena.

Theo [BOSS_LOADOUT_LOCK](../loadout/BOSS_LOADOUT_LOCK.md), membership lock không disable mọi switch; allowed eligible frozen members vẫn switch theo action gates, không thêm thành viên/slot sau entry. Stage eligibility hoặc unlock loài mới không thay membership trong attempt. Checkpoint/retry/snapshot/config/HP/resource policy vẫn L16/C14 pending. One-form early constraint D41 CONFIRMED không tự approve toàn minimum-one entry package.

Boss task phải trả: identity/encounter profile, spatial range/LOS/force/telegraph requirements, nonlethal disposition nếu có, entry/retreat/reset contracts và outcome refs. Task19 chỉ giao chỗ đứng/đường đi/authority; không bắt đầu Task20 hoặc code boss. Sau E04 người chơi quay G làm E05 và kiểm habitat, không thắng boss là “biển đã lành”.
