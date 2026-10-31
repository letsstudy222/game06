# Hai combat phases được khuyến nghị

**PROPOSED B23-P05**, không biological evolution hoặc new Sacred stage. So sánh: hai phases đủ introduce rồi vary; ba phases cần thêm pattern/clip/camera/testing và dễ overload first boss, không chọn mặc định. Không final HP percentages/damage/speed scaling. Production phase predicates phải approved trước implementation, không hidden health trigger fallback.

## c1_phase_hold — Giữ mạch

| Trường | Phase contract |
| --- | --- |
| Mục đích | Giới thiệu guardian giữ hướng và giải nghĩa sweep/pressure/recovery |
| Hành vi | Lựa pattern đơn theo perceived position/LOS/source/cooldown, no instant punish mọi input |
| Hành động khả dụng | c1_keeper_sweep, c1_keeper_pressure, c1_keeper_brace; no split/current surprise |
| Thay đổi đấu trường | Weak base current/cover/lane ổn định, receiver có cue nhưng không puzzle overload |
| Thay đổi di chuyển | Boss reposition hữu hạn có path/turn clearance, player Quy I bơi/hãm kiểm soát |
| Phản hồi hình ảnh | Forearms/vent/sector và recovery gaps, outline khi FX off |
| Mục tiêu học | Đọc lock vector, đổi lane/flank/chờ recovery rồi Chấn Mai |
| Cách đối phó | Tất cả bằng movement/basic; guard là eligible optional, no stun/hidden affinity prerequisite |
| Điều kiện chuyển tiếp | Queue phaseII khi approved combatProgressBandRuleRef hoặc accepted trial-induced pressure-shift evidence đủ. Chưa numerical HP thresholds. HP0/outcome xử coordinator, không ép evolve/phase để hồi boss |
| Lưu bền vững | Attempt-local phase/cursors; chưa chọn midfight resume, recommended reload abort/reset theo L16, no permanent phase event |

## c1_phase_rebalance — Đổi nhịp hồi

| Trường | Phase contract |
| --- | --- |
| Mục đích | Thay cách giữ/đổi dòng trên cơ chế đã biết, không chỉ nhanh/mạnh hơn |
| Hành vi | Giới thiệu local current band có clear gap, pressure so-le sau preview; vẫn compulsory recovery/miss windows |
| Hành động khả dụng | Giữ sweep/pressure/brace, thêm c1_keeper_recirculate và c1_keeper_split_release; không xả cùng offensive effects khi safe response mất |
| Thay đổi đấu trường | Một current lane hữu hạn đổi pattern có warning/source/refuge, không permanent arena-wall change hoặc tắt return |
| Thay đổi di chuyển | Body reposition quanh valid anchors, field compose/sweep một lần; no teleport/pin player |
| Phản hồi hình ảnh | Vent/rãnh vào–ra đổi posture, same anatomy/size/element, phase cue tĩnh thay flash |
| Mục tiêu học | Đọc safe lane/order rồi counter basic, dùng optional receiver nếu chọn; no full3/II/III |
| Cách đối phó | Movement-safe corridor/cover luôn có, split lane locked upfront và recovery đủ; field expire trước unsafe new pattern |
| Điều kiện chuyển tiếp | Accepted qualifying combat defeat hoặc approved trial proof + threat stopped/operation permission/refuge valid dẫn RESOLUTION_PENDING. Simultaneous defeat arbitration chưa approve, no callback victory-first |
| Lưu bền vững | Same attempt/lock/HP/cooldown/status/hit ledgers, no phase reset debt/heal/regrant; E04 commit mới permanent outcome |

## Transition safety

Predicate đủ trong ATTACK thì queue, không reset action/damage/hit ordinals. Unreleased action cancel chỉ theo explicit interrupt rule; released pulse/field xử cast lifetime trong old pattern và spatial budget, phase cue/new dangerous action đợi safe boundary RECOVER/no unsafe overlap. Không clear projectile/poise/CD/status để né hit hoặc phase heal. Transition animation không mặc định invulnerable; accepted hits vẫn C14 pipeline, HP0 không resurrect boss cho đủ phase count.

Player incapacitated và phase predicate/HP0 cùng boundary: coordinator phải resolve continuation/outcome theo selected policy, stop new hostile emissions khi entering resolution; không phase presentation quyết định victory/defeat hoặc auto emergency transfer. Arbitration C14/L16 unresolved ghi B23-U04, production-ready blocked. PhaseII first new mechanic có preview/readable safe window, không hidden animation skip khiến người chơi mất cue. Stagger/phase tương tác cần control-family/recovery budget, no stun-lock or perma guard.
