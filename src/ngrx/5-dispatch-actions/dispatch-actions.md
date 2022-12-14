@page learn-ngrx/dispatch-actions Dispatching Actions
@parent learn-ngrx 5

@description Learn how to dispatch NgRx actions from within Angular components.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-actions) to get your codebase ready to work on this part.

## Overview

1. Update `LoginComponent` to dispatch `LoginActions.login`

2. Update `DashboardComponent` to dispatch `LoginActions.logout`

## Problem 1: TODO

TODO

## P1: What You Need to Know

TODO

## P1: Solution

<details>
<summary>src/app/login/login.component.ts</summary>

@diff ../4-create-actions/login.component.ts ./login.component.ts only

</details>

## Problem 2: TODO

TODO

## P2: What You Need to Know

TODO (remove?)

## P2: Solution

<details>
<summary>src/app/dashboard/dashboard.component.ts</summary>

@diff ../4-create-actions/dashboard.component.ts ./dashboard.component.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/dispatch-actions).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/create-actions...dispatch-actions) on GitHub.
