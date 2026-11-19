/* The register, its derivation and the one arithmetic guard that matters. */

import type { Flag } from "../../model/index.ts";
import { FACTS } from "../facts.ts";
import { SOURCES } from "../sources/index.ts";
import { DISRUPTIVE_ACTS } from "./acts.ts";
import type { ActCategory, ActRow, ActUnit } from "./types.ts";

export { DISRUPTIVE_ACTS } from "./acts.ts";
export * from "./categories.ts";
export * from "./types.ts";

const unitOf = (r: ActRow): ActUnit => r.unit ?? "actions";

const order = (a: ActRow, b: ActRow): number =>
  a.date.localeCompare(b.date) || a.category.localeCompare(b.category);

/* ── Provenance of the blockade cells ─────────────────────────────────────
   The blockade sources do not cover the same days, and several cells bracket
   two different publishers. The ministry issues balances on 29 Sept, 3/8/13 Oct
   and 2/3 Nov; the USL publishes on 1 Oct, 6 Oct and 5 Nov; franceinfo runs the
   days with no balance (1, 6, 8, 10 Oct); the movement's origins rest on press
   reports of single establishments.

   An endpoint with no catalogued publisher is named in `unattributed` rather
   than borrowing a plausible id. A cell whose NUMBER no source supports is not
   emitted at all: it goes in BLOCKADE_UNSOURCED with the reason, and the guard
   at the foot of this file keeps the two maps in step with facts.ts. */
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
  /* 1 establishment: the lycée Victor-Hugo at Caen, the first date inside the
     window. Not actu-villeneuve-15sept, which is a second blockade the same
     day (Pont de Bois) and would imply the cell counts two. */
  "2026-09-15": { low: ["actu-caen-15sept"], high: ["actu-caen-15sept"] },

  /* 1 establishment, Créteil. The dating is contested: frwiki places Créteil
     on 18–19 Sep, franceinfo-mvt-ampleur and investigation-genz both put the
     origin on 17 Sept, a date with no cell. The row cites the only source that
     names the 19th and does not claim the date is settled. */
  "2026-09-19": {
    low: ["frwiki-mvt-lyceen-2026"],
    high: ["frwiki-mvt-lyceen-2026"],
  },

  /* 180 establishments perturbed, 27 totally blocked, 164 arrests — the
     national turn. frwiki carries the 27 verbatim; the ministry briefing is
     the origin of the triplet per the facts.ts comment, and `interieur`'s span
     opens on this date. */
  "2026-09-28": {
    low: ["frwiki-mvt-lyceen-2026", "interieur"],
    high: ["frwiki-mvt-lyceen-2026", "interieur"],
  },

  /* 45 blocked of 338 concerned: Le Monde's account of the ministry's balance
     and the ministry portal itself. */
  "2026-09-29": {
    low: ["lemonde-29sept-338", "education-bilans"],
    high: ["lemonde-29sept-338", "education-bilans"],
  },

  /* 222–640. The 640 is the Union étudiante's claim, and the union also counts
     administratively closed schools, so it is the ceiling by construction. The
     222 is not the AFP morning count (169 blockades) nor the end-of-day
     closures (400) recorded in the facts comment, and no catalogued source
     carries it — hence the partial row rather than a guess. */
  "2026-10-01": { low: [], high: ["usl-comptes"], unattributed: ["low"] },

  /* 400 closed. The figure is in that day's Figaro slug; treat the attribution
     as provisional, see the note in acts.ts — the same 400 appears as AFP's
     1 Oct closure count, so the cell may be a day-late carry. */
  "2026-10-02": { low: ["lefigaro-2oct-1747"], high: ["lefigaro-2oct-1747"] },

  /* 735 establishments perturbed: the ministry balance's wider measure. */
  "2026-10-03": { low: ["education-bilans"], high: ["education-bilans"] },

  /* 891 classes suspended at midday (franceinfo) against the union's 1 800
     "à l'arrêt" — the widest band in the series, and the clearest example of
     two publishers measuring different things. */
  "2026-10-06": {
    low: ["franceinfo-blocages"],
    high: ["usl-comptes"],
  },

  /* 224 closed: the ministry balance, not franceinfo's "more than 150
     perturbed" for the same day, which is a different and narrower measure. */
  "2026-10-08": { low: ["education-bilans"], high: ["education-bilans"] },

  /* "more than 40 schools blocked" — franceinfo is the only publisher. */
  "2026-10-10": {
    low: ["franceinfo-blocages"],
    high: ["franceinfo-blocages"],
  },

  /* 214 closed, 94.2% of lycées open. */
  "2026-10-13": { low: ["education-bilans"], high: ["education-bilans"] },

  /* 41 blocked at the rentrée. */
  "2026-11-02": { low: ["education-bilans"], high: ["education-bilans"] },

  /* 48 from the ministry balance; the 500 ceiling has no catalogued publisher
     (the union's published counts are 1 Oct, 6 Oct and 5 Nov only). */
  "2026-11-03": { low: ["education-bilans"], high: [], unattributed: ["high"] },

  /* 81 against the union's 1 000. The 1 000 is the union's own count of
     schools "à l'arrêt"; the 81 is not in any catalogued blockade source. */
  "2026-11-05": { low: [], high: ["usl-comptes"], unattributed: ["low"] },

  /* 41 lycées still blocked the day after the peak. */
  "2026-11-06": { low: ["figaro-06nov-live"], high: ["figaro-06nov-live"] },
};

/* Cells whose NUMBER no catalogued source supports. Emitting them would put a
   figure in the register that cannot be defended at the tooltip, which is the
   one thing CONTRIBUTING forbids outright.

   Each entry names the missing thing. Two of the three need a source found,
   not a code change; the third needs a Source entry added and nothing else. */
const BLOCKADE_UNSOURCED: Readonly<Record<string, string>> = {
  "2026-09-23":
    '10 establishments, regional (q "r"). frwiki-mvt-lyceen-2026 dates the 23–25 Sep extension but publishes no figure, and no other catalogued source carries a 23 Sep count. The figure itself is untraced.',
  "2026-10-05":
    '400–500, wider measure (q "x"). lefigaro-5oct-6059 reports a forecast for the Monday ("des centaines de lycées seront à nouveau fermés au moins partiellement"), not a count. Neither endpoint appears in any catalogued source.',
  "2026-10-12":
    '19 lycées, Rhône (q "r"). The publisher IS identified — préfecture du Rhône, 27 établissements touchés of which 19 lycées — but no Rhône préfecture entry exists in src/data/sources/. Add the Source and move this date into BLOCKADE_PROVENANCE; nothing else changes.',
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
  ...DISRUPTIVE_ACTS,
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
