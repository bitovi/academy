import assert from "node:assert";
import { describe, it } from "node:test";
import type DinoPark from "./dino-park";
import type Address from "./address";

describe("Interfaces", () => {
  function checkAddress(address: Address) {
    var keys = Object.keys(address);
    assert.deepEqual(keys, ["street", "city", "state", "zip"]);
  }

  it("DinoPark", () => {
    function checkFullDinoPark(dinoPark: DinoPark) {
      var keys = Object.keys(dinoPark);
      assert.deepEqual(keys, ["name", "image", "address"], "has an image");
      checkAddress(dinoPark.address);
    }

    checkFullDinoPark({
      name: "Isla Sorna Park",
      image: "http://dino.com/pic.jpg",
      address: {
        street: "123 Main",
        city: "Sandusky",
        state: "Ohio",
        zip: "12345",
      },
    });

    function checkPartialDinoPark(dinoPark: DinoPark) {
      var keys = Object.keys(dinoPark);
      assert.deepEqual(keys, ["name", "address"], "optional image");
      checkAddress(dinoPark.address);
    }
    checkPartialDinoPark({
      name: "Isla Sorna Park",
      address: {
        street: "123 Main",
        city: "Sandusky",
        state: "Ohio",
        zip: "12345",
      },
    });
  });
});
