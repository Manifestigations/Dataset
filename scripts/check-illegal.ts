/**
 * Invariants for src/data/illegal/. A failure means the register contradicts
 * itself, not that the check is too strict.
 */
import { CASES } from "../src/data/casualties/index.ts";
import { FACTS } from "../src/data/facts.ts";
import {
  ACTS,
  CAVEATS,
  CHARGE_OF,
  NORMATIVE,
  NORMS,
  TACTICS,
} from "../src/data/illegal/index.ts";
// `SOURCES` is the aggregate exported by src/data/sources/index.ts. If that
// barrel exports it under another name, change this import and nothing else.
import { SOURCES } from "../src/data/sources/index.ts";

const errors: string[] = [];
const fail = (id: string, msg: string) => errors.push(id + ": " + msg);

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const isIso = (s: string) => ISO.test(s) && !Number.isNaN(Date.parse(s));

const sourceIds = new Set(
  Object.values(SOURCES as unknown as Record<string, { id: string }>).map(
    (s) => s.id,
  ),
);
const caseIds = new Set(
  Object.values(CASES as unknown as Record<string, { id: string }>).map(
    (c) => c.id,
  ),
);
const normIds = new Set(NORMS.map((n) => n.id));
const caveatIds = new Set(CAVEATS);
const tacticIds = new Set(TACTICS);

const seen = new Set<string>();

const needsStep: Record<string, string | null> = {
  alleged: null,
  complaint: "complaint",
  investigation: "investigation",
  charged: "charge",
  tried: "trial",
  convicted: "verdict",
  acquitted: "verdict",
  dismissed: "dismissal",
  prescribed: "prescription",
  unknown: null,
};

for (const a of ACTS) {
  const id = a.id;
  if (seen.has(id)) fail(id, "duplicate id");
  seen.add(id);
  if (id.startsWith("example-")) fail(id, "template record must not be merged");
  if (!isIso(a.date)) fail(id, "date is not ISO");
  if (a.dateEnd && (!isIso(a.dateEnd) || a.dateEnd < a.date))
    fail(id, "dateEnd before date");
  if (a.place.scope === "national" && a.place.commune !== "France")
    fail(id, "national scope with a commune");
  if (a.place.scope === "local" && a.place.commune === "France")
    fail(id, "local scope without a commune");

  const charge = CHARGE_OF[a.charge];
  if (!charge) fail(id, "unknown charge " + a.charge);
  else if (charge.side !== a.side)
    fail(id, "charge " + a.charge + " is not a " + a.side + " charge");

  // One figure, one home.
  if (a.count && (a.refs?.fact || (a.refs?.casualties?.length ?? 0) > 0))
    fail(id, "count restates a figure authored in facts.ts or casualties/");
  if (
    a.refs?.fact &&
    a.refs.fact.metric === "arrests" &&
    a.count?.unit === "persons"
  )
    fail(id, "persons counted twice: arrests already in FACTS");

  if (a.refs?.fact) {
    const cell = FACTS[a.refs.fact.date]?.[a.refs.fact.metric as never];
    if (cell === undefined) fail(id, "refs.fact points at an empty cell");
  }
  for (const c of a.refs?.casualties ?? [])
    if (!caseIds.has(c)) fail(id, "unknown casualty case " + c);

  for (const s of a.sources)
    if (!sourceIds.has(s)) fail(id, "unknown source " + s);
  for (const st of a.steps ?? [])
    if (!sourceIds.has(st.source)) fail(id, "step without a known source");
  if (a.steps && a.sources.length === 0) fail(id, "record without sources");

  // Status must be supported by the timeline.
  const want = needsStep[a.status] ?? null;
  if (want) {
    const kinds = (a.steps ?? []).map((s) => s.kind);
    if (!kinds.includes(want))
      fail(id, "status " + a.status + " without a " + want + " step");
  }
  if (a.status === "convicted" || a.status === "acquitted") {
    const v = (a.steps ?? []).find((s) => s.kind === "verdict");
    const expect = a.status === "convicted" ? "guilty" : "not-guilty";
    if (!v) fail(id, "verdict status without a verdict step");
    else if (v.verdict !== expect)
      fail(id, "verdict step " + v.verdict + " contradicts status " + a.status);
  }
  if (a.final && a.status !== "convicted" && a.status !== "acquitted")
    fail(id, "final is only for a conviction or an acquittal");
  const dates = (a.steps ?? []).map((s) => s.date);
  if (dates.some((d, i) => i > 0 && d < dates[i - 1]))
    fail(id, "steps are not in date order");
}

for (const h of NORMATIVE) {
  const id = h.id;
  if (seen.has(id)) fail(id, "duplicate id");
  seen.add(id);
  if (id.startsWith("example-")) fail(id, "template record must not be merged");
  if (!isIso(h.date)) fail(id, "date is not ISO");
  if (!normIds.has(h.norm)) fail(id, "unknown norm");
  if (!caveatIds.has(h.caveat)) fail(id, "unknown caveat");
  if (!tacticIds.has(h.tactic)) fail(id, "unknown tactic");
  if (h.steps?.length) fail(id, "a counterfactual has no procedural steps");
  if (h.final) fail(id, "a counterfactual is never final");
  if (h.charge && CHARGE_OF[h.charge]?.side !== "police")
    fail(id, "charge is not a police charge");
  for (const s of h.sources)
    if (!sourceIds.has(s)) fail(id, "unknown source " + s);
}

if (errors.length) {
  console.error("check:illegal — " + errors.length + " problem(s)");
  for (const e of errors) console.error("  " + e);
  process.exitCode = 1;
}
