# ADR Task26 và trạng thái quyết định

Nguồn phê duyệt duy nhất cho ba quyết định đầu: yêu cầu Task26 §2. Không sửa D26 kết truyện cũ trong PROJECT_DECISIONS: **D26-01/02/03 là namespace planning Task26**, không ghi đè D26 lore. ADR khác PROPOSED. Canon CONFIRMED/PROPOSED/UNRESOLVED/SUPERSEDED của Tasks01–25 giữ nguyên ngoài approval explicit này.

| ADR / trạng thái | Quyết định / lựa chọn | Lý do, trade-off / phạm vi |
| --- | --- | --- |
| ADR-26-01 / CONFIRMED | D26-01: S0 trước S1 | S0tạm giúp thử movement, không đủ D40; S1cầnresonance/basic/save. Không chọn HP/adapter |
| ADR-26-02 / CONFIRMED | D26-02: Dawn default, Quy opt-in | Bảo toàn prototype, không rewrite PlayerPhoenix hoặc unfinished public default |
| ADR-26-03 / CONFIRMED | D26-03: architecture-first | Chỉ contract/ownership/dependency/test plan; không implementation ở26 |
| ADR-26-04 / PROPOSED | A additive + B selective extraction, thay vì C full rewrite | Tái dùng code/test, tránh abstraction dư; cần adapter regression lâu hơn một rewrite sạch |
| ADR-26-05 / PROPOSED | Scene lifecycle tối thiểu qua adapter, thay vì setIsland reset hoặc scene framework lớn | One loop, cancellation/cleanup explicit; thêm lifecycle complexity cần test |
| ADR-26-06 / PROPOSED | Actor interface typed nhẹ, thay vì ECS hoặc raw string identity | Hỗ trợ nhiều loài; phải validate refs, không approve catalog mapping |
| ADR-26-07 / PROPOSED | State owners hiện hữu + readonly projections, thay vì UI/scene copy progression | Chống duplicate ledger, tốn công command/revision boundaries; không chọn storage |
| ADR-26-08 / PROPOSED | Tests/scene/release cách ly, thay vì đổi default hoặc dispatch thử production | Giữpublic, cần preview và matrix riêng nếu được giao. D26-02 protection là confirmed nhưng tooling chi tiết chưa |

## Approval còn thiếu và mốc

| Gate | Chặn gì | Không chặn | Khi duyệt |
| --- | --- | --- | --- |
| B/C | Plane/input/constants/current/camera/clearance production | Architecture options và inventory | Trước28–30/42–45tương ứng |
| D/G | Species/form/stage/ability mapping, anatomy/reference/atlas | Typed interfaces, chưa content production |27contract/34sprite/41binding |
| F | Storage/atomicity/receipts/migration/namespace | S0temporary | Trước31; trước bậtS1 |
| E | HP/defeat/recovery/continuation/emergencytransfer/ordering | S0khôngcombat | Trước49và trước combat implementation |
| H/I/J | E02source/boss/E05/E06fixtures | S0và E01scope độc lập | Trước content tương ứng |

ADR không tự chốt timing/speed/damage/current strength, gameplay rarity, physical manifestation hoặc source species. QuyI S0 fixture không form unlock save. Khuyến nghị chính được ghi đủ để review, không yêu cầu phê duyệt tiện lợi bằng suy diễn. Đề bài Task27 riêng mới cho phép bắt đầu thực hiện.
