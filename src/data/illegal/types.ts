/**
 * Case-level register of acts alleged against protesters or against the police
 * during the autumn 2026 movement.
 *
 * One record is one claim, not one number. This dataset owns no figure that is
 * already published elsewhere: a count of arrests lives in `facts.ts`, a victim
 * lives in `casualties/cases.ts`, and a record that concerns either carries a
 * link (`refs`) instead of repeating the figure.
 *
 * `NormativeRecord` is a different type on purpose: a police tactic read against
 * the law of armed conflict. It can hold no status other than "hypothetical" and
 * cannot be summed with `ActRecord`, because a counterfactual is not an
 * allegation.
 */
import type { MetricKey, NoteRef } from "../../model/index.ts";
import type { CaveatId, ChargeId, NormId, TacticId } from "./vocabulary.ts";

export type Side = "protesters" | "police";

/** The procedural state of a claim. "hypothetical" exists only for NORMATIVE. */
export type Status =
  | "alleged"
  | "complaint"
  | "investigation"
  | "charged"
  | "tried"
  | "convicted"
  | "acquitted"
  | "dismissed"
  | "prescribed"
  | "unknown"
  | "hypothetical";

/** On ACTS the ladder stops before the counterfactual. */
export type ActStatus = Exclude<Status, "hypothetical">;

/** Display and audit order: earliest to most final. */
export const ACT_STATUSES = [
  "alleged",
  "complaint",
  "investigation",
  "charged",
  "tried",
  "convicted",
  "acquitted",
  "dismissed",
  "prescribed",
  "unknown",
] as const satisfies readonly ActStatus[];

export type Track = "criminal" | "administrative";

export type Unit = "persons" | "acts" | "establishments";

export type Gap = "not-published" | "not-collected" | "not-split" | "not-found";

/** Same four shapes as a casualty cell: point, published range, documented
 *  floor, or a documented absence. A floor is never rendered as an estimate. */
export type Count =
  | { readonly s: "n"; readonly v: number; readonly unit: Unit }
  | {
      readonly s: "r";
      readonly lo: number;
      readonly hi: number;
      readonly unit: Unit;
    }
  | { readonly s: "f"; readonly v: number; readonly unit: Unit }
  | { readonly s: "x"; readonly why: Gap };

export type StepKind =
  | "incident"
  | "complaint"
  | "investigation"
  | "custody"
  | "charge"
  | "trial"
  | "verdict"
  | "appeal"
  | "dismissal"
  | "prescription";

export type Verdict = "guilty" | "not-guilty";

/** One dated procedural step. `steps` is ordered by date and is the audit
 *  trail behind `status`; `check:illegal` refuses a status the steps do not
 *  support. */
export interface Step {
  readonly date: string;
  readonly kind: StepKind;
  readonly verdict?: Verdict;
  readonly court?: string;
  readonly source: string;
}

export interface Place {
  readonly commune: string;
  /** INSEE department code, "69", "971". */
  readonly dep?: string;
  readonly scope: "national" | "local";
}

/**
 * Links to figures that are authored elsewhere. A record with `refs.fact` or a
 * non-empty `refs.casualties` must not carry `count`.
 */
export interface Refs {
  /** "this record is the legal reading of that daily figure" */
  readonly fact?: { readonly date: string; readonly metric: MetricKey };
  /** casualty case ids this act produced or suffered */
  readonly casualties?: readonly string[];
  /** ids of the disruptive-act categories this act is also counted in */
  readonly disruptive?: readonly string[];
}

interface RecordBase {
  readonly id: string;
  readonly date: string;
  readonly dateEnd?: string;
  readonly place: Place;
  readonly count?: Count;
  readonly tactic?: TacticId;
  /** "CRS 82", "BRN", "peloton de gendarmerie mobile 3/11" — never a person. */
  readonly unitRef?: string;
  readonly steps?: readonly Step[];
  readonly sources: readonly string[];
  readonly refs?: Refs;
  readonly noteRef?: NoteRef;
}

export interface ActRecord extends RecordBase {
  readonly side: Side;
  readonly charge: ChargeId;
  readonly track: Track;
  readonly status: ActStatus;
  /** Final conviction or final acquittal only. */
  readonly final?: true;
}

export interface NormativeRecord extends RecordBase {
  readonly side: "police";
  readonly status: "hypothetical";
  readonly tactic: TacticId;
  readonly norm: NormId;
  readonly caveat: CaveatId;
  /** Often none: the act may be lawful in domestic law and only interesting
   *  under the counterfactual. */
  readonly charge?: ChargeId;
}
