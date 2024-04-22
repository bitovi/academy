@page learn-ngrx/test-selectors Testing Selectors
@parent learn-ngrx 14

@description Learn how to write unit tests for NgRx Selectors.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-selectors) to get your codebase ready to work on this section.


## Overview

1. Verify `selectUserId()` Selector returns `userId`.

1. Verify `selectUsername()` Selector returns `username`.

1. Verify `selectToken()` Selector returns `token`.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

When testing Selectors, we will mock the Login State and verify that each Selector returns the expected result. Like testing the Reducer, we don’t need a `TestBed` since there shouldn’t be any dependencies when dealing with Selectors since they are pure functions.


## Update `login.selectors.spec.ts`

We will walk through updating `src/app/store/login/login.selectors.spec.ts` to run tests for your Selectors.


## Verify Feature State Selector

This test has already been written in a previous section where we were testing the Reducer ([learn-ngrx/test-reducer]):

<details open>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@sourceref ../12-test-reducer/login.selectors.spec.ts
@highlight 6-23
</details>

The Feature State Selector is unique to all other Selectors for a Feature Store because this Selector is the source for all other Selectors for a Feature Store and is the only Selector generated using the [`createFeatureSelector()`](https://ngrx.io/guide/store/selectors#selecting-feature-states) helper. Testing the Feature State Selector should be straight-forward since it should return all of the Login State.


## Verify `selectUserId` Selector Returns `userId`

To properly test Selectors in a way that ensures that each Selector does not rely on mutations on the Login State, we will use `beforeEach()` to create a fresh Login State per test:

<details open>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ../12-test-reducer/login.selectors.spec.ts ./login.selectors.spec-before-each.ts only
</details>

Now we can write our tests for our Selectors. The first Selector we will test is the `selectUserId()` Selector:

<details open>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ./login.selectors.spec-before-each.ts ./login.selectors.spec-user-id.ts only
</details>


## Verify `selectUsername()` Selector Returns `username`

<details open>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ./login.selectors.spec-user-id.ts ./login.selectors.spec-username.ts only
</details>


## Verify `selectToken()` Selector Returns `token`

<details open>
<summary>src/app/store/login/login.selectors.spec.ts</summary>
@diff ./login.selectors.spec-username.ts ./login.selectors.spec.ts only
</details>


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
