# Tứ Linh Khởi Nguyên — Master Game Design Document

**English working title:** Origins of the Four Sacred Spirits. Task08/96, baseline `7125160`, 30/10/2026 UTC. Đây là chỉ mục tổng hợp có kiểm chứng, không thay chi tiết ở nguồn. **Phase I: PARTIAL; audit Task08 hoàn tất, chưa có full production design freeze.** Chỉ baseline CONFIRMED được giữ ổn định; các đề xuất không tự được duyệt. [Completion audit](PHASE_I_COMPLETION_AUDIT.md), [readiness](IMPLEMENTATION_READINESS.md), [handoff](PHASE_I_HANDOFF.md).

## Quyền hạn và cách đọc

[PROJECT_DECISIONS](PROJECT_DECISIONS.md) là nguồn status và approval. Thứ tự: explicit user-approved → later approved supersession → canon repo nhất quán → yêu cầu các task đã hoàn tất → recommendations mới. CONFIRMED có evidence, PROPOSED chưa duyệt, UNRESOLVED thiếu quyết định, SUPERSEDED chỉ quyết định đã được thay bằng later approval. Không lấy số lần lặp làm approval. Mỗi đoạn/bảng dưới có nhãn; ID ứng viên không là ID runtime đã tồn tại. GDD tóm tắt; source chi tiết và decision register thắng nếu bản tóm tắt lệch. Xung đột confirmed phải vào [contradiction log](DESIGN_CONSISTENCY_REPORT.md) và chờ quyết định, không chọn âm thầm.

## 3.1 Project Overview

**CONFIRMED D01–D13/D40:** action RPG 2D pixel art thời gian thực; web trước, hướng mobile browser/Windows sau kiểm chứng. Người chơi trực tiếp trải nghiệm nhiều cơ thể qua cộng hưởng, khám phá sinh thái và ký ức, không huấn luyện viên cố định. Cảm xúc gồm tò mò, đẹp/yên, nguy hiểm đọc được và trách nhiệm phục hồi.

Core loop: khám phá → quan sát điều kiện sống → chọn/đổi dạng và hành động/combat → resonance/ký ức/tiến trình → phục hồi có hậu quả → quay lại với khả năng/hiểu biết mới. **First playable bắt buộc:** Quy stage I, movement dưới nước, basic combat, underwater sample, initial resonance demonstration và progress persistent. Mốc này nhỏ hơn Chương I, không bốn chương đồng loạt, không hứa thời lượng/boss/species quota. [Scope](PROJECT_SCOPE.md) phân biệt first playable, complete Chapter I, later chapters, optional.

**FACT đã kiểm:** runtime hiện tại là Dawn/Phoenix, chưa là first playable Quy. Không gán Dawn = Nhật Diệm hoặc gọi các story events là phần mềm đã chạy.

## 3.2 Core Design Pillars

**CONFIRMED:** exploration đọc dòng/nhiệt/áp/mạng sống; creature forms có anatomy và utility riêng; resonance/collection qua gặp gỡ có ý nghĩa; realtime combat có telegraph/counterplay; environmental transformation có thể bền vững; ancient cosmic mystery hé dần. Dạng cũ không bị thay thế vĩnh viễn, collection không bắt diệt peaceful wildlife. [CORE_DESIGN_PILLARS](CORE_DESIGN_PILLARS.md) giữ thứ tự ưu tiên và ví dụ chống lệch; sáu mục ở đây là nhóm tóm tắt, không đổi ranking nguồn.

## 3.3 World and Cosmology

**CONFIRMED D04/D09/D10/D18/D25/D26/D38:** Thủy–Hỏa–Phong–Mộc là bốn hệ nguyên sơ. Sinh Mệnh là authority riêng của Ly, không nguyên tố combat thứ hai. Task08 xác nhận Lôi/Kim là ảnh hưởng nguyên tố ngoại lai qua biến cố; roster đầy đủ và tương tác vẫn UNRESOLVED. Ngoại lai không ác mặc định; bản địa không thiện mặc định.

Biến cố cổ hàng chục nghìn năm, Tứ Linh vắng mặt theo cách khác nhau, cổng từng đưa năng lượng/sinh vật vào. **PROPOSED L02-P01–P10:** địa lý nhiều tầng; H1–H7 cân bằng → tiếp xúc → tăng tải/cưỡng ép → phản hồi → can thiệp → vắng mặt → cô lập. Đây là mô hình tác giả, không lịch sử approved đầy đủ. Nguồn: [WORLD_HISTORY](lore/WORLD_HISTORY.md), [COSMOLOGY](lore/ELEMENTAL_COSMOLOGY.md), [CATASTROPHE](lore/ANCIENT_CATASTROPHE.md), [LORE_TIMELINE](lore/LORE_TIMELINE.md).

Tinh Môn là tên tạm; cuối IV tái kích hoạt sau phục hồi bốn hệ. **UNRESOLVED:** nguồn gốc cổng/Tinh Linh, tác nhân sâu, tự nguyện của can thiệp. Không planet chơi được trong cung đầu; không cần giải toàn origin để thiết kế đoạn mở đầu.

## 3.4 Player Identity

**CONFIRMED D02/D27–D29:** Tinh Linh cổ, ban đầu vô thể/nhận thức hạn chế; Quy non trẻ là thân đầu qua mười nhịp bootstrap. Life Core/Linh Hạch, Resonance Imprint/Linh Ấn và Ancestral Memory là thuật ngữ chuẩn. Nguồn gốc thật chưa tiết lộ.

**PROPOSED R03-P01–P05:** Linh Hạch giữ tổ chức sống đặc biệt; Linh Ấn là mẫu khác cá thể gốc; B+C hiện thân vật lý duy nhất, không bắt/xóa sinh vật hay sản xuất body/tài nguyên độc lập. Discovery, observation, resonance, memory, mastery độc lập; nonplayable vẫn được quan sát/sưu tầm. Quỹ ổn định hữu hạn/cost/cooldown và consent chi tiết chưa duyệt. Ký ức có source/viewpoint/era/integrity, không camera toàn tri hoặc hồi sinh cá thể chết hoàn toàn.

Nguồn [SPIRIT_IDENTITY](lore/SPIRIT_IDENTITY.md), [LIFE_CORE_AND_IMPRINT](lore/LIFE_CORE_AND_IMPRINT.md), [RESONANCE_RULES](lore/RESONANCE_RULES.md), [ANCESTRAL_MEMORY](lore/ANCESTRAL_MEMORY.md), [decision record](lore/RESONANCE_DECISION_RECORD.md). Bootstrap không cần dạng có trước, không là spirit noclip dùng lại sau defeat.

## 3.5 The Four Sacred Creatures

Identity/element/role/direction dưới **CONFIRMED D30–D35**; tên stage chi tiết, skills/gates/anatomy ứng viên **PROPOSED C04**. Mỗi loài đúng ba major stages: I Thức Tỉnh → II Trưởng Thành → III Thức Tỉnh Nguyên Sơ, không chỉ resize/recolor. Không chốt cùng level thresholds, Sacred invincibility hoặc Legend=III.

| Loài / nguồn | Identity, combat, exploration | Awakening và visual |
| --- | --- | --- |
| [Quy Hải Uyên](creatures/QUY_HAI_UYEN.md), Thủy | Bảo tồn/ký ức/bền; bruiser phòng ngự/control, bơi/lặn/current/áp | Bootstrap trước hồi toàn mạng; trứng hay lõi còn mở. Rùa nước cổ/mai rõ, không mặc định rắn quấn |
| [Phượng Hoàng Nhật Diệm](creatures/PHUONG_HOANG_NHAT_DIEM.md), Hỏa | Đổi mới/tái sinh biểu tượng; mobile AoE, thermal/glide/heat receivers | Nước–nhiệt–đường xả cho cấu trúc bảo tồn là proposal; giữ ngà/kem–vàng/cam–crimson của ảnh approved |
| [Long Thiên Phong](creatures/LONG_THIEN_PHONG.md), Phong | Tự do có trách nhiệm; ranged controller, wind lane/áp/storm | Dấu phân tán qua mạng khí, không trứng khác; đồng bộ chi tiết proposed. Rồng dài S, đầu/sừng/móng/bờm/đuôi rõ qua mây |
| [Ly Vạn Sinh](creatures/LY_VAN_SINH.md), Mộc / Life authority | Liên đới; support/heal/control, growth và biological relationships | Từ mạng sinh học, không một hạch/trứng đủ; relations cụ thể proposed. Guardian gạc cành khác hươu thường; không resurrection tùy ý |

[12-form matrix](creatures/SACRED_EVOLUTION_MATRIX.md), [24 abilities + 8 environmental contracts](gameplay/SACRED_CREATURE_ABILITIES.md), [6 synergy pairs](gameplay/SACRED_SYNERGIES.md) là nguồn chi tiết chưa balance/approve. Mỗi stage cần anatomy/movement/animation mới phù hợp và envelope/clearance; production assets chưa đủ.

## 3.6 Four-Chapter Narrative

Thứ tự/vùng/kết cung **CONFIRMED**. 24 events, cast/bosses, acts và CL01–CL05 placement **PROPOSED S05**; [overview](story/FOUR_CHAPTER_STORY_OVERVIEW.md), [event authority](story/STORY_IMPLEMENTATION_HANDOFF.md).

| Chương | Conflict / emotional arc ứng viên | Resolution và transition ứng viên |
| --- | --- | --- |
| I Vực Hải Uyên | Có thân → hiểu giữ một sanctuary không đủ; guardian giữ khóa vì sợ mất refuge | Quy thức E01, conflict E04 riêng restoration E05; hồi lưu lộ tuyến nông E06 tới đảo |
| II Đảo Nhật Diệm | Đổi mới có giá, custodian giữ habitat basalt; midpoint E09 nhiều năng lượng không luôn cứu | Phượng E08; outlet conflict E10 rồi controlled heat E11; thermal E12 có landing lên trời, đảo không thành lava |
| III Thiên Đảo Phong Vân | Freedom/control; regulator muốn độc quyền mạng | Long reconstruction E14, conflict E15, wind E16; corridor E17 tới vùng sống, không cần Long trước khi tiếp cận chính imprint |
| IV Tiên Cảnh Vạn Sinh | Phục hồi quan hệ thay xóa hệ mới; advocate phản đối reset nguyên trạng | Partners E19 bằng dạng cũ, confrontation E20 không chỉ HP0, Ly E21, life E22, gate E23 và local epilogue E24 |

[Narrative matrix](story/NARRATIVE_REVELATION_MATRIX.md) trả payoff bốn nhánh, dòng hồi, cộng cư ngoại lai, rễ mới và nhịp phối hợp trước/cuối IV; vẫn chưa lộ origin/cosmic culprit. [Transitions/revisit](story/CHAPTER_TRANSITIONS.md) có cause, geography, safe anchors/return edges. Kết dựa bốn restored world systems nối tiếp, không bốn forms equipped/III; epilogue trả quyền khám phá tại thế giới cũ.

## 3.7 Creature Ecosystem

**CONFIRMED D08/D36:** rarity, behavior, element, morality, intelligence tách. Native wildlife/neutral/territorial/predatory/intelligent có động cơ; dual-element không tự corrupted, forced assimilation không mặc định irreversible/mindless. Không universally cleanse hoặc kill để đủ collection. Species present ≠ discovered ≠ playable.

**PROPOSED F06:** [8 behavior views](ecology/CREATURE_BEHAVIOR_CLASSIFICATION.md), [process/affinity/stability/consent](ecology/ELEMENTAL_ASSIMILATION.md), [regional conflicts](ecology/REGIONAL_CONFLICTS.md), [9 enemy templates](gameplay/ENEMY_ARCHETYPES.md). Natural adaptation qua thế hệ, dual-element là outcome có tổ chức, forced assimilation là origin có hại; nhận biết qua hành vi/habitat/evidence, không màu. Roster species và tolerance chưa duyệt, templates không là chín asset đã có.

## 3.8 Factions and Antagonists

**PROPOSED toàn bộ existence/names F06:** Hồi Nguyên bảo tồn nhưng có nguy cơ nguyên trạng; Tân Sinh bảo vệ adaptation nhưng rủi ro khai thác/thí nghiệm; Trông Giữ giữ tri thức/an toàn nhưng nguy cơ độc quyền. Không ai tự toàn đúng, không modern organization bất biến hàng vạn năm. [Profiles/history](factions/FACTION_OVERVIEW.md) dẫn chi tiết. Năm vai story độc lập, chưa gán membership hay tên leaders.

[Bốn boss narrative roles](story/MAJOR_CONFLICTS_AND_BOSSES.md) theo guardian sanctuary, custodian outlet, regulator khí, advocate sinh thái; chưa có tên/species/art/pattern/stats approved. Outcome hội tụ về restoration, chỉ selected local choices; không global morality/route permanently exclusive. Faction claims không thay lịch sử objective hoặc physical ecology.

## 3.9 Gameplay Foundations

**CONFIRMED D05–D07/D31:** realtime action; ba slots một active/hai reserve; boss locks membership, vẫn switch trong set. Mỗi playable species có XP/level/skills/evolution riêng, không thay loài cũ vĩnh viễn. Resonance có ý nghĩa, không universal living capture. Movement/combat/env roles distinct như §3.5.

**PROPOSED R03/C04:** switch prepare→atomic commit→recovery; HP/cooldowns riêng, cost chung; no free heal/i-frame bởi switch; HP0 emergency transfer hoặc checkpoint, boss reload abort/reset; level/skill/evolution benefits pending ngoài frozen combat config. [TRANSFORMATION_DESIGN](gameplay/TRANSFORMATION_DESIGN.md), [PROGRESSION](gameplay/CREATURE_PROGRESSION_CONCEPT.md) giữ luật. Catch-up floor, numbers/XP curve/cap/evolution gates chưa duyệt.

**Cập nhật Task09/D41:** không mandatory three-member/three-element gate; boss đầu không bị chặn chỉ vì còn một/hai forms phù hợp. Proposal full-three R03-P06 không còn alternative current cho early content; đây là source explicit mới xử lý phần member-count của C08-01. Không tự cấp thêm loài hoặc đổi membership giữa boss. Entry trigger, snapshot empty/stage/config, B+C/resource/HP/recovery và boss identities/outcomes khác vẫn cần approval riêng.

## 3.10 Persistent World Systems

**CONFIRMED D12/D37:** meaningful changes persistent, revisit và collection được bảo vệ, không save mọi particle. **PROPOSED W07:** [authority](world/WORLD_STATE_ARCHITECTURE.md) bốn cấp global/chapter/region/local; năm loại permanent narrative, persistent mutable environment, temporary, repeatable, cosmetic. Completion/sub-completion là facts; phase/count/stable aliases/ecology projection derived; mutable property đúng một owner.

Bốn vùng: nước dormant→disturbed→restoring→stable; nhiệt dormant→disturbed→controlled→stable; khí unstable/fragmented→partial→stable; mạng sống fragmented→local recovery→synchronizing→stable. Stable không mọi hazard an toàn hoặc erase adapted species.

[Transactions](world/WORLD_STATE_TRANSITIONS.md) commit completion/patch/quest proof/reward recipient+ledger/placement cùng logical unit; retry idempotent; load reconstruct chứ không regrant. [Save contract](technical/PERSISTENT_WORLD_DATA_SPEC.md) có version/backup/migration/unknown refs, không storage library đã chọn. [Population coverage](world/ECOLOGY_AND_SPAWN_STATES.md) kiểm cả undiscovered; [quest rules](world/QUEST_WORLD_STATE_RULES.md) công nhận prior proof. Safe return/defer patch giữ boss lock; [20 scenarios](technical/WORLD_STATE_TEST_CASES.md) chưa là runtime tests.

## 3.11 Art Direction

**CONFIRMED D01/D15/D32/D33:** pixel art sắc, silhouette đọc rõ, palette/hướng sáng có kiểm soát; reference approved không thay âm thầm. Runtime tile 32px là fact hiện tại, không bắt mọi form 96px. Hướng Long thân dài đã duyệt theo D32 được giữ nguyên.

**PROPOSED C04-P07:** tách visual envelope, core footprint, hurtbox và attack hitbox; giải pháp clearance/rendering cho Long thân dài và các stage lớn cần prototype theo [evolution matrix — collision và rendering](creatures/SACRED_EVOLUTION_MATRIX.md). Đây là đề xuất kỹ thuật chưa được phê duyệt, không phải phần mở rộng của baseline CONFIRMED ở trên.

[Asset readiness tại register hiện hữu](ASSET_REFERENCE_REGISTER.md) phân biệt approved reference, unreviewed concept, production sprite/atlas có phạm vi validation, environment tile, missing/unverified. Task08 trực tiếp xem Phoenix reference, runtime atlas, Dawn terrain/objects, kiểm PNG/manifest/source và tests hiện hữu. Hai pose × ba hướng, right mirror; sáu controller states không sáu full hand-authored action clips. Quy/Long/Ly và underwater stage-I kit chưa có nhận diện được; chưa fresh playback/physical-device QA. Không gán Legend=stage III hoặc concept-sheet rows=animation đã validate.

## 3.12 Technical Direction

**FACT D14/D15:** HTML/CSS, JS ES modules, Canvas2D, Node≥24, Playwright1.62.1, static build/Pages; không backend/engine app ngoài được thấy. Dawn40×28 và sample26×22, tile32. Đây là stack đang chạy, không quyết định engine dài hạn hay resolution/FPS budget release. Không đổi stack trong Task08; Windows packaging/mobile hardware/performance targets UNRESOLVED.

**CONFIRMED D39:** future species thêm qua definitions, elemental refs, progression, skills/effects, movement, resonance, animation manifests và habitat/spawn rules; không core branch theo tên từng loài. Cơ chế mới thật sự có thể cần module tái dùng + capability/validation mới; data-driven không nghĩa mọi mechanic chỉ JSON. [Creature data](technical/CREATURE_DATA_SPEC.md), [faction/enemy model](technical/FACTION_ENEMY_DATA_MODEL.md), [world data](technical/PERSISTENT_WORLD_DATA_SPEC.md) mới conceptual. Runtime PlayerPhoenix/renderer vẫn hardcoded; chưa có generic loader/executor/migration.

## 3.13 Production Roadmap

Hiện có Dawn/Phoenix prototype và 30 baseline logic/asset/settings tests đã pass lại Task08. Chưa có Quy/underwater/resonance/loadout/XP/quest/world save. Audit tài liệu không đổi điều này. [Readiness gate](IMPLEMENTATION_READINESS.md) và [dependency map](DESIGN_DEPENDENCY_MAP.md) quy định trình tự đề xuất:

1. Task09 khi được giao: elemental vocabulary, native/foreign/authority, interaction boundaries; chưa tự đặt matrix damage/balance.
2. Repository audit kỹ thuật có phạm vi riêng: reusable movement/render seams, schema, storage/error/migration, device budgets; read-only audit có thể bắt đầu khi được giao mà không cần biết cosmic origin.
3. Chốt subset Quy I + opening + save + movement/combat acceptance; duyệt reference/clip/environment sample, anchor/physics, không làm bốn chương cùng lúc.
4. Small web implementation tasks: validated content adapter → movement/combat/resonance sample → atomic progress/reload proof → playable sample polish; dữ liệu concept chưa được tự coi executable.
5. Complete Chapter I sau first playable QA: content/quests/population/progression/boss entry+identity, restoration/return/save. Later Phượng/Long/Ly triển khai sau nền đã kiểm, tùy dependencies.

QA mốc: schema/ID/link validation → logic tests → browser keyboard/touch/collision/telegraph → reload/interruption/reward/migration → collection coverage/return → device/performance/accessibility → release review. Không hứa FPS/resolution/duration chưa đo, không gọi emulation là real-device support.

## 3.14 Open Decisions và freeze boundaries

[OPEN_QUESTIONS](OPEN_QUESTIONS.md) và [A08 decision metadata](PROJECT_DECISIONS.md) là queue có gate rõ: physical B+C; defeat/recovery; energy; thresholds/catch-up; early boss; factions/names/boss outcomes; localized choice bounds; world owners/reversibility/storage; engine future direction/device targets; Quy core appearance/art và playable scope budget.

Origin/ultimate culprit/voluntary intervention là author mysteries chưa chốt, không tự lấp khi viết mechanics. Phase I **PARTIAL** vì chưa có một approved contract đủ cho opening transformation/boss/save và art/physics implementation handoff; không thiếu file bị che. Baseline confirmed được bảo tồn, proposal set được đóng mốc để review chứ chưa production freeze. Không tự bắt đầu Task09 hoặc code/asset production.


## Task09 — elemental foundation handoff

[Elemental overview](elements/ELEMENTAL_SYSTEM_OVERVIEW.md) và [Task09 audit](elements/TASK09_CONSISTENCY_AUDIT.md) dẫn six identities, recommended ModelC,36directed interaction contracts,9status/8reaction candidates và data/environment/balance scenarios. E09-P01–P12 đều PROPOSED, không final affinity table/numbers/dual mechanics. D41 no-mandatory-three là requirement explicit của Task09; chronology Q02/A08-15 và các quyết định PhaseI khác giữ mở. Chỉ tài liệu, không current runtime rebalance hoặc Task10 tự bắt đầu.
