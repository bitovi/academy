import assert from "node:assert/strict";

import { getColorValue, Colors } from "./colorshex";

describe("Keyof Typeof Exercise 2", () => {
  it("gets dino colors", () => {
    assert.equal(getColorValue("red"), Colors.red);
    assert.equal(getColorValue("green"), Colors.green);
    assert.equal(getColorValue("blue"), Colors.blue);
  });
});
