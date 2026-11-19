/** 178 sources across 16 groups. Totals are the parse output of the split from
 * sources.ts, whose own header comment ("158 sources, 13 groups") was stale on
 * both counts. Bump these only alongside the array they describe. */

import { BLOCKADES_SOURCES } from "./blockades.ts";
import { BLOQUONS_SOURCES } from "./bloquons.ts";
import { COMPARATIVE_SOURCES } from "./comparative.ts";
import { COST_SOURCES } from "./cost.ts";
import { CPE_SOURCES } from "./cpe.ts";
import { GJ_SOURCES } from "./gj.ts";
import { MAI68_SOURCES } from "./mai68.ts";
import { MEDIA_SOURCES } from "./media.ts";
import { NAHEL_SOURCES } from "./nahel.ts";
import { OFFICIAL_SOURCES } from "./official.ts";
import { OVERSEAS_SOURCES } from "./overseas.ts";
import { POLLS_SOURCES } from "./polls.ts";
import { PRESS_SOURCES } from "./press.ts";
import { REF2026_SOURCES } from "./ref2026.ts";
import { RETRAITES_SOURCES } from "./retraites.ts";
import { RN2024_SOURCES } from "./rn2024.ts";
import { STRIKES_SOURCES } from "./strikes.ts";
import type { GroupId, Source } from "./types.ts";

export const SOURCES: readonly Source[] = [
  ...BLOCKADES_SOURCES,
  ...BLOQUONS_SOURCES,
  ...COST_SOURCES,
  ...CPE_SOURCES,
  ...GJ_SOURCES,
  ...MAI68_SOURCES,
  ...NAHEL_SOURCES,
  ...COMPARATIVE_SOURCES,
  ...OFFICIAL_SOURCES,
  ...POLLS_SOURCES,
  ...OVERSEAS_SOURCES,
  ...PRESS_SOURCES,
  ...REF2026_SOURCES,
  ...RETRAITES_SOURCES,
  ...RN2024_SOURCES,
  ...STRIKES_SOURCES,
  ...MEDIA_SOURCES,
];

/* duplicate ids are a build error, not a runtime surprise */
{
  const seen = new Set<string>();
  for (const s of SOURCES) {
    if (seen.has(s.id))
      throw new Error(`sources.ts: duplicate source id "${s.id}"`);
    seen.add(s.id);
  }
}

/* ----- render */

/** ISO strings compare lexicographically; undated sources sort last, stably. */
function byPublicationDate(a: Source, b: Source): number {
  if (!a.date || !b.date) {
    if (a.date !== b.date) return a.date ? -1 : 1;
    return a.id.localeCompare(b.id);
  }
  return a.date !== b.date
    ? a.date < b.date
      ? -1
      : 1
    : (a.dateEnd ?? "").localeCompare(b.dateEnd ?? "") ||
        a.id.localeCompare(b.id);
}

/** Bucketed and sorted once: renderSources() re-runs on every locale change. */
export const SOURCES_BY_GROUP: ReadonlyMap<GroupId, readonly Source[]> =
  (() => {
    const buckets = new Map<GroupId, Source[]>();
    for (const s of SOURCES) {
      const bucket = buckets.get(s.group);
      if (bucket) bucket.push(s);
      else buckets.set(s.group, [s]);
    }
    for (const bucket of buckets.values()) bucket.sort(byPublicationDate);
    return buckets;
  })();

export * from "./groups.ts";
export * from "./types.ts";
