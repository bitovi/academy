import TreeNode from "./tree";
import { describe, it } from "node:test";
import assert from 'node:assert/strict';

describe("Generics", () => {
  it("TreeNode can add numbers", () => {
    function numberComparison(v1: number, v2: number): number {
      return v1 - v2;
    }

    const root = new TreeNode<number>(100, numberComparison);

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

    const root = new TreeNode<string>("Jennifer", stringComparison);

    root.add("Alice");

    assert.equal(root.left?.value, "Alice", "Alice to the left of Jennifer");

    root.add("Tom");
    root.add("Matthew");

    assert.equal(root.right?.value, "Tom", "Tom to the right of Jennifer");
    assert.equal(root.right?.left?.value, "Matthew", "Matthew to the left of Tom");
  });
});
