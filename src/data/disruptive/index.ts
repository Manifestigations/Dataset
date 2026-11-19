/* The register, its derivation and the one arithmetic guard that matters. */

import type { Flag } from "../../model/index.ts";
import { FACTS } from "../facts.ts";
import { SOURCES } from "../sources/index.ts";
import { ACTS } from "./acts.ts";
import type { ActCategory, ActRow, ActUnit } from "./types.ts";

export { ACTS } from "./acts.ts";
export * from "./categories.ts";
export * from "./types.ts";

const unitOf = (r: ActRow): ActUnit => r.unit ?? "actions";

const order = (a: ActRow, b: ActRow): number =>
  a.date.localeCompare(b.date) || a.category.localeCompare(b.category);

/* ── Provenance of the blockade cells ─────────────────────────────────────
   The three blockade sources do not cover the same days, and several cells
   bracket two different publishers. The ministry issues balances on 29 Sept,
   3/8/13 Oct and 2/3 Nov; the USL publishes on 1 Oct, 6 Oct and 5 Nov;
   franceinfo runs the days with no balance (1, 6, 8, 10 Oct). Citing all
   three on every row claimed provenance no single cell has.

   Where one endpoint has no catalogued publisher, the endpoint is named in
   `unattributed` rather than borrowing a plausible id. All three such dates
   are in-window, so they are emitted with the marker rather than dropped. */
const BLOCKADE_PROVENANCE: Readonly<
  Record<
    string,
    {
      readonly low: readonly string[];
      readonly high: readonly string[];
      readonly unattributed?: readonly ("low" | "high")[];
    }
  >
> = {
  "2026-09-29": {
    low: ["lemonde-29sept-338", "education-bilans"],
    high: ["lemonde-29sept-338", "education-bilans"],
  },
  "2026-10-01": { low: [], high: ["usl-comptes"], unattributed: ["low"] },
  "2026-10-03": { low: ["education-bilans"], high: ["education-bilans"] },
  "2026-10-06": { low: ["franceinfo-blocages"], high: ["usl-comptes"] },
  "2026-10-08": { low: ["education-bilans"], high: ["education-bilans"] },
  "2026-10-10": { low: ["franceinfo-blocages"], high: ["franceinfo-blocages"] },
  "2026-10-13": { low: ["education-bilans"], high: ["education-bilans"] },
  "2026-11-02": { low: ["education-bilans"], high: ["education-bilans"] },
  "2026-11-03": { low: ["education-bilans"], high: [], unattributed: ["high"] },
  "2026-11-05": { low: [], high: ["usl-comptes"], unattributed: ["low"] },
  "2026-11-06": { low: ["figaro-06nov-live"], high: ["figaro-06nov-live"] },
};

/* Cells with no catalogued publisher at all. Every one is before the 15 Oct
   window, so no row is emitted — but the date is listed here so that the
   guard below fails the moment a facts cell appears that is in neither map.
   Delete an entry when its source is added to src/data/sources/; the row then
   starts being emitted with no other change. */
const BLOCKADE_UNSOURCED: Readonly<Record<string, string>> = {
  "2026-09-15": "one establishment; no publisher in src/data/sources/",
  "2026-09-19": "one establishment; no publisher in src/data/sources/",
  "2026-09-23": 'regional count (q "r"); no regional source catalogued',
  "2026-09-28":
    "Interior Ministry release; blockades.ts holds only the education balances",
  "2026-10-02": '"more than 400" (q "f"); publisher not catalogued',
  "2026-10-05": '400–500 wider measure (q "x"); no publisher catalogued',
  "2026-10-12": 'Rhône prefecture (q "r"); no prefecture source catalogued',
};

/* Toussaint: classes ended Friday 16 Oct and resumed Monday 2 Nov
   (service-public-vacances), so 17 Oct – 1 Nov has no cell. */
const HOLIDAY_START = "2026-10-17";
const HOLIDAY_END = "2026-11-01";

function schoolBlockadeActs(): ActRow[] {
  const out: ActRow[] = [];
  for (const [date, cell] of Object.entries(FACTS)) {
    const b = cell.blockades;
    if (!b) continue;
    if (date >= HOLIDAY_START && date <= HOLIDAY_END) continue;
    const p = BLOCKADE_PROVENANCE[date];
    if (!p) continue; // listed in BLOCKADE_UNSOURCED; asserted below
    out.push({
      date,
      category: "schoolBlockade",
      low: b.low,
      high: b.high,
      unit: "establishments",
      sources: [...new Set([...p.low, ...p.high])],
      derivedFrom: "facts.blockades",
      ...(p.unattributed ? { unattributed: [...p.unattributed] } : {}),
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

/* The only guard that can catch a bad source id: Source.id is `string`, so a
   typo compiles cleanly and shows an empty tooltip at runtime. */
const SOURCE_IDS = new Set(SOURCES.map((s) => s.id));
for (const r of ACT_ROWS)
  for (const id of r.sources)
    if (!SOURCE_IDS.has(id))
      throw new Error(
        `disruptive: ${r.date} ${r.category} cites unknown source "${id}"`,
      );

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

/* Every blockade cell is accounted for: emitted with provenance, or listed as
   unsourced with a reason. A new cell, or a stale entry, fails the build. */
const BLOCKADE_DATES = Object.entries(FACTS)
  .filter(([, c]) => c.blockades)
  .map(([d]) => d);
for (const d of BLOCKADE_DATES) {
  const sourced = d in BLOCKADE_PROVENANCE;
  const known = d in BLOCKADE_UNSOURCED;
  if (sourced === known)
    throw new Error(
      `disruptive: ${d} has a blockades cell and must appear in exactly one of BLOCKADE_PROVENANCE / BLOCKADE_UNSOURCED`,
    );
}
for (const d of [
  ...Object.keys(BLOCKADE_PROVENANCE),
  ...Object.keys(BLOCKADE_UNSOURCED),
])
  if (!BLOCKADE_DATES.includes(d))
    throw new Error(`disruptive: ${d} is listed but has no blockades cell`);

/* A partial row must say which endpoint it cannot source, and must not also
   carry an id for that endpoint. */
for (const r of ACT_ROWS) {
  if (!r.unattributed) continue;
  if (!r.unattributed.length)
    throw new Error(
      `disruptive: ${r.date} ${r.category} has an empty unattributed list`,
    );
  const p = BLOCKADE_PROVENANCE[r.date];
  for (const side of r.unattributed)
    if (p && p[side].length)
      throw new Error(
        `disruptive: ${r.date} marks ${side} unattributed but names a publisher for it`,
      );
}
