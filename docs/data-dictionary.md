# Data dictionary

## Grain

| File | Grain | Shape |
| --- | --- | --- |
| `reference.json → facts` | 2026, **daily** | `{ [ISO date]: { [MetricKey]: Obs } }`, `Obs = { low, high, q? }` |
| `reference.json → weekly` | 2026, **weekly** (pre-aggregated) | `Series = Pt[]`, `Pt = { v, band, q, note, detach }` |
| `episodes.json` | historic movements, **weekly** | `Episode = { id, start, end, weeks: Row[] }` |
| `sources.json` | one row per source | `Source = { id, group, label, url, date?, dateEnd?, what }` |

## Value semantics

- `low == high` → point figure; `low < high` → a published range. Storage never
  collapses a range; `midOf` is a *drawing* convention only.
- A missing key is "no published figure" — never zero, never interpolated.
- `q` / `flag` carry the flags from the README table (`n r p f e c w x`);
  `r p e c` are *detached* — never joined to a national line.
- Weekly aggregation: `turnout`/`strikers`/`blockades` = week's peak (a level,
  not a sum); `arrests`/`forcesInjured`/`protesterInjured` = week's sum.

## Metric keys

Short codes `p a f i` map to `turnout arrests forcesInjured protesterInjured`
(`METRIC_OF`). The 2026-only keys are `strikers`, `forcesInjuredStock`,
`damagesCost`, `policingCost`, `heliCost`, `blockades`.

## Denominators

`reference.json → population` is keyed by vintage (`"1968" … "2026"`); each
entry has `at`, `france` (may be `null` — e.g. 1968 is metro-only) and `metro`.
Use `france` when present, else `metro`.

## Episode ids

`may68 · cpe · gj · nahel · pensions · bt · students26` — order in
`episodes.json` is display order, not chronological.
