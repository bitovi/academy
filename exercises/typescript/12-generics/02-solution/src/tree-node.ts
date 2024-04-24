interface Comparison<T> {
  (v1: T, v2: T): number;
}

class TreeNode<T> {
  value: T;
  compare: Comparison<T>;
  left?: TreeNode<T>;
  right?: TreeNode<T>;

  constructor(val: T, compare: Comparison<T>) {
    this.value = val;
    this.compare = compare;
  }

  add(val: T) {
    if (this.compare(this.value, val) >= 1) {
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
