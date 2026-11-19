/* ── src/data/casualties/coding.ts — ICD-10 and AIS, as a codebook ───────────
   What this is: an admissible code set per published label, so a reader can see
   which injuries a label could stand for and which it cannot. What it is not:
   an assignment. No record here carries a diagnosis, so `assignment` is "none"
   on every span and ICD-10 is claimed for a label, never for a person.

   `grain` is the distinction the rest of the site depends on:
     "type"     the label names an injury (amputation, loss of an eye)
     "severity" the label names a degree (light, serious, other serious)

   A severity has no code of its own, so its `icd10` is the set of injuries that
   could carry that degree and is wide by construction. A per-injury cost can
   only ever be attached to a "type" span.

   AIS assigns a severity to ONE injury. MAIS is the highest of them, and ISS
   needs three codes in three regions, so neither is computable here: no span
   carries a score and none may be rendered as one.
   ───────────────────────────────────────────────────────────────────────── */

import { LADDER, type LadderId, type NativeLabel } from "./vocabulary.ts";

/** The nine AIS body regions. A burn sits in `external`, not in the region
 *  burnt, which is why a chemical burn to the face is not a `face` injury. */
export type AisRegion =
  | "head"
  | "face"
  | "neck"
  | "thorax"
  | "abdomen"
  | "spine"
  | "upperExtremity"
  | "lowerExtremity"
  | "external";

/** `document` = read from a clinical record (none exist yet);
 *  `reported` = a publisher states it, second-hand;
 *  `editorial` = this dataset's own alignment, which is what every span is. */
export type CodingBasis = "document" | "reported" | "editorial";

export type Grain = "type" | "severity";

export interface CodeSpan {
  /** Stable key. The site's copy may key on it and falls back to it. */
  readonly id: string;
  readonly rung: LadderId;
  /** NativeLabel ids this span classifies. Every label, exactly once. */
  readonly labels: readonly string[];
  readonly grain: Grain;
  /** Chapter XIX categories, at the level the label supports. Empty only for a
   *  death, whose primary code is an external cause. */
  readonly icd10: readonly string[];
  /** Chapter XX. Mortality is tabulated by external cause, not by injury. */
  readonly external?: readonly string[];
  /** [lo, hi] within 1–6, or null when AIS does not apply (a death). */
  readonly ais: readonly [number, number] | null;
  readonly regions: readonly AisRegion[];
  readonly basis: CodingBasis;
  /** null = no AIS edition was consulted, which is the truth for every span
   *  here. Set it only together with a basis other than "editorial". */
  readonly aisEdition: string | null;
  /** One member today. A per-case diagnosis would widen this union, which is
   *  the point: it cannot happen by accident. */
  readonly assignment: "none";
}

export const CODE_SPANS: readonly CodeSpan[] = [
  /* "Light" is a degree, so the set is every minor injury family: superficial
     injuries, sprains, minor open wounds, first- and second-degree burns. No
     member is more likely than another, and nothing here is a probable code. */
  {
    id: "crsLight",
    rung: "light",
    labels: ["forcesLight"],
    grain: "severity",
    icd10: [
      "S00",
      "S10",
      "S20",
      "S30",
      "S40",
      "S50",
      "S60",
      "S70",
      "S80",
      "S90",
      "S03",
      "S13",
      "S23",
      "S33",
      "S43",
      "S53",
      "S63",
      "S73",
      "S83",
      "S93",
      "T14.0",
      "T14.1",
    ],
    ais: [1, 2],
    regions: [
      "head",
      "neck",
      "thorax",
      "abdomen",
      "upperExtremity",
      "lowerExtremity",
      "external",
    ],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* "Not classed light" is a complement, not a category. The file states a
     share, never an injury, so this span is the whole of the middle. */
  {
    id: "crsNotLight",
    rung: "residual",
    labels: ["forcesResidual"],
    grain: "severity",
    icd10: [
      "S02",
      "S06",
      "S12",
      "S22",
      "S32",
      "S42",
      "S52",
      "S62",
      "S72",
      "S82",
      "S92",
      "T14.2",
    ],
    ais: [2, 3],
    regions: [
      "head",
      "neck",
      "thorax",
      "abdomen",
      "spine",
      "upperExtremity",
      "lowerExtremity",
    ],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* Two populations, one semantic: "blessé grave". A severity, so the set is
     every injury family that reaches AIS 3 — including the ones that reach 5. */
  {
    id: "forcesSerious",
    rung: "serious",
    labels: ["forcesSerious17", "civiliansSerious24"],
    grain: "severity",
    icd10: [
      "S02",
      "S05",
      "S06",
      "S22",
      "S26",
      "S27",
      "S36",
      "S42",
      "S52",
      "S62",
      "S72",
      "S82",
      "S92",
    ],
    ais: [3, 5],
    regions: [
      "head",
      "face",
      "thorax",
      "abdomen",
      "upperExtremity",
      "lowerExtremity",
    ],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* The 52. "Autres blessures graves" gives a degree and no organ: this is the
     widest admissible set in the file, and the clearest statement that the
     register is a severity register for these cases, not a type register. */
  {
    id: "registerOther",
    rung: "serious",
    labels: ["registerOther"],
    grain: "severity",
    icd10: [
      "S02",
      "S05",
      "S06",
      "S12",
      "S22",
      "S32",
      "S36",
      "S42",
      "S52",
      "S62",
      "S72",
      "S82",
      "S92",
      "T14.2",
    ],
    ais: [3, 5],
    regions: [
      "head",
      "face",
      "neck",
      "thorax",
      "abdomen",
      "spine",
      "upperExtremity",
      "lowerExtremity",
    ],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* The three spans that name an injury, and so the only three that could ever
     take a per-case cost. S05.7 is avulsion of the eye; S05.4–S05.6 are the
     penetrating wounds that end in enucleation. */
  {
    id: "registerVision",
    rung: "vision",
    labels: ["registerVision"],
    grain: "type",
    icd10: ["S05.4", "S05.5", "S05.6", "S05.7"],
    ais: [4, 5],
    regions: ["face"],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* Level decides severity: S68.0 is a thumb, S48 is a shoulder and upper arm.
     Hence 2–5, and hence the ladder's rung is a range too. */
  {
    id: "registerAmputation",
    rung: "destruction",
    labels: ["registerAmputation"],
    grain: "type",
    icd10: [
      "S48",
      "S58",
      "S68.0",
      "S68.1",
      "S68.2",
      "S68.3",
      "S68.4",
      "S78",
      "S88",
      "S98.0",
      "S98.1",
      "S98.2",
      "S98.3",
      "S98.4",
    ],
    ais: [2, 5],
    regions: ["upperExtremity", "lowerExtremity"],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  {
    id: "registerCraniofacial",
    rung: "destruction",
    labels: ["registerCraniofacial"],
    grain: "type",
    icd10: ["S01.4", "S01.5", "S02.1", "S02.3", "S02.4", "S02.7", "S02.8"],
    ais: [3, 5],
    regions: ["head", "face"],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },

  /* A death is tabulated by external cause, not by injury, and no source states
     a mechanism for this one — the same absence CASES records as `causeUnknown`.
     So there is no chapter XIX code to give and no AIS severity to assign. */
  {
    id: "registerFatal",
    rung: "fatal",
    labels: ["registerFatal"],
    grain: "severity",
    icd10: [],
    external: ["V01–V98"],
    ais: null,
    regions: [],
    basis: "editorial",
    aisEdition: null,
    assignment: "none",
  },
];

export const labelById = (id: string): NativeLabel | undefined =>
  LADDER.flatMap((rung) => rung.native).find((label) => label.id === id);

export const spansOf = (rung: LadderId): readonly CodeSpan[] =>
  CODE_SPANS.filter((span) => span.rung === rung);
