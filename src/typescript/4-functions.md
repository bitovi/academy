@page typescript/functions Functions
@parent typescript 4

@description Functions in TypeScript

@body

## Functions in TypeScript

In typeScript we're able to annotate function parameters to better guard our code. The following execution of a function will throw an error when compiled if called with two parameters that are not numbers.

@sourceref ./4-1-basic-function.html
@codepen

We can also annotate what a function should return.

@sourceref ./4-2-annotated-return.html
@codepen

### Optional Parameters

@sourceref ./4-3-optional-params.html
@codepen

### Rest Parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis(...) followed by the parameter name.

@sourceref ./4-4-rest-params.html
@codepen

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

