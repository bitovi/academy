@page learn-ngrx/create-selectors Creating Selectors
@parent learn-ngrx 13

@description Learn how to create NgRx selectors to retrieve data from stores.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-reducer) to get your codebase ready to work on this part.

## Overview

1. Create Selector for `userId`

1. Create Selector for `username`

1. Create Selector for `token`

## Problem 1: TODO

TODO

## P1: What You Need to Know

TODO

## P1: Solution

<details>
<summary>src/app/store/login/login.selectors.ts</summary>

@diff ../12-test-reducer/login.selectors.ts ./login.selectors-user-id.ts only

</details>

## Problem 2: TODO

TODO

## P2: What You Need to Know

TODO: (remove?)

## P2: Solution

<details>
<summary>src/app/store/login/login.selectors.ts</summary>

@diff ./login.selectors-user-id.ts ./login.selectors.ts only

</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-selectors).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/test-reducer...create-selectors) on GitHub.
