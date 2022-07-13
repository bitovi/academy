/**
 * Exercise 2:
 *
 * Let's recreate the `Pick` utility type. `_Pick` should take two generics, some object `T` and a string literal union that is
 * some subset of keys from `T` as `K`.
 *
 * ```ts
 * type Picked = _Pick<{ name: string; age: number }, "age">; // {age: number}
 * ```
 *
 * > Hint:
 * > You may need to update the definition of `K` to get this type to work properly
 */
type _Pick<T, K> = any;
