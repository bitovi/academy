@page typescript/generics Generics
@parent typescript 7

@description Using generics in TypeScript. 

@body


## Overview

WHY GENERICS 

## Generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability. 

ALLOWS YOU TO WRITE LINKED LIST WITH TYPE SAFETY - EXPLICITLY SHOW MAINTAINABILITY

INTRODUCE EXAMPLE, EXPLAIN WHY GENERICS, EXPLAIN SYNTAX

@sourceref ./7-1-basic.html
@codepen

Let's look at making a basic class to collect a list of things.

@sourceref ./7-2-collection.html
@codepen

The good - we can push any type to this list. The bad - we can push any type to this list.

@sourceref ./7-3-bad-collection.html
@codepen

myList now holds an assortment of types that won't be fun to iterate through and deal with. Let's build a generic class instead.

EXPLAIN DEAL WITH LOSING TYPE SAFETY - SHOW METHODS ON STRINGS VS. NUMBERS

@sourceref ./7-4-good-collection.html
@codepen

Now when we initialize this class we can specify a type to use.

@sourceref ./7-5-generic-collection.html
@codepen

Thanks to generics we're able to use the same class in multiple different scenarios with any type.

### Exercise 1

```typescript
function randomIntElem(theArray: number[]): number {
    let randomIndex = Math.floor(Math.random()*theArray.length);
    return theArray[randomIndex];
}
 
let numbers: number[] = [103, 458, 472, 458];
let randomNumber: number = randomIntElem(positions);
```

This function will return a random value. Rewrite it as a generic that can return a random string from a list of strings

```typescript
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```


<details>
<summary>Solution</summary>
```typescript

function randomThing<T>(anArray: T[]): T {
  let randomIndex = Math.floor(Math.random()*anArray.length);
  return anArray[randomIndex];
}
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```
</details>


### Exercise 2

write tree class

WORK IN INTERFACES AND CLASSES