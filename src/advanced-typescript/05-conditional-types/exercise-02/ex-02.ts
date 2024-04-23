/**
 Exercise 2
 *
 * Let’s build out an example similar to `ArrayElement` provided by the TypeScript documentation (No cheating by looking it up!)
 *
 * `Flatten` should create a new type that unnests arrays by one level.
 *
 * ```ts
 * type FlattenedStringArray = Flatten<string[]> // string
 * type FlatString = Flatten<string> // string
 *
 * type NestedNumberArray = Flatten<Array<Array<number>>> // number []
 * ```
 */
type Flatten<T> = any;

type FlattenedStringArray = Flatten<string[]>; // string
type FlatString = Flatten<string>; // string
type NestedNumberArray = Flatten<Array<Array<number>>>; // number []
