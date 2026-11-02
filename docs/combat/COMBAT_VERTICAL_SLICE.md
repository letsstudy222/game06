# Quy combat demonstrator tại Vực Hải Uyên

**PROPOSED C14-P14**, implementation slice để review, không task code và không quota production. [D40 trong GDD](../GAME_DESIGN_DOCUMENT.md) còn first playable gồm underwater sample, initial resonance và persistent progress: combat demonstrator này là một phần, không tự đóng toàn mốc.

## Nhỏ nhất đủ kiểm feel/hit detection

| Candidate component | Behavior để thử về sau | Acceptance evidence tương lai |
| --- | --- | --- |
| Quy I controllable | Một form, direct keyboard/world-plane adapter, bơi/di chuyển/turn/stop qua geometry hợp lệ | Đi tuyến, stop/reverse/current/va wall; không cần species thứ hai |
| One basic | quy_basic candidate nạp→contact→recover | Hit/miss/sector/budget, một enemy một contact/window, FPS khác không thêm hit |
| Minimal defense | Brace ngắn hướng, finite hold/CD/recovery, không stage-II quy_s2 | Front mitigated, flank punish, không permanent guard hoặc i-frame |
| Simple elemental skill | quy_s1 candidate cone áp nước, channel/status subset duyệt riêng | LOS/range/release/interrupt/CD; không auto reaction chart hoặc full status suite |
| One enemy archetype | arch_territorial_defender candidate, không species/boss identity mới | Warning→approach→commit→recover/leash; Quy có lời giải cơ bản |
| Hurt/defeat/retry | Một HP owner, clear feedback, safe checkpoint/reset attempt | HP0 không cast tiếp; retry không giữ old hit/reward hoặc reset durable progress |
| Environmental interaction | Receiver áp nước cục bộ, có nguồn/permission/safe return | Combat intent không tự permanent flag; nếu persistence dùng W07 writer/proof/ledger |

Đếm “một” là cách cắt demonstrator để đo, không exact content commitment. Không cần ba species, full evolution, dual creature, đủ reactions, boss hoặc long combo. Asset placeholder chỉ nếu được duyệt riêng và không overwrite art cũ; không generate gì trong Task14.

## Approval gates trước implementation

| Gate | Required decision / dependency |
| --- | --- |
| C14-U01 | World plane/camera/swim/current/layer/clearance subset; không oxy/stamina tự phát |
| C14-U02/U04 | A cooldown model, defense hold/cancel/spend/CD, markers/hit ordering/tie-break, qualitative budgets; numeric tuning sau scoped approval |
| C14-U03/U06 | HP/recovery/input arbitration/no-switch single form và future ownership hooks; không cần chốt cosmic origin để thử combat |
| C14-U05 | Quy reference/production clips/anchor/shapes và enemy/receiver assets/modules thật; C04-P07 vẫn pending |
| C14-U08/U09 | Focus/pause/remap/accessibility subset, target device budgets và measured acceptance method |
| W07/A08-11, V13 | Save/namespace/migration/ack/loss budget nếu demonstrator tích hợp persistent milestone; evolution không thuộc combat demo |
| A08-13/Q05/Q18 | Implementation scope/budget và opening/art prerequisites nếu mở rộng sang đủ D40 resonance demo |

## Trình tự validate sau approval

Duyệt scope/fixtures → test movement và shapes trong phòng nhỏ → state/interrupt/dedupe tests → keyboard enemy encounter/retry → water receiver/readability → browser/mobile emulation rồi physical device nếu có → chỉ sau đó mở rộng animation/roster. Báo riêng functional assertions, skipped/unrun, real hardware và playtest observations; không lấy logic tests Phoenix hiện hữu chứng minh combat Quy.

Task14 chỉ kiểm tài liệu, không chạy runtime tests cho cơ chế chưa tồn tại. Ready cho bước quyết định/prototype có scope sau approval, **chưa implementation-ready** khi các gates trên còn mở. Task15 chưa bắt đầu; có đầu vào resource/role/constraints để thiết kế progression numbers khi được giao.
