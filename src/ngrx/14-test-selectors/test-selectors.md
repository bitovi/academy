@page learn-ngrx/test-selectors Testing Selectors
@parent learn-ngrx 14

@description Learn how to write unit tests for NgRx Selectors.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-selectors) to get your codebase ready to work on this section.


## Overview

1. Verify `selectUserId` returns `userId`.

1. Verify `selectUsername` returns `username`.

1. Verify `selectToken` returns `token`.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

TODO: remove or use parts of for an intro for the section

You'll need to copy the contents of the test file to run tests for your Selectors.

## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ../12-test-reducer/login.selectors.spec.ts ./login.selectors.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-selectors). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/create-selectors...test-selectors) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-selectors
```
