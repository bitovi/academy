import { returnLast } from "./return-last";
import { describe, it } from "node:test";
import assert from 'node:assert/strict';

describe("Generics", () => {
  it("returns last element with a string", () => {
    const lastString = returnLast<string>(["A", "B", "C"]);

    assert.equal(typeof lastString, "string", "It returns a string");
  });
  it("returns last element with a number", () => {
    const lastNumber = returnLast<number>([1, 2, 3]);

    assert.equal(typeof lastNumber, "number", "It returns a string");
  });
});
