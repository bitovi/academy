interface Comparison<T> {
  (v1: T, v2: T): number;
}

class TreeNode {
  value: any;
  compare: Comparison<any>;
  left?: TreeNode;
  right?: TreeNode;

  constructor(val, compare: Comparison<any>) {
    this.value = val;
    this.compare = compare;
  }

  add(val) {
    if (this.compare(this.value, val) >= 0) {
      if (this.left == null) {
        this.left = new TreeNode(val, this.compare);
      } else {
        this.left.add(val);
      }
    } else {
      if (this.right == null) {
        this.right = new TreeNode(val, this.compare);
      } else {
        this.right.add(val);
      }
    }
  }
}

export default TreeNode;
