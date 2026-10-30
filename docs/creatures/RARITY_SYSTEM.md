# Rarity, discovery và danh hiệu truyện

**Task11 — PROPOSED:** đặc tả để review, không gameplay đã triển khai hoặc approval mới cho mechanics. Baseline `a2023bb`, ngày31/10/2026 Asia/Saigon. [Task11 decisions](TASK11_DECISIONS.md) và [central register](../PROJECT_DECISIONS.md) giữ trạng thái.


## D19 vẫn PROPOSED — K11-P02

Năm labels ứng viên: Normal / Rare / Epic / Legend / Rainbow. HUD Legend hiện tại không chứng minh rarity system hoạt động. Không tự chuyển D19 sang CONFIRMED hoặc SUPERSEDED. Độ hiếm mô tả mức khác thường/điều kiện phát hiện và ý nghĩa sưu tầm, không damage/HP/XP multiplier; narrative significance là trục riêng, không cứ quan trọng là Rare.

| Tiêu chí | A năm tiers | B ít base tiers + recognition riêng |
| --- | --- | --- |
| Comprehension | Năm bậc dễ gợi power ladder; Rainbow thiếu nghĩa sinh thái rõ | Ít nhãn dễ học, separate badges cần giải thích nhưng tránh nhầm sức mạnh |
| Roster size | Cần đủ loài và tiêu chí phân biệt mỗi bậc; hiện chỉ4Sacred và templates | Phù hợp roster nhỏ tăng dần, không tạo species chỉ lấp bậc |
| Production/UI | Năm cue/text/icon policies, chưa có UI approved; màu không đủ accessibility | Ít presentation families, narrative badge không cần mỗi loài full new effect |
| Long-term progression | Có chỗ tier cao nhưng dễ escalatory obsolescence | Thêm ecological routes/mastery/variants có review thay nâng tier liên tục |
| Collection satisfaction | Bậc hiếm rõ nhưng dễ grind/RNG chasing | Reward hiểu sinh thái/utility/memory, discovery challenge có payoff |
| Balance | Rủi ro Legendary-only optimal team | Nhấn kit/counterplay, vẫn cần budget review chứ không tự cân bằng |

**Khuyến nghị Model B:** tạm dùng ba candidates `rarity_normal`, `rarity_rare`, `rarity_epic` cho thiết kế; chưa khóa tên/số bậc. Legend/Rainbow giữ trong legacy proposal vocabulary, chưa có production rarity mới được duyệt. Không xóa/rename labels runtime hay assign roster vì khuyến nghị này. “Unclassified” là trạng thái thiếu/không áp dụng dữ liệu, không tier thứ tư hay thấp hơn Normal.

| Candidate | Ý nghĩa discovery đề xuất | Không bảo đảm |
| --- | --- | --- |
| Normal | Dễ gặp khi hiểu habitat thông thường, có niche đáng dùng | Yếu, disposable hoặc không cần mastery |
| Rare | Đòi quan sát điều kiện/route hoặc sự kiện có clue rõ | Damage/rarity gắn dual hoặc phải RNG |
| Epic | Discovery/resonance có nhiều bước ý nghĩa hoặc behavior khó hiểu | Level cao sẵn,3stages hoặc power vượt mọi form |
| Legend / Rainbow | Chưa chốt semantics; defer khi chưa có phân biệt rõ/roster budget | Sacred tier, evolutionIII, strongest hoặc recolor tự rarity mới |

Rarity gắn species-level default có rationale/decision/version; khác tần suất gặp từng habitat, individual variant, story rarity của một actor hoặc loot rarity. Vùng phục hồi có thể làm loài dễ thấy hơn mà catalog rarity không tự đổi. Nếu rarity đổi qua content update: thay metadata/alias có approval, không XP/HP/stage/reward regrant.

## Sacred: hai approaches — K11-P03

A gán mọi Sacred vào Legend: quen mắt nhưng gộp story importance với rarity/power, khó giải thích Quy mở đầu và Rainbow. B separate `sacred` narrative designation: giữ baseline bốn Tứ Linh, ordinary rarity độc lập/UNRESOLVED và có thể không hiển thị nếu chính sách cho phép. **Khuyến nghị B**; không tự assign Normal/Rare/Epic/Legend cho bất kỳ Sacred nào. Sacred authority độc đáo không biến sinh vật khác vô dụng; Rainbow không có quan hệ “mạnh hơn Sacred”. Không thêm authority cho Quy/Phượng/Long hoặc Life vào element registry.

## Missing / unsupported rarity

Draft thiếu rarity hợp lệ nếu ghi gap/reason. Runtime-ready sau này cần approved policy: với domain áp dụng rarity phải resolve approved ref; domain ngoài collection như ambient organism có thể not_applicable. Player-facing unknown có mô tả nhất quán, không đoán Legend từ art filename. Old unsupported ID giữ provenance, alias khi semantics tương đương; không map Rainbow→Epic chỉ vì rút tiers, không mất species/progression. Migration/UI/label final vẫn K11-U01/U06.
