# Gói lời văn và cinematic control finale — nháp

**PROPOSED F24-P09**, c1finale_* là unique dialogue/content refs mới, không quest/event/memory IDs. Reuse eligible facts/roles từ Q21/B23, không overwrite opening_*/c1q_*/c1sq_*/c1boss_* hoặc approve spoken voice. Quy dùng spirit perception/pose, không independent ordinary human dialogue.

| dialogueId | Channel / text tiếng Việt | Short/replay | Trigger/guard |
| --- | --- | --- | --- |
| c1finale_boss_yield | Environmental text — “Thế ghì đã hạ. Khoảng nước phía trước không còn bị ngăn.” | “Đường thử tải không còn bị ngăn.” | Accepted E04 disposition, no death/cure claim |
| c1finale_permission | Quest update — “Có thể thử vận hành đường hồi.” | “Kiểm tra đường hồi.” | E04 durable và close/context safe; không E05 |
| c1finale_mechanism | Environmental text — “Hai rãnh nằm cạnh nhau. Nước cần cả đường đi lẫn đường trở lại.” | “Có một đường để trở lại.” | Player inspect source G, CL02 physical clue |
| c1finale_read_flow | UI prompt — “Nhìn hướng nước và kiểm tra nơi thoát trước khi chạm cơ cấu.” | “Kiểm nguồn và đường thoát.” | Source/capability valid, no spell/iframe mandatory |
| c1finale_operate | UI prompt — “Điều chỉnh nhánh nước đã được khảo cứu.” | “Điều chỉnh nhánh nước.” | Context interaction theo mapping, no finalized key |
| c1finale_test | Cutscene caption — “Một nhịp nước chạm vào rãnh hồi.” | “Rãnh hồi đã đáp.” | Test feedback only, no global stable fact từ FX |
| c1finale_verify | Quest update — “Kiểm lại buồng thức, rạn và các lối vào nơi trú.” | “Kiểm lại rạn và nơi trú.” | Missing verification step, route cũ accessible |
| c1finale_refuge | Environmental text — “Dòng đi qua. Những khoảng trú vẫn còn.” | “Nơi trú vẫn tiếp cận được.” | Actual accepted check/evidence, no all harmless |
| c1finale_keeper | Dialogue proposal / npc_tide_keeper — “Hãy giữ cho nước còn đường trở về.” | “Đừng quên đường trở về.” | Chỉ spoken nếu cognition/voice được duyệt; default pose/caption tương đương, no source authority |
| c1finale_confirm | UI choice — “Xác nhận vòng nước / Kiểm tra thêm” | “Xác nhận / Kiểm tra thêm” | Required predicates đủ, command validate before commit |
| c1finale_wait_save | UI feedback — “Đang ghi nhận kết quả.” | “Đang ghi nhận.” | Pending writer, không báo đã lưu trước ack |
| c1finale_water_result | Environmental text — “Nước tìm lại đường hồi. Ánh sáng trở lại từng khoảng, không phủ kín mọi nơi.” | “Dòng hồi đã có nhịp.” | E05 durable projection, no visual-before-commit permanent claim |
| c1finale_quy_response | Spirit perception — “Nhẹ hơn… mà không mất đi điểm tựa.” | “Dòng nước không còn kéo lệch.” | Quiet accepted placement, không fullheal/evolution |
| c1finale_memory_reprise | Ancestral echo reprise — “Giữ một dòng… không phải giữ tất cả đứng yên.” | “Một dòng vẫn còn lối về.” | Earned mem_quy_current reprise/approved interpretation caption, no new MemoryRecord/grant |
| c1finale_unknown | Spirit perception — “Phần còn lại vẫn mờ. Chỉ đường nước này đã đáp.” | “Chỉ một phần đã rõ.” | No origin/cause/chronology/fullSacred relation reveal |
| c1finale_chapter_complete | UI message — “Vực Hải Uyên — Vòng nước chính đã được khôi phục.” | “Đã hoàn tất tuyến chính Vực Hải Uyên.” | D from valid E05, no dialogueEnd event/new reward |
| c1finale_route | Quest update — “Một lối nước ra bờ đã có thể đi tiếp.” | “Lối ra bờ đã mở.” | E05 route available, chưa E06 arrived/return alias |
| c1finale_warmth | Environmental text — “Ở cuối dòng, đá giữ một hơi ấm khác.” | “Có hơi ấm ở đầu dòng xa.” | I/shore clue, không mem_phuong_cutback/E08 body reveal |
| c1finale_stay_choice | UI choice — “Khám phá tiếp / Theo lối nước ra bờ” | “Ở lại / Đi tiếp” | No forced teleport, optional quest state giữ |
| c1finale_return_hint | Quest update — “Rạn, di tích và những nơi trú vẫn có thể trở lại.” | “Có thể quay lại Hải Uyên.” | Intended routes/context true, no hidden completionist gate |
| c1finale_arrival | Cutscene caption — “Nước nông dần dưới mép đá nguội.” | “Bờ đá đã ở gần.” | E06 traversal presentation, caption alone no arrival commit |
| c1finale_return_recorded | UI feedback — “Đã tới bờ và ghi nhận đường về Hải Uyên.” | “Đường về Hải Uyên vẫn mở.” | E06 arrival/return durable only |
| c1finale_next | Quest update — “Ấm dưới đá nguội: khảo sát dấu nhiệt ở bờ.” | “Khảo sát dấu nhiệt ở bờ.” | Context mq_07 after E06, không E07/E08 complete |
| c1finale_save_failed | UI feedback — “Chưa thể lưu kết quả. Hãy thử lưu lại trước khi rời đi.” | “Chưa thể lưu. Hãy thử lại.” | Storage ack failure, no false completed/saved/arrived |
| c1finale_travel_retry | UI feedback — “Chưa thể đi tiếp. Hãy thử lại khi đã sẵn sàng.” | “Chưa thể đi tiếp. Hãy thử lại.” | Hold valid source on travel/content/save failure, no raw debug/asset path UI |

## Playable/cinematic/input contract

| Beat group | Control / presentation | Skip/lock/focus/load |
| --- | --- | --- |
| Boss aftermath | B23 control/lock-close rule, brief yield cue | Skip FX không skip outcome/close; inflight commit reconcile, no player edit lách lock |
| G survey/operate/test | Fully playable/context overlay, camera stable thấy source/outlet | Không extended forced movie; input accept theo action gates, pause/help/remap access |
| A/B verification | Fully playable chọn order/route, cues source đủ | Close prompt không proof; prior eligible proof/query valid, no enter-only softlock |
| E05 confirm/commit | Explicit confirm, atomic section ngắn bảo vệ mutation/placement | Commit không phải video “skip”; defer unsafe action/input, no báo thành công trước ack; storage error retry same source |
| Payoff/echo/chapter message | Short camera/static tableau/caption/reprise optional | Skip/reduced motion dựng final snapshot/short recap, C/D/route vẫn committed; no extra chapter gate |
| Stay/route/travel | Player chọn ở lại/đi, source-safe traversal + brief arrival view | Cross-chapter pre/postcommit recovery [travel contract](CHAPTER1_CROSS_CHAPTER_TRAVEL.md), no forced load scene from movieEnd |

Blur/visibility clears held input và pause transient clocks/camera, no offline current/heal/interaction completion. Inflight durable write có thể hoàn tất; khi focus lại lookup receipt trước new command, không replay grant. Interrupted animation/callback thiếu không block source status hoặc double-apply patches; visible gameplay state reconstruct từ committed facts. Audio-off/color-vision/reducedFX/reduced-motion có pose/shape/nét/caption/contrast, no large flash/pan bắt buộc. Optional localization thiếu dùng approved short fallback, essential cue missing = content gate; không raw IDs/technical implementation details vào game-facing text.
