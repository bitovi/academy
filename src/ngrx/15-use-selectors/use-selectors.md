@page learn-ngrx/use-selectors Using Selectors
@parent learn-ngrx 15

@description Learn how to use NgRx Selectors in a Component to access data from a store.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-selectors) to get your codebase ready to work on this section.


## Overview

1. Update `DashboardComponent`'s `username$` and `userId$` members to use Login Selectors.

2. Update `AuthenticationGuard`'s `canActivate()` method to use Login Selector.


## Problem 1: Update `username$` and `userId$` to use Login Selectors on `DashboardComponent`

`DashboardComponent` should use the `LoginSelectors.selectUsername` and `LoginSelectors.selectUserId` Selectors for its `username$` and `userId$` members.


## P1: What You Need to Know

Now that we have our Selectors defined, we can inject `Store` into our `Components` and use the `select()` method to obtain slices of state using our Selectors:

@sourceref ./contact.component.ts
@highlight 2, 3, 11, 13

In the `DashboardComponent`, there is are `TODO`'s where the Login Selectors should be used.


## P1: Solution

<details>
<summary>src/app/dashboard/dashboard.component.ts</summary>
@diff ../5-dispatch-actions/dashboard.component.ts ./dashboard.component.ts only
</details>


## Problem 2: Update `canActivate()` to use Login Selector on `AuthenticationGuard`

`AuthenticationGuard`'s `canActivate()` method should use the `LoginSelectors.selectToken` Selector.

## P2: What You Need to Know

In the `AuthenticationGuard`, there is a `TODO` where the Login Selector should be used.


## P2: Solution

<details>
<summary>src/app/guards/authentication.guard.ts</summary>
@diff ../14-test-selectors/authentication.guard.ts ./authentication.guard.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/use-selectors). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/test-selectors...use-selectors) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/use-selectors
```
