@page advanced-typescript/index-accessed-types Index Accessed Types
@parent advanced-typescript 3

@description Learn how to look up types of properties with index accessed types!

@body

## Overview

There are many times we would like to forego defining a type and rather use some other type as a reference instead. Index accessed types is a TypeScript feature that allows us to do just that! In this section, we will look at index accessed types, how they work, how their defined, and towards the end, we will see a practical application of them!

## Index Accessed Types

Index accessed types are a way to look up types on other types. TypeScript uses square bracket notation (`[]`) to grab the desired type off of object types, much like how you can access a specific property from a JavaScript object using square brackets as well (`someObject["someKey"]`).

```ts
type Pokemon = {
  power: number;
  name: string;
  type: "fire" | "water" | "grass";
  ///...
};

type PokemonName = Pokemon["name"]; // string
type PokemonPower = Pokemon["power"]; // number
type PokemonTypes = Pokemon["type"]; // "fire" | "water" | "grass"
```

In the example above `'name'`, `'power'`, and `'type'` are not strings, but types (literal types). Index access types can only be used with types. Any value provided will produce an error.

```ts
const name = "name";
type PokemonNameFail = Pokemon[name]; // 'name' refers to a value, but is being used as a type here.
type PokemonNameWithTypeOf = Pokemon[typeof name]; // string;

type Name = "name";
type PokemonNameWithLiteralType = Pokemon[Name]; // string
```

If a type provided is not able to index a particular type TypeScript will provide an error.

```ts
type Pokemon = {
  power: number;
  name: string;
  type: "fire" | "water" | "grass";
  ///...
};

// ERROR: Property 'invalidKey' does not exist on type 'Pokemon'.
type InvalidExample1 = Pokemon["invalidKey"];

type GymLeader = {
  name: string;
  location: string;
  typeOfGym: "fire" | "water" | "earth";
};

// ERROR: Type 'GymLeader' cannot be used as an index type.
type InvalidExample2 = Pokemon[GymLeader];
```

### Multiple Types as Indices

When TypeScript sees more than one type being passed in it will create a union of the property types -- `keyof` and string unions illustrate this.

```ts
type PokemonTypeOrPower = Pokemon["power" | "type"]; // number | "fire" | "water" | "grass"

type PokemonPropertyValues = Pokemon[keyof Pokemon]; // string | number;
```

> It might be surprising to see that `Pokemon[keyof Pokemon]` is `string | number ` and not `string | number | "fire" | "water" | "grass"`. This happens because the value constraints of the string literal union do not have any impact on the newly formed type. The type `"fire" | "water" | "grass"` is a subset of `string` meaning any `string` provided to `string | number | "fire" | "water" | "grass"` will pass. TypeScript knows this and purposely omits the union for clarity.

Index access types are chainable, this allows us to access as deep a property as we would like simply by adding more brackets.

```ts
type PokemonMove = {
  name: string;
  description: string;
  pp: number;
};

type Pokemon = {
  power: number;
  name: string;
  type: "fire" | "water" | "grass";
  firstMove: PokemonMove;
};

type PokemonMoveName = Pokemon["firstMove"]["name"]; // string
```

### With Generics

Index accessed types also work with generics, lets's take a look at an example they may seem familiar if you did the exercises from the last section

```ts
function getStarterPokemonInfomation<Starters, Name extends keyof Starters>(
  starter: Starters,
  name: Name
) {
  return starter[name];
}
```

In this exercise we didn’t define the return type of this function; instead opting for TypeScript’s type inference to define it for us. If we were to define it the return type would be `Starters[Name]`. The reason this works is that we have constrained the `Name` generic to extend `keyof Starters`.

## Practical Indices

Index accessed types really shine when deriving types from other types. Imagine we’re building a game that uses some sort of restful service. The backend has done a wonderful job of building a consistent API that describes all entities in the following way.

<div style='width:100%;display:flex;justify-content:center;'>

<table style='width: 50%;'>
    <tr>
        <td><b>Action</b></td>
        <td><b>HTTP Method</b></td>
        <td><b>Path</b></td>
    </tr>
    <tr>
        <td>Get all</td>
        <td><pre>GET</pre></td>
        <td><pre>/&lt;entity&gt;</pre></td>
    </tr>
    <tr>
        <td>Get one</td>
        <td><pre>GET</pre></td>
        <td><pre>/&lt;entity&gt;/:id</pre></td>
    </tr>
    <tr>
        <td>Create</td>
        <td><pre>POST</pre></td>
        <td><pre>/&lt;entity&gt;</pre></td>
    </tr>
    <tr>
        <td>Update</td>
        <td><pre>PATCH</pre></td>
        <td><pre>/&lt;entity&gt;/:id</pre></td>
    </tr>
    <tr>
        <td>Delete</td>
        <td><pre>DELETE</pre></td>
        <td><pre>/&lt;entity&gt;/:id</pre></td>
    </tr>
</table>
</div>

Ideally, we’d like a generic factory to create requests for multiple crud-ish entities, like a `HatchedPokemon` or a `Trainer`, to reduce the duplicated logic in our code. One way we could accomplish this is by constraining the type of entity passed into our factory to some base `Entity` type that describes what all entities must have, in our case, this is an `id` value, and then having all the methods returned by the factory use the type of that `Entity`'s id.

```ts
type Entity = { id: number };
type Updatable<T extends Entity> = Partial<Omit<T, "id">>;

type Requests<T extends Entity> = {
  getOne: (id: number) => Promise<T>;
  getAll: () => Promise<Array<T>>;
  create: (partialEntity: Partial<T>) => Promise<T>;
  update: (id: number, updated: Updatable<T>) => Promise<T>;
  delete: (id: number) => Promise<void>;
};

function factory<T extends Entity>(path: string): Requests<T> {
  // Implementation detail
}
```

This works, but what would happen if, down the long development road, `id` is changed from a `number` to a `string` to conform to the `UUIDv4` standard? We’d have to change it on `Entity` and then on all of our request function types as well. It would be much easier if we just looked up the type of `id` off of the generic passed into the `Request` type.

> **Note:** Notice this is only possible because we have constrained `T` to extend `Entity` in the generic definition

```ts
type Requests<T extends Entity> = {
  getOne: (id: T["id"]) => Promise<T>;
  getAll: () => Promise<Array<T>>;
  create: (partialEntity: Partial<T>) => Promise<T>;
  update: (id: T["id"], updated: Updatable<T>) => Promise<T>;
  delete: (id: T["id"]) => Promise<void>;
};
```

Using index accessed types we have resolved this issue and any future issue like it down the road.

As we've seen, indexed access types are a powerful feature from TypeScript which helps our typing become more flexible and dynamic. Like generics, they will become a staple in our types as we progress through other TypeScript features.

## Exercises

### Exercise 1

Below is an array of Pokemon trainers and a `FavoritePokemon` type currently assigned to any.
Using the `pokemonTrainers` array replace the `any` with a type that has the same shape as `favoritePokemon` on the
trainers in the array.

<details>
<summary> Hint for Exercise 1 (click to reveal)</summary>
An array is just an object indexed with a number
</details>

@sourceref ./exercise-01/ex-01.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-01/soln-01.ts

</details>
