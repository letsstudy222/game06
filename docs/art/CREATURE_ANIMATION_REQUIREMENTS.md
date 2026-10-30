# Yêu cầu animation sinh vật và technical hand off

**PROPOSED B12-P09**. [Task12 decisions](../creatures/TASK12_DECISIONS.md), [production tiers](../creatures/CREATURE_PRODUCTION_TIERS.md), [C04 animation/gaps](../creatures/SACRED_ART_REQUIREMENTS.md) giữ scope. Tài liệu này là standard chung, không copy 12 stage gap registry hoặc thêm animation files.

## Personality qua chuyển động

| Tendency | Pose/rhythm đề xuất | Constraint |
| --- | --- | --- |
| Curiosity | Hướng đầu/phần phụ tới stimulus, bước nhỏ có pause | Không toàn tri/biết reserve hoặc đủinfoinstant |
| Caution | Kiểm hướng/giữ support, stop trước nguồn lạ | Không identical nervousbounce mọi species |
| Territorial aggression | Tư thế mở boundary + warning trước approach | Boundary/local context rõ, không element evil |
| Predatory focus | Core hướng mồi, co chuẩn bị/commit/recovery | Không perma chase/map wide target |
| Calmness | Nhịp thở/pulse ổn định, tiết kiệm chuyển động | Idle không cứng/mất giải phẫu hoặc luôn nhận invulnerability |
| Playfulness | Reposition nhỏ/nhịp thử nguồn an toàn | Không random motion che telegraph/đẩy khỏi nav safe |
| Ancient intelligence | Dừng có chủ đích, nhìn/source alignment có nhịp | Không tự independent Sacred dialogue hoặc knowledge full origin |
| Elemental instability | Lệch nhịp nguồn–cơ quan/động tác bị ngắt có lý do | Không purple evil/strobe all time hoặc mọi dual bị corrupt |

## Action coverage theo scope

| Action | Contract để author/test | Requirement scope |
| --- | --- | --- |
| Idle | Breathing/pulse/contact theo giải phẫu, loopseam giữ anchor | Mọi render ed organism có presentation phù hợp; static ambient có thể static thiết kế explicit |
| Movement | Main cycles/momentum/foot vây contact, terrain transition | Chỉ các vận động thực dùng, không bắt every 12 classes |
| Turning | Hướng đầu/core/chi continuity, mirror đánh giá | Moving/aiming actors có change heading, không auto mirror asymmetry |
| Attack | Anticipation→contact→recovery, target/hit markers | Chỉ combat actors, no attack clip cho ambient không attack |
| Skill activation | Charge/nguồn/phase/cancel markers và finite FX | Chỉ assigned skills, combined E10 joint release policy vẫn pending |
| Hurt | Readable reaction/status hoặc compatible no-flinch response | Damageable actors, không boss mọi hitbắtflinch |
| Defeat | Incapacitation/outcome có scope, no universal death/resurrection | Combat/unique outcome cần, R03 recovery chưa auto đã duyệt |
| Environmental action | Contact đúng receiver/nguồn/anchor và failure cue | Species/actor có assigned interaction, W07 event authority |
| Transformation/evolution | Source/target/stage art continuity, safe commit boundaries | Playable/stages có actual transition được duyệt; ambient không bắt |

## Animation definition hand off

Fields conceptual: actionId/stage Ref/direction/posture, actual image Ref/frame Rects, frame Dimensions, origin/anchorbasis+explicit off sets, giải phẫu revision, per-frame/segment timing, loop/interruption policy, anticipation/contact/recovery markers, root motion policy, visual envelope/core footprint/hurt/attack shape refs, FX/SFX/nguồn refs, phê duyệt/version/provenance. Missing required clip blocks runtime-ready, optional action có thể defer; fallback chỉ khi compatible giải phẫu/markers/geometry/counterplay được đã duyệt, không idle-as-in visible attack.

Số frames/timing không fixed mọi species; approvedpixelclusters/giải phẫu quan trọng hơn frames nhiều. Mirror direction chỉ với hand/đuôi/weapon asymmetry đánh giá, origins correct; pixel sampling nearest/integer, cơ thể alpha không rectangle. Atlas rect in bounds/no bleed/gutter/crop, origin ổn định qua move/hurt; FX tách body và không mở hurtbox theo bloom. Footprint/hurtbox/envelope/segment ed Long solution **PROPOSED C04-P07**, cần actual prototype, không assert engine đã hỗtrợ.

## Validation plan — chưa playback tests Task12

Read metadata/dimensions/alpha/bounds, compare anatomy từng frame/direction; playback loop/switch/interrupt/turn/attack/hurt/action transition trong scene thật, nguồn release khớp geometry/marker, ground shadow không bob foot anchor. Xem small gameplay display + bright/dark/busybackground, FXon/off, occlusion/culling/large form turn/narrow passage. Báo riêng emulator/physical device, không final FPS/device budget. Default combat body/status/cost/save boundary theo R03/E09/E10 proposals, không animation cue quyết reward/world event.

Phoenix hiện hữu được xem static trong Task12 và đọc nguồn: 192×288,96 cell,2 poses×3 rows, right mirror; AnimationController6states phối pose qua IslandScene. Chưa fresh browser playback hoặc chấp nhận đủ full clips/stages. Không overwrite assets để đạt standard trong Task12.
