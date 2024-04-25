import { strict as assert } from "assert";

import { getColorValue, ColorsToHex } from "./keyof-typeof-colorshex";

describe("Keyof Typeof Exercise 2", () => {
  it("gets dino colors", () => {
    assert.equal(getColorValue("red"), ColorsToHex.red);
    assert.equal(getColorValue("green"), ColorsToHex.green);
    assert.equal(getColorValue("blue"), ColorsToHex.blue);
  });
});
