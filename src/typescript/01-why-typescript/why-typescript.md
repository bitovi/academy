@page learn-typescript/why-typescript Why TypeScript
@parent learn-typescript 1

@description Learn why TypeScript has secured a place in the JavaScript ecosystem and how to write and compile TypeScript.

@body

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain
JavaScript. 
<a href="../static/img/typescript-error-compiling.png"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>

### TypeScript
```typescript
const world: string = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
```

### JavaScript
```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(who = world) {
    return `Hello ${who}! `;
}
exports.hello = hello;
```

Typing helps enhance code quality and readability, assists in self-documenting, and allows a compiler to perform _typechecking_ to catch errors before runtime. TypeScript also offers modern (think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented way.

Below TypeScript labels the params and return with types, which makes the code a little more readable.

### TypeScript

```typescript
function calculateTotal(price: number, tax: number): number {
    return price + (price * tax);
}
```

### JavaScript

```js
function calculateTotal(price, tax) {
    return price + (price * tax);
}
```

Below is an example of self-documenting, we know the structure for User and the function greet is expecting an User object.

### TypeScript

```typescript
interface User {
    name: string;
    age: number;
}

function greet(user: User) {
    console.info(`Hello, ${user.name}`);
}
```

### JavaScript

```js
function greet(user) {
    console.info(`Hello, ${user.name}`);
}
```
## Why use TypeScript?

### Typechecking

Typechecking is the process of verifying and enforcing the constraints of types, checking each variable, function, and expression to ensure they all fit together correctly. It's like ensuring that you're using the right tools for the job and putting them in the right places, so your program runs smoothly without unexpected errors.

In the TypeScript code provided, an attempt is made to assign a value to `itemCount`, which is expected to be a `number`, but instead, a `string` was passed:

```typescript
let itemCount: number = 'five'; // Incorrect assignment
```
TypeScript will throw an error at compile time:

```typescript
error TS2322: Type '"five"' is not assignable to type 'number'.
```

### Static vs. Dynamic Typing

JavaScript is an "untyped" or "dynamically typed" language. Type is associated with a value instead of a variable.
JavaScript can assign variables to values of different types:

```js
let myVariable;

myVariable = 1;
myVariable = "2";
```

JavaScript can call a function with a type it doesn’t expect:

```js
function greeter(person) {
    return "Hello, " + person;
}

let user = {name: "Justin"};
document.body.innerHTML = greeter(user);
```

If there’s a bug in the code related to falsely assuming a type, it won’t throw an error until we’re already running our code.

TypeScript uses static typing, which allows us to specify what type a variable should hold, and types are checked when the code compiles alerting us of any incorrect usages of a variable assignment. The concept of "static" comes from the idea of variables being static, meaning once you set a variable to a type it can’t (shouldn’t) be changed. For a deeper dive into how typechecking works, the creators of typescript have a <a href="https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html">typechecking handbook</a> of more specific cases as well as their inspiration for the way these features were designed.

## Using this guide

In this guide we will teach you about TypeScript concepts and have an environment for you to practice in. Running the tests will catch any problems if the code was not written correctly or as expected. Pay close attention to how you name and save the files.

## Next steps

Next, let’s set up your system to develop and run a TypeScript app.
