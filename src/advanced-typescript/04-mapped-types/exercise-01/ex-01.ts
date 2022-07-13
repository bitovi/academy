/**
 * Exercise 1
 * Below is a generic type called `To<T,K>` that is currently set to `any`. Update the type to change all of the properties
 * on `T` **To** whatever is passed into `K`. Take the following `ToNumber` type for example, it serves as an alias for `To` where
 * `K` is `number`.
 *
 * ```ts
 * type ToNumber<T> = To<T, number>;
 * type Numberfied = ToNumber<{name: string; age: string;}> // {name: number; age: number}
 * ```
 */
type To<T, K> = any;
