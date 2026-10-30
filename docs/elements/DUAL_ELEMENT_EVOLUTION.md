# Tiến hóa, danh tính và độ ổn định

**Task10 — PROPOSED:** đặc tả để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline kiểm tra `38b8c1c`, 30/10/2026 Asia/Saigon. [Decision register](TASK10_DECISIONS.md) phân biệt nền CONFIRMED, recommendations và UNRESOLVED.


## Các phương án — E10-P06/P07

| Model | Benefit | Risk / gate | Recommendation |
| --- | --- | --- | --- |
| Fixed affiliation across stages | Continuity, save đơn giản, single species progression | Dễ bị art chỉ phóng to nếu thiếu anatomy deltas | Default đề xuất; vẫn cần thay đổi giải phẫu có ý nghĩa |
| Secondary expression tăng ở stage sau | Cho thấy maturation cơ quan dẫn/xả hoặc reinforced roots | Người chơi tưởng stage I không thật dual | Giữ hai refs từ đầu, stage đổi khả năng/visual chứ không tự đổi identity |
| Exceptional secondary unlock | Payoff narrative và điều kiện có ý nghĩa | Dễ biến assimilation thành free evolution hoặc bỏ single identity | Chỉ rule riêng và approval; không bắt mọi species đổi hệ |
| Variant configuration | Đa dạng sinh thái cùng họ | Duplicate XP/unlock, taxonomy/save ambiguity | Variant taxonomy UNRESOLVED, không mint species tự động |

SpeciesId khác stageId, appearance khác affinity và temporary exposure khác evolution. Không áp rule thêm Lôi/Kim cho Sacred, không đổi Life authority thành element. Giữ ba major stages Tứ Linh, không bắt mọi loài khác ba stage hoặc cùng level. Tên/gates C04 và XP/HP/catch-up R03 vẫn pending.

## Atomic progression và boss lock

Đề xuất kế thừa R03/C04: đủ điều kiện trong boss chỉ ghi pending eligibility một lần, frozen stage/config đến khi hết lock; apply ở safe point phù hợp clearance. Transaction gồm stage/config profileRef, skill availability refs, placement/loadout validation, acquisition proof và reward ledger nếu có, theo W07 authority. Không hai fields independently mutable “current elements” và profileRef. HP ratio/cooldown/recovery giữ trạng thái PROPOSED của R03, không dùng Task10 để duyệt. Không đổi membership giữa boss, không equip hai stages cùng species để né progression.

Nếu một approved exception thay secondary: preview compatibility/counterplay, validate source/capability/return coverage, commit profile version + stage/proof cùng boundary; lỗi rollback toàn transaction không mất XP. Phải duyệt exception trước, không fallback đổi nguyên tố ngẫu nhiên. Stage thiếu production art/action modules chưa release content, giữ last valid form và evidence, không tự cấp skin placeholder như approved.

## Stability không là stage

[Assimilation source](../ecology/ELEMENTAL_ASSIMILATION.md) giữ originProcess, affiliation, currentStability, cognition/consent và recoverability riêng. Stable dual có thể bị exposure mới; forced single có thể vẫn chỉ một affinity. Ổn định sau quest giữ lịch sử nguồn cưỡng ép, không rewrite thành natural adaptation, không auto reset thành single hoặc auto stage tăng. Symptoms/behavior/environment/source/recovery cần evidence nhiều nhịp, không chỉ màu. Ly hỗ trợ điều kiện sống viable, không resurrect hoàn toàn deceased.

## Save/migration

Progression duy nhất theo species/form record hiện hữu, refs đến stage/config catalog version; array elements không lưu độc lập trong mỗi loadout slot. Existing ordered metadata giữ provenance, alias/version resolver không đổi XP/skills hoặc duplicate form. Unknown profile/element giữ opaque historical record và backup, không execute unsupported mechanics, không wipe progression hoặc tự map Earth→Metal. New profile version phải có explicit migration path; nếu thiếu thì safe validated checkpoint/last supported config theo approved policy, không tự thêm affinity/restore HP. Content updates giữa boss dùng frozen version hoặc giải attempt theo R03 pending policy, không silent hot-swap.
