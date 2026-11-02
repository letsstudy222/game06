# Membership lock, HP0 và retry Hải Uyên

**CONFIRMED D06/D41:** khóa selected membership trong encounter, switch trong eligible equipped set vẫn allowed, không mandatory3members/3healthyforms/3elements. **PROPOSED B23-P11**, kế thừa [L16 lock](../loadout/BOSS_LOADOUT_LOCK.md), [entry/retry](../loadout/BOSS_ENTRY_AND_RETRY.md), [C14 recovery](../combat/INCAPACITATION_AND_RECOVERY.md), [Q21 handoff](CHAPTER1_QUEST_BOSS_HANDOFF.md). Không phê duyệt HP/resource/emergency transfer bằng boss specification.

| Occupied slots | Encounter handling đề xuất | Guard |
| --- | --- | --- |
| Một Quy phù hợp | Intended default route, empty slots giữ trong selected snapshot proposal; không reject count | Entry active capability/placement/usable validation còn policy gate, not silently approve toàn minimum-one package |
| Hai forms | Same pattern/arena baseline, được switch eligible frozen set theo action gates | Không tăng mandatory damage/phase requirements hoặc force lấp slot ba |
| Ba forms | Same source/objective/first-clear, tactical alternatives nếu có approved capability | Không cần cả ba khỏe, không universal automatic reserve XP/heal/aggro reset |

## State ownership và boundaries

| Boundary / lifecycle L16 | Quyền, source và failure handling |
| --- | --- |
| OUTSIDE/PREPARATION | H prep ngoài threat, checkpoint/source route/content/caps/envelope validate. Equip/config theo safe context, rút về G tự do. No boss damage trước accepted entry |
| LOADOUT_CONFIRMED/ENTERING | Proposed confirmation/snapshot selected members+empty positions/config refs theo approved subset, expected revisions. Attempt+lock/placement durable trước threat activation; source/content/save failure giữ prep/last-good, no half-lock |
| BOSS_ACTIVE | Membership edits/add/remove/fill/equip ngoài-set rejected mọi API/menu/scene/save paths. Manual switch trong frozen eligible set theo C14 gates, không disable toàn transform. Target/hit ledger stable combatant, cost/CD/status/source snapshots không reset khi switch |
| PLAYER_DEFEATED / failure | Chỉ khi coordinator xác định không còn continuation hợp lệ theo **selected policy**, không HP0 active body alone. Stop future emissions/reset intent đúng outcome cutoff, không tự checkpoint heal while old attempt active |
| BOSS_DEFEATED / RESOLVING | Accepted qualifying E04 outcome candidate, retire new hostility/attempt effects theo rules; atomic source+quest+reward+required world proof trước publish. Joint final-blow/incapacity arbitration còn unresolved |
| EXITING | Victory/failed/abandoned disposition close/reset/placement/recovery/lock release sequencing theo L16; no equip/switch lách atomic relocation hoặc claim trước durable ack |
| RETRY_PENDING | Old attempt **đã close/reset/placement/recovery/unlock durable**. Same-team quick retry khuyến nghị hoặc về prep để edit; revalidate fresh attemptId, no boss damage cũ cùng team/HP mới |
| COMPLETED/outside projection | E04 đã durable thì dựng outcome/actor/permission, không abort để farm/re-fight unique grant. Revisit không new source first-clear |

Phase transition không release membership lock, đổi biological stage hoặc reset accepted HP/CD/status/hit ledgers. Evolution eligibility/progression/new unlock có thể ghi nếu existing rules cho, applied body/config benefits hoãn theo V13/L16 freeze proposal; no hot-swap stage/reset HP hoặc auto replace slot giữa boss. Released source_world effect giữ owner/source config/finite lifetime qua switch; source_active guard/passive kết thúc theo definition, no reserve shield stack.

## HP0 guard — giữ đúng correction PhaseII

C14 model A individual HP và L16 model B individual là cùng recommendation, **PROPOSED**; shared player HP và shared vitality+form integrity vẫn alternatives. Boss health target ở C14 actor owner riêng, không giải metaphysics/player health pool. Một form prototype không tự approve full model.

Active form HP0 committed→incapacitation một lần, close unreleased action/input buffer/manual switch chưa commit. Coordinator xét mọi continuation hợp lệ theo selected health/recovery policy: viable frozen member, usable health/context, placement/capability/route valid **nếu policy cho phép chuyển/tiếp tục**. Nếu còn phương án hợp lệ thì resolve incapacity/continuation đó, không PLAYER_DEFEATED. Chỉ không có continuation hợp lệ mới encounter defeat; checkpoint hồi sau attempt loss là luồng riêng, không làm old attempt sống lại.

Emergency transfer R03/L16 vẫn **PROPOSED**, không automatic approval/free iframe/heal/cost bypass ở Task23. Có reserve HP>0 chưa đủ để tự chuyển nếu policy chưa duyệt; pending policy phải chặn production, không bí mật default defeat hoặc transfer. No ngoài-set rescue/auto species grant, no ordinary permadeath/progression deletion. Đồng thời boss HP0/player HP0 hoặc transition/control/status ticks cần approved ordering/outcome policy B23-U04, không callback thắng trước.

## Checkpoint / reset write-set / browser

Checkpoint H prep hoặc G source đã validate không trong threat/current trap, đủ envelope/current form/đường về. Đây là placement anchor, **không** unconditional full heal/resource/CD refill. Sau failed/abandoned attempt close, recovery transaction theo approved policy duy nhất, exact quantities/penalty/eligibility unresolved. Rời menu/reload/equip/evolution không hồi hoặc cleanse miễn phí.

Boss reset: attempt health state ban đầu theo approved definition, phase/scheduling/cast/hit ordinals/projectiles/current bands/test receiver attempt overlay reset cho fresh attempt; giữ world E03 baseline/unique actor identity/main progress/earned durable grants và E04 nếu đã commit. No per-particle/half-hit restore, no reset optional memories/sources. Failed trial không phá refuge vĩnh viễn.

Reload/refresh/close active attempt chưa E04 durable: **recommended abort-and-reset**, không exact midfight resume hoặc persist boss HP một mình. Last-good lock/snapshot được reconcile/close/reset/valid placement/recovery before unlock/retry; old snapshot không hợp lệ thì preserve backup, diagnostic/pending recovery thay substitute members in-lock. Nếu future approved resume khác, phải full atomic health/status/casts/phase/lock/seed/order snapshot compatibility, chưa được chọn ở đây.

Blur/visibility pause transient clocks và clear held input, không offline attacks/phase/heal; pending writes lookup receipts khi focus lại. Source E04 result đã durable thắng load reconstruction, không abort outcome để nhận lần hai. Storage/quota/denied/corrupt/generation error không giả close/award/saved; same operation/source retry và giữ last-good. Early-entry/snapshot/config/abort/recovery/storage UX vẫn B23-U04/U06, not gameplay implemented.
