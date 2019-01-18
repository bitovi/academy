@page typescript/functions Functions
@parent typescript 5

@description Functions in Typescript

## Functions in Typescript

In typescript we're able to annotate function parameters to better guard our code. The following execution of a function will throw an error when compiled if called with two parameters that are not numbers.

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

We can also annotate what a function should return.

```typescript
interface Result {
  success: boolean
  error?: string
}

function logResponse(): Result {
  return 'path not found'
}
//Type '"path not found"' is not assignable to type 'Result'.

function logResponse(): Result {
  return { success: false, error: 'path not found'}
}
//works!
```

### Optional Parameters

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
let otherDino = buildDinosaur('Charlie'); //error an argument for 'breed' was not provided
```

### Rest Parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis(...) followed by the parameter name.

```typescript
function buildDinosaur(breed: string, ...dna: string[]) {
  console.log(`The ${breed} has dna from ${dna.join(", ")}`)
}

let uberDino = buildDinosaur('Indominous Rex', "Velociraptor", "Tyrannosaurus rex","Therizinosaurus", "cuttlefish");
//The Indominous Rex has dna from Velociraptor, Tyrannosaurus rex, Therizinosaurus, cuttlefish
```

### This & => Functions

If you're familiar with ES6, you may know that using the fat arrow (=>) captures the context of this where it's used. The functionality is the same in Typescript.


### Exercise 1

Write a function that takes a number and an unknown number of numbers, and returns the total of the numbers times their multiplier added together. 

<details>
<summary>solution</summary>
```typescript
 function powerUp(multiplier, ...nums: number[]) {
   let total = 0;
     for(var i = 0; i < nums.length; i++) {
       total = total + nums[i]*multiplier;
     }
   return total;
  }

let sum = powerUp(7, 1, 3, 6, 8);
```
</details>

