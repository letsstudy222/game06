# Hệ sinh vật song nguyên tố

**Task10 — PROPOSED:** đặc tả để review, chưa phê duyệt cơ chế hoặc triển khai. Baseline kiểm tra `38b8c1c`, 30/10/2026 Asia/Saigon. [Decision register](TASK10_DECISIONS.md) phân biệt nền CONFIRMED, recommendations và UNRESOLVED.


## Nền và phạm vi

CONFIRMED theo D04/D09/D18/D38/D41 và Task10 §2/13: Thủy, Hỏa, Phong, Mộc bản địa; Lôi, Kim ngoại lai; ngoại lai không tự ác; song nguyên tố không tự mạnh hơn, hiếm hơn hay thù địch. Quy/Phượng/Long/Ly giữ affiliation hiện hữu. Sinh Mệnh của Ly là authority, không ordinary combat element. Không thêm nguyên tố hoặc species đã duyệt. Ba slots tối đa theo tiến trình, membership khóa boss, switch trong bộ được phép; không bắt đủ ba dạng hoặc dual để qua main boss.

[Task09](ELEMENTAL_SYSTEM_OVERVIEW.md) cung cấp vocabulary, property/channel/status và các reaction candidates; E09 vẫn PROPOSED, không “đã approved” vì Task10 dùng lại. [Models](DUAL_ELEMENT_MODELS.md) chỉ khuyến nghị C, không chốt damage formula.

## Sáu danh tính không hoán đổi

| Loại | Định nghĩa đề xuất / evidence | Không suy ra |
| --- | --- | --- |
| single_element | Một affiliation bền trong species profile, anatomy/khả năng và cộng hưởng tương thích | Một hiệu ứng ngoài không thêm hệ |
| stable_dual | Hai affinity có chức năng bền, biểu hiện qua sinh học/linh ấn và kit của loài, được catalog xác định bằng bằng chứng | Không mọi skill dùng cả hai; không buff rarity/power |
| external_effect_user | Một hệ, dùng công cụ/receiver/nguồn ngoài có provenance riêng | Không sửa species profile khi nhặt công cụ |
| temporary_exposure | Wet, Electrified, heat hoặc buff có scope/expiry theo E09 | Không đổi taxonomy, XP hoặc evolution |
| unstable_assimilation | Quá trình can thiệp/phơi nhiễm có hại, stability cá thể cần khảo cứu | Không chắc hai hệ, mất trí hoặc vĩnh viễn |
| primordial_authority | Quyền năng đặc biệt có phạm vi truyện như Life của Ly | Không element thứ bảy, không dual Wood–Life |

Element identity kết hợp affiliation có thể cộng hưởng và cơ chế sinh học bền; ability specialization là biểu hiện, không phép đếm màu/chiêu. Không buộc mọi loài có cùng nguồn hình thành. Một sinh vật có armor kim loại vật lý chưa đủ là hệ Kim. Màu/particle là bằng chứng phụ, không chẩn đoán duy nhất.

## Khám phá và collection — E10-P06

Journal tương lai phân biệt present, discovered, observed, studied, resonance_eligible, playable_unlocked và ancestral_memory; không làm UI trong task này. Record speciesId + evidence/habitat + identity knowledge/confidence + origin/stability observations; skills/stage đọc từ progression owner, không copy thành bảng XP song nguyên tố. Có thể biết hai affinity nhưng chưa đủ điều kiện resonance, hoặc đã thấy cá thể nhưng chưa hiểu adaptation.

Unlock cần playable designation, viable resonance source, compatibility và acquisition route theo [R03](../lore/RESONANCE_RULES.md); observation qua nhịp dẫn/xả, khôi phục refuge hoặc thử thách di chuyển là ứng viên thay combat. Defeat không universal unlock; ổn định assimilation không auto thành collectible evolution. Rarity độc lập, không mặc định dual Rare/Epic. Habitat relocation có alternate encounter/refuge cho cả species chưa discovered theo [W07](../world/ECOLOGY_AND_SPAWN_STATES.md), unique source/reward có ledger không farm qua reset. Memory không tiết lộ hết origin hoặc catastrophe trước IV.

## Chỉ mục và nguồn duy nhất

[Four families](DUAL_ELEMENT_COMBINATIONS.md), [skills](DUAL_ELEMENT_SKILLS.md), [reactions](DUAL_ELEMENT_REACTIONS.md), [evolution](DUAL_ELEMENT_EVOLUTION.md), [balance](../gameplay/DUAL_ELEMENT_BALANCE.md), [data](../technical/DUAL_ELEMENT_DATA_SPEC.md), [20 cases](../technical/DUAL_ELEMENT_TEST_CASES.md), [audit](TASK10_CONSISTENCY_AUDIT.md).

Requested `docs/ecology/ADAPTATION_VS_ASSIMILATION.md` được đáp ứng bằng mở rộng nguồn hiện hữu [ELEMENTAL_ASSIMILATION](../ecology/ELEMENTAL_ASSIMILATION.md); không tạo bản định nghĩa song song. Không class, loader, JSON production, art hoặc gameplay mới.
