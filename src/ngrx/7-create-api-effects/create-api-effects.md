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

## Problem 1: TODO

TODO

## P1: What You Need to Know

<details open>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../4-create-actions/login.effects.ts ./login.effects-error-message-helper.ts only

</details>

## P1: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-error-message-helper.ts ./login.effects-login-effect.ts only

</details>

## Problem 1: TODO

TODO

## P1: What You Need to Know

<details open>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../4-create-actions/login.effects.ts ./login.effects-error-message-helper.ts only

</details>

## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-error-message-helper.ts ./login.effects-login-effect.ts only

</details>


## Problem 2: TODO

TODO

## P2: What You Need to Know

TODO: (remove?)

## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-login-effect.ts ./login.effects.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effects).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-actions...create-api-effects) on GitHub.
