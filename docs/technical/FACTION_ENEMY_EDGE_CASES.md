# Phe/enemy: failure và recovery expectations

**PROPOSED F06-P15:** bảng acceptance cho task sau, không các test runtime đã chạy. Dùng [data invariants FEV](FACTION_ENEMY_DATA_MODEL.md), [reward contracts](../gameplay/ENCOUNTER_AND_REWARD_DESIGN.md), source [world consequences](../story/WORLD_STATE_CONSEQUENCES.md), R03 transform và Task05 story events. Không formal AI state machine hoặc code.

| Case ID | Tình huống | Kết quả an toàn / recovery | Invariants |
| --- | --- | --- | --- |
| T06-EC01 | Neutral bị player lỡ đánh | Tự vệ/alert/rút theo profile, có warning và đường disengage. Hết threat không aggro vĩnh viễn toàn species/faction. Hành động lặp/cố ý có concern local riêng nếu có witness, không auto global karma | FEV02/03/07; không form swap/gift xóa damage ledger |
| T06-EC02 | Territorial mất sight | Kiểm tra nguồn/đường có thể cảm trong scope; mất điều kiện tiếp cận thì về vùng/refuge, không biết player qua mọi tường hoặc chase đến bất kỳ đâu | FEV03; reset hành vi tạm không reset unique reward |
| T06-EC03 | Theo player ra ngoài habitat | Leash/movement constraint cho dừng/rút trước vùng không sống được. Actor đã ở chỗ không hợp lệ thì safe relocation theo same identity, không teleport sát player/nguồn loot mới | FEV03/08 |
| T06-EC04 | Quest làm assimilated ổn định | Commit source/evidence/outcome, giữ individual/species và cognition/affinity phù hợp; ngừng hoặc đổi hostility theo nguyên nhân thật. Có thể stable_adapted/managed, không auto-pure/RESONATED | FEV02/06/07; journal giai đoạn cũ có source archival |
| T06-EC05 | Thắng optional elite trước nhận quest | Durable completion/observation/source proof được quest nhận sau. Không bắt respawn/đánh lại hoặc cấp unique reward thứ hai; vật liệu đã thu/tiêu có proof/replacement policy | FEV05/10 |
| T06-EC06 | Gặp faction NPC trước intro | Present local role/warning/limited dialogue chưa hé toàn group; ghi discovery actor nếu cần, không skip main rewards hoặc assume player đã biết phe. Khi intro tới đọc facts đã có | FEV01/07, không NPC tự despawn vì sai thứ tự |
| T06-EC07 | Region đổi lúc enemies active | Queue hoặc publish ở safe boundary; validate placement/nav/collection, giữ actor/completion IDs. Boss/transition không tương thích đợi resolve. Tránh despawn/double loot/spawn vào player | FEV07/08/09 |
| T06-EC08 | Habitat collectible thay vĩnh viễn | Có refuge/alternate route/source và journal hint dù chưa discovery; archival/challenge instance có thể giữ cơ hội tìm hiểu giai đoạn cũ. Không phải đã giết/thu trước mới được bảo vệ | FEV07/10, không khóa essential collection |
| T06-EC09 | Boss đã kết, reload/revisit arena | Nếu completion đã durable thì outcome/disposition/access giữ, grant idempotent; khu hậu conflict, không tự hostile/reward lần nữa. Chưa completion thì attempt retry theo policy đã duyệt, không ghép boss HP cũ với loadout mới | FEV05/09/10 |
| T06-EC10 | Drop cũng là quest requirement | Acquisition/source proof bền vững, quest đọc cả thu trước intro; không duplicate unique item. Nếu future material có thể tiêu thì dùng proof hoặc nguồn replacement hợp lệ, không hardlock/bắt kill peaceful | FEV05/10 |
| T06-EC11 | Hai phe phản ứng khác cùng action | Lưu concerns riêng có witness/source/scope, không ép một global score. Feedback hai nhu cầu khác nhau; main route/Sacred vẫn có guaranteed path không cần xóa một phe | FEV02/07 |
| T06-EC12 | Thắng cá thể có thể study thay vì fight | Defeat không tự form/memory; nguồn observation qua cùng cá thể hồi phục khi phù hợp hoặc population/refuge/archive, không ép kill toàn loài/reload. Không tự ghi đã hiểu hành vi chưa quan sát | FEV05/06/07 |
| T06-EC13 | Player đổi form lúc enemy attack | Enemy target identity gắn player/spirit instance, không reset aggro/attack/grant. Damage trước commit vào source, sau commit vào target; geometry/LOS/recovery thật quyết định hit/miss. Không i-frame/change-identity free reset | FEV03/04; theo R03 candidate transaction |
| T06-EC14 | Faction hostile tạm | Scope actor/route/region có lý do và điều kiện repair/expiry; safe contact/evidence/main bypass bảo đảm. Không cấm bốn Sacred vì optional theft/faction quest hoặc permanently exclusive route | FEV07/10 |
| T06-EC15 | Hoàn chương không làm faction optional | E05/E11/E16/E22 vẫn đạt qua main proof/caps, factions local projection đọc outcome main. Không nợ unlock/loài optional làm prerequisite ẩn, giữ follow-up về sau | FEV07/09 |
| T06-EC16 | Stabilize rồi cố tái exposure/heal để farm | Unique source/outcome grant key và residue budget không reset vì state đảo; xử lý nguồn gây hại, không thưởng lặp cho cố tạo tổn hại hoặc spawn clone cá thể | FEV05/06 |
| T06-EC17 | Một species có adapted và unstable variants | Multi-axis records/source giữ tách; không global sửa cả species hostile hoặc xóa dual affiliation vì một cá thể bất ổn | FEV02/06/07 |
| T06-EC18 | Một elite overlay + base actor đều báo defeat | Chỉ encounter completion authority grant payload cùng key; base/overlay không double XP/material/quest proof. Repeatable source khác phải khai rõ | FEV05/09 |
| T06-EC19 | NPC actor không thuộc faction chính thức nhưng có cùng tư tưởng | Local concerns/permissions dùng actor scope, factionId optional. Không auto nhập phe/leader/hostility inherited cho cả species | FEV01/02/07 |
| T06-EC20 | Rename/remove faction/archetype/profile trong update | Alias/versioned migration + backup, giữ historical completion/evidence/permission và orphan records; safe fallback/review content-ready, không reset chapter/reward ledger | FEV01/10 |

## Trace review tài liệu, không test thực thi

- Stable adapted territorial ở Hải Uyên bị chọc: đổi local alert, không đổi process thành forced assimilation, không faction war. Disengage giữ discovery, không grant trial nếu objective chưa thực đạt.
- `arch_unstable_organism` được kiểm chứng ổn định: cùng cá thể giữ record, source cũ dừng exposure, reward grant một lần; còn hai affiliation không là fail. Thu hoạch residue không tự thêm playable form.
- Actor optional elite đã có proof trước intro: quest chỉ đọc ledger/evidence, không respawn elite để rơi unique access key lại. Nếu source thiếu policy item-loss thì quest chưa content-ready.
- `evt_16_restore_wind` giảm đối địch patrol tại route được giải: faction ở khu khác có thể chưa tin, nhưng return/main access giữ; stable flag không đảo vì opinion. Các actors active được migrate an toàn trước publish projection mới.

Các con số balance/detection/leash/telegraph durations và drop rates chưa xác định. Test tương lai phải có reload/storage interruption, path/refuge, mobile readability và reward duplicate tại boundary; kết quả review spec không chứng minh AI đã chạy.
