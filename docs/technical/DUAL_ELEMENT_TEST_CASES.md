# Dual-element QA scenarios

**PROPOSED E10-P10:** 20 ca nghiệm thu tương lai, không test runtime đã chạy. Required fields là preconditions, expected behavior, invalid states, recovery/fallback và verification criteria; tham chiếu [data invariants](DUAL_ELEMENT_DATA_SPEC.md) và [E09 cases](ELEMENTAL_TEST_CASES.md). Giá trị số/fixtures/platform phải bổ sung sau approval.

## E10-EC01 — Single skill của dual

| Field | Scenario |
| --- | --- |
| Preconditions | Thủy–Lôi dùng single Thủy |
| Expected behavior | Chỉ Thủy/property declared tham gia hit; profile vẫn dual |
| Invalid states | Tự thêm Lôi proc hoặc duplicate damage |
| Recovery/fallback | Reject undefined attribution, giữ valid single action |
| Verification criteria | Trace chỉ một component budget và profile không đổi |

## E10-EC02 — Combined gặp prestatus

| Field | Scenario |
| --- | --- |
| Preconditions | Target có accepted Wet trước cast Hỏa–Kim |
| Expected behavior | Đọc snapshot và chọn reaction có setup hợp lệ, budget hữu hạn |
| Invalid states | Full base nhân hai, tiêu token Wet hai lần |
| Recovery/fallback | Rollback uncommitted intent, retry cùng key |
| Verification criteria | Một accepted outcome/token consumption, ledger ổn định |

## E10-EC03 — Hai reaction cạnh tranh

| Field | Scenario |
| --- | --- |
| Preconditions | Hai components đủ điều kiện cùng input token |
| Expected behavior | Priority/exclusivity group chọn một primary theo rule |
| Invalid states | Callback order quyết định, hai rules ăn cùng token |
| Recovery/fallback | Definition thiếu priority chưa ready, không random chọn |
| Verification criteria | Replay thứ tự callback khác vẫn cùng selected reaction |

## E10-EC04 — Interrupt combination

| Field | Scenario |
| --- | --- |
| Preconditions | Cast trước/sau joint release marker |
| Expected behavior | Trước release không emit; sau commit giữ accepted components, chưa release không emit |
| Invalid states | Refund HP rồi replay, staged component tự xuất |
| Recovery/fallback | Giải cancel theo release policy; resource refund cần approved R03 |
| Verification criteria | Không ghost hit, không duplicate cost/outcome qua retry |

## E10-EC05 — Evolution đổi secondary

| Field | Scenario |
| --- | --- |
| Preconditions | Có exceptional approved rule, đủ điều kiện khi equipped |
| Expected behavior | Pending trong boss, safe atomic profile/stage/proof ngoài lock |
| Invalid states | Hot swap affinity giữa boss, mất XP |
| Recovery/fallback | Last good config nếu transaction fail, giữ eligibility |
| Verification criteria | XP unchanged, một profile version đúng, snapshot boss không đổi |

## E10-EC06 — Save config cũ

| Field | Scenario |
| --- | --- |
| Preconditions | Save profileVersion cũ/ordered metadata |
| Expected behavior | Alias/migrate có provenance, giữ species/form/progression |
| Invalid states | Sort order thành mechanics mới hoặc duplicate unlock |
| Recovery/fallback | Backup/opaque preservation và validated recovery khi unsupported |
| Verification criteria | Load hai lần không thêm grants, XP/stage đúng migration |

## E10-EC07 — Assimilated ổn định

| Field | Scenario |
| --- | --- |
| Preconditions | Quest source control hoàn thành cho unique actor |
| Expected behavior | Ghi stability/evidence, giữ origin history và affinity hợp lệ |
| Invalid states | Auto collectible/evolution/cleanse thành single |
| Recovery/fallback | Pending evidence nếu chưa đủ, unique outcome ledger |
| Verification criteria | Actor identity giữ và không grant form nếu thiếu R03 conditions |

## E10-EC08 — Stable dual bị exposure

| Field | Scenario |
| --- | --- |
| Preconditions | Stable individual nhận nguồn gây hại tạm |
| Expected behavior | Condition/status theo scope, không rewrite species |
| Invalid states | Mọi Wet thành corruption hoặc đổi roster |
| Recovery/fallback | Hết source theo approved condition/recovery policy |
| Verification criteria | Species profile không đổi, source/history phân biệt |

## E10-EC09 — Same-element overlap

| Field | Scenario |
| --- | --- |
| Preconditions | Hai effects cùng stack group đánh target |
| Expected behavior | Coalesce/refresh bounded theo E09 |
| Invalid states | Hai full tick cùng logical tick, infinite refresh |
| Recovery/fallback | Dedupe applications và preserve accepted cursor |
| Verification criteria | Một group outcome và không timer reset từ switch |

## E10-EC10 — Reaction khi switch

| Field | Scenario |
| --- | --- |
| Preconditions | Released cast chạm trước/sau transform commit |
| Expected behavior | Caster snapshot frozen, target/body resolve đúng một boundary |
| Invalid states | Đánh active và reserve, thêm hệ form mới |
| Recovery/fallback | Stable combatant identity/ledger, no source_active carry |
| Verification criteria | Một hit và attribution source cũ không reset TTL |

## E10-EC11 — Receiver dẫn combined

| Field | Scenario |
| --- | --- |
| Preconditions | Object có authored conductive path/source |
| Expected behavior | Receiver permissions và local budget, W07 xử lý durable intent |
| Invalid states | Whole map discharge, cast tự stable region |
| Recovery/fallback | Invalid revision retry revalidate, safe path giữ |
| Verification criteria | Một object outcome, không global damage hoặc duplicate reward |

## E10-EC12 — Kháng một yếu một

| Field | Scenario |
| --- | --- |
| Preconditions | Target authored responses khác cho hai channels |
| Expected behavior | Resolve allocated components từng cái, same cause normalize |
| Invalid states | Chọn max immunity hoặc multiply all weakness |
| Recovery/fallback | Profile thiếu rule không ready; no fabricated multiplier |
| Verification criteria | Trace không double count budget/cause, counterplay rõ |

## E10-EC13 — Boss kháng một component

| Field | Scenario |
| --- | --- |
| Preconditions | Boss profile có scoped resist, main forms có đường đánh |
| Expected behavior | Component khác/basic window vẫn hợp lệ |
| Invalid states | Blanket immunity cả hit hoặc mandatory dual |
| Recovery/fallback | Encounter review nếu main-form path thiếu trước release |
| Verification criteria | Conceptual single-only route tồn tại, values cần prototype |

## E10-EC14 — Thiếu animation combined

| Field | Scenario |
| --- | --- |
| Preconditions | Catalog có optional hoặc required combined action |
| Expected behavior | Optional có thể chưa có; required thiếu clip thì content not ready |
| Invalid states | Idle pose được gọi validated attack, invisible damage |
| Recovery/fallback | Disable unreleased optional action, gap register; required chặn content-ready |
| Verification criteria | Không fake path; required action có gap/asset gate |

## E10-EC15 — Incomplete profile

| Field | Scenario |
| --- | --- |
| Preconditions | Draft thiếu element/resistance/source refs |
| Expected behavior | Reject runtime readiness, existing valid config không mất |
| Invalid states | Default arbitrary bonus/element hoặc crash progression |
| Recovery/fallback | Quarantine draft/last supported config theo approved policy |
| Verification criteria | Missing refs báo rõ, existing XP/loadout không bị xóa |

## E10-EC16 — Future element

| Field | Scenario |
| --- | --- |
| Preconditions | Có đề xuất element ngoài sáu |
| Expected behavior | Chờ explicit approval và vocabulary/content/migration review |
| Invalid states | Auto seventh element từ string mới |
| Recovery/fallback | Giữ draft metadata không execute, catalog version isolation |
| Verification criteria | Baseline six không đổi, old species unaffected |

## E10-EC17 — Earth legacy metadata

| Field | Scenario |
| --- | --- |
| Preconditions | Concept cũ ghi Water–Earth chưa có approval element |
| Expected behavior | Giữ source text, UNRESOLVED classification |
| Invalid states | Auto rename Metal/delete concept/add Earth registry |
| Recovery/fallback | Review material/environment/temp label/future candidate riêng |
| Verification criteria | Provenance nguyên vẹn, no playable profile dùng unresolved ref |

## E10-EC18 — Unlock trước chapter

| Field | Scenario |
| --- | --- |
| Preconditions | Form dual có grant trước mốc content dự kiến |
| Expected behavior | Validate approved acquisition prerequisites; legitimate grant giữ, main story không tự skip |
| Invalid states | Pair membership unlock chapter/overwrite story facts |
| Recovery/fallback | Invalid grant quarantine với evidence, không tự revoke approved progression |
| Verification criteria | Form grant ledger và chapter completion owners độc lập |

## E10-EC19 — Một ability tạm unavailable

| Field | Scenario |
| --- | --- |
| Preconditions | Source/environment hoặc narrative condition vô hiệu chiêu |
| Expected behavior | Identity/progression giữ, basic/safe return route hợp lệ |
| Invalid states | Xóa secondary affinity/XP, trap route |
| Recovery/fallback | Safe exit/receiver fallback hoặc defer world patch, không free boss equip |
| Verification criteria | No softlock, source recovery không regrant species |

## E10-EC20 — Boss bằng single forms

| Field | Scenario |
| --- | --- |
| Preconditions | Main boss với một/hai available main single forms phù hợp |
| Expected behavior | Cho entry theo D41 và approved capability/trigger, switch trong set nếu có |
| Invalid states | Bắt dual/đủ3/equip mới trong boss |
| Recovery/fallback | Safe retry/checkpoint theo policy còn pending, encounter redesign nếu gate thiếu |
| Verification criteria | Route design chứng minh available main capabilities, runtime test sau implementation |
