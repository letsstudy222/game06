# Ranh giới combat, HP và encounter

**PROPOSED**; [C14](../combat/COMBAT_SYSTEM_OVERVIEW.md), [L16](../loadout/BOSS_LOADOUT_LOCK.md), [Task25combat](../technical/TASK25_ACTOR_AND_COMBAT_AUDIT.md) giữ nguồn. S0 không implement combat/HP mới. Không copy regen/respawn Phượng thành policy Quy.

| Thành phần | Port/owner tương lai | Quy tắc tích hợp |
| --- | --- | --- |
| Action | requestAction/advanceAction, C14 | Acceptance/startup/active/recovery, reservation/cancel policy chưa chốt |
| Damage | submitHit/resolveDamage | Source snapshot+target/hit ordinal, collision không tự reward |
| Health | readHealth/applyAcceptedDamage qua selected model | Cá thể/shared/hybrid còn lựa chọn; actor view không tự chọn |
| Defense/cooldown | C14 ability owner | Finite guard/eligibility, nợ không reset vì scene/switch |
| Status/reactions | E09 resolver | Budget/ownership/expiry và harmful obligations theo policy |
| Enemy AI | Perception/intent→action controller | Không direct setHP/event, không omniscient player input |
| Encounter/boss | L16 attempt coordinator | Entry/snapshot/membership lock/close/result ordering |
| Defeat/recovery | Selected health/continuation policy | Incapacity một body trước, defeat chỉ khi không continuation hợp lệ |

Tối đa3slots, ít hơn3được phép; khóa membership trong boss không cấm switch giữa equipped eligible forms. Emergency transfer vẫn **PROPOSED**; reserve còn HP không tự cho phép transfer, không ngoài-set rescue. Đồng thời boss/playerHP0 phải arbitration được duyệt, không callback đầu thắng. Eligibility tiến hóa không tự apply body/config giữa frozen encounter.

Scene gửi action intent/context, đọc accepted result; encounter owner đóng attempt trước reset/retry/lock release đúng policy. Released effect giữ source config/credit qua switch, không active actor chiếm XP. E04 accepted outcome không tự E05 restoration/E06travel. S0 restart là reset fixture, không được mô tả như health recovery đã duyệt.

**Trước Task49** phải phê duyệt health ownership, incapacity/continuation/emergency transfer nếu chọn, defeat/retry/abort/reload, cooldown/status carry-over và simultaneous outcomes đủ scope. S1 không khởi chạy trên giả định tiện lợi. Test dự kiến hit dedupe/guard windows/HP0/lock/switch/abort/last blow/save cutoff; không có kết quả gameplay mới trong Task26.
