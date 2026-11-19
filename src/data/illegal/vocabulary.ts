/** Closed vocabularies for the illegal-act register. Ids only: every label is
 *  copy, and copy lives in the Observatory, keyed by these ids. A charge that
 *  does not fit here is a vocabulary change under review — there is no `other`. */

export type ChargeFamily =
  | "public-order"
  | "violence"
  | "property"
  | "authority"
  | "liberty"
  | "procedure";

export type ChargeId =
  // protesters
  | "attroupement"
  | "entrave-circulation"
  | "rebellion"
  | "outrage"
  | "violences-volontaires"
  | "degradations"
  | "incendie"
  | "tentative-homicide"
  | "arme-prohibee"
  | "association-malfaiteurs"
  // police
  | "violences-depositaire"
  | "faux"
  | "mise-en-danger"
  | "non-assistance"
  | "sequestration"
  | "discrimination"
  | "vie-privee"
  // far-right
  | "violences-aggravees"
  | "association-malfaiteurs-violences";

export type TacticId =
  | "tear-gas"
  | "lbd"
  | "grenade"
  | "charge"
  | "nasse"
  | "interpellation"
  | "surveillance";

/** Instruments of the law of armed conflict. Ids are structural (article
 *  numbers), never a description of the norm: that is copy. */
export type NormId =
  | "ap1-51-2"
  | "ap1-51-4"
  | "ap1-51-5-b"
  | "ap1-75"
  | "ap2-4"
  | "ap1-35-2"
  | "cwc-1-5";

/** Why a counterfactual entry must not be read as an accusation. */
export type CaveatId =
  "ihl-not-armed-conflict" | "cwc-riot-control" | "means-not-prohibited";
