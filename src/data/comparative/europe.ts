import type { Movement } from "./types.ts";

/* ── Europe ──────────────────────────────────────────────────────────────────
   Figures are the bands the sources support: [authority, organiser] where both
   counted, a single figure where only one side published. Flags carry the rest:
   p = one side only, f = floor ("50+"), e = derived, x = wider than the metric,
   c = stock/actions-total.

   PROVENANCE CAVEAT — read before publishing. These cells come from press and
   encyclopaedic compilations, not from the verbatim source records the repo
   requires. Each `src` below is a pointer to a candidate source; promote it to a
   real Source entry in sources/comparative.ts before the charts ship. */

export const MOVEMENTS_EUROPE: readonly Movement[] = [
  {
    id: "es-housing",
    name: {
      en: "Spanish housing protests",
      fr: "Manifestations pour le logement en Espagne",
    },
    short: { en: "Spain · housing", fr: "Espagne · logement" },
    geo: {
      country: "ES",
      countryName: { en: "Spain", fr: "Espagne" },
      city: { en: "Madrid", fr: "Madrid" },
      lat: 40.4168,
      lon: -3.7038,
    },
    region: "europe",
    start: "2026-09-23",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Eviction ban to 2030, a ban on fund purchases and a €10bn scheme; decrees struck down on 2 Oct, snapping an election to 29 Nov.",
      fr: "Interdiction des expulsions jusqu'en 2030, interdiction des achats par les fonds et plan de 10 Md€ ; décrets rejetés le 2 oct., élection anticipée le 29 nov.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "es-evictions",
        text: {
          en: "Stop evictions of vulnerable tenants",
          fr: "Arrêter les expulsions de locataires vulnérables",
        },
        state: "met",
        granted: {
          en: "Ban extended to 2030",
          fr: "Interdiction prolongée jusqu'en 2030",
        },
        src: "cmp-wiki-es-housing",
      },
      {
        id: "es-funds",
        text: {
          en: 'Ban property purchases by "vulture funds"',
          fr: "Interdire les achats immobiliers des fonds vautours",
        },
        state: "met",
        src: "cmp-wiki-es-housing",
      },
      {
        id: "es-tucasa",
        text: {
          en: "A public housing programme",
          fr: "Un programme de logement public",
        },
        cost: {
          low: 10_000_000_000,
          high: 10_000_000_000,
          currency: "EUR",
          basis: {
            en: 'one-off scheme, "Tu Casa"',
            fr: "plan unique, « Tu Casa »",
          },
        },
        state: "unmet",
        granted: {
          en: "Announced, then struck down by Congress on 2 Oct",
          fr: "Annoncé, puis rejeté par le Congrès le 2 oct.",
        },
        src: "cmp-wiki-es-housing",
      },
    ],
    actions: [
      {
        date: "2026-09-23",
        src: "cmp-wiki-es-housing",
        note: {
          en: "Movement opens on an eviction",
          fr: "Le mouvement naît d'une expulsion",
        },
      },
      {
        date: "2026-11-11",
        p: 3_000_000,
        a: [50, 50],
        flag: { p: "p", a: "f" },
        note: {
          en: "First general strike in 14 years; union claim, no ministry count",
          fr: "Première grève générale en 14 ans ; chiffre syndical, pas de comptage ministériel",
        },
        src: "cmp-guardian-es-strike",
      },
    ],
    published: { a: [50, 50], flag: { a: "f" }, src: "cmp-guardian-es-strike" },
    src: ["cmp-wiki-es-housing", "cmp-guardian-es-strike"],
  },

  {
    id: "al-flamingo",
    name: {
      en: 'Albanian "Flamingo Revolution"',
      fr: "« Révolution Flamant rose » albanaise",
    },
    short: { en: "Albania · Flamingo", fr: "Albanie · Flamingo" },
    geo: {
      country: "AL",
      countryName: { en: "Albania", fr: "Albanie" },
      city: { en: "Tirana", fr: "Tirana" },
      lat: 41.3275,
      lon: 19.8187,
    },
    region: "europe",
    start: "2026-05-25",
    end: null,
    startApprox: true,
    verdict: "ongoing",
    outcome: {
      en: "No resignation. Student phase joined the movement on 13 Oct; 167 arrests that day.",
      fr: "Aucune démission. La phase étudiante rejoint le mouvement le 13 oct. ; 167 interpellations ce jour-là.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "al-rama",
        text: {
          en: "Resignation of PM Edi Rama",
          fr: "Démission du Premier ministre Edi Rama",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
      {
        id: "al-sazan",
        text: {
          en: "Halt the Sazan Island resort project",
          fr: "Arrêter le projet de resort de l'île de Sazan",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-13",
        a: [167, 167],
        f: [132, 132],
        flag: { a: "n" },
        src: "cmp-wiki-eu-unrest",
      },
      {
        date: "2026-10-24",
        i: [300, 300],
        flag: { i: "x", a: "f" },
        note: {
          en: "300+ injured, both sides, not split",
          fr: "300+ blessés, les deux camps, non ventilés",
        },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "pt-housing",
    name: {
      en: "Portuguese housing protests",
      fr: "Manifestations pour le logement au Portugal",
    },
    short: { en: "Portugal · housing", fr: "Portugal · logement" },
    geo: {
      country: "PT",
      countryName: { en: "Portugal", fr: "Portugal" },
      city: { en: "Lisbon", fr: "Lisbonne" },
      lat: 38.7223,
      lon: -9.1393,
    },
    region: "europe",
    start: "2026-09-20",
    end: null,
    startApprox: true,
    verdict: "ongoing",
    outcome: {
      en: "Tent camps cleared; 55 arrested in Lisbon on 20 Oct; no concession.",
      fr: "Campements évacués ; 55 interpellations à Lisbonne le 20 oct. ; aucune concession.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "pt-rents",
        text: {
          en: "Cap rents and curb tourist lets",
          fr: "Encadrer les loyers et freiner les locations touristiques",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-15",
        i: [37, 37],
        note: { en: "Porto", fr: "Porto" },
        src: "cmp-wiki-eu-unrest",
      },
      { date: "2026-10-20", a: [55, 55], src: "cmp-wiki-eu-unrest" },
    ],
    published: { a: [55, 55], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "nl-farmers",
    name: {
      en: "Dutch farmers' blockade",
      fr: "Blocus des agriculteurs néerlandais",
    },
    short: { en: "Netherlands · farmers", fr: "Pays-Bas · agriculteurs" },
    geo: {
      country: "NL",
      countryName: { en: "Netherlands", fr: "Pays-Bas" },
      city: { en: "The Hague", fr: "La Haye" },
      lat: 52.0705,
      lon: 4.3007,
    },
    region: "europe",
    start: "2026-09-15",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Highways and about 20 rail lines blocked; suspected sabotage; no concession.",
      fr: "Autoroutes et une vingtaine de lignes ferroviaires bloquées ; sabotage suspecté ; aucune concession.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "nl-rules",
        text: {
          en: "Reverse the new nitrogen and fertiliser rules",
          fr: "Revenir sur les nouvelles règles azote et engrais",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-09-15", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "nl-genz",
    name: {
      en: "Dutch Gen Z cost-of-living rally",
      fr: "Rassemblement Génération Z néerlandais",
    },
    short: { en: "Netherlands · Gen Z", fr: "Pays-Bas · Gén. Z" },
    geo: {
      country: "NL",
      countryName: { en: "Netherlands", fr: "Pays-Bas" },
      city: { en: "The Hague", fr: "La Haye" },
      lat: 52.0705,
      lon: 4.3007,
    },
    region: "europe",
    start: "2026-09-19",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "24 detained at the Hague rally; shops boarded up on 31 Oct ahead of further action.",
      fr: "24 personnes détenues au rassemblement de La Haye ; commerces barricadés le 31 oct.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "nl-col",
        text: {
          en: "Cost-of-living measures for under-25s",
          fr: "Mesures contre la vie chère pour les moins de 25 ans",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-09-19", a: [24, 24], src: "cmp-wiki-eu-unrest" }],
    published: { a: [24, 24], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "be-students",
    name: {
      en: "Belgian student protests",
      fr: "Manifestations étudiantes belges",
    },
    short: { en: "Belgium · students", fr: "Belgique · étudiants" },
    geo: {
      country: "BE",
      countryName: { en: "Belgium", fr: "Belgique" },
      city: { en: "Brussels", fr: "Bruxelles" },
      lat: 50.8503,
      lon: 4.3517,
    },
    region: "europe",
    start: "2026-10-01",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Tear gas and water cannon; about 107 arrests; no policy change.",
      fr: "Gaz lacrymogène et canons à eau ; environ 107 interpellations ; aucun changement de politique.",
    },
    inspiredByFrance: true,
    inspiration: {
      en: "Marches on 1, 9 and 17 Oct were partly modelled on the French lycéen movement.",
      fr: "Les marches des 1er, 9 et 17 oct. s'inspiraient en partie du mouvement lycéen français.",
    },
    demands: [
      {
        id: "be-cuts",
        text: {
          en: "Reverse €500m of education cuts",
          fr: "Annuler 500 M€ de coupes dans l'enseignement",
        },
        cost: {
          low: 500_000_000,
          high: 500_000_000,
          currency: "EUR",
          basis: {
            en: "annual, education budget",
            fr: "annuel, budget de l'enseignement",
          },
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
      {
        id: "be-tuition",
        text: {
          en: "Keep tuition at €835 rather than €1,194",
          fr: "Maintenir les frais d'inscription à 835 € au lieu de 1 194 €",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-01", src: "cmp-wiki-eu-unrest" },
      { date: "2026-10-09", src: "cmp-wiki-eu-unrest" },
      { date: "2026-10-17", src: "cmp-wiki-eu-unrest" },
    ],
    published: { a: [107, 107], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "gr-students",
    name: {
      en: "Greek student housing protests",
      fr: "Manifestations étudiantes grecques",
    },
    short: { en: "Greece · students", fr: "Grèce · étudiants" },
    geo: {
      country: "GR",
      countryName: { en: "Greece", fr: "Grèce" },
      city: { en: "Athens", fr: "Athènes" },
      lat: 37.9838,
      lon: 23.7275,
    },
    region: "europe",
    start: "2026-10-13",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Tents on Syntagma, a benefit concert on 20 Oct; no government response recorded.",
      fr: "Tentes à Syntagma, concert de soutien le 20 oct. ; aucune réponse gouvernementale recensée.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "gr-housing",
        text: {
          en: "Cap student housing costs",
          fr: "Plafonner le coût du logement étudiant",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
      {
        id: "gr-funding",
        text: {
          en: "Raise public education funding",
          fr: "Augmenter le financement de l'enseignement public",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-13", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "it-no-meloni",
    name: { en: 'Italian "No Meloni Day"', fr: "« No Meloni Day » italien" },
    short: { en: "Italy · No Meloni", fr: "Italie · No Meloni" },
    geo: {
      country: "IT",
      countryName: { en: "Italy", fr: "Italie" },
      city: { en: "Rome", fr: "Rome" },
      lat: 41.9028,
      lon: 12.4964,
    },
    region: "europe",
    start: "2026-10-16",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "271 arrests, mostly minors; a security decree of 2–5 years' prison for violent participation and 500 troops sent to Milan.",
      fr: "271 interpellations, surtout des mineurs ; décret sécurité de 2 à 5 ans de prison et 500 militaires envoyés à Milan.",
    },
    inspiredByFrance: true,
    inspiration: {
      en: 'The "Italia in Piazza" mobilisation was explicitly presented as inspired by the French protests.',
      fr: "La mobilisation « Italia in Piazza » a été explicitement présentée comme inspirée des manifestations françaises.",
    },
    demands: [
      {
        id: "it-decree",
        text: {
          en: "Withdraw the security decree",
          fr: "Retirer le décret sécurité",
        },
        state: "unmet",
        granted: { en: "The decree passed", fr: "Le décret a été adopté" },
        src: "cmp-wiki-eu-unrest",
      },
      {
        id: "it-precarity",
        text: {
          en: "Action on youth precarity and wages",
          fr: "Agir contre la précarité et les bas salaires des jeunes",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-17",
        a: [271, 271],
        f: [14, 14],
        note: {
          en: "Milan riots; arrests mostly minors",
          fr: "Émeutes à Milan ; interpellés surtout mineurs",
        },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    published: { a: [271, 271], f: [14, 14], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest", "cmp-guardian-genz"],
  },

  {
    id: "de-genz",
    name: {
      en: "German Gen Z protests",
      fr: "Manifestations Génération Z allemandes",
    },
    short: { en: "Germany · Gen Z", fr: "Allemagne · Gén. Z" },
    geo: {
      country: "DE",
      countryName: { en: "Germany", fr: "Allemagne" },
      city: { en: "Berlin", fr: "Berlin" },
      lat: 52.52,
      lon: 13.405,
      sites: 30,
    },
    region: "europe",
    start: "2026-10-30",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "30+ cities, 200+ arrests after clashes; no policy change, next rally called for 20 Nov.",
      fr: "Plus de 30 villes, 200+ interpellations après des heurts ; aucun changement, prochain rassemblement le 20 nov.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "de-conscription",
        text: {
          en: "No return to conscription",
          fr: "Pas de retour à la conscription",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
      {
        id: "de-col",
        text: {
          en: "Cost-of-living relief for students",
          fr: "Aide au coût de la vie pour les étudiants",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-31",
        a: [200, 200],
        flag: { a: "f" },
        note: {
          en: '"200+"; turnout reported as tens of thousands, no national count',
          fr: "« 200+ » ; participation en dizaines de milliers, sans comptage national",
        },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    published: { a: [200, 200], flag: { a: "f" }, src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "cz-media",
    name: {
      en: "Czech public-media protests",
      fr: "Manifestations tchèques pour l'audiovisuel public",
    },
    short: { en: "Czechia · media", fr: "Tchéquie · médias" },
    geo: {
      country: "CZ",
      countryName: { en: "Czechia", fr: "Tchéquie" },
      city: { en: "Prague", fr: "Prague" },
      lat: 50.0755,
      lon: 14.4378,
    },
    region: "europe",
    start: "2026-10-23",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "About 400,000 on Letná on 15 Nov, the largest protest since 1993; the PM says the coalition plan will not change.",
      fr: "Environ 400 000 personnes à Letná le 15 nov., la plus grande manifestation depuis 1993 ; le Premier ministre ne changera pas le plan.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "cz-funding",
        text: {
          en: "Drop the change to public-broadcaster funding",
          fr: "Renoncer à la réforme du financement de l'audiovisuel public",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-25", src: "cmp-wiki-eu-unrest" },
      { date: "2026-11-15", p: [400_000, 400_000], src: "cmp-wiki-eu-unrest" },
    ],
    published: { p: [400_000, 400_000], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ie-public",
    name: {
      en: "Irish public-sector pay dispute",
      fr: "Conflit salarial irlandais dans le public",
    },
    short: { en: "Ireland · public pay", fr: "Irlande · salaires public" },
    geo: {
      country: "IE",
      countryName: { en: "Ireland", fr: "Irlande" },
      city: { en: "Dublin", fr: "Dublin" },
      lat: 53.3498,
      lon: -6.2603,
    },
    region: "europe",
    start: "2026-10-01",
    end: "2026-11-12",
    verdict: "succeeded",
    outcome: {
      en: "The 12 Nov strike was called off after a last-minute pay deal — the clearest single win of the European wave.",
      fr: "La grève du 12 nov. a été annulée après un accord salarial de dernière minute — la victoire la plus nette de la vague européenne.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ie-pay",
        text: {
          en: "A pay increase for public-sector workers",
          fr: "Une augmentation salariale dans le public",
        },
        state: "met",
        granted: {
          en: "Pay deal reached 11 Nov; strike cancelled",
          fr: "Accord salarial le 11 nov. ; grève annulée",
        },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-01", src: "cmp-wiki-eu-unrest" },
      { date: "2026-10-14", s: [300_000, 300_000], src: "cmp-wiki-eu-unrest" },
    ],
    published: { s: [300_000, 300_000], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "pl-abortion",
    name: {
      en: "Polish abortion-rights protests",
      fr: "Manifestations polonaises pour le droit à l'avortement",
    },
    short: { en: "Poland · abortion", fr: "Pologne · IVG" },
    geo: {
      country: "PL",
      countryName: { en: "Poland", fr: "Pologne" },
      city: { en: "Warsaw", fr: "Varsovie" },
      lat: 52.2297,
      lon: 21.0122,
      sites: 28,
    },
    region: "europe",
    start: "2026-10-22",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Riot police deployed around the Constitutional Tribunal; no outcome reported.",
      fr: "CRS déployés autour du Tribunal constitutionnel ; aucun résultat rapporté.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "pl-abortion",
        text: {
          en: "Restore abortion rights",
          fr: "Rétablir le droit à l'avortement",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-22", src: "cmp-wiki-eu-unrest" },
      { date: "2026-10-30", src: "cmp-wiki-eu-unrest" },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "at-universities",
    name: {
      en: "Austrian university-funding protests",
      fr: "Manifestations autrichiennes sur le financement des universités",
    },
    short: { en: "Austria · universities", fr: "Autriche · universités" },
    geo: {
      country: "AT",
      countryName: { en: "Austria", fr: "Autriche" },
      city: { en: "Vienna", fr: "Vienne" },
      lat: 48.2082,
      lon: 16.3738,
    },
    region: "europe",
    start: "2026-10-22",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "20,000–30,000 in Vienna; no result reported.",
      fr: "20 000 à 30 000 à Vienne ; aucun résultat rapporté.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "at-cuts",
        text: {
          en: "Reverse higher-education cuts",
          fr: "Annuler les coupes dans l'enseignement supérieur",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-22", p: [20_000, 30_000], src: "cmp-wiki-eu-unrest" },
    ],
    published: { p: [20_000, 30_000], src: "cmp-wiki-eu-unrest" },
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ch-zurich",
    name: { en: "Zurich/Basel unrest", fr: "Troubles à Zurich et Bâle" },
    short: { en: "Switzerland · unrest", fr: "Suisse · troubles" },
    geo: {
      country: "CH",
      countryName: { en: "Switzerland", fr: "Suisse" },
      city: { en: "Zurich", fr: "Zurich" },
      lat: 47.3769,
      lon: 8.5417,
    },
    region: "europe",
    start: "2026-10-31",
    end: "2026-11-01",
    verdict: "failed",
    outcome: {
      en: "Riot dispersed by police and firefighters the same night; no demand published.",
      fr: "Émeute dispersée par la police et les pompiers la même nuit ; aucune revendication publiée.",
    },
    inspiredByFrance: false,
    demands: [],
    actions: [{ date: "2026-10-31", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "rs-students",
    name: { en: "Serbian student movement", fr: "Mouvement étudiant serbe" },
    short: { en: "Serbia · students", fr: "Serbie · étudiants" },
    geo: {
      country: "RS",
      countryName: { en: "Serbia", fr: "Serbie" },
      city: { en: "Belgrade", fr: "Belgrade" },
      lat: 44.7866,
      lon: 20.4489,
    },
    region: "europe",
    start: "2024-11-01",
    end: "2026-11-05",
    startApprox: true,
    verdict: "succeeded",
    outcome: {
      en: "The Student List won 52.7% and 140 of 250 seats; Vučić conceded, ending 14 years of his party's rule.",
      fr: "La Liste étudiante obtient 52,7 % et 140 sièges sur 250 ; Vučić concède sa défaite, mettant fin à 14 ans de pouvoir.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "rs-accountability",
        text: {
          en: "Accountability for the Novi Sad canopy collapse",
          fr: "Responsabilité dans l'effondrement de l'auvent de Novi Sad",
        },
        state: "partial",
        src: "cmp-bbc-rs",
      },
      {
        id: "rs-elections",
        text: { en: "Early elections", fr: "Élections anticipées" },
        state: "met",
        granted: {
          en: "Held 25 Oct; results certified 5 Nov",
          fr: "Tenues le 25 oct. ; résultats certifiés le 5 nov.",
        },
        src: "cmp-bbc-rs",
      },
    ],
    actions: [
      {
        date: "2026-10-25",
        src: "cmp-bbc-rs",
        note: { en: "Election day", fr: "Jour du scrutin" },
      },
    ],
    src: ["cmp-bbc-rs", "cmp-wiki-eu-unrest"],
  },
];
