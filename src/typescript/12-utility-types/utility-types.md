@page learn-typescript/utility-types Utility Types
@parent learn-typescript 13
@outline 3

@description Use utility types provided by TypeScript.

@body

## Overview

In this section, you will:

- Make properties optional with `Partial<Type>`.
- Make properties required with `Required<Type>`.
- Set properties as immutable with `Readonly<Type>`.
- Remove nullability with `NonNullable<Type>`.
- Map keys to a type with `Record<Keys, Type>`.
- Select included subtypes with `Extract<Type, Union>`.
- Exclude values from a type with `Exclude<Type, ExcludedUnion>`.
- Include specific properties with `Pick<Type, Keys>`.
- Exclude specific properties with `Omit<Type, Keys>`.
- Get function return type with `ReturnType<Type>`.

## Objective 1: Property existence modifiers

### Using `Partial<Type>`

Converts all properties of a type to be optional.
This is useful when you want to create a type that is a subset of another, with no property being strictly required.

Partial is often used when you need to partially update an object.
See the example below:

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

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
  fieldsToUpdate: Partial<Dinosaur>,
): Dinosaur {
  return { ...dino, ...fieldsToUpdate };
}

const oldDino: Dinosaur = {
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};

const newDino: Dinosaur = updateDinosaur(oldDino, {
  diet: Diet.Omnivore,
});
```

@highlight 25, 35, only

In the code above, the second parameter for the function `updateDinosaur` is a partial `Dinosaur`.
This allows us to pass in a `Dinosaur` object with one or more of the key-value pairs, without having to pass in the entire `Dinosaur` object.

### Using `Required<Type>`

Converts all optional properties of a type to required, which is the opposite of `Partial`.
You might use it when you can initialize all the properties of an object and want to avoid checking for `null` or `undefined` for the optional properties.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

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
  // do something
}
```

@highlight 10, 13, 20, 26, only

In the code above, we are declaring `trex` to type `RequiredDinosaur`. This will help us skip the check if age is null step because it is a required property

### Using `Readonly<Type>`

Makes all properties in a type `readonly`, meaning that once an object is created, its properties cannot be modified.
Use it to prevent objects from being mutated.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

type NamableDinosaur = { name: string } & Dinosaur; // this is an intersection between { name: string } and Dinosaur. Think { name: string } + Dinosaur
type ReadOnlyDinosaur = Readonly<NamableDinosaur>;

// Meet Bruno, read-only dinosaur
const dino: ReadOnlyDinosaur = {
  name: "Bruno",
  age: 27,
  species: "Tyrannosaurus rex",
  diet: Diet.Carnivore,
};

// Today is its birthday! Let’s attempt to increase its age:
dino.age += 1;
// Oops! TypeScript error
```

@highlight 14, 17, 25, only

In the code above, we are declaring `dino` to type `ReadOnlyDinosaur`. This will prevent us from assigning a new value because it is a read-only object.

### Using `NonNullable<Type>`

Excludes `null` and `undefined` from the union of a type, ensuring that a type only contains “non-nullable” values.
Useful to prevent any run-time errors from occurring because we forgot to assign to a property.

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus" | null | undefined;

type NNSpecies = NonNullable<Species>;
// Could also be written as type NNSpecies = 'Tyrannosaurus rex' | 'Triceratops horridus'
```

@highlight 3

In the code above, `NNSpecies` will not allow `null` or `undefined`.

### Setup 1

✏️ Create **src/utilities/property-existence.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/01-problem/src/utilities/property-existence.ts

### Verify 1

✏️ Create **src/utilities/property-existence.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/01-problem/src/utilities/property-existence.test.ts

### Exercise 1

Update the `property-existence.ts` file so that:

- `UpdateablePerson` allows all properties to be optional
- `FullyDefinedPerson` ensures that all properties are defined
- `NonEditablePerson` won’t allow any update to a property

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/01-problem?file=src/utilities/property-existence.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/01-problem?file=src/utilities/property-existence.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/utilities/property-existence.ts** to be:

@diff ../../../exercises/typescript/12-utility-types/01-problem/src/utilities/property-existence.ts ../../../exercises/typescript/12-utility-types/01-solution/src/utilities/property-existence.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/01-solution?file=src/utilities/property-existence.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/01-solution?file=src/utilities/property-existence.ts).

</details>

## Objective 2: Construct an object type

### Using `Record<Keys, Type>`

Shortcut for defining an object where the keys are all one type and the values are all one type.

This is particularly useful when you have a type in which multiple keys share the same value `Type`, so you can avoid repeating the pattern `key: type;`

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

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

In the code above, `dinosCollection` is equivalent to:

```typescript
{
  [key: string]: Dinosaur
}
```

### Setup 2

✏️ Create **src/utilities/record.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/02-problem/src/utilities/record.ts

### Verify 2

✏️ Create **src/utilities/record.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/02-problem/src/utilities/record.test.ts

### Exercise 2

Update the `record.ts` file to create a new object type in which the keys are the IDs of the users and the values are the `User` type.

Currently, the `PersonMap` type is `unknown`.
Which utility type can we use here together with the `Person` type to create the appropriate `PersonMap` type?

Our `PersonMap` should look like this:

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

**Hint:** Remember to use the syntax `Person["id"]` to access the type of the `id` property directly from the `Person` interface.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/02-problem?file=src/utilities/record.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/02-problem?file=src/utilities/record.ts) to do this exercise in an online code editor.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/utilities/record.ts** to be:

@diff ../../../exercises/typescript/12-utility-types/02-problem/src/utilities/record.ts ../../../exercises/typescript/12-utility-types/02-solution/src/utilities/record.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/02-solution?file=src/utilities/record.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/02-solution?file=src/utilities/record.ts).

</details>

## Objective 3: Construct a new type by extracting from another type

### Using `Extract<Type, Union>`

Extracts from `Type` all types that are assignable to `Union`.
It effectively filters out types from `Type` that do not fit into `Union`.
This utility is particularly useful when you want to create a type based on a subset of another type’s possibilities that meet certain criteria.

Suppose you have a union type that represents various kinds of identifiers in your application:

```typescript
type ID = string | number | boolean;

type StringOrNumberID = Extract<ID, string | number>;
```

@highlight 3

In the code above, `StringOrNumberID` ends up being the union of `string` and `number`.

So why would you not simply write a union for `StringOrNumberID`?

`Extract` shines when used to find the intersection of two different types.
See this example:

```typescript
type Adult = {
  firstName: string;
  lastName: string;
  married: boolean;
  numberOfKids?: number;
};

type Kid = {
  firstName: string;
  lastName: string;
  interests: string[];
  pottyTrained: boolean;
};

type PersonKeys = Extract<keyof Kid, keyof Adult>;
//   ^? "firstName" | "lastName"
```

@highlight 15

In the code above, `PersonKeys` is the keys that both `Kid` and `Adult` have in common, which are `firstName` and `lastName`.

### Setup 3

✏️ Create **src/utilities/extract.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/03-problem/src/utilities/extract.ts

### Verify 3

✏️ Create **src/utilities/extract.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/03-problem/src/utilities/extract.test.ts

### Exercise 3

Update the `extract.ts` file to use the utility type `extract` on the existing Person type. Extract one of the two possible types from Person to create a new type, `Developer`.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/03-problem?file=src/utilities/extract.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/03-problem?file=src/utilities/extract.ts) to do this exercise in an online code editor.

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/utilities/extract.ts** to be:

@diff ../../../exercises/typescript/12-utility-types/03-problem/src/utilities/extract.ts ../../../exercises/typescript/12-utility-types/03-solution/src/utilities/extract.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/03-solution?file=src/utilities/extract.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/03-solution?file=src/utilities/extract.ts).

</details>

## Objective 4: Construct a new type by excluding types from another type

### Using `Exclude<Type, ExcludedUnion>`

Excludes from `Type` all types that are assignable to `ExcludedUnion`.
Useful if you want a subset of `Type`.

```typescript
type T1 = string | number | boolean;
type T2 = Exclude<T1, boolean>;

const value: T2 = "Hello"; // Works
```

@highlight 2

In the code above, `Exclude<T1, boolean>` removes `boolean` from `T1`, leaving `string` and `number`.

### Setup 4

✏️ Create **src/utilities/exclude.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/04-problem/src/utilities/exclude.ts

### Verify 4

✏️ Create **src/utilities/exclude.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/04-problem/src/utilities/exclude.test.ts

### Exercise 4

Update the `exclude.ts` file to create a new type, `FrontendDeveloper` that excludes the `backend` value from the team property. Build on the `Developer` type we previously created.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/04-problem?file=src/utilities/exclude.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/04-problem?file=src/utilities/exclude.ts) to do this exercise in an online code editor.

### Solution 4

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/utilities/exclude.ts** to be:

@diff ../../../exercises/typescript/12-utility-types/04-problem/src/utilities/exclude.ts ../../../exercises/typescript/12-utility-types/04-solution/src/utilities/exclude.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/04-solution?file=src/utilities/exclude.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/04-solution?file=src/utilities/exclude.ts).

</details>

## Objective 5: Include and exclude specific properties

### Using `Pick<Type, Keys>`

Creates a type by picking the set of properties `Keys` from `Type`.
Useful if you want a subset of `Type`.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

type LesserDinosaur = Pick<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  species: "Tyrannosaurus rex",
  age: 27,
};
```

@highlight 13, 16, 17, only

In the code above, if there is an attempt to add `diet` to `lesserDino` then TypeScript will throw an error.
Object literals may only specify known properties, and `diet` does not exist in type `LesserDinosaur`.

### Using `Omit<Type, Keys>`

Creates a type by omitting the set of properties `Keys` from `Type`.
Useful if you want a subset of `Type`.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

type LesserDinosaur = Omit<Dinosaur, "species" | "age">;

const lesserDino: LesserDinosaur = {
  diet: Diet.Carnivore,
};

lesserDino.species = "Tyrannosaurus rex";
```

@highlight 13, 16, 19, only

In the code above, if there is an attempt to add `species` to `lesserDino` then TypeScript will throw an error.
Property `species` does not exist on type `LesserDinosaur`.
Both `species` and `age` key properties are gone!

### Setup 5

✏️ Create **src/utilities/include-exclude-properties.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/05-problem/src/utilities/include-exclude-properties.ts

### Verify 5

✏️ Create **src/utilities/include-exclude-properties.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/12-utility-types/05-problem/src/utilities/include-exclude-properties.test.ts

### Exercise 5

Update the `include-exclude-properties.ts` file to expand on the implementation of `FrontendDeveloper` to create a new type, `AdminDeveloper` where the `role` property should be replaced by a `permissions` array.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/05-problem?file=src/utilities/include-exclude-properties.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/05-problem?file=src/utilities/include-exclude-properties.ts) to do this exercise in an online code editor.

### Solution 5

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/utilities/include-exclude-properties.ts** to be:

@diff ../../../exercises/typescript/12-utility-types/05-problem/src/utilities/include-exclude-properties.ts ../../../exercises/typescript/12-utility-types/05-solution/src/utilities/include-exclude-properties.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/05-solution?file=src/utilities/include-exclude-properties.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/12-utility-types/05-solution?file=src/utilities/include-exclude-properties.ts).

</details>

## Objective 6: Function utility types

### Using `ReturnType<Type>`

Gets the return type of a function `Type`.

```typescript
enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

declare function getDinosaur(): Dinosaur;

type D1 = ReturnType<typeof getDinosaur>;

type D2 = ReturnType<() => Dinosaur>;
```

@highlight 15, 17

In the code above, `D1` and `D2` are both types `Dinosaur`.

## Next steps

There are other built-in utility types:

- [`Parameters<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
- [`ConstructorParameters<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)
- [`InstanceType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
- [`ThisParameterType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype)
- [`OmitThisParameter<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype)
- [`ThisType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)
- Intrinsic string-manipulation types:
  - [`Uppercase<StringType>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [`Lowercase<StringType>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [`Capitalize<StringType>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
  - [`Uncapitalize<StringType>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)

If you would like to dive deeper into them, check the [official documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html) for TypeScript.
