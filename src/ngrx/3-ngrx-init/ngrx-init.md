@page learn-ngrx/ngrx-init Installing NgRx
@parent learn-ngrx 3

@description Learn how to add NgRx to an Angular project.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/starting-point) to get your codebase ready to work on this part.

## Overview

1. Add NgRx schematics

2. Add NgRx dependencies

3. Generate Global store using NgRx schematics

4. Generate Login feature store using NgRx schematics

## NgRx Dependencies

Since we are going to use multiple NgRx tools, let’s install everything we need:

First, run `ng add @ngrx/schematics` to install NgRx schematics, a tool that will enable us to quickly generate code.

Then, let’s install NgRx dependencies: `npm install @ngrx/{store,effects,entity,store-devtools}@14 --save.`


```bash
ng add @ngrx/schematics@14
npm install @ngrx/{store,effects,entity,store-devtools}@14 --save
```

## Login State
The Login State in our application will be responsible for holding information about authentication and the authenticated user.

### Store Setup
We’ll take advantage of NgRx schematics to quickly generate an Authentication Feature State: `run ng generate feature store/auth/Auth -m app.module.ts`.

The `store/auth/` part is the path that we want the feature to be located, and `Auth` is the feature state name. We're also passing a `-m option`, short for `--module`, in which we tell NgRx where to import the feature state.

NgRx schematics will prompt us with a few questions:

- `Should we generate and wire success and failure actions?` **Yes**. We will modify the actions a little bit, but this is enough to get started.
- `What should be the prefix of the action, effect and reducer?` **load**. The default value. We will change the names for actions, effects and reducers, so don’t worry about the prefix right now.

Besides setting up a Store with the Auth Feature State and Effects for us in app.module, the schematics will create the following files:

- `auth.actions.ts`
- `auth.effects.ts`, `auth.effects.spec.ts`
- `auth.reducer.ts`, `auth.reducer.spec.ts`
- `auth.selectors.ts`, `auth.selectors.spec.ts`

### Add EffectsModule to AppComponent

TODO

### Generate Login Feature

TODO

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/ngrx-init). You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/starting-point...ngrx-init) on GitHub.
