@page learn-react/guidelines General Guidelines
@parent learn-react 1

@description General guidelines for writing a React application. Always keep these in mind when building an app.

@body

## React vs External Libraries

In general, if your task can be done with just React, it should be. Every library adds development and maintenance cost. External libraries should only be added when they provide more for the project than they cost.

## Make it work, Make it right, Make it fast

1. **Make it work** - Build your code to do approximately what you need it to do; get the general logic in place and sound.
2. **Make it right** - Refactor and add the necessary extras like type checking, error handling, etc.
3. **Make it fast** - Only once the above are done should you concern yourself with performance.

## Separation of Concerns: Data, Logic, UI

While many system include _separation of concerns_, many projects fall victim to _sepration of file types_. As much as possible, you should separate your code by its function not by its type: data, logic, and UI.

## Fractal Architecture

Much can be said about fractal architecture, but the short form is this: Every layer of your code should resemble every other layer. One consequence of this is that no one unit of code is more special than another.

In React terms: every component folder should resemble other component folders, and none of those components should be special. As an example, Your source directory might resemble the following:

<pre>
├── components
|   ├── avatar
|   |   ├── avatar.js
|   |   ├── avatar.styled.js
|   |   └── avatar.test.js
|   └── button
|       ├── button.js
|       ├── button.styled.js
|       └── button.test.js
├── models
|    ├── session.js
|    ├── session.test.js
|    ├── user.js
|    └── user.test.js
└── app
    ├── components
    |   ├── contact
    |   |   ├── components
    |   |   |   └── form
    |   |   |       ├── form.js
    |   |   |       ├── form.styled.js
    |   |   |       └── form.test.js
    |   |   ├── contact.js
    |   |   ├── contact.styled.js
    |   |   └── contact.test.js
    |   └── home
    |       ├── home.js
    |       ├── home.styled.js
    |       └── home.test.js
    ├── app.js
    ├── app.styled.js
    └── app.test.js
</pre>
