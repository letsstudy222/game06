# Sổ decision gate kỹ thuật — không tự phê duyệt gameplay

**PROPOSED** cho khuyến nghị/lịch chốt; mọi lựa chọn chưa được duyệt vẫn **UNRESOLVED**. D29/D40/D41/D06 và bản sắc Sacred giữ **CONFIRMED**; historical **SUPERSEDED** không đổi. Nguồn: [PROJECT_DECISIONS](../PROJECT_DECISIONS.md), [OPEN_QUESTIONS](../OPEN_QUESTIONS.md), các decisions Task17–24. A01–A14 là số finding trong audit Phase III của hội thoại, không event/quest IDs mới.

## Mười gate và phạm vi chặn

| ID / ưu tiên / mô tả | Lựa chọn hiện có | Ràng buộc đã xác nhận | Khuyến nghị PROPOSED / hệ quả kỹ thuật | Task bị chặn | Task không bị chặn | Mốc duyệt đề xuất |
| --- | --- | --- | --- | --- | --- | --- |
| T25-GA / P1 — scope | Demo S0 hoặc tích hợp D40/S1; full Chương I là scope khác | D40 essentials; không full3/boss bắt buộc | Chia checkpoint có nhãn rõ, giữ public cũ; S0 không ghi progress RPG | Acceptance/đổi default/release; phạm vi code26 nếu chưa có cut | Audit/planning/interface draft | Trước Task26 chốt phạm vi; trước49 xác nhận S1/D40 acceptance nếu đề bài49 dùng mốc đó |
| T25-GB / P1 — camera/plane | x–y top-down tương thích hiện tại, side-on, hoặc phương án project-compatible cần adapter | Browser-first; không tự suy full3D | Ưu tiên thử x–y để tái dùng primitive, chưa chọn canon; ảnh hưởng coords/layers/LOS/assets | Production renderer28/map29/sprite34/integration41/controller42–43/geometry45 | Viết contract có options, inventory assets, fixture math | Trước28 và trước freeze anatomy34; reconfirm trước41 |
| T25-GC / P1 — input/bơi | Input trực tiếp hiện hữu hoặc acceleration/deceleration/inertia/current có giới hạn theo Q18 | QuyI và accessibility; không tự thêm oxygen/stamina | Semantic swim/brake/interact, một motion coordinator; tuning sau thử | Controller30/42–43 và corridor45, receiver46 | Basic adapter26, asset path validator27 | Trước30 semantic contract; trước42 thông số fixture/test |
| T25-GD / P1 — identity | Typed species/form/stage/ability/manifest refs; catalog mapping chi tiết còn mở | D07/D30/D39; không tự nâng ref_i_* thành loài | Duyệt mapping tối thiểu QuyI/Phượng adapter; stageId/abilityId không tra chuỗi trần | Production actor/save31/sprite binding34/scene41; evolution sau này | Renderer prototype trung tính, graph design, inventory | Trước26 interface và trước31/34/41 binding |
| T25-GE / P0 trước combat — HP/recovery | HP riêng loài (C14A=L16B), shared HP, shared vitality+integrity; continuation/emergency transfer/abort-reset còn đề xuất | D06/D41 giữ membership lock và không đòi đủ ba dạng; không tự cấp dạng ngoài set để né policy | Chọn scoped policy đủ basic/retry, không copy regen Phượng; thứ tự đồng thời outcome rõ | Combat/HP durable, boss; save31 nếu lưu HP/attempt, nghiệm thu S1/49 | S0 không damage/HP, art/nav và persistence interface trung tính | Trước triển khai combat và trước49 yêu cầu D40; không ép chọn boss policy để thử bơi |
| T25-GF / P0 trước durability — save | Versioned snapshot hoặc journal tương đương W07; backend/namespace/export chưa chọn | Một ledger; source claim≠recipient allocation; version không grant lại; D29 memory trước form | Chọn writer nhỏ có last-good/integrity/receipt, duyệt O17 memory mapping và migration | Save31/E01 durable/S1, E05/E06 về sau | S0 tạm, input/render/asset validate | **Trước31**, kiểm lại trước41 nếu bật save và trước49 |
| T25-GG / P1 — art pipeline | Approved source→export riêng, blockout tương thích chỉ khi duyệt; kích thước/anchor/clip chưa chọn | D32 giữ hình, thiếu ảnh không được nhận đã xem | Duyệt reference/anatomy/envelope/rect/markers/provenance và validation, không mặc định96px | Production27/33–40, sprite34, renderer28 binding và scene41 | Inventory/proposed schema, primitive controller nếu có blockout được duyệt | Trước27 contract, trước34 art freeze, trước41 asset acceptance |
| T25-GH / P1 — nội dung thế giới | Named approved species hoặc legitimate environmental source có eligibility; actor/predicate concrete chưa chọn | Wildlife không tự playable/hostile; main không cần optional capture | Bind E02 source/journal/CL03/territorial-refuge proofs, coverage cả undiscovered | E02 và full ecology/quest production; không được tick full E02 bằng decor | S0, E01-only slice, generic current fixture | Trước author E02; không chặn26 lập kế hoạch |
| T25-GI / P1 — boss | Lam Giáp hoặc Màn Lọc; combat yield/trial và arbitration còn mở | D06/D41; guaranteed Quy-only counterplay không cần3forms | Duyệt candidate/outcome rồi đo arena/cue; sửa pattern nếu baseline không đối phó được | E04/boss art/fairness/attempt implementation | S0, basic target fixture, E01/E02 không dùng boss | Trước sản xuất boss, ngoài minimum26–48 |
| T25-GJ / P1 — restoration/travel | E05 C/D same-source theo hợp đồng hiện hữu; E06 destination/return chưa bind | E04≠E05≠E06; không scene callback grant; quay lại được | Giữ source aliases, duyệt fixture/property/coverage/anchor/atomic travel; không coi Dawn là NhậtDiệm | E05/E06/full ending/production travel | Local receiver/restart scene47 và S0/D40 không full ending | Trước E05/E06 task cụ thể; không chặn26–48 minimum |

P0 là rủi ro mất/nhân progression hoặc lifecycle sai nếu triển khai thiếu quyết định, không khẳng định một lỗi save Quy đã xảy ra. Không cần giải Q01/Q02/Q04 để code fixture trung tính; Q05/B+C vẫn chặn final awakening script/art đúng phạm vi.

## Trace A01–A14 của Phase III

| Finding | Gate/xử lý tại Task25 | Trạng thái thực |
| --- | --- | --- |
| A01 memory/writer | GF, O17-U04 | Chưa triển khai; trước31/E01 durable |
| A02 HP/continuation | GE, B23-U04 | UNRESOLVED; không copy prototype |
| A03 scope | GA | S0/S1 là đề xuất để duyệt, không D40 giảm chuẩn |
| A04 catalog | GD | Chưa final mapping |
| A05 motion/geometry | GB/GC | Chưa production plane/clearance |
| A06 E02 source | GH | Không generic feeder thay full E02 |
| A07 boss | GI | Candidate chưa được duyệt |
| A08 E05 fixtures | GJ | Chưa concrete patch/coverage |
| A09 reward overlap | GF/GH, source component/stacking rules P15/S22 | Chưa production manifest, một ledger |
| A10 E06 | GJ | Destination/return còn thiếu |
| A11 assets | GG | Quy/water/boss Missing/Unverified |
| A12 Git preservation | Baseline1bae0846 đã xác minh local+remote | Không còn gap138untracked ở đầu Task25; docs mới Task25 là gói riêng |
| A13 ActIV | Handoff P2 tại baseline, main overview/acts/graph đồng thuận E trước E03 rồi G | Đã sửa văn bản, không đổi quest graph |
| A14 văn xuôi | Handoff P2 đã Việt hóa overview/labels, identifiers/technical contract giữ | Đã bảo toàn correction; không tuyên bố mọi từ Anh kỹ thuật bị loại bỏ |

## Trước các mốc người dùng nêu

26: GA và subset GB/GC/GD cho interface sẽ sửa; 28: GB/GG và compatibility; 31: GF, GD, O17-U04, GE nếu payload HP; 34: GG/GB/GD và Q05/B+C nếu clip thức tỉnh; 41: GA–GD/GG cùng regression gate, GF nếu bật durable; 49: scope/acceptance D40 và mọi gate của chức năng thực được đưa vào, không tự coi S0 đạt S1. Nội dung chính thức từng task tương lai chưa được cung cấp đầy đủ; đây là deadline khuyến nghị, không tự viết đề bài hoặc bắt đầu chúng.
