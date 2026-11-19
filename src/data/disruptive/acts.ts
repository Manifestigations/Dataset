/* Hand-written category rows. One row per (date, category); no row is ever a
   total — the day's total lives in FACTS.disruptiveActs.

   What is deliberately NOT here: any figure with no Source behind it. The
   roundabout, toll-plaza and service-station tallies that circulate for 17 Oct
   come from a self-reported collaborative map and are not in this repository's
   catalogue, so they cannot appear as cells. See the gap list at the foot of
   this file. */

import type { ActRow } from "./types.ts";

export const ACTS: readonly ActRow[] = [
  /* Sat 17 Oct — a figure about the 17th, published on the 25th, inside a
     document about the 24th. The communiqué is "Bilan de la journée de
     mobilisation nationale du 24 octobre 2026" (interieur-24oct-bilan, dated
     25 Oct); the 17 Oct number appears only as its comparison line, and it is
     "1 521 commerces touchés" against "24 commerces pillés" on the 24th.
     "Touchés" is the ministry's broad measure and includes pillaged premises,
     so it cannot sit under `vandalism` (degradation short of pillage) and it
     cannot be a bound for the 24 Oct looting row. Hence `premisesHit`, a
     superset category that is never summed with the rows it contains. */
  {
    date: "2026-10-17",
    category: "premisesHit",
    low: 1_522,
    high: 1_522,
    unit: "premises",
    sources: ["interieur-24oct-bilan"],
  },

  /* Sat 24 Oct — "24 commerces pillés", same communiqué, same day as its
     subject. */
  {
    date: "2026-10-24",
    category: "looting",
    low: 24,
    high: 24,
    unit: "premises",
    sources: ["interieur-24oct-bilan"],
  },

  /* ── Shape of a row that needs a source before it can be added ───────────
     Everything below this line is a comment on purpose: it typechecks, and it
     cannot be mistaken for data.

     { date: "2026-10-17", category: "roadBlockade", low: <ministry>, high: <map>,
       unit: "actions", sources: ["<official id>", "<map id>"] },
     { date: "2026-10-17", category: "tollFree",    low: ..., high: ...,
       unit: "actions", sources: [...] },
     { date: "2026-10-24", category: "tollFree",    ... },  // Millau / A75
     { date: "2026-10-31", category: "tollFree",    ... },  // Lyon périphérique nord
     { date: "2026-11-07", category: "roadBlockade", ... }, // Lyon
     ---------------------------------------------------------------------- */
];
