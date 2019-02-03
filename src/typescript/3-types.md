@page typescript/types Types
@parent typescript 3

@description Learn how to declare types in TypeScript.

@body

## Overview

In this part, we will:

- Explain how to declare the various types used in TypeScript
- Discuss how types can be inferred
- Show how to assert types.

## Basic Types

Types are what determine how much memory is allocated to save a value. Types also determine what operations or methods can be performed on a value. Types like strings can't have mathematical operations performed on them, but methods like ``.length`` can be used.

### Boolean

```typescript
let isCarnivore: boolean = true;
```

### Number

```typescript
let teeth: number = 100;
let hex: number = 0xF00D;
```

### String

```typescript
let name: string = 'Leoplurodon';
```

> __QUICK TIP:__ Template strings have embedded expressions.
>
> ```typescript
> let myTemplateString: string = `I think ${ name }'s are pretty cool.
>
> They have ${ teeth } teeth.`;
> ```

### Array

```typescript
let list: number[] = [1, 2, 3];

let raptors: Array<string> = ['Blue','Charlie','Delta']
```

### Tuple

```typescript
let sillyList: [number, string];

sillyList = [5, "boop"]; //typescript is happy

sillyList = ["boop", 5]; //will error
```

### Enum

Enums allow the aliasing of names to a list of numeric values. Like most indexing, enums start their first member at 0.

```typescript
enum Color { Red, Green, Blue }
let greenColor: Color = Color.Green
```

Enums can have their first value manually set, or manually set all values

```typescript
enum Month { January = 1, February, March, April, May, June }
let feb = Month[2];

enum Month { January = 1, March = 3, May = 5}
let may = Month[5];
```

### Any

Any describes a variable where we may not know the type.

```typescript
let my3rdPartyData: any = 5;
my3rdPartyData = 'five;
```

### Void

No type at all - commonly used with functions that don't return a value.

```typescript
function buttonClick(): void {
  console.log('I clicked a button that returns nothing');
}
```

### Null & Undefined

Null and Undefined are two separate types, and subtypes of all other types, meaning they can be assigned to another type like string or number unless the <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="\_blank">--strictNullChecks</a> flag is used.

### Never

The never type represents a value that will never occur.

```typescript
function error(message: string): never {
    throw new Error(message);
}
```

## Type Inference

When we don't provide explicit types for our variables, TypeScript will do its best to infer the types, and it's very good at it. The following code will not compile due to type inference.

```typescript
let name = 'Sally';
let height = 6;
name = height;
//Type 'number' is not assignable to type 'string'
```

Type can also be inferred from complex objects.

```typescript
let person = {
  name: 'Sally',
  height: 6,
  address: {
    number: 555,
    street: 'Rodeo Drive'
  }
};
person.name = 'Cecilia';
//works
person.name = 6;
//Type '6' is not assignable to type 'string'.
person.address.number = 'five fifty-five';
//Type '"five fifty-five"' is not assignable to type 'number'.
```

TypeScript will infer the return value of a function as well.

```typescript
function multiplier(a: number, b: number ){
  return a*b;
}
var multiplied: number = multiplier(2,3);
//works

var str: string;
str = multiplier(10,20);
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

The ``as`` syntax is usually preferred because the `<type>` conflicts with JSX syntax.

## Exercise: Fix type errors

### The problem

`2a-fix-errors.ts` has several errors:

```typescript
let isLoading: boolean = true;
isLoading = 'false';

let inventory: Array<number> = [];

inventory.push('tacos', 'hamburgers');

function greet(name: string, age: number): string {
  return `${name} is ${age} years young.`;
}

export const jessica = greet(30, 'Jessica')

export const tom = greet('Tom', 42, 'software');

export {isLoading, inventory};
```

Can you fix the errors?

The exports of `2a-fix-errors.ts` should look like:

```typescript
it("exports are correct", function(){
	assert.equal( isLoading, false,
		"isLoading");

	assert.deepEqual(
		inventory,
		['tacos', 'hamburgers'],
		"inventory");

	assert.equal(jessica,
		`Jessica is 30 years young.`,
		"jessica");

	assert.equal(tom,
		`Tom is 42 years young.`,
		"Tom");
});
```

Run the following to verify your solution:

```shell
npm run 2a-types
```

### What you need to know

You know everything already. You got this. Go you!

### The solution


<details>
<summary>Click to see the solution</summary>

```typescript
let isLoading: boolean = true;
isLoading = false;

let inventory: Array<string> = [];

inventory.push('tacos', 'hamburgers');

function greet(name: string, age: number): string {
  return `${name} is ${age} years young.`;
}

export const jessica = greet('Jessica', 30)

export const tom = greet('Tom', 42);

export {isLoading, inventory};

```

</details>

## Exercise: Date it

### The problem

In this exercise, we will update `2b-date-export.ts` to:

- Create a variable that takes a type of Date.
- Assign that variable to an instance of `Date`
- Export that variable as the default export.

Run the following to verify your solution:

```shell
npm run 2b-types
```

### What you need to know

- Use `new Date()` to create an instance of Date.

### The solution

<details>
<summary>Click to see the solution</summary>

```typescript
let me: Date;
me = new Date("6-11-1993");
export default me;
```

</details>
