@page learn-ngrx/use-selectors Using Selectors
@parent learn-ngrx 15

@description Learn how to use NgRx Selectors in a Component to access data from a store.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-selectors) to get your codebase ready to work on this part.


## Overview

1. Update `DashboardComponent`'s `username$` and `userId$` members to use Login Selectors.

2. Update `AuthenticationGuard`'s `canActivate` method to use Login Selector.


## Problem 1: TODO

TODO


## P1: What You Need to Know

TODO


## P1: Solution

<details>
<summary>src/app/dashboard/dashboard.component.ts</summary>

@diff ../5-dispatch-actions/dashboard.component.ts ./dashboard.component.ts only

</details>


## Problem 2: TODO

TODO

## P2: What You Need to Know

TODO


## P2: Solution

<details>
<summary>src/app/guards/authentication.guard.ts</summary>

@diff ../14-test-selectors/authentication.guard.ts ./authentication.guard.ts only

</details>


> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/use-selectors). You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-selectors...use-selectors) on GitHub.
