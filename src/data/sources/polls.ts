import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 7 entries, one per published poll in `opinion.ts`. The id is the poll id, so
 * the row and its source are the same string in two files — deliberately, so a
 * grep finds both. `label` reproduces publisher + headline verbatim and is
 * never translated; `date` is the publication date, not the end of fieldwork.
 * What each entry records is the bucket split exactly as published, because
 * the split is the figure: an approval total without its indifference share
 * cannot be read against the next pollster's. */
export const POLLS_SOURCES: readonly Source[] = [
  /* ----- lycée mobilisation, October */
  src(
    "elabe-lycee-2026-10-07",
    "polls",
    "BFMTV — SONDAGE BFMTV. Une majorité de Français approuve le mouvement des lycéens, près de trois sur quatre jugent leurs revendications légitimes",
    "https://www.bfmtv.com/politique/sondage-bfmtv-une-majorite-de-francais-approuve-le-mouvement-des-lyceens-pres-de-trois-sur-quatre-jugent-leurs-revendications-legitimes_AN-202610070622.html",
    both(
      "the 55 % approval / 35 % disapproval / 10 % indifference split for the lycée mobilisation (6–7 Oct, n = 1 001), with its 26 % support + 29 % sympathy decomposition.",
      "la répartition 55 % d’approbation / 35 % de désapprobation / 10 % d’indifférence pour la mobilisation des lycéens (6–7 oct., n = 1 001), avec sa décomposition 26 % de soutien + 29 % de sympathie.",
    ),
    "2026-10-07",
  ),

  src(
    "ifop-lycee-2026-10-07",
    "polls",
    "Ifop — Les Français et le mouvement des lycéens",
    "https://www.ifopgroup.com/wp-content/uploads/2026/10/122835-rapport-manifestation-lycees-1.pdf",
    both(
      "the 27 % support + 21 % sympathy / 35 % opposition / 17 % indifference split (6–7 Oct, n = 1 000). The pollster published no approval aggregate, so the total is the sum of its components.",
      "la répartition 27 % de soutien + 21 % de sympathie / 35 % d’opposition / 17 % d’indifférence (6–7 oct., n = 1 000). Aucun agrégat d’approbation n’est publié : le total est la somme des composantes.",
    ),
    "2026-10-07",
  ),

  src(
    "ipsos-bva-cesi-lycee-2026-10-08",
    "polls",
    'TF1 Info — Le mouvement lycéen approuvé par 54% des Français, 69% souhaitent que le gouvernement "discute avec les lycéens"',
    "https://www.tf1info.fr/societe/le-mouvement-lyceen-approuve-par-54-des-francais-69-souhaitent-que-le-gouvernement-discute-avec-les-lyceens-2469251.html",
    both(
      "the 54 % approval figure only (7–8 Oct, n = 1 000). The copy read publishes neither a disapproval nor an indifference share, so this poll carries one bucket and can never enter a 100 % stacked view.",
      "le seul chiffre de 54 % d’approbation (7–8 oct., n = 1 000). Le texte lu ne publie ni désapprobation ni indifférence : ce sondage ne porte qu’une case et ne peut jamais entrer dans une vue empilée à 100 %.",
    ),
    "2026-10-11",
  ),

  /* ----- 17 October cost-of-living action */
  src(
    "elabe-17-octobre-2026-10-16",
    "polls",
    "BFMTV — SONDAGE BFMTV. Près de sept Français sur dix approuvent la mobilisation du 17 octobre contre la hausse du coût de la vie",
    "https://www.bfmtv.com/societe/manifestations/sondage-bfmtv-pres-de-sept-francais-sur-dix-approuvent-la-mobilisation-du-17-octobre-contre-la-hausse-du-cout-de-la-vie_AN-202610160598.html",
    both(
      "the 69 % approval / 10 % opposition + 7 % hostility / 14 % indifference split for the 17 October action (14–16 Oct, n = 1 506), with the 36 % support + 33 % sympathy decomposition.",
      "la répartition 69 % d’approbation / 10 % d’opposition + 7 % d’hostilité / 14 % d’indifférence pour la journée du 17 oct. (14–16 oct., n = 1 506), avec la décomposition 36 % de soutien + 33 % de sympathie.",
    ),
    "2026-10-16",
  ),

  /* ----- 5 November action, measured twice, a week apart */
  src(
    "elabe-5-novembre-2026-10-28",
    "polls",
    "BFMTV — SONDAGE BFMTV. Colère lycéenne et étudiante: plus d’un Français sur deux juge les propositions du gouvernement insuffisantes mais 54% souhaitent que la mobilisation se termine",
    "https://www.bfmtv.com/societe/manifestations/sondage-bfmtv-colere-lyceenne-et-etudiante-plus-d-un-francais-sur-deux-juge-les-propositions-du-gouvernement-insuffisantes-mais-54-souhaitent-que-la-mobilisation-se-termine_AN-202610280689.html",
    both(
      "the 32 % support + 27 % sympathy / 28 % opposition or hostility / 13 % indifference split for the 5 November action (27–28 Oct, n = 1 002).",
      "la répartition 32 % de soutien + 27 % de sympathie / 28 % d’opposition ou d’hostilité / 13 % d’indifférence pour la journée du 5 nov. (27–28 oct., n = 1 002).",
    ),
    "2026-10-28",
  ),

  src(
    "elabe-5-novembre-2026-11-04",
    "polls",
    "BFMTV — SONDAGE BFMTV. Plus d’un Français sur deux approuve la mobilisation du 5 novembre",
    "https://www.bfmtv.com/politique/sondages/sondage-bfmtv-plus-d-un-francais-sur-deux-favorable-a-la-mobilisation-du-5-novembre_AN-202611040674.html",
    both(
      "the 57 % support-or-sympathy / 28 % opposition or hostility / 14 % indifference split for the 5 November action (3–4 Nov, n = 1 004). No component split was published and the three buckets sum to 99.",
      "la répartition 57 % de soutien ou sympathie / 28 % d’opposition ou d’hostilité / 14 % d’indifférence pour la journée du 5 nov. (3–4 nov., n = 1 004). Aucune décomposition n’est publiée et les trois cases totalisent 99.",
    ),
    "2026-11-04",
  ),

  /* ----- the one poll on the cause rather than on the movement */
  src(
    "yougov-justifiees-2026-11-05",
    "polls",
    "Le HuffPost — La mobilisation sociale (très) largement soutenue par les Français - EXCLUSIF",
    "https://www.huffingtonpost.fr/politique/article/la-mobilisation-sociale-tres-largement-soutenue-par-les-francais-exclusif_353102.html",
    both(
      "the 77 % who judge the mobilisations justified (2–5 Nov, n = 1 024). A judgement on the cause, with no approve/disapprove counterpart: it carries its own subject key and is excluded from every approval average.",
      "les 77 % qui jugent les mobilisations justifiées (2–5 nov., n = 1 024). Un jugement sur la cause, sans pendant approuve/désapprouve : la ligne porte sa propre clé de sujet et reste exclue de toute moyenne d’approbation.",
    ),
    "2026-11-04",
  ),
];
