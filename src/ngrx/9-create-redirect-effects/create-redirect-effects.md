@page learn-ngrx/create-redirect-effects Creating Redirect Effects
@parent learn-ngrx 9

@description Learn how to create NgRx Effects that redirect the user.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-api-effects) to get your codebase ready to work on this part.

## Overview

1. Add `loginSuccess$` Effect to `LoginEffects` to navigate to dashboard page

2. Add `logoutSuccess$` Effect to `LoginEffects` to navigate to login page

## Problem 1: TODO

TODO

## P1: What You Need to Know

TODO

## P1: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../7-create-api-effects/login.effects.ts ./login.effects-login-success-effect.ts only

</details>

## Problem 2: TODO

TODO

## P2: What You Need to Know

TODO

## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-login-success-effect.ts ./login.effects.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-redirect-effects).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-api-effects...create-redirect-effects) on GitHub.
