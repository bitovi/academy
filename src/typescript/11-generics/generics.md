@page learn-typescript/generics Generics
@parent learn-typescript 12
@outline 3

@description Learn about what Generics are, why they are useful, and how to create a linked list using Generics in TypeScript.

@body

## Overview

In this section, you will:

- Understand the fundamentals and objectives of generic functions.
- Create generic classes.
- Combine recursion with generic classes.
- Create recursive generics.

## Objective 1: Basic Generics

### Introducing generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability. Let’s see how with a small example.

Consider a function that wraps a value in an object:

```js
function wrapAsValue(value) {
    return {value: value};
}
```

Ideally, you’d want to use this function to wrap all sorts of values:

```js
let fourObj = wrapAsValue(4);  //-> {value: 4}
let hiObj = wrapAsValue("hi"); //-> {value: "hi"}
```

And you might want to pass those objects to other functions:

```typescript
function getDollars(obj: {value: number}){
    return "$"+obj.value.toFixed(2)
}

function getMessage(obj: {value: string}) {
    return obj.value + " world";
}

getDollars(fourObj); //-> "$4.00"
getMessage(hiObj);   //-> "hi world"
```

__But watch out!__  The following will __not__ error until _runtime_
 because strings do not have a `toFixed()` method.

```js
getDollars(hiObj);  
```

You don’t see a compile time error because `hiObj` object looks like `{value: any}` to TypeScript.

Getting a compile time error can be solved in a variety of __inelegant__ ways:

- Way 1 - Define the type of the variables:
  ```typescript
  let fourObj: {value: number} = wrapAsValue(4);
  let hiObj:   {value: string} = wrapAsValue("hi");
  ```
- Way 2 - Write multiple functions:
  ```typescript
  function wrapStringAsValue(value: string) {
    return {value: value};
  }
  function wrapNumberAsValue(value: number) {
    return {value: value};
  }
  ```
- Way 3 - Overload `wrapAsValue` signatures:
  ```typescript
  function wrapAsValue(value: string): {value: string};
  function wrapAsValue(value: number): {value: number};
  function wrapAsValue(value: any) {
      return {value: value};
  }
  ```

With __generics__, this problem can be solved more simply:

```typescript
function wrapAsValue<MyType>(value: MyType): {value: MyType} {
    return {value: value};
}

let fourObj = wrapAsValue<number>(4);
let hiObj = wrapAsValue("hi");


function getDollars(obj: {value: number}){
    return "$"+obj.value.toFixed(2)
}

function getMessage(obj: {value: string}) {
    return obj.value + " world";
}

getDollars(fourObj);
getMessage(hiObj);
getDollars(hiObj);

```
@highlight 1, 5, only

The `<MyType>` part of the `wrapAsValue` definition is the __Generics__
part. This `<MyType>` allows us to capture the type the user provides so that we can use that information later. In this case, we are using it to specify that the
return type is an object with a `MyType` `value`
property (`{value: MyType}`). This allows us to traffic that type of information in one side of the function and out the other.

We can call generic functions in two ways:

We can explicitly pass the type:

  ```typescript
   wrapAsValue<number>(4)
  ```

  Notice that `<number>` acts as a special set of arguments. Instead of
  arguments passed like `func(arg1, arg2, arg3)`, generic type arguments
  are passed like `func<Type1, Type2, Type3>`.

The type can be inferred:

  ```typescript
  wrapAsValue("hi")
  ```

  Notice that we didn’t explicitly pass the type n the angle brackets (`<>`). Instead,
  the compiler just looked at the value `"hi"` and set `MyType` to `string`.

### Setup 1

✏️ Create **src/generics/return-last.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/01-problem/src/return-last.ts

### Verify 1

✏️ Create **src/generics/return-last.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/01-problem/src/return-last.test.ts

### Exercise 1

Update the `return-last.ts` file to inform the function that it will be accepting an array of a certain type and return a single element of the same - type.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-problem?file=src/return-last.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-problem?file=src/return-last.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

Update `return-last.ts` to the following:

@diff ../../../exercises/typescript/11-generics/01-problem/src/return-last.ts ../../../exercises/typescript/11-generics/01-solution/src/return-last.ts only

We use `<T>` to set up the generic. In the Parenthesis, we use `T[]` to inform the user we are accepting an array of a certain type. Finally, we use `): T{` to let us be aware what is the return type.   

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-solution?file=src/return-last.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-solution?file=src/return-last.ts).
</details>

## Objective 2: Generic Classes

### Using generics with classes

Generic classes are quite common.

```typescript
const cardNumber = new Subject<string>();

cardNumber.next("1234")
```

In the example above, [learn-rxjs/basics#observables-vs-subjects RxJS] subjects are a generic class that can publish values of a particular type.

Let’s look at making a basic class to collect a list of things.

```typescript
class Collection {
  private list: any[] = [];
  push(thing) {
    this.list.push(thing);
  }
}

let myList = Collection();
myList.push(25);
myList.push('25');
```

The good - we can push any type to this list.  
The bad - we can push any type to this list.

`myList` now holds an assortment of types and will be a likely source of
runtime errors.

Let’s build a __generic__ `Collection` class instead.

```typescript
class GenericCollection<T> {
  private list: T[] = [];
  pushItem( thing:T ) {
    this.list.push(thing);
  }
}
```

Now when we initialize this class we can specify a type to use.

@sourceref ./generic-collection-class.ts
@highlight 1, 8,14,25

In the example above, we are utilizing generics to inform `GenericCollection` what type it is receiving. `string`, `number`, and `Dinosaur`. 

A great example of the power of generics is creating a recursive data structure like a tree. In the following exercise, we will create a `TreeNode` class that can house a generic `value` and be used to create a tree structure of `left` and `right` nodes of the same generic type.

### Setup 2

✏️ Create **src/generics/tree-node.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/tree-node.ts

### Verify 2

✏️ Create **src/generics/tree-node.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/tree-node.test.ts

### Exercise 2

Update the `tree-node.ts` file to create a recursive `TreeNode` class that can house a `value` and be used to create a tree structure of `left` and `right` nodes.

For example, we will be able to create a `TreeNode` with a root value and
comparison function as follows:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/example.ts

Then we can add values to `root` like:

```typescript
root.add("Taylor");
```

This will add `Taylor` to a `left` `TreeNode` of `root` because
the `stringComparison` will return `1` (`Jennifer > Taylor`):

```typescript
root.left.value //-> "Taylor"
```

As we add other values, they will be added to either the right or left nodes
recursively:

```js
root.add("Tom");
root.add("Matthew");

root.right.value      //-> "Tom"
root.right.left.value //-> "Matthew"
```

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-problem?file=src/tree-node.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-problem?file=src/tree-node.ts) to do this exercise in an online code editor.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update `tree-node.ts` to the following:

@diff ../../../exercises/typescript/11-generics/02-problem/src/tree-node.ts ../../../exercises/typescript/11-generics/02-solution/src/tree-node.ts only

The use of generics in line 5, allows the `TreeNode` class to be flexible and reusable, accommodating different types of data and comparison logic.
</details>

## Next steps

Next, let’s take a look at [utility types](./utility-types.html) for type transformations.

<!-- TODO: I am having a problem trying to test a compiler failure. For example, I am trying to test the Readonly<>, but to test it, we should test if the TypeScript throws an error. Does anyone have ideas on how to test this? -->