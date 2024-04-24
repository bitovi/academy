import TreeNode from "./tree-node";
import { describe, it } from "node:test";
import { strict as assert } from "assert";

describe("Generics", () => {
  it("TreeNode can add numbers", () => {
    function numberComparison(v1: number, v2: number) {
      return v1 - v2;
    }

    let root = new TreeNode<number>(100, numberComparison);

    root.add(50);

    assert.equal(root.left?.value, 50, "50 to the left of 100");

    root.add(150);
    root.add(125);

    assert.equal(root.right?.value, 150, "150 to the right of 100");
    assert.equal(root.right?.left?.value, 125, "125 to the left of 150");
  });

  it("TreeNode can specify string", () => {
    function stringComparison(v1: string, v2: string): number {
      if (v1 > v2) {
        return 1;
      } else {
        return -1;
      }
    }

    let root = new TreeNode<string>("Jennifer", stringComparison);

    root.add("Chasen");

    assert.equal(root.left?.value, "Chasen", "Chasen to the left of Jennifer");

    root.add("Tom");
    root.add("Matthew");

    assert.equal(root.right?.value, "Tom", "Tom to the right of Jennifer");
    assert.equal(
      root.right?.left?.value,
      "Matthew",
      "Matthew to the left of Tom"
    );
  });
});
