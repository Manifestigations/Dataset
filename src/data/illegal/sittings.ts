import type { Sitting } from "./types.ts";

/**
 * The court sittings that processed the 17 October arrests. A sitting records
 * capacity and volume, not guilt: four rooms instead of two is a fact about a
 * court under load, and it says nothing about whether any charge was sound.
 *
 * Only sittings with a published figure appear. The 21 October hearings are
 * not here because no source read for this pass gave rooms or docket.
 */
export const SITTINGS: readonly Sitting[] = [
  {
    id: "sit-2026-10-19-paris",
    date: "2026-10-19",
    court: "Tribunal judiciaire de Paris",
    place: { commune: "Paris", dep: "75", scope: "local" },
    modes: ["comparution-immediate"],
    rooms: { s: "x", why: "not-published" },
    dockets: [
      { mode: "comparution-immediate", cases: { s: "n", v: 6, unit: "cases" } },
    ],
    sources: ["actujuridique-2026-10-20"],
    noteRef: { k: "act", id: "sit-2026-10-19-paris" },
  },
  {
    id: "sit-2026-10-20-paris",
    date: "2026-10-20",
    court: "Tribunal judiciaire de Paris",
    place: { commune: "Paris", dep: "75", scope: "local" },
    modes: ["comparution-immediate", "crpc"],
    rooms: { s: "n", v: 5, unit: "establishments" },
    roomsUsual: { s: "n", v: 2, unit: "establishments" },
    dockets: [
      {
        mode: "comparution-immediate",
        cases: { s: "a", v: 50, unit: "cases" },
      },
      { mode: "crpc", cases: { s: "a", v: 20, unit: "cases" } },
    ],
    nullityRisk: true,
    sources: ["lemonde-2026-10-21-en", "actujuridique-2026-10-20"],
    noteRef: { k: "act", id: "sit-2026-10-20-paris" },
  },
  {
    id: "sit-2026-10-20-marseille",
    date: "2026-10-20",
    court: "Tribunal judiciaire de Marseille",
    place: { commune: "Marseille", dep: "13", scope: "local" },
    modes: ["comparution-immediate"],
    rooms: { s: "n", v: 2, unit: "establishments" },
    sources: ["lemonde-2026-10-21-en"],
    noteRef: { k: "act", id: "sit-2026-10-20-marseille" },
  },
  {
    id: "sit-2026-10-20-lyon",
    date: "2026-10-20",
    court: "Tribunal judiciaire de Lyon",
    place: { commune: "Lyon", dep: "69", scope: "local" },
    modes: ["comparution-immediate"],
    rooms: { s: "x", why: "not-published" },
    sources: ["lemonde-2026-10-21-en"],
    noteRef: { k: "act", id: "sit-2026-10-20-lyon" },
  },
];
