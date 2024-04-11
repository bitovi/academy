@page learn-typescript/configuration Configuration
@parent learn-typescript 4

@description Learn about TypeScript Configurations and Linting

@body

## Overview

In this section we will:

- Learn about TypeScript configuration options to help us optimize our workflow
- Learn about linting with TypeScript

## Configuring TypeScript

We’re able to configure how our projects use TypeScript from selecting which files to compile to removing comments from those files. This is done through the creation of a `tsconfig.json` file.

### tsconfig.json

Customize the TypeScript compiling and linting options by creating a `tsconfig.json` file in the root directory of our TypeScript project. The following config will

- specify ECMAScript target version as 'es5'
- specify module code generation (from 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015' or 'esnext')
- generate source map files
- remove comments from compiled code

The following is an example config code. **Don’t add this to our project or the tests for the TypeScript exercises in this training will fail.**

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

To learn more about all of the options tsconfig has, check out the <a href="https://www.typescriptlang.org/tsconfig">TypeScript TSConfig Reference</a>. The Schema can also be found <a href="http://json.schemastore.org/tsconfig">here</a>.

## Linting

We can also configure linting options to catch bugs and help enforce uniform styling. The following options will warn on unused local variables and parameters, and expressions or declarations implying 'any'.

Besides linting with the TypeScript compiler, `tsc`, it is recommended to use a specialized linter like `ESLint`.

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

### ESLint

ESLint is a static code analysis tool. It helps us find and fix problematic patterns with our code, enforce style guidelines and is highly customizable - we can code and plug in our own rules.

### Why Migrate to ESLint?

> If we are looking for migrating to ESLint on an existing Angular project, consider using [angular-eslint](https://github.com/angular-eslint/angular-eslint). We also have a [blog post](https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint "Angular Upgrades: Painless Migration from TSLint to ESLint") to help we on that!

- TSLint is [deprecated](https://github.com/palantir/tslint) since January 2020, in favor of ESLint.

- ESLint supports both TypeScript and JavaScript, so it can be used on a wider variety of projects when compared to TSLint.

- Performance improvements [have been listed](https://blog.palantir.com/tslint-in-2019-1a144c2317a9 "TSLint in 2019") as one of the reasons by the TSLint creators and maintainers for its deprecation.

### Before Starting

It should be fairly painless to migrate to ESLint, but we do recommended checking if there are any TSLint rules that are considered essential to our project, and comparing those with ESLint to see if there are mismatches regarding our project’s requirements. This [Migration Guide](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/TSLINT_RULE_ALTERNATIVES.md) is a great source for comparing ESLint and TSLint rules.

### Migration

The [tslint-to-eslint-config repository](https://github.com/typescript-eslint/tslint-to-eslint-config) aims to convert the TSLint configuration to "the closest possible ESLint equivalent".

1. Depending on our project, we might want to take a look at some of the [CLI flags available](https://github.com/typescript-eslint/tslint-to-eslint-config#cli-flags);
2. Run `npx tslint-to-eslint-config`.

And that’s it!

### ESLint Configuration

After the migration, we should see a new file called `.eslintrc.js` with ESLint configuration in it.
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

For more information on TypeScript with ESLint, we can refer to the [typescript-eslint repository](https://github.com/typescript-eslint/typescript-eslint).

## Next steps

Next we will learn how to import and export functions between modules.