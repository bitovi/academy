@page learn-ngrx/test-reducer Testing Reducers
@parent learn-ngrx 12

@description Learn how to write unit tests for NgRx Reducers.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-reducer) to get your codebase ready to work on this section.


## Overview

1. Verify Login State updates properly when the `LoginActions.loginSuccess` Action dispatches.

2. Verify Login State resets properly when the `LoginActions.logoutSuccess` Action dispatches.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

When testing a Reducer, we will test each of its `on()` handlers by verifying each pure function returns the expected value given an Action and a Login State (typically the `initialState`). Unlike the previous testing sections, when testing the Reducer, we don't need a `TestBed` since there shouldn't be any dependencies when dealing with the Reducer.


## Update `login.selectors.spec.ts`

Before we can test our Reducer, our tests involving our Selectors are failing. This is because we've changed the shape and initial value of our Login State. To continue, we need to update them. Copy the following code to replace the contents of `src/app/store/login/login.selectors.spec.ts`:

<details>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@sourceref ./login.selectors.spec.ts
@diff ../11-create-reducer/login.selectors.spec.ts ./login.selectors.spec.ts only
</details>

We will go over these changes in the upcoming section where we go over testing Selectors ([learn-ngrx/test-selectors]). For now after you update `src/app/store/login/login.selectors.spec.ts`, all of your tests should pass.


## Update `login.reducer.spec.ts`

We will walk through updating `src/app/store/login/login.reducer.spec.ts` to run tests for your Reducer.


### Verify Login State Updates Properly When `LoginActions.loginSuccess` Action Dispatches

To test the `on()` handler associated with `LoginActions.loginSuccess`, we will define 3 values:

1. Expected Login State after Reducer handles Action.

2. The Action we are testing.

3. The generated Login State after passing `initialState` and Action to `reducer()`.

<details open>
<summary>src/app/store/login/login.reducer.spec.ts</summary>
@diff ../11-create-reducer/login.reducer.spec.ts ./login.reducer.spec-setup.ts only
</details>

Next we will add our expectations to verify that our expected Login State matches the generated Login State. When we do this, we will also verify that we do this in an immutable way to maintain an [immutable data structure](https://ngrx.io/guide/store/why#immutability-and-performance):

<details open>
<summary>src/app/store/login/login.reducer.spec.ts</summary>
@diff ./login.reducer.spec-setup.ts ./login.reducer.spec-expects.ts only
</details>

### Verify Login State Resets Properly When `LoginActions.logoutSuccess` Action Dispatches

We will do the same when testing the `on()` handler associated with `LoginActions.logoutSuccess`, but instead of defining an expected Login State, we will just use the `initialState` since it already is our expected Login State. And instead of passing our `initialState` to the `reducer()`, we will pass some updated Login State instead to ensure that all values are reset properly:

<details open>
<summary>src/app/store/login/login.reducer.spec.ts</summary>
@diff ./login.reducer.spec-expects.ts ./login.reducer.spec.ts only
</details>


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
