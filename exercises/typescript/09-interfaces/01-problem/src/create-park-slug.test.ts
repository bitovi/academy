import assert from "node:assert";
import { describe, it } from "node:test";
import type DinoPark from "./dino-park";
import createParkSlug from "./create-park-slug";

describe("Create Park Slug", () => {
  it("should return a slug", () => {
    const DinoPark: DinoPark = {
      name: "Fun Park",
      address: {
        street: "123 Park Lane",
        city: "Dino",
        state: "World",
        zip: "12345",
      },
    };
    const message = createParkSlug(DinoPark);
    assert.strictEqual(message, "Fun-Park", "message should be correct");
  });
});
