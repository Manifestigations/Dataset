/* ── src/data/demographics/protesters.ts ───────────────────────────────────
   Who is on the protest side. Read the `population` on every row before
   reading a single percentage:

     · DPJJ 2026        — minors REFERRED TO PROSECUTORS. Exhaustive for that
                          population, and three penal filters deep (arrest →
                          garde à vue → défèrement). The study says so itself,
                          and names the filter that matters most for gender:
                          "les filles … ont davantage de chance de sortir du
                          circuit pénal".
     · Ifop / Ipsos     — SUPPORT for the movement, sampled from all adults.
                          Not participation. A 74 % among 18–24s is a poll,
                          not a crowd.

   No row here measures a demonstration crowd, because no one publishes the
   composition of one. That gap is `DEMOGRAPHIC_GAPS` in ./ethnicity.ts. */

import type { DemoRow } from "./types.ts";

export const PROTESTER_ROWS: readonly DemoRow[] = [
  /* ── 1. The one exhaustive source: 1,504 minors déférés, to 9 Oct 2026 ── */
  {
    id: "dpjj-lycee-2026-sex",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "Minors referred to a prosecutor (déférés) in the lycée movement, all of France, with a socio-educational report (RRSE). 1,504 minors.",
      fr: "Mineurs déférés dans le cadre du mouvement lycéen, France entière, avec recueil de renseignements socio-éducatifs (RRSE). 1 504 mineurs.",
    },
    shares: [
      {
        dim: "sex",
        bucket: "filles",
        value: 7,
        n: [101, 1504],
        base: "all",
        quote: "Seuls 101 RRSE concernent des filles, soit 7 %.",
        note: {
          en: "The study compares this with 9 % of all RRSE in the first half of 2026 and 2 % of minors referred after the July 2023 riots — but also warns that girls are more likely to leave the penal circuit before referral, so 7 % is a floor on participation among arrested minors, not a share of the movement.",
          fr: "L'étude compare ce chiffre aux 9 % de l'ensemble des RRSE du premier semestre 2026 et aux 2 % de mineurs déférés après les émeutes de juillet 2023 — mais avertit aussi que les filles ont davantage de chances de sortir du circuit pénal avant le défèrement : 7 % est donc un plancher parmi les mineurs arrêtés, pas une part du mouvement.",
        },
      },
    ],
    basis: "document",
  },
  {
    id: "dpjj-lycee-2026-age",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "The same 1,504 minors referred to a prosecutor. Ages are whole years at the date of referral, not dates of birth.",
      fr: "Les mêmes 1 504 mineurs déférés. L'âge est l'âge entier au moment du défèrement, non la date de naissance.",
    },
    shares: [
      {
        dim: "age",
        bucket: "14 ans (garçons)",
        value: 10,
        base: "all",
        quote: "10 % des mineurs déférés sont des garçons de 14 ans.",
      },
      {
        dim: "age",
        bucket: "15 ans",
        value: 27,
        base: "all",
        quote:
          "Les jeunes sont majoritairement âgés de 15 (27 %) ou 16 ans (35 %)",
      },
      {
        dim: "age",
        bucket: "16 ans",
        value: 35,
        base: "all",
        quote:
          "Les jeunes sont majoritairement âgés de 15 (27 %) ou 16 ans (35 %)",
      },
      {
        dim: "age",
        bucket: "17 ans",
        value: 25,
        base: "all",
        quote:
          "Les adolescents âgés de 17 ans ne représentent que 25 % des mineurs déférés.",
      },
    ],
    centre: {
      stat: "mean",
      value: 16.1,
      unit: "years",
      caveat: {
        en: "The study's own estimate. It records a mean of 15.6 from whole-year ages, then corrects it: a minor filed as \"16\" is on average about 16.5. Both figures are the author's; neither is ours.",
        fr: "Estimation de l'étude elle-même. Elle calcule une moyenne de 15,6 sur des âges entiers, puis la corrige : un mineur classé « 16 ans » a en réalité environ 16,5 ans. Les deux chiffres sont ceux des auteurs.",
      },
    },
    basis: "document",
  },
  {
    id: "dpjj-lycee-2026-nationality",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "The same 1,504 minors. Nationality and birthplace are the two variables closest to an ethnic origin — and neither is one.",
      fr: "Les mêmes 1 504 mineurs. Nationalité et lieu de naissance sont les deux variables les plus proches d'une origine ethnique — aucune des deux n'en est une.",
    },
    shares: [
      {
        dim: "nationality",
        bucket: "française",
        value: 88,
        base: "all",
        quote:
          "88 % des jeunes ont la nationalité française, 85 % sont nés en France.",
        note: {
          en: "Compared by the study with 93.1 % of residents aged 15–24 who are French (2023 census). A French-national minor may have two foreign-born parents; the variable does not see them.",
          fr: "À comparer aux 93,1 % de Français parmi les 15-24 ans résidant en France (recensement 2023). Un mineur de nationalité française peut avoir deux parents nés à l'étranger : la variable ne les voit pas.",
        },
      },
      {
        dim: "birthplace",
        bucket: "né(e) en France",
        value: 85,
        base: "all",
        quote:
          "88 % des jeunes ont la nationalité française, 85 % sont nés en France.",
        note: {
          en: "Compared with 91.4 % of 15–24s born in France. Birthplace of the individual only — not of the parents, which is the variable that would stand in for origin.",
          fr: "À comparer aux 91,4 % de 15-24 ans nés en France. Lieu de naissance de l'individu seulement — pas celui des parents, qui est la variable qui tiendrait lieu d'origine.",
        },
      },
      {
        dim: "nationality",
        bucket: "mineurs non-accompagnés",
        value: 1.2,
        n: [19, 1504],
        base: "all",
        quote:
          "Seuls 19 jeunes (1,2 %) sont considérés comme des mineurs non-accompagnés.",
      },
    ],
    basis: "document",
  },
  {
    id: "dpjj-lycee-2026-social-class",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "Social class of the reference parent of the minors referred, where the report states it. Reports with no usable occupation are excluded (N=899 fathers, N=830 mothers), so the base is not stated as a count and is NOT 1,504.",
      fr: "CSP du parent de référence des mineurs déférés, lorsque le RRSE la renseigne. Les RRSE sans profession exploitable sont exclus (N=899 pères, N=830 mères) : la base n'est pas donnée en effectif et n'est PAS 1 504.",
    },
    shares: [
      {
        dim: "socialClass",
        bucket: "Ouvriers",
        value: 30,
        base: "subset",
        quote: "Ouvriers 30 %",
      },
      {
        dim: "socialClass",
        bucket: "Professions intermédiaires",
        value: 18,
        base: "subset",
      },
      { dim: "socialClass", bucket: "Inactifs", value: 17, base: "subset" },
      {
        dim: "socialClass",
        bucket: "Artisans, commerçants, chefs d'entreprise",
        value: 13,
        base: "subset",
      },
      { dim: "socialClass", bucket: "Employés", value: 11, base: "subset" },
      {
        dim: "socialClass",
        bucket: "Cadres et professions intellectuelles supérieures",
        value: 8,
        base: "subset",
      },
      { dim: "socialClass", bucket: "Retraités", value: 3, base: "subset" },
      {
        dim: "socialClass",
        bucket: "Agriculteurs",
        value: [0, 1],
        base: "subset",
        quote: "Agriculteurs < 1 %",
        note: {
          en: 'Published as a ceiling ("< 1 %"), so stored as the interval it is — not as 0, not as 0.5.',
          fr: "Publié comme un plafond (« < 1 % »), donc stocké comme l'intervalle qu'il est — ni 0, ni 0,5.",
        },
      },
    ],
    basis: "document",
  },
  {
    id: "dpjj-lycee-2026-schooling",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "The same 1,504 minors. In school: 89 % of them; the track shares are of the 999 in a lycée.",
      fr: "Les mêmes 1 504 mineurs. Scolarisés : 89 % d'entre eux ; les parts par filière portent sur les 999 lycéens.",
    },
    shares: [
      {
        dim: "schooling",
        bucket: "scolarisé",
        value: 89,
        base: "all",
        quote:
          "89 % des jeunes sont inscrits dans un établissement scolaire ou de formation.",
      },
      {
        dim: "schooling",
        bucket: "baccalauréat professionnel",
        value: 46,
        base: "subset",
        n: [459, 999],
        derived: true,
      },
      {
        dim: "schooling",
        bucket: "général et technologique",
        value: 38,
        base: "subset",
        n: [380, 999],
        derived: true,
      },
      {
        dim: "schooling",
        bucket: "CAP",
        value: 16,
        base: "subset",
        n: [160, 999],
        derived: true,
      },
      {
        dim: "schooling",
        bucket: "collège",
        value: 11,
        base: "subset",
        n: [129, 1169],
        derived: true,
        quote:
          "129 collégiens ont été déférés, soit 11 % des mineurs scolarisés (8 % de l'ensemble).",
      },
    ],
    basis: "document",
  },
  {
    id: "dpjj-lycee-2026-prior-record",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    population: {
      en: "The same 1,504 minors.",
      fr: "Les mêmes 1 504 mineurs.",
    },
    shares: [
      {
        dim: "priorRecord",
        bucket: "déjà mis en cause",
        value: 17,
        base: "all",
        quote:
          "seuls 17 % ont déjà été mis en cause dans le cadre d'une procédure judiciaire",
        note: {
          en: "Against 32 % among minors referred after the July 2023 riots. Of those 17 %, almost all had the least restrictive measures (educational, reparation, caution) — 2 had ever been detained.",
          fr: "Contre 32 % parmi les mineurs déférés après les émeutes de juillet 2023. Parmi ces 17 %, presque tous avaient connu les mesures les moins contraignantes (éducatives, réparation, admonestation) — 2 avaient déjà été détenus.",
        },
      },
    ],
    basis: "document",
  },

  /* ── 2. The 5 October judicial stock, quoted inside the study itself ──── */
  {
    id: "justice-2026-10-05-custody",
    side: "protesters",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-05" },
    population: {
      en: "Everyone placed in garde à vue since the start of the movement, as announced by the Justice Ministry on 5 October 2026 — a stock, not a flow, and one stage before the rows above.",
      fr: "Toutes les personnes placées en garde à vue depuis le début du mouvement, annoncé par le ministère de la Justice le 5 octobre 2026 — un stock, non un flux, et une étape avant les lignes ci-dessus.",
    },
    shares: [
      {
        dim: "age",
        bucket: "mineurs",
        value: 87,
        n: [4406, 5060],
        base: "all",
        derived: true,
        quote:
          "5 060 personnes ont été placées en garde à vue depuis le début du mouvement, dont 4 406 mineurs (87 %) et que des poursuites ont été engagées contre 1 802 personnes, dont 1 483 mineurs (82 %).",
        note: {
          en: "87 % is published in the sentence itself; 4,406/5,060 = 87.07 %, consistent. The prosecution subset is a separate `c` figure and must not be added to anything.",
          fr: "87 % est publié dans la phrase elle-même ; 4 406/5 060 = 87,07 %, cohérent. Le sous-ensemble des poursuites est une donnée `c` distincte, à n'ajouter à rien.",
        },
      },
    ],
    basis: "document",
  },

  /* ── 3. Support, by age and sex — polls, never participation ──────────── */
  {
    id: "ifop-lci-2026-10-07-support",
    side: "protesters",
    source: "ifop-lci-lycees-2026-10",
    period: { from: "2026-10-06", to: "2026-10-07" },
    population: {
      en: "French adults 18+, national sample (Ifop for LCI). Measures SUPPORT for the lycée movement — approval, not presence in the street.",
      fr: "Population adulte française, échantillon national (Ifop pour LCI). Mesure le SOUTIEN au mouvement lycéen — l'approbation, non la présence dans la rue.",
    },
    shares: [
      { dim: "age", bucket: "18-24", value: 74, base: "poll" },
      { dim: "age", bucket: "25-34", value: 59, base: "poll" },
      { dim: "age", bucket: "35-49", value: 46, base: "poll" },
      { dim: "age", bucket: "50-64", value: 38, base: "poll" },
      { dim: "age", bucket: "65+", value: 43, base: "poll" },
      { dim: "sex", bucket: "femmes", value: 53, base: "poll" },
      { dim: "sex", bucket: "hommes", value: 43, base: "poll" },
    ],
    basis: "reported",
  },
  {
    id: "ipsos-cesi-2026-10-08-support",
    side: "protesters",
    source: "ipsos-cesi-lycees-2026-10",
    period: { from: "2026-10-07", to: "2026-10-08" },
    population: {
      en: "French adults, national sample (Ipsos bva-CESI). Support for the movement, 54 % overall. A second pollster on the same question — kept separate, never averaged with Ifop.",
      fr: "Population adulte française, échantillon national (Ipsos bva-CESI). Soutien au mouvement, 54 % au total. Un second institut sur la même question — conservé à part, jamais moyenné avec Ifop.",
    },
    shares: [
      { dim: "age", bucket: "moins de 35 ans", value: 62, base: "poll" },
      { dim: "age", bucket: "35-59", value: 57, base: "poll" },
      { dim: "age", bucket: "60+", value: 43, base: "poll" },
    ],
    basis: "reported",
  },
];
