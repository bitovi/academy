@page typescript/why-typescript Why Typescript
@parent typescript 0

@description Why Typescript has secured a place in the JavaScript ecosystem.

## Why Typescript

Typescript is a typed superset of JavaScript that compiles to plain JavaScript. Typed support helps enhance code quality and readability, assists in self-documenting, and the compiler does typechecking to catch errors before runtime. Typescript offers more modern(think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented sense.

### Typechecking

Typechecking is the process of verifying and enforcing the constraints of types.

### Static vs. Dynamic Typing

Plain JavaScript is a dynamically typed language, meaning it doesn't know the type of a variable until run-time when it's instantiated. If there's a bug in the code related to falsely assuming a type, it won't throw an error until we're already running our code. It's worth noting that you can declare types in dynamically typed languages, but it's not required, as these languages attempt to infer the type of variables based on their values. This inference does come with a performance cost because the typechecking is done at runtime.

Typescript uses static typing, so types are checked when the code compiles. The concept of "static" comes from the idea of variables being static, meaning once you set a variable to a type it can't(shouldn't) be changed.

### Compilation

In order to use Typescript in the browser, we must compile to plain JavaScript first. We can do this from our terminal, but most often Typescript will be compiled during our build process.

Let's install Typescript globally

```shell
npm install -g typescript
```

Create a folder to save our test files in

```shell
mkdir typescript-practice
cd typescript-practice
```

Let's create a quick typescript file and open it in our favorite editor.

```shell
touch helloworld.ts
```

We'll write some basic Typescript next

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "World";

document.body.innerHTML = greeter(user);
```

We'll compile our code by running

```shell
tsc helloworld.ts
```

Change your user variable to an integer and compile again. What do you think will happen?

### Webpack demo here?
