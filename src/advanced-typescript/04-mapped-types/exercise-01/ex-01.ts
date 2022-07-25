/**
 * Exercise 1
 * Below is a generic type called `To<T,K>` that is currently set to `any`. Update the type to change all of the properties
 * on `T` **to** whatever is passed into `K`. Take the following `ToNumber` type for example, it serves as an alias for `To` where
 * `K` is `number`.
 *
 * ```ts
 * type ToNumber<T> = To<T, number>;
 * type Numberfied = ToNumber<{level: string; age: string;}> // {level: number; age: number}
 * ```
 */
type To<T, K> = any; // TODO: don't use any

const initialState = {
  name: "",
  emailAddress: "",
  age: 0,
};

type State = typeof initialState;
type StateValidation = To<State, boolean>;

const stateValidationSafe: StateValidation = {
  name: false,
  emailAddress: true,
  age: false,
};

// This should fail if the type is correct
const FAILURE_stateValidationTypeError: StateValidation = {
  name: 99, // Type 'number' is not assignable to type 'boolean'.ts(2322)
  emailAddress: "bob", // Type 'string' is not assignable to type 'boolean'.ts(2322)
  age: NaN, // Type 'number' is not assignable to type 'boolean'.ts(2322)
};
