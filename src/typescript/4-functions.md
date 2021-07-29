@page learn-typescript/functions Functions
@parent learn-typescript 4

@description Learn how to annotate functions parameters and return values, use different parameter types available.

@body

## Overview

In this part, we will:

- Annotate functions parameters and return values.
- Use optional parameters & rest parameters

The exercise will have you update a function with TypeScript annotations.

## Functions in TypeScript

In TypeScript, we're able to annotate function parameters to better guard our code. If the following, `add` is called  with two parameters that are not numbers TypeScript's compiler will throw an error when compiled.

```typescript
function add(x: number, y: number): number {
  return x + y;
}

add(1, 'three');
//Argument of type '"foo"' is not assignable to parameter of type 'number'.
```

We can also annotate what a function should return.

```typescript
function returnNumber(): number {
    return '1'
}
//Type '"1"' is not assignable to type 'number'.

function returnNumber(): number {
    return 1;
}
//works!
```

## Optional Parameters

Sometimes when writing functions, we don't need every parameter to be satisfied. TypeScript allows us to mark optional parameters (or properties) with a ``?`` so the compiler will not error if an optional param isn't passed.

```typescript
function buildDinosaur(name: string, breed: string, teeth?:number) {
  if (teeth) {
    console.log(`${name} is a ${breed} and has ${teeth} teeth.`);
  }
  else {
    console.log(`${name} is a ${breed}.`);
  }
}

let newDino = buildDinosaur('Blue', 'Velociraptor', 80);
//works
let otherDino = buildDinosaur('Delta', 'Velociraptor');
//also works
let otherOtherDino = buildDinosaur('Charlie');
//error an argument for 'breed' was not provided
```

## Rest Parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis (...) followed by the parameter name.

```typescript
function buildDinosaur(breed: string, ...dna: string[]) {
  console.log(`The ${breed} has dna from ${dna.join(", ")}`)
}

let uberDino = buildDinosaur('Indominous Rex', "Velociraptor",
"Tyrannosaurus rex","Therizinosaurus", "cuttlefish");
//logs "The Indominous Rex has dna from Velociraptor,
//      Tyrannosaurus rex, Therizinosaurus, cuttlefish"
```

## `this` Parameters

JavaScript functions can be called or created with a dynamic `this`. For example:

```js
const dog = {
    name: "fido",
    bark: function(){
        console.log(this.name + "says woof");
    }
};
const address = {street: "2 State St"};

dog.bark.call(dog);     //logs "fido says woof";
dog.bark.call(address); //logs "undefined says woof"
```

Compiling with the `--strictBindCallApply` flag allows you to
specify the `this` type:

```typescript
const dog = {
    name: "fido",
    bark: function(this: {name: string} ){
        console.log(this.name, "says woof");
    }
};
const address = {street: "2 State St"};

dog.bark.call(dog);     
dog.bark.call(address);  
```
@highlight 3

Line 10 will error with: `Property 'name' is missing in type '{ street: string; }' but required in type '{ name: string; }'.`

## Exercise: dnaCost

### The Problem

The following function in `3-functions-dnaCost.ts` calculates the cost of synthesizing
a DNA sequence to make a dinosaur. It calculates the cost by adding a `baseCost` plus
the length of the DNA sequence:

@sourceref ./4-exercise-start.ts
@codepen

Now scientists want to mix the DNA of multiple dinosaurs.
Open the `3-functions-dnaCost.ts` file and modify this function to:
1. take an unknown amount of sequences;
2. return the sum of baseCost and the length of each sequence.

```ts
let raptorDNA = "CGGCA";
let cuttlefishDNA = "GATTACA";
let viperDNA = "ATTAC";

let indoraptorCost = dnaCost(5000,raptorDNA, cuttlefishDNA, viperDNA);

console.log(indoraptorCost);
// Logs 5017
```

### Verify Your Solution

✏️ Run the following to verify your solution:

```shell
npm run 3-functions
```

### The Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `3-functions-dnaCost.ts` to add each sequence to the
base cost.  This solution uses [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce):

@sourceref ./4-exercise-solution.ts



You'll notice that specifying a return type is not necessary.  This is
because TypeScript can infer the return value from the arguments.

The following is another
valid solution:

```ts
export function dnaCost(baseCost:number, ...sequences: string[]) {
  let sum = baseCost;
  sequences.forEach( sequence=> sum += sequence.length )
  return sum
}
```

</details>
