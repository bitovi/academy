@page learn-typescript/functions Functions
@parent learn-typescript 7
@outline 3

@description Learn how to annotate functions parameters and return values, use different parameter types available.

@body

## Overview

In this part, we will:

- Annotate functions parameters and return values
- Use optional parameters & rest parameters
- Update a function with TypeScript annotations

## Objective: Annotating Functions 

### Functions in TypeScript

In TypeScript, we’re able to annotate function parameters to better guard our code. If the following, `add` is called  with two parameters that are not numbers TypeScript’s compiler will throw an error when compiled.

@sourceref ./7-1-parameters.ts
@codepen

We can also annotate what a function should return.

@sourceref ./7-2-return.ts
@codepen

### Optional parameters

Sometimes when writing functions, we don’t need every parameter to be satisfied. TypeScript allows us to mark optional parameters (or properties) with a ``?`` so the compiler will not error if an optional param isn’t passed.

@sourceref ./7-3-optional.ts
@codepen

### Rest parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis (...) followed by the parameter name.

@sourceref ./7-4-rest.ts
@codepen

### Setup

✏️ Create **src/functions/dnaCost.ts** and update it to be:

@sourceref ../../../exercises/typescript/07-functions/01-problem/src/dnaCost.ts

### Exercise

The following function in `dnaCost.ts` calculates the cost of synthesizing
a DNA sequence to make a dinosaur. It calculates the cost by adding a `baseCost` plus
the length of the DNA sequence:

Now scientists want to mix the DNA of multiple dinosaurs.
Open the `dnaCost.ts` file and modify this function to:
1. take an unknown amount of sequences;
2. return the sum of `baseCost` and the length of each sequence.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-problem?file=src/dnaCost.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-problem?file=src/dnaCost.ts) to do this exercise in an online code editor.



### Verify

✏️ Create **src/functions/dnaCost.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/07-functions/01-problem/src/dnaCost.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `dnaCost.ts` to add each sequence to the
base cost.  This solution uses [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce):

@sourceref ./../../../exercises/typescript/07-functions/01-solution/src/dnaCost.ts
@highlight 1-4

You’ll notice that specifying a return type is not necessary.  This is
because TypeScript can infer the return value from the arguments.

The following is another
valid solution:

@sourceref ./../../../exercises/typescript/07-functions/01-solution/src/dnaCost2.ts
@highlight 1-4

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-solution?file=src/dnaCost.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/07-functions/01-solution?file=src/dnaCost.ts).

</details>

### `this` parameters

JavaScript functions can be called or created with a dynamic `this`. For example:

```js
const dog = {
  name: 'fido',
  bark: function() {
    console.info(this.name + 'says woof');
  }
};
const address = {street: '2 State St'};

dog.bark.call(dog);     //logs "fido says woof";
dog.bark.call(address); //logs "undefined says woof"
```

Compiling with the `--strictBindCallApply` flag allows you to
specify the `this` type:

@sourceref ./7-5-this.ts
@codepen
@highlight 3

Line 10 will error with: `Property 'name' is missing in type '{ street: string; }' but required in type '{ name: string; }'.`

## Next steps

Next, let’s take a look at [classes](./classes.html) in TypeScript.
