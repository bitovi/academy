@page learn-ngrx/create-api-effects Create an API Effect
@parent learn-ngrx 7

@description Create an NgRx effect to connect the login Store to a mock API.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-actions) to get your codebase ready to work on this part.

## Overview

1. Add `login$` Effect to `LoginEffects`

2. Dispatch `LoginActions.loginSuccess` when API request is successful

3. Dispatch `LoginActions.loginFailure` when API request fails

1. Add `logout$` Effect to `LoginEffects`

2. Dispatch `LoginActions.logoutSuccess` when API request is successful

3. Dispatch `LoginActions.logoutFailure` when API request fails

## Problem 1: Create login$ Effect to Handle API Requests

1. `LoginEffects` should create a login API request whenever the `LoginActions.login` Action is dispatched.

2. If the API request is successful, a `LoginActions.loginSuccess` Action should be dispatched using the API response.

3. If the API request is unsuccessful, a `LoginActions.loginFailure` Action should be dispatched using the following method to parse the error to a message:

<details open>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../4-create-actions/login.effects.ts ./login.effects-error-message-helper.ts only

</details>

## P1: What You Need to Know

[NgRx Effects](https://ngrx.io/guide/effects) is a side-effect model that utilizes RxJS to react to Actions being dispatched to manage side-effects such as network requests, web socket messages and time-based events. One thing that Effects are not responsible for is updating state; this is a responsiblity for Reducers ([learn-ngrx/create-reducer]).

> Note that, for a given Action, Effects will always happen after the state has been updated by the Reducer.

NgRx provides a couple of helpful functions and the `Actions` class to create Effects:

1. `createEffect` [helper function](https://ngrx.io/api/effects/createEffect) to create Effects
2. `ofType` [helper function](https://ngrx.io/api/effects/ofType) to filter Actions by `type`
3. `Actions` [class](https://ngrx.io/api/effects/Actions) that extends the RxJs Observable to listen to every dispatched Action

@sourceref ./contact.effects-initial-setup.ts
@highlight 2, 3, 7, 8, 9, 14

Taking advantage of these tools provided by NgRx, we can create API requests and dispatch a new Action using the API response:

@sourceref ./contact.effects-handle-success.ts
@highlight 2, 4, 11, 12, 13, 14, 15, 16, 17, 18, only

We can also perform error handling and dispatch a new Action when an error occurs:

@sourceref ./contact.effects.ts
@highlight 16, 17, 18, 19, 20, 21, 22, 23, only

## P1: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-error-message-helper.ts ./login.effects-login-effect.ts only

</details>

## Problem 2: Create logout$ Effect to Handle API Requests

1. `LoginEffects` should create a logout API request whenever the `LoginActions.logout` Action is dispatched.

2. If the API request is successful, a `LoginActions.logoutSuccess` Action should be dispatched using the API response. 

3. If the API request is unsuccessful, a `LoginActions.logoutFailure` Action should be dispatched using the same `getErrorMessage()` method to parse the error to a message.

## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-login-effect.ts ./login.effects.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effects).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-actions...create-api-effects) on GitHub.
