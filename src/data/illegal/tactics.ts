import type { TacticId } from "./vocabulary.ts";

/** Police technique under examination. The list is about means, not about
 *  guilt: a tactic here is neither lawful nor unlawful. */
export const TACTICS: readonly TacticId[] = [
  "tear-gas",
  "lbd",
  "grenade",
  "charge",
  "nasse",
  "interpellation",
  "surveillance",
];

const SET: ReadonlySet<string> = new Set(TACTICS);

export const isTactic = (v: string): v is TacticId => SET.has(v);
