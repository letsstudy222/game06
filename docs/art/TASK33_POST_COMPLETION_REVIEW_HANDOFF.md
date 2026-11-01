# Bàn giao review tổng thể Tasks01–33 — trước Task34

**CONFIRMED — yêu cầu người dùng:** sau khi Task33 xong, phải review Tasks01–33 trước Task34. **PROPOSED AB33-P14:** kế hoạch, phân công vai trò và mẫu bằng chứng bên dưới. **UNRESOLVED:** kết luận review và xử lý issue. **SUPERSEDED:** giữ lịch sử tại nguồn, không tự thay trạng thái trong review handoff.

Tài liệu này **chỉ chuẩn bị review**, không thực hiện hoặc đánh dấu review hoàn tất. Không thay numbering96-task; không tự bắt đầu Task34. Kế thừa [handoff Task32](../technical/TASK32_POST_TASK33_AUDIT_HANDOFF.md) thay vì tạo một audit source-of-truth cạnh tranh.

## Gói bằng chứng bàn giao

Baseline trước33: work tại1c8c1c36ce89220efc882db913cf5e062e2d7919, sạch và cùng actual origin/work. Commit33 được ghi trong Git history và báo cáo bàn giao, không nhúng SHA tự tham chiếu vào commit. Reviewer phải kiểm lại HEAD/status/actual remote tại thời điểm review, không giả các ref luôn giữ nguyên.

Bộ regression mới trước docs đạt12/12 bước, Node202/202, browser suites thực và38 ca IndexedDB; xem [biên bản33](TASK33_CONSISTENCY_AUDIT.md). Bundle `/tmp/game06-qa-oaSvcF` và renderer baseline `/tmp/task32-before-v12d5jen` là artifact phiên này, có thể không tồn tại ở phiên khác. Nếu thiếu, chạy lại aggregate thay vì bịa ảnh hoặc kết quả. Mã nguồn/test scripts và lệnh được giữ trong repository; screenshot lịch sử không được đổi nhãn thành screenshot mới.

## Phạm vi review01–33 và nguồn truy vết

| Tasks / chủ đề | Nguồn chính cần đối chiếu | Owner review đề xuất / câu hỏi |
| --- | --- | --- |
| 01–03: tầm nhìn, lore, resonance | [GDD](../GAME_DESIGN_DOCUMENT.md), [decisions](../PROJECT_DECISIONS.md), [open questions](../OPEN_QUESTIONS.md), [cosmology](../lore/ELEMENTAL_COSMOLOGY.md), [resonance](../lore/RESONANCE_RULES.md) | Canon/narrative reviewer: nguồn gốc nào còn mở, vật mang/hiện thân có bị khẳng định quá mức? |
| 04–06: Sacred, truyện, phe | [Creature Bible](../creatures/CREATURE_DESIGN_BIBLE.md), [Quy](../creatures/QUY_HAI_UYEN.md), [Phượng](../creatures/PHUONG_HOANG_NHAT_DIEM.md), [Long](../creatures/LONG_THIEN_PHONG.md), [Ly](../creatures/LY_VAN_SINH.md), [story handoff](../story/STORY_IMPLEMENTATION_HANDOFF.md), [factions](../factions/FACTION_OVERVIEW.md) | Narrative/creature reviewers: identity, motivation và thứ tự chapter có lệch nguồn? |
| 07–08: authority và chuẩn hóa | [world transitions](../world/WORLD_STATE_TRANSITIONS.md), [Phase I audit](../PHASE_I_COMPLETION_AUDIT.md) | Systems reviewer: định nghĩa trùng hay summary lấn nguồn? |
| 09–13: hệ, dual, roster, tiến hóa | [decisions09](../elements/TASK09_DECISIONS.md), [decisions10](../elements/TASK10_DECISIONS.md), [roster](../creatures/CREATURE_ROSTER_REGISTER.md), [evolution visual](../evolution/EVOLUTION_VISUAL_GUIDELINES.md) | Systems/creature reviewer: rarity/power/playability, ID/stage và reaction matrix có nhất quán? |
| 14–16: combat/progression/loadout | [combat decisions](../combat/TASK14_DECISIONS.md), [progression](../progression/PROGRESSION_SYSTEM_OVERVIEW.md), [boss lock](../loadout/BOSS_LOADOUT_LOCK.md) | Combat/reward architects: activeHP0/defeat, fewer-than3, claim/grant và pending policies |
| 17–18: opening/Quy | [nhịp mở đầu17](../chapter1/OPENING_BEAT_SHEET.md), [main overview](../chapter1/CHAPTER1_MAIN_QUEST_OVERVIEW.md), [dạng Quy](../chapter1/QUY_EVOLUTION_FORMS.md), [spec18](QUY_ART_PRODUCTION_SPEC.md) | Narrative/art reviewers: ký ức trước resonance, không gán phương án anatomy thành canon |
| 19–20: graph/ecology | [world graph](../chapter1/CHAPTER1_WORLD_GRAPH.md), [zones](../chapter1/CHAPTER1_ZONE_DESIGNS.md), [species](../chapter1/CHAPTER1_SPECIES_REGISTER.md), [habitats](../chapter1/CHAPTER1_HABITAT_MATRIX.md) | Level/ecology reviewer: reachability, nguồn status và loài ngoại vi chưa được xác minh |
| 21–22: main/side quest | [main](../chapter1/CHAPTER1_MAIN_QUEST_OVERVIEW.md), [side](../chapter1/CHAPTER1_SIDE_QUEST_OVERVIEW.md) và graph/data-spec liên kết tại nguồn | Quest architect: optional không khóa main, world event/reward không nhân authority |
| 23–24: boss/finale/return | [boss art](CHAPTER1_BOSS_ART_HANDOFF.md), [finale art](CHAPTER1_FINALE_ART_HANDOFF.md), nguồn design/spec tương ứng tại hai handoff | Encounter/narrative reviewer: guaranteedQuyI, E04/E05/E06, đường về và Phượng foreshadow không phê duyệt boss |
| 25–26: runtime/architecture | [runtime25](../technical/TASK25_RUNTIME_EXECUTION_FLOW.md), [architecture26](../architecture/GAME_RUNTIME_ARCHITECTURE.md), [ADRs](../architecture/TASK26_ARCHITECTURE_DECISIONS.md) | Principal engineer: adapter/scene còn proposal ở đâu; S0 khác S1/D40 |
| 27–28: asset/render | [manifest27](../technical/TASK27_MANIFEST_CONTRACT.md), [direction28](../technical/TASK28_DIRECTIONAL_ANIMATION.md), [scale28](../technical/TASK28_PIXEL_SCALING.md) và code links tại nguồn | Technical artist: metadata thực/đề xuất tương lai, clip counts, anchors, missing assets và pixel scaling |
| 29–30: map/input | [map29](../technical/TASK29_TILEMAP_DATA_CONTRACT.md), [fade29](../technical/TASK29_OCCLUSION_SYSTEM.md), [input30](../technical/TASK30_SEMANTIC_ACTION_CONTRACT.md) | Engine/input QA: AABB/pointcollision/fallback, touch, dodge intent khác mechanic |
| 31–32: storage/debug/tests | [receipt31](../technical/TASK31_REWARD_RECEIPT_BOUNDARIES.md), [HP31](../technical/TASK31_HP_AND_BOSS_RECOVERY_BOUNDARIES.md), [gate32](../technical/TASK32_FOUNDATION_GATE_REPORT.md), [tests32](../technical/TASK32_TEST_INFRASTRUCTURE.md) | Persistence/QA leads: LayerA/B khác LayerC, migration/receipt gates và tests fail/missing |
| 33: Art Bible | [master](ART_BIBLE_MASTER.md), tất cả chuyên đề liên kết trong master, [brief34](QUY_STAGE1_TASK34_HANDOFF.md), [QA](ART_QA_CHECKLIST.md) | Art director/technical artist/user: giá trị mới nào cần duyệt, production blockers nào còn? |

Đây là chỉ mục phạm vi, không tuyên bố đã kiểm toàn bộ từng tệp/task trong Task33. Reviewer dùng source index32 để bổ sung chính xác deliverables và mở code/tests; một link tổng quan không thay việc kiểm tra evidence.

## Cách ghi findings khi thực hiện review

Mỗi issue cần ID của review riêng, loại contradiction/duplicate authority/missing approval/code-doc gap/test gap/production dependency, trích dẫn exactpath:line, trạng thái decision tại hai phía, ảnh hưởng cụ thể, P0/P1/P2 và owner có thể xử lý. Phân biệt chặn art planning, chặn finalsprite và chặn gameplayimplementation. Không tự resolve P0/P1 bằng thay lore hoặc health policy; giữ bản được đề xuất/đã duyệt rõ nguồn.

**PROPOSED:** P0 cho nguy cơ phá dữ liệu/canon hoặc cổng bắt buộc không thể đi tiếp; P1 cho thiếu policy/contract quan trọng trước tích hợp; P2 cho sai diễn đạt/liên kết/thiếu minh bạch nhỏ. Đây là rubric đề xuất cho review, không kết quả phân mức toàn dự án.

## Các điểm cần xác minh, chưa phải kết luận audit tổng thể

| Điểm review ưu tiên | Bằng chứng hiện hữu | Owner / bước tiếp |
| --- | --- | --- |
| Bốn hướng lịch sử18 và mục tiêu8 hướng | Chú giải scope tại spec18 và chuẩn33 | Art/engine: kiểm toàn bộ tài liệu còn dẫn đề xuất cũ, không sửa gameplay |
| Manifest generic và direction fallback | Schema27 khác renderer contract28 | Technical art: xem field nào được tool kiểm, field nào cần adapter tương lai |
| Cảnh/actor/physics chưa có Quy | Gate32 và roadmap26, default source Dawn | Engineer: không dùng test harness làm bằng chứng gameplay S0 |
| Reward/save/gameplay policy | Writer31 đã test nhưng LayerC/HP còn mở | Persistence/design: kiểm ledger duy nhất, source-claim/recipient-grant, version không regrant |
| Art source/approval | Chỉ3 ảnh mở lại ở master; Quy/Long/Ly mới thiếu | Art/user: không coi ảnh cũ trong hội thoại là file có sẵn; duyệt brief sau review |
| Code/test/doc khác nhau | 12 suites mới PASS nhưng chưa physicalmobile/Quyart | QA: kiểm mọi failure/skipped và giới hạn chứng cứ, không extrapolate số đo32 |
| Ngữ nghĩa restoration/transition | E04 boss khác E05 môi trường khác E06 arrival | Narrative/quest: lần theo authority, reload/idempotency và đường về |

## Điều kiện kết thúc review và cổng Task34

Reviewer phải công bố coverage01–33, danh sách issue kèm owner/trạng thái, approvals còn thiếu, test thực/missing/fail, source-code vs design gaps và quyết định readiness có lý do. Sau đó người dùng duyệt silhouette/anatomy/palette/scale/coverage cần thiết trong brief34 và phạm vi sản xuất. Không cần giả vờ HP/combat đã được duyệt để vẽ concept, nhưng không được sản xuất hoặc tích hợp animation phụ thuộc chính sách chưa khóa như thể nó đã tồn tại.

Task33 chỉ sẵn sàng **bàn giao cuộc review này**. Không có kết luận PASS cho toàn Tasks01–33, không production art đã nghiệm thu, không Task34 tự khởi động.
