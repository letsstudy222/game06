# Boss membership lock và lifecycle

CONFIRMED D06/Task16§2: khóa membership, vẫn switch eligible equipped members; không thay bằng “disable transform”. **PROPOSED L16-P08**: lifecycle/freeze/snapshot/recovery chi tiết, chưa code. [R03](../gameplay/TRANSFORMATION_DESIGN.md), [C14 boss](../combat/BOSS_COMBAT_FRAMEWORK.md), [W07](../world/WORLD_STATE_TRANSITIONS.md) giữ owners; [state machine](../technical/LOADOUT_STATE_MACHINE.md) là cùng graph, không implementation thứ hai.

## Lifecycle permissions

`Lock` ở bảng là existing EncounterLockState phase/receipt; không second UI flag. Save actions qua writer, không giả in-memory snapshot durable.

| State | Allowed / loadout edit | Switch | Save behavior | Failure recovery / valid next |
| --- | --- | --- | --- | --- |
| OUTSIDE_ENCOUNTER | Explore, collection/equip/config theo safe context | Normal gates | Loadout/progression safe boundary | Invalid context→safe recovery; →PREPARATION |
| PREPARATION | Inspect/warn/equip/reorder/config hoặc rút | Normal safe gates | Checkpoint/prepared membership refs nếu accepted | Entry fail giữ preparation; →LOADOUT_CONFIRMED hoặc OUTSIDE |
| LOADOUT_CONFIRMED | Proposed reservation/freeze selected membership+empty positions/order/config; muốn edit quay preparation trước start | Không cross-body tx chồng entry; stable selection trước entering nếu revalidate snapshot | Intent/confirmation revision, chưa báo boss active | Cancel nhả pre-entry reservation, →PREPARATION; accepted→ENTERING |
| ENTERING | Validate source proof/arena placement/frozen refs/checkpoint; no edits | Temporarily defer khi relocation/entry atomic section | Durable attempt+lock+entry snapshot **trước** activate threat | Write/content failure giữ safe source, không boss spawn; →BOSS_ACTIVE hoặc pre-start cancel→PREPARATION |
| BOSS_ACTIVE | Combat/read-only collection, gains/evidence không membership edit | Allowed eligible frozen members theo action gates | Save lock+receipts/ack boundaries; no half-hit resume assumption | Active-form HP0→resolve incapacitation trước; chỉ →PLAYER_DEFEATED khi coordinator xác định không có phương án hợp lệ để tiếp tục attempt theo policy; outcome proof→BOSS_DEFEATED; explicit abort→EXITING |
| PLAYER_DEFEATED | No combat input/equip; coordinator resolve defeat | Manual reject, no outside-set rescue | Mark failure/reset intent idempotent, lock giữ tới close | →EXITING theo failed disposition, không retry trước reset |
| RETRY_PENDING | **Old attempt đã close/reset/placement/recovery/unlock durable**, retry cùng team hoặc về preparation | Normal preparation-safe gates, no old lock | Retry option/last outcome refs, not live old boss snapshot | Validate same team; →LOADOUT_CONFIRMED(new attempt), PREPARATION hoặc OUTSIDE; invalid→PREPARATION |
| BOSS_DEFEATED | Resolving, stop threat emissions/retire active combat effects; không edit membership | Temporarily disable trong outcome atomic section, cosmetic-only sau policy | Commit completion/outcome+reward ledger/recipients/world/route cùng unit | Ack fail giữ resolving/retry candidate; →EXITING only khi committed |
| EXITING | Close victory/failed/abandoned attempt, safe placement/recovery as appropriate, no edits until close ack | Không switch lách relocation/lock | Close/reset/completion receipt + placement/unlock boundary; world proof không replay | Before close fail lock retained/reconcile; success→OUTSIDE hoặc RETRY_PENDING(failure). No defeated→retry shortcut |

Boss phase transition bên trong BOSS_ACTIVE không release lock hoặc tạo attempt mới. Combat phase khác biological evolution/story milestone; R03 ACTIVE_LOCKED tương ứng BOSS_ACTIVE, RESOLVING tương ứng BOSS_DEFEATED/EXITING outcome resolution. Detailed LOADOUT_CONFIRMED/ENTERING freezes là proposed extension, không kéo D06 confirmed start boundary sớm mà không approval.

Active-form incapacitation không tự đồng nghĩa player/encounter defeat. Coordinator đánh giá health model và recovery policy trước khi chọn nhánh: nếu có phương án tiếp tục attempt hợp lệ theo policy, xử lý incapacitation/recovery đó; chỉ khi không có bất kỳ phương án tiếp tục attempt hợp lệ nào theo policy (kể cả chuyển sang viable equipped form nếu policy cho phép) thì mới vào PLAYER_DEFEATED. Viable form phải thuộc frozen membership, còn usable và có placement/capability hợp lệ; checkpoint recovery sau khi attempt đã thua là luồng riêng, không làm attempt cũ tiếp tục. Emergency transfer của R03-P07/L16-P07 vẫn **PROPOSED**, cần L16-U05; đoạn guard này không phê duyệt auto-transfer, HP model hoặc điều kiện/cost/timing của recovery. Xem [ownership/recovery](FORM_STATE_OWNERSHIP.md).

## Snapshot/authority enforcement

Freeze member identities+empty positions và canonical order/revision, entry checkpoint/arena scope, stage/config versions nếu được duyệt; mutable HP/CD/XP/status ở owners cũ, snapshot không authoritative duplicate pool. Active selection được change qua same loadout owner, không so entire state equality rồi vô tình cấm switch. Canonical membership equality so snapshot, including empty, chặn add/remove/replace/lấp trống qua menu/API/scene/save-load/alias. Config/stage edit restriction separate proposal, không suy D06 đã freeze mọi progression event.

Server không được giả định tồn tại: đây là single-player encounter service/writer validation, UI chỉ projection. Mọi mutation check lock+expected membership revision ngay trước commit, stale collection request reject. New unlock/XP/mastery/proof vẫn theo R03/P15 writer, không auto equip hoặc hot-swap locked config. Cosmetic slot order không authority; proposed canonical-order freeze tránh đổi forced-transfer priority giữa attempt.

## Outcome, interrupt và rewards

Accepted due events trước outcome cutoff có stable ordering C14; after resolving không emit new hostile hits/rewards. Victory reward key giữ canonical source, attempt effects retire, no kill from linger sau unlock; simultaneous final blow/defeat priority còn C14/L16-U07. W07/P15 outcome+grant+inventory/progression+claim+world consequences atomic; no claim set trước item/XP. Completion already durable thắng reload reconstruction, no abort/regrant.

Reload/refresh/close thấy lock chưa committed victory: recommended abort/reset resolve trước equip/placement/recovery/unlock; load không cho boss damage cũ + team mới. Lock early/close ordering, storage ack/error UX và retry còn L16-U06/U07/U09, không được coi đã implemented hoặc approved. Không cấp reward bằng EXITING animation.
