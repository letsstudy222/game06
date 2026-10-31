# Inventory, ownership và persistence

**PROPOSED P15-P12**, chưa inventory UI/code/schema storage. Nếu slice chỉ XP+proof thì không bắt inventory subsystem ngoài protected grant receipt; không coi localStorage settings là inventory.

## Ownership và invariants

InventoryRecord là một canonical player-owned domain cho **vật liệu nếu được duyệt**, linked Spirit/save identity; resources không chia ba form hoặc copy khi switch. Species EXP/skill/stage ở CreatureProgression, memory ở AncestralMemoryRecord, quest/world flags ở owners W07. UniqueRewardClaim là ledger view, không independently mutable boolean flags bag.

| Concern | Requirement / fail behavior |
| --- | --- |
| Stack limits | PolicyRef có units/type/nonnegative integer validation, limits chưa số. Unique/proof item không gộp thành fungible stack |
| Capacity | Chưa chọn slots/weight/hard cap; không bắt inventory management game. Candidate overflow giữ entitlement, không silently drop |
| Ownership | Inventory resource IDs resolve/versioned; one authoritative balance including pending delivery entitlements/reservations |
| Consumption | Check owner/revision/available unreserved units/purpose; reservation trước asynchronous action; commit spend cùng effect/ledger, cancel nhả đúng phần chưa spend |
| Quest protection | Protected facts/items không discard/sell/spend cho optional sink; nếu required tiêu thì consumer/source/repair defined |
| Unique claims | Same logical grant/source/recipient keys, once even item consumed; absence trong bag không nghĩa unclaimed |
| Save/load | Inventory/grant recipient/claims/outcome cùng writer/revision, no beforeunload-only flush; reload không reroll/regrant |
| Resource migration | Alias/provenance/backup; merge quantities once với canonical ID, no double balance old+new; unknown preserve/quarantine |

## Overflow không gây partial reward

Preferred Chapter I: tránh hard capacity gate cho required resources/proofs. Nếu sau chọn stack/capacity limits, reserve delivery capacity trước irreversible spend hoặc dùng **retained entitlement** trong cùng InventoryRecord/grant payload. Entitlement này là committed ownership chưa materialize vào visible stack, không item copy/store thứ hai; total owned = visible units + undelivered units, một unit chỉ có một location. Transfer tới visible stack là move, không grant/roll lại. Consumable available policy phải nói có dùng undelivered units không, không tự cho spend hai lần.

XP+item+claim/world completion vẫn một logical commit khi inventory full: candidate gồm XP và retained entitlement có stable payload. Không publish “đã nhận vào túi” nếu chưa materialize; feedback phân biệt ownership/await delivery, không tự thiết kế màn inbox. Nếu retention/capacity policy chưa approved thì required reward chưa runtime-ready, không commit mất item để “cho game tiếp tục”. Claim receipt không mark toàn item delivered khi chỉ XP ghi xong.

## Consumption và recovery

Two consumers same material: serial writer/reservation/expected revision; loser revalidate/fail rõ, không negative balance. Resource spend+receiver/evolution result same transaction hoặc approved journal equivalent, no consume-before-proof/save. Retry same operation returns committed outcome; precommit rollback chỉ unspent reservation; postcommit không refund rồi retry. Quest-item protection + deterministic reacquisition/alternative route giữ main progression; một resource chỉ dùng cho optional sink vẫn cần content author scope, không consume knowledge proof.

Unknown/removed unique resource giữ entitlement/provenance; approved replacement/quest proof mapping cần explicit migration, không tự compensate bằng coin/XP. Unsupported future save read-only/recovery path không downgrade overwrite. Namespaces/save adapter/quota/export/ack/error UX còn P15-U09/W07. Không chỉnh save thật trong Task15.
