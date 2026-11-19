/**
 * Invariants for src/data/illegal/. A failure means the register contradicts
 * itself, not that the check is too strict.
 *
 * What this file cannot check, because it does not live here: whether every
 * `{ k: "act", id }` has a note in the Observatory's CHART_EN and CHART_FR.
 * That parity check belongs with the copy, and a missing key there renders as
 * an empty string rather than an error.
 */

import { CASES } from "../src/data/casualties/index.ts";
import type {
  ActStatus,
  Attribution,
  Count,
  NoteRef,
  StepKind,
  Unit,
} from "../src/data/illegal/index.ts";
import {
  ACT_STATUSES,
  ATTRIBUTED_BY,
  ATTRIBUTION_TERMS,
  CAVEATS,
  CHARGE_OF,
  GAP_REASONS,
  HEARING_MODES,
  ILLEGAL_ACTS,
  isChargeOf,
  NORMATIVE,
  NORMS,
  SITTINGS,
  TACTICS,
} from "../src/data/illegal/index.ts";
import { SOURCES } from "../src/data/sources/index.ts";
import { FACTS } from "../src/index.ts";

const errors: string[] = [];

const fail = (id: string, msg: string): void => {
  errors.push(`${id}: ${msg}`);
};

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const isIso = (s: string): boolean =>
  ISO.test(s) && !Number.isNaN(Date.parse(s));

const ID_ACT = /^act-\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*-\d{2}$/;
const ID_NORM = /^nrm-\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID_SIT = /^sit-\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "act-2026-10-17-paris-02" → "2026-10-17". Every prefix in this domain is
 *  four characters, so the date always starts at 4 and ends at 14. */
const dateInId = (id: string): string => id.slice(4, 14);

const sourceIds: ReadonlySet<string> = new Set(SOURCES.map((s) => s.id));
/**
 * A casualty reference points at a named case key (the strings inside a
 * CaseRow's `cases`) or at a row id ("protesterConflictual"). Both resolve, and
 * neither is a count.
 */
const casualtyIds: ReadonlySet<string> = new Set([
  ...CASES.map((c) => c.id),
  ...CASES.flatMap((c) => c.cases),
]);
const normIds: ReadonlySet<string> = new Set(NORMS.map((n) => n.id));
const caveatIds: ReadonlySet<string> = new Set<string>(CAVEATS);
const tacticIds: ReadonlySet<string> = new Set<string>(TACTICS);
const statusIds: ReadonlySet<string> = new Set<string>(ACT_STATUSES);
const modeIds: ReadonlySet<string> = new Set<string>(HEARING_MODES);
const gapIds: ReadonlySet<string> = new Set<string>(GAP_REASONS);
const termIds: ReadonlySet<string> = new Set<string>(ATTRIBUTION_TERMS);
const authorIds: ReadonlySet<string> = new Set<string>(ATTRIBUTED_BY);

const sittingById = new Map(SITTINGS.map((s) => [s.id, s]));

/** Statuses that claim a qualification has been announced. Below `charged` a
 *  record may carry an empty list; from `charged` on, an empty list is a
 *  contradiction, not a gap. */
const CHARGE_REQUIRED: ReadonlySet<ActStatus> = new Set<ActStatus>([
  "charged",
  "tried",
  "convicted",
  "acquitted",
]);

const NEEDS_STEP: Readonly<Partial<Record<ActStatus, StepKind>>> = {
  complaint: "complaint",
  investigation: "investigation",
  charged: "charge",
  tried: "trial",
  convicted: "verdict",
  acquitted: "verdict",
  dismissed: "dismissal",
  prescribed: "prescription",
};

/** Every id in the domain, so a collision across the three files is caught
 *  rather than hidden behind whichever array happens to be read first. */
const seen = new Set<string>();

const claim = (id: string): void => {
  if (seen.has(id)) fail(id, "duplicate id");
  seen.add(id);
  if (id.startsWith("example-")) fail(id, "template record must not be merged");
};

const checkCount = (
  id: string,
  c: Count,
  where: string,
  unit: Unit | undefined,
  noted: boolean,
): void => {
  if (c.s === "x") {
    if (!gapIds.has(c.why)) fail(id, `${where}: unknown gap reason "${c.why}"`);
    return;
  }
  if (unit !== undefined && c.unit !== unit)
    fail(id, `${where}: unit is "${c.unit}", expected "${unit}"`);
  if (c.s === "a" && !noted)
    fail(
      id,
      `${where}: an approximate figure needs a note explaining who approximated`,
    );
  if (c.s === "r") {
    if (!Number.isInteger(c.lo) || !Number.isInteger(c.hi))
      fail(id, `${where}: range bounds are not integers`);
    if (c.lo > c.hi) fail(id, `${where}: inverted range ${c.lo}–${c.hi}`);
    if (c.lo < 0) fail(id, `${where}: negative range bound`);
  } else if (!Number.isInteger(c.v) || c.v < 0) {
    fail(id, `${where}: count ${c.v} is not a non-negative integer`);
  }
};

const checkNoteRef = (id: string, n: NoteRef): void => {
  if (n.k !== "act")
    fail(
      id,
      `noteRef kind "${n.k}": an act or a sitting uses { k: "act", id }`,
    );
  else if (n.id !== id)
    fail(id, `noteRef id "${n.id}" is not this record's own id`);
};

const checkPlace = (
  id: string,
  place: {
    readonly commune: string;
    readonly dep?: string;
    readonly scope: "national" | "local";
  },
): void => {
  if (place.scope === "national" && place.commune !== "France")
    fail(id, "national scope with a commune");
  if (place.scope === "local" && place.commune === "France")
    fail(id, "local scope without a commune");
  if (place.dep !== undefined && !/^\d{2,3}$/.test(place.dep))
    fail(id, `department code "${place.dep}" is not two or three digits`);
};

const checkSources = (id: string, ids: readonly string[]): void => {
  if (ids.length === 0) fail(id, "record without sources");
  const listed = new Set<string>();
  for (const s of ids) {
    if (listed.has(s)) fail(id, `source ${s} listed twice`);
    listed.add(s);
    if (!sourceIds.has(s)) fail(id, `unknown source ${s}`);
  }
};

/* ── acts ─────────────────────────────────────────────────────────────── */

for (const a of ILLEGAL_ACTS) {
  const id = a.id;
  claim(id);

  if (!ID_ACT.test(id)) fail(id, "id is not act-<YYYY-MM-DD>-<commune>-<nn>");
  else if (dateInId(id) !== a.date)
    fail(id, `id date "${dateInId(id)}" does not match date "${a.date}"`);

  if (!isIso(a.date)) fail(id, "date is not ISO");
  if (a.dateEnd !== undefined) {
    if (!isIso(a.dateEnd)) fail(id, "dateEnd is not ISO");
    else if (a.dateEnd < a.date) fail(id, "dateEnd precedes date");
  }

  checkPlace(id, a.place);

  if (!statusIds.has(a.status)) fail(id, `unknown status "${a.status}"`);
  if (a.tactic !== undefined && !tacticIds.has(a.tactic))
    fail(id, `unknown tactic "${a.tactic}"`);

  /* ── charges: a list, one entry per qualification ─────────────────── */
  if (a.charges.length === 0 && CHARGE_REQUIRED.has(a.status))
    fail(
      id,
      `status "${a.status}" with no charge: a qualification has been announced`,
    );
  const listedCharges = new Set<string>();
  for (const c of a.charges) {
    if (listedCharges.has(c)) fail(id, `charge "${c}" listed twice`);
    listedCharges.add(c);
    if (CHARGE_OF[c] === undefined) fail(id, `unknown charge "${c}"`);
    else if (!isChargeOf(c, a.side))
      fail(id, `charge "${c}" is not available against "${a.side}"`);
  }

  /* ── the third side is an attributed label ───────────────────────── */
  if (a.side === "far-right") {
    /* widened on purpose: the union already guarantees this, and the check is
       for a record that reached main through a cast */
    const attr = (a as { readonly attribution?: Attribution }).attribution;
    if (attr === undefined) fail(id, "far-right record without attribution");
    else {
      if (!termIds.has(attr.term))
        fail(id, `unknown attribution term "${attr.term}"`);
      if (attr.term === "unattributed")
        fail(
          id,
          "far-right record whose label nobody applied: name the term or drop the side",
        );
      if (!authorIds.has(attr.by))
        fail(id, `unknown attribution author "${attr.by}"`);
    }
  }

  /* ── one figure, one home ────────────────────────────────────────── */
  const linkedFigures =
    a.refs?.fact !== undefined || (a.refs?.casualties?.length ?? 0) > 0;
  if (a.count !== undefined && linkedFigures)
    fail(id, "count restates a figure authored in facts.ts or casualties/");
  if (a.count !== undefined)
    checkCount(id, a.count, "count", undefined, a.noteRef !== undefined);

  if (a.refs?.fact !== undefined) {
    const { date, metric } = a.refs.fact;
    if (!isIso(date)) fail(id, "refs.fact date is not ISO");
    if (FACTS[date]?.[metric] === undefined)
      fail(id, `refs.fact points at an empty cell (${date} ${metric})`);
  }

  const seenCasualties = new Set<string>();
  for (const c of a.refs?.casualties ?? []) {
    if (seenCasualties.has(c)) fail(id, `casualty "${c}" referenced twice`);
    seenCasualties.add(c);
    if (!casualtyIds.has(c)) fail(id, `unknown casualty case "${c}"`);
  }

  if (a.refs?.sitting !== undefined) {
    const sit = sittingById.get(a.refs.sitting);
    if (sit === undefined) fail(id, `unknown sitting "${a.refs.sitting}"`);
    else if (sit.date < a.date)
      fail(id, `sitting "${sit.id}" precedes the act`);
  }

  /* ── steps: the audit trail behind `status` ──────────────────────── */
  const steps = a.steps ?? [];
  checkSources(id, a.sources);

  let previous = "";
  for (const [i, st] of steps.entries()) {
    if (!isIso(st.date)) fail(id, `step ${i}: date is not ISO`);
    if (st.date < a.date) fail(id, `step ${i}: predates the act`);
    if (previous !== "" && st.date < previous)
      fail(id, `step ${i}: steps are not in date order`);
    previous = st.date;
    if (!sourceIds.has(st.source))
      fail(id, `step ${i}: unknown source "${st.source}"`);
    if (st.kind === "verdict" && st.verdict === undefined)
      fail(id, `step ${i}: verdict step with no verdict`);
    if (st.kind !== "verdict" && st.verdict !== undefined)
      fail(id, `step ${i}: verdict on a "${st.kind}" step`);
  }

  const wanted = NEEDS_STEP[a.status];
  if (wanted !== undefined && !steps.some((s) => s.kind === wanted))
    fail(id, `status "${a.status}" without a "${wanted}" step`);

  if (a.status === "convicted" || a.status === "acquitted") {
    const expected = a.status === "convicted" ? "guilty" : "not-guilty";
    const verdicts = steps.filter((s) => s.kind === "verdict");
    if (verdicts.length === 0)
      fail(id, "verdict status without a verdict step");
    else if (!verdicts.some((s) => s.verdict === expected))
      fail(id, `no verdict step reads "${expected}" for status "${a.status}"`);
  }

  if (a.final === true && a.status !== "convicted" && a.status !== "acquitted")
    fail(id, "final is only for a conviction or an acquittal");

  if (a.noteRef !== undefined) checkNoteRef(id, a.noteRef);
}

/* ── counterfactuals ──────────────────────────────────────────────────── */

for (const h of NORMATIVE) {
  const id = h.id;
  claim(id);

  if (!ID_NORM.test(id)) fail(id, "id is not nrm-<YYYY-MM-DD>-<slug>");
  else if (dateInId(id) !== h.date)
    fail(id, `id date "${dateInId(id)}" does not match date "${h.date}"`);

  if (!isIso(h.date)) fail(id, "date is not ISO");
  if (h.side !== "police") fail(id, "a counterfactual tests a police tactic");
  if (h.status !== "hypothetical")
    fail(id, `status "${h.status}": a counterfactual is always hypothetical`);
  if (!normIds.has(h.norm)) fail(id, `unknown norm "${h.norm}"`);
  if (!caveatIds.has(h.caveat)) fail(id, `unknown caveat "${h.caveat}"`);
  if (!tacticIds.has(h.tactic)) fail(id, `unknown tactic "${h.tactic}"`);
  if ((h.steps?.length ?? 0) > 0)
    fail(id, "a counterfactual has no procedural steps");
  if (h.final === true) fail(id, "a counterfactual is never final");
  if (h.refs?.sitting !== undefined)
    fail(id, "a counterfactual has no hearing: drop refs.sitting");

  for (const c of h.charges ?? [])
    if (!isChargeOf(c, "police"))
      fail(id, `charge "${c}" is not available against the police`);

  const linkedFigures =
    h.refs?.fact !== undefined || (h.refs?.casualties?.length ?? 0) > 0;
  if (h.count !== undefined && linkedFigures)
    fail(id, "count restates a figure authored in facts.ts or casualties/");
  if (h.count !== undefined)
    checkCount(id, h.count, "count", undefined, h.noteRef !== undefined);

  if (h.refs?.fact !== undefined) {
    const { date, metric } = h.refs.fact;
    if (!isIso(date)) fail(id, "refs.fact date is not ISO");
    if (FACTS[date]?.[metric] === undefined)
      fail(id, `refs.fact points at an empty cell (${date} ${metric})`);
  }
  for (const c of h.refs?.casualties ?? [])
    if (!casualtyIds.has(c)) fail(id, `unknown casualty case "${c}"`);

  checkSources(id, h.sources);
  if (h.noteRef !== undefined) checkNoteRef(id, h.noteRef);
}

/* ── sittings: conditions, not claims ─────────────────────────────────── */

for (const s of SITTINGS) {
  const id = s.id;
  claim(id);

  if (!ID_SIT.test(id)) fail(id, "id is not sit-<YYYY-MM-DD>-<commune>");
  else if (dateInId(id) !== s.date)
    fail(id, `id date "${dateInId(id)}" does not match date "${s.date}"`);

  if (!isIso(s.date)) fail(id, "date is not ISO");
  checkPlace(id, s.place);

  if (s.modes.length === 0) fail(id, "sitting with no track");
  const listedModes = new Set<string>();
  for (const m of s.modes) {
    if (listedModes.has(m)) fail(id, `track "${m}" listed twice`);
    listedModes.add(m);
    if (!modeIds.has(m)) fail(id, `unknown hearing mode "${m}"`);
  }

  checkCount(id, s.rooms, "rooms", "establishments", s.noteRef !== undefined);
  if (s.roomsUsual !== undefined) {
    checkCount(
      id,
      s.roomsUsual,
      "roomsUsual",
      "establishments",
      s.noteRef !== undefined,
    );
    const usual = s.roomsUsual.s === "x" ? undefined : s.roomsUsual.v;
    const actual =
      s.rooms.s === "x"
        ? undefined
        : s.rooms.s === "r"
          ? s.rooms.hi
          : s.rooms.v;
    if (usual !== undefined && actual !== undefined && usual > actual)
      fail(id, `roomsUsual ${usual} exceeds rooms ${actual}`);
  }

  const docketed = new Set<string>();
  for (const d of s.dockets ?? []) {
    if (!s.modes.includes(d.mode))
      fail(id, `docket "${d.mode}" is not one of the sitting's tracks`);
    if (docketed.has(d.mode)) fail(id, `two dockets for track "${d.mode}"`);
    docketed.add(d.mode);
    checkCount(
      id,
      d.cases,
      `docket ${d.mode}`,
      "cases",
      s.noteRef !== undefined,
    );
  }

  checkSources(id, s.sources);
  if (s.noteRef !== undefined) checkNoteRef(id, s.noteRef);
}

if (errors.length > 0) {
  console.error(`check:illegal — ${errors.length} problem(s)`);
  for (const e of errors) console.error("  " + e);
  process.exitCode = 1;
} else {
  const approximate = [...ILLEGAL_ACTS, ...NORMATIVE].filter(
    (r) => r.count?.s === "a",
  ).length;
  console.log(
    `check:illegal — ok: ${ILLEGAL_ACTS.length} acts, ${NORMATIVE.length} counterfactuals, ${SITTINGS.length} sittings` +
      (approximate > 0 ? `, ${approximate} approximate figure(s)` : ""),
  );
}
