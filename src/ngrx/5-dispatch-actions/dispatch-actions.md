@page learn-ngrx/dispatch-actions Dispatching Actions
@parent learn-ngrx 5

@description Learn how to dispatch NgRx Actions from within Angular Components.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-actions) to get your codebase ready to work on this part.


## Overview

1. Update `LoginComponent` to dispatch `LoginActions.login` Action.

2. Update `DashboardComponent` to dispatch `LoginActions.logout` Action.


## Problem 1: Dispatch Login Action on `LoginComponent`

Now that we have our Actions, let's use them. The `LoginComponent` should have the Login Action be dispatched when the submit button is clicked.


## P1: What You Need to Know

We can import our Action creators from `src/app/store/login/login.actions.ts` to create Actions and then use the NgRx Store to dispatch them:

@sourceref ./contact.component.ts
@highlight 2, 3, 14

In upcoming sections, we will discuss how dispatched Actions can trigger Reducer functions ([learn-ngrx/create-reducer]) and how Effects listen to Actions dispatched from the Store to handle _side-effects_ ([learn-ngrx/create-api-effects]). You can learn more about how to write Actions and how to dispatch them in the [NgRx documentation on Actions](https://ngrx.io/guide/store/actions#writing-actions).

In the `LoginComponent`, there is a `TODO` where the Login Action should be dispatched.


## P1: Solution

<details>
<summary>src/app/login/login.component.ts</summary>

@diff ../4-create-actions/login.component.ts ./login.component.ts only

</details>


## Problem 2: Dispatch Logout Action on `DashboardComponent`

And the `DashboardComponent` should have the Logout Action be dispatched when the logout button is clicked.


## P2: What You Need to Know

In the `DashboardComponent`, there is a `TODO` where the Logout Action should be dispatched.


## P2: Solution

<details>
<summary>src/app/dashboard/dashboard.component.ts</summary>

@diff ../4-create-actions/dashboard.component.ts ./dashboard.component.ts only

</details>


> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/dispatch-actions). You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/create-actions...dispatch-actions) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/dispatch-actions
```
