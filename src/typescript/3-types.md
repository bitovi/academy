@page typescript/types Types
@parent typescript 3

@description Starting to use types in TypeScript.

@body

## Basic Types

Types are what determine how much memory is allocated to save a value. Types also detemine what operations or methods can be performed on a value. Types like strings can't have mathmatical operations performed on them, but methods like ``.length`` can be used.

This section will explore how types are annotated when writing TypeScript and discuss type inference done by TypeScript.

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

#### Quick tip - template strings

Strings that have embedded expressions.

```typescript
let myTemplateString: string = `I think ${ name }'s are pretty cool.

They have ${ teeth } teeth.`;
```

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
```

### Void

No type at all - commonly used with functions that don't return a value.

```typescript
function buttonClick(): void {
  console.log('I clicked a button that returns nothing');
}
```
### Null & Undefined

Null and Undefined are two separate types, and subtypes of all other types, meaning they can be assigned to another type like string or number unless the --strictNullChecks flag is used.

### Never

The never type represents a value that will never occur.

```typescript
function error(message: string): never {
    throw new Error(message);
}
```

### Type Inference 

When we don't provide explict types for our variables, Typescript will do it's best to infer the types, and it's very good at it. The following code will not compile due to type inference.

```typescript
let name = 'blue';
let height = 6;
name = height; //Type 'number' is not assignable to type 'string'
```

Type can also be inferred from complex objects.

```typescript
let junkList = [1, 'seven', 3, 6];
junkList.push('thirteen'); //works
junkList.push(true); //Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

Typescript will infer the return value of a function as well. 

```typescript
function multiplier(a: number, b: number ){
  return a*b;
}
var multiplied: number = multiplier(2,3); //works
var str: string = multiplier(10,20); //Type 'number' is not assignable to type 'string'.
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

### Exercise 1

Fix the following type errors so this code will compile:

```typescript
let isLoading: boolean = true;
isLoading = 'false';

let inventory: Array<number> = [];

inventory.push('tacos', 'hamburgers');

function greet(name: string, age: number): void{
  console.log(`${name} is ${age} years young.`)
}

greet(30, 'Jessica')

greet('Tom', 42, 'software')
```

<details>
  <summary>Solution</summary>
  ```typescript
  let isLoading: boolean = true;
  isLoading = false;

  let inventory: Array<string> = [];

  inventory.push('tacos', 'hamburgers');

  function greet(name: string, age: number): void{
    console.log(`${name} is ${age} years young.`)
  }

  greet('Jessica', 30)

  greet('Tom', 42,)

```
</details>

### Exercise 2

Declare a variable that