@page learn-typescript/why-typescript Why TypeScript
@parent learn-typescript 1
@outline 3

@description Learn why TypeScript has secured a place in the JavaScript ecosystem and how to write and compile TypeScript.

@body

## What is TypeScript?

TypeScript is a programming language developed and maintained by Microsoft. It is a typed superset of JavaScript,
which means that any valid JavaScript code is also valid TypeScript code. TypeScript adds optional static typing
to the language, along with other features that don’t exist in regular JavaScript. 

### Static vs. dynamic typing

JavaScript is an “untyped” or “dynamically typed” language. Type is associated with a value instead of a variable.
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

TypeScript uses **static typing**, which allows us to specify what type a variable should hold, and types are checked when the code compiles alerting us of any incorrect usages of a variable assignment.
The concept of “static” comes from the idea of variables being static, meaning once you set a variable to a type it can’t (shouldn’t) be changed.

For a deeper dive into how typechecking works, the creators of TypeScript have a <a href="https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html">typechecking handbook</a> of more specific cases as well as their inspiration for the way these features were designed.

### Class-based object-oriented programming

While JavaScript supports prototype-based object-oriented programming, TypeScript enhances this with the ability to use classes in a way similar to other OOP languages like Java or C#.
This includes features like inheritance, interfaces, and access modifiers such as `private` or `public`.

### Advanced type system

TypeScript’s type system is rich and includes generics, enums, hybrid types, intersection types, tuples, and much more.
This system allows developers to write flexible, yet robust code very efficiently.

### Transpiling TypeScript to JavaScript

TypeScript code is converted into plain JavaScript through a process called transpilation.
During this process, the compiler can catch and report errors that would otherwise only be caught at runtime when using plain JavaScript.

Here’s an example of TypeScript code before transpilation:

```typescript
const world: string = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
```

Here’s that same code transpiled into JavaScript:

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

## Why use TypeScript?

### Improved code quality and understandability

By using types, JavaScript becomes more predictable and easier to understand.
Types act as a form of documentation that can significantly reduce the cognitive load on developers, helping new team members to understand the codebase quicker.
This can lead to a more maintainable and scalable project.

Here’s an example of plain JavaScript:

```js
function calculateTotal(price, tax) {
    return price + (price * tax);
}
```

In the TypeScript example below, the parameters and return values are labeled with types, which makes the code more readable:

```typescript
function calculateTotal(price: number, tax: number): number {
    return price + (price * tax);
}
```

TypeScript also offers modern (think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented way.

Here’s another example of code being more readable with types. Creating a `User` interface makes it clear what the `greet` function is expecting in the `user` object:

```typescript
interface User {
    name: string;
    age: number;
}

function greet(user: User) {
    console.info(`Hello, ${user.name}`);
}
```

As opposed to JavaScript, where the `user` object could be anything!

```js
function greet(user) {
    console.info(`Hello, ${user.name}`);
}
```

### Early bug detection

Typechecking is the process of verifying and enforcing the constraints of types, checking each variable, function, and expression to ensure they all fit together correctly. It’s like ensuring that you’re using the right tools for the job and putting them in the right places, so your program runs smoothly without unexpected errors.

In the TypeScript code provided, an attempt is made to assign a value to `itemCount`, which is expected to be a `number`, but instead, a `string` was passed:

```typescript
let itemCount: number = 'five'; // Incorrect assignment
```
TypeScript will throw an error at compile time:

```typescript
error TS2322: Type '"five"' is not assignable to type 'number'.
```

TypeScript’s compile-time checks can identify common bugs that would typically be found at runtime in plain JavaScript.
Issues like calling a function with the wrong type of arguments, or trying to use a property that doesn’t exist on an object, can be caught early, thus saving time and reducing costs associated with debugging and fixing production bugs.

### Refactoring confidence

Refactoring large codebases can be risky when you can’t be certain what impact your changes might have.
TypeScript’s type system provides a safety net that makes it easier to make extensive changes while ensuring that no part of the system is adversely affected.

### Enhanced collaboration in large teams

In large development teams, ensuring code consistency and avoiding conflicts can be challenging.
TypeScript’s explicit type system and the compilation step help enforce a level of consistency across the codebase.
It acts as a guide to ensure that all team members are implementing features with the expected types in mind.

### Enhanced IDE support

The static typing feature of TypeScript provides powerful tooling at development time in IDEs (Integrated Development Environments).
Features like code completion, refactorings, and inline documentation become more powerful due to TypeScript’s advanced type inference and type checking.

### Better integration with modern development tools

TypeScript is supported by most modern development tools, including popular IDEs like Visual Studio Code, WebStorm, and others.
These tools provide enhanced features when used with TypeScript, such as better autocomplete, inline errors, and automated refactoring tools.

## Next steps

Next, let’s take a look at [IDEs](./ide-support.html) support building TypeScript projects.
