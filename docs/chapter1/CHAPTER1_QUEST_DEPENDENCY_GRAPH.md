# Dependency graph nhiệm vụ và objective

**PROPOSED Q21-P03**, không world graph mới. [S05 event DAG](../story/STORY_IMPLEMENTATION_HANDOFF.md), [H19 connectivity](CHAPTER1_WORLD_GRAPH.md) và [W07 prior proofs](../world/QUEST_WORLD_STATE_RULES.md) là nguồn. Diagram là view; E01 sub-boundaries và parallel proofs không phải eventId/questId mới.

```mermaid
flowchart LR
 BOOT["BOOTSTRAP_START"] --> SRC["mq_01: source + memory trước thân"]
 SRC --> FORM["E01 form_committed"]
 FORM --> PRACT["mq_01: practice + parent E01"]
 PRACT --> Q2["mq_02 / E02"]
 Q2 --> EVID["mq_03: CL evidence"]
 Q2 --> BYP["mq_03: bypass/refuge test"]
 EVID --> Q3["mq_03 / E03"]
 BYP --> Q3
 Q3 --> Q4["mq_04 / E04: qualifying conflict outcome"]
 Q4 --> SET["mq_05: cấp và hồi đúng setting"]
 SET --> VER["mq_05: kiểm A/B/refuge + confirm"]
 VER --> Q5["mq_05 / E05"]
 Q5 --> Q6["mq_06 / E06: arrival + return"]
 Q2 -.-> OPT["D/F hoặc wildlife resonance/lore tùy chọn"]
 OPT -.-> REV["Revisit activity, không prerequisite main"]
```

| Quest | Mandatory predecessor / group | Parallel / optional objectives | Gates / anti-cycle |
| --- | --- | --- | --- |
| mq_01 | BOOTSTRAP_START; memory trước form, practice sau form | b09 replay optional; local steps Task17 reuse | CAP_QUY_MOVE không gate bootstrap; parent không prerequisite sub-grant |
| mq_02 | mq_01 parent E01 complete | Observation/clue proof có thể thu theo thứ tự accessible, encounter phải eligible; D optional | bc không mở chỉ vì đặt thân; không wildlife form/grind required |
| mq_03 | mq_02/E02 complete | CL evidence và khảo sát có thể song song sau entry, bypass test theo available source; optional extra memory không main gate | All proof cần E03 ở E trước eg; no G/F proof cycle, no S2 prerequisite |
| mq_04 | mq_03/E03 complete | Prep/đọc stakes optional presentation; accepted combat outcome hoặc authorized alternative theo Task23 contract | H prep không lock, entry/attempt riêng; no 3-member/optional species gate |
| mq_05 | mq_04/E04 accepted outcome | Vận hành trước kiểm hiệu quả, A/B/refuge checks có thể đi thứ tự thuận route, confirm sau đủ proof | Dùng routes cũ G/E/C/B/A hoặc eb; không gi/I prerequisite trước E05 |
| mq_06 | mq_05/E05 complete | Rest/presentation optional, arrival/return atomic | Quy I tới N, không cần có Phượng trước; return edge không quest loop/reward source mới |

Repeatable feedback/revisit không thêm cạnh ngược vào main DAG hoặc reset COMPLETED. Optional D sau E01 và F theo advanced cap có thể đi ở thời điểm graph cho, không Q2 diagram suggestion tự mở F. Source proof có trước ACTIVE được query/revalidate đúng scope, không tự hoàn predecessor chưa có hoặc bypass access predicates. Concurrent accepted events serialize/expected revision, no callback order authority.
