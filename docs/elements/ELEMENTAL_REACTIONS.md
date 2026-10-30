# Elemental reactions — tám đánh giá có điều kiện

**Task09 — PROPOSED:** mọi cơ chế/ID/interaction chi tiết mới là đề xuất, chưa triển khai hoặc cân bằng. Chỉ nền được dẫn rõ là CONFIRMED. [Decision register Task09](TASK09_DECISIONS.md) giữ status/dependencies; không tự bắt đầu Task10.

**PROPOSED E09-P05:** tám ví dụ được đánh giá, không tám mechanics bắt buộc. Reactions nhận properties/status/receiver tokens, không chỉ hai element labels; một cây ướt có thể dùng discharge rule dù affiliation là Wood. Các pair names là cách học vocabulary, không dual-species affinity calculations.

## Reaction lifecycle và anti-loop

Source evidence + target/context snapshot → validate path/ownership/limits → reserve input tokens và reaction key → commit output/hit ledger → presentation. Key gồm root cast/source tokens + reactionId + target/receiver + occurrence; duplicate callback không consume/emit lần nữa. Hai rules muốn cùng input phải exclusive hoặc có priority explicit; definition chưa rõ thì content-ready FAIL, không dựa order array.

Output mặc định `reactionEligible=false`: steam/growth/discharge output không tự quay lại input để chain. Nếu future exception cần design acyclic graph, budget và approval riêng. Một pulse không kích lại chính charge-source đã consumed. Direct damage/status/reaction chia authored budget; không nhân full base cho mỗi hop hoặc mỗi recipient. Target cap/range/lifetime/resource costs để task balance, chưa có numbers.

Các kiểu propagation/redirect theo authored local graph/spatial query, không simulation điện/nước/nhiệt toàn thế giới. Chỉ W07 writer có quyền commit persistent changes sau quest/capability/habitat/route checks. Reactions tạm không tự grant XP, memory, form, item hoặc world stable flags.

## `rx_conductive_discharge` — Thủy + Lôi / conductive discharge

| Field | Candidate contract |
| --- | --- |
| Required setup | Wet surface/connector có conductivity và một charge source thật còn budget; local graph do level author, không toàn ocean |
| Activation order | Moisture setup rồi discharge; hoặc Water chạm nguồn đã charged, cùng input token chỉ consume một lần |
| Combat outcome | Pulse theo bounded eligible path/targets từ budget nguồn, không nhân base mỗi hop; root/DoT không tự xuất thêm lightning |
| Environmental outcome | Đọc vùng dẫn/đóng ngắt connector tạm; permanent mechanism cần W07 event, không xóa mọi refuge điện |
| Visual/audio feedback | Đường gãy từ source tới endpoints + warning pulse/âm xả ngắn, không strobe |
| Limits | Graph radius/targets/charge/proc caps qualitative; output non-reactive; không mọi wet actor tự phát điện |
| Counterplay | Rời connector/cover/cắt nguồn/đợi xả; không đòi có form Lôi để đánh enemy |
| First playable suitability | First playable: chỉ optional authored hazard demonstrator khi có safe return, không required reaction hoặc playable Lôi |
| Selection assessment — PROPOSED | CANDIDATE LATER, optional prototype only |

## `rx_water_fire` — Thủy + Hỏa / heat dissipation hoặc steam

| Field | Candidate contract |
| --- | --- |
| Required setup | Moisture deposit có nguồn + heat budget + receiver chọn rõ open/cooling hay confined-pressure mode |
| Activation order | Water trước Fire hoặc Water vào heat; mode/exclusions author trước, không chọn ngẫu nhiên hai outcomes cùng input |
| Combat outcome | Một pulse steam/occlusion hoặc kết thúc burn theo counter rule explicit; direct hit không được heal/nhân lại damage |
| Environmental outcome | Vent/thermal receiver có đường xả; không gây nổ mọi hồ hay bật cả volcano |
| Visual/audio feedback | Viền hơi/đầu thoát/âm xì, silhouette và hazard edge vẫn rõ |
| Limits | Consume moisture/heat tokens; không reset cooldown/regen resource; không retroactively hoàn HP của direct hit |
| Counterplay | Ra mép trước pulse, mở xả/đợi nguội, không cover mù toàn screen |
| First playable suitability | First playable: có thể optional receiver nước–nhiệt có nguồn sẵn; không yêu cầu mở Phượng, không main gate |
| Selection assessment — PROPOSED | CANDIDATE SMALL ENV DEMO, not mandatory |

## `rx_directed_heat` — Hỏa + Phong / directed heat

| Field | Candidate contract |
| --- | --- |
| Required setup | Flame/thermal effect có redirectable tag + vector receiver/gió đã khai báo |
| Activation order | Fire đặt effect rồi Wind đổi hướng; hoặc lane gió có sẵn nhận Fire, cùng redirect budget |
| Combat outcome | Đổi vector/lane của effect hiện hữu, không copy projectile/AoE hoặc tăng TTL/base damage |
| Environmental outcome | Thermal path chọn lọc tới landing; không cháy lan tự do qua vegetation |
| Visual/audio feedback | Vector trước–sau/mép lane + âm gió/heat, không FX phủ đầu Long |
| Limits | Giữ cast snapshot/tổng hit budget, mỗi redirect group có cap; output không tạo gió/lửa vô hạn |
| Counterplay | Flank, rời lane, projectile không tag thì không bị lệch; source recovery window |
| First playable suitability | First playable: defer vì Quy I không cần pair này; có thể về sau dùng environmental source đã báo |
| Selection assessment — PROPOSED | LATER CHAPTER CANDIDATE |

## `rx_hydrated_growth` — Mộc + Thủy / hydrated structure

| Field | Candidate contract |
| --- | --- |
| Required setup | Plant effect/vật mang còn sống + moisture trong tolerance, nguồn vật chất và node hữu hạn |
| Activation order | Chuẩn bị ẩm rồi chạm nút sống, hoặc tưới plant đã đặt; không tất cả wet terrain mọc cây |
| Combat outcome | Giữ cấu trúc plant control theo authored cap, không tự gia hạn root/heal hoặc tăng stacks |
| Environmental outcome | Growth/bridge chỉ receiver sinh học viable; ecological restore cần partners/story event riêng |
| Visual/audio feedback | Mạch ẩm tới node/chồi, nhịp lá và âm rễ nhẹ; thiếu điều kiện có cue |
| Limits | Không biomass/loot/heal/mana generation; không Life resurrection; không tự mở Ly trước E21 |
| Counterplay | Rời/phá node hoặc ngắt nguồn, không bắt đối thủ mang Hỏa để giải root |
| First playable suitability | First playable: observation/receiver hint nếu có, full growth defer; không cần Ly để ra sanctuary |
| Selection assessment — PROPOSED | LATER WOOD CANDIDATE |

## `rx_controlled_renewal` — Mộc + Hỏa / limited burning-clearance evaluation

| Field | Candidate contract |
| --- | --- |
| Required setup | Vegetation object được author là combustible, vùng đệm/refuge và recovery source còn viable |
| Activation order | Heat tác động vùng được chỉ định; restoration chỉ sau kiểm điều kiện còn sống, không tái tạo corpse |
| Combat outcome | Burning có source/target scope và finite zone, không damage bonus vì target Wood hoặc forced forest destruction |
| Environmental outcome | Có thể clearing nhánh có preview nếu content được duyệt; main story không xóa adapted habitat, không coi đốt rừng là healing |
| Visual/audio feedback | Boundary lửa/nguồn sống còn lại/âm báo, preview hậu quả trước thao tác irreversible |
| Limits | Không propagation qua toàn ecosystem; flame event không write permanent; option chưa coverage thì không release |
| Counterplay | Dập theo receiver rule/đi vòng/cắt nguồn; giữ đường hoàn tất collection |
| First playable suitability | First playable: exclude destructive vegetation changes; controlled heat work để chương sau |
| Selection assessment — PROPOSED | DEFERRED HIGH ECOLOGICAL RISK |

## `rx_charged_path` — Kim + Lôi / charged structure

| Field | Candidate contract |
| --- | --- |
| Required setup | Metal vật lý hoặc cấu trúc khác có conductive tag, connector path và charge source; affinity Kim không đủ |
| Activation order | Charge structure rồi contact/hit receiver; hoặc discharge vào connector sẵn; Water có thể mở moisture link nếu author cho |
| Combat outcome | Xả có hướng theo path, precise setup; protected/armor không tự tăng vì thêm Lôi |
| Environmental outcome | Circuit/mechanism tạm hoặc event request; không every machine/Metal creature là battery |
| Visual/audio feedback | Connector nodes sáng theo hướng + âm click/xả có warning, shape khác Wet |
| Limits | Charge budget một nguồn, route/target caps; insulated plate không dẫn chỉ vì Kim; output non-reactive |
| Counterplay | Mở circuit/insulate điểm được chỉ định/rời path và đánh source khi recovery |
| First playable suitability | First playable: defer; không required Metal/Lightning encounter trong slice Quy |
| Selection assessment — PROPOSED | LATER CONDUIT CANDIDATE |

## `rx_storm_guidance` — Phong + Lôi / directional discharge evaluation

| Field | Candidate contract |
| --- | --- |
| Required setup | Chỉ bolt/effect có redirectable tag và wind lane author; không giả mọi điện đi theo không khí |
| Activation order | Lightning release vào wind lane hoặc Wind đổi vector bolt đang hợp lệ |
| Combat outcome | Redirect có cap, không homing hoặc đánh mọi target ngoài view; có thể chỉ presentation/không reaction riêng |
| Environmental outcome | Storm pathway ở vùng trời được author, không gọi thời tiết toàn bản đồ |
| Visual/audio feedback | Lane/điểm xả dự báo rõ + âm cadence, không random full-screen lightning |
| Limits | Kỹ thuật/readability cost cao; không bắt thành mechanic nếu overlap generic redirect; không blanket Wind–Lôi bonus |
| Counterplay | Ra lane/cover, break nguồn/đợi nhịp; không bắt có Long/Lôi trước Long awakening |
| First playable suitability | First playable: exclude; evaluate prototype sau khi generic redirect ổn |
| Selection assessment — PROPOSED | DEFERRED; MAY REUSE GENERIC REDIRECT ONLY |

## `rx_heat_transfer` — Kim + Hỏa / structural heat transfer evaluation

| Field | Candidate contract |
| --- | --- |
| Required setup | Thermally responsive material profile có ngưỡng/tolerance qualitative, heat source và outlet |
| Activation order | Heat tích vào receiver/material, hoặc structure nóng nhận tác động; không mọi blade nóng tự biến yếu |
| Combat outcome | Armor weakened window chỉ nếu trait cho và channel/angle phù hợp; không mặc định melt mọi Metal target |
| Environmental outcome | Mở receiver nhiệt/giãn cấu trúc tạm, permanent bridge/door chỉ event; cooled rock không đổi thành Kim affinity |
| Visual/audio feedback | Viền heat/joint/capacity cue + âm giãn nhẹ, target vulnerable có posture báo |
| Limits | Không negative armor, không multiply nhiệt/affinity/weakening cùng cause; không universal Fire>Metal |
| Counterplay | Hạ nhiệt/cắt nguồn/flank hoặc chờ window; vẫn ordinary attacks ở target hợp lý |
| First playable suitability | First playable: defer numeric structural combat; basic temperature feedback optional không reaction mới bắt buộc |
| Selection assessment — PROPOSED | LATER MATERIAL CANDIDATE |

## Liên tục với C04

[C04 synergies](../gameplay/SACRED_SYNERGIES.md) giữ bối cảnh six native pairs, ownership/channel/expiry và không heal reserve. Task09 reaction contracts làm rõ generic mechanics, không tự bật mọi synergy hoặc sửa chiêu Sacred. Water–Wind/Wind–Wood có thể là environmental vector/seed synergy không cần reaction damage mới; không ép tất cả pair thành named proc. Wood–Fire clearing ở đây bị defer, không permission đốt/xóa habitat trong story.

Chưa có FX/SFX/animation clips cho tám proposals. Baseline fire burst procedural không là evidence reaction đã implemented. Approval phải chọn subset và parameters/asset/telegraph test scope; không tự mở thêm element/playable form từ reaction.
