/* Hand-written category rows. One row per (date, category); no row is ever a
   total — the day's total lives in FACTS.disruptiveActs.

   What is deliberately NOT here: any figure with no Source behind it. The
   roundabout, toll-plaza and service-station tallies that circulate for 17 Oct
   come from a self-reported collaborative map and are not in this repository's
   catalogue, so they cannot appear as cells. See the gap list at the foot of
   this file. */

import type { ActRow } from "./types.ts";

export const ACTS: readonly ActRow[] = [
  /* Sat 17 Oct — the ministry's communiqué of 24 Oct counts premises touched
     on the 17th: 1,522 shops hit, against 24 pillaged on the 24th. This is a
     count of PREMISES, not of acts, and it is a ministry figure read back on a
     later date. The CCI France tally ("2,488 shops hit after the 17th") is a
     different span and is not a second bound for this day. */
  {
    date: "2026-10-17",
    category: "vandalism",
    low: 1_522,
    high: 1_522,
    unit: "premises",
    sources: ["interieur-24oct-bilan"],
  },

  /* Sat 24 Oct — "24 commerces pillés" in the same communiqué. */
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
