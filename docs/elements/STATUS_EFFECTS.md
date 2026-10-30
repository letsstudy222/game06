# Status effects — taxonomy và ownership

**Task09 — PROPOSED:** mọi cơ chế/ID/interaction chi tiết mới là đề xuất, chưa triển khai hoặc cân bằng. Chỉ nền được dẫn rõ là CONFIRMED. [Decision register Task09](TASK09_DECISIONS.md) giữ status/dependencies; không tự bắt đầu Task10.

**PROPOSED E09-P04/P06:** chín candidates sau không là abilities đã approve. Taxonomy tách damage-over-time, surface/charge, movement/action control, defense condition và buffs. Kháng status khác kháng damage. Không status stun mới được ngầm thêm.

## Luật chung

Một instance có stable applicationId/targetRef/group/source snapshot/remaining duration/proc cursor; source khác không tự nghĩa stack mới. Same tick coalesce theo group, strongest compatible severity do config/priority rõ; tie dùng event ordering, không timestamp máy hoặc callback order. Không đổi tick schedule để nhận ngay tick extra khi refresh. Duration/severity/refresh cap/resistance values đều UNRESOLVED.

Combatant_shared là record gameplay của player/enemy identity, không lore rằng spirit có mô sống bị cháy. Đổi form giữ remaining window và hit cursor, damage chỉ lên một active body tại boundary R03. Form_bound giữ trên progression/formId inactive mà không tạo body ngoài thế giới; clock vẫn cùng simulation, các marks không tự gây damage/emit effect từ reserve. Source_active hết ngay khi mất nguồn/đổi form, không heal/shield reserve. Owner scopes là recommendation mới, chưa approve model vật lý/HP/resource của Task03.

Với tick của combatant_shared, payload nguồn giữ cast/config snapshot; target defense lấy profile của active body tại boundary tick đã xác định. Switch không reroll potency, reset remaining budget hoặc tự xóa status. Nếu profile mới có resistance hợp lệ thì xử theo channel/status scope của nó, không mặc định miễn vì affiliation; không apply tick vào reserve. Chính sách này vẫn là PROPOSED E09-P06, cần review với R03 trước code.

## `status_burning`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Burning / Cháy |
| Taxonomy | damage_over_time |
| Ownership | combatant_shared |
| Triggering conditions | Heat hit hợp lệ + target nhận burn được theo material/skill; không mọi Fire hit đều burn |
| Duration concept | Cửa sổ ngắn/hữu hạn theo definition; simulation clock, không thêm thời gian bởi switch |
| Stack behavior | Một burn group trên target; strongest compatible payload thắng, không cộng mọi nguồn thành stack vô hạn |
| Refresh behavior | Application mới có thể refresh trong max window; không reset tick ngay hoặc tick kép |
| Removal conditions | Hết duration, counter đã khai báo như heat-dissipation receiver, skill dispel hoặc attempt reset hợp lệ |
| Immunity/resistance | Trait heat/status resistance có scope; affinity Fire tự nó không immunity |
| Visual indicator | Mép ember + nhịp tick, không phủ silhouette; audio crackle nhẹ có thể tắt |
| Combat purpose | Áp lực di chuyển/chọn chỗ trú; không damage best mọi matchup |
| Other-effect interactions | Wet + Fire có thể heat dissipation/steam theo rx_water_fire, không vừa nhân burn vừa bonus steam toàn budget |
| Abuse cases | Switch xóa burn/rollover tick hoặc refresh mãi; shared record không reset/hit hai body |

## `status_wet`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Wet / Ướt |
| Taxonomy | surface_condition |
| Ownership | form_bound |
| Triggering conditions | Moisture action/receiver/environment được author; underwater không mặc định toàn ocean có điện |
| Duration concept | Bề mặt còn moisture window, giảm theo context đã định nghĩa |
| Stack behavior | Một coverage condition không stack weakness nhiều lớp |
| Refresh behavior | Refresh tới authored cap; không tạo water volume/resource mới |
| Removal conditions | Khô theo clock/context, heat dissipation consume hợp lệ; đổi form không xóa record nguồn |
| Immunity/resistance | Hydrophobic/protected surface explicit; Water affiliation không auto always wet/immune |
| Visual indicator | Giọt/viền gợn + symbol, không recolor full body |
| Combat purpose | Setup condition, tự nó không damage hoặc universal vulnerability |
| Other-effect interactions | Discharge chỉ khi còn conductivity/path/source; growth chỉ living receiver, không generic heal |
| Abuse cases | Biến wet thành chain toàn biển hoặc buff vĩnh viễn; record reserve không spawn nước ngoài map |

## `status_electrified`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Electrified / Tích điện |
| Taxonomy | stored_charge |
| Ownership | form_bound |
| Triggering conditions | Nguồn charge hữu hạn + target/receiver tiếp nhận charge được |
| Duration concept | Cửa sổ giữ charge hữu hạn; không nguồn thì không recharge |
| Stack behavior | Một charge group/cap; không cộng dồn từ cùng cast/reactive output |
| Refresh behavior | Refresh không reset proc eligibility/ledger hoặc tăng budget vượt source cap |
| Removal conditions | Xả một lần theo trigger, hết hạn, insulation/circuit-break interaction explicit |
| Immunity/resistance | Status/electrical resistance tách; Metal không mặc định nhận/miễn điện |
| Visual indicator | Zigzag rời + icon nguồn/nút nối, warning trước pulse, tránh strobe |
| Combat purpose | Tạo setup/window xả có thể né/ngắt, không DoT tự chạy mỗi frame |
| Other-effect interactions | Wet/material connector mở eligible path cho rx_conductive_discharge hoặc rx_charged_path |
| Abuse cases | Cùng charge gây direct hit và nhiều discharge; reserve không tự xả damage ngoài map, source token consumed một lần |

## `status_rooted`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Rooted / Níu rễ |
| Taxonomy | movement_control |
| Ownership | combatant_shared |
| Triggering conditions | Root source/node còn hợp lệ và contact window; không tự trói mọi target |
| Duration concept | Khoảng giữ hữu hạn theo CC profile; node mất thì end |
| Stack behavior | Cùng CC family chỉ một active restraint, không queue nhiều root nối vô hạn |
| Refresh behavior | Refresh bị family recovery/boss response chặn; không cứ hit là reset hết duration |
| Removal conditions | Phá/rời nguồn khi hợp lệ, skill escape explicit, node expire; switch không là dispel |
| Immunity/resistance | Boss profile có thể giảm hold/đổi thành pressure response, không miễn toàn attack |
| Visual indicator | Vòng rễ/điểm neo + cue recovery, chừa chân/đầu |
| Combat purpose | Giới hạn translation; vẫn aim/attack nếu action cho phép, không stun tất cả input |
| Other-effect interactions | Slow không cộng thêm immobilize window, reaction output không tạo root mới tự động |
| Abuse cases | Đổi nhỏ footprint để thoát geometry, chain-root; placement/anchor revalidate qua R03 |

## `status_slowed`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Slowed / Chậm bước |
| Taxonomy | movement_control |
| Ownership | combatant_shared |
| Triggering conditions | Pressure/plant/zone action khai báo slow khi evidence đủ |
| Duration concept | Window ngắn hoặc trong zone, kết thúc theo definition |
| Stack behavior | Strongest trong movement group, không nhân mọi slow; floor movement phải hữu dụng |
| Refresh behavior | Refresh có cap và family recovery; zone exit không liên tục reapply ngay không window |
| Removal conditions | Hết hạn/rời zone/nguồn bị phá/escape được chỉ định |
| Immunity/resistance | Resistance giảm application/ảnh hưởng; không giảm simulation clock/cooldown để softlock |
| Visual indicator | Foot trail/mũi nhịp chậm + icon, không cần screen blur |
| Combat purpose | Tạo thời cơ positioning, không cấm phản công toàn bộ |
| Other-effect interactions | Root đang hold không thêm full slow chain, Wet không auto slow |
| Abuse cases | Perma-slow do ticks/stack, đổi form reset clock; group resolve và positive movement floor chưa numeric |

## `status_disrupted`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Disrupted / Gián đoạn |
| Taxonomy | action_control |
| Ownership | combatant_shared |
| Triggering conditions | Đòn disrupt đúng interruptible action/window; không auto hủy mọi boss phase |
| Duration concept | Một cửa sổ gián đoạn ngắn có recovery, không trạng thái stun dài mặc định |
| Stack behavior | Không queue interruptions cùng family; coalesce same tick |
| Refresh behavior | Application mới trong recovery không refresh full lock; có thể feedback resisted |
| Removal conditions | Action kết thúc/abort recovery xong, explicit cleanse nếu được author |
| Immunity/resistance | Boss action profile quyết window; immunity disrupt không chặn ordinary damage |
| Visual indicator | Biểu tượng nhịp gãy + pose phản ứng ngắn, không flash lớn |
| Combat purpose | Ngắt charge/đổi nhịp, không tự reset enemy cooldown thành dễ farm |
| Other-effect interactions | Damage/status commit theo thứ tự R03; không cancel transform postcommit để hoàn HP |
| Abuse cases | Đổi form tránh interrupt đã accepted hoặc spam giữ boss không hành động |

## `status_armor_weakened`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Armor weakened / Suy yếu giáp |
| Taxonomy | defense_condition |
| Ownership | form_bound |
| Triggering conditions | Hit đúng exposed/thermal-sensitive armor profile hoặc skill có trait này |
| Duration concept | Một vulnerability window giới hạn, không hỏng giáp vĩnh viễn mặc định |
| Stack behavior | Một defense cause group; strongest compatible, không defense âm |
| Refresh behavior | Refresh bounded; không làm wear progression/permanent item damage mới |
| Removal conditions | Window hết, stance/material ổn định hoặc skill repair explicit |
| Immunity/resistance | Structural/status resist theo profile; Metal affinity không miễn/tự vulnerable |
| Visual indicator | Vết contour/joint sáng tách shield, không tái thiết kế creature |
| Combat purpose | Mở cơ hội đánh đúng angle/channel, không mọi damage nhận bonus |
| Other-effect interactions | rx_heat_transfer có thể mở window nếu target profile cho; damage resolver không tính hai lần |
| Abuse cases | Cộng armor break với affinity cùng cause/nhân mọi channel, re-equip reset record |

## `status_protected`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Protected / Được che chở |
| Taxonomy | defensive_buff |
| Ownership | source_active |
| Triggering conditions | Skill/guard/receiver được chỉ định, orientation và capacity hợp lệ |
| Duration concept | Trong hold/window của skill, nguồn hết thì end |
| Stack behavior | Chọn protection group theo channel/sector, không cộng shield reserve |
| Refresh behavior | Chỉ refresh bằng activation thật có cost; không cooldown/reset khi switch |
| Removal conditions | Nguồn/channel ngắt, sector sai, budget hết, switch rời form nguồn hoặc expiry |
| Immunity/resistance | Không generic all-damage immunity; counter guard-break/angle cần profile |
| Visual indicator | Sector outline + capacity cue, phân biệt block/contact/miss |
| Combat purpose | Cho quyết định brace/position, vẫn có hở/cost/recovery |
| Other-effect interactions | Không biến Wet/Metal thành shield tự động, không giữ nhiều passive reserve |
| Abuse cases | Switch vòng để chồng shield hoặc hấp thụ cùng hit hai lần; ledger/owner một target |

## `status_regenerating`

| Field | PROPOSED contract |
| --- | --- |
| Tên | Regenerating / Dưỡng sinh |
| Taxonomy | recovery_buff |
| Ownership | source_active |
| Triggering conditions | Skill hồi phục được author, active form HP>0 còn nguồn sống và channel; Ly S2 vẫn proposal |
| Duration concept | Trong channel/window hữu hạn, không heal offline |
| Stack behavior | Một healing group, không cộng reserve/passive hoặc chain reaction heal |
| Refresh behavior | Không refresh/reset tick bằng movement/switch; activation mới qua cost/skill rules |
| Removal conditions | Switch, incapacitation, ngắt, mất source/vùng hoặc hết thời gian |
| Immunity/resistance | Không revive HP0, không universal Water/Wood heal; anti-heal nếu có phải thiết kế riêng |
| Visual indicator | Node lá + pulse nhỏ tại active, không aura toàn team |
| Combat purpose | Trade-off lộ thân/đứng đúng nguồn đổi HP theo budget |
| Other-effect interactions | Hydration hỗ trợ plant control không auto trigger regen; Life authority không mở heal này miễn phí |
| Abuse cases | Heal–switch–reserve loop, biomass→mana→heal loop; không hồi quỹ switch hay corpse |

## Crowd-control recovery và bosses

**PROPOSED E09-P04:** root/slow/disrupt chia family budget và recovery window do encounter profile khai báo. Repeated applications trong protected recovery có thể bị giảm/không hold, vẫn có feedback và direct damage nếu hợp lệ. Không convert mọi failed root thành miễn phí extra damage/poise-break; alternative response chỉ khi boss profile author rõ. Không dùng blanket immunity tất cả statuses làm mặc định boss.

Control không kéo boss/player ra khỏi authored safe bounds/return routes; displacement chỉ khi geometry/phase cho phép. Anti-CC không hardcode theo rarity/foreign origin; áp cùng invariant cho player/enemy với response riêng đọc được. Budget/window/reset conditions cần balancing sau, Task09 chưa gán seconds/percent/cooldown.

## Expiry, save/load và không free cleanse

Runtime visuals/particles và environmental temporary fields không persist từng frame theo W07. **PROPOSED E09-P10:** nếu save boundary cần giữ áp lực status thì chỉ serialize minimal `status obligation` (definition/version, target/owner binding, remaining time/budget, source snapshot, last applied tick/hit IDs); load không replay hit đã commit, không cộng offline ticks. Đây là đề xuất nối save contract, chưa implementation/approval storage.

Ngoài boss, không bỏ harmful obligation mà giữ phần thưởng/HP mới để reload thành cleanse miễn phí; restore accepted obligation hoặc rollback toàn boundary nhất quán theo policy được duyệt. Trong boss/defeat dùng R03 attempt abort/reset trước collection/recovery, không resume boss damage với bộ khác. Nếu policy chọn reset một transient status thì phải chỉ ra boundary/checkpoint và cost/outcome tương ứng, không reset tùy menu.

Unknown status ID: preserve opaque obligation/provenance, quarantine unsupported effects và recovery checkpoint đã validate; không chạy arbitrary effect, không tự heal/grant/bỏ harmful cost âm thầm. Migration alias/version + backup cần task kỹ thuật; W07 rules vẫn authority cho durable world facts. Chi tiết ngoài-combat status save/loss budget cần A08-11 và E09-P10 duyệt trước code.
