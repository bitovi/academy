import DinoKeeper from "./dino";
import assert from 'node:assert/strict';
import { describe, it } from "node:test";

describe("Classes: DinoKeeper", () => {
  it("basics work", () => {
    const dinoKeeper = new DinoKeeper("Joe");
    assert.equal(dinoKeeper.sayHi(), `Joe says “hi”`);
  });

  it("typing works", () => {
    const dinoKeeper = new DinoKeeper("Joe") as DinoKeeper;
    assert.equal(dinoKeeper.sayHi(), `Joe says “hi”`);
  });
});
