# Hải Uyên Vertical Slice v1.0 — Gate 0

Baseline: branch `work`, HEAD `5ad5678`. Input: HAI_UYEN_CODEX_HANDOFF_V1.zip, README_FIRST.md + CODEX_PROMPT.md read in full, 2026-11-02. Source maps copied byte-for-byte from the M4 audited handoff. Concepts/technical drawings are references, not production art or collision.

## Authority and discrepancy report

- **Approved for this sandbox by this task:** one visible/controlled Quy I, SOLO, four water skills, species defense, shared spirit HP, no resource gate, no AI teammate; four prototype rooms; checkpoint/puzzle/rewards; temporary in-engine art. Numeric tuning remains prototype-only. The attached prompt is an implementation specification within the user's requested scope, not permission to publish/merge or revise canon.
- **Existing approved canon:** D03/D29 opening, D31 Quy identity, D39 extensibility, D40 first playable, D41 no mandatory three species. D05/D06 describe three slots/switching; handoff explicitly overrides these for this sandbox only. No canon document is rewritten. No extra playable element, roster, evolution, story revelation or Chapter I quest is introduced.
- **Missing/unverified:** `docs/chapter1/CHAPTER1_WORLD_GRAPH.md`, Task33/34 gates, production Quy sprites and native tiles are absent from this checkout (docs end at Task13). Production A–I/E01–E06 integration is blocked; the independent VS-A1 ↔ VS-B1 ↔ VS-LAB ↔ VS-ARENA sandbox is implementable. Boss is a test miniboss, never canonical H.
- Current runtime: native ES modules/Canvas, 32px tiles, Phoenix-specific renderer/input/skills. Existing localStorage is UI settings, not world progress. Keep Dawn entry/assets/settings and existing test contracts. Add isolated modules and an additive web entry rather than pretending Phoenix is Quy or replacing the save schema.
- Build/test: Node >=24; `npm ci`, `npm test`, `npm run build`; Playwright 1.62.1 + system Chromium, Python static HTTP. No backend/secrets/new dependency required.
- **Proposed:** fish/jelly/crab names, enemy tuning and reward tokens remain sandbox candidates. Not new canon or a production content claim.

## Schema adapter contract

`size_tiles` → columns/rows; `tile_px` → tileSize=32; origin NW, x East/y South; cell (x,y) → pixel center ((x+.5)*32,(y+.5)*32). `collision_rows` `#` is solid, `.` floor; bounds are solid. `entities` IDs remain stable. `transition.target/entry_anchor` must match `exits.target/target_anchor`; disabled null-target portal stays inactive. Entity trigger is a 1-tile-radius area, width_tiles controls horizontal extent; arrival anchor must lie outside all target trigger areas. Cooldown plus exit/rearm prevents bounce.

`dynamic_gate.affected_cells` blocks floor until `open_when`; flags applied before occupancy, BFS, spawn and AI. `exits.requires_flag` enforced independently of physical blockers. `state_flag`, `requires_flag`, `defeat_flag`, `receipt_id` map unchanged inside a separate versioned sandbox save. LAB A requires actual K1 projectile impact; B requires primed A and K2 center near receiver. Arena reward additionally requires victory and a committed defeat receipt. Gate/entity images never create colliders.

Quy uses a 10px circular collider (20px diameter) and <=2px swept substeps, also used by enemy navigation with each actor's radius. Sprite may extend aesthetically beyond collider; no scaled-down collision based on doorway. All four floorplans require runtime and state-dependent reachability tests rather than trusting INPUT_VALIDATION.json.

## Art readiness

Inspected supplied production reference board: eight poses and VFX are composited infographic examples with text/variable anatomy, not frame-consistent native sprites. None is cropped or imported. Temporary procedural pixel Quy has broad low oval shell, four flippers, compact directional head, teal spiral; eight discrete orientations, NE distinct from E. Floor/wall/gate/receiver/checkpoint/enemy art is temporary and must remain labelled. No external asset license is invented. No Stage B production work.
