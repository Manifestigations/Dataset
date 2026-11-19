/* The register, its derivation and the one arithmetic guard that matters. */

import type { Flag } from "../../model/index.ts";
import { FACTS } from "../facts.ts";
import { ACTS } from "./acts.ts";
import { ACT_CATEGORY_OF } from "./categories.ts";
import type { ActCategory, ActRow, ActUnit } from "./types.ts";

export { ACTS } from "./acts.ts";
export * from "./categories.ts";
export * from "./types.ts";

const unitOf = (r: ActRow): ActUnit => r.unit ?? "actions";

const order = (a: ActRow, b: ActRow): number =>
  a.date.localeCompare(b.date) || a.category.localeCompare(b.category);

/* The school blockades, re-projected as one category of act.

   Read straight out of FACTS.blockades rather than retyped: a correction in
   facts.ts therefore cannot leave a stale copy here, and the band and flag are
   the published ones (official count → union ceiling), not a new judgement.

   No row during the Toussaint holiday (18 Oct – 1 Nov): no lycée was in
   session, so the metric did not exist. */
function schoolBlockadeActs(): ActRow[] {
  const out: ActRow[] = [];
  for (const [date, cell] of Object.entries(FACTS)) {
    const b = cell.blockades;
    if (!b) continue;
    out.push({
      date,
      category: "schoolBlockade",
      low: b.low,
      high: b.high,
      unit: "establishments",
      sources: ["education-bilans", "usl-comptes", "franceinfo-blocages"],
      derivedFrom: "facts.blockades",
      ...(b.q ? { q: b.q } : {}),
    });
  }
  return out;
}

/** Every category row, derived and hand-written, in date order. */
export const ACT_ROWS: readonly ActRow[] = [
  ...ACTS,
  ...schoolBlockadeActs(),
].sort(order);

/** The rows of one date. */
export const actsOn = (date: string): readonly ActRow[] =>
  ACT_ROWS.filter((r) => r.date === date);

/** The rows of one category, across the window. */
export const actSeriesOf = (category: ActCategory): readonly ActRow[] =>
  ACT_ROWS.filter((r) => r.category === category);

/** Rows grouped by unit — the only shape a total may take. */
export const actsByUnit = (
  rows: readonly ActRow[],
): Map<ActUnit, readonly ActRow[]> => {
  const m = new Map<ActUnit, ActRow[]>();
  for (const r of rows) {
    const u = unitOf(r);
    const bucket = m.get(u);
    if (bucket) bucket.push(r);
    else m.set(u, [r]);
  }
  return m;
};

/** Throws if a caller is about to add unlike things together. */
export function assertSingleUnit(
  rows: readonly ActRow[],
  where: string,
): ActUnit {
  const units = new Set(rows.map(unitOf));
  if (units.size > 1)
    throw new Error(
      `${where}: rows span ${[...units].join(" + ")} — never sum across units`,
    );
  for (const u of units) return u;
  return "actions";
}

/* The category sum for a day, restricted to the "actions" unit — and flagged
   "c" because it is necessarily a SUBSET of FACTS.disruptiveActs: the ministry
   counts every action, these rows only the ones we hold a category for. Never
   add this to the day's total. */
export function dayActionCategories(
  date: string,
): { low: number; high: number; q: Flag } | null {
  const rows = actsOn(date).filter((r) => unitOf(r) === "actions");
  if (!rows.length) return null;
  return {
    low: rows.reduce((s, r) => s + r.low, 0),
    high: rows.reduce((s, r) => s + r.high, 0),
    q: "c",
  };
}

/** Units present on a date — used by the renderer to decide how many panels a
    day needs. More than one means more than one table, never one bar. */
export const unitsOn = (date: string): readonly ActUnit[] => [
  ...new Set(actsOn(date).map(unitOf)),
];

/** Guard: every row names a category that exists, and at least one source. */
for (const r of ACT_ROWS) {
  if (!ACT_CATEGORY_OF.has(r.category))
    throw new Error(
      `disruptive: unknown category "${r.category}" on ${r.date}`,
    );
  if (!r.sources.length)
    throw new Error(`disruptive: ${r.date} ${r.category} carries no source`);
  if (r.low > r.high)
    throw new Error(`disruptive: ${r.date} ${r.category} has low > high`);
}
