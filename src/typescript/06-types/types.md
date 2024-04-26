@page learn-typescript/types Types
@parent learn-typescript 6
@outline 3

@description Learn how to declare types in TypeScript.

@body

## Overview

In this section, you will:

- Discover how to declare the various types used in TypeScript
- Discuss how types can be inferred
- Spot and correct basic type mistakes
- Show how to assert types
- Create a typed variable

## Objective 1: Fix basic type errors

Types explain what we can and can’t do with a value, take for example numbers and strings. In JavaScript, on strings, we have access to `.length`, on a number we do not. Types also determine what will happen when we apply operators to values. For example, for the `+` operator, what does the following do?

```javascript
console.log(a + b);
```

Some might say it adds `a` and `b` together, others that it concatenates `a` and `b`. Both are potentially right. To come to the correct answer, we need to know what `a` and `b` are. If `a` and `b` are numbers, the `+` will perform addition, if they are strings - concatenation. The difference between the two is their underlying types.

> **Note:** If you are familiar with JavaScript’s primitive types you may recognize some of the names coming up. The types `string` `boolean` and `number` should feel familiar. These types are the same in TypeScript as they are in JavaScript and are at times referred to as primitive types.

### Boolean

`boolean` is a type that can only be `true` or `false`.

```typescript
let isCarnivore: boolean = true;
let isHerbivore: boolean = false;
```

### Number

`number` is used for numbers. If you are familiar with other typed languages, like `c++` you may be familiar with specific number types like `unsigned int` and `float`. In JavaScript and TypeScript, there is only `number`.

```typescript
let teeth: number = 100;
let hex: number = 0xf00d;
```

### String

`string` is used for a collection of characters like words.

```typescript
let name: string = "Leoplurodon";
```

### Literals

In TypeScript, there is a subset within string, number, and boolean which allows us to refine the specificity of the type. These are called type literals. A string literal is a single string for example:

```typescript
type StringLiteralExample = "hello";
```

If we were to assign a variable to this `StringLiteralExample` type we declared, we would see the only value it can be is `"hello"`.

```typescript
let invalid: StringLiteralExample = "a"; 
let valid: StringLiteralExample = "hello";
```
@highlight 1

In this case, `invalid` will return return an error.

What we have done is restricted the string type to be only the single string `"hello"`. The same can be done with `number`s, and less helpfully, `boolean`s. Literals like this are very powerful when used in conjunction with type unions. Allowing us to expand our subset to include multiple values.

```typescript
type Dinos = "Stegosaurus" | "Triceratops" | "Velociraptor"; 
```

<div style='text-align:center'>
	<img src="../static/img/typescript/type-union-dino-example.png" />
</div>

> **Note:** In TypeScript projects and applications using unions like the one above is often used as a low-overhead version of [enums](#enum).

While we spent the time going over what a literal is. For the remainder of this section (and sections to come), we will not make the distinction between type literals and types since literals are types.

### Array

An `array` contains a list of properties, this list of properties can be typed.

```typescript
let numberList: number[] = [1, 2, 3];

let raptorNames: Array<string> = ["Blue", "Charlie", "Delta"];
```

`numberList` will only contain accept `numbers` into it's array variable, while `raptorNames` will only accept strings. If we wanted to be even more specific:

```typescript
type Dinos = "Stegosaurus" | "Triceratops" | "Velociraptor"; 

let raptors: Array<Dinos> = ["Steogosaurus", "Triceratops", "Delta"]
```

The `raptors` variable now only accepts what's provided by the string literal `Dinos`. 

But wait! There's something wrong with the array we've provided raptors, one of these things is not like the other. Since `Delta` isn't apart of the string literal provided we'll get the error: `Type '"Delta"' is not assignable to type 'Dinos'.`

### Object

Another basic JavaScript type, `objects`, can be used to more descriptively type a variable. 

```typescript
let user: { name: string; age: number } = { name: "Justin", age: 36 };
```

Later we will learn about [learn-typescript/interfaces], which are
a better way of describing `objects` because the description
can be reused.

### Setup 1

✏️ Create **fix-errors.ts** and update it to be:

@sourceref ../../../exercises/typescript/06-types/01-problem/src/types/fix-errors.ts

### Verify 1

Create **fix-errors.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/06-types/01-problem/src/types/fix-errors.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 1

In this exercise, we will learn to spot and correct basic type errors by
fixing the type errors.

- In **fix-errors.ts.** update values that have errors so they match the provided type.

### Solution 1

<details>
<summary>Solution</summary>

✏️ Update **fix-errors.ts** to look like:

@diff ../../../exercises/typescript/06-types/01-problem/src/types/fix-errors.ts ../../../exercises/typescript/06-types/01-solution/src/types/fix-errors.ts

</details>

## Objective 2: More types and typed variables

### Tuple

A `tuple` is typed array with pre-defined length. Each index is capable of having its own type.

```typescript
type Dinos = "Stegosaurus" | "Triceratops" | "Velociraptor"; 

let sillyList: [number, string, Dinos];

sillyList = [5, "boop", "Stegosaurus"]; 

sillyList = ["boop", "Stegosaurus", 5];
```

First we give `sillyList` the assignment `[5, "boop", "Stegosaurus"]`, based on the `tuple` we've provided `[number, string, Dinos]` it looks like we're following the typing rules, so there'll be no errors.

Then, we mutate `sillyList` to be `["boop", "Stegosaurus", 5]` everything's out of order, but we only get two type errors here. 

For `boop`: `Type 'string' is not assignable to type 'number'.` 
and for `5`: `Type 'number' is not assignable to type 'Dinos'.` 

Both of these make sense, and while we intended `Stegosaurus` to line up with its StringLiteral typing provided by `Dinos`, it still is a `string`.

### Intersections

There are many different ways to create new types from existing ones in TS. Intersections allow us to create a type containing all the properties of multiple types together. Put another way; Intersections combine multiple types into one. Let’s imagine we have the following types.

```ts
type Person = {
  name: string;
  age: number;
};

type AnimalTrainer = {
  level: "rookie" | "intermediate" | "advanced";
  animals: Array<Animals>;
};
```

However, we also need a `DinosaurCareTaker`. A `Dinosaur` caretaker is a `Person` **and** an `AnimalTrainer`. Intersections allow us to create a type from `Person` and `DinosaurCareTaker` using the `&` symbol.

```ts
/**
 * {
 *   name: string;
 *   age: number;
 *   level: "rookie" | "intermediate" | "advanced";
 *   animals: Array<Animals>;
 * }
 */
type DinosaurCareTaker = Person & AnimalTrainer;
```

`DinosaurCareTaker` looks good, but there is more to being a dinosaur caretaker than being a `Person` and an `AnimalTrainer`. Luckily, there can be more than one intersection in a type declaration, and we can add the specifics of `DinosaurCareTaker` in another intersection.

```ts
/**
 * {
 *   name: string;
 *   age: number;
 *   level: "rookie" | "intermediate" | "advanced";
 *   animals: Array<Animals>;
 *   dinosaurName: string;
 *   dinosaurType: "carnivore" | "herbivore";
 * }
 */
type DinosaurCareTaker = Person &
  AnimalTrainer & {
    dinosaurName: string;
    dinosaurType: "carnivore" | "herbivore";
  };
```

There are a couple of things to be aware of when using type intersections. One is that order doesn’t matter since the intersection operator (`&`) is associative. This means the following two types (`A` and `B`) are the same.

```ts
type A = A1 & A2;
type B = A2 & A1;
```

One catch with intersections is giving them types that can’t be reconciled together. For example, creating a type from the intersection of two string unions

```ts
type Union1 = "hello" | "world";
type Union2 = "person" | "animal";

type Intersection = Union1 & Union2;
```

…or trying to create a type from the intersection of two types that share a key name but the type of the key is different in both types

```ts
type Object1 = {
  name: string;
  age: number;
};

type Object2 = {
  description: string;
  age: string;
};

type Intersection = Object1 & Object2;
```
@highlight 3, 8

In this case, the shared key is `age`, while the differing types are `number` and `string`.
Both of these will appear to work, however, when used, the type of Intersection is never and an error reading something along the lines of

> Type 'X' is not assignable to type 'never'.ts(2322)

will appear. We will learn more about never below!

### Type unions

In the earlier sections, we saw how we could make unions from primitive type literals; however, unions extend beyond the primitives. This section will explore how type unions work with object types.

Type unions allow us to create a single type from two or more different types. Imagine we have the following.

```ts
type LandDinosaur = {
  name: string;
  distanceAbleToWalk: number;
  legLength: number;
};

type AirDinosaur = {
  name: string;
  distanceAbleToFly: number;
  wingLength: number;
};

type WaterDinosaur = {
  name: string;
  distanceAbleToSwim: number;
  finLength: number;
};
```

> Functions will be covered in the next section!

And we have to implement a `getTotalDistanceAbleToTravel` function that takes any number of dinosaurs and computes how far they could move. Given the current tools in our arsenal, we could create something along the lines of this:

```ts
function getTotalDistanceAbleToTravelOnLand(quadDino: LandDinosaur[]): number {
  return quadDino.reduce((total, dino) => total + dino.distanceAbleToWalk, 0);
}

function getTotalDistanceAbleToTravelInAir(wingDino: AirDinosaur[]): number {
  return wingDino.reduce((total, dino) => total + dino.distanceAbleToFly, 0);
}

function getTotalDistanceAbleToTravelInWater(
  waterDino: WaterDinosaur[]
): number {
  return waterDino.reduce((total, dino) => total + dino.distanceAbleToSwim, 0);
}
```

This works, but it’d be a pain to have to figure out which dinosaur we have and then select the correct function to use for that dinosaur group. It’d be nice if we could pass our dinosaurs to a single function and get the result we’re after.

Currently, our typing is the limitation stopping us from achieving this. This is where type unions can make a big impact in our code. Type unions use the `|` (pipe) operator to combine any number of different types and can be read as **or**. This allows us to create a Dinosaur type that is either a `LandDinosaur`, an `AirDinosaur`, or a `WaterDinosaur`.

```ts
type Dinosaur = AirDinosaur | WaterDinosaur | LandDinosaur;

function getTotalDistanceAbleToTravel(dinos: Dinosaur[]): number {
  // ...
}
```

This solves our function signature problem and allows us to pass any collection of dinosaurs to our function. However, this introduces two new problems.

### Object creation

The first problem comes when creating a dinosaur object. Union types simplify creating an object — we need to pass it keys from any of the types in the union. The only keys that are required are the ones that are shared across all types in the union. 

In our case, the only shared key across `LandDinosaur`, `AirDinosaur`, and `WaterDinosaur` is `name`; anything else is fair game to add as long as the keys are from the same type. 

This means we can get type-safe objects that don't make a lot of sense. Take, for example, this pterodactyl object.

```ts
const pterodactyl: Dinosaur = {
  name: "pterodactyl",
  distanceAbleToSwim: 500,
  distanceAbleToFly: 900,
  finLength: 60,
  wingLength: 10,
};
```

According to TypeScript, type-wise, it is correct, but it doesn’t really make a lot of sense since pterodactyls don’t have fins, and in the context of our types and the function we’re trying to write should only have a `distanceAbleToFly` property rather than an additional `distanceAbleToSwim`. 

A common solution is to update our types a little to give TypeScript a hint as to what keys can go with each other. We do this by providing a common key across all types and assigning them to a type literal. 

In our case, a string literal would provide the most semantic sense, so we will use that. Let’s add a type key to our three types and try to create the pterodactyl object again.

```ts
type LandDinosaur = {
  type: "land";
  name: string;
  distanceAbleToWalk: number;
  legLength: number;
};

type AirDinosaur = {
  type: "air";
  name: string;
  distanceAbleToFly: number;
  wingLength: number;
};

type WaterDinosaur = {
  type: "water";
  name: string;
  distanceAbleToSwim: number;
  finLength: number;
};

const pterodactyl: Dinosaur = {
  type: "air",
  name: "pterodactyl",
  distanceAbleToSwim: 500, // ERROR see below
  distanceAbleToFly: 900,
  finLength: 60,
};
```

We get an error that says:

> Type '{ type: "air"; name: string; distanceAbleToSwim: number; distanceAbleToFly: number; finLength: number; }' is not assignable to type 'Dinosaur'.
> Object literal may only specify known properties, but 'distanceAbleToSwim' does not exist in type 'AirDinosaur'. Did you mean to write 'distanceAbleToFly'?

This translates to, “you said it’d be an `AirDinosaur`, but you gave me some stuff, not on `AirDinosaur`". This solves our first problem of creating objects.

### Object use

The second problem with our solution comes with using our typed parameter in our function. Which looks like this (in case it slipped the mind)

```ts
type Dinosaur = AirDinosaur | WaterDinosaur | LandDinosaur;

function getTotalDistanceAbleToTravel(dinos: Dinosaur[]): number {
  return dinos.reduce((total, nextDino) => {
    /** ... */
  }, 0);
}
```

If we try to use nextDino, there will only be two properties available to us -- `name` and `type`. 

This is because TypeScript has no idea which type of dinosaur has been passed to it, so the only thing it can say exists on the object is the ones that are shared across all types comprising the union. In order for us to be able to use the distance and length properties of the different dinosaurs, we need to go through a process called type narrowing. 

Type narrowing allows us to move from a more general type (like `Dinosaur`) to a more specific type (like `AirDinosaur`). There are many ways for us to do this, one being a type literal unique to each type which, luckily for us, we have already implemented when solving the first issue.

To type narrow, we first check the type with an if or switch statement. Inside the context of that conditional typescript is able to discern which type the `nextDino` is!

```ts
function getTotalDistanceAbleToTravel(dinos: Dinosaur[]): number {
  return dinos.reduce((total, nextDino) => {
    if (nextDino.type === "air") {
      return total + nextDino.distanceAbleToFly;
    }

    if (nextDino.type === "water") {
      return total + nextDino.distanceAbleToSwim;
    }

    return total + nextDino.distanceAbleToWalk;
  }, 0);
}
```

> **Note:** notice that we never check for `nextDino.type` to be `land`. We don’t have to! TypeScript is smart enough to figure out that there are only three types land, water, and air and since we have checked for the first two (air and water) it knows if it gets through those conditionals the type is land.

### Enum

Enums allow the aliasing of names to a list of numeric values. Like most indexing, enums start their first member at 0.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let greenColor: Color = Color.Green;
```

Enums can have their first value manually set, or manually set all values

```typescript
enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
}
let feb = Month[2];

enum Month {
  January = 1,
  March = 3,
  May = 5,
}
let may = Month[5];
```

### Unknown

Unknown describes a variable where we may not know the type. Variables defined with the `unknown` type can later be narrowed to more specific types using `typeof` checks or comparisons.

Note that variables of type `unknown` have no accessible properties or functions.

```typescript
let value: unknown = 5;

value = "words";
value.length; // Will give "Object is of type unknown" error

// Will give "Type unknown is not assignable to type string" error
const value2: string = value;

// Check type using typeof
if (typeof value === "string") {
  // Can successfully narrow
  const stringValue: string = value;
  console.log("Length is", stringValue.length);
}
```

### Any

Any is useful when we want to opt-out of type checking. Using the `any` type will disable all compile-time checks including access to properties and functions. 

This is mostly useful for third-party data structures that we do not know the shape of, or when incrementally opting in to types. Otherwise, in TypeScript, it is not advised to use the`any` type, do you best to provide typing for data that you're using.

```typescript
let my3rdPartyData: any = 5;
my3rdPartyData = "five";

my3rdPartyData.invalidFunction(3); 
```
@highlight 4

### Void

No type at all - commonly used with functions that don’t return a value.

```typescript
function buttonClick(): void {
  console.log("I clicked a button that returns nothing");
}
```

### Null & undefined

Null and Undefined are two separate types, and subtypes of all other types, meaning they can be assigned to another type like string or number unless the <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html">--strictNullChecks</a> flag is used.

### Never

The never type represents a value that will never occur.

```typescript
function error(message: string): never {
  throw new Error(message);
}
```
@highlight 2

When an error is thrown in the scope of a function that function doesn't return, so this is an instance where `never` is an appropriate return type.

### Type inference

When we don’t provide explicit types for our variables, TypeScript will do its best to infer the types, and it’s very good at it. The following code will not compile due to type inference.

```typescript
let name = "Sally";
let height = 6;
name = height;
//Type 'number' is not assignable to type 'string'
```

Type can also be inferred from complex objects.

```typescript
let person = {
  name: "Sally",
  height: 6,
  address: {
    number: 555,
    street: "Rodeo Drive",
  },
};
person.name = "Cecilia";
//works
person.name = 6;
//Type '6' is not assignable to type 'string'.
person.address.number = "five fifty-five";
//Type '"five fifty-five"' is not assignable to type 'number'.
```

TypeScript will infer the return value of a function as well.

```typescript
function multiplier(a: number, b: number) {
  return a * b;
}
var multiplied: number = multiplier(2, 3);
//works

var str: string;
str = multiplier(10, 20);
//Type 'number' is not assignable to type 'string'.
```

Type inference can be a very helpful tool in refactoring code and helping better document expectations for our code.

### Type assertions

Type assertions are a way to override the inferring of types. There are two different syntaxes, angle-brackets and as.

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

let otherValue: any = "this is a string";

let otherLength: number = (otherValue as string).length;
```

The `as` syntax is usually preferred because the `<type>` conflicts with JSX syntax.

### Setup 2

✏️ Create the file **date-exports.ts**

@sourceref ../../../exercises/typescript/06-types/02-problem/src/types/date-exports.ts

### Verify 2

Create **date-exports.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/06-types/02-problem/src/types/date-exports.test.ts

```shell
npm run test
```

### Excercise 2

In this exercise, we will create our own typed variable by:

- Create a `let` variable that takes a type of Date.
- Assign that variable to an instance of `Date`
- Export that variable as the default export.
- Use `new Date()` to create an instance of Date.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **date-export.ts** to create, assign, and export a date variable.

@diff ../../../exercises/typescript/06-types/02-problem/src/types/date-exports.ts ../../../exercises/typescript/06-types/02-solution/src/types/date-exports.ts

</details>

## Next Steps

Next up, we'll be using TypeScript to annotate [functions](./functions.html).