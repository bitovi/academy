@page learn-ngrx/create-redirect-effects Creating Redirect Effects
@parent learn-ngrx 9

@description Learn how to create NgRx Effects that redirect the user.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-api-effects) to get your codebase ready to work on this section.


## Overview

1. Add `loginSuccess$` Effect to `LoginEffects` to navigate to dashboard page.

2. Add `logoutSuccess$` Effect to `LoginEffects` to navigate to login page.


## Problem 1: Create `loginSuccess$` Effect to Handle Navigating to Dashboard Page

`LoginEffects` should use `Router` to navigate to the dashboard page at path `/dashboard` using an Effect called `loginSuccess$`.


## P1: What You Need to Know

Although it's common for Effects to dispatch another Action after handling a side-effect, there is a way to update the configuration for an Effect to never dispatch an Action instead. This is useful when a side-effect resolves and there's no need to trigger another side-effect or update state.

To understand this better, let's take a deeper dive into the `createEffect()` [helper function](https://ngrx.io/api/effects/createEffect):

`createEffect()` takes two arguments:

1. `source` - A function which returns an `Observable`.

2. `config` (optional) - A `Partial<EffectConfig>` to configure the Effect. By default, `dispatch` option is true and `useEffectsErrorHandler` is true.

And if we look a little deeper, here is the type definition of the `EffectConfig` interface:

```ts
/**
 * Configures an Effect created by `createEffect()`.
 */
export interface EffectConfig {
  /**
   * Determines if the Action emitted by the Effect is dispatched to the store.
   * If false, Effect does not need to return type `Observable<Action>`.
   */
  dispatch?: boolean;
  /**
   * Determines if the Effect will be resubscribed to if an error occurs in the main Actions stream.
   */
  useEffectsErrorHandler?: boolean;
}
```

By default, the `dispatch` option is set to `true`, but if we set it to `false`, the Effect doesn't have to end with an Action being dispatched:

@sourceref ./contact.effects.ts
@highlight 14, 15, 18


## P1: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../7-create-api-effects/login.effects.ts ./login.effects-login-success-effect.ts only

</details>


## Problem 2: Create `logoutSuccess$` Effect to Handle Navigating to Login Page

`LoginEffects` should use `Router` to navigate to the dashboard page at path `/` using an Effect called `loginSuccess$`.


## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-login-success-effect.ts ./login.effects.ts only

</details>


## Verify Implementation

At this point, you should be able to login on the login page:

> Note that authenication **DOES NOT** persist after a **page refresh**. This means that after you make code changes while serving the application, you will be signed out and will need to login again. Remember that the login page is located at `/`.

The `LoginService.login()` method will throw an error if any of these cases are not met:

1. `password` must be at least 6 characters.

2. `username` must be at least 3 characters.

3. `username` must be alphanumeric including hyphens or underscores.

_When one of these requirements aren't met, an error is thrown and an error is logged in the console in red text._


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-redirect-effects). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/test-api-effects...create-redirect-effects) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/create-redirect-effects
```
