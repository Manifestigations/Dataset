import type { Source } from "./types.ts";

/* ── Comparative movements ───────────────────────────────────────────────────
   Candidate sources for the comparative layer. Labels are publisher + headline,
   verbatim, as required — check each headline against the live page before the
   charts ship, and add the date the page was published (not the event date).
   Standing pages (Wikipedia, Britannica overviews) omit `date`. */

export const COMPARATIVE_SOURCES: readonly Source[] = [
  {
    id: "cmp-wiki-eu-unrest",
    group: "comparative",
    label: "Wikipedia — 2026 European unrest",
    url: "https://en.wikipedia.org/wiki/2026_European_unrest",
    what: {
      en: "Dates, arrest and injury counts for the European movements in this layer; a compilation, so every cell taken from it needs its underlying report.",
      fr: "Dates et bilans d'interpellations et de blessés pour les mouvements européens ; une compilation, donc chaque cellule doit être rattachée à sa source d'origine.",
    },
  },
  {
    id: "cmp-wiki-es-housing",
    group: "comparative",
    label: "Wikipedia — 2026 Spanish housing protests",
    url: "https://en.wikipedia.org/wiki/2026_Spanish_housing_protests",
    what: {
      en: "The eviction ban, the fund-purchase ban, the €10bn scheme and the 2 Oct congressional rejection.",
      fr: "L'interdiction des expulsions, celle des achats par les fonds, le plan de 10 Md€ et le rejet du 2 oct.",
    },
  },
  {
    id: "cmp-guardian-es-strike",
    group: "comparative",
    label: "The Guardian — Spain's first general strike in 14 years",
    url: "https://www.theguardian.com/world/2026/nov/11/spain-general-strike-housing-costs",
    date: "2026-11-11",
    what: {
      en: "The 11 Nov general strike: union turnout claim, arrests, and the 29 Nov election date.",
      fr: "La grève générale du 11 nov. : chiffre syndical, interpellations et date du scrutin du 29 nov.",
    },
  },
  {
    id: "cmp-bbc-rs",
    group: "comparative",
    label: "BBC News — Vučić concedes to student-led movement",
    url: "https://www.bbc.com/news/articles/cw5yn3xlprpmo",
    what: {
      en: "The Serbian election result: 52.7%, 140 of 250 seats, and the concession.",
      fr: "Le résultat serbe : 52,7 %, 140 sièges sur 250, et la défaite concédée.",
    },
  },
  {
    id: "cmp-britannica-in",
    group: "comparative",
    label: "Britannica — India's 2026 Gen Z protests explained",
    url: "https://www.britannica.com/topic/Indias-2026-Gen-Z-Protests-Explained",
    what: {
      en: "The NEET leak movement: the minister's resignation, the ₹10m compensation and the reform task force.",
      fr: "Le mouvement NEET : démission du ministre, indemnisation de 10 M₹ et groupe de réforme.",
    },
  },
  {
    id: "cmp-wiki-ve",
    group: "comparative",
    label: "Wikipedia — 2026 Venezuela protests",
    url: "https://en.wikipedia.org/wiki/2026_Venezuela_protests",
    what: {
      en: "The September and October actions, Machado's return and the hunger strike.",
      fr: "Les actions de septembre et d'octobre, le retour de Machado et la grève de la faim.",
    },
  },
  {
    id: "cmp-wiki-ph",
    group: "comparative",
    label: "Wikipedia — 2025–2026 Philippine anti-corruption protests",
    url: "https://en.wikipedia.org/wiki/2025%E2%80%932026_Philippine_anti-corruption_protests",
    what: {
      en: "The flood-control campaign and the institutional resignations it produced.",
      fr: "La campagne sur les ouvrages hydrauliques et les démissions qu'elle a provoquées.",
    },
  },
  {
    id: "cmp-wiki-ge",
    group: "comparative",
    label: "Wikipedia — 2024–2026 Georgian protests",
    url: "https://en.wikipedia.org/wiki/2024%E2%80%932026_Georgian_protests",
    what: {
      en: "The Georgian movement's demands, the EU suspension and the political prisoners.",
      fr: "Les revendications géorgiennes, la suspension de l'adhésion à l'UE et les prisonniers politiques.",
    },
  },
  {
    id: "cmp-guardian-genz",
    group: "comparative",
    label: "The Guardian — Gen Z protests sweeping the world",
    url: "https://www.theguardian.com/world/2026/nov/06/gen-z-protests-sweeping-the-world",
    date: "2026-11-06",
    what: {
      en: "The cross-country framing, and the Italian movement's stated debt to France.",
      fr: "Le cadrage international, et la référence explicite du mouvement italien à la France.",
    },
  },
];
