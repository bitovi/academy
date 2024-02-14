@page learn-react-vite/making-http-requests Making HTTP Requests
@parent learn-react-vite 9
@outline 2

@description Learn about how to make `fetch` requests and render requested data in React components.

@body

## Overview

TODO

## Objective 1

In this section, we will:

- Learn about the `useEffect` Hook
- TODO: Review TypeScript generics?

### The `useEffect` Hook

`useEffect` is a React Hook that lets you perform side effects in your functional components.
It serves as a powerful tool to execute code in response to component renders or state changes.

Here is an example component with `useEffect`:

@sourceref dependency-array-empty.tsx
@highlight 1, 6-12, only

Let’s break this example down by the two arguments that `useEffect` takes:

#### Effect callback function

The first argument of `useEffect` is a function, often referred to as the “effect” function.
This is where you perform your side effects, such as fetching data, setting up a subscription,
or manually changing the DOM in React components.

The key aspect of this function is that it’s executed after the component renders. The effects
in `useEffect` don’t block the browser from updating the screen, leading to more responsive UIs.

This effect function can optionally return another function, known as the “cleanup” function.
The cleanup function is useful for performing any necessary cleanup activities when the component
unmounts or before the component re-renders and the effect is re-invoked. Common examples include
clearing timers, canceling network requests, or removing event listeners.

#### The dependency array

The second argument of `useEffect` is an array, called the “dependency array”, which determines
when your effect function should be called. The behavior of the effect changes based on the
contents of this array:

Consider three scenarios based on the dependency array:

##### Empty dependency array (`[]`)

If the dependency array is an empty array, the effect runs once
after the initial render.

@sourceref dependency-array-empty.tsx
@highlight 6-12, only

##### Array with values

When you include values (variables, props, state) in the dependency array,
the effect will only re-run if those specific values change between renders. This selective
execution can optimize performance by avoiding unnecessary work.

@sourceref dependency-array-with-values.tsx
@highlight 4, 7-8, only

##### No dependency array

If the dependency array is omitted, the effect runs after every render
of the component.

@sourceref dependency-array-undefined.tsx
@highlight 8, only

#### Async operations inside useEffect

You can use APIs that return a `Promise` normally within a `useEffect`:

@sourceref fetch-with-promise.tsx
@highlight 7-14, only

However, unlike traditional functions, `useEffect` functions can’t be marked as async.
This is because returning a `Promise` from `useEffect` would conflict with its mechanism,
which expects either nothing or a clean-up function to be returned.

To handle asynchronous operations, you typically define an `async` function inside the
effect and then call it:

@sourceref fetch-with-async.tsx
@highlight 7-17, only

When using async/await, error handling is typically done using try-catch blocks. This allows
you to gracefully handle any errors that occur during the execution of your async operation.

In this example, if `fetch` throws an error, the `catch` block catches and handles it.
This pattern is crucial to prevent unhandled promise rejections and ensure that your application
can respond appropriately to failures in asynchronous tasks.

### TypeScript generics

TODO? We’ve used generics, but maybe explain the ones we’re going to use so it’s a little familiar?

### Cleanup functions

The effect function can optionally return another function, known as the “cleanup” function. The cleanup function is useful for performing any necessary cleanup activities when the component unmounts or before the component re-renders and the effect is re-invoked. Common examples include clearing timers, canceling network requests, or removing event listeners.

@sourceref useEffect-with-cleanup.tsx
@highlight 7-21, only

In the example above, we’re creating a WebSocket connection to an API when the component
is first rendered (note the empty dependency array).

When the component is removed from the DOM, the cleanup function will run and tear down
the WebSocket connection.

### Setup

✏️ Create **src/services/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/interfaces.ts

✏️ Create **src/services/restaurant/hooks.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/restaurant/hooks.ts

✏️ Create **src/services/restaurant/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/interfaces.ts

✏️ Create **src/services/restaurant/restaurant.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/restaurant.ts

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

✏️ Create **src/services/restaurant/restaurant.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/restaurant.test.ts

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

Update `src/services/restaurant/hooks.ts` with a `useEffect` that uses `getStates` to get a list of states.

Hint: Call `setResponse` after you get the response from `getStates()`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 2

In this section, we will:

- Learn the basics of the `fetch` API
- Understand how to handle responses from `fetch`

### Making `fetch` happen

TODO

### Parsing responses from `fetch`

TODO

Explain:

- `.json()`
- `.ok`
- `.status`
- `.statusText`

### Handling network errors

TODO: Explain how `fetch` can throw.

### Setup

Before we begin making services, we must:

- Install the place-my-order API
- Create an environment variable to point to the API

#### Install the Place My Order API

We’ve done some work to create a Place My Order API for use in this app by creating an npm package that will generate fake restaurant data and serve it from port 7070.

✏️ Run:

```bash
npm install place-my-order-api@1
```

✏️ Next add an API script to your `package.json`

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/package.json
@highlight 7, only

✏️ In a **new** terminal window, start the API server by running:

```bash
npm run api
```

Double check the api by navigating to <a href="http://localhost:7070/restaurants">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the api command from.

#### Create an environment variable

✏️ Create **.env** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/.env
@highlight 1

#### Create the API file

✏️ Create **src/services/api.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts

### Verify

TODO

✏️ Create **src/services/api.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.test.ts

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts only

</details>

## Objective 3

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/api.ts only

✏️ Update **src/services/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/interfaces.ts only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/restaurant/restaurant.ts only

### Verify

TODO

✏️ Update **src/services/api.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/api.test.ts only

✏️ Update **src/services/restaurant/restaurant.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/restaurant.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/restaurant.test.ts only

### Exercise

TODO

Give them `stringifyQuery` and have them make `getCities` and extend `apiRequest` to handle params.

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/api.ts only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/restaurant.ts only

</details>

## Objective 4

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

### Verify

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

TODO

Now use getCities to build a Hook and use it.

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 5

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.ts only

✏️ Update **src/services/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/interfaces.ts only

### Verify

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/restaurant.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/restaurant.test.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/restaurant.test.ts only

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/restaurant.ts only

</details>

## Next steps

TODO