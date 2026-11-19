# AGENTS.md

This repository holds the **data**, not the site. The
`Manifestigations/Protest-Data-Observatory` repo holds the charts, the copy and
the built `docs/`. Nothing here renders.

## Where things live

Public entry point for the 2026 layer: **`src/data/index.ts`**. It is a barrel —
a long prose verification record and re-export statements, no logic. Import
from it; do not add code to it. (`src/data/data.ts`, which this file and the
README used to name, does not exist on `main`.)

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
- `src/data/costs.ts` — **who pays**. `PAYER_COSTS`, one `PayerCost` per
  (payer, kind, stage, instrument); `COST_UNPRICED` for figures no source
  publishes, each with a `cause`. Deliberately not in `FACTS`: a record carries
  a payer axis, an `Obs` does not, and one day can hold many payers.
  `src/data/costs-checks.ts` holds its invariants.
- `scripts/check-costs.ts` — the cost cross-checks (`npm run check:costs`).
- `src/data/types.ts` — `Obs`, `Pt`, `Series`.
- `src/data/illegal/` — **the case-level register**, the one part of this repo
  that is not keyed by date and metric:
  - `types.ts` — `Side` (three values), `Attribution`, `ActRecord` (a union:
    the far-right variant requires `attribution`), `NormativeRecord`,
    `ActStatus`/`ACT_STATUSES`, `Step`, `Count`, `Refs`, `Sitting`,
    `HearingMode`.
  - `vocabulary.ts` — closed unions: `ChargeId`, `ChargeFamily`, `TacticId`,
    `NormId`, `CaveatId`.
  - `charges.ts` — `CHARGES`, each id with `sides: readonly Side[]`, `family`,
    optional `articles`; helpers `CHARGE_OF`, `chargesOf`, `isChargeOf`.
  - `acts.ts` — `ILLEGAL_ACTS` (one `ActRecord` per claim) and `NORMATIVE`
    (counterfactual police tactics; always `status: "hypothetical"` + a `caveat`).
  - `sittings.ts` — `SITTINGS`, one `Sitting` per court per day: `modes`,
    `rooms`, `roomsUsual`, one docket per track, `nullityRisk`.
  - `norms.ts`, `tactics.ts` — the counterfactual vocabularies.
  - `index.ts` — the barrel plus `actsOf`, `censusByStatus`, `byDay`,
    `linkedToFact`, `linkedToCasualty`, `sittingsOn`, `sittingOf`,
    `actsAtSitting`. `Census` counts **records**, never people or crimes, and
    always reports `unquantified` next to the total.
- `scripts/check-illegal.ts` — the register's invariants
  (`npm run check:illegal`). A failure means the register contradicts itself.
- `src/data/episodes/<movement>.ts` — one `Episode` per historical movement:
  `mai68.ts`, `cpe.ts`, `gilets-jaunes.ts`, `nahel.ts`, `retraites.ts`,
  `bloquons.ts`, `students.ts`; registered as `EPISODES` in
  `src/data/episodes/index.ts`.
- `src/data/sources/<group>.ts` — the source catalogue, one file per group;
  `types.ts` holds `GroupId` and `Source`, `groups.ts` holds `GROUPS` (bilingual
  title + blurb per group), `record.ts` holds the `src()` / `both()` helpers,
  `index.ts` re-exports everything. `mentions.ts` holds the page-mention table.
  `legal.ts` holds the register's sources (prosecutors, court reporting).
- `src/data/casualties/` — `cases.ts` (the cells), `inputs.ts` (the
  observations they rest on), `estimate.ts` (the estimators), `coding.ts` (the
  ICD-10 / AIS codebook, one `CodeSpan` per published label), `checks.ts` (the
  invariants), plus levels/universe/vocabulary, all re-exported from `index.ts`
  as `CASES`, `SEVERITY_LEVELS`, `SEVERITY_WEEKS`, `CaseRow`, `Cell`, `SevRow`,
  `Why`, `CODE_SPANS`, `CodeSpan`, `Grain`, `AisRegion`.
- `src/data/disruptive/` — the disruptive-act register. `types.ts` (`ActRow`,
  `ActCategory`, `ActUnit`), `categories.ts` (`ACT_CATEGORIES`, bilingual id →
  title + definition + unit), `acts.ts` (the hand-written rows), `index.ts`
  (`ACT_ROWS` = hand-written + school blockades derived from `FACTS.blockades`,
  plus `actsOn`, `actSeriesOf`, `assertSingleUnit`, `dayActionCategories`).
  Distinct from `illegal/`: an `ActRow` counts disruptive acts by category, an
  `ActRecord` records a legal proceeding. Do not merge them.
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
npm install # Node ≥ 22.18 (the scripts run under Node's type stripping)
npm run typecheck # tsc --noEmit
npm run lint # eslint .
npm run format:check # prettier --check .
npm run check:casualties
npm run check:costs # cost invariants: payer sums, iFRAP arithmetic, no per-person total
npm run check:illegal # the illegal-act register: ids, statuses, charges, refs, sittings
npm run check # all three data checks
```

## Task recipes

**Change a 2026 figure** — grep `src/data/facts.ts` for the ISO date; edit the
cell's `{ low, high, q? }`; keep the published range a range; keep or fix `q`
(omit it for a plain national count); if the cell needs explaining, attach a
`noteRef` (type `NoteRef`) — the wording lives with the site's copy, not here;
add or fix the `Source` in `src/data/sources/<group>.ts`; state the change in
the verification record at the top of `src/data/index.ts` if it corrects an
earlier pass. Run `npm run typecheck` and `npm run check:casualties`.

**Change a historical series** — edit `src/data/episodes/<movement>.ts`: a
`Row` per week, `w` sequential from 0, `from`/`to` ISO, each metric a `Band`
(`number | [low, high]`), optional `flag`/`noteRef` per metric. Ensure the
supporting sources exist. Re-run the checks.

**Add an illegal-act record** — append an `ActRecord` to
`src/data/illegal/acts.ts`. The id is `act-<YYYY-MM-DD>-<commune>-<nn>` and its
date must match `date`; two records on one date in one commune are numbered by
documented time of day, and a record whose time was not published sorts last.
`charges` is a **list** — `[]` when no qualification has been published, and
from `charged` upwards a non-empty list whose every entry satisfies
`isChargeOf(charge, side)`. `steps` must support `status` and be in date order.
If the act's figure already exists in `facts.ts` or `casualties/`, set
`refs.fact` / `refs.casualties` and **omit `count`** — the pair is rejected. A
`side: "far-right"` record requires `attribution: { term, by }`, using the
source's own word. Then add the note key to the Observatory:
`src/copy/{en,fr}/chart.ts` → `actNotes[record.id]`. Run
`npm run check:illegal` and `npm run typecheck`.

**Add a court sitting** — append a `Sitting` to `src/data/illegal/sittings.ts`.
One record per court per day; `modes` lists every track that sat; `dockets` has
one entry per track and never a single figure across tracks; `roomsUsual` is the
court's ordinary complement, so `rooms` reads as a multiple. Link acts to it with
`refs.sitting`; the sitting never lists acts. Its note key goes in `actNotes`
too, keyed by the sitting id.

**Add a charge id** — this is a **two-repository** change and it lands in both
or not at all: the id in `src/data/illegal/vocabulary.ts`, its
`sides`/`family`/`articles` in `src/data/illegal/charges.ts`, and a
`CHARGE_LABELS` entry in `Protest-Data-Observatory:src/copy/legal.ts`, which is
`Record<ChargeId, Bi>` and will not compile until the label exists. Never
invent a `ChargeId` inside a record; the record waits.

**Add a counterfactual** — append to `NORMATIVE` in `src/data/illegal/acts.ts`.
It is a police tactic read against the law of armed conflict: `side: "police"`,
`status: "hypothetical"`, a `norm`, a `tactic`, a `caveat` that states the
counterfactual in words, no `steps`, no `refs.sitting`, no verdict. It is never
summed with `ILLEGAL_ACTS` and never drawn on the same axis.

**Add a source** — add the entry to the group's file in `src/data/sources/`
using the helpers in `record.ts`; `label` is publisher + headline verbatim,
`what` is bilingual, `date` is optional (omit it for standing pages).

**Add a source group** — extend the `GroupId` union in
`src/data/sources/types.ts`; add its `SourceGroup` to `GROUPS` in
`src/data/sources/groups.ts` (bilingual `title` and `blurb`); create
`src/data/sources/<group>.ts`; register it in `src/data/sources/index.ts`.

**Add a poll** — one `OpinionPoll` in `src/data/opinion.ts`, its `sources`
naming an entry in the `polls` group. Record every bucket with the pollster's
own word; never rename two pollsters into one vocabulary, and never add a
bucket the article did not print. Keep `subject` on the question asked, so
`opinionAverage()` cannot cross two questions. Flag the series derived ("e").

**Change casualty data** — `src/data/casualties/`: cells in `cases.ts`,
observations in `inputs.ts`, the estimator's arithmetic in `estimate.ts`, the
invariants in `checks.ts`. A published label is a `NativeLabel` in
`vocabulary.ts` **and** gets exactly one `CodeSpan` in `coding.ts`: a label with
no span, a label in two spans, or a span naming an unknown label id fails the
check. `npm run check:casualties` must pass; a failure means the data
contradicts itself, not that the check is too strict.

**Add or extend an injury coding span** — edit `CODE_SPANS` in
`src/data/casualties/coding.ts`, never `cases.ts`: a span classifies labels, it
carries no count of its own. `icd10` holds chapter XIX categories at the level
the label supports and `external` holds chapter XX; one of the two must be
non-empty. `ais` is `[lo, hi]` within 1–6, or `null` when AIS does not apply (a
death). `regions` is one or more of the nine AIS body regions. `grain` is the
field the rest of the site keys on — `"type"` when the label names an injury,
`"severity"` when it names a degree — and a per-injury cost may only ever attach
to `"type"`. `basis: "editorial"` forces `aisEdition: null`: an alignment may
not claim an edition it was not read against. `assignment` has one member; a
per-case diagnosis would widen it deliberately, never by accident. If the span
introduces a new rung, its `mais` label in `LADDER` must remain reachable from
the span's AIS range. `npm run check:casualties`.

**Change a cost or concession record** — edit `PAYER_COSTS` in
`src/data/costs.ts`. Every row is exactly one (payer, kind, stage, instrument).
`stage: "contingent"` is only for exposure nobody has been ordered to pay — a
statutory maximum, or a bill not yet law. Keep a published band a range. Never
sum across `stage` or `instrument`: `sumRows` throws if you try. A figure
nobody publishes is a `COST_UNPRICED` entry with a `cause`, never a 0. The
`ifrap-2026` source carries three scenarios (€309M / €613M / €1,101M), not a
range — do not reintroduce "247–872". `npm run check:costs` must pass.

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

**Add a comparative movement** — add the Movement to `europe.ts`/`world.ts`, give every action a `src`, promote each candidate source in `sources/comparative.ts` to a verified `Source`, set `verdict` and at least one `Demand` with its state, and set `episodeRef: "students26"` on the France entry so it is not duplicated, then `npm run typecheck`. And a warning: do not add these to `EPISODES`; its order indexes section C and the trellis ramp.

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
- `src/data/sources/cost.ts` also ends with `export const s = [...]`, a French
  only duplicate of the seven helicopter sources. It breaks the bilingual rule
  and may be dead; do not delete it until a grep proves nothing imports `s`.
- **`charges.ts` is not `vocabulary.ts`.** The union of legal ids is in
  `vocabulary.ts`; the side each id can be brought against is in `charges.ts`.
  An id present in one and not the other compiles until something calls
  `CHARGE_OF[id]`, which is `undefined` at runtime — `check:illegal` catches it.
- **The illegal-act register is not the disruptive register.** `disruptive/`
  counts acts by category with a `unit`; `illegal/` records proceedings. An act
  can appear in both, and the counter in one is never the link to the other.
  The link, when it exists, is `refs.disruptive`.
- **`check:illegal` cannot see the Observatory.** Whether every `{ k: "act" }`
  has an English and a French note, and every `ChargeId` has a label, is checked
  where those strings live. A green run here is not a green site.
- The Observatory vendors this repository as a git submodule at
  `vendor/dataset`. A change merged here is **not live** there until the pin is
  bumped; conversely, a type error over there in `src/copy/legal.ts` usually
  means the pin is older than the vocabulary.
- **An ICD-10 code in `coding.ts` is admissible for a label, not assigned to a
  person.** `assignment` has one member (`"none"`) on purpose: no record here
  carries a diagnosis. ISS, NISS and TRISS each need three AIS codes in three ISS
  body regions for one person, so none is computable and none may be implied —
  and the ISS regions (6) and the AIS regions (9) are different lists, which
  alone makes an ISS built from a span meaningless.
- **`grain` is not a severity.** `"severity"` spans are wide by construction:
  the set for "blessé grave" is every injury family that reaches AIS 3. Only a
  `"type"` span (the 10 eye losses, the 7 amputations, the 9 craniofacial
  traumas) can ever take a per-injury figure.
- **`destruction` is `MAIS 2–5`, not `MAIS 5`.** AIS severity for an amputation
  depends on the level of the amputation and how much limb is gone; a thumb and
  an upper arm are not the same injury. Collapsing the rung to 5 would make the
  ladder contradict its own codebook.
