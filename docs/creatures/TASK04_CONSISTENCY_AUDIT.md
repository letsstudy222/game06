# Audit và bàn giao Task 04 — Tứ Linh

Baseline `fce9cf2`; working tree sạch trước task. Đã kiểm tra repository, không thấy AGENTS.md; source hiện vẫn Canvas 2D/ES modules. Chỉ tài liệu, không implementation/gameplay/UI/art, không tự tiến hành Task 05. Định hướng mới trong Task 04 không tự phê duyệt những chi tiết PROPOSED Tasks 02/03.

## Mapping đủ 11 đầu ra

| Đầu ra yêu cầu / file thực tế | Nội dung / authority |
| --- | --- |
| [SACRED_CREATURE_OVERVIEW](SACRED_CREATURE_OVERVIEW.md) | Ma trận 16 chiều bốn loài và trạng thái thiết kế |
| [QUY_HAI_UYEN](QUY_HAI_UYEN.md) | Rùa nước cổ, 3 stage và hạn chế |
| [PHUONG_HOANG_NHAT_DIEM](PHUONG_HOANG_NHAT_DIEM.md) | Phoenix bảo tồn identity, không tự map Legend→III |
| [LONG_THIEN_PHONG](LONG_THIEN_PHONG.md) | Rồng dài S xuyên mây, 3 stage không worm |
| [LY_VAN_SINH](LY_VAN_SINH.md) | Guardian Mộc/Sinh Mệnh, không deer recolor |
| [SACRED_EVOLUTION_MATRIX](SACRED_EVOLUTION_MATRIX.md) | 12 stageId và quy tắc collision/render/evolution chung |
| [SACRED_CREATURE_ABILITIES](../gameplay/SACRED_CREATURE_ABILITIES.md) | 24 combat/mobility/passive entries + 8 environmental contracts |
| [SACRED_SYNERGIES](../gameplay/SACRED_SYNERGIES.md) | 6 cặp, một active, cap/owner/snapshot/reaction rules ứng viên |
| [SACRED_ART_REQUIREMENTS](SACRED_ART_REQUIREMENTS.md) | Bằng chứng ảnh/metadata, 12 gap records, animation gates/originality review |
| [CREATURE_DATA_SPEC](../technical/CREATURE_DATA_SPEC.md) | Fields/relationships/validation, mở rộng entity Task 03 |
| TASK04_CONSISTENCY_AUDIT (file này) | Xung đột, 15 edge cases, quyết định/phụ thuộc và nghiệm thu tài liệu |

Không có equivalent species spec trước Task 04. Giữ `docs/lore/SACRED_CREATURES.md` làm nguồn lịch sử; giữ Task 03 transformation/progression/data làm nguồn luật hệ, thêm links thay vì chép một state machine mới.

## Tài liệu/reference đã review

GAME_VISION, PROJECT_DECISIONS, OPEN_QUESTIONS, ASSET_REFERENCE_REGISTER; lore WORLD_HISTORY, SACRED_CREATURES, SPIRIT_AND_RESONANCE, RESONANCE_RULES, CHAPTER_REVELATIONS và RESONANCE_DECISION_RECORD; gameplay TRANSFORMATION_DESIGN/CREATURE_PROGRESSION_CONCEPT; technical RESONANCE_DATA_MODEL/RESONANCE_EDGE_CASES; art-provenance và source renderer/animation/manifest liên quan. Các tài liệu Tasks 01–03 tồn tại, không thiếu nền để soạn spec; các ảnh Quy/Long/Ly vẫn thiếu. Không nhận đã xem reference ngoài repo.

Đã mở xem trực tiếp `assets/phoenix-3-v2.png` và `assets/production/phoenix/atlas.png`; đọc manifest nguồn/runtime, metadata legacy và code chọn pose/timing. Không chạy playback suite mới hoặc kiểm chứng đủ 12 bộ animation. Các file Phoenix lịch sử được tìm thấy không mặc định đã review tất cả.

## CONFIRMED và đề xuất

CONFIRMED từ Task 04 bổ sung D31–D33 trong PROJECT_DECISIONS: bản sắc combat/traversal/visual bốn loài, giữ Phoenix và Long thân dài, Ly Mộc/Sinh Mệnh, ba stage có anatomy/utility thực và không bất tử/obsolete. D05/D06/D07/D30 về bộ ba, khóa boss và progression vẫn giữ.

| ID | PROPOSED / chưa tự thành canon |
| --- | --- |
| C04-P01 | Philosophy/English reference names và matrix temperament/defense/weakness cụ thể |
| C04-P02 | Quy: 3 tên stage/anatomy/mechanical deltas/gates ứng viên |
| C04-P03 | Phượng: stage hóa bảo tồn reference; mapping reference còn cần review |
| C04-P04 | Long: proportions/curve/posture và 3 stage cụ thể, không thay direction dài đã confirmed |
| C04-P05 | Ly: anatomy guardian/gạc/collar và 3 stage cụ thể |
| C04-P06 | Stage IDs/gates/capability inheritance và thời điểm apply ngoài encounter |
| C04-P07 | Footprint/envelope/compact posture/rendering rules cần prototype |
| C04-P08 | 24 ability entries có counterplay và animation requirements |
| C04-P09 | 8 environmental receiver/action contracts, không cửa màu |
| C04-P10 | Sáu synergy và effect ownership/stack/expiry rules |
| C04-P11 | Art/export/playback/originality acceptance pipeline |
| C04-P12 | Creature catalog fields/IDs/validation/migration, không executable schema |
| C04-P13 | Edge case outcomes ở bảng sau, dùng giả định hệ Task 03 vẫn PROPOSED |

## Xung đột phát hiện / xử lý có ghi nhận

| Vấn đề | Xử lý đề xuất hoặc giới hạn xác nhận |
| --- | --- |
| Phoenix đang có nhãn Legend và sáu trạng thái runtime, dễ gọi là stage III đã đủ animation | Không gán stage/rarity bằng nhãn; giữ atlas/reference, ghi hai pose mỗi hướng và gaps bộ clip riêng. Chưa phê duyệt mapping stage |
| Long direction approved trong prompt nhưng ảnh không có | Ghi confirmed direction bằng chỉ dẫn, missing file riêng; không claim nhìn art hoặc tạo thay thế |
| Ly trông như hươu thường nếu chỉ lá/gạc thêm | Brief guardian vai/ngực/chi/gạc–cổ–lưng có anatomy riêng, vẫn PROPOSED và cần ảnh review; không chứng nhận originality bằng text |
| Ba loài còn lại không có named authority riêng nhưng stage III gọi Primordial | Stage label không tự grant quyền năng có tên mới. Ly Life tách khỏi Wood combat |
| Thức Quy trước restore toàn hydrology | Giữ bootstrap Task 03; phục hồi toàn vùng sau cơ thể đầu; không cycle prerequisite |
| Bốn loài Sacred nhưng loadout chỉ ba | Synergy cặp/triple nối tiếp, không bốn avatar hoặc bốn passive; cổng dựa world systems, không check equip bốn form |
| Đầu game chỉ Quy nhưng ứng viên Task 03 boss gate đủ ba | Chưa có roster hỗ trợ được duyệt để đáp ứng gate; content cần task riêng, không tự thêm hai loài hoặc gọi tutorial boss. Gate vẫn PROPOSED |
| Dạng mới bay có thể thay tất cả dạng cũ | Phân biệt nước/thermal/hướng–áp/quan hệ sống; từng loài còn utility và counterplay về sau |
| Kích thước stage III xung đột map tile/96px Phoenix | Không đổi tile hay ép mọi loài vào 96px; visual/physics boxes tách, clearance và posture thật. Engine chưa hỗ trợ long-body được chứng minh |
| Một skill đốt/chữa/cộng hưởng có thể viết lại world-state và lịch truyện | Environmental receiver và persistent event riêng; memory gate theo chapter; không auto cấp toàn bộ ký ức khi stage III |
| Phượng biểu tượng tái sinh và Ly Life dễ thành auto-resurrect | Không thiết kế auto-revive. Healing không HP0/reserve, defeat ứng viên theo Task 03 chứ không retcon game hiện tại |
| Địa vị thần thoại có thể bị suy thành “bản địa thiện” | Giữ temperament/bản năng là góc nhìn, không đạo đức/tri thức toàn tri; sự tự nguyện vẫn UNRESOLVED |

## 15 edge cases — PROPOSED C04-P13

Đây là acceptance expectations, không test implementation đã chạy. Tham chiếu invariants CIV của data spec và I/EC Task 03; không thay state machine R03 bằng luật thứ hai.

| ID | Tình huống | Kết quả cần hỗ trợ / recovery |
| --- | --- | --- |
| T04-EC01 | Tiến hóa khi đang equip | Giữ formId/member set, chờ safe point, validate art/placement; commit stage/config cùng revision, giữ tỷ lệ HP và cooldown; không thêm slot/reward |
| T04-EC02 | Evolution eligibility trong boss | Ghi pending một lần; frozen stage/config giữ nguyên đến hết lock theo R03-P08/P09; không dùng evolution để heal giữa trận |
| T04-EC03 | Sprite dimensions đổi sau evolution | Kiểm tra frame/envelope/anchor/culling và collision riêng; nếu thiếu chỗ thì pending ngoài combat tại safe point, không cắt sprite hoặc đẩy xuyên tường |
| T04-EC04 | Thiếu animation action bắt buộc | Ngăn nhận entry/action runtime-ready; chỉ fallback được duyệt đúng phase/hitbox/telegraph mới dùng; không silent idle thay attack hoặc giảm assertions để pass |
| T04-EC05 | Đổi form giữa attack | Attack phases có interruptible flags; chỉ nhận switch ở cancel window hợp lệ; không nhân contact event hoặc reset skill cooldown. Nếu noninterruptible, báo chờ/reject, không queue vô hạn |
| T04-EC06 | Transformation bị ngắt | R03 transaction: precommit giữ source/damage durable và nhả reservation; postcommit target/cost thật, không rollback damage/heal; incapacitation theo defeat flow |
| T04-EC07 | Environment ability tạm không dùng được | Nêu điều kiện thiếu bằng preview/feedback, giữ unlock/progression; có đường rút/điểm đặt an toàn; không tự grant skill khác hoặc khóa người chơi trong vùng |
| T04-EC08 | Dạng lớn vào lối hẹp | Dùng posture đã có asset/clearance thật, hoặc chặn entry/cho đường vòng/safe switch trước chỗ hẹp; không scale nhỏ/crop thân. Long cần kiểm tra cả đường cong/đuôi, Ly gạc/cánh Phượng cần envelope |
| T04-EC09 | Dạng đã unlock thiếu production assets | Preserve save/unlock, báo content gap, giữ runtime form/stage đang hỗ trợ hoặc safe fallback đã mở; không crash/mất sprite/ngầm xóa unlock. Không áp chuẩn tương lai để disable Phoenix cũ |
| T04-EC10 | Narrative disable một loài | Disable tạm có lý do/điều kiện gỡ, giữ XP/stage; active invalid dùng safe transfer/checkpoint theo Task 03, không đổi member trong boss để cứu attempt |
| T04-EC11 | Equip nhiều stage cùng species | Reject duplicate qua canonical creatureId/formId; stageIds không là member. Collection vẫn xem lịch tiến hóa, không duplicate body/progression |
| T04-EC12 | Save có evolution ID cũ | Alias migration có version/backup, giữ unlock/gains/ledger; nếu không map được thì preserve orphan record và safe recovery, không xóa tiến trình hay tự downgrade phạt |
| T04-EC13 | Đạt level cap | Clamp theo curve được duyệt, không overflow/wrap và không bắt reset/evolve mất XP; memory/mastery/exploration tiếp tục. Xử lý XP vượt cap cần balance decision, tạm không biến thành tiền/tài nguyên mới |
| T04-EC14 | Unlock skill khi loadout locked | Ledger ghi quyền/gains, combat ability config frozen; apply ở ngoài attempt theo R03; không skill slot thứ tư hoặc stage change ngầm |
| T04-EC15 | Passive form mới chạm residue của form cũ | Passive chỉ active; residue theo creator snapshot/TTL/reaction ledger, không thừa kế stats/passive reserve. Ví dụ nước Quy còn thì Phượng có thể phản ứng một lần; Ly channel heal đã kết thúc khi switch |

## Câu hỏi cần duyệt và rủi ro production

Mapping artwork Phoenix ↔ stage; art reference Quy/Long/Ly và phạm vi nguồn được duyệt; tên stage/English reference names; số skill có vào slice; stage gates/level thresholds/XP cap; attribute/cost/cooldown/range/TTL/cap numbers; motion/collision giải pháp rồng dài, tư thế gập chi/gạc/cánh có thực hiện được; synergy nào dùng trước; active-only/residue exceptions; asset fallback/migration và handling XP sau cap. Không tự phê duyệt B+C, boss reload/reset hoặc catch-up floor chỉ vì task này dùng các ứng viên ấy để review.

Nguồn gốc Tinh Linh, thủ phạm sâu nhất, sự tự nguyện Tứ Linh, tên cấu trúc Quy và bản chất Tinh Môn vẫn mở. Stage III/memory không được làm lộ toàn sự thật trước IV; ngay sau IV nguồn gốc vũ trụ vẫn chưa được chốt. Không thêm thoại độc lập của linh thú.

## Quality gates và kiểm định Task 04

Đã review các gate: bốn identity khác nhau; đủ 12 stage có anatomy/movement/combat/env/animation; Phoenix giữ identity; Long dài S; Ly Mộc và Life tách; awakening nối lore; weakness có cách xử lý; synergy dùng tối đa ba member; utility dạng cũ còn; Missing artwork ghi rõ; catalog mở rộng không hardcode loài; phạm vi chỉ docs.

Kiểm tra tự động tài liệu trước commit: file/link/ID/stage/ability/gap/edge-case đủ và `git diff --check`; đối chiếu source/manifest và đọc PNG read-only. Đây không phải nghiệm thu combat/animation/hardware. CI sau push là kết quả riêng của repo, không chứng minh skill mới hoạt động.

## Chuẩn bị Task 05

Cần đề bài riêng; nếu làm art, cung cấp/chỉ định reference Quy/Long/Ly và duyệt mapping stage của Phoenix, chốt silhouette/anchors/envelope trước animation. Nếu làm combat/data, chọn subset abilities/receiver và duyệt model/parameters thuộc phạm vi, migration và test plan. Không cần giải đáp nguồn gốc vũ trụ để làm phần độc lập. Không tự triển khai Task 05 hoặc tạo artwork thay thế.
