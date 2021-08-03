@page learn-typescript/utility-types Utility Types
@parent learn-typescript 8

@description Learn the Utility Types Typescript provides for you

@body

## Overview

Utility Types are built-in helper types meant for common type transformations.

In this section you will see a small description for the most used Utility Types.

We are going to repeat the interface Dinosaur below throughout the examples.

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

## Partial&lt;Type&gt;

All properties of `Type`, but optional.
Partial is often used when you need to partially update an object. See `example` below.

```typescript
type AnotherDinosaur = Partial<Dinosaur>;

// AnotherDinosaur is equivalent to:
interface YetAnotherDinosaur {
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

## Required&lt;Type&gt;

All properties of `Type`, but required. For instance, you might use it when you are able to initialize all the properties of an object and want to avoid checking for null/undefined for the optional properties.

```typescript
type AnotherDinosaur = Required<Dinosaur>;

// AnotherDinosaur is equivalent to:
interface YetAnotherDinosaur extends Dinosaur {
  age: number; // turning age property to required
}
```

## Readonly&lt;Type&gt;

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
// Oops! Typescript error
```

## Record&lt;Keys,Type&gt;

Shortcut for defining properties keys and values. Particularly useful when you have a type in which multiple keys share the same value `Type`, so you could avoid repeating the pattern `key: type;`

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

## Pick&lt;Type, Keys&gt;

Selects only the properties defined in Keys. Useful if you want a subset of `Type`

```typescript
type LesserDinosaur = Pick<Dinosaur, "species" | "age">;

let lesserDino: LesserDinosaur = {
  species: "Tyranossaurus rex",
  age: 27,
  // diet: Diet.Carnivore, <- if this line was present, then the error below would be thrown by typescript
  // Type '{ species: string; age: number; diet: Diet; }' is not assignable to type 'LesserDinosaur'.
  //  Object literal may only specify known properties, and 'diet' does not exist in type 'LesserDinosaur'.
};
```

## Omit&lt;Type, Keys&gt;

Selects all properties but the ones defined in Keys. Useful if you want a subset of `Type`

```typescript
type LesserDinosaur = Omit<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  diet: Diet.Carnivore,
};

lesserDino.species = "Tyranossaurus rex";
// Property 'species' does not exist on type 'LesserDinosaur'.
// species and age properties are gone!
```

## Exclude&lt;Type, ExcludedUnion&gt;

Removes from `Type` if is assignable to `Union`. Useful if you want a subset of `Type`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Exclude<Species, "Triceratops horridus">; // SpeciesGone is Species minus Triceratops horridus

const dino: SpeciesGone = "Triceratops horridus";
// Type '"Triceratops horridus"' is not assignable to type '"Tyrannosaurus rex"'.
// Only rex remains now!
```

## Extract&lt;Type, Union&gt;

Extracts from `Type` if is assignable to `Union`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Extract<Species, "Triceratops horridus">; // in this case, equivalent to type SpeciesGone = "Triceratops horridus"

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
// type CommonKeys = "species" | "diet"
```

## NonNullable&lt;Type&gt;

Excludes `null` and `undefined` from `Type`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus" | null | undefined;

type NNSpecies = NonNullable<Species>;
// equivalent to type NNSpecies = "Tyrannosaurus rex" | "Triceratops horridus"
```

## ReturnType&lt;Type&gt;

Gets the type from the return type of a function `Type`

```typescript
declare function getDinosaur(): Dinosaur;

type D1 = ReturnType<typeof getDinosaur>;
// type D1 = Dinosaur

type D2 = ReturnType<() => Dinosaur>;
// type D2 = Dinosaur
```

## More on Utility Types

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

If you would like to dive deeper onto them, check the [official documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html "The Typescript Handbook") for TypeScript.
