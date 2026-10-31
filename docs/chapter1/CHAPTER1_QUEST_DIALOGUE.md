# Dialogue package nhiệm vụ chính — bản nháp tiếng Việt

**PROPOSED Q21-P06.** IDs `c1q_*` mới chỉ content references, chưa thoại/script/voice asset đã duyệt. Task17 [opening dialogue](OPENING_DIALOGUE.md) giữ mọi `opening_*`; mq_01 reuse nguyên gói đó, không tạo bản thoại cạnh tranh. Quy không nói ordinary human dialogue. Spoken NPC dưới đây là proposal cho roles S05, phải duyệt khả năng giao tiếp/danh tính trước voice/script; không tự gán species/body người.

| dialogueId / quest | Channel / speaker | Văn bản lượt đầu | Bản ngắn/replay | Trigger / guard |
| --- | --- | --- | --- | --- |
| c1q_reef_goal / mq_02 | System prompt | Rạn vẫn đang sống. Hãy quan sát một nhịp sống ngoài buồng thức. | Quan sát nhịp sống ở rạn. | Sau E01 parent, không chỉ form commit |
| c1q_reef_life / mq_02 | Spirit perception | Dòng nước đứt quãng… nhưng nơi này vẫn thở. | Nơi này vẫn thở. | Thấy nguồn sống, không diễn giải toàn lịch sử |
| c1q_keep_distance / mq_02 | System prompt | Giữ khoảng cách và nhìn cách sinh vật đáp lại dòng nước. | Giữ khoảng cách để quan sát. | Observation source approved, không kill quota |
| c1q_record_keeper / mq_02 | Spoken proposal / npc_record_keeper | Hãy ghi điều ngươi thấy trước khi đặt tên cho nó. | Ghi điều đã thấy. | NPC role approved interaction; chưa xác nhận species/giọng |
| c1q_record_notice / mq_02 | System prompt | Đã ghi nhận một hành vi. | Đã ghi nhận. | Sau accepted evidence/commit, không mỗi frame nhìn |
| c1q_warning / mq_02 | Environmental description | Vây mở rộng. Nó đang giữ khoảng nước phía trước. | Nó đang cảnh báo. | Territorial cue dùng đúng actor anatomy, không raw species inference |
| c1q_retreat_hint / mq_02 | System prompt | Có thể rút về khoảng nước yên. | Rút về nơi trú. | Eligible encounter route, không phải auto escape proof |
| c1q_foreign_clue / mq_02 | Spirit perception | Dấu lạ ở đây… mà sự sống vẫn tiếp diễn. | Dấu lạ, nơi sống vẫn còn. | CL03 source context, không ngoại lai = thủ phạm |
| c1q_return_flow_goal / mq_03 | System prompt | Tìm đường nước cấp và đường nước quay về. | Tìm đường nước quay về. | E02 complete, C/E reachable |
| c1q_two_grooves / mq_03 | Environmental description | Hai rãnh chạy cạnh nhau. Chỉ một rãnh còn dấu dòng đi qua. | Có hai đường nước. | Physical clue, không history answer |
| c1q_old_repairs / mq_03 | Spoken proposal / npc_record_keeper | Vết sửa này không cùng lớp với vết gãy. | Vết sửa và vết gãy khác lớp. | Evidence có source, không tự đặt era/faction |
| c1q_outlet_hint / mq_03 | System prompt | Thử nhánh xả phụ. Kiểm tra nơi trú trước khi xác nhận. | Thử nhánh xả và kiểm nơi trú. | Context receiver I, không skill II requirement |
| c1q_memory_current / mq_03 | Memory echo / mem_quy_current | Giữ dòng này… còn phía bên kia thì mờ đi. | Một dòng được giữ lại. | Viewpoint thiếu; reused memory không identity mới |
| c1q_bypass_ready / mq_03 | System prompt | Đường xả phụ đã có thể thử. | Có thể thử đường xả phụ. | E03 durable, chưa water_stable |
| c1q_refuge_stake / mq_04 | Environmental description | Sau thềm giữ nước là một khoảng trú còn sống. | Nơi trú vẫn còn sống. | G/H prep, không surprise threat |
| c1q_keeper_warning / mq_04 | Spoken proposal / npc_tide_keeper | Mở quá nhanh, nơi trú sẽ không còn. | Đừng mở khi chưa có đường hồi. | Draft stakes, Task23 final identity/voice/line conditions |
| c1q_spirit_reply / mq_04 | Spirit perception | Một lối mở… mà không cuốn mất nơi này. | Mở lối và giữ nơi trú. | Không lời người của Quy hoặc lời xác nhận tiên tri |
| c1q_prepare / mq_04 | System prompt | Chuẩn bị những dạng hiện có. Trong thử thách, thành phần bộ dạng sẽ bị khóa. | Chuẩn bị rồi xác nhận vào thử thách. | Prep safe, không đòi ba slot |
| c1q_entry_choice / mq_04 | System choice | Bước vào / Chuẩn bị thêm | Bước vào / Để sau | Explicit entry, không cue auto active/lock |
| c1q_loss / mq_04 | System prompt | Chưa vượt qua được thử thách. Có thể chuẩn bị lại. | Có thể thử lại. | Sau approved failed attempt close/recovery, không HP0 auto policy |
| c1q_conflict_resolved / mq_04 | System prompt | Có thể thử vận hành đường hồi. | Có thể thử vận hành. | E04 outcome durable, không báo biển phục hồi |
| c1q_flow_goal / mq_05 | System prompt | Nối đường cấp và đường hồi. Kiểm lại sanctuary và rạn. | Kiểm đường hồi và nơi trú. | E04 proof, main routes cũ vẫn mở |
| c1q_keeper_after / mq_05 | Spoken proposal / npc_tide_keeper | Dòng nước đã đi qua. Hãy chắc rằng nó còn đường trở lại. | Hãy kiểm đường trở lại. | Approved role/outcome, không E05 auto complete bằng thoại |
| c1q_reef_after / mq_05 | Environmental description | Nhịp nước đã đổi. Các khoảng trú vẫn còn. | Dòng đã đổi, nơi trú vẫn còn. | Physical check source/coverage hợp lệ; không all creatures harmless |
| c1q_confirm_water / mq_05 | System choice | Xác nhận vòng nước đã hoạt động / Kiểm tra thêm | Xác nhận / Kiểm tra thêm | Chỉ enabled khi proof đủ; durable error không fake success |
| c1q_water_stable / mq_05 | System prompt | Vòng nước chính đã ổn định. | Vòng nước đã ổn định. | Chỉ sau E05 durable acknowledgement |
| c1q_surface_goal / mq_06 | System prompt | Theo lối nước ra bờ. Ghi nhớ đường quay lại. | Theo lối nước ra bờ. | E05 complete, I available; chưa arrived |
| c1q_warm_stone / mq_06 | Spirit perception | Đá ở đầu dòng có một hơi ấm khác. | Có hơi ấm ở đầu dòng. | Gợi nhiệt, không Phượng unlock/origin reveal |
| c1q_arrival / mq_06 | System prompt | Đã tới bờ. Đường về Hải Uyên vẫn mở. | Đã ghi đường về Hải Uyên. | E06 arrival/return durable, Task24 staging sau |
| c1q_save_failed / Any | System prompt | Chưa thể lưu tiến trình. Hãy thử lưu lại trước khi rời đi. | Chưa thể lưu. Hãy thử lại. | Lỗi durable, không thay UI/runtime ở Task21 |

## Presentation và quyền điều khiển

Skip/rút ngắn chỉ bỏ lời/camera/FX, không cấp source evidence, accepted encounter outcome hoặc confirm hành động chưa làm. Replay từ committed facts dùng bản ngắn, không invoke grant path. Nếu dialogue bị ngắt, giữ progress/receipt đã durable, resume mục tiêu còn thiếu; cursor thoại tạm/optional không làm quest completion authority. Mất focus clear held input/pause transient; commit đang gửi phải reconcile receipt khi quay lại.

Player-facing quest titles lấy register S05, objective prompts có semantic action labels từ mapping runtime tương lai, không tự chốt phím. Caption/description cho âm, shape/icon cho color, chữ tương phản và reduced-motion static view. Nếu optional localization thiếu dùng approved fallback tiếng Việt ngắn, không raw ID/English debug vào sản phẩm; thiếu essential prompt/voice-capable actor binding là content gate, không bỏ requirement âm thầm. Nút skip không thay proof; UI tắt vẫn domain actions/evidence tồn tại theo adapter/accessibility đã duyệt.
