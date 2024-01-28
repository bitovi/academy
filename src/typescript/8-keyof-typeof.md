@page learn-typescript/keyof-typeof Keyof and Typeof
@parent learn-typescript 8

@description Learn how to use `keyof` and `typeof` to create new types from types and objects!

@body

## Overview

In this part, we will:

- Learn how `keyof` works
- Learn how `typeof` works
- See how they can be used together

## Keyof

The `keyof` operators takes an object type and produces a union of its keys. Take for example the following type:

```ts
type Dino = {
  name: string;
  type: "herbivore" | "carnivore";
  age: number;
};
```

If we were to create a new type called `Dino` using `keyof` we would see `"name" | "type" | "age"`

```ts
type DinoKeys = keyof Dino; // "name" | "type" | "age"
```

If the type is declared using an index signature, the type of the index will be used

```ts
type ArraylikeDinos = { [index: number]: Dino };

type Keys = keyof ArraylikeDinos; // number
```

> **Note**: As you may remember from previously, TypeScript is a superset of JavaScript and has to conform to its rules. This can cause keyof to behave in a non-intuitive way in certain situations. Take the following:
>
> ```ts
> type VisitedParkMapping = { [parkName: string]: boolean };
> type M = keyof VisitedParkMapping;
> ```
>
> What is type `M`? Based on the previous, you may think `M` is `string`; however, its `string | number`. Huh? Where did that `number` come from? In JavaScript all object keys are turned into strings. This means that if we have the following object
>
> ```js
> const a = { 0: "hello", 1: "world" };
> ```
>
> Both `a[1]` and `a["1"]` evaluate to the same thing (`"world"`).

By itself, `keyof` may not seem all too interesting. However, it becomes powerful when used in tandem with other TypeScript features like Mapped Types and Generics which we will see in the future.

## Typeof

`typeof` is a way to create a type from a value. It can be used on values and properties of those values. `typeof` is useful for creating type queries and capturing types that aren’t strictly defined.

```ts
const tRex = {
  name: "tyrannosaurus rex",
  type: "carnivore",
  weightInKilograms: 7_000,
};

let stegosaurus: typeof tRex; // {name: string; type: string; weightInKilograms: number;}

type Dinosaur = typeof tRex; // {name: string; type: string; weightInKilograms: number;}
```

There are some shortcomings to this approach since its looking at a single value, and the type returned isn’t as specific as it could be. Take for example `type` and `weightInKilograms` if we were to define the `Dinosaur` type ourselves we would want to restrict and expand those properties into something like this:

```ts
interface Dinosaur {
  name: string;
  side: "carnivore" | "herbivore";
  weightInKilograms: number | "unknown";
}
```

`typeof` is often used in conjunction with `ReturnType`, a utility type (learn more about utility types: [learn-typescript/utility-types]) provided by TypeScript, as a way to type out the return of a function. Say for example we have a function defined somewhere and we need to give a type for a value that is returned from the function. We could achieve this using `ReturnType`

```ts
// Some function in a module
const createDinosaur = (): Carnivore | Herbivore => {
  // implementation details
  return dino;
};

// Some other module
type Dinosaur = ReturnType<typeof createDinosaur>;

const dinoFight = (dino1: Dinosaur, dino2: Dinosaur): Dinosaur => {
  /** implementation details */
};
```

> Don’t worry about the angle brackets right now (`<>`) those are how [learn-typescript/generics] are declared in TypeScript, we will go more indepth on those later. For now just think of it as us telling TypeScript that we want the return type of the thing in the brackets.

You might be thinking using `typeof` for something like this is overkill, instead, you could just jump into the module find the types and import them. While that might be true for this simple example, with more complex and generic return types it becomes more of a hassle. Additionally, the return type of a function may not be defined, opting to leverage TypeScript’s type inference like below.

```ts
const getDinoFacts = () => {
  return {
    name: "tyrannosaurus rex",
    size: { weight: { amount: 7_000, unit: "kg" } },
    info: [
      "Tyrannosaurus Rex means 'Tyrant Lizard'",
      "The largest T. Rex tooth found is 12 inches (30 cm) long",
    ],
  };
};

/**
 *{name: string, size: {weight: {amount: number; unit: string;}}, facts: string[]}
 */
type DinoFacts = ReturnType<typeof getDinoFacts>;
```

There are two `typeof`s to be aware of in TypeScript – the JavaScript one and the TypeScript one. The difference between them is the context in which they are used. If it is being used in an expression context, (used as a part of your code) it is the JavaScript `typeof` and will return a string with one of nine JavaScript types. And if it’s used in a type context (as part of your type declarations) it’s the TypeScript `typeof` and will refer to the type of whatever values follow it.

`typeof` cannot be called on everything; there are some restrictions. `typeof` can only be called on identifiers and any of their properties.

```ts
const dinosaur = { name: "velociraptor", type: "carnivore" };

type Dinosaur = typeof dinosaur; // {name: string; type: string;}
type DinotName = typeof dinosaur.name; // string

type DinoFacts = typeof getHothFacts(); // ERROR: Expression expected
```

Like `keyof`, `typeof` by itself may not seem interesting, but its utility lies when used in conjunction with other TypeScript features like `ReturnType` and even `keyof`.

## Keyof Typeof

`typeof` and `keyof` can be used together when you want to use `keyof` but only have a value to use rather than a concrete type.

```ts
const carnivore = {
  name: "velociraptor",
  type: "carnivore",
  weightInKilograms: 7_000,
};

type CarnivoreKeys = keyof typeof carnivore;

let carnivoreKey: CarnivoreKeys;

carnivoreKey = "name";
carnivoreKey = "Some value"; // ERROR: Type '"Some value"' is not assignable to type '"name" | "type" | "weightInKilograms"'
carnivoreKey = "type";
```

A strange, but the common occurrence of this is an enum (learn more about enums: [learn-typescript/types#enum]). Enums in TypeScript are types before the code is compiled and an object during execution. If we run into a situation where we want to get the keys of an enum, the only way to do so is to use `keyof` and `typeof` together

```ts
enum DinosaurColors {
  blue = "0x0000FF",
  green = "0x00FF00",
  red = "0xFF0000",
  purple = "0xA020F0",
  yellow = "0xFFFF00",
  white = "0xFFFFFF",
  black = "0x000000",
}

type DinosaurColorsKeys = keyof typeof DinosaurColors; // “blue” | “green” | “red” …
```

## Exercises

### Exercise 1

Update the `DinosaurFactObject` and `Dinosaur` type to gain type safety on the `getDinoFact` function. The function should, given a dinosaurs name (`velociraptor` or `t-rex`) and the `dinosaurFacts` object return the correct facts about the dinosaur.

> **NOTE:** Don’t worry about the `DinosaurFactObject[Dinosaur]` type in the return of the function signature. That’s called an index-signature which we will get into later on.

@sourceref ./8-exercise-1.ts
@codepen

### Verify Your Solution

✏️ Run the following to verify your solution:

```shell
npm run 5c-keyof-typeof-ex1
```

### The Solution

<details>
<summary>Click to see the solution</summary>

Update the `DinosaurFactObject` and `Dinosaur` type to gain type safety on the `getDinoFact` function

@sourceref ./8-solution-exercise-1.ts

Another way to achieve the same solution.

@highlight 6-27,32,37

```ts
export type DinosaurFactObject = typeof dinosaurFacts;

export type Dinosaur = keyof typeof dinosaurFacts;
```

@highlight 1,3



</details>

### Exercise 2

Update the `ColorsAsEasyReadName` type so that it represents the keys of the enum (eg `'red'`, `'blue'`, and `'green'`)and then add all the necessary types to the `getColorValue` function signature.

The `getColorValue` function should take a one of the easily readable names and return the hex string equivalent

@sourceref ./8-exercise-2.ts
@codepen

### Verify Your Solution

✏️ Run the following to verify your solution:

```shell
npm run 5d-keyof-typeof-ex2
```

### The Solution

<details>
<summary>Click to see the solution</summary>

Update the `ColorsAsEasyReadName` type so that it represents the keys of the enum (eg 'red', 'blue', and 'green')and then add all the necessary types to the `getColorValue` function signature.

@sourceref ./8-solution-exercise-2.ts

</details>

@highlight 16, 21
