# Dataset

The core dataset and data models for the 2026 Autumn protests in France
(student protests / Gilets Jaunes × Gen Z). Consumed by
[Protest-Data-Observatory](https://github.com/Manifestigations/Protest-Data-Observatory)
as a git submodule and bundled into its site build.

## Layout

- `src/data/` — 2026 figures, historical episodes, source catalogues, casualty data
- `src/model/index.ts` — shared types (`Metric`, `Flag`, `Band`, `Row`, `Episode`, …)
- `scripts/check-casualties.ts` — data-integrity checks

```mermaid
erDiagram
    EPISODE {
        EpisodeId id PK "may68 · cpe · gj · nahel · pensions · bt · students26"
        string start "ISO date"
        string end "ISO date"
    }
    WEEK_ROW {
        int w PK "row index, sequential from 0"
        string from "ISO, start of week"
        string to "ISO, end of week"
        int act "optional"
        boolean partial "optional"
        Band p "turnout — number or [low, high]"
        Band a "arrests"
        Band f "forces injured"
        Band i "protesters injured"
        Flag flag "per-metric, optional"
        NoteRef noteRef "per-metric, optional"
    }
    SOURCE_GROUP {
        GroupId id PK "official · press · cost · gj · …"
        Bi title
        Bi blurb
    }
    SOURCE {
        string id PK
        GroupId group FK
        string label "verbatim publisher + headline — never translated"
        string url
        string date "ISO, optional"
        string dateEnd "ISO, optional"
        Bi what "what this page takes from the source"
    }
    METRIC_KEY {
        string key "turnout · strikers · arrests · forcesInjured<br/>forcesInjuredStock · protesterInjured · damagesCost<br/>policingCost · heliCost · blockades"
    }

    EPISODE ||--o{ WEEK_ROW : "weeks: Row[]"
    SOURCE_GROUP ||--o{ SOURCE : "contains"
    WEEK_ROW }o--o{ METRIC_KEY : "p/a/f/i map to MetricKey; superset keys carried by separate modules"
```

## Invariants (do not violate)

- `Band = number | [number, number]` — a published range stays a range.
  Never average two publishers; never midpoint a band.
- Never change a `Flag` to make a series continuous (`r|p|e|c` are detached by definition).
- Never interpolate a gap. Absent cell = no published figure.
- `Source.label` is verbatim publisher + headline, never translated.
- All user-visible strings are `Bi = { en, fr }`. French is authored, not translated.
- Not verified data: never present figures as fact in copy or docs.

## Contributing

1. Branch, edit the data, add/keep a verbatim-labelled `Source` for every figure.
2. `npm install && npm run check:casualties && npm run typecheck`
3. Merge to `main`, tag a release (`vYYYY.n`).
4. Open a follow-up PR in Protest-Data-Observatory bumping `vendor/dataset`
   and rebuilding `docs/`.

## How one number gets in

```mermaid
flowchart TD
  A["A new figure appears in the wild"] --> B{"Source already in<br/>src/data/sources/ ?"}
  B -- "no" --> B1["Add a Source via src() / both()<br/>label = verbatim publisher + headline"]
  B -- "yes" --> C
  B1 --> C["Add the Band to the right week's Row<br/>2026: src/data/* · historic: src/data/episodes/movement.ts"]
  C --> D{"Does the cell need explaining?"}
  D -- "yes" --> D1["Attach a noteRef<br/>wording lives in src/data/notes.ts, never in the cell"]
  D -- "no" --> E["Plain national count → flag n (or omit)"]
  D1 --> F["Set the right Flag<br/>only if it is not a plain national count"]
  F --> G
  E --> G["npm run check:casualties && npm run typecheck"]
  G --> H["Merge to main · tag release vYYYY.n"]
  H --> I["Follow-up PR in Protest-Data-Observatory:<br/>bump vendor/dataset, rebuild docs/"]
```
> The loop you must **not** do: averaging two publishers, mid-pointing a band, interpolating a gap, or
> re-flagging a point to make a series continuous.
