import { midOf, type Band, type Flag } from "../../model/index.ts";
import { EPISODES } from "../episodes/index.ts";
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

/** Renamed from METRICS: src/model/index.ts already exports METRICS
 *  (["p","a","f","i"]), and two different constants under one name is how the
 *  next reader gets the wrong list. */
const ACTION_METRICS: readonly ActionMetric[] = ["p", "a", "i", "f", "s"];

/** Turnout is not summable: adding the crowd on 24 Oct to the crowd on 17 Oct
 *  double-counts the same people. Only these four are totals. Derived from
 *  ACTION_METRICS rather than retyped, so the two lists cannot drift apart. */
const SUMMABLE = ACTION_METRICS.filter(
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

/** France carries no actions: it is read from the weekly episode, so its peak
 *  is a WEEKLY aggregate and is flagged "w" rather than mixed silently into
 *  action-day maxima. */
function episodePeaks(
  id: NonNullable<Movement["episodeRef"]>,
): Array<{ band: Band; date: string; flag: Flag }> {
  const ep = EPISODES.find((e) => e.id === id);
  if (!ep) return [];
  return ep.weeks
    .filter((w): w is typeof w & { p: Band } => w.p !== undefined)
    .map((w) => ({ band: w.p, date: w.from, flag: "w" as const }));
}

export function stats(m: Movement): MovementStats {
  const own = m.actions
    .map((a) => ({ a, band: pick(a, "p") }))
    .filter((x): x is { a: Action; band: Band } => x.band !== undefined)
    .map((x) => ({
      band: x.band,
      date: x.a.date,
      mid: midOf(x.band),
      flag: x.a.flag?.p,
    }));

  const fromEpisode = m.episodeRef
    ? episodePeaks(m.episodeRef).map((x) => ({ ...x, mid: midOf(x.band) }))
    : [];

  const peaks = [...own, ...fromEpisode];

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
  let published = 0;
  let summed = 0;

  for (const k of SUMMABLE) {
    const pub = m.published?.[k];
    if (pub !== undefined) {
      total[k] = pub;
      published += 1;
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
    summed += 1;
  }

  /* Derived from the keys actually used, not from `m.published` existing:
     a movement that publishes only turnout has no total at all. */
  const basis: MovementStats["basis"] = published
    ? "published"
    : summed
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

/** Gantt: one bar per movement. `end` falls back to the window's end for open
 *  movements, so the chart and the French episode agree. */
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
 *  has already won, so a concession never repaints a live movement as settled.
 *  Where a country holds several movements, "ongoing" outranks the rest — an
 *  explicit rule, because last-write-wins depended on sort order. */
const VERDICT_RANK = { ongoing: 3, failed: 2, succeeded: 1 } as const;

export function verdicts(): Readonly<
  Record<string, "succeeded" | "failed" | "ongoing">
> {
  const out: Record<string, "succeeded" | "failed" | "ongoing"> = {};
  for (const m of MOVEMENTS) {
    const current = out[m.geo.country];
    if (!current || VERDICT_RANK[m.verdict] > VERDICT_RANK[current]) {
      out[m.geo.country] = m.verdict;
    }
  }
  return out;
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
        peakFlag: s.peak.flag,
        n: s.actions,
      },
    ];
  });
}
