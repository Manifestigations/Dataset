/* Public surface of the demographic layer. Imported by `../data.ts`. */

export * from "./ethnicity.ts";
export * from "./forces.ts";
export * from "./protesters.ts";
export * from "./types.ts";

import { SOURCES } from "../sources/index.ts";
import { DEMOGRAPHIC_GAPS } from "./ethnicity.ts";
import { FORCE_ROWS } from "./forces.ts";
import { PROTESTER_ROWS } from "./protesters.ts";

/* A row whose `source` is not in the catalogue cannot render its citation,
   so it does not merge. Same spirit as the duplicate-id guard in
   sources/index.ts — loud at build time, not silent at runtime. */
{
  const known = new Set(SOURCES.map((s) => s.id));
  for (const row of [...PROTESTER_ROWS, ...FORCE_ROWS]) {
    if (!known.has(row.source))
      throw new Error(
        `demographics: row "${row.id}" cites unknown source "${row.source}"`,
      );
  }
}

/** Everything on one side, for a composition panel. Rows are NOT summable and
 *  NOT a series: they are different populations on different dates. */
export const rowsFor = (side: "protesters" | "forces") =>
  side === "protesters" ? PROTESTER_ROWS : FORCE_ROWS;

export const gapsFor = (side: "protesters" | "forces") =>
  DEMOGRAPHIC_GAPS.filter((g) => g.side === side);
