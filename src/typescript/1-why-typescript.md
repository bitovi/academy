@page learn-typescript/why-typescript Why TypeScript
@parent learn-typescript 1

@description Learn why TypeScript has secured a place in the JavaScript ecosystem and how to write and compile TypeScript.

@body

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain
JavaScript. Typing helps enhance code quality and readability, assists in self-documenting, and allows a compiler to perform _typechecking_ to catch errors before runtime. TypeScript also offers modern (think ES6) features of JavaScript and the use of classes and interfaces to write code in an object oriented way.

The following shows an IDE catching that `greeter` was expecting a `string`,
but was passed a `number`:

<a href="../static/img/typescript-error-compiling.png"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>

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

## Exercise: `0-why-hello-world.ts`

### The Problem

For this exercise, we will first clone the __learn-typescript__ exercise repository.

In that repository, there is a _0-why-hello-world.html_ page that looks like the following:

```html
<html>
  <body>
    <script src="./0-why-hello-world.js"></script>
  </body>
</html>
```

After cloning and installing the repository, we will:

1. Create a simple _0-why-hello-world.ts_ TypeScript file that writes out `"Hello World"`.
2. Compile that code the _0-why-hello-world.ts_ JavaScript file.
3. Open _0-why-hello-world.html_ and verify that we’ve written and compiled some TypeScript!
4. Run the exercise repository’s tests for this exercise.



### Setup

For this and following TypeScript exercises, we will be working in the
[https://github.com/bitovi/learn-typescript](https://github.com/bitovi/learn-typescript)
repository. To use it:

1. ✏️ Clone the learn-typescript repository from GitHub:
   ```shell
   git clone https://github.com/bitovi/learn-typescript.git
   ```

2. ✏️ Navigate into the learn-typescript folder:
   ```shell
   cd learn-typescript
   ```

3. ✏️ Install the node packages(these are already listed in the package.json file):
   ```shell
   npm i
   ```
   > NOTE: You must have `node 8` or higher installed! You can use
   > [nvm](https://github.com/nvm-sh/nvm) to easily switch between
   > node versions.

4. ✏️ Open the `learn-typescript` folder in your favorite editor:
  ```shell
   code . # if you are using VS Code
  ```
   > The '.' after the editor is a shorthand to refer to the folder you’re currently in

### What you need to know

In order to use TypeScript in the browser, we must compile the TypeScript code to plain JavaScript first. We will do this using our terminal in this example, but most often TypeScript will be compiled during a build process.

✏️ Let’s install TypeScript globally:

```shell
npm install -g typescript
```

✏️ Double check it has installed properly with:

```shell
tsc -v
```

✏️ Let’s create a new file called _0-why-hello-world.ts_ and open it in our favorite editor.

OSX
```shell
touch 0-why-hello-world.ts
```

WINDOWS
```shell
echo > 0-why-hello-world.ts
```

   > The `touch` or `echo` command creates a new file

✏️ We’ll write some basic TypeScript next:

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "World";

document.body.innerHTML = greeter(user);
```

✏️ We’ll compile our code by running:

```shell
tsc 0-why-hello-world.ts
```

Provided there are no errors, this will compile the TypeScript to JavaScript file `0-why-hello-world.js`


### Verify Solution

Open _0-why-hello-world.html_ in your browser.  You should see `"Hello, World"` in the page.


The __learn-typescript__ repository also tests to make sure your solution
works.  

✏️ Once you’ve completed all of the previous steps, run the following to make sure your solution works:

```shell
npm run 0-why
```


## Bonus Challenge

### The Problem

Change your ``user`` variable to a number and compile again. What do you think will happen?

### The solution

You should see an error message.

<details>
<summary>Click to see the error message.</summary>
<a href="../static/img/typescript-error-compiling.png"><img src="../static/img/typescript-error-compiling.png" width="100%"/></a>
</details>
