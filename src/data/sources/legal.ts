import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

export const LEGAL_SOURCES: readonly Source[] = [
  src(
    "reuters-2026-11-14",
    "legal",
    "Reuters — Riots in France: How anti-government protests spiralled out of control",
    "https://www.reuters.com/world/europe/riots-france-how-anti-government-protests-spiralled-out-control-2026-11-14/",
    both(
      "Court reporting and Interior Ministry figures, 14 Nov 2026",
      "Chronique judiciaire et chiffres du ministère de l'Intérieur, 14 nov. 2026",
    ),
    "2026-11-14",
  ),
  src(
    "rtl-2026-10-29",
    "legal",
    "RTL — 20 enquêtes pour mutilation ouvertes par l'IGPN",
    "https://www.rtl.fr/actu/justice-faits-divers/info-rtl-mains-arrachees-eborgnements-20-enquetes-pour-mutilation-ouvertes-par-l-igpn-depuis-le-debut-du-mouvement-lyceen-7900690520",
    both(
      "IGPN enquiry count and case list",
      "Nombre d'enquêtes IGPN et liste de cas",
    ),
    "2026-10-29",
  ),
  src(
    "fr24-2026-10-10",
    "legal",
    "France 24 — Severe injuries at French student protests draw scrutiny to police tactics",
    "https://www.france24.com/en/france/20261010-injuries-french-student-protests-draw-scrutiny-to-police-tactics",
    both("24 IGPN investigations as of 10 Oct", "24 enquêtes IGPN au 10 oct."),
    "2026-10-10",
  ),
  src(
    "aljazeera-2026-10-21",
    "legal",
    "Al Jazeera — French police accused of brutalising minors",
    "https://www.aljazeera.com/news/2026/10/21/i-am-still-traumatised-french-police-accused-of-brutalising-minors",
    both("36 IGPN inquiries as of 21 Oct", "36 enquêtes IGPN au 21 oct."),
    "2026-10-21",
  ),
  src(
    "midilibre-2026-11-18",
    "legal",
    "Midi Libre — 104 blessés graves, 11 éborgnés, 7 amputés",
    "https://www.midilibre.fr/2026/11/18/104-blesses-graves-lors-des-manifestations-11-eborgnes-7-amputes-un-medecin-alerte-et-fait-etat-dune-hecatombe-le-17-octobre-13658589.php",
    both(
      "Pr. Thines' tally, via Le Quotidien du médecin",
      "Bilan du Pr Thines, via Le Quotidien du médecin",
    ),
    "2026-11-18",
  ),
  src(
    "lemonde-2026-11-05",
    "legal",
    "Le Monde — French government uses anti-terror measures to prevent activists from protesting",
    "https://www.lemonde.fr/en/france/article/2026/11/05/french-government-uses-anti-terror-measures-to-prevent-activists-from-protesting_6772574_7.html",
    both("MICAS served on protesters", "MICAS notifiées à des militants"),
    "2026-11-05",
  ),
  src(
    "fr24-2026-11-08",
    "legal",
    "France 24 — Menstrual disorders fuel calls to ban tear gas",
    "https://www.france24.com/en/france/20261108-abnormal-menstraution-periods-fuel-calls-ban-tear-gas-french-protests-police",
    both("Tear-gas use during the protests", "Usage de gaz lacrymogène"),
    "2026-11-08",
  ),
  src(
    "bernama-2026-11-17",
    "legal",
    "Bernama — France reports 7,184 police custody cases, 466 prison sentences",
    "https://www.bernama.com/en//world/news.php?id=2636395",
    both("Justice Ministry figures", "Chiffres du ministère de la Justice"),
    "2026-11-17",
  ),
  src(
    "lemonde-2026-10-26",
    "legal",
    "Le Monde — Violences de militants d'ultradroite en marge du 24 octobre : plusieurs enquêtes ouvertes",
    "https://www.lemonde.fr/societe/article/2026/10/26/violences-de-militants-d-ultradroite-en-marge-du-24-octobre-plusieurs-enquete-ouvertes-a-aucun-moment-la-police-ne-les-a-proteges-defend-laurent-nunez_6800799_3224.html",
    both(
      "Prosecutors' communiqués, Rouen, Montpellier and Nice; the ministry's account",
      "Communiqués des parquets de Rouen, Montpellier et Nice ; la version du ministère",
    ),
    "2026-10-26",
  ),
  src(
    "franceinfo-2026-10-29",
    "legal",
    "franceinfo — Rouen, Clermont-Ferrand, Nice… Des groupuscules d'extrême droite signalés en marge des manifestations",
    "https://www.franceinfo.fr/societe/manifestations/rouen-clermont-ferrand-nice-des-groupuscules-d-extreme-droite-signales-en-marge-des-manifestations_8253973.html",
    both(
      "Eyewitness and video account of 24 October",
      "Témoignages et vidéos du 24 octobre",
    ),
    "2026-10-29",
  ),
  src(
    "lemonde-2026-10-21-en",
    "legal",
    "Le Monde (English) — Excuses and hasty procedures at trials of dozens arrested during looting in France",
    "https://www.lemonde.fr/en/france/article/2026/10/21/excuses-and-hasty-procedures-at-trials-of-dozens-arrested-during-looting-in-france_6760925_7.html",
    both(
      "Courtroom capacity and dockets, 20 October",
      "Capacité et rôle des audiences du 20 octobre",
    ),
    "2026-10-21",
  ),
  src(
    "actujuridique-2026-10-20",
    "legal",
    "Actu-Juridique — À Paris, les mandats de dépôt pleuvent en comparutions immédiates",
    "https://www.actu-juridique.fr/penal/emeutes-du-17-octobre-a-paris-les-mandats-de-depots-pleuvent-en-comparutions-immediates/",
    both(
      "Hearings of 19 October, 23rd chamber",
      "Audiences du 19 octobre, 23e chambre",
    ),
    "2026-10-20",
  ),
];
