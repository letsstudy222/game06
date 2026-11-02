# Bộ ba dạng và chuyển dạng — Task16

Ngày 31/10/2026 Asia/Saigon; HEAD `5ad5678d1fc8b991c0a35d1ffd80f3e816e8624d`, branch `work`; có Task14/15 docs chưa commit, được bảo tồn. Documentation/system design only. [Decisions](TASK16_DECISIONS.md) giữ authority/status; [audit](TASK16_CONSISTENCY_AUDIT.md) giữ sources/delivery/local checks. Mọi mechanics mới là **PROPOSED**, kể cả câu quy phạm mô tả hợp đồng. Task16 kết thúc dải thiết kế PhaseII Tasks09–16, **không** chứng nhận PhaseII audited/complete hoặc implementation-ready; không Task17/full PhaseII audit.

## Baseline đã xác nhận

D02/D05/D06/D07 và Task16§2: người chơi là Tinh Linh cổ, mở playable forms qua resonance, collection có thể lớn hơn loadout; ba slot tối đa, một active/hai reserve; một thân vật lý điều khiển tại một thời điểm. Boss khóa **membership**, không cấm switch trong selected set. Species XP/level/skills/evolution/mastery độc lập slot. D39 yêu cầu thêm loài qua definitions/reusable modules, không core rewrite.

D41 đã xác nhận không mandatory three-member/three-element early gate. Task16§3 yêu cầu giữ minimum-one và detailed early boss-entry policy ở PROPOSED/UNRESOLVED. Hai phạm vi được tách tại [entry decision record](BOSS_ENTRY_AND_RETRY.md): không tự hạ D41 hoặc nâng cả one-form entry/snapshot/retry package thành confirmed.

## Authority và một nguồn dữ liệu

[TRANSFORMATION_DESIGN](../gameplay/TRANSFORMATION_DESIGN.md) và [R03 data](../technical/RESONANCE_DATA_MODEL.md) vẫn nguồn loadout/transform/lock gốc. Task16 chuẩn hóa detailed contracts/views dưới chúng, không tạo loadout thứ hai. [V13](../evolution/EVOLUTION_AND_LOADOUT.md), [C14](../combat/FORM_SWITCHING_COMBAT.md), [P15](../technical/PROGRESSION_DATA_SPEC.md), [W07](../technical/PERSISTENT_WORLD_DATA_SPEC.md) giữ stage/combat/progression/save owners. Chi tiết B+C/HP/stability/phase timings/recovery/status scopes chưa approval.

L16-P01: canonical `EquippedFormLoadout` có đúng ba member positions chứa formId hoặc empty, một `activeFormId`, membershipRevision và order refs. **Slot1 active, Slot2/3 reserve là display projection**; canonical member position không bị rotate khi active đổi. UI đọc active rồi ordered other members/empty; không save independent activeSlotIndex hoặc activeForm copy. Direct switch đổi activeFormId qua transaction, không đổi membershipRevision. Canonical reorder là management operation riêng; boss giữ cả empty positions/frozen order theo proposal, display roles vẫn đổi theo active.

## Giới hạn thiết kế và synergy

[Management](LOADOUT_MANAGEMENT.md) tách equip/remove/reorder/select/configure. [Switch](FORM_SWITCHING_RULES.md) short transaction+bounded buffer, không attack-cancel/free heal/i-frame. [Ownership](FORM_STATE_OWNERSHIP.md) giữ HP/CD/status/projectile attribution, không bodies reserve ngoài world. [Boss](BOSS_LOADOUT_LOCK.md) lock ở service/writer, không chỉ UI; [persistence](../technical/LOADOUT_DATA_SPEC.md) one writer/canonical refs.

Defender+Striker+Support, Controller+Ranged với mobility tag, Specialist+Generalist+Defense chỉ là compositions minh họa; không fixed class quota/ba roles/ba elements. Mobility Specialist theo K11 là specialization tag, không taxonomy role mới. Specialization giữ reliability/niche, versatility đổi lấy setup/commit/cost và finite effects, không ba full kits cộng passives. Single/dual đều có trade-offs E09/E10, dual một form không hai XP recipients. Một/hai forms vẫn có authored main-route counterplay và exploration rewards; chiến thuật là timing/position/source knowledge, không swap nhanh nhất.

Runtime actual: Canvas2D/ES modules, PlayerPhoenix và hardcoded attack/fire/HP/respawn; chưa generic collection/loadout/switch/boss-lock durable save. [Quy-first milestone](FIRST_PLAYABLE_LOADOUT.md) thử một form+hai empty, không cần boss hoặc species production thứ hai. D40 resonance/underwater/combat/persistent progress vẫn là yêu cầu full first playable, không bị một loadout demo thay thế.
