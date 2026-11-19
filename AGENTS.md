# AGENTS.md

This repository holds the **data**, not the site. The
`Manifestigations/Protest-Data-Observatory` repo holds the charts, the copy and
the built `docs/`. Nothing here renders.

## Where things live

Public entry point for the 2026 layer: **`src/data/data.ts`**. It is a barrel —
a long prose verification record and `export *` statements, no logic. Import
from it; do not add code to it.

- `src/data/facts.ts` — `FACTS: Record<isoDate, Partial<Record<MetricKey, Obs>>>`,
  the only hand-edited 2026 numbers. `Obs` = `{ low, high, q? }`; a point has
  `low === high`. Empty means "no published figure", never zero.
- `src/data/projections.ts` — the daily series, **computed** from `FACTS`.
  Never hand-edit. `src/data/aggregate.ts` — the weekly aggregation, also
  computed. `src/data/student-weeks.ts` — the students-2026 week table.
- `src/data/calendar.ts` — the window and the calendar: `START = "2026-09-15"`,
  `END = "2026-11-11"`, `Week`/`WEEKS`, `HOLIDAY_START = "2026-10-18"`,
  `HOLIDAY_END = "2026-11-01"` (Toussaint; the band opens on the 18th on
  purpose — 17 Oct was a school day and carries the peak).
- `src/data/policing.ts` — deployments, the forces-injured stock, the cost
  rate. `src/data/helicopters.ts` — helicopter hours/cost.
  `src/data/population.ts` — denominators.
- `src/data/types.ts` — `Obs`, `Pt`, `Series`.
- `src/data/episodes/<movement>.ts` — one `Episode` per historical movement:
  `mai68.ts`, `cpe.ts`, `gilets-jaunes.ts`, `nahel.ts`, `retraites.ts`,
  `bloquons.ts`, `students.ts`; registered as `EPISODES` in
  `src/data/episodes/index.ts`.
- `src/data/sources/<group>.ts` — the source catalogue, one file per group;
  `types.ts` holds `GroupId` and `Source`, `groups.ts` holds `GROUPS` (bilingual
  title + blurb per group), `record.ts` holds the `src()` / `both()` helpers,
  `index.ts` re-exports everything. `mentions.ts` holds the page-mention table.
- `src/data/casualties/` — `cases.ts` (the cells), `inputs.ts` (the
  observations they rest on), `estimate.ts` (the estimators), `checks.ts` (the
  invariants), plus levels/universe/vocabulary, all re-exported from `index.ts`
  as `CASES`, `SEVERITY_LEVELS`, `SEVERITY_WEEKS`, `CaseRow`, `Cell`, `SevRow`,
  `Why`.
- `src/data/disruptive/` — the disruptive-act register. `types.ts` (`ActRow`,
  `ActCategory`, `ActUnit`), `categories.ts` (`ACT_CATEGORIES`, bilingual id →
  title + definition + unit), `acts.ts` (the hand-written rows), `index.ts`
  (`ACT_ROWS` = hand-written + school blockades derived from `FACTS.blockades`,
  plus `actsOn`, `actSeriesOf`, `assertSingleUnit`, `dayActionCategories`).
- `src/model/index.ts` — pure types and definitions; everything depends on it:
  `Flag`, `Band`, `Metric`, `MetricKey`, `Row`, `Episode`, `EpisodeId`,
  `NoteRef`, `isDetached`, `bandOf`, `midOf`.
- `src/copy/` — `i18n.ts`, `interpolate.ts` (`fill`, `plural`), `format.ts`,
  `markers.ts`, `types.ts`, `index.ts`. **The Observatory still carries its own
  copies of `interpolate.ts`, `format.ts`, `markers.ts` and `types.ts` under
  `src/copy/`.** If you change one, check the other before assuming your change
  is live.
- `scripts/check-casualties.ts` — the casualty cross-checks
  (`npm run check:casualties`).
- `.github/workflows/style.yml` — CI. `.github/ISSUE_TEMPLATE/report-a-figure.yml`
  — the public reporting form.

## Commands

```bash
npm install          # Node ≥ 22.18 (the scripts run under Node's type stripping)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run format:check # prettier --check .
npm run check:casualties
```

## Task recipes

**Change a 2026 figure** — grep `src/data/facts.ts` for the ISO date; edit the
cell's `{ low, high, q? }`; keep the published range a range; keep or fix `q`
(omit it for a plain national count); if the cell needs explaining, attach a
`noteRef` (type `NoteRef`) — the wording lives with the site's copy, not here;
add or fix the `Source` in `src/data/sources/<group>.ts`; state the change in
the verification record at the top of `src/data/data.ts` if it corrects an
earlier pass. Run `npm run typecheck` and `npm run check:casualties`.

**Change a historical series** — edit `src/data/episodes/<movement>.ts`: a
`Row` per week, `w` sequential from 0, `from`/`to` ISO, each metric a `Band`
(`number | [low, high]`), optional `flag`/`noteRef` per metric. Ensure the
supporting sources exist. Re-run the checks.

**Add a source** — add the entry to the group's file in `src/data/sources/`
using the helpers in `record.ts`; `label` is publisher + headline verbatim,
`what` is bilingual, `date` is optional (omit it for standing pages).

**Add a source group** — extend the `GroupId` union in
`src/data/sources/types.ts`; add its `SourceGroup` to `GROUPS` in
`src/data/sources/groups.ts` (bilingual `title` and `blurb`); create
`src/data/sources/<group>.ts`; register it in `src/data/sources/index.ts`.

**Change casualty data** — `src/data/casualties/`: cells in `cases.ts`,
observations in `inputs.ts`, the estimator's arithmetic in `estimate.ts`, the
invariants in `checks.ts`. `npm run check:casualties` must pass; a failure means
the data contradicts itself, not that the check is too strict.

**Settle a data problem** — record the decision in
`content/data-problems.md` in the **Observatory** repo (it is prose about
method and lives there), then apply it to the cells.

**Change a demographic figure** — edit `src/data/demographics/{protesters,forces}.ts`;
keep the `population` string truthful when the base changes; keep `basis`
honest (`document` = read from the source, `reported` = second-hand); a figure
that does not exist goes in `DEMOGRAPHIC_GAPS` with a `cause`, never in a row
as 0; a variable that is not ethnicity goes in `ETHNICITY_PROXIES` with its
caveat; `npm run typecheck`.

**Add a disruptive act** — append an `ActRow` to `src/data/disruptive/acts.ts`
with its `sources`, or, for a school blockade, add the `blockades` cell to
`facts.ts` and add nothing here: the row is derived. Never write a
`schoolBlockade` row by hand. Keep one `unit` per total.

**Add a comparative movement** — add the Movement to `europe.ts`/`world.ts`, give every action a `src`, promote each candidate source in `sources/comparative.ts` to a verified `Source`, set `verdict` and at least one `Demand` with its `state`, then `npm run typecheck`. And a warning: do not add these to `EPISODES`; its order indexes section C and the trellis ramp.

## Gotchas

- `src/data/index.ts` imports nothing at runtime; its comment block is the
  audit trail (passes, FIX numbers, arithmetic cross-checks). Do not delete or
  reflow it — and do not copy a number out of the comment into a cell.
- That comment also describes the _site_ ("chart 1 of sections A and B"). That
  is historical residue: this repo has no charts.
- Imports use explicit `.ts` extensions, and `prettier-plugin-organize-imports`
  will reorder your imports on `npm run format`.
- `bandOf` / `midOf` exist so no caller has to test which band shape it holds;
  `midOf` is for plotting only.
- The contents of `json/` and `csv/` are automatically generated from the TS files
  on build, so ignore their contents.
