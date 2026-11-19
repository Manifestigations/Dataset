import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 41 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order.
 *
 * ── Added 19 Nov 2026: the "who pays" block ────────────────────────────────
 * Concessions, the insurance split, and the penalties protestors are exposed
 * to. Five entries carry url: "TODO" — legifrance-431-1, legifrance-431-22,
 * legifrance-r644-4, legifrance-1242, franceassureurs-2023. A Légifrance
 * article id cannot be derived from the article number, so pasting it is a
 * human step: open legifrance.gouv.fr, search the article, copy the canonical
 * /codes/article_lc/ URL. Do not invent one. grep '"TODO"' before merging. */
export const COST_SOURCES: readonly Source[] = [
  /* ----- 2026 — damage and cost */
  src(
    "ifrap-2026",
    "cost",
    "Fondation IFRAP — « Violences des 17 et 18 octobre 2026 : une facture qui approche le milliard d’euros »",
    "https://www.ifrap.org/etat-et-collectivites/violences-des-17-et-18-octobre-2026-une-facture-qui-approche-le-milliard-deuros",
    both(
      "the 17–18 Oct bill, in three scenarios rather than a range: €309M low, €613M central, €1,101M high — ~€910M of material damage and ~€190M of lost turnover at the top, €666M of the material damage in retail.",
      "la facture des 17–18 oct., en trois scénarios plutôt qu’en fourchette : 309 M€ bas, 613 M€ central, 1 101 M€ haut — ~910 M€ de dommages matériels et ~190 M€ de chiffre d’affaires perdu au plus haut, dont 666 M€ pour le commerce de détail.",
    ),
    "2026-10-21",
  ),

  src(
    "monde-cci-2026",
    "cost",
    "Le Monde — «Plus de 2 500 commerces dégradés », d’après CCI France",
    "https://www.lemonde.fr/economie/article/2026/10/27/plus-de-2-500-commerces-degrades-en-marge-des-recentes-mobilisations-selon-cci-france-qui-demande-une-interdiction-des-manifestations-jusqu-aux-fetes-de-fin-d-annee_6801314_3234.html",
    both(
      "CCI France’s shop counts: 2,488 hit on 17 Oct, of which 1,161 pillaged, sacked or burnt.",
      "les décomptes de commerces de CCI France : 2 488 touchés le 17 oct., dont 1 161 pillés, saccagés ou incendiés.",
    ),
    "2026-10-27",
  ),

  src(
    "franceinfo-cci-2026",
    "cost",
    "franceinfo — « Plus de 2 500 magasins touchés »",
    "https://www.franceinfo.fr/societe/mobilisation-du-17-octobre/plus-de-2-500-magasins-touches-par-les-violences-en-marge-des-manifestations-des-17-et-24-octobre-selon-les-chambres-de-commerce_8256049.html",
    both(
      "the 24 Oct increment (50 shops, total 2,538) and the 80% centre-town turnover drop.",
      "l’incrément du 24 oct. (50 commerces, 2 538 au total) et la chute de 80 % du chiffre d’affaires en centre-ville.",
    ),
    "2026-10-27",
  ),

  src(
    "bfmtv-cci-2026",
    "cost",
    "BFMTV — CCI France, 20 commerces vandalisés le 31 octobre",
    "https://www.bfmtv.com/economie/entreprises/20-commerces-vandalises-samedi-contre-2-488-le-17-octobre-cci-france-constate-une-nette-baisse-des-degradations-en-marge-des-manifestations-mais-s-inquiete-d-une-forte-chute-du-chiffre-d-affaires-des-magasins-pouvant-atteindre-80_AD-202611010225.html",
    both(
      "why week 6 carries no damage figure: the count collapses after 24 Oct.",
      "pourquoi la semaine 6 ne porte aucun chiffre de dommages : le décompte s’effondre après le 24 oct.",
    ),
    "2026-11-01",
  ),

  src(
    "ladepeche-cci-31oct",
    "cost",
    "La Dépêche — 20 commerces dégradés ce samedi, contre 2 488 il y a deux semaines",
    "https://www.ladepeche.fr/2026/11/01/manifestations-du-31-octobre-20-commerces-degrades-ce-samedi-selon-cci-france-il-y-en-avait-2-488-il-y-a-deux-semaines-13630867.html",
    both(
      "the 31 Oct figure set against 17 Oct, the cleanest evidence of the movement’s tapering.",
      "le chiffre du 31 oct. face au 17 oct., preuve la plus nette de l’essoufflement.",
    ),
    "2026-11-01",
  ),

  src(
    "figaro-cost-weekend",
    "cost",
    "Le Figaro — « Le coût exorbitant d’un week-end d’émeutes pour les commerces et les collectivités »",
    "https://www.lefigaro.fr/societes/violences-urbaines-le-cout-exorbitant-d-un-week-end-d-emeutes-pour-les-commerces-et-les-collectivites-20261020",
    both(
      "cross-check on the damage order of magnitude.",
      "contre-vérification de l’ordre de grandeur des dommages.",
    ),
    "2026-10-20",
  ),

  src(
    "figaro-damage-2500",
    "cost",
    "Le Figaro — plus de 2 500 commerces dégradés en France",
    "https://www.lefigaro.fr/actualite-france/violences-urbaines-plus-de-2-500-commerces-degrades-en-france-20261027",
    both(
      "second, non-CCI route to the 2,500-shop figure and the €1bn headline.",
      "seconde voie, hors CCI, vers les 2 500 commerces et le titre du milliard.",
    ),
    "2026-10-27",
  ),

  src(
    "leparisien-idf-1m",
    "cost",
    "Le Parisien — 1 million d’euros de dégâts, 200 lycées perturbés : le bilan des blocages en Île-de-France",
    "https://www.leparisien.fr/societe/1-million-deuros-de-degats-200-lycees-perturbes-le-bilan-des-blocus-de-lycees-en-ile-de-france-01-10-2026-YACA325BUBAD5K7L5B6DWBDODY.php",
    both(
      "the 1 Oct lycée-blockade baseline: €1M and 200 establishments in Île-de-France.",
      "la base du 1er oct. pour les blocages de lycées : 1 M€ et 200 établissements en Île-de-France.",
    ),
    "2026-10-01",
  ),

  src(
    "leparisien-millions",
    "cost",
    "Le Parisien — blocages des lycées : plusieurs millions d’euros de dégâts déjà estimés en France",
    "https://www.leparisien.fr/societe/blocages-des-lycees-plusieurs-millions-deuros-de-degats-materiels-deja-estimes-en-france-02-10-2026-ICDKIV5SEFEA7NXURY45JLAZRA.php",
    both(
      "the first national order of magnitude for the school movement, before 17 Oct.",
      "le premier ordre de grandeur national pour le mouvement lycéen, avant le 17 oct.",
    ),
    "2026-10-02",
  ),

  src(
    "leparisien-1500shops",
    "cost",
    "Le Parisien — violences du 17 octobre : 1 500 magasins touchés, plusieurs centaines de millions d’euros de dégâts",
    "https://www.leparisien.fr/economie/violences-du-17-octobre-1-500-magasins-touches-en-france-plusieurs-centaines-de-millions-deuros-de-degats-18-10-2026-PAAKNFW6ZVCCJMLJ7LTOAWLKOI.php",
    both(
      "the 1,500-shop figure published the day after, later revised upward to 2,488.",
      "les 1 500 commerces publiés au lendemain, révisés ensuite à 2 488.",
    ),
    "2026-10-18",
  ),

  src(
    "leparisien-looting",
    "cost",
    "Le Parisien — Paris : des heurts et des magasins pillés dans la nuit de dimanche à lundi",
    "https://www.leparisien.fr/paris-75/paris-des-heurts-et-des-magasins-pilles-encore-tard-dans-la-nuit-de-dimanche-a-lundi-19-10-2026-OUUITGPFNRD47NWIU5VVWP2IKY.php",
    both(
      "the 18–19 Oct looting, which is why the 17–18 Oct damage window closes on the Monday night.",
      "les pillages des 18–19 oct., d’où la clôture de la fenêtre de dommages le lundi soir.",
    ),
    "2026-10-19",
  ),

  src(
    "leparisien-451-shops",
    "cost",
    "Le Parisien — 451 commerces vandalisés : la carte des établissements parisiens pillés et dégradés",
    "https://www.leparisien.fr/paris-75/451-commerces-vandalises-la-carte-des-etablissements-parisiens-pilles-et-degrades-les-17-et-18-octobre-22-10-2026-SBWJHPIKZ5DMZFSEWE4IYYCAIY.php",
    both(
      "the Paris-only shop count (451), marked regional in the table.",
      "le décompte strictement parisien (451), marqué régional dans le tableau.",
    ),
    "2026-10-22",
  ),

  src(
    "mesinfos-idf",
    "cost",
    "mesinfos.fr — blocages de lycées : 8,5 millions d’euros de dégâts en Île-de-France",
    "https://mesinfos.fr/ile-de-france/blocus-lyceens-85-millions-d-euros-de-degats-en-ile-de-france-341003.html",
    both(
      "the highest Île-de-France figure for the lycée blockades — the upper bound in the table.",
      "le chiffre francilien le plus élevé pour les blocages de lycées — borne haute du tableau.",
    ),
    "2026-10-13",
  ),

  src(
    "ici-lille",
    "cost",
    "ici.fr (Nord) — mobilisation du 17 octobre : premières tensions à Lille",
    "https://www.ici.fr/hauts-de-france/nord-59/lille/mobilisation-du-17-octobre-des-premieres-tensions-a-lille-entre-forces-de-l-ordre-et-manifestants-7548967",
    both(
      "the Lille McDonald’s fire, one of the few individually costed damage items.",
      "l’incendie du McDonald’s à Lille, l’un des rares dommages chiffrés individuellement.",
    ),
    "2026-10-17",
  ),

  src(
    "cnews-14oct",
    "cost",
    "CNEWS — blocus des lycées : agence immobilière attaquée, feux de poubelle, le bilan",
    "https://www.cnews.fr/videos/france/2026-10-14/blocus-des-lycees-agence-immobiliere-attaquee-feux-de-poubelle-le-bilan",
    both(
      "the 14 Oct incidents, the first damage report of the school movement.",
      "les incidents du 14 oct., premier bilan de dommages du mouvement lycéen.",
    ),
    "2026-10-14",
  ),

  src(
    "actu-450-shops",
    "cost",
    "actu.fr — pillages et dégradations en marge du 17 octobre : 450 commerces sinistrés à Paris",
    "https://actu.fr/ile-de-france/paris_75056/pillages-et-degradations-en-marge-du-17-octobre-450-commerces-sinistres-a-paris-quels-sont-les-plus-touches_64960656.html",
    both(
      "the 450/451 Paris shops with the sector breakdown.",
      "les 450/451 commerces parisiens avec la ventilation par secteur.",
    ),
    "2026-10-22",
  ),

  src(
    "of-facture",
    "cost",
    "Ouest-France — violences du 17 octobre : des dégâts estimés à des centaines de millions d’euros, qui va payer ?",
    "https://www.ouest-france.fr/societe/manifestation/violences-du-17-octobre-des-degats-estimes-a-des-centaines-de-millions-deuros-qui-va-payer-la-facture-5e077b82-cbb5-11f1-b8bc-a46147b584ed",
    both(
      "who bears the cost — communes, insurers, the state — the basis for the footnote on the damage columns.",
      "qui supporte le coût — communes, assureurs, État — base de la note de bas de page des colonnes dommages.",
    ),
    "2026-10-20",
  ),

  src(
    "of-assurance",
    "cost",
    "Ouest-France — 17 octobre : le chiffrage précis des dégâts attendra la fin du délai de 30 jours accordé par les assureurs",
    "https://www.ouest-france.fr/economie/assurance/17-octobre-le-chiffrage-precis-des-degats-devra-attendre-la-fin-du-delai-de-30-jours-accorde-par-les-assureurs-0da74e46-cdff-11f1-bf87-17eca79cb13c",
    both(
      "why every damage figure here is provisional: the insurers’ 30-day claim window had not closed at the time of writing.",
      "pourquoi tout chiffre de dommages est provisoire : le délai de 30 jours des assureurs n’était pas écoulé à la rédaction.",
    ),
    "2026-10-23",
  ),

  src(
    "decryptargent",
    "cost",
    "Décryptargent — 17 octobre : le premier bilan économique",
    "https://decryptargent.fr/finances-personnelles/17-octobre-bilan-economique-premiers-chiffres/",
    both(
      "the first, earliest economic assessment of 17 Oct, superseded by IFRAP and CCI France.",
      "la première estimation économique du 17 oct., supplantée par l’IFRAP et CCI France.",
    ),
    "2026-10-17",
    "2026-10-20",
  ),

  src(
    "capital-policing",
    "cost",
    "Capital.fr — « Combien ont coûté les 70 000 policiers de samedi »",
    "https://www.capital.fr/economie-politique/combien-ont-coute-les-70-000-policiers-de-samedi-letat-ne-le-dit-pas-mais-certains-chiffres-existent-1531269",
    both(
      "the €15,000–30,000 per CRS company per day and €3.4M per 3,000 gendarmes benchmarks behind the policing-cost band; also the 1,435 arrests and 53 officers injured on 24 Oct.",
      "les références de 15 000–30 000 € par compagnie de CRS et par jour, et de 3,4 M€ pour 3 000 gendarmes, derrière la fourchette de coût du maintien de l’ordre ; aussi les 1 435 interpellations et 53 policiers blessés du 24 oct.",
    ),
    "2026-10-28",
  ),

  src(
    "senat-2026-aerien",
    "cost",
    "Sénat, rapport 25-812 — Les moyens aériens de la gendarmerie et de la police nationales",
    "https://www.senat.fr/rap/r25-812/r25-81232.html",
    both(
      "All-in cost of a new-generation helicopter hour, up to about 7,000 euros; aerial maintenance up from under 30M to over 60M euros a year.",
      "Coût complet de l'heure de vol d'un hélicoptère de nouvelle génération, jusqu'à environ 7 000 euros ; maintenance aérienne passée de moins de 30 M€ à plus de 60 M€ par an.",
    ),
    "2026-10-01",
  ),
  src(
    "senat-2014-aerien",
    "cost",
    "Sénat, rapport 13-091 — Le coût des aéronefs de la gendarmerie",
    "https://www.senat.fr/rap/r13-091/r13-09113.html",
    both(
      "812 to 1,690 euros per helicopter flight hour, against 172 euros for a gendarmerie fixed-wing aircraft.",
      "812 à 1 690 euros par heure de vol en hélicoptère, contre 172 euros pour un avion de la gendarmerie.",
    ),
    "2014-10-01",
  ),
  src(
    "iga-2016-helico",
    "cost",
    "IGA 2016, via Flagrant Deni — L'hélico de police, un mouchard de haut vol",
    "https://www.flagrant-deni.fr/l-helico-de-police-un-mouchard-de-haut-vol/",
    both(
      "About 1,800 euros per flight hour: 6,000 law-and-order hours for roughly 11M euros a year, out of a 67M euro helicopter budget.",
      "Environ 1 800 euros par heure de vol : 6 000 heures de maintien de l'ordre pour près de 11 M€ par an, sur un budget hélicoptères de 67 M€.",
    ),
    "2016-01-01",
  ),
  src(
    "lepoint-2019-helico",
    "cost",
    "Le Point — Gilets jaunes : les hélicoptères ont déjà coûté un million d'euros",
    "https://www.lepoint.fr/societe/gilets-jaunes-les-helicopteres-ont-deja-coute-un-million-d-euros-22-03-2019-2303127_23.php",
    both(
      "The precedent the requisition rate is calibrated on: 717 flight hours across six cities, about 1.01M euros, so roughly 1,412 euros an hour.",
      "Le précédent qui calibre le tarif de réquisition : 717 heures de vol dans six villes, environ 1,01 M€, soit près de 1 412 euros par heure.",
    ),
    "2019-03-22",
  ),
  src(
    "assemblee-2019-aerien",
    "cost",
    "Assemblée nationale — L'action aérospatiale de l'État",
    "https://www.assemblee-nationale.fr/dyn/opendata/RINFANR5L15B2166.html",
    both(
      "About 1,690 euros an hour billed to the Police nationale for a gendarmerie helicopter, against 209 euros for a rented light aircraft.",
      "Environ 1 690 euros par heure facturés à la Police nationale pour un hélicoptère de la gendarmerie, contre 209 euros pour un avion de tourisme loué.",
    ),
    "2019-06-01",
  ),
  src(
    "france24-2026-helico",
    "cost",
    "France 24 — Depuis le 17 octobre, drones et hélicoptères sont sortis pour surveiller les manifestations",
    "https://www.france24.com/fr/france/20261107-depuis-17-octobre-drones-h%C3%A9licopt%C3%A8res-sont-sortie-pour-surveiller-manifestations",
    both(
      "The cities and dates of the aerial sorties that FLIGHT_DAYS is built from: Paris night patrols from 19 October, Montpellier and Place de la Nation dispersal orders on 5 November, a helicopter announced again for 7 November.",
      "Les villes et dates des sorties aériennes sur lesquelles FLIGHT_DAYS est construit : patrouilles nocturnes à Paris dès le 19 octobre, sommations à Montpellier et place de la Nation le 5 novembre, hélicoptère de nouveau annoncé pour le 7 novembre.",
    ),
    "2026-11-07",
  ),
  src(
    "opensky-data",
    "cost",
    "OpenSky Network — Données ADS-B historiques",
    "https://opensky-network.org/data/",
    both(
      "Source of the measured block times: ADS-B, Mode-S and FLARM traces, with per-aircraft history behind a subscription.",
      "Source des temps de vol mesurés : traces ADS-B, Mode-S et FLARM, avec l'historique par appareil derrière un abonnement.",
    ),
  ),

  /* ----- 2026 — who pays: the education package --------------------------- */
  src(
    "reuters-education-2026",
    "cost",
    "Reuters — French students vow more protests despite Macron government's concessions",
    "https://www.reuters.com/world/europe/french-minister-says-halloween-protests-could-turn-violent-2026-10-26/",
    both(
      "the 26 Oct package: €4bn of loans for renovating schools, a cap of 28 in some seconde classes, and Parcoursup replaced by 2028. Reuters: there was no overall figure for how much funding the package would require.",
      "l'annonce du 26 oct. : 4 Md€ de prêts pour rénover les établissements, un plafond de 28 élèves dans certaines secondes, et Parcoursup remplacé d'ici 2028. Reuters : aucun chiffre global n'a été donné sur le financement du paquet.",
    ),
    "2026-10-26",
  ),
  src(
    "reuters-education-cost-2026",
    "cost",
    "Reuters — French teachers say government education measures to quell protests fall short",
    "https://www.reuters.com/world/french-teachers-say-government-education-measures-quell-protests-fall-short-2026-10-27/",
    both(
      "the costing, from the Budget Minister on TF1: the Monday measures were expected to cost €5bn and would be offset with spending cuts elsewhere. This is the only published total for the package, and it is a cost, not an appropriation.",
      "le chiffrage, par le ministre du Budget sur TF1 : les mesures du lundi devaient coûter 5 Md€, compensés par des économies ailleurs. C'est le seul total publié pour le paquet, et c'est un coût, non une inscription budgétaire.",
    ),
    "2026-10-27",
  ),
  src(
    "france24-education-2026",
    "cost",
    "France 24 — French student representatives hail govt's 'concrete measures'",
    "https://www.france24.com/en/france/20261026-live-france-will-maintain-order-without-state-of-emergency-but-it-s-not-off-the-table-macron-says",
    both(
      "the itemised list: Parcoursup reformed in 2027 and replaced in 2028, 15,000 additional higher-education places, the 28-student cap, and a €5bn low-interest loan for educational infrastructure (€4bn secondary schools, €1bn universities).",
      "la liste détaillée : Parcoursup réformé en 2027 et remplacé en 2028, 15 000 places supplémentaires dans le supérieur, le plafond de 28 élèves, et un prêt à taux réduit de 5 Md€ pour les équipements éducatifs (4 Md€ pour le secondaire, 1 Md€ pour les universités).",
    ),
    "2026-10-26",
  ),

  /* ----- 2026 — who pays: the 9 November social conference ---------------- */
  src(
    "gouv-smic-2026",
    "cost",
    "info.gouv.fr — Conférence sociale : hausse du SMIC de 1,6 %",
    "https://www.info.gouv.fr/actualite/conference-sociale-hausse-du-smic-de-1-6",
    both(
      "the government's own figure: +1.6% taking the net monthly minimum wage to €1,501.60 from December; +5.3% across 2026, or €75 net over the year. The press rounds this to €1,502.",
      "le chiffre du gouvernement : +1,6 % portant le SMIC net mensuel à 1 501,60 € dès décembre ; +5,3 % sur 2026, soit 75 € net sur l'année. La presse arrondit à 1 502 €.",
    ),
    "2026-11-12",
  ),
  src(
    "franceinfo-conference-sociale-2026",
    "cost",
    "franceinfo — Augmentation du SMIC, allègements de charges pour les entreprises : ce qu'il faut retenir des annonces du gouvernement",
    "https://www.franceinfo.fr/economie/greve/augmentation-du-smic-allegements-de-charges-pour-les-entreprises-ce-qu-il-faut-retenir-des-annonces-du-gouvernement-a-l-issue-de-la-conference-sociale_8274527.html",
    both(
      "the round-up of the 9 Nov package: the 1.6% minimum-wage rise and the employer-contribution relief that accompanies it. No aggregate cost is given.",
      "le récapitulatif du paquet du 9 nov. : la hausse de 1,6 % du SMIC et les allègements de cotisations qui l'accompagnent. Aucun coût global n'est donné.",
    ),
    "2026-11-12",
  ),
  src(
    "leparisien-conference-sociale-2026",
    "cost",
    "Le Parisien — Augmentation du smic, prime carburant… ce qu'il faut retenir des annonces après la conférence sociale",
    "https://www.leparisien.fr/politique/augmentation-du-smic-prime-carburant-ce-quil-faut-retenir-des-annonces-du-gouvernement-apres-la-conference-sociale-09-11-2026-4F67DVAXI5GUDD3ZLXEFLU2KTI.php",
    both(
      "the overtime ceiling raised from €7,500 to €10,000 and the fuel bonus, alongside the minimum-wage rise.",
      "le plafond des heures supplémentaires relevé de 7 500 à 10 000 € et la prime carburant, aux côtés de la hausse du SMIC.",
    ),
    "2026-11-09",
  ),

  /* ----- 2026 — who pays: the penalties protestors are exposed to --------- */
  src(
    "monde-casseurs-payeurs-2026",
    "cost",
    "Le Monde — Mobilisations sociales : le projet de loi « casseurs-payeurs » approuvé et élargi par le Sénat après les violences du 17 octobre",
    "https://www.lemonde.fr/politique/article/2026/10/28/mobilisations-sociales-le-projet-de-loi-casseurs-payeurs-approuve-et-elargi-par-le-senat-apres-les-violences-du-17-octobre_6801416_823448.html",
    both(
      "the Senate vote of 28 Oct: 229 for, 105 against, with the Rassemblement national's support.",
      "le vote du Sénat du 28 oct. : 229 pour, 105 contre, avec le soutien du Rassemblement national.",
    ),
    "2026-10-28",
  ),
  src(
    "publicsenat-casseurs-payeurs-2026",
    "cost",
    "Public Sénat — Le Sénat adopte le projet de loi « casseurs-payeurs » après l'avoir largement durci",
    "https://www.publicsenat.fr/actualites/parlementaire/le-senat-adopte-le-projet-de-loi-casseurs-payeurs-apres-lavoir-largement-durci",
    both(
      "what the text does: civil liability for participants in violent gatherings, and seizure of welfare benefits from offenders who cannot pay.",
      "ce que fait le texte : responsabilité civile des participants à des attroupements violents, et saisie des prestations sociales des responsables insolvables.",
    ),
    "2026-10-29",
  ),
  src(
    "clubdesjuristes-casseurs-payeurs-2026",
    "cost",
    "Le Club des Juristes — Le Sénat adopte le projet de loi « casseurs-payeurs »",
    "https://www.leclubdesjuristes.com/en-bref/le-senat-adopte-le-projet-de-loi-casseurs-payeurs-18070/",
    both(
      "the status that matters for the dataset: the text still has to go to the National Assembly, so it is not law and creates no obligation yet.",
      "le statut qui compte pour le jeu de données : le texte doit encore passer devant l'Assemblée nationale ; il n'est pas loi et ne crée donc aucune obligation à ce jour.",
    ),
    "2026-10-28",
  ),

  /* ----- standing law: the statutory maxima, one article per entry -------- */
  /* ── URLs resolved 19 Nov 2026 ─────────────────────────────────────────────
   * The four Légifrance links point at the consolidated article page (no date
   * suffix), so they follow later amendments instead of freezing a version —
   * except R. 644-4, whose id carries a trailing slash. Art. 431-1 must use
   * LEGIARTI000043982117 (2021 version): LEGIARTI000006418459 is the 2002 text
   * and lacks both the teaching-function paragraph and the aggravated tier. */
  src(
    "legifrance-431-1",
    "cost",
    "Légifrance — Code pénal, art. 431-1 (entrave à l'exercice des libertés)",
    "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043982117",
    both(
      "obstruction, concerted and by threats, of the freedom of expression, work, association, assembly or demonstration: one year and €15,000. Three years and €45,000 when committed with blows, violence, assault, destruction or damage. In force since 26 August 2021; the paragraph on obstructing the teaching function dates from the 2021 law.",
      "l'entrave, de manière concertée et à l'aide de menaces, à la liberté d'expression, du travail, d'association, de réunion ou de manifestation : un an et 15 000 €. Trois ans et 45 000 € lorsqu'elle est commise avec coups, violences, voies de fait, destructions ou dégradations. En vigueur depuis le 26 août 2021 ; le alinéa sur l'entrave à la fonction d'enseignant date de la loi de 2021.",
    ),
  ),
  src(
    "legifrance-431-22",
    "cost",
    "Légifrance — Code pénal, art. 431-22 et 431-23 (intrusion dans un établissement scolaire)",
    "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021926176",
    both(
      "entering or remaining inside a school without authorisation, in order to disturb its tranquillity or good order: one year and €7,500. Art. 431-23 raises this to three years and €45,000 when committed in a group.",
      "pénétrer ou se maintenir dans l'enceinte d'un établissement scolaire sans autorisation, dans le but d'en troubler la tranquillité ou le bon ordre : un an et 7 500 €. L'article 431-23 porte la peine à trois ans et 45 000 € lorsque le délit est commis en réunion.",
    ),
  ),
  src(
    "legifrance-r644-4",
    "cost",
    "Légifrance — Code pénal, art. R. 644-4 (participation à une manifestation interdite)",
    "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038253024/",
    both(
      "taking part in a demonstration on the public road that has been banned under art. L. 211-4 of the internal security code: the fine for a 4th-class contravention, €135. It penalises participation in a banned demonstration, not the absence of a declaration.",
      "participer à une manifestation sur la voie publique interdite sur le fondement de l'article L. 211-4 du code de la sécurité intérieure : l'amende des contraventions de 4e classe, 135 €. Le texte réprime la participation à une manifestation interdite, non l'absence de déclaration.",
    ),
  ),
  src(
    "legifrance-1242",
    "cost",
    "Légifrance — Code civil, art. 1242 (responsabilité du fait d'autrui)",
    "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032041559",
    both(
      "parental civil liability: parents exercising parental authority are jointly liable as of right for damage caused by their minor children, unless the child has been entrusted to a third party. Reworded by the law of 23 June 2025, which replaced 'the father and the mother' with 'the parents'.",
      "la responsabilité civile des parents : ceux qui exercent l'autorité parentale sont solidairement responsables de plein droit du dommage causé par leur enfant mineur, sauf si celui-ci a été confié à un tiers. Rédaction modifiée par la loi du 23 juin 2025, qui remplace « le père et la mère » par « les parents ».",
    ),
  ),
  src(
    "franceassureurs-2023",
    "cost",
    "France Assureurs — « Pour une France assurable » : le coût des émeutes de 2023",
    "https://www.franceassureurs.fr/espace-presse/pour-une-france-assurable/",
    both(
      "the 2023 riots cost insurers €793M, more than three times the 2005 and 2018 episodes. A moving figure: €650M at ten days (11,300 claims, July 2023), €730M at two months (15,600 claims, September 2023), €793M in the final balance. Roughly 17,000 claims averaging about €46,600; two-thirds, ~€523M, on shops; about a quarter, ~€200M, on local-authority property.",
      "les émeutes de 2023 ont coûté 793 M€ aux assureurs, plus de trois fois les épisodes de 2005 et 2018. Un chiffre mouvant : 650 M€ à dix jours (11 300 sinistres, juillet 2023), 730 M€ à deux mois (15 600 sinistres, septembre 2023), 793 M€ au bilan final. Environ 17 000 sinistres, ~46 600 € en moyenne ; deux tiers, ~523 M€, pour les commerces ; environ un quart, ~200 M€, pour les biens des collectivités.",
    ),
  ),
  src(
    "franceassureurs-2026",
    "cost",
    "France Assureurs — « Le coût des violences urbaines des 17 et 18 octobre 2026 pourrait atteindre plus de 200 millions d’euros »",
    "https://www.franceassureurs.fr/espace-presse/les-communiques-de-presse/cout-violences-urbaines-octobre-2026-200millions/",
    both(
      "the first federation estimate, published 19 November from data reported to 12 November: 207M euros of insured damage for 5,280 claims. Professional property 198M (4,050 claims, over 95% of the total), private individuals 3.5M (370), motor 6M (860). No local-authority line. Compared with 209M over four weeks in 2005 and 256M over several months in 2018-2019, for events concentrated on 24 hours. The claim window was extended from five to 30 days on 19 October, and the federation says the figure may be revised as files are processed.",
      "la première estimation de la fédération, publiée le 19 novembre à partir de données remontées jusqu’au 12 novembre : 207 M€ de dommages assurés pour 5 280 sinistres. Biens professionnels 198 M€ (4 050 sinistres, plus de 95 % du total), particuliers 3,5 M€ (370), automobile 6 M€ (860). Aucune ligne pour les collectivités. À comparer aux 209 M€ sur quatre semaines de 2005 et aux 256 M€ sur plusieurs mois de 2018-2019, pour des événements concentrés sur 24 heures. Le délai de déclaration a été porté de cinq à 30 jours le 19 octobre, et la fédération indique que le chiffre pourra évoluer à mesure que les dossiers seront instruits.",
    ),
    "2026-11-19",
  ),
];

/* Kept as it was. Suspected dead: it duplicates the seven helicopter entries
   above, in French only, which breaks the bilingual rule. Delete only after
   `grep -rn "from \"./sources/cost" src` and `grep -rn "\bs\b" src/data/sources`
   show nothing imports the name — an `export const s` in a module under a
   barrel is easy to collide with. */
export const s = [
  {
    id: "senat-2026-aerien",
    label:
      "Sénat, rapport 25-812 — Les moyens aériens de la gendarmerie et de la police nationales",
    url: "https://www.senat.fr/rap/r25-812/r25-81232.html",
    note: "coût complet jusqu'à ~7 000 €/h, H145-D3 et H160",
  },
  {
    id: "senat-2014-aerien",
    label:
      "Sénat, rapport 13-091 — coût horaire des aéronefs de la gendarmerie",
    url: "https://www.senat.fr/rap/r13-091/r13-09113.html",
    note: "812 à 1 690 €/h pour les hélicoptères",
  },
  {
    id: "iga-2016-helico",
    label:
      "IGA 2016, via Flagrant Deni — l'hélico de police, un mouchard de haut vol",
    url: "https://www.flagrant-deni.fr/l-helico-de-police-un-mouchard-de-haut-vol/",
    note: "~1 800 €/h ; 6 000 h de maintien de l'ordre pour ~11 M€/an",
  },
  {
    id: "lepoint-2019-helico",
    label:
      "Le Point — Gilets jaunes : les hélicoptères ont déjà coûté un million d'euros",
    url: "https://www.lepoint.fr/societe/gilets-jaunes-les-helicopteres-ont-deja-coute-un-million-d-euros-22-03-2019-2303127_23.php",
    note: "717 heures, ~1,01 M€, soit ~1 412 €/h",
  },
  {
    id: "assemblee-2019-aerien",
    label: "Assemblée nationale — l'action aérospatiale de l'État",
    url: "https://www.assemblee-nationale.fr/dyn/opendata/RINFANR5L15B2166.html",
    note: "~1 690 €/h facturés à la Police nationale",
  },
  {
    id: "france24-2026-helico",
    label: "France 24 — drones et hélicoptères sortis depuis le 17 octobre",
    url: "https://www.france24.com/fr/france/20261107-depuis-17-octobre-drones-h%C3%A9licopt%C3%A8res-sont-sortie-pour-surveiller-manifestations",
    note: "villes et dates des sorties aériennes",
  },
  {
    id: "opensky-data",
    label: "OpenSky Network — données ADS-B historiques",
    url: "https://opensky-network.org/data/",
    note: "source des temps de vol mesurés",
  },
] as const;
