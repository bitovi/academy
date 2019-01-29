@page typescript/why-typescript Why TypeScript
@parent typescript 1

@description Learn why TypeScript has secured a place in the JavaScript ecosystem and how to write + compile TypeScript.

@body

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Typing helps enhance code quality and readability, assists in self-documenting, and the compiler uses _typechecking_ to catch errors before runtime. TypeScript offers more modern (think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented sense.

<a href="../static/img/typescript-error-compiling.png" target="\_blank"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>

### Typechecking

Typechecking is the process of verifying and enforcing the constraints of types.

### Static vs. Dynamic Typing

Plain JavaScript is a dynamically typed language, meaning it doesn't know the type of a value assigned to a variable until run-time when it's instantiated. If there's a bug in the code related to falsely assuming a type, it won't throw an error until we're already running our code.

TypeScript uses static typing, which allows us to specify what type a variable should hold, and types are checked when the code compiles alerting us of any incorrect usages of a variable assignment. The concept of "static" comes from the idea of variables being static, meaning once you set a variable to a type it can't (shouldn't) be changed.

## Exercise: Hello World

In order to use TypeScript in the browser, we must compile the TypeScript code to plain JavaScript first. We will do this using our terminal in this example, but most often TypeScript is be compiled during a build process.

Let's install TypeScript globally

```shell
npm install -g typescript
```

Create a folder to save our test files in

```shell
mkdir typescript-practice
cd typescript-practice
```

Let's create a quick TypeScript file and open it in our favorite editor.

```shell
touch helloworld.ts
```

We'll write some basic TypeScript next:

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "World";

document.body.innerHTML = greeter(user);
```

We'll compile our code by running:

```shell
tsc helloworld.ts
```

Provided there are no errors, this will compile the TypeScript to JavaScript file ``helloworld.js``

Change your ``user`` variable to a number and compile again. What do you think will happen?

<details>
<summary>error message</summary>
<a href="../static/img/typescript-error-compiling.png" target="\_blank"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>
</details>
