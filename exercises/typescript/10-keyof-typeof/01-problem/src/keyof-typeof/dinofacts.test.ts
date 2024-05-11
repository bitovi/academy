import assert from 'node:assert/strict';
import { describe, it } from "node:test";
import { getDinoFact, dinosaurFacts } from "./dinofacts";

describe("Keyof Typeof Exercise 1", () => {
  it("gets dino facts", () => {
    assert.deepEqual(
      getDinoFact(dinosaurFacts, "t-rex"),
      dinosaurFacts["t-rex"]
    );

    assert.deepEqual(
      getDinoFact(dinosaurFacts, "velociraptor"),
      dinosaurFacts.velociraptor
    );
  });
});
