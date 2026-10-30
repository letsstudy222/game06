# Task08 changelog — Master GDD và Phase I review

Baseline `7125160`; working tree sạch trước chỉnh. Scope documentation-only. **Audit completion PASS; Phase I production design freeze PARTIAL.** Không tự bắt đầu Task09 — Elemental System Design.

## Files created

- [GAME_DESIGN_DOCUMENT.md](GAME_DESIGN_DOCUMENT.md):14 phần summary và references, không chép toàn source.
- [PHASE_I_COMPLETION_AUDIT.md](PHASE_I_COMPLETION_AUDIT.md):Tasks01–08 matrix,75 source docs +9 historical evidence, equivalents/missing và exit gates.
- [DESIGN_CONSISTENCY_REPORT.md](DESIGN_CONSISTENCY_REPORT.md):17 conflict/gap/risk records,10 cross-system relationships, status/severity/corrections/approval.
- [IMPLEMENTATION_READINESS.md](IMPLEMENTATION_READINESS.md):READY/CONDITIONAL/BLOCKED theo intended task, tách software state và testability.
- [DESIGN_DEPENDENCY_MAP.md](DESIGN_DEPENDENCY_MAP.md):design/production dependencies, entity crosswalk và small-release sequence.
- [PHASE_I_HANDOFF.md](PHASE_I_HANDOFF.md):read order, sources/guards, Task09 preparation và playable implementation gate.
- TASK08_CHANGELOG.md: tệp này.

## Files modified

- [PROJECT_DECISIONS.md](PROJECT_DECISIONS.md):source priority/4 statuses; giữ D01–D37, cập nhật D18 bằng explicit D38; thêm D39/D40 baseline requirements, metadata40D +15A08 +79inherited proposals/unresolved +H08-S01 approved supersession history.
- [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md):Q11 foreign baseline hiện tại, grouped decision queue và gates, không tự trả lời pending choices.
- [ASSET_REFERENCE_REGISTER.md](ASSET_REFERENCE_REGISTER.md):mở rộng readiness thay requested ASSET_READINESS_REGISTER.md; actual PNG inventory/dimensions/classifications/limits/gaps.
- [PROJECT_SCOPE.md](PROJECT_SCOPE.md):first playable essentials D40, complete ChapterI/later/optional và dependencies, không quota/playtime mới.
- [GAME_VISION.md](GAME_VISION.md), [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md), [README](../README.md):entrypoints/status/mapping sau Task08.
- [ELEMENTAL_COSMOLOGY.md](lore/ELEMENTAL_COSMOLOGY.md):Lôi/Kim confirmed baseline theo Task08 §5; detailed models/roster còn mở.
- [CHAPTER_02_PHUONG.md](story/CHAPTER_02_PHUONG.md):không còn nói Kim chưa thuộc canon baseline; Fire–Metal species/habitat vẫn proposal.
- [LORE_CHANGELOG.md](lore/LORE_CHANGELOG.md):provenance status change và phân biệt historical D18-candidate, accepted ending supersession.

Tổng 7 tệp mới +10 tệp cập nhật =17 Markdown files. Không xóa tài liệu cũ. 10 required deliverables map7new+3existing: decisions/questions/asset register; các source/index updates khác bảo toàn liên tục. Không tạo ASSET_READINESS_REGISTER cạnh tranh, không coi literal filename thiếu là đã đọc.

## Material decisions và disposition

- C08-01 full-three boss vs early-empty giữ UNRESOLVED; khuyến nghị chưa là approval.
- D38 xác nhận foreign Lôi/Kim vì Task08 explicit, không vì proposal lặp. D39 data-driven mandatory và D40 first-playable essentials cũng từ request mới; không engine/storage/balance approval.
- B+C, HP0/reload, energy, thresholds, catch-up, factions, bosses/endings, world owner/storage và art mapping đều còn proposal/decision gates.
- Phase I PARTIAL: baseline confirmed được bảo tồn và candidate source set indexed, chưa approved production freeze. Task09 design và read-only repo audit có thể được giao; full playable production còn P0 dependencies.

## Verification evidence và giới hạn

Đã đọc inventory toàn corpus84 docs baseline + README entrypoint, review sections được liệt kê trong completion audit; đối chiếu actual src/manifests/package/workflow và prompt required docs. Đã xem trực tiếp Phoenix reference/atlas và Dawn terrain/objects; kiểm PNG headers/manifest/alpha/rects read-only.

`npm test` thực chạy:19 island +5UI +6sample =30PASS,0fail/skip. Đây là current baseline tests, không future resonance/quests/world save tests. Python/Pillow structural asset checks pass cho three runtime manifests; không fresh animation/browser playback/real-device/Windows run. Không build lại art hoặc chạy pipeline thay ảnh.

Document checks gồm paths/relative links/anchors, Markdown table/fences, required GDD sections, task inventory coverage/equivalent mappings, decision ID metadata/status/refs, 12stage/24ability/8env/6pair coverage, 24main event IDs/prerequisite DAG/main optional exclusion/awakening bootstrap guards và 20scenario fields. Manual review semantic/canon/approved-art limits/recovery/collection risks không được giả thành automated runtime pass. Kết quả cụ thể được ghi sau validation; nếu còn lỗi sẽ sửa trong scope docs trước commit.

Final diff phải chỉ README/docs .md, giữ all application code/UI/maps/scene/art/tests/config/lockfile nguyên baseline. Push/CI success được báo riêng sau commit; workflow hiện hữu chỉ kiểm/deploy Dawn, docs xem qua GitHub Markdown vì build-site không đóng docs.

## Validation result — thực chạy Task08

PASS:92 Markdown files hiện tại (91 docs +README),704 local links hợp lệ; không có anchor fragment cần kiểm. Đủ14 GDD sections,84 baseline inventory rows (75 primary +9 historical),10 required deliverables với equivalent asset register,17 Markdown-only changes. Registry có40 D records đầy metadata,15 A08 focused choices,79 inherited proposal/unresolved IDs và1 SUPERSEDED history. Source checks:12stage IDs,24abilities/8env,6synergy pairs;24story IDs/prerequisites/source projections acyclic, E23 đủ4stable sources, no optional main gate;16phase rows,26R03/18S05/20F06 edge-case records và20WST×6fields. `git diff --check` sạch.

| Validation yêu cầu | Kết quả / phương pháp / limitation |
| --- | --- |
| 1 Missing documents | PASS inventory/equivalent mapping; không thiếu required content file, missing production assets/decisions ghi riêng |
| 2 Relative links | PASS704 links; actual paths resolve; no fragment anchors để giả pass |
| 3 Incorrect file refs | PASS actual source/asset paths;5 requested aliases không có literal file được map rõ, không nhận đã đọc |
| 4 Duplicate definitions | Manual authority review + unique registry IDs; GDD/index không là stores/core rule khác; C08-15 schema crosswalk vẫn cần audit |
| 5 Element names | Manual four native/Lôi-Kim foreign/Life authority cross-check; D38 update explicit, chronology C08-17 còn mở |
| 6 Creature identity | Manual four species/stage/visual role review; Long elongated, Ly guardian/Wood/Life, Phoenix giữ reference |
| 7 Chapter ordering | PASS source event order và four chapter matrices; no Dawn=Nhật Diệm retcon |
| 8 Unapproved mechanics | Registry status checks + semantic review; B+C/defeat/cost/thresholds/factions/storage vẫn PROPOSED/UNRESOLVED |
| 9 Decision references | D01–40, A08-01–15, inherited79 ID index/source coverage; no accepted approval fabricated |
| 10 Asset claims | Actual29 PNG header inventory,4 images viewed,manifest/alpha/rect tests; full new action/stage animations chưa validated |
| 11 Impossible dependencies | PASS main DAG/predecessors, awakening/body bootstrap guards, route available/arrived split; physics chưa prototype |
| 12 Progression contradictions | **OPEN C08-01** full-three vs early-empty; evolution/XP/catch-up parameter gaps explicit, không giả resolved |
| 13 Collection softlocks | Manual refuge/undiscovered/return rules review; actual roster/habitat proof missing C08-07, không claim runtime guarantee |
| 14 Save ambiguity | W07 owner/derived/atomic spec rõ hơn; adapter/schema/combined writer chưa approved/implemented, C08-06/15 và A08-09/11 |
| 15 Design vs implementation | Manual source/readiness review: current Dawn only;30baseline tests không chứng minh future features; first playable Quy còn blocked production |

Audit validators chạy ngoài repository, không thêm code/tests vào deliverables. Các row OPEN/limitation là kết quả có chủ đích, không bị gọi toàn bộ game design/runtime đã PASS.
