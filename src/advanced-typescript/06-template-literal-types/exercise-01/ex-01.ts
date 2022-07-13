/**
 * Exercise 1
 * Given the following `Direction` type, use template literal types to create `Padding` and `Margin`, which should be
 * a string literal union for all the diffent paddings and margins.
 *
 * ```ts
 * type Padding = "padding-top" | "padding-left" // ...
 * type Margin = "margin-top" | "margin-left" // ...
 * ```
 */
type Direction = "top" | "left" | "bottom" | "right";

type Padding = any;
type Margin = any;
