@page learn-typescript/configuration Configuration
@parent learn-typescript 3

@description Learn about TypeScript Configurations and Linting

@body

## Overview

In this section we'll learn about TypeScript configuration options to help us optimize our workflow.

For the exercise, we will learn how to import and export functions between modules.

## Configuring TypeScript

We're able to configure how our projects use TypeScript from selecting which files to compile to removing comments from those files. This is done through the creation of a `tsconfig.json` file.

### tsconfig.json

Customize the TypeScript compiling and linting options by creating a `tsconfig.json` file in the root directory of your TypeScript project. The following config will

- specify ECMAScript target version as 'es5'
- specify module code generation (from 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015' or 'esnext')
- generate source map files
- remove comments from compiled code

The following is just example config code. **Don't add this to your project or the tests for the TypeScript exercises in this training will fail.**

```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "removeComments": true
    }
}
```

Full configuration options are available here: <a href="http://json.schemastore.org/tsconfig" target="\_blank">http://json.schemastore.org/tsconfig</a>

### Linting

We can also configure linting options to catch bugs and help enforce uniform styling. The following options will warn on unused local variables and parameters, and expressions or declarations implying 'any'.

Besides linting with the TypeScript compiler, `tsc`, it is recommended to use a specialized linter like TSLint (now deprecated) or `ESLint`.

```javascript
{
    "compilerOptions": {
        ...
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitAny": true
        ...
	}
}
```

## ESLint

### What is ESLint?

ESLint is a static code analysis tool. It helps us find and fix problematic patterns with our code, enforce style guidelines and is highly customizable - you can code and plug in your own rules.

### Why Migrate to ESLint?

> If you are looking for migrating to ESLint on an existing Angular project, consider using [angular-eslint](https://github.com/angular-eslint/angular-eslint). We also have a [blog post](https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint "Angular Upgrades: Painless Migration from TSLint to ESLint") to help you on that!

- TSLint is [deprecated](https://github.com/palantir/tslint) since January 2020, in favor of ESLint.

- ESLint supports both TypeScript and JavaScript, so it can be used on a wider variety of projects when compared to TSLint.

- Performance improvements [have been listed](https://blog.palantir.com/tslint-in-2019-1a144c2317a9 "TSLint in 2019") as one of the reasons by the TSLint creators and maintainers for its deprecation.

### Before we start

It should be fairly painless to migrate to ESLint, but we do recommended checking if there are any TSLint rules that are considered essential to your project, and comparing those with ESLint to see if there are mismatches regarding your project's requirements. This [Migration Guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) is a great source for comparing ESLint and TSLint rules.

### Migration

The [tslint-to-eslint-config repository](https://github.com/typescript-eslint/tslint-to-eslint-config) aims to convert the TSLint configuration to "the closest possible ESLint equivalent".

1. Depending on your project, you might want to take a look at some of the [CLI flags available](https://github.com/typescript-eslint/tslint-to-eslint-config#cli-flags);
2. Run `npx tslint-to-eslint-config`.

And that's it!

### ESLint Configuration

After the migration, you should see a new file called `.eslintrc.js` with ESLint configuration in it.
It looks like this one:

```javascript
module.exports = {
  extends: "eslint:recommended",
  rules: {
    // override default options
    "no-console": "error",
    "no-alert": "error",
    yoda: ["error", "never"],

    // disable
    "init-declarations": "off",
    "no-inline-comments": "off",
  },
};
```

Yes, there is a `Yoda` rule in ESLint. It is a rule under "best practice" category, and what it does is that it can enforce developers to either write a condition like `if (lightsaber.color === 'red')` or `if ('red' === lightsaber.color)`.
Here is a [list of ESLint rules](https://eslint.org/docs/rules/). Take some time getting to know them!

For more information on TypeScript with ESLint, you can refer to the [typescript-eslint repository](https://github.com/typescript-eslint/typescript-eslint).

## Exercise: Exporting and Importing

### The Problem

In this exercise, we will:

- Update _1-ide-greeter.ts_ to export the `greeter` function as the `default`
  export. _1-ide-greeter.ts_ currently looks like:
  ```ts
  function greeter(person: string) {
    return "Hello, " + person;
  }
  ```
- Update _1-ide-hello-earth.ts_, to import and use `greeter`. _1-ide-hello-earth.ts_ currently looks like:
  ```ts
  document.body.innerHTML = greeter("Earth");
  ```
- Compile _1-ide-hello-earth.ts_ to JavaScript so we can run it.

### What You Need to Know

- [Export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) a default value like:
  ```typescript
  const value = "My Value";
  export default value;
  ```
- [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) a default value like:
  ```typescript
  import value from "./value-exporter";
  ```

### Verify Your Solution

✏️ Run the following to verify your solution works:

```shell
npm run 1-ide
```

### The Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update `1-ide-greeter.ts` to:

```typescript
function greeter(person: string) {
  return "Hello, " + person;
}

export default greeter;
```

@highlight 5

✏️ Update `1-ide-hello-earth.ts` to:

```typescript
import greeter from "./1-ide-greeter";

document.body.innerHTML = greeter("Earth");
```

@highlight 1

✏️ Compile `1-ide-hello-earth.ts` with:

```shell
tsc 1-ide-hello-earth.ts
```

</details>

### Things to Explore

- Hover over `greeter`, what does your IDE show?
- Pass a number to `greeter`, what does your IDE show?
