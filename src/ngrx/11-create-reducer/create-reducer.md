@page learn-ngrx/create-reducer Create a Reducer
@parent learn-ngrx 11

@description Learn how to create an NgRx reducer.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-redirect-effects) to get your codebase ready to work on this part.

## Overview

1. Define Login feature state shape

2. Set Login initial state

3. Update Reducer function to include handler for `LoginActions.loginSuccess` to update Login feature state

4. Update Reducer function to include handler for `LoginActions.logoutSuccess` to reset Login feature state

## Problem 1: Define Login Feature State Shape

Update the Login feature State shape by adding `userId`, `username`, and `token` properties to its interface definition. Each property should have type `string | null`.

## P1: What You Need to Know

Now that we have all of our Actions prepared to dispatch whenever we need, we will update the Login feature state. Updating the Reducer for your feature state has 3 steps:

1. Define or update `Store` interface to have an [expected shape](https://ngrx.io/guide/store/reducers#defining-the-state-shape) after Reducer updates state

2. Set or update value to [state's initial value](https://ngrx.io/guide/store/reducers#setting-the-initial-state) to satisfy new `Store` interface definition

3. [Add or update handler(s)](https://ngrx.io/guide/store/reducers#creating-the-reducer-function) used to define Reducer function

To prepare this, we need to update the Login feature `State` interface found at `src/app/store/login/login.reducer.ts`. Here is an example of how to add properties to an interface:

@sourceref ./contact.ts
@highlight 2, 3

## P1: Solution

<details>
<summary>src/app/store/login/login.reducer.ts</summary>

@diff ../4-create-actions/login.reducer.ts ./login.reducer-define-state.ts only

</details>

## Problem 2: Set Initial Value For Login Feature State

Set initial state for Login feature state. Each member of the Login feature state should start with `null` as its value.

## P2: What You Need to Know

Now that we have updated the Login feature state's shape by updating the `State` interface, we need to update its initial shape. By default, we will set each member to `null`. Here is an example of doing that:

@sourceref ./initial-value.ts
@highlight 2, 3

## P2: Solution

<details>
<summary>src/app/store/login/login.reducer.ts</summary>

@diff ./login.reducer-define-state.ts ./login.reducer-initial-state.ts only

</details>

## Problem 3: Update Login Feature State With Login Information On Login

Login Reducer should include `on` handler that updates Login feature state with `userId`, `username` and `token` whenever `LoginActions.loginSuccess` Action is dispatched.

## P3: What You Need to Know

We can [create NgRx Reducers](https://ngrx.io/guide/store/reducers#creating-the-reducer-function) using the [`createReducer`](https://ngrx.io/api/store/createReducer#description) helper function.

The first argument for `createReducer` sets the initial value of your feature state. Then every argument after should be an [`on` handler function calls](https://ngrx.io/api/store/on).

When writing an `on` handler, there are 2 arguments that we need to provide:

1. The Action that this `on` handler is reacting to

2. A [**pure function**](https://en.wikipedia.org/wiki/Pure_function) that takes in 2 arguments: `state` and `action`. This function should always return a new state that will replace the previous feature state

@sourceref ./counter.reducer.ts
@highlight 5, 6, 7

## P3: Solution

<details>
<summary>src/app/store/login/login.reducer.ts</summary>

@diff ./login.reducer-initial-state.ts ./login.reducer-on-login-success.ts only

</details>

## Problem 4: Reset Login Feature State On Logout

Login Reducer should include `on` handler that resets Login feature state back to `initialState` whenever `LoginActions.logoutSuccess` Action is dispatched.

## P4: What You Need to Know

A common requirement is to reset a feature state. One approach might look like this:

@diff ./counter.reducer.ts ./counter.reducer-with-set-zero.ts

But there is nothing wrong with reusing the `initialState` constant:

@diff ./counter.reducer.ts ./counter.reducer-with-reset-handler.ts

Both solutions are fine, but it is likely better to reuse `initialState` to future-proof the Reducer for future requirements.

## P4: Solution

<details>
<summary>src/app/store/login/login.reducer.ts</summary>

@diff ./login.reducer-on-login-success.ts ./login.reducer.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-reducer).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-redirect-effects...create-reducer) on GitHub.
