# Availability, pre/post restoration và lifecycle

**PROPOSED S22-P09**, extends [Q21 state model](CHAPTER1_QUEST_WORLD_STATES.md)/[W07 prior proof](../world/QUEST_WORLD_STATE_RULES.md), không independent side engine/store. E05 phase/outcome là source authority, không saved beforeAfter enum riêng mỗi quest.

| Quest/activity | Before E05 / khi có prerequisite | After E05 / availability type | Replay/abandon/recovery |
| --- | --- | --- | --- |
| opt_c1_quiet_refuge | E01→B, disturbed/local safe nguồn đều có khảo cứu hợp lệ | Adapted Variant: nếu dòng đã safe, inspect/verify/provenance thay sửa; no recreate harm | Knowledge/source first-clear one, setting/progress giữ; defer nếu source/route/content thiếu |
| opt_01_reef_observation | E02→B/D, source behavior valid | Persistent Availability + approved secondary source; prior evidence đủ được công nhận | Same legacy claim, no active-source reroll/rare RNG-only; postpone không main fail |
| opt_02_ancestral_echo | E03→E optional source | Persistent Availability/archival equivalent source same memory ID, không cần source sống nếu chỉ memory | Replay no reward, missed-before-boss không lost forever; prior memory proof query |
| opt_c1_current_return | E02→C weak local loop | Adapted Variant/Retrospective: already-clear panel thì verify route và return, không re-close để mở | Practice feedback no new reward, envelope/return invalid thì suspend/recover |
| act_c1_anchor_trace | E01→D/B source compatible | Source/pose đổi theo ecology, observe equivalent được author | Read-only cue, no capture promise; actors unverified không production-ready |
| act_c1_reef_landmark | E01→B | Landmark cùng identity, visibility/cue safe | Feedback lặp không newXP/note spam |
| act_c1_return_check | Chưa available trước E05; có thể thấy clue không activate | After E05 Available: inspect trạng thái hiện tại/dấu cũ, không missing-before event penalty | No double E05 reward, explicit optional feedback |
| act_c1_deep_lane | E03 + advanced cap/route, expansion only | Còn pressure/visibility risk, source không main unique | Đủ current stage/geometry mới activate, safe retreat; no dynamic TTL trap |
| opt_c1_refuge_watch | E03 + approved source/encounter, expansion | Nếu threat/stress không còn: retrospective evidence/habitat protection verification theo approved alternative, không tự spawn new aggressor | No kill-only gate; nếu chưa có approved equivalent thì content pending, không permanently fail |
| opt_03_resonance_study | E08 prerequisite ở chương sau, không early available | Hải Uyên return source chỉ sau author/cap/coverage, same acquisition requirements | Source tạm unavailable không xóa proofs, repeat claim frozen, no version form grant |

Không chọn **Deliberately Missable Minor Event** cho portfolio này. Nếu author sau muốn một scene thoáng qua, cần explicit approval/cue/justification và không core collection/progression/unique memory reward; hiện không dùng giả định đó để xóa nguồn.

## Derived lifecycle — reuse existing quest record

| State/view | Entry/transitions | Persistent vs derived | Feedback/reload/recovery |
| --- | --- | --- | --- |
| HIDDEN | Source chưa biết hoặc chưa có authorized clue, →DISCOVERABLE khi có môi trường/cue hợp lệ | Derived từ discovery eligibility, no hidden bool cạnh event | Không giant marker; near landmark/hint shape đủ, no obscure exact-pixel trigger |
| DISCOVERABLE | Clue ở world nhưng prerequisite/cap chưa đủ hoặc source chưa inspected; →AVAILABLE khi eligible và known | Existing knowledge/quest discovery proof chỉ lưu nếu needed, no extra side store | Có clue/requirement thật, không auto ACTIVE hay false reward; prior eligible proof vẫn query sau đủ prereq |
| AVAILABLE | Source và prerequisites đủ, có thể chọn khảo cứu; →ACTIVE hoặc COMPLETED nếu source outcome đã durable | Acceptance/selected objective ở existing Q21 record nếu policy cần, not completion | Postpone tự do, return khi safe; UI markers off không disable source command |
| ACTIVE | Objective proofs được ghi; partial vẫn ACTIVE, →READY_TO_COMPLETE transient view khi source candidate hợp lệ | Existing evidence/acceptance owners, không saved partial count thay proof | Rõ objective còn thiếu, source moved query viable equivalent; closed prompt không complete |
| READY_TO_COMPLETE (shared Q21 view) | Preconditions/proofs/confirm đủ, →COMPLETED sau durable ack hoặc ACTIVE khi revalidate fail | Không independent ready flag, same Q21 candidate policy | Đang lưu không báo done; retry same source/operation, reconcile ack |
| COMPLETED | Canonical optional outcome/proof durable, no normal uncomplete | Event/source completion ref, QuestCompletionProjection chỉ view | Replay/revisit/retrospective line no grant lại, final proof giữ qua E05/E06 |
| TEMPORARILY_UNAVAILABLE overlay | Content/source/cap/storage/unsafe lock context thiếu, áp trên quest chưa done; resume recompute | Reason derived/pending intent nếu schema cần, không permanent FAILED | Safe return/approved source fallback, unknown ref keep last-good/backup, no auto complete |
| OBJECTIVE_PARTIAL overlay | Một phần proof hợp lệ, không state store riêng | Read evidence owners | Credit eligible action sớm, không bắt accept trước nếu source rule không yêu cầu |

Projection precedence COMPLETED từ source thắng cache/variant; hidden/discoverability/availability đọc main progress/cap/known source; unsupported content thì pending, không default quest available. Leaving/abandon không xóa earned proof/claim/main facts; temporary challenge attempt reset theo policy, không reset unique completion/reward. No permanent side failure được ban hành.

Early puzzle/observation/memory/defense outcome được query theo canonical source/target/evidence **đã eligible** và revalidate khi quest discovered/available. Không “đã thấy cánh cửa mở” tự credit repair bất kỳ, không source mới bằng title/version. Destroyed/altered receiver có approved evidence/alias/retrospective alternative; thiếu mapping thì pending/recovery, không spawn clone quest NPC/living source giả. PostE05 full coverage và E06 return vẫn H19/E20 obligations, không side quest completion gate đảo chiều vào main.
