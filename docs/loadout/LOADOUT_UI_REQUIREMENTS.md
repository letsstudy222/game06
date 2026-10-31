# Loadout UI và cross-platform input — yêu cầu khái niệm

**PROPOSED L16-P12**, không mockup/UI/control edits. Current `src/island/InputManager.mjs`: WASD/arrows move, J/Space basic, K fire, Shift hover, E interact, H help, Esc menu; joystick/actions/touch đã có. Keyboard-first/browser runtime, mobile browser target và Windows packaging chưa verified production. Không gán final switch bindings.

## Thông tin và authority

| Information | Requirement / accessibility |
| --- | --- |
| Active creature | Slot1 display projection từ canonical activeFormId; silhouette/name/stage khi known, no independent active slot flag |
| Two reserves / empty | Slots2/3 projection stable relative ordering, empty có label không locked/error mặc định; không xếp lại khi HP đổi làm input target stale |
| Incapacitated/unavailable | Icon+text/reason riêng HP0/story/context/content; không color-only hoặc giả mất owned species |
| HP/durability | Theo selected approved model; HP16-B riêng forms nếu approve, chưa thêm shared survival bar giả |
| Skill cooldown | Current/remaining known cooldown, switch gate/recovery reason rõ; không UI timer tự reset owner |
| Element identity | E09/E10 refs single/dual, Life authority riêng; không rarity=power/dual=hai bodies |
| Boss lock | Giải thích **không đổi thành viên, vẫn đổi active trong bộ**; empty frozen cue, no “transform disabled” misleading label |
| New unlock | Added-to-collection feedback, không auto slot replacement/active switch; defer popup trong intense combat |
| Fail/pending switch | Requested target/queued/commit/cancel reason; không hiển thị target là active thật trước commit |

Adaptive concept: compact active+reserve indicators cạnh vùng HUD an toàn; detailed collection ngoài combat, collapsed không che telegraph. Portrait/landscape/small screens và safe areas cần readable touch targets/focus order; không overlay joystick/attack controls. Không khóa exact layout/pixel sizes/gesture/HUD skin, chưa mockup hoặc physical-device results. Reduced-FX/motion, shape+text+optional audio; popup không steal combat focus.

## Logical input contracts

| Adapter | Conceptual command / rule |
| --- | --- |
| Keyboard | Direct select equipped form hoặc next/previous theo approved remap; resolve formId+membershipRevision tại request; final keys sau conflict review |
| Gamepad | Direct/cycle/radial alternatives cần prototype; explicit confirm nếu menu, no stick movement accidentally switch; disconnect clear held state |
| Touch | Distinct reserve select target/confirm nếu chọn menu, không swipe vô tình trong joystick; pointer capture/multitouch identity; pointercancel không duplicate request |
| Collection navigation | Inspect vs equip vs select-active vs configure riêng commands; focus/labels/locked reasons; menu không bypass service validation |
| Combat focus | Blur/hidden clear held/buffer, C14 auto-pause proposal; no key held release causing phantom switch |
| Pause/resume | Simulation clock/cooldowns/status/windows freeze, no wall-time catch-up; current tx outcome theo committed boundary, fresh input sau resume |

Direct selection hợp readability hơn bắt high-frequency cycle; one-form self-select no-op, empty reject immediate. A failed request không tiêu quỹ/CD/HP; unconfirmed buffered request có expiry, stale gesture không select slot occupant mới. Existing focus handling clear input/hidden skip updates không chứng minh auto-pause blur đã có. Physical layout/remap/haptics/pause policy L16-U10 còn mở. Không viết handlers trong Task16.
