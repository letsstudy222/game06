# Reveal, lời văn và immediate resolution

**PROPOSED B23-P10**, same [npc_tide_keeper role](../story/MAJOR_CHARACTERS_AND_FACTIONS.md), [S05 E04](../story/STORY_IMPLEMENTATION_HANDOFF.md), [Q21 dialogue](CHAPTER1_QUEST_DIALOGUE.md). Không confirmed boss identity/species/cognition/voice, không thêm faction/catastrophe chronology/origin. Working name Lam Giáp không rename authoritative actor hoặc profile boss_water_access.

Approach G/H cho thấy outlet được giữ và refuge sống, hướng dòng bị chặn có logic. Prep nhìn silhouette forearms ghì nền, không player-control lock dài. Intro ngắn in-engine: cơ quan cảm nhận/chi đổi hướng về người chơi, vent/groove có phản hồi. Không hostile emission trước accepted entry+attempt/lock và control handoff. Player có thể rút tại prep/để sau, skip reveal chỉ rút camera/FX; không auto entry/qualifying trial/victory.

| dialogueId | Channel / Vietnamese draft | Trigger / guard |
| --- | --- | --- |
| c1boss_approach | Environmental description — “Một đường nước bị giữ lại. Sau đó, một khoảng trú vẫn còn sống.” | G/H prep, không giải source ancient crisis |
| c1boss_reveal | Spirit perception — “Giữ lấy… hay khóa lại?” | Nhìn hành vi, không lời người của Quy/omniscient answer |
| c1boss_warning | Creature communication caption — “Hai chi mở ngang, chắn lấy rãnh nước.” | Pose/cue actual source, no ordinary human speech assumed |
| c1boss_prepare | System prompt — “Có thể quay lại chuẩn bị. Thành phần bộ dạng sẽ bị khóa khi vào thử thách.” | Prep safe, no mandatory slot count |
| c1boss_entry | Choice — “Bước vào / Chuẩn bị thêm” | Explicit accepted entry, không skip/camera crossing auto lock |
| c1boss_phase_shift | Environmental description — “Dòng vào đổi nhịp. Một lối nước khác đang mở ra.” | Preview phaseII/gap đủ thấy, không phase = evolution |
| c1boss_test_source | Objective cue — “Kiểm rãnh hồi khi có khoảng trống để thao tác.” | Optional receiver valid, no new mandatory ability |
| c1boss_yield | Environmental description — “Thế ghì đã hạ. Rãnh dẫn không còn bị ngăn.” | Accepted E04 disposition/threat stopped, no death/cure/frame-end grant |
| c1boss_after | System prompt — “Có thể thử vận hành đường hồi.” | E04 durable; không nói biển đã phục hồi |
| c1boss_retry | System prompt — “Có thể chuẩn bị và thử lại khi nơi trú đã an toàn.” | Sau approved attempt close/recovery/unlock, no automatic HP transfer |
| c1boss_pending_save | System prompt — “Chưa thể lưu kết quả. Hãy thử lưu lại.” | Outcome pending/failed ack, no victory saved giả |
| c1boss_revisit | Environmental description — “Người giữ dòng vẫn ở gần nơi trú. Đường thử tải đã có thể được kiểm chứng.” | Unique actor/outcome projection sau E04, no respawn first-clear |

Không thêm memory reward E04 để giải history. Optional echo opt_02 sau E03 và main first_sense/current giữ nguồn/availability S22/Q21; boss defeat không xóa source hoặc auto discover optional fragment. Dialogue spoken nếu sau duyệt cognition/voice có thể tham chiếu c1q_keeper_warning source Q21, không duplicate line thành event authority; bản mặc định dùng pose/caption để không tự cho Quy/fauna nói người.

## Resolution boundary, không ending Task24

Combat route accepted defeat/subdual outcome hoặc approved shared trial→coordinator ngừng hostile casts, validate E03 proof/refuge/operation permission, settle source/E04/R0 đúng [reward contract](CHAPTER1_BOSS_REWARDS_AND_STATES.md)→attempt close/placement/lock reconciliation→G/mq_05 available. Boss không phải chết hoặc bị capture; healing/assimilation cure không tự xảy ra. No full-regional restore/ChapterII unlock bởi death animation.

Task24 nhận E04 outcome actor disposition/permission, E05 verification/restoration và E06 arrival-return separate. Task23 không viết complete ending camera/memory lore/Phượng appearance. E04 present outcome/P15 payload pending phải save-safe, không player được rời state đang nửa grant.

## Skip/focus/accessibility

Skip/replay chỉ presentation, source facts/commands remain independent. Reload before attempt entry at prep, active attempt theo approved reset policy, after durable E04 dựng result không replay combat/grant. Blur clear held input/pause transient attack clocks, pending commits reconcile, no offline boss hit/recovery/refill. Essential cue có shape/pose/text khi muted/lowFX/reduced motion; không strobe/forced camera pan/long unskippable movie. Optional dialogue localization fallback approved Vietnamese ngắn, essential cue thiếu thì content not ready.
