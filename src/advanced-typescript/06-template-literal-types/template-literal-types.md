@page advanced-typescript/template-literal-types Template Literal Types
@parent advanced-typescript 6

@description Learn what template literal types are and how to empower them with unions, generics, conditional types, and `infer`!

@body

## Overview

Template literal types give us new ways to create types from string literals and string literal unions. In this section, we will see what they are, how to write them, and how they can be used to create new types with renamed keys.

## Template Literal Types

Template literal types allow us to combine string literals, just like how template literals in JavaScript allow us to combine strings. Like conditional types, the syntax for template literal types is identical to JavaScript’s and uses back ticks `` ` `` and `${}`.

```ts
type TemplateLiteralTypes = "Template Literal Types";

type ExampleOf = `Example of ${TemplateLiteralTypes}`; // "Example of Template Literal Types"
```

In its most basic form, it may not feel all that useful. That changes as we introduce unions into template literal types. When unions are passed into a template literal type, TypeScript will create a new union which applies the logic of the template literal type to each member of the original union. This feature allows us to create similar types with little overhead.

```ts
type PokemonNames = "bulbasaur" | "charmander" | "squirtle";

type PokemonEgg = `${PokemonNames}-egg`; // "bulbasaur-egg" | "charmander-egg" | ...
```

Like template literals in JavaScript, more than one type may also be used.

```ts
type ItemTypes = "regular" | "max";
type Items = "potion" | "revive";

type BagItems = `${ItemTypes} ${Items}`; //"regular potion" | "regular revive" | "max potion" | "max revive"
```

Template literal types can even be used together with generics, conditional types, and `infer`, allowing us to pull string literal types apart. Take the `PokemonEgg` example from above, since they all have a defined shape `<PokemonName>-egg` we can use that knowledge to create `PokemonNames` from `PokemonEgg`.

```ts
type FromEgg<S extends string> = S extends `${infer PokemonName}-egg`
  ? PokemonName
  : never;

type PokemonNamesFromEgg = FromEgg<PokemonEgg>; // "bulbasaur" | "ivysaur" | ...
```

## Renamed Keys

Back when we were looking at mapped types, the name of the key was always preserved; however, it’d be incredibly useful if there was a way we could rename some of the keys by adding some text to them. Luckily for us, there’s a way! We can leverage template literal types within a key mapping. Let’s look at an example. Let’s make a `Stateful` type that adds getters and setters for any of the properties of the type passed in. If we gave it `{name: string}` we’d want it to create `{name: string; setName: (newValue: string) => void; getName: () => string;`. Let’s start with adding a type that produces a “getter”.

```ts
type Getters<T> = {
  [OriginalKey in keyof T as `get${string &
    OriginalKey}`]: () => T[OriginalKey];
};
```

> `string & OriginalKey` is a way for us to tell TypeScript `OriginalKey` can be used in template literal types.

When we feed a type into this, everything looks decent, but there’s one big issue, the getter’s name doesn’t follow any sort of naming convention – it’s not camel-cased.

```ts
type Pokemon = {
  name: string;
  trainer: string;
  moves: string[];
  level: number;
};

/**
 * type PokemonGetters = {
 *   getname: () => string;
 *   getrainer: () => string;
 *   getmoves: () => string[]
 *   getlevel: () => number
 * }
 */
type PokemonGetters = Getters<Pokemon>;
```

This is such a common issue that TypeScript created four intrinsic types for string literal type manipulation to solve this problem.

1. `Uppercase<StringType>` – Converts each character in the string to the uppercase version.

2. `Lowercase<StringType>` – Converts each character in the string to the lowercase equivalent.

3. `Capitalize<StringType>` – Converts the first character in the string to an uppercase equivalent.

4. `Uncapitalize<StringType>` – Converts the first character in the string to a lowercase equivalent.

In our case, we want to capitalize our keys so they match the camel-casing convention.

```ts
type Getters<T> = {
  [OriginalKey in keyof T as `get${Capitalize<
    string & OriginalKey
  >}`]: () => T[OriginalKey];
};
```
@highlight 2, 4

We can do something similar for `Setters`.

```ts
type Setters<T> = {
  [OriginalKey in keyof T as `set${Capitalize<string & OriginalKey>}`]: (
    newValue: T[OriginalKey]
  ) => void;
};
```

Now, all we have to do is combine them.

```ts
type Stateful<T> = T & Getters<T> & Setters<T>;

/**
 * {
 *  name: string;
 *  trainer: string;
 *  moves: string[];
 *  level: number;
 *  getName: () => string;
 *  getTrainer: () => string;
 *  getMoves: () => string[];
 *  getLevel: () => number;
 *  setName: (newValue: string) => void;
 *  setTrainer: (newValue: string) => void;
 *  setMoves: (newValue: string[]) => void;
 *  setLevel: (newValue: number) => void;
 * }
 */
type StatefulPokemon = Stateful<Pokemon>;
```

Template literal types allow us to do a number of useful string literal manipulations. Being able to share string templates across different types keeps code clean and DRY. Remapping key names allows for intuitive type-based abstractions to help speed up the development process.

## Exercises

### Exercise 1

Given the following `Direction` type, use template literal types to create `Padding` and `Margin`, which should be a string literal union for all the diffent paddings and margins.

```ts
type Padding = "padding-top" | "padding-left"; // ...
type Margin = "margin-top" | "margin-left"; // ...
```

<a href="https://codesandbox.io/s/72i9li?file=/06-template-literal-types-ex-01.ts">Open in CodeSandbox</a>

@sourceref ./exercise-01/ex-01.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-01/soln-01.ts
@highlight 1, 3-4

</details>

### Exercise 2

Let’s create a type that reverses `Getter<T>`. `FromGetter<T>` should take an object type and create a new type from all keys starting
with `get`. The new type should have the key name be camel-cased and the type of the property should resolve to the `ReturnType` of
the getter if it is a function. If it is not a function, it should resolve to whatever it was.

```ts
type WithName = FromGetter<{ getName: () => string }>; // {name: string;}
type NonFunction = FromGetter<{ getObject: object }>; // {object: object;}
```

<a href="https://codesandbox.io/s/iy9vq9?file=/06-template-literal-types-ex-02.ts">Open in CodeSandbox</a>

@sourceref ./exercise-02/ex-02.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-02/soln-02.ts
@highlight 1-7

</details>
