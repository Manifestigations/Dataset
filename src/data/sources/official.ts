import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 8 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const OFFICIAL_SOURCES: readonly Source[] = [
  /* ------------------------------------------- 2026 — ministry briefings */
  src(
    "interieur",
    "official",
    "Ministère de l’Intérieur",
    "https://www.interieur.gouv.fr/",
    both(
      "origin of every arrest, custody and officer-injury count and of the ministry turnout figure. Published as press briefings and evening situation reports, not as a downloadable series. A continuously updated portal: the span shown is the window of the situation reports cited here, from the first national turn to the 7 Nov bilan.",
      "origine de chaque décompte d’interpellations, de gardes à vue et de blessés parmi les forces, ainsi que du chiffre ministériel de foule. Publiés en points presse et points de situation du soir, non en séries téléchargeables. Portail mis à jour en continu : la période affichée est celle des points de situation cités, du premier tournant national au bilan du 7 nov.",
    ),
    "2026-09-28",
    "2026-11-07",
  ),

  src(
    "ardeche-13oct",
    "official",
    "Préfecture de l’Ardèche — « Mobilisation en Ardèche – mardi 13 octobre 2026 – point de situation à 17 h »",
    "https://www.ardeche.gouv.fr/Actualites/Actualites-2026/Mobilisation-en-Ardeche-Mardi-13-octobre-2026-Point-de-situation-a-17-h",
    both(
      "the departmental control case: peak of 130 in Privas, 120 in Annonay, 60 in Tournon-sur-Rhône and 600 in Aubenas (student counts included), no school blocked, no violence and no damage, two procedures for insults against officers, 100+ police mobilised. Read against the national aggregate as evidence that a day can be busy in one department and uneventful in the rest.",
      "le cas de contrôle départemental : pic de 130 à Privas, 120 à Annonay, 60 à Tournon-sur-Rhône et 600 à Aubenas (lycéens inclus), aucun établissement bloqué, aucune violence ni dégradation, deux procédures pour outrages, plus de cent policiers mobilisés. À lire face à l’agrégat national : une journée peut être chargée dans un département et calme ailleurs.",
    ),
    "2026-10-13",
  ),

  src(
    "insee-population-1er-janvier",
    "official",
    "INSEE — « Population au 1er janvier »",
    "https://www.insee.fr/fr/statistiques",
    both(
      "the denominators behind every per-capita figure: France entière and France métropolitaine at 1 January, 1968–2026. The 2026 figures are provisional and the series is revised annually; the release used here is January 2026. No France-entière row exists for 1968 in this release, so May 68 is read against metropolitan France alone.",
      "les dénominateurs de tous les chiffres rapportés à la population : France entière et France métropolitaine au 1er janvier, 1968-2026. Les chiffres de 2026 sont provisoires et la série est révisée chaque année ; la version utilisée ici est celle de janvier 2026. Aucune ligne « France entière » n’existe pour 1968 dans cette version : Mai 68 est donc rapporté à la seule France métropolitaine.",
    ),
    "2026-01-01",
  ),

  /* ── Outstanding-figure verification, 12 Nov 2026 ───────────────────── */
  src(
    "senat-emeutes-2023",
    "official",
    "Sénat — « Émeutes de juin 2023 : comprendre, évaluer, réagir »",
    "https://www.senat.fr/salle-de-presse/communiques-de-presse/presse/10-04-2024/emeutes-de-juin-2023-comprendre-evaluer-reagir.html",
    both(
      "the Senate mission's headline figures for the Nahel riots: 672 communes affected, 45,000 security personnel mobilised, 50,000 émeutiers estimated (Darmanin: 8,000–12,000; Brochand: 100,000–200,000), 16,400 claims filed with insurers for €793 million, 2,500 buildings burnt or degraded including 168 schools and 105 mairies. Also the authority for the episode-level rioter estimates now used in the p band.",
      "les chiffres clés de la mission du Sénat sur les émeutes de Nahel : 672 communes concernées, 45 000 personnels de sécurité mobilisés, 50 000 émeutiers estimés (Darmanin : 8 000 à 12 000 ; Brochand : 100 000 à 200 000), 16 400 sinistres pour 793 millions d’euros, 2 500 bâtiments incendiés ou dégradés dont 168 écoles et 105 mairies. También l’autorité des estimations d’émeutiers désormais portées par la bande p.",
    ),
    "2024-04-10",
  ),

  src(
    "interieur-24oct-bilan",
    "official",
    "Ministère de l’Intérieur — « Bilan de la journée de mobilisation nationale du 24 octobre 2026 »",
    "https://www.interieur.gouv.fr/actualites/communiques-de-presse/bilan-de-journee-de-mobilisation-nationale-du-24-octobre-2026",
    both(
      "the communiqué behind every 2026 core figure: 24 Oct = 289 actions, 410,000 participants (110,000 Paris), provisional 7:30 a.m. bilan of 1,314 arrests and 53 forces injured “provisoire à ce stade”, 75 fire interventions, 24 shops pillaged, against 1,522 shops hit on 17 Oct; and the cross-references to 31 Oct (227 actions, 320,000) and 5 Nov (193 actions, 575,000 incl. 65,000 Paris).",
      "le communiqué qui fonde tous les chiffres centraux de 2026 : 24 oct. = 289 actions, 410 000 participants (110 000 à Paris), bilan provisoire à 7 h 30 de 1 314 interpellations et 53 blessés des forces « provisoire à ce stade », 75 interventions incendie, 24 commerces pillés, contre 1 522 commerces touchés le 17 oct. ; renvois au 31 oct. (227 actions, 320 000) et au 5 nov. (193 actions, 575 000 dont 65 000 à Paris).",
    ),
    "2026-10-25",
  ),

  src(
    "interieur-31oct",
    "official",
    "Ministère de l’Intérieur — « Bilan de la journée de mobilisation du 31 octobre 2026 et de la soirée d’Halloween »",
    "https://www.interieur.gouv.fr/actualites/communiques-de-presse/bilan-de-journee-de-mobilisation-du-31-octobre-2026-et-de-soiree-dhalloween",
    both(
      "the week-5 national point, including the Halloween evening, when the damage count collapses.",
      "le point national de la semaine 5, soirée d’Halloween incluse, moment où le décompte des dommages s’effondre.",
    ),
    "2026-10-31",
  ),

  src(
    "interieur-05nov",
    "official",
    "Ministère de l’Intérieur — « Bilan de mobilisation lycéenne et de journée nationale d’action du 5 novembre 2026 »",
    "https://www.interieur.gouv.fr/actualites/communiques-de-presse/bilan-de-mobilisation-lyceenne-et-de-journee-nationale-daction-du-5-novembre-2026",
    both(
      "the 575,000 figure for 5 Nov, the peak of the movement, plus arrests and officer injuries.",
      "le chiffre de 575 000 pour le 5 nov., sommet du mouvement, plus interpellations et blessés parmi les forces.",
    ),
    "2026-11-05",
  ),

  src(
    "interieur-07nov",
    "official",
    "Ministère de l’Intérieur — « Bilan de mobilisation du 7 novembre 2026 : des cortèges émaillés de nombreux incidents »",
    "https://www.interieur.gouv.fr/actualites/actualites-du-ministere/bilan-de-mobilisation-du-7-novembre-2026-des-corteges-emailles-de-nombreux-incidents-dans-grandes",
    both(
      "the 146,000 figure, the arrest count and the incident list for 7 Nov, the last national day in the window.",
      "le chiffre de 146 000, le nombre d’interpellations et la liste des incidents du 7 nov., dernière journée nationale de la fenêtre.",
    ),
    "2026-11-07",
  ),

  src(
    "dpjj-etude-flash-lycee-2026",
    "official",
    "Ministère de la Justice — DPJJ/SEREV, « Etude flash sur le profil des mineurs déférés dans le cadre du mouvement lycéen », 30 octobre 2026",
    "https://www.justice.gouv.fr/sites/default/files/2026-11/etude_mouvement_lyceen_2026.pdf",
    both(
      "the composition of the 1,504 minors referred in the lycée movement to 9 October 2026: sex, age, nationality, birthplace, parental social class, schooling, prior record — and the study's own warning that this population is not the movement.",
      "la composition des 1 504 mineurs déférés dans le cadre du mouvement lycéen jusqu'au 9 octobre 2026 : sexe, âge, nationalité, lieu de naissance, CSP des parents, scolarité, antécédents — et l'avertissement de l'étude : cette population n'est pas le mouvement.",
    ),
    "2026-10-30",
  ),
  src(
    "police-nationale-8mars-2026",
    "official",
    "Police nationale, « 8 mars : l'égalité professionnelle femmes/hommes, une priorité dans la police nationale »",
    "https://www.police-nationale.interieur.gouv.fr/actualite/8-mars-legalite-professionnelle-femmeshommes-priorite-dans-police-nationale",
    both(
      "47,441 women of 152,197 police nationale staff — the denominator the CRS share is read against.",
      "47 441 femmes sur 152 197 personnels de la police nationale — le dénominateur auquel se lit la part des CRS.",
    ),
    "2026-03-08",
  ),
  src(
    "gendarmerie-recrutement-2025",
    "official",
    "Gendarmerie nationale, « Concours sous-officier de gendarmerie : attractivité confirmée, sélectivité renforcée »",
    "https://www.gendarmerie.interieur.gouv.fr/gendinfo/actualites/2025/concours-sous-officier-de-gendarmerie-attractivite-confirmee-selectivite-renforcee",
    both(
      "24 % women among the successful sous-officier candidates of one round — an intake, not a corps.",
      "24 % de femmes parmi les candidats admis au concours de sous-officier d'une session — un flux d'entrée, non un corps.",
    ),
    "2025-05-19",
  ),
  src(
    "insee-securite-societe-2019",
    "official",
    "INSEE, « Sécurité et société » — forces de sécurité, données 2019",
    "https://www.insee.fr/fr/statistiques/5763601?sommaire=5763633",
    both(
      "the mean age (38.5) and the share of women (21 %) across the police nationale and the gendarmerie together.",
      "l'âge moyen (38,5 ans) et la part de femmes (21 %) dans la police nationale et la gendarmerie réunies.",
    ),
  ),
];
