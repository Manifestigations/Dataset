# Contributing

Two rules cover most of it:

1. **A figure without a source does not go in.** One number, one date, one link.
2. **Open an issue before a large pull request.** Settling the data question
   first usually halves the code.

French or English, whichever is easier for you. A free GitHub account is the
only requirement for reporting.

---

## 1. Reporting a figure (no code, no install)

Open an issue in this repository — the
[report-a-figure form](https://github.com/Manifestigations/Dataset/issues/new?template=report-a-figure.yml)
asks for exactly this. Include:

| Field                    | What we need                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| What the number measures | crowd, strikers, arrests, injuries (which side), blockaded schools, damage, cost of policing                         |
| Where and when           | the date (ISO, `YYYY-MM-DD`), and the territory — national, a region, a city, one institution                        |
| The number as published  | keep the range if the publisher gives one; do not average two publishers for us                                      |
| The source               | a URL, a report title and page, or outlet and date. Paywalled or PDF is not an obstacle: say so and we will fetch it |
| Who published it         | and whether it is a **count** or an **estimate** — the data distinguishes the two                                    |

If you are reporting something from the illegal-act register — an act alleged
against someone, a charge, a hearing — add two fields, because the register
cannot be filled without them:

| Field                 | What we need                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Which side            | protesters, the police, or a far-right group. If it is a far-right group, the **word the source used** ("ultra-right", "identitarian", "far-right") and who used it             |
| Where the case stands | alleged, a complaint filed, an investigation open, a charge, a trial, a verdict, an acquittal, a dismissal, or prescribed. A court's own step, not a journalist's summary of it |

If you are reporting an injury, three more things help and one of them is
essential: **which side** the injured person was on, **which part of the body**
and what happened to it, and — if a clinical record, a hospital or a prosecutor
states it — the diagnosis. A severity word on its own ("blessé grave") is what
most sources publish, and it is recorded as a severity: it cannot be turned into
an injury type, and nothing here guesses one.

Also welcome as issues here:

- a movement missing from the historical comparison, or a group of sources to
  add under `src/data/sources/`;
- two published figures that contradict a figure we hold — the resolution
  belongs in `content/data-problems.md` in the Observatory once settled.

**Where this repo stops:** this repository holds the _data_. If something is
wrong on the _website_ — a chart drawn from a single publisher, an interpolated
gap that should be empty, a detached point joined to the line, tab order, canvas
descriptions, contrast — open that issue in the
[Protest-Data-Observatory repository](https://github.com/Manifestigations/Protest-Data-Observatory/issues)
and cite the figure here.

If you count in the street (street medic, legal observer, anyone keeping a
tally), propose a topic in an issue. What to note in the moment: time, place,
who was counting, and the limit of what was counted. A count and an estimate
are different data — note which one you have, and never round a count up into
an estimate. Always the denominator. Consent, anonymity and safety override
the data point, every time.

### Citing the data

Link, don't screenshot: the figures stay current and the source travels with
them. Cite the range, not one of its bounds — "between 175,000 and 197,000"
is the result; a single bound is half a truth. Say what the data does not
show: gaps are listed, they are not zero. Point to the page's Sources
section so the number can be checked without trusting us.

---

## 2. Editing data

Skills: editing literal values in a TypeScript file. You do not need to know
the framework or Chart.js, and there is nothing to build.

### 2.1 Set up

```bash
git clone https://github.com/Manifestigations/Dataset.git
cd Dataset
npm install   # Node ≥ 22.18
npm run typecheck
npm run build
```

This is a data package, not a site, and the built data is consumed as TypeScript source.
The build process also generates CSV and JSON copies of the dataset, for consumption in other
tools.
The available checks are `typecheck`, `lint`, `format:check`, `check:casualties`,
`check:costs` and `check:illegal`. `npm run check` runs all three data checks.

### 2.2 Find the right file

| You are changing                                                                                  | File                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An autumn 2026 figure (any day)                                                                   | `src/data/facts.ts` — `FACTS`, one key per ISO date                                                                                                                     |
| A disruptive act in a category (road blockade, péage gratuit, sabotage…)                          | `src/data/disruptive/acts.ts` — one `ActRow` per (date, category); school blockades are derived, not written here                                                       |
| An act alleged during the movement (against protesters, against the police, by a far-right group) | `src/data/illegal/acts.ts` — `ILLEGAL_ACTS`, one `ActRecord` per claim                                                                                                  |
| A police tactic read against the laws of war                                                      | `src/data/illegal/acts.ts` — `NORMATIVE`, one record per tactic and norm                                                                                                |
| A court sitting (rooms, dockets, tracks)                                                          | `src/data/illegal/sittings.ts` — `SITTINGS`, one `Sitting` per court per day                                                                                            |
| A qualification, or the sides it can be brought against                                           | `src/data/illegal/vocabulary.ts` (`ChargeId`, closed) then `src/data/illegal/charges.ts` (`sides`, `family`, `articles`) — **and** a label in the Observatory, see §2.3 |
| An autumn 2026 deployment, force level, cost rate                                                 | `src/data/policing.ts`                                                                                                                                                  |
| A denominator (population)                                                                        | `src/data/population.ts`                                                                                                                                                |
| The window, the week grid, the school holidays                                                    | `src/data/calendar.ts`                                                                                                                                                  |
| A historical movement                                                                             | `src/data/episodes/<movement>.ts` (one file per movement)                                                                                                               |
| A source (URL, headline, date, what it supports)                                                  | `src/data/sources/<group>.ts`                                                                                                                                           |
| A group of sources                                                                                | `src/data/sources/{types,groups,index}.ts`                                                                                                                              |
| Casualty cells, observations, estimators                                                          | `src/data/casualties/{cases,inputs,estimate}.ts`                                                                                                                        |
| A published casualty label, or its severity rung                                                  | `src/data/casualties/vocabulary.ts` — `LADDER`, one `NativeLabel` per published wording                                                                                 |
| The ICD-10 / AIS classification of a label                                                        | `src/data/casualties/coding.ts` — `CODE_SPANS`, one span per label                                                                                                      |
| A known, unresolved data problem                                                                  | `content/data-problems.md` in the [Observatory repo](https://github.com/Manifestigations/Protest-Data-Observatory/blob/main/content/data-problems.md)                   |
| Why a figure was chosen                                                                           | the verification record at the top of `src/data/index.ts` (read-only history)                                                                                           |
| A demographic share, or a demographic gap                                                         | `src/data/demographics/`                                                                                                                                                |

### 2.3 Add or correct a cell

Four shapes, one per data kind.

**2026 figures** — day-keyed cells in `FACTS`. Each cell is an `Obs`,
`{ low, high, q? }`, where `q` is the flag and a point figure has
`low === high`:

```ts
// in src/data/facts.ts, inside FACTS
"2026-09-28": {
  arrests: { low: 164, high: 164 },
  protesterInjured: { low: 1, high: 1, q: "f" },
  blockades: { low: 27, high: 27 },
},
```

The daily and weekly series are _computed_ from `FACTS` in `projections.ts` and
`aggregate.ts` — edit only the raw observations.

**Historical episodes** — a `Row` is one week: `w` runs sequentially from 0,
`from`/`to` are ISO dates bracketing it, and each metric is a band
(`number` or `[low, high]`), with optional per-metric `flag` and `noteRef`:

```ts
{ w: 0, from: "2023-06-26", to: "2023-07-02", p: [8_000, 50_000], flag: { p: "e" } },
{ w: 1, from: "2023-07-03", to: "2023-07-09", a: 108, f: 1 },
```

`p` turnout · `a` arrests · `f` forces injured · `i` protesters injured.

**Illegal-act records** — one `ActRecord` per claim, never per day and never a
total. A record is a case, with its own procedural state:

```ts
// in src/data/illegal/acts.ts, inside ILLEGAL_ACTS
{
  id: "act-2026-10-24-rouen-01",
  date: "2026-10-24",
  place: { commune: "Rouen", dep: "76", scope: "local" },
  side: "far-right",
  attribution: { term: "identitarian", by: "court" },
  charges: ["violences-volontaires"],
  track: "criminal",
  status: "investigation",
  count: { s: "n", v: 1, unit: "persons" },
  steps: [
    { date: "2026-10-24", kind: "incident", source: "lemonde-2026-10-26" },
    { date: "2026-10-26", kind: "investigation", court: "parquet de Rouen",
      source: "lemonde-2026-10-26" },
  ],
  sources: ["lemonde-2026-10-26"],
  noteRef: { k: "act", id: "act-2026-10-24-rouen-01" },
},
```

Rules for the register, and `npm run check:illegal` enforces every one:

- **No daily aggregate, ever.** The register is not a `MetricKey` and must not
  become one. A count per day counts press coverage.
- **`charges` is a list.** Usually one entry; two when one course of conduct was
  charged twice. Write `charges: []` — never omit the field — when no
  qualification has been published, and note that an empty list is only legal
  below `charged`. Every entry must be available against the record's `side`
  (`isChargeOf`), so a charge whose `sides` omits the record's side is a bug in
  one of the two files.
- **The status is a ladder**, in this order: `alleged` · `complaint` ·
  `investigation` · `charged` · `tried` · `convicted` · `acquitted` ·
  `dismissed` · `prescribed` · `unknown`. Every status from `complaint` upwards
  needs the matching step in `steps`, and `convicted`/`acquitted` need a verdict
  step reading `guilty` / `not-guilty`.
- **A figure with a home elsewhere is a link, not a copy.** If the act's count is
  already in `facts.ts` or `casualties/`, set `refs.fact` or `refs.casualties`
  and **omit** `count`. The two together are rejected: a restated figure drifts
  from its source.
- **A far-right record carries `attribution`**, and no other record does. The
  `term` is the word the source used, not a label of ours; `by` is who used it.
  The type union refuses a far-right record without it.
- **A counterfactual is never an allegation.** `NORMATIVE` records a police
  tactic read against the law of armed conflict: `status: "hypothetical"`, a
  `caveat` id, no `steps`, no `refs.sitting`, and never summed with
  `ILLEGAL_ACTS`.
- **Two records on one date in one commune are numbered by documented time of
  day**; a record whose time was not published sorts last. The same id twice is
  the one error a reader cannot see and `check:illegal` will.
- **The `noteRef` wording lives in the Observatory**, in both languages, in
  `src/copy/{en,fr}/chart.ts` under `actNotes`, keyed by the record id. A note
  explains provenance and procedure; it never restates the status or the count.

A sitting is its own record, not a field on an act:

```ts
// in src/data/illegal/sittings.ts, inside SITTINGS
{
  id: "sit-2026-10-20-paris",
  date: "2026-10-20",
  court: "Tribunal judiciaire de Paris",
  place: { commune: "Paris", dep: "75", scope: "local" },
  modes: ["comparution-immediate", "crpc"],
  rooms: { s: "n", v: 5, unit: "establishments" },
  roomsUsual: { s: "n", v: 2, unit: "establishments" },
  dockets: [
    { mode: "comparution-immediate", cases: { s: "a", v: 50, unit: "cases" } },
    { mode: "crpc", cases: { s: "a", v: 20, unit: "cases" } },
  ],
  nullityRisk: true,
  sources: ["lemonde-2026-10-21-en"],
  noteRef: { k: "act", id: "sit-2026-10-20-paris" },
},
```

One docket per track, never one figure across tracks. The act links back with
`refs.sitting`; the sitting never lists acts, so the relationship has one home.

Rules for all four:

- Keep ISO dates (`YYYY-MM-DD`).
- Keep the published range as a range. Do not compute a midpoint.
- Flag anything that is not a plain national count:

  | Flag | Use it when                                                      |
  | ---- | ---------------------------------------------------------------- |
  | `n`  | published national point figure (default; can be omitted)        |
  | `r`  | regional only — one city, one prefecture                         |
  | `p`  | partial coverage                                                 |
  | `f`  | floor: "at least N"                                              |
  | `e`  | derived or modelled — the note must state the arithmetic         |
  | `c`  | cumulative stock, or a subset of a larger published total        |
  | `w`  | weekly aggregate                                                 |
  | `x`  | a wider measure than the metric's definition (perturbés, closed) |

  `r`, `p`, `e`, `c` are **detached** (`isDetached()`): they are drawn hollow
  and never joined to the national line. Do not flip a flag to make a line
  continuous — fix the note instead. A `c` cell is never added to the total it
  is a subset of.

- **Demographic figures are not rows.** A share carries its `population` (what
  was counted), its `base` (`all` / `subset` / `poll`) and its denominator `n`
  where published. A figure that does not exist is a `DemoGap` with a `cause`
  (`not-collected`, `not-published`, `not-split`, `not-found`) — never a 0, never
  an empty cell. `poll` figures measure support, not participation, and must say
  so in their `population` string.
- **Disruptive acts** — one `ActRow` per (date, category), never a total. Category
  ids and their `unit` live in `src/data/disruptive/categories.ts`; rows go in
  `src/data/disruptive/acts.ts`:

  ```ts
  { date: "2026-10-24", category: "looting", low: 24, high: 24,
    unit: "premises", sources: ["interieur-24oct-bilan"] },
  ```

  `sources` names every `Source.id` the band rests on — `low` and `high` may come
  from different publishers. `unit` is `actions`, `establishments`, `premises` or
  `incidents`; rows of different units are never summed. A school-blockade row is
  never written by hand: `src/data/disruptive/index.ts` derives it from
  `FACTS.blockades`, so a correction in `facts.ts` cannot leave a stale copy.

- A day or week with no published figure stays empty. Do not interpolate.
- If the cell needs explaining, attach a `noteRef` — an id, not wording. The
  explanation itself is authored with the site's copy, in both languages; it is
  not stored in this repository.

A new `ChargeId` is a two-repository change and lands in both or not at all:
the id in `vocabulary.ts`, its `sides`/`family`/`articles` in `charges.ts`,
**and** a `CHARGE_LABELS` entry in `Protest-Data-Observatory:src/copy/legal.ts`.
That map is `Record<ChargeId, Bi>`, so an id without a label is a type error in
the Observatory. Never invent a `ChargeId` in a record: if the qualification is
not in the union, the record waits.

### 2.4 Adding a casualty label, or classifying one

A published injury statement enters as a label first and as a classification
second, and the two steps are separate files on purpose.

**The label** goes in `LADDER` in `src/data/casualties/vocabulary.ts`, as a
`NativeLabel` with three fields that matter:

- `id` — a stable key. `coding.ts` points at it, and renaming one breaks the
  span that references it. Add the id when you add the label, not later.
- `text` — the source's own wording, transcribed. Never harmonise two papers'
  words into one.
- `count` — omit it when the source states a severity without a number.

**The classification** goes in `CODE_SPANS` in
`src/data/casualties/coding.ts`. Every label needs exactly one span, and
`npm run check:casualties` fails on a label with none and on a label in two.

```ts
// in src/data/casualties/coding.ts, inside CODE_SPANS
{
  id: "registerHand",
  rung: "destruction",
  labels: ["registerHandAmputation"],
  grain: "type",
  icd10: ["S68.0", "S68.1", "S68.2", "S68.3", "S68.4"],
  ais: [2, 4],
  regions: ["upperExtremity"],
  basis: "editorial",
  aisEdition: null,
  assignment: "none",
},
```

What each field means, and the three you can get wrong:

- `grain` — `"type"` when the label names an injury, `"severity"` when it names
  a degree. A severity's set is wide by construction; anything downstream that
  wants a per-injury figure may only read a `"type"` span.
- `icd10` / `external` — at least one must be non-empty. A death is tabulated
  by external cause (chapter XX), not by an injury code, so its `icd10` is `[]`
  and `ais` is `null`.
- `ais` — `[lo, hi]` within 1–6. A range, never a single value for a label that
  spans levels (an amputation is `2–5`: a thumb and an upper arm are not the
  same injury). The rung's `mais` string in `LADDER` must stay reachable from
  one of its spans' ranges.
- `basis` / `aisEdition` — `"editorial"` and `null` unless you actually read a
  named AIS edition. An editorial alignment may not claim an edition.
- `assignment` — always `"none"`. No record in this repository carries a
  diagnosis. Widening it is a schema change with its own review, not an edit.

Then `npm run check:casualties` and `npm run typecheck`.

### 2.5 Add the source

Add an entry to `src/data/sources/<group>.ts` following the entries next to it,
using the `src()` / `both()` helpers from `src/data/sources/record.ts`. The
fields (from `src/data/sources/types.ts`) are:

| Field              | Rule                                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | short unique handle, e.g. `wiki-nahel`                                                                                                                                |
| `group`            | one of `official`, `press`, `blockades`, `cost`, `overseas`, `ref2026`, `mai68`, `cpe`, `gj`, `strikes`, `nahel`, `retraites`, `rn2024`, `bloquons`, `media`, `legal` |
| `label`            | publisher + headline **verbatim** — never translated                                                                                                                  |
| `url`              | the page cited                                                                                                                                                        |
| `date` / `dateEnd` | ISO; omit `date` for standing pages                                                                                                                                   |
| `what`             | bilingual — what this page takes from the source                                                                                                                      |

`legal` is the group for prosecutors' communiqués, court reporting and the
sources behind the illegal-act register. A record's `sources` and every
`steps[].source` must name an id that resolves; `check:illegal` fails on an
unknown one.

A new group means extending `GroupId` in `src/data/sources/types.ts`, adding its
`SourceGroup` (bilingual `title` and `blurb`) to `GROUPS` in
`src/data/sources/groups.ts`, creating `src/data/sources/<group>.ts`, and
registering it in `src/data/sources/index.ts`.

### 2.6 Check and commit

```bash
npm run typecheck
npm run lint
npm run format:check
npm run check:casualties   # if you touched casualties/
npm run check:costs # if you touched costs.ts
npm run check:illegal # if you touched illegal/

git add -A
git commit -m "data: 2026 arrests for 8 Nov corrected to 412 (prefecture)"
```

There is no generated output to stage: everything is source. A check failure
means the data contradicts itself, not that the check is too strict — fix the
data.

---

## 3. Pull request checklist

- [ ] Every new or changed figure has a `Source` entry, and `label` is verbatim.
- [ ] Comparative movements need a verdict and a per-demand state, because the map and the outcome tables read them directly; a movement without a stated verdict does not merge.
- [ ] Ranges are kept as ranges; nothing averaged across publishers.
- [ ] Flags describe the data, not the drawing.
- [ ] Gaps left empty; derived cells flagged `e` with the arithmetic stated.
- [ ] No `c` cell added to the total it is a subset of.
- [ ] Any new human-facing string exists in both `en` and `fr`.
- [ ] `npm run typecheck`, `npm run lint`, `npm run format:check` pass.
- [ ] `npm run check:casualties` passes if casualty data changed.
- [ ] `npm run check:costs` passes if a cost record changed.
- [ ] `npm run check:illegal` passes if anything under `src/data/illegal/`
      changed.
- [ ] `content/data-problems.md` (Observatory repo) updated if you settled a
      known data problem.
- [ ] Every `ActRow.sources` id resolves in `src/data/sources/`; a derived
      blockade row cites only the publisher that issued that day's balance.
- [ ] A category row's `unit` and definition match what its source actually
      counted (premises, acts, establishments, incidents — and `touchés` ≠ `pillés`).
- [ ] No illegal-act record carries both `count` and a `refs` figure.
- [ ] A new `ChargeId` has its `CHARGE_LABELS` entry in the Observatory, or the
      Observatory does not compile.
- [ ] No daily aggregate of the illegal-act register, in this repo or in the
      site.
- [ ] A new `NativeLabel` has an `id` **and** a `CODE_SPANS` entry, or
      `check:casualties` fails.
- [ ] No `CodeSpan` is rendered or described as a diagnosis: `assignment` is
      `"none"` on every span, and no ISS/NISS/TRISS is computed from one.

We will not merge: a figure with no source, a silently interpolated gap, a
translated source label, a flag removed to smooth a line, or a charge id added
in one repository only.

---

## Commit messages

Descriptive, often lowercase:

```
data: 2026 arrests for 8 Nov corrected to 412 (prefecture)
data: 18 Oct blockades added, Paris-only, flagged "r"
sources: add prefecture bulletin of 12 Nov under press
illegal: Rouen 24 Oct record, investigation opened 26 Oct
casualties: code the register's labels in ICD-10 and AIS
```

State data changes explicitly (`data:`, which figure, which date, which
publisher). If an LLM drafted the change, say so in a `Co-authored-by:`
trailer — this project is explicit about what was machine-written.
