import assert from "node:assert";
import { describe, it } from "node:test";
import { createParkSlug } from "./create-park-slug";

describe("Interfaces", () => {
  it("createParkSlug", function () {
    let result = createParkSlug({
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
