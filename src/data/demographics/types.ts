/* ── src/data/demographics/types.ts ─────────────────────────────────────────
   The demographic layer answers "who", where every other module answers
   "how many". It is a THIRD data shape, deliberately neither a `Row` nor an
   `Obs`: a demographic figure is a share of a named population, and the name
   of that population is part of the figure.

   Three rules, and they are the whole file:

   1. A share never travels alone. It carries its base and, where the source
      publishes them, its numerator and denominator. "7 %" is meaningless
      until it is "7 % of 1,504 minors referred to prosecutors".
   2. An absent figure is a `DemoGap` with a `cause`, never a 0 and never a
      silence. In France "ethnicity" is almost always `not-collected`: that
      is a finding about French statistics, not a hole in our research.
   3. Nothing here is comparable across rows unless the two `population`
      strings say so. `protesters` in this module is an ARREST population
      and a POLL population, never a crowd. Do not add them up.

   Sources: `minors referred to prosecutors` (DPJJ, exhaustive but a penal
   filter), `poll` (support, not participation), `workforce` (stock, not
   deployment). The Observatory draws these as composition bars, never as a
   time series, and never joins two rows. */

import type { Bi } from "../../copy/index.ts";
import type { Band } from "../../model/index.ts";

/** Which side of the barricade the figure describes. */
export type DemoSide = "protesters" | "forces";

/** The variable actually measured. `ethnicity` is in this union so that its
 *  ABSENCE can be recorded; no row in this module carries a value for it. */
export type DemoDim =
  | "sex"
  | "age"
  | "nationality"
  | "birthplace"
  | "socialClass"
  | "schooling"
  | "priorRecord"
  | "ethnicity";

/** What the percentage is a percentage OF. Not inferable from the number:
 *  101 girls among 1,504 minors and 101 girls among all arrested girls are
 *  different data. */
export type ShareBase =
  | "all" // every person in the published population
  | "subset" // a named subset (minors, those in custody, a funded body)
  | "poll"; // survey respondents — measures support, never participation

/** One published share. A published range stays a range (`Band`). */
export interface DemoShare {
  readonly dim: DemoDim;
  /** Category, verbatim from the source where it has one ("15 ans", "65+"). */
  readonly bucket: string;
  readonly value: Band;
  /** Numerator/denominator as published. Absent when the source gives none. */
  readonly n?: readonly [number, number];
  readonly base: ShareBase;
  /** True when we computed the share from published counts; the arithmetic
   *  goes in `note`. Never true for a midpoint of two publishers. */
  readonly derived?: true;
  /** Verbatim source sentence, untranslated — the checkable part. */
  readonly quote?: string;
  readonly note?: Bi;
}

/** A figure that does not exist, and why. This is what stops "no data" from
 *  being read as "zero". */
export interface DemoGap {
  readonly side: DemoSide;
  readonly dim: DemoDim;
  /** Which body the gap applies to, in words ("CRS", "gendarmes mobiles"). */
  readonly scope?: Bi;
  readonly why: Bi;
  readonly cause:
    | "not-collected" // the variable is not measured in France at all
    | "not-published" // measured internally, never released
    | "not-split" // published for a wider body only (police, not the CRS)
    | "not-found"; // a figure may exist; we did not locate one
}

/** One source's composition of one population. */
export interface DemoRow {
  readonly id: string;
  readonly side: DemoSide;
  /** `Source.id` in `src/data/sources/`. A row without one does not merge. */
  readonly source: string;
  readonly period: { readonly from: string; readonly to?: string };
  /** What exactly was counted. Part of the figure, not a caption. */
  readonly population: Bi;
  readonly shares: readonly DemoShare[];
  /** A published mean or median, kept apart from the shares. */
  readonly centre?: {
    readonly stat: "mean" | "median";
    readonly value: number;
    readonly unit: "years";
    readonly caveat?: Bi;
  };
  /** "document" = read from the source itself, including its own tables.
   *  "reported" = taken from a publisher's rendering, not re-checked against
   *  the source's table. `reported` rows are a merge blocker until upgraded. */
  readonly basis: "document" | "reported";
}

/** A published variable that is NOT ethnicity but is routinely used as if it
 *  were. `measures` names the real variable; `caveat` says what breaks. */
export interface DemoProxy {
  readonly id: string;
  readonly side: DemoSide | "both";
  readonly measures: DemoDim;
  readonly source: string;
  readonly period?: { readonly from: string; readonly to?: string };
  readonly value?: string; // verbatim published statement
  readonly caveat: Bi;
}
