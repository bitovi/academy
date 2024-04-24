import TreeNode from "./tree-node";

function stringComparison(v1: string, v2: string): number {
  if(v1 > v2) {
      return 1;
  } else {
      return -1;
  }
};

const root = new TreeNode<string>("Jennifer", stringComparison);