@page learn-ngrx/ngrx-init Installing NgRx
@parent learn-ngrx 3

@description Learn how to add NgRx to an Angular project.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/starting-point) to get your codebase ready to work on this part.


## Overview

1. Add NgRx schematics.

2. Add NgRx dependencies.

3. Generate Global Store using NgRx schematics.

4. Generate Login Feature Store using NgRx schematics.


## NgRx Dependencies

Since we are going to use multiple NgRx tools, let’s install everything we need:

### NgRx Schematics

First, install [NgRx schematics](https://ngrx.io/guide/schematics/install#installing-with-ng-add), a tool that will allow us to run schematics from the CLI to quickly generate code. 

This command will install NgRx schematics and update `angular.json`:

```bash
ng add @ngrx/schematics@14
```


### NgRx Libraries

Next, let’s install the [NgRx dependencies](https://ngrx.io/guide/schematics#dependencies).

This command will install the NgRx dependencies and update `package.json` and `package-lock.json`:

```bash
npm install @ngrx/{store,effects,entity,store-devtools}@14 --save
```


## Generating Global Store

We'll take advantage of NgRx schematics to [generate our initial state management files](https://ngrx.io/guide/schematics/store#command), and register the root of our Global Store within `app.module.ts`. 

```bash
ng generate store State --root --state-path store --module app.module.ts
```

We are now setup to be able to generate NgRx Features.


## Generating Login Feature Set

The Login Feature Set in our application will be responsible for holding information about authentication and the authenticated user.

### Setup

We’ll take advantage of NgRx schematics to quickly [generate a Feature Set](https://ngrx.io/guide/schematics/feature#command): 

```bash
ng generate feature store/login/Login --module app.module.ts --reducers ../../store/index.ts
```

NgRx schematics will prompt us with a few questions:

- `Should we generate and wire success and failure actions?` **Yes**. We will modify the Actions a little bit, but this is enough to get started.
- `What should be the prefix of the action, effect and reducer?` **load**. The default value. We will change the names for Actions, Effects and Reducers, so don’t worry about the prefix right now.

This command accomplishes the following:

1. Creates a `src/app/store/login` directory containing `login.actions.ts`, `login.effects.ts`, `login.reducer.ts`, and `login.selecors.ts`, as well as associated spec files
2. Updates `app.module.ts` to initialize the Login Feature Store and Feature Effects
3. Updates `src/app/store/index.ts` to:
    a. Add Login Feature Reducers map
    b. Add the Login State type to the Global `State` interface


### Register Root `EffectsModule` in `AppModule`

We need to manually update our `app.module.ts` to [register NgRx Global Effects](https://ngrx.io/guide/schematics#initial-effects-setup). To accomplish this, we need to add `EffectsModuloe.forRoot([])` to our `AppModule` imports, as shown below:

<details open>
<summary>src/app/app.module.ts</summary>
@diff ./app.module.before-add-effects-module.ts ./app.module.ts only
</details>


### Generate Login Feature

Lastly, we need to update `src/app/store/login/login.reducer.ts` to include a `LoginPartialState` interface, which is easier to import when:

1. Writing tests for `Components` using NgRx Selectors
2. Writing tests for NgRx Selectors themselves

<details open>
<summary>src/app/store/login/login.reducer.ts</summary>
@diff ./login.reducer.before-generate-login.ts ./login.reducer.ts only
</details>


> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/ngrx-init). You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/starting-point...ngrx-init) on GitHub.
