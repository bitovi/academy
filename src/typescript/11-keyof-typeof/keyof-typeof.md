@page learn-typescript/keyof-typeof Keyof and Typeof
@parent learn-typescript 11
@outline 3

@description Learn how to use `keyof` and `typeof` to create new types from types and objects.

@body

## Overview

In this section, you will:

- Learn use the `keyof` operator.
- Learn use the `typeof` operator.
- See how the to use these two operators both independently and in conjunction.

## Objective 1: How to use keyof and typeof

### Keyof

The `keyof` operator takes an object type and produces a union of its keys. Take for example the following type:

```ts
type Dino = {
  name: string;
  type: "herbivore" | "carnivore";
  age: number;
};
```

If we were to create a new type called `Dino` using `keyof` we would see `"name" | "type" | "age"`.

```ts
type DinoKeys = keyof Dino; // "name" | "type" | "age"
```

If the type is declared using an index signature, the type of the index will be used.

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

By itself, `keyof` may not seem all too interesting. However, it becomes powerful when used in tandem with other TypeScript features like Generics which we will see in the future.

### Typeof

`typeof` is a way to create a type from a value. It can be used on values and properties of those values. `typeof` is useful for creating type queries and capturing types that aren’t strictly defined.

```ts
const tRex = {
  name: "tyrannosaurus rex",
  type: "carnivore",
  weightInKilograms: 7_000,
};

let stegosaurus: typeof tRex; 

type Dinosaur = typeof tRex; 
```
@highlight 7, 9

Thanks to the use of `typeof`, the variable `stegosaurus` and the type `Dinosaur` both now have the type:

```ts
`{name: string; type: string; weightInKilograms: number;}`
```

There are some shortcomings to this approach since it's looking at a single value, and the type returned isn’t as specific as it could be. Take for example `type` and `weightInKilograms`, if we were to define the `Dinosaur` type ourselves we would want to restrict and expand those properties into something like this:

```ts
interface Dinosaur {
  name: string;
  side: "carnivore" | "herbivore";
  weightInKilograms: number | "unknown";
}
```

The `typeof` is often used in conjunction with `ReturnType`, a utility type (learn more about utility types: [learn-typescript/utility-types]) provided by TypeScript, as a way to type out the return of a function. Say, for example, we have a function defined somewhere and we need to give a type for a value that is returned from the function. We could achieve this using `ReturnType`

```ts
const createDinosaur = (): Carnivore | Herbivore => {
  /** implementation details */
  return dino;
};

type Dinosaur = ReturnType<typeof createDinosaur>;

const dinoFight = (dino1: Dinosaur, dino2: Dinosaur): Dinosaur => {
  /** implementation details */
};
```

> Don’t worry about the angle brackets right now (`<>`) those are how [learn-typescript/generics] are declared in TypeScript, we will go more in depth on those later. For now just think of it as us telling TypeScript that we want the return type of the thing in the brackets.

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

type DinoFacts = ReturnType<typeof getDinoFacts>;
```
@highlight 12

For the example above, given the `typeof DinoFacts`, the `ReturnType` is now: 

```ts
`{name: string, size: {weight: {amount: number; unit: string;}}, facts: string[]}`
```

In TypeScript, you'll encounter two different usages of `typeof`—one from JavaScript and another specific to TypeScript. Understanding when and how each is used is crucial for effective type management and code clarity.

**JavaScript** `typeof`: This version of `typeof` is used within code expressions. When you apply `typeof` to a variable, TypeScript treats it as the JavaScript operator, returning a string that represents the variable’s primitive type.

For example, `typeof "hello"` results in `"string"`, and `typeof 42` results in `"number"`. This is consistent with JavaScript’s behavior, where typeof is typically used to determine the type of a runtime value.

**TypeScript** `typeof`: When `typeof` is used in a type context—specifically, in type declarations or annotations—it behaves differently. Here, `typeof` is used to capture and use the type of a variable rather than its value.

For instance, if you have `const x = "hello"`, using `type Y = typeof x` in TypeScript will set Y as the type `"string"`, effectively using the type of `x` rather than its value.

It’s important to note that typeof in TypeScript, particularly in type contexts, has its limitations. You can only use typeof on identifiers (such as variable names) and their properties. Attempting to use typeof on more complex expressions or certain values directly will not work as expected and can lead to errors.

```ts
const dinosaur = { name: "velociraptor", type: "carnivore" };

type Dinosaur = typeof dinosaur; 
type DinoName = typeof dinosaur.name; 

type DinoFacts = typeof getDinoFacts();
```
@highlight 6

So to review, the type `Dinosaur` will now have the `typeof dinosaur`: `{name: string; type: string;}`.

The type `DinoName` will have the `typeof dinosaur.name`. The `name` property of `dinosaur` has the type of `string`, thus `DinoName`'s type is `string`.

So what type will `DinoFacts` have? As mentioned before, `typeof` cannot be called on everything; the `getDinoFacts()` function is neither an identifier or property. As a result we get an error: `ERROR: Expression expected`.


### Setup 1

✏️ Create **keyof-typeof-dinofacts.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-keyof-typeof/01-problem/src/keyof-typeof/keyof-typeof-dinofacts.ts
@codepen

### Verify 1

✏️ Create **keyof-typeof-dinofacts.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-keyof-typeof/01-problem/src/keyof-typeof/keyof-typeof-dinofacts.test.ts
@codepen

```shell
npm run test
```

### Exercise 1

Update the `DinosaurFactObject` and `Dinosaur` type to gain type safety on the `getDinoFact` function. The function should, given a dinosaur's name (`velociraptor` or `t-rex`) and the `dinosaurFacts` object return the correct facts about the dinosaur.

- Replace `DinosaurFactObject`'s `any` with a type that represents the `dinosaurFacts`
- Replace `Dinosaur`'s `any` with a type that allows for any of the keys in the dinosaur fact object
- The `getDinofact` should, given a `facts` object and `dino` name, return the facts for that creature.
  
> **NOTE:** Don’t worry about the `DinosaurFactObject[Dinosaur]` type in the return of the function signature. That’s called an index-signature which we will get into later on.


### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update  **keyof-typeof-dinofacts.ts** to look like:

@diff ../../../exercises/typescript/11-keyof-typeof/01-problem/src/keyof-typeof/keyof-typeof-dinofacts.ts ../../../exercises/typescript/11-keyof-typeof/01-solution/src/keyof-typeof/keyof-typeof-dinofacts.ts
@highlight 6-27,32,37

</details>

## Objective 2: Use the `keyof` and `typeof` operators together

### Keyof and Typeof

The `keyof`, `typeof` operators independently may not seem interesting, but their utility lies when used in conjunction with each other. For example, we may want the `keyof` a value, such as the `carnivore` object below. The problem is the `keyof` operator only works on types; thankfully, the `typeof` operator is to grant us the type of `carnivore`.

```ts
const carnivore = {
  name: "velociraptor",
  type: "carnivore",
  weightInKilograms: 7_000,
};

type CarnivoreKeys = keyof typeof carnivore;

let carnivoreKey: CarnivoreKeys;

carnivoreKey = "name";
carnivoreKey = "Some value";
carnivoreKey = "type";
```
@highlight 12

Note that in the above example assigning `"Some value"` to `carnivoreKey` will generate an error: `ERROR: Type '"Some value"' is not assignable to type '"name" | "type" | "weightInKilograms"'`

A strange, but common occurrence of this is an (enum [learn-typescript/types#enum]). Enums in TypeScript are types before the code is compiled and an object during execution. If we run into a situation where we want to get the keys of an enum, the only way to do so is to use `keyof` and `typeof` together:

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

type DinosaurColorsKeys = keyof typeof DinosaurColors; 
```

in above, used in conjunction, `keyof` and `typeof` give `DinosaurColorKeys` the typing: 
`“blue” | “green” | “red” | "purple | "yellow" | "white" | "black"`

In this case, `keyof typeof` definitely saves a lot of effort.


### Setup 2

✏️ Create **keyof-typeof-colorshex.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-keyof-typeof/02-problem/src/keyof-typeof/keyof-typeof-colorshex.ts
@codepen

### Verify 2

✏️ Create **keyof-typeof-colorshex.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-keyof-typeof/02-problem/src/keyof-typeof/keyof-typeof-colorshex.test.ts
@codepen

```shell
npm run test
```

### Exercise 2

Update the `ColorsAsEasyReadName` type so that it represents the keys of the enum (eg `'red'`, `'blue'`, and `'green'`)and then add all the necessary types to the `getColorValue` function signature.

- The `getColorValue` function should take one of color names, or `ColorsAsEasyReadName` and return the hex string equivalent
- Replace `ColorAsEasyReadName`'s `any` with a type so that it represents the keys of the enum (eg 'red', 'blue', and 'green')
- Fix the TypeScript errors by updating `getColorValue`'s `ReturnType`. Replace the `any` with the proper type.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update  **keyof-typeof-colorshex.ts** to look like:

@diff ../../../exercises/typescript/11-keyof-typeof/02-problem/src/keyof-typeof/keyof-typeof-colorshex.ts ../../../exercises/typescript/11-keyof-typeof/02-solution/src/keyof-typeof/keyof-typeof-colorshex.ts
@highlight 6-27,32,37

</details>

## Next Steps

The next section will cover [generics](./generics.html), which are useful both maintainable and flexible TypeScript code.