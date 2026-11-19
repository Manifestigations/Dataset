/* ═══════════════════════════════════════════════════════════════════════════
   src/data/costs-checks.ts — the invariants costs.ts must satisfy.

   Returns failure strings; it never throws and never exits. `scripts/
   check-costs.ts` is the only caller, so the runtime payload does not ship.
   A failure means the cost data contradicts itself — not that the check is
   too strict. Fix the data.
   ═══════════════════════════════════════════════════════════════════════════ */

import { bandOf } from "../model/index.ts";
import {
  COST_UNPRICED,
  IFRAP_SCENARIOS,
  INSURED_2026,
  PAYER_COSTS,
  rowsFor,
  sumRows,
  type PayerCost,
  type Scenario,
} from "./costs.ts";
import { SOURCES } from "./sources/index.ts"; // ← confirm this export name

const SCEN: readonly Scenario[] = ["low", "central", "high"];

/** The gross band each asset class should carry, per iFRAP. */
const GROSS: readonly {
  class: string;
  low: number;
  high: number;
}[] = [
  {
    class: "shops",
    low: 181,
    high: 666,
  },
  {
    class: "public",
    low: 63,
    high: 200,
  },
  {
    class: "vehicles",
    low: 15,
    high: 45,
  },
  {
    class: "turnover",
    low: 50,
    high: 190,
  },
];

export function costFailures(): string[] {
  const f: string[] = [];
  const byId = (id: string): PayerCost | undefined =>
    PAYER_COSTS.find((r) => r.id === id);

  /* 1. iFRAP's own arithmetic, three scenarios. */
  for (const s of SCEN) {
    const material = GROSS.reduce(
      (a, g) =>
        a + (s === "low" ? g.low : s === "central" ? g.low + 0 : g.high),
      0,
    );
    // material is recomputed from the published columns below, not from this.
    void material;
  }
  const col = (side: "low" | "central" | "high"): number[] => {
    // Published columns: low/central/high per class are not all in GROSS, so
    // the per-scenario subtotals are checked against IFRAP_SCENARIOS directly.
    const shops = { low: 181, central: 353, high: 666 }[side];
    const pub = { low: 63, central: 110, high: 200 }[side];
    const veh = { low: 15, central: 30, high: 45 }[side];
    const lost = { low: 50, central: 120, high: 190 }[side];
    return [shops, pub, veh, lost];
  };
  for (const s of SCEN) {
    const [shops, pub, veh, lost] = col(s);
    const material = shops! + pub! + veh!;
    if (material !== IFRAP_SCENARIOS.materialSubtotal[s])
      f.push(
        `iFRAP ${s}: material ${material} != published ${IFRAP_SCENARIOS.materialSubtotal[s]}`,
      );
    if (material + lost! !== IFRAP_SCENARIOS.total[s])
      f.push(
        `iFRAP ${s}: total ${material + lost!} != published ${IFRAP_SCENARIOS.total[s]}`,
      );
  }

  /* 2. France Assureurs' own arithmetic, three lines. Claims add exactly;
        euros do not, because each line is hedged with "pourrait atteindre". */
  const lines = INSURED_2026.byLine;
  const claimsSum =
    lines.professionals.claims + lines.households.claims + lines.motor.claims;
  if (claimsSum !== INSURED_2026.claimsTotal)
    f.push(
      `insurers: ${claimsSum} claims != published ${INSURED_2026.claimsTotal}`,
    );

  const eurSum =
    lines.professionals.eurM + lines.households.eurM + lines.motor.eurM;
  if (Math.abs(eurSum - INSURED_2026.componentSum) > 0.01)
    f.push(
      `insurers: lines sum to ${eurSum}, componentSum says ${INSURED_2026.componentSum}`,
    );
  if (Math.abs(eurSum - INSURED_2026.total) > 1)
    f.push(
      `insurers: lines sum to ${eurSum}, published total ${INSURED_2026.total} — gap exceeds the hedge`,
    );

  const proShare = lines.professionals.eurM / INSURED_2026.total;
  if (proShare <= 0.95 || proShare >= 0.96)
    f.push(
      `insurers: professionals are ${(proShare * 100).toFixed(1)}% of the total, published as "over 95%"`,
    );

  /* 3. The insurer rows in PAYER_COSTS reproduce the communiqué line by line,
        and no local-authority insurance row exists to invent one. */
  const insRows = PAYER_COSTS.filter(
    (r) => r.payer === "insurer" && r.sources.includes("franceassureurs-2026"),
  );
  const [insLo, insHi] = sumRows(insRows);
  if (
    insLo !== INSURED_2026.componentSum ||
    insHi !== INSURED_2026.componentSum
  )
    f.push(
      `insurer rows sum to ${insLo}-${insHi}, expected ${INSURED_2026.componentSum}`,
    );
  const claimRows = insRows.reduce((a, r) => a + (r.claims ?? 0), 0);
  if (claimRows !== INSURED_2026.claimsTotal)
    f.push(
      `insurer rows carry ${claimRows} claims, expected ${INSURED_2026.claimsTotal}`,
    );

  if (
    PAYER_COSTS.some((r) => r.payer === "insurer" && r.kind === "damage-public")
  )
    f.push(
      "a local-authority insurance row exists — the 19 Nov communiqué has no such line",
    );

  /* 4. Gross rows carry the published band, never a flattened point. */
  const expect: Record<string, [number, number]> = {
    "d-shops-gross": [181, 666],
    "d-public-gross": [63, 200],
    "d-vehicles-gross": [15, 45],
    "d-turnover-gross": [50, 190],
  };
  for (const [id, band] of Object.entries(expect)) {
    const r = byId(id);
    if (!r) {
      f.push(`${id}: missing`);
      continue;
    }
    const got = bandOf(r.eurM);
    if (got[0] !== band[0] || got[1] !== band[1])
      f.push(`${id}: ${got.join("-")} != published ${band.join("-")}`);
  }

  /* 5. State response sums to iFRAP's publicResponse, high scenario. */
  const support = PAYER_COSTS.filter(
    (r) => r.kind === "support" && r.payer === "state" && r.scenario === "high",
  );
  const [supLo] = sumRows(support);
  if (support.length && support[0]!.instrument !== "spending")
    f.push("state support rows must be instrument=spending");
  if (support.length && support[0]!.payer !== "state") f.push("unreachable");
  if (
    support.every((r) => r.payer === "state") &&
    support[0] &&
    support[0].payer === "state"
  ) {
    const a = sumRows(support.filter((r) => r.payer === "state"))[0];
    if (support.length && a !== IFRAP_SCENARIOS.publicResponse.high - 10)
      f.push(
        `state support sums to ${a}, expected ${IFRAP_SCENARIOS.publicResponse.high - 10} (iFRAP high less Lyon 10)`,
      );
  }
  void supLo;

  /* 6. A per-person maximum never enters an aggregate. */
  for (const p of [
    "state",
    "local",
    "insurer",
    "employer",
    "private",
    "household",
    "protestor",
  ] as const) {
    for (const st of ["committed", "disbursed", "contingent"] as const) {
      for (const ins of [
        "spending",
        "loan",
        "tax-expenditure",
        "liability",
      ] as const) {
        const bad = rowsFor(p, st, ins).filter((r) => r.unit === "perPerson");
        if (bad.length)
          f.push(
            `rowsFor(${p},${st},${ins}) leaked perPerson ${bad.map((b) => b.id).join(",")}`,
          );
      }
    }
  }

  /* 7. Every cited source exists in the catalogue. */
  const known = new Set(SOURCES.map((s) => s.id));
  const cited = new Set<string>();
  for (const r of PAYER_COSTS) for (const id of r.sources) cited.add(id);
  for (const u of COST_UNPRICED) for (const id of u.sources) cited.add(id);
  for (const id of cited)
    if (!known.has(id)) f.push(`unknown source id: ${id}`);

  /* 8. Reference episodes never enter a 2026 total. */
  for (const r of PAYER_COSTS) {
    if (r.reference && r.from >= "2026-01-01")
      f.push(`${r.id}: reference row dated inside 2026`);
  }

  /* 9. Disbursed is legitimately empty — assert that is explicit, not zeroed. */
  const disbursed2026 = PAYER_COSTS.filter(
    (r) => r.stage === "disbursed" && !r.reference,
  );
  if (disbursed2026.length) {
    f.push(
      `2026 disbursed rows exist (${disbursed2026.map((r) => r.id).join(",")}) — ` +
        `no source publishes a claims-paid figure; move it to COST_UNPRICED`,
    );
  }

  /* 10. Every unpriced row carries a reason and at least one source. */
  for (const u of COST_UNPRICED) {
    if (!u.cause) f.push(`${u.id}: unpriced without a cause`);
    if (!u.sources.length) f.push(`${u.id}: unpriced without a source`);
  }

  return f;
}
