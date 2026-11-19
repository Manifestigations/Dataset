import type { Bi } from "../../copy/index.ts";
import type { Band, Flag } from "../../model/index.ts";

/* ── Comparative movements ────────────────────────────────────────────────────
   A second layer, deliberately NOT an Episode. Episodes are weekly; these are
   action-day granularity at national level. The four metric letters are Row's,
   so midOf() and the flag vocabulary apply unchanged. `s` is new: strikers are
   not a crowd and must never be added to `p`.

   The layer is separate from EPISODES because EPISODES order fixes the section C
   panel order, the trellis ramp index and section E's x-axis. Adding to it would
   repaint the historic comparisons. */

/** p turnout · a arrests · i protesters injured · f forces injured
 *  s strikers (a count of workers, not of people in a square). */
export type ActionMetric = "p" | "a" | "i" | "f" | "s";

export type Region = "europe" | "americas" | "asia-pacific";

/** Exactly the three fills the world map has. "ongoing" wins over any
 *  concession already won: a movement still mobilising is still ongoing. */
export type Verdict = "succeeded" | "failed" | "ongoing";

export type DemandState = "met" | "partial" | "unmet" | "unclear";

export interface Geo {
  /** ISO 3166-1 alpha-2 — the join key for the choropleth. */
  readonly country: string;
  readonly countryName: Bi;
  /** Where the movement is anchored, for the map dot and the Gantt row label. */
  readonly city: Bi;
  /** WGS84 city centre. A dot, not a country centroid. */
  readonly lat: number;
  readonly lon: number;
  /** Cities with at least one recorded action; omitted when not published. */
  readonly sites?: number;
}

export interface Cost {
  readonly low: number;
  readonly high: number;
  readonly currency: "EUR" | "USD" | "INR" | "BRL" | "RSD" | "GBP";
  /** What the figure is a figure OF: annual, one-off, over N years. A cost
   *  without its basis is not a cost. */
  readonly basis: Bi;
  readonly flag?: Flag;
}

export interface Demand {
  readonly id: string;
  readonly text: Bi;
  /** Cost of meeting the demand, where a published estimate exists. */
  readonly cost?: Cost;
  readonly state: DemandState;
  /** What was actually conceded, in the movement's own terms. */
  readonly granted?: Bi;
  /** Cost of the concession, kept separate from the cost of the demand. */
  readonly grantedCost?: Cost;
  readonly src: string;
}

export interface Action {
  readonly date: string;
  readonly p?: Band;
  readonly a?: Band;
  readonly i?: Band;
  readonly f?: Band;
  readonly s?: Band;
  readonly flag?: Partial<Record<ActionMetric, Flag>>;
  /** One-line qualifier: "union claim only", "camp", "clipped". Migrate to a
   *  noteRef if this ever needs translating twice. */
  readonly note?: Bi;
  readonly src: string;
}

/** Campaign totals the source publishes for a span the actions cannot
 *  reconstruct. Overrides the computed sum, and says so. */
export interface Published {
  readonly a?: Band;
  readonly i?: Band;
  readonly f?: Band;
  readonly s?: Band;
  readonly flag?: Partial<Record<ActionMetric, Flag>>;
  readonly src: string;
}

export interface Movement {
  readonly id: string;
  readonly name: Bi;
  /** Legend / axis label. Short enough for a Gantt row. */
  readonly short: Bi;
  readonly geo: Geo;
  readonly region: Region;
  readonly start: string;
  /** null while the movement is still running. */
  readonly end: string | null;
  /** The day is not published in the sources used; the Gantt marks the edge. */
  readonly startApprox?: boolean;
  readonly verdict: Verdict;
  /** What "succeeded" or "failed" means here, in one line. The map legend
   *  cannot say "failed" without saying failed at what. */
  readonly outcome: Bi;
  /** Explicitly modelled on, or reported as inspired by, the French movement. */
  readonly inspiredByFrance: boolean;
  /** The evidence for that flag. Absent when the flag is false — a false flag
   *  with no evidence field is not the same claim as "no link reported". */
  readonly inspiration?: Bi;
  /** Read the rows from an existing episode instead of duplicating them. */
  readonly episodeRef?: "students26";
  readonly demands: readonly Demand[];
  readonly actions: readonly Action[];
  readonly published?: Published;
  readonly src: readonly string[];
}
