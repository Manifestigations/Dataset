# Contributing

Two rules cover most of it:

1. **A figure without a source does not go in.** One number, one date, one link.
2. **Open an issue before a large pull request.** Settling the data question
   first usually halves the code.

French or English, whichever is easier for you. A free GitHub account is the
only requirement for reporting.

---

## 1. Reporting a figure (no code, no install)

Open an issue in this repository (use the "report a figure" template if
present, otherwise a plain issue). Include:

| Field | What we need |
| ----- | ----- |
| What the number measures | crowd, strikers, arrests, injuries (which side), blockaded schools, damage, cost of policing |
| Where and when | the date (ISO, `YYYY-MM-DD`), and the territory — national, a region, a city, one institution |
| The number as published | keep the range if the publisher gives one; do not average two publishers for us |
| The source | a URL, a report title and page, or outlet and date. Paywalled or PDF is not an obstacle: say so and we will fetch it |
| Who published it | and whether it is a **count** or an **estimate** — the data distinguishes the two |

Also welcome as issues here:

- a movement missing from the historical comparison, or a group of sources to
  add under `src/sources/`;
- two published figures that contradict a figure we hold — the resolution
  belongs in `docs/data-problems.md` once settled.

**Where this repo stops:** this repository holds the *data*. If something is
wrong on the *website* — a chart drawn from a single publisher, an
interpolated gap that should be empty, a detached point joined to the line,
tab order, canvas descriptions, contrast — open that issue in the
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
the framework or Chart.js.

### 2.1 Set up

```bash
git clone https://github.com/Manifestigations/Dataset.git
cd Dataset
npm install   # Node ≥ 22.18
npm run typecheck
```

No dev server: this is a data package, not a site. `npm run build` emits the
plain-JSON bundle in `json/` (episodes, sources, reference, notes, manifest)
and the JSON schema in `schema/` — the same data without TypeScript, handy
for reading or for other tools.

### 2.2 Find the right file

| You are changing | File |
| ----- | ----- |
| An autumn 2026 figure (any day) | `src/reference/data.ts` — raw observations in `FACTS` (one key per ISO date) |
| A historical movement | `src/episodes/<movement>.ts` (one file per movement) |
| A source (URL, headline, date, what it supports) | `src/sources/<group>.ts` |
| A note explaining a cell | `src/reference/notes.ts` (referenced by `noteRef`) |
| A denominator (population) | `src/reference/population.ts` |
| A known, unresolved data problem | `docs/data-problems.md` |

### 2.3 Add or correct a cell

Two shapes, one per data kind.

**2026 figures** — day-keyed cells in `FACTS`. Each cell is
`{ low, high, q }`, where `q` is the flag; a point figure has
`low = high`:

```ts
// in src/reference/data.ts, inside FACTS
"2026-09-28": {
  arrests: { low: 164, high: 164 },
  protesterInjured: { low: 1, high: 1, q: "f" },
  blockades: { low: 27, high: 27 },
},
```

The derived daily/weekly series are *computed* by that file — edit only the
raw observations.

**Historical episodes** — a `Row` is one week: `w` runs sequentially from 0,
`from`/`to` are ISO dates bracketing it, and each metric is a band
(`number` or `[low, high]`):

```ts
{ w: 1, from: "2023-07-03", to: "2023-07-09", a: 108, f: 1 },
{ w: 0, from: "2023-06-26", to: "2023-07-02", p: [8_000, 50_000], flag: { p: "e" } },
```

Rules for both:

- Keep ISO dates (`YYYY-MM-DD`).
- Keep the published range as a range. Do not compute a midpoint.
- Flag anything that is not a plain national count:

  | Flag | Use it when |
  | ---- | ----- |
  | `n`  | published national point figure (default; can be omitted) |
  | `r`  | regional only — one city, one prefecture |
  | `p`  | partial coverage |
  | `f`  | floor: "at least N" |
  | `e`  | derived or modelled — the note must state the arithmetic |
  | `c`  | cumulative stock, or a subset of a larger published total |
  | `w`  | weekly aggregate |
  | `x`  | a wider measure than the metric's definition (perturbés, closed) |

  `r`, `p`, `e`, `c` are **detached** (`isDetached()`): they are drawn hollow
  and never joined to the national line. Do not flip a flag to make a line
  continuous — fix the note instead.
- A day or week with no published figure stays empty. Do not interpolate.
- If the cell needs explaining, add a `noteRef` and put the wording in
  `src/reference/notes.ts` in both languages. Notes are references, not copy.

### 2.4 Add the source

Add an entry to `src/sources/<group>.ts` following the entries next to it.
The fields (from `src/sources/types.ts`) are:

| Field | Rule |
| ----- | ----- |
| `id` | short unique handle, e.g. `wiki-nahel` |
| `group` | one of `official`, `press`, `blockades`, `cost`, `overseas`, `ref2026`, `mai68`, `cpe`, `gj`, `strikes`, `nahel`, `retraites`, `rn2024`, `bloquons`, `media` |
| `label` | publisher + headline **verbatim** — never translated |
| `url` | the page cited |
| `date` / `dateEnd` | ISO; omit `date` for standing pages |
| `what` | bilingual — what this page takes from the source |

A new group means extending `GroupId` in `src/sources/types.ts`, adding its
`SourceGroup` to the group catalogue, and registering it in
`src/sources/index.ts`.

### 2.5 Check and commit

```bash
node scripts/build.ts
npm run typecheck
npm run validate
git add src json schema csv
git commit -m "data: 2026 arrests for 8 Nov corrected to 412 (prefecture)"
```

A `validate` failure means the data contradicts itself, not that the check is
too strict — fix the data. Commit **`src/` only**: `json/` and `schema/` are
regenerated at release time, so there is nothing else to stage.

---

## 3. Pull request checklist

- [ ] Every new or changed figure has a `Source` entry, and `label` is verbatim.
- [ ] Ranges are kept as ranges; nothing averaged across publishers.
- [ ] Flags describe the data, not the drawing.
- [ ] Gaps left empty; derived cells flagged `e` with the arithmetic in the note.
- [ ] Any new human-facing string exists in both `en` and `fr`.
- [ ] `npm run typecheck` passes; `npm run validate` passes.
- [ ] `node scripts/build.ts` was run and `json/`, `schema/`, `csv/` are committed.
- [ ] `docs/data-problems.md` updated if you settled a known data problem.

We will not merge: a figure with no source, a silently interpolated gap, a
translated source label, or a flag removed to smooth a line.

---

## Commit messages

Descriptive, often lowercase:

```
data: 2026 arrests for 8 Nov corrected to 412 (prefecture)
data: 18 Oct blockades added, Paris-only, flagged "r"
sources: add prefecture bulletin of 12 Nov under press
```

State data changes explicitly (`data:`, which figure, which date, which
publisher). If an LLM drafted the change, say so in a `Co-authored-by:`
trailer — this project is explicit about what was machine-written.
