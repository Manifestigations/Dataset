import { costFailures } from "../src/data/costs-checks.ts";

const failures = costFailures();

if (failures.length) {
  console.error(
    `costs: ${failures.length} invariant failure(s)\n ${failures.join("\n ")}`,
  );
  process.exit(1);
}

console.log("costs: all invariants hold");
