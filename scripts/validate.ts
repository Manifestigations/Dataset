/* npm run validate — validate json/ against schema/. Run after
   scripts/build.ts; also called by the prepublish gate. */

import Ajv, { type ErrorObject, type Schema } from "ajv";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const readJson = (p: string): unknown => JSON.parse(readFileSync(p, "utf8"));

/** Schemas are JSON files on disk; `Schema` is Ajv's own accepted type. */
const readSchema = (p: string): Schema =>
  JSON.parse(readFileSync(p, "utf8")) as Schema;

const ajv = new Ajv({ allErrors: true });
const failures: string[] = [];

const format = (errors: ErrorObject[] | null | undefined): string =>
  (errors ?? [])
    .map((e) => `  ${e.instancePath || "/"}: ${e.message}`)
    .join("\n");

/* episodes.json: an array of Episode */
const checkEpisode = ajv.compile(readSchema("schema/Episode.schema.json"));
const episodes = readJson("json/episodes.json");
if (!Array.isArray(episodes)) {
  failures.push("json/episodes.json: expected a top-level array");
} else {
  episodes.forEach((ep, i) => {
    if (!checkEpisode(ep)) {
      failures.push(
        `json/episodes.json[${i}] (${(ep as { id?: string }).id ?? "?"})\n` +
          format(checkEpisode.errors),
      );
    }
  });
}

/* reference.json: every 2026 fact cell is an Obs */
const checkObs = ajv.compile(readSchema("schema/Obs.schema.json"));
const ref = readJson("json/reference.json") as {
  facts: Record<string, Record<string, unknown>>;
};
for (const [date, metrics] of Object.entries(ref.facts)) {
  for (const [metric, cell] of Object.entries(metrics)) {
    if (!checkObs(cell)) {
      failures.push(
        `json/reference.json facts["${date}"].${metric}\n${format(checkObs.errors)}`,
      );
    }
  }
}

/* sources.json: every entry is a Source */
const checkSource = ajv.compile(readSchema("schema/Source.schema.json"));
const sources = (readJson("json/sources.json") as { sources: unknown[] })
  .sources;
sources.forEach((s, i) => {
  if (!checkSource(s)) {
    failures.push(
      `json/sources.json sources[${i}] (${(s as { id?: string })?.id ?? "?"})\n` +
        format(checkSource.errors),
    );
  }
});

/* manifest.json: declared checksums must match the files on disk */
const manifest = readJson("json/manifest.json") as {
  files: Record<string, string>;
};
for (const [file, expect] of Object.entries(manifest.files)) {
  const actual = `sha256:${createHash("sha256")
    .update(readFileSync(`json/${file}`))
    .digest("hex")}`;
  if (actual !== expect)
    failures.push(`json/manifest.json: checksum mismatch for ${file}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"), "\n");
  process.exit(1);
}
console.log("json/ validates against schema/ ✓");
