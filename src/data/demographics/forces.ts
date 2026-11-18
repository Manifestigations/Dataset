/* ── src/data/demographics/forces.ts ───────────────────────────────────────
   Who is on the policing side. Two traps, both stated in the data itself:

   1. The figures are for the CORPS, not for the deployment. 3 % women among
      11,000 CRS officers does not tell you the share of women in the 63
      companies sent to a demonstration — and the operational units are the
      least feminised part of the corps.
   2. A recruitment share is not a stock. "24 % women among successful
      gendarmerie candidates" describes one year's intake; the corps they
      join takes decades to turn over.

   No age figure exists for the CRS alone or for the gendarmes mobiles alone.
   That is a `not-split` gap, not a missing search. */

import type { DemoRow } from "./types.ts";

export const FORCE_ROWS: readonly DemoRow[] = [
  {
    id: "crs-2018-sex",
    side: "forces",
    source: "liberation-checknews-crs-femmes-2018",
    period: { from: "2018-09-24" },
    population: {
      en: "All CRS staff, 11,039 officers (2018). Corps strength, not a deployment.",
      fr: "Effectif total des CRS, 11 039 agents (2018). Effectif du corps, non un effectif déployé.",
    },
    shares: [
      {
        dim: "sex",
        bucket: "femmes",
        value: 3.23,
        n: [357, 11039],
        base: "all",
        derived: true,
        note: {
          en: "357/11,039 = 3.23 %. The oldest CRS-specific figure we hold; the corps moves slowly, but do not print it as current.",
          fr: "357/11 039 = 3,23 %. Le plus ancien chiffre spécifiquement CRS que nous détenons ; le corps évolue lentement, mais ne pas l'afficher comme actuel.",
        },
      },
    ],
    basis: "reported",
  },
  {
    id: "crs-2024-sex",
    side: "forces",
    source: "police-nationale-net-crs-femmes",
    period: { from: "2024-01-01", to: "2024-12-31" },
    population: {
      en: "CRS corps, ~11,000 officers, 2024 — as compiled by an unofficial reference site, not by the ministry.",
      fr: "Corps des CRS, ~11 000 agents, 2024 — selon un site de référence non officiel, non le ministère.",
    },
    shares: [{ dim: "sex", bucket: "femmes", value: [3, 5], base: "all" }],
    basis: "reported",
  },
  {
    id: "police-nationale-2026-sex",
    side: "forces",
    source: "police-nationale-8mars-2026",
    period: { from: "2026-03-08" },
    population: {
      en: "The whole police nationale, all ranks and all branches — the denominator the CRS figure has to be read against.",
      fr: "L'ensemble de la police nationale, tous grades et toutes directions — le dénominateur auquel rapporter le chiffre des CRS.",
    },
    shares: [
      {
        dim: "sex",
        bucket: "femmes",
        value: 31.2,
        n: [47441, 152197],
        base: "all",
        derived: true,
        note: {
          en: "47,441/152,197 = 31.17 %. The gap with the CRS (~3–5 %) is the finding, not the two numbers separately.",
          fr: "47 441/152 197 = 31,17 %. L'écart avec les CRS (~3-5 %) est le résultat, pas les deux chiffres séparément.",
        },
      },
    ],
    basis: "reported",
  },
  {
    id: "gendarmerie-2025-recruitment-sex",
    side: "forces",
    source: "gendarmerie-recrutement-2025",
    period: { from: "2025-05-19" },
    population: {
      en: "Successful sous-officier candidates in one recruitment round — an INTAKE, not the corps, and not the gendarmes mobiles.",
      fr: "Candidats admis au concours de sous-officier, une session — un FLUX D'ENTRÉE, non le corps, et non les gendarmes mobiles.",
    },
    shares: [
      { dim: "sex", bucket: "femmes (admises)", value: 24, base: "subset" },
    ],
    basis: "reported",
  },
  {
    id: "police-gendarmerie-2019-age",
    side: "forces",
    source: "insee-securite-societe-2019",
    period: { from: "2019-01-01", to: "2019-12-31" },
    population: {
      en: "All police nationale and gendarmerie personnel, civilians included — the widest possible frame, and the only published mean age.",
      fr: "L'ensemble des personnels de la police nationale et de la gendarmerie, civils compris — le cadre le plus large, et la seule moyenne d'âge publiée.",
    },
    shares: [],
    centre: {
      stat: "mean",
      value: 38.5,
      unit: "years",
      caveat: {
        en: "Covers both forces together. It is NOT the age of a CRS company or a gendarmerie-mobile squadron sent to a demonstration.",
        fr: "Couvre les deux forces ensemble. Ce n'est PAS l'âge d'une compagnie de CRS ou d'un escadron de gendarmerie mobile envoyé en manifestation.",
      },
    },
    basis: "reported",
  },
];
