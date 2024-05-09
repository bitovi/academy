@page learn-typescript/functions Functions
@parent learn-typescript 7
@outline 3

@description Learn how to annotate functions parameters and return values, use different parameter types, and bind `this`.

@body

## Overview

In this part, we will:

- Annotate functions parameters and return values.
- Use optional parameters & rest parameters.
- Update a function with TypeScript annotations.
- Understand `this` in TypeScript.

## Objective 1: Annotate functions

### Annotating function parameters

In TypeScript, we’re able to annotate function parameters to better guard our code.

In the following example, the `add` function is called with two parameters that are not numbers, so TypeScript’s compiler will throw an error when compiled:

@sourceref ./parameters.ts

### Annotating function return values

We can also annotate what a function should return.

@sourceref ./return-problem.ts

Of course, this works when fixed:

@sourceref ./return-solution.ts

### Optional parameters

Sometimes when writing functions, we don’t need every parameter to be satisfied. TypeScript allows us to mark optional parameters (or properties) with a `?` so the compiler will not error if an optional param isn’t passed.

@sourceref ./optional.ts

### Rest parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis (`...`) followed by the parameter name.

@sourceref ./rest.ts

### Setup 1

✏️ Create **src/functions/dnaCost.ts** and update it to be:

@sourceref ../../../exercises/typescript/07-functions/01-problem/src/functions/dnaCost.ts

### Verify 1

✏️ Create **src/functions/dnaCost.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/07-functions/01-problem/src/functions/dnaCost.test.ts

### Exercise 1

The `dnaCost` function in `dnaCost.ts` calculates the cost of synthesizing
a DNA sequence to make a dinosaur. It calculates the cost by adding a `baseCost` plus
the length of the DNA sequence.

Now scientists want to mix the DNA of multiple dinosaurs.
Open the `dnaCost.ts` file and modify this function to:

1. Take an unknown amount of sequences.
2. Return the sum of `baseCost` and the length of each sequence.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-problem?file=src/functions/dnaCost.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-problem?file=src/functions/dnaCost.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update `dnaCost.ts` to add each sequence to the
base cost. This solution uses [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce):

@diff ./../../../exercises/typescript/07-functions/01-problem/src/functions/dnaCost.ts ./../../../exercises/typescript/07-functions/01-solution/src/functions/dnaCost.ts only

You’ll notice that specifying a return type is not necessary. This is
because TypeScript can infer the return value from the arguments.

The following is another
valid solution:

@diff ./../../../exercises/typescript/07-functions/01-problem/src/functions/dnaCost.ts ./../../../exercises/typescript/07-functions/01-solution/src/functions/dnaCost2.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-solution?file=src/functions/dnaCost.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-solution?file=src/functions/dnaCost.ts).

</details>

## Objective 2: Use `this` in TypeScript

### Understanding `this`

The value of this within a function depends on how the function is called:

- Global context: If a function is called in the global scope, `this` refers to the global object (`window` in browsers, `global` in Node.js). However, in strict mode, `this` will be `undefined`.
- Object context: When a function is called as a method of an object, `this` refers to the object.
- Class context: In a class, `this` refers to the instance of the class.
- Event handlers: In DOM event handlers, `this` typically refers to the element that received the event, unless the function is an arrow function, which does not bind its own `this`.
- Arrow functions: Arrow functions do not bind their own `this`; they inherit `this` from the enclosing execution context.

The dynamic nature of this means that its value can change based on how and where a function is called. This can lead to issues, especially when functions that use this are passed around as callbacks.

For instance:

```js
const dog = {
  name: "fido",
  bark: function () {
    console.info(this.name + "says woof");
  },
};
const address = { street: "2 State St" };

dog.bark.call(dog); // Logs "fido says woof";
dog.bark.call(address); // Logs "undefined says woof"
```

In the example above, `dog.bark` is called with two very different types of objects, the second of which (`address`) doesn’t have a `name` property.

### Using `strictBindCallApply`

Compiling with the `--strictBindCallApply` flag allows you to
specify the `this` type:

@sourceref ./this.ts
@highlight 3

Line 10 will error with:

```
Property 'name' is missing in type '{ street: string; }' but required in type '{ name: string; }'.
```

## Next steps

Next, let’s take a look at [classes](./classes.html) in TypeScript.
