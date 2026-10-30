# Task07 — consistency audit và delivery index

Baseline `4dd2e59`, Task07/96, documentation-only. **CONFIRMED** chỉ ràng buộc người dùng và facts checkout; **PROPOSED** toàn bộ W07 mechanics/data/IDs/presentation chi tiết; **UNRESOLVED** là thiếu quyết định/production input. Không mặc định Task01–06 đã được duyệt toàn bộ, không chuyển R03/S05/F06 proposals thành canon.

## Tài liệu thực có đã đối chiếu

- [GAME_VISION](../GAME_VISION.md), [PROJECT_DECISIONS](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md), [asset register](../ASSET_REFERENCE_REGISTER.md): vision/authority, vấn đề chưa chốt, asset gaps.
- Task02 [WORLD_HISTORY](../lore/WORLD_HISTORY.md), [ANCIENT_CATASTROPHE](../lore/ANCIENT_CATASTROPHE.md): bảo tồn/adaptation/cổng, không khôi phục nguyên trạng tuyệt đối.
- Task03 [TRANSFORMATION_DESIGN](../gameplay/TRANSFORMATION_DESIGN.md), [RESONANCE_DATA_MODEL](../technical/RESONANCE_DATA_MODEL.md): loadout, lock, abort/reset, per-form records, atomic grant.
- Task04 [Sacred overview](../creatures/SACRED_CREATURE_OVERVIEW.md), [art requirements](../creatures/SACRED_ART_REQUIREMENTS.md): ability/geometry direction và gaps; không yêu cầu tất cả stage III.
- Task05 [story overview](../story/FOUR_CHAPTER_STORY_OVERVIEW.md), [story handoff](../story/STORY_IMPLEMENTATION_HANDOFF.md), [timeline](../story/STORY_TIMELINE.md), [quest outline](../story/QUEST_DESIGN_OUTLINE.md), [world consequences](../story/WORLD_STATE_CONSEQUENCES.md), [chapter transitions](../story/CHAPTER_TRANSITIONS.md): nguồn chính cho event, geography và consequences.
- Task06 [REGIONAL_CONFLICTS](../ecology/REGIONAL_CONFLICTS.md), [ELEMENTAL_ASSIMILATION](../ecology/ELEMENTAL_ASSIMILATION.md), [FACTION_ENEMY_DATA_MODEL](../technical/FACTION_ENEMY_DATA_MODEL.md), [edge cases](../technical/FACTION_ENEMY_EDGE_CASES.md), [audit](../factions/TASK06_CONSISTENCY_AUDIT.md): population, local faction facts và projection.

`docs/story/FACTION_AND_WORLD_CONSEQUENCES.md` không tồn tại; đầu ra tương đương đã ánh xạ ở Task06 sang WORLD_STATE_CONSEQUENCES. Không nhận đã đọc file đó. Không có docs/world trước Task07. Không có save/world implementation tương ứng để test runtime: UI settings hiện tại không là world save. Không kiểm lại ảnh/animation mới trong Task07; register là nguồn kiểm kê, không chứng nhận đã xem mọi asset.

## Mapping 14 deliverables → nguồn thực

| Requested | Actual authoritative file / hành động |
| --- | --- |
| docs/world/WORLD_STATE_ARCHITECTURE.md | [Hierarchy/authority](WORLD_STATE_ARCHITECTURE.md) — mới |
| docs/world/WORLD_STATE_TRANSITIONS.md | [Lifecycle/atomicity](WORLD_STATE_TRANSITIONS.md) — mới |
| docs/world/CHAPTER_01_WORLD_STATES.md | [Hải Uyên](CHAPTER_01_WORLD_STATES.md) — mới |
| docs/world/CHAPTER_02_WORLD_STATES.md | [Nhật Diệm](CHAPTER_02_WORLD_STATES.md) — mới |
| docs/world/CHAPTER_03_WORLD_STATES.md | [Phong Vân](CHAPTER_03_WORLD_STATES.md) — mới |
| docs/world/CHAPTER_04_WORLD_STATES.md | [Vạn Sinh](CHAPTER_04_WORLD_STATES.md) — mới |
| docs/world/ECOLOGY_AND_SPAWN_STATES.md | [Population/coverage](ECOLOGY_AND_SPAWN_STATES.md) — mới |
| docs/world/QUEST_WORLD_STATE_RULES.md | [Quest/faction integration](QUEST_WORLD_STATE_RULES.md) — mới |
| docs/world/WORLD_EVENT_DEPENDENCIES.md | [24 event DAG](WORLD_EVENT_DEPENDENCIES.md) — mới |
| docs/world/ENVIRONMENT_STATE_PRESENTATION.md | [Presentation/map handoff](ENVIRONMENT_STATE_PRESENTATION.md) — mới |
| docs/world/REGION_REVISIT_DESIGN.md | [CHAPTER_TRANSITIONS](../story/CHAPTER_TRANSITIONS.md) — mở rộng nguồn topology hiện hữu, không tạo bản trùng |
| docs/technical/PERSISTENT_WORLD_DATA_SPEC.md | [Data/save contract](../technical/PERSISTENT_WORLD_DATA_SPEC.md) — mới |
| docs/technical/WORLD_STATE_TEST_CASES.md | [20 acceptance scenarios](../technical/WORLD_STATE_TEST_CASES.md) — mới |
| docs/world/TASK07_CONSISTENCY_AUDIT.md | Tài liệu này — mới |

13 tệp mới + một deliverable tái dùng. Các nguồn/index được cập nhật liên kết: README, GAME_VISION, PROJECT_DECISIONS, OPEN_QUESTIONS, ASSET_REFERENCE_REGISTER, story handoff/world consequences, technical resonance/faction models. Không tạo nguồn event IDs hoặc encounter rewards mới cạnh tranh.

## Contradictions / missing prerequisites nhận diện trước thiết kế

| ID | Vấn đề | Đề xuất xử lý / trạng thái |
| --- | --- | --- |
| WC01 | Task05 mô tả lưu flags; nếu thêm phase/count/ecology enum sẽ có nhiều nguồn sự thật | W07-P01: completion/sub-completion authoritative, State changes là aliases; phase/count/cache derived |
| WC02 | Task06 RegionEcologyState có stableMainFlags/variant/pendingChanges dễ bị hiểu là store riêng | W07-P02: projection, mutable variant chỉ RegionState; pending intent không là đã commit |
| WC03 | route_*_open được ghi khi arrival nhưng cần đường để tới arrival | W07-P03: available từ restoration trước, arrived/traversed từ transition; không vòng |
| WC04 | Full-three R03-P06 khác empty-slot S05-P02 | UNRESOLVED; chưa tự chọn, main không ngầm bắt optional species/faction; cần duyệt trước boss code |
| WC05 | Awakening cần ability của form chưa có / thức Long/Ly như trứng | Giữ source→form_committed→practice, bootstrap/dạng cũ trước; không retcon D29/D35 |
| WC06 | Boss win bị gộp với restored network | E04/E10/E15/E20 outcomes riêng, stable E05/E11/E16/E22 mới đạt sau xác minh |
| WC07 | Reload replay grants hoặc patch cũ phá variant mới | Logical commit + ledger/recipient + reconstruct, không replay effects; W07-P04 |
| WC08 | World change xóa loài chưa gặp / actor đang đánh | Coverage toàn catalog + boundary relocation/unique identity; roster còn thiếu nên chưa thể chứng minh coverage runtime |
| WC09 | Restore volcano/forest xóa adapted ecosystem hoặc Life hồi sinh mọi thứ | Selective vents/refuges/mosaic; chỉ vật mang còn sống, không unrestricted resurrection |
| WC10 | Weather/faction opinion ghi đè physical stable facts | Owner tách; bounded weather/relationship overlays; factions còn PROPOSED |
| WC11 | Save/browser tab closure được coi luôn an toàn | Durable acknowledgement, versioned recovery, quota/integrity/error contract; library/UI/export chưa chốt |
| WC12 | Bigger form/disabled traversal/boss lock gây trap | Preflight envelope/capabilities/return, defer hoặc abort-reset tới anchor; không đổi membership giữa boss |
| WC13 | ID rename/version bump tạo reward hoặc reset vùng | Alias logical identity + migration provenance/backup; defaults region mới không reset cũ |
| WC14 | Phase story/art mô tả như có maps/animations production | Presentation contract/gap register; Dawn không bằng bốn vùng; chưa runtime test các scenarios |

## Decision register — chưa tự phê duyệt

| ID | Status | Nội dung cần review trước implementation |
| --- | --- | --- |
| W07-P01 | PROPOSED | Completion authority, aliases/phase/count derived, one-property owner |
| W07-P02 | PROPOSED | Region mutable vs ecology projection, catalog/unique actor records |
| W07-P03 | PROPOSED | Available/arrived split và 24-event dependency projection |
| W07-P04 | PROPOSED | Atomic bundle, writer/revision, idempotency keys và durable recovery |
| W07-P05 | PROPOSED | Phase predicates và selective ecological changes bốn vùng |
| W07-P06 | PROPOSED | Population coverage/fallback và prior-proof quest rules |
| W07-P07 | PROPOSED | Revisit/safe anchors/defer traversal-affecting patches |
| W07-P08 | PROPOSED | Presentation layers/cues/navigation boundary contract |
| W07-P09 | PROPOSED | Data/save envelope, version/migration/defaults/unknown refs |
| W07-P10 | PROPOSED | 20 acceptance scenarios/PWV01–10, release validation |
| W07-U01 | UNRESOLVED | Boss early entry policy R03/S05, checkpoint/anchor geography và form-cap physics |
| W07-U02 | UNRESOLVED | Storage adapter, namespace/size, backup/export/error UX, ordinary progress loss budget |
| W07-U03 | UNRESOLVED | Species roster/habitat tolerances/unique actor placement và production assets |
| W07-U04 | UNRESOLVED | Weather bounds, map topology/clearance/performance budgets và faction approvals |

Không hỏi lại quyền làm tài liệu/push đã được cấp; bảng là các quyết định sản phẩm cần duyệt trước code, không là chốt chặn hoàn tất Task07.

## Quality gates và giới hạn bằng chứng

| Gate | Kết quả review thiết kế / nơi kiểm |
| --- | --- |
| 1–2 distinct progression/consequences | Bốn bảng phase có trigger/visual/nav/enemy/creature/quest/interaction; không đồng nhất restore=safe |
| 3–5 authority/persistence/unique grants | Architecture + transaction + data contract; scenarios WST01–04/17 |
| 6–8 revisit/collection/loadout | Reused transitions + habitat coverage + WST05–07/10–11 |
| 9–10 prerequisites/no cycles | 24-event projection, bốn extra stable checks E23, bootstrap/new-form cycles bị chặn |
| 11–13 temporary/faction/canon | Five categories; F06 proposals giữ; D37 chỉ ghi ràng buộc yêu cầu |
| 14–15 expandable/web-first | Registry IDs/owners/catalog và migration/adapter contract; không khóa framework/library |
| 16 documentation-only | Đối chiếu git diff phải chỉ README/docs Markdown; không code/UI/maps/art/test/lockfile |

Đây là review/validation tài liệu, không tuyên bố implementation save/load hoặc ecology đã chạy. Bộ WST01–20 là acceptance criteria cho task code tương lai. Chưa có dữ liệu production để kiểm pathfinding/clearance/spawn coverage từng species.

## Prerequisites cho Task08

Chờ yêu cầu Task08 cụ thể, không tự bắt đầu. Trước implementation cần duyệt W07 authority/transaction model và boss entry policy; chốt main-route capability/rank và map safe anchors; hoàn thiện species/habitat coverage + production assets; chọn storage adapter/namespace/migration/error UX và biến scenarios thành tests trong task code được giao. Nguồn gốc Tinh Linh, faction/cosmic mystery vẫn mở; không cần tự giải để làm hệ state.

## Kết quả kiểm chứng tài liệu Task07

Đã kiểm 85 tệp Markdown và 350 liên kết nội bộ hợp lệ; bảng/fences của các đầu ra mới hợp lệ. 24 world event IDs/prerequisites đối chiếu story handoff: cùng thứ tự, predecessor có trước, E23 đủ bốn stable sources, không optional prerequisite ẩn hoặc cycle. Đủ 4×4 phase rows, 10 conceptual entity contracts và 20 scenarios × 6 fields. `git diff --check` không lỗi; thay đổi gồm 13 tệp mới và 10 tệp sửa, tất cả README/docs Markdown. Đây không là bằng chứng runtime của hệ save/world chưa triển khai; CI hiện hữu kiểm baseline application riêng.
