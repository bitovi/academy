import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fighter, mage, thief, paladin, civilian } from "./character";

describe("Character tests", () => {
  it("works as expected", function () {
    assert.ok(fighter.weapon === "Sword", "works");
    assert.ok(mage.weapon === "Staff", "works");
    assert.ok(thief.weapon === "Bow", "works");
    assert.ok(paladin.weapon === "Sword", "works");
    assert.ok(civilian.strength === 8, "works");
  });
});
