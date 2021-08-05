@page learn-typescript/eslint ESLint
@parent learn-typescript 9

@description Learn how to migrate from TSLint to ESLint

@body

> If you are looking for migrating to ESLint on an existing Angular project, consider using [angular-eslint](https://github.com/angular-eslint/angular-eslint). We also have a [blog post](https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint "Angular Upgrades: Painless Migration from TSLint to ESLint") to help you on that!

## What is ESLint?

ESLint is a static code analysis tool. It helps us find and fix problems with our code and is highly customizable.

## Why Migrate to ESLint?

- TSLint is [deprecated](https://github.com/palantir/tslint) since January 2020, in favor of ESLint.

- ESLint supports both Typescript and JavaScript, so it can be used on a wider variety of projects when compared to TSLint.

- Performance improvements [have been listed](https://blog.palantir.com/tslint-in-2019-1a144c2317a9 "TSLint in 2019") as one of the reasons by the TSLint creators and maintainers for its deprecation.

## Before we start

It should be fairly painless to migrate to ESLint, but we do recommended checking if there are any TSLint rules that are considered essential to your project, and comparing those with ESLint to see if there are mismatches regarding your project's requirements. This [Migration Guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) is a great source for comparing ESLint and TSLint rules.

## Migration

The [tslint-to-eslint-config repository](https://github.com/typescript-eslint/tslint-to-eslint-config) aims to convert the TSLint configuration to "the closest possible ESLint equivalent".

1. Depending on your project, you might want to take a look at some of the [CLI flags available](https://github.com/typescript-eslint/tslint-to-eslint-config#cli-flags);
2. Run `npx tslint-to-eslint-config`.

And that's it!
After the migration, you should see a new file called `.eslintrc.js` with ESLint configuration in it.

For more information on Typescript with ESLint, you can refer to the [typescript-eslint repository](https://github.com/typescript-eslint/typescript-eslint).
