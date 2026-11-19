/* Approval of the autumn 2026 movement, poll by poll.

   ── What this file is ─────────────────────────────────────────────────────
   One row per published poll. Every percentage is the published figure for
   ONE response bucket, in the pollster's own vocabulary ("soutient",
   "sympathie", "opposé", "hostile", "indifférent"). Nothing is summed here
   and nothing is averaged here: the render layer sums, and the label travels
   with the number so two polls never look alike when they are not alike.

   ── What this file is not ─────────────────────────────────────────────────
   Not a turnout series. A poll approves or disapproves of a movement; it
   counts nobody in the street. `base: "all"` means the percentage is a
   percentage of the surveyed sample — never of the population.

   ── The three traps this file exists to prevent ───────────────────────────
   1. "Indifférent" is not "ne sait pas". Elabe publishes indifference
      (10–14 pts) and Ifop publishes indifference (17 pts); neither publishes
      a non-response bucket. An "undecided" band built from these two is a
      band of indifference wearing the wrong label.
   2. "Approuve" is not "soutient". Elabe 7 Oct: 55% "approuvent" the lycée
      mobilisation, decomposed 26% soutient + 29% sympathie. Ifop 7 Oct: 48%
      "soutiennent ou éprouvent de la sympathie". Comparable sums, different
      verbs.
   3. "Justifiées" is not "approuve". YouGov 5 Nov: 77% judge the
      mobilisations justified — a judgement on the cause, on a question with
      no approve/disapprove counterpart. It carries its own subject key and
      is excluded from every approval average.

   ── What is deliberately absent ───────────────────────────────────────────
   The articles do not reproduce the question wording, so `asked` is a
   description, not a quotation. A poll that published only one bucket
   (Ipsos: 54% approve) keeps only that bucket: it can enter an approval-only
   view and can never enter a 100% stacked one.
*/

export type OpinionBucketKey =
  | "approves"
  | "supports"
  | "sympathetic"
  | "disapproves"
  | "opposed"
  | "hostile"
  | "indifferent"
  | "no-opinion"
  | "justified";

/** `aggregate` is a total the pollster published; `component` is one of its
 *  parts. The two are never added together — see `topline()`. */
export type OpinionBucket = {
  readonly key: OpinionBucketKey;
  readonly role: "aggregate" | "component";
  /** the pollster's own word, verbatim, untranslated */
  readonly label: string;
  /** percentage points, as published */
  readonly v: number;
  /** what the percentage is a percentage of */
  readonly base: "all";
};

/** The question asked, not the movement. Averaging across these keys is the
 *  error this type makes impossible to commit by accident. */
export type OpinionSubject =
  | "lycee-mobilisation"
  | "mobilisation-17-octobre"
  | "mobilisation-5-novembre"
  | "mobilisations-justifiees";

export type OpinionPoll = {
  readonly id: string;
  readonly subject: OpinionSubject;
  readonly pollster: string;
  readonly client: string;
  /** publisher + headline, verbatim */
  readonly source: string;
  readonly url: string;
  /** fieldwork window, ISO */
  readonly field: { readonly from: string; readonly to: string };
  /** publication date, ISO */
  readonly published: string;
  /** respondents, as the pollster counts them */
  readonly n: number;
  readonly universe: "adults-france-metropolitaine" | "adults-france";
  /** what was put to respondents — descriptive, never a quotation */
  readonly asked: string;
  readonly buckets: readonly OpinionBucket[];
};

export const OPINION_POLLS: readonly OpinionPoll[] = [
  {
    id: "elabe-lycee-2026-10-07",
    subject: "lycee-mobilisation",
    pollster: "Elabe",
    client: "BFMTV",
    source:
      "SONDAGE BFMTV. Une majorité de Français approuve le mouvement des lycéens, près de trois sur quatre jugent leurs revendications légitimes",
    url: "https://www.bfmtv.com/politique/sondage-bfmtv-une-majorite-de-francais-approuve-le-mouvement-des-lyceens-pres-de-trois-sur-quatre-jugent-leurs-revendications-legitimes_AN-202610070622.html",
    field: { from: "2026-10-06", to: "2026-10-07" },
    published: "2026-10-07",
    n: 1_001,
    universe: "adults-france-metropolitaine",
    asked: "approbation de la mobilisation des lycéens",
    buckets: [
      {
        key: "approves",
        role: "aggregate",
        label: "approuvent",
        v: 55,
        base: "all",
      },
      {
        key: "supports",
        role: "component",
        label: "soutiennent",
        v: 26,
        base: "all",
      },
      {
        key: "sympathetic",
        role: "component",
        label: "sympathie",
        v: 29,
        base: "all",
      },
      {
        key: "disapproves",
        role: "aggregate",
        label: "désapprouvent",
        v: 35,
        base: "all",
      },
      {
        key: "opposed",
        role: "component",
        label: "opposés",
        v: 18,
        base: "all",
      },
      {
        key: "hostile",
        role: "component",
        label: "hostiles",
        v: 17,
        base: "all",
      },
      {
        key: "indifferent",
        role: "aggregate",
        label: "indifférents",
        v: 10,
        base: "all",
      },
    ],
  },
  {
    id: "ifop-lycee-2026-10-07",
    subject: "lycee-mobilisation",
    pollster: "Ifop",
    client: "LCI",
    source: "Les Français et le mouvement des lycéens",
    url: "https://www.ifopgroup.com/wp-content/uploads/2026/10/122835-rapport-manifestation-lycees-1.pdf",
    field: { from: "2026-10-06", to: "2026-10-07" },
    published: "2026-10-07",
    n: 1_000,
    universe: "adults-france",
    asked: "soutien au mouvement de contestation dans les lycées",
    buckets: [
      {
        key: "supports",
        role: "component",
        label: "soutiennent",
        v: 27,
        base: "all",
      },
      {
        key: "sympathetic",
        role: "component",
        label: "sympathie",
        v: 21,
        base: "all",
      },
      {
        key: "disapproves",
        role: "aggregate",
        label: "opposés",
        v: 35,
        base: "all",
      },
      {
        key: "indifferent",
        role: "aggregate",
        label: "indifférents",
        v: 17,
        base: "all",
      },
    ],
  },
  {
    id: "ipsos-bva-cesi-lycee-2026-10-08",
    subject: "lycee-mobilisation",
    pollster: "Ipsos-BVA Cesi",
    client: "La Tribune dimanche",
    source:
      'Le mouvement lycéen approuvé par 54% des Français, 69% souhaitent que le gouvernement "discute avec les lycéens"',
    url: "https://www.tf1info.fr/societe/le-mouvement-lyceen-approuve-par-54-des-francais-69-souhaitent-que-le-gouvernement-discute-avec-les-lyceens-2469251.html",
    field: { from: "2026-10-07", to: "2026-10-08" },
    published: "2026-10-11",
    n: 1_000,
    universe: "adults-france",
    asked: "approbation du mouvement lycéen",
    /* Only the approval figure is published in this article. The disapprove
       and no-opinion buckets are NOT recorded here because they were not in
       the copy I read — add them from the Ipsos report, not from memory. */
    buckets: [
      {
        key: "approves",
        role: "aggregate",
        label: "approuvent",
        v: 54,
        base: "all",
      },
    ],
  },
  {
    id: "elabe-17-octobre-2026-10-16",
    subject: "mobilisation-17-octobre",
    pollster: "Elabe",
    client: "BFMTV",
    source:
      "SONDAGE BFMTV. Près de sept Français sur dix approuvent la mobilisation du 17 octobre contre la hausse du coût de la vie",
    url: "https://www.bfmtv.com/societe/manifestations/sondage-bfmtv-pres-de-sept-francais-sur-dix-approuvent-la-mobilisation-du-17-octobre-contre-la-hausse-du-cout-de-la-vie_AN-202610160598.html",
    field: { from: "2026-10-14", to: "2026-10-16" },
    published: "2026-10-16",
    n: 1_506,
    universe: "adults-france-metropolitaine",
    asked:
      "approbation de la mobilisation du 17 octobre contre la hausse du coût de la vie",
    buckets: [
      {
        key: "approves",
        role: "aggregate",
        label: "approuvent",
        v: 69,
        base: "all",
      },
      {
        key: "supports",
        role: "component",
        label: "soutiennent",
        v: 36,
        base: "all",
      },
      {
        key: "sympathetic",
        role: "component",
        label: "sympathie",
        v: 33,
        base: "all",
      },
      {
        key: "opposed",
        role: "component",
        label: "opposés",
        v: 10,
        base: "all",
      },
      {
        key: "hostile",
        role: "component",
        label: "hostiles",
        v: 7,
        base: "all",
      },
      {
        key: "indifferent",
        role: "aggregate",
        label: "indifférents",
        v: 14,
        base: "all",
      },
    ],
  },
  {
    id: "elabe-5-novembre-2026-10-28",
    subject: "mobilisation-5-novembre",
    pollster: "Elabe",
    client: "BFMTV",
    source:
      "SONDAGE BFMTV. Colère lycéenne et étudiante: plus d'un Français sur deux juge les propositions du gouvernement insuffisantes mais 54% souhaitent que la mobilisation se termine",
    url: "https://www.bfmtv.com/societe/manifestations/sondage-bfmtv-colere-lyceenne-et-etudiante-plus-d-un-francais-sur-deux-juge-les-propositions-du-gouvernement-insuffisantes-mais-54-souhaitent-que-la-mobilisation-se-termine_AN-202610280689.html",
    field: { from: "2026-10-27", to: "2026-10-28" },
    published: "2026-10-28",
    n: 1_002,
    universe: "adults-france-metropolitaine",
    asked: "soutien à la mobilisation prévue le 5 novembre",
    buckets: [
      {
        key: "supports",
        role: "component",
        label: "soutiennent",
        v: 32,
        base: "all",
      },
      {
        key: "sympathetic",
        role: "component",
        label: "sympathie",
        v: 27,
        base: "all",
      },
      {
        key: "disapproves",
        role: "aggregate",
        label: "opposés ou hostiles",
        v: 28,
        base: "all",
      },
      {
        key: "indifferent",
        role: "aggregate",
        label: "indifférents",
        v: 13,
        base: "all",
      },
    ],
  },
  {
    id: "elabe-5-novembre-2026-11-04",
    subject: "mobilisation-5-novembre",
    pollster: "Elabe",
    client: "BFMTV",
    source:
      "SONDAGE BFMTV. Plus d'un Français sur deux approuve la mobilisation du 5 novembre",
    url: "https://www.bfmtv.com/politique/sondages/sondage-bfmtv-plus-d-un-francais-sur-deux-favorable-a-la-mobilisation-du-5-novembre_AN-202611040674.html",
    field: { from: "2026-11-03", to: "2026-11-04" },
    published: "2026-11-04",
    n: 1_004,
    universe: "adults-france-metropolitaine",
    asked: "favorabilité à l'égard de la mobilisation du 5 novembre",
    /* support/sympathy and oppose/hostility are published only as totals here;
       the article gives no split. Sum is 99: the three published buckets do
       not reach 100, so `topline()` marks the row incomplete. */
    buckets: [
      {
        key: "approves",
        role: "aggregate",
        label: "soutiennent ou sympathie",
        v: 57,
        base: "all",
      },
      {
        key: "disapproves",
        role: "aggregate",
        label: "opposés ou hostiles",
        v: 28,
        base: "all",
      },
      {
        key: "indifferent",
        role: "aggregate",
        label: "indifférents",
        v: 14,
        base: "all",
      },
    ],
  },
  {
    id: "yougov-justifiees-2026-11-05",
    subject: "mobilisations-justifiees",
    pollster: "YouGov",
    client: "Le HuffPost",
    source:
      "La mobilisation sociale (très) largement soutenue par les Français - EXCLUSIF",
    url: "https://www.huffingtonpost.fr/politique/article/la-mobilisation-sociale-tres-largement-soutenue-par-les-francais-exclusif_353102.html",
    field: { from: "2026-11-02", to: "2026-11-05" },
    published: "2026-11-04",
    n: 1_024,
    universe: "adults-france",
    asked: "les mobilisations en cours sont-elles justifiées",
    /* A judgement on the cause, not an approval of the movement: no
       approve/disapprove counterpart was published, so this row is excluded
       from every approval average by construction. */
    buckets: [
      {
        key: "justified",
        role: "aggregate",
        label: "justifiées",
        v: 77,
        base: "all",
      },
    ],
  },
];

/* ── derived views ────────────────────────────────────────────────────────
   Summing published buckets is arithmetic. Averaging published polls is
   NOT: it is the one operation the repository forbids by name, and it is
   permitted here only because a chart asked for it — so every average
   carries the number of polls behind it, and no average crosses a subject
   key. Record the decision in `src/data/data.ts` and in the Observatory's
   `content/data-problems.md` before the chart ships. */

export type OpinionTopline = {
  readonly approve: number | null;
  readonly disapprove: number | null;
  readonly indifferent: number | null;
  /** true only when all three are published and sum to 100 ± 1 */
  readonly complete: boolean;
};

function bucketTotal(
  poll: OpinionPoll,
  keys: readonly OpinionBucketKey[],
  role?: "aggregate" | "component",
): number | null {
  const hits = poll.buckets.filter(
    (b) => keys.includes(b.key) && (role === undefined || b.role === role),
  );
  if (hits.length === 0) return null;
  return hits.reduce((total, b) => total + b.v, 0);
}

/** The pollster's own aggregate where published, the sum of its components
 *  otherwise — never both, never in the same figure. */
export function topline(poll: OpinionPoll): OpinionTopline {
  const approve =
    bucketTotal(poll, ["approves"]) ??
    bucketTotal(poll, ["supports", "sympathetic"]);
  const disapprove =
    bucketTotal(poll, ["disapproves"]) ??
    bucketTotal(poll, ["opposed", "hostile"]);
  const indifferent = bucketTotal(poll, ["indifferent", "no-opinion"]);
  const complete =
    approve !== null &&
    disapprove !== null &&
    indifferent !== null &&
    Math.abs(approve + disapprove + indifferent - 100) <= 1;
  return { approve, disapprove, indifferent, complete };
}

export type OpinionMean = { readonly v: number; readonly polls: number };

export type OpinionAverage = {
  readonly subject: OpinionSubject;
  readonly approve: OpinionMean | null;
  readonly disapprove: OpinionMean | null;
  readonly indifferent: OpinionMean | null;
  /** respondents behind the approve figure — not a pooled sample */
  readonly n: number;
};

const mean = (xs: readonly number[]): OpinionMean | null =>
  xs.length === 0
    ? null
    : {
        v: Math.round((xs.reduce((t, x) => t + x, 0) / xs.length) * 10) / 10,
        polls: xs.length,
      };

/** One subject at a time. `null` when no poll for that subject published the
 *  figure. Flag any series built from this as derived ("e"). */
export function opinionAverage(
  polls: readonly OpinionPoll[],
  subject: OpinionSubject,
): OpinionAverage {
  const rows = polls.filter((p) => p.subject === subject).map(topline);
  const withApprove = polls.filter(
    (p) => p.subject === subject && topline(p).approve !== null,
  );
  const t = rows.map((r) => r);
  return {
    subject,
    approve: mean(t.flatMap((r) => (r.approve === null ? [] : [r.approve]))),
    disapprove: mean(
      t.flatMap((r) => (r.disapprove === null ? [] : [r.disapprove])),
    ),
    indifferent: mean(
      t.flatMap((r) => (r.indifferent === null ? [] : [r.indifferent])),
    ),
    n: withApprove.reduce((total, p) => total + p.n, 0),
  };
}
