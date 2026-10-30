# Combat role taxonomy

**Task11 — PROPOSED:** đặc tả để review, không gameplay đã triển khai hoặc approval mới cho mechanics. Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. [Task11 decisions](TASK11_DECISIONS.md) và [central register](../PROJECT_DECISIONS.md) giữ trạng thái.

## Sáu roles và specialization tags — K11-P04

Giữ Bruiser, Defender, Striker, Ranged Attacker, Controller, Support. Healer gộp thành specialization `healing` của Support, không đồng nghĩa mọi Support chữa lành; Mobility Specialist dùng tag `mobility` bổ sung bất kỳ role có evidence, tránh vai trùng mọi form có dash. Đây là taxonomy đề xuất, không ép mỗi loài đủ role/skill slots. `none` hợp lệ cho organism không combat. Hybrid primary/secondary mô tả trọng tâm kit, khác ordered elemental identity và không có stat bonus.

## `role_bruiser` — Bruiser

| Field | Contract |
| --- | --- |
| Tactical purpose | Giữ áp lực gần qua trao đổi đòn/chọn vị trí |
| Strengths | Bền vừa và phản công ổn định |
| Weaknesses | Khó chase/range xa, recovery hở |
| Movement | Bước chắc/đoạn lao có commit |
| Skill archetypes | Short combo/brace-counter/pressure |
| Loadout contribution | Đảm nhận tiếp xúc khi reserve có niche |
| Synergy | Controller tạo góc, Ranged dùng khoảng trống |
| Balance risks | Không vừa defender tối đa vừa striker burst tối đa |

## `role_defender` — Defender

| Field | Contract |
| --- | --- |
| Tactical purpose | Giữ sector/điểm tựa bảo vệ đường hành động |
| Strengths | Guard và chống đẩy có điều kiện |
| Weaknesses | Flank/source/cost/recovery |
| Movement | Brace giảm tự do di chuyển |
| Skill archetypes | Directional guard/intercept/stance |
| Loadout contribution | Safe response, không body chặn của reserve |
| Synergy | Striker tận dụng window, Support giữ vị trí |
| Balance risks | Shield stacking/zero-risk guard hoặc passive reserve |

## `role_striker` — Striker

| Field | Contract |
| --- | --- |
| Tactical purpose | Punish nhanh ở đúng window |
| Strengths | Burst/precision tại góc phù hợp |
| Weaknesses | Rủi ro commit/miss, không sustained mọi lúc |
| Movement | Tiếp cận/rút cần route |
| Skill archetypes | Dash strike/weakpoint hit/finisher |
| Loadout contribution | Đổi vào để khai thác setup còn hiệu lực |
| Synergy | Controller mở window, Defender chịu nhịp trước |
| Balance risks | Infinite i-frame/cancel cooldown hoặc instant kill |

## `role_ranged` — Ranged Attacker

| Field | Contract |
| --- | --- |
| Tactical purpose | Gây áp lực có ngắm từ khoảng cách |
| Strengths | Range/line selection |
| Weaknesses | LOS/cover/charge time/close pressure |
| Movement | Kiting có giới hạn không chạy-bắn miễn phí |
| Skill archetypes | Projectile/aimed line/placed shot |
| Loadout contribution | Phương án khi khó tiếp xúc trực tiếp |
| Synergy | Mobility tag đổi góc, Defender tạo khoảng |
| Balance risks | Offscreen unavoidable hit hoặc safe DPS mọi target |

## `role_controller` — Controller

| Field | Contract |
| --- | --- |
| Tactical purpose | Điều chỉnh không gian/nhịp hành động |
| Strengths | Zone/slow/root/displacement có nguồn |
| Weaknesses | Setup/location/finite control budget |
| Movement | Đọc terrain, đổi điểm đặt |
| Skill archetypes | Bounded zone/directional push/anchor |
| Loadout contribution | Chủ động chuẩn bị hit/crossing |
| Synergy | Striker/Ranged punish; Support duy trì nguồn |
| Balance risks | Permanent stunlock/infinite spread, không mọi boss immune |

## `role_support` — Support

| Field | Contract |
| --- | --- |
| Tactical purpose | Tăng khả năng hành động/hồi phục có điều kiện |
| Strengths | Utility/protection/recovery theo budget |
| Weaknesses | Channel/source exposed và action opportunity cost |
| Movement | Định vị quanh anchor/receiver |
| Skill archetypes | Limited heal/cleanse nếu author/ward/utility |
| Loadout contribution | Một active body, không đồng đội reserve ngoài map |
| Synergy | Defender giữ sector, Striker tận dụng utility |
| Balance risks | Heal-switch-reserve loop, auto revive HP0 hoặc free energy |

## Hybrid và stage expression

Quy Defender/Controller (Bruiser identity theo C04), Phượng Striker/Ranged với mobility tag, Long Controller/Ranged với mobility, Ly Support/Controller với healing là mapping **PROPOSED**, không sửa approved identity/skills. Primary label có thể do stage dùng nhiều hơn, chỉ effective stage role refs, không đổi speciesId hoặc reset XP. Vai tương lai chưa mở không hiển thị như skill usable.

Water không luôn Defender, Fire không luôn Striker, Wood không luôn Healer. E10 families có thể chọn role khác với Sacred cùng hệ; không tự assign tất cả roles. Hai vai không hai budgets: review opportunity cost, effect/source ownership và readability theo [balance](../gameplay/CREATURE_ROLE_BALANCE.md). Role tagging không ban hành ability/new class. Boss role trong encounter không là combat role hoặc player eligibility.
