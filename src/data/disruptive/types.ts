/* The disruptive-act register: one row per (date, category).

   Two figures that are not commensurable never share a column. `unit` says
   what is being counted, and a total is only ever formed inside one unit.
   Adding establishments blocked to actions de voie publique would produce a
   number that nobody published and that measures nothing. */

import type { Flag } from "../../model/index.ts";

export type ActCategory =
  | "marchRally"
  | "roadBlockade"
  | "tollFree"
  | "fuelAction"
  | "transportHub"
  | "siteOccupation"
  | "schoolBlockade"
  | "sabotage"
  | "vandalism"
  | "looting"
  | "clashWithPolice"
  | "premisesHit";

/** What a row counts. Rows of different units are never summed. */
export type ActUnit = "actions" | "establishments" | "premises" | "incidents";

export interface ActRow {
  /** ISO date of the act. */
  readonly date: string;
  readonly category: ActCategory;
  /** The ministry count, or the figure its source stands behind. */
  readonly low: number;
  /** The widest count any source supports — the organiser/map count where one exists. */
  readonly high: number;
  /** Omitted when the row is a plain published national count. */
  readonly q?: Flag;
  /** Omitted means "actions" (the ministry's action de voie publique). */
  readonly unit?: ActUnit;
  /** Every Source.id the band rests on: low and high may be different publishers. */
  readonly sources: readonly string[];
  /** Endpoints of the band whose publisher is not in `src/data/sources/`.
      Provenance, not quality — `q` is the quality flag. A row may carry one. */
  readonly unattributed?: readonly ("low" | "high")[];
  /** Set when the row is a projection of an existing FACTS cell, not a new figure. */
  readonly derivedFrom?: "facts.blockades";
}
