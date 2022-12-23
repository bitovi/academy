@page learn-ngrx/why-ngrx Why NgRx
@parent learn-ngrx 1

@description Why NgRx is a great choice for State Management.

@body

1. Actively Maintained - NgRx is [actively maintained](https://github.com/ngrx/platform) and keeps evolving with Angular.

2. Great Documentation - [NgRx documentation](https://ngrx.io/docs) is great and [@ngrx/eslint-plugin](https://ngrx.io/guide/eslint-plugin) can help you follow NgRx’s best practices.

    > PRO TIP: if you use [@bitovi/eslint-config](https://github.com/bitovi/eslint-config), there’s no need to worry: NgRx recommended ESLint rules will be configured for you.

3. Maintainability - While NgRx allegedly has a lot of boilerplate code, NgRx does help keep your code tidy!

4. Performance - NgRx is carefully implemented with performance in mind, and it complements the Angular Ecosystem perfectly because of its Reactive approach.

## Understanding the Key Concepts of NgRx

### Redux Pattern

The Redux pattern manages the Global State of an application and aims at code testability and predictability.

Redux is known for its boilerplate code. At first, it might seem like a lot of effort to implement Redux, but in fact it is a tradeoff. Redux adds a layer of indirection in order to improve maintainability, testability and predictability of your application. The tradeoff pays off more often than not particularly if your application is complex, large and maintained by a large team.

[Redux expects updates to the state to be done immutably](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability). Not only does Immutability help Redux implement patterns that increase testability and predictability, it also improves performance, as change detection is achieved with less effort.

#### Store

A Store is an object that wraps the state. The Store also provides helper functions to update the state and listen to state changes.


#### Actions

Actions are objects that represent individual events in your application.

Actions are created using two properties:

1. `type` describes the event.

2. `payload` (optional) holds additional information.

Actions are necessary to update the state by triggering Reducers.


#### Reducers

To put it simply, Reducers are `pure` functions that take the state and an Action as arguments, and return a new state. In other words, Reducers are functions that, given an Action, know how to update the state.

Reducers functions must be `pure`:

1. do not depend on any information other than the Action and current state.

2. do not perform side-effects, like mutating the current state. When using NgRx, side-effects are already handled through Effects.


#### Dispatch

A Dispatch is a Store method that will provide an Action to the Reducer function. You can see the Dispatch method as the API to update the state. Effects also listen for every Action dispatched from the Store to handle _side-effects_.


#### Selectors

Selectors are functions that extract data from the state. Selectors can return derived data or slices of the state.


#### One-way Data Flow

To help you understand how Redux pieces work together, let’s take a look at the most basic representation of how data is passed around in an application that uses Redux, also known as a _one-way data flow_, [taken from the Redux Official Documentation](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#state-management).

<figure>
    <img src="../static/img/ngrx/1-why-ngrx/ngrx-one-way-data-flow.png" alt="One-way data flow" style="width: 640px">
    <figcaption style="text-align: center; width: 640px">One-way Data Flow (<a href="https://redux.js.org/tutorials/essentials/part-1-overview-concepts">Source</a>)</figcaption>
</figure>

Data goes through the following steps:

1. An `action` is `dispatched`.

2. A `reducer` function takes the `action` type and payload and current `state` to return a new `state`.

3. The `view`, which is subscribed to `state` changes through `selectors`, triggers a re-render of the `view` based on the new `state`.


### NgRx State Management Lifecycle

NgRx abstracts away from _one-way data flow_ to represent its own Store implementation pieces and interaction with external entities, such as Components and Services, to what is referred to as the _State Management Lifecycle_.

<figure>
    <img src="../static/img/ngrx/1-why-ngrx/state-management-lifecycle.png" alt="NgRx State Management Lifecycle diagram" style="width: 640px">
    <figcaption style="text-align: center; width: 640px">NgRx State Management Lifecycle (<a href="https://ngrx.io/guide/store">Source</a>)</figcaption>
</figure>

#### Effects

We’ve mentioned _side-effects_ before: Reducer functions must be pure and not perform side-effects. While the [Redux pattern suggests that side-effects should be performed as part of the Action creation process](https://redux.js.org/faq/actions#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior), NgRx’s solution - Effects - is a more reactive approach.

In NgRx, Effects will:

1. Listen to an `action$` Observable and filter the Action(s) relevant to the Effects.

2. Perform side-effects and return a new Action. If there’s no need to update the state or trigger other Effects, an Effect may not return a new Action (Non-dispatching Effect).

> Note that for a given Action, Effects will always happen after the state has been updated by the Reducer.


## Next Steps

Now that we’ve taken a good look at the bigger picture, let’s dive in and set our environment up so we can get our hands dirty with some coding!
