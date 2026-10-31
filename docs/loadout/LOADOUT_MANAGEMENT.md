# Quản lý loadout và quyền chỉnh sửa

**PROPOSED L16-P02/P03**, [decisions](TASK16_DECISIONS.md). Canonical membership/active selection ở [overview](LOADOUT_SYSTEM_OVERVIEW.md); R03 owners giữ. Eligibility admission khác usability hiện tại, UI permission không là authority.

## Operations

| Command | Validation / effect | Fail/recovery |
| --- | --- | --- |
| ViewCollection | Read ResonanceRecord/progression/catalog, phân biệt discovered/unlocked/playable/available | Read-only khi hạn chế, không menu auto-heal/equip |
| EquipReserve(formId,position,expectedRevision) | Unlocked+designatedPlayable+content-supported+context policy, vị trí empty hoặc explicit replace, uniqueness proposal | Missing/locked/unavailable reject, no cost/HP reset; full loadout không tự replace |
| RemoveReserve | Target không active, edit permission và revision đúng | Xóa reference, giữ toàn XP/skills/stage/HP/CD/record; boss reject |
| SelectActive(formId) | Đã equipped và activation eligible, dùng same switch transaction dù gọi từ menu | Không collection bypass recovery/clearance/lock |
| Replace/RemoveActive | Ngoài lock/safe context, plan một replacement eligible trước; nếu từ collection thì compound equip+switch+remove atomically | Không remove active trước rồi để null. Chưa có replacement thì reject; last viable active không tháo trong normal play |
| ReorderMembers | Chỉ canonical positions/order, không đổi identities, validate context/revision | Không spawn/charge/reset progression. Boss proposal freeze canonical order; display active-first projection không là reorder command |
| ConfigureSkills | Skill unlock/stage/module/asset/cooldown obligations và context policy | Khác membership edit; đổi ID/variant không reset CD. Boss freeze config proposal, không tự thêm slots skill |

L16-P02 uniqueness: mỗi canonical species/form lineage tối đa một member, stages không extra species/slot. Đánh giá duplicate: cho nhiều slots cùng loài làm ba HP/CD copies, gây nhầm collection/cá thể và chiếm slot không có tactical diversity; một shared record lặp thì không thêm utility. Khuyến nghị reject duplicate, **vẫn PROPOSED** R03-P06/L16-U02, không gọi restriction đã approved. Form/source alias phải canonicalize trước duplicate check.

## Context permission matrix

`switch` ở bảng luôn qua action/health/placement gates, không nghĩa immediate mọi lúc.

| Context | Collection view | Membership add/remove/replace | Canonical reorder | Active switch | Skill/stage config |
| --- | --- | --- | --- | --- | --- |
| Safe exploration | Có; menu pause policy C14 pending | Cho nếu eligible, không cần special shrine mặc định | Cho | Cho, menu không shortcut tx | Skills ngoài threat; evolution safe explicit theo V13 |
| Ordinary hostile combat | Read-only nếu mở menu | Đề xuất tạm khóa để tránh cả collection thành infinite team | Tạm khóa để giữ request/fallback order | Cho trong equipped set theo cancel/debt | Pending gains được giữ, live config edit/evolve defer |
| Boss preparation | Inspect/prepare/exit rõ | Cho trước confirmation/entry barrier | Cho trước confirmation | Cho nếu environment/caps hợp lệ | Cho safe preparation, revalidate ngay trước entry |
| LOADOUT_CONFIRMED/ENTERING | Read-only | Proposal freeze sớm từ confirmation | Freeze | Chỉ stable safe entry action nếu không cross-body/placement tx; otherwise bounded defer | Freeze snapshot config; nếu muốn sửa quay preparation trước start |
| Boss active/resolving | Read-only, service reject mutation | CONFIRMED member lock; không add/remove/replace | Proposal freeze | Cho eligible frozen member, phase gates | Proposal stage/config freeze, evidence/EXP không mất |
| Story restricted | Read lý do nếu không spoil | Content-scoped rule, không mọi cutscene permanent lock | Theo declared scope | Theo sequence/capability; return/recovery path bắt buộc | Deferred apply, không xóa owned progression |
| Defeat/recovery | Read status nếu compatible | Không trước abort/reset/unlock boundary | Không | Manual disabled, coordinator recovery | Apply đúng safe boundary sau close attempt |

Ordinary combat edit limit là recommendation chờ L16-U03, không approved lock mọi exploration. Threat context cần explicit encounter/perception boundary/hysteresis policy để không flicker khi gần enemy; không kéo restrictions cả map. Permitted read-only collection không mặc định pause thế giới nếu policy chưa chốt.

## Invalid/temporarily unavailable

Một loài duy nhất: active viable + hai empty; select self no-op, empty reject rõ; minimum viable active policy proposed không áp cho bootstrap/recovery. Tạm unavailable/HP0 không xóa collection hoặc tự biến reference thành empty trong boss; giữ dormant member+reason, không selectable. Không newly equip disabled form; restore same ref khi usability trở lại, không regrant/regen.

Nếu active bị world/story/content invalidation: coordinator safe transfer sang eligible equipped member cùng transaction nếu policy cho, không heal; không có thì abort restricted attempt rồi validated checkpoint recovery, không tự equip collected form ngoài frozen set. Ngoài lock nếu invalid saved refs cần migration/repair preview/explicit safe policy, không auto unlock hoặc ném species mới vào occupied slot. Không valid form toàn collection thì giữ save+diagnostic recovery state, không vào gameplay với null active; không invent unlock/spirit noclip.

New unlock khi full: append collection proof/progression only; notification deferred an toàn, manual equip ngoài restrictions. Removing/reordering không XP transfer, no level/share changes. Revision checks chống collection menu request stale khi combat/boss đã bắt đầu.
