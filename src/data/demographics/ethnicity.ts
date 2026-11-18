/* ── src/data/demographics/ethnicity.ts ────────────────────────────────────
   The ethnicity question, answered as it exists: as an absence, a legal
   reason, and a list of proxies that are not ethnicity.

   Why this file has no numbers in its first half.

   France does not produce ethnic statistics. The Interior Ministry's own
   training school states it without hedging — see GAPS below — and the 1978
   data-protection law (loi Informatique et libertés), as interpreted by the
   CNIL and the Conseil constitutionnel, forbids processing personal data
   revealing racial or ethnic origin outside narrow research exemptions. A
   ministry may publish a variable that PROXIES origin (nationality, birthplace,
   parental birthplace, "origine sociale"); it may not publish origin itself.

   Consequences for this observatory, stated so no one has to rediscover them:

   · There is no ethnic breakdown of the 2026 protesters. There cannot be one
     from an official source, and no survey has produced one.
   · There is no ethnic breakdown of the CRS, the gendarmes mobiles or the
     police nationale. Same reason, plus the corps do not ask.
   · Any number that looks like one is a proxy. The proxies below are recorded
     WITH the caveat that breaks them, so a chart can show the proxy and say
     what it is not.
   · "No data" here is a FINDING about France. It is exported as a `DemoGap`
     with cause `not-collected`, never as a zero and never as a blank cell. */

import type { DemoGap, DemoProxy } from "./types.ts";

export const DEMOGRAPHIC_GAPS: readonly DemoGap[] = [
  /* ── protesters ──────────────────────────────────────────────────────── */
  {
    side: "protesters",
    dim: "ethnicity",
    why: {
      en: "No ethnic-origin breakdown of the 2026 protesters exists. The exhaustive Justice Ministry study of 1,504 minors refers records nationality and birthplace, and no origin variable at all; no poll asks the question.",
      fr: "Aucune répartition par origine ethnique des manifestants de 2026 n'existe. L'étude exhaustive du ministère de la Justice sur 1 504 mineurs déférés relève la nationalité et le lieu de naissance, et aucune variable d'origine ; aucun sondage ne pose la question.",
    },
    cause: "not-collected",
  },
  {
    side: "protesters",
    dim: "sex",
    scope: {
      en: "the movement itself, as opposed to those arrested",
      fr: "le mouvement lui-même, par opposition aux personnes arrêtées",
    },
    why: {
      en: "No one publishes the composition of a demonstration crowd. The only exhaustive figures describe minors who reached a prosecutor, three filters deep, and the study warns that girls are likelier to be filtered out before that point.",
      fr: "Personne ne publie la composition d'une foule manifestante. Les seuls chiffres exhaustifs décrivent des mineurs déférés, après trois filtres, et l'étude avertit que les filles sont plus souvent écartées avant ce stade.",
    },
    cause: "not-published",
  },
  {
    side: "protesters",
    dim: "age",
    scope: {
      en: "the movement itself, as opposed to those arrested",
      fr: "le mouvement lui-même, par opposition aux personnes arrêtées",
    },
    why: {
      en: "Same as above: arrest data and poll support are not a crowd. The study's own warning: these minors \"ne sont a priori pas représentatifs de l'ensemble des jeunes ayant participé au mouvement lycéen\".",
      fr: "Idem : données d'arrestation et soutien sondé ne font pas une foule. Avertissement de l'étude elle-même : ces mineurs « ne sont a priori pas représentatifs de l'ensemble des jeunes ayant participé au mouvement lycéen ».",
    },
    cause: "not-published",
  },

  /* ── forces ──────────────────────────────────────────────────────────── */
  {
    side: "forces",
    dim: "ethnicity",
    why: {
      en: "Ethnic statistics are prohibited in France and the police do not publish an origin variable for their own staff. Verbatim from the Interior Ministry's police school: \"les statistiques ethniques sont interdites, nous n'avons pas de chiffre à disposition.\"",
      fr: "Les statistiques ethniques sont interdites en France et la police ne publie aucune variable d'origine sur ses propres personnels. Mot pour mot, à l'école de police du ministère de l'Intérieur : « les statistiques ethniques sont interdites, nous n'avons pas de chiffre à disposition. »",
    },
    cause: "not-collected",
  },
  {
    side: "forces",
    dim: "age",
    scope: { en: "CRS", fr: "CRS" },
    why: {
      en: "No age distribution for the CRS is published. The only mean age covers the police nationale and the gendarmerie together (38.5 in 2019), civilians included.",
      fr: "Aucune répartition par âge des CRS n'est publiée. La seule moyenne disponible couvre ensemble la police nationale et la gendarmerie (38,5 en 2019), civils compris.",
    },
    cause: "not-split",
  },
  {
    side: "forces",
    dim: "age",
    scope: { en: "gendarmes mobiles", fr: "gendarmes mobiles" },
    why: {
      en: "No age distribution for the gendarmerie mobile. The gendarmerie as a whole is described as young — about half its personnel under 36 — but that is the corps, not the squadrons.",
      fr: "Aucune répartition par âge de la gendarmerie mobile. La gendarmerie dans son ensemble est décrite comme jeune — environ la moitié de ses personnels a moins de 36 ans — mais c'est le corps, non les escadrons.",
    },
    cause: "not-split",
  },
  {
    side: "forces",
    dim: "sex",
    scope: { en: "gendarmes mobiles", fr: "gendarmes mobiles" },
    why: {
      en: "Women are counted for the gendarmerie as a whole and for recruitment rounds, never for the mobile units separately.",
      fr: "Les femmes sont comptées pour la gendarmerie dans son ensemble et pour les sessions de recrutement, jamais pour les unités mobiles séparément.",
    },
    cause: "not-split",
  },
];

/* ── Proxies: published variables, each with the caveat that breaks it ──── */

export const ETHNICITY_PROXIES: readonly DemoProxy[] = [
  {
    id: "proxy-nationality-protesters",
    side: "protesters",
    measures: "nationality",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    value: "88 % des jeunes ont la nationalité française",
    caveat: {
      en: 'Nationality is a legal status, not an origin. A French minor born in France to two foreign-born parents is "French" here and would be of immigrant origin in any origin-based breakdown. The 88 % says the penal population is close to the general young population on this variable (93.1 %), not that it is homogeneous.',
      fr: "La nationalité est un statut juridique, non une origine. Un mineur français né en France de deux parents nés à l'étranger est « français » ici, et serait d'origine immigrée dans toute ventilation par origine. Les 88 % disent que la population pénale est proche de la population jeune sur cette variable (93,1 %), non qu'elle est homogène.",
    },
  },
  {
    id: "proxy-birthplace-protesters",
    side: "protesters",
    measures: "birthplace",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    value: "85 % sont nés en France",
    caveat: {
      en: "The individual's birthplace, which is the weakest possible origin proxy: the children of immigrants are overwhelmingly born in France. Only PARENTAL birthplace would separate them, and the study has no such variable.",
      fr: "Le lieu de naissance de l'individu, le plus faible des proxys d'origine : les enfants d'immigrés naissent très majoritairement en France. Seul le lieu de naissance des PARENTS les distinguerait, et l'étude n'a pas cette variable.",
    },
  },
  {
    id: "proxy-social-class-protesters",
    side: "protesters",
    measures: "socialClass",
    source: "dpjj-etude-flash-lycee-2026",
    period: { from: "2026-09-18", to: "2026-10-09" },
    value: "Ouvriers 30 % (contre 22 % pour les élèves du second degré)",
    caveat: {
      en: "The study's own conclusion, and the closest thing to an origin finding: the social profile is closer to the general population than to the usual PJJ population, with working-class and inactive parents over-represented (ouvriers +8 points, cadres −13 points). Social class is not ethnicity; it correlates with it and the study does not say how.",
      fr: "La conclusion de l'étude elle-même, et ce qui ressemble le plus à un résultat sur l'origine : le profil social est plus proche de la population générale que de la population habituelle de la PJJ, avec une surreprésentation des ouvriers (+8 points) et une sous-représentation des cadres (−13 points). La classe sociale n'est pas l'origine ; elle y corrèle et l'étude ne dit pas comment.",
    },
  },
];

/* ── Rejected: figures that exist in the wild and must not enter as data ──
   1. "Plus d'un policier sur dix est d'origine étrangère" (Le Figaro,
      10 Feb 2010, on a ministry survey). A single press rendering of a 2010
      survey whose questionnaire we have not seen; 16 years old; covers the
      police nationale, never the CRS. Rejected: unverifiable table, wrong
      population, wrong decade.
   2. "5–15 % of adjoints de sécurité of Maghrebi or African origin"
      (Nouvel Obs, 2004, on a report). A range quoted second-hand inside a
      press article about a report we have not read. Rejected: two levels of
      second-hand, and it describes a contract category abolished since.
   3. INSEE "Trajectoires et Origines" engagement rates by parents' origin
      (28 % among descendants of sub-Saharan immigrants, 6 % among
      descendants of European immigrants). Real, high-quality, and about
      political engagement in general — NOT about the 2026 movement. Usable
      as context in prose; rejected as a cell here, because a reader would
      take it for this movement's composition.
   4. Any figure built by subtracting a published proxy from 100 to obtain
      "the rest of the population". That is arithmetic on a variable that is
      not ethnicity, producing a number nobody published.
   ─────────────────────────────────────────────────────────────────────── */
