@page learn-typescript/utility-types Utility Types
@parent learn-typescript 13
@outline 3

@description Learn about the utility types provided by TypeScript.

@body

## Overview

In this section, you will:

- Make properties optional with `Partial<Type>`
- Make properties required with `Required<Type>`
- Set properties as immutable with `Readonly<Type>`
- Remove nullability with `NonNullable<Type>`
- Map keys to a type with `Record<Keys, Type>`
- Select included subtypes with `Extract<Type, Union>`
- Exclude values from a type with `Exclude<Type, ExcludedUnion>`
- Include specific properties with `Pick<Type, Keys>`
- Exclude specific properties with `Omit<Type, Keys>`
- Get function return type with `ReturnType<Type>`

## Objective 1: Property existence modifiers

### Partial&lt;Type&gt;

All properties of `Type`, but optional. Partial is often used when you need to partially update an object. See the example below.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type PartialDinosaur = Partial<Dinosaur>;

// PartialDinosaur is equivalent to:
interface YetPartialDinosaur {
  species?: string;
  diet?: Diet;
  age?: number;
};

// example
function updateDinosaur(
  dinosaur: Dinosaur,
  fieldsToUpdate: Partial<Dinosaur>
): Dinosaur {
  return { ...dino, ...fieldsToUpdate };
};

const oldDino: Dinosaur = {
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};

const newDino: Dinosaur = updateDinosaur(dino1, {
  diet: Diet.Omnivore,
});
```
@highlight 25, 35, only

In the code above, the second parameter for the function `updateDinosaur` is partial `Dinosaur`. This allows us to pass in a `Dinosaur` object with one or more of the key-value pairs. 

### Required&lt;Type&gt;

All properties of `Type`, but required. For instance, you might use it when you can initialize all the properties of an object and want to avoid checking for null/undefined for the optional properties.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type RequiredDinosaur = Required<Dinosaur>;

// RequiredDinosaur is equivalent to:
interface YetRequiredDinosaur extends Dinosaur {
  age: number; // turning age property to required
};

const trex: RequiredDinosaur = {
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
  age: 30,
};

if (trex.age > 30) {
  // do something
};
```
@highlight  13, 20, 26, only

In the code above, we are declaring `trex` to type `RequiredDinosaur`. This will help us skip the check if age is null step because it is a required property

### Readonly&lt;Type&gt;

All properties of `Type`, but they are readonly. Use it to prevent objects from being mutated.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type NamableDinosaur = { name: string } & Dinosaur; // this is an intersection between { name: string } and Dinosaur. Think { name: string } + Dinosaur
type ReadOnlyDinosaur = Readonly<NamableDinosaur>;

// Meet Bruno, read-only dinosaur
const dino: ReadOnlyDinosaur = {
  name: "Bruno",
  age: 27,
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};

// Today is its birthday! Let`s attempt to increase its age:
dino.age += 1;
// Oops! TypeScript error
```
@highlight 14, 17, 25, only

In the code above, we are declaring `dino` to type `ReadOnlyDinosaur`. This will prevent us from assigning a new value because it is a read-only object.

### NonNullable&lt;Type&gt;

Excludes `null` and `undefined` from `Type`. Prevent any runtime errors from occurring because we forgot to assign to a property.

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus" | null | undefined;

type NNSpecies = NonNullable<Species>;
// Could also be written as type NNSpecies = 'Tyrannosaurus rex' | 'Triceratops horridus'
```
@highlight 3

In the code above, `NNSpecies` will not allow `null` or `undefined`.

### Setup 1

✏️ Create **src/utility-types/property-existence.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/01-problem/src/property-existence.ts

### Verify 1

✏️ Create **src/utility-types/property-existence.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/01-problem/src/property-existence.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 1

Update the `property-existence.ts` file so that:
 - `UpdateablePerson` allows all properties to be optional
 - `FullyDefinedPerson` ensures that all properties are defined
 - `NonEditablePerson` won't allow any update to a property

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-problem?file=src/property-existence.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-problem?file=src/property-existence.ts) to do this exercise in an online code editor.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update `property-existence.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/01-solution/src/property-existence.ts
@highlight 10, 12, 14, only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-solution?file=src/property-existence.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/01-solution?file=src/property-existence.ts).
</details>

## Objective 2: Record&lt;Keys, Type&gt;

Shortcut for defining properties keys and values. Particularly useful when you have a type in which multiple keys share the same value `Type`, so you can avoid repeating the pattern `key: type;`

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

const dinosCollection: Record<string, Dinosaur> = {
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
@highlight 13

In the code above, `dinosCollection` is equivalent to `{[key: string]: Dinosaur }`

### Setup 2

✏️ Create **src/utility-types/record.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/02-problem/src/record.ts

### Verify 2

✏️ Create **src/utility-types/record.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/02-problem/src/record.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 2

Update the `record.ts` file to create a new object type in which the keys are the IDs of the users and the values are the User type. Currently, the `PersonMap` type is `unknown`. Which utility type can we use here in conjunction with the Person type to create the appropriate PersonMap type?

Our PersonMap should look like this:

```typescript
const data: PersonMap = {
    1: {
        role: ...
        email: ...
        firstName: ...
        ...
    }
}
```

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/02-problem?file=src/record.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/02-problem?file=src/record.ts) to do this exercise in an online code editor.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update `record.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/02-solution/src/record.ts
@highlight 19, only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/02-solution?file=src/record.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/02-solution?file=src/record.ts).
</details>

## Objective 3: Extract&lt;Type, Union&gt;

Extracts from `Type` if is assignable to `Union`

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Extract<Species, "Triceratops horridus">; 

const dino: SpeciesGone = "Triceratops horridus";

interface Mammal {
  species: string;
  diet: Diet;
  weight: number;
};

type CommonKeys = Extract<keyof Mammal, keyof Dinosaur>;
// Could also be written as:
// type CommonKeys = keyof Mammal & keyof Dinosaur;
// or:
// type CommonKeys = 'species' | 'diet'
```
@highlight 8, 9, 15, 17, 20, 21, 25, only
In the code above, `SpeciesGone` will only have `Triceratops horridus`. This prevents `dino` to be assign `Tyrannosaurus rex`. 

We can also extract common keys between 2 Types like what is happening to `CommonKeys`. 

### Setup 3

✏️ Create **src/utility-types/extract.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/03-problem/src/extract.ts

### Verify 3

✏️ Create **src/utility-types/extract.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/03-problem/src/extract.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 3

Update the `extract.ts` file to use the utility type `extract` on the existing Person type. Extract one of the two possible types from Person to create a new type, Developer.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/03-problem?file=src/extract.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/03-problem?file=src/extract.ts) to do this exercise in an online code editor.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update `extract.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/03-solution/src/extract.ts
@highlight 19, only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/03-solution?file=src/extract.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/03-solution?file=src/extract.ts).
</details>

## Objective 4: Exclude&lt;Type, ExcludedUnion&gt;

Removes from `Type` if is assignable to `Union`. Useful if you want a subset of `Type`

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus";

type SpeciesGone = Exclude<Species, "Triceratops horridus">; 

const dino: SpeciesGone = "Triceratops horridus";
```
@highlight 3, 5

In the code above, `SpeciesGone` is `Species` minus `Triceratops horridus`. Type `Triceratops horridus` is not assignable to the variable `dino`.

### Setup 4

✏️ Create **src/utility-types/exclude.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/04-problem/src/exclude.ts

### Verify 4

✏️ Create **src/utility-types/exclude.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/04-problem/src/exclude.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 4

Update the `exclude.ts` file to create a new type, `FrontendDeveloper` that excludes the `backend` value from the team property. Build on the `Developer` type we previously created.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/04-problem?file=src/exclude.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/04-problem?file=src/exclude.ts) to do this exercise in an online code editor.

### Solution 4

<details>
<summary>Click to see the solution</summary>

✏️ Update `exclude.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/04-solution/src/exclude.ts
@highlight 21-23, only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/04-solution?file=src/exclude.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/04-solution?file=src/exclude.ts).
</details>

## Objective 5: Include and exclude specific properties

### Pick&lt;Type, Keys&gt;

Select only the properties defined in Keys. Useful if you want a subset of `Type`.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type LesserDinosaur = Pick<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  species: "Tyrannosaurus rex",
  age: 27,
};
```
@highlight 13, 16, 17, only

In the code above, if there is an attempt to add `diet` to `lesserDino` then TypeScript will throw an error. Object literal may only specify known properties, and `diet` does not exist in type `LesserDinosaur`.

### Omit&lt;Type, Keys&gt;

Selects all properties but the ones defined in Keys. Useful if you want a subset of `Type`

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

type LesserDinosaur = Omit<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  diet: Diet.Carnivore,
};

lesserDino.species = "Tyrannosaurus rex";
```
@highlight 13, 16, 19, only

In the code above, if there is an attempt to add `species` to `lesserDino` then TypeScript will throw an error. Property `species` do not exist on type `LesserDinosaur`.
Both `species` and `age` key properties are gone!

### Setup 5

✏️ Create **src/utility-types/include-exclude-properties.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/05-problem/src/include-exclude-properties.ts

### Verify 5

✏️ Create **src/utility-types/include-exclude-properties.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/13-utility-types/05-problem/src/include-exclude-properties.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 5

Update the `include-exclude-properties.ts` file to expand on the implementation of `FrontendDeveloper` to create a new type, `AdminDeveloper` where the `role` property should be replaced by a `permissions` array.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/05-problem?file=src/include-exclude-properties.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/05-problem?file=src/include-exclude-properties.ts) to do this exercise in an online code editor.

### Solution 5

<details>
<summary>Click to see the solution</summary>

✏️ Update `include-exclude-properties.ts` to the following:

@sourceref ../../../exercises/typescript/13-utility-types/05-solution/src/include-exclude-properties.ts
@highlight 25-27, only


<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/05-solution?file=src/include-exclude-properties.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/13-utility-types/05-solution?file=src/include-exclude-properties.ts).
</details>

## Objective 6: Function utility types

### ReturnType&lt;Type&gt;

Gets the type from the return type of a function `Type`

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
};

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number; // the question mark signals that this property is optional
};

declare function getDinosaur(): Dinosaur;

type D1 = ReturnType<typeof getDinosaur>;

type D2 = ReturnType<() => Dinosaur>;
```
@highlight 15, 17

In the code above, `D1` and `D2` are both types `Dinosaur`.

## Next steps

There are other built-in Utility Types:

- [Parameters&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
- [ConstructorParameters&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)
- [InstanceType&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
- [ThisParameterType&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype)
- [OmitThisParameter&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype)
- [ThisType&lt;Type&gt;](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)
- Intrinsic String Manipulation Types
  - [Uppercase&lt;StringType&gt;](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [Lowercase&lt;StringType&gt;](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [Capitalize&lt;StringType&gt;](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [Uncapitalize&lt;StringType&gt;](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)

If you would like to dive deeper into them, check the [official documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html) for TypeScript.
