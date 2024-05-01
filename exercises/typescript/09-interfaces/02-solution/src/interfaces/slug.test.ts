import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createParkSlug } from "./slug";

describe("Interfaces", () => {
  it("createParkSlug", function () {
    const result = createParkSlug({
      name: "Isla Sorna Park",
      address: {
        street: "123 Main",
        city: "Sandusky",
        state: "Ohio",
        zip: "12345",
      },
    });
    assert.equal(result, "Isla-Sorna-Park", "slug works");
  });
});
