@page learn-ngrx/test-redirect-effects Testing Redirect Effects
@parent learn-ngrx 10

@description Learn how to write unit tests for NgRx Effects that redirect the user.

@body


> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-redirect-effects) to get your codebase ready to work on this section.


## Overview

1. Verify navigate to dashboard page occurs when `LoginActions.loginSuccess` Action dispatches.

2. Verify navigate to login page occurs when `LoginActions.logoutSuccess` Action dispatches.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

When testing Effects, we will verify side-effects are executed properly depending when an appropriate Action is dispatched. In our case, we are working with Effects cause navigation. We can take advantage of the [RouterTestingModule](https://angular.io/api/router/testing/RouterTestingModule#usage-notes).


## Update `login.effects.spec.ts`

We will walk through updating `src/app/store/login/login.effects.spec.ts` to run tests for your Effects.


### Updating our `TestBed`

When testing navigation in Angular, we can take advantage of the [RouterTestingModule](https://angular.io/api/router/testing/RouterTestingModule#usage-notes). Using the static [`withRoutes()` method](https://angular.io/api/router/testing/RouterTestingModule#static-methods), we can prepare our tests to navigate to a mock login and dashboard page:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ../8-test-api-effects/login.effects.spec.ts ./login.effects.spec-router-testing-module.ts only
</details>


### Verifying Navigate to Dashboard Page When `LoginActions.loginSuccess` Action Dispatches

Here we can use a [spy](https://jasmine.github.io/tutorials/your_first_suite#:~:text=%C2%B6-,Spies,-Jasmine%20has%20test) to verify `Router` is used to navigate to the dashboard page:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-router-testing-module.ts ./login.effects.spec-navigate-to-dashboard.ts only
</details>


### Verifying Navigate to Login Page When `LoginActions.logoutSuccess` Action Dispatches

Here we can use a [spy](https://jasmine.github.io/tutorials/your_first_suite#:~:text=%C2%B6-,Spies,-Jasmine%20has%20test) to verify `Router` is used to navigate to the login page:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-navigate-to-dashboard.ts ./login.effects.spec.ts only
</details>


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ../8-test-api-effects/login.effects.spec.ts ./login.effects.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-redirect-effects). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/create-redirect-effects...test-redirect-effects) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-redirect-effects
```
