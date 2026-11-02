# Reward transaction và chống trùng

**PROPOSED P15-P13**. [W07 transitions](../world/WORLD_STATE_TRANSITIONS.md), [persistent data](../technical/PERSISTENT_WORLD_DATA_SPEC.md), [R03 ledger](../technical/RESONANCE_DATA_MODEL.md) giữ single writer/revision/RewardGrantLedger authority. Đây là conceptual lifecycle, không implementation hoặc chọn database.

## Safe lifecycle

1. Source event/outcome xảy ra, lưu evidence refs/occurrence từ source owner; animation hit/kill/loot chỉ presentation, không reward authority.
2. Validate eligibility/approved definition/capability/world/quest/participation/prior proof; pin source revision. Không nên chấp nhận source unsupported hoặc payload thiếu rule.
3. Establish canonical source/grant identity và recipients; finalization cutoff đóng attribution, selection không đổi theo active form/reload.
4. Resolve amounts/category, normalized EXP allocation, random result nếu có và inventory capacity/entitlement; freeze payload/version và operationId. Candidate chưa là earned durable outcome.
5. Build candidate authoritative recipient updates: species cumulative XP/mastery/unlocks pending benefits; inventory owned entitlement/balance; world/quest proofs/outcomes nếu cùng event.
6. Build ledger receipt/unique-claim projection reference và resource reservations/spend/route/checkpoint/habitat checks cần thiết **trong same candidate**, không mark claimed trước payload.
7. Revalidate expected revisions/source permissions; one durable commit hoặc journal tương đương của cả write-set. Chỉ acknowledge complete khi generation/integrity/pointer đã promote thành công. Serialize conflicts, không last-write-wins.
8. Publish committed revision/results cho feedback; notification có thể lặp nhưng consumer chỉ read, không cấp XP/item lần nữa.

Bước 5–6 là xây candidate, không independent writes. Boss EXP+unique item+completion+claim một unit: không “EXP đã nhận, item mất vì quota”. Inventory full dùng canonical retained entitlement hoặc fail trước irreversible commit theo policy được duyệt. Ordinary grants batching chỉ khi loss budget approved, vẫn không tách payload/ledger. Không rely unload/tab close flush.

## Identity và repeatability

| Source kind | Logical identity / rule |
| --- | --- |
| Unique story/first-clear | save identity + canonical event/encounter + scoped target + reward component; recipient fixed trong payload, không dùng đổi recipient để claim unique source lần hai |
| Repeatable clear | Source owner-issued occurrenceId + reward component; reset/requalification explicit, không every respawn/input tick/time label |
| Observation/mastery | Canonical objective/source/context occurrence; aliases giữ same identity, no cast spam/unchanged object loops |
| Catch-up | Canonical milestone+species+policy entitlement identity; resolved top-up delta dựa current revision, retries không cộng floor package |
| Consumption/evolution | Stable operationId + effect proof + resource reservation, ledger cùng outcome; spend không claim lại reward nguồn |

Source-level unique claim và recipient-level grant là hai cấp trong **cùng RewardGrantLedger**, như [W07 keys/replay](../world/WORLD_STATE_TRANSITIONS.md): `canonicalGrantKey`/`canonicalSourceRewardKey` định danh nguồn thưởng; stable `grantId` tham chiếu cùng source identity. Recipient allocation có key `grantId + recipientId`, chỉ định danh phần payload của recipient, không mở quyền claim lại source. Source-level lookup diễn ra trước recipient-level dedupe: source đã committed thì trả lại frozen payload/recipients, không thêm recipient mới vì switch hoặc đổi lựa chọn khi retry. Một source có thể phân bổ cho nhiều recipients theo policy đã chọn; source receipt, mọi recipient grants/updates và outcome liên quan vẫn cùng logical commit. Đây là clarification của contract hiện có, không chọn mới allocation/share policy.

UniqueRewardClaim/RewardGrantRecord/ExperienceGrantEvent đều views/receipt components của existing ledger, không ba independent duplicate-prevention flags. Version pin payload nhưng **contentVersion không làm logical unique key mới**. Recipient split sorted/stable + normalized rounding không tạo EXP, same ID/different payload là conflict phải diagnose, không “last payload wins”.

## Failure matrix

| Boundary | Expected recovery |
| --- | --- |
| Trước durable commit | Last-good snapshot nguyên, retry same candidate/source identity hoặc abort theo source policy; không feedback đã lưu/grant một nửa |
| Commit ack mất sau successful write | Load/lookup operation receipt: nếu committed dùng result, không apply delta lần hai |
| Sau commit trước feedback | Restore payload/ownership/claim/world outcome, feedback reconstruct được; không roll lại table |
| Quota/denied/corruption | Không overwrite last-good, giữ candidate/backup và báo chưa lưu; retry/export/error UX cần approved adapter |
| Two events same owner | Single writer sequence + expected revision; event sau revalidate/calc delta lại trước commit, giữ identity; không lost update |
| Table/content changed | Accepted payload giữ version/payload hoặc explicit migration; committed facts unchanged, no retroactive reroll |
| Migration crash | Immutable input backup, versioned output validate/promote, provenance idempotent; no regrant từ renamed key |

Boss ACTIVE/RESOLVING lock theo C14/R03 proposals; reward resolution không unlock membership trước outcome+reset/completion boundary. Aborted attempt không boss first-clear payout; completion durable thắng reload reconstruction, chưa durable thì approved abort/reset/loss policy, không giữ boss damage cũ cùng loadout mới. Không hứa anti-cheat/manual rollback/multiplayer exactly-once; contract là legitimate replay/reload và acknowledged local durable writer.

## Transparent safeguards

Một unchanged observation/objective chỉ reward once và cho biết đã ghi nhận; practice lặp vẫn được chơi nhưng reward category/repeat contract rõ. No hidden broad penalties thay anti-exploit predicates. Source-made self damage/heal, re-infect/cleanse, toggle-state loops, multi-hit/segments hoặc damage cap vượt HP không tăng eligible contribution vô hạn. Level-up/mastery/evolution UI events không source reward mới. Reserves không tự mint XP, migration không mint grants, floor không strongest copy. [Future tests](../technical/PROGRESSION_TEST_CASES.md) sẽ kiểm interruption/replay/conflict, chưa chạy.
