@page learn-ngrx/create-actions Creating Actions
@parent learn-ngrx 4

@description Learn how to create NgRx Actions.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/ngrx-init) to get your codebase ready to work on this part.


## Overview

1. Replace generated Actions with new Login Actions.

2. Create Logout Actions.

3. Clean up code involving replaced Actions.


## Problem 1: Create Login Actions to Represent Login Events

NgRx schematics generated Actions with the following Action Types: `[Login] Load Logins`, `[Login] Load Logins Success` and `[Login] Load Logins Failure`.

Our goal is to have a different set of Action instead:

1. `login` - Dispatched when user submits username and password:
    - type: `[Login Page] Login`
    - props: `{ username: string, password: string }`

2. `loginSuccess` - Dispatched by an Effect when user has successfully logged in:
    - type: `[Login API] Login Success`
    - props: `{ userId: string; username: string; token: string }`
    
3. `loginFailure` - Dispatched by an Effect when user login attempt fails:
    - type: `[Login API] Login Failure`
    - props: `{ errorMsg: string }`


## P1: What You Need to Know

Action Types in NgRx follow a string pattern: `[Source] Event`. Since Actions represent a unique event, an Action Type should be a unique identifier for that event. NgRx encourages Actions to be unique in order to help with application debugging, traceability and maintainability. [Here’s a great presentation about Action Best Practices](https://www.youtube.com/watch?v=JmnsEvoy-gY) from Mike Ryan, co-creator of NgRx.

`createAction()` can take up to two arguments: the string `type` and a `config` function that represents additional metadata, usually referred as `props` in Redux Pattern:

```ts
import { createAction, props } from '@ngrx/store';

export const submit = createAction(
  '[Contact Page] Submit',// type
  props<{ emailAddress: string; fullName: string }>()// props
);
```


## P1: Solution

<details>
<summary>src/app/store/login/login.actions.ts</summary>

@diff ../3-ngrx-init/login.actions.ts ./login.actions-login-actions.ts only

</details>


## Problem 2: Create Logout Actions to Represent Logout Events

Next, our goal is to create 3 more Actions for logout:

1. `logout` - Dispatched when user clicks on a logout button
    - type: `[Dashboard Page] Logout`
2. `logoutSuccess` - Dispatched by an Effect when the user has successfully logged out
    - type: `[Login API] Logout Success`
3. `logoutFailure` - Dispatched by an Effect when user logout attempt fails
    - type: `[Login API] Logout Failure`
    - props: `{ errorMsg: string }`


## P2: Solution

<details>
<summary>src/app/store/login/login.actions.ts</summary>

@diff ./login.actions-login-actions.ts ./login.actions.ts only

</details>


## Cleaning Up Removed Actions

Now that we've removed the generated Actions, we will need to update a couple of files so that our application can run:

>Also note that this clean up will be required for the upcoming unit tests to pass

First, we'll remove the generated Effects. And we will remove the unused imports from `@ngrx/effects`, `rxjs/operators`, `rxjs`, and `./login.actions`:

<details open>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../3-ngrx-init/login.effects.ts ./login.effects.ts only

</details>

Last, we'll remove the generated `on()` handlers in our Reducer function. And we will remove the unused imports from `@ngrx/store` and `./login.actions`:

<details open>
<summary>src/app/store/login/login.reducer.ts</summary>

@diff ../3-ngrx-init/login.reducer.ts ./login.reducer.ts only

</details>


> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-actions). You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/ngrx-init...create-actions) on GitHub.
