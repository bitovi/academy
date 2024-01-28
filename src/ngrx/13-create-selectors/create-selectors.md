@page learn-ngrx/create-selectors Creating Selectors
@parent learn-ngrx 13

@description Learn how to create NgRx Selectors to obtain data from States.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-reducer) to get your codebase ready to work on this section.


## Overview

1. Create Selector for `userId`.

1. Create Selector for `username`.

1. Create Selector for `token`.


## Problem 1: Creating a Feature Selector For `userId`

There should be a Selector that obtains the `userId` from the Login State.


## P1: What You Need to Know

NgRx Selectors are `pure` functions used for [obtaining slices of state](https://ngrx.io/guide/store/selectors#using-a-selector-for-one-piece-of-state).

NgRx provide 2 helper functions when creating Selectors:

1. [createFeatureSelector](https://ngrx.io/api/store/createFeatureSelector) - Used to obtain the entire Feature State from the Global State by looking up the Login Feature key.

2. [createSelector](https://ngrx.io/api/store/createSelector) - Uses other Selectors to obtain slices of state. The first arguments are any other Selectors used for this new Selector. The last argument of this function is a `pure` function commonly referred to as a **projector**.

The NgRx schematics take care of creating our Login Selector, and it’s up to us to create additional Selectors using that generated Feature Selector to obtain slices of that state:

```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';

// Generated Feature Selector
export const selectContactState = createFeatureSelector<fromContact.State>(
  fromContact.contactFeatureKey
);

// Selector that obtains email address from Feature State
export const selectContactEmailAddress = createSelector(
  selectContactState,
  state => state.emailAddress
);
```


## P1: Solution

<details>
<summary>src/app/store/login/login.selectors.ts</summary>
@diff ../12-test-reducer/login.selectors.ts ./login.selectors-user-id.ts only
</details>


## Problem 2: Creating a Feature Selector For `username` and `token`

There should be a Selector that obtains the `username` and another Selector for `token`. Both should obtain values from the Login State.


## P2: Solution

<details>
<summary>src/app/store/login/login.selectors.ts</summary>
@diff ./login.selectors-user-id.ts ./login.selectors.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-selectors). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/test-reducer...create-selectors) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/create-selectors
```
