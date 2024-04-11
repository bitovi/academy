@page learn-typescript/intro-to-typescript Introduction to TypeScript
@parent learn-typescript 1

@description Learn why TypeScript has secured a place in the JavaScript ecosystem and how to write and compile TypeScript.

@body

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain
JavaScript. Typing helps enhance code quality and readability, assists in self-documenting, and allows a compiler to perform _typechecking_ to catch errors before runtime. TypeScript also offers modern (think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented way.

The following shows an IDE catching that `greeter` was expecting a `string`,
but was passed a `number`:

<a href="../static/img/typescript-error-compiling.png"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>

## Why use TypeScript?

### Typechecking

Typechecking is the process of verifying and enforcing the constraints of types.

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

## Using this Guide

In this guide we will teach you about TypeScript concepts and have an environment for you to practice in. Running the tests will catch any problems if the code was not written correctly or as expected. Pay close attention to how you name and save the files.

When we give you a command to run to verify your work it will look for a file named respectively. If you run into issues you can look at the package.json file to see which file the command listed is looking for.

## Next steps

Next, let’s set up your system to develop and run a TypeScript app.
