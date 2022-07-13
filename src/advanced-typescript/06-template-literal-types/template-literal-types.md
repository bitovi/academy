@page advanced-typescript/template-literal-types Template Literal Types
@parent advanced-typescript 6

@description Learn how to create new types with template literal types!

@body

## Overview

Template literal types give us new ways to create types from string literals and string literal unions. in this section, we will see what they are, how to write them, and how they can be used to create new types with renamed keys.

## Template Literal Types

Template literal types allow us to combine string literals, just like how template literals in JavaScript allow us to combine strings. Like conditional types, the syntax for template literal types is identical to JavaScript’s and uses back ticks (\`) and `${}`.

```ts
type TemplateLiteralTypes = "Template Literal Types";

type ExampleOf = `Example of ${TemplateLiteralTypes}`; // "Example of Template Literal Types"
```

In its most basic form, it may not feel all that useful. That changes as we introduce unions into template literal types. When unions are passed into a template literal type TypeScript will create a new union which applies the logic of the template literal type to each member of the original union. This feature allows us to create similar types with little overhead.

```ts
type PokemonNames =
  | "bulbasaur"
  | "ivysaur"
  | "venusaur"
  | "charmander"
  | "charmeleon"
  | "charizard"
  | "squirtle"
  | "wartortle"
  | "blastoise";

type PokemonEgg = `${PokemonNames}-egg`; // "bulbasaur-egg" | "ivysaur-egg" | ...
```

Just like template literals in JavaScript, more than one type may be used as well.

```ts
type ItemTypes = "regular" | "max";
type Items = "potion" | "revive";

type BagItems = `${ItemTypes} ${Items}`; //"regular potion" | "regular revive" | "max potion" | "max revive"
```

Template literal types can even be used in conjunction with generics, conditional types, and infer, allowing us to pull string literal types apart. Take the `PokemonEgg` example from above, since they all have a defined shape `PokemonName-egg` we can use that knowledge to create `PokemonNames` from `PokemonEgg`.

```ts
type FromEgg<S extends string> = S extends `${infer PokemonName}-egg`
  ? PokemonName
  : never;

type PokemonNamesFromEgg = FromEgg<PokemonEgg>; // "bulbasaur" | "ivysaur" | ...
```

## Renamed Keys

Back when we were looking at mapped types, the name of the key was always preserved; however, it’d be incredibly useful if there was a way we could rename some of the keys by adding some text to them. Luckily for us, there’s a way! We can leverage template literal types within a key mapping. Let's look at an example. Let’s make a `Stateful` type that adds getters and setters for any of the properties of the type passed in. If we gave it `{name: string}` we’d want it to create `{name: string; setName: (newValue: string) => void; getName: () => string;`. Let's start with adding a type that produces a “getter”.

```ts
type Getters<T> = {
  [OriginalKey in keyof T as `get${string &
    OriginalKey}`]: () => T[OriginalKey];
};
```

> `string & OriginalKey` is a way for us to tell TypeScript `OriginalKey` can be used in template literal types.

When we feed a type into this, everything looks decent, but there’s one big issue, the getter’s name doesn’t follow any sort of naming convention – it's not camel-cased.

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
