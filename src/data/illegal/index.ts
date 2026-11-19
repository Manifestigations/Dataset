export { ILLEGAL_ACTS, NORMATIVE } from "./acts.ts";
export { CHARGE_OF, CHARGES, chargesOf, isChargeOf } from "./charges.ts";
export type { Charge } from "./charges.ts";
export { CAVEATS, isCaveat, isNorm, NORMS } from "./norms.ts";
export type { Norm } from "./norms.ts";
export { isTactic, TACTICS } from "./tactics.ts";
export * from "./types.ts";
export * from "./vocabulary.ts";

import { ILLEGAL_ACTS } from "./acts.ts";
import type { ActRecord, ActStatus, NormativeRecord, Side } from "./types.ts";
import { ACT_STATUSES } from "./types.ts";

/**
 * A census counts RECORDS, never people and never crimes. `unquantified` is the
 * number of records whose figure is unknown: it is printed next to the count,
 * because a partial sum presented as a total is the one error this dataset
 * exists to avoid.
 */
export interface Census {
  readonly records: number;
  readonly quantified: number;
  readonly unquantified: number;
  readonly floored: number;
  readonly ranged: number;
}

const census = (rs: readonly (ActRecord | NormativeRecord)[]): Census => {
  let quantified = 0;
  let floored = 0;
  let ranged = 0;
  for (const r of rs) {
    const c = r.count;
    if (c === undefined || c.s === "x") continue;
    quantified += 1;
    if (c.s === "f") floored += 1;
    if (c.s === "r") ranged += 1;
  }
  return {
    records: rs.length,
    quantified,
    unquantified: rs.length - quantified,
    floored,
    ranged,
  };
};

export const actsOf = (side: Side): readonly ActRecord[] =>
  ILLEGAL_ACTS.filter((a) => a.side === side);

/** One key per status, always present, so an empty stage is visible as zero
 *  records rather than a missing column. */
export const censusByStatus = (
  side: Side,
): Readonly<Record<ActStatus, Census>> => {
  const by = new Map<ActStatus, (ActRecord | NormativeRecord)[]>(
    ACT_STATUSES.map((s) => [s, [] as (ActRecord | NormativeRecord)[]]),
  );
  for (const a of actsOf(side)) by.get(a.status)?.push(a);
  return Object.fromEntries(
    ACT_STATUSES.map((s) => [s, census(by.get(s) ?? [])]),
  ) as Readonly<Record<ActStatus, Census>>;
};

/** Records per day. Not a series: these are case dates, and they cluster where
 *  journalists and lawyers were. Do not fit a line through them. */
export const byDay = (
  side: Side,
): Readonly<Record<string, readonly ActRecord[]>> => {
  const out: Record<string, ActRecord[]> = {};
  for (const a of actsOf(side)) (out[a.date] ??= []).push(a);
  return out;
};

/** The records whose figure is already published elsewhere. */
export const linkedToFact = (
  date: string,
  metric: string,
): readonly ActRecord[] =>
  ILLEGAL_ACTS.filter(
    (a) => a.refs?.fact?.date === date && a.refs.fact.metric === metric,
  );

export const linkedToCasualty = (caseId: string): readonly ActRecord[] =>
  ILLEGAL_ACTS.filter((a) => a.refs?.casualties?.includes(caseId));

/**
 * Deliberately absent: totalVictims(), crimeCount(), convictionRate(). A count
 * of records is not a count of crimes, and a rate over records that reached
 * court is a survivorship artefact. If a chart needs one, it argues for it in
 * the open, in a note.
 */
