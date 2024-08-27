@page learn-typescript/modules Modules
@parent learn-typescript 5
@outline 2

@description Learn how to export and import values from a file.

@body

## Overview

In this section, you will:

- Export values from a file.
- Import values from another file.
- Learn why named exports are preferred over default exports.
- Import and export functions between modules.

## Objective 1: Export and import values

A fundamental part of writing code is creating values that you can use across multiple files.
Modules are a way of grouping code to be executed within their own scope, opposed to a global scope.
Modules give us a way to write DRY code, scope our variables, re-use parts of our code, test our code in discrete units, and avoid writing applications full of dreadful spaghetti code.
Let’s break down how to [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) values in TypeScript.

In TypeScript, you can export any type of value: variables, functions, classes, interfaces, etc.

There are two types of exports: default exports and named exports.

### Default exports

Imagine we have a `config.ts` file:

```ts
const config = {
  name: "Bitovi Academy",
  url: "https://www.bitovi.com/academy/",
};

export default config;
```

@highlight 6

In the example above, we create a `config` variable and then use `export default` to export it.

Then, we could consume the value in another file:

```ts
import appConfig from "./config.ts";

const appName = appConfig.name;
```

@highlight 1

In the code above, the `appConfig` variable is the same as the `config` variable exported from `config.ts`.
Note that the `appConfig` variable name does not need to match the name in the file that has the `export`.

### Named exports

Named exports are called that because there is an explicit name in the file with the `export`.

Let’s imagine we have a `helpers.ts` file:

```ts
export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

@highlight 5-7

In the example above, we export a `constrain` function from our `helpers.ts` file.

We can import the `constrain` function like so:

```ts
import { constrain } from "./helpers.ts";

const constrained = constrain(-18, 0, 100);
```

@highlight 1

In the code above, we can import the `constrain` function by name from `helpers.ts` and use it in our code.

### Default exports vs. named exports

While you can prefer one style of export over the other, each serves a different purpose.

- Use default exports for the primary output of a module.
- Use named exports for secondary outputs or when there is no primary output.

**For example:**

- If you have a module called `AuthProvider` that exports a React component and several helper hooks, the component would be the primary (default) export and the hook would be secondary (named).
- If you have a module called `transforms` that exports the functions `formatPercent` and `formatCurrency`, both of these would be named exports; there is no primary export.

### Importing types

From time to time, you may need to only import the `type` from another file and not the full implementation.
TypeScript provides a special syntax, `import type`, which is used specifically to import type declarations.
This can help to make the import intention clearer and can also have some performance benefits during compilation.

Let’s imagine we have a `user.ts` file:

```ts
export type User = {
  age: number;
  name: string;
};

export const createUser = (name: string, age: number): User => {
  return { name, age };
};
```

@highlight 1, only

In the code above, we defined a `User` type and a `createUser` function.
The `User` type describes the shape of user objects.

We can import just the `User` type (and use it) like so:

```ts
import type { User } from "./user";
import { createUser } from "./user";

const logUser = (user: User): void => {
  console.info(`User: ${user.name}, Age: ${user.age}`);
};

const user = createUser("Alice", 30);
logUser(user);
```

@highlight 1, 4, only

In the code above, the `User` type import will not be included in the JavaScript output after compilation (because it’s only used for static type checking by TypeScript).

Use `import type` whenever you are importing types like interfaces, types, or type aliases from another module and you do not need to import any runtime variables, classes, or functions.
This not only makes your imports cleaner and more specific, but it also optimizes your project’s output size and compilation time.

### Setup

✏️ Create **src/modules/exporter.ts** and update it to be:

@sourceref ../../../exercises/typescript/05-modules/01-problem/src/modules/exporter.ts

✏️ Create **src/modules/importer.ts** and update it to be:

@sourceref ../../../exercises/typescript/05-modules/01-problem/src/modules/importer.ts

### Verify

✏️ Create **src/modules/importer.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/05-modules/01-problem/src/modules/importer.test.ts

### Exercise

Use your knowledge of named exports and imports to do the following:

- Export `greeter` from `exporter.ts`
- Import `greeter` in `importer.ts`

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/05-modules/01-problem?file=src/modules/exporter.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/05-modules/01-problem?file=src/modules/exporter.ts) to do this exercise in an online code editor.

### Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/modules/exporter.ts** to be:

@diff ../../../exercises/typescript/05-modules/01-problem/src/modules/exporter.ts ../../../exercises/typescript/05-modules/01-solution/src/modules/exporter.ts only

✏️ Update **src/modules/importer.ts** to be:

@diff ../../../exercises/typescript/05-modules/01-problem/src/modules/importer.ts ../../../exercises/typescript/05-modules/01-solution/src/modules/importer.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/05-modules/01-solution?file=src/modules/exporter.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/05-modules/01-solution?file=src/modules/exporter.ts).

</details>

### Bonus exploration

What does your IDE show when you try to:

- Hover over `greeter`?
- Pass a number to `greeter`?

## Next steps

Next, let’s learn how to [declare types](./types.html) in TypeScript.
