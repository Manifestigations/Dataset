/* ── Comparative registry ────────────────────────────────────────────────────
   NOT EPISODES. Episodes are the weekly French series; this is the cross-country
   layer. Order is display order for the Gantt: by start date, oldest first, so
   the long-running movements (Serbia, Georgia, Philippines) anchor the top.
   Sorting by start date here is correct — unlike EPISODES, whose order is frozen
   because it indexes section C's panels and the trellis ramp. */

import { MOVEMENTS_EUROPE } from "./europe.ts";
import type { Movement } from "./types.ts";
import { MOVEMENTS_WORLD } from "./world.ts";

export { MOVEMENTS_EUROPE } from "./europe.ts";
export * from "./types.ts";
export { MOVEMENTS_WORLD } from "./world.ts";

/** France is not duplicated: it resolves through `episodeRef` to the existing
 *  weekly episode, so the Gantt gets its span without a second copy of a
 *  daily-resolution series. */
export const MOVEMENTS: readonly Movement[] = [
  ...MOVEMENTS_EUROPE,
  ...MOVEMENTS_WORLD,
].sort((a, b) => a.start.localeCompare(b.start));

export const MOVEMENT_BY_ID: ReadonlyMap<string, Movement> = new Map(
  MOVEMENTS.map((m) => [m.id, m]),
);

/** Movements reported as inspired by, or modelled on, the French movement. */
export const INSPIRED: readonly Movement[] = MOVEMENTS.filter(
  (m) => m.inspiredByFrance,
);
