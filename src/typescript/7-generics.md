@page typescript/generics Generics
@parent typescript 7

@description Learn about what Generics are, why they are useful, and how to create a linked list using Generics in TypeScript.

@body


## Overview

Generics are a useful approach to writing abstract code that can be used in a variety of scenarios, or where this tutorial is concerned, with a variety of types. This section will cover more about what Generics are, why they are useful and how to create a linked list using Generics in TypeScript.  

## Generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability, as we don't have to duplicate the function for every type. A great example of the power of generics is creating a linked list with type safety.

The following is an example of a linked list for strings:

@sourceref ./7-0-linked-list.html
@codepen

Let's look at transforming this to use generics to use this list for more than just strings. First, we change our interface to take a generic type. 

@sourceref ./7-0-1-interface.html
@codepen

The angle brackets with the T indicate that we have a type variable ``<T>``, and can take what the user provides between the brackets when using the interface. For example, a string: 

@sourceref ./7-0-1-interface-string.html
@codepen
@highlight 13

Next we can refactor our class to take our new generic.

@sourceref ./7-0-2-new-class.html
@codepen
@highlight 12,13,14

Thanks to generics we're able to use the same ``LinkedList`` class in multiple different scenarios with any type.

### Exercise 1

@sourceref ./7-exercise-1-start.html
@codepen

This function will return a random value. Rewrite it as a generic that can return a random string from a list of strings

```typescript
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```

<details>
<summary>Solution</summary>

@sourceref ./7-exercise-1-solution.html
@codepen

</details>