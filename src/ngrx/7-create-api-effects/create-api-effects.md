@page learn-ngrx/create-api-effects Create an API Effect
@parent learn-ngrx 7

@description Create an NgRx Effect to connect the Login Store to an authentication API.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-actions) to get your codebase ready to work on this section.


## Overview

1. Add `login$` Effect to `LoginEffects`.

2. Dispatch `LoginActions.loginSuccess` Action when API request is successful.

3. Dispatch `LoginActions.loginFailure` Action when API request fails.

4. Add `logout$` Effect to `LoginEffects`.

5. Dispatch `LoginActions.logoutSuccess` Action when API request is successful.

6. Dispatch `LoginActions.logoutFailure` Action when API request fails.


## Problem 1: Create `login$` Effect to Handle API Requests

1. `LoginEffects` should create a login API request using `ngx-learn-ngrx`'s `LoginService.login()` method whenever the `LoginActions.login` Action is dispatched using an Effect called `login$`.

2. If the API request is successful, a `LoginActions.loginSuccess` Action should be dispatched using the API response.

3. If the API request is unsuccessful, a `LoginActions.loginFailure` Action should be dispatched using the following method to parse the error to a message:

<details open>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ../4-create-actions/login.effects.ts ./login.effects-error-message-helper.ts only

</details>

## P1: What You Need to Know

[NgRx Effects](https://ngrx.io/guide/effects) are a side-effect model that utilizes RxJS to react to Actions being dispatched to manage side-effects such as network requests, web socket messages and time-based events. One thing that Effects are not responsible for is updating state; this is a responsiblity for Reducers ([learn-ngrx/create-reducer]).

> Note that for a given Action, Effects will always happen after the state has been updated by the Reducer.

NgRx provides a couple of helpful functions and the `Actions` class to create Effects:

1. `createEffect()` [helper function](https://ngrx.io/api/effects/createEffect) to create Effects.

2. `ofType()` [helper function](https://ngrx.io/api/effects/ofType) to filter Actions by `type`.

3. `Actions` [class](https://ngrx.io/api/effects/Actions) that extends the RxJS Observable to listen to every dispatched Action.

@sourceref ./contact.effects-initial-setup.ts
@highlight 4, 5, 9, 10, 11, 16

### Flattening RxJS Operators

"Flattening" operators are commonly used when creating Effects since we will likely use `Observables` or `Promises` to make API requests or perform some asynchronous task to produce some kind of side-effect.

One way to subscribe to an "inner" `Observable` within an existing "outer" `Observable` stream is to use 
"flattening" operators such as [`mergeMap`](https://rxjs.dev/api/operators/mergeMap), [`switchMap`](https://rxjs.dev/api/operators/switchMap), or [`exhaustMap`](https://rxjs.dev/api/operators/exhaustMap). These "flattening" operators can also allow us to use `Promises` within our `Observable` stream as well.

Although we could use any of these "flattening" operators as a working solution, we will be using `exhaustMap`. Each of the "flattening" operators behave the same if the "inner" `Subscription` completes after one value is emitted and have a slightly different behavior when handling __multiple__ "inner" `Subscriptions`. For `exhaustMap`, each new "inner" `Subscription` is ignored if there is an existing "inner" `Subscription` that hasn't completed yet:

@sourceref ./exhaust-map-example.html
@codepen
@highlight 9, 15, only

As you can see by running above CodePen, only one active `Subscription` can exist at one time. A new `Subscription` can only be made once the active `Subscription` completes:
  
```
Expected Output:

Outer: 0 Inner: 0 <-- New "inner" Subscription
Outer: 0 Inner: 1
Outer: 0 Inner: 2
Outer: 4 Inner: 0 <-- New "inner" Subscription
Outer: 4 Inner: 1
Outer: 4 Inner: 2
Outer: 8 Inner: 0 <-- New "inner" Subscription
Outer: 8 Inner: 1
Outer: 8 Inner: 2
```

Taking advantage of these tools provided by NgRx, we can create API requests and dispatch a new Action using the API response:

@sourceref ./contact.effects-handle-success.ts
@highlight 4, 6, 13-20, 26, only

We can also perform error handling and dispatch a new Action when an error occurs:

@sourceref ./contact.effects.ts
@highlight 18-25, 35, only

And last, you will need to use `ngx-learn-ngrx`'s `LoginService` to perform authentication for course:

@diff ./login.effects-error-message-helper.ts ./login.effects-login-service.ts only

`LoginService` has 2 methods `login()` and `logout()` that will be needed to management authentication for this course.

> Note that authenication **DOES NOT** persist after a **page refresh**. This means that after you make code changes while serving the application, you will be signed out and will need to login again. Remember that the login page is located at `/`.

The `login()` method will throw an error if any of these cases are not met:

1. `password` must be at least 6 characters.

2. `username` must be at least 3 characters.

3. `username` must be alphanumeric including hyphens or underscores.

When one of these requirements aren't met, an error is thrown and an error is logged in the console in red text.


## P1: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-error-message-helper.ts ./login.effects-login-effect.ts only

</details>


## Problem 2: Create `logout$` Effect to Handle API Requests

1. `LoginEffects` should create a logout API request  using `ngx-learn-ngrx`'s `LoginService.logout()` method whenever the `LoginActions.logout` Action is dispatched using an Effect called `logout$`.

2. If the API request is successful, a `LoginActions.logoutSuccess` Action should be dispatched using the API response. 

3. If the API request is unsuccessful, a `LoginActions.logoutFailure` Action should be dispatched using the same `getErrorMessage()` method to parse the error to a message.


## P2: Solution

<details>
<summary>src/app/store/login/login.effects.ts</summary>

@diff ./login.effects-login-effect.ts ./login.effects.ts only

</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effects). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/test-actions...create-api-effects) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/create-api-effects
```
