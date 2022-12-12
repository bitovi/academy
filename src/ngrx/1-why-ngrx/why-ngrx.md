@page learn-ngrx/why-ngrx Why NgRx
@parent learn-ngrx 1

@description Why NgRx is a great choice for State Management.

@body

1. Actively Maintained

    NgRx is [actively maintained](https://github.com/ngrx/platform) and keeps evolving with Angular.

2. Great documentation

    [NgRx documentation](https://ngrx.io/docs) is great and @ngrx/eslint-plugin can help you follow NgRx’s best practices.

    PRO TIP: if you use [@bitovi/eslint-config](https://github.com/bitovi/eslint-config), there’s no need to worry: NgRx recommended ESLint rules will be configured for you.

3. Maintainability

    While NgRx allegedly has a lot of boilerplate code, NgRx does help keep your code tidy!

4. Performance

    NgRx is carefully implemented with performance in mind, and it complements the Angular Ecosystem perfectly because of its Reactive approach.

## Key Concepts

Understand the key concepts of NgRx

### Redux Pattern

The Redux pattern manages the global state of an application and aims at code testability and predictability.

Redux is known for its boilerplate code. At first, it might seem like a lot of effort to implement Redux, but in fact it is a tradeoff. Redux adds a layer of indirection in order to improve maintainability, testability and predictability of your application. The tradeoff pays off more often than not particularly if your application is complex, large and maintained by a large team.

[Redux expects updates to the state to be done immutably](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability). Not only Immutability helps Redux implement patterns that help testability and predictability, it also improves performance, as change detection is achieved with less effort.

#### Store

A Store is an object that wraps the state. The Store also provides methods to update the state and listen to state changes.

#### Actions

Actions are objects that represent individual events in your application.

Actions have two properties:

- `type` describes the event;
- `payload` (optional) holds additional information.

Actions are necessary to update the state.

#### Reducers

To put it simply, reducers are functions that take the state and an action as arguments, and return a new state. In other words, Reducers are functions that, given an action, know how to update the state.

Reducers functions must be `pure`:

- do not depend on any information other than the action and current state;
- do not perform side-effects, like mutating the current state.

#### Dispatch

A Dispatch is a Store method that will provide an action to the Reducer function. You can see the Dispatch method as the API to update the state.


#### Selectors

Selectors are functions that extract data from the state. Selectors can return derived data or pieces of the state.

#### One-way Data Flow

To help you understand how Redux pieces work together, let’s take a look at the most basic representation of how data is passed around in an application that uses Redux, also known as a _one-way data flow_, [taken from the Redux Official Documentation](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#state-management).

<figure>
    <img src="../static/img/ngrx/1-why-ngrx/ngrx-one-way-data-flow.png" alt="One-way data flow">
    <figcaption>One-way Data Flow</figcaption>
</figure>

Data goes through the following steps:

1. Action: An `action` is `dispatched`.
2. State: A `reducer` function takes the `action` information and current `state` and returns a new `state`.
3. View: View, which is subscribed to `state` changes through selectors, receives the new `state`, triggering a re-render of the View.

### NgRx State Management Lifecycle

NgRx abstracts away from _one-way data flow_ to represent its own Store implementation pieces and interaction with external entities, such as Components and Services, to what is referred to as the _State Management Lifecycle_.

<figure>
    <img src="../static/img/ngrx/1-why-ngrx/state-management-lifecycle.png" alt="NgRx State Management Lifecycle diagram">
    <figcaption>NgRx State Management Lifecycle</figcaption>
</figure>

#### Effects

We’ve mentioned _side-effects_ before: reducer functions must be pure and not perform side-effects. While the [Redux pattern suggests that side-effects should be performed as part of the action creation process](https://redux.js.org/faq/actions#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior), NgRx’s solution - Effects - is a more reactive approach.

In NgRx, Effects will:

- listen to an action observable and filter the action(s) relevant to the Effects;
- perform side-effects and return a new action. If there’s no need to update the state or trigger other effects, an Effect may not return a new action (Non-dispatching Effect).

> Note that, for a given action, Effects will always happen after the state has been updated by the reducer.

## Next Steps

Now that we’ve taken a good look at the bigger picture, let’s dive in and set our environment up so we can get our hands dirty with some coding!
