# Elemental balance, counterplay và browser readability

**PROPOSED E09-P08:** qualitative balancing framework, không thay runtime combat, không damage/cooldown/duration/multiplier numbers. Nguồn vocabulary: [overview](../elements/ELEMENTAL_SYSTEM_OVERVIEW.md), [affinity](../elements/ELEMENTAL_AFFINITIES.md), [status](../elements/STATUS_EFFECTS.md), [reactions](../elements/ELEMENTAL_REACTIONS.md).

## Trade-off dimensions

| Dimension | Qualitative budget / design review question | Counterplay / what must not happen |
| --- | --- | --- |
| Damage | Tổng authored action budget chia channel/status/reaction, không full base mỗi output | Higher burst cần charge/aim/position/recovery; Fire không damage king mọi tình huống |
| Defense | Scope channel/sector/source/cap, cause group normalized | Đọc flank/recovery/weak joint; không stack all-channel invulnerability |
| Mobility | Range/clearance/source/landing và action commitment | Không i-frame/noclip mặc định từ element; Long/Phượng niches khác |
| Crowd control | Shared family window/recovery, không queue root/slow/disrupt vô hạn | Có thể thoát/phá node/đánh recovery; boss vẫn nhận damage dù status bị chống |
| Area coverage | Source footprint/lane/target count/occlusion limits | Phải thấy hazard boundary và có safe path; không whole-screen blanket damage |
| Resource consumption | Skill cost/uptime theo profile riêng, switch resource vẫn R03 pending | Không reaction trả quỹ/cooldown miễn phí, không chọn numbers thay task balance |
| Status application | Evidence/hit condition/refresh cap/group/tick schedule explicit | Không every hit every frame proc, refresh không extra tick |
| Utility | Utility thay damage/coverage opportunity cost, không mọi element heal/control/mobility đầy đủ | Loài cùng hệ khác kit, rarity không đảm bảo superior stat+utility mọi mặt |
| Environment advantage | Chọn source/path/timing, giữ counter-route | Không resistance element thành vé sống duy nhất, không one-form early progression lock |
| Execution difficulty | Aim/timing/readability được đền bằng window hữu ích có cap | Không high-skill nỗ lực mà enemy miễn hết; không auto reaction combo phá mọi challenge |

## Chín exploit gates

| Risk | Prevention / future validation |
| --- | --- |
| Một hệ dominate | Test cùng action context ở dry/wet/enclosed/open và enemy archetypes; advantage theo source/skill không bảng auto-win |
| Permanent stun/root loop | Family recovery, refresh cap và không queue; multi-source collision coalesce; boss response từng phase |
| Unlimited healing | Chỉ authored skill, HP>0 active, finite source/cost, channel end khi switch; no reserve regen/revive/resource loop |
| Infinite reaction chain | Input token consume/ledger, output non-reactive, no re-trigger by same pulse, one budget no exponential branches |
| Uncounterable environmental damage | Telegraph trước entry, clear boundary/return, active hazard source có phương án xử lý với main forms |
| Immunity softlock | Status immunity không attack damage immunity; ordinary angle/window/receiver path luôn khả dụng cho important encounter |
| New form invalidates old | Water hydrology/thermal/wind/biology utility giữ khác nhau; main phases không global debuff xóa progression |
| Rare always stronger | Rarity độc lập role/morality/power, balance theo anatomy/kit/trade-off/mastery, không rarity multiplier mặc định |
| Switch loop universal best | Active-only passives/channel, snapshot residual, no cooldown/HP/status reset; resource/cancel policy chờ R03 approval |

## Representative hypothetical scenarios — không playtest results

| Scenario | Expected tactical alternatives / review goal |
| --- | --- |
| Quy I gặp guardian entry với hai empty | Attack/brace-position/đọc dòng/receiver main đủ, không đòi ba member hoặc Lôi/Phượng chưa mở; boss mechanics vẫn cần riêng |
| Water và adapted Water–Lightning habitat | Tránh/cắt discharge source/đi nhịp dòng, không giết mọi adapted hoặc immunity Water bắt buộc |
| Phượng gặp Wind lane lạnh | Đổi góc/đợi nhịp/cận chiến/thermal khác, không global penalty hoặc RNG khiến mọi Fire đòn vô dụng |
| Long trong hành lang kín | Basic/lane ngắn/receiver/đổi form ngoài nguy; không crop/shorten long body hoặc perma Wind immunity |
| Ly gặp nền đá thiếu đất sống | Basic/leap/nguồn nhỏ hữu hạn hoặc route khác; no infinite biomass, heal không hồi reserve |
| Hai attackers root boss liên tiếp | Damage có tác dụng, control phải qua recovery/family budget; feedback resisted rõ thay miễn mọi status |
| Projectile Fire source bị switch sang Quy | Đạn giữ source config/TTL/hit ledger, không lấy Water traits rồi fire double; actual costs chưa chốt |
| Một creature affinity Metal không conductive | Electrical damage theo profile, không chain chỉ vì element; physical/material cues phải cho thấy lý do |

Không đảm bảo các tình huống đã playable. Balance task sau chọn representative encounters/skills/phases rồi tune damage/range/cost/status durations/refresh windows/target caps, không làm toàn roster cùng lúc.

## Performance/readability contract — PROPOSED E09-P09

Giới hạn logical active effects/target checks/chain connectors theo budget được đo ở technical task, chưa đặt FPS/resolution/memory/particle quotas. Dùng authored local graphs, spatial candidate query, shared simulation clock và stable event ordering; không simulate điện qua mọi giọt biển hoặc thermal fluid volume. Status timers/budget records tách render particles, không một object đầy đủ cho mỗi spark.

Culling chỉ bỏ vẽ FX ngoài camera, không đổi hit authority hay xóa proc ledger. Combat propagation giới hạn encounter/context có source; offscreen valid effect vẫn resolve deterministic, nhưng không thêm damage bất ngờ vào vùng chưa loaded/không warning. Persistent hazard dùng abstract region/context policy chứ không chạy mọi NPC cả thế giới. Active contexts/unload boundaries cần technical review.

Low-FX/reduced motion giữ warning/shape/vector/anchor; không strobe lightning, bloom lửa hoặc cloud Long che contour. Màu kèm icon/hình/pose, audio hỗ trợ có thể tắt; crucial warning không chỉ âm. Touch action có preview/cancel feedback đủ rõ, không UI mới được implement Task09. Dùng pixel effects rời/nearest-neighbor, keep readable terrain và approved Phoenix identity. Assets/audio/frame timing mới đều missing/chưa verified, không gọi prototype FX production-complete.
