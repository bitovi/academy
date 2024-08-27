function add(x: number, y: number) {
  return x + y;
}

add(1, "three");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
