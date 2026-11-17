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
```

No dev server, and no build: this is a data package, not a site, and the data
is consumed as TypeScript source. The checks you have are `typecheck`, `lint`,
`format:check` and `check:casualties`.

### 2.2 Find the right file

| You are changing                                  | File                                                                                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| An autumn 2026 figure (any day)                   | `src/data/facts.ts` — `FACTS`, one key per ISO date                                                                                                   |
| An autumn 2026 deployment, force level, cost rate | `src/data/policing.ts`                                                                                                                                |
| A denominator (population)                        | `src/data/population.ts`                                                                                                                              |
| The window, the week grid, the school holidays    | `src/data/calendar.ts`                                                                                                                                |
| A historical movement                             | `src/data/episodes/<movement>.ts` (one file per movement)                                                                                             |
| A source (URL, headline, date, what it supports)  | `src/data/sources/<group>.ts`                                                                                                                         |
| A group of sources                                | `src/data/sources/{types,groups,index}.ts`                                                                                                            |
| Casualty cells, observations, estimators          | `src/data/casualties/{cases,inputs,estimate}.ts`                                                                                                      |
| A known, unresolved data problem                  | `content/data-problems.md` in the [Observatory repo](https://github.com/Manifestigations/Protest-Data-Observatory/blob/main/content/data-problems.md) |
| Why a figure was chosen                           | the verification record at the top of `src/data/data.ts` (read-only history)                                                                          |

### 2.3 Add or correct a cell

Two shapes, one per data kind.

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

Rules for both:

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

- A day or week with no published figure stays empty. Do not interpolate.
- If the cell needs explaining, attach a `noteRef` — an id, not wording. The
  explanation itself is authored with the site's copy, in both languages; it is
  not stored in this repository.

### 2.4 Add the source

Add an entry to `src/data/sources/<group>.ts` following the entries next to it,
using the `src()` / `both()` helpers from `src/data/sources/record.ts`. The
fields (from `src/data/sources/types.ts`) are:

| Field              | Rule                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`               | short unique handle, e.g. `wiki-nahel`                                                                                                                       |
| `group`            | one of `official`, `press`, `blockades`, `cost`, `overseas`, `ref2026`, `mai68`, `cpe`, `gj`, `strikes`, `nahel`, `retraites`, `rn2024`, `bloquons`, `media` |
| `label`            | publisher + headline **verbatim** — never translated                                                                                                         |
| `url`              | the page cited                                                                                                                                               |
| `date` / `dateEnd` | ISO; omit `date` for standing pages                                                                                                                          |
| `what`             | bilingual — what this page takes from the source                                                                                                             |

A new group means extending `GroupId` in `src/data/sources/types.ts`, adding its
`SourceGroup` (bilingual `title` and `blurb`) to `GROUPS` in
`src/data/sources/groups.ts`, creating `src/data/sources/<group>.ts`, and
registering it in `src/data/sources/index.ts`.

### 2.5 Check and commit

```bash
npm run typecheck
npm run lint
npm run format:check
npm run check:casualties   # casualty cross-checks; run it if you touched casualties/

git add -A
git commit -m "data: 2026 arrests for 8 Nov corrected to 412 (prefecture)"
```

There is no generated output to stage: everything is source. A
`check:casualties` failure means the casualty data contradicts itself, not that
the check is too strict — fix the data.

---

## 3. Pull request checklist

- [ ] Every new or changed figure has a `Source` entry, and `label` is verbatim.
- [ ] Ranges are kept as ranges; nothing averaged across publishers.
- [ ] Flags describe the data, not the drawing.
- [ ] Gaps left empty; derived cells flagged `e` with the arithmetic stated.
- [ ] No `c` cell added to the total it is a subset of.
- [ ] Any new human-facing string exists in both `en` and `fr`.
- [ ] `npm run typecheck`, `npm run lint`, `npm run format:check` pass.
- [ ] `npm run check:casualties` passes if casualty data changed.
- [ ] `content/data-problems.md` (Observatory repo) updated if you settled a
      known data problem.

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
