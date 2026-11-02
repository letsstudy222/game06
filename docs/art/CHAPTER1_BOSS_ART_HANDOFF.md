# Handoff art/audio boss Hải Uyên

**PROPOSED B23-P02/P10/P12**, no artwork/atlas/clip/audio tạo hoặc sửa. [Candidate visual](../chapter1/CHAPTER1_BOSS_VISUAL_DESIGN.md), [B12 animation standard](CREATURE_ANIMATION_REQUIREMENTS.md), [asset register](../ASSET_REFERENCE_REGISTER.md), [world art](CHAPTER1_WORLD_ART_HANDOFF.md) giữ nguồn/pipeline/provenance. Chưa approved boss concept image trong checkout; Lam Giáp là text recommendation, không ảnh đã nhìn hoặc production files.

## Asset/readiness ladder

| Mốc | Evidence cần | Trạng thái boss Task23 |
| --- | --- | --- |
| Concept reference | Source image/sheet thật/provenance | Chưa verified boss reference, chỉ hai written candidates |
| Approved design | Explicit identity/anatomy/silhouette/palette decision | Chưa approve, role/profile S05 cũng vẫn proposal |
| Production sprite | Actual source/export/directions/rects/alpha/anchors | Missing, không filepath PNG mới được bịa |
| Validated atlas | Metadata/bounds/gutter/direction/marker và playback evidence | Chưa thực hiện boss atlas/playback checks |
| Runtime-integrated animation | Controller/action/renderer/source binding đúng, not just PNG | Chưa generic boss runtime integration |
| Gameplay-tested asset | Counterplay/timing/geometry/camera/latency/device QA evidence | Chưa test gameplay, mọi acceptance PLANNED |

Existing production manifest/PNG header xác minh Phoenix atlas192×288/cell96/two poses per three direction rows/right mirror; không boss reference, no proof six-action clips fully ready. Reuse nearest-neighbor/integer render/source/export discipline, không mandate boss96px/tile size/frame count hoặc scale enlarged creature. Dimensions/camera/room envelope cần blockout/approval trước final.

## Required body/action/FX/audio coverage

| Asset group / priority | Visual/action requirement | Markers/geometry/audio/readability |
| --- | --- | --- |
| Concept/silhouettes | Recommended crustacean guardian head/senses, two forearms+four support legs, segmented body/short abdomen, low side gaps khác Quy | Black-fill/grayscale/gameplay scale, correct limb roots/turns; no material⇒Metal/Earth assumption |
| Idle/observe/reposition | Ghì outlet/watch/turn/step, core anchor ổn định mọi facing cần | Displacement từ controller/coordinator, no renderer root motion lần hai; no idle implied invuln |
| Sweep | Anticipate open forearm→contact sweep→recover, target side/hurt cue | Aim lock/contact/recovery/interrupt markers, attack/hurt shapes không cả sprite; sound has arc/pose cue |
| Pressure | Vent charge/release/close/recovery, projectile separate | Finite line preview/endpoints/wall impact, LOS collision rule, audio pulse optional |
| Brace | Enter/finite hold/release/side hurt/scoped block, no perma tuck | Defense sector rõ, basic opening/biological joints visible; no second armor HP bar |
| PhaseII field/split | Set/hold/release/fade current band, split-charge/two release/return pose | Both locked lanes/gap/order distinct symbols, no particle cloud che body/telegraph, source budgets separate |
| Hurt/stagger | Accepted hurt/control và family recovery có pose khác recover bình thường | Không mọi hit gây full stagger, no refresh animation để bypass hit/action debt |
| Intro/phase cue | Brief in-engine reveal/control-ready, same anatomy qua phase | Skip/reducedmotion static view, no mandatory flash/pan/fade mất lane |
| Yield/resolved/recover | Nhượng thế/ceased block theo chosen outcome, later watch refuge | Clip end không event/reward writer; no mandatory death/explosion/creature capture asset |
| Environment/receiver/cover | Reuse ruin grooves/outlet/test interface/static breakwater kit và before/after attempt cues | Test overlay transient, no E05 global art state automatically, physical/cue revisions nhất quán |
| Audio/caption set | Arc scrape/vent/pulse/current/phase/recover cues optional sound | Mỗi cue có pose/shape/line/caption counterpart, no audio-only counter or copyrighted music assumption |

Actual clip IDs trong attack specs là conceptual actions, không existing filenames. Manifest cần assetId/stage-independent bossDefinitionRef/actorProfileRef/actionRef/facing/posture, source/export/provenance/approval, frame rect/dimensions/timing/loop/origin-basis/markers, visual envelope/core footprint/hurt/attack shape refs, FX/SFX and quality fallback refs. Six limb/head continuity qua all frames, no crop/opaque backing, gutter/alpha/atlas rect valid.

Body geometry, collision footprint, hurtbox, attack hitbox và FX bounds tách đúng C14/H19; không glow mở reach, no melee core nằm không tiếp cận được. Mirror chỉ sau anatomy/asymmetry/lighting review; head/forearms/vent/lane remain readable top-down candidate, production projection still gate. Large boss/enlarged optional Quy/camera edge/occluders cần clearance/silhouette tests. Required clip missing blocks action/encounter ready; fallback chỉ approved-compatible blocking/markers, no Phoenix/idle-as-invisible-attack.

Minimum prototype có approved anatomical stand-in/shape cues đủ fairness trước full sprite, không cần tạo mọi frame/phase/audio. Full core cần actual playback input/interrupt/hit/turn/phase/yield/retry, FX off/muted/reduced motion/small-screen/low-cost/device tests. Không frame/FPS/performance budgets hoặc “production-ready” claim trước đo. Mọi source rights/provenance còn cần xác minh, không fabricate author approvals.
