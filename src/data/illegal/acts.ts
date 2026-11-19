import type { ActRecord, NormativeRecord } from "./types.ts";

/**
 * One entry per claim. A record is added only when a source stands behind it.
 *
 * Two rules beyond the original:
 *
 *  · A record on the far-right side carries `attribution`, because that side is
 *    a characterisation made by a court, a prefecture or a journalist — not a
 *    role like "police". The union in types.ts makes the field unskippable.
 *  · `charge` is omitted when no qualification has been published. An enquiry
 *    opened "to identify these individuals" is not an accusation of a named
 *    offence, and inventing one would be the worst kind of guess.
 *
 * (ids must never start with `example-`: check:illegal rejects them, so a
 * template cannot reach main.)
 */
export const ILLEGAL_ACTS: readonly ActRecord[] = [
  /* ── far-right, 24 October ─────────────────────────────────────────────
     The Interior Ministry counted scenes of this kind in "about ten cities"
     [lemonde-2026-10-26]. That figure cannot become records: nine of the ten
     are unpublished, and a count of cities is not a count of acts. Only the
     cities with a named incident and a named place appear below. */

  {
    id: "act-2026-10-24-rouen-01",
    date: "2026-10-24",
    place: { commune: "Rouen", dep: "76", scope: "local" },
    side: "far-right",
    attribution: { term: "identitarian", by: "court" },
    charges: ["violences-volontaires"],
    track: "criminal",
    status: "investigation",
    count: { s: "n", v: 1, unit: "persons" },
    steps: [
      { date: "2026-10-24", kind: "incident", source: "lemonde-2026-10-26" },
      {
        date: "2026-10-26",
        kind: "investigation",
        court: "parquet de Rouen",
        source: "lemonde-2026-10-26",
      },
    ],
    sources: ["lemonde-2026-10-26", "franceinfo-2026-10-29"],
    noteRef: { k: "act", id: "act-2026-10-24-rouen-01" },
  },

  {
    id: "act-2026-10-24-nancy-01",
    date: "2026-10-24",
    place: { commune: "Nancy", dep: "54", scope: "local" },
    side: "far-right",
    attribution: { term: "extreme-right", by: "journalist" },
    charges: ["violences-volontaires"],
    track: "criminal",
    status: "alleged",
    count: { s: "x", why: "not-published" },
    steps: [
      { date: "2026-10-24", kind: "incident", source: "lemonde-2026-10-26" },
    ],
    sources: ["lemonde-2026-10-26"],
    noteRef: { k: "act", id: "act-2026-10-24-nancy-01" },
  },
  {
    id: "act-2026-10-24-montpellier-01",
    date: "2026-10-24",
    place: { commune: "Montpellier", dep: "34", scope: "local" },
    side: "far-right",
    attribution: { term: "extreme-right", by: "elected-official" },
    track: "criminal",
    charges: [],
    status: "investigation",
    count: { s: "x", why: "not-published" },
    steps: [
      { date: "2026-10-24", kind: "incident", source: "lemonde-2026-10-26" },
      {
        date: "2026-10-26",
        kind: "investigation",
        court: "parquet de Montpellier",
        source: "lemonde-2026-10-26",
      },
    ],
    sources: ["lemonde-2026-10-26"],
    noteRef: { k: "act", id: "act-2026-10-24-montpellier-01" },
  },
  {
    id: "act-2026-10-24-nice-01",
    date: "2026-10-24",
    place: { commune: "Nice", dep: "06", scope: "local" },
    side: "far-right",
    attribution: { term: "ultra-right", by: "court" },
    charges: ["association-malfaiteurs"],
    track: "criminal",
    status: "charged",
    count: { s: "n", v: 11, unit: "persons" },
    steps: [
      { date: "2026-10-24", kind: "incident", source: "lemonde-2026-10-26" },
      {
        date: "2026-10-26",
        kind: "charge",
        court: "parquet de Nice",
        source: "lemonde-2026-10-26",
      },
    ],
    sources: ["lemonde-2026-10-26", "franceinfo-2026-10-29"],
    noteRef: { k: "act", id: "act-2026-10-24-nice-01" },
  },
  {
    id: "act-2026-10-24-clermont-ferrand-01",
    date: "2026-10-24",
    place: { commune: "Clermont-Ferrand", dep: "63", scope: "local" },
    side: "far-right",
    attribution: { term: "extreme-right", by: "journalist" },
    track: "criminal",
    charges: [],
    status: "alleged",
    count: { s: "x", why: "not-published" },
    steps: [
      { date: "2026-10-24", kind: "incident", source: "franceinfo-2026-10-29" },
    ],
    sources: ["franceinfo-2026-10-29"],
    noteRef: { k: "act", id: "act-2026-10-24-clermont-ferrand-01" },
  },

  /* ── protesters ────────────────────────────────────────────────────────
     One acquittal, because an acquittal is a result and this register would be
     a prosecution list if it only ever recorded convictions. */

  {
    id: "act-2026-10-17-paris-02",
    date: "2026-10-17",
    place: { commune: "Paris", dep: "75", scope: "local" },
    side: "protesters",
    charges: ["arme-prohibee", "outrage"],
    track: "criminal",
    status: "acquitted",
    count: { s: "n", v: 1, unit: "persons" },
    steps: [
      {
        date: "2026-10-17",
        kind: "incident",
        source: "actujuridique-2026-10-20",
      },
      {
        date: "2026-10-19",
        kind: "custody",
        source: "actujuridique-2026-10-20",
      },
      {
        date: "2026-10-19",
        kind: "charge",
        court: "tribunal judiciaire de Paris, 23e ch. 2",
        source: "actujuridique-2026-10-20",
      },
      {
        date: "2026-10-19",
        kind: "verdict",
        verdict: "not-guilty",
        court: "tribunal judiciaire de Paris, 23e ch. 2",
        source: "actujuridique-2026-10-20",
      },
    ],
    sources: ["actujuridique-2026-10-20"],
    refs: { sitting: "sit-2026-10-19-paris" },
    noteRef: { k: "act", id: "act-2026-10-17-paris-02" },
  },
];

/**
 * Counterfactual register: police acts read against the law of armed conflict.
 * Never summed with ILLEGAL_ACTS, never drawn on the same axis, always
 * accompanied by its caveat.
 */
export const NORMATIVE: readonly NormativeRecord[] = [];
