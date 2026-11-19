import type { Source } from "./types.ts";

/** Court decisions, parquet communiqués, IGPN/IGGN reports, press investigations.
 *  `label` is publisher + headline verbatim, never translated. */
export const LEGAL: readonly Source[] = [
  // src("legal-example", "legal", "Publisher — verbatim headline", "https://…", both("…", "…"), "2026-10-20"),
];
