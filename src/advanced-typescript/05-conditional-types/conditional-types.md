@page advanced-typescript/conditional-types Conditional Types
@parent advanced-typescript 5

@description Learn how to create new types to simplify functions and enforce type safety with conditional types!

@body

## Overview

In this section, we will take a look at `any` and `never` again, the roles they play within TypeScript’s type system, along with their impact when mixed in with other types. We will also look at conditional types, what they are, how they behave, and how they can make our function signatures simpler with little overhead by defining complex types. Finally, we will discuss another use of conditional types and introduce a new syntax – `infer` – which makes conditional types even more powerful.

## Top and Bottom Types

Within type systems there exists a top type and a bottom type. A top type contains all types, meaning any other type is assignable to it. A bottom type is assignable to nothing. Going back to thinking of types in TypeScript as sets, the top type would be a superset containing all the other types; the bottom type would be the empty set containing nothing. TypeScript has two top types – `any` and `unknown` and a single bottom type `never`.

We briefly touched on `any` and `never` in the introductory course. As a quick recap, any variable assigned type `any` essentially opts out of typing, as it can be anything. `unknown` is just like any but the only thing assignable to it is `any`.

```ts
let anything: any = 1;

anything = "hello world";
anything = {};
anything = [1, 2, 3];
anything = new Promise(() => {});
```

`never` is not assignable to anything. Two common cases when never shows up are a throwing function…

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

…and when TypeScript has exhausted all possible cases and determines a block of code won’t run:

```ts
function primaryColorsToHexMessage(primaryColor: "red" | "blue" | "yellow") {
  switch (primaryColor) {
    case "red":
      return primaryColor + " is 0xFF0000";
    case "blue":
      return primaryColor + " is 0x00FF00";
    case "yellow":
      return primaryColor + " is 0xFFFF00";
    default:
      primaryColor; // primaryColor is never here.
  }
}
```

`any` and `never` have unique impacts on the set operators we use to create types in TypeScript. When we union any type with `any` the resulting type will be `any` and if we union a type with `never` the resulting type will be whatever else is in the union.

```ts
type UnionWithAny = string | any; // any
type UnionWithNever = string | never; // string
```

Type intersections with `any` behave in a similar way – a type intersected with `any` is `any`. `never` has a different behavior though and a type intersected with `never` is `never`.

```ts
type IntersectionWithAny = string & any; // any
type IntersectionWithNever = string & never; // never
```

Unions with bottom types will be especially important for us moving forward as we talk about conditional types.

## Conditional Types

Conditional types act exactly as conditional statements do in programming – the output is based on whether or not an input satisfies a given condition. Conditional types allow us to define different types based on the type passed in as an input. The syntax for conditional types mimics that of a JavaScript ternary and the condition is specified just like a constraint on a generic.

```ts
type extends OtherThing ? TypeIfConditionIsMet : TypeIfConditionIsNotMet
```

One of the best ways to illustrate the utility of conditional typing is to see how it can help simplify overloaded functions. Take the `createBattle` function shown below.

```ts
type TrainerBattle = {
  challenger: string;
};

type WildPokemonBattle = {
  challengingPokemon: string;
};

type GymLeaderBattle = {
  gymLeader: string;
  rewards: object;
};

function createBattle(battle: "trainer-battle"): TrainerBattle;
function createBattle(battle: "wild-pokemon-battle"): WildPokemonBattle;
function createBattle(
  battle: "trainer-battle" | "wild-pokemon-battle"
): TrainerBattle | WildPokemonBattle {
  // Implementation detail
}

const trainer = createBattle("trainer-battle"); // Type is TrainerBattle
const wild = createBattle("wild-pokemon-battle"); // Type is WildPokemonBattle
```

The function overloads show we want the output type for the function to be based on the type put in. In this case, if `"trainer-battle"` is input, `TrainerBattle` should be the output; if `"wild-pokemon-battle"` is input, `WildPokemonBattle` should be output. We can use generics and conditional types to simplify this function signature.

```ts
type BattleTypes = "trainer-battle" | "wild-pokemon-battle";

type Battle<T extends BattleTypes> = T extends "wild-pokemon-battle"
  ? WildPokemonBattle
  : TrainerBattle;

function createBattle<T extends BattleTypes>(battle: T): Battle<T> {
  // Implementation detail
}

const trainer = createBattle("trainer-battle"); // Type is TrainerBattle
const wild = createBattle("wild-pokemon-battle"); // Type is WildPokemonBattle
```
@highlight 1,3-5,7-8, 

The magic here happens in the `Battle` conditional type. In `Battle` we look for whichever `BattleType` is passed in. If it’s `"wild-pokemon-battle"` we resolve to `WildPokemonBattle`, otherwise we resolve to `TrainerBattle`. Another cool feature of conditional types is that they are nestable. To demonstrate this, let’s take this battle situation a step further and make a couple of adjustments. Let’s add a third battle type.

```ts
type TrainerBattle = {
  challenger: string;
};

type WildPokemonBattle = {
  challengingPokemon: string;
};

type GymLeaderBattle = {
  gymLeader: string;
  rewards: object;
};

type BattleTypes =
  | "trainer-battle"
  | "wild-pokemon-battle"
  | "gym-leader-battle";
```

How then would we update our conditional type? Well, it turns out we can update the conditionals just like we would when we nest JavaScript ternaries.

```ts
type Battle<T extends _BattleTypes> = T extends "trainer-battle"
  ? TrainerBattle
  : T extends "wild-pokemon-battle"
  ? WildPokemonBattle
  : GymLeaderBattle;
```
@highlight 2-5

And just like that, we’ve added another possible battle without having to touch the createBattle function signature.

```ts
const trainer = createBattle("trainer-battle"); // Type is TrainerBattle
const wild = createBattle("wild-pokemon-battle"); // Type is WildPokemonBattle
const gym = createBattle("gym-leader-battle"); // Type is GymLeaderBattle
```

## Conditional Types With Unions

Conditional types shine when it comes to refining unions into more distilled types. When given a union, conditional types distribute the condition to each member of the union. One of the simplest applications of this is the `NonNullable<T>` utility type provided by TypeScript. `NonNullable` creates a new type by removing `null` and `undefined` from the type passed into it.

```ts
type MaybeStringOrNumber = string | number | undefined | null;

type StringOrNumber = NonNullable<MaybeStringOrNumber>; // string | number
```

Below is the definition of `NonNullable`.

```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

The definition may look complicated, but as we did with mapped types, let’s remove some of the noise and break it down bit by bit to see how this works. Let’s start by placing the union into `NonNullable` directly.

```ts
type StringOrNumber = NonNullable<string | number | undefined | null>;
```
@highlight 1

Since we passed in a union, TypeScript will distribute the `NonNullable` to each member of the union.

```ts
type StringOrNumber =
  | NonNullable<string>
  | NonNullable<number>
  | NonNullable<undefined>
  | NonNullable<null>;
```
@highlight 2-5

From here we can remove the generics and each of the `NonNullable` can be rewritten as a conditional.

```ts
type StringOrNumber =
  | (string extends null | undefined ? never : string)
  | (number extends null | undefined ? never : number)
  | (undefined extends null | undefined ? never : undefined)
  | (null extends null | undefined ? never : null);
```
@highlight 2-5

Each of these conditionals can then be evaluated.

```ts
type StringOrNumber = string | number | never | never;
```
@highlight 1

As we discovered in the first section, `never` doesn’t impact the results of the union and can be removed. Removing the `never`s from the union leaves us with our final result.

```ts
type StringOrNumber = string | number;
```
@highlight 1

The refinement aspects of conditional types become even stronger when used together with other TypeScript features we’ve seen so far. Let’s do a little more tweaking to our types from the `createBattle` example above and define a function called `emitBattleStart` that can take a battle name and a payload that corresponds to the properties in the named typed.

```ts
emitBattleStart("wild-pokemon-battle", { challengingPokemon: "onix" });
```

Before we start looking at the `emitBattle` function let’s make our types a little more functional. Instead of having `BattleTypes` separated from the rest of the battle types, we could use them as literals on our battle types to create a discriminating union.

```ts
type TrainerBattle = {
  battleType: "trainer-battle";
  challenger: string;
};

type WildPokemonBattle = {
  battleType: "wild-pokemon-battle";
  challengingPokemon: string;
};

type GymLeaderBattle = {
  battleType: "gym-leader-battle";
  gymLeader: string;
  rewards: object;
};

type PokemonBattles = TrainerBattle | WildPokemonBattle | GymLeaderBattle;
```

> If you’re curious about how this might impact the createBattle function types we defined previously, those could now be rewritten as…
>
> ```ts
> type Battle<T extends PokemonBattles["battleType"]> =
>   T extends "trainer-battle"
>     ? TrainerBattle
>     : T extends "wild-pokemon-battle"
>     ? WildPokemonBattle
>     : GymLeaderBattle;
>
> function createBattle<T extends PokemonBattles["battleType"]>(
>   battle: T
> ): Battle<T> {
>   // Implementation detail
> }
> ```
@highlight 1, 8

To create our `emitBattleStart` function let’s first start by getting the first parameter in place.

```ts
function emitBattleStart<BattleType extends PokemonBattles["battleType"]>(
  battleType: BattleType,
  battleInformation: BattleInfomation // ??? To be defined below
) {
  /** ... */
}
```

The next part is where it gets tricky. Somehow we need to get the correct object shape for the battle information. We can break it down like this. First, we need to select the member of the `PokemonBattles` union that corresponds to the `BattleType` from the first parameter of the function. Second, we need to remove the `battleType` key from that type. And finally, we need to map over the new keys, making sure they have the same values.

Starting with the first step, let’s find a way to select the correct member of the `PokemonBattles` union. We can accomplish this with our good friend conditional types. We can use generics to give our `BattleInformation` type access to the `PokemonBattles` union and the `BattleType` and inside it uses a conditional type to refine the union to being the battle type we’re after.

```ts
type BattleInformation<BattleType, Battle> = Battle extends {
  battleType: BattleType;
}
  ? Battle
  : never;
```

> If this looks a little complicated it helps to throw one of the `battleTypes` in there real quick to get a better feel for it.
>
> ```ts
> type WildBattleFromUnion = BattleInformation<
>   "wild-pokemon-battle",
>   PokemonBattles
> >;
> ```
>
> which inside the `BattleInformation` type looks like…
>
> ```ts
> TrainerBattle | WildPokemonBattle | GymLeaderBattle
>   extends {battleType: 'wild-pokemon-battle'} ? Battle : never
> ```

Next, we need a way to get rid of the `battleType` key from this new type. Luckily for us, TypeScript provides a utility type that does just that – `Exclude`. Exclude takes two unions and **excludes** the members of the second union from the first. As you might have guessed, `Exclude` uses conditional types under the hood to provide this functionality. For our case, we want to exclude `battleType` from the keys of the battle.

```ts
Exclude<keyof Battle, "battleType">;
```

Our final step is to map over these and reconstruct the type. To do this, let’s define a `FormatBattle` type that does this for us and pass our refined `Battle` type into it.

```ts
type FormatBattle<Battle> = {
  [FilteredKey in Exclude<keyof Battle, "battleType">]: Battle[FilteredKey];
};

type BattleInformation<BattleType, Battle> = Battle extends {
  battleType: BattleType;
}
  ? FormatBattle<Battle>
  : never;
```
@highlight 1-3, 8

With that, we have finished up our typing issues! Our function now has type-safety and we can use it as we desire.

```ts
function emitBattleStart<BattleType extends PokemonBattles["battleType"]>(
  battleType: BattleType,
  battleInformation: BattleInfomation<BattleType, PokemonBattles>
){ /** ... */}

emitBattleStart("wild-pokemon-battle", {challengingPokemon: 'onix'});
emitBattleStart("trainer-battle", {challenger: 'gary'})
emitBattleStart(
  "gym-leader-battle",
  {
    gymLeader: "Misty"
    rewards: {badge: 'Cascade Badge'}
  }
)
```
@highlight 3, 7-13

That said, we can take it a little bit further and add an alias and default to help make the typing a bit more semantic. It feels a little weird needing to pass in `PokemonBattles`, and the functionality of the type and how it’s used seem to differ a bit. One extra type we can resolve this. Let’s update `BattleInformation` to alias our conditional mapping and give a more semantically relevant name like `GetBattleInformation`.

```ts
type FormatBattle<Battle> = {
  [FilterKey in Exclude<keyof Battle, "battleType">]: Battle[FilterKey];
};

type GetBattleInformation<BattleType, Battle> = Battle extends {
  battleType: BattleType;
}
  ? FormatBattle<Battle>
  : never;

type BattleInformation<
  BattleType,
  Battles = PokemonBattles
> = GetBattleInformation<BattleType, Battles>;

function emitBattleStart<BattleType extends PokemonBattles["battleType"]>(
  battleType: BattleType,
  battleInformation: BattleInformation<BattleType>
) {
  //
}
```
@highlight 5-9, 13-14, 18 

## A New and Powerful Syntax

Another use case of conditional types is to give us access to types we wouldn’t normally have access to by allowing us to unwrap types. A greater example of this is an `ArrayElement` type which checks if the type is an array and if it is, uses index accessed types to grab the shape inside.

```ts
type ArrayElement<T> = T extends Array<any> ? T[number] : never;
```

This type of usage is so common that TypeScript added an `infer` keyword that allows us to define a new generic variable within the extends clause of a conditional type to be used in our different paths.

```ts
type ArrayElement<T> = T extends Array<infer ElementType> ? ElementType : never;
```
@highlight 1

`infer` powers many utility types in TypeScript like `ReturnType` and `Parameters`.

```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

Conditional type’s refinement makes it a powerful utility. We’ve seen how conditional types can be used to simplify function signatures and create robust types for complex functions. Conditional types and `infer` will play a big role in our last section: template literal types.

## Exercises

### Exercise 1

We used exclude in one of the examples in the content of this section.
Let’s take a moment to create the type ourselves. Exlude takes two generics
`T` and `U` and removes the memebers in `U` from `T`.

```ts
type WildPokemonBattle = {
  battleType: "wild-pokemon-battle";
  challengingPokemon: string;
};

type WildPokemonBattleNoBattleType = _Exclude<
  keyof WildPokemonBattle,
  "battleType"
>; // "challengingPokemon"
```

<a href="https://codesandbox.io/s/1gvoo5?file=/05-conditional-types-ex-01.ts">Open in CodeSandbox</a>

@sourceref ./exercise-01/ex-01.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-01/soln-01.ts
@highlight 1

</details>

### Exercise 2

Let’s build out an example similar to `ArrayElement` provided by the TypeScript documentation (No cheating by looking it up!)

`Flatten` should a new type that unnests arrays by one level.

```ts
type FlattenedStringArray = Flatten<string[]>; // string
type FlatString = Flatten<string>; // string

type NestedNumberArray = Flatten<Array<Array<number>>>; // number []
```

<a href="https://codesandbox.io/s/r5ch7w?file=/05-conditional-types-ex-02.ts">Open in CodeSandbox</a>

@sourceref ./exercise-02/ex-02.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-02/soln-02.ts
@highlight 1

</details>
