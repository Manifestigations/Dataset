import type { ActRecord, NormativeRecord } from "./types.ts";

/**
 * One entry per claim. Empty on purpose: this file defines the shape, and a
 * record is added only when a source stands behind it.
 *
 * Shape, for reference (ids must never start with `example-`: check:illegal
 * rejects them, so a template cannot reach main):
 *
 * {
 *   id: "act-2026-10-15-lyon-01",
 *   date: "2026-10-15",
 *   place: { commune: "Lyon", dep: "69", scope: "local" },
 *   side: "police",
 *   charge: "violences-depositaire",
 *   track: "criminal",
 *   status: "investigation",
 *   unitRef: "BRN",
 *   tactic: "lbd",
 *   count: { s: "n", v: 1, unit: "persons" },
 *   refs: { casualties: ["c-2026-10-15-lyon-01"], disruptive: [] },
 *   steps: [
 *     { date: "2026-10-15", kind: "incident", source: "src-id" },
 *     { date: "2026-10-20", kind: "complaint", source: "src-id" },
 *     { date: "2026-11-03", kind: "investigation", court: "parquet de Lyon", source: "src-id" },
 *   ],
 *   sources: ["src-id"],
 * }
 */
export const ILLEGAL_ACTS: readonly ActRecord[] = [];

/**
 * Counterfactual register: police acts read against the law of armed conflict.
 * Never summed with ACTS, never drawn on the same axis, always accompanied by
 * its caveat.
 */
export const NORMATIVE: readonly NormativeRecord[] = [];
