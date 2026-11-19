import { midOf, type Band, type Flag } from "../../model/index.ts";
import { MOVEMENTS } from "./index.ts";
import type { Action, ActionMetric, Movement } from "./types.ts";

/* ── Derived statistics ──────────────────────────────────────────────────────
   Computed from actions[], never hand-stored — the same rule projections.ts and
   aggregate.ts follow. The only stored overrides are `published`, for campaign
   totals spanning a window the action rows cannot reconstruct.

   Two statistics here are traps, so they are named to warn:
   · `peak` is a MAXIMUM, and maxima are the only turnout figure that is
     comparable across movements.
   · `total` for `p` is meaningless (you cannot add crowds across days) and is
     therefore NOT computed. `total` exists for a/i/f/s, which are sums. */

const METRICS: readonly ActionMetric[] = ["p", "a", "i", "f", "s"];

/** Turnout is not summable: adding the crowd on 24 Oct to the crowd on 17 Oct
 *  double-counts the same people. Only these four are totals. Derived from
 *  METRICS rather than retyped, so the two lists cannot drift apart. */
const SUMMABLE = METRICS.filter(
  (m): m is Exclude<ActionMetric, "p"> => m !== "p",
);

function loHi(b: Band): [number, number] {
  return typeof b === "number" ? [b, b] : b;
}

function pick(a: Action, k: ActionMetric): Band | undefined {
  return a[k];
}

export interface MovementStats {
  readonly id: string;
  /** Action days recorded, whether or not they carry a figure. */
  readonly actions: number;
  /** The single largest recorded turnout, with its date. */
  readonly peak?: {
    readonly band: Band;
    readonly date: string;
    readonly flag?: Flag;
  };
  /** Median turnout across days carrying a figure. Median of band midpoints,
   *  so it is a model of the data, not a figure from it: flagged "e". */
  readonly median?: Band;
  readonly mean?: number;
  /** Sums. Absent for `p` on purpose. */
  readonly total: {
    readonly a?: Band;
    readonly i?: Band;
    readonly f?: Band;
    readonly s?: Band;
  };
  /** Where each total came from. */
  readonly basis: "published" | "sum" | "none";
}

export function stats(m: Movement): MovementStats {
  const peaks = m.actions
    .map((a) => ({ a, band: pick(a, "p") }))
    .filter((x): x is { a: Action; band: Band } => x.band !== undefined)
    .map((x) => ({
      band: x.band,
      date: x.a.date,
      mid: midOf(x.band),
      flag: x.a.flag?.p,
    }));

  const peak = peaks.length
    ? peaks.reduce((best, x) => (x.mid > best.mid ? x : best))
    : undefined;

  const medians = peaks.map((x) => x.mid).sort((x, y) => x - y);
  const median: Band | undefined = medians.length
    ? medians.length % 2
      ? medians[(medians.length - 1) / 2]
      : Math.round(
          (medians[medians.length / 2 - 1] + medians[medians.length / 2]) / 2,
        )
    : undefined;

  const mean = medians.length
    ? Math.round(medians.reduce((s, v) => s + v, 0) / medians.length)
    : undefined;

  /* Keyed by ActionMetric, not string: the loop below can only ever write
     summable keys, and the return type makes a missing one visible. */
  const total: Partial<Record<ActionMetric, Band>> = {};
  for (const k of SUMMABLE) {
    const pub = m.published?.[k];
    if (pub !== undefined) {
      total[k] = pub;
      continue;
    }
    const bands = m.actions
      .map((x) => pick(x, k))
      .filter((b): b is Band => b !== undefined);
    if (!bands.length) continue;
    const pairs = bands.map(loHi);
    total[k] = [
      pairs.reduce((s, [lo]) => s + lo, 0),
      pairs.reduce((s, [, hi]) => s + hi, 0),
    ];
  }

  const basis: MovementStats["basis"] = m.published
    ? "published"
    : Object.keys(total).length
      ? "sum"
      : "none";

  return {
    id: m.id,
    actions: m.actions.length,
    peak: peak && { band: peak.band, date: peak.date, flag: peak.flag },
    median,
    mean,
    total: {
      a: total.a,
      i: total.i,
      f: total.f,
      s: total.s,
    },
    basis,
  };
}

export const MOVEMENT_STATS: ReadonlyMap<string, MovementStats> = new Map(
  MOVEMENTS.map((m) => [m.id, stats(m)]),
);

/* ── Chart adapters ─────────────────────────────────────────────────────────
   The three shapes the new visualisations need, so no chart touches the raw
   registry. */

/** Gantt: one bar per movement. `end` falls back to today for open movements —
 *  pass the window's end so the chart and the French episode agree. */
export function gantt(until: string) {
  return MOVEMENTS.map((m) => ({
    id: m.id,
    label: m.short,
    region: m.region,
    start: m.start,
    end: m.end ?? until,
    open: m.end === null,
    approx: m.startApprox === true,
    episodeRef: m.episodeRef,
  }));
}

/** World map: three fills. A movement still mobilising is "ongoing" whatever it
 *  has already won, so a concession never repaints a live movement as settled. */
export function verdicts(): Readonly<
  Record<string, "succeeded" | "failed" | "ongoing">
> {
  return Object.fromEntries(MOVEMENTS.map((m) => [m.geo.country, m.verdict]));
}

/** Choropleth: peak turnout per country. Where a country has several movements,
 *  the largest peak wins; where none published a turnout, the country is absent
 *  rather than zero — absence is not a figure. */
export function turnoutByCountry(): Readonly<
  Record<
    string,
    { readonly peak: Band; readonly id: string; readonly date: string }
  >
> {
  const out: Record<string, { peak: Band; id: string; date: string }> = {};
  for (const m of MOVEMENTS) {
    const s = MOVEMENT_STATS.get(m.id);
    if (!s?.peak) continue;
    const current = out[m.geo.country];
    if (!current || midOf(s.peak.band) > midOf(current.peak)) {
      out[m.geo.country] = { peak: s.peak.band, id: m.id, date: s.peak.date };
    }
  }
  return out;
}

/** Trellis: one panel per movement, two marks — median and peak — which is what
 *  PanelsCopy.median / PanelsCopy.peak already label. Panels with no turnout
 *  figure are dropped rather than drawn empty. */
export function trellis() {
  return MOVEMENTS.flatMap((m) => {
    const s = MOVEMENT_STATS.get(m.id);
    if (!s?.peak) return [];
    return [
      {
        id: m.id,
        label: m.short,
        verdict: m.verdict,
        median: s.median,
        mean: s.mean,
        peak: s.peak.band,
        peakDate: s.peak.date,
        n: s.actions,
      },
    ];
  });
}
