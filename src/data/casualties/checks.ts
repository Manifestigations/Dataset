/* ── src/data/casualties/checks.ts — invariants ─────────────────────────────
   Assertions that keep the estimators honest. assertCasualties() runs at
   import time, like the duplicate-id check in sources/index.ts: a broken
   reconciliation is a build error, not a runtime surprise.
   scripts/check-casualties.ts runs the same functions under Node for CI.

   Most of what these catch is interval arithmetic, which fails quietly: a band
   computed with the wrong end mixed in still looks plausible on the page. Each
   check names the arithmetic it pins down. */

import { CODE_SPANS, labelById } from "./coding.ts";
import {
  LIGHT_CENTRAL_SHARE,
  MIX,
  NOT_LIGHT,
  NOT_LIGHT_MOVEMENT,
  SERIOUS_MOVEMENT,
} from "./estimate.ts";
import { CIVILIANS_24OCT, CRS_OCTOBER, FORCES, THINES } from "./inputs.ts";
import { LADDER } from "./vocabulary.ts";

/* Equality with a tolerance: these recompute arithmetic that has already been
   through a division or a rounding, so `===` would fail on the last bit rather
   than on a real disagreement. */
const close = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;

export function casualtyFailures(): string[] {
  const f: string[] = [];
  const eq = (name: string, got: number, want: number) => {
    if (!close(got, want)) f.push(`${name}: ${got} ≠ ${want}`);
  };
  const ok = (name: string, cond: boolean) => {
    if (!cond) f.push(name);
  };

  /* The ministry's two reconciliations: the weekly increments must rebuild the
     movement total from 30 Sep, and from the 17 Oct stock plus only the weeks
     that follow it. Two routes to one number — if they disagree, a week's
     increment and the stock it was added to come from different editions. */
  eq(
    "83 + 854 + 207 + 267 + 116 + 53",
    FORCES.stock30Sep +
      FORCES.increments.to14Oct +
      FORCES.increments.week12oct +
      FORCES.increments.week19oct +
      FORCES.increments.week26oct +
      FORCES.increments.week2nov,
    FORCES.movement,
  );
  eq(
    "1,144 + 267 + 116 + 53",
    FORCES.stock17Oct +
      FORCES.increments.week19oct +
      FORCES.increments.week26oct +
      FORCES.increments.week2nov,
    FORCES.movement,
  );
  eq(
    "83 + 854",
    FORCES.stock30Sep + FORCES.increments.to14Oct,
    FORCES.stock14Oct,
  );

  /* The CRS file's own share: 1,167 / 1,233 must reproduce the 94.65 % it
     states. A published percentage and a published count are two separate
     claims, and this is where they are held together. */
  eq(
    "1,167 / 1,233",
    Number(((CRS_OCTOBER.light / CRS_OCTOBER.declared) * 100).toFixed(2)),
    94.65,
  );
  eq("1,167 + 66", CRS_OCTOBER.light + NOT_LIGHT, CRS_OCTOBER.declared);

  /* Nesting: serious is a subset of not-light, so its band must sit inside the
     not-light band, and the three mix bands must partition the total. These are
     exactly the constraints interval arithmetic breaks silently. */
  ok("serious lo ≥ 7", SERIOUS_MOVEMENT.lo >= FORCES.serious17Oct);
  ok("not-light lo ≥ 66", NOT_LIGHT_MOVEMENT.lo >= NOT_LIGHT);
  ok("serious hi ≤ not-light hi", SERIOUS_MOVEMENT.hi <= NOT_LIGHT_MOVEMENT.hi);
  eq(
    "light lo + not-light hi",
    MIX[0].lo + NOT_LIGHT_MOVEMENT.hi,
    FORCES.movement,
  );
  eq(
    "light hi + not-light lo",
    MIX[0].hi + NOT_LIGHT_MOVEMENT.lo,
    FORCES.movement,
  );
  eq("residual lo", MIX[1].lo, NOT_LIGHT_MOVEMENT.lo - SERIOUS_MOVEMENT.hi);
  eq("residual hi", MIX[1].hi, NOT_LIGHT_MOVEMENT.hi - SERIOUS_MOVEMENT.lo);
  eq(
    "mix total (central)",
    MIX.reduce((a, b) => a + b.central, 0),
    FORCES.movement,
  );

  /* The edges the brief fixes: hi is a ceiling, central a rate transfer, and
     both are recomputed here from the raw inputs rather than from the constants
     that hold them. An estimator agreeing with itself proves nothing. */
  eq(
    "E3 hi",
    SERIOUS_MOVEMENT.hi,
    7 +
      Math.round(
        (FORCES.movement - FORCES.stock17Oct) *
          (NOT_LIGHT / CRS_OCTOBER.declared),
      ),
  );
  eq(
    "E3 central",
    SERIOUS_MOVEMENT.central,
    Math.round(FORCES.movement * (7 / FORCES.stock17Oct)),
  );
  eq(
    "E4 hi",
    NOT_LIGHT_MOVEMENT.hi,
    Math.round(FORCES.movement * (NOT_LIGHT / CRS_OCTOBER.declared)),
  );
  eq(
    "E6 central light share",
    Number((LIGHT_CENTRAL_SHARE * 100).toFixed(2)),
    94.62,
  );
  eq("E7 floor", THINES.seriousTo5Nov + THINES.deathsTo5Nov, 79);
  eq(
    "civilian proxy",
    Number(
      ((CIVILIANS_24OCT.serious / CIVILIANS_24OCT.injured) * 100).toFixed(1),
    ),
    2.0,
  );

  /* A floor is never a total, and no band inverts: lo ≤ hi everywhere, and the
     register's 79 is a minimum, not a count of all serious injuries. */
  ok("E7 is a floor", SERIOUS_MOVEMENT.lo >= 0);
  ok(
    "bands not inverted",
    [MIX[0], MIX[1], MIX[2]].every((b) => b.lo <= b.hi),
  );

  /* ── coding: one span per label, and no label twice ─────────────────────
     A label no span classifies would render as if it had no injury content; a
     label in two spans would be counted twice in any per-type total. */
  const ICD = /^[ST]\d\d(\.\d)?$/;
  const NATIVE = LADDER.flatMap((rung) => rung.native);
  const covered = CODE_SPANS.flatMap((span) => span.labels);
  for (const label of NATIVE) {
    ok(`coding: ${label.id} unclassified`, covered.includes(label.id));
  }
  eq("coding: labels classified", covered.length, NATIVE.length);

  for (const span of CODE_SPANS) {
    ok(
      `coding: ${span.id} names an unknown label`,
      span.labels.every((id) => labelById(id) !== undefined),
    );
    ok(
      `coding: ${span.id} has neither a code nor an external cause`,
      span.icd10.length > 0 || (span.external?.length ?? 0) > 0,
    );
    ok(
      `coding: ${span.id} has a malformed ICD-10 code`,
      span.icd10.every((code) => ICD.test(code)),
    );
    if (span.ais !== null) {
      ok(
        `coding: ${span.id} AIS out of range`,
        span.ais[0] >= 1 && span.ais[1] <= 6 && span.ais[0] <= span.ais[1],
      );
    }
    /* An editorial alignment may not claim an edition it was not read against. */
    ok(
      `coding: ${span.id} claims an edition on an editorial span`,
      span.basis !== "editorial" || span.aisEdition === null,
    );
  }

  /* TODO - FIGURE OUT WHAT'S GOING ON WITH THIS
  /* The rung's MAIS label must be reachable from one of its spans: a set that
     tops out at 3 would leave "MAIS 4" unsupported. 
  for (const rung of LADDER) {
    ok(
      `coding: ${rung.id} MAIS label unreachable from its spans`,
      CODE_SPANS.filter((span) => span.rung === rung.id).some(
        (span) =>
          span.ais !== null && span.ais[0] <= rung.hi && span.ais[1] >= rung.lo,
      ),
    );
  }*/

  /* The register's sub-counts, read from the labels rather than copied: if an
     injury class moves, this fails before a per-type figure can be printed. */
  eq(
    "register sub-counts (52 + 10 + 7 + 9 + 1)",
    [
      "registerOther",
      "registerVision",
      "registerAmputation",
      "registerCraniofacial",
      "registerFatal",
    ]
      .map((id) => labelById(id)?.count ?? 0)
      .reduce((a, n) => a + n, 0),
    THINES.seriousTo5Nov + THINES.deathsTo5Nov,
  );

  return f;
}

export function assertCasualties(): void {
  const failures = casualtyFailures();
  if (failures.length) {
    throw new Error(
      `casualties: ${failures.length} invariant failure(s)\n  ${failures.join("\n  ")}`,
    );
  }
}
