/* Dataset/src/index.ts — the public surface. Everything reachable from here is
   API. Everything else is internal and may move without a major bump. */

export {
  METRICS,
  METRIC_OF,
  bandOf,
  isDetached,
  midOf,
  type Band,
  type Episode,
  type EpisodeId,
  type Flag,
  type Metric,
  type MetricKey,
  type NoteRef,
  type Row,
  type WeekNoteParts,
} from "./model/index.ts";

/* barrels: FACTS, DEPLOYMENT, RATE, STUDENT_WEEKS, END, CASES, SUB-FACTS,
   Obs/Pt/Series, and the aggregate + projection helpers */
export * from "./data/data.ts";
export * from "./data/episodes/index.ts";
export * from "./data/population.ts";
export { SOURCES, SOURCES_BY_GROUP } from "./data/sources/index.ts";
export type { GroupId, Source, SourceGroup } from "./data/sources/types.ts";

export const DATA_VERSION = "0.1.0";
