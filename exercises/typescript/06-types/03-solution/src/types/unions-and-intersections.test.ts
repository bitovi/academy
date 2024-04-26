import assert from "node:assert";
import { describe, it } from "node:test";
import { fighter, mage, thief, paladin, civilian } from "./character";
import { sushi, taco, curry, fusion } from "./food";

describe("unions and intersections tests", () => {
  it("characters.ts works as expected", function () {
    assert.ok(fighter.weapon === "Sword", "works");
    assert.ok(mage.weapon === "Staff", "works");
    assert.ok(thief.weapon === "Bow", "works");
    assert.ok(paladin.weapon === "Sword", "works");
    assert.ok(civilian.strength === 8, "works");
  });

  it("food.ts works as expected", function () {
    assert.ok(sushi.cuisine === "Japanese", "works");
    assert.ok(taco.cuisine === "Mexican", "works");
    assert.ok(curry.cuisine === "Indian", "works");
    assert.ok(fusion.cuisine === "Japanese", "works");
  });
});
