import type { Movement } from "./types.ts";

/* ── Americas · Asia-Pacific ─────────────────────────────────────────────────
   Same provenance caveat as europe.ts: these are compilation figures awaiting a
   verbatim Source record. Georgia (GE) is the country, not the US state. */

export const MOVEMENTS_WORLD: readonly Movement[] = [
  {
    id: "in-neet",
    name: {
      en: 'Indian "Cockroach" movement (NEET leak)',
      fr: "Mouvement indien « Cafard » (fuite du NEET)",
    },
    short: { en: "India · NEET", fr: "Inde · NEET" },
    geo: {
      country: "IN",
      countryName: { en: "India", fr: "Inde" },
      city: { en: "New Delhi", fr: "New Delhi" },
      lat: 28.6139,
      lon: 77.209,
    },
    region: "asia-pacific",
    start: "2026-06-01",
    end: "2026-07-25",
    startApprox: true,
    verdict: "succeeded",
    outcome: {
      en: "Education minister resigned 25 Jul; ₹10m per bereaved family; amnesty for protesters; reform task force.",
      fr: "Le ministre de l'Éducation démissionne le 25 juil. ; 10 M₹ par famille endeuillée ; amnistie ; groupe de réforme.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "in-minister",
        text: {
          en: "Resignation of the education minister",
          fr: "Démission du ministre de l'Éducation",
        },
        state: "met",
        granted: {
          en: "Dharmendra Pradhan resigned 25 Jul",
          fr: "Dharmendra Pradhan a démissionné le 25 juil.",
        },
        src: "cmp-britannica-in",
      },
      {
        id: "in-compensation",
        text: {
          en: "Compensation for families of students who died",
          fr: "Indemnisation des familles d'étudiants décédés",
        },
        cost: {
          low: 10_000_000,
          high: 10_000_000,
          currency: "INR",
          basis: { en: "per family", fr: "par famille" },
        },
        state: "met",
        src: "cmp-britannica-in",
      },
      {
        id: "in-reform",
        text: {
          en: "Independent reform of the exam system",
          fr: "Réforme indépendante du système d'examens",
        },
        state: "partial",
        granted: {
          en: "Nilekani-led task force; tougher anti-leak law",
          fr: "Groupe de travail Nilekani ; loi anti-fuite durcie",
        },
        src: "cmp-britannica-in",
      },
    ],
    actions: [
      {
        date: "2026-07-25",
        src: "cmp-britannica-in",
        note: {
          en: "CJP calls off the national protest",
          fr: "Le CJP annule la protestation nationale",
        },
      },
    ],
    src: ["cmp-britannica-in"],
  },

  {
    id: "in-rolls",
    name: {
      en: "Indian voter-roll protests",
      fr: "Manifestations indiennes sur les listes électorales",
    },
    short: { en: "India · voter rolls", fr: "Inde · listes électorales" },
    geo: {
      country: "IN",
      countryName: { en: "India", fr: "Inde" },
      city: { en: "New Delhi", fr: "New Delhi" },
      lat: 28.6139,
      lon: 77.209,
    },
    region: "asia-pacific",
    start: "2026-10-01",
    end: null,
    startApprox: true,
    verdict: "ongoing",
    outcome: {
      en: "Demands the election commissioner's resignation over voter-roll deletions; detentions in New Delhi.",
      fr: "Exige la démission du commissaire électoral après des radiations ; détentions à New Delhi.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "in-ec",
        text: {
          en: "Resignation of the election commissioner",
          fr: "Démission du commissaire électoral",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-01", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "br-democracy",
    name: {
      en: "Brazilian pro-democracy student marches",
      fr: "Marches étudiantes brésiliennes pour la démocratie",
    },
    short: { en: "Brazil · democracy", fr: "Brésil · démocratie" },
    geo: {
      country: "BR",
      countryName: { en: "Brazil", fr: "Brésil" },
      city: { en: "Rio de Janeiro", fr: "Rio de Janeiro" },
      lat: -22.9068,
      lon: -43.1729,
    },
    region: "americas",
    start: "2026-10-07",
    end: "2026-10-25",
    verdict: "succeeded",
    outcome: {
      en: "Lula re-elected for a fourth term on 25 Oct and thanked young people for defending democracy.",
      fr: "Lula réélu pour un quatrième mandat le 25 oct. et remercie les jeunes d'avoir défendu la démocratie.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "br-democracy",
        text: {
          en: "Defend the election result against a Bolsonaro challenge",
          fr: "Défendre le résultat électoral face à la contestation Bolsonaro",
        },
        state: "met",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-07", src: "cmp-wiki-eu-unrest" },
      {
        date: "2026-10-11",
        src: "cmp-wiki-eu-unrest",
        note: {
          en: '"March for Democracy"',
          fr: "« Marche pour la démocratie »",
        },
      },
      { date: "2026-10-18", src: "cmp-wiki-eu-unrest" },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ve-2026",
    name: {
      en: "Venezuelan opposition protests",
      fr: "Manifestations de l'opposition vénézuélienne",
    },
    short: { en: "Venezuela · opposition", fr: "Venezuela · opposition" },
    geo: {
      country: "VE",
      countryName: { en: "Venezuela", fr: "Venezuela" },
      city: { en: "Caracas", fr: "Caracas" },
      lat: 10.4806,
      lon: -66.9036,
    },
    region: "americas",
    start: "2026-09-01",
    end: null,
    startApprox: true,
    verdict: "ongoing",
    outcome: {
      en: "Machado returned from exile on 25 Oct; 36 political prisoners on hunger strike; elections by 2028 still unmet.",
      fr: "Machado revient d'exil le 25 oct. ; 36 prisonniers politiques en grève de la faim ; élections d'ici 2028 toujours refusées.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ve-return",
        text: {
          en: "Machado's right to return",
          fr: "Le droit de retour de Machado",
        },
        state: "met",
        granted: {
          en: "Returned 25 Oct after nine months' exile",
          fr: "Retour le 25 oct. après neuf mois d'exil",
        },
        src: "cmp-wiki-ve",
      },
      {
        id: "ve-prisoners",
        text: {
          en: "Release political prisoners",
          fr: "Libérer les prisonniers politiques",
        },
        state: "partial",
        src: "cmp-wiki-ve",
      },
      {
        id: "ve-elections",
        text: {
          en: "Free elections by 2028",
          fr: "Élections libres d'ici 2028",
        },
        state: "unmet",
        src: "cmp-wiki-ve",
      },
    ],
    actions: [
      {
        date: "2026-09-24",
        src: "cmp-wiki-ve",
        note: {
          en: "Caracas march for Machado's return",
          fr: "Marche à Caracas pour le retour de Machado",
        },
      },
      {
        date: "2026-10-22",
        src: "cmp-wiki-ve",
        note: { en: "Nationwide action", fr: "Action nationale" },
      },
    ],
    published: { p: [1_100, 1_100], flag: { p: "c" }, src: "cmp-wiki-ve" },
    src: ["cmp-wiki-ve"],
  },

  {
    id: "co-14o",
    name: {
      en: "Colombian national day of action",
      fr: "Journée nationale de mobilisation colombienne",
    },
    short: { en: "Colombia · 14 Oct", fr: "Colombie · 14 oct." },
    geo: {
      country: "CO",
      countryName: { en: "Colombia", fr: "Colombie" },
      city: { en: "Bogotá", fr: "Bogotá" },
      lat: 4.711,
      lon: -74.0721,
    },
    region: "americas",
    start: "2026-10-14",
    end: "2026-10-14",
    verdict: "failed",
    outcome: {
      en: "Tear gas, water cannon and armoured vehicles; no policy resolution.",
      fr: "Gaz lacrymogène, canons à eau et blindés ; aucune avancée.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "co-rollback",
        text: {
          en: "Reverse rollbacks in university access, minimum wage and education funding",
          fr: "Revenir sur les reculs dans l'accès à l'université, le salaire minimum et le financement de l'éducation",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-14", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ar-universities",
    name: {
      en: "Argentine university-funding march",
      fr: "Marche argentine pour le financement universitaire",
    },
    short: { en: "Argentina · universities", fr: "Argentine · universités" },
    geo: {
      country: "AR",
      countryName: { en: "Argentina", fr: "Argentine" },
      city: { en: "Buenos Aires", fr: "Buenos Aires" },
      lat: -34.6037,
      lon: -58.3816,
    },
    region: "americas",
    start: "2026-10-15",
    end: "2026-10-15",
    verdict: "failed",
    outcome: {
      en: "At least 25 arrests and 8 officers injured; funding still withheld.",
      fr: "Au moins 25 interpellations et 8 agents blessés ; financement toujours bloqué.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ar-funding",
        text: {
          en: "Release university funds withheld despite court orders",
          fr: "Débloquer les fonds universitaires retenus malgré les décisions de justice",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-15",
        a: [25, 25],
        f: [8, 8],
        flag: { a: "f" },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "cl-education",
    name: {
      en: "Chilean public-education march",
      fr: "Marche chilienne pour l'éducation publique",
    },
    short: { en: "Chile · education", fr: "Chili · éducation" },
    geo: {
      country: "CL",
      countryName: { en: "Chile", fr: "Chili" },
      city: { en: "Santiago", fr: "Santiago" },
      lat: -33.4489,
      lon: -70.6693,
    },
    region: "americas",
    start: "2026-10-01",
    end: "2026-10-01",
    verdict: "failed",
    outcome: {
      en: "Kast backed down from restricting free higher education for 600,000 students; wider funding still at risk.",
      fr: "Kast renonce à restreindre la gratuité pour 600 000 étudiants ; le financement global reste menacé.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "cl-free",
        text: {
          en: "Protect free higher education",
          fr: "Préserver la gratuité de l'enseignement supérieur",
        },
        state: "partial",
        granted: { en: "Restriction dropped", fr: "Restriction abandonnée" },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-01", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ec-8o",
    name: {
      en: "Ecuadorian rights and services protests",
      fr: "Manifestations équatoriennes sur les services publics",
    },
    short: { en: "Ecuador · services", fr: "Équateur · services" },
    geo: {
      country: "EC",
      countryName: { en: "Ecuador", fr: "Équateur" },
      city: { en: "Quito", fr: "Quito" },
      lat: -0.1807,
      lon: -78.4678,
    },
    region: "americas",
    start: "2026-10-08",
    end: "2026-10-10",
    verdict: "failed",
    outcome: {
      en: "Two-day wave over health, education, jobs and security amid drought; no response recorded.",
      fr: "Vague de deux jours sur la santé, l'éducation, l'emploi et la sécurité en pleine sécheresse ; aucune réponse recensée.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ec-services",
        text: {
          en: "Protect health and education spending",
          fr: "Protéger les dépenses de santé et d'éducation",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      { date: "2026-10-08", src: "cmp-wiki-eu-unrest" },
      { date: "2026-10-10", src: "cmp-wiki-eu-unrest" },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "mx-water",
    name: {
      en: "Guadalajara water protests",
      fr: "Manifestations de Guadalajara sur l'eau",
    },
    short: { en: "Mexico · water", fr: "Mexique · eau" },
    geo: {
      country: "MX",
      countryName: { en: "Mexico", fr: "Mexique" },
      city: { en: "Guadalajara", fr: "Guadalajara" },
      lat: 20.6597,
      lon: -103.3496,
    },
    region: "americas",
    start: "2026-10-18",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Sheinbaum rebuked the police and pledged to review two water projects; dozens hurt, about 40 detained.",
      fr: "Sheinbaum désavoue la police et promet de revoir deux projets hydrauliques ; dizaines de blessés, une quarantaine de détenus.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "mx-water",
        text: {
          en: "Halt the two water-diversion projects",
          fr: "Arrêter les deux projets de dérivation d'eau",
        },
        state: "partial",
        granted: {
          en: "Presidential review pledged",
          fr: "Réexamen promis par la présidence",
        },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [
      {
        date: "2026-10-18",
        a: [40, 40],
        flag: { a: "f" },
        src: "cmp-wiki-eu-unrest",
      },
    ],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "mx-truckers",
    name: {
      en: "Mexican truckers' strike",
      fr: "Grève des transporteurs mexicains",
    },
    short: { en: "Mexico · truckers", fr: "Mexique · routiers" },
    geo: {
      country: "MX",
      countryName: { en: "Mexico", fr: "Mexique" },
      city: { en: "Mexico City", fr: "Mexico" },
      lat: 19.4326,
      lon: -99.1332,
    },
    region: "americas",
    start: "2026-10-26",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Indefinite national strike over highway robberies and extortion.",
      fr: "Grève nationale illimitée contre les vols sur les routes et les extorsions.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "mx-security",
        text: {
          en: "Protect freight from robbery and extortion",
          fr: "Protéger le fret contre le vol et l'extorsion",
        },
        state: "unclear",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-26", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "id-oktober",
    name: {
      en: "Indonesian cost-of-living and haze protests",
      fr: "Manifestations indonésiennes sur la vie chère et les brumes",
    },
    short: { en: "Indonesia · cost of living", fr: "Indonésie · vie chère" },
    geo: {
      country: "ID",
      countryName: { en: "Indonesia", fr: "Indonésie" },
      city: { en: "Jakarta", fr: "Jakarta" },
      lat: -6.2088,
      lon: 106.8456,
    },
    region: "asia-pacific",
    start: "2026-10-20",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "9,000+ security officers deployed; journalists, students and an officer injured; no policy outcome.",
      fr: "Plus de 9 000 agents déployés ; journalistes, étudiants et un agent blessés ; aucun résultat.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "id-col",
        text: {
          en: "Cost-of-living relief and action on the haze",
          fr: "Aide contre la vie chère et action sur les brumes",
        },
        state: "unmet",
        src: "cmp-wiki-eu-unrest",
      },
    ],
    actions: [{ date: "2026-10-20", src: "cmp-wiki-eu-unrest" }],
    src: ["cmp-wiki-eu-unrest"],
  },

  {
    id: "ph-flood",
    name: {
      en: "Philippine flood-control corruption protests",
      fr: "Manifestations philippines contre la corruption des travaux hydrauliques",
    },
    short: {
      en: "Philippines · flood control",
      fr: "Philippines · ouvrages hydrauliques",
    },
    geo: {
      country: "PH",
      countryName: { en: "Philippines", fr: "Philippines" },
      city: { en: "Manila", fr: "Manille" },
      lat: 14.5995,
      lon: 120.9842,
    },
    region: "asia-pacific",
    start: "2025-09-04",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "Senate leadership changed, an Independent Commission for Infrastructure created, the House Speaker resigned and mass DPWH resignations followed.",
      fr: "Changement de direction au Sénat, création d'une commission indépendante, démission du président de la Chambre puis départs en masse au DPWH.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ph-accountability",
        text: {
          en: "Prosecute the flood-control corruption",
          fr: "Poursuivre la corruption des ouvrages hydrauliques",
        },
        state: "partial",
        granted: {
          en: "Commission created; officials resigned",
          fr: "Commission créée ; responsables démissionnaires",
        },
        src: "cmp-wiki-ph",
      },
    ],
    actions: [
      {
        date: "2025-09-21",
        src: "cmp-wiki-ph",
        note: {
          en: "Largest single march of the campaign",
          fr: "La plus grande marche de la campagne",
        },
      },
    ],
    src: ["cmp-wiki-ph"],
  },

  {
    id: "ge-2024",
    name: {
      en: "Georgian anti-government protests",
      fr: "Manifestations géorgiennes contre le gouvernement",
    },
    short: { en: "Georgia · anti-gov", fr: "Géorgie · anti-gouv." },
    geo: {
      country: "GE",
      countryName: { en: "Georgia", fr: "Géorgie" },
      city: { en: "Tbilisi", fr: "Tbilissi" },
      lat: 41.7151,
      lon: 44.8271,
    },
    region: "europe",
    start: "2024-10-28",
    end: null,
    verdict: "ongoing",
    outcome: {
      en: "No core demand met: EU accession suspended to 2028, 50+ political prisoners, sanctions on 200+ officials.",
      fr: "Aucune revendication centrale satisfaite : adhésion à l'UE suspendue jusqu'en 2028, 50+ prisonniers politiques, sanctions contre 200+ responsables.",
    },
    inspiredByFrance: false,
    demands: [
      {
        id: "ge-elections",
        text: {
          en: "New elections after the disputed 2024 vote",
          fr: "Nouvelles élections après le scrutin contesté de 2024",
        },
        state: "unmet",
        src: "cmp-wiki-ge",
      },
      {
        id: "ge-eu",
        text: { en: "Restart EU accession", fr: "Relancer l'adhésion à l'UE" },
        state: "unmet",
        src: "cmp-wiki-ge",
      },
    ],
    actions: [
      {
        date: "2024-11-28",
        src: "cmp-wiki-ge",
        note: {
          en: "Rallies after the government suspended EU talks",
          fr: "Rassemblements après la suspension des négociations UE",
        },
      },
      {
        date: "2025-10-04",
        src: "cmp-wiki-ge",
        note: {
          en: "Failed attempt to storm the presidential palace",
          fr: "Tentative manquée de prendre le palais présidentiel",
        },
      },
    ],
    src: ["cmp-wiki-ge"],
  },
];
