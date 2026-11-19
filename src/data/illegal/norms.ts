import type { CaveatId, NormId } from "./vocabulary.ts";

export interface Norm {
  readonly id: NormId;
  readonly instrument: "AP I" | "AP II" | "CWC";
  /** Article as written in the instrument. Structural, not interpretive. */
  readonly article: string;
}

/** The norms a counterfactual entry is tested against. This list is the whole
 *  interpretive apparatus: adding a norm is a reviewed data change. */
export const NORMS: readonly Norm[] = [
  { id: "ap1-51-2", instrument: "AP I", article: "Art. 51(2)" },
  { id: "ap1-51-4", instrument: "AP I", article: "Art. 51(4)" },
  { id: "ap1-51-5-b", instrument: "AP I", article: "Art. 51(5)(b)" },
  { id: "ap1-75", instrument: "AP I", article: "Art. 75" },
  { id: "ap2-4", instrument: "AP II", article: "Art. 4" },
  { id: "ap1-35-2", instrument: "AP I", article: "Art. 35(2)" },
  { id: "cwc-1-5", instrument: "CWC", article: "Art. I(5)" },
];

export const CAVEATS: readonly CaveatId[] = [
  "ihl-not-armed-conflict",
  "cwc-riot-control",
  "means-not-prohibited",
];

const NORM_SET: ReadonlySet<string> = new Set(NORMS.map((n) => n.id));
const CAVEAT_SET: ReadonlySet<string> = new Set(CAVEATS);

export const isNorm = (v: string): v is NormId => NORM_SET.has(v);
export const isCaveat = (v: string): v is CaveatId => CAVEAT_SET.has(v);
