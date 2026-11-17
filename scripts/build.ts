/* Build the consumable bundle: json/ + schema/ + csv/.
   Run: node scripts/build.ts  (also invoked by `npm run build`).
   Output is committed to the repo and published with the npm package. */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createGenerator } from "ts-json-schema-generator";

import { FACTS, WEEKLY } from "../src/data/data.ts";
import { EPISODES } from "../src/data/episodes/index.ts";
import { POPULATION, VINTAGE } from "../src/data/population.ts";
import { SOURCES } from "../src/data/sources/index.ts";
import { METRIC_OF } from "../src/model/index.ts";

const DATA_VERSION = JSON.parse(readFileSync("package.json", "utf8")).version;
/** "main" locally; the tag (vYYYY.n) when run by CI on a tagged commit. */
const REF = process.env.GITHUB_REF_NAME ?? "main";

mkdirSync("json", { recursive: true });
mkdirSync("schema", { recursive: true });
mkdirSync("csv", { recursive: true });

const writeJson = (dir: string, file: string, data: unknown): void => {
  const p = `${dir}/${file}`;
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
};

/* ---- json/ ------------------------------------------------------------- */

writeJson("json", "episodes.json", EPISODES);
writeJson("json", "sources.json", { sources: SOURCES });
writeJson("json", "reference.json", {
  facts: FACTS, // 2026 daily cells: { [ISO date]: { [MetricKey]: Obs } }
  weekly: WEEKLY, // pre-aggregated 2026 weekly Series (turnout/strikers/arrests/…)
  population: POPULATION,
  populationVintage: VINTAGE,
});

const sha256 = (p: string): string =>
  `sha256:${createHash("sha256").update(readFileSync(p)).digest("hex")}`;

const BUNDLE = ["episodes.json", "reference.json", "sources.json"];
writeJson("json", "manifest.json", {
  name: "@manifestigations/protest-data",
  version: DATA_VERSION,
  generatedAt: new Date().toISOString(),
  license: "SEE-LICENSE", // TODO: match the SPDX id in LICENSE
  counts: {
    episodes: EPISODES.length,
    sources: SOURCES.length,
    factDates: Object.keys(FACTS).length,
  },
  files: Object.fromEntries(BUNDLE.map((f) => [f, sha256(`json/${f}`)])),
  rawUrls: Object.fromEntries(
    [...BUNDLE, "manifest.json"].map((f) => [
      f,
      `https://raw.githubusercontent.com/Manifestigations/Dataset/${REF}/json/${f}`,
    ]),
  ),
});

/* ---- schema/ (self-contained: $refStrategy "none") --------------------- */

const generator = createGenerator({
  path: "src/index.ts",
  tsconfig: "tsconfig.schema.json",
  expose: "all",
  topRef: false,
});

for (const t of [
  "Episode",
  "Row",
  "Flag",
  "Band",
  "NoteRef",
  "Obs",
  "Pt",
  "Population",
  "Source",
  "SourceGroup",
]) {
  writeJson("schema", `${t}.schema.json`, generator.createSchema(t));
}

/* ---- csv/ (long format; bands stay two columns, never a midpoint) ------ */

const esc = (v: unknown): string => {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

const epLines: string[] = [
  "episode,from,to,metric,value_low,value_high,flag,note_ref",
];
for (const ep of EPISODES) {
  for (const row of ep.weeks) {
    for (const m of ["p", "a", "f", "i"] as const) {
      const v = row[m];
      if (v === undefined) continue; // empty = no published figure
      const [lo, hi] = typeof v === "number" ? [v, v] : v;
      epLines.push(
        [
          ep.id,
          row.from,
          row.to,
          METRIC_OF[m],
          lo,
          hi,
          row.flag?.[m] ?? "",
          JSON.stringify(row.noteRef?.[m] ?? null),
        ]
          .map(esc)
          .join(","),
      );
    }
  }
}
writeFileSync("csv/episodes_long.csv", epLines.join("\n") + "\n");

const factLines: string[] = ["date,metric,low,high,q"];
for (const [date, metrics] of Object.entries(FACTS).sort()) {
  for (const [metric, o] of Object.entries(metrics).sort()) {
    factLines.push([date, metric, o.low, o.high, o.q ?? ""].map(esc).join(","));
  }
}
writeFileSync("csv/facts_2026.csv", factLines.join("\n") + "\n");

console.log(`built json/ schema/ csv/ for v${DATA_VERSION} (${REF})`);
