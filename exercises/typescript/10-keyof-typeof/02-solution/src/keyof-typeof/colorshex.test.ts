import assert from 'node:assert/strict';

import { getColorValue, ColorsToHex } from "./colorshex";

describe("Keyof Typeof Exercise 2", () => {
  it("gets dino colors", () => {
    assert.equal(getColorValue("red"), ColorsToHex.red);
    assert.equal(getColorValue("green"), ColorsToHex.green);
    assert.equal(getColorValue("blue"), ColorsToHex.blue);
  });
});
