# Chín vùng chức năng và yêu cầu room

**PROPOSED H19-P03/P04.** Các tên Việt/zone IDs là draft, không canon đã duyệt hoặc map files. Entrance/exits và predicates tham chiếu [graph authority](CHAPTER1_WORLD_GRAPH.md); đây là hồ sơ chức năng, không duplicate gate state. “I” trong capability là Stage I, khác ký hiệu zone I.

| Zone / chức năng | Entrance → exits theo graph | Required / optional capability | Ban đầu / permanent unlock | Return và hazard | Story refs |
| --- | --- | --- | --- | --- | --- |
| A sanctuary / thức và thực hành | Bootstrap anchors → ab | CAP_BOOTSTRAP prebody; Quy I movement sau form commit / không optional | Chỉ A nhận cảm; ab sau E01 practice/local cửa | Từ B về A sau mở; tutorial không lethal/current mạnh | E01, mem_quy_first_sense |
| B rạn / quan sát và wider exploration | ab → bc, bd, eb/ib sau unlock | Quy I movement/observation / later mobility chỉ extra nook | Sau E01; bc cần E02; permanent shortcuts theo E03/E05 | A luôn là refuge; encounter lãnh thổ ngắn có retreat, không tất cả wildlife hostile | E02, E05 verification |
| C kênh / current lesson và lựa lane | bc hoặc dc → ce | Quy I read flow/move/context receiver / II mở challenge ngoài main | Sau E02, không cần evolution; ce lane yếu có refuge | B hoặc E quay được; force/wall cần sweep và safe pockets | E03 approach |
| D habitat / quan sát và side activity | bd → dc | Quy I đủ baseline observation / loài optional chỉ trial được duyệt | Sau E01; dc không bỏ E02 prerequisite | Trở B không cần hoàn sidequest; vegetation occlusion, wildlife giữ khoảng | E02/E05 ecological context, chưa event phụ mới |
| E ruins / bằng chứng và bypass | ce → eg, ef, eb | Quy I read flow/structure I / II mở ef | E03 chứng minh bypass tại E mới mở eg/shortcut eb | C/B; không bắt xuống F; collision/occlusion/cơ cấu an toàn | E03, mem_quy_current, CL01/02/03/04 |
| F trench / advanced optional | ef → fg | Explicit tier II hoặc approved equivalent / III optional refinement | Khóa từ lần đầu, clue ở cửa; không main objective ở trong | Trở E có refuge trước hazard, fg chỉ khi E03 done | Chưa thêm main event/memory ID; optional content cần author |
| G core / quan sát hậu quả và vận hành hồi | eg hoặc fg → gh, gi | Quy I thao tác nhánh đơn/read flow / III optional cụm phụ | Sau E03, core operation E05 sau E04; gi chưa mở sớm | E/H preparation; không lethal core mandatory pressure, habitat outlets giữ | E04 preparation, E05 restoration |
| H boss approach / nơi chuẩn bị và confrontation | gh → G ngoài arena | Quy I basic/move/structure / thêm forms optional | E03 đủ mở approach; arena theo E04 entry policy | Preparation quay G tự do; sau lock abort/retreat theo policy, không cửa thoát lách lock | E04 boss_or_alternative |
| I exit / tuyến hồi phục và trồi bờ | gi → ib, in | Quy I move/read flow / không Phượng prerequisite | E05 mới available; in arrival/return E06 riêng | G/B còn route, từ N về I khi E06 return edge durable | E05 aftermath, E06 transition |

## Room/landmark brief

A giữ sáu `opening_z01–06` Task17 trong một cluster: nơi nhận cảm không có thân, vật mang trung tính dưới vòm mai (`hy_lm_shell_arch`), safe body spawn và khoảng bơi rộng. Nhìn thấy exit ngay từ practice area; line-of-sight không bị props che prompt. Đường nhận cảm trước thân không dùng như đường bay sau này.

B có vòng nhỏ quanh trụ sáng lệch (`hy_lm_reef_spire`), một nhánh cát yên cho observation, một nhánh có territorial warning và refuge dẫn về A. Không mandatory gathering/currency mới; journal keeper placement là ứng viên S05, chưa actor sprite. D dùng tảo cao/rễ bám và khoảng trống trong tán, không lặp toàn coral của B; pocket tham quan không là corridor combat dài.

C có hai lane nhìn thấy điểm hợp dòng (`hy_lm_split_channel`): lane yếu main và lane mạnh chỉ preview/optional. E có cửa cuốn nước quay lại (`hy_lm_return_groove`), phòng bằng chứng bốn khe và nhánh xả phụ ở cùng phía gate eg. Cơ cấu E03 không cần env_quy_route II. F nằm lệch tuyến dưới lớp silhouette đá, có refuge ở cửa và cảnh báo pressure/visibility trước connector; không reward main bị miss.

G làm rõ hai đường cấp/hồi và nơi trú ở rìa (`hy_lm_twin_outlets`), tránh arena chồng receiver. H có prep anchor nhìn được đường vào nhưng ngoài threat/lock boundary, arena/alternative receiver nằm bên trong return-flow lock; chưa moveset/identity boss mới. I nhìn dần thấy nước sáng/đá ấm (`hy_lm_warm_slope`), có chỗ dừng trước crossing E06; không Phượng xuất hiện hoặc full Chapter II reveal.

## Chia nhỏ production

A + phần gần B đủ minimum slice. B/D có thể chung streamed cluster; C/E/G dùng chung kit đá/rãnh/receiver nhưng room theo visibility và route safety. H preparation/arena là hai scopes logic ngay cả khi chung scene. F optional deferred; I reuses rock/water để chuyển dần. Room count/size/coordinates chưa chốt; blocking cần envelope Quy và performance targets. Không đòi chín mega tilemaps hoặc phê duyệt layout từ sơ đồ này.
