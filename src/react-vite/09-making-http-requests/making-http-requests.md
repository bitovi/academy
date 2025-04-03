@page learn-react/making-http-requests Making HTTP Requests
@parent learn-react 9
@outline 2

@description Learn about how to make `fetch` requests and render requested data in React components.

@body

## Overview

In this section, we will:

- Define interfaces for `useState`
- Explore the `useEffect` Hook
- Understand the effect callback function
- Utilize the dependency array
- Perform async operations inside `useEffect`
- Implement cleanup functions
- Manage environment variables
- Include query parameters in API calls
- Handle HTTP error statuses
- Catch network errors

## Objective 1: Add a `fetch` request for states in a custom Hook

So far we’ve only had hard-coded data for our states, cities, and restaurants. Let’s start loading data from an API server, beginning with the list of states!

### Defining interfaces for `useState`

When building React components, you may sometimes have local state variables that always change together, and thus would benefit by being in a single `useState()` variable together:

@sourceref useState-with-interface.tsx
@highlight 3-6, 9, 15-18, only

In the example above, we have a `UserProfile` interface that keeps track of an `email` and `name`. We can use that interface when we call `useState()` so TypeScript is aware of the typing for the state variable and its setter.

### The `useEffect` Hook

`useEffect` is a React Hook that lets you perform side effects in your function components. It serves as a powerful tool to execute code in response to component renders or state changes.

Here is an example component with `useEffect`:

@sourceref dependency-array-empty.tsx
@highlight 1, 11-21, only

Let’s break this example down by the two arguments that `useEffect` takes:

### Effect callback function

The first argument of `useEffect` is a function, often referred to as the “effect” function. This is where you perform your side effects, such as fetching data, setting up a subscription, or manually changing the DOM in React components.

The key aspect of this function is that it’s executed after the component renders. The effects in `useEffect` don’t block the browser from updating the screen, leading to more responsive UIs.

This effect function can optionally return another function, known as the “cleanup” function. The cleanup function is useful for performing any necessary cleanup activities when the component unmounts or before the component re-renders and the effect is re-invoked. Common examples include clearing timers, canceling network requests, or removing event listeners.

### The dependency array

The second argument of `useEffect` is an array, called the “dependency array”, which determines when your effect function should be called. The behavior of the effect changes based on the contents of this array:

Consider three scenarios based on the dependency array:

#### Empty dependency array (`[]`)

If the dependency array is an empty array, the effect runs once after the initial render.

@sourceref dependency-array-empty.tsx
@highlight 11-21, only

#### Array with values

When you include values (variables, props, state) in the dependency array, the effect will only re-run if those specific values change between renders. This selective execution can optimize performance by avoiding unnecessary work.

@sourceref dependency-array-with-values.tsx
@highlight 4, 6-8, only

#### No dependency array

If the dependency array is omitted, the effect runs after every render of the component. This should not be needed.

@sourceref dependency-array-undefined.tsx
@highlight 8, only

### Async operations inside useEffect

You can use APIs that return a `Promise` normally within a `useEffect`:

@sourceref fetch-with-promise.tsx
@highlight 7-15, only

However, unlike traditional functions, `useEffect` functions can’t be marked as async. This is because returning a `Promise` from `useEffect` would conflict with its mechanism, which expects either nothing or a clean-up function to be returned.

To handle asynchronous operations, you typically define an `async` function inside the effect and then call it:

@sourceref fetch-with-async.tsx
@highlight 7-18, only

When using async/await, error handling is typically done using try-catch blocks. This allows you to gracefully handle any errors that occur during the execution of your async operation.

In this example, if `fetch` throws an error, the `catch` block catches and handles it. This pattern is crucial to prevent unhandled promise rejections and ensure that your application can respond appropriately to failures in asynchronous tasks.

### Cleanup functions

The effect function can optionally return another function, known as the “cleanup” function. The cleanup function is useful for performing any necessary cleanup activities when the component unmounts or before the component re-renders and the effect is re-invoked. Common examples include clearing timers, canceling network requests, or removing event listeners.

@sourceref useEffect-with-cleanup.tsx
@highlight 7, 15-18, only

In the example above, we’re creating a WebSocket connection to an API when the component is first rendered (note the empty dependency array).

When the component is removed from the DOM, the cleanup function will run and tear down the WebSocket connection.

### Environment variables

The way we’re accessing our locally run API during development may be different than how we access it in production. To prepare for this, we’ll set an environment variable to do what we need.

Environment variables are dynamic-named values that can affect the way running processes on a computer will behave. In the context of software development, they are used to manage specific settings or configurations that should not be hardcoded within the application’s source code.

This is particularly useful for:

- **Security:** Keeping sensitive data like API keys or database passwords out of the source code.
- **Flexibility:** Allowing configurations to change depending on the environment (development, staging, production).
- **Convenience:** Making it easier to update configuration settings without changing the application’s code.

In our project, we’ll utilize environment variables to set ourselves up to be able to differentiate between the development and production environments, especially in how we connect to different instances of our API.

#### Using environment variables with Vite

Vite, our build tool, provides an easy way to work with environment variables. In Vite, any environment variable prefixed with `VITE_` is made available in our client-side source code. This prefix is necessary because Vite only exposes variables that are explicitly meant for client-side consumption, ensuring server-side variables remain secure.

Here’s how we can use it: in our project’s root directory, we can create a `.env` file with variables like this:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/.env

Note: if you are using CodeSandbox or StackBlitz, `.env` has already been created with a remote connection to the PMO API at `https://www.place-my-order.com/`.  Leave it as is instead of changing to `localhost`, because these container services make it difficult to run the API alongside the Web server.

Then we can access this variable using `import.meta.env`:

```tsx
const response = await fetch(`${import.meta.env.VITE_PMO_API}/data`, {
  method: "GET",
})

const data = await response.json()
```

@highlight 1

Concatenating the two, this will be the equivalent of making this `fetch` request:

```tsx
const response = await fetch(`//localhost:7070/data`, {
  method: "GET",
})
```

@highlight 1

### Setup 1

#### Install the Place My Order API

Before we begin requesting data from our API, we need to install the `place-my-order-api` module, which will generate fake restaurant data and serve it from port `7070`.

✏️ Run:

```bash
npm install place-my-order-api@1
```

✏️ Next add an API script to your `package.json`. NOTE: if on Windows, change `/` to `\\`.

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-problem/package.json
@highlight 7, only

✏️ In a **new** terminal window, start the API server by running:

```bash
npm run api
```

Double check the API by navigating to <a href="http://localhost:7070/restaurants">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data.

It will be helpful to have a third terminal tab for the `npm run api` command.

#### Create and update files

✏️ Create **.env** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/.env

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-problem/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/03-solution//src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/pmo/restaurant/hooks.ts only

### Verify 1

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/03-solution/src/services/pmo/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/pmo/restaurant/hooks.test.ts only

### Exercise 1

- Update the `useStates` in `hooks.ts` to call `useEffect()` and `fetch` data from `${process.env.PMO_API}/states`.
- Update `StateList.tsx` to call `useStates()` and use the `StateResponse` interface.

**Hint:** Call your state setter after you parse the JSON response from `fetch()`.

**Hint:** `useStates()` return `isPending` and `error`. Use these states to inform the user the status.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/01-problem?file=src/pages/RestaurantList/RestaurantList.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/01-problem?file=src/pages/RestaurantList/RestaurantList.tsx) to do this exercise in an online code editor.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/pmo/restaurant/hooks.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/01-solution?file=src/pages/RestaurantList/RestaurantList.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/01-solution?file=src/pages/RestaurantList/RestaurantList.tsx).

</details>

## Objective 2: Update the `useCities` Hook to fetch data from the API

Let’s continue our quest to load data from our API and update our `useCities` Hook to fetch data.

To do this, we’ll need to include query parameters in our API call to the `/cities` endpoint.

### Including query parameters in API calls

Query parameters are a defined set of parameters attached to the end of a URL. They are used to define and pass data in the form of key-value pairs. The parameters are separated from the URL itself by a `?` symbol, and individual key-value pairs are separated by the `&` symbol.

A basic URL with query parameters looks like this:
`http://www.example.com/page?param1=value1&param2=value2`

Here’s a breakdown of this URL:

- Base URL: `http://www.example.com/page`
- Query Parameter Indicator: `?`
- Query Parameters:
  - `param1=value1`
  - `param2=value2`

### Setup 2

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/02-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify 2

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/pmo/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/pmo/restaurant/hooks.test.ts only

### Exercise 2

Update our `useCities()` Hook to fetch cities from the Place My Order API, given a selected state.

When calling the Place My Order API, include the `state` query parameter:
`http://localhost:7070/cities?state=MO`

Hint: Remember to include the `state` in the dependency array of the `useEffect()` in `useCities()`.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/02-problem?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/02-problem?file=src/services/pmo/restaurant/hooks.ts) to do this exercise in an online code editor.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/pmo/restaurant/hooks.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/02-solution?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/02-solution?file=src/services/pmo/restaurant/hooks.ts).

</details>

## Objective 3: Create an `apiRequest` helper and use it in the Hooks.

Now that we have two Hooks that fetch data in a similar way, let’s create an `apiRequest` helper function that both Hooks can use.

### Handle HTTP error statuses

When you make a request with the Fetch API, it does not reject on HTTP error statuses (like `404` or `500`). Instead, it resolves normally (with an `ok` status set to `false`), and it only rejects on network failure or if anything prevented the request from completing.

Here’s the API that `fetch` provides to handle these HTTP errors:

- `.ok`: This is a shorthand property that returns `true` if the response’s status code is in the range `200`-`299`, indicating a successful request.
- `.status`: This property returns the status code of the response (e.g. `200` for success, `404` for `Not Found`, etc.).
- `.statusText`: This provides the status message corresponding to the status code (e.g. `'OK'`, `'Not Found'`, etc.).

@sourceref fetch-handle-not-ok.js

In the example above, we check the `response.ok` property to see if the status code is in the `200`-`299` (successful) range. If not, we create an `error` object that contains the status code and text (e.g. `404 Not Found`).

### Catch network errors

Network errors occur when there is a problem in completing the request, like when the user is offline, the server is unreachable, or there is a DNS lookup failure.

In these cases, the `fetch` API will _not_ resolve with data, but instead it will throw an error that needs to be caught.

Let’s take a look at how to handle these types of errors:

@sourceref fetch-handle-thrown-error.js

In the example above, we `catch` the `error` and check its type. If it’s already an `instanceof Error`, then it will have a `message` property and we can use it as-is. If it’s not, then we can create our own `new Error()` so we _always_ have an error to consume in our Hooks or components.

### Setup 3

✏️ Create **src/services/pmo/api/api.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/pmo/api/api.ts

✏️ Create **src/services/pmo/api/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/pmo/api/index.ts

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/pmo/restaurant/hooks.ts only

### Verify 3

✏️ Create **src/services/pmo/api/api.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/api/api.test.ts

✏️ Update **src/services/pmo/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/pmo/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/restaurant/hooks.test.ts only

### Exercise 3

- Implement the `apiRequest` helper function to handle errors returned and thrown from `fetch()`.
- Update the `useCities` and `useStates` Hooks to use the `data` and `error` returned from `apiRequest`.

Hint: Use the new `stringifyQuery` function to convert an object of query parameters to a string:

```tsx
stringifyQuery({
  param1: "value1",
  param2: "value2",
})
```

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/03-problem?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/03-problem?file=src/services/pmo/restaurant/hooks.ts) to do this exercise in an online code editor.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/pmo/api/api.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/api/api.ts only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/restaurant/hooks.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/03-solution?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/03-solution?file=src/services/pmo/restaurant/hooks.ts).

</details>

## Objective 4: Fetch the list of restaurants

Let’s finish our quest to load data from our API by creating a Hook to fetch the list of restaurants and use it in our component.

Now that we are able to capture a user’s state and city preferences, we want to only show the restaurants in the selected city:

<img alt="A web page titled “Restaurants” from place-my-order.com showing that “Illinois” and “Chicago” are selected. Underneath the dropdowns is a list of restaurants that are in Chicago." src="../static/img/react-vite/09-making-http-requests/04-solution-with-selection.png" width="689"/>

### Setup 4

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/04-problem/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/pmo/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/pmo/restaurant/interfaces.ts only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/pmo/restaurant/hooks.ts only

### Verify 4

If you’ve implemented the solution correctly, when you use the select boxes to choose state and city, you should see a list of just restaurants from the selected city returned.

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/pmo/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/pmo/restaurant/hooks.test.ts only

### Exercise 4

- Create a `useRestaurants` Hook for fetching the list of restaurants.
- Update `RestaurantList.tsx` to use our new `useRestaurants` Hook.

Hint: The requested URL with query parameters should look like this: `'/restaurants?filter[address.state]=IL&filter[address.city]=Chicago'`

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/04-problem?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/04-problem?file=src/services/pmo/restaurant/hooks.ts) to do this exercise in an online code editor.

### Solution 4

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/pmo/restaurant/hooks.ts only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/04-solution?file=src/services/pmo/restaurant/hooks.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/09-making-http-requests/04-solution?file=src/services/pmo/restaurant/hooks.ts).

</details>

## Next steps

Next, let’s learn how to have [child routes within parent routes](./nested-routes.html) with React Router.
