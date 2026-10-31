# Catch-up cho dạng mới và dạng ít dùng

**PROPOSED P15-P07**, dựa [R03 floor proposal](../gameplay/CREATURE_PROGRESSION_CONCEPT.md), [K11 collection](../gameplay/CREATURE_COLLECTION_VALUE.md). Không auto nâng mọi loài bằng strongest level, không free mastery/evolution/optional species grant.

| Model | Strengths | Weakness/exploit / restraint |
| --- | --- | --- |
| A reserve EXP share | Đỡ tụt trong loadout, dễ thử dạng | AFK carry/equip trước payout, lợi full-three; không chọn default |
| B global progress support | Durable milestones cho foundation và practice access | Dễ biến thành shared level; hỗ trợ không copy strongest stats/skills |
| C catch-up multiplier | Thưởng direct use dạng yếu | Farm nguồn trivial/stack bonuses/delay unlock; cần gap/source/cap rules, defer |
| D chapter/milestone minimum foundation | Dạng late có baseline viable, deterministic | Phải áp mọi unlocked forms để không thưởng unlock muộn; floor không vượt gates |
| E training resources | Chủ động đầu tư | Thêm currency/grind/inventory/duplication; defer, chưa economy training mới |

Khuyến nghị minimal **B biểu đạt bằng D**: một foundation policy theo **durable progression milestone**; không hai grants B+D. Cộng với EXP participation bình thường, không reserve share/multiplier/training resource cùng lúc. Milestone không auto = arrived chapter label; chosen main-path proof/coverage/competencies phải author và approve, chưa có floor số.

## Application contract

At validated rest/checkpoint/outside locked encounter, read existing XP và approved floor threshold theo milestone+curve version; set `max(existingXP, foundationThreshold)` như top-up một lần tới nền, **không cộng floor như package**. Same milestone/policy logical identity và expected revision; repeated rest/reload/alias không mint XP. Dạng đã mở ở mốc đó dù equipped hay unequipped được xét cùng policy; dạng mở sau cùng mốc cũng đạt cùng floor, không nhận advantage vì cố tình delay unlock. Không giảm XP cao hơn, không based-on-strongest rubber band.

Top-up là ExperienceGrantEvent category foundation với delta resolved/frozen, existing progression writer+receipt atomic. Entitlement của milestone thuộc global proof, applied delta/receipt theo species; không duplicate global mutable level. Trong boss hoặc evolution pending tx: ghi support eligibility/proof, defer application/benefits tới safe boundary, revalidate stage/HP/lock; không grant gói nữa lúc apply stats.

Không hồi HP/cooldown/resource qua foundation; inactive/HP0 vẫn HP0, không tự mở prerequisite skill trial/mastery/memory hoặc committed stage. Newly unlocked species cần basic viable kit do acquisition profile riêng được duyệt, không cho foundation cấp full skill tree. Level-derived eligibility khác form ready-to-use; thiếu asset/capability vẫn gap, không xóa owned record.

## Experimentation và scope

Practice/niche challenges có repeatability contract rõ, safe return và thưởng meaningful use; người dùng trực tiếp vẫn kiếm specialization/mastery/extra XP vượt nền. Floor chỉ giảm phần underleveled quá mức, không bù hết đầu tư. Main chapter không bắt optional species: nếu chưa thu thì không record/receipt XP giả; khi unlock hợp lệ mới xét entitlement đã có.

Nếu floor quá cao dễ làm species leveling vô nghĩa; quá thấp lại grind. Future playtest so viability, time to functional kit, retention utility và clarity, không chỉ level equality. Exact milestones/thresholds/readiness content/growth mapping P15-U05 cần approval. Không claim catch-up đã thử chạy hoặc balanced.
