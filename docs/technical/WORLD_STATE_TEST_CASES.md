# Kịch bản kiểm thử trạng thái thế giới

**PROPOSED — W07:** đặc tả tương lai, chưa triển khai hoặc tự phê duyệt các đề xuất Task 02–06. Ràng buộc CONFIRMED xem [PROJECT_DECISIONS](../PROJECT_DECISIONS.md).

Đây là **acceptance scenarios tương lai**, chưa phải test runtime đã chạy. Mỗi trường hợp cần kiểm cả candidate trước và sau durable boundary, theo [save contract](PERSISTENT_WORLD_DATA_SPEC.md). Không viết test/gameplay code trong Task07.

## WST01 — Phục hồi vùng rồi reload

| Field | Expected contract |
| --- | --- |
| Preconditions | E05 đủ evidence, chưa commit |
| Action | Hoàn tất E05, reload |
| Expected result | water_stable suy đúng; surface entry available, không auto arrived |
| Persistence behavior | Completion/patch/refuge/ledger cùng revision |
| Failure prevention | Không lưu phase boolean riêng |
| Recovery behavior | Dựng lại từ snapshot tốt, không reward replay |

## WST02 — Gửi world event hai lần

| Field | Expected contract |
| --- | --- |
| Preconditions | E05 đã commit |
| Action | Gửi lại cùng operation/event key |
| Expected result | Trả committed result, không XP/patch cộng dồn |
| Persistence behavior | Giữ một completion/grant |
| Failure prevention | Dedupe trước side effects |
| Recovery behavior | Notification lặp chỉ rebuild projection |

## WST03 — Reload giữa transition

| Field | Expected contract |
| --- | --- |
| Preconditions | E12 intent đang ở source, chưa arrival commit |
| Action | Đóng tab/load; chạy lại sau |
| Expected result | Trước commit source an toàn; sau commit destination + đường xuống |
| Persistence behavior | Intent và arrival/checkpoint theo atomic boundary |
| Failure prevention | Không lưu arrived và return edge tách |
| Recovery behavior | Resume từ boundary, không teleport vào giữa void |

## WST04 — Boss thắng nhưng save ngắt

| Field | Expected contract |
| --- | --- |
| Preconditions | E04 thắng trong preview, candidate đang lưu |
| Action | Ngắt write trước/sau durable marker |
| Expected result | Trước marker last good attempt reset; sau marker outcome thắng giữ |
| Persistence behavior | Outcome/proof/grant đồng commit |
| Failure prevention | Không giữ reward ở snapshot cũ hoặc boss damage với loadout mới |
| Recovery behavior | Retry candidate cùng payload trong session; crash load generation hợp lệ |

## WST05 — Quay lại vùng hoàn tất

| Field | Expected contract |
| --- | --- |
| Preconditions | E16 đã xong, về hai_uyen |
| Action | Load region cũ |
| Expected result | Mạng nước vẫn hồi; optional/habitat hiện tại, ký ức có dấu đã thu |
| Persistence behavior | Giữ variant/local outcomes đã lưu |
| Failure prevention | Không khởi tạo region về dormant khi enter |
| Recovery behavior | Rebuild revision mới nhất, repair placement tới anchor hợp lệ |

## WST06 — Loài cần đổi habitat

| Field | Expected contract |
| --- | --- |
| Preconditions | Species có primary bị patch, secondary viable |
| Action | Commit restoration |
| Expected result | Chuyển source encounter/cue tới secondary; resonance requirements còn đạt |
| Persistence behavior | Relocation choice nếu quan trọng, journal/progression giữ |
| Failure prevention | Coverage preflight route và tolerance |
| Recovery behavior | Không coverage thì refuse/defer patch, không giả collected |

## WST07 — Loài optional chưa discovered

| Field | Expected contract |
| --- | --- |
| Preconditions | Journal chưa có species trong habitat sắp đổi |
| Action | E11 thay ecology |
| Expected result | Refuge/alternative trial còn tìm được; không tự discover |
| Persistence behavior | Discovery vẫn false, habitat rule cho source sau hồi |
| Failure prevention | Audit cả roster chưa gặp, không chỉ collection hiện có |
| Recovery behavior | Bổ sung viable refuge trước release hoặc hoãn patch |

## WST08 — Nhận quest sau event

| Field | Expected contract |
| --- | --- |
| Preconditions | E05 đã hoàn tất, quest cơ cấu chưa accept |
| Action | Accept quest liên quan |
| Expected result | Nhận prior proof + kiểm hiện trạng hoặc objective tương đương |
| Persistence behavior | Quest acceptance/outcome riêng, event không reset |
| Failure prevention | Không yêu cầu bật-tắt irreversible network |
| Recovery behavior | Re-evaluate state ngay, unique event loot không grant lại |

## WST09 — Hai events sửa cùng vùng

| Field | Expected contract |
| --- | --- |
| Preconditions | A/B cùng expected region revision và cùng property |
| Action | Gửi gần đồng thời |
| Expected result | Commit một; cái sau conflict/revalidate, không tùy callback order |
| Persistence behavior | Một writer/revision cho mỗi accepted change |
| Failure prevention | Write-set ownership, không last-writer-wins âm thầm |
| Recovery behavior | Retry request còn hợp lệ bằng op mới hoặc trả kết quả op cũ |

## WST10 — Form bị tạm vô hiệu trong khu

| Field | Expected contract |
| --- | --- |
| Preconditions | Người chơi ở deep water, Quy là cách về |
| Action | Narrative muốn disable Quy |
| Expected result | Defer disable tới safe boundary; không mất progression |
| Persistence behavior | Disable outcome chỉ commit khi placement/return hợp lệ |
| Failure prevention | Không tạo spirit noclip hoặc đổi membership trong boss |
| Recovery behavior | Abort attempt rồi validated anchor/form; nếu không có thì chặn event |

## WST11 — Đường bị chặn sau state change

| Field | Expected contract |
| --- | --- |
| Preconditions | Player ở nhánh bên và patch muốn đóng cầu |
| Action | Preflight candidate |
| Expected result | Chừa return edge/anchor hoặc defer, không trap |
| Persistence behavior | Nav/hazard/route cùng revision |
| Failure prevention | Envelope và capabilities frozen boss loadout được xét |
| Recovery behavior | Giữ snapshot trước hoặc chuyển anchor đã validate ở boundary |

## WST12 — Version mới thêm biến

| Field | Expected contract |
| --- | --- |
| Preconditions | Save schema cũ thiếu property mới |
| Action | Migrate/load |
| Expected result | Default versioned hợp lệ, không reset milestone/variant cũ |
| Persistence behavior | Output mới + migration provenance, giữ backup |
| Failure prevention | Không default mọi flag thành false |
| Recovery behavior | Migration fail giữ save cũ và báo incompatible, không ghi đè |

## WST13 — Save cũ thiếu region mới

| Field | Expected contract |
| --- | --- |
| Preconditions | Bốn vùng cũ có progression |
| Action | Thêm region catalog mới/load |
| Expected result | Region mới chưa tới theo prereq explicit, bốn vùng giữ nguyên |
| Persistence behavior | New default record khi cần, không rewrite toàn thế giới |
| Failure prevention | ID registry/foreign refs, không coi missing là complete |
| Recovery behavior | Hoãn region mới nếu thiếu catalog/asset, giữ checkpoint cũ |

## WST14 — Boss retry và revisit

| Field | Expected contract |
| --- | --- |
| Preconditions | Boss chưa thắng hoặc outcome đã durable |
| Action | Retry/reload/revisit arena |
| Expected result | Chưa thắng reset attempt trước loadout edit; đã thắng aftermath không loot kép |
| Persistence behavior | Outcome/ledger một lần, attempt ephemeral theo policy |
| Failure prevention | Không giữ boss HP với bộ mới; boss không tự respawn story |
| Recovery behavior | Optional simulation replay nếu duyệt dùng occurrence và reward riêng |

## WST15 — Persistent và temporary cùng nơi

| Field | Expected contract |
| --- | --- |
| Preconditions | water_stable true, combat steam còn |
| Action | Rời/load vùng khi steam chưa hết |
| Expected result | Kênh hồi còn, steam combat reset; ambient tái dựng |
| Persistence behavior | Lưu completion, không particle/effect lifetime |
| Failure prevention | Effect không overwrite stable predicate |
| Recovery behavior | Dựng safe checkpoint; cosmetic decay không đổi quest |

## WST16 — Đổi form giữa interaction

| Field | Expected contract |
| --- | --- |
| Preconditions | Receiver yêu cầu Quy, interaction chưa commit |
| Action | Switch form khi channel |
| Expected result | Revalidate cap tại completion; mất cap thì cancel/pause theo receiver policy, không nửa patch |
| Persistence behavior | Chỉ lưu substep được định nghĩa là durable |
| Failure prevention | Không commit bằng cap đã mất; giữ spirit instance identity |
| Recovery behavior | Trở lại receiver với form phù hợp; boss vẫn membership lock |

## WST17 — Unique reward spam

| Field | Expected contract |
| --- | --- |
| Preconditions | grant_evt_05_restore_water đã có |
| Action | Lặp cue/replay/accept quest/migration |
| Expected result | Không cộng thêm payload hoặc cấp manifest version mới |
| Persistence behavior | Ledger+recipient nhất quán cùng stable grantId |
| Failure prevention | Version/revision không là key mới |
| Recovery behavior | Repair từ committed payload/integrity policy, không đoán thưởng lại |

## WST18 — Bốn chương và Tinh Môn

| Field | Expected contract |
| --- | --- |
| Preconditions | E22 + E05/E11/E16 completed, chỉ ba slots |
| Action | E23 rồi E24 |
| Expected result | Gate active, epilogue tại Vạn Sinh, origin chưa lộ, revisit còn |
| Persistence behavior | E23/E24 completion + once-only grant + safe checkpoint |
| Failure prevention | Không đòi bốn equipped/III/optional memories |
| Recovery behavior | Reload sau commit dựng ending result; replay scene không grant |

## WST19 — Thêm chương tương lai

| Field | Expected contract |
| --- | --- |
| Preconditions | arc_complete đã lưu |
| Action | Cập nhật catalog thêm chapter_05 |
| Expected result | Giữ kết cung cũ, region mới theo unlock explicit, không tự bắt đầu planet |
| Persistence behavior | Giữ old facts/grants và namespace save |
| Failure prevention | Không reset thế giới vì contentVersion đổi |
| Recovery behavior | Unknown refs giữ an toàn, migration có backup |

## WST20 — Đổi identifier giữa version

| Field | Expected contract |
| --- | --- |
| Preconditions | Save chứa event/object ID cũ |
| Action | Load qua alias migration |
| Expected result | Map một nghĩa sang logical identity cũ; quest/habitat refs đúng |
| Persistence behavior | Grant logical key giữ, lưu migration provenance |
| Failure prevention | Alias collision/split không được đoán hoặc thưởng lần hai |
| Recovery behavior | Mapping mơ hồ thì từ chối promote, giữ backup cho migration sửa |

## Ma trận kiểm tra bổ sung trước triển khai

Chạy mỗi scenario với normal/failed write, duplicated notification, cache revision cũ và migrated save nơi liên quan. Kiểm stale active actor, habitat coverage undiscovered, four network closure, grants/recipient totals, phase projection, available-versus-arrived và safe placement. Cần thêm browser quota/eviction, asset missing, future-version downgrade và integrity-corrupt generation khi adapter được chọn. Không thể gọi scenarios PASS runtime trước khi có implementation/fixtures thực.
