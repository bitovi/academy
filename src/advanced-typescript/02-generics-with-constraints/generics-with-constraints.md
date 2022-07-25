@page advanced-typescript/generics-with-constraints Generics With Constraints
@parent advanced-typescript 2

@description Learn how to constrain generics to be able to reuse even more logic!

@body

## Overview

In the last lesson we saw how powerful generics can be allowing us to create resuable logic across multiple types. However, that’s just the beginning. TypeScript has all sorts of powerful feature we can leverage to make our logic more typesafe and more reusable. In this lesson we will take a look at constraining generics and how they can assist us in forcing our reusable logic to have certain characteristics while maintaining the typed flexibility of generics.

## Quick Recap on Generics

> For more information on generics, see [generics](../learn-typescript/generics) in the TypeScript course

Generics are a way to pass types into other types, much like how parameters are ways to pass values into functions. Like parameters, there can be any number of generics passed into new types and they can only be used in the context of the type they are passed into. To define a generic, angle brackets are used (`<>`). The order of the generics in the type declaration is what determines which type is assigned to the generic.

> **Note:** Generics can be named anything and often single letters `T` (short for Type), `U`, `V` … are used. For most generics `T`, `U`, `V` is often sufficient, however, to improve developer experiences, it is helpful to name the generics something semantically relevant like below.

```ts
type Response<ResponseData, ErrorType> = {
    success: boolean;
    code: number;
    data: ResponseData;
    error: ErrorType;
}

type CustomError = { /** Implementation Detail */ }
type User = { /** Implementation Detail */ }

type UserResponse<User, CustomError>
```

Generics are a great way to reuse strongly typed code and create powerful abstractions in your libraries and applications.

## With Constraints

Generics by themselves are a great way to encapsulate logic when we don’t really care what shape that type has. Take for example `Array`. Arrays are a list of things. It doesn’t matter what things are in it since when we do interact with items in an array we provide the logic to handle those items, making the array indifferent to what’s inside. Sometimes though, we do care about the shape of the thing being passed in or at least part of it. Take a `greeter` function, say we want it to greet something by name whether it be a bird, dog, person, cat, or pokemon. Reuse of logic across types screams generics. So what happens if we try to implement `greeter` using plain generics? Well, let's try.

```ts
function greeter<T>(thingToGreet: T): void {
  // Error: Property 'name' does not exist on type 'T'.
  console.log("Hello " + thingToGreet.name);
}
```

We get an error mentioning that `name` does not exist on type `T`. Which makes sense. `T` could be anything. It could be `number`, `string`, or an `Array<Array<Array<number>>>` all of which do not have a `name` property. In this case, we know we want whatever is being passed in to have a name property, but our declaration doesn’t allow for it. To remedy this we can add a constraint to the generic using the `extends` keyword in TypeScript.

```ts
type WithName = { name: string };

function greeter<T extends WithName>(thingToGreet: T): void {
  console.log("Hello, " + thingToGreet.name);
}

type Bird = {
  name: string;
  milesFlown: number;
};

type Pokemon = {
  name: string;
  moves: string[];
  level: number;
};

const bird: Bird = {
  name: "bird",
  milesFlow: 178,
};

const pikachu: Pokemon = {
  name: "Pikachu",
  level: 22,
  moves: ["tackle", "thunder", "quick attack"],
};

greeter(bird); // Hello bird
greeter(pikachu); // Hello Pikachu
greeter({ name: "world" }); // Hello world
```

> **Note:** In this example we have extended a previously defined type. However, you can also declare the type inline to achieve the same effect.
>
> ```ts
> function greeter<T extends { name: string }>(thingToGreet: T): void {
>   console.log("Hello, " + thingToGreet.name);
> }
> ```

Going back to thinking of types as sets, we constrained the generic from the superset any to the subset `WithName`.

Since Generics themselves are types, you can also constrain your generics based on other generics. Imagine we have a bunch of different types of `Pokedex` from all the different regions, each of these can be represented by a type that resembles the following shape.

```ts
type KantoPokedex = {
  bulbasaur: PokedexEntry;
  ivysaur: PokedexEntry;
  venusauar: PokedexEntry;
  // etc...
};

type JohtoPokedex = {
  chikorita: PokedexEntry;
  bayleef: PokedexEntry;
  meganium: PokedexEntry;
  // etc...
};

// rest of regions...
```

We are tasked with building a function that gets the `PokedexEntry` for any Pokemon given the Pokedex and the Pokemon’s name. If we break it down we need two types, the first is the `Pokedex` type and the second is some type that ensures we pass a key from that `Pokedex`. We can achieve this by constraining the second generic in the function to extend the keys of the first.

```ts
function getPokemonEntry<Pokedex, PokemonName extends keyof Pokedex>(
  pokedex: Pokedex,
  pokemon: PokemonName
) {
  return pokedex[pokemon];
}
```

Moving into the upcoming lessons, constraining generics will be a common tool we reach for to leverage more of TypeScript’s powerful features.

## Exercises

### Exercise 1

Update the `Keys` type to act as a type alias for `keyof`. With this type, we don't want to allow `string`s, `number`s and `boolean`s to be passed
into the `Keys` type (`Keys<string>`, `Keys<number>`, etc. should not be allowed). So that the following is true

```ts
type LeafStarterPokemon = {
  bulbasaur: PokedexEntry;
  ivysaur: PokedexEntry;
  venusauar: PokedexEntry;
};

type LeafKeys = Keys<LeafStarters>; // is 'bulbasaur' | 'ivysaur' | 'venusauar' and
```

and

```ts
type FireStarterPokemon = {
  charmander: PokedexEntry;
  charmeleon: PokedexEntry;
  charizard: PokedexEntry;
};

type FireKeys = Keys<FireStarterPokemon>; // 'charmander' | 'charmeleon' | 'charizard'
```

and

```ts
const randomAttacks = {
  quickAttack: {
    /** */
  },
  thunder: {
    /** */
  },
};

type RandomAttacks = Keys<typeof randomAttacks>; // 'quickAttack' | 'thunder'
```

> **Note:** The above are examples using your Key type and should work for any similarly structured type

<details>
<summary>Hint for Exercise 1 (click to reveal)</summary> `keyof` should mainly be used on `object`s is there a way we can incorporate that into the type.
</details>

> Be sure to check your answers to Exercise 1 **Before** continuing on to Exercise 2

<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSACYwoNvkYTzO0BPDnAwAnCCiaIQUNPThMAvsoA0IAAwAmALT5yMcRjjaA7hFoALbTXILRaCI2MwAHtvUBGArQTIQN-kYkEAB6ACowgB1yAAIwmIBRFwMeOBgYj2i4rPiAVRQWOXTLdIADAGkYAThSmMEOOtIYzFpmuGa6oXS0KAg0drBSURjSrCrSMFKCGIB1cws6iwh2-pgVHJiTdJYKAHJWkzRGRuaoKFITEbtHXFK4FRHyAFcAWwAjAzvm8hYRt9JSLAjl9aE0PjF0HA0iwNo5QYsypVqrVVjEYgAKCpVOAAHmu5FwAD5Sg8sdUcc93gZiQ8YLQMNM4BZSE8oL9yKRWuCeuctiwAJTTADKTUschiuAgADcGBsSjFBmcLjdOsICOqchtStqfHKujEADIwNBgIW0NCieiiAAKpDGLwoMQAvDFgBsYm9WW9-mgnqJEDFbWM2C4EoxRAIANzu6XVX3-wN2mAhsO0CPR2LxGIy55wX0WgNB5OuVPpjaKDPZTOq9JGk1I9ouhs4uum82WgxwQkxEIhGK7T1Qb15v27GIAH37sZHojHk92OaeI4tuy12s11aOMMza9KuurqIAYhBRDAzRarUWHbEXW7qzEMBYLS8twZC0mU-Go-7H8-YLAKHfYMSy_Sss1_cQAC8LRYIDi1DUDyzAvUGmPU8G2dGJmzQs920vJNr27Xt-wgl8fgMOcSKfUQXn_GA9gnKiLQgaDRBYVdq21UoNzib5tyrXiuP3XibAUGJ7B-UgXgAQVoc1sEbV0AEcnggbBZPkrAA2ARQHksJ5yITHSKx4-JUQAJS3KSNMwLBFObVYJnEqyZLk2yu0jHs-12FS1KwGzsEo_YLAMthZ13UyYm7CIADlORgRAIhiAAVCxun-GVmlPGJXDQF4UFgdonPMdol0IFK0pGJEUX1JkWTZTYhiwBUhm-AQYjgCAXmgPpRCgdq7CeDBaD9ZMa0igAJOEA1GcZJg65lWV-F9HH6j10jK35HVKUg3iIGBhq-ZYEWytBNjQdqtgfI4YkcGhRBQIYikWcU4VFSrVgISLuwAIXSOBRpOR8DuagQWWGI44C2UQViaUoPDQWoIj-wZTySgJHFUgkYkdeEkhSZZ0g8N4chCaJolcR7LRrLDsRxZLuxdI5v0oZRFCAA" target="_blank">Open in CodeSandbox</a>

@sourceref ./exercise-01/ex-01.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-01/soln-01.ts

</details>

### Exercise 2

Now that we have a `Keys` type let's put it to work. Imagine we have the following types:

@sourceref ./types.ts

Below is a function called `getStarterPokemonInfomation` that
takes two generics. We would like to be able to pass in any of our three starters objects and a starter's name to get the
data for that pokemon. Update the generics definition in the function to allow for this to happen.

> **Before you Start**
> Don't worry about adding a return type to the function, focus only on the definition of the generics

```ts
type FireStarterPokemon = {
  charmander: PokedexEntry;
  charmeleon: PokedexEntry;
  charizard: PokedexEntry;
};

const fireStarters: FireStarterPokemon = {
  charmander:
    "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out",
  charmeleon:
    "Charmeleon, the Flame Pokémon and the evolved form of Charmander. Charmeleon knocks down opponents with its tail, then defeats them using razor-sharp claws.",
  charizard:
    "Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.",
};

const entry = getStarterPokemonInfomation(fireStarters, "charizard");

console.log(entry);
// 'Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.'
```

<details>
<summary>Hint for Exercise 2 (click to reveal)</summary>
our `Keys` type has a constraint to be satisfied, we need to make sure anything passed into `Keys` satisfies those constraints as well...
</details>

<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSACYwoNvkYTzO0BPDnAwAnCCiaIQUNPThMAvsoA0IAAwAmALT5yMcRjjaA7hFoALbTXILRaCI2MwAHtq0FaCZCBv1GSCCCHAAEANIwAnAAPAAqIa7-LHAhpABGRDAYtAB8IQC8IViRpGAhsQDcADrkNQD0AFQhAKIuBjxwMCGaNSENvU0AcqQmIZZyISZdFmgAbl1oIQAGEVFLY0JdsLQA5CkoAK60IeZjpJOkolgEIQBCMFAjJymLYAfctBAUIRhoULAsZb4WgAZVoaFE9FEAAVSMUALYUACS5DApHhci-5HW41oAzGaGKKVoJnOegMECMNwA6l1SQcoICoBBimcQmkFmlYGz0HAUo4QmhyAJUmVSAdRGMLKIYF0FBCoSl0plsi9yIDFvLIQY9iFyGh4V1aGSYMdLDB8Sw5K9LlKJig4TBEeQbgBVFBW-hSrrkwwpNiQcjmLEncjekJvD4h42C_5PNGSywQYnnGYoDgugb4vINBr3BNdATikJghW57MhAAiFB2x1JolEIrQaXFxzQLBYjlwgpCMtoErDwSN53NEfe2SxKgjpAwByV5CgIu-o4DjmD31K4d9lLgWbDTSWh68-KHIQAYhAZaXtTDHc6CiFgPifjNRBj1QZECFYcU2C5mowjbVPuIQvhChqwBQX4_jAf4AbQQHPhgr4QAAXhCLDQY6cGAQIwF9CEij4f0IE2AoEaXjA16Kl-F5XuCN4wfehRPiBYFvkKbCiF-OxnqI6Lhp8honMcybspc5BTq8sjCWkA4vGaFhGhIooicSDhQDcSJeCEzJgHS4qMgk6onGUo5gDJdIGMOIS4OcrY7CoSGvhBMBQSEOwAMIuQ8bmSeGZ6Wd-cIAJf3px4YwLMpBQPMgIJvCqneeBnEGDcyVvr53xYOQM5YP6IxhqQ6YUAwOlmJYakEtAU7mmGAYwHIxJKYlc5dr2aCoZc2hwK-KA_LIJhwAQjnORCaEYTx2kpGY5C4Ckvxhr8DYikmKTQgA8mEIUALIbYMA2kJ0bJCrGnz9mwqkACwqAAbOo6gRrKtBaccXIjEqRwUTKgrHPMjYhBYEC4BYYxOhw9j9jKw2jSBih7gRZHHGVAOFMC1EGExyKouimIUAAFJA9EKgYcBTjsyHjehogsDsACU-JkTFhCPLg-MowIdMhHUdQedNkxdgtp3LQDa3fltu37Ydx0xqdfznQcl2bjd92PfppqveyjxDakX1Ewsf0GCKQMg2D8IQ3IErwCN-KHksCNNAAEo4tBfuKkorJEcA4psgNoC8PwUHYDiMGyHIhHAmJwJAsFTlMeqyoCMYYqycBW4KwpJnNIS8p0gIu-cntrBHUcx81R1dEj9guy8M0PJpBAEAMdQ1K4DqQmOUbfOjDFQlj5AomiGKfBQ0QY6IZMhIMBowDk-O9BHvefiWS8T05YZ6jPX7T4aNRc6xoF9gOi8k6IADa-qGgAusB8OUMoihAA" target="_blank">Open in CodeSandbox</a>

@sourceref ./exercise-02/ex-02.ts

<details>
<summary>Click to see the solution</summary>

@sourceref ./exercise-02/soln-02.ts

This type of problem in practice would probably not take two generics, it was set up this way to illustrate some of the ideas in the lesson. Can you think of some other ways to accomplish the same thing without a second generic?

<details>
<summary>One Example</summary>

@sourceref ./exercise-02/soln-02-with-one-generic.ts

</details>

</details>
