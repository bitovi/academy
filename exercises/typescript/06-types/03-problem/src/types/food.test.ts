import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sushi, taco, curry, fusion } from "./food";

describe("Food tests", () => {
  it("works as expected", function () {
    assert.ok(sushi.cuisine === "Japanese", "works");
    assert.ok(taco.cuisine === "Mexican", "works");
    assert.ok(curry.cuisine === "Indian", "works");
    assert.ok(fusion.cuisine === "Japanese", "works");
  });
});
