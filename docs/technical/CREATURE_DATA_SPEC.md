# Đặc tả dữ liệu sinh vật — trung lập triển khai

**PROPOSED C04-P12:** cấu trúc khái niệm và validation, không tạo JSON loader/class/schema executable. Mở rộng `CreatureSpecies` và catalog trong [RESONANCE_DATA_MODEL](RESONANCE_DATA_MODEL.md), không tạo progression system thứ hai. Nền hiện tại Canvas/ES modules không bị đổi. Nội dung chưa có art/balance phải báo incomplete, không giả đã production-ready.

## Quan hệ định danh

`creatureId` là cùng định danh canonical với `speciesId` ở Task 03, không hai trường được sửa độc lập. Tên hiển thị đổi không đổi ID. `formId` là dòng playable qua nhiều stage; `stageId` không là một loài hoặc một slot. Mapping ứng viên:

| creatureId = speciesId | formId | StageIds | elementTypes / authority | chapter |
| --- | --- | --- | --- | --- |
| `quy_hai_uyen` | `form_quy_hai_uyen` | `quy_s1`, `quy_s2`, `quy_s3` | `water` / chưa xác nhận authority riêng | I |
| `phuong_hoang_nhat_diem` | `form_phuong_hoang_nhat_diem` | `phuong_s1`, `phuong_s2`, `phuong_s3` | `fire` / chưa xác nhận authority riêng | II |
| `long_thien_phong` | `form_long_thien_phong` | `long_s1`, `long_s2`, `long_s3` | `wind` / chưa xác nhận authority riêng | III |
| `ly_van_sinh` | `form_ly_van_sinh` | `ly_s1`, `ly_s2`, `ly_s3` | `wood` / `life` là authority, không element thứ hai | IV |

Đây là ID mới đề xuất cho catalog tương lai; không rename runtime `PlayerPhoenix`, map `dawn` hoặc các path hiện có. Bốn loài isPlayable=true theo định hướng; danh sách form unlock của save vẫn cần điều kiện resonance. Species mới dùng cùng contract với stage count/role phù hợp, không buộc mọi species ba stage/Sacred.

## Fields bắt buộc của catalog concept

| Field | Ý nghĩa và kiểu khái niệm | Validation / liên kết |
| --- | --- | --- |
| `creatureId` | Stable unique identifier, tương đương speciesId Task 03 | Không đổi theo ngôn ngữ/stage; aliases phục vụ migration |
| `displayName` | Tên Việt và English reference nếu có | Tên English hiện PROPOSED; không dùng làm foreign key |
| `elementTypes` | Danh sách affiliation nguyên tố | Enum/roster có version; bốn Sacred single native element; không đưa Life vào list của Ly |
| `primordialAuthority` | Authority riêng nếu confirmed, optional | Ly `life`; ba loài khác chưa có tên authority riêng, không suy từ stage III |
| `narrativeRoles` | Sacred và vai trò hệ sinh thái, có thể đa nhãn | Tách rarity/morality/hostility; không auto-invincible |
| `rarity` | Rarity ref hoặc `UNRESOLVED` trong draft | Không mặc định Legend vì Sacred/HUD; runtime-ready entry phải có chính sách rarity nếu hệ sử dụng |
| `isPlayable` | Quyền có thể mở dạng | true không là đã unlocked; false không cần playable formId/skill actions nhưng vẫn collection/memory |
| `chapter` | Chapter/region introduction reference | Không buộc chỉ dùng được trong chương đó; không giải đáp quan hệ Dawn↔Nhật Diệm |
| `evolutionStages` | Ordered stage records, stageId/name/anatomyBrief/gates/capability overrides | Tứ Linh đúng ba; gate references không có cycle; không buộc shared level thresholds |
| `baseAttributes` | Attribute profile/rule refs: durability, offense, control, mobility, resource context | Định tính hiện tại, numeric balance ref chưa chốt; không encode “Sacred immunity” |
| `levelProgression` | XP curve/level cap ref, stage/skill eligibility rules | Theo formId; numeric curve/cap unresolved; không viết số placeholder thành cân bằng |
| `skills` | Ability references với slot role, minimumStage, skill prerequisites, target/effect/animation/cancel rules | Các ID có thật trong tài liệu abilities, không cấp tự động chỉ vì đủ stage; marker và hitbox phải tương thích |
| `passiveTraits` | Passive refs và activationScope/conditions | Active-only mặc định ứng viên; không có passive cộng dồn reserve; các exception cần khai báo rõ |
| `movementProfile` | Modes/speeds qualitative ref, depth/thermal/wind constraints, posture/placement/footprint/envelope refs | Không bay→noclip; mỗi mode có supported collision/animation; stage upgrade cần clearance |
| `environmentAbilities` | Receiver contracts/conditions/preview/events/transient vs persistent | Không suy mọi receiver từ màu element; effect/reaction owner/ledger theo synergies |
| `resonanceRequirements` | Routes, milestones, sources, compatibility và bootstrap exception refs | Task 03 acquisition graph; hạch irrecoverable không grant form, duplicate grant idempotent |
| `ancestralMemoryIds` | Memory refs + chapter gate/provenance | Không tự sinh full story khi mở dạng; catalog dự kiến chưa có memoryId triển khai thì ghi pending |
| `visualAssetReferences` | Reference/master/runtime paths và approval/verification status tách theo stage | File thật khi có; missing dùng null + gapId, không invent export path/claim animation |
| `animationDefinitions` | Các action/direction/posture frame refs, anchor, timing, loop, phase markers, fallback policy | Không map một concept-sheet row thành clip chưa validate; active action không được thiếu telegraph/contact |
| `contentStatus` / `contentVersion` | Draft / reviewed / runtime-ready cùng version và decision refs | Draft incomplete hợp lệ để review, không qua gate runtime-ready; model P không tự confirmed |

`baseAttributes`/skills/resourceRef là catalog định nghĩa, còn XP/HP/cooldown/stage đã đạt nằm ở `CreatureProgression`. Save không ghi đè catalog thông qua tên hiển thị hoặc UI. Không nhân record theo cá thể được gặp hay theo evolution.

## Stage/ability/animation contract — PROPOSED

Stage record giữ anatomy signature, visual/hard-body envelope theo posture, core footprint, hurtboxes, skill/environment minimums và transition requirements. Ability giữ range category, targeter, activation/interruption policy, phase/effect refs và balanceRuleRef. Animation giữ từng frame rect/hướng, origin/timing, hit/contact markers và clip-compatibility theo stage, không chỉ rowIndex.

Không mặc định generic fallback khi thiếu animation làm thay hành vi. Có thể dùng clip cũ chỉ nếu art/combat review phê duyệt compatibility, marker/hitbox/đọc đòn vẫn đúng và trạng thái được ghi là fallback; nếu không, entry/action/stage chưa runtime-ready. Không sửa asset cũ trong Task 04 hoặc áp chuẩn mới để vô hiệu avatar hiện hữu chưa được migration.

Memory/theme tương lai tham chiếu lịch CHAPTER_REVELATIONS; chưa có ID runtime thì để pending link tới theme và gap. Authority, role và element là ba trường độc lập. Không dùng stage III để tự grant nguyên tố phụ, full truth hoặc cổng vũ trụ.

## Validation đề xuất

- **CIV01:** creature/form/stage/ability/memory refs unique và resolve; cùng một species không có nhiều progression keys; migration alias không lặp/vòng.
- **CIV02:** đúng ba stage cho Tứ Linh, thứ tự I→II→III; evolution prerequisites độc lập level curve; nguồn/milestone tồn tại, không cycle bootstrap Quy.
- **CIV03:** skill minimumStage hợp lệ, required action có animation/markers/effect/hitbox compatible; passive scope và cancel policy không null mơ hồ ở runtime-ready.
- **CIV04:** path thật tồn tại, rect nằm trong ảnh, dimensions/alpha/anchors/timing và visual verification status đúng; null asset báo gap và ngăn nhận runtime-ready, không âm thầm mất sprite.
- **CIV05:** footprint/hurtbox/hitbox/envelope tách; clearance có case narrow passage/turn/evolution/transform theo clip; không cắt đầu/chi để nhận “vừa”.
- **CIV06:** locked encounter giữ member set + stage/skill/config snapshot; skill/evolution unlock ở giữa chỉ pending; currentHP/cooldown không reset vì đổi stage/slot.
- **CIV07:** elementTypes của Ly chỉ Mộc trong spec này, Life authority riêng; Sacred role không suy rarity hoặc invincibility.
- **CIV08:** environment receiver có feedback fail/safe exit; không yêu cầu bốn form đồng thời, không cấm form cũ toàn chương hoặc khóa progression vĩnh viễn.
- **CIV09:** persistent world event khác transient combat residue; owner/stage snapshot/lifetime/reaction ledger resolve, không recursive duplicate grants/resources.
- **CIV10:** catalog hỗ trợ nonplayable/one-stage/two-stage khác bằng data, không branch theo tên loài trong core system; loài mới vẫn phải qua cùng art/animation/logic gates.

Đây là validation expectations, **chưa có validator runtime được viết**. Review đường dẫn/ID trong Markdown là kiểm tra tài liệu, không chứng minh engine đã hỗ trợ mọi collider/movement.

## Save compatibility / migration

Theo ứng viên R03-P10, save giữ stable formId + committedStageId, progression và alias/schema/content versions. Rename stage cần alias giữ nội dung đã mở và rewards ledger; removed stage cần explicit migration, backup và safe checkpoint, không xóa tiến trình hoặc tự đưa người chơi xuống thấp để phạt. Trong boss dùng frozen config; load policy abort/reset của R03-P08 vẫn là đề xuất Task 03, không silently thay bằng resume.

ID mới không phải đường dẫn file, không chỉ định storage/database/language. Task kỹ thuật sau phải map catalog sang stack đã xác minh và bảo toàn key settings/legacy; Task 04 không tạo dữ liệu executable hoặc import mới.


## Task09 — elemental profile interface (PROPOSED E09-P10/P12)

[Elemental data](ELEMENTAL_DATA_SPEC.md) nối elementRefs, attack/channel/property/status/reaction/resistance và environmental context tới cùng speciesId/formId/stage records; không progression owner thứ hai. Life authority không vào ordinary elementTypes. Six baseline affiliations không tự cho immunity/heal/moral alignment. Same element khác anatomy/movement/kit; new species dùng definitions và reusable modules, novel mechanics cần module riêng. Dual profile chỉ resolver interface, composition/bonus/primary-secondary/evolution/acquisition để Task10; không default math trong loader. Chưa code/schema JSON mới.
