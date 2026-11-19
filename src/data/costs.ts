/* ═══════════════════════════════════════════════════════════════════════════
   src/data/costs.ts — who pays: damage, concessions, penalties.

   FACTS answers "how much"; this file answers "borne by whom, and paid yet".
   Two axes FACTS cannot carry: `payer` (who ends up bearing the euro) and
   `stage` (committed · disbursed · contingent).

   Invariants (enforced by costs-checks.ts, not by comment):
   · a published range stays a range — never a midpoint (bandOf/midOf);
   · a figure no source publishes is an UnpricedCost with a cause, never 0;
   · COMMITTED AND DISBURSED ARE NEVER SUMMED — a committed euro may be
     disbursed later, so adding the two counts it twice;
   · sums are valid only within one `instrument`: a loan is not spending;
   · `unit: "perPerson"` rows are statutory maxima and are never totalled;
   · policing cost is NOT restated here — policing.ts (DEPLOYMENT, RATE) and
     helicopters.ts (HELI_TOTALS) remain the single source of truth.

   The iFRAP range the site's copy quotes ("€247M–872M") is not iFRAP's: it
   publishes three scenarios, €309M / €613M / €1,101M. Those are carried here.

   Arithmetic cross-checks (must hold):
     material: 181+63+15 = 259 · 353+110+30 = 493 · 666+200+45 = 911
     totals:   259+50 = 309 · 493+120 = 613 · 911+190 = 1,101
     insured + uninsured (high): 566+100 = 666 · 120+80 = 200
                                 32+13 = 45   · 86+104 = 190
                                 Σ insurers 804 + Σ uninsured 297 = 1,101 ✓
     state response (high): 17+20+40 = 77
   ═══════════════════════════════════════════════════════════════════════════ */

import { bandOf, type Band, type Flag } from "../model/index.ts";

/* ── the axes ────────────────────────────────────────────────────────────── */

export const PAYERS = [
  "state",
  "local",
  "insurer",
  "employer",
  "private",
  "household",
  "protestor",
] as const;
export type Payer = (typeof PAYERS)[number];

export const COST_KINDS = [
  "damage-public",
  "damage-private",
  "lost-turnover",
  "support",
  "concession",
  "penalty",
  "liability",
] as const;
export type CostKind = (typeof COST_KINDS)[number];

/** committed = announced or owed · disbursed = actually paid ·
 *  contingent  = exposure neither imposed nor paid (a statutory maximum a
 *                court has not applied to anyone). */
export const STAGES = ["committed", "disbursed", "contingent"] as const;
export type Stage = (typeof STAGES)[number];

/** A loan is not spending, and a statutory maximum is not a cost. */
export const INSTRUMENTS = [
  "spending",
  "loan",
  "tax-expenditure",
  "liability",
] as const;
export type Instrument = (typeof INSTRUMENTS)[number];

export const SCENARIOS = ["low", "central", "high"] as const;
export type Scenario = (typeof SCENARIOS)[number];

/** Copy ids. The wording lives in the Observatory's notes module, not here. */
export type CostNoteRef =
  | "loan-not-spending"
  | "insurer-conduit"
  | "uninsured-residual"
  | "proposed-not-law"
  | "parental-liability"
  | "no-claims-paid"
  | "statutory-maximum"
  | "tax-expenditure"
  | "insured-gap"
  | "local-not-in-insurer-count";

export interface PayerCost {
  readonly id: string;
  readonly payer: Payer;
  readonly kind: CostKind;
  readonly stage: Stage;
  readonly instrument: Instrument;
  /** ISO. A single announcement uses the same value for from and to. */
  readonly from: string;
  readonly to?: string;
  /** M€. A point is a number; a band only where a source publishes one. */
  readonly eurM: Band;
  readonly q?: Flag;
  readonly sources: readonly string[];
  readonly scenario?: Scenario;
  /** Claim count as published, where a source gives one. Never summed across
      payers: a claim is not a euro and cannot be converted into one here. */
  readonly claims?: number;
  /** "aggregate" (default) | "perPerson" — a maximum, never totalled. */
  readonly unit?: "aggregate" | "perPerson";
  /** A comparison episode, not a 2026 cost. */
  readonly reference?: boolean;
  readonly noteRef?: CostNoteRef;
}

export interface UnpricedCost {
  readonly id: string;
  readonly payer: Payer;
  readonly kind: CostKind;
  readonly date: string;
  readonly cause:
    | "noPublishedTotal"
    | "taxExpenditure"
    | "notApportioned"
    | "multiYear"
    | "notLaw"
    | "notEstimated";
  readonly noteRef: CostNoteRef;
  readonly sources: readonly string[];
}

/** €→M€, so a penalty reads as its statute writes it. */
const eur = (euros: number): number => euros / 1_000_000;

/* ── iFRAP: the only published decomposition by asset type ────────────────── */

export const IFRAP_SCENARIOS = {
  window: { from: "2026-10-17", to: "2026-10-18" },
  materialSubtotal: { low: 259, central: 493, high: 911 },
  lostTurnover: { low: 50, central: 120, high: 190 },
  total: { low: 309, central: 613, high: 1_101 },
  /** State + collectivités direct budgetary response, by scenario. */
  publicResponse: { low: 11.5, central: 26, high: 77 },
  /** iFRAP's own coverage assumptions. Applied to the HIGH scenario only:
      iFRAP publishes no per-line coverage for low and central, so none is
      invented for them. */
} as const;

/** The insurers' own count, 19 Nov. Independent of IFRAP: IFRAP estimates the
 *  damage, France Assureurs counts what its members were told about. They are
 *  not two views of one number and are never reconciled here.
 *
 *  The three lines sum to 207.5 against a published total of 207 — each line is
 *  hedged with "pourrait atteindre", so both figures are kept as printed and
 *  the check allows 1 M€ of slack. Claims, unlike euros, add exactly: 5,280. */
export const INSURED_2026 = {
  asOf: "2026-11-12",
  published: "2026-11-19",
  total: 207,
  componentSum: 207.5,
  claimsTotal: 5_280,
  /** Days from 17 Oct, extended from the contractual five. */
  declarationWindowDays: 30,
  byLine: {
    professionals: { eurM: 198, claims: 4_050 },
    households: { eurM: 3.5, claims: 370 },
    motor: { eurM: 6, claims: 860 },
  },
  /** The federation's own comparators. Durations are theirs, not inferred. */
  comparisons: {
    riots2005: { eurM: 209, over: "four weeks" },
    giletsJaunes: { eurM: 256, over: "several months" },
  },
  /** No local-authority line was published. Absent, not zero. */
  localAuthoritiesReported: false,
} as const;

/* ── the records ─────────────────────────────────────────────────────────── */

export const PAYER_COSTS: readonly PayerCost[] = [
  /* 26 Oct — the education package, the only headline monetary figure. */
  {
    id: "c-edu-loan-secondary",
    payer: "state",
    kind: "concession",
    stage: "committed",
    instrument: "loan",
    from: "2026-10-26",
    eurM: 4_000,
    sources: ["reuters-education-2026", "reuters-education-cost-2026"],
    noteRef: "loan-not-spending",
  },
  {
    id: "c-edu-loan-universities",
    payer: "state",
    kind: "concession",
    stage: "committed",
    instrument: "loan",
    from: "2026-10-26",
    to: "2031-10-26",
    eurM: 1_000,
    sources: ["reuters-education-2026", "reuters-education-cost-2026"],
    noteRef: "loan-not-spending",
  },

  /* Damage by asset type — gross, iFRAP's own figures. */
  {
    id: "d-shops-gross",
    payer: "private",
    kind: "damage-private",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: [181, 666],
    sources: ["ifrap-2026"],
    noteRef: "uninsured-residual",
  },
  {
    id: "d-public-gross",
    payer: "local",
    kind: "damage-public",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: [63, 200], // ~€100M of the high figure is Limoges city hall
    sources: ["ifrap-2026"],
  },
  {
    id: "d-vehicles-gross",
    payer: "private",
    kind: "damage-private",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: [15, 45],
    sources: ["ifrap-2026"],
  },
  {
    id: "d-turnover-gross",
    payer: "private",
    kind: "lost-turnover",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: [50, 190],
    sources: ["ifrap-2026"],
    noteRef: "uninsured-residual",
  },

  /* Who the insurers actually indemnify — France Assureurs, 19 Nov, reported
     to 12 Nov. An estimated ultimate cost, not a payment: stage stays
     "committed". Local authorities have no line in this publication. */
  {
    id: "i-professionals-2026",
    payer: "insurer",
    kind: "damage-private",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: 198,
    claims: 4_050,
    q: "p",
    sources: ["franceassureurs-2026"],
    noteRef: "insurer-conduit",
  },
  {
    id: "i-households-2026",
    payer: "insurer",
    kind: "damage-private",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: 3.5,
    claims: 370,
    q: "p",
    sources: ["franceassureurs-2026"],
    noteRef: "insurer-conduit",
  },
  {
    id: "i-motor-2026",
    payer: "insurer",
    kind: "damage-private",
    stage: "committed",
    instrument: "liability",
    from: "2026-10-17",
    to: "2026-10-18",
    eurM: 6,
    claims: 860,
    q: "p",
    sources: ["franceassureurs-2026"],
    noteRef: "insurer-conduit",
  },

  /* State and local response: damage-driven, NOT concessions. */
  {
    id: "s-activite-partielle",
    payer: "state",
    kind: "support",
    stage: "committed",
    instrument: "spending",
    from: "2026-10-20",
    eurM: 17, // ~EUR1,900 per employee per month
    q: "e",
    scenario: "high",
    sources: ["ifrap-2026"],
  },
  {
    id: "s-fonds-solidarite",
    payer: "state",
    kind: "support",
    stage: "committed",
    instrument: "spending",
    from: "2026-10-20",
    eurM: 20,
    q: "e",
    scenario: "high",
    sources: ["ifrap-2026"],
  },
  {
    id: "s-limoges-reconstruction",
    payer: "state",
    kind: "support",
    stage: "committed",
    instrument: "spending",
    from: "2026-10-20",
    eurM: 40,
    q: "e",
    scenario: "high",
    sources: ["ifrap-2026"],
  },
  {
    id: "s-lyon-metropole",
    payer: "local",
    kind: "support",
    stage: "committed",
    instrument: "spending",
    from: "2026-10-20",
    eurM: 10,
    sources: ["ifrap-2026"],
  },

  /* Protestors: exposure only. Nothing here has been collected. */
  {
    id: "p-casser-payer-cap",
    payer: "protestor",
    kind: "penalty",
    stage: "contingent",
    instrument: "liability",
    from: "2026-10-28",
    eurM: eur(10_000),
    unit: "perPerson",
    sources: [
      "monde-casseurs-payeurs-2026",
      "publicsenat-casseurs-payeurs-2026",
      "clubdesjuristes-casseurs-payeurs-2026",
    ],
    noteRef: "proposed-not-law",
  },
  {
    id: "p-entrave-431-1",
    payer: "protestor",
    kind: "penalty",
    stage: "contingent",
    instrument: "liability",
    from: "2026-09-15",
    eurM: eur(15_000),
    unit: "perPerson",
    sources: ["legifrance-431-1"],
    noteRef: "statutory-maximum",
  },
  {
    id: "p-entrave-431-1-aggravated",
    payer: "protestor",
    kind: "penalty",
    stage: "contingent",
    instrument: "liability",
    from: "2026-09-15",
    eurM: eur(45_000),
    unit: "perPerson",
    sources: ["legifrance-431-1"],
    noteRef: "statutory-maximum",
  },
  {
    id: "p-lycee-431-22",
    payer: "protestor",
    kind: "penalty",
    stage: "contingent",
    instrument: "liability",
    from: "2026-09-15",
    eurM: eur(7_500),
    unit: "perPerson",
    sources: ["legifrance-431-22"],
    noteRef: "statutory-maximum",
  },
  {
    id: "p-demonstration-r644-4",
    payer: "protestor",
    kind: "penalty",
    stage: "contingent",
    instrument: "liability",
    from: "2026-09-15",
    eurM: eur(135),
    unit: "perPerson",
    sources: ["legifrance-r644-4"],
    noteRef: "statutory-maximum",
  },

  /* 2023 comparator: the only episode with a real claims dataset. */
  {
    id: "r-2023-insured-total",
    payer: "insurer",
    kind: "damage-private",
    stage: "disbursed",
    instrument: "liability",
    from: "2023-06-26",
    to: "2023-07-02",
    eurM: 793, // ~17,000 claims, ~EUR46,600 average
    reference: true,
    sources: ["franceassureurs-2023"],
  },
  {
    id: "r-2023-insured-shops",
    payer: "insurer",
    kind: "damage-private",
    stage: "disbursed",
    instrument: "liability",
    from: "2023-06-26",
    to: "2023-07-02",
    eurM: 523, // ~2/3 of the total
    reference: true,
    sources: ["franceassureurs-2023"],
  },
  {
    id: "r-2023-insured-local",
    payer: "insurer",
    kind: "damage-public",
    stage: "disbursed",
    instrument: "liability",
    from: "2023-06-26",
    to: "2023-07-02",
    eurM: 200, // ~1/4: town halls, schools, buses
    reference: true,
    sources: ["franceassureurs-2023"],
  },
];

/* ── what no source prices: a cause, never a zero ────────────────────────── */

export const COST_UNPRICED: readonly UnpricedCost[] = [
  {
    id: "u-edu-loan-subsidy",
    payer: "state",
    kind: "concession",
    date: "2026-10-26",
    cause: "noPublishedTotal",
    noteRef: "loan-not-spending",
    sources: ["reuters-education-2026"],
  },
  {
    id: "u-edu-places",
    payer: "state",
    kind: "concession",
    date: "2026-10-26",
    cause: "noPublishedTotal",
    noteRef: "tax-expenditure",
    sources: ["reuters-education-2026"],
  },
  {
    id: "u-edu-classcap",
    payer: "state",
    kind: "concession",
    date: "2026-10-26",
    cause: "noPublishedTotal",
    noteRef: "tax-expenditure",
    sources: ["reuters-education-2026"],
  },
  {
    id: "u-edu-posts",
    payer: "state",
    kind: "concession",
    date: "2026-10-26",
    cause: "noPublishedTotal",
    noteRef: "tax-expenditure",
    sources: ["reuters-education-2026"],
  },
  {
    id: "u-smic",
    payer: "employer",
    kind: "concession",
    date: "2026-11-09",
    cause: "noPublishedTotal",
    noteRef: "tax-expenditure",
    sources: [
      "gouv-smic-2026",
      "franceinfo-conference-sociale-2026",
      "leparisien-conference-sociale-2026",
    ],
  },
  {
    id: "u-overtime-ceiling",
    payer: "state",
    kind: "concession",
    date: "2026-11-09",
    cause: "taxExpenditure",
    noteRef: "tax-expenditure",
    sources: ["gouv-conference-sociale-2026"],
  },
  {
    id: "u-fuel-bonus",
    payer: "employer",
    kind: "concession",
    date: "2026-11-09",
    cause: "taxExpenditure",
    noteRef: "tax-expenditure",
    sources: ["gouv-conference-sociale-2026"],
  },
  {
    id: "u-transport-75",
    payer: "employer",
    kind: "concession",
    date: "2026-11-09",
    cause: "taxExpenditure",
    noteRef: "tax-expenditure",
    sources: ["gouv-conference-sociale-2026"],
  },
  {
    id: "u-value-sharing",
    payer: "employer",
    kind: "concession",
    date: "2026-11-09",
    cause: "taxExpenditure",
    noteRef: "tax-expenditure",
    sources: ["gouv-conference-sociale-2026"],
  },
  {
    id: "u-uninsured-residual",
    payer: "private",
    kind: "damage-private",
    date: "2026-10-17",
    cause: "notApportioned",
    noteRef: "insured-gap",
    sources: ["ifrap-2026", "franceassureurs-2026"],
  },
  {
    id: "u-local-insurance",
    payer: "local",
    kind: "damage-public",
    date: "2026-10-17",
    cause: "noPublishedTotal",
    noteRef: "local-not-in-insurer-count",
    sources: ["franceassureurs-2026", "ifrap-2026"],
  },
  {
    id: "u-insurer-claims-paid",
    payer: "insurer",
    kind: "damage-private",
    date: "2026-10-20",
    cause: "noPublishedTotal",
    noteRef: "no-claims-paid",
    sources: ["of-assurance"],
  },
  {
    id: "u-sick-leave",
    payer: "state",
    kind: "support",
    date: "2026-11-11",
    cause: "notEstimated",
    noteRef: "no-claims-paid",
    sources: ["ifrap-2026"],
  },
  {
    id: "u-parental-liability",
    payer: "household",
    kind: "liability",
    date: "2026-09-15",
    cause: "notEstimated",
    noteRef: "parental-liability",
    sources: ["legifrance-1242"],
  },
];

/* ── SMIC: the one concession with a per-person figure ───────────────────── */

export const SMIC = {
  netMonthlyBefore: 1_477.93,
  netMonthlyAfter: 1_501.6,
  netPerMonth: 23.67,
  netOver2026: 75,
  effectiveFrom: "2026-12-01",
  pct: 1.6,
} as const;

/* ── derivation ──────────────────────────────────────────────────────────── */

export const PAYER_COST_BY_DATE: Readonly<
  Record<string, readonly PayerCost[]>
> = PAYER_COSTS.reduce<Record<string, PayerCost[]>>((acc, r) => {
  (acc[r.from] ??= []).push(r);
  return acc;
}, {});

/** Sum a set of rows. Legal ONLY within one (payer, stage, instrument, unit):
 *  committed + disbursed double-counts, a loan is not spending, and a
 *  per-person maximum is not an aggregate. Throws rather than lie. */
export function sumRows(rows: readonly PayerCost[]): [number, number] {
  const keys = new Set(
    rows.map(
      (r) => `${r.payer}|${r.stage}|${r.instrument}|${r.unit ?? "aggregate"}`,
    ),
  );
  if (keys.size > 1) {
    throw new Error(
      `sumRows: mixed rows (${[...keys].join(" + ")}) — committed and disbursed ` +
        `are never added, a loan is not spending, and a perPerson maximum is ` +
        `not an aggregate`,
    );
  }
  return rows.reduce<[number, number]>(
    (a, r) => {
      const [lo, hi] = bandOf(r.eurM);
      return [a[0] + lo, a[1] + hi];
    },
    [0, 0],
  );
}

/** Rows safe to total: never per-person maxima, never reference episodes. */
export const rowsFor = (
  payer: Payer,
  stage: Stage,
  instrument: Instrument,
): readonly PayerCost[] =>
  PAYER_COSTS.filter(
    (r) =>
      r.payer === payer &&
      r.stage === stage &&
      r.instrument === instrument &&
      r.unit !== "perPerson" &&
      r.reference !== true,
  );

/** Commitment per euro of damage, [most conservative, least conservative]:
 *  widest commitment over narrowest damage, and vice versa. ARITHMETIC on
 *  published bounds. Meaningful only because the €5bn is a loan — read it as
 *  "extracted commitment per euro of damage", never as cash. */
export const concessionToDamage = (
  concessions: [number, number],
  damage: [number, number],
): [number, number] => [concessions[0] / damage[1], concessions[1] / damage[0]];
