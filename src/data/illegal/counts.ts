import type { Count } from "./types.ts";

/**
 * Reported totals as published, each pinned to an `asOf` date. These are
 * stocks reported irregularly, not daily values: they are never interpolated,
 * never differenced and never drawn as a line. Where two rows give different
 * numbers for the same kind, both are kept — the disagreement is the finding.
 */
export type StockKind =
  | "igpn-open" // IGPN enquiries opened, all subjects
  | "igpn-mutilating" // of which: potentially irreversible injuries
  | "watchdog-open" // "internal watchdogs" (IGPN + IGGN), wider scope
  | "custody" // gardes à vue
  | "referred" // déférés au parquet
  | "prison-sentence" // peines de prison, all
  | "prison-unconditional" // dont ferme
  | "immediate-detention" // dont mandats de dépôt
  | "micas-served"; // administrative protest bans

export interface Stock {
  readonly id: string;
  readonly kind: StockKind;
  readonly asOf: string;
  readonly n: Count;
  readonly scope: "national";
  readonly source: string;
}

export const STOCKS: readonly Stock[] = [
  {
    id: "stk-2026-10-10-igpn",
    kind: "igpn-open",
    asOf: "2026-10-10",
    n: { s: "n", v: 24, unit: "acts" },
    scope: "national",
    source: "fr24-2026-10-10",
  },
  {
    id: "stk-2026-10-21-igpn",
    kind: "igpn-open",
    asOf: "2026-10-21",
    n: { s: "n", v: 36, unit: "acts" },
    scope: "national",
    source: "aljazeera-2026-10-21",
  },
  {
    id: "stk-2026-10-29-igpn",
    kind: "igpn-open",
    asOf: "2026-10-29",
    n: { s: "n", v: 80, unit: "acts" },
    scope: "national",
    source: "rtl-2026-10-29",
  },
  {
    id: "stk-2026-10-29-igpn-mutilating",
    kind: "igpn-mutilating",
    asOf: "2026-10-29",
    n: { s: "n", v: 20, unit: "acts" },
    scope: "national",
    source: "rtl-2026-10-29",
  },
  {
    id: "stk-2026-11-14-watchdog",
    kind: "watchdog-open",
    asOf: "2026-11-14",
    n: { s: "n", v: 161, unit: "acts" },
    scope: "national",
    source: "reuters-2026-11-14",
  },
  {
    id: "stk-2026-11-03-custody",
    kind: "custody",
    asOf: "2026-11-03",
    n: { s: "f", v: 4900, unit: "persons" },
    scope: "national",
    source: "reuters-2026-11-14",
  },
  {
    id: "stk-2026-11-03-referred",
    kind: "referred",
    asOf: "2026-11-03",
    n: { s: "n", v: 2290, unit: "persons" },
    scope: "national",
    source: "reuters-2026-11-14",
  },
  {
    id: "stk-2026-11-03-prison",
    kind: "prison-sentence",
    asOf: "2026-11-03",
    n: { s: "n", v: 404, unit: "persons" },
    scope: "national",
    source: "reuters-2026-11-14",
  },
  {
    id: "stk-2026-11-17-custody",
    kind: "custody",
    asOf: "2026-11-17",
    n: { s: "n", v: 7184, unit: "persons" },
    scope: "national",
    source: "bernama-2026-11-17",
  },
  {
    id: "stk-2026-11-17-referred",
    kind: "referred",
    asOf: "2026-11-17",
    n: { s: "n", v: 2301, unit: "persons" },
    scope: "national",
    source: "bernama-2026-11-17",
  },
  {
    id: "stk-2026-11-17-prison",
    kind: "prison-sentence",
    asOf: "2026-11-17",
    n: { s: "n", v: 466, unit: "persons" },
    scope: "national",
    source: "bernama-2026-11-17",
  },
  {
    id: "stk-2026-11-17-prison-unconditional",
    kind: "prison-unconditional",
    asOf: "2026-11-17",
    n: { s: "n", v: 195, unit: "persons" },
    scope: "national",
    source: "bernama-2026-11-17",
  },
  {
    id: "stk-2026-11-17-immediate-detention",
    kind: "immediate-detention",
    asOf: "2026-11-17",
    n: { s: "n", v: 111, unit: "persons" },
    scope: "national",
    source: "bernama-2026-11-17",
  },
  {
    id: "stk-2026-11-05-micas",
    kind: "micas-served",
    asOf: "2026-11-05",
    n: { s: "f", v: 60, unit: "persons" },
    scope: "national",
    source: "lemonde-2026-11-05",
  },
];
