import assert from "node:assert";
import { describe, it } from "node:test";
import { jessica, tom, isLoading, inventory } from "./fix-errors";

describe("Fix Errors", () => {
  it("exports are correct", function () {
    assert.equal(isLoading, false, "isLoading");

    assert.deepEqual(inventory, ["tacos", "hamburgers"], "inventory");

    assert.equal(jessica, `Jessica is 30 years young.`, "jessica");

    assert.equal(tom, `Tom is 42 years young.`, "Tom");
  });
});
