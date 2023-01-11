@page learn-ngrx/test-api-effects Testing API Effects
@parent learn-ngrx 8

@description Learn how to write unit tests for NgRx Effects.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effects) to get your codebase ready to work on this section.


## Overview

1. Verify `LoginActions.loginSuccess` Action dispatches when API request is successful.

2. Verify `LoginActions.loginFailure` Action dispatches when API request fails.

3. Verify `LoginActions.logoutSuccess` Action dispatches when API request is successful.

4. Verify `LoginActions.logoutFailure` Action dispatches when API request fails.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

When testing Effects, we will verify that a specific Action gets dispatched depending on the circumstances when an Effect is triggered. In our case, we are working with Effects that depend on an API response. We can take advantage of spies to simulate different API responses.


## Update `login.effects.spec.ts`

We will walk through updating `src/app/store/login/login.effects.spec.ts` to run tests for your Effects.


### Setting Up our TestBed

When testing Effects, we will need to mock the [`Actions` class](https://ngrx.io/api/effects/Actions) since it plays a major role on [how Effects work](https://ngrx.io/guide/effects#writing-effects). NgRx provides a convenient way to do this through [`provideMockActions()`](https://ngrx.io/api/effects/testing/provideMockActions):

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ../7-create-api-effects/login.effects.spec.ts ./login.effects.spec-setup-test-bed.ts only
</details>

This will allow us to set `actions$` to be an `Observable` that emits whatever Action we want for our tests:

@sourceref ./actions-example.spec.ts
@highlight 5-12, 16-19


### Mocking `LoginService`

Since our Effects use `LoginService` from `ngx-learn-ngrx`, we will need to also mock this `Service`:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-setup-test-bed.ts ./login.effects.spec-mock-login-service.ts only
</details>


### Verifying `LoginEffects.login$` Effect Dispatches `LoginActions.loginSuccess` When API Request is Successful

We will create a [spy](https://jasmine.github.io/tutorials/your_first_suite#:~:text=%C2%B6-,Spies,-Jasmine%20has%20test) to verify `LoginService.login()` is called with the expected arguments. Then we will verify that `LoginActions.loginSuccess` is dispatched with the proper payload:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-mock-login-service.ts ./login.effects.spec-login-success.ts only
</details>

> Note that we are taking advantage of the [`done()` callback to write an asynchronous test](https://jasmine.github.io/tutorials/async#callbacks). This is common when writing tests where you subscribe to an `Observable` to perform a test.


### Verifying `LoginEffects.login$` Effect Dispatches `LoginActions.loginFailure` When API Request is NOT Successful

To verify different behaviors for `LoginService`, we can take advantage of [spies](https://jasmine.github.io/tutorials/your_first_suite#:~:text=%C2%B6-,Spies,-Jasmine%20has%20test) to return a different return value:

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-login-success.ts ./login.effects.spec-login-failure.ts only
</details>


### Verifying `LoginEffects.logout$` Effect Dispatches `LoginActions.logoutSuccess` When API Request is Successful

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-login-failure.ts ./login.effects.spec-logout-success.ts only
</details>


### Verifying `LoginEffects.logout$` Effect Dispatches `LoginActions.logoutFailure` When API Request is NOT Successful

<details open>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ./login.effects.spec-logout-success.ts ./login.effects.spec.ts only
</details>


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ../7-create-api-effects/login.effects.spec.ts ./login.effects.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-api-effects). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/create-api-effects...test-api-effects) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-api-effects
```
