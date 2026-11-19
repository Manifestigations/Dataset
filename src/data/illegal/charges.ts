import type { Side } from "./types.ts";
import type { ChargeFamily, ChargeId } from "./vocabulary.ts";

export interface Charge {
  readonly id: ChargeId;
  /**
   * Every side this qualification can be brought against. Violence is violence
   * whoever commits it; only offences defined by the status of the perpetrator
   * — violences by a person holding public authority — belong to one side alone.
   */
  readonly sides: readonly Side[];
  readonly family: ChargeFamily;
  /** Code pénal / CPP article numbers, bare ("431-3-1"). Leave empty until
   *  verified against Légifrance: a wrong article is worse than none. */
  readonly articles?: readonly string[];
}

export const CHARGES: readonly Charge[] = [
  // ── available against protesters and against far-right groups ──────────
  {
    id: "violences-volontaires",
    sides: ["protesters", "far-right"],
    family: "violence",
  },
  {
    id: "degradations",
    sides: ["protesters", "far-right"],
    family: "property",
    articles: ["322-1"],
  },
  { id: "incendie", sides: ["protesters", "far-right"], family: "property" },
  {
    id: "arme-prohibee",
    sides: ["protesters", "far-right"],
    family: "procedure",
  },
  {
    id: "association-malfaiteurs",
    sides: ["protesters", "far-right"],
    family: "procedure",
    articles: ["450-1"],
  },

  // ── protesters only: the offence is defined by the demonstration ───────
  {
    id: "attroupement",
    sides: ["protesters"],
    family: "public-order",
    articles: ["431-3-1"],
  },
  {
    id: "entrave-circulation",
    sides: ["protesters"],
    family: "public-order",
  },
  {
    id: "rebellion",
    sides: ["protesters"],
    family: "authority",
    articles: ["433-6"],
  },
  {
    id: "outrage",
    sides: ["protesters"],
    family: "authority",
    articles: ["433-5"],
  },

  // ── police only: defined by holding public authority ───────────────────
  { id: "violences-depositaire", sides: ["police"], family: "violence" },
  { id: "faux", sides: ["police"], family: "procedure", articles: ["441-4"] },
  { id: "mise-en-danger", sides: ["police"], family: "violence" },
  {
    id: "non-assistance",
    sides: ["police"],
    family: "violence",
    articles: ["223-6"],
  },
  { id: "sequestration", sides: ["police"], family: "liberty" },
  {
    id: "discrimination",
    sides: ["police"],
    family: "authority",
    articles: ["432-7"],
  },
  { id: "vie-privee", sides: ["police"], family: "liberty" },
];

export const CHARGE_OF: Readonly<Record<ChargeId, Charge>> = Object.fromEntries(
  CHARGES.map((c) => [c.id, c]),
) as Readonly<Record<ChargeId, Charge>>;

export const chargesOf = (side: Side): readonly Charge[] =>
  CHARGES.filter((c) => c.sides.includes(side));

export const isChargeOf = (id: ChargeId, side: Side): boolean =>
  CHARGE_OF[id].sides.includes(side);
