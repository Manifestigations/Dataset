/* Dataset/scripts/build.ts — emit json/ + schema/, then validate.
   validate.ts has no exports: it executes on import and exits non-zero on
   failure, so it is imported dynamically once the artefacts exist. */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createGenerator } from "ts-json-schema-generator";
import * as data from "../src/index.ts";

/* one version, two files — fail rather than ship a mismatched manifest */
const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  version: string;
};
if (pkg.version !== data.DATA_VERSION)
  throw new Error(
    `package.json ${pkg.version} ≠ DATA_VERSION ${data.DATA_VERSION}`,
  );

mkdirSync("json", { recursive: true });
mkdirSync("schema", { recursive: true });

const bundle = {
  "episodes.json": data.EPISODES,
  "reference.json": { facts: data.FACTS, population: data.POPULATION },
  "sources.json": { sources: data.SOURCES },
};

for (const [name, value] of Object.entries(bundle))
  writeFileSync(`json/${name}`, JSON.stringify(value, null, 2) + "\n");

const files = Object.fromEntries(
  Object.keys(bundle).map((name) => [
    name,
    `sha256:${createHash("sha256")
      .update(readFileSync(`json/${name}`))
      .digest("hex")}`,
  ]),
);

writeFileSync(
  "json/manifest.json",
  JSON.stringify(
    {
      name: "@manifestigations/protest-data",
      version: data.DATA_VERSION,
      files,
    },
    null,
    2,
  ) + "\n",
);

for (const type of ["Episode", "Obs", "Source"] as const)
  writeFileSync(
    `schema/${type}.schema.json`,
    JSON.stringify(
      createGenerator({
        path: "src/index.ts",
        tsconfig: "tsconfig.build.json",
        type,
        expose: "all",
      }).createSchema(type),
      null,
      2,
    ) + "\n",
  );

await import("./validate.ts"); // exits 1 if json/ fails schema/
