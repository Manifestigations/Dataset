import type { Side } from "./types.ts";
import type { ChargeFamily, ChargeId } from "./vocabulary.ts";

export interface Charge {
  readonly id: ChargeId;
  readonly side: Side;
  readonly family: ChargeFamily;
  /** Code pénal / CPP article numbers, bare ("431-3-1"). Leave empty until
   *  verified against Légifrance: a wrong article is worse than none. */
  readonly articles?: readonly string[];
}

export const CHARGES: readonly Charge[] = [
  {
    id: "attroupement",
    side: "protesters",
    family: "public-order",
    articles: ["431-3-1"],
  },
  { id: "entrave-circulation", side: "protesters", family: "public-order" },
  {
    id: "rebellion",
    side: "protesters",
    family: "authority",
    articles: ["433-6"],
  },
  {
    id: "outrage",
    side: "protesters",
    family: "authority",
    articles: ["433-5"],
  },
  { id: "violences-volontaires", side: "protesters", family: "violence" },
  {
    id: "degradations",
    side: "protesters",
    family: "property",
    articles: ["322-1"],
  },
  { id: "incendie", side: "protesters", family: "property" },
  { id: "arme-prohibee", side: "protesters", family: "procedure" },
  {
    id: "association-malfaiteurs",
    side: "protesters",
    family: "procedure",
    articles: ["450-1"],
  },
  { id: "violences-depositaire", side: "police", family: "violence" },
  { id: "faux", side: "police", family: "procedure", articles: ["441-4"] },
  { id: "mise-en-danger", side: "police", family: "violence" },
  {
    id: "non-assistance",
    side: "police",
    family: "violence",
    articles: ["223-6"],
  },
  { id: "sequestration", side: "police", family: "liberty" },
  {
    id: "discrimination",
    side: "police",
    family: "authority",
    articles: ["432-7"],
  },
  { id: "vie-privee", side: "police", family: "liberty" },
];

export const CHARGE_OF: Readonly<Record<ChargeId, Charge>> = Object.fromEntries(
  CHARGES.map((c) => [c.id, c]),
) as Readonly<Record<ChargeId, Charge>>;

export const chargesOf = (side: Side): readonly Charge[] =>
  CHARGES.filter((c) => c.side === side);

export const isChargeOf = (id: ChargeId, side: Side): boolean =>
  CHARGE_OF[id].side === side;
