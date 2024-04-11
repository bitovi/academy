@page learn-typescript/exporting-and-importing Exporting and Importing
@parent learn-typescript 5
@outline 2

@description Learn how to export and import values from a file.

@body

## Overview

In this section, you will:

- Export values from a file
- Import values from another file
- Learn why named exports are preferred over default exports
- For the exercise, we will learn how to import and export functions between modules.

## Objective 1: Export and import values

A fundamental part of writing code is creating values that you can use across multiple files.
This allows for modular, maintainable, and scalable code. Let’s break down how to [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) values in TypeScript.

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
function clampNumber(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export {
    constrain: clampNumber,
};
```
@highlight 5-7

In the example above, we export a `constrain` function from our `helpers.ts` file. Note that the local function name is called something else (`clampNumber`) and we export it with a specific name (`constrain`).

We can import the `constrain` function like so:

```ts
import { constrain } from "./helpers.ts";

const constrained = constrain(-18, 0, 100);
```
@highlight 1

In the code above, we can import the `constrain` function by name from `helpers.ts` and use it in our code.

#### Shorthand

If the name of the function in the file matches what you want to export it as, you can use this shorthand in your export statement:

```ts
function constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export {
    constrain,
};
```
@highlight 1, 6

#### Exporting in place

You can also export values from where they’re declared in the file, without a separate `export` statement:

```ts
export function constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
```
@highlight 1

### Default exports vs. named exports

While you can use both in projects and some APIs may require you to use one type of export vs. the other, we recommend you use named exports in all of the code you write.

Here’s why:

**Consistency:** Named exports enforce consistency. The name of the export has to be used wherever it's imported unless explicitly renamed. This consistency makes it easier to trace through code and understand what is being imported and used.

**Explicitness and clarity:** Since you have to explicitly list what you are importing, it provides a clear overview of what dependencies a module has. This explicitness improves readability and maintainability of the code.

**Better tooling support:** Many IDEs and tools have easier times with auto-completion and refactoring when using named exports. This can lead to more efficient coding and a lower chance of errors.

### Setup

✏️ Create **src/exporting-and-importing/exporter.ts** and update it to be:

@sourceref ../../../exercises/typescript/04-exporting-and-importing/01-problem/src/exporting-and-importing/exporter.ts

✏️ Create **src/exporting-and-importing/importer.ts** and update it to be:

@sourceref ../../../exercises/typescript/04-exporting-and-importing/01-problem/src/exporting-and-importing/importer.ts

### Verify

✏️ Create **src/exporting-and-importing/importer.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/04-exporting-and-importing/01-problem/src/exporting-and-importing/importer.test.ts

✏️ Update **package.json** to be:

@sourceref ../../../exercises/typescript/04-exporting-and-importing/01-problem/package.json
@highlight 7, only

### Exercise

Use your knowledge of named exports and imports to do the following:

- Export `greeter` from `exporter.ts`
- Import `greeter` in `importer.ts`

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/04-exporting-and-importing/01-problem?file=src/exporting-and-importing/exporter.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/04-exporting-and-importing/01-problem?file=src/exporting-and-importing/exporter.ts) to do this exercise in an online code editor.

### Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/exporting-and-importing/exporter.ts** to be:

@diff ../../../exercises/typescript/04-exporting-and-importing/01-problem/src/exporting-and-importing/exporter.ts ../../../exercises/typescript/04-exporting-and-importing/01-solution/src/exporting-and-importing/exporter.ts only

✏️ Update **src/exporting-and-importing/importer.ts** to be:

@diff ../../../exercises/typescript/04-exporting-and-importing/01-problem/src/exporting-and-importing/importer.ts ../../../exercises/typescript/04-exporting-and-importing/01-solution/src/exporting-and-importing/importer.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/04-exporting-and-importing/01-solution?file=src/exporting-and-importing/exporter.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/04-exporting-and-importing/01-solution?file=src/exporting-and-importing/exporter.ts).

</details>

### Bonus exploration

- Hover over `greeter`, what does your IDE show?
- Pass a number to `greeter`, what does your IDE show?

## Next steps

Next, let’s learn how to [declare types](./types.html) in TypeScript.