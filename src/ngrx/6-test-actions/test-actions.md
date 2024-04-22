@page learn-ngrx/test-actions Testing Actions
@parent learn-ngrx 6

@description Learn how to write unit tests for NgRx Actions.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/dispatch-actions) to get your codebase ready to work on this section.


## Overview

1. Verify `LoginActions.logout` Action dispatches when calling `DashboardComponent`’s `logout()`.

2. Verify `LoginActions.login` Action dispatches with form payload when calling `LoginComponent`’s `login()`.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Introduction

Each implementation section will be paired with a testing section. These testing sections will go over the basics of how to test the implementation and use of NgRx. Before continuing, you should have an intermediate understanding of the following:

1. [Angular TestBeds](https://angular.io/guide/testing-utility-apis) - Although `TestBeds` aren’t required for testing Angular applications, and [there are ways to test NgRx without a TestBed](https://ngrx.io/guide/store/testing#testing-without-testbed), we use `TestBeds` throughout this course.

2. [Jasmine Unit Tests](https://github.com/jasmine/jasmine#a-javascript-testing-framework) - Throughout this course, we will be using [Jasmine to test our application](https://jasmine.github.io/tutorials/your_first_suite). Although the syntax will differ slightly between different testing tools such as [Mocha](https://mochajs.org/) and [Jest](https://jestjs.io/), the concepts used throughout this course will apply to whatever solution you use in your future projects.


## Description

In this section, we will write unit tests involving Actions. When testing Actions, we don’t typically test Actions directly. Instead, we test their use in Components, Effects, and Reducers.
Throughout this course we will cover all these situations. For this section, we will verify that Actions are dispatched when expected by checking their use in Components.

## Update `dashboard.component.spec.ts`

We will walk through updating `src/app/dashboard/dashboard.component.spec.ts` to run tests for your Actions.

### Setting Up our `TestBed`

When unit testing in general, we should use stubs to isolate parts of our application. Luckily NgRx makes this process simple by providing a way to create a mock `Store`:

1. [MockStore](https://ngrx.io/api/store/testing/MockStore) - `MockStore` extends the `Store` class and [provides stubs for its methods](https://ngrx.io/guide/store/testing).

2. [provideMockStore()](https://ngrx.io/api/store/testing/provideMockStore) - Generates a `MockStore` instance given a [configuration](https://ngrx.io/api/store/testing/MockStoreConfig).

<details open>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ../5-dispatch-actions/dashboard.component.spec.ts ./dashboard.component.spec-test-bed-setup.ts only
</details>


### Verify `LoginActions.logout` Action Dispatches Properly

In `src/app/dashboard/dashboard.component.spec.ts`, there is a `describe` block with a `TODO`: "Spy on dispatching action". We will create a [spy](https://jasmine.github.io/tutorials/your_first_suite#:~:text=%C2%B6-,Spies,-Jasmine%20has%20test) to track when our `MockStore` dispatches an Action:

<details open>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ./dashboard.component.spec-test-bed-setup.ts ./dashboard.component.spec-spy-on-store.ts only
</details>

Next we will verify that the expected Action was dispatched after `logout()` is called:

<details open>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ./dashboard.component.spec-spy-on-store.ts ./dashboard.component.spec.ts only
</details>

> Note that there are 2 more pending `TODO`s in `src/app/dashboard/dashboard.component.spec.ts` that will be resolved in upcoming sections. For now we’ll only be testing our Actions.


## Update `login.component.spec.ts`

We will walk through updating `src/app/login/login.component.spec.ts` to run tests for your Actions.

### Setting Up our `TestBed`

<details open>
<summary>src/app/login/login.component.spec.ts</summary>
@diff ../5-dispatch-actions/login.component.spec.ts ./login.component.spec-test-bed-setup.ts only
</details>


### Verify `LoginActions.login` Action Dispatches Properly With Form Payload

Unlike the `LoginActions.logout` Action, `LoginActions.login` Action requires a payload when dispatched. In our test, we will pass the state of our form:

<details open>
<summary>src/app/login/login.component.spec.ts</summary>
@diff ./login.component.spec-test-bed-setup.ts ./login.component.spec-dispatch-action.ts only
</details>


### Verify `LoginActions.login` Action Does NOT Dispatch When Necessary

<details open>
<summary>src/app/login/login.component.spec.ts</summary>
@diff ./login.component.spec-dispatch-action.ts ./login.component.spec.ts only
</details>


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ../5-dispatch-actions/dashboard.component.spec.ts ./dashboard.component.spec.ts only
</details>

<details>
<summary>src/app/login/login.component.spec.ts</summary>
@diff ../5-dispatch-actions/login.component.spec.ts ./login.component.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-actions). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/dispatch-actions...test-actions) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-actions
```
