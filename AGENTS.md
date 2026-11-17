# AGENTS.md

## Task recipes

**Change a 2026 figure** — grep `src/data/facts.ts` for the ISO date; edit the
`p|a|f|i` band; add/keep `flag`; add a `noteRef` if the cell needs explaining;
add a `Source` in `src/data/sources/`; `node scripts/build.ts`; `npm run
typecheck`; stage `docs/` artifacts.

**Change a historical series** — edit `src/data/episodes/<movement>.ts` (a
`Row` per week, `w` sequential, `from`/`to` ISO); ensure the supporting sources
exist in `src/data/sources/<group>.ts`; rebuild.

**Add a source group** — extend `GroupId` and add a `SourceGroup` in
`src/data/sources/types.ts`; create `src/data/sources/<group>.ts`; register it
in `src/data/sources/index.ts`; update `page-map.ts` if the page→source mapping
needs it.
