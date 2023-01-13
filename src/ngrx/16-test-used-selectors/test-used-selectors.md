@page learn-ngrx/test-used-selectors Testing Selector Use
@parent learn-ngrx 16

@description Learn how to write unit tests for a Component making use of NgRx Selectors.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/use-selectors) to get your codebase ready to work on this section.


## Overview

1. Verify `DashboardComponent`'s `username$` member extracts `username` from Login State.

2. Verify `AuthenticationGuard`'s `userId$` member extracts `userId` from Login State.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

In this section will write unit tests involving Sections. Whenever we use Selectors in our Components, Services, etc. We can use `provideMockStore()` to mock the behavior of our Selectors.


## Update `dashboard.component.spec.ts`

We will walk through updating `src/app/dashboard/dashboard.component.spec.ts` to run tests for your Sectors.


### Updating our `TestBed`

When testing our use of Selectors, we can specify a [configuration](https://ngrx.io/api/store/testing/MockStoreConfig) to our `MockStore`. It is possible to pass an `initialState` option which will influence our Selectors:

<details open>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ../6-test-actions/dashboard.component.spec.ts ./dashboard.component.spec-config.ts only
</details>

When our updated configuration, we can now update the remaining `TODO`s to verify the behavior of `DashboardComponent.username$` and `DashboardComponent.userId$`:

<details open>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ./dashboard.component.spec-config.ts ./dashboard.component.spec.ts only
</details>


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ../6-test-actions/dashboard.component.spec.ts ./dashboard.component.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-used-selectors). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/use-selectors...test-used-selectors) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-used-selectors
```
