@page learn-ngrx/test-reducer Testing Reducers
@parent learn-ngrx 12

@description Learn how to write unit tests for NgRx Reducers.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-reducer) to get your codebase ready to work on this section.


## Overview

3. Verify Login State updates properly when `LoginActions.loginSuccess` Action dispatches.

4. Verify Login State resets properly when `LoginActions.logoutSuccess` Action dispatches.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

When testing a Reducer, we will verify each of its `on()` handlers. This involves 2 main goals:

1. List out each Action involved for each `on()` handler.

2. Right unit tests using pure functions per test case of each Action.

In our case, we are working with Effects cause navigation. We can take advantage of the [RouterTestingModule](https://angular.io/api/router/testing/RouterTestingModule#usage-notes).

You'll need to copy the contents of two test files to run tests for your Reducer. We're updating the test files for both the Login Reducer and Selectors.


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/store/login/login.reducer.spec.ts</summary>
@diff ../11-create-reducer/login.reducer.spec.ts ./login.reducer.spec.ts only
</details>

<details>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ../11-create-reducer/login.selectors.spec.ts ./login.selectors.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-reducer). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/create-reducer...test-reducer) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-reducer
```
