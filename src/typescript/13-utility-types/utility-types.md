@page learn-typescript/utility-types Utility Types
@parent learn-typescript 13
@outline 3

@description Learn About the Utility Types provided by TypeScript

@body

## Overview

In this section, you will:

- Review popular utility types
- We are going to repeat the interface Dinosaur below throughout the examples.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
}
```

## Objective: Utility Types

### Partial&lt;Type&gt;

All properties of `Type`, but optional.
Partial is often used when you need to partially update an object. See the `example` below.

```typescript
type PartialDinosaur = Partial<Dinosaur>;

// PartialDinosaur is equivalent to:
interface YetPartialDinosaur {
  species?: string;
  diet?: Diet;
  age?: number;
}

// example
function updateDinosaur(
  dinosaur: Dinosaur,
  fieldsToUpdate: Partial<Dinosaur>
): Dinosaur {
  return { ...dino, ...fieldsToUpdate };
}

const oldDino: Dinosaur = {
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};
const newDino: Dinosaur = updateDinosaur(dino1, {
  diet: Diet.Omnivore,
});
```

### Required&lt;Type&gt;

All properties of `Type`, but required. For instance, you might use it when you are able to initialize all the properties of an object and want to avoid checking for null/undefined for the optional properties.

```typescript
type RequiredDinosaur = Required<Dinosaur>;

// RequiredDinosaur is equivalent to:
interface YetRequiredDinosaur extends Dinosaur {
  age: number; // turning age property to required
}

const trex: RequiredDinosaur = {
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
  age: 30,
};

if (trex.age > 30) {
  // there is no need to check if age is null because it is a required property
}
```

### Setup

✏️ Create **src/utility-types/utility-types.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/01-problem/src/utility-types.ts

### Verify

✏️ Create **src/utility-types/utility-types.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/01-problem/src/utility-types.test.ts

Run the following to verify your solution:

```shell
npm run test
```


### Exercise

Update the `utility-types.ts` in order to create a new `Tyrannosaurus` type that enforces diet property to be `Diet.Carnivore` and all `Dinosaur` properties are required. Remember to take advantage of Utility Types and use the existing `Dinosaur` Type when creating the new `Tyrannosaurus` Type.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-problem?file=src/utility-types.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-problem?file=src/utility-types.ts) to do this exercise in an online code editor.

### solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `utility-types.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/01-solution/src/utility-types.ts
@highlight 13

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-solution?file=src/utility-types.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-solution?file=src/utility-types.ts) to do this exercise in an online code editor.
</details>

### Readonly&lt;Type&gt;

All properties of `Type`, but they are readonly. Use it to prevent objects from being mutated.

```typescript
type NamableDinosaur = { name: string } & Dinosaur; // this is an intersection between { name: string } and Dinosaur. Think { name: string } + Dinosaur
type AnotherDinosaur = Readonly<NamableDinosaur>;

// Meet Bruno, another dinosaur
let dino: AnotherDinosaur = {
  name: "Bruno",
  age: 27,
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};
dino.age = 0;

// Today is its birthday! Let`s attempt to increase its age:
dino.age += 1;
// Cannot assign to 'age' because it is a read-only property.
// Oops! TypeScript error
```

### Record&lt;Keys, Type&gt;

Shortcut for defining properties keys and values. Particularly useful when you have a type in which multiple keys share the same value `Type`, so you can avoid repeating the pattern `key: type;`

```typescript
let dinosCollection: Record<string, Dinosaur> = {
  // Record<string, Dinosaur> is equivalent to { [key: string]: Dinosaur }
  // Could also be written as Record<'trex' | 'triceratops', Dinosaur>
  trex: {
    species: "Tyrannosaurus rex",
    diet: Diet.Carnivore,
  },
  triceratops: {
    species: "Triceratops horridus",
    diet: Diet.Herbivore,
  },
};
```

### Pick&lt;Type, Keys&gt;

Select only the properties defined in Keys. Useful if you want a subset of `Type`

```typescript
type LesserDinosaur = Pick<Dinosaur, "species" | "age">;

let lesserDino: LesserDinosaur = {
  species: "Tyrannosaurus rex",
  age: 27,
  // diet: Diet.Carnivore, <- if this line was present, then the error below would be thrown by typescript
  // Type '{ species: string; age: number; diet: Diet; }' is not assignable to type 'LesserDinosaur'.
  //  Object literal may only specify known properties, and 'diet' does not exist in type 'LesserDinosaur'.
};
```

### Omit&lt;Type, Keys&gt;

Selects all properties but the ones defined in Keys. Useful if you want a subset of `Type`

```typescript
type LesserDinosaur = Omit<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  diet: Diet.Carnivore,
};

lesserDino.species = "Tyrannosaurus rex";
// Property 'species' does not exist on type 'LesserDinosaur'.
// species and age properties are gone!
```

### Exclude&lt;Type, ExcludedUnion&gt;

Removes from `Type` if is assignable to `Union`. Useful if you want a subset of `Type`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Exclude<Species, "Triceratops horridus">; // SpeciesGone is Species minus Triceratops horridus

const dino: SpeciesGone = "Triceratops horridus";
// Type '"Triceratops horridus"' is not assignable to type '"Tyrannosaurus rex"'.
// Only rex remains now!
```

### Extract&lt;Type, Union&gt;

Extracts from `Type` if is assignable to `Union`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Extract<Species, "Triceratops horridus">; // in this case, equivalent to type SpeciesGone = 'Triceratops horridus'

const dino: SpeciesGone = "Triceratops horridus";
// Only triceratops remains now!

// we can also extract common keys between 2 Types
interface Mammal {
  species: string;
  diet: Diet;
  weight: number;
}

type CommonKeys = Extract<keyof Mammal, keyof Dinosaur>;
// which is equivalent to:
// type CommonKeys = keyof Mammal & keyof Dinosaur;
// or:
// type CommonKeys = 'species' | 'diet'
```

### NonNullable&lt;Type&gt;

Excludes `null` and `undefined` from `Type`. Prevent any runtime errors from occurring because we forgot to assign to a property.

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus" | null | undefined;

type NNSpecies = NonNullable<Species>;
// equivalent to type NNSpecies = 'Tyrannosaurus rex' | 'Triceratops horridus'
```

### ReturnType&lt;Type&gt;

Gets the type from the return type of a function `Type`

```typescript
declare function getDinosaur(): Dinosaur;

type D1 = ReturnType<typeof getDinosaur>;
// type D1 = Dinosaur

type D2 = ReturnType<() => Dinosaur>;
// type D2 = Dinosaur
```

### More on Utility Types

There are other built-in Utility Types:

- Parameters&lt;Type&gt;
- ConstructorParameters&lt;Type&gt;
- InstanceType&lt;Type&gt;
- ThisParameterType&lt;Type&gt;
- OmitThisParameter&lt;Type&gt;
- ThisType&lt;Type&gt;
- Intrinsic String Manipulation Types

  - Uppercase&lt;StringType&gt;
  - Lowercase&lt;StringType&gt;
  - Capitalize&lt;StringType&gt;
  - Uncapitalize&lt;StringType&gt;

If you would like to dive deeper into them, check the [official documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html "The TypeScript Handbook") for TypeScript.
