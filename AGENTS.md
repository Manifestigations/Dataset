# AGENTS.md

## Where things live

- 2026 autumn figures: `src/reference/data.ts` — raw observations in `FACTS`
  (day-keyed, each cell `{ low, high, q }`); the daily/weekly derived series
  are computed in that file and must not be hand-edited. `START`/`END` bound
  the window; school-holiday shading uses `HOLIDAY_START`/`HOLIDAY_END`.
- Historical episodes: `src/episodes/<movement>.ts` (one `Row` per week;
  ids in `EpisodeId`: may68, cpe, gj, nahel, pensions, bt, students26).
- Source catalogues: `src/sources/<group>.ts`; groups declared as `GroupId`
  in `src/sources/types.ts`, catalogued in `src/sources/groups.ts`,
  registered in `src/sources/index.ts`.
- Notes: `src/reference/notes.ts` · Populations: `src/reference/population.ts`
- Shared types/helpers: `src/model/index.ts` (`Band`, `Flag`, `Row`,
  `Episode`, `MetricKey`, `isDetached`, `bandOf`, `midOf`).
- Checks: `npm run validate` (`scripts/validate.ts`) — `scripts/build.ts`
  calls `validate()` first, so a bad bundle never reaches a tag.
- Build: `npm run build` → `json/` (episodes, sources, reference, notes,
  manifest) + `schema/index.schema.json`. Build outputs are not committed.
  `DATA_VERSION` in `src/index.ts` moves with the release tag.

## Task recipes

**Change a 2026 figure** — grep `src/reference/data.ts` for the ISO date;
edit the cell's `{ low, high, q }`; keep/fix the `q` flag; add a `noteRef`
(`src/reference/notes.ts`, both languages) if the cell needs explaining;
add/keep the `Source` in `src/sources/<group>.ts`; run `npm run validate`,
`npm run typecheck`, `npm run build`.

**Change a historical series** — edit `src/episodes/<movement>.ts` (a `Row`
per week: `w` sequential from 0, `from`/`to` ISO, band `number |
[low, high]`, optional `flag`/`noteRef` per metric); ensure the supporting
sources exist in `src/sources/<group>.ts`; re-run the three commands.

**Add a source group** — extend `GroupId` in `src/sources/types.ts`; add its
`SourceGroup` to `src/sources/groups.ts`; create `src/sources/<group>.ts`;
register it in `src/sources/index.ts`.

**Settle a data problem** — record the decision in `docs/data-problems.md`,
then apply it to the cells.

## Release

`.github/workflows/release-package.yml` publishes
`@manifestigations/protest-data` (validated `json/` + `schema/`) to GitHub
Packages.
