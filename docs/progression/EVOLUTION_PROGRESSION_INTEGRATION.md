# Tích hợp progression với evolution Task13

**PROPOSED P15-P08**, không thay [V13 decisions](../evolution/TASK13_DECISIONS.md), [trigger models](../evolution/EVOLUTION_TRIGGER_MODELS.md), [safe transition](../evolution/EVOLUTION_AND_LOADOUT.md), [state](../technical/EVOLUTION_STATE_MACHINE.md). Model D evolution là recommendation Task13, chưa approved.

| Input candidate | Authority | Retention / constraints |
| --- | --- | --- |
| Species level | Derived từ same cumulative XP/curve version | ThresholdRuleRef chưa số; không burn/reset XP khi evolve |
| Memory | AncestralMemoryRecord | Durable proof giữ dù tìm trước level; optional lore không tự mandatory |
| Mastery | Existing species mastery objectives | Specific approved evidence/alternatives, không spam counts mọi skills |
| Environmental interaction | W07 object/quest/completion proofs | Prior proof được công nhận; current physical condition phải revalidate |
| Story milestone | Canonical WorldEventCompletion | Không chapter UI label tự đủ; no optional species hidden gate |
| Special resource | Inventory entitlement/balance hoặc permanent acquisition proof theo requirement kind | Phân biệt possess / acquired-once / spend-at-commit; chưa mandatory resource gate mới |

Eligibility là derived read model V13, không second stage flag. Durable proofs không mất khi condition volatile/placement tạm thiếu; chỉ eligibility hiện hành/availability thay. `minimumStage` là condition cần của skill, không tự auto-unlock toàn S2/S3. Evolution cùng species/formId, không XP bar/new collection instance hoặc rewarded lại acquisition. Giữ unlocked skills/mastery/evidence; successor skill mapping cần approved migration, không reset CD/accepted statuses.

## EXP đến trong transition

Same writer/expected revision: XP grant independent source có thể durable nếu policy cho nhưng không mutate transition subject/config từ callback. Evolution intent giữ subjectFormId/fromStage/toStage/proof/curve refs, revalidate trên revision mới trước commit; conflict defer/retry, không discard XP hoặc grant lại. Level benefit apply policy ở [attributes](ATTRIBUTE_GROWTH.md), V13 stage mapping giữ own authority. Boss pending grants/eligibility không stage hot-swap, kể cả unequipped form.

Nếu dùng spend: reserve đúng resource balance/unreserved units lúc prepare, revalidate proof/placement/content/remaining balance, commit stage + spend + skill successor mapping + ledger/receipt cùng đơn vị. Cancel precommit nhả reservation chưa tiêu; postcommit reload đọc result, không refund rồi replay evolution. Vật đã tiêu việc khác chỉ satisfy acquired-once nếu requirement explicit, không thay possession bằng lịch sử sở hữu.

New stages thêm vào catalog không reset old EXP/owned stage; unsupported stage/skill refs preserved+backup/alias, activation defer chứ không auto downgrade/delete. EvolutionUnlockRecord vẫn existing ledger view. Không bắt mọi Sacred stageIII để kết cung, no new elements/rarity progression. Optional resource nếu chưa có deterministic source/repair/return route thì không làm main gate. P15 không chốt exact gates/levels/material amounts/HP/resource mapping hoặc downevolution; gates V13-U01–10 còn mở tương ứng.
