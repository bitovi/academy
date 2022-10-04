@page advanced-typescript/mapped-types Mapped Types
@parent advanced-typescript 4

@description Learn how to create new types with mapped types!

@body

## Overview

Since their syntaxes are similar, before talking about mapped types we first will do a quick recap on using index signatures to define object types. Then we will look at what mapped types are and how to define them. Then we will explore some practical applications of mapped types and finally, we will take a look at some exercises where you will have the opportunity to build out some commonly used mapped types.

## Index Signatures

Index signatures are a way to define object types when you know the general shape of any object but nothing more specific than the key type and the value type. Let's imagine we have an object that looks something like this.

```js
const bag = {
  maxPotion: 2,
  maxRevive: 23,
  luckEgg: 5,
  thunderStone: 1,
  /// etc.
};
```

The general shape of this object is a key of type `string` and a value of type `number`. We could define a type with an index signature to match this general definition.

```ts
type Bag = {
  [itemName: string]: number;
};
```

An index signature consists of two parts:

1. The indexer – `[itemName: string]`

- Defines the type the keys are allowed to be

2. The property’s value type – `number`

- Defines the type of the property

One thing to be aware of with defining types using index signature is the value may or may **not** be there, but typescript makes it seem as though it's always present.

```ts
const bag: Bag = {
  maxPotion: 2,
};

bag.maxPotion; // Ts says its a number
bag.maxRevive; // Ts says its a number... but its not there...
```

With interfaces and other type definitions, you can add a ? to delineate the property is optional. This is not the case with types defined using index signatures. To achieve the optional type-safety with index signature type you can create a union with the value type and `undefined`.

```ts
type BagWithUndefinedUnion = {
  [itemName: string]: number | undefined;
};

const bag: BagWithUndefinedUnion = {
  maxPotion: 2,
};

bag.maxPotion; // Ts says its a number | undefined
bag.maxRevive; // Ts says its a number | undefined
```

### Requiring Certain Properties

Types defined using index signatures are great since they provide a lot of flexibility in what can be associated with the type but what if we wanted to require something to be there? In these situations, you can add those properties after the general key definition.

```ts
type BagWithRequiredValue = {
  [itemName: string]: number;
  pokeBall: number;
};

// ERROR: Property 'pokeBall' is missing in type '{ maxPotion: number; }' but required in type 'BagWithRequiredValue'.ts(2741)
const bagWithoutPokeball: BagWithRequiredValue = {
  maxPotion: 2,
};

// All good!
const bagWithPokeball: BagWithRequiredValue = {
  pokeBall: 1,
};
```

When defining required properties, the required properties cannot violate the index signature types. In the example above `pokeball: number` conforms to `[itemName: string]: number`; however, if we change pokeball to be of type `string` TypeScript doesn’t allow it, since it's a `string` indexing another `string`.

```ts
type BagWithRequiredValue = {
  [itemName: string]: number;

  // ERROR: Property 'pokeBall' of type 'string' is not assignable to 'string' index type 'number'.
  pokeBall: string;
};
```

The error above can be remedied by expanding the type for the value with a union.

```ts
type BagWithRequiredValue = {
  [itemName: string]: number | string;
  pokeBall: string; // All good!
};
```

### Multiple Indexers

It is possible to have more than one indexer and have different value types for indices. To understand these mechanics, we first have to talk about what can and can’t be the type inside an indexer. TypeScript does not allow us to index with anything; it only lets us index with three types `string`, `number`, and `symbol`.

> **Tip:** For objects to be keyed with a union or something besides these three try the `Record` utlity type!

<div style='text-align:center'>
	<img src="../../static/img/advanced-typescript/string-number-symbol.png" />
</div>

These three types have a strange relationship

- `number` is a proper subset of `string`
- `symbol` is a proper subset of `string`
- `number` and symbol are mutually exclusive

In order for TypeScript to provide type safety, it has to be able to differentiate between the keys passed in. If the indexer's values have the same types, it doesn’t matter.

```ts
type IndexerDifferentSameValue = {
  [itemString: string]: number;
  [itemNumber: number]: number;
};
```

In order to have more than one indexer with different types, the indexer’s types must be mutually exclusive (no overlap). This means the only way we can have more than one indexer with different value types is for one indexer to be of type `number` and the other to be of type `symbol`.

```ts
type NonMutuallyExclusiveIndexers = {
  [itemString: string]: number;
  [itemNumber: number]: string; // ERROR: 'number' index type 'string' is not assignable to 'string' index type 'number'.
};

type MutuallyExclusive = {
  [keyNumber: number]: number;
  [keySymbol: symbol]: string;
};
```

The idea of mutual exclusion extends to individual properties, in the type above we have a shape for all `number` and all `symbol` and if we tried to throw in all string we’d get errors. But, if we only define certain strings (like we did with required properties), TypeScript would be able to make the delineation and provide type safety.

```ts
type AllThree = {
  [keyNumber: number]: number;
  [keySymbol: symbol]: string;
  additionalProperty: boolean;
  empty: {};
};
```

### JavaScript Makes an Appearance

TypeScript is a superset of JavaScript and has to conform to its rules. This can cause some unexpected behavior when indexing with a `number`. An example of this is arrays. In JavaScript arrays are just objects indexed with `number`s; however, in JavaScript, all object keys are coerced to `string`s.

```js
const firstThreePokemon = ["Bulbasaur", "Ivysaur", "Venusaur"];

// Both are allowed
const bulbasaurWithNumber = firstThreePokemon[0];
const bulbasaurWithString = firstThreePokemon["0"];
```

This quirk extends to index signature types in TypeScript.

```ts
type PokemonNameList = {
  [index: number]: string;
};

// All three are valid and work the same
const firstThreePokemon: PokemonNameList = ["Bulbasaur", "Ivysaur", "Venusaur"];

const firstThreePokemonObjectNumberKeys: PokemonNameList = {
  0: "Bulbasaur",
  1: "Ivysaur",
  2: "Venusaur",
};

const firstThreePokemonObjectStringKeys: PokemonNameList = {
  "0": "Bulbasaur",
  "1": "Ivysaur",
  "2": "Venusaur",
};

// Both are allowed
const bulbasaurWithNumber = firstThreePokemon[0];
const bulbasaurWithString = firstThreePokemon["0"];
```

### Readonly Property Modifier

While the optional syntax (`?`) isn't supported on index signature types, the index signature syntax does allow for the `readonly` modifier. The `readonly` modifier marks a property as immutable on an object meaning it cannot be re-assigned once set. If we wanted to make our `PokemonNameList` type above unchangeable we could do it by putting the `readonly` modifier at the beginning of the declaration.

```ts
type ReadonlyPokemonNameList = {
  readonly [index: number]: string;
};

const firstThreePokemon: ReadonlyPokemonNameList = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
];

// ERROR: Index signature in type 'ReadonlyPokemonNameList' only permits reading.
firstThreePokemon[0] = "Pikachu";
```

This extends to any required property added to the type as well.

> **Note:** required propteries have access to all the syntaxes you are familiar with when defining object types with type and interface.

Sticking with our `PokemonNameList` example type, although it looks like an array and even uses the array syntax, it doesn’t have some of the more fundamental properties of an array, like `.length`.

```ts
// ERROR: Property 'length' does not exist on type 'ReadonlyPokemonNameList'
firstThreePokemon.length;
```

Often times in development we need to know the length of a list, but it's not something we want to allow developers to overwrite. To accomplish this we can tweak our definition to include a `readonly` required length property.

```ts
type ReadonlyPokemonNameList = {
  readonly [index: number]: string;
  readonly length: number;
};

const firstThreePokemon: ReadonlyPokemonNameList = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
];

const firstThreePokemonObject: ReadonlyPokemonNameList = {
  0: "Bulbasaur",
  1: "Ivysaur",
  2: "Venusaur",
  length: 3,
};

console.log(firstThreePokemon.length); // 3
```

> **Note:** In JavaScript the `firstThreePokemon` variable does have a `.length` property since it is an `Array`. TypeScript however, isn’t aware that its an array, instead it thinks its a `ReadOnlyPokemonList` which is why generally speaking you should avoid defining your arrays using an index signature. Instead you should use `Array<T>` or the shorthand `[]`.

## Mapped Types

Mapped types are another way to generate types in TypeScript. Mapped types are a way to iterate through each key of an object type to create new types for those keys. Mapped types are generic types that extend upon the index signature syntax. The best way to understand it is to see it in action. Let's take a look at a utility type that uses mapped types – `Partial<T>`.

```ts
type Pokemon = {
  name: string;
  moves: string[];
};

/**
 * type PartialPokemon {
 *  name?: string;
 *  moves?: string[]
 * }
 */
type ParitalPokemon = Parital<Pokemon>;
```

`Partial<T>` is a common utility type that maps over a type and makes all the properties in the type optional. Below is the definition of `Partial<T>`.

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

If the phrase `P in keyof T` seems to bear some resemblance to a JavaScript `for-in` loop, that’s good! We’re essentially doing the same thing but with types. What `Partial` does is iterate through each of the properties, make them optional, and assign them whatever types they had before. Getting rid of some of the additional TypeScript in the mapping and looking at a concrete example helps illustrate this.

If we look at `PartialPokemon` and get rid of the generics we could re-write this as such.

```ts
type PartialPokemon = {
  [P in keyof Pokemon]?: Pokemon[P];
};
```

Since we know what `keyof Pokemon` evaluates too, let's substitute that out.

```ts
type PartialPokemon = {
  [P in "name" | "moves"]?: Pokemon[P];
};
```

`P` serves as a variable for mapping and can be named anything, let's name it something more semantically relevant.

```ts
type PartialPokemon = {
  [KeyName in "name" | "moves"]?: Pokemon[KeyName];
};
```

If we iterate through the key names we get something that looks like this.

```ts
type ParitalPokemon = {
  name?: Pokemon["name"];
  moves?: Pokemon["moves"];
};
```

Evaluating the index accessed types then leaves us with our final type.

```ts
type ParitalPokemon = {
  name?: string;
  moves?: string[];
};
```

### Property Modifiers

We saw it a little bit when looking at `Partial` but mapped types give us the opportunity to change two things about the properties of the type we are creating – whether or not it's optional and whether or not it's immutable. Like types defined with an index signature, the properties of a mapped type can be made immutable by applying the `readonly` modifier. Using the `readonly` modifier in a mapped type is exactly how the `Readonly` utility type in typescript works.

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Additionally, we can remove a `readonly` modifier in a mapped type. To accomplish this we need a small tweak in our mapped syntax. Instead of `readonly`, we add `-readonly`, essentially subtracting off the `readonly` modifier.

```ts
type Changeable<T> = {
  -readonly [P in keyof T]: T[P];
};
```

In `Partial` we saw how we can create an optional property by adding the `?`. We can remove optionality the same way we remove the `readonly` modifier – with a `-?`. This is best illustrated by the `Required` utility type.

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

> **Note:** you can also add `+readonly` and `+?` to your types. They are default though so they are often omitted for brevity.

### Remapped Keys

TypeScript allows us to map over more than just the keys of the object. We can do this using a syntax very similar to type assertion (`as`). To illustrate this look at the following types.

```ts
type PokeballItem = {
  item: "pokeballs";
  type: "great" | "normal" | "ultra" | "master";
  amount: number;
};

type BerryItem = {
  item: "berries";
  type: "oran" | "sitrus" | "pecha";
  amount: number;
};

type TMItem = {
  item: "tms";
  name: string;
  amount: number;
};

type Items = PokeballItem | BerryItem | TMItem;
```

We’d like to make a bag type with properties on it matching the name of the item property on each of the `Items` and having that be a function to return the amount (so `bag.berries` is a function with this shape `() => number`). To do this we must do two things -- constrain the generic and remap via `as`.

```ts
type MakeBag<T extends { item: string; amount: number }> = {
  [Item in keyof T as T["item"]]: () => T["amount"];
};

/**
 * {
 *  berries: () => number;
 *  tms: () => number;
 *  pokeballs: () => number;
 * }
 */
type Bag = MakeBag<Items>;
```

### Let's Make our own!

So far we’ve seen some mapped types that TypeScript provides for us in its utility types, so let's walk through making our own. In this case, let’s look at creating a `Pokemon` class whose constructor takes the types of the Pokemon. So far in the examples leading up to this, the type property of a Pokemon has been defined as a union `"Normal" | "Fire" | ...`, but Pokemon can have more than one type, in fact, they can have up to two, like, in the case of Charizard – Fire and Flying. To create our class we want a single pokemon type (either a `PokemonType` or a `[PokemonType]`) or tuple that provides these options.

```ts
const pikachu = new Pokemon("Electric");
const charizard = new Pokemon(["Fire", "Flying"]);
const gyarados = new Pokemon(["Flying", "Water"]);
```

We may at first think something like this might work.

```ts
type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dark"
  | "Dragon"
  | "Steel"
  | "Fairy";

type PokemonTypes = [PokemonType] | [PokemonType, PokemonType];

class Pokemon<T extends PokemonType> {
  constructor(public types: T | PokemonTypes[T]) {}
}
```

However, this has a flaw, it allows us to have duplicate types such as `["Fire", "Fire"]`. In this case, we need a type that has the original pokemon type and the list of the rest of the pokemon types. To create this we can use a mapped type that uses `Exclude` within its iteration.

```ts
type PokemonTypes = {
  [T in PokemonType]: [T] | [T, Exclude<PokemonType, T>];
};
```

What this gives us is a type that has either a single pokemon type or a tuple with a single pokemon type and the rest of the pokemon types with the original pokemon type excluded.

```ts
type PokemonTypes = {
  Normal: ["Normal"] | ["Normal", "Fire" | "Water" | "Grass" | "Electric" | "Ice"  | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dark" | "Dragon" | "Steel" | "Fairy"]
  Fire: ["Fire"] | ["Fire", "Normal" | "Water" | "Grass" | "Electric" | "Ice"  | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dark" | "Dragon" | "Steel" | "Fairy"]]
  /// rest of pokemon types
}

```

Now we can use them in our class. Like we said above, we want to be able to pass any of the following.

```ts
const pikachu = new Pokemon("Electric");
const charizard = new Pokemon(["Fire", "Flying"]);
const gyarados = new Pokemon(["Flying", "Water"]);
```

To do this we can use a generic constrained to our `PokemonType` and an index accessed type to create our class definition.

```ts
class Pokemon<T extends PokemonType> {
  constructor(public types: T | PokemonTypes[T]) {}
}

const pikachu = new Pokemon("Electric");
const charizard = new Pokemon(["Fire", "Flying"]);
const gyarados = new Pokemon(["Flying", "Water"]);
```

As we’ve seen mapped types can do much of the heavy lifting when it comes to creating types from types. They power many utility types leveraged in applications. Moving forward, we will only see them more frequently, especially as we move into our next section – conditional types.

## Exercises

### Exercise 1

Below is a generic type called `To<T,K>` that is currently set to `any`. Update the type to change all of the properties on `T` **to** whatever is passed into `K`. Take the following `ToNumber` type for example, it serves as an alias for `To` where `K` is `number`.

```ts
type ToNumber<T> = To<T, number>;
type Numberfied = ToNumber<{ level: string; age: string }>; // {level: number; age: number}
```

<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSACYwoNvkYTzO0BPDnAwAnCCiaIQUNPThMAvsoA0IAAwAWALQBbNCg4ttg4dpgAPbeoCMBWgmQgajBlJAB6AFReAOuQACLwCAUQsYUR44GACbfyCAgCEYKFIAdwCIOAC0APxyCIgMANMYjDQoWBYAgAMAFVIAHjqVAGkAPhqSgAs5TOyMAFdRUTcoAQDo2hLSWrRyARqCAIBVFBY5GNpuraEt2Yxe8nwcyoDSMB6YlFFSDlFaXjh44Ipauq6fWlIfALTe-gANwi_QC6Dg0WqEEYsxqrSWATqaCwWx2ATApEq6WhuHepAAcoNdAAjCJdUro0iiAKWNC6FCwFSZabRUTA7JoDmBCoQTmU6n1Uhdf4RGAvWrw0E1chE0miJYvcU1ZUOcUUhqEkkRZrtAIAXkRTRaARlWtE7QA3Gq9gFNXLIDBqgaNbLtcBYMCoIhJrRxMcLTl8N6FH7cBbFLqPB4Au6YJ7vaa5QG8DAE67RIolcqXh5_OqjUyOvqcgsA1HEQB5AAiFe9LAoAHJpoNoiWBP5_C4FJlyBBHhUAMq0TbF4DxE101MBXwgGcqccwfTQACCLBYowh3pnc_HKe96nn5EUVvIeZtQ5HBtKFx7fd5UAv9BPFMfMAAajyNo83s6mq-mcSpCYjA8yWh23AUN2CibB-UAQF-EAUAOaBgFOr6wfBciIYEBpjoEE66FOYAVNEh4BDSS5QKu67wHA3q-oMMBkYGREkUx_jHuB5Z1N0WSTN0pCDFA1TEdAmSXNsuwcKCNAjDAGC0J2kHTAAYsuACSAAyKwAEohAA-tB9AYQhFB1HsIQjFS3roZ-WE_jG47kJO3oAJyuUy3E2g2iYRA2oLkKQ0ycnAEC4M5xKwDMJTeYBwHzA29hwAAFAATAAzKlqUAJQLpR1EbnR04gIBxJzgEXnSQ2IY4v5fGBcFEJhRFUXfDFVVxbACVJWlmU5buQa2mg-KedG5lVb5oh1dkDU5E14VoJF-ztTEDadSB5CJQ4vVZblR4niAyiKEAA" target="_blank">Open in CodeSandbox</a>

@sourceref ./exercise-01/ex-01.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-01/soln-01.ts

</details>

### Exercise 2

Exercise 2:

Let's recreate the `Pick` utility type. `_Pick` should take two generics, some object `T` and a string literal union that is
some subset of keys from `T` as `K`.

```ts
type _Pick<T, K> = any; // TODO

type Picked = _Pick<{ name: string; age: number }, "age">; // {age: number}
```

<details>
<summary> Hint for Exercise 2 (click to reveal)</summary>
You may need to update the definition of `K` to get this type to work properly
</details>

<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSACYwoNvkYTzO0BPDnAwAnCCiaIQUNPThMAvsoA0IAAwAWALQBbNCg4ttg4dpgAPbeoBMBWgmQgajBlJAB6AFReAOuQACLwCAUQsYUR44GACbRH8ghOCAGRhaAHI4ANEYMRg5GNoACxiAAwAFCGxSgIBXWmgIQQDTQgDSgH1K6oC4ItJaqBYWtCxCgHdSAPxyCKq4FV7SXRjSACMiXNp2gBUatHJhtF7acXJcAKgmiLQoOvIIChaiuQCIOCSlld7atejt0hgAJjARZMCiZa7fZZUoAaVKBCSn1KKIcn1aAS6VSwAB4dotYQA-AIAXgCBwEAG4Ah4PAEdgB5AAiDKRgWCGO6Y2GZKx2BxwAC5DQK0QJzOuGpeBgYvItV0awiAUUi18IGlasJ1NpAWA0tl8sVokUyJRbKCAWJAAkIIx4uzLQEAJoDAL6ARCmAwYa0Ka1FAsArPGJsSAPBpPQHteEtKb4bbFd4tISFKaTURYAIoCEcURQARJDz-DF83H4gJE0nk8hU_wgZSKIA" target="_blank">Open in CodeSandbox</a>

@sourceref ./exercise-02/ex-02.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-02/soln-02.ts

</details>
