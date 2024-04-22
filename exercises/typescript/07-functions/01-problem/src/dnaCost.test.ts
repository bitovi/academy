import assert from "node:assert";
import { describe, it } from "node:test";
import { dnaCost } from "./dnaCost";

describe("DNA Cost", () => {
  it("should return the cost", () => {
    let raptorDNA = "CGGCA";
    let cuttlefishDNA = "GATTACA";
    let viperDNA = "ATTAC";

    const cost = dnaCost(5000, raptorDNA, cuttlefishDNA, viperDNA);
    assert.strictEqual(cost, 5017, "Cost should be 5017");
  });
});
