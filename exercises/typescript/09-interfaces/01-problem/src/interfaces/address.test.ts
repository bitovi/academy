import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type Address from "./address";

describe("Interfaces", () => {
  function checkAddress(address: Address) {
    var keys = Object.keys(address);
    assert.deepEqual(keys, ["street", "city", "state", "zip"]);
  }

  it("Address", () => {
    checkAddress({
      street: "123 Main",
      city: "Sandusky",
      state: "Ohio",
      zip: "12345",
    });
  });
});
