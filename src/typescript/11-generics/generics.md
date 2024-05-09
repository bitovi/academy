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

## Objective 1: The basics of generics

### The problem generics solve

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability. Let’s see how with a small example.

Consider a function that wraps a value in an object:

```js
function wrapAsValue(value) {
  return { value: value };
}
```

Ideally, you’d want to use this function to wrap all sorts of values:

```js
const fourWrapped = wrapAsValue(4); //-> {value: 4}
const hiWrapped = wrapAsValue("hi"); //-> {value: "hi"}
```

And you might want to pass those objects to other functions:

```typescript
function getDollars(object: { value: number }) {
  return "$" + object.value.toFixed(2);
}

function getMessage(object: { value: string }) {
  return object.value + " world";
}

getDollars(fourWrapped); //-> "$4.00"
getMessage(hiWrapped); //-> "hi world"
```

**But watch out!** The following will **not** error until _runtime_
because strings do not have a `toFixed()` method.

```js
getDollars(hiWrapped);
```

You don’t see a compile time error because `hiWrapped` object looks like `{value: any}` to TypeScript.

Getting a compile time error can be solved in a variety of **inelegant** ways:

**Way 1:** Define the type of the variables:

```typescript
const fourWrapped: { value: number } = wrapAsValue(4);
const hiWrapped: { value: string } = wrapAsValue("hi");
```

The main drawback here is the redundancy and verbosity introduced by having to manually specify the type of each variable.
This approach lacks scalability as every new variable type requires explicit type declaration, which can be tedious and error-prone, especially in larger codebases where the number of variable types can increase significantly.

**Way 2:** Write multiple functions:

```typescript
function wrapStringAsValue(value: string) {
  return { value: value };
}
function wrapNumberAsValue(value: number) {
  return { value: value };
}
```

This approach suffers from significant code duplication, with each function wrapping a different type of value in the same manner, which violates the DRY (Don’t Repeat Yourself) principle.
Additionally, this method adds a maintenance burden.
For every new type that needs to be wrapped, a new function must be created, which can lead to increased code complexity and potential inconsistencies in function implementation across different types.

**Way 3:** Overload `wrapAsValue` signatures:

```typescript
function wrapAsValue(value: string): { value: string };
function wrapAsValue(value: number): { value: number };
function wrapAsValue(value: any) {
  return { value: value };
}
```

The use of function overloading here introduces complexity by requiring you to manage multiple function signatures, complicating both the use and documentation of the function.
Additionally, the implementation leverages the `any` type for a catch-all method, which undermines TypeScript’s robust type-checking by allowing _any_ type to be passed, potentially leading to runtime errors that are difficult to detect during compilation, thereby reducing the effectiveness of using TypeScript.

### Introducing generics

With **generics**, this problem can be solved more simply:

```typescript
function wrapAsValue<MyType>(value: MyType): { value: MyType } {
  return { value: value };
}

const fourWrapped = wrapAsValue<number>(4);
const hiWrapped = wrapAsValue("hi");

function getDollars(object: { value: number }) {
  return "$" + object.value.toFixed(2);
}

function getMessage(object: { value: string }) {
  return object.value + " world";
}

getDollars(fourWrapped);
getMessage(hiWrapped);
getDollars(hiWrapped);
```

@highlight 1, 5, only

The `<MyType>` part of the `wrapAsValue` definition is the **Generics**
part. This `<MyType>` allows us to capture the type the user provides so that we can use that information later. In this case, we are using it to specify that the
return type is an object with a `MyType` `value`
property (`{value: MyType}`). This allows us to traffic that type of information in one side of the function and out the other.

### Calling generic functions

We can call generic functions in two ways.

First, we can explicitly pass the type:

```typescript
wrapAsValue<number>(4);
```

Notice that `<number>` acts as a special set of arguments. Instead of
arguments passed like `func(arg1, arg2, arg3)`, generic type arguments
are passed like `func<Type1, Type2, Type3>`.

Second, the type can be inferred:

```typescript
wrapAsValue("hi");
```

Notice that we didn’t explicitly pass the type n the angle brackets (`<>`). Instead,
the compiler just looked at the value `"hi"` and set `MyType` to `string`.

### Setup 1

✏️ Create **src/generics/last.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/01-problem/src/generics/last.ts

### Verify 1

✏️ Create **src/generics/last.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/01-problem/src/generics/last.test.ts

### Exercise 1

Update the `last.ts` file to inform the function that it will be accepting an array of a certain type and return a single element of the same type.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-problem?file=src/generics/last.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-problem?file=src/generics/last.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/generics/last.ts** to be:

@diff ../../../exercises/typescript/11-generics/01-problem/src/generics/last.ts ../../../exercises/typescript/11-generics/01-solution/src/generics/last.ts only

We use `<T>` to set up the generic.
In the parenthesis, we use `T[]` to inform the user we are accepting an array of a certain type.
Finally, we use `): T{` to let us be aware what is the return type.

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-solution?file=src/generics/last.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/01-solution?file=src/generics/last.ts).

</details>

## Objective 2: Generics in classes

### Using generics with classes

Generic classes are quite common.

```typescript
const cardNumber = new Subject<string>();

cardNumber.next("1234");
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

const myList = Collection();
myList.push(25);
myList.push("25");
```

The good - we can push any type to this list.  
The bad - we can push any type to this list.

`myList` now holds an assortment of types and will be a likely source of
runtime errors.

Let’s build a **generic** `Collection` class instead.

```typescript
class GenericCollection<T> {
  private list: T[] = [];
  pushItem(thing: T) {
    this.list.push(thing);
  }
}
```

Now when we initialize this class we can specify a type to use.

@sourceref ./generic-collection-class.ts
@highlight 1, 8, 13, 24

In the example above, we are utilizing generics to inform `GenericCollection` what type it is receiving: `string`, `number`, or `Dinosaur`.

A great example of the power of generics is creating a recursive data structure like a tree. In the following exercise, we will create a `TreeNode` class that can house a generic `value` and be used to create a tree structure of `left` and `right` nodes of the same generic type.

### Setup 2

✏️ Create **src/generics/tree.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/generics/tree.ts

### Verify 2

✏️ Create **src/generics/tree.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/generics/tree.test.ts

### Exercise 2

Update the `tree.ts` file to create a recursive `TreeNode` class that can house a `value` and be used to create a tree structure of `left` and `right` nodes.

For example, we will be able to create a `TreeNode` with a root value and
comparison function as follows:

@sourceref ../../../exercises/typescript/11-generics/02-problem/src/generics/tree.test.ts
@highlight 25-33, only

Then we can add values to `root` like:

```typescript
root.add("Taylor");
```

This will add `Taylor` to a `left` `TreeNode` of `root` because
the `stringComparison` will return `1` (`Jennifer > Taylor`):

```typescript
root.left.value; //-> "Taylor"
```

As we add other values, they will be added to either the right or left nodes
recursively:

```js
root.add("Tom");
root.add("Matthew");

root.right.value; //-> "Tom"
root.right.left.value; //-> "Matthew"
```

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-problem?file=src/generics/tree.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-problem?file=src/generics/tree.ts) to do this exercise in an online code editor.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/generics/tree.ts** to be:

@diff ../../../exercises/typescript/11-generics/02-problem/src/generics/tree.ts ../../../exercises/typescript/11-generics/02-solution/src/generics/tree.ts only

The use of generics in line 5 allows the `TreeNode` class to be flexible and reusable, accommodating different types of data and comparison logic.

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-solution?file=src/generics/tree.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/11-generics/02-solution?file=src/generics/tree.ts).

</details>

## Next steps

Next, let’s take a look at [utility types](./utility-types.html) for type transformations.
