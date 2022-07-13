/**
 * Exercise 2
 *
 * Let's create a type that reverses `Getter<T>`. `FromGetter<T>` should take an object type and create a new type from all keys starting
 * with `get`. The new type should have the key name be camel-cased and the type of the property should resolve to the `ReturnType` of
 * the getter if its a function. If its not a function, it should resolve to whatever it was.
 *
 * ```ts
 * type WithName = FromGetter<{getName: () => string;}> // {name: string;}
 *
 * type NonFunction = FromGetter<{getObject: object;}> // {object: object;}
 * ```
 */
export type FromGetter<T> = any;
