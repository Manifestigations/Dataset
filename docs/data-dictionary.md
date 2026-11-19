# Data dictionary

## Grain

| File                              | Grain                             | Shape                                                                                                                                                                                        |
| --------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reference.json → facts`          | 2026, **daily**                   | `{ [ISO date]: { [MetricKey]: Obs } }`, `Obs = { low, high, q? }`                                                                                                                            |
| `reference.json → weekly`         | 2026, **weekly** (pre-aggregated) | `Series = Pt[]`, `Pt = { v, band, q, note, detach }`                                                                                                                                         |
| `episodes.json`                   | historic movements, **weekly**    | `Episode = { id, start, end, weeks: Row[] }`                                                                                                                                                 |
| `sources.json`                    | one row per source                | `Source = { id, group, label, url, date?, dateEnd?, what }`                                                                                                                                  |
| `OPINION_POLLS` (TypeScript only) | **one row per published poll**    | `OpinionPoll = { id, subject, pollster, client, sources, field, published, n, universe, asked, buckets[] }` — `buckets` hold the published shares of the sample, in the pollster's own words |
| `acts.json → act rows`            | 2026, **daily × category**        | `ActRow = { date, category, low, high, q?, unit, sources }`                                                                                                                                  |

## Value semantics

- `low == high` → point figure; `low < high` → a published range. Storage never
  collapses a range; `midOf` is a _drawing_ convention only.
- A missing key is "no published figure" — never zero, never interpolated.
- `q` / `flag` carry the flags from the README table (`n r p f e c w x`);
  `r p e c` are _detached_ — never joined to a national line.
- Weekly aggregation: `turnout`/`strikers`/`blockades` = week's peak (a level,
  not a sum); `arrests`/`forcesInjured`/`protesterInjured` = week's sum.
  `disruptiveActs` has no weekly series: the count is published on one day per
  week, so a weekly figure would re-plot that day rather than aggregate it, and
  a sum would add the published days while silently dropping the unpublished
  ones. Same reason `damagesCost` is daily only.
- A poll bucket is a share of the adults surveyed, never a count of people in
  the street, and never a share of the population. Buckets are stored as
  published: `indifférents` is not `ne sait pas`, and `approuvent` is not
  `soutenient`. `opinionAverage()` takes one `subject` at a time.

## Metric keys

Short codes `p a f i` map to `turnout arrests forcesInjured protesterInjured`
(`METRIC_OF`). The 2026-only keys are `strikers`, `forcesInjuredStock`,
`damagesCost`, `policingCost`, `heliCost`, `blockades`, `disruptiveActs`.

`disruptiveActs` is the ministry's count of _actions de voie publique_ for the
day — a count of acts, not of people. It is not the sum of the category rows in
`src/data/disruptive/`: those are a subset, and school blockades are counted in
establishments.

## Denominators

`reference.json → population` is keyed by vintage (`"1968" … "2026"`); each
entry has `at`, `france` (may be `null` — e.g. 1968 is metro-only) and `metro`.
Use `france` when present, else `metro`.

## Episode ids

`may68 · cpe · gj · nahel · pensions · bt · students26` — order in
`episodes.json` is display order, not chronological.
