/**
 * Case-level register of acts alleged against protesters, against the police or
 * by far-right groups during the autumn 2026 movement.
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

export type Side = "police" | "protesters" | "far-right";

/**
 * A group named by its politics rather than by its role in the event. "Police"
 * and "protester" describe a position; "far-right" is a characterisation made
 * by someone, so a record using it must say who made it and in what words. The
 * interior ministry wrote "far-right activists", the Rouen prosecutor
 * "identitarian militants", the Nice prosecutor "ultra-right". Those are
 * different claims and the record keeps them apart instead of normalising both
 * to a label of our own.
 */
export const ATTRIBUTION_TERMS = [
  "ultra-right",
  "extreme-right",
  "far-right",
  "identitarian",
  "revolutionary-nationalist",
  "unattributed",
] as const;

export type AttributionTerm = (typeof ATTRIBUTION_TERMS)[number];

export const ATTRIBUTED_BY = [
  "court",
  "police",
  "prefecture",
  "minister",
  "elected-official",
  "journalist",
] as const;

export type AttributedBy = (typeof ATTRIBUTED_BY)[number];

export interface Attribution {
  readonly term: AttributionTerm;
  readonly by: AttributedBy;
}

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

export type Unit = "persons" | "acts" | "establishments" | "cases";

export const GAP_REASONS = [
  "not-published",
  "not-collected",
  "not-split",
  "not-found",
] as const;

export type Gap = (typeof GAP_REASONS)[number];

/** Same four shapes as a casualty cell: point, published range, documented
 *  floor, or a documented absence. A floor is never rendered as an estimate.
 *  `a` is a figure the source itself called approximate ("roughly 50"): not a
 *  range, because no source published a bound, and not a point, because the
 *  source declined to give one. It is never summed without that word attached. */
export type Count =
  | { readonly s: "n"; readonly v: number; readonly unit: Unit }
  | {
      readonly s: "r";
      readonly lo: number;
      readonly hi: number;
      readonly unit: Unit;
    }
  | { readonly s: "f"; readonly v: number; readonly unit: Unit }
  | { readonly s: "a"; readonly v: number; readonly unit: Unit }
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
  /** the sitting at which this act was heard, when it was tried */
  readonly sitting?: string;
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

interface ActCore extends RecordBase {
  /**
   * Every qualification attached to this act. Usually one; two when a single
   * course of conduct was charged twice (armed participation in a demonstration
   * and racially aggravated insult, Paris, 17 October).
   *
   * Written as an empty array, never omitted, when no qualification has been
   * published: an enquiry opened "to identify these individuals" is not an
   * accusation of a named offence, and inventing one is worse than recording
   * none. `check:illegal` requires a non-empty list from `charged` onwards, and
   * checks every entry against the record's `side`.
   */
  readonly charges: readonly ChargeId[];
  readonly track: Track;
  readonly status: ActStatus;
  /** Final conviction or final acquittal only. */
  readonly final?: true;
}

/** An act attributed to a political group cannot be built without saying who
 *  named it: the union makes `attribution` unskippable on the far-right side. */
export type ActRecord =
  | (ActCore & { readonly side: "police" | "protesters" })
  | (ActCore & {
      readonly side: "far-right";
      readonly attribution: Attribution;
    });

export interface NormativeRecord extends RecordBase {
  readonly side: "police";
  readonly status: "hypothetical";
  readonly tactic: TacticId;
  readonly norm: NormId;
  readonly caveat: CaveatId;
  /** Often absent: the act may be lawful in domestic law and only interesting
   *  under the counterfactual. */
  readonly charges?: readonly ChargeId[];
}

export const HEARING_MODES = [
  "comparution-immediate",
  "crpc",
  "renvoi",
  "detention-hearing",
] as const;

export type HearingMode = (typeof HEARING_MODES)[number];

/**
 * A court sitting, not a claim. It records the conditions under which claims
 * were heard — how many rooms, how many cases, on which track — because a
 * throughput figure and a severity figure answer different questions, and the
 * 20 October hearings produced both.
 *
 * A sitting is never summed with an act: one act can appear at one sitting, and
 * a docket counts cases, some of which concern no act in this register.
 */
export interface Sitting {
  readonly id: string;
  readonly date: string;
  readonly court: string;
  readonly place: Place;
  /** Every track sat that day, so four immediate-appearance rooms and a
   *  guilty-plea room are not described as one thing. */
  readonly modes: readonly HearingMode[];
  readonly rooms: Count;
  /** The court's ordinary complement, when reported, so `rooms` reads as a
   *  multiple rather than an absolute. */
  readonly roomsUsual?: Count;
  /** One entry per track. Two tracks, two counts: merging them would invent a
   *  figure neither source published. */
  readonly dockets?: readonly {
    readonly mode: HearingMode;
    readonly cases: Count;
  }[];
  /** Reported risk that procedures would be annulled for breach of the delay
   *  within which a detained person must be brought before the court. */
  readonly nullityRisk?: true;
  readonly sources: readonly string[];
  readonly noteRef?: NoteRef;
}
