import { strict as assert } from "assert";
import { getDinoFact, dinosaurFacts } from "./keyof-typeof-dinofacts";

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
