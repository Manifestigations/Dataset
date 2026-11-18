/* Dataset/src/index.ts — the public surface. Everything reachable from here is
   API. Everything else is internal and may move without a major bump. */

export * from "./copy/index.ts";
export * from "./data/index.ts";
export * from "./model/index.ts";

export const DATA_VERSION = "0.1.0";
