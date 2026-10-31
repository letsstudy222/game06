# Handoff art và animation ecology Hải Uyên

**PROPOSED E20-P11**, theo [B12 visual standards](../creatures/CREATURE_VISUAL_STANDARDS.md), [animation requirements](CREATURE_ANIMATION_REQUIREMENTS.md), [asset register](../ASSET_REFERENCE_REGISTER.md), [Quy art](QUY_ART_PRODUCTION_SPEC.md). Không tạo/edit artwork. Sáu reference labels giữ **EXTERNAL CONCEPT REFERENCE — NOT VERIFIED IN REPOSITORY**; không claim đã nhìn ảnh ngoài checkout.

## Coverage theo loại actor/body plan

| Species/category | Silhouette và directions | Idle / movement / interaction | Attack/hurt/defeat nếu relevant | FX / anchor / collision |
| --- | --- | --- | --- | --- |
| Quy | Rùa nước mai rõ/bốn chi/đầu rùa, all required logical directions theo Task18 | Idle/swim/turn/brake/context interact/awakening; không thay bằng atlas Phượng | Basic/short brace I/hurt/incapacity/Water release theo Q18/C14; no S2 sớm | FX tách thân, core projection/footprint/hurt/action shapes riêng, evolved envelope kiểm lại |
| Sứa candidate | Chuông là body mass, tua dưới/tỏa, direction/pose đủ cho pulse/turn chứ không auto human front/back | Co chuông–trôi–chỉnh hướng, retract/observe cue; không stationary polyp | Non-hostile scope không đòi attack; nếu self-defense author thì telegraph/contact/hurt/outcome có clip rõ | Glow mềm tắt được vẫn thấy bell; anchor core, tua visual vs hurt/contact explicit, current không làm kéo sprite rời core |
| Cá chép candidate | Thân thuôn, cuống đuôi/vây, left/right/up/down hoặc approved facing adapter | Swim tail cycle, turn, feed/stop/alarm, schooling split/regroup cue | Chỉ thêm hurt/defense khi damageable scope duyệt; không enemy attack default | Water trail optional, anchor core ổn định, fin envelope không body collider toàn rect |
| Hải Quỷ candidate | Đế bám/khối thấp/vành tua xòe, không copy bell sứa | Mở–khép theo source/current, phản ứng gần; không full swim cycle | Contact defense nếu authored phải warning; ambient-only không vô hình damage/defeat loot | Anchor substrate/contact cố định, collision tránh main corridor, effect/particle tách tua/core |
| Cá đuối candidate | Thân phẳng/mặt vây rộng/đuôi lái, khác cá chép khi black-fill | Lượn thấp, turn envelope, sand rest/warn/return | Territorial demo nếu approved cần windup/active/recovery/hurt/outcome, không full boss kit | Sand cue không hitbox, footprint/nav/hurt readable, vây không xuyên wall/receiver vì core nhỏ |
| Ốc candidate | Vỏ xoắn nhỏ + chân cơ, không mini Quy bốn vây | Crawl/feed/retract, direction/posture phản ánh gốc chân | Non-hostile baseline không bắt combat set; retract không immunity hoặc resource drop mới | Anchor foot/contact, visual shell vs footprint/hurt explicit, slow cycle không jitter theo current |
| Cá ngựa candidate | Thân đứng/đuôi bám/vây nhỏ, khoảng âm rõ | Anchor/hold/release/short swim, cautious/curious cue | Không attack baseline; help/distress feedback nếu interaction author | Contact/anchor branch refs ổn định, current tác động như profile, không teleport hoặc mất đuôi |
| Generic feeder/vi sinh/vegetation | Low-scope PROPOSED, không named approved species/collection | Feeder cluster mở–khép đủ observation, vi sinh/vegetation có thể scenery loop | Không attack/hurt/defeat mandatory nếu environmental scope không damageable | Source/receiver cue đọc khi FX off, substrate anchor; scenery không collision/HP authority ngầm |

Mỗi named reference cần approved concept/model sheet và anatomy review trước directions/clip production; mục tiêu two-stage của sứa/carp không phải đã có hai model/sprites. Không render recolor như stage mới. Mirror direction chỉ sau kiểm asymmetry/rãnh/tua/ánh sáng; frame rect/alpha/gutter/bounds/origin valid, no crop/mất chi và body-to-motion alignment ổn định. Dùng nearest-neighbor/integer render theo pipeline đã xác minh, không mandate cell96 hoặc FPS/frame counts cho wildlife.

## Phân biệt trạng thái production

| Mốc | Bằng chứng cần | Trạng thái hiện tại |
| --- | --- | --- |
| Concept design | Dossier/brief có source/status và shape language | Wildlife chỉ text hypothesis, không ảnh verified |
| Approved visual identity | Reference review/approval decision có provenance | Quy hướng chữ có, sáu concepts chưa được duyệt hình; không tự approve từ Task20 |
| Production sprite | Image/atlas/source-export thật, metadata/alpha/rects hợp lệ | Quy/wildlife Missing/Unverified trong review này |
| Validated animation | Playback các action/direction/interruption/anchor/geometry có evidence | Chưa thực hiện cho wildlife/Quy ở Task20 |
| Runtime-integrated asset | Controller/renderer/AI/scene/test evidence thực | Chưa có ecology runtime Hải Uyên; Phượng prototype không thay thế |

Manifest production hiện kiểm được Phượng atlas192×288/cell96 và directions/poses metadata; đây là inspection metadata/PNG header, không fresh image/playback hoặc certification đủ actions/stages. Không sheet external nào được giả là file local.

Minimum slice ưu tiên generic feeder recipe + Quy Stage I, không sản xuất cả sáu wildlife hoặc secondary player controllers trước test. Cần silhouette black-fill/grayscale/FX off/on/đồng cảnh so sứa–polyp, carp–ray, snail–Quy; head/pose/warning dễ đọc trên nền nước/tảo/ruins và màn nhỏ. Distress/charged không dùng palette evil hoặc strobe bắt buộc; cue static/caption thay âm/chuyển động. Device/performance/actor-density budgets cần đo sau, không chốt trong docs.
